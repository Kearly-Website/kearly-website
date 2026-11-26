import categoryCovers from "./category-covers.json";

/** Approved V0.7 content. See docs/authority-v07.md. Do not infer booking readiness. */
export type AuthorityStatus = "APPROVED" | "OPEN" | "TO_TEST" | "NOT_APPROVED";
export type WorkshopForm = {
  id: string;
  name: string;
  number?: string;
  category: string;
  image?: string;
  size?: string;
  waxGramsApprox?: number;
  workshopVerified: boolean;
  premium: boolean;
  seasonal: boolean;
  availability:
    "AVAILABLE" | "LIMITED" | "ON_REQUEST" | "NOT_CURRENTLY_AVAILABLE";
};
export type WorkshopDate = {
  id: string;
  date: string;
  time: string;
  capacity: number | null;
  spotsLeft: number | null;
  bookingEnabled: boolean;
  bookingUrl?: string;
  opening?: boolean;
};
export type PhotoSlot = {
  id: string;
  src: string | null;
  approved: boolean;
  status: "P1 FOTO" | "APPROVED";
  alt: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};
const photo = (id: string, alt: string): PhotoSlot => ({
  id,
  src: null,
  approved: false,
  status: "P1 FOTO",
  alt,
});
export const WORKSHOP_MAX_PARTICIPANTS = 9;

