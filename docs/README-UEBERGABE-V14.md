# Kearly – Website-Code für die Designüberarbeitung

Stand: 24.11.2026. Grundlage: die am 23.11.2026 veröffentlichte Sites-Version 14 von https://kearly.de.
Commit: c87735cfb0261ef5af337081e734b274ec43378c.

## So startest du mit Google AI Studio

1. ZIP entpacken. Der Ordner enthält den bearbeitbaren Website-Code, Logo, lokale Bilder, Schriften und Formular-/Servercode.
2. Den Inhalt des Projektordners in ein eigenes privates GitHub-Repository übernehmen. package.json gehört direkt in dessen Hauptverzeichnis. Die ZIP selbst ist kein importierbares GitHub-Repository.
3. https://aistudio.google.com/apps öffnen und mit dem Google-Konto anmelden. Im Build-Bereich über das Plus-Menü (Add files) die Funktion Import from GitHub verwenden. Google-Zugriff gezielt auf dieses Repository beschränken, soweit die Oberfläche diese Auswahl anbietet.
4. Den Text aus STARTPROMPT-GOOGLE-AI-STUDIO.txt einfügen und die gewünschten Designänderungen ergänzen.
5. Das überarbeitete Projekt anschließend als ZIP herunterladen oder die Änderungen über GitHub bereitstellen. Für die Übernahme in die bestehende Sites-Veröffentlichung den Code wieder in diesem Codex-Chat bereitstellen.

Der GitHub-Import und Code-Export sind von Google dokumentiert: https://aistudio.google.com/docs/aistudio-build-mode.
Die Übergabe wurde lokal erstellt und als ZIP geprüft. Ein Import in ein Google-Konto und eine Vorschau innerhalb von AI Studio wurden nicht durchgeführt.

## Was du dafür brauchst

- Ein Google-Konto mit Zugang zu Google AI Studio.
- Für den oben beschriebenen Import ein GitHub-Konto und ein eigenes Repository.
- Dieses Codepaket sowie deine Vorstellungen zu Farben, Schrift, Aufbau und Bildern.
- Für reine Designänderungen muss keine Gemini- oder OpenAI-API-Funktion in die Website eingebaut werden.

## Wichtige Dateien für das Design

| Bereich | Dateien |
| --- | --- |
| Kearly-Hauptseite | wedding/home.html und public/marke/assets/style.css |
| Workshop-Seitenaufbau | app/components/workshop-landing.tsx |
| Workshop-Inhaltsblöcke | app/components/workshop-sections.tsx |
| Navigation, Kategorien und private Workshops | app/components/workshop-interactions.tsx |
| Workshop-Formular | app/components/workshop-form.tsx |
| Workshop-Stile | app/globals.css und app/v07.css |
| Aktuelle Angebotsdaten | app/workshop-config.ts |
| Workshop-Logo und Markenangaben | app/brand.ts und public/brand/ |
| Markenassets der Hauptseite | public/marke/assets/ |
| Wedding-Seiten | wedding/dist/ und wedding/worker/ |
| Impressum und Datenschutz | wedding/impressum.html und wedding/datenschutz.html |
| SEO der Workshop-Seite | app/workshop/page.tsx |
| Routing und Serverintegration | build/sites-worker.ts und vite.config.ts |

Die Wordmarke für den Workshop ist public/brand/kearly-candle-workshop-wortmarke.svg. Kearly ist die Dachmarke. Hauptseite, Workshop und Wedding sollen als zusammengehörige Marke wirken.

## Aktuelles Angebot erhalten

Der aktuelle Konfigurationscode ist maßgeblich: mobiler Workshop am Wochenende, Bochum und Umgebung im Umkreis von 70 km; darüber hinaus Anfahrtspauschale. Öffentliches Workshop-Angebot: 39 Euro pro Person, 4–9 Personen, ca. 2,5–3 Stunden, in der Regel 3–4 eigene Kerzen. Form, Farbe und Duft sind wählbar; duftfrei ist möglich. Private Gruppen werden individuell angefragt und bepreist. Keine erfundenen Termine, Bewertungen, Verfügbarkeiten oder Privatpreise ergänzen.

Einige Dokumente unter docs/ stammen aus früheren Versionen und nennen alte Teilnehmerzahlen oder einen privaten Vorschauzustand. Diese historischen Aussagen überschreiben weder die aktuelle Konfiguration noch den öffentlichen Stand von kearly.de. Der aktuelle SEO-Bericht ist docs/seo-public-2026-11-23.md; die Bestätigung des Google-Unternehmensprofils ist weiterhin nicht als abgeschlossen belegt.

## Laufzeit und Formularfunktionen

Die Originalwebsite verwendet React, TypeScript, Vinext, Vite und einen Cloudflare Worker. D1 speichert Anfragen; R2 speichert hochgeladene Fotos. Sites stellt Authentifizierung und produktive Bindings bereit. Das sind technische Integrationen, die nicht allein durch einen Codeimport zu Google umziehen.

Das Paket enthält den Quellcode und die lokal versionierten Assets. Kundendatensätze, produktive Datenbankinhalte, R2-Uploads, Zugangsschlüssel und lokale Anmeldedaten werden nicht mitgeliefert. Bei Fotos aus R2 greifen die vorhandenen Fallback-Darstellungen, solange keine lokale Fotoanbindung besteht.

Für die Vorschau in der Node-Laufzeit von Google AI Studio können Anpassungen an Vinext/Cloudflare nötig sein. Die Lauffähigkeit dort ist nicht bestätigt. Für die reine Designarbeit kann AI Studio bei Bedarf eine separate React/Vite-Vorschau mit ausdrücklich gekennzeichneten Demodaten erzeugen. Den Servercode für die spätere Übernahme erhalten. Ein Demoformular darf keinen erfolgreichen Versand behaupten und keine echten Daten an kearly.de senden.

## Lokal am vollständigen Original arbeiten

Node.js mindestens 22.13.0 und npm sind laut package.json erforderlich.

```sh
npm ci
npm run dev
```

Produktionsbuild für die bestehende Architektur:

```sh
npm run build
```

prebuild erzeugt dabei wedding/generated.mjs aus den versionierten Wedding-Assets. Die Datei next-env.d.ts wird durch das Framework erzeugt. .openai/hosting.json enthält die Identität des bestehenden Sites-Projekts und die Binding-Namen, aber keinen Bearbeitungszugang und keine Zugangsschlüssel. Die mitgelieferte .gitignore schließt lokale Laufzeitdaten aus.

## Änderungen wieder auf kearly.de übernehmen

Eine Überarbeitung in Google AI Studio ändert die bestehende Sites-Veröffentlichung nicht automatisch. Für eine Designüberarbeitung kann kearly.de beim bisherigen Hosting bleiben. Vor dem Veröffentlichen der Änderungen müssen Darstellung, Formularspeicherung, geschützter Verwaltungszugriff, Fotofunktionen, Rechtslinks, Canonical, Weiterleitungen, robots.txt und Sitemap geprüft werden. Die produktive API, Authentifizierung und die SEO-Grundlagen erhalten. Ein vollständiger Wechsel zu Google Cloud wäre ein eigener Hosting- und Datenmigrationsschritt.
