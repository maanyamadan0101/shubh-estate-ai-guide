-- Canonical Shubh Estate Brokers listing for GAIL CGHS, Sector 56, Gurugram.
-- The asking price was not supplied with the source brief, so the public copy
-- uses “Price on request” rather than publishing an invented amount.

insert into public.projects (
  id, name, slug, sector, locality, city, description
)
values (
  'e7d5c11f-7c54-4fa0-8cae-c9b568a49356',
  'GAIL CGHS',
  'gail-cghs-sector-56-gurgaon',
  'Sector 56',
  'Golf Course Extension Road',
  'Gurugram',
  'GAIL CGHS is a residential cooperative group-housing society in Sector 56, Gurugram, close to Shalom Presidency School, HUDA Market, Golf Course Road and the Sector 55–56 Rapid Metro station.'
)
on conflict (slug) do update set
  name = excluded.name,
  sector = excluded.sector,
  locality = excluded.locality,
  city = excluded.city,
  description = excluded.description,
  updated_at = now();

insert into public.properties (
  id, title, slug, property_type, listing_type, project_name,
  location, city, sector, locality, project_id,
  price, price_text, bedrooms, bathrooms, bhk, area_sqft,
  balconies, parking, status, description, features,
  cover_image_url, meta_title, meta_description, og_title, og_description,
  canonical_url, is_published, is_featured, published_at, updated_at
)
values (
  'f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c',
  '3 BHK Apartment for Sale in GAIL CGHS, Sector 56 Gurugram',
  '3-bhk-apartment-for-sale-gail-cghs-sector-56-gurugram-1800-sq-ft',
  'apartment',
  'sale',
  'GAIL CGHS',
  'GAIL CGHS, Sector 56, Gurugram',
  'Gurugram',
  'Sector 56',
  'Golf Course Extension Road',
  (select id from public.projects where slug = 'gail-cghs-sector-56-gurgaon' limit 1),
  0,
  'Price on request',
  3,
  2,
  '3 BHK',
  1800,
  null,
  1,
  'ready_to_move',
  'A 3 BHK apartment with 2 washrooms and approximately 1,800 sq ft of area is available for sale in GAIL CGHS, Sector 56, Gurugram. The home is positioned in an established and urbanised residential location with everyday conveniences close by. Shalom Presidency School, HUDA Market, Golf Course Road and the Sector 55–56 Rapid Metro station are among the key nearby landmarks. The property is suitable for end users seeking a well-connected home in central Gurugram. Price is available on request; exact floor, facing, furnishing, parking allocation, maintenance and current availability should be confirmed during the site visit.',
  'Approx. 1,800 sq ft | 3 bedrooms | 2 washrooms | Established CGHS society | Urbanised neighbourhood | Near Shalom Presidency School | Near HUDA Market | Near Golf Course Road | Near Sector 55–56 Rapid Metro',
  '/properties/gail-cghs-sector-56/gail-cghs-sector-56-poster.jpg',
  '3 BHK Flat for Sale in GAIL CGHS Sector 56 Gurugram | 1800 Sq Ft',
  'Explore a 3 BHK apartment for sale in GAIL CGHS, Sector 56 Gurugram: approximately 1,800 sq ft, 2 washrooms, near Shalom Presidency School, HUDA Market, Golf Course Road and Rapid Metro. Price on request.',
  '3 BHK Apartment for Sale in GAIL CGHS, Sector 56 Gurugram',
  'Shubh Estate Brokers listing: 3 BHK, 2 washrooms and approximately 1,800 sq ft in GAIL CGHS, Sector 56 Gurugram, near Shalom Presidency School, HUDA Market and Rapid Metro.',
  'https://shubhestatebroker.in/property/3-bhk-apartment-for-sale-gail-cghs-sector-56-gurugram-1800-sq-ft',
  true,
  true,
  now(),
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  property_type = excluded.property_type,
  listing_type = excluded.listing_type,
  project_name = excluded.project_name,
  location = excluded.location,
  city = excluded.city,
  sector = excluded.sector,
  locality = excluded.locality,
  project_id = excluded.project_id,
  price = excluded.price,
  price_text = excluded.price_text,
  bedrooms = excluded.bedrooms,
  bathrooms = excluded.bathrooms,
  bhk = excluded.bhk,
  area_sqft = excluded.area_sqft,
  balconies = excluded.balconies,
  parking = excluded.parking,
  status = excluded.status,
  description = excluded.description,
  features = excluded.features,
  cover_image_url = excluded.cover_image_url,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  og_title = excluded.og_title,
  og_description = excluded.og_description,
  canonical_url = excluded.canonical_url,
  is_published = excluded.is_published,
  is_featured = excluded.is_featured,
  updated_at = now();

insert into public.property_features (property_id, feature_name, category)
select property_id, feature_name, category
from (values
  ('f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c'::uuid, 'Approx. 1,800 sq ft area', 'feature'),
  ('f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c'::uuid, '2 washrooms', 'feature'),
  ('f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c'::uuid, 'Established CGHS society', 'amenity'),
  ('f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c'::uuid, 'Urbanised residential location', 'amenity'),
  ('f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c'::uuid, 'Near Shalom Presidency School', 'amenity'),
  ('f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c'::uuid, 'Near HUDA Market', 'amenity'),
  ('f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c'::uuid, 'Near Sector 55–56 Rapid Metro', 'amenity'),
  ('f2b3cc85-53b7-4c46-a2b9-7dc3ef35e27c'::uuid, '/properties/gail-cghs-sector-56/gail-cghs-sector-56-walkthrough.mp4', 'video')
) as seed(property_id, feature_name, category)
where not exists (
  select 1 from public.property_features existing
  where existing.property_id = seed.property_id
    and existing.feature_name = seed.feature_name
    and existing.category = seed.category
);
