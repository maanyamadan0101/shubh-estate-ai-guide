# SEO authority execution runbook — 11 September 2026

## Objective

Concentrate crawl/index signals on canonical Gurgaon property pages, stop new duplicate URL creation, and use the Haryana Stamp Duty & Registration Fee Calculator as the first data-led linkable asset.

## Technical URL controls now in place

- Tracking parameters (`utm_*`, `gclid`, `fbclid`, etc.) are stripped with permanent redirects.
- Known legacy aliases resolve to one canonical URL.
- New property saves use a stable listing identity and do not create numeric `-2/-3` copies for repeated saves.
- Existing numeric-suffix duplicate property URLs resolve to the primary listing when the underlying unit can be identified.
- The Gurgaon catalogue marks filtered/search variants `noindex,follow` and points them to the clean catalogue canonical.
- The XML sitemap is a canonical whitelist: clean static pages, approved project hubs and published property URLs only.
- Faceted/filter URLs are intentionally still crawlable while Google processes `noindex`; do not block them in `robots.txt` yet.

## 30-day URL cleanup sequence

1. Keep filtered/search URLs crawlable until Search Console shows their indexed counts falling.
2. Remove internal links that create unnecessary parameter permutations; use clean static corridor/project landing pages for search-demand intents.
3. Return 404 for empty filter combinations rather than soft-404 content.
4. After unwanted parameter URLs are deindexed, add narrow `robots.txt` disallows for filter/search parameters that have no organic-search value. Never block `?page=` pagination.
5. Audit redirect chains monthly. Every retired URL should reach the final canonical in one hop.
6. Keep sitemap URLs limited to HTTP 200, indexable, self-canonical, published pages.

## Pagination correction to preserve

Google treats paginated URLs as separate pages. The desired end state is:

- `/flats-for-sale-in-gurgaon` → self-canonical.
- `/flats-for-sale-in-gurgaon?page=2` → self-canonical to `?page=2`, crawlable and indexable.
- Filtered pagination such as `?corridor=...&page=2` → `noindex,follow` unless promoted to a dedicated clean landing page.

Do not canonicalize page 2+ to page 1 and do not block pagination in robots.txt.

## Calculator authority asset

Primary asset:

`/haryana-stamp-duty-registration-calculator`

The page includes:

- ordinary Haryana sale/conveyance stamp-duty rates;
- urban/rural and women-buyer differentiation;
- slab-based registration fee with the ₹50,000 cap;
- agreement-vs-Collector-rate planning logic;
- a ₹42.25 crore Gurugram worked example;
- official Haryana and Gurugram references;
- FAQPage and WebApplication structured data;
- internal links to buying advisory, home loans and EMI calculator.

## Digital PR campaign — first 12 weeks

### Pitch 1: Calculator misinformation audit

Subject: `Some property calculators overstate Haryana registration fees by lakhs`

Core evidence: a ₹42.25 crore property should hit Haryana's registration-fee cap rather than an uncapped 1% fee. Demonstrate the difference with the public calculator and cite the Haryana Government source.

Target categories: personal-finance editors, real-estate desks, Gurgaon/Haryana business publications, property-law publishers, mortgage/loan publishers, relocation resources.

### Pitch 2: Women-buyer acquisition-cost study

Publish a compact table comparing male and female buyer stamp-duty cost at ₹1 crore, ₹2 crore, ₹5 crore and ₹10 crore for urban Haryana. Offer the table and methodology for editorial reuse with attribution to the calculator.

### Pitch 3: Gurugram Collector-rate explainer

Use the official 2026–27 Gurugram Collector-rate release to explain why a transaction's registration estimate must check both deal consideration and Collector-rate valuation.

### Pitch 4: Quarterly Gurgaon resale cost report

Quarterly asset should combine real asking-price observations from verified Shubh inventory with statutory acquisition costs. Report medians/ranges by corridor without publishing private seller data.

## Outreach operating standard

- Send 10–15 highly personalised pitches per week, not bulk email.
- Link to the relevant data/tool only when it helps the recipient's audience.
- No paid dofollow links, automated guest-post networks, sitewide footer links or mass directory submissions.
- Anchor text should be editorial/natural: brand, page title or URL; never force exact-match commercial anchors.
- Track domain, contact, pitch angle, date, response, published URL, link type, referral sessions and assisted enquiries.
- Follow up once after 5–7 business days; stop after the second unanswered touch.

## 90- and 180-day KPIs

90 days:
- 5–10 relevant new referring domains.
- At least 3 contextual/editorial links to original Shubh resources.
- Parameter/duplicate URL impressions declining in Search Console.
- Growth in non-brand impressions for stamp duty, registration, Gurgaon buying-cost and core corridor terms.

180 days:
- 20–35 relevant referring domains cumulative.
- 8–15 genuine editorial/contextual links.
- More priority queries moving from positions 11–30 into the top 10.
- Organic enquiries and qualified referral visits tracked as the business KPI; Ahrefs DR is secondary.

## Primary references

- Haryana Revenue FAQ: https://revenueharyana.gov.in/faq/
- Haryana Government release (28 July 2026): https://prms.prharyana.gov.in/press-release/3446
- Gurugram Collector Rates 2026–27: https://gurugram.gov.in/final-collector-rate-year-2026-27/
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google pagination guidance: https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- Google faceted-navigation guidance: https://developers.google.com/crawling/docs/faceted-navigation
