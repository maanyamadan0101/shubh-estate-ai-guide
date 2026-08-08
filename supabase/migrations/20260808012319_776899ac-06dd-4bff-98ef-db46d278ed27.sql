
-- ============ helpers ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TYPE public.app_role AS ENUM ('admin','editor','agent','user');
CREATE TYPE public.listing_status AS ENUM ('ready_to_move','under_construction','new_launch','sold_out');
CREATE TYPE public.property_type AS ENUM ('apartment','builder_floor','villa','plot','commercial','office','retail');
CREATE TYPE public.enquiry_status AS ENUM ('new','contacted','qualified','site_visit','closed','lost');

-- ============ users (profiles) ============
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO authenticated;
GRANT ALL ON public.users TO service_role;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor','agent'));
$$;

CREATE OR REPLACE FUNCTION public.can_edit(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor'));
$$;

CREATE POLICY "users_select_own" ON public.users FOR SELECT TO authenticated
  USING (auth_user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "users_insert_own" ON public.users FOR INSERT TO authenticated
  WITH CHECK (auth_user_id = auth.uid());
CREATE POLICY "users_update_own" ON public.users FOR UPDATE TO authenticated
  USING (auth_user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (auth_user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "users_delete_admin" ON public.users FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "roles_select_own" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ builders ============
CREATE TABLE public.builders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  description TEXT,
  established_year INT,
  website TEXT,
  rera_registration TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.builders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.builders TO authenticated;
GRANT ALL ON public.builders TO service_role;
ALTER TABLE public.builders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "builders_public_read" ON public.builders FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "builders_staff_read" ON public.builders FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "builders_write" ON public.builders FOR ALL TO authenticated
  USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER trg_builders_updated BEFORE UPDATE ON public.builders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ projects ============
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id UUID REFERENCES public.builders(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sector TEXT,
  locality TEXT,
  city TEXT NOT NULL DEFAULT 'Gurugram',
  state TEXT NOT NULL DEFAULT 'Haryana',
  status public.listing_status NOT NULL DEFAULT 'under_construction',
  rera_number TEXT,
  price_min NUMERIC(14,2),
  price_max NUMERIC(14,2),
  possession_date DATE,
  description TEXT,
  cover_image_url TEXT,
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_public_read" ON public.projects FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "projects_staff_read" ON public.projects FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "projects_write" ON public.projects FOR ALL TO authenticated
  USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_projects_builder ON public.projects(builder_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_locality ON public.projects(locality);
CREATE INDEX idx_projects_search ON public.projects USING GIN (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(locality,'') || ' ' || coalesce(sector,'')));

-- ============ properties ============
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  builder_id UUID REFERENCES public.builders(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  property_type public.property_type NOT NULL DEFAULT 'apartment',
  status public.listing_status NOT NULL DEFAULT 'ready_to_move',
  listing_type TEXT NOT NULL DEFAULT 'sale',
  bhk TEXT,
  bedrooms INT,
  bathrooms INT,
  balconies INT,
  area_sqft NUMERIC(10,2),
  carpet_area_sqft NUMERIC(10,2),
  price NUMERIC(14,2) NOT NULL DEFAULT 0,
  price_per_sqft NUMERIC(12,2),
  furnishing TEXT,
  facing TEXT,
  floor_number INT,
  total_floors INT,
  sector TEXT,
  locality TEXT,
  city TEXT NOT NULL DEFAULT 'Gurugram',
  state TEXT NOT NULL DEFAULT 'Haryana',
  pincode TEXT,
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  rera_number TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  cover_image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  views_count INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.properties TO authenticated;
GRANT ALL ON public.properties TO service_role;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "properties_public_read" ON public.properties FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "properties_staff_read" ON public.properties FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "properties_write" ON public.properties FOR ALL TO authenticated
  USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER trg_properties_updated BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_properties_project ON public.properties(project_id);
CREATE INDEX idx_properties_builder ON public.properties(builder_id);
CREATE INDEX idx_properties_type ON public.properties(property_type);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_price ON public.properties(price);
CREATE INDEX idx_properties_locality ON public.properties(locality);
CREATE INDEX idx_properties_sector ON public.properties(sector);
CREATE INDEX idx_properties_featured ON public.properties(is_featured) WHERE is_featured;
CREATE INDEX idx_properties_published ON public.properties(is_published, created_at DESC);
CREATE INDEX idx_properties_tags ON public.properties USING GIN (tags);
CREATE INDEX idx_properties_search ON public.properties USING GIN (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(locality,'') || ' ' || coalesce(sector,'')));

-- ============ property_images ============
CREATE TABLE public.property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.property_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.property_images TO authenticated;
GRANT ALL ON public.property_images TO service_role;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "property_images_public_read" ON public.property_images FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND p.is_published));
CREATE POLICY "property_images_staff_read" ON public.property_images FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "property_images_write" ON public.property_images FOR ALL TO authenticated
  USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER trg_property_images_updated BEFORE UPDATE ON public.property_images
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_property_images_property ON public.property_images(property_id, sort_order);

-- ============ property_features ============
CREATE TABLE public.property_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  feature_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'amenity',
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (property_id, feature_name)
);
GRANT SELECT ON public.property_features TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.property_features TO authenticated;
GRANT ALL ON public.property_features TO service_role;
ALTER TABLE public.property_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "property_features_public_read" ON public.property_features FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND p.is_published));
CREATE POLICY "property_features_staff_read" ON public.property_features FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "property_features_write" ON public.property_features FOR ALL TO authenticated
  USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER trg_property_features_updated BEFORE UPDATE ON public.property_features
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_property_features_property ON public.property_features(property_id);
CREATE INDEX idx_property_features_category ON public.property_features(category);

