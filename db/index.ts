import type { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

/**
 * In der Google-AI-Studio-Laufzeit ist keine produktive Cloudflare-D1-Datenbank angebunden.
 * Produktive Anfragen und Verwaltung laufen auf kearly.de über das bestehende Sites-Backend.
 */
export function getDb(): DrizzleD1Database<typeof schema> {
  throw new Error(
    "Cloudflare D1 binding `DB` is unavailable in the Google AI Studio preview. Production inquiries are handled by the existing backend on kearly.de.",
  );
}
