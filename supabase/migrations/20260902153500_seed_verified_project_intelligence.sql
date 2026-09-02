-- Seed only project facts verified from official/developer sources on 2026-09-02.
-- Updates are name-matched and do not create duplicate project records.

update public.projects
set
  developer_name = coalesce(developer_name, 'ATS / Great Value HPL Infratech'),
  corridor = coalesce(corridor, 'Dwarka Expressway'),
  project_status = coalesce(project_status, 'Ready to move'),
  clubhouse = true,
  swimming_pool = true,
  gym = true,
  indoor_sports = true,
  outdoor_sports = true,
  kids_play_area = true,
  landscaped_gardens = true,
  security = true,
  gated_access = true,
  power_backup = true,
  amenity_labels = '["Clubhouse","Swimming Pool","Gymnasium","Sports Courts","Kids'' Play Area","Landscaped Greens","Banquet / Party Hall","24x7 Security","Power Backup","Gated Community"]'::jsonb,
  project_highlights = '["Ready-to-move gated residential community","Clubhouse, swimming pool and gymnasium","Landscaped podium greens and open areas","Sports and children''s recreation facilities","Dwarka Expressway address in Sector 104"]'::jsonb,
  road_connectivity = '["Dwarka Expressway","Delhi-Gurugram road network","NH-48 connectivity via the wider corridor"]'::jsonb,
  business_hubs_nearby = '["Udyog Vihar","Cyber City / Cyber Hub via the Delhi-Gurugram road network"]'::jsonb,
  official_source_urls = '["https://www.atsgreens.com/projects/ats-triumph/"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('ats triumph', 'ats triumph sector 104');

update public.projects
set
  developer_name = coalesce(developer_name, 'Hero Realty'),
  corridor = coalesce(corridor, 'Dwarka Expressway'),
  project_configurations = '["2 BHK","3 BHK"]'::jsonb,
  gym = true,
  indoor_sports = true,
  outdoor_sports = true,
  tennis = true,
  badminton = true,
  squash = true,
  landscaped_gardens = true,
  walking_jogging_track = true,
  kids_play_area = true,
  restaurant_cafe = true,
  pet_area = true,
  security = true,
  amenity_labels = '["Gymnasium","Squash Court","Tennis Court","Indoor Badminton Courts","Jogging & Cycling Track","Cricket Pitch","Yoga & Meditation Area","Indoor & Outdoor Banquet Facilities","Kids'' Recreation Areas","Pet Zone","Restaurant","Cafe","Landscaped Gardens","Security"]'::jsonb,
  project_highlights = '["Sector 104 location on Dwarka Expressway","50+ developer-listed lifestyle and wellness amenities","Sports courts and fitness facilities","Landscaped and wellness-oriented open spaces","2 & 3 BHK residential configuration mix"]'::jsonb,
  road_connectivity = '["Dwarka Expressway"]'::jsonb,
  business_hubs_nearby = '["Udyog Vihar","Cyber Hub"]'::jsonb,
  official_source_urls = '["https://www.herohomes.in/projects/apartments/gurugram-haryana/gurugram-by-hero-homes"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('hero homes', 'hero homes gurugram', 'hero homes sector 104');