-- ============ customers ============
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  city TEXT,
  customer_type TEXT NOT NULL DEFAULT 'buyer',
  budget_min NUMERIC(14,2),
  budget_max NUMERIC(14,2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "customers_self_read" ON public.customers FOR SELECT TO authenticated
  USING (auth_user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "customers_staff_write" ON public.customers FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER trg_customers_updated BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_customers_phone ON public.customers(phone);
CREATE INDEX idx_customers_email ON public.customers(email);

-- ============ enquiries ============
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  interest TEXT,
  message TEXT,
  budget TEXT,
  status public.enquiry_status NOT NULL DEFAULT 'new',
  source TEXT NOT NULL DEFAULT 'website',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enquiries_public_insert" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "enquiries_staff_read" ON public.enquiries FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "enquiries_staff_update" ON public.enquiries FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "enquiries_admin_delete" ON public.enquiries FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_enquiries_updated BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_enquiries_status ON public.enquiries(status, created_at DESC);
CREATE INDEX idx_enquiries_property ON public.enquiries(property_id);
CREATE INDEX idx_enquiries_customer ON public.enquiries(customer_id);

-- ============ testimonials ============
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_role TEXT,
  quote TEXT NOT NULL,
  rating SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials_public_read" ON public.testimonials FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "testimonials_staff_read" ON public.testimonials FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "testimonials_write" ON public.testimonials FOR ALL TO authenticated
  USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_testimonials_published ON public.testimonials(is_published, sort_order);

-- ============ blog_posts ============
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  reading_minutes INT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "blog_public_read" ON public.blog_posts FOR SELECT TO anon, authenticated USING (is_published);
CREATE POLICY "blog_staff_read" ON public.blog_posts FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "blog_write" ON public.blog_posts FOR ALL TO authenticated
  USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER trg_blog_updated BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_blog_published ON public.blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_tags ON public.blog_posts USING GIN (tags);
CREATE INDEX idx_blog_search ON public.blog_posts USING GIN (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,'')));

