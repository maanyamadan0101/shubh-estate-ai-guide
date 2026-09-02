-- Central project intelligence for listing enrichment, amenity filters and project SEO.
-- Additive only: preserves existing projects/properties and their relationships.

alter table public.projects
  add column if not exists developer_name text,
  add column if not exists micro_market text,
  add column if not exists corridor text,
  add column if not exists project_status text,
  add column if not exists land_area text,
  add column if not exists number_of_towers integer,
  add column if not exists number_of_floors integer,
  add column if not exists number_of_units integer,
  add column if not exists project_configurations jsonb not null default '[]'::jsonb,
  add column if not exists clubhouse boolean,
  add column if not exists swimming_pool boolean,
  add column if not exists gym boolean,
  add column if not exists spa_wellness boolean,
  add column if not exists indoor_sports boolean,
  add column if not exists outdoor_sports boolean,
  add column if not exists tennis boolean,
  add column if not exists badminton boolean,
  add column if not exists squash boolean,
  add column if not exists basketball boolean,
  add column if not exists kids_play_area boolean,
  add column if not exists landscaped_gardens boolean,
  add column if not exists walking_jogging_track boolean,
  add column if not exists senior_citizen_area boolean,
  add column if not exists community_hall boolean,
  add column if not exists multipurpose_hall boolean,
  add column if not exists restaurant_cafe boolean,
  add column if not exists convenience_store boolean,
  add column if not exists security boolean,
  add column if not exists cctv boolean,
  add column if not exists gated_access boolean,
  add column if not exists power_backup boolean,
  add column if not exists water_supply boolean,
  add column if not exists covered_parking boolean,
  add column if not exists visitor_parking boolean,
  add column if not exists pet_area boolean,
  add column if not exists amenity_labels jsonb not null default '[]'::jsonb,
  add column if not exists project_highlights jsonb not null default '[]'::jsonb,
  add column if not exists location_highlights jsonb not null default '[]'::jsonb,
  add column if not exists schools_nearby jsonb not null default '[]'::jsonb,
  add column if not exists hospitals_nearby jsonb not null default '[]'::jsonb,
  add column if not exists shopping_nearby jsonb not null default '[]'::jsonb,
  add column if not exists business_hubs_nearby jsonb not null default '[]'::jsonb,
  add column if not exists road_connectivity jsonb not null default '[]'::jsonb,
  add column if not exists airport_connectivity text,
  add column if not exists metro_connectivity text,
  add column if not exists seo_project_description text,
  add column if not exists project_images jsonb not null default '[]'::jsonb,
  add column if not exists official_source_urls jsonb not null default '[]'::jsonb,
  add column if not exists last_verified_date date;

create index if not exists projects_corridor_idx on public.projects (corridor);
create index if not exists projects_sector_idx on public.projects (sector);
create index if not exists projects_swimming_pool_idx on public.projects (swimming_pool) where swimming_pool is true;
create index if not exists projects_clubhouse_idx on public.projects (clubhouse) where clubhouse is true;
create index if not exists projects_gym_idx on public.projects (gym) where gym is true;
create index if not exists projects_gated_access_idx on public.projects (gated_access) where gated_access is true;

comment on column public.projects.last_verified_date is
  'Date on which project-level facts were last checked against cited official/authoritative sources.';
comment on column public.projects.official_source_urls is
  'JSON array of official developer, RERA or government URLs supporting project-level facts.';
comment on column public.projects.amenity_labels is
  'Human-readable verified amenity names rendered as crawlable HTML; omit unverified amenities.';
