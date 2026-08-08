
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS parking integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS servant_room boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS study_room boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS possession_date date,
  ADD COLUMN IF NOT EXISTS is_luxury boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS og_title text,
  ADD COLUMN IF NOT EXISTS og_description text,
  ADD COLUMN IF NOT EXISTS canonical_url text;

CREATE UNIQUE INDEX IF NOT EXISTS properties_slug_key ON public.properties (slug);
