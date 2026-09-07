-- Idempotent production-compatible seed for the single canonical Astaire Gardens
-- project and the two Shubh Estate Brokers sale listings confirmed on 2026-09-07.
-- No third-party screenshots or photographs are stored by this migration.

insert into public.builders (id, name, slug, description, website_url)
values (
  '8419bce4-4e23-4db2-a2e1-904b69fcb701', 'BPTP', 'bptp',
  'BPTP is the developer brand associated with Astaire Gardens. Haryana RERA identifies Countrywide Promoters Private Limited as promoter for registration GGM/487/219/2021/55.',
  'https://www.bptp.com/'
)
on conflict (name) do update set
  slug = coalesce(public.builders.slug, excluded.slug),
  description = excluded.description,
  website_url = excluded.website_url,
  updated_at = now();

insert into public.projects (
  id, builder_id, name, slug, sector, locality, city, description, rera_number
)
values (
  '91a7e80d-5e39-4e9d-8d2b-0f80c3aa70a1',
  (select id from public.builders where lower(name) = 'bptp' order by created_at asc limit 1),
  'BPTP Astaire Gardens', 'bptp-astaire-gardens-sector-70a', 'Sector 70A',
  'Southern Peripheral Road', 'Gurugram',
  'Established plotted, independent-floor and villa community in Sector 70A, Gurugram. Buyers should verify the exact phase, sanctioned area, title, parking, roof rights and applicable charges for each resale unit.',
  'RC/REP/HARERA/GGM/487/219/2021/55 dated 21.09.2021'
)
on conflict (slug) do update set
  builder_id = excluded.builder_id, name = excluded.name, sector = excluded.sector,
  locality = excluded.locality, city = excluded.city, description = excluded.description,
  rera_number = excluded.rera_number, updated_at = now();

