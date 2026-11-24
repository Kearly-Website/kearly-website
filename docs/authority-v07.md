# KEARLY CANDLE WORKSHOP – WEBSITE V0.7
## Konsolidierter MASTER-Handoff – Arbeitspakete 1 bis 10

**Ziel:** Bestehende Website schrittweise und konsistent überarbeiten; kein Neubau.

**Arbeitsmodus:** Die drei Teilpakete unten in der Reihenfolge AP1–3, AP4–6, AP7–10 umsetzen, die ursprüngliche Website-Komponentenstruktur wiederverwenden. **Keine der nachfolgenden Spezifikationen bedeutet, dass Änderungen bereits durchgeführt, getestet oder veröffentlicht wurden.**

**Einschränkung:** Der editierbare Quellcode lag hier nicht vor. Vor jeder Änderung reale Dateistruktur, Assets, Formular-Backend, Links und Anker prüfen.

**Konfliktregel:** Für globale Workshopparameter gilt die V0.7-Authority: 39 € p.P., 2,5–3 Std., 4–6 Teilnehmende öffentlich, in der Regel 3–4 Kerzen, bis zu 1 kg Wachs p.P., Farbe und Duft inklusive, duftfrei möglich, rund 300 Formen im Gesamtbestand, derzeit keine echte Direktbuchung. Für konkrete Inhalte gilt der spezifischere, spätere AP-Text, wenn er nicht gegen die Authority verstößt. Keine private Preis- oder sonstige offene Businessentscheidung ergänzen.

---

---

# TEIL 1 – AP1–AP3

# Kearly Candle Workshop – Website V0.7
## Präziser Umsetzungs-Handoff: Arbeitspakete 1–3

**Zielseite:** https://candlestore-kerzengiessen.stonypearl1024.chatgpt.site/  
**Bisheriger Stand:** Vorhandene veröffentlichte Website, Library-Site-Artefakt mit Quellversionshinweis `7`.  
**Status:** Änderungsspezifikation auf Basis des vorhandenen Seiteninhalts; **keine Codeänderung oder Veröffentlichung durchgeführt**.  
**Arbeitsweise:** AP1 → AP2 → AP3. Kein Rebuild, keine neuen Sektionen, keine Änderungen an nicht beauftragten Bereichen.

### Verbindliche Inhalte / Stoppliste
- Standardpreis 39 € pro Person.
- Ca. 2,5–3 Stunden; öffentliche Gruppengröße 4–6 Personen.
- **In der Regel 3–4 eigene Kerzen**, nicht garantiert vier.
- **Bis zu 1 kg Kerzenwachs pro Person**, nicht genau 1 kg.
- Farbe und Duft inklusive, duftfrei möglich.
- **Rund 300 Formen im Gesamtbestand**, nicht in jedem Termin frei verfügbar.
- Noch keine bestätigte Direktbuchung, Termine, Zahlungsmethoden, Stornoregeln oder Take-home-Zeiten.
- Keine erfundenen Produktfotos, Bewertungen, Formen, Preise oder Kundenaussagen.
- Private Workshop-Preise bleiben unveröffentlicht.

---

# AP1 – Globaler UX-/Design-Feinschliff

## 1. Navigation

**Ist-Text (aus Website-Artefakt):**  
`Formenwelt | Ablauf | Workshop & Preis | Private Runde | Workshop entdecken`

**Soll-Text:**  
`Formen | Ablauf | Workshop & Preis | Private Workshops | Termine & Infos`

Umsetzung:
1. Die vier Textlinks bleiben Navigation; „Termine & Infos“ wird **ein** klarer Primary-CTA rechts.
2. „Termine & Infos“ muss zum bereits existierenden Bereich mit Workshop-Termininformationen oder zum übergeordneten Preis-/Terminabschnitt scrollen. Ein vorhandenes funktionierendes Ankerziel wiederverwenden; kein neues Ziel vortäuschen.
3. „Formen“ springt zur vorhandenen Formenwelt, „Ablauf“ zum bestehenden Schritt-für-Schritt-Bereich, „Workshop & Preis“ zum bestehenden Preisabschnitt, „Private Workshops“ zum privaten Angebot.
4. Auf 375–430 px kompakte Wortmarke und gut bedienbare Navigation; gegebenenfalls vorhandenes Mobilmenü wiederverwenden. Keine neuen Navigationsprodukte.
5. Desktop-, Tastatur- und Mobile-Scrollziel prüfen, insbesondere falls der Header sticky ist.

## 2. Logo

- Im Header kompakt: **KEARLY** + nachgeordnet **CANDLE WORKSHOP**.
- Die bestehende runde Atelier-Siegel-Grafik beibehalten und höchstens als kleines Branddetail in Hero, Footer oder Atelierbereichen nutzen.
- Keine mehrfachen großen Siegel nebeneinander und keine Logo-Neuerfindung.
- Auf Mobilgeräten die Lesbarkeit der Wortmarke priorisieren.

## 3. Visuelle Designregeln

- Stil: **Warm Modern Atelier – Creative Edition**.
- Bestehende Serif-/Sans-Typografie, Farbwelt und funktionierende Komponenten behalten.
- Wo Abschnitte visuell überfrachtet sind, wiederholte Eyebrows, Rahmen, Karten und Dekorelemente reduzieren.
- Pro größerem Abschnitt: eine Hauptaussage, ein primärer Fokus, ein nächster Schritt.
- Fließtexte auf ca. 60–70 Zeichen Zeilenlänge begrenzen (`max-width` an den vorhandenen Schriftgrößen orientieren).
- Fließtext auf Mobilgeräten gut lesbar halten; keine ultradünnen Schriftstärken und kein extremes Letterspacing.
- Zwischen großen Sektionen mobile Orientierung etwa 72–96 px und Desktop etwa 110–150 px, *visuell an vorhandene Layouts angepasst*, nicht mechanisch überall gleich.

## 4. Buttons

- **Primary:** vorhandener dunkler Espresso-Stil, hoher Kontrast, ausreichend Höhe und deutlich sichtbarer Fokus.
- **Secondary:** Textlink oder zurückhaltender Outline-Stil.
- Bestehende CTA-Beschriftungen auf eine kleine konsistente Menge reduzieren:
  - `Termine & Infos`
  - `Formen entdecken` (nur für tatsächliche Sprungnavigation zur Formen-Sektion)
  - `Private Gruppe anfragen`
- „Workshop buchen“ und Fake-Buchungslogik **nicht** hinzufügen.
- CTA-Sprünge, Hover-, Fokus- und Tastaturzustände prüfen.

## 5. Responsive Mindestprüfung

Bei 375, 390, 430 px sowie Tablet und Desktop:
- Header und mobile Navigation ohne horizontalen Overflow.
- Hero-Text lesbar, Preis und CTA früh sichtbar.
- KPI-Bereich sinnvoll gestapelt.
- Formenbilder nicht winzig.
- Ablauf, Preisabschnitt und FAQ ohne Textüberlauf.
- Anfrageformular in einer Spalte, nicht abgeschnitten; Touchflächen möglichst mindestens 44 × 44 px.
- Footer-Links lesbar und bedienbar.
- Bestehende Formularfunktion, Pflichtfelder, Datenschutz-/Impressum-Links nicht beeinträchtigen.

---

# AP2 – Hero und „Der Workshop auf einen Blick“

**Scope:** Ausschließlich bestehender Hero und direkt anschließender Fakten-/USP-Bereich. Keine sonstigen Sektionen umbauen.

## 1. Hero-Copy

**Eyebrow:** `KEARLY CANDLE STUDIO`  
Falls durch die sichtbare Wortmarke schon redundant: stattdessen `CANDLE WORKSHOP`.

**H1 – exakt beibehalten:**  
`Gieß dir deine eigenen Designkerzen.`

**Subheadline – ersetzen durch:**  
`Wähle deine Lieblingsformen, Farbe und Duft und gieße in kleiner Runde deine eigenen Designkerzen.`

**Vier Fakten im ersten sichtbaren Textblock:**
- `39 € pro Person`
- `ca. 2,5–3 Stunden`
- `in der Regel 3–4 Kerzen`
- `max. 6 Personen`

Mobile mögliche Verdichtung:
`39 € pro Person · 2,5–3 Stunden`  
`in der Regel 3–4 Kerzen · max. 6 Personen`

`in der Regel` darf auch bei kleinen Breakpoints nicht ersatzlos gestrichen werden.

**Primary:** `Termine & Infos` → vorhandener Termin-/Workshopbereich.  
**Secondary:** `Private Gruppe anfragen` → vorhandenes privates Formular oder dessen Abschnitt.

## 2. Hero-Visual

