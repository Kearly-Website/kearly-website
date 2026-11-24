import { WorkshopLanding } from "../components/workshop-landing";
import { brand } from "../brand";
import { workshopConfig } from "../workshop-config";

const url = "https://kearly.de/workshop";
export const metadata = {
  alternates: { canonical: url },
};
const workshopData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": url + "#page",
      url,
      name: brand.title,
      inLanguage: "de-DE",
      isPartOf: { "@id": "https://kearly.de/#website" },
      mainEntity: { "@id": url + "#service" },
    },
    {
      "@type": "Service",
      "@id": url + "#service",
      url,
      name: "Mobiler Kerzengieß-Workshop in Bochum und Umgebung",
      serviceType: "Kerzengieß-Workshop",
      description: brand.description,
      provider: { "@id": "https://kearly.de/#kearly" },
      areaServed: {
        "@type": "Place",
        name: `${workshopConfig.location.city} und Umgebung im Umkreis von ${workshopConfig.location.radiusKm} km`,
      },
    },
  ],
};
export default function Workshop() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(workshopData).replace(/</g, "\\u003c"),
      }} />
      <WorkshopLanding />
    </>
  );
}
