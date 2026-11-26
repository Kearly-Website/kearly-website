// Static presentation build for Cloudflare Pages. Customer APIs stay on kearly.de.
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'out');
const serverOnly = /^\/(?:api|anfragen|bildverwaltung|design-system|_next|_not-found|_global-error|__auth|auth|oauth|signin-with-chatgpt|signout-with-chatgpt|callback|_sites|\.well-known|cdn-cgi|wedding-photo|workshop-photo)(?:\/|$)/;
const legal = /^\/(?:wedding\/)?(?:impressum|datenschutz)(?:\/|$)/;
const publicRoute = value => !serverOnly.test(value) && !serverOnly.test(value.replace(/^\/wedding(?=\/)/, '')) && !legal.test(value) && !/[\[\]]/.test(value);
const normalise = value => value === '/' ? '/' : value.replace(/\/+$/, '');
const inside = (base, target) => target.startsWith(base + path.sep);

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { cwd: root, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(`Build exited with ${code}`)));
  });
}

async function filesUnder(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isSymbolicLink()) throw new Error(`Do not export symlinks: ${entry.name}`);
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(target));
    else if (entry.isFile()) files.push(target);
  }
  return files;
}

if (!process.argv.includes('--skip-build')) {
  await run(['scripts/next-server.mjs', 'build', '--webpack']);
}

// The build only replaces this fixed, generated directory inside this checkout.
if (output !== path.join(root, 'out')) throw new Error('Unexpected export directory');
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
await fs.cp(path.join(root, 'public'), output, { recursive: true });
await fs.cp(path.join(root, '.next/static'), path.join(output, '_next/static'), { recursive: true });

const weddingRoot = path.join(root, 'wedding/site');
const weddingFiles = await filesUnder(weddingRoot);
for (const file of weddingFiles) {
  const rel = path.relative(weddingRoot, file);
  // HTML is requested from the same production server as the React pages.
  if (path.extname(file) === '.html' || path.basename(file).startsWith('_') || /(?:robots\.txt|sitemap\.xml)$/.test(file)) continue;
  const destination = path.join(output, 'wedding', rel);
  if (!inside(output, destination)) throw new Error('Invalid Wedding asset path');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(file, destination);
}

const appManifest = JSON.parse(await fs.readFile(path.join(root, '.next/server/app-paths-manifest.json'), 'utf8'));
const prerender = JSON.parse(await fs.readFile(path.join(root, '.next/prerender-manifest.json'), 'utf8'));
const sitemap = await fs.readFile(path.join(root, 'public/sitemap.xml'), 'utf8');
const routes = new Set(['/']);
const addRoute = value => {
  const route = normalise(value);
  if (publicRoute(route)) routes.add(route);
};
for (const key of Object.keys(appManifest)) {
  if (key.endsWith('/page')) addRoute(key.slice(0, -5) || '/');
}
for (const key of Object.keys(prerender.routes)) addRoute(key);
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(match[1]);
  if (url.origin !== 'https://kearly.de') throw new Error('Sitemap must retain kearly.de');
  addRoute(url.pathname);
}
for (const file of weddingFiles.filter(file => file.endsWith(`${path.sep}index.html`))) {
  const relative = path.relative(weddingRoot, path.dirname(file)).split(path.sep).join('/');
  addRoute('/wedding/' + relative);
}

const socket = createServer();
await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['scripts/next-server.mjs', 'start', '--port', String(port), '--host', '127.0.0.1'], { cwd: root, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production' } });
let serverError;
server.once('error', error => { serverError = error; });
server.once('exit', code => { if (code !== 0) serverError = new Error(`Preview server exited: ${code}`); });

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (serverError) throw serverError;
    try { const response = await fetch(origin, { signal: AbortSignal.timeout(2000) }); await response.body?.cancel(); if (response.ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  if (!ready) throw new Error('Production server did not become ready');

  const exported = [];
  for (const route of routes) {
    if (routes.size > 500) throw new Error('Unexpectedly many public pages; review the build');
    const response = await fetch(new URL(route, origin), { signal: AbortSignal.timeout(20000) });
    const html = await response.text();
    if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw new Error(`Public page failed: ${route} (${response.status})`);
    if ((html.match(/<h1\b/gi) || []).length !== 1) throw new Error(`Expected one H1: ${route}`);
    const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
    if (!canonical || new URL(canonical).origin !== 'https://kearly.de') throw new Error(`Missing kearly.de canonical: ${route}`);
    const filename = route === '/' ? 'index.html' : route.slice(1) + '.html';
    const destination = path.resolve(output, filename);
    if (!inside(output, destination)) throw new Error(`Invalid route: ${route}`);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, html);
    exported.push(route);
  }

  const missing = await fetch(new URL('/__kearly_static_missing_page__', origin));
  if (missing.status !== 404) throw new Error('Production server must return 404 for missing pages');
  await fs.writeFile(path.join(output, '404.html'), await missing.text());

  // An auxiliary build origin must not compete with the canonical business site.
  await fs.writeFile(path.join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  await fs.writeFile(path.join(output, '_headers'), '/*\n  X-Robots-Tag: noindex, follow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Cache-Control: no-cache\n/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n');
  await fs.writeFile(path.join(output, '_redirects'), '/impressum https://kearly.de/impressum 302\n/datenschutz https://kearly.de/datenschutz 302\n/wedding/impressum https://kearly.de/impressum 302\n/wedding/datenschutz https://kearly.de/datenschutz 302\n/anfragen https://kearly.de/anfragen 302\n/bildverwaltung https://kearly.de/bildverwaltung 302\n');

  // Verify every local script, stylesheet, font and image referenced by the HTML.
  let references = 0;
  for (const route of exported) {
    const filename = route === '/' ? 'index.html' : route.slice(1) + '.html';
    const html = await fs.readFile(path.join(output, filename), 'utf8');
    for (const match of html.matchAll(/<(?:script|link|img|source)\b[^>]*(?:src|href)=["']([^"'#]+)["']/gi)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), new URL(route === '/' ? '/' : route + '/', origin));
      if (url.origin !== origin || !/\.(js|css|svg|png|jpe?g|webp|avif|woff2?|ico)$/i.test(url.pathname)) continue;
      const asset = path.resolve(output, '.' + decodeURIComponent(url.pathname));
      if (!inside(output, asset) || !(await fs.stat(asset).catch(() => null))?.isFile()) throw new Error(`Missing asset on ${route}: ${url.pathname}`);
      references++;
    }
  }
  const allFiles = await filesUnder(output);
  for (const file of allFiles) {
    if ((await fs.stat(file)).size > 25 * 1024 * 1024) throw new Error(`File exceeds Pages limit: ${file}`);
  }
  if (allFiles.length > 20000) throw new Error('Export exceeds the free Pages file limit');
  const report = { status: 'PASS', builtAt: new Date().toISOString(), pages: exported, assetReferences: references, files: allFiles.length, backend: 'Existing protected Sites backend on https://kearly.de', includesCustomerBackend: false };
  await fs.writeFile(path.join(root, '.next/pages-build-report.json'), JSON.stringify(report, null, 2));
  console.log(`Pages export verified: ${exported.length} pages, ${references} asset references, ${allFiles.length} files. Output: out/`);
} finally {
  // Kill only the child tree created by this build, including Next's wrapper.
  if (process.platform === 'win32') {
    await new Promise(resolve => { const stop = spawn('taskkill', ['/PID', String(server.pid), '/T', '/F'], { stdio: 'ignore' }); stop.once('exit', resolve); stop.once('error', resolve); });
  } else {
    server.kill('SIGTERM');
  }
}
