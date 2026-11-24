import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { weddingInquiries, workshopInquiries } from "../../../db/schema";
import { berlinToday } from "../../inquiry-validation";
import { canManageInquiries, inquiryStatuses } from "../inquiry-management";

export async function POST(request: Request) {
  const url = new URL(request.url);
  if (request.headers.get("origin") !== url.origin || !(await canManageInquiries())) {
    return new Response("Kein Zugriff.", { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) {
    return new Response("Ungültiges Formular.", { status: 415 });
  }
  const form = await request.formData();
  const kind = form.get("kind");
  const id = form.get("id");
  if ((kind !== "wedding" && kind !== "workshop") ||
      typeof id !== "string" || !/^[a-f0-9-]{36}$/i.test(id)) {
    return new Response("Ungültige Anfrage.", { status: 400 });
  }
  const table = kind === "wedding" ? weddingInquiries : workshopInquiries;
  const db = getDb();
  const operation = form.get("operation");
  if (operation === "delete" && form.get("confirm") === "yes") {
    await db.delete(table).where(eq(table.id, id));
  } else if (operation === "save") {
    const status = form.get("status");
    const lastContact = form.get("lastContact");
    if (typeof status !== "string" || !Object.hasOwn(inquiryStatuses, status) ||
        typeof lastContact !== "string" || !validContactDate(lastContact)) {
      return new Response("Bitte prüfe Status und Kontaktdatum.", { status: 400 });
    }
    await db.update(table).set({ status, lastContact: lastContact || null }).where(eq(table.id, id));
  } else {
    return new Response("Bitte bestätige die Aktion.", { status: 400 });
  }
  const destination = new URL("/anfragen", url);
  const page = form.get("page");
  if (typeof page === "string" && /^[1-9]\d{0,5}$/.test(page) && page !== "1") {
    destination.searchParams.set("seite", page);
  }
  destination.hash = kind;
  return Response.redirect(destination, 303);
}

function validContactDate(value: string) {
  if (value === "") return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value > berlinToday()) return false;
  const date = new Date(value + "T00:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
