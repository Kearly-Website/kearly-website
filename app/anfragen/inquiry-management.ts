import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../chatgpt-auth";

export const inquiryStatuses = {
  new: "Neu",
  in_progress: "In Bearbeitung",
  waiting: "Wartet auf Rückmeldung",
  closed: "Erledigt ohne Auftrag",
  booked: "Auftrag erteilt",
} as const;

export async function canManageInquiries() {
  const user = await getChatGPTUser();
  const allowed = env.WORKSHOP_ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(allowed && user?.email.trim().toLowerCase() === allowed);
}

export function reviewCutoff(today: string) {
  const date = new Date(today + "T00:00:00Z");
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() - 2, 0);
  date.setUTCDate(Math.min(day, date.getUTCDate()));
  return date.toISOString().slice(0, 10);
}
