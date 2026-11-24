import { and, eq, gte, count, sql } from "drizzle-orm";
import { getDb } from "../../../db";
import { weddingInquiries, workshopInquiries } from "../../../db/schema";
import { inquirySchema, weddingInquirySchema } from "../../inquiry-validation";

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return json(
      {
        ok: false,
        message: "Bitte sende deine Anfrage direkt über diese Website.",
      },
      403,
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json(
      { ok: false, message: "Die Anfrage konnte nicht gelesen werden." },
      415,
    );
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return json({ ok: false, message: "Deine Anfrage ist zu lang." }, 413);
  let body: Record<string, unknown>;
  try {
    // Bound streamed bodies as well as requests with Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return json({ ok: false }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      length += next.value.byteLength;
      if (length > 16000) {
        await reader.cancel();
        return json({ ok: false, message: "Deine Anfrage ist zu lang." }, 413);
      }
      chunks.push(next.value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    body = JSON.parse(new TextDecoder().decode(bytes));
    if (!body || typeof body !== "object" || Array.isArray(body))
      throw new Error("Invalid body");
  } catch {
    return json(
      { ok: false, message: "Deine Anfrage konnte nicht gelesen werden." },
      400,
    );
  }
  if (
    body.website ||
    typeof body.startedAt !== "number" ||
    Date.now() - body.startedAt < 1500 ||
    body.startedAt > Date.now()
  )
    return json(
      {
        ok: false,
        message: "Bitte prüfe deine Eingaben und versuche es noch einmal.",
      },
      400,
    );
  if (
    typeof body.requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      body.requestId,
    )
  )
    return json(
      {
        ok: false,
        message: "Bitte lade die Seite neu und versuche es noch einmal.",
      },
      400,
    );
  if (body.kind === "wedding") return submitWeddingInquiry(body, body.requestId);

  const result = inquirySchema.safeParse(body);
  if (!result.success)
    return json(
      {
        ok: false,
        message: "Bitte prüfe die markierten Felder.",
        errors: Object.fromEntries(
          result.error.issues.map((issue) => [
            String(issue.path[0]),
            issue.message,
          ]),
        ),
      },
      400,
    );
  try {
    const db = getDb();
    const email = result.data.email.toLowerCase();
    const existing = await db
      .select({ id: workshopInquiries.id, email: workshopInquiries.email })
      .from(workshopInquiries)
      .where(eq(workshopInquiries.id, body.requestId))
      .get();
    if (existing && existing.email !== email)
      return json(
        {
          ok: false,
          message: "Bitte lade die Seite neu und sende die Anfrage erneut.",
        },
        409,
      );
    if (!existing) {
      const recent = await db
        .select({ value: count() })
        .from(workshopInquiries)
        .where(
          and(
            eq(workshopInquiries.email, email),
            gte(workshopInquiries.createdAt, Date.now() - 600000),
          ),
        )
        .get();
      if ((recent?.value ?? 0) >= 3)
        return json(
          {
            ok: false,
            message:
              "Du hast gerade mehrere Anfragen gesendet. Bitte versuche es in einigen Minuten erneut.",
          },
          429,
        );
      await db
        .insert(workshopInquiries)
        .values({
          id: body.requestId,
          createdAt: Date.now(),
          ...result.data,
          email,
        })
        .onConflictDoNothing();
    }
    return json(
      { ok: true, reference: `CS-${body.requestId.slice(0, 8).toUpperCase()}` },
      201,
    );
  } catch {
    // Never log submitted contact data or return storage internals.
    return json(
      {
        ok: false,
        message:
          "Deine Anfrage konnte gerade nicht gespeichert werden. Deine Angaben bleiben erhalten. Bitte versuche es noch einmal.",
      },
      503,
    );
  }
}

async function submitWeddingInquiry(body: unknown, id: string) {
  const result = weddingInquirySchema.safeParse(body);
  if (!result.success) {
    return json({ ok: false, message: "Bitte prüft eure Angaben und das Hochzeitsdatum." }, 400);
  }

  const email = result.data.email.toLowerCase();
  const createdAt = Date.now();
  try {
    const db = getDb();
    const recent = db.select({ value: count() }).from(weddingInquiries).where(
      and(eq(weddingInquiries.email, email), gte(weddingInquiries.createdAt, createdAt - 600000)),
    );
    // Keep the per-address limit and insertion in one database statement.
    await db.run(sql`
      INSERT INTO wedding_inquiries (id, created_at, name, email, wedding_date, location, message)
      SELECT ${id}, ${createdAt}, ${result.data.name}, ${email}, ${result.data.weddingDate},
             ${result.data.location}, ${result.data.message}
      WHERE (${recent}) < 3
      ON CONFLICT(id) DO NOTHING
    `);
    const saved = await db.select({ email: weddingInquiries.email })
      .from(weddingInquiries).where(eq(weddingInquiries.id, id)).get();
    if (!saved) {
      return json({ ok: false, message: "Bitte wartet ein paar Minuten, bevor ihr eine weitere Anfrage sendet." }, 429);
    }
    if (saved.email !== email) {
      return json({ ok: false, message: "Bitte ladet die Seite neu und sendet die Anfrage erneut." }, 409);
    }
    return json({ ok: true }, 201);
  } catch {
    return json({ ok: false, message: "Eure Anfrage konnte gerade nicht gespeichert werden. Bitte versucht es noch einmal." }, 503);
  }
}
