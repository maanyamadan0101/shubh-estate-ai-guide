# SEO implementation prompt: Google Search Console + AI search-intent workflow

## Purpose

Use the workflow demonstrated in the supplied 41-second video to turn real Google Search Console queries into useful website improvements for Shubh Estate Brokers. The video visually demonstrates connecting a website/Search Console, asking an AI assistant to generate regex filters, reviewing Performance queries, and turning real search questions into content. Treat this as a research and prioritisation method, not a guaranteed Google ranking hack.

## Copy-ready implementation prompt

Act as a senior technical SEO engineer, Google Search Console analyst, local SEO strategist and content architect. Work on https://www.shubhestatebroker.in, the website of Shubh Estate Brokers, a founder-led real estate advisory and brokerage firm in Gurugram, Haryana.

### Business facts and positioning

- Brand: Shubh Estate Brokers.
- Positioning: fair and transparent real estate deals; banking-grade real estate advisory and brokerage.
- Founder: Arun Madan, with approximately 20 years of banking and mortgage experience and an LLB background. Do not imply he is a practising advocate unless independently verified.
- Services: property buying, selling and rentals; investment advisory; home-loan assistance and mortgage structuring; property valuation; legal/title due-diligence coordination; NRI property assistance; rental and property management services.
- Primary geography: Gurugram/Gurgaon, including Golf Course Road, Golf Course Extension Road, Dwarka Expressway, SPR, Sohna Road, Central Gurgaon and New Gurgaon.
- Builder/project coverage may include DLF, Emaar, Sobha, M3M, Godrej and Adani, but do not imply exclusive authorisation or current inventory without evidence.
- Home-loan channel relationships have included Bank of India, Bank of Maharashtra, Indian Bank, HDFC Bank, ICICI Bank and Axis Bank. Describe Shubh Estate Brokers as an independent channel partner/advisory intermediary, not as a bank or exclusive partner. Never publish an interest rate, fee, loan approval, or “up to 90%” finance statement without current lender/product-specific qualification and supporting evidence.

### Mandatory operating rules

1. **Production must remain untouched.** Create a dedicated feature branch and pull request. Do not merge, promote, or deploy to production.
2. Inspect the existing application, framework, routing, metadata helpers, sitemap, robots rules, canonical strategy, structured-data utilities, design system and current SEO pages before changing anything.
3. Preserve existing URL paths, redirects, canonical URLs, analytics, forms, lead capture, consent behaviour, and internal links. Do not make broad refactors.
4. Do not invent Google Search Console metrics, queries, rankings, backlinks, customer reviews, credentials, project availability, property prices, legal opinions, loan rates, or business claims.
5. Do not create thin doorway pages, near-duplicate location pages, keyword-stuffed copy, fake FAQs, fake author credentials, or mass-generated project pages.
6. Use “Gurugram” and “Gurgaon” naturally where appropriate; do not create duplicate pages solely for spelling variants.
7. Keep all changes reversible, documented and testable in preview.

### Phase 1 — Search Console query research

Use the verified Google Search Console property for the canonical website hostname. Set the date range to the most recent 3 months and compare with the previous period; also review 16 months where available for seasonality.

Export page/query/device/country/date data where access is available. If Search Console data is not connected or available to the implementation agent, stop and request a CSV export; do not fabricate data.

Analyse:
- Queries with high impressions and low CTR.
- Queries ranking around positions 4–20 that may respond to better content or snippets.
- Queries with rising impressions/clicks.
- Pages receiving impressions for queries that do not match their current intent.
- Branded versus non-branded queries.
- Local-intent queries containing Gurgaon/Gurugram, sectors, roads, localities and project names.
- Buyer, seller, landlord, tenant, investor, NRI and home-loan intent separately.
- Cannibalisation: multiple URLs receiving impressions for the same intent.
- Pages with clicks/impressions but weak engagement or lead conversion, if GA4 data is connected.

Deliver a prioritised opportunity table with query, landing page, clicks, impressions, CTR, average position, intent, recommended action, and confidence. Keep actual GSC metrics attached to their source export and date range.

### Phase 2 — Regex workflow

Generate and validate Search Console regex filters for the following intent groups. These are starting patterns only; refine them against actual query exports and Search Console RE2 support.

