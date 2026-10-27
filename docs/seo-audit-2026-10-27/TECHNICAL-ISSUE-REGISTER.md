# Technical SEO audit and prioritized issue register

**Audit snapshot:** 27 October 2026  
**Website:** https://shubhestatebroker.in/  
**Repository:** maanyamadan0101/shubh-estate-ai-guide  
**Base commit:** 9df69c85cefdcca29450849d7451c10024c0792c (main)  
**Audit branch:** audit/technical-seo-2026-10-27

## Scope and confidence

This is an incremental technical review based on the current repository source, the latest Vercel deployment metadata, public search-rendered page content, and the existing 28 September 2026 crawl report. It is not represented as a fresh exhaustive HTTP crawl: direct sitemap/robots fetches could not be verified through the available browser retrieval, no local checkout could be run because the environment could not resolve GitHub, and Semrush API requests were blocked because the account has insufficient API units. Search Console and GA4 private reports were not available in this audit.

The production deployment reported by Vercel is READY at commit `9df69c85cefdcca29450849d7451c10024c0792c`; the combined GitHub status reports Vercel success. This confirms deployment readiness, not that all SEO requirements pass.

## Executive summary

The repository already contains substantial SEO safeguards: canonical-origin helpers, a shared redirect normalizer, route-level canonical metadata, sitemap filtering/deduplication, a robots.txt sitemap declaration, and `npm run test:seo` regression tests. The prior audit dated 28 September recorded 176/176 sitemap URLs returning 200 after retries, one canonical and one H1 per sampled URL, and no duplicate sitemap destinations in that snapshot. Those results are historical and must not be treated as a 27 October live crawl.

No high-risk production code change is justified before current production responses and the latest repository tests are verified. The immediate implementation step is to repeat the crawl against the current release, record exact response evidence, then make small changes on a review branch.

## Prioritized issue register

Priority definitions: P0 = release blocker/security or broad indexing risk; P1 = high business/crawl impact; P2 = material quality or measurement improvement; P3 = optimization after blockers. Confidence describes the evidence for the issue, not the severity.

| ID | Priority | Finding / risk | Evidence available | Confidence | Remediation and acceptance test |
|---|---|---|---|---|---|
| TECH-01 | P1 | Re-verify canonical host, HTTPS and legacy redirect chains on the current release. A prior rollout note described a historical apex/www redirect conflict; current Vercel domain metadata reports both custom domains verified with no Vercel-level redirect, while application middleware uses the apex origin. | Current Vercel domain metadata; `SITE_ORIGIN` in `src/lib/seo.ts`; `canonicalRedirect` in `src/lib/url-routing.ts`; older `docs/non-www-seo-rollout.md`. | Medium | HTTP GET all four host/protocol variants and representative legacy paths. Require one-hop/expected final redirects, no loops, HTTPS apex 200, one self-canonical in server HTML, and sitemap URLs on the apex host. Preserve query values on external redirects where attribution is required. |
| TECH-02 | P1 | Re-crawl current sitemap and all submitted URLs after the October releases. Current sitemap generation is database-backed and can return 503 if an upstream source fails; older evidence is from 28 September and predates later route additions. | `src/routes/sitemap[.]xml.ts` uses `Promise.allSettled`, emits 503 on data-source failure, filters aliases and deduplicates `<loc>`; old snapshot tested 176 URLs. | High that a fresh crawl is needed; current live health unverified | Fetch `/sitemap.xml`, parse XML, ensure unique canonical URLs only, verify every `<loc>` returns 200 and has one matching canonical/no unexpected noindex. Test intentional 503 behavior separately without submitting a partial sitemap. Record total URLs and failed/retried responses. |
| TECH-03 | P1 | Verify current rendered metadata and robots policy for dynamic inventory, page 2, facets, empty states and errors. A regression could either hide useful catalogue pagination or expose filter/empty URLs. | `src/lib/catalogue-seo.ts` defines separate pagination canonicals and noindex for facets/errors/empty later pages; `scripts/check-seo.mjs` contains regression assertions. | Medium | Run `npm run test:seo`, then server-HTML checks for sale page 1/2, rental hub with/without live inventory, filtered catalogue, an existing property and a nonexistent property. Require distinct canonical for populated unfiltered page 2, noindex on facets/empty/error states, correct HTTP status and no client-only metadata dependency. |
| TECH-04 | P1 | Verify inventory accuracy and area-basis clarity before expanding indexable listing coverage. Publicly rendered listing cards contain “area basis to confirm” and “project imagery being updated” labels; some titles and displayed area fields use different figures, which may be valid when one is super area and another carpet area but must be explicitly explained. | Current public search-rendered homepage and project-directory content; previous audit recorded area-basis and pending-image phrases in a September snapshot. | High that editorial/data review is needed; exact listing errors unconfirmed | Audit the live listing export against owner/source records. Show carpet, built-up and super/saleable area separately with units and source basis; remove stale availability/price; use genuine images or a neutral placeholder. Do not change or noindex an entire listing solely because its two valid area measures differ. |
| TECH-05 | P2 | Re-validate sitemap modification dates and dynamic inventory completeness. Static entries have manually assigned lastmod values; dynamic listing and project rows use their source update dates. Stale lastmod values can weaken freshness signals, while invented dates must be avoided. | `src/routes/sitemap[.]xml.ts` has `STATIC_PATHS` and `SEO_TEMPLATE_LASTMOD`; dynamic rows use `updated_at`. | High for static-date maintenance risk; impact moderate | Compare lastmod against actual meaningful content updates. Set a date only when supported by source history; use database timestamps for dynamic records and paginate all published inventory. Add a test that no URL is duplicated or redirected and that lastmod is valid ISO date when present. |
| TECH-06 | P2 | Verify structured data is valid against visible page content, not merely valid JSON. Root-level RealEstateAgent and route-level FAQ/Article/project schemas may parse successfully while containing unsupported or stale claims. | `src/routes/__root.tsx` includes RealEstateAgent JSON-LD; homepage emits FAQPage JSON-LD; prior audit only established JSON syntax, not rich-result eligibility. | Medium | Extract JSON-LD from representative templates; validate required properties and visible-content correspondence with Google Rich Results Test/Schema Markup Validator. Do not invent reviews, ratings, offers, or availability. Check schema entity IDs consistently use the canonical origin. |
| TECH-07 | P2 | Confirm GA4/GTM event tracking does not expose personal data and produces reliable lead counts. The current helper includes full `window.location.href` as `page_location` in contact events; query parameters must never contain names, phone numbers, email addresses or other personal data. | `src/lib/analytics.ts` builds `page_location` from the complete URL; root route contains GA/GTM IDs. | Medium | Inspect form submission URLs, GTM variables, consent behavior and GA4 DebugView. Prefer path-only page context for custom events unless query parameters are allowlisted and guaranteed non-sensitive. Confirm one event per real successful lead and avoid sending form field values. |
| TECH-08 | P2 | Re-run mobile performance and Core Web Vitals checks against the current production release. No current field-data or Lighthouse result was available in this audit. | Existing app includes web-vitals instrumentation in `src/lib/analytics.ts`; prior report said PageSpeed API was rate-limited on 28 September. | High that current baseline is missing; current performance unknown | Capture PageSpeed Insights mobile results for homepage, catalogue, project and listing templates; compare field data where available. Prioritize LCP, INP, CLS and server response using actual results rather than guessing. |
| TECH-09 | P2 | Obtain actual keyword and organic-performance evidence before changing titles at scale. Semrush reports could not run because the account has insufficient API units; Search Console and GA4 exports are not connected in this audit. | Semrush responses explicitly returned `no_api_units`; no authenticated Search Console/GA4 dataset was available. | High | Restore Semrush API units or export reports manually; obtain Search Console query/page/device/country data and GA4 organic lead events. Map each intent to one existing URL before writing content. Mark volume, KD, CPC and ranking as unavailable until sourced. |
| TECH-10 | P3 | Complete a mobile interaction, form and analytics QA pass after technical release. Do not submit real enquiry forms during automated testing. | Prior September audit checked seven templates in a desktop browser; no current mobile/browser session or real form test was performed here. | High for missing current coverage | Use a safe test account or approved test path to validate menus, filters, call links, WhatsApp preparation, validation and success events on mobile. Record screenshots and deployment SHA. |