export const shapeWorlds = [
  {
    id: "animals",
    name: "Tiere",
    subtitle: "Verspielte und besondere Tiermotive.",
    tone: "clay",
  },
  {
    id: "botanical",
    name: "Blumen & Natur",
    subtitle: "Florale Formen und Designs aus der Natur.",
    tone: "sage",
  },
  {
    id: "modern",
    name: "Modern & Abstract",
    subtitle: "Klare Linien, organische Formen und moderne Designs.",
    tone: "sand",
  },
  {
    id: "mini",
    name: "Mini-Kerzen",
    subtitle: "Kleine Formen, die sich besonders schön kombinieren lassen.",
    tone: "rose",
  },
  {
    id: "statement",
    name: "Statement-Kerzen",
    subtitle: "Größere Formen mit besonderer Wirkung.",
    tone: "olive",
  },
  {
    id: "figures",
    name: "Menschen & Figuren",
    subtitle: "Figürliche Formen entdecken.",
    tone: "sand",
  },
  {
    id: "love",
    name: "Liebe & Hochzeit",
    subtitle: "Für besondere Anlässe.",
    tone: "rose",
  },
  {
    id: "food",
    name: "Food & Fun",
    subtitle: "Mit einer spielerischen Note.",
    tone: "clay",
  },
  {
    id: "christmas",
    name: "Weihnachten",
    subtitle: "Winterliche Formenwelten.",
    tone: "sage",
  },
  {
    id: "halloween",
    name: "Halloween",
    subtitle: "Saisonale Motive entdecken.",
    tone: "olive",
  },
] as const;
// Preserved validation vocabulary; concrete scents are still not approved.
export const scentWorlds = [
  "Fresh",
  "Floral",
  "Warm & Cozy",
  "Fruity",
  "Seasonal",
  "Ohne Duft",
] as const;
export const occasions = [
  "JGA",
  "Geburtstag",
  "Freundesgruppe",
  "Paare / Date Night",
  "Firmenevent",
] as const;
export const workshopConfig = {
  version: "0.7",
  authorityStatus: "CONTENT_ARCHITECTURE_FROZEN",
  publicWorkshop: {
    name: "Kearly Candle Workshop",
    price: 39 as number | null,
    priceStatus: "approved" as "pending" | "approved",
    duration: 150 as number | null,
    durationMax: 180,
    durationLabel: "ca. 2,5–3 Stunden",
    minParticipants: 4 as number | null,
    maxParticipants: WORKSHOP_MAX_PARTICIPANTS as number | null,
    candlesIncluded: 3 as number | null,
    candlesMax: 4,
    candlesLabel: "in der Regel 3–4 eigene Kerzen",
    bookingEnabled: false,
  },
  opening: { price: 35, enabled: false, selectedDateIds: [] as string[] },
  formLibrary: {
    catalogPath: "/workshops/formen",
    catalogEnabled: false,
    allFormsSimultaneouslyAvailable: false,
  },
  categoryPhotos: Object.fromEntries(
    shapeWorlds.map((world) => [
      world.id,
      {
        ...photo(`category-${world.id}`, categoryCovers[world.id].alt),
        src: `/formenwelten/${world.id}.webp?v=${world.id === "mini" ? 4 : 3}`,
        approved: true,
        status: "APPROVED",
        width: 880,
        height: 660,
      },
    ]),
  ) as Record<string, PhotoSlot>,
  features: {
    vouchersEnabled: false,
    premiumFormsEnabled: false,
    addonsEnabled: false,
    directBookingEnabled: false,
    includedEnabled: true,
  },
  dates: [] as WorkshopDate[],
  forms: [] as WorkshopForm[],
  scents: [] as {
    id: string;
    name: string;
    world: string;
    status: AuthorityStatus;
  }[],
  colors: [] as {
    id: string;
    name: string;
    hex: string;
    status: AuthorityStatus;
  }[],
  addons: [] as {
    id: string;
    name: string;
    price: number;
    status: AuthorityStatus;
  }[],
  included: [
    "In der Regel 3–4 eigene Kerzen",
    "Farbe inklusive",
    "Duft inklusive",
    "Duftfrei möglich",
    "Auswahl aus der großen Formenbibliothek",
    "Persönliche Begleitung in kleiner Gruppe",
  ],

  privatePrice: null,
  voucher: {
    status: "OPEN" as AuthorityStatus,
    type: null,
    value: null,
    validity: null,
    purchaseUrl: null as string | null,
    redemption: null,
  },
  location: { city: "Bochum", radiusKm: 50 },
  legal: {
    imprintUrl: "https://kearly.de/impressum" as string | null,
    privacyUrl: "https://kearly.de/datenschutz" as string | null,
    imprint: null as string | null,
    privacy: null as string | null,
    contactEmail: "kevingraf01@gmail.com" as string | null,
  },
  pending: {
    takeHomeRule: "OPEN – PRACTICAL TEST REQUIRED",
    cancellation: "OPEN",
    payment: "OPEN",
    groupConditions: "OPEN",
    location: "OPEN",
    materials: "OPEN",
    packaging: "OPEN",
    drinks: "OPEN",
    snacks: "OPEN",
    photoApproval: "OPEN",
    colorPalette: "OPEN",
    scentSelection: "OPEN",
    faq: ["Brauche ich Vorerfahrung?", "Wie funktioniert die Stornierung?"],
    addonsToTest: ["zweite Kerze", "Geschenkverpackung", "Personalisierung"],
    unapprovedAddons: ["frei kombinierbarer zusätzlicher Duft"],
  },
  imageSlots: {
    hero: {
      ...photo(
        "P1_FOTO_HERO",
        "Symbolbild: Personen in einem Raum mit Sitzkissen und Kerzen.",
      ),
      src: "/marke/assets/kerzenworkshop.webp",
      approved: true,
      status: "APPROVED" as const,
      width: 1200,
      height: 900,
    },
    formVariety: photo(
      "P1_FOTO_FORMENVIELFALT",
      "Vorhandene Kearly-Formen und Kerzen in unterschiedlichen Größen.",
    ),
    pouring: photo(
      "P1_FOTO_GIESSEN",
      "Hände beim Gießen von Kerzenwachs in eine Form.",
    ),
    colors: photo(
      "P1_FOTO_FARBE",
      "Farben und Materialien im Kearly Candle Workshop.",
    ),
    scents: photo(
      "P1_FOTO_DUFT",
      "Tatsächlich verfügbare Duftmaterialien im Workshop.",
    ),
    group: photo(
      "P1_FOTO_GRUPPE",
      "Eine kleine Gruppe am Kearly-Workshoptisch.",
    ),
    results: {
      ...photo(
        "P1_FOTO_ERGEBNIS",
        "Gestaltungsidee: graue Kerze mit Hochlandrind-Motiv auf einer Holzkommode.",
      ),
      src: "/marke/assets/kerzenlicht.webp",
      approved: true,
      status: "APPROVED" as const,
      width: 960,
      height: 1200,
    },
    materials: photo(
      "P1_FOTO_WORKSHOPTISCH",
      "Vorbereiteter Kearly-Workshoptisch mit Materialien.",
    ),
  },
} as const;
export const finishText =
  "Die Abholung vereinbaren wir individuell. Sie findet in der Regel zwei bis fünf Tage nach dem Workshop statt.";
