import { serveWeddingRootHtml } from "../../lib/wedding-static";

export const dynamic = "force-dynamic";

export async function GET() {
  return serveWeddingRootHtml("impressum.html", { robots: "noindex, follow" });
}

export async function HEAD() {
  return serveWeddingRootHtml("impressum.html", {
    headOnly: true,
    robots: "noindex, follow",
  });
}