- Die vorhandene Atelierillustration behalten, bis echte Kearly-Fotos bereitgestellt wurden.
- Das runde Atelier-Siegel darf nur kleiner Markenakzent sein und darf nicht als zweites gleichwertiges Motiv konkurrieren.
- Auf kleinen Bildschirmen den Text und CTA vor dem dominanten Visual anordnen, falls das die Verständlichkeit verbessert.
- Vorhandene Bild-Alt-Texte und Seitenperformance berücksichtigen.

## 3. Direkt anschließender Faktenbereich

**H2:** `Der Workshop auf einen Blick`  
**Optionale Subheadline:** `Kleine Runde. Große Auswahl. Viel Raum für deine Ideen.`

Sechs kompakte Fakten, in dieser Reihenfolge oder einer gleich gut lesbaren Ordnung:

| Kernwert | Erläuterung |
|---|---|
| **3–4** | Eigene Kerzen – **in der Regel** |
| **Bis zu 1 kg** | Wachs pro Person |
| **Rund 300** | Formen **im Gesamtbestand** |
| **Max. 6** | Personen in der Gruppe |
| **2,5–3 h** | Workshopzeit |
| **Inklusive** | Farbe & Duft; duftfrei möglich |

Design: kein sechsmal hoch aufragendes Card-UI. Stattdessen ruhiges Faktenraster ohne dominierende Rahmen:
- Desktop: 3 × 2.
- Mobile: 2 × 3 (bei extrem schmalem Platz anpassen, nicht clippen).
- Kleine Line-Icons höchstens optional; Zahlen/Begriffe tragen die Kommunikation.
- Keine Dopplung derselben Fakten als mehrere zusätzliche große Kacheln im Hero.

---

# AP3 – Formenbibliothek

**Scope:** Nur vorhandene Formen-/Formenwelt-Sektion überarbeiten.

## 1. Copy

**Eyebrow:** Bestehenden kleinen Bereichstitel nur verwenden, wenn er nicht mit Hero/Headline konkurriert.

**H2 – exakt:**  
`Rund 300 Formen. Welche wird deine?`

**Einleitung – ersetzen durch:**  
`Von kleinen Figuren über Tiere und florale Designs bis zu modernen Statement-Kerzen: Entdecke deine Favoriten aus unserer großen Formenbibliothek mit rund 300 verschiedenen Formen im Gesamtbestand.`

**Kleiner erklärender Satz unmittelbar darunter:**  
`Welche Formen bei deinem Workshop zur Auswahl stehen, hängt unter anderem von Größe, Verfügbarkeit, aktueller Nutzung, Workshopzeit und deinem Wachsrahmen ab.`

## 2. Sechs Hauptkategorien – Reihenfolge und Copy

| Kategorie | Kurzbeschreibung |
|---|---|
| Tiere | Verspielte und besondere Tiermotive. |
| Blumen & Natur | Florale Formen und Designs aus der Natur. |
| Modern & Abstract | Klare Linien, organische Formen und moderne Designs. |
| Mini-Kerzen | Kleine Formen, die sich besonders schön kombinieren lassen. |
| Statement-Kerzen | Größere Formen mit besonderer Wirkung. |
| Saisonal | Wechselnde Motive passend zur Jahreszeit. |

Die sechs Kategorien sind im bestehenden Website-Stand schon angelegt: **vorhandene Karten wiederverwenden**, nicht sechs neue Komponenten ergänzen. Die Landingpage bekommt keinen 300-Produkt-Katalog.

## 3. Visuelle Kategoriengestaltung

- Bestehende Karten beibehalten und Bild-/Text-Gewichtung verbessern.
- Desktop: 3 Kategorien pro Zeile.
- Mobile: 1 große Karte pro Zeile oder bestehendes gut bedienbares Swipe-Muster mit etwa 1–1,2 Karten sichtbar.
- Große, emotionale Bildflächen, kleine Kurzcaptions; keine Doppelreihe winziger Thumbnails.
- Solange echte Kearly-Produktbilder fehlen, neutrale Ateliergrafik/Textur oder grafische Kategoriekarten verwenden, **nicht** erfundene Kerzenfotos als reales Sortiment.
- Foto-Platzhalter intern im Projekt als `P1 FOTO` markieren, **nicht** öffentlich anzeigen.
- Später echte Kearly-Kerzenbilder je Kategorie in Prioritätsreihenfolge einfügen; vorher nicht simulieren.

## 4. Sichtbare Entwicklertexte entfernen

Diese im vorhandenen Website-Stand sichtbar vorkommenden Texte **aus der Kundenoberfläche entfernen**:
- `Abstrakte Gestaltungsflächen zur Orientierung.`
- `Keine Abbildung verfügbarer Kerzen.`

Keine ersatzweisen Entschuldigungs- oder Entwicklungslabels anzeigen.

## 5. Katalog-CTA

Ist-Text: `Weitere Formenwelten entdecken`

- Falls der CTA **keinen echten nutzbaren Katalog** öffnet: Link/Button entfernen.
- Statt eines leeren Versprechens eine ruhige Textzeile zeigen:  
  `Die konkrete Auswahl entdeckst du direkt im Workshop.`
- Wenn bereits ein echter und funktionierender Katalog existiert, nicht vorschnell entfernen, sondern Ziel und Beschriftung sachlich prüfen.
- Keine `/workshops/formen`-Seite anlegen, solange kein entsprechendes Arbeitspaket freigegeben wurde.

## 6. Abschließender Erwartungshinweis

`Deine endgültige Auswahl triffst du im Workshop. Eine Wunschform ist keine garantierte Reservierung.`

Den bereits vorhandenen Satz behalten, nur dezenter und ohne dominante Warnbox stylen. Nicht doppelt mit dem neuen Einleitungshinweis einsetzen.

---

# Ausführungsvorschrift an Website-Editor / Codex

> Du arbeitest **in der bestehenden Kearly Candle Workshop Website** und sollst ausschließlich die oben beschriebenen Änderungen anwenden. Lies vor jeder Änderung die vorhandenen Komponenten, CSS-Variablen, Assetpfade und tatsächlichen DOM-Anker. Erhalte die aktuelle App-Struktur, Formularlogik, Navigation, Rechtslinks und funktionierende interaktive Elemente. Ändere zuerst AP1, dann AP2, dann AP3; vermeide dabei Konflikte zwischen globalen und lokalen Änderungen. Keine neuen Abschnitte, Preise, Produktfotos, Reservierungsabläufe oder Buchungsfeatures erfinden. Verwende vorhandene Markenassets. Nach jeder Runde Lint-/Build-Prüfungen soweit verfügbar sowie responsive Sichtkontrolle. Dokumentiere die tatsächlich geänderten Dateien/Komponenten und etwaige offene Punkte. Falls eine Änderung nur mit unfreigegebenen Geschäftsentscheidungen möglich wäre, lasse sie offen und kennzeichne das intern. Veröffentliche erst nach erfolgreicher Prüfung der vorhandenen Funktionalität.

## Abnahmekriterien (konkret)

- [ ] Headertext zeigt `Formen · Ablauf · Workshop & Preis · Private Workshops` und einen klaren CTA `Termine & Infos`.
- [ ] CTA scrollt zu einem realen Abschnitt, Mobile-Menü bleibt nutzbar.
- [ ] Header enthält lesbare kompakte Kearly-Wortmarke und kein riesiges doppeltes Rundsiegel.
- [ ] Hero-H1 lautet exakt `Gieß dir deine eigenen Designkerzen.`
- [ ] Hero nennt Preis, Dauer, ungefähre Kerzenzahl inklusive „in der Regel“, max. sechs Personen und einen echten Info-CTA.
- [ ] Keine neue Direktbuchung, erfundene Termine oder Fake-Verfügbarkeit.
- [ ] USP-Bereich zeigt sechs komprimierte Fakten und erklärt „Gesamtbestand“.
- [ ] Formen-H2 lautet exakt `Rund 300 Formen. Welche wird deine?`
- [ ] Sechs Kategorie-Karten sind vorhanden; mobile Bildflächen ausreichend groß.
- [ ] Die zwei sichtbaren Entwickler-Platzhaltertexte sind verschwunden.
- [ ] `Weitere Formenwelten entdecken` verschwindet, **wenn** kein reales Ziel existiert.
- [ ] Der Hinweis auf nicht garantierte Wunschformen bleibt erhalten.
- [ ] Öffentlicher Preis unverändert 39 €, keine alten privaten Preisannahmen ergänzt.
- [ ] Anfrageformular, FAQ, Footer und sonstige Seitenabschnitte funktionieren wie zuvor.
- [ ] Responsive Prüfung bei 375, 390, 430 px und Desktop ohne Überlauf.
- [ ] Keine Änderungen außerhalb AP1–AP3.

