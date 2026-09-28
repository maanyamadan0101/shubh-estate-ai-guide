# Shubh Estate Brokers: SEO execution report

**Audit date:** 28 September 2026. **Website:** https://shubhestatebroker.in/  
**Repository baseline:** `328a29a8806df96cdd8e2bab59050c737f5257ae`  
**Prepared branch:** `codex/seo-audit-2026-09-28`

## 1. Executive summary

The public site is substantially crawlable. A sitemap-led audit tested all 176 submitted URLs plus 12 diagnostic variants. All 176 sitemap URLs ultimately returned 200, had one canonical pointing to the same URL, one H1, a meta description and no noindex directive. Four listing requests initially timed out and succeeded on one retry. This verifies public technical accessibility, not Google indexing or rankings.

Four focused code fixes have been implemented in the branch:

1. **Catalogue pagination:** Page 2 contained different listings but was noindex and canonicalised to page 1. Unfiltered, non-empty pages now have their own canonical and are eligible for indexing. Search/filter pages remain noindex; empty later pages and loader errors remain protected.
2. **Campaign attribution:** The server removed UTM and advertising click identifiers before the landing page could record them. Redirects now preserve the original query string. Internal links and existing canonical tags remain clean.
3. **Corridor navigation:** Five homepage corridor buttons all pointed to `/projects#project-directory`. They now link directly to their corresponding existing corridor pages.
4. **Featured project navigation:** Fallback cards pointed to the legacy `/projects` alias and said “View project” even without a dedicated guide. Links now resolve to final paths and generic fallbacks say “Browse projects”.

These changes are prepared for review; they are **not deployed to production**. Search Console sign-in and GA4 connection are still required for private performance analysis and submission work.

### Main remaining opportunities

- Verify and refresh listing media, area basis and inventory status. The homepage displays some pending-image placeholders and different area figures in titles versus labelled area fields.
- Give distinct Godrej Air units distinct page titles; retain both unit URLs because the floor numbers differ.
- Build a tenant-focused rental journey. The existing rent query renders under the sales catalogue heading and is noindex; landlord services do not replace a tenant landing page.
- Inspect potential internal-link gaps and confirm all high-priority project guides have direct contextual links.
- Establish a first-party reporting baseline before purchasing SEO tools or promising ranking growth.

## 2. Scope and evidence

Evidence files in this folder:

- `crawl-evidence.json`: status, redirect chain, tags, headings, schema types and internal links for 188 requested URLs.
- `sitemap-observed.xml`: production sitemap snapshot.
- `robots-observed.txt`: production robots snapshot.
- `verification.md`: test results and existing TypeScript diagnostics.

Methods: public HTTP GETs, original-HTML parsing, repository inspection, public search-result research and live desktop-browser checks. Seven browser routes cover homepage, paginated catalogue, seller service, corridor, project, listing and article templates. Their main content and metadata were present in the rendered DOM and original HTML samples. This was not a full mobile interaction audit, backlink audit, Googlebot crawl or authenticated URL Inspection exercise.

Public searches used a search provider without a controllable Gurugram device/location profile. Competitors below were observed in returned results, not assigned a verified Google position. Search volume, keyword difficulty, actual rankings, CTR and traffic are unavailable without first-party exports or keyword-platform access.

### Baseline dashboard

