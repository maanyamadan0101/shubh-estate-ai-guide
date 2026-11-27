-- Stable inventory codes let repeated workbook imports update the same property row.
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS inventory_code text;

CREATE UNIQUE INDEX IF NOT EXISTS properties_inventory_code_unique
  ON public.properties (inventory_code)
  WHERE inventory_code IS NOT NULL;