## Prüfbarkeit / Grenzen

Diese Spezifikation wurde anhand des auslesbaren bestehenden Website-Artefakts erstellt; dessen Inhalt und Live-URL sind zugeordnet. Der vollständige editierbare Code und das tatsächliche Rendering waren über die verfügbaren Schnittstellen nicht zugänglich. Daher sind DOM-IDs, CSS-Klassen, tatsächliche Button-Funktionalität und Breakpoint-Befunde **erst im Website-Editor zu prüfen**. Nichts in diesem Dokument ist eine Behauptung bereits durchgeführter Codeänderungen oder erfolgter Veröffentlichung.


---

# TEIL 2 – AP4–AP6

# KEARLY CANDLE WORKSHOP – WEBSITE V0.7
## Umsetzungspaket: AP4, AP5 und AP6

**Ziel:** Bestehende veröffentlichte Kearly-Candle-Workshop-Website gezielt verbessern.  
**Seite:** https://candlestore-kerzengiessen.stonypearl1024.chatgpt.site/  
**Autorität:** Kearly Candle Workshop Website V0.7, AP1–AP3 und die vorliegenden AP4–AP6.  
**Status:** Ausführungsfertiger Handoff; noch **nicht im Website-Code ausgeführt oder veröffentlicht**.  
**Wichtige Grenze:** Es liegt der auslesbare Website-Text vor, **nicht** der editierbare Component-/CSS-Code. DOM-IDs, Visuals und tatsächliche Funktionen sind im Editor zu prüfen, bevor Änderungen live gestellt werden.

## 0. Bestandsschutz und Angebotsregeln

1. **Kein Redesign, kein Rebuild, keine neuen Marketing-Sektionen.** Bestehende Komponenten weiterverwenden.
2. Standardpreis **39 € pro Person**; **ca. 2,5–3 Stunden**; **4–6 Personen** für den öffentlichen Workshop.
3. **In der Regel 3–4 eigene Kerzen**, **bis zu 1 kg Kerzenwachs pro Person**, Farbe und Duft inklusive, duftfrei möglich.
4. **Rund 300 Kerzenformen im Gesamtbestand**, nicht alle jederzeit verfügbar oder garantiert geeignet.
5. **DIRECT_BOOKING_READY = NO.** Keine erfundenen Termine, Bezahlmöglichkeiten, Stornofristen, Verfügbarkeiten, Countdown oder Checkout.
6. **TAKE_HOME_STATUS = NOT FINAL.** Keine sofortige Mitnahme, keine garantierte Abholung am Folgetag, keine Stundenfrist, kein Versand versprechen.
7. Nicht freigegebene Farb-/Duftlisten, Private-Workshop-Preise, Gebühren und Rabatte nicht veröffentlichen.
8. **35 €** nur für ausdrücklich bestätigte und bezeichnete Opening-Termine; ohne solchen Termin kein 35-€-Hinweis.
9. Formulare, Datenschutz-/Impressumslinks, FAQ, Mobile-Menü und existierende CTA-Ziele funktionsfähig erhalten.
10. Redundanz mit AP1–AP3 berücksichtigen: Formenwelt erklärt Formen; Hero und USP zeigen Kernfakten; AP4 individualisiert; AP5 erklärt Ablauf; AP6 beantwortet Preis und nächste Schritte.

---

# AP4 – „Mach sie zu deinen“: Farbe, Duft, Wachsrahmen

**Scope:** Nur der direkt auf die Formenbibliothek folgende vorhandene Gestaltungsabschnitt einschließlich der beiden Teilbereiche Farbe und Duft; ein dezenter Wachs-Infoblock innerhalb dieses Abschnitts ist freigegeben.

## Beobachteter Ist-Stand

Der auslesbare Seiteninhalt enthält nach der Formenwelt erneut „DEINE KERZEN. DEINE AUSWAHL.“ sowie „Ein Ton. Ein Gefühl. Ganz du.“, danach separate Abschnitte „02 / FARBE – Deine Idee bekommt Farbe.“ und „03 / DUFT – Mit deinem Duft. Oder ganz pur.“. Diese müssen nicht durch eine neue Seitenarchitektur ersetzt werden.

## Soll-Texte – wörtlich übernehmen

**Hauptüberschrift:**  
`Mach sie zu deinen.`

**Kurze Einleitung:**  
`Deine Form steht fest? Mit Farbe und Duft gibst du deinen Kerzen ihren eigenen Charakter.`

**Farbe**  
Eyebrow: `02 / FARBE`  
Headline: `Deine Idee bekommt Farbe.`  
Text: `Farbe ist im Workshoppreis inklusive. Deinen Farbton wählst du aus der aktuellen Auswahl direkt im Workshop.`

**Duft**  
Eyebrow: `03 / DUFT`  
Headline: `Mit Duft. Oder ganz pur.`  
Text: `Duft ist im Workshoppreis inklusive. Deinen Favoriten wählst du vor Ort aus den verfügbaren Optionen – oder du gießt deine Kerzen ganz ohne Duft.`  
Zusatzzeile: `Duft inklusive · duftfrei möglich`

**Ruhiger Wachs-Infoblock (nicht als neuer großer Seitenabschnitt):**  
Headline: `Bis zu 1 kg Wachs für deine Ideen.`  
Text: `Für deine Kerzen stehen dir insgesamt bis zu 1 kg Kerzenwachs zur Verfügung.`  
Kleine Erläuterung: `Ob daraus mehrere kleine oder weniger große Kerzen entstehen, hängt von deiner Formenwahl und der verfügbaren Workshopzeit ab.`

**Nur falls die Kerzenzahl in AP4 überhaupt noch erforderlich ist:**  
`Im Workshop kannst du in der Regel 3–4 eigene Kerzen gießen. Wie viele es genau werden, hängt von deinen gewählten Formen, deren Größe und der verfügbaren Zeit ab.`  
Um Wiederholungen zu verhindern, diesen Satz **nicht automatisch** nochmals ergänzen, weil er im Hero, USP und Preisbereich bereits erscheint.

## Konkrete Änderungen am bestehenden Abschnitt

- Vorhandene zweite Wiederholung `DEINE KERZEN. DEINE AUSWAHL.` entfernen und durch `Mach sie zu deinen.` ersetzen.
- Große erzählerische Zusatzüberschrift `Ein Ton. Ein Gefühl. Ganz du.` entweder ersetzen oder streichen, damit **eine** Headline führt.
- Farbe und Duft als zwei gleichwertige Unterbereiche erhalten, **keine zehn Kacheln**, kein künstliches Produktsortiment.
- Auf Desktop 50/50- oder redaktionell asymmetrisches Zweispalten-Layout: je ein dominantes Farbbzw. Duftdetail und kurze Copy. Auf Mobile zwei große, vertikal aufeinanderfolgende Blöcke.
- Vorhandene Atelierillustrationen dürfen bleiben; keine erfundenen Farb-Swatches oder Duftnamen.
- Aus dem Text-Extrakt geht `Atelierillustration` hervor. **Prüfen, ob dies sichtbarer UI-Text oder nur technischer Alt-Text ist.** Nur sichtbare Entwicklerlabels entfernen, aussagekräftige Alt-Texte für Accessibility erhalten bzw. verbessern.
- Wachs-Infoblock ans Ende von AP4 setzen und visuell zurückhaltender gestalten als die beiden individualisierenden Motive.

## AP4-Abnahme

- [ ] Nach der Formenwelt keine doppelte „Deine Kerzen. Deine Auswahl“-Überschrift.
- [ ] Neue Headline und Farbe-/Duft-Copy exakt und gut lesbar.
- [ ] Keine unbestätigten Farbnamen, künstliche Swatches oder Duftliste.
- [ ] `Bis zu 1 kg` korrekt, keine Verbrauchs-/Kerzenzahlgarantie.
- [ ] Desktop und 375/390/430 px Mobile: keine winzigen Kacheln, keine abgeschnittenen Texte.
- [ ] Sichtbare Entwicklerlabels entfernt, Alt-Texte sinnvoll.

---

# AP5 – Ablauf und persönliche Betreuung

**Scope:** Bestehender Ablauf („Schritt für Schritt“) und derzeitiger Abschnitt „Kleine Runde. Große Ideen.“. Keine zusätzlichen Marketingblöcke.

## Beobachteter Ist-Stand

Der Seitentext enthält sechs Schritte von „Ankommen“ bis „Fertigstellung“, darunter einen eigenständigen emotionalen Abschnitt mit „KLEINE RUNDE. GROSSE IDEEN.“ und den zusätzlichen Aussagen „Persönlich. Ganz entspannt.“ und „Zeit für das, was von dir kommt.“. In Hero, USP und Preis wird „max. 6 Personen“ schon genannt.

