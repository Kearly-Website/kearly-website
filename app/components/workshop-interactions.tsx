// Native anchors avoid the observed Vinext/Next Link runtime incompatibility.
/* eslint-disable @next/next/no-img-element -- Approved source assets are served directly by Sites. */
"use client";
import { useEffect, useRef, useState } from "react";

import { Arrow } from "./atelier-art";
import { CategoryArtwork, StudioMedia } from "./studio-media";
import { shapeWorlds, workshopConfig, occasions } from "../workshop-config";
import { PrivateWorkshopForm } from "./workshop-form";
import { BrandLockup } from "./brand-lockup";

const navigation = [
  ["Kearly", "/"],
  ["Wedding", "/wedding/"],
  ["Überblick", "#ueberblick"],
  ["Formenwelten", "#gestalten"],
  ["Ablauf", "#ablauf"],
  ["Preis", "#workshop"],
  ["Privat", "#privat"],
];

const editorialShapeOrder = [
  { id: "botanical", layout: "feature-wide" },
  { id: "modern", layout: "feature-side" },
  { id: "animals", layout: "mid-medium" },
  { id: "statement", layout: "mid-wide" },
  { id: "mini", layout: "mid-tall" },
  { id: "love", layout: "pair-side" },
  { id: "figures", layout: "pair-wide" },
  { id: "food", layout: "closing" },
  { id: "christmas", layout: "closing" },
  { id: "halloween", layout: "closing" },
] as const;

