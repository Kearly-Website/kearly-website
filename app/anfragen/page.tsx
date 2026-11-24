import { desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { getDb } from "../../db";
import { weddingInquiries, workshopInquiries } from "../../db/schema";
import { berlinToday } from "../inquiry-validation";
import { canManageInquiries, inquiryStatuses, reviewCutoff } from "./inquiry-management";

export const dynamic = "force-dynamic";
export const metadata = { title: "Anfragen · Kearly" };

const timestamp = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Berlin",
});

const berlinDate = new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeZone: "Europe/Berlin" });
const pageSize = 100;

function InquiryControls({ kind, entry, today, page }: {
  kind: "wedding" | "workshop";
  entry: { id: string; status: string; lastContact: string | null };
  today: string;
  page: number;
}) {
  const target = "/anfragen/bearbeiten";
  const fields = <>
    <input type="hidden" name="kind" value={kind} />
    <input type="hidden" name="id" value={entry.id} />
    <input type="hidden" name="page" value={page} />
  </>;
  return (
    <div style={{ display: "grid", gap: "1rem", marginBlock: "1rem" }}>
      <form method="post" action={target} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
        {fields}
        <label>Status <select name="status" defaultValue={entry.status}>
          {Object.entries(inquiryStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select></label>
        <label>Letzter Kontakt <input type="date" name="lastContact" max={today} defaultValue={entry.lastContact ?? ""} /></label>
        <button name="operation" value="save">Speichern</button>
      </form>
      <details>
        <summary>Anfrage löschen</summary>
        <form method="post" action={target}>
          {fields}
          <p>Diese Anfrage wird dauerhaft aus der Übersicht gelöscht. Übernimm vorher Angaben, die du noch für einen Auftrag brauchst.</p>
          <label><input type="checkbox" name="confirm" value="yes" required /> Ich möchte diese Anfrage dauerhaft löschen.</label>{" "}
          <button name="operation" value="delete">Endgültig löschen</button>
        </form>
      </details>
    </div>
  );
}

function inquirySummary(entry: { status: string; lastContact: string | null; createdAt: number }, cutoff: string) {
  const status = inquiryStatuses[entry.status as keyof typeof inquiryStatuses] ?? inquiryStatuses.new;
  const isOpen = entry.status !== "closed" && entry.status !== "booked";
  const review = isOpen && (entry.lastContact ?? berlinDate.format(entry.createdAt)) <= cutoff;
  return status + (review ? " · Zur Durchsicht" : "");
}

export default async function InquiriesPage({ searchParams }: {
  searchParams: Promise<{ seite?: string | string[] }>;
}) {
  await requireChatGPTUser("/anfragen");
  if (!(await canManageInquiries())) notFound();
  const { seite } = await searchParams;
  const page = typeof seite === "string" && /^[1-9]\d{0,5}$/.test(seite) ? Number(seite) : 1;
  const offset = (page - 1) * pageSize;
  const today = berlinToday();
  const cutoff = reviewCutoff(today);

  const db = getDb();
  const [weddingEntries, entries] = await Promise.all([
    db.select().from(weddingInquiries).orderBy(desc(weddingInquiries.createdAt), desc(weddingInquiries.id)).limit(pageSize + 1).offset(offset).all(),
    db
    .select()
    .from(workshopInquiries)
    .orderBy(desc(workshopInquiries.createdAt), desc(workshopInquiries.id))
    .limit(pageSize + 1)
    .offset(offset)
    .all(),
  ]);

  return (
    <main className="wrap" style={{ paddingBlock: "2.5rem" }}>
      <a href="/workshop">← Zur Workshop-Seite</a>
      <h1>Kearly-Anfragen</h1>
      <p>Sieh die Anfragen einmal im Monat durch. Offene Anfragen werden nach drei Monaten seit dem letzten Kontakt zur Durchsicht markiert. Ohne Kontaktdatum zählt der Eingang.</p>
      <nav aria-label="Anfragen nach Bereich">
        <a href="#wedding">Wedding</a>{" · "}<a href="#workshop">Workshop</a>
      </nav>
      <section aria-labelledby="wedding">
        <h2 id="wedding">Wedding-Beratungsanfragen</h2>
        {weddingEntries.length === 0 ? <p>Es sind noch keine Wedding-Anfragen eingegangen.</p> : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {weddingEntries.slice(0, pageSize).map(entry => (
              <li key={entry.id} style={{ borderTop: "1px solid currentColor", paddingBlock: "1rem" }}>
                <details>
                  <summary>{entry.name} · {timestamp.format(entry.createdAt)} · {inquirySummary(entry, cutoff)}</summary>
                  <dl>
                    <dt>E-Mail</dt><dd><a href={"mailto:" + encodeURIComponent(entry.email).replace("%40", "@")}>{entry.email}</a></dd>
                    {entry.weddingDate && <><dt>Hochzeitsdatum</dt><dd>{entry.weddingDate}</dd></>}
                    {entry.location && <><dt>Ort</dt><dd>{entry.location}</dd></>}
                    {entry.message && <><dt>Erste Wünsche</dt><dd style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{entry.message}</dd></>}
                  </dl>
                  <InquiryControls kind="wedding" entry={entry} today={today} page={page} />
                </details>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section aria-labelledby="workshop">
      <h2 id="workshop">Workshop-Anfragen</h2>
      {entries.length === 0 ? <p>Es sind noch keine Anfragen eingegangen.</p> : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {entries.slice(0, pageSize).map(entry => (
            <li key={entry.id} style={{ borderTop: "1px solid currentColor", paddingBlock: "1rem" }}>
              <details>
                <summary>
                  {entry.name} · {entry.participants} Personen · {entry.desiredDate} · {inquirySummary(entry, cutoff)}
                </summary>
                <dl>
                  <dt>Eingegangen</dt><dd>{timestamp.format(entry.createdAt)}</dd>
                  <dt>Referenz</dt><dd>CS-{entry.id.slice(0, 8).toUpperCase()}</dd>
                  <dt>Anlass</dt><dd>{entry.occasion}</dd>
                  <dt>Wunschtermin</dt><dd>{entry.desiredDate || "Offen"}</dd>
                  {entry.alternativeDate && <><dt>Alternativtermin</dt><dd>{entry.alternativeDate}</dd></>}
                  <dt>E-Mail</dt><dd><a href={"mailto:" + encodeURIComponent(entry.email).replace("%40", "@")}>{entry.email}</a></dd>
                  {entry.phone && <><dt>Telefon</dt><dd>{entry.phone}</dd></>}
                  {entry.shapeWorld && <><dt>Formenwelt</dt><dd>{entry.shapeWorld}</dd></>}
                  {entry.scentWorld && <><dt>Duftwunsch</dt><dd>{entry.scentWorld}</dd></>}
                  {entry.message && <><dt>Nachricht</dt><dd style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{entry.message}</dd></>}
                </dl>
                <InquiryControls kind="workshop" entry={entry} today={today} page={page} />
              </details>
            </li>
          ))}
        </ul>
      )}
      </section>
      <nav aria-label="Weitere Anfragen" style={{ display: "flex", gap: "1rem" }}>
        {page > 1 && <a href={`/anfragen?seite=${page - 1}`}>← Neuere Anfragen</a>}
        {(weddingEntries.length > pageSize || entries.length > pageSize) &&
          <a href={`/anfragen?seite=${page + 1}`}>Ältere Anfragen →</a>}
      </nav>
    </main>
  );
}
