import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function publicHtmlCacheTtl(pathname: string): number | null {
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/admin") ||
    pathname === "/auth" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password"
  ) {
    return null;
  }

  if (pathname === "/") return 300;
  if (pathname === "/properties") return 300;
  if (pathname.startsWith("/property/")) return 600;
  if (pathname.startsWith("/locations/")) return 21_600;

  // Marketing, advisory, NRI, finance and company pages change less frequently.
  return 3_600;
}

function applyPublicHtmlCache(request: Request, response: Response): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (response.status !== 200) return response;
  // Supabase auth is attached to server functions as a bearer token. Do not let
  // an authenticated request populate a shared edge cache. Harmless analytics
  // cookies are deliberately not treated as authentication.
  if (request.headers.has("authorization")) return response;
  if (response.headers.has("set-cookie")) return response;

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const ttl = publicHtmlCacheTtl(new URL(request.url).pathname);
  if (!ttl) return response;

  const headers = new Headers(response.headers);

  // Keep browsers revalidating while allowing Vercel's edge cache to absorb
  // anonymous repeat traffic. stale-while-revalidate avoids making a visitor
  // wait for a Supabase-backed SSR refresh, and stale-if-error provides a short
  // resilience window during transient origin/database failures.
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  headers.set(
    "Vercel-CDN-Cache-Control",
    `public, s-maxage=${ttl}, stale-while-revalidate=86400, stale-if-error=86400`,
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return applyPublicHtmlCache(request, normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