-- ============ site_settings ============
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT TO anon, authenticated USING (is_public);
CREATE POLICY "settings_admin_all" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ seed data ============
INSERT INTO public.builders (id, name, slug, description, established_year, website) VALUES
 ('11111111-1111-4111-8111-111111111101','DLF','dlf','India''s largest listed real estate developer with landmark Gurugram addresses.',1946,'https://www.dlf.in'),
 ('11111111-1111-4111-8111-111111111102','M3M','m3m','Premium residential and commercial developer across Golf Course Extension and Dwarka Expressway.',2007,'https://www.m3mindia.com'),
 ('11111111-1111-4111-8111-111111111103','Sobha','sobha','Backward-integrated developer known for build quality and luxury villas.',1995,'https://www.sobha.com'),
 ('11111111-1111-4111-8111-111111111104','Signature Global','signature-global','Leading affordable and mid-premium housing developer in Gurugram.',2014,'https://signatureglobal.in'),
 ('11111111-1111-4111-8111-111111111105','Godrej Properties','godrej-properties','Pan-India developer with premium launches on Golf Course Extension Road.',1990,'https://www.godrejproperties.com');

INSERT INTO public.projects (id, builder_id, name, slug, sector, locality, status, rera_number, price_min, price_max, description) VALUES
 ('22222222-2222-4222-8222-222222222201','11111111-1111-4111-8111-111111111101','DLF The Arbour','dlf-the-arbour','Sector 63','Golf Course Extension Road','under_construction','RC/REP/HARERA/GGM/2022/01',85000000,120000000,'Ultra-luxury 4 BHK towers designed by SWA Group.'),
 ('22222222-2222-4222-8222-222222222202','11111111-1111-4111-8111-111111111103','Sobha International City','sobha-international-city','Sector 108','Dwarka Expressway','new_launch','RC/REP/HARERA/GGM/2021/44',120000000,180000000,'Gated presidential villa community on Dwarka Expressway.'),
 ('22222222-2222-4222-8222-222222222203','11111111-1111-4111-8111-111111111102','M3M Corporate Suites','m3m-corporate-suites','Sector 113','Dwarka Expressway','under_construction','RC/REP/HARERA/GGM/2020/18',18000000,32000000,'Grade-A office suites with assured rental potential.'),
 ('22222222-2222-4222-8222-222222222204','11111111-1111-4111-8111-111111111105','Godrej Aristocrat','godrej-aristocrat','Sector 49','Golf Course Extension Road','new_launch','RC/REP/HARERA/GGM/2023/09',42000000,68000000,'Contemporary 3 and 4 BHK residences with resort-style amenities.');

INSERT INTO public.properties (id, project_id, builder_id, title, slug, description, property_type, status, bhk, bedrooms, bathrooms, area_sqft, price, price_per_sqft, sector, locality, tags, is_featured) VALUES
 ('33333333-3333-4333-8333-333333333301','22222222-2222-4222-8222-222222222201','11111111-1111-4111-8111-111111111101','DLF The Arbour — 4 BHK Luxury Residence','dlf-the-arbour-4bhk-sector-63','Expansive 4 BHK with private lift lobby, overlooking landscaped greens.','apartment','under_construction','4 BHK',4,4,3975,89000000,22390,'Sector 63','Golf Course Extension Road','{Luxury,"RERA Approved","Loan Available"}',true),
 ('33333333-3333-4333-8333-333333333302',NULL,'11111111-1111-4111-8111-111111111104','Signature Builder Floor — 3 BHK','signature-builder-floor-3bhk-sector-57','Ready-to-move independent floor with private terrace on Sohna Road.','builder_floor','ready_to_move','3 BHK',3,3,1850,23500000,12703,'Sector 57','Sohna Road','{"Ready to Move","Loan Available"}',false),
 ('33333333-3333-4333-8333-333333333303','22222222-2222-4222-8222-222222222202','11111111-1111-4111-8111-111111111103','Sobha International Villa — 5 BHK','sobha-international-villa-5bhk-sector-108','Presidential villa with private garden, home theatre and staff quarters.','villa','new_launch','5 BHK',5,6,5400,145000000,26851,'Sector 108','Dwarka Expressway','{Luxury,"New Launch","RERA Approved"}',true),
 ('33333333-3333-4333-8333-333333333304','22222222-2222-4222-8222-222222222203','11111111-1111-4111-8111-111111111102','M3M Corporate Suite — Office','m3m-corporate-suite-sector-113','Fitted office suite in a Grade-A tower with assured rental programme.','office','under_construction','Office Suite',NULL,2,1120,20500000,18303,'Sector 113','Dwarka Expressway','{Investment,"Assured Rental","RERA Approved"}',false),
 ('33333333-3333-4333-8333-333333333305','22222222-2222-4222-8222-222222222204','11111111-1111-4111-8111-111111111105','Godrej Aristocrat — 3 BHK','godrej-aristocrat-3bhk-sector-49','New-launch 3 BHK with double-height clubhouse and sky lounge.','apartment','new_launch','3 BHK',3,3,2450,47500000,19387,'Sector 49','Golf Course Extension Road','{"New Launch","Loan Available"}',true);

