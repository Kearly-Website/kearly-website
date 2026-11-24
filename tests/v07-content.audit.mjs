import assert from "node:assert/strict";
import fs from "node:fs/promises";

const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:5173";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin))
  throw Error("Audit only the local preview.");
const started = performance.now();
const response = await fetch(origin);
assert.equal(response.status, 200);
const html = await response.text();
const httpMs = Math.round(performance.now() - started);
const body = html
  .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
  ?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
assert.ok(body);
const decode = (text) =>
  text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const visible = decode(body.replace(/<[^>]*>/g, " "))
  .replace(/\s+/g, " ")
  .trim();
const checks = [];
const check = (name, test) => {
  assert.ok(test, name);
  checks.push(name);
};
check("One H1", (body.match(/<h1\b/g) || []).length === 1);
check(
  "Approved H1",
  decode(
    body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]*>/g, " ") ||
      "",
  )
    .replace(/\s+/g, " ")
    .trim() === "Gieß dir deine eigenen Designkerzen.",
);
for (const text of [
  "Wähle deine Lieblingsformen, Farbe und Duft und gieße in kleiner Runde deine eigenen Designkerzen.",
  "39 €",
  "ca. 2,5–3 Stunden",
  "in der Regel 3–4 Kerzen",
  "max. 9 Personen",
  "Der Workshop auf einen Blick",
  "Entdecke unsere Formenwelten.",
  "Welche wird deine?",
  "Alle Formen-Kategorien ansehen",
  "Mach sie zu deinen.",
  "So läuft dein Workshop ab",
  "Dein Kearly Candle Workshop",
  "Wochenendtermine auf Anfrage",
  "Eine Wunschform ist keine garantierte Reservierung.",
])
  check(text, visible.includes(text));
check(
  "Ten categories",
  (body.match(/class="form-category-card"/g) || []).length === 10,
);
check(
  "Six process steps",
  (
    body
      .match(/<ol class="process-steps">([\s\S]*?)<\/ol>/)?.[1]
      ?.match(/<li\b/g) || []
  ).length === 6,
);
check(
  "Six price inclusions",
  (
    body
      .match(/class="price-inclusions">([\s\S]*?)<\/ul>/)?.[1]
      ?.match(/<li\b/g) || []
  ).length === 6,
);
check(
  "Ten FAQ entries",
  (
    body
      .match(/class="faq-list">([\s\S]*?)<\/section>/)?.[1]
      ?.match(/<details\b/g) || []
  ).length === 10,
);
check(
  "No visible development labels",
  !/(Atelierillustration|P1[ _]FOTO|Abstrakte Gestaltungsflächen|Keine Abbildung verfügbarer Kerzen)/i.test(
    visible,
  ),
);
check(
  "No old CTA / fake booking",
  !/(Workshop entdecken|Weitere Formenwelten|Workshop buchen|Jetzt buchen|freie Plätze|Opening Special)/i.test(
    visible,
  ),
);
check("No previous wax or catalog quantities", !/(1\s*kg|300\s+(?:verschiedene[n]?\s+)?Formen)/i.test(visible));
check("No unapproved prices", !/(?:35|59|65|390|195)\s*€/.test(visible));
check(
  "Small group benefit once",
  visible.split(
    "Maximal 9 Personen pro Workshop geben dir genug Raum für deine Ideen, Fragen und persönliche Unterstützung.",
  ).length === 2,
);
const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]);
check("Unique IDs", ids.length === new Set(ids).size);
for (const anchor of [...body.matchAll(/href="#([^"]*)"/g)].map((x) => x[1]))
  check("Real anchor: " + anchor, !!anchor && ids.includes(anchor));
for (const field of [
  "occasion",
  "participants",
  "desiredDate",
  "alternativeDate",
  "name",
  "email",
  "phone",
  "message",
])
  check("Form field " + field, body.includes(`name="${field}"`));
check(
  "Date explanations",
  body.includes('id="desiredDate-format"') &&
    body.includes('id="alternativeDate-format"'),
);
check("German document", /<html\b[^>]*lang="de"/.test(html));
check(
  "Title",
  /<title>Mobiler Kerzengieß-Workshop rund um Bochum \| Kearly Candle Studio<\/title>/.test(
    html,
  ),
);
check(
  "Description",
  /<meta[^>]+name="description"[^>]+content="[^"]*39 €[^\"]*"/.test(html),
);
check(
  "No public hard maximum for private groups",
  !/<input[^>]*name="participants"[^>]*\smax="/.test(body),
);
const legal = [];
for (const [label, path] of [
  ["Impressum", "/impressum"],
  ["Datenschutz", "/datenschutz"],
]) {
  const target = body.match(
    new RegExp(`<a[^>]+href="([^"]+)"[^>]*>${label}<`),
  )?.[1];
  const status = (
    await fetch(new URL(target?.startsWith("/") ? target : path, origin))
  ).status;
  legal.push({
    label,
    target: target || null,
    localStatus: status,
    status:
      target && target.startsWith("/") && status === 200
        ? "VERIFIED_LOCAL"
        : "OPEN_P0",
  });
}
const booking = await fetch(`${origin}/design-system?view=booking`);
const bookingHtml = (await booking.text()).replace(
  /<script\b[^>]*>[\s\S]*?<\/script>/gi,
  "",
);
check(
  "Design preview shows status, no fake checkout",
  booking.status === 200 && !/preview-date|Workshop buchen/.test(bookingHtml),
);
const report = {
  status: "PASS_IMPLEMENTED_CONTENT_CHECKS",
  checks: checks.length,
  http: {
    status: response.status,
    htmlBytes: Buffer.byteLength(html),
    localResponseMs: httpMs,
  },
  legal,
  releaseReady: legal.every((x) => x.status === "VERIFIED_LOCAL"),
  seoLocation: html.includes("Workshop rund um Bochum")
    ? "BOCHUM_CONFIGURED"
    : "LOCATION_PENDING_GENERIC_SEO",
  note: "Local HTTP timings do not measure mobile Core Web Vitals or certify WCAG compliance.",
};
if (process.argv[2])
  await fs.writeFile(process.argv[2], JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