export function WorkshopNavigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function escape(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a
          className="brand-home"
          href="#inhalt"
          aria-label="Kearly Candle Workshop – nach oben"
        >
          <BrandLockup loading="eager" />
        </a>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button header-cta" href="#anfrage">
          Workshop anfragen <Arrow diagonal />
        </a>
        <button
          ref={button}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true" />
          {open ? "Schließen" : "Menü"}
        </button>
      </div>
      <nav
        id="mobile-nav"
        ref={menu}
        className="mobile-nav"
        aria-label="Mobile Navigation"
        hidden={!open}
      >
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <Arrow diagonal />
          </a>
        ))}
        <a href="#faq" onClick={() => setOpen(false)}>
          Häufige Fragen
          <Arrow diagonal />
        </a>
        <a className="button" href="#anfrage" onClick={() => setOpen(false)}>
          Workshop anfragen <Arrow />
        </a>
      </nav>
    </header>
  );
}
export function FormCategoryCard({
  world,
  index = 0,
  layout = "closing",
}: {
  world: (typeof shapeWorlds)[number];
  index?: number;
  layout?: string;
}) {
  const photo = workshopConfig.categoryPhotos[world.id];
  return (
    <article
      className={`form-category-card shape-item shape-item--${layout}`}
      data-image-slot={photo.id}
      data-photo-status={photo.status}
    >
      <div
        className={
          photo.approved && photo.src
            ? "category-image category-image--photo"
            : "category-image"
        }
      >
        {photo.approved && photo.src ? (
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width ?? 880}
            height={photo.height ?? 660}
            loading="lazy"
          />
        ) : (
          <CategoryArtwork tone={world.tone} />
        )}
      </div>
      <div className="category-copy">
        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <h3>{world.name}</h3>
        <p>{world.subtitle}</p>
      </div>
    </article>
  );
}
export function ShapeLibrary() {
  const worldsById = new Map(shapeWorlds.map((world) => [world.id, world]));
  const orderedWorlds = editorialShapeOrder
    .map((entry) => {
      const world = worldsById.get(entry.id);
      return world ? { world, layout: entry.layout } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return (
    <section
      className="shape-library"
      id="gestalten"
      aria-labelledby="library-title"
    >
      <div className="wrap">
        <div className="section-heading library-heading">
          <div>
            <p className="eyebrow">01 / FORMENWELTEN</p>
            <h2 id="library-title">
              Formenwelten für eure <em>eigenen Kerzen.</em>
            </h2>
          </div>
          <div>
            <p>
              Von floralen Blüten und klaren Skulpturen über Tiere und
              Mini-Kerzen bis zu saisonalen Motiven: Ihr wählt eure Favoriten
              direkt vor Ort aus.
            </p>
            <p className="library-availability">
              Welche einzelnen Formen an eurem Termin dabei sind, kann
              variieren – eure endgültige Auswahl trefft ihr live am
              Workshoptisch.
            </p>
          </div>
        </div>
        <div className="form-category-grid shape-editorial-grid">
          {orderedWorlds.map(({ world, layout }, i) => (
            <FormCategoryCard
              key={world.id}
              world={world}
              index={i}
              layout={layout}
            />
          ))}
        </div>
        <div className="library-bottom">
          <p>
            Eine Wunschform aus den Beispielen ist keine garantierte
            Reservierung – im Workshop steht euch immer eine vielfältige
            Auswahl bereit.
          </p>
          <div className="library-bottom-links">
            <a className="text-link" href="#farbe-duft">
              Weiter zu Farbe &amp; Duft <Arrow diagonal />
            </a>
            <a className="text-link" href="#anfrage">
              Workshop anfragen <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const occasionLabels: Record<string, string> = {
  Freundesgruppe: "Freunde",
  "Paare / Date Night": "Date Night",
  Firmenevent: "Firmenevent",
};
export function PrivateInquiry({
  occasion,
  setOccasion,
}: {
  occasion: string;
  setOccasion: (value: string) => void;
}) {
  return (
    <div className="wrap private-inquiry" id="anfrage">
      <div className="inquiry-intro">
        <p className="eyebrow">EIN PLATZ FÜR EURE IDEEN</p>
        <h3>
          Was habt
          <br />
          ihr <em>vor?</em>
        </h3>
        <p>
          Erzähl uns von eurer Runde und eurem Wunschtermin am Wochenende. Gib
          den Veranstaltungsort mit Postleitzahl im Nachrichtenfeld an.
        </p>
        <p className="muted">Deine Anfrage ist unverbindlich. Für eure private Gruppe erhaltet ihr ein individuelles Angebot.</p>
        <div className="request-next">
          <h3>Und danach?</h3>
          <ol>
            <li>
              <span>01</span>Wir prüfen euren Wunschtermin.
            </li>
            <li>
              <span>02</span>Wir besprechen eure Wünsche und das Angebot.
            </li>
            <li>
              <span>03</span>Wenn alles passt, vereinbaren wir euren Termin.
            </li>
          </ol>
        </div>
      </div>
      <PrivateWorkshopForm occasion={occasion} setOccasion={setOccasion} />
    </div>
  );
}
export function PrivateWorkshops({
  formOnly = false,
  storyOnly = false,
  initialOccasion = "",
}: {
  formOnly?: boolean;
  storyOnly?: boolean;
  initialOccasion?: string;
}) {
  const [occasion, setOccasion] = useState(initialOccasion);
  if (formOnly)
    return <PrivateInquiry occasion={occasion} setOccasion={setOccasion} />;
  return (
    <section
      className="private-section"
      id="privat"
      aria-labelledby="private-title"
    >
      <div className="wrap private-story">
        <div>
          <p className="eyebrow">ZUSAMMEN WIRD’S PERSÖNLICH</p>
          <h2 id="private-title">
            Private Kerzenworkshops.{" "}
            <br />
            <em>Für eure Runde.</em>
          </h2>
          <p>
            Ob JGA, Geburtstag, Date Night oder kreativer Nachmittag mit
            Freunden – fragt euren privaten Kearly Candle Workshop individuell
            an.
          </p>
          <div
            className="occasion-tags"
            aria-label="Anlässe für private Workshops"
          >
            {occasions.map((name) => (
              <a
                key={name}
                href={
                  storyOnly
                    ? `/design-system?view=inquiry&occasion=${encodeURIComponent(name)}`
                    : "#anfrage"
                }
                aria-current={occasion === name ? "true" : undefined}
                className={occasion === name ? "is-selected" : ""}
                aria-label={`Gruppenanfrage für ${name}`}
                onClick={() => {
                  setOccasion(name);
                  if (!storyOnly)
                    requestAnimationFrame(() =>
                      document
                        .getElementById("occasion")
                        ?.focus({ preventScroll: true }),
                    );
                }}
              >
                {occasionLabels[name] || name}
                {occasion === name ? <span aria-hidden="true"> ✓</span> : null}
              </a>
            ))}
          </div>
          <a
            className="button"
            href={storyOnly ? "/design-system?view=inquiry" : "#anfrage"}
          >
            Private Gruppe anfragen <Arrow />
          </a>
        </div>
        <div className="private-visual">
          <StudioMedia slot={workshopConfig.imageSlots.group} kind="together" />
          <span className="private-image-note">
            Ein gemeinsamer Moment. Eure eigenen Ideen.
          </span>
        </div>
      </div>
      {!storyOnly ? (
        <PrivateInquiry occasion={occasion} setOccasion={setOccasion} />
      ) : null}
    </section>
  );
}
export function MobileWorkshopCTA() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const hero = document.querySelector(".hero");
    const form = document.getElementById("anfrage");
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setHidden(visible.size > 0);
      },
      { rootMargin: "-40px 0px -40px 0px", threshold: 0 },
    );
    if (hero) observer.observe(hero);
    if (form) observer.observe(form);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`mobile-sticky ${hidden ? "is-hidden" : ""}`}>
      <a className="button" href="#anfrage">
        Workshop anfragen
        <Arrow />
      </a>
    </div>
  );
}
