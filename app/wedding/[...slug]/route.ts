import { serveWeddingDistPath } from "../../../lib/wedding-static";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await context.params;
  return serveWeddingDistPath(slug);
}

export async function HEAD(
  _request: Request,
  context: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await context.params;
  return serveWeddingDistPath(slug, { headOnly: true });
}
