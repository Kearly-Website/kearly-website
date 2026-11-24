import { Arrow, Spark } from "./atelier-art";
import { StudioMedia } from "./studio-media";
import { brand } from "../brand";
import { faqItems, workshopConfig, finishText, WORKSHOP_MAX_PARTICIPANTS } from "../workshop-config";
import { BrandLockup } from "./brand-lockup";
import { getLegalLinks } from "../legal-links";

export function WorkshopHero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">MOBILER KERZENWORKSHOP · BOCHUM & UMGEBUNG</p>
        <h1 id="hero-title">
          Euer Kerzenworkshop.<br />
          <em>Bei euch vor Ort.</em>
        </h1>
        <p className="hero-description">
          Gießt gemeinsam eure eigenen Designkerzen – mit euren Lieblingsformen,
          Farbe und Duft. Ich bringe den Workshop am Wochenende zu euch.
        </p>
        <p>Im Umkreis von 70 km um Bochum. Weitere Anfahrt mit Pauschale.</p>
        <div className="hero-facts">
          <strong>
            39 €<span>pro Person · öffentlicher Workshop</span>
          </strong>
          <span>ca. 2,5–3 Stunden</span>
          <span>in der Regel 3–4 Kerzen</span>
          <span>4–{WORKSHOP_MAX_PARTICIPANTS} Personen</span>
        </div>
        <div className="hero-actions">
          <a className="button" href="#anfrage">
            Workshop anfragen <Arrow />
          </a>
          <a className="text-link" href="#workshop">
            Leistungen &amp; Preis <Arrow diagonal />
          </a>
        </div>
        <p className="hero-request-note">Unverbindlich anfragen. Für private Gruppen stimmen wir Preis und Umfang individuell ab.</p>
      </div>
      <div className="hero-visual">
        <StudioMedia slot={workshopConfig.imageSlots.hero} kind="pouring" />
      </div>
    </section>
  );
}

