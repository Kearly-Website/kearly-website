import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const origin = process.env.SEO_ORIGIN || "http://127.0.0.1:8788";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin) && origin !== "https://kearly.de") {
  throw Error("Audit the local preview or the verified public Kearly site.");
}
const checks = [];
const check = (name, condition) => { assert.ok(condition, name); checks.push(name); };
const home = await fetch(origin);
check("Public homepage is accessible", home.status === 200);
const homeHtml = await home.text();
check("Homepage permits indexing", /name="robots" content="index, follow"/.test(homeHtml));
check("Existing Google verification is preserved", homeHtml.includes('name="google-site-verification"'));
check("Homepage uses one preferred workshop URL", homeHtml.includes('href="/workshop#anfrage"') && !homeHtml.includes('href="/workshop/'));
const workshop = await fetch(origin + "/workshop");
check("Public workshop is accessible", workshop.status === 200);
const html = await workshop.text();
check("Workshop canonical points to the public domain", html.includes('rel="canonical" href="https://kearly.de/workshop"'));
check("Workshop permits indexing", /name="robots" content="index, follow"/.test(html));
check("Workshop keeps one H1", (html.match(/<h1\b/g) || []).length === 1);
check("Actual mobile offer remains visible", html.includes("Bochum") && html.includes("70 km") && html.includes("39 €"));
const data = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i)?.[1];
assert.ok(data, "Workshop JSON-LD");
const graph = JSON.parse(data)["@graph"];
check("Workshop service links to the existing Organization", graph.some(n => n["@type"] === "Service" && n.provider?.["@id"] === "https://kearly.de/#kearly"));
check("Service matches the real area", graph.some(n => n.areaServed?.name === "Bochum und Umgebung im Umkreis von 70 km"));
check("Schema does not invent reviews or booking dates", !/aggregateRating|reviewCount|startDate/.test(data));
const redirected = await fetch(origin + "/workshop/?seo-check=1", { redirect: "manual" });
const target = new URL(redirected.headers.get("location") || origin);
check("Trailing slash redirects once and keeps query strings", redirected.status === 308 && target.pathname === "/workshop" && target.search === "?seo-check=1");
const robots = await fetch(origin + "/robots.txt");
const rules = await robots.text();
check("Robots allows public pages and points to the sitemap", robots.status === 200 && rules.includes("Allow: /") && rules.includes("Sitemap: https://kearly.de/sitemap.xml"));
check("Admin and APIs stay excluded from crawling", rules.includes("Disallow: /anfragen") && rules.includes("Disallow: /api/"));
const sitemap = await fetch(origin + "/sitemap.xml");
const xml = await sitemap.text();
const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
check("Sitemap contains the public workshop and no admin pages", sitemap.status === 200 && locations.includes("https://kearly.de/workshop") && !locations.some(u => /anfragen|bildverwaltung/.test(u)));
for (const route of ["/impressum", "/datenschutz"]) {
  const res = await fetch(origin + route);
  const legal = await res.text();
  check("Legal page reachable: " + route, res.status === 200 && legal.includes("Kearly"));
  check("Legal page is deliberately noindex: " + route, /noindex/.test(res.headers.get("x-robots-tag") || "") && /name="robots" content="noindex/.test(legal));
}
const admin = await fetch(origin + "/anfragen", { redirect: "manual" });
check("Anonymous visitors cannot read inquiries", [301,302,303,307,308,401,403,404].includes(admin.status));
check("Admin response remains noindex", /noindex/.test(admin.headers.get("x-robots-tag") || ""));
const result = { date: "2026-11-23", origin, status: "PASS_PUBLIC_SEO", checks, sitemapUrls: locations.length };
if (process.argv[2]) {
  await fs.mkdir(path.dirname(process.argv[2]), { recursive: true });
  await fs.writeFile(process.argv[2], JSON.stringify(result, null, 2));
}
console.log(JSON.stringify(result));