## A. Ablauf – finale Copy

**H2:** `So läuft dein Workshop ab`  
**Subheadline:** `Du gestaltest. Wir begleiten dich.`

| Nr. | Schritt | Verbindlicher Erklärungstext |
|:--:|---|---|
| 01 | **Ankommen** | Lerne den Workshop, die Materialien und den Ablauf kennen. |
| 02 | **Formen entdecken** | Wähle deine Favoriten aus der aktuell verfügbaren Workshopauswahl. |
| 03 | **Farbe & Duft wählen** | Entscheide dich für deine persönliche Gestaltung – mit Duft oder ganz ohne. |
| 04 | **Wachs & Formen vorbereiten** | Gemeinsam bereiten wir Wachs, Formen und die nächsten Arbeitsschritte vor. |
| 05 | **Gießen** | Jetzt entstehen aus deinen Ideen deine eigenen Designkerzen. |
| 06 | **Fertigstellen** | Nach dem Gießen benötigen deine Kerzen noch Zeit für die letzten Schritte. Wie die Abholung genau abläuft, erfährst du rechtzeitig vor deinem Termin. |

**Darstellung:**
- Bereits vorhandene sechs Einträge in ihrer Reihenfolge behalten und die Texte gezielt ersetzen.
- Mobile als vertikale Timeline, Nummern visuell zusammenhängend als `01`, `02`, ... `06` (nicht `0 1` in getrennten Blöcken).
- Desktop als ruhiges 3×2-Raster oder kompakte Editorial-Timeline, je nach existierender Komponente.
- Kein überdimensioniertes Sechs-Karten-Dashboard, keine neue Prozessillustration nötig.
- Schritt 06 darf **keine** Aussage über Mitnahme, Versand oder konkreten Abholtag erhalten.

## B. Kleine Gruppe – auf Basis des beobachteten Foto-Status

Im verfügbaren Stand lassen sich nur Atelierillustrationen erkennen, **kein verifiziertes echtes Gruppenfoto**. Deshalb **Fallback verwenden**:

1. Den bisherigen umfangreichen „Kleine Runde. Große Ideen.“-Zwischenbereich **deutlich verkleinern**.
2. Kernbotschaft in den bestehenden Preis-/Leistungsabschnitt von AP6 integrieren, statt eine weitere große Wiederholungssektion zu erhalten.
3. Dort die Aussage als einen kurzen, warmen Vorteil setzen:  
   `Maximal 6 Personen pro Workshop geben dir genug Raum für deine Ideen, Fragen und persönliche Unterstützung.`
4. Falls die bestehende DOM-Struktur keinen sicheren Umzug zulässt: Zwischenbereich bestehen lassen, aber auf **eine** Headline und **einen** Satz reduzieren; große rein dekorative Füllflächen entfernen.
5. Nicht mit einem künstlich generierten „Kearly-Workshop-Foto“ ersetzen. Echtes Foto von 4–6 Personen ist ein internes `P1 FOTO`, noch nicht öffentlich zu beschriften.
6. Sollte sich im Editor doch ein nachweislich echtes, starkes Kearly-Gruppenfoto befinden, darf der eigenständige emotionale Zwischenbereich **mit diesem Foto** bestehen bleiben; Copy auf den obigen einen Satz beschränken.

**Headline im Fall des Beibehaltens:** `Kleine Runde. Große Ideen.`  
**Text:** `Maximal 6 Personen pro Workshop geben dir genug Raum für deine Ideen, Fragen und persönliche Unterstützung.`

## AP5-Abnahme

- [ ] Genau sechs nachvollziehbare Prozessschritte; 04 „Wachs & Formen vorbereiten“, 06 „Fertigstellen“.
- [ ] Nummern auf Mobile sauber `01`–`06`, Timeline lesbar.
- [ ] Keine konkreten Take-home-/Abholversprechen.
- [ ] Gruppenvorteil nur einmal prägnant statt einer Reihe ähnlicher Sätze.
- [ ] Kein künstliches Gruppenfoto; falls kein echtes Foto, kompakter Fallback.
- [ ] Ablauf, Formular, FAQ und Seitenanker bleiben benutzbar.

---

# AP6 – Workshop & Preis / öffentliche Conversion (P0)

**Scope:** Existierende Preis-Sektion, direkt daran anschließender Terminstatus und die öffentliche CTA-Kette. Keine nicht freigegebene Infrastruktur.

## Beobachteter Ist-Stand

Die bestehende Website enthält `39 € pro Person`, `ca. 2,5–3 Stunden · 4–6 Personen`, einen CTA `TERMINE ENTDECKEN` und danach den Hinweis `Neue Workshoptermine sind in Vorbereitung.` Der Preisabschnitt enthält bereits Leistungen, die bislang teilweise an anderer Stelle wiederholt werden.

## A. Preis-Sektion – finaler öffentlicher Inhalt

**H2:** `Dein Kearly Candle Workshop`  
**Preis, dominant:** `39 € pro Person`  
**Direkt darunter:** `ca. 2,5–3 Stunden · 4–6 Personen`

**Enthalten (kompakt, nicht als sieben große Einzelkarten):**

- ✓ In der Regel 3–4 eigene Kerzen
- ✓ Bis zu 1 kg Kerzenwachs pro Person
- ✓ Farbe inklusive
- ✓ Duft inklusive
- ✓ Duftfrei möglich
- ✓ Auswahl aus der großen Formenbibliothek
- ✓ Persönliche Begleitung in kleiner Gruppe

Hinweis aus AP5, **einmal** und nur wenn er nicht redundant zu einer bereits vorhandenen sehr ähnlichen Preis-Copy ist:
`Maximal 6 Personen pro Workshop geben dir genug Raum für deine Ideen, Fragen und persönliche Unterstützung.`

Bei Erwähnung der Formen: `rund 300 Formen im Gesamtbestand`; **nicht** „300 Formen garantiert verfügbar“.

Keine zusätzlichen „Premium“-Claims, künstliche `nur 39 €`-Betonung, durchgestrichene Preise oder generische Kundenstimmen. Die Vorbedingung „alle Materialien inklusive“ wird **nicht** ohne bestehende fachliche Freigabe ergänzt.

**Primary innerhalb Preis:** `Termine ansehen` → echter, existierender Terminstatus direkt im Folgeabschnitt. Kein Checkout, keine deaktivierte Fake-Buchung.

## B. Terminabschnitt – finaler öffentlicher Inhalt solange es keine echten Termine gibt

**H2:** `Dein nächster kreativer Moment`  
**Text:** `Neue Workshoptermine sind gerade in Vorbereitung.`  
**Hinweis, optional:** `Öffentliche Termine folgen bald.`

**Einzige tatsächlich nutzbare Aktion im Status ohne Buchung:**  
`Private Gruppe anfragen` → bereits vorhandener Private-Workshop-Anfrageabschnitt bzw. dessen Formular.

Dabei klar trennen: Eine private **Anfrage** ist keine bestätigte Reservierung. Kein `Jetzt buchen`, `Freie Plätze` oder andere nicht belegte Verfügbarkeit. Falls später echte Termine verfügbar sind, braucht das einen **separaten Freigabe-/Buchungsauftrag**.

## C. Optionale Warteliste – jetzt NICHT veröffentlichen

Die Idee `Neue Termine nicht verpassen.` / E-Mail-Interessenformular darf **nur intern vorgemerkt** werden. Eine sichtbare oder aktive Warteliste wäre erst bei nachgewiesener Speicherung, zulässiger Datenverarbeitung, passender Datenschutzerklärung, Einwilligungs-/Opt-in-Konzept, Löschlogik, Zustellfunktion und sauberer Fehler-/Erfolgsbehandlung zulässig. Nicht allein aus einer Formularoberfläche ableiten, dass das rechtlich oder technisch freigegeben sei. Eine Newsletterfunktion wird **nicht** erfunden.

## D. CTA-Führung über die gesamte Seite

| Ort | CTA jetzt | Wirkliches Ziel |
|---|---|---|
| Header | **Termine & Infos** | Termin-/Preisbereich, kein Checkout |
| Hero | **Termine & Infos** | Termin-/Preisbereich, kein Checkout |
| Hero sekundär | **Private Gruppe anfragen** | Privater Anfrageabschnitt / Formular |
| Preisabschnitt | **Termine ansehen** | Unmittelbar folgende Terminstatus-Sektion |
| Terminstatus | **Private Gruppe anfragen** | Bestehendes Formular |

- Beim Scrollen echtes vorhandenes DOM-Ankerziel benutzen; unter sticky Header nicht abgeschnitten.
- Private Anfragen nicht als öffentliche Terminbuchungen labeln.
- Bestehende Formulardaten und Success-Meldung nur im bisherigen, rechtlich freigegebenen Rahmen belassen.
- Kein Event-Tracking mit personenbezogenen Daten neu hinzufügen.