- Property purchase: `(?i)(buy|purchase|flats? for sale|apartments? for sale|property for sale|ready to move)`
- Property sale: `(?i)(sell|selling|property valuation|market value|sell my property)`
- Rental: `(?i)(rent|rental|rent out|tenant|lease|flat on rent|house on rent)`
- Home loans: `(?i)(home loan|mortgage|loan against property|balance transfer|top.?up loan|loan eligibility)`
- NRI: `(?i)(NRI|non.?resident Indian|overseas Indian|POA|repatriation)`
- Locality: `(?i)(Gurgaon|Gurugram|Golf Course Road|Golf Course Extension|Dwarka Expressway|SPR|Sohna Road|New Gurgaon)`
- Project research: use actual project names found in the Search Console export; do not assume every named project is currently relevant.
- Question queries: `(?i)^(who|what|where|when|why|how|which|can|should|is|are|does|do|best|top|cost|price).*`

Check each pattern against actual query examples. Explain that regex filters are for analysis and discovery; they do not directly improve rankings.

### Phase 3 — Search-intent and content gap analysis

Cluster the verified queries into distinct user intents:
- Buyers: buying process, locality comparisons, ready-to-move homes, resale checks, project comparisons and affordability.
- Sellers: property valuation, documentation, mandate process, pricing, buyer qualification and sale timelines.
- Landlords/tenants: rental valuation, tenant screening, leasing and property management.
- Home-loan seekers: eligibility, EMI/affordability, documentation, balance transfer, top-up and loan structuring.
- NRIs: remote property sale/purchase, power of attorney, due diligence, tax/repatriation topics. Flag tax/legal matters for professional review.
- Local searches: neighbourhood, sector and corridor comparisons with factual connectivity and infrastructure information.

For each opportunity, recommend one of: improve an existing page, consolidate overlapping pages, create a genuinely new page, add a useful FAQ section, or take no action. Avoid publishing a new URL if an existing page already satisfies the intent.

### Phase 4 — Website implementation

Implement only the highest-confidence, evidence-backed improvements. Prefer:
- Improving existing service/location pages with specific, helpful answers.
- Clear page titles and meta descriptions that accurately match the page.
- One descriptive H1 and logical H2/H3 hierarchy.
- Concise answer-first introductions where they improve usability.
- Contextual internal links to relevant services and locations.
- Helpful FAQs only where they answer real user questions; use FAQ structured data only when the visible page content qualifies and current Google guidelines permit its intended use.
- Accurate Organization/LocalBusiness, WebSite, BreadcrumbList and relevant service structured data, using only verified NAP/business details.
- Canonical tags, sitemap inclusion, indexability and redirect checks for every changed URL.
- Descriptive image alt text and compressed, appropriately sized images.
- Mobile usability, accessible headings/forms and fast page rendering.

Do not add FAQ schema as a ranking trick. Do not promise rich results or ranking gains. Do not change robots.txt, sitemap rules, canonical strategy or URL structure unless an observed defect justifies it and the fix is tested.

### Phase 5 — Measurement and validation

For every changed page, record before/after title, description, H1, canonical, indexability, internal links and structured data. Run the project's existing lint, type-check, unit and build commands. Add or update tests where appropriate.

In the preview environment:
- Check HTTP status, canonical URL, robots meta, sitemap presence and redirect behaviour.
- Validate rendered metadata and JSON-LD.
- Test mobile layout, navigation, forms, lead CTAs and analytics events.
- Check for broken internal links, duplicate titles/H1s and accidental noindex.
- Confirm no production domain, production environment variable, production database or production deployment was modified.

Prepare a concise report with implemented changes, evidence, tests, preview URL, remaining risks and items requiring human review. Keep the pull request open and unmerged for owner approval.

### Deliverables

1. Search Console query analysis and regex library based on real data.
2. Prioritised content/technical SEO recommendations.
3. Minimal code/content changes on a feature branch.
4. Automated test/build results and preview verification.
5. Pull request with a clear explanation and no production release.

**Success criterion:** better alignment between real search intent and useful pages, with technically sound implementation and measurable tracking—not a claim of guaranteed rankings.
