import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

// Server-rendered, offline visual documents. These are explicitly not screenshots.
const siteBrowserVerified = process.env.DESIGN_BROWSER_VERIFIED === "true";
const verificationNote = siteBrowserVerified
  ? "Lokale Website bei 375, 390, 430, 768 und 1440 px geprüft; separate JPG-Screenshots im Paket."
  : "Browserabnahme ausstehend.";
const origin = process.env.DESIGN_ORIGIN || "http://127.0.0.1:5173";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin))
  throw new Error("Use the local preview only.");
const destination = path.resolve(process.argv[2] || "../outputs/v07");
await fs.mkdir(destination, { recursive: true });
let css =
  (await fs.readFile("app/globals.css", "utf8")) +
  (await fs.readFile("app/v07.css", "utf8"));
await fs.mkdir(path.join(destination, "assets", "brand"), { recursive: true });
for (const name of await fs.readdir("public/brand")) {
  await fs.copyFile(
    path.join("public/brand", name),
    path.join(destination, "assets", "brand", name),
  );
}
for (const font of [
  "dm-sans.woff2",
  "instrument-serif.woff2",
  "instrument-serif-italic.woff2",
]) {
  const buffer = await fs.readFile(path.join("public/fonts", font));
  css = css.replaceAll(
    `/fonts/${font}`,
    `data:font/woff2;base64,${buffer.toString("base64")}`,
  );
}
const views = [
  ["01-desktop-full-page", "full", 1440, "Desktop Full Page"],
  ["02-mobile-full-page", "full", 390, "Mobile Full Page"],
  ["03-hero-detail", "hero", 1440, "Hero Detail"],
  ["04-usp-system", "usp", 1440, "USP System"],
  ["05-formenbibliothek", "forms", 1440, "Formenbibliothek"],
  ["06-kategorie-cards", "categories", 1440, "Form-Kategorie-Cards"],
  ["07-form-farbe-duft", "selection", 1440, "Form / Farbe / Duft"],
  ["08-workshop-preis", "price", 1440, "Workshop & Preis"],
  ["09-private-workshop", "private", 1440, "Private Workshop"],
  ["10-booking-preview", "booking", 390, "Terminstatus"],
  ["11-private-inquiry", "inquiry", 390, "Private Inquiry"],
  ["12-faq", "faq", 390, "FAQ"],
  ["13-component-library", "library", 1440, "Component Library"],
];
const escapeAttr = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const manifest = [];
for (const [file, view, width, title] of views) {
  const response = await fetch(`${origin}/design-system?view=${view}`);
  assert.equal(response.status, 200, `${view}: HTTP`);
  const html = await response.text();
  let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  assert.ok(body, `${view}: body`);
  body = body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*>/gi, "");
  if (view === "full") {
    assert.equal((body.match(/<h1\b/g) || []).length, 1);
    assert.equal((body.match(/class="form-category-card"/g) || []).length, 6);
    assert.ok(body.includes("39 €"));
    assert.ok(!body.includes("35 €"));
    assert.ok(body.includes("ca. 2,5–3 Stunden"));
    assert.ok(body.includes("Gesamtbestand"));
    assert.ok(!body.includes("Workshop buchen"));
    for (const name of [
      "occasion",
      "participants",
      "desiredDate",
      "alternativeDate",
      "name",
      "email",
      "phone",
      "message",
    ])
      assert.ok(body.includes(`name="${name}"`));
    const ids = [...body.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]);
    assert.equal(ids.length, new Set(ids).size, "Unique rendered IDs");
  }
  if (view === "booking")
    assert.ok(
      body.includes("Neue Workshoptermine sind gerade in Vorbereitung."),
    );
  body = body.replaceAll("/brand/", "assets/brand/");
  // Offline snapshots must never submit an inquiry or imply that their controls are live.
  body = body.replace(
    /<(input|select|textarea|button)\b([^>]*)>/gi,
    (tag, name, attrs) =>
      /\bdisabled\b/.test(attrs) ? tag : `<${name}${attrs} disabled>`,
  );
  body = body.replace(
    /href="(\/(?!\/)[^"]*)"/g,
    (_, url) =>
      `href="https://candlestore-kerzengiessen.stonypearl1024.chatgpt.site${url}" target="_blank" rel="noopener"`,
  );
  const inner = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · Kearly V0.7</title><style>${css}\n/* Static export: preserve the appearance of non-booking controls. */.inquiry-form input:disabled,.inquiry-form select:disabled,.inquiry-form textarea:disabled{opacity:1;-webkit-text-fill-color:var(--ink)}.capture-document .site-header{position:relative}.capture-document .mobile-sticky{position:relative;visibility:visible;transform:none}</style></head><body>${body}</body></html>`;
  const outer = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · Kearly V0.7</title><style>*{box-sizing:border-box}body{margin:0;background:#dedbd4;color:#302e26;font:14px/1.5 system-ui}header{padding:18px 24px;position:sticky;top:0;background:#302e26;color:#f8f5ef;z-index:10;display:flex;gap:24px;align-items:center;justify-content:space-between}header a{color:inherit}main{padding:28px;overflow:auto}iframe{display:block;width:${width}px;height:1000px;border:0;box-shadow:0 8px 35px #302e2620;margin:auto;background:#f8f5ef}small{font-size:11px;display:block;max-width:700px}</style></head><body><header><div>Kearly Candle Studio · V0.7 · ${title}<small>Statische HTML-Designansicht bei ${width} px. Kein Screenshot. Interaktive Bedienelemente deaktiviert; native FAQ bleibt aufklappbar. ${verificationNote}</small></div><a href="index.html">Alle 13 Ansichten</a></header><main><iframe title="${title} bei ${width} px" srcdoc="${escapeAttr(inner)}" onload="this.style.height=this.contentDocument.documentElement.scrollHeight+'px'"></iframe></main></body></html>`;
  await fs.writeFile(path.join(destination, `${file}.html`), outer);
  manifest.push({
    file: `${file}.html`,
    title,
    view,
    width,
    format: "server-rendered HTML",
    artifactBrowserVerified: false,
    siteBrowserVerified,
  });
}
await fs.writeFile(
  path.join(destination, "manifest.json"),
  JSON.stringify(
    {
      version: "0.7",
      kind: "high-fidelity HTML design views",
      screenshot: false,
      views: manifest,
    },
    null,
    2,
  ),
);
await fs.writeFile(
  path.join(destination, "index.html"),
  `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kearly · V0.7 Designpaket</title><style>body{background:#f8f5ef;color:#302e26;margin:50px auto;max-width:850px;padding:24px;font:16px/1.7 system-ui}h1{font:54px/1.1 Georgia}a{color:#843923}li{padding:8px 0}p{max-width:720px}</style></head><body><p>KEARLY CANDLE STUDIO / UX/UI V0.7</p><h1>Die 13 Designansichten.</h1><p>Offline HTML-Ansichten mit eingebetteten Schriften und CSS. Desktop 1440 px, Mobile 390 px. Dies sind serverseitig gerenderte Vorschauen, keine Screenshots. ${verificationNote} Die funktionierende aktuelle Website und interaktive Komponentenbibliothek stehen im privaten Sites-Projekt.</p><ol>${manifest.map((x) => `<li><a href="${x.file}">${x.title}</a> · ${x.width} px</li>`).join("")}</ol><p>Originalfotos: P1 FOTO. Direktbuchung: deaktiviert. Figma: nicht erstellt. Details, Self-Review und offene Punkte: PRUEFPROTOKOLL.md im übergeordneten Paketordner.</p></body></html>`,
);
console.log(
  JSON.stringify({
    exports: manifest.length,
    destination,
    serverAssertions: "PASS",
    artifactBrowserVerified: false,
    siteBrowserVerified,
  }),
);
