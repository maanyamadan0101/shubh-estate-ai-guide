-- Register one canonical Astaire Gardens project for admin selection and
-- property-to-project relationships. No property inventory is created here.

insert into public.projects (
  name,
  slug,
  sector,
  locality,
  city,
  state,
  status,
  is_published,
  description,
  rera_number,
  builder_id
)
select
  'BPTP Astaire Gardens',
  'bptp-astaire-gardens-sector-70a',
  'Sector 70A',
  'Southern Peripheral Road',
  'Gurugram',
  'Haryana',
  'ready_to_move'::public.listing_status,
  true,
  'Established plotted, floor and villa community in Sector 70A, Gurugram. Exact phase, unit status, sanctioned area, possession and documentation require property-level verification.',
  'RC/REP/HARERA/GGM/487/219/2021/55 dated 21.09.2021',
  (select id from public.builders where lower(name) = 'bptp' order by created_at asc limit 1)
where not exists (
  select 1
  from public.projects
  where lower(name) in ('bptp astaire gardens', 'astaire gardens')
     or slug in ('bptp-astaire-gardens', 'bptp-astaire-gardens-sector-70a', 'bptp-astaire-gardens-sector-70a-gurgaon')
);

update public.projects
set
  name = 'BPTP Astaire Gardens',
  slug = 'bptp-astaire-gardens-sector-70a',
  sector = 'Sector 70A',
  locality = coalesce(locality, 'Southern Peripheral Road'),
  city = 'Gurugram',
  developer_name = 'BPTP (promoter: Countrywide Promoters Private Limited)',
  corridor = 'Southern Peripheral Road',
  project_status = 'Established resale community; verify exact phase and unit',
  project_configurations = '["Plots","Independent Floors","Villas"]'::jsonb,
  clubhouse = true,
  swimming_pool = true,
  gym = true,
  landscaped_gardens = true,
  security = true,
  gated_access = true,
  amenity_labels = '["Garden of Dreams","Manicured Lawns","Pergolas and Gazebos","Community Clubhouse","Gymnasium","Swimming Pool","Gated Community with 24x7 Security"]'::jsonb,
  project_highlights = '["Plotted colony, floors and villas recorded by Haryana RERA","Approximately three-acre Garden of Dreams promoted by BPTP","Low-rise and plotted residential character","Sector 70A Gurugram location"]'::jsonb,
  road_connectivity = '["Southern Peripheral Road area","Golf Course Extension Road network","Sohna Road network","NH-48 network"]'::jsonb,
  seo_project_description = 'BPTP Astaire Gardens is an established plotted, independent-floor and villa community in Sector 70A, Gurugram. Buyers should verify the exact phase, property status, sanctioned area, title, parking, roof rights and applicable charges for each resale unit.',
  official_source_urls = '["https://www.bptp.com/projects/astaire-gardens","https://haryanarera.gov.in/view_project/searchprojectDetail/1696","https://haryanarera.gov.in/view_project/view_certificate/MTEwMA%3D%3D"]'::jsonb,
  last_verified_date = date '2026-09-06',
  updated_at = now()
where lower(name) in ('bptp astaire gardens', 'astaire gardens')
   or slug in ('bptp-astaire-gardens', 'bptp-astaire-gardens-sector-70a', 'bptp-astaire-gardens-sector-70a-gurgaon');

create index if not exists properties_project_published_updated_idx
  on public.properties (project_id, is_published, updated_at desc)
  where is_published is true;