export const faqItems = [
  {
    question: "Was bietet Kearly im mobilen Kerzenworkshop an?",
    answer:
      "Kearly bietet mobile Kerzengieß-Workshops für kleine Gruppen an. Du gestaltest und gießt deine eigenen Designkerzen – persönlich begleitet und direkt bei euch vor Ort.",
  },
  {
    question: "Wo und wann findet der Workshop statt?",
    answer: `Der Workshop findet am Wochenende mobil bei euch vor Ort statt. Ich komme im Umkreis von ${workshopConfig.location.radiusKm} km rund um ${workshopConfig.location.city} zu euch. Für weitere Anfahrten fällt eine Anfahrtspauschale an.`,
  },
  {
    question: "Wie viel kostet der Workshop?",
    answer:
      "Der öffentliche Kearly Candle Workshop kostet 39 € pro Person (4–9 Personen, ca. 2,5–3 Stunden). Private Gruppen werden individuell angefragt.",
  },
  {
    question: "Was ist im Workshop enthalten?",
    answer:
      "Im Preis enthalten sind Wachs und Materialien für in der Regel 3–4 eigene Kerzen, die Auswahl aus der Formenbibliothek, Farbe, Duft (oder duftfreie Gestaltung) sowie die persönliche Begleitung.",
  },
  {
    question: "Was kann ich selbst auswählen?",
    answer:
      "Form, Farbe und Duft wählst du direkt im Workshop selbst aus der aktuell verfügbaren Auswahl. Wenn du deine Kerzen pur magst, ist das Gießen jederzeit auch komplett duftfrei möglich.",
  },
  {
    question: "Wie läuft die Anfrage ab?",
    answer:
      "Du schickst eine unverbindliche Anfrage mit Wunschtermin am Wochenende, Personenanzahl und Veranstaltungsort (mit PLZ). Anschließend prüfen wir den Termin, stimmen eure Wünsche und den Umfang ab und vereinbaren erst dann verbindlich euren Workshop.",
  },
  {
    question: "Wie lange dauert der Workshop und wie viele Kerzen gieße ich?",
    answer:
      "Plane etwa 2,5–3 Stunden ein. In dieser Zeit entstehen in der Regel 3–4 eigene Kerzen – je nach gewählten Formen und deren Größe.",
  },
  {
    question: "Wie viele Personen nehmen teil?",
    answer: `Die Workshops finden in kleinen Gruppen mit 4 bis maximal ${WORKSHOP_MAX_PARTICIPANTS} Personen statt.`,
  },
  {
    question: "Wie läuft die Abholung ab?",
    answer: finishText,
  },
  {
    question: "Können wir als private Gruppe anfragen?",
    answer:
      "Ja. Private Kearly Candle Workshops könnt ihr zum Beispiel für JGAs, Geburtstage, Freundesgruppen, Paare oder Firmenevents individuell anfragen.",
  },
];
