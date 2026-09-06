# Brave Search audit and implementation — 6 September 2026

## Outcome and publication status

Brave directly returned Shubh Estate Brokers pages for brand/domain queries. The site is therefore not wholly absent from Brave. The first result page for the priority query did not contain a Shubh result. This is a visibility observation, not proof that the location page is unindexed, and not a ranking beyond the checked depth.

The existing `/locations/golf-course-extension-road` page is the correct page to improve. Changes are committed locally on `seo/brave-golf-course-extension-20260906`. Production is unchanged. Automatic approval review rejected the Git push because publication to the public repository was considered to require explicit authorization. No remote branch, PR or hosted preview was created. The connected Vercel project was independently verified as linked to `maanyamadan0101/shubh-estate-ai-guide`.

## Brave evidence log

Method: direct Brave Search browser interface; first page only, through the Next link. The priority page contained 20 main organic results; map, related queries and embedded project/video cards were not counted as additional ranking positions. Search settings were not altered. All observations dated 2026-09-06. No proxy engine results are represented as Brave results.

| Query | Displayed location | Depth and result |
| --- | --- | --- |
| residential projects on Golf Course Extn Road Gurugram | Gurugram, IN | First page, 20 main results; Shubh absent. 99acres, Axiom Landbase, Gurgaonapartments, Luxury Residences and SquareYards appeared. |
| Shubh Estate Brokers | Local mode shown; exact city not captured | First page; `/about`, `/` and `/contact` found. Other similarly named businesses also appeared. |
| shubhestatebroker.in | Local mode shown; exact city not captured | First page; `/contact`, `/`, `/nri`, `/about`, `/gurugram-growth-story`, `/home-loans`, `/projects/tata-raisina-residency-sector-59`, `/projects/sobha-city-sector-108`, `/nri-sell-property-gurgaon`, `/best-areas-gurgaon-property-investment` found. |
| Exact Emerald Estate listing URL | Gurugram, IN | First page; exact Shubh listing not found. Other websites' Emerald Estate results returned. Not proof of non-indexing. |
| Residential projects on Golf Course Extension Road Gurugram | Gurugram, IN | First page; Shubh absent. A second settled snapshot was used because an immediate snapshot retained the previous query's content. |
| Flats for sale on Golf Course Extension Road Gurgaon | Gurugram, IN | First page; Shubh absent. |
| Luxury apartments on Golf Course Extension Road | Local mode shown; exact city not captured | First page; Shubh absent. |
| Emaar Urban Oasis Sector 62 Shubh Estate Brokers | Not available | Brave returned Internal Error; one reload led to human verification. No result depth checked. Further project queries stopped. |

Exact listing searched: https://www.shubhestatebroker.in/3-bhk-for-sale-emaar-emerald-estate-sector-65-gurgaon-1395-sqft

Priority search: https://search.brave.com/search?q=residential+projects+on+Golf+Course+Extn+Road+Gurugram

The user's Search Console screenshot independently shows that the exact Emerald Estate listing was indexed by Google at the time captured. It is not a fresh authenticated inspection performed in this audit.

## Confirmed technical findings

- Live robots.txt: HTTP 200; public pages allowed; admin/auth/API restrictions retained, with public image access explicitly allowed.
- Live sitemap.xml: HTTP 200, parsed as XML, 199 loc entries and 199 distinct URLs. This is a sitemap count, not an index count. Corridor, Emerald Estate project and listing are included.
- Corridor: HTTP 200; self-canonical on `www`; index/follow meta robots; no X-Robots-Tag restriction in sampled response. Main heading, project text and 112 anchors appear in the initial HTML. This is not an empty JavaScript shell.
- Apex corridor request resolves to the equivalent www URL. The intermediate redirect status was not captured. Source code includes canonical redirect handling.
- Exact Emerald Estate listing: HTTP 200; self-canonical; correct property-specific title and heading in initial HTML.
- All six comparison project destinations return HTTP 200 without changing their final URLs. The higher-floor corridor guide also returns 200.
- A deliberately nonexistent route returns HTTP 404; no soft 404 in that sample.
- Rendered corridor includes RealEstateAgent, WebSite and BreadcrumbList JSON-LD. The implementation adds CollectionPage with a six-item ItemList matching the visible comparison.
- Existing property pages already include contextual project/location links and a society section. Shared source-backed content is extended rather than replacing unit pages.
- A sampled Vatika Sovereign card has ₹5 crore in its title and ₹5.50 crore in its displayed price. This is a confirmed presentation inconsistency, not evidence of the correct asking price; the underlying owner-approved record must be reconciled.

