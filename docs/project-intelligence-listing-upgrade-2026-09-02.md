# Project Intelligence & Residential Listing Upgrade — 2 Sep 2026

## Scope

This implementation starts the scalable conversion of Shubh Estate Brokers property pages from unit-only inventory records into pages that combine:

- unit-specific property information;
- reusable project/society information;
- sector/corridor context;
- crawlable verified amenities;
- financing and conversion CTAs;
- project, corridor and related-inventory internal links.

The implementation deliberately avoids guessing amenities or duplicating project facts independently across every unit.

## Current-site findings

- The public sale catalogue contains a large number of separate active unit listings, including multiple genuine units within the same society.
- Different unit records should remain distinct where size, tower, floor, price, view, furnishing or other unit facts differ.
- The code already has an existing `projects` table relationship through `properties.project_id`; a second project table is not required.
- The existing Gurgaon project directory already stores useful project-level fields including developer, sector, corridor, configuration, status, selected RERA/source information and inventory aliases.
- Dynamic property pages already provide self-canonical URLs, Residence/Offer structured data, unit details, home-loan CTAs and related inventory.
- `sitemap.xml` already dynamically includes active property and project-hub pages. `robots.txt` already blocks admin/auth/API surfaces while allowing public crawling.
- Exact hard-coded searches for the public-facing phrases `Buyer verification before payment`, `seller network`, `seller-network`, `token payment`, and `reconfirm before visiting` returned no code occurrences. Any remaining live occurrence should therefore be treated as data/content requiring a database cleanup rather than assumed to be a React string.

## Architecture implemented

### 1. Verified project intelligence registry

Added `src/data/project-intelligence.ts`.

Project-level amenities and descriptions are stored once and looked up by project aliases. The first verified records use official/developer sources for:

- ATS Triumph
- Hero Homes Gurugram
- SOBHA City
- Krisumi Waterfall Residences
- Godrej Meridien

The registry does not return an amenity set when a project has not yet been verified.

### 2. Whole-directory factual fallback

`ProjectExperience` also consults the existing `GURGAON_DIRECTORY_PROJECTS` dataset. This allows matched listings across the catalogue to inherit safe factual project context such as:

- developer;
- sector;
- corridor;
- project status;
- configuration mix;
- RERA/source reference where the existing project directory has one.

Rich amenity claims remain restricted to separately verified records.

### 3. Reusable Project Experience component

Added `src/components/site/ProjectExperience.tsx` and rendered it on the shared dynamic property route.

The component can render crawlable HTML for:

- About the Project / Society;
- Developer;
- Location / Corridor;
- Project status;
- Scale and tower/floor information where verified;
- Configuration mix;
- RERA where available;
- Verified amenities;
- Project highlights;
- Location/connectivity context;
- authoritative outbound source references;
- link to the canonical project guide;
- corridor exploration link.

For projects with incomplete research it omits unverified details rather than filling them with generic AI copy.

### 4. Listing-card enrichment

Updated the shared `ListingCard` component so verified project amenities can appear on cards as crawlable text, limited to the first five signals.

Example pattern:

`Project: Clubhouse • Swimming Pool • Gymnasium • Landscaped Greens • 24x7 Security`

The line is not shown for projects without a verified amenity set.

The residential financing USP is now displayed as:

`Up to 90% Home Loan Available*`

Placeholder wording was softened from `Project photo on request` to `Project imagery being updated` / `Image update pending`.

### 5. Existing projects table extension

Added additive migration `20260902153000_enrich_projects_for_listing_seo.sql`.

The existing `public.projects` table is extended for project scale, configuration, filtering, amenities, nearby infrastructure, SEO descriptions, project images, official sources and verification dates.

Important filter-friendly Boolean fields include:

- clubhouse;
- swimming_pool;
- gym;
- spa_wellness;
- indoor_sports;
- outdoor_sports;
- tennis;
- badminton;
- squash;
- basketball;
- kids_play_area;
- landscaped_gardens;
- walking_jogging_track;
- gated_access;
- security;
- CCTV;
- power_backup;
- covered_parking;
- visitor_parking.

Variable lists such as amenity labels, project highlights, road connectivity, schools, hospitals, shopping, business hubs, project images and official source URLs use JSONB arrays.

Indexes were added for corridor, sector, pool, clubhouse, gym and gated-access use cases.

### 6. Verified seed migration

Added `20260902153500_seed_verified_project_intelligence.sql`.

The migration updates matching existing project rows by name and does **not** create duplicate project records.