| Measurement | Observed result | Interpretation |
|---|---:|---|
| Sitemap URLs | 176 | 176 unique URLs |
| Final HTTP 200 among sitemap URLs | 176/176 | Includes four successful retries |
| Redirecting sitemap entries | 0 | Intended aliases tested separately |
| Sitemap entries marked noindex | 0 | Original meta robots; headers also recorded |
| Missing/multiple or mismatched canonicals | 0 | Root slash equivalence normalised |
| Missing/multiple H1s | 0 | Structural check, not a content-quality score |
| Missing meta descriptions | 0 | Does not establish snippet quality |
| Duplicate title groups | 1 | Two Godrej Air units |
| Invalid JSON in JSON-LD scripts | 0 | Syntax only; rich-result eligibility not validated |
| Missing alt attributes | 0 of 410 image occurrences | Does not establish accurate alt text |
| Reachable sitemap URLs in sitemap-only link graph | 170/176 | Maximum observed shortest path: 3 clicks |
| URLs not reached in that graph | 6 | Candidates only; redirects and non-sitemap pages may link them |
| URLs containing a pending-image phrase | 52/176 | Includes related-card occurrences; not 52 confirmed missing galleries |
| URLs containing “area basis to confirm” | 62/176 | Includes related-card occurrences; manual inventory verification needed |
| Google indexed URL count / eligible indexing rate | Unavailable | Search Console sign-in required |
| Non-brand impressions, clicks, CTR and rankings | Unavailable | Do not reuse older metrics as today's baseline |
| Organic qualified leads and conversion rate | Unavailable | GA4 integration is not connected |
| Core Web Vitals / PageSpeed score | Unavailable | PageSpeed API returned HTTP 429; no score inferred |

Both test URLs for nonexistent pages returned HTTP 404. The generic 404 inherited an index directive, but its 404 response prevents normal indexing; this is not a soft-404 finding. The canonical host is non-www; observed www and HTTP variants ultimately resolve there. Existing redirects to `/sell-property-gurgaon` and `/nri-sell-property-gurgaon` work and should be preserved.

## 3. Prioritised issue register

Priority reflects impact, evidence and effort; it is not a search-engine score.

| ID | Priority / owner | Evidence and impact | Exact action / acceptance criterion | Status |
|---|---|---|---|---|
| SEO-01 | P1 / developer | `/flats-for-sale-in-gurgaon?page=2` is noindex and points to page 1 despite distinct inventory | Self-canonical for unfiltered populated pages; verify page 2 and next/previous links; facets remain excluded | Implemented, preview pending |
| SEO-02 | P1 / developer + marketing | `/contact?utm_source=seo_audit&utm_medium=test` redirects to `/contact`; client attribution reads current URL | Preserve campaign query values through host/path redirects; clean canonical remains; validate GA4 source after deployment | Implemented, GA4 validation pending |
| SEO-03 | P1 / developer | Five homepage corridor buttons share `/projects#project-directory` | Each button reaches its matching 200/self-canonical location page directly | Implemented, preview pending |
| SEO-04 | P2 / developer | Featured cards without guides link to legacy `/projects` with misleading button text | Final directory destination plus “Browse projects”; retain dedicated guides | Implemented, preview pending |
| SEO-05 | P1 / inventory owner | Example: Sector 67A title 2,680 sq ft, card 2,500 sq ft carpet; some basis fields unknown | Check owner/brochure source, label each basis, synchronise fields without guessing values | Business-data verification pending |
| SEO-06 | P1 / content + developer | Rental catalogue query is noindex and still titled as a sale page | Develop a distinct tenant rental hub using verified active inventory; repair rental intent in template before indexing | Planned |
| SEO-07 | P2 / content | Godrej Air base URL and `-3` URL share title; descriptions show floors 18 and 19 | Use floor-specific titles below; do not merge distinct units or rename slugs | Exact copy prepared |
| SEO-08 | P2 / developer | Six sitemap URLs not reached in restricted graph | Follow incoming redirect aliases/non-sitemap paths, then add direct hub and related-page links where absent | Needs full graph follow-up |
| SEO-09 | P1 / analytics owner | Both direct GA4 and GTM are loaded in root; container configuration unknown | Inspect GTM container and GA4 DebugView; confirm one page_view per navigation before removing either loader | Potential duplication, unconfirmed |
| SEO-10 | P2 / developer | `channel`/`corridor` accepted by catalogue route but absent from inventory server call | Test filter UX; apply validated filters to inventory or label their directory-only scope honestly | Confirmed code gap; behavioural scope pending |
| SEO-11 | P2 / developer | Sitemap property query uses `.limit(500)` and returns an empty array on database errors | Add paginated retrieval before inventory exceeds 500; prevent a transient failure from replacing a healthy sitemap with a partial 200 response | Planned, current sitemap not at cap |
| SEO-12 | P2 / SEO owner | No IndexNow implementation found in repository search | Implement controlled publish/update/delete notifications after backend ownership/access is established | Planned; not activated |
| SEO-13 | P2 / developer | 17 TypeScript diagnostics on base and changed branch | Resolve separately; same diagnostic file/line/code set was reproduced | Existing build-quality debt |

