import wedding from "../wedding/generated.mjs";
import home from "../wedding/home.html?raw";
import imprint from "../wedding/impressum.html?raw";
import privacy from "../wedding/datenschutz.html?raw";
import handler from "vinext/server/fetch-handler";
import { runWithConnectorBinding } from "../lib/connector-context";
import type { ConnectorBinding } from "../lib/connector-contract.mjs";

export default {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext<{ CONNECTORS?: ConnectorBinding }>) {
    const url = new URL(request.url);
    const path = url.pathname;
    if ((request.method === "GET" || request.method === "HEAD") && path === "/workshop/") {
      url.pathname = "/workshop";
      return Response.redirect(url, 308);
    }
    if (url.hostname === "www.kearly.de") {
      url.hostname = "kearly.de";
      return Response.redirect(url, 308);
    }
    if ((request.method === "GET" || request.method === "HEAD") && path === "/") {
      return new Response(request.method === "HEAD" ? null : home, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
    const legacyLegal = path.match(/^\/wedding\/(impressum|datenschutz)(?:\/|$)/);
    if (legacyLegal || path === "/impressum/" || path === "/datenschutz/") {
      url.pathname = legacyLegal ? "/" + legacyLegal[1] : path.slice(0, -1);
      return Response.redirect(url, 308);
    }
    if ((request.method === "GET" || request.method === "HEAD") &&
        (path === "/impressum" || path === "/datenschutz")) {
      return new Response(request.method === "HEAD" ? null : path === "/impressum" ? imprint : privacy, {
        headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, follow" },
      });
    }
    if (path === "/wedding/sitemap.xml" || path === "/wedding/robots.txt") {
      url.pathname = path.endsWith("sitemap.xml") ? "/sitemap.xml" : "/robots.txt";
      return Response.redirect(url, 308);
    }
    if (path === "/weddings" || path.startsWith("/weddings/")) {
      url.pathname = "/wedding" + path.slice("/weddings".length);
      return Response.redirect(url, 308);
    }
    if (path === "/wedding" || path.startsWith("/wedding/")) {
      url.pathname = path.slice("/wedding".length) || "/";
      return wedding.fetch(new Request(url, request), env);
    }
    if (path === "/bildverwaltung" || path === "/bildverwaltung/" ||
        path === "/assets/photo-admin.js" || path.startsWith("/wedding-photo/") ||
        path.startsWith("/workshop-photo/")) {
      return wedding.fetch(request, env);
    }
    let binding = ctx.props?.CONNECTORS;
    // Local preview emulates the same request-scoped capability. This branch and
    // the auxiliary service binding are absent from production builds.
    if (import.meta.env.DEV && !binding && env.CONNECTORS) {
      const preview = env.CONNECTORS;
      const expiresAt = Date.now() + 60_000;
      binding = {
        async getContext() {
          if (Date.now() >= expiresAt) return { status: "request_context_expired" };
          return preview.getContext?.() ?? { status: "binding_unavailable" };
        },
        async invoke(connectorId, actionName, args) {
          if (Date.now() >= expiresAt) {
            return { status: "request_context_expired", message: "This request has expired. Please try again." };
          }
          return preview.invoke(connectorId, actionName, args);
        },
      };
    }
    const response = await runWithConnectorBinding(binding, () => handler.fetch(request, env, ctx));
    if (/^\/(?:anfragen|api|design-system)(?:\/|$)/.test(path)) {
      const secured = new Response(response.body, response);
      secured.headers.set("X-Robots-Tag", "noindex, nofollow");
      secured.headers.set("Cache-Control", "no-store");
      return secured;
    }
    return response;
  },
};