## URL impact

The shared implementation affects the dynamic URL family:

- `/property/:slug`

The card enhancement applies anywhere the shared `ListingCard` is used, including major catalogue/search surfaces.

Existing canonical project pages, dedicated high-value project guides and indexed unit URLs are preserved. No live indexed URL was bulk-deleted or canonicalised to another genuine unit as part of this implementation.

## Project-data backlog

The remaining project directory should be researched project by project from, in priority order:

1. official developer project page;
2. Haryana RERA;
3. government / infrastructure authority records;
4. official brochure;
5. existing documented Shubh Estate Brokers project records;
6. reputable secondary sources where primary sources are insufficient.

Until a fact is established, Boolean amenity fields should remain null rather than false if absence has not been verified.

### High-priority inventory research queue

Continue with projects appearing repeatedly in current inventory, including but not limited to:

- Pareena Express Heights
- Emaar Imperial Gardens
- Puri Emerald Bay
- Elan The Presidential
- Indiabulls Enigma
- Mahindra Aura
- Puri Diplomatic Residences
- Ansals Highland Park
- AIPL Riviera
- IREO Skyon
- M3M Golf Hills
- all other live inventory projects not yet represented in the verified amenity registry.

## SEO / crawlability decisions

- Amenity names are rendered as real HTML text, not only icons or tooltips.
- Genuine separate unit URLs remain self-canonical.
- Project facts are reusable, while unit descriptions remain unit-specific.
- Existing project → corridor/city linking is preserved and expanded by the Project Experience component.
- New amenity landing pages should only be indexed after the database contains enough verified qualifying inventory to make each page useful. They were not mass-created before that threshold could be established.
- Faceted amenity/search URLs should remain controlled; Boolean database fields are being created first so curated canonical landing pages can be generated deliberately rather than allowing uncontrolled query-parameter indexation.

## Credibility-copy policy

Public property pages should use calm professional language such as:

`Current availability, asking price and unit-specific details are confirmed at the time of enquiry.`

Detailed transaction/document review belongs in the advisory process or appropriate legal/advisory page, not as repeated nervous warnings beside every property card.

No claim such as `100% verified` should be introduced unless the verification process supports it.

## Sitemap / robots status

The existing implementation already:

- dynamically includes canonical published property URLs;
- dynamically includes project hub URLs;
- includes image sitemap entries where cover imagery exists;
- excludes known duplicate/dedicated project aliases;
- blocks admin/auth/password/API surfaces in robots;
- declares the production sitemap URL in `robots.txt`.

No replacement sitemap architecture is necessary for this slice.

## QA status

- Feature branch Vercel deployment: build succeeded (`READY`).
- Shared dynamic listing route compiles with the new project module.
- Shared listing card compiles with conditional verified amenity text.
- Schema migrations are additive and do not delete or merge unit records.
- Exact hard-coded credibility-warning searches were negative in the repository.
- Vercel preview is protected by Deployment Protection / SSO. Authenticated HTTP fetches available to the integration still redirect to login, so visual before/after screenshots were not fabricated and remain pending a browser session that can retain the preview-auth cookie.
- The connected Supabase integration currently returns no accessible project, so the migration files could be prepared and reviewed but could not be executed against the live database from this session. The frontend remains backward-compatible because it does not yet depend on the new columns for page rendering.

## Remaining implementation sequence

1. Apply the two project migrations to the correct Supabase project once connector access is available.
2. Search database fields for remaining defensive/seller-network language and replace only inappropriate public-facing occurrences.
3. Continue official-source project research and populate the central project records.
4. Extend the public project query to return the new project fields after migration deployment.
5. Move the verified registry data into Supabase as central records once sufficient coverage is achieved, leaving the code registry as a safe migration bridge rather than a permanent duplicate source of truth.
6. Upgrade the dynamic project landing page to render the same central project intelligence and inventory comparison.
7. Add project/developer/amenity filters to catalogue UI using controlled canonical/noindex logic.
8. Create amenity landing pages only where verified inventory count supports genuine search value.
9. Capture mobile/desktop before-after screenshots after preview authentication is available.
10. Run production post-deploy QA for routes, schema, canonical tags, sitemap, robots, CTAs, 404s and runtime errors.

## Backlinks

No backlink is claimed as obtained by this implementation. Existing repository documentation contains a legitimate-backlink execution plan; backlink work should continue through credible local citations, editorial/data assets, developer/industry references and Gurgaon market research rather than spam directories, PBNs or automated link creation.
