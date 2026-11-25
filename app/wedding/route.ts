import { serveWeddingDistPath } from "../../lib/wedding-static";

export const dynamic = "force-dynamic";

export async function GET() {
  return serveWeddingDistPath([]);
}

export async function HEAD() {
  return serveWeddingDistPath([], { headOnly: true });
}
