# HTTPS non-www canonical rollout

Requested production origin: https://shubhestatebroker.in

## Findings on 10 September 2026

The application is TanStack Start/React, not Next.js. Route `head` functions already emit server-rendered canonical links for public content pages, including dynamic property and location pages. The live apex homepage redirects to www. The screenshot contains legacy URLs; Google normally excludes redirect sources and evaluates their destinations for indexing.

## Repository changes

- `src/lib/seo.ts`: use the requested HTTPS apex origin for route canonicals, schema URLs and the dynamic sitemap. Root schema now imports the same constant.
- `src/lib/url-routing.ts` and `src/server.ts`: combine host, HTTPS, trailing slash and known legacy path handling into a single application redirect. Retain path redirects on preview hosts without redirecting previews to production. Keep POST requests untouched.
- `src/components/site/ListingCard.tsx`: emit relative final destinations, including legacy property aliases. Existing navigation already uses relative paths.
- `src/routes/sitemap[.]xml.ts`: retain dynamic database inventory and project discovery plus primary/location pages; exclude known redirect aliases and deduplicate URLs. Preserve valid XML escaping and last-modified handling.
- `public/robots.txt`: declare the HTTPS apex sitemap. Keep existing private/admin/API crawl restrictions and public image access.
- Route-specific canonical tags remain in the SSR head; no duplicate global canonical tag or client-only effect is added. Existing noindex/filter-page policy is preserved. Authentication, error and redirect routes are not promoted into the index.

## Required coordinated Vercel rollout

Do not deploy an opposite application redirect while a domain-level apex-to-www redirect is active: that creates a loop.

1. Build and review this branch in preview. In Vercel, open the existing project, Settings, Domains and inspect both apex and www assignments.
2. Deploy the reviewed commit and remove any domain-level redirect from `shubhestatebroker.in` to `www.shubhestatebroker.in` in the same maintenance window. Both domains must serve this deployment so the application can combine hostname and legacy path changes in one response. Ensure the apex has valid DNS and TLS. Do not configure a blanket www redirect ahead of application routing if minimizing legacy-path hops is required.
3. The application handles HTML and sitemap redirects. Vercel serves public static assets before application code; if www robots.txt/static assets are served directly, that does not make alternate HTML pages indexable. Both robots copies advertise the apex sitemap. Vercel's automatic HTTP-to-HTTPS edge redirect may add a platform hop to HTTP legacy URLs; internal navigation and sitemap entries always use final HTTPS URLs.
4. Verify all four homepage variants with HTTP GET: `http://shubhestatebroker.in/`, `http://www.shubhestatebroker.in/`, `https://www.shubhestatebroker.in/`, and `https://shubhestatebroker.in/`. The apex HTTPS homepage must return 200 with one self-referencing canonical. Every alternate must terminate there without a loop.
5. Check server HTML (without executing JavaScript) for the homepage, a live property, `/locations/southern-peripheral-road`, `/nri-sell-property-gurgaon`, and `/sell-property-gurgaon`: HTTP 200, one HTTPS apex canonical, meaningful content, no unexpected noindex.
6. Fetch `https://shubhestatebroker.in/sitemap.xml`, parse XML and verify listed destinations return 200. Ensure live database-backed inventory is present; local fixture tests do not establish database availability. The existing property query caps inventory at 500; add sitemap pagination before exceeding that count.
7. In the existing Search Console domain property, submit `https://shubhestatebroker.in/sitemap.xml` and request indexing for final priority URLs. The old redirected URLs can remain in the “Page with redirect” report; they should not be indexed separately. Indexing remains Google's decision.

## Verification

`npm run test:seo` and `npm run build` passed locally on 10 September 2026. `npx tsc --noEmit` reports ten existing errors, reproduced on unchanged main commit `9ded2df`; no new TypeScript errors were introduced.

Run `npm run test:seo` and `npm run build`. The SEO checks exercise production/preview redirect destinations, destination stability, query preservation, relative links, POST handling, sitemap duplicate/alias exclusion and XML escaping using fixtures. No production domain setting or Google Search Console action is performed by these files.

## References

- https://developers.google.com/search/docs/crawling-indexing/301-redirects
- https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
- https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting
