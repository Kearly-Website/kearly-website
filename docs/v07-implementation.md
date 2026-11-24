# Kearly V0.7 · Prüfprotokoll

Stand: 20.10.2026. Bestehendes Sites-Projekt appgprj_6ad29a91b130819182dee05ec37d2dc4, Ausgangsquelle e5a09c8208e17a82b19bd2b9a2454694d31306ad. Die bestehende Quelle wird weiterverwendet; kein neu angelegtes Ersatzprojekt.

## Befunde vor Änderung

- Original-Siegel und warme Farbwelt vorhanden.
- Navigation/CTA-Texte sowie Hero-Fakten noch V0.6, sechs Kategorien plus Erweiterungsbutton ohne Produktkatalog.
- Sichtbare Illustrations-/Entwicklerlabels und große redundante Kleingruppen-Sektion vorhanden.
- Reales Anfrage-Backend mit D1, gemeinsamer Validierung, Idempotenz und Fehlerbehandlung vorhanden.
- Impressums- und Datenschutztexte fehlen. Die vorbereiteten Routen liefern deshalb bislang keine freigegebenen Rechtsseiten. P0 bleibt offen.
- Workshopstandort im bestehenden Code nicht freigegeben. Bochum-SEO bis zur Bestätigung zurückstellen.
- Keine Original-Workshopfotos und keine freigegebenen öffentlichen Termine.

## Runde AP1–3

Navigation und CTA-Kette auf vorhandene Anker angepasst; kompakte Wortmarke, kleineres Siegel. Hero mit vier freigegebenen Fakten. Sechs kompakte USP-Fakten. Formenübersicht mit sechs vorhandenen Kategorien, präzisierter Verfügbarkeit und ohne irreführenden Erweiterungsbutton. Mobile Kategorieflächen werden einspaltig groß gezeigt.

Dateien: app/components/brand-lockup.tsx; workshop-interactions.tsx; workshop-sections.tsx; app/workshop-config.ts; app/layout.tsx; app/v07.css.

TypeScript, ESLint und Produktionsbuild: erfolgreich. Responsive Sichtkontrolle bei 375/390/430/768/1440 px durchgeführt; echte Browser-Screenshots liegen unter `screenshots/`.

## Offene Eingaben

Freigegebene Impressums-/Datenschutztexte oder reale URLs sowie Bestätigung von Bochum wurden angefragt. Bis dahin kein erfundener Rechtslink, keine juristische Ersatzseite und kein bestätigter Bochum-SEO-Stand.

## Abschlussstand · V0.7

Die umsetzbaren Änderungen aus AP1–AP10 sind im bestehenden Code implementiert. AP7 und AP10 bleiben wegen fehlender freigegebener Rechtsziele teilweise offen. Original-Workshopfotos sind weiter P1. Keine Veröffentlichung dieser Fassung: Die Nutzervorgabe verlangt „Erst bei bestandenem Check veröffentlichen“ sowie ein geprüftes Datenschutzziel vor Livegang. Die vorherige private Sites-Veröffentlichung wird deshalb nicht ersetzt. Die neue Quelle wird als prüfbare Version gesichert.

## Änderungen und Nachweis je Arbeitspaket

