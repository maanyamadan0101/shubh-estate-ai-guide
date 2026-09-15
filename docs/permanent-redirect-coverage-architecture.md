# Permanent redirect-coverage architecture

Production canonical origin: `https://shubhestatebroker.in` (non-www, HTTPS, no trailing slash except the root).

## Request flow

1. DNS/Cloudflare must send both HTTP and www traffic to Vercel without creating a competing canonical.
2. `src/server.ts` runs `canonicalRedirect()` before TanStack Start. It applies one 301 for protocol, host, trailing slash, tracking-only parameters and known aliases.
3. Canonical pages render a self-referencing `<link rel="canonical">`.
4. Filter and pagination variants of the catalogue are `noindex,follow` and canonicalize to the clean catalogue URL.
5. `/sitemap.xml` emits only final, clean, canonical paths.

## Vercel

The application server is the source of truth for redirects. Do not add a second overlapping redirect chain in Vercel. The current `vercel.json` is intentionally limited to image configuration; host and path normalization are handled in `src/server.ts` so legacy aliases can be resolved in one hop.

If Vercel project-level domain settings are changed, keep only:

- `shubhestatebroker.in` as the production primary domain.
- `www.shubhestatebroker.in` as an alias that reaches the application and receives the application 301.
- HTTPS enabled for both hostnames.

## Cloudflare

Use DNS-only records if Vercel manages the certificate, or proxy only when Cloudflare features are required. If Cloudflare is proxied, use one redirect rule before cache:

```
(http.host eq "www.shubhestatebroker.in" or
 http.request.scheme eq "http")
and not starts_with(http.request.uri.path, "/api/")
```

Redirect target:

```
concat("https://shubhestatebroker.in", http.request.uri.path,
       if(len(http.request.uri.query) > 0, concat("?", http.request.uri.query), ""))
```

Status: 301. Preserve the query string only for functional requests; attribution parameters are removed by the application. Do not create a separate trailing-slash rule at Cloudflare.

## Nginx alternative

Use this only when Nginx is the active origin; do not run it in front of Vercel at the same time:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name shubhestatebroker.in www.shubhestatebroker.in;
    return 301 https://shubhestatebroker.in$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.shubhestatebroker.in;
    return 301 https://shubhestatebroker.in$request_uri;
}

# Keep the canonical host. The application handles known aliases,
# tracking parameters and route-specific canonical behavior.
server {
    listen 443 ssl http2;
    server_name shubhestatebroker.in;
    # proxy_pass https://vercel-origin.example;
}
```

Avoid a blanket Nginx slash rewrite for file-like endpoints such as `/robots.txt`, `/sitemap.xml`, assets and API routes. The application normalizer removes trailing slashes from page paths while preserving those endpoints.

## Internal links

Run:

```
npm run audit:links
```

The audit fails on absolute internal URLs, www/http variants, tracking parameters, known aliases and trailing-slash page links. Prefer relative links such as `/flats-for-sale-in-gurgaon`; use `internalHref()` when a URL is assembled from data.

## Sitemap and canonicals

A sitemap URL must be:

- HTTPS, non-www, final route, 200, indexable.
- Free of query strings/fragments and trailing slash variants.
- Absent from the alias and duplicate-slug redirect maps.
- Absent when it has a legacy numeric collision suffix.

Property, project and location detail pages use a self-referencing canonical based on the resolved slug. Filter/pagination catalogue URLs use the clean catalogue canonical and `noindex,follow`; they must never be emitted in the sitemap.

## GSC validation

After deployment:

1. Open the live `robots.txt` and `sitemap.xml`; confirm 200 responses, valid XML, no www/http URLs and no query-string URLs.
2. Test representative variants: HTTP, www, trailing slash, `/properties?purpose=sale&page=2`, a known `-2` slug and a tracking-tag URL. Each should reach the intended final URL in one 301 or render the intended noindex variant.
3. Submit `https://shubhestatebroker.in/sitemap.xml` in the canonical GSC property.
4. Live-test the clean homepage, catalogue, one project, one location and one property URL. Confirm 200, indexable HTML and a self-referencing canonical.
5. In the Page indexing report, inspect the 45 examples. Validate the source URLs and confirm the selected canonical is the intended final URL.
6. Start validation for “Page with redirect” only after the production deployment and sitemap recrawl. Do not request indexing for redirecting source URLs; request indexing for their final destinations.
7. Monitor daily for 7–14 days. A redirect source can remain in the report while Google recrawls it; success is that no redirecting URL is in the sitemap or internal link graph and the clean destination is indexed.
8. Keep a regression check in every deployment: sitemap URL set contains no redirects, and `npm run audit:links` passes.