export function WorkshopExperience() {
  return (
    <section
      className="glance wrap"
      id="ueberblick"
      aria-labelledby="glance-title"
    >
      <div className="glance-heading">
        <h2 id="glance-title">Der Workshop auf einen Blick</h2>
        <p>Kleine Runde. Große Auswahl. Viel Raum für deine Ideen.</p>
      </div>
      <dl className="glance-facts">
        <div>
          <dt>3–4</dt>
          <dd>
            Eigene Kerzen<span>in der Regel</span>
          </dd>
        </div>
        <div>
          <dt>Formenwelten</dt>
          <dd><a href="#gestalten">Alle Kategorien ansehen</a></dd>
        </div>
        <div>
          <dt>Max. {WORKSHOP_MAX_PARTICIPANTS}</dt>
          <dd>Personen in der Gruppe</dd>
        </div>
        <div>
          <dt>2,5–3 h</dt>
          <dd>Workshopzeit</dd>
        </div>
        <div>
          <dt>Inklusive</dt>
          <dd>
            Farbe &amp; Duft<span>duftfrei möglich</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}

export function ColorScentSelection() {
  return (
    <section
      className="color-scent"
      id="farbe-duft"
      aria-labelledby="selection-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <h2 id="selection-title">
            Mach sie zu <em>deinen.</em>
          </h2>
          <p>
            Deine Form steht fest? Mit Farbe und Duft gibst du deinen Kerzen
            ihren eigenen Charakter.
          </p>
        </div>
        <div className="selection-editorial">
          <div className="color-story">
            <StudioMedia slot={workshopConfig.imageSlots.colors} kind="color" />
            <div>
              <span className="section-number">02 / FARBE</span>
              <h3>Deine Idee bekommt Farbe.</h3>
              <p>
                Farbe ist im Workshoppreis inklusive. Deinen Farbton wählst du
                aus der aktuellen Auswahl direkt im Workshop.
              </p>
            </div>
          </div>
          <div className="scent-story">
            <StudioMedia slot={workshopConfig.imageSlots.scents} kind="scent" />
            <span className="section-number">03 / DUFT</span>
            <h3>Mit Duft. Oder ganz pur.</h3>
            <p>
              Duft ist im Workshoppreis inklusive. Deinen Favoriten wählst du
              vor Ort aus den verfügbaren Optionen – oder du gießt deine Kerzen
              ganz ohne Duft.
            </p>
            <span className="quiet-chip">
              Duft inklusive · duftfrei möglich
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export const processSteps = [
  ["Ankommen", "Lerne den Workshop, die Materialien und den Ablauf kennen."],
  [
    "Formen entdecken",
    "Wähle deine Favoriten aus der aktuell verfügbaren Workshopauswahl.",
  ],
  [
    "Farbe & Duft wählen",
    "Entscheide dich für deine persönliche Gestaltung – mit Duft oder ganz ohne.",
  ],
  [
    "Wachs & Formen vorbereiten",
    "Gemeinsam bereiten wir Wachs, Formen und die nächsten Arbeitsschritte vor.",
  ],
  ["Gießen", "Jetzt entstehen aus deinen Ideen deine eigenen Designkerzen."],
  ["Fertigstellen", finishText],
];
export function WorkshopProcess() {
  return (
    <section
      className="process-section wrap"
      id="ablauf"
      aria-labelledby="process-title"
    >
      <div className="process-intro">
        <h2 id="process-title">So läuft dein Workshop ab</h2>
        <p>Du gestaltest. Wir begleiten dich.</p>
      </div>
      <ol className="process-steps">
        {processSteps.map(([name, text], i) => (
          <li key={name}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{name}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function OpeningSpecial() {
  const selectedDates = workshopConfig.dates.filter(
    (date) =>
      date.opening && workshopConfig.opening.selectedDateIds.includes(date.id),
  );
  if (!workshopConfig.opening.enabled || selectedDates.length === 0)
    return null;
  return (
    <aside className="opening-special">
      <span className="eyebrow">OPENING SPECIAL</span>
      <p>
        <strong>35 €</strong> statt <s>39 €</s>
        <span>Nur bei ausgewählten Opening-Terminen.</span>
      </p>
    </aside>
  );
}
export function WhatsIncluded() {
  return (
    <section
      className="price-section wrap"
      id="workshop"
      aria-labelledby="price-title"
    >
      <div className="price-story">
        <p className="eyebrow">ÖFFENTLICHER WORKSHOP</p>
        <h2 id="price-title">
          Dein Kearly <em>Candle Workshop</em>
        </h2>
        <div className="price-amount">
          <strong>39 €</strong>
          <span>pro Person</span>
        </div>
        <p className="price-time">ca. 2,5–3 Stunden · 4–{WORKSHOP_MAX_PARTICIPANTS} Personen</p>
        <a href="#anfrage" className="button">
          Workshop anfragen <Arrow />
        </a>
        <p><a className="text-link" href="#termine">Wochenendtermine &amp; Anfahrt</a></p>
      </div>
      <div className="price-inclusions">
        <ul>
          {workshopConfig.included.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="group-benefit">
          Maximal {WORKSHOP_MAX_PARTICIPANTS} Personen pro Workshop geben dir genug Raum für deine Ideen,
          Fragen und persönliche Unterstützung.
        </p>
        <OpeningSpecial />
      </div>
    </section>
  );
}

export function WorkshopDates() {
  return (
    <section
      className="dates-section wrap"
      id="termine"
      aria-labelledby="dates-title"
    >
      <div>
        <h2 id="dates-title">Wochenendtermine auf Anfrage</h2>
      </div>
      <div className="dates-content">
        <p>
          Ich komme zu euch im Umkreis von {workshopConfig.location.radiusKm} km
          um {workshopConfig.location.city}. Für weitere Anfahrten fällt eine
          Anfahrtspauschale an.
        </p>
        <a href="#anfrage" className="text-link">
          Workshop anfragen <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}

export function WorkshopGallery() {
  return (
    <section
      className="gallery-section wrap"
      id="einblicke"
      aria-labelledby="gallery-title"
    >
      <div className="section-heading">
        <h2 id="gallery-title">
          So fühlt sich <em>kreativ sein</em> an.
        </h2>
        <p>
          Materialien, Formen, Farben und der Moment, in dem aus deiner Idee
          eine eigene Kerze wird.
        </p>
      </div>
      <div className="gallery-grid">
        <figure>
          <StudioMedia
            slot={workshopConfig.imageSlots.pouring}
            kind="pouring"
            compact
          />
          <figcaption>01 / Mit den Händen gestalten.</figcaption>
        </figure>
        <figure>
          <StudioMedia
            slot={workshopConfig.imageSlots.materials}
            kind="materials"
          />
          <figcaption>02 / Materialien entdecken.</figcaption>
        </figure>
        <figure>
          <StudioMedia slot={workshopConfig.imageSlots.group} kind="together" />
          <figcaption>03 / Gemeinsam kreativ werden.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function WorkshopFAQ() {
  return (
    <section className="faq-section wrap" id="faq" aria-labelledby="faq-title">
      <div>
        <p className="eyebrow">GUT ZU WISSEN</p>
        <h2 id="faq-title">
          Noch eine <em>Frage?</em>
        </h2>
      </div>
      <div className="faq-list">
        {faqItems.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span className="plus" aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function WorkshopCTA() {
  return (
    <section className="final-cta">
      <div className="wrap">
        <p className="eyebrow">KEARLY CANDLE STUDIO</p>
        <h2>
          Deine Ideen.
          <br />
          <em>Deine Designkerzen.</em>
        </h2>
        <a className="button button-light" href="#anfrage">
          Workshop anfragen <Arrow />
        </a>
        <Spark className="final-spark" />
      </div>
    </section>
  );
}
export function WorkshopFooter() {
  const legalLinks = getLegalLinks();
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <a
          className="brand-home"
          href="#inhalt"
          aria-label="Kearly – nach oben"
        >
          <BrandLockup />
        </a>
        <p>
          Von dir gestaltet.
          <br />
          Mit Liebe gegossen.
        </p>
        <nav aria-label="Footernavigation">
          <a href="#gestalten">Formen-Kategorien</a>
          <a href="#workshop">Workshop & Preis</a>
          <a href="#privat">Private Workshops</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}
        </span>
        <div>
          {legalLinks.imprint ? (
            <a href={legalLinks.imprint}>Impressum</a>
          ) : null}
          {legalLinks.privacy ? (
            <a href={legalLinks.privacy}>Datenschutz</a>
          ) : null}
          <a href="#anfrage-hinweise">Hinweise zur Anfrage</a>
        </div>
      </div>
    </footer>
  );
}
