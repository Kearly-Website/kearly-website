/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids the observed Vinext/Next Link runtime incompatibility. */

import { Arrow } from "./atelier-art";
import { designTokens } from "../design-tokens";
import { finishText, shapeWorlds } from "../workshop-config";
import { FormCategoryCard, ShapeLibrary } from "./workshop-interactions";
import { WorkshopDates } from "./workshop-sections";
import { BrandWordmark, BrandLockup } from "./brand-lockup";

export const designViews = [
  ["full", "Gesamte Website"],
  ["hero", "Hero"],
  ["usp", "USP-System"],
  ["forms", "Formenbibliothek"],
  ["categories", "Kategorie-Cards"],
  ["selection", "Form / Farbe / Duft"],
  ["price", "Workshop & Preis"],
  ["private", "Private Runde"],
  ["booking", "Terminstatus"],
  ["inquiry", "Private Anfrage"],
  ["faq", "FAQ"],
  ["library", "Komponenten"],
];
export function DesignBar() {
  return (
    <header className="design-bar">
      <a href="/design-system">
        <BrandLockup />
      </a>
      <span>UX/UI V0.7 · DESIGNANSICHT</span>
      <a href="/">Zur Website ↗</a>
    </header>
  );
}
export function BookingPreview() {
  return <WorkshopDates />;
}
export function CategoryStudy() {
  return <ShapeLibrary />;
}

export function ComponentLibrary() {
  return (
    <div className="wrap design-library">
      <p className="eyebrow">KEARLY CANDLE STUDIO / V0.7</p>
      <h1>
        Ruhe trifft <em>Kreativität.</em>
      </h1>
      <p>
        Das visuelle System für Kearly Candle Studio. Die folgenden Zustände
        sind als Gestaltungsvorlagen gekennzeichnet.
      </p>
      <nav className="design-nav" aria-label="Designansichten">
        {designViews.map(([view, label]) => (
          <a href={`/design-system?view=${view}`} key={view}>
            {label} ↗
          </a>
        ))}
      </nav>
      <section className="kit-section">
        <h2>00 / Das Markenzeichen</h2>
        <div className="kit-brand">
          <BrandWordmark />
          <div>
            <h3>Kearly Candle Workshop</h3>
            <p>
              Die bereitgestellte Wortmarke steht für das Workshopangebot.
              Kearly Candle Studio bleibt der Absender.
            </p>
            <p className="kit-note">
              Original-SVG · in Navigation und Footer
            </p>
          </div>
        </div>
      </section>
      <section className="kit-section">
        <h2>01 / Farben</h2>
        <div className="token-grid">
          {Object.entries(designTokens.colors).map(([name, hex]) => (
            <div className="token-swatch" key={name}>
              <span style={{ background: hex }} />
              <p>{name}</p>
              <code>{hex}</code>
            </div>
          ))}
        </div>
      </section>
      <section className="kit-section">
        <h2>02 / Typografie</h2>
        <div className="type-samples">
          <div>
            <h3>
              Deine Ideen.
              <br />
              <em>Deine Designkerzen.</em>
            </h3>
            <small>Instrument Serif · Regular & Italic · Headlines</small>
          </div>
          <div>
            <p>
              DM Sans bringt Klarheit in Informationen, Formulare und nächste
              Schritte. Die Serifenschrift schafft die editoriale Verbindung zur
              Kearly Markenfamilie.
            </p>
            <small>DM Sans · 400 / 500 / 600 · lokal geladene Schriften</small>
          </div>
        </div>
      </section>
      <section className="kit-section">
        <h2>03 / Raum & Raster</h2>
        <div className="spacing-grid">
          {designTokens.spacing.map((space) => (
            <div key={space} style={{ height: space + 24 }}>
              {space}
            </div>
          ))}
        </div>
        <p className="kit-note">
          8-px-Rhythmus · Desktop 1440 / Inhalt 1200 px · Mobile 390 / Rand 20
          px · Kategorien 3 bzw. 2 Spalten
        </p>
      </section>
      <section className="kit-section">
        <h2>04 / Aktionen & Fokus</h2>
        <div className="kit-buttons">
          <a className="button" href="/#termine">
            Termine &amp; Infos <Arrow />
          </a>
          <a className="button button-outline" href="/#privat">
            Private Gruppe <Arrow />
          </a>
          <a className="text-link kit-focus" href="/#gestalten">
            Formenwelt · Fokusbeispiel <Arrow />
          </a>
        </div>
        <p className="kit-note">
          Primär 54 px · interaktive Flächen mindestens 44 px hoch · sichtbarer
          3-px-Fokusring · reale Info-Navigation
        </p>
      </section>
      <section className="kit-section">
        <h2>05 / Eingaben & Zustände</h2>
        <div className="kit-grid">
          <div className="field">
            <label htmlFor="kit-name">Name · Standard</label>
            <input id="kit-name" placeholder="Vor- und Nachname" />
          </div>
          <div className="field">
            <label htmlFor="kit-focus">Name · Fokusbeispiel</label>
            <input
              id="kit-focus"
              className="kit-focus"
              placeholder="Vor- und Nachname"
            />
          </div>
          <div className="field">
            <label htmlFor="kit-error">E-Mail · Fehlerbeispiel</label>
            <input
              id="kit-error"
              className="sample-error"
              aria-invalid="true"
              aria-describedby="kit-error-message"
              defaultValue="beispiel@"
            />
            <p className="kit-error" id="kit-error-message">
              Bitte gib eine gültige E-Mail-Adresse ein.
            </p>
          </div>
          <div>
            <h3>Chips · rein informativ</h3>
            <div className="kit-chips">
              <span className="quiet-chip">Duftfrei möglich</span>
              <span className="quiet-chip">Farbe inklusive</span>
            </div>
          </div>
        </div>
      </section>
      <section className="kit-section">
        <h2>06 / Karten & FAQ</h2>
        <div className="kit-grid">
          <FormCategoryCard world={shapeWorlds[0]} />
          <div className="faq-list">
            <details>
              <summary>
                Wie läuft die Abholung ab?
                <span className="plus" aria-hidden="true" />
              </summary>
              <p>{finishText}</p>
            </details>
          </div>
        </div>
      </section>
      <section className="kit-section">
        <h2>07 / Terminstatus</h2>
        <BookingPreview />
      </section>
      <section className="kit-section">
        <h2>08 / Mobile Sticky-CTA</h2>
        <div className="sticky-study">
          <a className="button" href="/#workshop">
            Termine &amp; Infos <Arrow />
          </a>
        </div>
        <p className="kit-note">
          Auf Mobilgeräten am unteren Rand. In der privaten Sektion wechselt das
          Ziel zur Anfrage; während das Formular sichtbar ist, blendet sie aus.
        </p>
      </section>
    </div>
  );
}
