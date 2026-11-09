# SEO Growth Roadmap — Execution Register

**Business:** Shubh Estate Brokers  
**Repository:** `maanyamadan0101/shubh-estate-ai-guide`  
**Base branch:** `main`  
**Implementation branch:** `seo/priority-roadmap-execution`  
**Framework:** Vite + TanStack Start (Lovable configuration)  
**Release policy:** Preview and PR only. No merge, production deployment, live GA4/GTM setting changes, Search Console property changes, or DNS/domain changes without separate approval.

## 1. Evidence baseline

Connected Search Console and GA4 data was retrieved for the available reporting window, 6 August–31 October 2026 (the connector's rolling 3-month report).

### Google Search Console

- Daily aggregate extract: 121 clicks and 12,245 impressions across 87 daily rows.
- Page-level extract: 122 clicks and 14,731 impressions across 251 page rows.
- Query-level extract: 19 clicks and 4,710 impressions across 717 query rows.
- These extracts do not reconcile. Do not combine them into one KPI or use the page/query extracts as the sitewide total. Re-run matched date, search-type, country, device and aggregation dimensions before setting a definitive baseline.

High-visibility pages in the page-level extract:
- `/gurugram-growth-story`: 2,945 impressions, 16 clicks, average position 8.47.
- `/haryana-stamp-duty-registration-calculator`: 1,950 impressions, 19 clicks, average position 9.12.
- Emaar Emerald Estate Sector 65 project page: 1,336 impressions, 3 clicks, average position 9.39.
- Homepage on www: 415 impressions, 22 clicks, average position 8.52.
- Homepage on apex: 325 impressions, 12 clicks, average position 8.12.
- `/flats-for-sale-in-gurgaon`: 168 impressions, 1 click, average position 43.21.
- DLF The Arbour project page: 168 impressions, 0 clicks, average position 20.41.

Query-level signals:
- `gurugram history`: 132 impressions, 2 clicks, average position 6.94.
- `nri real estate services in gurgaon`: 33 impressions, 2 clicks, average position 4.58.
- `shubh estate brokers`: 157 impressions, 8 clicks, average position 2.31.
- `registry charges in haryana for female calculator`: 24 impressions, 1 click, average position 8.33.

### GA4

- 702 sessions, 600 active users and 321 engaged sessions in the daily extract.
- Channel sessions: Direct 420; Organic Search 184; AI Assistant 45; Organic Social 23; Referral 23; Unassigned 3.
- Events include contact (57), WhatsApp click (42), phone click (11), contact_form_submit (5), generate_lead (5), form_submit (4) and seller_submission (1).
- The connector reports zero key-event counts and `is_conversion_event=(not set)` for these events. Event counts are not unique leads. Treat lead conversion measurement as not yet validated.
- GA4 event/channel dimensional exports can repeat session counts across event rows. Do not sum event-level session values as channel totals.

### Search Console sitemap records

Search Console currently lists both:
- `https://www.shubhestatebroker.in/sitemap.xml` — 191 submitted, 0 errors, 0 warnings.
- `https://shubhestatebroker.in/sitemap.xml` — 191 submitted, 0 errors, 0 warnings.

Repository configuration currently declares the apex sitemap in `public/robots.txt` and `SITE_ORIGIN` is apex. The prior domain rollout document also specifies apex as the intended canonical host. Do not switch hostnames or modify Vercel domain redirects based solely on the existence of two Search Console sitemap submissions.

## 2. P1 — Technical foundations

### P1.1 Canonical hostname and redirect integrity

**Current repository evidence**
- `src/lib/seo.ts` sets `SITE_ORIGIN = https://shubhestatebroker.in`.
- `src/lib/url-routing.ts` applies protocol, hostname, trailing-slash, tracking-parameter and legacy-path normalization for GET/HEAD requests.
- `src/server.ts` applies the canonical redirect before handing the request to TanStack Start.
- Route-level canonicals are generated from `SITE_ORIGIN`.
- `public/robots.txt` advertises the apex sitemap.

**Required verification before any routing change**
1. Inspect Vercel Settings → Domains and establish whether apex and www both serve the intended deployment or whether a domain-level redirect overrides application routing.
2. Test HTTP and HTTPS for apex and www, homepage, one property, one project, one location and one service page.
3. Confirm each alternate resolves to the final apex URL in one stable redirect, with no loop or chain.
4. Confirm UTM values are preserved on external landing redirects but removed from internal links and canonical URLs.
5. Confirm POST requests are not redirected and catalogue functional filters remain intact.
6. Confirm preview hostnames remain on preview and never redirect to production.

**Release gate:** No Vercel domain setting or DNS change is included in this branch. Any domain-level change needs a coordinated maintenance window and separate production approval.

### P1.2 Sitemap consolidation

- Dynamic sitemap route: `src/routes/sitemap[.]xml.ts`.
- Public robots declaration: `public/robots.txt`.
- The application currently emits the apex origin through `SITE_ORIGIN`.
- Re-fetch the live sitemap, parse XML, deduplicate URLs and check that every listed destination returns 200 with a self-canonical.
- Check dynamic inventory pagination/caps and lastmod provenance before changing the sitemap generator.
- Search Console sitemap submission cleanup is an account-side action; this repository cannot remove a submitted sitemap from Search Console.
- After preview and production approval, retain the apex sitemap and remove the obsolete www sitemap submission in the Search Console UI only after redirect/canonical evidence is confirmed.

### P1.3 Robots and indexability

- Current repository robots rules allow public pages and images while disallowing admin, auth and API paths.
- Catalogue filters rely on page-level `noindex,follow` directives; do not block those filter URLs in robots.txt before Google can read their directives.
- Verify the live robots response, sitemap declaration, page robots meta, X-Robots-Tag and canonical on sampled URLs.
- Do not add broad disallow rules for tracking or catalogue parameters without checking pagination and filter behaviour.

### P1.4 GA4/GTM and lead measurement

Existing PR #160 (`seo/ga4-gtm-tracking-stage1`) remains a draft and must remain unmerged until its release checklist passes.

Outstanding:
- Browser-level preview check that dataLayer exists and queues exactly one initial page_view and one per SPA pathname navigation.
- Verify preview makes no requests to the live GA4 or GTM script endpoints.
- Test sanitizer behaviour with synthetic PII; no real contact information.
- Test form validation, server rejection and accepted-response flows without creating production records.
- Resolve preview Supabase configuration using a separate test project or safe preview credentials. Never copy production secrets into Preview.
- Perform read-only review of the GTM container: Google tags, pageview triggers, History Change triggers, custom event forwarding, Consent Mode and duplicate event/pageview risk.
- Confirm event receipt in GA4 DebugView/Realtime after an approved controlled test.
- Recommend primary key events `generate_lead` and `seller_submission` only if business reporting agrees. Keep form-specific events diagnostic to avoid double counting. Phone/WhatsApp clicks are engagement events, not confirmed leads.

The analytics branch removes the GTM noscript iframe fallback on production as well as previews. Review that trade-off explicitly before release.

### P1.5 High-impact page metadata

This branch updates only the title and description for `/gurugram-growth-story`. GSC shows a strong query match for `gurugram history` (132 impressions, 2 clicks, average position 6.94), while the former title focused on New Gurgaon investment. The new metadata aligns the snippet with the page's actual historical and infrastructure timeline. Body copy and claims were not changed.

Other page opportunities to test after a matched baseline:
- Stamp duty calculator: improve snippet only after confirming all legal rates and last-verified date.
- Emaar Emerald Estate: investigate low CTR and whether project price/availability in the rendered page matches current inventory before changing copy.
- Flats-for-sale page: review ranking, indexability, page content and intent; do not simply repeat keywords.
- DLF The Arbour: inspect project page uniqueness and live inventory before adding claims.

## 3. P2 — Topical authority and conversion pages

The site already has substantial content. Prefer strengthening existing pages and distinct search intents over generating near-duplicate sector/project pages.

### Content cluster map

1. Property buying: buyer due diligence, resale purchase process, actual acquisition cost, registration and financing.
2. Property selling: valuation, seller mandate, pricing, buyer screening, documentation and remote sale process.
3. Investment advisory: rental yield methodology, supply/absorption context, holding costs, exit liquidity and risk disclosures.
4. Location guides: Golf Course Road, Golf Course Extension Road, Dwarka Expressway, SPR, Sohna Road, Central Gurgaon and New Gurgaon.
5. Home loans: eligibility, affordability, lender comparison, balance transfer, takeover, top-up and overdraft-linked products.
6. NRI services: POA coordination, TDS workflow, documentation, repatriation coordination and remote inspection.
7. Luxury homes: project comparisons, unit-level differentiators, verified inventory and buyer checks.
8. Rental/property management: landlord onboarding, tenant screening, rent-out process, inspection and maintenance coordination.

### Existing page architecture to preserve and review

- Buyer transaction page: `/flats-for-sale-in-gurgaon`.
- Seller service page: `/sell-property-gurgaon`.
- Owner services: `/property-services-gurgaon`.
- NRI selling: `/nri-sell-property-gurgaon`.
- Home-loan assistance: `/home-loans`.
- Home-loan comparison/lead page: `/homeloan`.
- Educational loan guide: `/home-loan-guide`.
- Founder profile: `/about`.
- Location hubs: `/locations/*`.
- Project directory and project detail routes.

The `/home-loans`, `/homeloan` and `/home-loan-guide` routes serve potentially different intents. Do not merge or redirect them until query/page data and content overlap have been compared. The legacy `/home-loan` path already redirects to `/home-loans`.

A page-filtered GSC query comparison (same rolling 3-month window) found 4 query rows for `/home-loans` (including mortgage advice, mortgage loan takeover and own-contribution intent), 3 rows for `/homeloan` (mostly brand/loan-broker terms), and no rows for `/home-loan-guide`. This is not enough volume to establish separate keyword universes, but it does not currently show strong query duplication. Preserve all three until content overlap and a longer matched period are reviewed. The buyer catalogue has 33 query rows, including `flats for sale in gurgaon` (28 impressions, average position 49.29), `flats in gurgaon` (28 impressions, average position 57.04), and `buy flat in gurgaon` (10 impressions, average position 66.8). The NRI page has 4 rows and earns 2 clicks for `nri real estate services in gurgaon` (33 impressions, average position 4.58). The seller service page had no query rows in this extract; investigate its page impressions and internal discovery rather than assuming it is indexed or ranking well.

### Content standards

- Cite primary sources for legal, regulatory, RERA, infrastructure, tax and lender claims.
- Clearly date rate, fee, possession and inventory information.
- Distinguish brokerage coordination from legal opinion, certified valuation, tax advice and lender sanction.
- Do not claim guaranteed returns, guaranteed loan approval, guaranteed appreciation or guaranteed search/AI citations.
- Use original Gurugram market insight and explain the basis for any data.
- Every article should link to one relevant service page and useful related location/project pages, without forcing exact-match anchors.
- Review the founder's biography and credentials for consistency before expanding Person/author schema. Retain only verified claims.

### Internal linking

- Link buyer guides to the flats-for-sale page and relevant location/project pages.
- Link selling guides to the seller page, mandate page and valuation/owner-services page.
- Link home-loan education to the correct assistance page and EMI tools.
- Link NRI articles to the NRI service page and relevant seller/property-management resources.
- Add contextual links from project pages to the relevant location hub and current verified listings.
- Avoid sitewide repetitive exact-match anchors.

## 4. P3 — Authority, local presence, GEO and CRO

### Digital PR and backlinks
- Build a prospect list of relevant real-estate, finance, business, local and NRI publications.
- Prioritise editorial relevance, genuine readership and transparent authorship over domain metrics alone.
- Use original data, buyer checklists, mortgage explainers and Gurugram micro-market commentary as linkable assets.
- Reject paid link schemes, private blog networks, irrelevant directories and guaranteed-link packages.
- Track referring domain quality, target page, anchor diversity, referral sessions and qualified enquiries.

### Competitor gap research
- Semrush API report retrieval is currently unavailable because the account reports insufficient API units. Do not fabricate keyword difficulty, competitor traffic or backlink counts.
- Once access is restored, compare Square Yards, Propzilla and other locally relevant competitors by commercial query clusters, ranking URLs, SERP features, referring domains and content format.
- Use GSC query/page exports as the first-party prioritisation source.

**Public website scan (9 November 2026; not a Semrush ranking/backlink audit):**
- Propzilla prominently presents property discovery across cities, a large project catalogue, financial assistance/home-loan facilitation, taxation/legal-assistance language and after-sale service. Its project pages expose configuration, size, price, possession and RERA details.
- Square Yards positions itself as a full-lifecycle proptech platform, combining listings and project discovery with home loans, property management, rentals, valuation and extensive Gurgaon price/transaction insights.
- Ascens (a locally relevant advisory comparator) emphasises set-fee advisory, due diligence, tax/representation and asset management, alongside a stated Gurugram base and RERA credentials.

**Shubh Estate Brokers response:** do not compete on national catalogue scale or unsupported market-size claims. Build proof around founder-led mortgage experience, transparent advisory scope, documented price/valuation methodology, resale-unit verification, title/document review coordination, lender-policy coordination and local Gurugram corridor knowledge. Add a clear explanation of the advisory process and what is/is not included in each service. Use original local market evidence rather than reproducing competitor price tables.

### Local entity consistency
- Audit Google Business Profile name, category, address, phone, hours, service areas, website URL and appointment/contact links.
- Keep business name, address and phone consistent across authoritative local citations.
- Request genuine customer reviews without incentives; respond with specific, non-sensitive service context.
- Do not create duplicate location profiles or fictitious office locations.

### GEO / AI referral monitoring
- GA4 currently identifies 45 AI Assistant sessions in the reporting window. This is a referral-session baseline, not proof of citation or recommendation.
- Keep AI referral source/medium reporting separate from organic search.
- Maintain clear author, business, service, location and source attribution on important pages.
- Publish factual, well-structured answers with original experience and citations.
- Monitor AI referral landing pages and assisted enquiries monthly; do not promise placement in AI answers.

### Conversion optimisation
- Validate phone, WhatsApp, contact form and seller form success states.
- Distinguish CTA clicks from accepted submissions and qualified leads.
- Add privacy-safe event parameters for page type, form type, project/sector and CTA location.
- Review mobile CTA visibility, form completion friction and page performance.
- Do not send names, phone numbers, email addresses, messages, property-owner identifiers or other personal information to analytics.

## 5. Monthly scorecard

Track matched periods and preserve definitions:
- GSC clicks, impressions, CTR and average position by page/query/device/country.
- Non-brand commercial query clicks and visibility.
- Organic landing sessions and engaged sessions in GA4.
- Verified unique lead submissions by form type.
- Phone and WhatsApp click events as separate engagement measures.
- Qualified enquiries and appointments from CRM/business records where available.
- AI Assistant sessions and landing pages.
- Referring domains and earned editorial links.
- GBP calls, website actions and direction requests where available.
- Indexed canonical URLs, sitemap errors and technical regressions.

Do not compare incompatible connector extracts. Use a single matched Search Console date window, search type, country/device filter and aggregation for monthly reporting.

## 6. PR and release sequencing

1. Keep PR #160 (tracking) as a separate draft; complete preview runtime and account-side checks before review/merge.
2. Keep PR #163 (Search Console/AI search-intent workflow) separate; use actual GSC exports and do not implement unvalidated regex/query assumptions.
3. Keep existing technical issue register PR #159 as the baseline reference; reproduce issues on current main before patching.
4. Review this branch's metadata change in Vercel preview and run `npm run test:seo`, `npm run build` and relevant lint checks.
5. Create separate, small PRs for verified canonical/sitemap code defects, content clusters and conversion improvements so each can be independently reviewed and rolled back.
6. Do not merge any PR, promote any Vercel deployment, change DNS/domain assignments, modify GA4/GTM account settings or make Search Console account changes without explicit production approval.

## 7. Current branch change

- `src/routes/gurugram-growth-story.tsx`: title and meta description aligned with the actual page subject and GSC query evidence.
- `src/routes/nri-sell-property-gurgaon.tsx`: title and meta description aligned with the NRI property-services query signal and the actual coordination scope; removed the unqualified “best price” and “legal & tax help” snippet language.
- `.github/workflows/seo-preview-validation.yml`: adds PR-only SEO regression, production build and focused ESLint checks with pinned Bun; it does not deploy or modify production.
- No URL, canonical, sitemap, robots, database, GA4/GTM account, Vercel environment or production settings changed.