## Existing safeguards confirmed in source

- Canonical origin is centralized as `https://shubhestatebroker.in` in `src/lib/seo.ts`.
- Application middleware normalizes production host/protocol/path aliases on GET/HEAD and preserves POST requests.
- Internal links are normalized by `internalHref`, and known legacy property/project aliases are redirected.
- Catalogue indexing rules are centralized in `src/lib/catalogue-seo.ts`.
- Sitemap generation filters redirecting aliases, deduplicates URLs, escapes XML, and returns 503 rather than a partial sitemap when its upstream queries fail.
- `public/robots.txt` allows public crawling, blocks private/admin/auth/API paths, and declares the apex sitemap.
- `scripts/check-seo.mjs` exercises redirect, canonical, sitemap, XML escaping, pagination and duplicate-title behavior.

Source inspection is not equivalent to successful runtime verification; the checks above still need to run against the current commit.

## Execution plan

1. **Read-only baseline:** record current production SHA and domain settings; fetch robots/sitemap and crawl sitemap URLs; sample redirects and original HTML.
2. **Automated regression:** run `npm run test:seo`, `npm run build`, scoped lint and `git diff --check` on the branch. Record pass/fail output, not just command invocation.
3. **Triage:** compare live evidence with TECH-01 through TECH-10 and update this register with exact URLs, status codes, canonical values and reproduction steps.
4. **Safe fixes:** patch only reproduced issues; preserve existing URL equity; add a regression test for every code fix.
5. **Preview verification:** deploy a preview, test desktop/mobile and all affected route classes, then request review before production changes.
6. **Production validation:** after approved deployment, repeat the same crawl, record commit/deployment ID, and use Search Console to inspect representative URLs and submit the sitemap if needed.

## Current action log

- 2026-10-27: Inspected repository package scripts, SEO helpers, URL normalization, catalogue indexing policy, sitemap route, robots.txt, analytics helper and prior audit report.
- 2026-10-27: Confirmed current Vercel production deployment reports READY at commit `9df69c85cefdcca29450849d7451c10024c0792c`; GitHub combined status contains a successful Vercel status.
- 2026-10-27: Confirmed apex and www custom domains are verified and neither has a Vercel-level redirect configured.
- 2026-10-27: Attempted Semrush domain/site-audit/organic reports; Semrush reported insufficient API units. No retry performed.
- 2026-10-27: Local checkout/test execution was blocked because this environment could not resolve `github.com`. No source code changes or production deployments have been made in this audit pass.
