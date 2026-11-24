const esc = value => String(value).replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[char]);
const workshop = {
  P1_FOTO_HERO: 'Startbild · Kerzengießen',
  P1_FOTO_GIESSEN: 'Ablauf · Wachs gießen',
  P1_FOTO_WORKSHOPTISCH: 'Ablauf · Materialien am Tisch',
  P1_FOTO_GRUPPE: 'Ablauf · Gruppe am Tisch',
  P1_FOTO_FARBE: 'Farben und Materialien',
  P1_FOTO_DUFT: 'Düfte',
};
const workshopSlot = slot => Object.hasOwn(workshop, slot);
const keyFor = slot => (workshopSlot(slot) ? 'workshop-photos/' : 'wedding-photos/') + slot;
const limit = 6 * 1024 * 1024;
const privateHeaders = { 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' };
const answer = (message, status) => new Response(message, { status, headers:privateHeaders });

function admin(request, env) {
  const email = request.headers.get('oai-authenticated-user-email')?.trim().toLowerCase();
  return Boolean(request.headers.get('oai-authenticated-user-id') && email &&
    email === env.PHOTO_ADMIN_EMAIL?.trim().toLowerCase());
}

function typeOf(bytes) {
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if ([137,80,78,71,13,10,26,10].every((byte, index) => bytes[index] === byte)) return 'image/png';
  if (String.fromCharCode(...bytes.slice(0,4)) === 'RIFF' &&
      String.fromCharCode(...bytes.slice(8,12)) === 'WEBP') return 'image/webp';
}

async function upload(request, bucket, slot) {
  const reader = request.body?.getReader();
  if (!reader) return answer('Bitte ein Foto auswählen.', 400);
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return answer('Das Bild darf höchstens 6 MB groß sein.', 413);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const contentType = typeOf(bytes);
  if (!contentType) return answer('Bitte JPG, PNG oder WebP verwenden.', 415);
  let alt;
  try {
    alt = decodeURIComponent(request.headers.get('X-Photo-Alt') ?? '').trim();
  } catch {
    return answer('Die Bildbeschreibung ist ungültig.', 400);
  }
  if (!alt || alt.length > 200) return answer('Bitte das Foto in bis zu 200 Zeichen beschreiben.', 400);
  await bucket.put(keyFor(slot), bytes, { httpMetadata:{contentType}, customMetadata:{alt} });
  return answer('Foto gespeichert.', 200);
}

async function edit(request, env, url) {
  if (!admin(request, env)) {
    if (!request.headers.get('oai-authenticated-user-id') && request.method === 'GET')
      return Response.redirect(new URL('/signin-with-chatgpt?return_to=%2Fbildverwaltung%2F', url), 302);
    return answer('Die Bildverwaltung ist für das Betreiberkonto reserviert.', 403);
  }
  const slot = url.searchParams.get('bild');
  if (request.method !== 'GET') {
    if (request.headers.get('Origin') !== url.origin || !(Object.hasOwn(slots, slot) || workshopSlot(slot)))
      return answer('Ungültige Anfrage.', 403);
    if (request.method === 'PUT') return upload(request, env.BUCKET, slot);
    if (request.method === 'DELETE') {
      await env.BUCKET.delete(keyFor(slot));
      return answer('Foto entfernt.', 200);
    }
    return answer('Methode nicht erlaubt.', 405);
  }
  const showWorkshop = url.searchParams.get('bereich') === 'workshop';
  const prefix = showWorkshop ? 'workshop-photos/' : 'wedding-photos/';
  const {objects} = await env.BUCKET.list({prefix, include:['customMetadata']});
  const saved = new Map(objects.map(object => [object.key, object]));
  const visibleSlots = showWorkshop
    ? Object.fromEntries(Object.entries(workshop).map(([id,title]) => [id,{title,alt:title}]))
    : slots;
  const cards = Object.entries(visibleSlots).map(([id, info]) => {
    const photo = saved.get(keyFor(id));
    const src = photo ? (showWorkshop ? '/workshop-photo/' : '/wedding-photo/') + id : info.src;
    const alt = photo?.customMetadata?.alt ?? info.alt;
    return '<form data-slot="' + id + '"><h2>' + esc(info.title) + '</h2>' +
      (src ? '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy">' : '<p>Bildplatzhalter</p>') +
      '<label>Foto <input type="file" accept="image/jpeg,image/png,image/webp" required></label>' +
      '<label>Bildbeschreibung <input name="alt" maxlength="200" value="' + esc(photo ? alt : '') + '" required></label>' +
      '<button>Foto speichern</button>' +
      (photo ? ' <button type="button" data-remove>Foto entfernen</button>' : '') +
      '<p role="status"></p></form>';
  }).join('');
  const page = '<!doctype html><html lang="de"><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><title>Bildverwaltung · Kearly</title>' +
    '<style>body{font:16px system-ui;color:#432e25;background:#faf5ed;margin:0}main{max-width:1080px;margin:auto;padding:24px}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:16px}form{background:white;padding:16px;border:1px solid #dcc8ba}h2{font-size:18px}label{display:block;margin:12px 0}input{display:block;max-width:100%;margin-top:4px}img{width:100%;height:160px;object-fit:contain;background:#faf5ed}button{padding:8px;margin-bottom:4px}a{color:inherit}</style>' +
    '<main><a href="/">← Zur Kearly-Startseite</a><h1>Bildverwaltung für Kearly</h1><nav aria-label="Angebote"><a href="/bildverwaltung/">Wedding</a> · <a href="/bildverwaltung/?bereich=workshop">Workshop</a></nav><h2>' + (showWorkshop ? 'Workshop' : 'Wedding') + '</h2><p>Wähle einen Bildplatz, lade ein JPG, PNG oder WebP bis 6 MB hoch und beschreibe kurz, was zu sehen ist.</p><section>' +
    cards + '</section></main><script src="/assets/photo-admin.js" defer></script></html>';
  return new Response(page, {headers:{...privateHeaders, 'Content-Type':'text/html; charset=utf-8',
    'X-Robots-Tag':'noindex, nofollow',
    'Content-Security-Policy':"default-src 'self'; style-src 'unsafe-inline'; img-src 'self'; frame-ancestors 'none'; base-uri 'none'"}});
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === '/bildverwaltung' || path === '/bildverwaltung/') {
      try { return await edit(request, env, url); }
      catch { return answer('Die Bildverwaltung ist gerade nicht erreichbar.', 503); }
    }
    if (path === '/workshop-photo-manifest') {
      const {objects} = await env.BUCKET.list({prefix:'workshop-photos/', include:['customMetadata']});
      const images = Object.fromEntries(objects.flatMap(object => {
        const slot = object.key.slice('workshop-photos/'.length);
        return workshopSlot(slot) ? [[slot,{alt:object.customMetadata?.alt ?? workshop[slot]}]] : [];
      }));
      return Response.json(images, {headers:privateHeaders});
    }
    if (path.startsWith('/wedding-photo/') || path.startsWith('/workshop-photo/')) {
      const isWorkshop = path.startsWith('/workshop-photo/');
      const slot = path.split('/')[2];
      if (path.split('/').length !== 3 || !(isWorkshop ? workshopSlot(slot) : Object.hasOwn(slots, slot))) return answer('Foto nicht gefunden.', 404);
      const object = await env.BUCKET.get(keyFor(slot));
      if (!object) return answer('Foto nicht gefunden.', 404);
      return new Response(object.body, {headers:{...privateHeaders, 'Content-Type':object.httpMetadata.contentType}});
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return answer('Methode nicht erlaubt.', 405);
    const entry = assets[path] ?? assets[path.replace(/\/?$/, '/') + 'index.html'];
    const file = entry ?? assets['/404.html'];
    const response = new Response(request.method === 'HEAD' ? null : Uint8Array.from(atob(file.data), c => c.charCodeAt(0)), {
      status:entry ? 200 : 404, headers:{...privateHeaders, 'Content-Type':file.type,
        'X-Robots-Tag':!entry || /^\/(?:hochzeit-anfragen|impressum|datenschutz)(?:\/|$)/.test(path) ? 'noindex, follow' : 'index, follow'}
    });
    if (request.method === 'HEAD' || !entry || !file.type.startsWith('text/html')) return response;
    try {
      const {objects} = await env.BUCKET.list({prefix:'wedding-photos/', include:['customMetadata']});
      const photos = new Map(objects.map(object => [object.key,object]));
      return new HTMLRewriter().on('figure[data-photo-slot]', {
        element(element) {
          const id = element.getAttribute('data-photo-slot');
          const photo = photos.get(keyFor(id));
          if (!photo) return;
          element.setInnerContent('<img src="/wedding-photo/' + id + '" alt="' +
            esc(photo.customMetadata?.alt ?? slots[id].alt) + '" ' +
            (id === 'hero-wedding' ? 'fetchpriority="high"' : 'loading="lazy"') +
            ' decoding="async"><figcaption>' + esc(slots[id].title) + '</figcaption>', {html:true});
        }
      }).transform(response);
    } catch { return response; }
  }
};
