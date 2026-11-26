import type { Metadata } from "next";
import { brand } from "./brand";
import { faqItems, workshopConfig } from "./workshop-config";

export const WORKSHOP_CANONICAL_URL = "https://kearly.de/workshop";
export const WORKSHOP_OG_IMAGE_PATH = "/marke/assets/kerzenworkshop.webp";

export function buildWorkshopMetadata(): Metadata {
  return {
    title: brand.title,
    description: brand.description,
    alternates: { canonical: WORKSHOP_CANONICAL_URL },
    openGraph: {
      title: brand.title,
      description: brand.description,
      url: WORKSHOP_CANONICAL_URL,
      siteName: brand.name,
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: WORKSHOP_OG_IMAGE_PATH,
          width: 1200,
          height: 900,
          alt: "Einblick in einen mobilen Kearly Candle Workshop in Bochum und Umgebung.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brand.title,
      description: brand.description,
      images: [WORKSHOP_OG_IMAGE_PATH],
    },
  };
}

export function buildWorkshopStructuredData() {
  const { city, radiusKm } = workshopConfig.location;
  const { price, durationLabel, minParticipants, maxParticipants } =
    workshopConfig.publicWorkshop;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${WORKSHOP_CANONICAL_URL}#page`,
        url: WORKSHOP_CANONICAL_URL,
        name: brand.title,
        description: brand.description,
        inLanguage: "de-DE",
        isPartOf: { "@id": "https://kearly.de/#website" },
        mainEntity: { "@id": `${WORKSHOP_CANONICAL_URL}#service` },
        breadcrumb: { "@id": `${WORKSHOP_CANONICAL_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${WORKSHOP_CANONICAL_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Kearly",
            item: "https://kearly.de/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mobiler Kerzenworkshop",
            item: WORKSHOP_CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${WORKSHOP_CANONICAL_URL}#service`,
        url: WORKSHOP_CANONICAL_URL,
        name: `Mobiler Kerzenworkshop in ${city} und Umgebung`,
        serviceType: "Mobiler Kerzengieß-Workshop",
        description: brand.description,
        provider: { "@id": "https://kearly.de/#kearly" },
        areaServed: {
          "@type": "Place",
          name: `${city} und Umgebung im Umkreis von ${radiusKm} km`,
        },
        ...(price !== null
          ? {
              offers: {
                "@type": "Offer",
                name: `Öffentlicher Kearly Candle Workshop (${minParticipants}–${maxParticipants} Personen)`,
                price: String(price),
                priceCurrency: "EUR",
                url: `${WORKSHOP_CANONICAL_URL}#anfrage`,
                description: `${durationLabel}, meist 3–4 eigene Kerzen inklusive Form, Farbe und Duft (auch duftfrei). Private Gruppen werden individuell angefragt.`,
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${WORKSHOP_CANONICAL_URL}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