## Hypotheses and unresolved checks

Relevance is a plausible constraint: the old corridor introduction explains site structure, while the query asks for residential project choices. Comparison depth and authority may also matter. None is established as the sole cause of Brave rankings.

No site-wide crawl denial was observed. Authentic Brave crawler access still needs hosting/firewall logs; an ordinary successful fetch does not prove bot-specific access. Full orphan analysis, exhaustive duplicate/soft-404 checks, deep pagination, mobile visual testing, Core Web Vitals and real enquiry submission remain incomplete. Distinct units were not removed or merged.

The existing higher-floor guide has a narrower intent and is retained. Query cannibalisation is not proven without performance data. Existing locality filtering can collapse cards using market-facing fields; any future deduplication review should verify permanent unit identity, floor and facing before altering it.

## Competitor comparison

| Actual destination inspected | Observable relevance and limitations |
| --- | --- |
| [Axiom Landbase](https://www.axiomlandbase.in/property-city/golf-course-extension-road-projects/) | Project titles, sector addresses, configurations, prices, status categories, detail links and pagination are extractable. Includes commercial as well as residential inventory. Company identity and office contact details are present. |
| [Gurgaonapartments](https://www.gurgaonapartments.in/residential-projects-golf-course-extension-road.html) | Heading closely matches residential project intent. Repeated project cards show sectors, configurations, scale and detail links; locality navigation and business contact details are present. Figures were not adopted as verified project facts. |
| [Luxury Residences](https://www.luxuryresidences.in/golf-course-extension-road/luxury-projects-on-golf-course-extension-road) | Explicit luxury-corridor title; buyer FAQs about configurations, ready homes and amenities; extensive sector/property-type links and image references. Generic prices and broad claims were not copied. |
| [SquareYards](https://www.squareyards.com/projects-in-golf-course-road-gurgaon) | Actual destination is Golf Course Road, not Extension Road; large project catalogue with detail links. Its appearance is not justification for mixing the two corridors. |
| [99acres](https://www.99acres.com/new-projects-in-golf-course-extension-road-gurgaon-ffid) | Direct page retrieval failed. Only its Brave title, destination and snippet were observed; filters, HTML and images were not independently audited. |

Text extraction demonstrates accessible content, not the full initial HTML or interaction performance of every competitor. No competitor imagery or wording was copied.

## Implemented changes (local branch)

1. Retain `/locations/golf-course-extension-road`; update title, description, H1 and introduction for residential project comparison.
2. Add a six-project comparison with developer, sector/access, configuration/status, limited verified features and developer links. Clearly identify adjoining-sector options; avoid main-road-frontage assumptions.
3. Add six buyer questions covering ready homes, clubhouse/pool evidence, 3/4 BHK layouts, daily access, amenities and resale versus under-construction choices.
4. Date the existing Emerald Estate asking-price reference; retain its exact Google-indexed URL, photographs and enquiry destination.
5. Preserve forms, global phone/WhatsApp/site-visit controls and analytics implementation. Add links to existing project pages and the enquiry/contact page.
6. Add sourced Heritage One and Raisina Residency data used by the existing shared society section on matching individual property listings. Project route URLs remain unchanged.
7. Add CollectionPage/ItemList schema; keep existing business and breadcrumb schema. No fabricated ratings or rich-result promise.
8. Update corridor sitemap lastmod to 2026-09-06 and remove an unnecessary XML regex escape found by lint. Regenerate the route manifest to include already-existing Emerald Estate and WhatsApp routes.

Changed source files: `src/routes/locations.golf-course-extension-road.tsx`, `src/data/project-intelligence.ts`, `src/routes/sitemap[.]xml.ts`, `src/routeTree.gen.ts`.

## Primary project sources

- [Emaar Emerald Estate](https://in.emaar.com/en/our-communities/emerald-estate-gurugram/): community character, landscaped area and access. Its Emerald Classic configuration must not be assumed to describe every Emerald Estate resale layout.
- [Emaar Urban Oasis](https://in.emaar.com/en/properties/urban-oasis/) and [HRERA project record](https://haryanarera.gov.in/view_project/project_preview_open/2518): configuration/amenities and phase/site context. Developer sold-out wording is separate from resale availability.
- [DLF compliance](https://www.dlf.in/homes/luxury/thearbour/compliance): four-bedroom units, construction status and dated disclosures.
- [Tata Raisina Residency](https://www.tatahousing.com/residential-property-in-gurgaon/tata-raisina-residency): community facilities, phased occupation certificates and joint-development disclosure.
- [Conscient Heritage One](https://conscient.in/heritage-one/) and [delivered portfolio](https://conscient.in/residential-delhi-ncr/): amenities, sector, configurations and delivered status.
- [M3M Merlin](https://m3mindia.com/residential/m3m-merlin): configuration, location/access and limited named facilities. Its own distance information supports treating it as an adjoining-sector option.

Unverified parking, backup, amenity operation, unit availability and financing percentages were not introduced as facts.

## Brave crawler guidance

[Official Brave crawler documentation](https://search.brave.com/help/brave-search-crawler) says the crawler does not advertise a differentiated user agent and will not crawl pages that are not crawlable by Googlebot. Its re-fetch link is described in a delisting/noindex context; it is not presented here as a general new-page submission portal. No invented Bravebot rule, firewall relaxation, IndexNow integration or automatic submission via Google/Bing was added.

## Business identity and external authority

Website markup/footer consistently expose Shubh Estate Brokers, 15th Floor, Ocus Quantum Mall, Sector 51, Gurugram, +91 9911050561 and +91 8130785000. Brave's About snippet still showed the older surname spelling; live source uses Arun Madaan and retains Madan as an alternate name. This may reflect stale snippets and does not by itself prove a current metadata error. Brave also surfaced similarly named unrelated businesses. Instagram/YouTube results appeared, but full external-profile NAP consistency was not verified.

Next: verify the actual GBP, owned social profiles and existing portal profiles against the confirmed business details. Prepare corrections for approval. Develop an original corridor entrance/access resource using first-hand site visits and dated photographs, then offer it to relevant Gurugram publications, relocation resources and legitimate local organisations. Seek editorial consideration, not paid ranking links. Project-to-location links are internal links; third-party links to this site are external backlinks. No external profile edits, messages or submissions were made.

## Verification and remaining gates

- `npm run build`: PASS, client/SSR/Nitro output produced. Existing bundle-size and API-deprecation warnings remain. This is a local build, not a Vercel deployment build.
- Focused ESLint on the three authored files: PASS.
- `git diff --check`: PASS.
- Full TypeScript check: nine diagnostics; the same nine reproduce against the baseline using the same generated route manifest/dependencies. No added diagnostics.
- Live pre-change metadata, HTML and destination checks: passed as described above.
- Hosted preview: unavailable because Git push was rejected by automatic approval review.
- Local browser preview: inaccessible (ERR_BLOCKED_BY_CLIENT). Dev server also encountered runtime/network limitations. No claim of mobile or post-change browser verification.
- After approved push: create draft PR, inspect Vercel build, verify desktop/mobile rendering, schema, exact indexed listing, forms/analytics in a test-safe flow and all links before production promotion.

## 30-day measurement plan

Day 0 = deployment date, not this audit date. Capture a pre-deployment baseline and preserve the screenshot record.

Fixed query set: the seven completed query rows above, plus `Emaar Urban Oasis Sector 62`, `Emaar Emerald Estate Sector 65` and `Tata Raisina Residency Sector 59`. Keep the exact spelling/case, device class and Gurugram, IN location consistent. Track the brand-qualified Urban Oasis query separately as an unresolved discovery check.

| Timing | Measure and action |
| --- | --- |
| Before release | Save Brave first-page results and exact matching URLs. Export previous 28 days of GSC clicks, impressions, CTR and position for corridor/project/listing URLs. Establish existing enquiry event counts and qualified buyer leads. |
| Days 1–3 | Verify released metadata, canonicals, sitemap, HTTP responses and forms; check server errors. Use GSC URL Inspection on the changed page if needed; it is a Google action only. |
| Days 7, 14, 21, 30 | Repeat the fixed Brave queries to the same depth. Record date, displayed location, device, query, result URL and position among organic results. Write “not found within first page” or “blocked”; never invent a rank. |
| Weekly | Compare GSC page/query performance with baseline. Track phone clicks, WhatsApp clicks, successful forms, site visits and deduplicated qualified enquiries separately. Inspect Brave referrers where available; missing referrers do not prove zero Brave visits. |
| Day 30 | Assess discovery, corridor visibility, Google stability and qualified enquiry conversion together. If visibility remains weak, investigate crawler logs, internal discovery and relevant editorial mentions before adding more overlapping pages. |

A qualified enquiry should record budget, configuration, target area and purchase horizon; count a buyer once even if they call and send WhatsApp messages. Thirty days is an observation window, not a promised ranking timeline.

