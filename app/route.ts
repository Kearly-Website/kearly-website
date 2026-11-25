import { serveWeddingRootHtml } from "../lib/wedding-static";

export const dynamic = "force-dynamic";

export async function GET() {
  return serveWeddingRootHtml("home.html", { robots: "index, follow" });
}

export async function HEAD() {
  return serveWeddingRootHtml("home.html", {
    headOnly: true,
    robots: "index, follow",
  });
}
