import { env } from "cloudflare:workers";
import { workshopConfig } from "../../workshop-config";

export const dynamic = "force-dynamic";

const prefix = "workshop-photos/";
const slotIds = new Set(Object.values(workshopConfig.imageSlots).map(slot => slot.id));
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };

export async function GET(request: Request) {
  const slot = new URL(request.url).searchParams.get("bild");
  if (slot !== null && !slotIds.has(slot)) return new Response(null, { status: 404, headers });
  if (!env.BUCKET) return new Response(null, { status: 503, headers });
  if (slot === null) {
    const { objects } = await env.BUCKET.list({ prefix, include: ["customMetadata"] });
    const photos = Object.fromEntries(objects.map(object => [
      object.key.slice(prefix.length), { alt: object.customMetadata?.alt ?? "" }
    ]));
    return Response.json(photos, { headers });
  }
  const object = await env.BUCKET.get(prefix + slot);
  if (!object) return new Response(null, { status: 404, headers });
  return new Response(object.body, {
    headers: { ...headers, "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream" },
  });
}