| AP | Ausgangsbefund und Änderung | Geänderte Dateien | Ergebnis / offene Abhängigkeit |
|---|---|---|---|
| 1 | Alte Navigations-/CTA-Texte, große Markendarstellung. Kompakte Wortmarke, eindeutige vorhandene Anker, Espresso-Primary, warme Abstände und gut lesbare mobile Gestaltung. | brand-lockup.tsx; workshop-interactions.tsx; v07.css; layout.tsx; design-tokens.ts | Desktop/Mobil, Menü/Escape und Links geprüft. Kleine Siegel im Hero/Footer; kein neues Logo. |
| 2 | Hero-Fakten und USP noch im alten Stand. Freigegebener Hero-Satz, genau vier Fakten und sechs kompakte USP-Angaben. | workshop-sections.tsx; v07.css | Eine H1, 39 €, Dauer, „in der Regel“, max. 6 und Wachsumfang im tatsächlichen DOM geprüft. |
| 3 | Erweiterungsbutton ohne echten Katalog und missverständliche Formenwirkung. Sechs vorhandene Kategorien, Gesamtbestand-/Verfügbarkeitstexte, keine Reservierung, große einspaltige mobile Karten. | workshop-interactions.tsx; workshop-config.ts; v07.css | Sechs Kategorien im DOM, eine Kartenbreite mobil, kein Katalog-/Erweiterungs-CTA. |
| 4 | Doppelte Auswahlbotschaft und sichtbare Illustrationslabels. „Mach sie zu deinen.“, freigegebene Farbe-/Dufttexte und ruhiger Wachsrahmen innerhalb des Bereichs. | workshop-sections.tsx; studio-media.tsx; v07.css | Wortlaut und mobile/desktop Darstellung geprüft. Duftfrei möglich; keine erfundene Farb-/Duftliste. |
| 5 | Frühere Ablaufschritte und redundante große Kleingruppensektion ohne echtes Foto. Sechs exakte Schritte, kompakte nummerierte Timeline, Gruppenbotschaft in den Preisbereich verschoben. | workshop-sections.tsx; workshop-landing.tsx; v07.css | Sechs Schritte im DOM; Kleingruppenbotschaft einmal im Preisbereich; keine Abholgarantie. |
| 6 | Unklarer Termin-CTA und unnötige Buchungsvorschau. 39 €, sieben Inklusivleistungen, „Termine ansehen“ zum echten Status, keine fiktiven Daten/Plätze, Opening nur mit tatsächlich markierten Terminen. | workshop-sections.tsx; workshop-config.ts; design-library.tsx; design-system/page.tsx; v07.css | CTA-Sprung im Browser, Statuswortlaut, sieben Leistungen und fehlende Direktbuchung geprüft. Termine bleiben offen. |
| 7 | Private Auswahl und Formulartexte noch alt. Fünf Anlass-Chips, Fokus/Übernahme, acht Felder, deutsche Datumshilfe, deutsche Validierung, unverbindlicher Erfolgszustand erst nach API-Antwort. | workshop-interactions.tsx; workshop-form.tsx; inquiry-validation.ts; legal-links.ts; design-system/page.tsx; v07.css | Fünf Auswahlwerte, Pflichtfeldfehler, lokale echte Submission und D1-Speicherung geprüft. Sieben private Personen zulässig. **OPEN_P0: echte Datenschutzerklärung fehlt.** |
| 8 | Sichtbare Entwickler-/Illustrationslabels, keine freigegebenen Workshopfotos. Drei bestehende Galerieillustrationen mit ehrlichen Alt-Texten, acht interne Foto-IDs und responsive Medienattribute vorbereitet. | workshop-config.ts; studio-media.tsx; atelier-art.tsx; workshop-sections.tsx; brand.ts; brand-lockup.tsx; public/brand/*.webp | Keine sichtbaren P1-/Atelierlabels und kein leeres Achterraster. **OPEN_P1: reale Fotos fehlen.** Original-PNG unverändert. |
| 9 | FAQ teilweise alter Wortlaut. Alle zehn freigegebenen Antworten in nativen Details/Summary, einschließlich Wachsfrage. | workshop-config.ts; workshop-sections.tsx; v07.css | Zehn Fragen gezählt und alle zehn per Enter geöffnet. Keine erfundene Gutschein-/Storno-/Take-home-Regel. |
| 10 | Footer/Metadaten und alte Zustandsansichten abgleichen. Reale Anker, eine H1, lang=de, bedingte echte Rechtslinks, generisches SEO bis Standortfreigabe, aktualisierte Komponenten-/Exportansichten. | brand.ts; layout.tsx; legal-links.ts; impressum/page.tsx; datenschutz/page.tsx; design-library.tsx; design-system/page.tsx; export-design-views.mjs; v07-content.audit.mjs; README.md | Build/TypeScript/Lint und 69 Inhaltsprüfungen erfolgreich. **OPEN_P0: Impressum und Datenschutz; Standort Bochum unbestätigt.** Vollständige rechtliche/SEO-Abnahme daher nicht PASS. |

Alle Komponenten-Dateinamen in der Tabelle gehören zu `app/components/`, Konfigurations-/CSS-Dateien zu `app/`, Tests zu `tests/`, Exportscript zu `scripts/`. Vollständige Quelle und Commit-Nachweis werden im Übergabepaket gesichert. Autorität: `docs/authority-v07.md`.

## Technische und funktionale Prüfungen

| Prüfgebiet | Tatsächlicher Nachweis | Status und Grenze |
|---|---|---|
| DESKTOP | Browser 1440 × 1000, Hero/Gesamtseite/Preis; CTA-Scroll zu Preis und echtem Terminstatus. | PASS für geprüfte Ansichten. |
| MOBILE | Browser 375/390/430 × 844 plus Tablet 768 × 1000; je Hero-Screenshot, Formular/Formen/FAQ zusätzlich auf 390 px. Kein horizontaler Overflow. | PASS für geprüfte Breiten. Kein Test auf physischem iOS-/Android-Gerät. |
| ACCESSIBILITY | Native Links/Labels/Details; Menü setzt Fokus und schließt per Escape; alle zehn FAQ per Enter; sichtbare bestehende Fokusregeln und Reduced-Motion-Regeln. Espresso-Button 12,07:1, Haupttext/Papier 11,84:1, gedämpfter Text/Papier 5,76:1. | PARTIAL_VERIFIED: Semantik, Stichproben und Tastatur geprüft. Kein vollständiger Screenreaderlauf und keine WCAG-Zertifizierung. |
| FORM | Alle fünf Chips übernehmen den korrekten Anlass und fokussieren das Select. Pflichtfeldfehler deutsch. Browser-Anfrage mit Firmenevent, 7 Personen, 03.11.2026 lokal erfolgreich, Referenz CS-4BE230D6. D1-Abfrage weist exakt diesen Datensatz mit status=new nach. | PASS_LOCAL. Synthetische `.test`-Daten, keine echte Kundenanfrage, keine Nachricht an Dritte. |
| API | 13 lokale Integrationstests, auch gegen den finalen Produktionsbuild auf 8787: Origin, JSON, Größe, Spam, Validierung, Speicherung, Idempotenz, Konflikt, Ratenlimit. | PASS_LOCAL. Kein Produktionsdatensatz angelegt. |
| LEGAL LINKS | Konfiguration leer; /impressum und /datenschutz lokal HTTP 404. Keine Scheinverlinkung. | **OPEN_P0, kein PASS.** Freigegebene echte URLs oder Texte erforderlich. |
| SEO | HTML Title „Kerzengieß-Workshop | Kearly Candle Studio“, passende generische Description, lang=de, eine H1, bisheriger privater noindex-Status. | PARTIAL_VERIFIED. Bochum-Version vorbereitet, erst nach Standortbestätigung einschalten. |
| PERFORMANCE | Finales Worker-HTML lokal HTTP 200, 90.267 Byte, erste lokale Auditantwort 245 ms. Logo im Browser als responsive 256-WebP (48.296 Byte), Original 1.199.592 Byte. Drei bestehende lokale Fontdateien; feste Medienproportionen, Galerie lazy, Hero priorisiert. Keine neue UI-Laufzeitbibliothek. | PARTIAL_VERIFIED. Lokal ohne Netz-Drosselung; keine Lighthouse-/Feldmessung und keine Behauptung bestandener Core Web Vitals. |
| CONTENT AUTHORITY | 69 automatisierte Prüfungen plus Browser-DOM: Angebot, sechs Kategorien, sechs Ablaufschritte, sieben Leistungen, zehn FAQ, eindeutige IDs und gültige Hash-Anker, keine alten CTA-/Buchungszustände. | PASS_IMPLEMENTED_CONTENT_CHECKS; rechtliche Freigabe gesondert offen. |
| BUILD / TYPES / LINT | Produktionsbuild in fünf Schritten erfolgreich, TypeScript ohne Fehler, ESLint erfolgreich. | PASS. Vinext meldet seine bekannte eingeschränkte statische Routentyp-Erkennung, keine Buildfehlermeldung. |

Maschinenberichte: `content-audit.json`, `responsive-audit.json`. Der Inhaltsbericht weist ausdrücklich `releaseReady: false` aus. API-Prüfungen wurden nicht als Browser-Netzwerkausfalltest ausgegeben. Fehlerhafte lokale Eingaben wurden im echten Formular geprüft; HTTP-Fehler werden durch die API-Tests abgedeckt.

## Medien und spätere Originalfotos

Interne IDs: P1_FOTO_HERO, P1_FOTO_FORMENVIELFALT, P1_FOTO_GIESSEN, P1_FOTO_FARBE, P1_FOTO_DUFT, P1_FOTO_GRUPPE, P1_FOTO_ERGEBNIS, P1_FOTO_WORKSHOPTISCH. Sie erscheinen nicht in der Kundenoberfläche. Freigegebene Motive später direkt in den jeweiligen bestehenden Slot einsetzen. Die Galerie bleibt bis dahin reduziert; Illustrationen werden nicht als Fotos ausgegeben.

## Übergabe und Veröffentlichung

- `designansichten/index.html`: 13 statische HTML-Ansichten mit lokal mitgelieferten Markenbildern und eingebetteten Schriften. Formulare darin deaktiviert, damit der Export keine Anfragen absendet. Die tatsächliche Website wurde im Browser geprüft; die 13 Exportdateien wurden serverseitig erzeugt und auf Struktur geprüft, nicht einzeln visuell im Browser abgenommen.
- `screenshots/v07-desktop-hero.jpg`: aktueller Produktionsbuild, Desktop-Einstieg.
- `screenshots/v07-desktop-full.jpg`: Gesamtseite, aktueller Produktionsbuild.
- `screenshots/v07-375-hero.jpg`, `v07-390-hero.jpg`, `v07-430-hero.jpg`, `v07-768-hero.jpg`, `v07-1440-hero.jpg`: echte responsive Browseraufnahmen derselben V0.7-Implementierung.
- `screenshots/v07-form-success-mobile.jpg`: echte lokale Erfolgsanzeige.
- `screenshots/v07-desktop-price.jpg`: Preisbereich mit tatsächlichem Terminstatus.

Quellpfad: `C:\Users\kevin\Documents\Codex\2026-10-16\erstelle-mit-sites-plugin-sites-openai-2\work`. Nutzerpaket: `C:\Users\kevin\OneDrive\Dokumente\ChatGPT\Kerzenwebseit\outputs\v07`.

Die Veröffentlichung wird wegen der in AP7/AP10 ausdrücklich verlangten echten Rechtsziele zurückgestellt. Kein allgemeines Bestätigungsritual und keine erfundenen Rechtstexte. Benötigt werden ausschließlich die fehlenden freigegebenen Impressums-/Datenschutzziele und für das ortsbezogene SEO die Standortbestätigung. Datenbankmigration, Audience-Änderung, Direktbuchung oder neue Geschäftsregeln wurden nicht eingeführt.
