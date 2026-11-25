import { workshopConfig } from "../../workshop-config";

export const dynamic = "force-dynamic";

const slotIds = new Set(
  Object.values(workshopConfig.imageSlots).map((slot) => slot.id),
);
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

/**
 * Erhält den bestehenden Foto-API-Pfad (/api/workshop-photos und ?bild=...).
 * Produktive R2-Uploads werden auf kearly.de vom bestehenden Sites-Backend ausgeliefert.
 * In der Google-AI-Studio-Vorschau greifen die lokalen Fallback-Darstellungen.
 */
export async function GET(request: Request) {
  const slot = new URL(request.url).searchParams.get("bild");
  if (slot !== null) {
    if (!slotIds.has(slot)) {
      return new Response(null, { status: 404, headers });
    }
    return new Response(null, { status: 404, headers });
  }
  return Response.json({}, { status: 200, headers });
}