INSERT INTO public.property_images (property_id, image_url, alt_text, sort_order, is_primary) VALUES
 ('33333333-3333-4333-8333-333333333301','/assets/prop-1.jpg','DLF The Arbour tower facade',0,true),
 ('33333333-3333-4333-8333-333333333302','/assets/prop-2.jpg','Signature builder floor exterior',0,true),
 ('33333333-3333-4333-8333-333333333303','/assets/prop-3.jpg','Sobha villa frontage',0,true),
 ('33333333-3333-4333-8333-333333333304','/assets/prop-4.jpg','M3M corporate suite lobby',0,true),
 ('33333333-3333-4333-8333-333333333305','/assets/prop-1.jpg','Godrej Aristocrat residences',0,true);

INSERT INTO public.property_features (property_id, feature_name, category) VALUES
 ('33333333-3333-4333-8333-333333333301','Private lift lobby','amenity'),
 ('33333333-3333-4333-8333-333333333301','Clubhouse','amenity'),
 ('33333333-3333-4333-8333-333333333301','Power backup','utility'),
 ('33333333-3333-4333-8333-333333333303','Private garden','amenity'),
 ('33333333-3333-4333-8333-333333333303','Home theatre','amenity'),
 ('33333333-3333-4333-8333-333333333304','24x7 security','security'),
 ('33333333-3333-4333-8333-333333333305','Sky lounge','amenity');

INSERT INTO public.testimonials (author_name, author_role, quote, rating, sort_order) VALUES
 ('Rohit Sharma','Homebuyer, Sector 63A','Arun''s banking background showed in every conversation. The title check and loan structuring saved us both money and months of uncertainty.',5,1),
 ('Neha Kapoor','NRI Investor, Dubai','Managing a Gurugram purchase from abroad felt effortless. Documentation, valuation and bank coordination were handled end to end.',5,2),
 ('Vikram Sethi','Seller, Golf Course Road','Fair pricing advice, genuine buyers and complete transparency. No inflated promises — just a clean, professional transaction.',5,3);

INSERT INTO public.blog_posts (title, slug, excerpt, content, tags, is_published, published_at, reading_minutes) VALUES
 ('The Gurugram Growth Story: Why Millennium City Still Outperforms','gurugram-growth-story','How infrastructure, corporate demand and new corridors keep Gurugram real estate ahead.','Gurugram has evolved from farmland to India''s premier corporate address...','{Gurugram,Investment,Market}',true,now(),9),
 ('Home Loan Checklist for NRI Buyers in 2026','nri-home-loan-checklist','Documentation, eligibility and repatriation rules NRI buyers should plan for.','NRI home loans follow a distinct documentation path...','{"Home Loans",NRI}',true,now(),6);

INSERT INTO public.site_settings (key, value, description, is_public) VALUES
 ('contact','{"name":"Shubh Estate Brokers","phone":"+91 8130785000","email":"sales@shubhestatebroker.in","address":"15th Floor, Ocus Quantum Mall, Sector 51, Gurugram – 122003, Haryana","whatsapp":"https://wa.me/918130785000"}','Primary contact details',true),
 ('hero','{"tagline":"Fair & Transparent Real Estate Deals at the Best Price"}','Homepage hero copy',true),
 ('loan_disclaimer','{"text":"Home loans are subject to lender credit policy, eligibility and property approval."}','Legal disclaimer for loan sections',true),
 ('lead_routing','{"notify_email":"sales@shubhestatebroker.in"}','Internal lead routing config',false);
