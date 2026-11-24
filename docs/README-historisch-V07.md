> Historische Dokumentation aus einer früheren Workshop-Version. Für den aktuellen Übergabestand gelten die README.md im Paketstamm und der laufende Konfigurationscode.

# Kearly Candle Studio · Website V0.7

Verbindliche Inhaltsfreigabe: `docs/authority-v07.md`. Die bestehende Sites-Quelle, Komponentenstruktur, D1-Datenbank und das Original-Logo bleiben erhalten. Änderungen werden gezielt über bestehende Komponenten und `app/v07.css` umgesetzt.

## Angebot

Kearly Candle Workshop · 39 € pro Person · ca. 2,5–3 Stunden · öffentliche Gruppen 4–6 Personen · in der Regel 3–4 eigene Kerzen · bis zu 1 kg Wachs pro Person. Farbe und Duft inklusive, duftfrei möglich. Rund 300 Formen bezeichnet den Gesamtbestand; die konkrete Auswahl hängt von Verfügbarkeit, Nutzung, Größe, Zeit und Wachsrahmen ab.

## Start und Prüfung

Bestehender Stack: Vinext / React 19 / TypeScript / CSS, Cloudflare Worker mit D1 und Drizzle. Keine neue Laufzeitbibliothek für V0.7.

```sh
npm run dev
npx tsc --noEmit
npm run lint
node tests/inquiries.integration.mjs
node tests/v07-content.audit.mjs
npm run build
npm start
```

Unter Windows kann bei defektem npm.cmd `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js"` verwendet werden. Vor einem erneuten Build die gebaute Wrangler-Vorschau stoppen. Tests laufen ausschließlich gegen localhost. `TEST_ORIGIN` steuert die lokale Testadresse.

## Seiten und Komponenten

- `/`: vollständige responsive Landingpage mit genau einer H1.
- `/design-system`: Komponentenbibliothek und 13 Ansichten. `booking` zeigt den tatsächlichen Terminstatus.
- `app/workshop-config.ts`: sechs Kategorien, zehn FAQ, freigegebene Angebotsdaten, acht interne Foto-IDs, Rechts-/Standortkonfiguration.
- `app/components/workshop-sections.tsx`: Hero, USP, Farbe/Duft, Ablauf, Preis, Terminstatus, Galerie, FAQ, Footer.
- `app/components/workshop-interactions.tsx`: Navigation, Formen, Anlassauswahl, private Sektion und mobile CTA.
- `app/components/workshop-form.tsx`: acht sichtbare Felder, Validierung, echte API-Speicherung, Fehler und Erfolg.
- `app/legal-links.ts`: nur reale konfigurierte HTTP(S)-Ziele oder vorhandene freigegebene Rechtstexte verlinken.
- `app/brand.ts`: generisches SEO; Bochum nur nach bestätigter Standortkonfiguration.
- `app/v07.css`: gezielte responsive V0.7-Gestaltung, Espresso-Buttons, große mobile Kategorien.
- `tests/v07-content.audit.mjs`: 69 Inhalts-/Strukturprüfungen; fehlende Rechtsziele separat als `OPEN_P0`.

## Bilder

Das Original-PNG ist unverändert unter `public/brand/` erhalten. Verlustfreie responsive WebP-Fassungen reduzieren das ausgelieferte Logo. Keine Original-Workshopfotos vorhanden. Acht Foto-IDs sind intern vorbereitet; die reduzierte Galerie verwendet vorhandene Illustrationen mit ehrlichen Alternativtexten. Freigegebene Fotos über `src`, optional `srcSet`, `sizes`, `width`, `height`, `approved: true`, `status: "APPROVED"` eintragen. Keine acht leeren Bildflächen und keine sichtbaren P1-Labels.

## Anfrage und Veröffentlichung

Die API speichert reale Gruppenanfragen in D1; eine Anfrage ist keine Buchung. Erfolgsanzeige erst nach Speicherung. Servervalidierung, Origin-Prüfung, Honeypot, Größen-/Ratenlimit und Idempotenz bleiben erhalten. Kein automatischer E-Mail-Versand. Private Gruppen haben keine erfundene öffentliche Teilnehmerobergrenze.

Es gibt keine freigegebenen öffentlichen Termine. Direktbuchung, Warteliste und Opening-Rabatt bleiben deaktiviert. Zahlungs-, Storno-, Abhol- und private Preisregeln werden nicht erfunden.

Freigegebene Impressums-/Datenschutztexte oder URLs fehlen weiterhin (`OPEN_P0`). Die lokalen Rechtsrouten liefern deshalb 404 und werden nicht irreführend verlinkt. Der vorgesehene Datenschutzerklärungslink am Formular ist vorbereitet, aber ohne echtes Ziel noch nicht abgenommen. Bochum ist nicht bestätigt; Metadaten bleiben generisch. Neue Veröffentlichung bis zur Erfüllung der AP7/AP10-Abnahme zurückgestellt. Bestehender privater Zugriff und `noindex, nofollow` bleiben erhalten.

## Nachweise

Die V0.7-Abnahme liegt im Nutzer-Arbeitsordner unter `outputs/v07/PRUEFPROTOKOLL.md`, mit Screenshots, Maschinenberichten und statischen HTML-Ansichten. Diese Ansichten ersetzen keine interaktive Website; Formularfelder darin sind deaktiviert. Browserprüfung unter 375/390/430/768/1440 px, fünf Anlassübernahmen, zehn FAQ per Enter, Mobilmenü/Escape und reale lokale Anfrage mit nachgewiesenem D1-Datensatz. Vollständige WCAG-Zertifizierung und mobile Feldmessungen der Core Web Vitals wurden nicht durchgeführt.
