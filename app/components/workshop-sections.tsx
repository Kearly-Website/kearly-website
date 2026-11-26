/* eslint-disable @next/next/no-html-link-for-pages -- Static HTML routes (/ and /wedding/) require full document navigation. */
import { Arrow, Spark } from "./atelier-art";
import { StudioMedia } from "./studio-media";
import { brand } from "../brand";
import { faqItems, workshopConfig, finishText, WORKSHOP_MAX_PARTICIPANTS } from "../workshop-config";
import { BrandLockup } from "./brand-lockup";
import { getLegalLinks } from "../legal-links";

export function WorkshopHero() {
  const { city, radiusKm } = workshopConfig.location;
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          MOBILER KERZENWORKSHOP · {city.toUpperCase()} &amp; UMGEBUNG BIS {radiusKm} KM
        </p>
        <h1 id="hero-title">
          Mobiler Kerzenworkshop in {city}{" "}
          <br />
          <em>und Umgebung.</em>
        </h1>
        <p className="hero-description">
          Gießt am Wochenende eure eigenen Designkerzen direkt bei euch vor Ort
          – im Umkreis von {radiusKm} km rund um {city}. Form, Farbe und Duft
          wählt ihr selbst, auch komplett duftfrei.
        </p>
        <dl className="hero-keyfacts" aria-label="Wichtige Eckdaten zum Kerzenworkshop">
          <div>
            <dt>39 €</dt>
            <dd>pro Person · öffentlich</dd>
          </div>
          <div>
            <dt>4–{WORKSHOP_MAX_PARTICIPANTS} Personen</dt>
            <dd>kleine Runde</dd>
          </div>
          <div>
            <dt>ca. 2,5–3 Std.</dt>
            <dd>meist 3–4 Kerzen</dd>
          </div>
          <div>
            <dt>Privat</dt>
            <dd>individuell anfragen</dd>
          </div>
        </dl>
        <div className="hero-actions">
          <a className="button" href="#anfrage">
            Workshop anfragen <Arrow />
          </a>
          <a className="text-link" href="#gestalten">
            Formenwelten ansehen <Arrow diagonal />
          </a>
        </div>
        <p className="hero-request-note">
          Unverbindliche Anfrage für Wochenendtermine. Weitere Anfahrten über{" "}
          {radiusKm} km sind mit Anfahrtspauschale möglich.
        </p>
      </div>
      <figure className="hero-visual">
        <StudioMedia slot={workshopConfig.imageSlots.hero} kind="pouring" />
        <figcaption className="hero-photo-caption">
          Mobiler Kearly Candle Workshop – mit Formen, Farben und persönlicher Begleitung bei euch vor Ort.
        </figcaption>
      </figure>
    </section>
  );
}

export function WorkshopExperience() {
  const { city, radiusKm } = workshopConfig.location;
  return (
    <section
      className="overview-section wrap"
      id="ueberblick"
      aria-labelledby="overview-title"
    >
      <div className="overview-header">
        <div>
          <p className="eyebrow">AUF EINEN BLICK</p>
          <h2 id="overview-title">
            Was Kearly anbietet – und wie euer <em>Workshop</em> funktioniert.
          </h2>
        </div>
        <p className="overview-lead">
          Alle wichtigen Antworten zu Angebot, Einsatzgebiet, Auswahl, Preis und
          Ablauf der Anfrage – klar und ohne Umwege.
        </p>
      </div>
      <div className="overview-grid">
        <div className="overview-media">
          <figure className="overview-figure">
            <StudioMedia slot={workshopConfig.imageSlots.results} kind="materials" />
            <figcaption>
              Handgegossene Designkerzen von Kearly – Form, Farbe und Duft gestaltet ihr selbst.
            </figcaption>
          </figure>
          <div className="overview-crosslink">
            <span>Ihr plant eine Hochzeit?</span>
            <a className="text-link" href="/wedding/">
              Zu Kearly Wedding <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="overview-body">
          <dl className="overview-qa">
            <div>
              <dt>Was bietet Kearly an?</dt>
              <dd>
                Einen mobilen Kerzengieß-Workshop in kleiner Runde (4–{WORKSHOP_MAX_PARTICIPANTS} Personen).
                In etwa 2,5–3 Stunden entstehen meist 3–4 eigene Designkerzen – persönlich begleitet vom ersten Gießen bis zum Finish.
              </dd>
            </div>
            <div>
              <dt>Wo und wann findet es statt?</dt>
              <dd>
                Am Wochenende mobil bei euch vor Ort – rund um {city} bis {radiusKm} km.
                Für weiter entfernte Orte außerhalb dieses Umkreises fällt eine Anfahrtspauschale an.
              </dd>
            </div>
            <div>
              <dt>Was ist enthalten &amp; was wähle ich selbst?</dt>
              <dd>
                Wachs, Werkzeuge, Zugang zur{" "}
                <a href="#gestalten">Formenbibliothek</a> sowie{" "}
                <a href="#farbe-duft">Farbe und Duft</a> sind im Preis enthalten.
                Form, Farbton und Duft wählt ihr vor Ort selbst – auf Wunsch gießt ihr komplett duftfrei.
              </dd>
            </div>
            <div>
              <dt>Was kostet der Workshop?</dt>
              <dd>
                Das öffentliche Angebot kostet <strong>39 € pro Person</strong>.
                Für <a href="#privat">private Gruppen</a> – etwa JGA, Geburtstag, Freundeskreis oder Team – erstellen wir nach eurer Anfrage ein individuelles Angebot.
              </dd>
            </div>
            <div>
              <dt>Wie läuft die Anfrage ab?</dt>
              <dd>
                Über das <a href="#anfrage">Anfrageformular</a> schickt ihr unverbindlich Wunschtermin am Wochenende, Personenanzahl und Ort (mit PLZ). Wir prüfen die Verfügbarkeit, stimmen eure Wünsche ab und vereinbaren erst dann verbindlich euren Termin.
              </dd>
            </div>
          </dl>
          <div className="overview-actions">
            <a className="text-link" href="#anfrage">
              Unverbindlich anfragen <Arrow diagonal />
            </a>
            <a className="text-link" href="#workshop">
              Alle Leistungen im Detail <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
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
            Farbe &amp; Duft frei wählen – <em>auch duftfrei.</em>
          </h2>
          <p>
            Deine Form steht fest? Mit Farbe und Duft gibst du deinen Kerzen
            ihren eigenen Charakter – oder hältst sie ganz pur.
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
        <h2 id="process-title">So läuft dein mobiler Kerzenworkshop ab</h2>
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
          Preis &amp; Leistungen im <em>Candle Workshop</em>
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
        <h2 id="dates-title">
          Wochenendtermine in {workshopConfig.location.city} &amp; Umgebung (bis{" "}
          {workshopConfig.location.radiusKm} km)
        </h2>
      </div>
      <div className="dates-content">
        <p>
          Ich komme am Wochenende zu euch im Umkreis von{" "}
          {workshopConfig.location.radiusKm} km um {workshopConfig.location.city}.
          Für weitere Anfahrten fällt eine Anfahrtspauschale an.
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
          Häufige Fragen zum <em>Kerzenworkshop</em>
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
          <a href="/">Kearly Startseite</a>
          <a href="/wedding/">Kearly Wedding</a>
          <a href="#ueberblick">Überblick</a>
          <a href="#gestalten">Formenwelten</a>
          <a href="#workshop">Preis &amp; Leistungen</a>
          <a href="#privat">Private Gruppen</a>
          <a href="#faq">FAQ</a>
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