insert into public.properties (
  id, title, slug, property_type, listing_type, project_name, builder_name,
  location, city, sector, locality, project_id, builder_id, price, price_text,
  bedrooms, bathrooms, bhk, area_sqft, carpet_area_sqft, balconies,
  floor_number, total_floors, facing, furnishing, parking, servant_room,
  study_room, rera_number, status, description, features, meta_title,
  meta_description, og_title, og_description, canonical_url, is_published,
  published_at, updated_at
)
values
(
  '2c6a6cf4-17b8-4f4a-aafa-2aa759479301',
  '3 BHK Builder Floor for Sale in BPTP Astaire Gardens, Sector 70A Gurgaon',
  '3-bhk-builder-floor-for-sale-bptp-astaire-gardens-sector-70a-gurgaon-seb-ag-301',
  'builder_floor', 'sale', 'BPTP Astaire Gardens', 'BPTP',
  'BPTP Astaire Gardens, Sector 70A, Gurugram', 'Gurugram', 'Sector 70A',
  'Southern Peripheral Road',
  (select id from public.projects where slug = 'bptp-astaire-gardens-sector-70a' limit 1),
  (select id from public.builders where lower(name) = 'bptp' order by created_at asc limit 1),
  24500000, '₹2.45 Cr', 3, 3, '3 BHK + Pooja + Servant', 1602, 1369.35, 2,
  3, 4, 'North', 'Semi-Furnished', 2, true, false,
  'RC/REP/HARERA/GGM/487/219/2021/55 dated 21.09.2021', 'ready_to_move',
  'Available through Shubh Estate Brokers, this ready-to-move 3 BHK builder floor in BPTP Astaire Gardens has a third-floor position, two balconies, semi-furnished interiors, a pooja room and a servant room. The published area information comprises a 179 sq. yd. plot basis, approximately 1,369.35 sq. ft. carpet area and 1,602 sq. ft. super built-up area. One covered and one open parking space are stated with the listing. Buyers should verify the precise sanctioned and usable area, included fixtures, ownership documents, road access and current availability before arranging a visit.',
  'Plot area: 179 sq yd | Super built-up area basis | Parking: 1 covered + 1 open | Pooja room | Servant room | Lift | Stilt parking | Gated community | Freehold | Marble flooring | Property age: 0–1 year | Price negotiable',
  '3 BHK Builder Floor in BPTP Astaire Gardens | ₹2.45 Cr',
  'View a 3 BHK builder floor for sale in BPTP Astaire Gardens, Sector 70A Gurgaon: 1,602 sq ft, third floor, north-facing and ready to move.',
  '3 BHK Builder Floor for Sale in BPTP Astaire Gardens',
  'Current Shubh Estate Brokers listing in BPTP Astaire Gardens: 3 BHK, 1,602 sq ft, third floor, north-facing, published asking price ₹2.45 Cr.',
  'https://www.shubhestatebroker.in/property/3-bhk-builder-floor-for-sale-bptp-astaire-gardens-sector-70a-gurgaon-seb-ag-301',
  true, now(), now()
),
(
  'a7b8d8c1-8961-43dc-86e8-7517b5e20401',
  '4 BHK Top-Floor Builder Floor with Roof Rights for Sale in BPTP Astaire Gardens, Sector 70A Gurgaon',
  '4-bhk-top-floor-builder-floor-for-sale-bptp-astaire-gardens-sector-70a-gurgaon-seb-ag-401',
  'builder_floor', 'sale', 'BPTP Astaire Gardens', 'BPTP',
  'BPTP Astaire Gardens, Sector 70A, Gurugram', 'Gurugram', 'Sector 70A',
  'Southern Peripheral Road',
  (select id from public.projects where slug = 'bptp-astaire-gardens-sector-70a' limit 1),
  (select id from public.builders where lower(name) = 'bptp' order by created_at asc limit 1),
  36900000, '₹3.69 Cr plus applicable government charges and taxes',
  4, 4, '4 BHK + Pooja + Study', 2340, 2160, 2,
  4, 4, 'East', 'Semi-Furnished', 2, false, true,
  'RC/REP/HARERA/GGM/487/219/2021/55 dated 21.09.2021', 'ready_to_move',
  'Available through Shubh Estate Brokers, this top-floor 4 BHK builder floor in BPTP Astaire Gardens combines an east-facing position with stated roof rights, two covered parking spaces and a park-facing corner setting. The supplied area information is internally consistent: approximately 260 sq. yd. converts to 2,340 sq. ft. of super built-up area, while the plot basis is 270 sq. yd. and the carpet area is approximately 2,160 sq. ft. Buyers should confirm the roof-title position, sanctioned area statement, included fixtures, maintenance obligations, ownership documents, government charges and current availability before shortlisting.',
  'Plot area: 270 sq yd | Super built-up area basis | Parking: 2 covered | Top floor | Roof rights | Corner property | View: Park-facing | Pooja room | Study room | Lift | Gated community | Freehold | Marble flooring | Property age: 0–1 year | Price negotiable',
  '4 BHK Top Floor in BPTP Astaire Gardens | ₹3.69 Cr',
  'View a 4 BHK top-floor builder floor with roof rights in BPTP Astaire Gardens, Sector 70A Gurgaon: 2,340 sq ft and east-facing.',
  '4 BHK Top-Floor Builder Floor in BPTP Astaire Gardens',
  'Current Shubh Estate Brokers listing: 4 BHK top-floor Astaire Gardens property with roof rights, 2,340 sq ft and asking price ₹3.69 Cr.',
  'https://www.shubhestatebroker.in/property/4-bhk-top-floor-builder-floor-for-sale-bptp-astaire-gardens-sector-70a-gurgaon-seb-ag-401',
  true, now(), now()
)
on conflict (slug) do update set
  title = excluded.title, project_id = excluded.project_id, builder_id = excluded.builder_id,
  project_name = excluded.project_name, builder_name = excluded.builder_name,
  price = excluded.price, price_text = excluded.price_text, bedrooms = excluded.bedrooms,
  bathrooms = excluded.bathrooms, bhk = excluded.bhk, area_sqft = excluded.area_sqft,
  carpet_area_sqft = excluded.carpet_area_sqft, balconies = excluded.balconies,
  floor_number = excluded.floor_number, total_floors = excluded.total_floors,
  facing = excluded.facing, furnishing = excluded.furnishing, parking = excluded.parking,
  servant_room = excluded.servant_room, study_room = excluded.study_room,
  rera_number = excluded.rera_number, status = excluded.status,
  description = excluded.description, features = excluded.features,
  meta_title = excluded.meta_title, meta_description = excluded.meta_description,
  og_title = excluded.og_title, og_description = excluded.og_description,
  canonical_url = excluded.canonical_url, is_published = excluded.is_published,
  published_at = coalesce(public.properties.published_at, excluded.published_at),
  updated_at = now();

insert into public.property_features (property_id, feature_name, category)
select property_id, feature_name, category
from (values
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Pooja room', 'feature'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Servant room', 'feature'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, '1 covered + 1 open parking', 'feature'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Lift', 'feature'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Stilt parking', 'feature'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Freehold', 'feature'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Marble flooring', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Top floor', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Roof rights', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Corner property', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Park-facing', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Pooja room', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Study room', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, '2 covered parking spaces', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Lift', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Freehold', 'feature'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Marble flooring', 'feature')
) as seed(property_id, feature_name, category)
where not exists (
  select 1 from public.property_features existing
  where existing.property_id = seed.property_id
    and existing.feature_name = seed.feature_name
    and existing.category = seed.category
);

insert into public.property_features (property_id, feature_name, category)
select property_id, feature_name, 'amenity'
from (values
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Community clubhouse'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Swimming pool'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Gymnasium'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Landscaped green spaces'),
  ('2c6a6cf4-17b8-4f4a-aafa-2aa759479301'::uuid, 'Gated security'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Community clubhouse'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Swimming pool'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Gymnasium'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Landscaped green spaces'),
  ('a7b8d8c1-8961-43dc-86e8-7517b5e20401'::uuid, 'Gated security')
) as seed(property_id, feature_name)
where not exists (
  select 1 from public.property_features existing
  where existing.property_id = seed.property_id
    and existing.feature_name = seed.feature_name
    and existing.category = 'amenity'
);

create index if not exists properties_project_published_updated_idx
  on public.properties (project_id, is_published, updated_at desc)
  where is_published is true;