## E. Mobile

- Preis `39 €` typografisch klar und früh sichtbar, direkt darunter `2,5–3 Stunden` und `4–6 Personen`.
- Unmittelbar danach 3–4 wichtigste Benefits sichtbar; Rest kompakt darunter, nichts hinter ungerechtfertigten Accordions verstecken.
- Deutlicher Button `Termine ansehen`, angemessene Touchfläche und Fokus-Stil.
- Beim Klick sofortiger, nachvollziehbarer Status: `Neue Workshoptermine sind gerade in Vorbereitung.` + tatsächlicher nächster Schritt.
- Keine leere Termin-Kalenderhülle, keine Fake-Karten.

## AP6-Abnahme (P0)

- [ ] Preis überall weiterhin **39 €** und konsistent.
- [ ] Dauer, Gruppengröße, Kerzenzahl und Wachsrahmen korrekt eingeschränkt.
- [ ] 35 € nirgends allgemein als Rabatt sichtbar.
- [ ] Kein direkter Buchungskanal oder erfundene Termine.
- [ ] `Termine ansehen` landet auf echter Statusinformation.
- [ ] Vorhandenes privates Anfrageformular erreichbar und funktionsfähig.
- [ ] Keine E-Mail-Liste/Newsletter-Speicherung ohne geprüfte Rechts- und Technikgrundlage.
- [ ] Preisabschnitt mobil verständlich und mit klarer nächster Aktion.

---

# Gemeinsame Ausführung / Regressionstest

## Reihenfolge

1. Aktuelle Komponenten, Anker, CSS und Assets im Originalprojekt lesen; **keinen neuen Projektordner als Ersatz-Website anlegen**.
2. AP4 auf dem bestehenden Bereich für Farbe/Duft anwenden.
3. AP5 Ablauf überarbeiten; prüfen, ob echtes Gruppenfoto existiert. Falls nein, die Kleingruppen-Aussage als AP5/AP6-übergreifende Änderung in die bestehende Preisstruktur verschieben.
4. AP6 Preis- und Terminblöcke vereinfachen; CTA-Ziele auf reale Anker verweisen.
5. Laufende Tests sowie Mobile-/Desktop-Sichtkontrolle durchführen. Erst bei bestandenem Check veröffentlichen.

## Qualitätskontrollen

- **Copy:** Keine doppelt vorkommenden Zwischenüberschriften; Form → Farbe/Duft → Ablauf → Preis → Terminstatus ergibt eine klare Geschichte.
- **Accessibility:** Echte `<h1>`- und `<h2>`-Hierarchie, sinnvolle Button-Namen, focus-visible, Tastaturbedienung, Labels/Alt-Texte.
- **Responsive:** 375, 390, 430 px; optional 768 px; Desktop 1280/1440 px. Keine horizontalen Scrollbars oder abgeschnittenen Formulare.
- **Regressionsschutz:** Header, Links, private Anfrage, Validierung, FAQ-Interaktionen, Datenschutz/Impressum, Scrollziele weiter nutzbar.
- **Business-Fakten:** Preis und Leistung unverändert, kein Private-Preis, kein Take-home- oder Terminversprechen.
- **Sauberes Diff:** Nur AP4–AP6 und minimal notwendige gemeinsame Styles/CTA-Verknüpfungen; keine Änderung an sonstigen Sections.
- **Ehrliche Abschlussmeldung:** Nur tatsächlich getestete und veröffentlichte Änderungen als erledigt kennzeichnen; offene Abhängigkeiten nennen.

## Kompakter Copy/Paste-Auftrag für den bestehenden Website-Editor

> Setze **KEARLY CANDLE WORKSHOP – WEBSITE V0.7, ARBEITSPAKETE 4–6** in der **bestehenden Website** um. Der verbindliche Inhalt und alle detaillierten Änderungen stehen in diesem Dokument. Keine neue Website bauen. Arbeite komponentenschonend und in der Reihenfolge AP4 → AP5 → AP6. Bewahre die freigegebenen Business-Werte, besonders 39 €, ca. 2,5–3 Stunden, 4–6 Personen, in der Regel 3–4 Kerzen, bis zu 1 kg Wachs, Farbe und Duft inklusive, duftfrei möglich, rund 300 Formen im Gesamtbestand. Streiche die doppelte Formen-/Auswahlüberschrift nach der Formenbibliothek, nutze „Mach sie zu deinen.“, ersetze die Farbe-/Dufttexte, füge einen ruhigen Wachsrahmen-Hinweis innerhalb dieses Bereichs hinzu. Formuliere die sechs Ablaufschritte exakt neu und überführe ohne echtes Gruppenfoto die Kleingruppen-Botschaft kompakt in den Preisbereich. Halte den Preis bei 39 €, ersetze irreführende Termin-CTAs durch einen echten Scroll zum Terminstatus, und ermögliche als heute verlässlichen nächsten Schritt nur die vorhandene **private Anfrage**. Keine Mail-Warteliste, Buchung, Zeiten oder Preise ohne separate Freigabe aktivieren. Prüfe Desktop, Mobilgeräte, Ankernavigation, private Anfrage, FAQ und Footer. Melde das tatsächliche Diff und die Testergebnisse, ohne unveröffentlichte Arbeit als live auszugeben.

**Erstellungsstand:** 20. Oktober 2026. Dieses Dokument ist ein Umsetzungshandoff, kein Nachweis erfolgter Codeänderungen.


---

# TEIL 3 – AP7–AP10

# KEARLY CANDLE WORKSHOP – WEBSITE V0.7
## Präziser Umsetzungsauftrag für Arbeitspakete 7–10

**Projekt:** Kearly Candle Studio / Kearly Candle Workshop  
**Bestehende Website:** https://candlestore-kerzengiessen.stonypearl1024.chatgpt.site/  
**Bearbeitungsmodus:** `INCREMENTAL_EDIT_EXISTING_SITE` – bestehende Implementierung erhalten, **kein Neubau**  
**Reihenfolge:** AP7 → AP8 → AP9 → AP10, abschließend V0.7-Gesamtprüfung gegen AP1–AP10  
**Stand dieses Dokuments:** Umsetzungsanweisung anhand des vorliegenden veröffentlichten Website-Textstands. Der editierbare Quellcode war nicht zugänglich; **Änderungen, Veröffentlichung und Browser-/Gerätetests sind noch nicht ausgeführt**.

---

## Verbindliche Authority – nicht ändern

| Gegenstand | Freigabestand |
|---|---|
| Öffentlicher Standardpreis | **39 € pro Person** |
| Workshopdauer | **ca. 2,5–3 Stunden** |
| Öffentliche Gruppe | **4–6 Personen** |
| Kerzen | **in der Regel 3–4 eigene Kerzen**, keine 4er-Garantie |
| Wachs | **bis zu 1 kg Kerzenwachs pro Person** |
| Farbe / Duft | inklusive; duftfrei möglich |
| Formen | **rund 300 im Gesamtbestand**, nicht alle zum jeweiligen Termin verfügbar |
| Private Workshops | Anfrage möglich; Preise und Mindestumsatz **nicht freigegeben** |
| Direkte Buchung | `DIRECT_BOOKING_READY = NO` |
| Abholung/Mitnahme | nicht final; keine sofortige Mitnahme und keine feste Abholzeit versprechen |
| Öffentliche Termine | ohne konkret freigegebene Daten nicht vorgeben |

Nicht wieder einführen: 59 €, private 65 €/Person, 390 € bzw. 195 € Mindestumsatz, 8 Teilnehmende, exakt eine Kerze, garantierte 4 Kerzen, alle 300 Formen immer verfügbar, Fake-Checkout, Fake-Verfügbarkeit, erfundene Kundenbewertungen.

---

# AP7 – Private Workshops & Gruppenanfrageformular

**Änderungsgrenze:** vorhandene Private-Workshop-Sektion, Auswahl der Anlässe und bestehendes Anfrageformular. Keine neuen Pakete, Preise oder Produkte.

### A. Private-Workshop-Bereich

**Headline (H2, unverändert):**

> Euer Workshop. Eure Runde.

**Neue Subheadline:**

> Ob JGA, Geburtstag, Date Night oder kreativer Nachmittag mit Freunden – fragt euren privaten Kearly Candle Workshop individuell an.

**Anlässe als fünf kompakte Auswahloptionen statt Produktpakete:**

1. `JGA` → Formularwert `JGA`
2. `Geburtstag` → Formularwert `Geburtstag`
3. `Freunde` → Formularwert `Freundesgruppe`
4. `Date Night` → Formularwert `Paare / Date Night`
5. `Firmenevent` → Formularwert `Firmenevent`

