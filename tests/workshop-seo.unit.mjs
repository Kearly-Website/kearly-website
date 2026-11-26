import test from "node:test";
import assert from "node:assert/strict";
import { brand } from "../app/brand.ts";
import { faqItems, workshopConfig } from "../app/workshop-config.ts";
import {
  WORKSHOP_CANONICAL_URL,
  buildWorkshopMetadata,
  buildWorkshopStructuredData,
} from "../app/workshop-seo.ts";

test("binding workshop facts match configuration", () => {
  assert.equal(workshopConfig.location.city, "Bochum");
  assert.equal(workshopConfig.location.radiusKm, 50);
  assert.equal(workshopConfig.publicWorkshop.price, 39);
  assert.equal(workshopConfig.publicWorkshop.minParticipants, 4);
  assert.equal(workshopConfig.publicWorkshop.maxParticipants, 9);
  assert.equal(workshopConfig.imageSlots.hero.src, "/marke/assets/kerzenworkshop.webp");
  assert.equal(workshopConfig.imageSlots.results.src, "/marke/assets/kerzenlicht.webp");
});

test("workshop SEO metadata has valid lengths, canonical, and social cards", () => {
  const metadata = buildWorkshopMetadata();
  assert.equal(metadata.alternates?.canonical, WORKSHOP_CANONICAL_URL);
  assert.equal(metadata.title, brand.title);
  assert.equal(metadata.description, brand.description);
  assert.ok(
    brand.title.length >= 40 && brand.title.length <= 65,
    `Expected title length 40–65, got ${brand.title.length}`,
  );
  assert.ok(
    brand.description.length >= 120 && brand.description.length <= 165,
    `Expected description length 120–165, got ${brand.description.length}`,
  );
  assert.ok(brand.description.includes("50 km"));
  assert.ok(brand.description.includes("39 €"));
  assert.ok(brand.description.includes("duftfrei"));
  assert.equal(metadata.openGraph?.url, WORKSHOP_CANONICAL_URL);
});

test("structured data stays 100% aligned with visible facts and invents nothing", () => {
  const structured = buildWorkshopStructuredData();
  const serialized = JSON.stringify(structured);
  assert.ok(!/aggregateRating|reviewCount|startDate|70 km/i.test(serialized));

  const graph = structured["@graph"];
  const service = graph.find((node) => node["@type"] === "Service");
  assert.ok(service, "Service node missing");
  assert.equal(
    service.areaServed?.name,
    "Bochum und Umgebung im Umkreis von 50 km",
  );
  assert.equal(service.offers?.price, "39");
  assert.equal(service.offers?.priceCurrency, "EUR");

  const faq = graph.find((node) => node["@type"] === "FAQPage");
  assert.ok(faq, "FAQPage node missing");
  assert.equal(faq.mainEntity.length, faqItems.length);
  for (let i = 0; i < faqItems.length; i += 1) {
    assert.equal(faq.mainEntity[i].name, faqItems[i].question);
    assert.equal(faq.mainEntity[i].acceptedAnswer.text, faqItems[i].answer);
  }
});
