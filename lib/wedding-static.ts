import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

function resolveWeddingRoot(): string {
  const candidates = [
    path.resolve(process.cwd(), "wedding"),
    path.resolve(process.cwd(), ".next/standalone/wedding"),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return candidates[0];
}

const WEDDING_ROOT = resolveWeddingRoot();
const WEDDING_DIST_ROOT = path.resolve(WEDDING_ROOT, "dist");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

function isInside(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return (
    relative !== "" &&
    !relative.startsWith("..") &&
    !path.isAbsolute(relative)
  );
}

async function isRegularFile(filePath: string): Promise<boolean> {
  try {
    const info = await stat(filePath);
    return info.isFile();
  } catch {
    return false;
  }
}

export async function serveWeddingRootHtml(
  filename: "home.html" | "impressum.html" | "datenschutz.html",
  {
    headOnly = false,
    robots = "index, follow",
  }: { headOnly?: boolean; robots?: string } = {},
): Promise<Response> {
  const target = path.resolve(WEDDING_ROOT, filename);
  if (!isInside(WEDDING_ROOT, target)) {
    return new Response("Not Found", { status: 404 });
  }
  const content = await readFile(target);
  return new Response(headOnly ? null : content, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": robots,
    },
  });
}

export async function serveWeddingDistPath(
  slug: string[],
  { headOnly = false }: { headOnly?: boolean } = {},
): Promise<Response> {
  const cleaned = slug.filter(Boolean);
  const candidate =
    cleaned.length === 0
      ? path.resolve(WEDDING_DIST_ROOT, "index.html")
      : path.resolve(WEDDING_DIST_ROOT, ...cleaned);

  let resolvedFile: string | null = null;

  if (
    candidate === WEDDING_DIST_ROOT ||
    isInside(WEDDING_DIST_ROOT, candidate)
  ) {
    if (await isRegularFile(candidate)) {
      resolvedFile = candidate;
    } else {
      const indexCandidate = path.resolve(candidate, "index.html");
      if (
        isInside(WEDDING_DIST_ROOT, indexCandidate) &&
        (await isRegularFile(indexCandidate))
      ) {
        resolvedFile = indexCandidate;
      }
    }
  }

  const normalizedRoute = "/" + cleaned.join("/");
  const isNoIndexRoute =
    !resolvedFile ||
    /^\/(?:hochzeit-anfragen|impressum|datenschutz)(?:\/|$)/.test(
      normalizedRoute,
    );

  if (!resolvedFile) {
    const notFoundFile = path.resolve(WEDDING_DIST_ROOT, "404.html");
    const body = (await isRegularFile(notFoundFile))
      ? await readFile(notFoundFile)
      : Buffer.from("Seite nicht gefunden.");
    return new Response(headOnly ? null : body, {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, follow",
      },
    });
  }

  const contentType = contentTypeFor(resolvedFile);
  const isHtml = contentType.startsWith("text/html");
  const body = headOnly ? null : await readFile(resolvedFile);

  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "Cache-Control": isHtml ? "no-cache" : "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  };
  if (isHtml) {
    headers["X-Robots-Tag"] = isNoIndexRoute
      ? "noindex, follow"
      : "index, follow";
  }

  return new Response(body, { status: 200, headers });
}
