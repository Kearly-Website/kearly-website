# Kearly.de: korrigierter SEO-Befund und Umsetzung

Stand: 23.11.2026. Dieser Bericht betrifft die öffentliche Hauptdomain https://kearly.de und ersetzt für diese Domain die zuvor aus der privaten Workshop-Kopie abgeleiteten Schlussfolgerungen.

## Korrektur der ursprünglichen Zuordnung

Die private Workshop-Site candlestore-kerzengiessen.kevingraf01.chatgpt.site ist ein getrenntes Sites-Projekt. Dort wurden HTTP 401, noindex und fehlende Rechtslink-Konfiguration tatsächlich festgestellt. Diese Befunde dürfen jedoch nicht auf kearly.de übertragen werden.

Die öffentliche Hauptdomain ist ein anderes, bereits veröffentlichtes Projekt. Vor der Änderung:

- / und /workshop: öffentlich HTTP 200, index/follow und passende kanonische URLs.
- /robots.txt: öffentlich, erlaubt öffentliche Inhalte und verweist auf die Sitemap.
- /sitemap.xml: öffentlich, enthält 11 Angebots-/Inhaltsseiten.
- /impressum und /datenschutz: öffentlich HTTP 200. Die Datenschutzhinweise behandeln ausdrücklich Wedding- und Workshop-Anfragen sowie Hosting und Kontaktwege.
- Die Hauptseite hat bereits einen Google-Verifizierungseintrag und Organization-/WebSite-Daten.
- Die Verwaltungsbereiche sind geschützt und werden separat von der Indexierung ausgeschlossen.

Die Rechtstexte wurden weder neu verfasst noch als vollständig rechtlich geprüft bescheinigt. Impressum und Datenschutz haben unterschiedliche Zwecke; ein Impressum ersetzt die Informationen zur Formularverarbeitung nicht.

## Tatsächliche Google-Daten

Im vorhandenen, zugänglichen Search-Console-Konto wurde die Property https://kearly.de/ geprüft:

- Übersicht: 10 indexierte und 4 nicht indexierte Seiten.
- Leistungsbericht, eingestellter Zeitraum 3 Monate, vorhandene Diagrammdaten 03.11. bis 21.11.2026: 22 Impressionen, 0 Klicks, durchschnittliche Position 4,8. Die Datenmenge ist sehr klein; daraus lässt sich keine allgemeine Position für Kerzenworkshop-Suchbegriffe ableiten.
- Sichtbare Suchanfragen: kearly (10 Impressionen), kerzenwerkstatt bochum (1 Impression). Die angezeigten Anfragen müssen nicht die gesamte aggregierte Zahl abdecken.
- Sitemap /sitemap.xml: bereits am 04.11.2026 eingereicht, zuletzt am 15.11.2026 gelesen, Status Erfolgreich, 11 erkannte Seiten. Keine unnötige erneute Einreichung.
- URL-Prüfung https://kearly.de/workshop: URL ist auf Google / Seite ist indexiert.
- Die 3 noindex-Ausschlüsse betreffen /datenschutz, /impressum und /wedding/hochzeit-anfragen/. Diese wurden nicht pauschal entfernt.
- https://kearly.de/wedding/kontakt/ war gefunden, aber nicht indexiert. Für diese URL wurde einmal die Indexierung beantragt. Google bestätigte die Aufnahme in die bevorzugte Crawling-Warteschlange. Das ist keine Zusage, dass die Seite inzwischen indexiert ist.

Ein Google-Unternehmensprofil für Kearly ist ebenfalls bereits vorhanden. Es ist nicht bestätigt. Der aufgerufene Bestätigungsprozess verlangt eine Postanschrift und erklärt, diese in diesem Schritt nicht öffentlich darzustellen. Die Richtigkeit der Geschäftsanschrift wurde beim Nutzer angefragt. Es wurde kein zweites Profil angelegt und keine Bestätigung vorgetäuscht.

## Website-Änderungen

- /workshop erhält strukturierte WebPage-/Service-Daten mit Referenzen auf die bereits vorhandene Kearly-Organisation und Website.
- Die Angaben beschreiben den tatsächlichen mobilen Workshop und das Einzugsgebiet Bochum, 70 km. Keine erfundenen Bewertungen, Termine, Privatpreise oder neue Geschäftsadresse.
- /workshop/ wird dauerhaft mit HTTP 308 nach /workshop weitergeleitet; Query-Parameter bleiben erhalten. Die Suchmaschine sieht damit die bevorzugte Schreibweise konsistent mit dem Canonical.
- Workshop-Links auf der Hauptseite verwenden dieselbe Adresse, auch beim Sprung zum Anfrageformular.
- Vorhandener Google-Verifizierungseintrag, Sitemap, Rechtsseiten und private Anfragenverwaltung bleiben erhalten.
- Zwei vorhandene Typisierungsprobleme wurden behoben: HTML-Raw-Importdeklaration und die von Cloudflare dokumentierte R2-include-Option. Die Laufzeit der Foto-API wurde dabei nicht verändert.

## Validierung

TypeScript und Produktionsbuild erfolgreich. 22 lokale Prüfungen erfolgreich: öffentliche Seiten, Indexierbarkeit, erhaltener Google-Verifizierungseintrag, Hauptseitenlinks, Canonical, eine H1, aktuelles Angebot, JSON-LD, keine erfundenen Schema-Daten, Weiterleitung mit Query-Erhalt, robots.txt, Sitemap mit 11 URLs, erreichbare Rechtsseiten und weiterhin gesperrte/noindex-Anfrageverwaltung.

Die gleichen lesenden Prüfungen werden nach der Veröffentlichung auf https://kearly.de wiederholt. Der Maschinenbericht liegt im Nutzer-Arbeitsordner outputs/seo-2026-11-23.

## Als Nächstes

1. Das vorhandene Unternehmensprofil mit korrekten Geschäftsdaten bestätigen; dabei kann ein persönlicher Nachweis durch Google erforderlich werden.
2. Echte freigegebene Workshopbilder, Bewertungen tatsächlicher Teilnehmer und Verweise von echten Kooperationspartnern ausbauen. Es wurden keine Nachrichten an Dritte versendet und keine Bewertungen angefordert.
3. Search Console nach Suchanfragen, Impressionen und Klicks bewerten. Wiederholte Indexierungsanträge sind kein Ersatz für relevante Inhalte und lokale Bekanntheit. Keine Rankinggarantie.

## Offizielle Hinweise

- Impressum: https://www.gesetze-im-internet.de/ddg/__5.html
- Webseiten-Datenschutz: https://www.lfd.niedersachsen.de/startseite/datenschutzreform/dsgvo/informationen_betreiber_von_webseiten/informationen-fuer-betreiber-von-webseiten-zur-anpassung-an-die-vorgaben-der-datenschutz-grundverordnung-ab-dem-25052018-164589.html
- Google URL-Prüfung: https://support.google.com/webmasters/answer/9012289?hl=de
- Indexierung anfordern: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=de
- Lokale Google-Sichtbarkeit: https://support.google.com/business/answer/7091/?hl=de