update public.projects
set
  developer_name = coalesce(developer_name, 'SOBHA Limited'),
  corridor = coalesce(corridor, 'Dwarka Expressway'),
  land_area = coalesce(land_area, 'Approx. 39 acres'),
  project_configurations = '["2 BHK","3 BHK"]'::jsonb,
  clubhouse = true,
  swimming_pool = true,
  gym = true,
  indoor_sports = true,
  outdoor_sports = true,
  tennis = true,
  badminton = true,
  basketball = true,
  landscaped_gardens = true,
  walking_jogging_track = true,
  convenience_store = true,
  covered_parking = true,
  visitor_parking = true,
  security = true,
  power_backup = true,
  amenity_labels = '["Two Clubhouses","Olympic-size Swimming Pool","Gym / Fitness Facilities","Cricket Ground","Tennis Courts","Basketball Court","Volleyball Court","Indoor Badminton Courts","Walking & Biking Trail","Landscaped Green Spaces","Convenience Retail","Covered Parking","Visitor Parking","Intercom Security","Power Backup"]'::jsonb,
  project_highlights = '["Approx. 39-acre residential development","Two clubhouses spread over about 40,000 sq ft","Olympic-size pool and resort-style lakelet","Extensive sports facilities and cricket ground","Large green/open-space component"]'::jsonb,
  road_connectivity = '["Dwarka Expressway / Upper Dwarka Expressway corridor"]'::jsonb,
  official_source_urls = '["https://www.sobha.com/sobha-city-gurgaon/","https://citygurgaon.sobha.com/"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('sobha city', 'sobha city gurgaon');

update public.projects
set
  developer_name = coalesce(developer_name, 'Krisumi Corporation (Sumitomo Corporation × Krishna Group JV)'),
  corridor = coalesce(corridor, 'Dwarka Expressway / New Gurugram'),
  land_area = coalesce(land_area, 'Approx. 5.43 acres for Waterfall Residences'),
  project_configurations = '["2 BHK","3 BHK","4 BHK"]'::jsonb,
  clubhouse = true,
  swimming_pool = true,
  gym = true,
  spa_wellness = true,
  outdoor_sports = true,
  tennis = true,
  restaurant_cafe = true,
  landscaped_gardens = true,
  convenience_store = true,
  security = true,
  power_backup = true,
  water_supply = true,
  covered_parking = true,
  visitor_parking = true,
  amenity_labels = '["Clubhouse","Swimming Pools","Gymnasium","Restaurant","Bar Lounge","Spa & Salon","Theatre","Tennis Court","Residents'' Lounge","Business Centre","Landscaped Green Areas","Convenience Store","Round-the-clock Security","100% Power Backup","Open & Covered Parking","24-hour Water Supply"]'::jsonb,
  project_highlights = '["Japanese-influenced planning and architecture","Approx. 36,000 sq ft clubhouse","Swimming, fitness, spa and social facilities","Landscaped residential environment","Sector 36A location with Dwarka Expressway / NH-48 access"]'::jsonb,
  road_connectivity = '["Dwarka Expressway","NH-48"]'::jsonb,
  official_source_urls = '["https://krisumi.com/project/waterfall-residences/","https://krisumi.com/project/lp/index.php"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('krisumi waterfall residences', 'waterfall residences', 'krisumi waterfall');

update public.projects
set
  developer_name = coalesce(developer_name, 'Godrej Properties'),
  corridor = coalesce(corridor, 'Dwarka Expressway'),
  clubhouse = true,
  gym = true,
  spa_wellness = true,
  indoor_sports = true,
  outdoor_sports = true,
  tennis = true,
  squash = true,
  walking_jogging_track = true,
  multipurpose_hall = true,
  restaurant_cafe = true,
  amenity_labels = '["Club / Social Facilities","Gym / Personal Fitness Studio","Spa & Salon","Squash Court","Tennis Court","Jogging Track","Cycling Track","Skating Arena","Multipurpose Hall","Restaurants","Daily Essentials","Medical Assistance"]'::jsonb,
  project_highlights = '["Sports and wellness-focused amenity programme","Fitness, spa and social spaces","Tennis, squash, jogging and cycling facilities","Dwarka Expressway-side Gurugram location"]'::jsonb,
  road_connectivity = '["Dwarka Expressway corridor"]'::jsonb,
  official_source_urls = '["https://www.godrejproperties.com/gurugram/residential/godrej-meridien/amenities"]'::jsonb,
  last_verified_date = date '2026-09-02'
where lower(name) in ('godrej meridien', 'godrej meridian');
