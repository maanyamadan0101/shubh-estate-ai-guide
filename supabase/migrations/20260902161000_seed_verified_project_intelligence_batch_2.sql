-- Second verified project intelligence batch.
-- Updates existing central project records only; never inserts duplicate projects.

update public.projects
set
  developer_name = coalesce(developer_name, 'Emaar India'),
  corridor = coalesce(corridor, 'Dwarka Expressway'),
  project_configurations = '["3 BHK"]'::jsonb,
  clubhouse = true,
  swimming_pool = true,
  outdoor_sports = true,
  tennis = true,
  badminton = true,
  kids_play_area = true,
  walking_jogging_track = true,
  security = true,
  power_backup = true,
  amenity_labels = '["Clubhouse","Swimming Pool","Kids'' Pool","Tennis Court","Badminton Court","Kids'' Play Area","Jogging Track","Culture Centre","Perimeter Security","5 KVA Power Backup per Apartment"]'::jsonb,
  project_highlights = '["Emaar residential community in Sector 102","Clubhouse and swimming facilities","Tennis and badminton courts","Kids'' play area and jogging track","Perimeter security and apartment power backup"]'::jsonb,
  road_connectivity = '["Dwarka Expressway corridor","Gurugram city road network"]'::jsonb,
  official_source_urls = '["https://in.emaar.com/en/properties/imperial-gardens/"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('emaar imperial gardens', 'imperial gardens', 'imperial gardens sector 102');

update public.projects
set
  developer_name = coalesce(developer_name, 'AIPL'),
  corridor = coalesce(corridor, 'Dwarka Expressway'),
  land_area = coalesce(land_area, 'Approx. 5.14 acres (Phase 1)'),
  number_of_towers = coalesce(number_of_towers, 2),
  number_of_floors = coalesce(number_of_floors, 43),
  project_configurations = '["3 BHK","4 BHK"]'::jsonb,
  clubhouse = true,
  swimming_pool = true,
  gym = true,
  outdoor_sports = true,
  landscaped_gardens = true,
  pet_area = true,
  amenity_labels = '["Signature Swimming Pool","Central Lake","Outdoor Gym","Sports Area","Mindfulness Garden","Event Lawn","Pet Garden","Miyawaki Forest","Welcome & Sculptural Gardens","Landscaped Open Spaces","Clubhouse"]'::jsonb,
  project_highlights = '["Approx. 5.14-acre Phase 1","Two 43-storey residential towers","3 & 4 BHK residences","Central lake and landscape-led planning","IGBC Platinum pre-certified community","Sector 103 location on the Dwarka Expressway corridor"]'::jsonb,
  road_connectivity = '["Dwarka Expressway","Sector 103 Gurugram road network"]'::jsonb,
  official_source_urls = '["https://aipl.com/riviera/","https://aipl.com/residential/"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('aipl riviera', 'riviera at aipl lakecity', 'riviera at aipl lake city', 'aipl lakecity riviera');

update public.projects
set
  developer_name = coalesce(developer_name, 'Puri Constructions'),
  corridor = coalesce(corridor, 'Dwarka Expressway'),
  project_status = coalesce(project_status, 'Delivered / ready to move'),
  rera_number = coalesce(rera_number, '136 of 2017, dated 28.08.2017'),
  project_configurations = '["2 BHK","3 BHK"]'::jsonb,
  clubhouse = true,
  gym = true,
  indoor_sports = true,
  outdoor_sports = true,
  tennis = true,
  basketball = true,
  landscaped_gardens = true,
  amenity_labels = '["Two Operational Clubhouses","Two Gymnasiums","Private Movie Theatre","Dance Studio","Music Studio","Billiards Room","Skating Rink","Tennis Court","Basketball Court","Landscaping & Water Features"]'::jsonb,
  project_highlights = '["Delivered residential community in Sector 104","2 & 3 BHK apartment mix","Two operational clubhouses","Fitness, indoor recreation and outdoor sports facilities","Dwarka Expressway residential corridor"]'::jsonb,
  road_connectivity = '["Dwarka Expressway"]'::jsonb,
  official_source_urls = '["https://puriconstructions.com/project-details/emerald-bay","https://puri-emerald.sites.anarockdigital.com/"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('puri emerald bay', 'emerald bay sector 104', 'puri emerald');

update public.projects
set
  developer_name = coalesce(developer_name, 'Elan Group'),
  corridor = coalesce(corridor, 'Dwarka Expressway'),
  clubhouse = true,
  swimming_pool = true,
  spa_wellness = true,
  kids_play_area = true,
  senior_citizen_area = true,
  landscaped_gardens = true,
  amenity_labels = '["Clubhouse","Swimming Pool","Landscaped Green Spaces","Kids'' Recreation Areas","Senior Citizen Areas","Adult Recreation & Wellness Areas"]'::jsonb,
  project_highlights = '["Sector 106 Dwarka Expressway address","Podium-level clubhouse","State-of-the-art swimming pool","Landscaped green spaces","Dedicated recreation zones for different age groups"]'::jsonb,
  road_connectivity = '["Dwarka Expressway","NH-48 / Delhi connectivity via the wider Gurugram road network"]'::jsonb,
  business_hubs_nearby = '["Cyber City and major Gurugram commercial hubs via the city road network"]'::jsonb,
  official_source_urls = '["https://www.elanlimited.com/elan-presidential/","https://elannew.elanlimited.com/elan-the-presidential/"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('elan the presidential', 'elan presidential', 'the presidential sector 106');
