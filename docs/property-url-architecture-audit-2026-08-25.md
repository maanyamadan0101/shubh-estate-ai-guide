# Property inventory URL architecture audit — 25 Aug 2026

## Problem found

The admin form previously generated a property slug from broad fields (configuration, project/title, property type, sector and city). The server then resolved slug collisions by appending `-2`, `-3`, … up to `-99`.

That made technically unique URLs, but it did not explain why two genuine units in the same project were different and contributed to Google Search Console grouping numbered variants as duplicate/canonical conflicts.

## New URL rule for future admin listings

Normal property slugs now use stable descriptive fields where available:

- project (or specific property title)
- sector
- configuration
- property type
- built-up area
- floor
- facing
- Gurgaon/Gurugram search city

Price is intentionally excluded because asking prices can change.

If two genuine properties still produce the same descriptive slug, the server uses the property's permanent UUID-derived listing reference as the collision suffix, for example `-seb-a1b2c3d4`, rather than `-2` or `-3`.

The UUID remains the database identity. `SEB-XXXXXXXX` is the stable admin/public listing reference derived from that UUID.

## Duplicate safety

Before a brand-new property is published from the admin form, the system checks existing inventory for likely duplicates using available fields including:

- project or sector
- sale/rent intent
- property type
- configuration
- area (within 10 sq.ft.)
- floor
- facing

If a strong match is found, the admin receives a warning showing the existing SEB reference and matching reasons. The admin can cancel and update the existing listing, or explicitly continue if it is a genuinely different physical unit.

## Existing numbered URLs requiring manual inventory comparison

Do **not** bulk redirect these only because they end in `-2`. Google Search Console currently reports these as "Duplicate, Google chose different canonical than user", but the underlying physical inventory must be compared first:

- `/property/3-bhk-ss-residential-condominium-apartment-sector-83-gurgaon-2`
- `/property/3-bhk-godrej-summit-apartment-sector-104-gurgaon-2`
- `/property/3-bhk-signature-global-city-79b-apartment-sector-79-gurgaon-2`
- `/property/3-bhk-ireo-skyon-apartment-sector-60-gurgaon-2`
- `/property/3-bhk-m3m-golf-hills-apartment-sector-79-gurgaon-2`
- `/property/2-bhk-green-court-apartment-sector-90-gurgaon-2`
- `/property/1-bhk-lotus-homz-apartment-sector-111-gurgaon-2`

Also manually compare other duplicate-looking variants identified in Search Console / sitemap, especially Godrej Air and Sobha City numbered URLs.

## Migration decision per legacy URL

### If it is a genuinely different physical property

1. Generate a meaningful descriptive slug for that record.
2. Preserve the same database UUID / SEB reference.
3. Add a direct 301/308 redirect from the old numbered URL to the new descriptive URL.
4. Keep the new URL self-canonical.
5. Update sitemap and all internal links.

### If it is the same physical property duplicated

1. Select one preferred inventory record / URL.
2. Redirect the duplicate URL directly to the preferred property URL.
3. Remove the duplicate from sitemap and internal links.
4. Do not create redirect chains.

## Sitemap policy

The current sitemap is database-driven and publishes live property slugs. New admin-created listings will therefore enter the sitemap with the new meaningful URL architecture automatically once published.

Legacy numbered URLs are intentionally not removed in this PR because some may represent genuinely different inventory. They should be removed only after record-by-record comparison and redirect mapping.

## Performance impact

The change does not load more inventory onto catalogue pages and does not add client-side catalogue queries. Slug generation is constant-time. Duplicate checking happens only when a brand-new listing is published and is limited to a small candidate set (maximum 20 matching records, returning at most 5 warnings).

This architecture is compatible with thousands of property records; long-term scale still depends on indexed database fields, paginated catalogue queries and image optimisation rather than the number of unique property URLs itself.

## Database changes

No database migration is required for this phase. The existing `properties.id` UUID is already a permanent unique identity and the existing `properties.slug` remains the public slug field.

Tower/unit-number fields are not currently present in the generated `properties` schema. Adding those fields can improve duplicate detection later, but should be done only with an explicit Supabase migration and regenerated types after live database access is confirmed.