Die fünf Optionen sind Inspiration und/oder Vorauswahl für das **eine** vorhandene Formular. Falls klickbar, muss ein Klick den Wert des tatsächlichen Anlass-Selects setzen und nach Möglichkeit das Formular fokussieren oder sichtbar machen. Auswahlzustand und Tastaturbedienung eindeutig gestalten; wenn die Chips nicht funktional sind, als reine Textelemente darstellen und nicht wie Links/Buttons aussehen lassen. **Keine fünf separaten Buchungsflows.**

**CTA:** `Private Gruppe anfragen` → existierender Formularanker.

Private Preise bleiben unsichtbar, insbesondere keine 65 €, 390 € oder 195 €. Öffentliche 4–6-Personen-Regel **nicht ungeprüft als starres Limit für private Gruppen übernehmen**.

### B. Formularfelder, Labels und Platzhalter

| Sichtbares Feldlabel | Steuerelement | Werte/Placeholder | Pflicht? |
|---|---|---|---|
| **Anlass** | Select | `Bitte auswählen`, `JGA`, `Geburtstag`, `Freundesgruppe`, `Paare / Date Night`, `Firmenevent` | Ja |
| **Teilnehmerzahl** | positive ganze Zahl bzw. vorhandener passender Selector | keine erfundenen privaten Gruppengrenzen | Ja |
| **Wunschdatum** | Datumsauswahl | verständliche deutsche Datumsanzeige, z. B. `TT.MM.JJJJ` | Ja |
| **Alternativdatum** | Datumsauswahl | optional | Nein |
| **Dein Name** | Textinput | `Vor- und Nachname` | Ja |
| **E-Mail** | E-Mail-Input | `name@beispiel.de` | Ja |
| **Telefon** | Tel-Input | optional | Nein |
| **Nachricht** | Textarea | `Was sollten wir über eure Gruppe wissen?` | Nein |

**Ein Label pro Feld:** Kein sichtbares `Anlass * Anlass *`, `Teilnehmerzahl * Teilnehmerzahl *` oder `Dein Name * Dein Name *`. Beim tatsächlichen Rendering prüfen, ob diese Dopplungen auf separate Placeholder/Labels zurückgehen – aus barrierefrei extrahiertem Seitentext allein ist nicht zuverlässig erkennbar, ob sie visuell doppelt erscheinen. Sichtbar doppelte Labels bereinigen, aber die zugängliche Benennung nicht entfernen.

Technische Mindestregeln:
- Jedem Eingabefeld eine eindeutige `id` geben und mit einem sichtbaren `<label for="...">` verbinden; Pflichtfelder konsistent kennzeichnen (`required` und verständliche Kennzeichnung).
- `type="email"`, `type="tel"`, `type="number"` bzw. kompatible vorhandene Komponenten. Für die Teilnehmerzahl positive Ganzzahlen validieren, **keine erfundenen privaten Obergrenzen**.
- `autocomplete="name"`, `autocomplete="email"`, `autocomplete="tel"` wo sinnvoll.
- Nur erforderliche personenbezogene Daten erheben.
- Bestehende reale Submission-Logik erhalten und tatsächlich überprüfen. **Erfolg erst nach bestätigter Annahme durch Backend/Empfänger**. Bei fehlender Backend-Anbindung keine Erfolgsmeldung oder Scheinanfrage simulieren.
- Während der Übermittlung doppelte Absendungen vermeiden; bei Netzwerkfehler verständliche Fehlermeldung und erhaltene Eingaben.

### C. Datumsdarstellung

- Dokument `lang="de"`, UI-Texte Deutsch; Datumsanzeige für deutsche Besuchende verständlich.
- `lang="de"` garantiert **nicht**, dass ein natives Browser-Datepicker-UI auf jedem System deutsch angezeigt wird. Wenn aktuelle Mobil-/Desktopansicht weiterhin englische `Month / Day / Year`-Texte zeigt, tatsächlich unterstütztes lokales Datumsfeld verwenden oder eine deutsche Erläuterung anbieten; **keine bestehende funktionierende Datumsauswahl leichtfertig ersetzen**.
- Werte intern eindeutig speichern/versenden (z. B. ISO `YYYY-MM-DD`), lokal lesbar darstellen. Keine festen verfügbaren Workshoptermine oder Restriktionen erfinden.

### D. Datenschutzhinweis und echtes Anfrage-Ergebnis

**Direkt oberhalb des Absende-Buttons oder gut sichtbar am Formular:**

> Deine Angaben verwenden wir ausschließlich zur Bearbeitung deiner Anfrage.

**Daneben oder darunter echter Link:** `Datenschutzerklärung` → freigegebene, tatsächlich erreichbare Datenschutzerklärung. Linkziel vor Livegang prüfen; keine Datenschutzerklärung oder rechtliche Behauptungen improvisieren. Sollten andere technische Verarbeitungsvorgänge erfolgen, Text gegen die tatsächliche Datenschutzerklärung abgleichen.

**Submit:** `Private Gruppe anfragen` (kein „Jetzt buchen“).

**Erfolg – ausschließlich nach erfolgreicher echter Übermittlung:**

> **Danke für deine Anfrage.**  
> Wir prüfen euren Wunschtermin und melden uns bei dir, um die Details abzustimmen.  
> Die Anfrage ist noch keine verbindliche Buchung.

**Fehlerbeispiele in deutscher Sprache:**
- `Bitte wähle einen Anlass.`
- `Bitte gib die ungefähre Teilnehmerzahl an.`
- `Bitte wähle dein Wunschdatum.`
- `Bitte gib deinen Namen ein.`
- `Bitte gib deine E-Mail-Adresse ein.`
- `Bitte prüfe deine E-Mail-Adresse.`
- `Deine Anfrage konnte gerade nicht gesendet werden. Bitte versuche es erneut.`

Fehler direkt beim jeweiligen Feld und bei Bedarf zusammenfassend anzeigen; Fokusführung / `aria-describedby` bzw. `aria-invalid` beachten. Keine technische Fehlermeldung mit Stacktrace oder unübersetzter API-Ausgabe sichtbar lassen.

**Mobile:** einspaltig; beide Datumsfelder untereinander; angenehm hohe Inputs; ausreichende Abstände und Fokuszustände; Absende-CTA über volle Breite; kein horizontaler Overflow bei 375–430 px.

**AP7-Abnahme:** ein eindeutiges Formular, reale funktionierende Submission, nachvollziehbarer Anfrage- statt Buchungsstatus, deutsche Sprache, keine sichtbaren doppelten Labels, echte Datenschutzerklärung erreichbar, keine privaten Preisangaben erfunden.

---

# AP8 – Galerie & Bildsprache

**Änderungsgrenze:** vorhandene Galerie und Bildverwendung innerhalb der bestehenden Abschnitte. Keine vollständige Seitengestaltung oder neue Galerie-Unterseite.

### A. Zielbild / ehrlicher Ist-Zustand

Ziel über spätere echte Fotoproduktion: **etwa 70–80 % authentische Fotografie**, **20–30 % Atelierillustration/Branding**. Diese Quote ist ein **späteres Gestaltungsziel, kein aktueller Beleg**, solange die realen Fotos fehlen. Die bestehenden stärksten 2–3 Atelierillustrationen bleiben nutzbar (Gießen, Materialien, Hände am Tisch), aber klar als Illustrationen/Branddetails.

**Keine erfundenen Veranstaltungen, Teilnehmenden, Testimonials oder Fantasieformen als echte Kearly-Nachweise.** Ein neues generiertes Gruppenfoto darf nicht aussehen, als dokumentiere es einen tatsächlich durchgeführten Kearly-Workshop.

### B. Acht interne Foto-Slots

| ID | Inhalt / Anforderung | Einbau-Priorität | Sichere Zwischenlösung |
|---|---|---|---|
| `P1_FOTO_HERO` | echte Kearly-Gieß-/Workshopaufnahme | hoch | vorhandene dominante Atelierillustration beibehalten |
| `P1_FOTO_FORMENVIELFALT` | viele nachweisbar vorhandene Kearly-Formen / Kerzen | hoch | vorhandene grafische Formen-Kategorien |
| `P1_FOTO_GIESSEN` | echte Hände beim Gießen | hoch | vorhandene Gießillustration, nicht als Fotografie ausgeben |
| `P1_FOTO_FARBE` | echte Farben und Materialprozess | mittel | vorhandene Farbillustration |
| `P1_FOTO_DUFT` | tatsächlich vorhandene Duftauswahl | mittel | vorhandene Duft-/Atelierillustration |
| `P1_FOTO_GRUPPE` | authentische Aufnahme einer Gruppe von 4–6 Personen | hoch | kein erfundenes Gruppenfoto; den Gruppenabschnitt aus AP5 kompakt halten |
| `P1_FOTO_ERGEBNIS` | mehrere echte, unterschiedliche fertig gegossene Kerzen | hoch | kein vorgespiegeltes Produktbild |
| `P1_FOTO_WORKSHOPTISCH` | echter vorbereiteter Kearly-Workshoptisch | mittel | vorhandenes Material-/Tischmotiv |