### Possible internal-link gaps

These are not proven orphan pages because the graph included only sitemap URLs and did not follow every redirect or non-sitemap page:

- `/jms-the-majestic-manesar-gurgaon-residences`
- `/projects/godrej-sora-sector-53-gurgaon-apartments`
- `/tonino-lamborghini-residences-sector-71-gurgaon`
- `/projects/emaar-mgf-palm-hills-sector-77-gurgaon-apartments`
- `/projects/mahindra-aura-sector-110a-gurgaon-apartments`
- `/projects/pareena-express-heights-sector-99-gurgaon-apartments`

Add only relevant links from project directory, corridor guide and related inventory. Avoid a generic keyword block in every footer.

## 4. Keyword-to-page map

All volumes, difficulty, current position, impressions, clicks and CTR are **N/A** until tool access. These are prioritised intent hypotheses supported by service/inventory fit and selected public search observations, not validated demand estimates. Gurgaon/Gurugram variants belong naturally on the same relevant page.

| Priority | Primary keyword / cluster | Intent | Primary target | Next action |
|---|---|---|---|---|
| P1 | property broker in Gurgaon; real estate advisor Gurugram | Local service | `/` | Retain founder expertise; link users to their service journey |
| P1 | flats for sale in Gurgaon | Buyer inventory | `/flats-for-sale-in-gurgaon` | Correct pagination and verify filters |
| P1 | ready to move flats in Gurgaon; resale apartments Gurgaon | Buyer inventory | `/ready-to-move-flats-in-gurgaon` | Fresh ready inventory and possession checks |
| P1 | sell property in Gurgaon | Seller | `/sell-property-gurgaon` | Valuation, process, scope and owner form |
| P1 | mandate to sell property Gurgaon | Seller | `/mandate-to-sell-property-in-gurgaon` | Define exclusivity, scope, reporting and fee discussion |
| P1 | rent out property Gurgaon; tenant placement Gurgaon | Landlord | `/rent-out-property-in-gurgaon` | Screening scope and rent-assessment process |
| P1 | fully furnished 1 BHK rent Sector 52 Gurgaon | Tenant | Proposed `/flats-for-rent-in-gurgaon` plus verified listing | Create only with current rental data and original media |
| P1 | furnished 2 BHK rent Sector 47 Gurgaon | Tenant | Same proposed rental hub plus listing | Separate tenant journey from landlord service |
| P1 | NRI sell property Gurgaon; sell Gurgaon property from abroad | Remote seller | `/nri-sell-property-gurgaon` | Remote sale workflow and professional coordination |
| P1 | apartments for sale Golf Course Extension Road | Buyer corridor | `/locations/golf-course-extension-road` | Add clearer inventory-led opening; preserve URL |
| P1 | flats for sale Dwarka Expressway Gurgaon | Buyer inventory | `/dwarka-expressway-flats-for-sale-gurgaon` | Current project/unit comparisons |
| P2 | Dwarka Expressway property guide | Area research | `/locations/dwarka-expressway` | Differentiate from inventory page; link both ways |
| P1 | flats for sale SPR Gurgaon; Sector 68 flats | Buyer inventory | `/properties-for-sale-on-spr-gurgaon` | Refresh dated price evidence and unit availability |
| P2 | Southern Peripheral Road property guide | Area research | `/locations/southern-peripheral-road` | Corridor context; link current SPR shortlist |
| P2 | luxury flats Golf Course Road Gurgaon | Buyer corridor | `/locations/golf-course-road` | Relevant luxury inventory and viewing CTA |
| P2 | luxury apartment rent Golf Course Road | Tenant | Proposed rental hub; future dedicated page if justified | Reconfirm DLF Crest rental options before publishing |
| P2 | property New Gurgaon; apartments Sohna Road | Corridor | `/locations/new-gurgaon`; `/locations/sohna-road` respectively | Keep each corridor distinct |
| P2 | property in Sector 62 Gurgaon | Local buyer | `/property-sector-62-gurgaon` | Link Urban Oasis and relevant verified units |
| P2 | 3 BHK builder floor Sector 52 Gurgaon | Buyer | Existing best matching unit; future builder-floor hub | Reconfirm inventory; no fabricated budget match |
| P2 | property valuation Gurgaon; property management Gurgaon | Advisory | `/property-services-gurgaon` | Clear service sections and deliverables |
| P2 | property due diligence Gurgaon | Advisory/research | Service section + `/blog/gurgaon-property-due-diligence-checklist-2026` | Distinguish enquiry from educational intent |
| P2 | home loan assistance Gurgaon; mortgage advisor Gurgaon | Financing | `/home-loans` | Founder expertise, documentation and enquiry |
| P2 | PSU home loan comparison; smart home loan Gurgaon | Research | `/blog/psu-home-loans-smart-loan-balance-transfer-gurgaon` | Date/source bank facts; link home-loan service |
| P1 | Emaar Urban Oasis resale Sector 62 | Project buyer | `/projects/emaar-urban-oasis-sector-62-gurgaon-apartments` | Current unit table, sizes and enquiry |
| P1 | DLF The Primus resale Sector 82A | Project buyer | `/projects/dlf-the-primus-sector-82a-gurgaon-apartments` | Original walkthrough, available units and cost context |
| P2 | Assotech Blith villa Sector 99 | Specific buyer | Relevant live unit, after inventory reconciliation | Confirm which villa and payment schedule; historic prices differ |
| P2 | office for rent Sector 61 Gurgaon; shop for sale Sector 51 | Commercial | `/gurgaon-property-guide` commercial section initially | Publish specific commercial pages when stock is verified |

