import { workshopConfig } from "./workshop-config";
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
  title: `Mobiler Kerzenworkshop Bochum & Umgebung (${workshopConfig.location.radiusKm} km) | Kearly`,
  description: `Mobiler Kerzenworkshop am Wochenende bis ${workshopConfig.location.radiusKm} km um ${workshopConfig.location.city}: Form, Farbe & Duft frei wählen (auch duftfrei), meist 3–4 Kerzen. 39 € p. P. oder privat anfragen.`,
  siteUrl: "https://kearly.de",
} as const;