`P1 FOTO` nur intern (Projekt-Tickets, Assetlisten oder Codekommentare) verwenden, **nicht als sichtbar gerenderten Kundentext**.

### C. Galerie-Copy

**H2:** `So fühlt sich kreativ sein an.`

**Subheadline:**

> Materialien, Formen, Farben und der Moment, in dem aus deiner Idee eine eigene Kerze wird.

Die bestehende Galerie mit Illustrationen bleibt vorläufig eine **gestalterische Vorschau** und darf nicht als Fotobeweis tatsächlicher Events erscheinen. Sichtbare Entwickler-/Assetlabels wie `Atelierillustration` entfernen, aber bei echten alternativen Texten die Art des Motivs korrekt benennen, etwa `Illustration einer Hand, die Wachs in eine Kerzenform gießt`.

### D. Gestaltungs- und Auslieferungsregeln

- Sobald echte Fotos vorliegen: Desktop **editorial mosaic** mit einem großen Hauptbild, zwei Nebenbildern und einer breiteren Prozessaufnahme; nicht acht gleich große Quadrate.
- Mobil: ausreichend große Fotos vertikal oder eine gut bedienbare, eindeutige horizontale Galerie; keine Mikrokacheln.
- **Kein leeres Raster mit acht Platzhaltern live schalten**, solange reale Fotos fehlen. Bestehenden Galerieaufbau reduziert und glaubwürdig beibehalten.
- Echte Fotos mit beschreibenden, nicht werblichen Alt-Texten; dekorative Illustrationen je nach Rolle mit leerem `alt=""` oder treffender Illustrationserklärung (nicht doppelt unmittelbar benachbarte sichtbare Texte vorlesen).
- Medien nach Möglichkeit WebP/AVIF; sinnvolle `srcset`/`sizes`, definierte `width` und `height` oder Seitenverhältnis gegen Layout Shift.
- Hero-Medium nicht unnötig lazy laden; nachfolgende Galerie-/Abschnittsbilder `loading="lazy"`, falls sinnvoll; Hero-Priorisierung prüfen.
- Beim Einbau neuer Fotos Quellen-/Nutzungsrechte, tatsächliche Verfügbarkeit der Formen und bei Personenbildnissen die notwendige Freigabe berücksichtigen.

**AP8-Abnahme:** keine sichtbaren Assetentwicklerlabels, keine als echt getarnten generierten Workshopbilder, realer Bildstatus transparent, bestehende gute Atelierillustrationen erhalten, Foto-Slots im Projekt intern vorbereitet, responsive und leistungsfähige Medienkonfiguration.

---

# AP9 – FAQ

**Änderungsgrenze:** ausschließlich den vorhandenen FAQ-Accordion-Bereich ändern. Format, aufklappbare Logik und die Überschriftenstruktur beibehalten, soweit funktional. Die derzeitige Website nennt bislang weniger Fragen; den Bereich inhaltlich erweitern, **ohne neue Sektion**.

**H2:** `Noch eine Frage?` kann bestehen bleiben.

## Freigegebene zehn Fragen mit verbindlichen Antworten

**1. Wie lange dauert der Workshop?**  
Plane für deinen Kearly Candle Workshop etwa 2,5–3 Stunden ein.

**2. Wie viel kostet der Workshop?**  
Der reguläre öffentliche Kearly Candle Workshop kostet 39 € pro Person.

**3. Wie viele Kerzen gieße ich?**  
Im Workshop kannst du in der Regel 3–4 eigene Kerzen gießen. Wie viele es genau werden, hängt von deinen gewählten Formen, deren Größe und der verfügbaren Zeit ab.

**4. Wie viel Wachs ist enthalten?**  
Für deine Kerzen stehen dir insgesamt bis zu 1 kg Kerzenwachs pro Person zur Verfügung.

**5. Kann ich aus allen rund 300 Formen wählen?**  
Kearly verfügt über eine große Formenbibliothek mit rund 300 verschiedenen Formen im Gesamtbestand. Welche Formen bei deinem Termin tatsächlich zur Auswahl stehen, hängt unter anderem von Größe, Verfügbarkeit, aktueller Nutzung, Workshopzeit und deinem Wachsrahmen ab.

**6. Ist Farbe inklusive?**  
Ja. Farbe ist im Workshoppreis enthalten. Deinen Farbton wählst du aus der aktuellen Auswahl direkt im Workshop.

**7. Kann ich meine Kerzen beduften?**  
Ja. Duft ist im Preis enthalten. Du wählst deinen Favoriten aus den beim Workshop verfügbaren Düften – oder du gießt deine Kerzen ganz ohne Duft.

**8. Wie viele Personen nehmen teil?**  
Die Workshops finden bewusst in kleinen Gruppen mit maximal 6 Personen statt. Öffentliche Workshops sind für Gruppen ab 4 Teilnehmenden geplant.

**9. Kann ich meine Kerzen direkt mitnehmen?**  
Nach dem Gießen benötigen deine Kerzen noch Zeit für die letzten Schritte. Die genaue Abholregel teilen wir dir rechtzeitig vor deinem Termin mit.

**10. Können wir als private Gruppe kommen?**  
Ja. Private Kearly Candle Workshops könnt ihr zum Beispiel für JGAs, Geburtstage, Freundesgruppen, Paare oder Firmenevents anfragen.

**Reihenfolge:** Die Nutzer-Vorgabe listet neun FAQ-Positionen, enthält aber zusätzlich eine freigegebene Wachsfrage. Deshalb sind hier **alle zehn freigegebenen Antworten** aufgenommen, mit Wachs direkt nach Kerzenanzahl.

### Umsetzung FAQ

- Fragen als echte `<button>`-Steuerelemente oder vorhandene native `<details><summary>`-Komponente mit Tastaturbedienung; keine Schein-Accordion-`div`s.
- Bei Button-Accordions `aria-expanded` und dazugehörige Panel-Zuordnung korrekt aktualisieren.
- Mobil alle FAQs über die nutzbare Inhaltsbreite; keine abgeschnittenen Fragen, Zeilenumbrüche erlaubt.
- Antworten bleiben 1–2 kurze Sätze, maximal 2–4 Sätze falls unvermeidbar.
- Bestehende Antworten nur durch die freigegebenen ersetzen und die 10 Fragen hinzufügen, **keine unklaren Regeln auffüllen**.
- Keine Gutscheinfrage und keine Storno-/Umbuchungsfrage öffentlich anzeigen, solange die jeweilige Policy nicht freigegeben ist.
- Keine Opening-Rabatt-Erwähnung ohne echten Opening-Termin.

**AP9-Abnahme:** zehn freigegebene Antworten, frei von Garantieversprechen, korrekt bedienbares Accordion, keine erfundenen Gutschein-, Zahlungs-, Storno- oder Take-home-Regeln.

---

# AP10 – Footer, SEO, Qualitätssicherung und technischer Abschluss

**Änderungsgrenze:** Footer, Metadaten, Semantik, Navigation/Anker und bestehende Komponenten gezielt korrigieren. Kein Rebuild, keine neuen Produkte oder Geschäftsentscheidungen.

### A. Footer

**Marke:** `KEARLY CANDLE STUDIO`  
**Claim:** `Von dir gestaltet. Mit Liebe gegossen.`

**Navigationslinks:**
- `Formen` → tatsächliche Formen-Sektion
- `Workshop & Preis` → bestehende Preis-Sektion
- `Private Workshops` → bestehende Private-Sektion

**Rechtslinks:** `Impressum` und `Datenschutz` – **nur mit echten, erreichbaren, freigegebenen Zielen**, nicht auf `#`, eine nicht existierende Route oder erfundene Rechtstexte verlinken. Fehlen die Ziele, ist dies ein offener P0-Befund, kein „PASS“.

**Kontakt:** ausschließlich freigegebene tatsächliche Kontaktdaten. Keine erfundene Telefonnummer, E-Mail-Adresse oder Instagram-Präsenz.

### B. Datenschutz am Formular

Gut sichtbar in unmittelbarer Nähe des Absende-Buttons:

> Hinweise zur Verarbeitung deiner Daten findest du in unserer Datenschutzerklärung.

