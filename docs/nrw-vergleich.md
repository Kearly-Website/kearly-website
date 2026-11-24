> Historischer Stand vom 18.10.2026. Angebot und UI-Ableitungen wurden durch die verbindliche V0.6-Freigabe in authority-v06.md ersetzt. Die Recherche ist keine erneute Angebotsfreigabe.

# Kearly: Vergleich mit Workshop-Anbietern in NRW

Stand: 18. Oktober 2026. Betrachtet wurden öffentlich sichtbare Workshopseiten. Dies ist eine qualitative Prüfung von Inhalt, Orientierung und Anfragewegen, kein gemessenes Conversion-Ranking. Die beobachteten Fakten und die daraus abgeleiteten Gestaltungsempfehlungen sind getrennt aufgeführt.

## Vergleich

| Anbieter und Region | Beobachtung auf der Anbieterwebsite | Schlussfolgerung für Kearly |
| --- | --- | --- |
| [hi sunny, Düsseldorf](https://hi-sunny.de/workshops/p/kerzenherstellung) | Die Seite verbindet eine Fotogalerie mit Preis, Datumsauswahl und Buchungsbutton. Weiter unten stehen Dauer, Ort, Leistungen und Teilnahmeinformationen. Der abgerufene Preis für Kerzenherstellung beträgt 55 €. | Reale Bilder und klare Eckdaten helfen bei der Entscheidung. Kearly muss die entsprechenden Angaben nach Freigabe ebenso konkret ergänzen. Die eigene Orientierung und Gruppenanfrage können bereits jetzt übersichtlicher werden. |
| [Stilwald, Köln](https://stilwald.de/workshop/duftkerzen/) | Die Workshopseite erläutert Ablauf und fachlichen Hintergrund ausführlich. Sie nennt Preis, Dauer, Teilnehmerrahmen, Ort und konkrete Termine. Der abgerufene Preis beträgt 55 €. | Fachliche Klarheit und Buchungsinformationen sind ein Maßstab. Kearly erklärt den freigegebenen Ablauf kompakt und trennt Inspiration von tatsächlicher Verfügbarkeit. Die fehlenden eigenen Angebotsdaten werden nicht durch fremde Konditionen ersetzt. |
| [an einem tisch, Köln](https://an-einem-tisch.de/duftkerzen/) | Der Anbieter beschreibt Ergebnis, Inklusivleistungen, Dauer und Studios und verweist zusätzlich auf private Gruppenveranstaltungen. | Öffentliche Workshops und private Runden müssen direkt unterscheidbar sein. Kearly führt diese Wege sichtbar und zeigt beim Gruppenformular, was nach dem Absenden passiert. |
| [Kerzencraft, Ruhrgebiet](https://kerzencraft.de/pages/workshops) | Die Workshopübersicht führt zu Terminen bei mehreren Partner-Locations, unter anderem Bochum und Essen. Die Seite ist in einen Kerzenshop eingebettet. | Ein eigener, zusammenhängender Workshopweg bietet Kearly die Möglichkeit, Besucher ohne Wechsel in andere Angebote von der Inspiration zur Anfrage zu führen. Die vormerkbaren Wünsche werden deshalb im selben Formular übernommen. |
| [The Craft Studio, Düsseldorf](https://www.the-craftstudio.de/workshop-kerzen-seife) | Die Seite ordnet Kerzenangebote in mehrere Kreativthemen und Gruppenanlässe ein. Der dortige Kerzenkurs ist Dip-Dye/Gestalten; der abgerufene Preis ist 39 €. Das ist ein angrenzendes Angebot und kein gleichwertiger Preisvergleich zum Kerzengießen. | Kearly wird als Dachmarke dargestellt und die konkrete Website klar mit Kerzenworkshops bezeichnet. Zusätzliche Unternehmensbereiche werden erst ergänzt, wenn sie tatsächlich feststehen. |

Die Fakten stammen aus den verlinkten Originalseiten, abgerufen am 18.10.2026. Preise sind Momentaufnahmen und keine Empfehlung für Kearlys Preisgestaltung. Bei hi sunny und Kerzencraft wurde zusätzlich der sichtbare Einstiegsbereich im Browser betrachtet. Fremde Fotos, Texte, Leistungen und Markengestaltungen wurden nicht übernommen.

## In dieser Version umgesetzt

1. **Dachmarke Kearly:** sichtbare Wortmarke, Unterzeile Kerzenworkshops, Hero-Kennzeichnung, private Workshoptexte, Footer, Seitentitel, Social-Metadaten, Fehlerseite, vorbereitete rechtliche Seiten und Favicon aktualisiert. Markenangaben sind in `app/brand.ts` zentralisiert. Die bestehende Webadresse bleibt erreichbar.
2. **Inspiration merken:** Formenwelten und Duftwelten lassen sich optional vormerken und wieder entfernen. Es handelt sich um Kategorien, nicht um verfügbare Einzelprodukte. Die Option ohne Duft bleibt erkennbar.
3. **Durchgängige Gruppenanfrage:** Die gemerkten Wünsche werden direkt in die passenden Formularfelder übernommen. Sie lassen sich dort ändern. Auswahlzustände und Formularfelder werden über einen gemeinsamen React-Kontext synchron gehalten; es gibt keine Speicherung auf dem Gerät und keine Reservierungszusage.
4. **Anlässe verständlicher:** JGA, Geburtstag, Freundesgruppe, Paare und Firmenevent erhalten kurze, eigenständige Beschreibungen. Die Auswahl trägt den Anlass in das bestehende Formular ein; es werden keine neuen Workshopprodukte erzeugt.
5. **Weniger Unsicherheit:** Neben der Gruppenanfrage steht der weitere Ablauf. Eine Zusammenfassung zeigt Anlass, gewünschte Personenzahl und Wunschdatum vor dem Absenden. Es gibt weiterhin keine automatische Buchungsbestätigung oder Zahlung.
6. **Bessere Lesbarkeit:** wichtige Beschreibungen, Kartenüberschriften und Auswahlflächen wurden vergrößert; Tastaturbedienung, Fokuszustände, Touchflächen und die reduzierte mobile Darstellung bleiben erhalten.

## Wo noch kein Vorsprung behauptet werden kann

Die untersuchten buchbaren Angebote sind bei echten Fotos, konkreten Konditionen und sofortiger Terminbuchung weiter. Kearly kann diese Informationen erst zeigen, wenn sie bestätigt sind. Es werden weder eine höhere Conversion noch bessere Ladezeiten oder Barrierefreiheit gegenüber Wettbewerbern behauptet; dafür fehlen vergleichbare Messungen.

Die nächsten wirksamen Ergänzungen sind echte Workshopfotos, Betreiber-/Standortdaten, tatsächliche Preise und Zeiten, eine festgelegte Anfragebearbeitung samt Benachrichtigung und anschließend eine echte Buchungsstrecke. Gutscheine, Add-ons, Storno- und Zahlungsregeln bleiben bis zur fachlichen Freigabe deaktiviert.

## Technische Übergabe

Neue Dateien: `app/brand.ts`, `app/components/workshop-preferences.tsx`, `app/kearly-refinements.css`.
Geänderte Hauptdateien: `app/page.tsx`, `app/layout.tsx`, Workshopsektionen, interaktive Bereiche, Gruppenformular, Favicon und vorbereitete rechtliche Seiten.

Die bestehende D1-Datenbank und deren Schema werden beibehalten. Gruppenanfragen werden gespeichert; ein automatischer E-Mail-Versand ist weiterhin nicht eingerichtet. Die Site bleibt privat.

## Validierung der Umsetzung

TypeScript, ESLint und der Produktionsbuild sind erfolgreich. Die 13 vorhandenen API-Prüfungen bestehen weiterhin. Eine zusätzliche lokale Browseranfrage hat die gemerkte Formenwelt „Modern & Minimal“, die Duftpräferenz „Ohne Duft“, den Anlass JGA, die gewünschte Anzahl 6 und das Wunschdatum korrekt bis in die lokale D1-Datenbank übertragen. Die Anfrage bestätigte erst nach dem Speichern den Eingang.

Die Darstellung wurde bei 375, 430, 768 und 1440 Pixeln ohne horizontalen Überlauf geprüft. Im sichtbaren Seiteninhalt ist der alte Markenname entfernt; die bestehende Webadresse bleibt bewusst erhalten. Die Seite besitzt eine H1, beschriftete Eingabefelder und weiterhin die Tastatursteuerung für Tabs. Prüf- und Beispielanfragen liegen ausschließlich in der lokalen Vorschau und werden nicht ins Hosting übertragen.
