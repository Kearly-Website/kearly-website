# Designsystem V0.6

## Visuelle Richtung

Warm Modern Atelier – Creative Edition. Papierfarbener Grund, dunkle warme Schrift, Rostrot als Aktionsfarbe und Akzent, ruhiges Salbeigrün als Begleitung. Instrument Serif für die große editoriale Typografie, DM Sans für Informationen und Bedienung. Abstrakte Illustrationen bleiben als solche bezeichnet, bis echte freigegebene Fotos vorliegen.

## Struktur

Hero mit Angebot, Preis, Dauer und nächstem Schritt; ruhige Faktenhierarchie mit drei dominanten Zahlen; sechs von elf Kategorien als Einstieg; ungleiche Gewichtung von Form, Farbe und Duft; sechs Ablaufzeilen; Small-Group-Geschichte; eigene Preissektion; Terminstatus; privater Bereich mit Anlass-Tags und acht Formularfeldern; Galerie; schmale FAQ; Abschluss.

## Tokens und Verhalten

Verbindliche Code-Tokens: `app/design-tokens.ts`; CSS: `app/globals.css`. Inhalt 1200 px auf Desktop 1440 px, Mobile-Referenz 390 px mit 20 px Rand. Abstände 8/16/24/32/48/64/96/128 px. Raster 3 Kategorie-Spalten auf Desktop, 2 auf Mobilgeräten. Primärbuttons 54 px, Eingaben mobil mindestens 53 px, interaktive Flächen mindestens 44 px Höhe. Sichtbarer 3-px-Fokusring; Fehler zusätzlich durch Text und ARIA-Zustand. FAQ als native Details. Kein Autoplay; Reduced Motion schaltet Übergänge und sanftes Scrollen aus.

Pro Abschnitt ein Hauptthema. Hauptfakten 3–4 Kerzen, rund 300 Formen im Gesamtbestand, maximal 6 Personen; Zeit, Farbe/Duft und Wachs nachgeordnet. Private Anlässe als Tags. 35 € ausschließlich als modularer, derzeit inaktiver Opening-Zustand.

## Späterer Formen-Katalog

Die Route `/workshops/formen` wird erst nach Freigabe echter Produktdaten umgesetzt. Vorgesehene Struktur: Seiteneinstieg und Kategorieauswahl; Kartenraster mit Originalfoto und Name/Nummer; Detailansicht mit Größe, ungefährer Wachsmenge, Workshopgeeignetheit und Saisonbezug; leere und nicht verfügbare Zustände. Keine Kauf-/Warenkorbfunktion. Eine Kategorie oder Wunschform stellt keine Reservierung dar.

Der vorhandene Typ `WorkshopForm` enthält id, name, number, category, image, size, waxGramsApprox, workshopVerified, seasonal und availability. `catalogEnabled` bleibt false. Es sind keine Produkte eingepflegt. Alle elf Kategorien sind in `shapeWorlds` angelegt.

## Fotoplan

P1: reale Hände beim Gießen im Hero; reale Kerzenfotos für die sechs prominenten und später alle elf Kategorien; tatsächliche Farbpigmente und Düfte; Tischsituation mit vier bis sechs Personen; privater Gruppenmoment; Materialdetails und fertige Ergebnisse. Nur Originalmaterial mit geklärten Rechten und Freigabe als tatsächliche Kearly-Produkte einsetzen. Bisher keine freigegebenen Produktfotos vorhanden.

## Validierung und Grenzen

Nach anfänglichem Laufzeitfehler war die gehostete HTTPS-Website erreichbar. Browserprüfung bei 1440 px und 390 px: kein horizontaler Überlauf in den geprüften Ansichten, Inhalt maximal 1200 px, Preis/Dauer/Hero-Aktionen mobil im ersten Bildschirm. Menü mit Escape, sechs auf elf Kategorien, Anlassübernahme JGA, Formularfehler mit Fokus und FAQ per Enter geprüft. Buchungsvorschau ist deaktiviert. Die 13 Ansichten wurden als Browser-Screenshots exportiert. TypeScript, ESLint, Produktionsbuild und 13 lokale API-Prüfungen erfolgreich. Keine Produktionsanfrage mit Testkontaktdaten angelegt.

Dies ist keine vollständige WCAG-Zertifizierung oder geräteübergreifende Abnahme. Fotos fehlen weiterhin; eine visuelle Bestandsaufnahme ersetzt keine echte Produktdarstellung. Keine Conversion-/Lighthouse-Werte und kein gemessener Wettbewerbsvorsprung werden behauptet.
Die gebaute Vinext-Laufzeit zeigte bei Next-Link-Navigation einen RSC-Prefetch-/Clickfehler. Die Designbibliothek und die privaten Anlass-/Anfragelinks verwenden deshalb native Anker. So bleiben die Ziele ohne Client-Router erreichbar.
