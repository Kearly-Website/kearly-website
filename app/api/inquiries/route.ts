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

function getExpectedOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }
  const host = request.headers.get("host");
  if (host) {
    const proto = new URL(request.url).protocol.replace(":", "");
    return `${proto}://${host}`;
  }
  return new URL(request.url).origin;
}

/**
 * Erhält den relativen Formularvertrag POST /api/inquiries inkl. Validierung.
 * Auf kearly.de verarbeitet das bestehende Sites-Backend diesen Endpunkt produktiv.
 * In dieser Google-AI-Studio-Vorschau gibt es keine Datenbankbindung und es wird
 * niemals ein erfolgreicher Versand ausgegeben.
 */
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== getExpectedOrigin(request) && origin !== new URL(request.url).origin) {
    return json(
      {
        ok: false,
        message: "Bitte sende deine Anfrage direkt über diese Website.",
      },
      403,
    );
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(
      { ok: false, message: "Die Anfrage konnte nicht gelesen werden." },
      415,
    );
  }
  if (Number(request.headers.get("content-length") || 0) > 16000) {
    return json({ ok: false, message: "Deine Anfrage ist zu lang." }, 413);
  }

  let body: Record<string, unknown>;
  try {
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
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("Invalid body");
    }
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
  ) {
    return json(
      {
        ok: false,
        message: "Bitte prüfe deine Eingaben und versuche es noch einmal.",
      },
      400,
    );
  }

  if (
    typeof body.requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      body.requestId,
    )
  ) {
    return json(
      {
        ok: false,
        message: "Bitte lade die Seite neu und versuche es noch einmal.",
      },
      400,
    );
  }

  if (body.kind === "wedding") {
    const result = weddingInquirySchema.safeParse(body);
    if (!result.success) {
      return json(
        {
          ok: false,
          message: "Bitte prüft eure Angaben und das Hochzeitsdatum.",
        },
        400,
      );
    }
    return json(
      {
        ok: false,
        preview: true,
        message:
          "Vorschauhinweis: In dieser Vorschau ist kein produktives Anfrage-Backend angebunden. Eure Angaben wurden weder gespeichert noch versendet. Produktive Anfragen werden über kearly.de verarbeitet.",
      },
      503,
    );
  }

  const result = inquirySchema.safeParse(body);
  if (!result.success) {
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
  }

  return json(
    {
      ok: false,
      preview: true,
      message:
        "Vorschauhinweis: In dieser Vorschau ist kein produktives Anfrage-Backend angebunden. Deine Angaben wurden weder gespeichert noch versendet. Produktive Anfragen werden über kearly.de verarbeitet.",
    },
    503,
  );
}
