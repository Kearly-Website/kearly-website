import { workshopConfig, WORKSHOP_MAX_PARTICIPANTS } from "./workshop-config";
/** Kearly is the umbrella brand; this site represents its candle workshops. */
export const brand = {
  name: "Kearly",
  wordmark: {
    src: "/brand/kearly-candle-workshop-wortmarke.svg",
    alt: "Kearly Candle Workshop",
    width: 640,
    height: 383,
  },
  logo: {
    originalSrc: "/brand/kearly-candle-workshop-logo.png",
    alt: "Kearly Candle Workshop – Logo mit Gießgefäß und Kerze",
  },
  title: "Mobiler Kerzenworkshop in Bochum & Umgebung | Kearly",
  description: `Mobiler Kerzengieß-Workshop am Wochenende bei euch vor Ort. Kearly kommt im Umkreis von ${workshopConfig.location.radiusKm} km um ${workshopConfig.location.city} zu euch. 39 € pro Person, für bis zu ${WORKSHOP_MAX_PARTICIPANTS} Personen.`,
  siteUrl: "https://kearly.de",
} as const;
