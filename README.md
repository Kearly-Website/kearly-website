# Kearly – Bearbeitung in Google AI Studio

Stand: 25.11.2026. Das Projekt wurde in Google AI Studio importiert, mit GitHub verbunden und in beide Richtungen abgeglichen. Die mobile Vorschau einschließlich Navigation und Formularvalidierung wurde geprüft.

**Veröffentlichungsstatus:** Der kostenlose Cloudflare-Pages-Build ist vorbereitet. Die Anmeldung und Repository-Verbindung bei Cloudflare sowie die anschließende Aktivierung auf kearly.de fehlen noch. Ein GitHub-Push verändert derzeit die bestehende Website nicht. Googles eigener Publish-Versuch ist gescheitert; eine kostenpflichtige Google-Cloud-Abrechnung wurde nicht eingerichtet.

## Bearbeiten und später veröffentlichen

1. [Google-AI-Studio-Projekt öffnen](https://aistudio.google.com/apps/92325684-cd6d-4e51-8e11-93bbed953b00?showAssistant=true&showPreview=true).
2. Vor neuen Arbeiten in Settings → GitHub den Sync-Status prüfen und angebotene Änderungen aus GitHub mit Pull übernehmen. Bei lokalen Änderungen zuerst die Unterschiede prüfen und sichern.
3. Den gewünschten Auftrag eingeben und die Vorschau einschließlich mobiler Ansicht kontrollieren.
4. Änderungen in Settings → GitHub prüfen und mit Push speichern. Arbeitsbranch: `codex/ai-studio-import`.
5. **Nach der noch ausstehenden Cloudflare-Aktivierung:** Cloudflare baut und veröffentlicht nach jedem Push auf diesen Branch automatisch. Erst wenn der Build erfolgreich ist, wird der neue Stand ausgeliefert. Den Google-Button „Publish“ brauchen wir für diesen Weg nicht.

Beispielauftrag: „Überarbeite den Workshop-Hero passend zur Kearly-Wortmarke. Behalte den Preis von 39 €, die bestehenden URLs und die funktionierenden relativen Formularadressen bei. Prüfe das Menü in mobiler Ansicht.“

## Einmalige kostenlose Hosting-Einrichtung

Bei Cloudflare **Workers & Pages → Create application → Pages → Connect to Git** auswählen. GitHub-Zugriff auf dieses Repository begrenzen:

| Einstellung | Wert |
| --- | --- |
| Repository | `Kearly-Website/kearly-website` |
| Produktionsbranch | `codex/ai-studio-import` |
| Framework preset | None |
| Build command | `npm run build:pages` |
| Build output directory | `out` |
| Root directory | Repository-Hauptverzeichnis |
| Node.js | 22, über `.node-version` |
| Bezahlte Dienste / API-Schlüssel | Für diesen statischen Build nicht erforderlich |

Cloudflare Free unterstützt derzeit 500 Builds pro Monat, 20.000 Dateien und 25 MiB je Datei. [Limits](https://developers.cloudflare.com/pages/platform/limits/). [GitHub-Anbindung](https://developers.cloudflare.com/pages/configuration/git-integration/). GitHub Pages wird wegen der Einschränkungen für Unternehmenswebsites nicht verwendet.

Nach dem ersten erfolgreichen Build die **tatsächlich zugeteilte stabile `https://….pages.dev`-Adresse** in diesem Codex-Chat übernehmen lassen. Erst nach Prüfung wird der vorbereitete Sites-Proxy aktiviert. Keine temporäre Vorschauadresse verwenden und die Domain nicht umziehen.

## Was automatisch übernommen wird

Öffentliche Gestaltung, Texte, Komponenten und lokale Bilder werden statisch gebaut. Der Build prüft Seiten, Überschriften, Canonicals und lokale Script-/Bilddateien. Neue normale App-Seiten werden automatisch erkannt. Dynamische Routen müssen vollständig vorgerendert sein. Neue serverseitige Funktionen, Server Actions, Datenbanken oder externe KI-Aufrufe erfordern eine eigene Backend-Integration.

Kundendaten, Anfragen, Anmeldung und Fotoverwaltung bleiben beim bestehenden geschützten Sites-Backend. Im Browser unter kearly.de erreichen relative `/api/…`-Adressen dieses Backend. Die technische `pages.dev`-Adresse ist kein Kundenportal, wird auf `noindex` gesetzt und bietet keine eigene Anfragenspeicherung. Eine Vorschau darf nie erfolgreichen Versand behaupten, wenn nichts gespeichert wurde.

Impressum, Datenschutz, robots.txt, Sitemap, Weiterleitungen sowie geschützte Verwaltungsbereiche werden von Sites bereitgestellt. Änderungen daran hier im Codex-Chat umsetzen und veröffentlichen lassen. Neue öffentliche URLs zusätzlich in die produktive Sitemap aufnehmen lassen. Das Schema vorhandener APIs und der Zugriffsschutz dürfen nicht beiläufig verändert werden.

## Dateien für Designänderungen

| Bereich | Dateien |
| --- | --- |
| Dachmarken-Startseite | `wedding/home.html`, `public/marke/assets/` |
| Workshop | `app/components/workshop-landing.tsx`, `workshop-sections.tsx`, `workshop-interactions.tsx` |
| Workshop-Formular | `app/components/workshop-form.tsx` |
| Farben und Layout | `app/globals.css`, `app/v07.css`, `app/design-tokens.ts` |
| Angebot | `app/workshop-config.ts` |
| Logo | `public/brand/kearly-candle-workshop-wortmarke.svg`, `app/brand.ts` |
| Wedding | `wedding/site/` |
| Kostenloser Hosting-Build | `scripts/build-pages.mjs` |

## Angebot erhalten

Kearly ist die Dachmarke. Mobiler Workshop am Wochenende, Bochum und Umgebung bis **50 km (vom Eigentümer am 26.11.2026 bestätigt)**; darüber hinaus Anfahrtspauschale. Öffentliches Angebot: **39 € pro Person, 4–9 Personen, ca. 2,5–3 Stunden, in der Regel 3–4 eigene Kerzen**. Form, Farbe und Duft selbst wählen; duftfrei möglich. Private Gruppen individuell anfragen und bepreisen. Keine erfundenen Termine, Bewertungen oder Verfügbarkeiten ergänzen. Historische Dokumente in `docs/` können frühere Angaben enthalten; maßgeblich ist die aktuelle Konfiguration.

Die versionierten Wedding-Seiten liegen unter `wedding/site/`. AI Studio ließ die früher unter `wedding/dist/` gespeicherten Quelldateien beim Abgleich aus. Die öffentlichen `/wedding/…`-Adressen bleiben gleich. Für den kostenlosen Pages-Export verwenden wir den regulären Next-Produktionsserver, keinen Cloud-Run-Standalone-Build; der Startwrapper erzwingt beim Build weiterhin `NODE_ENV=production`.

Die vorhandenen Raum- und Motivbilder sind keine belegten Kearly-Workshopnachweise. Bildtexte und Metadaten beschreiben sie neutral als Symbolbild bzw. Gestaltungsidee. Foto-Uploads aus der bestehenden Bildverwaltung behalten Vorrang. Bei bestätigten eigenen Aufnahmen Bildbeschreibungen und Bildunterschriften passend aktualisieren.

## Lokal prüfen

Node.js mindestens 22.13.0:

```sh
npm ci
npm run dev
npm run build:pages
```

Die Google-Vorschau verwendet Next.js mit Webpack. `build:pages` baut zunächst Next, startet kurz einen eigenen lokalen Produktionsserver und erzeugt ausschließlich die öffentliche Präsentation unter `out/`. Der GitHub-Workflow „Check free website build“ prüft denselben Build auf Linux und stellt das Ergebnis als kurzzeitig verfügbares Artefakt bereit. Er veröffentlicht selbst noch keine Website.

Das ursprüngliche Sites-Paket liegt im Backup-Branch `codex/backup-v14-2026-11-25`, Commit `ad22ec3f326ef11a7fe152c6d17497bf32658e81`. Die bestehende öffentliche Website ist weiterhin Sites-Version 14. Der ursprüngliche Quellstand ist `c87735cfb0261ef5af337081e734b274ec43378c`. Die alte Übergabeanleitung unter `docs/README-UEBERGABE-V14.md` ist historisch.