**Cannibalisation checks:** Compare the corridor guide against inventory pages for Dwarka and SPR; compare `/best-areas-gurgaon-property-investment` with `/blog/best-sectors-to-buy-property-in-gurgaon`. Give each a distinct job. Do not redirect or merge until query/page performance and backlinks justify it.

## 5. Competitor observations

Results observed on 28 September 2026. Counts/prices shown by portals were not verified and are not used as market data. These are search competitors; their credentials and claims are not endorsed.

| Observed page | Query / strength visible in result | Practical response |
|---|---|---|
| [Housing: GCRE flats](https://housing.com/in/buy/gurgaon/golf-course-extension-road-gid/) | Corridor inventory and price/specification structure | Show a useful current shortlist with clear size, price basis and possession |
| [Magicbricks: GCRE flats](https://www.magicbricks.com/flats-in-golf-course-extension-road-gurgaon-for-sale-pppfs) | Project and configuration-specific inventory | Compete on unit accuracy, advisory depth and direct response |
| [Housing: Sector 52 1 BHK rent](https://housing.com/rent/1bhk-flats-for-rent-in-sector-52-gurgaon-C2P1td8ku9vi0ifmt7c) | Dedicated tenant intent and furnishing filters | Create a verified rental path instead of sending tenants to sale copy |
| [HomzRealtor: seller page](https://www.homzrealtor.com/sell-property-in-gurgaon) | Valuation, paperwork, marketing and fee explanation | State Shubh's actual agreed scope, process and fee discussion clearly |
| [Propblitz: seller service](https://www.propblitz.com/sell-with-propblitz) | Mandate-led luxury resale positioning | Show owner reporting, viewing control and case evidence |
| [66 MG Road: overseas property management](https://66mgroad.com/nri/property-management/gurgaon) | Inspections, tenant support and documented reporting | Offer a sample owner report and precise service boundaries if available |

Broader search terms are heavily served by portals. Prioritise project + configuration + sector and service + location combinations where Shubh can provide distinct, verifiable value. No local-pack rank or mobile rank was measured.

## 6. Exact page copy recommendations

These are ready for editorial review, not applied in the technical patch. Existing strong metadata can be retained if Search Console shows good results. No URL changes are proposed.

| Page | Suggested title | Suggested H1 |
|---|---|---|
| Home | Gurgaon Property Advisors \| Shubh Estate Brokers | Gurgaon property advice backed by banking and mortgage experience |
| Sale catalogue | Flats for Sale in Gurgaon \| Resale & New Projects | Flats for Sale in Gurgaon |
| Ready-to-move | Ready-to-Move Flats in Gurgaon \| Resale Homes | Ready-to-Move Flats for Sale in Gurgaon |
| GCRE | Flats for Sale on Golf Course Extension Road, Gurgaon | Apartments for Sale on Golf Course Extension Road |
| Seller | Sell Property in Gurgaon \| Shubh Estate Brokers | Sell Your Property in Gurgaon with a Clear Plan |
| Landlord | Rent Out Your Property in Gurgaon \| Tenant Search | Rent Out Your Gurgaon Property |
| Mandate | Property Selling Mandate in Gurgaon \| Shubh Estate | Appoint a Representative to Sell Your Gurgaon Property |
| Remote seller | Sell Gurgaon Property from Abroad \| Shubh Estate | Sell Your Gurgaon Property from Abroad |
| Home loans | Home Loan Assistance in Gurgaon \| Shubh Estate | Home Loan and Mortgage Assistance in Gurgaon |
| Services | Property Management & Valuation in Gurgaon | Property Management, Valuation and Due-Diligence Support |
| Godrej Air base unit | Godrej Air 3 BHK, 18th Floor \| Sector 85 Gurgaon | Retain property heading; clearly show floor 18 |
| Godrej Air `-3` unit | Godrej Air 3 BHK, 19th Floor \| Sector 85 Gurgaon | Retain property heading; clearly show floor 19 |

### Suggested descriptions and content blocks

**Home:** “Buy, sell or rent property in Gurgaon with Shubh Estate Brokers. Get founder-led guidance on valuation, documentation, due diligence and home loans.” Retain verifiable founder details and office information. Link buyer, seller, tenant and landlord journeys distinctly.

**GCRE:** “Compare apartments for sale on Golf Course Extension Road, Gurgaon. Explore projects, current availability, area details and buyer checks with Shubh Estate Brokers.” Place current inventory before a concise sector/project comparison, then explain price basis and viewing arrangements.

**Seller:** “Sell your Gurgaon property with pricing guidance, buyer screening, marketing and transaction coordination. Speak to Arun Madaan at Shubh Estate Brokers.” Add an owner preparation checklist, reporting frequency, fee discussion and one permissioned case study.

**Landlord:** “Find tenants for your Gurgaon property with rent assessment, listing support, viewings, screening and move-in coordination from Shubh Estate Brokers.” Clarify what screening includes, who approves the tenant, and which documents the owner supplies.

**Remote seller:** “Arrange the sale of your Gurgaon property from abroad with local viewings, pricing guidance, documentation coordination and regular owner updates.” Add the remote workflow and qualified legal/tax coordination without claiming guaranteed outcomes.

**Home loans:** “Get home-loan assistance in Gurgaon for eligibility, lender comparison, documentation, balance transfer and mortgage planning with Shubh Estate Brokers.” Link the existing bank-comparison guide and EMI calculator; current terms require lender verification.

**Proposed rental hub:** Title “Flats for Rent in Gurgaon | Furnished Homes | Shubh Estate”; H1 “Flats and Furnished Homes for Rent in Gurgaon”. Description: “Explore current flats for rent in Gurgaon by sector, budget and furnishing. Ask Shubh Estate Brokers for availability, photos and viewing arrangements.” Show exact monthly rent, maintenance treatment, deposit, furnishings, availability and verified travel context. Do not create a new page from stale inventory alone.

### Internal links to add or verify

- Homepage → each corridor page (implemented).
- GCRE guide → Urban Oasis, The Arbour, relevant Sector 62/65 guides and current units.
- Sector 62 guide → Urban Oasis project → individual available units, with breadcrumb return links.
- SPR guide → current SPR shortlist → relevant units.
- Rental hub → individual rental listing → locality context, with landlord service as a secondary owner CTA.
- Buyer-checklist article → buying advisory, home loans and matching inventory.
- Bank-comparison article → home-loan service and EMI calculator.

## 7. Technical implementation and release checklist

### Files changed

- `src/lib/url-routing.ts`: preserve landing-page query values in redirects while keeping emitted internal links clean.
- `public/robots.txt`: align explanatory comments with that behaviour; crawl rules unchanged.
- `src/lib/catalogue-seo.ts`: testable pagination/indexing policy.
- `src/routes/flats-for-sale-in-gurgaon.tsx`: apply canonical/robots policy and matching schema page identity.
- `src/routes/index.tsx`: direct corridor destinations.
- `src/components/site/FeaturedProjectShowcase.tsx`: final URLs and accurate fallback label.
- `scripts/check-seo.mjs`: attribution and pagination regression coverage alongside existing sitemap/redirect tests.

### Verification completed

- SEO regression suite passed, including sitemap fixture with 67 unique final URLs. The fixture count is not the live sitemap count.
- Production build passed. The local default target is generated by the existing build configuration; Vercel deployment still needs its normal platform build.
- Scoped ESLint and whitespace validation passed.
- React changes reviewed: no new effects, fetch waterfalls, browser-state access during SSR, dependencies or changed form submissions.
- TypeScript reports the same 17 diagnostic locations/codes on untouched base and changed branch; see verification file. No new diagnostics were introduced by these changes.

### Required preview checks before merge

1. Deploy the branch through the existing preview integration; confirm the preview host remains appropriately excluded/protected.
2. Fetch original HTML and rendered DOM for homepage, catalogue page 1/2, filtered catalogue, seller, project and listing templates.
3. Page 2: 200; canonical ends `?page=2`; no noindex on populated unfiltered results; next/previous anchors work.
4. Filtered pages remain noindex. Loader-error output and empty later pages must not become eligible.
5. `/?utm_source=instagram&utm_medium=paid_social` stays on the landing URL until analytics can read it. www/legacy-path redirects preserve values and do not loop. Canonical excludes campaign tags.
6. Check the five corridor buttons reach the matching content; fallback project cards read “Browse projects”.
7. Confirm mobile navigation, sticky CTAs and form validation; test successful submission only through an agreed test route/account to avoid fake customer leads.
8. GA4 DebugView: one page_view per navigation, appropriate click events and one successful lead event; inspect GTM ownership first.

### Production and rollback

After normal review/merge, repeat those checks on the canonical production host and confirm the production sitemap remains valid. Record deployment SHA/time. If routing or attribution regresses, revert the focused code commit through a normal new revert commit; do not rewrite published history. Submit the existing sitemap in Google/Bing only after validation. Inspect a representative sample of priority pages; avoid resubmitting the whole site repeatedly.

### IndexNow activation specification

Not implemented in this patch because the publishing backend and deployment ownership need to be selected. Use a public ownership-verification key file on the canonical host, with submissions sent from a server-side queue on successful publish, substantial update, unpublish or deletion. Debounce repeated updates; deduplicate URL batches; retry temporary failures with backoff; log response status and notification time. Send only canonical public URLs and meaningful deletion notifications. Keep database/admin credentials server-side. Confirm key-file access and successful protocol response after deployment. IndexNow acceptance is not indexing confirmation and is not Google submission.

### Further technical work

- Sitemap resilience: use paginated database retrieval and fail clearly or retain a last-known-good snapshot on upstream failure. Do not silently ship an incomplete 200 sitemap.
- Inventory media: verify original photos, image descriptions and area source before replacing placeholders. Image presence is not a reason to add stock images of a different unit.
- Structured data: existing JSON parses, but test representative pages with Rich Results Test and Schema.org Validator. Avoid expecting FAQ rich results or self-serving review stars for this brokerage.
- Performance: obtain PSI/CrUX data later; no performance number is available from this run. Existing responsive images and deferred analytics are visible in code. Measure before adding more scripts.

## 8. Tools and account setup

Use the free first-party tools first. No paid subscriptions, accounts or tracking services were added.

| Tool | Setup / next action | Cadence and output | Current status |
|---|---|---|---|
| Search Console | Sign in to existing verified domain property; inspect sitemap, indexing, queries and selected URLs | Weekly performance and coverage export | Login required |
| GA4 / Tag Manager | Connect existing property; inspect current GTM container; confirm lead events and attribution | Weekly landing-page and qualified-lead report | GA4 connector unconnected; GTM configuration not inspected |
| Bing Webmaster Tools | Verify/import existing site, submit sitemap and inspect crawl reports | Weekly coverage; IndexNow diagnostics after activation | Account access not available |
| Screaming Frog | Crawl original and rendered HTML as needed; paid JS rendering only if required | Monthly and after routing changes | Custom sitemap crawl completed instead; no purchase |
| PageSpeed / CrUX | Test homepage, catalogue and property template; separate field from lab data | Monthly plus significant releases | API rate-limited this run |
| Ahrefs Free | Verify site and review available audit/backlink data | Monthly broken links and relevant links | No account setup performed |
| Keyword Planner / Trends | Gurugram/India location research; record source/date and seasonality | Monthly keyword map refresh | No authenticated volumes retrieved |
| Looker Studio | Connect verified GSC and GA4 sources; use definitions below | Weekly report | Dashboard specification supplied; no live connection |
| Google Business Profile | Confirm address, map pin, hours, categories, services and genuine reviews | Monthly accuracy review | Website details observed; GBP account not audited |

## 9. Measurement dashboard specification

Use latest complete 28 days versus preceding 28 days and 90-day trends. Add year-over-year comparisons where history allows. Segment organic performance by brand/non-brand, buyer/seller/tenant/landlord intent, landing page, device and country. Do not compare unlike query-position cohorts for CTR.

| Metric | Calculation / data source | Target |
|---|---|---|
| Sitemap technical pass rate | 200 + expected canonical + no noindex / submitted intended URLs | Maintain 100%; currently 176/176 after retries |
| Eligible indexing rate | Indexed intended canonical pages / intended indexable pages; GSC with sample coverage disclosed | Establish baseline, then improve; no guarantee of 100% |
| Canonical mismatch count | Google-selected vs user-declared on inspected intended URLs | Investigate every priority mismatch |
| Indexing delay | Days from publication to first observed indexed state | Measure median and upper percentile on dated sample |
| Organic visibility | Impressions, clicks, CTR, average position; GSC | Targets set after baseline and query review |
| Keyword coverage | Top 3/10/20 within a fixed location/device keyword set | Increase relevant coverage, not arbitrary keyword count |
| Qualified lead conversion | Qualified attributable organic leads / organic sessions | Baseline first; separate clicks from real leads |
| Lead progression | Enquiry → qualified → site visit → mandate/transaction | Track by original landing page and intent |
| Listing accuracy | Verified available listings with clear area basis and media / active listings | All priority promoted listings verified before promotion |
| Core Web Vitals | Field 75th percentile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 | Good thresholds where sufficient field data exists |

Existing code emits `click_phone`, `click_whatsapp`, `click_site_visit_cta`, `generate_lead`, `property_enquiry`, `contact_form_submit` and `owner_service_enquiry` in relevant flows. Verify delivery before treating them as measurements. Use `generate_lead` as a primary successful-form event and the more specific events as breakdowns; avoid summing them as separate leads. Call/WhatsApp clicks represent intent, not confirmed conversations. Join qualified outcomes in the CRM using permitted non-sensitive identifiers; exclude phone numbers, names, messages and documents from analytics payloads.

### Missing exports

- GSC Performance: queries/pages/countries/devices for 90 days and complete 28-day comparison; Page Indexing, Sitemaps, Crawl Stats, Core Web Vitals, security/manual-action status.
- GA4: organic landing pages with sessions, engaged sessions and key events; source/medium, device/country and event counts for the same periods.
- Bing: indexed/excluded URL and crawl diagnostics.
- CRM or an anonymised lead summary: qualified leads, visits, mandates and transactions by source/landing page.

## 10. 30/60/90-day work plan

### Days 1–30: technical accuracy and measurement

- Review and preview-test the four implemented fixes, then deploy through the normal process.
- Connect GSC/GA4/Bing and establish the real baseline.
- Resolve the duplicate Godrej Air titles, verified area labels and missing media on top promoted properties.
- Validate suspected link gaps and catalogue filter behaviour.
- Define tenant rental data requirements and reconfirm current units.
- Milestones: 100% priority URLs pass technical eligibility checks; all priority promoted stock verified; analytics events tested. No traffic-growth promise.

### Days 31–60: useful landing pages and proof

- Publish a substantive rental hub and verified listings if inventory supports it.
- Improve GCRE and seller/landlord/remote-owner content using the copy and link plan above.
- Publish two permissioned case studies with real process evidence.
- Activate IndexNow once publishing integration is established.
- Use actual GSC impressions and positions to select the first 10 keyword-page improvements; avoid bulk page generation.

### Days 61–90: iterate on measured demand

- Compare complete 28-day periods and review quality of leads, not only traffic.
- Expand sectors/project pages only where demand and current stock justify them.
- Improve high-impression, weak-CTR pages using their actual query context.
- Seek relevant local/editorial mentions and keep genuine review collection consistent.
- Revisit mobile field performance, sitemap resilience and the existing TypeScript backlog.

Check deployment effects at approximately days 7, 14 and 28. This is a proposed review schedule; no recurring automation was created.

## 11. Sources and guidance

- [Google pagination guidance](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading): distinct pagination canonicals and crawlable links.
- [Google canonicalisation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): consistent preferred URLs.
- [Google campaign URL guidance](https://support.google.com/analytics/answer/10917952?hl=en): campaign parameters support attribution.
- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): original/rendered content and indexability checks.
- [Google sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): canonical URLs and accurate lastmod values; submission is a hint.
- [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals): field experience metrics.
- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): established SEO remains applicable; no special AI file required.
- [Google local ranking](https://support.google.com/business/answer/7091?hl=en): relevance, distance and prominence.
- [IndexNow documentation](https://www.indexnow.org/documentation): change notification protocol for participating engines.

**Completion boundary:** Public audit, search research, keyword map, exact content recommendations, four code corrections, regression checks and implementation roadmap are complete. Production deployment, private performance analysis, account configuration, rich-result validation and search-engine submissions remain pending the stated access/release steps.