Das Wort `Datenschutzerklärung` auf das geprüfte Datenschutz-Ziel verlinken. Den Text auf Übereinstimmung mit der tatsächlichen Datenverarbeitung prüfen. Keine erfundene Datenschutzerklärung, keine Dummyseite.

### C. SEO

**Title:** `Kerzengieß-Workshop in Bochum | Kearly Candle Studio`  
Verwenden, sofern Bochum weiterhin der bestätigte Workshopstandort ist.

**Meta Description:**  
`Kerzengieß-Workshop in Bochum bei Kearly: 39 € pro Person, in der Regel 3–4 Kerzen, große Formenwahl, Farbe & Duft inklusive und max. 6 Personen.`

Eine **einzige H1**:

> Gieß dir deine eigenen Designkerzen.

Alle nachgeordneten Bereichsüberschriften sinnvoll als H2 und Detailüberschriften als H3 aufbauen, unabhängig von ihrer visuellen Größe. Keine redundanten versteckten H1 für Logo oder SEO einführen. Dokument `lang="de"`; deutsches Formular/Validierungstexte.

### D. Navigation und Anker – V0.7-Gesamtabgleich

| Sichtbarer Link | Erwartetes Ziel |
|---|---|
| `Formen` | vorhandene Formenbibliothek |
| `Ablauf` | vorhandene sechs Workshoptimeline-Schritte |
| `Workshop & Preis` | vorhandene Preis-Sektion |
| `Private Workshops` | vorhandene Private-Sektion |
| `Termine & Infos` | tatsächlicher Termin- bzw. Preis-/Terminstatus |
| `Termine ansehen` | tatsächlicher Terminstatus nach dem Preisbereich |
| `Private Gruppe anfragen` | vorhandenes echtes Formular bzw. dessen Abschnitt |

Alle `href`/Anker-IDs **im realen Code ermitteln** und auf tatsächlich existierende eindeutige IDs verweisen. Bei sticky Header ggf. `scroll-margin-top`; kein Link darf nur `#` oder eine nicht existente Route verwenden. „Jetzt buchen“ darf nicht als funktionsloser CTA auftauchen.

### E. Accessibility-Ziel: WCAG 2.2 AA soweit praktikabel

- Sichtbare Tastatur-Fokusanzeige, keine `outline: none` ohne gut sichtbaren Ersatz.
- Hoher Kontrast für Text und Espresso-Buttons; nicht nur Farbe als Fehlersignal.
- Touch-/Klickziele bequem groß und ausreichend voneinander entfernt.
- Echte `label`/`for`-Zuordnungen; sichtbare Pflichtfeldinformation und verständliche Fehlermeldungen.
- Accordion mit korrekter Semantik und `aria-expanded` (falls Button-Ansatz).
- Menü und Formular per Tastatur und Screenreader bedienbar; Mobilmenü schließbar.
- Keine irreführenden Alt-Texte, keine sichtbaren Entwicklerlabels.
- Bewegungs-/Scrollanimation bei `prefers-reduced-motion: reduce` reduzieren.
- Keine leeren Links, Buttons ohne Funktion oder versteckte Fokusfallen.

### F. Performance / Mobil

- Bei 375, 390, 430 px sowie Tablet/Desktop echte Screenshots und Interaktion prüfen.
- Bilder responsive und komprimiert; Hero priorisiert, Galerie möglichst lazy; Dimensionen/Aspect Ratio festgelegt.
- Keine neue große JS-Bibliothek nur für Carousel, Datepicker oder Accordions, wenn vorhandene Mittel ausreichen.
- Webfonts nur tatsächlich benötigte Schnitte laden; Layout Shift und Blocking Ressourcen prüfen.
- Inhalte zuerst klar, nicht komplex: sehr schneller Hero mit 39 €, Dauer, in der Regel 3–4 Kerzen, maximal 6 Personen und `Termine & Infos`.

### G. Endprüfung nach AP1–AP10

Suchen in Quelltext, sichtbarem DOM, alten versteckten CTA-Varianten und FAQ – nicht nur nach Wortlaut, auch nach Aussage:

| Verbotene/alte Aussage | Erwartete Korrektur |
|---|---|
| 59 €, 65 €, 390 €, 195 € | keine alten bzw. unfreigegebenen Preise |
| 8 Teilnehmende | öffentliche Workshops 4–6 |
| 1 Kerze bzw. garantierte 4 Kerzen | „in der Regel 3–4“ |
| alle 300 Formen jederzeit verfügbar | „rund 300 Formen im Gesamtbestand“ plus Verfügbarkeitshinweis |
| direkt mitnehmen / Folgetag garantiert | unbestimmte spätere Fertigstellung / Abholinfo |
| buchbare Termine ohne echten Kalender | „Neue Workshoptermine sind gerade in Vorbereitung.“ |
| Newsletter/Termin-Alert ohne Einwilligungs-/Speicherlösung | nicht veröffentlichen |
| erfundene Privatpreise | private Anfrage ohne Preisangabe |
| `Workshop entdecken` als unklarer Primary CTA | `Termine & Infos` |
| sichtbares `Atelierillustration` oder `P1 FOTO` | aus sichtbarer UI entfernen |
| Doppel-Labels | ein Label, sinnvoller Placeholder und zugängliche Benennung |

**Offen lassen:** konkrete öffentliche Termine/Uhrzeiten, Bezahlung, Stornierung, Umbuchung, Nichterscheinen, Ersatzperson, feste Abholzeit, Gutscheine, private Workshoppreise/-Mindestumsatz, konkrete Farben/Düfte und Add-ons.

### H. Abschlussprotokoll – kein PASS ohne echten Nachweis

| Prüfgebiet | Bis zu echter Implementierung/Prüfung | Notwendiger Nachweis |
|---|---|---|
| DESKTOP | NOT_VERIFIED | Render-Screenshots, Layout- und CTA-Tests |
| MOBILE | NOT_VERIFIED | 375/390/430px und echte Interaktion |
| ACCESSIBILITY | NOT_VERIFIED | Tastatur, Screenreader-Semantik, Kontrast, Fokus |
| FORM | NOT_VERIFIED | Backend-/Sendeprüfung, Validierung, Erfolg/Fehler |
| LEGAL LINKS | NOT_VERIFIED | reale erreichbare Datenschutz-/Impressumsziele |
| SEO | NOT_VERIFIED | HTML Title/Description/H1/Sprachattribute |
| PERFORMANCE | NOT_VERIFIED | nachvollziehbare Mobil-/Ladeprüfung |
| CONTENT AUTHORITY | NOT_VERIFIED | Angebots- und Ausschlussliste im tatsächlichen UI |

**Wichtig:** Sollte beim Live-Code eine echte Datenschutzerklärung, ein funktionierender Form-Endpunkt oder ein geeigneter Bildnachweis fehlen, kein falsches `PASS` melden. Bestehende Funktionen nicht ohne Rückfall-/Review-Plan brechen.

---

# Direkt nutzbarer Auftrag an Codex / Website-Editor

> Öffne **das bestehende** Projekt der veröffentlichten Kearly-Candle-Workshop-Website. Bearbeite nur Arbeitspakete 7, 8, 9 und 10 gemäß diesem Dokument. Zuerst vorhandene Dateistruktur, Komponenten, Formularbackend, vorhandene Bildassets, Routen und Anker read-only untersuchen; nicht neu scaffolden. Vermeide Konflikte mit den bereits spezifizierten AP1–AP6 und bewahre die aktuelle V0.7-Authority. Implementiere nacheinander AP7 (Private + Anfrage), AP8 (Galerie/Bildslots), AP9 (FAQ) und AP10 (Footer/SEO/Technik). Keine Geschäftsentscheidungen, künstlichen Buchungen, Foto-Behauptungen, neuen Preise oder juristischen Texte erfinden. Nutze reale bestehende Komponenten und Assets. Prüfe die tatsächliche Funktion per Build/Lint soweit vorhanden, responsive Browserdarstellung, Formularerfolg und -fehler, Links und Tastaturzugänglichkeit. Dokumentiere pro AP: geänderte Dateien, Ausgangsbefund, Änderungen, Tests samt konkreten Ergebnissen und offene Blocker. **Nicht behaupten, Änderungen seien veröffentlicht oder erfolgreich getestet, solange keine tatsächlichen Belege vorliegen.**

## Handoff-Status

`AP7 = SPEC_READY / NOT_IMPLEMENTED`  
`AP8 = SPEC_READY / NOT_IMPLEMENTED`  
`AP9 = SPEC_READY / NOT_IMPLEMENTED`  
`AP10 = SPEC_READY / NOT_IMPLEMENTED`  
`DIRECT_BOOKING_READY = NO`  
`LIVE_SITE_CHANGE = NOT_PERFORMED`
