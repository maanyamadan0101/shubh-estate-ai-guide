-- Prevent future direct inserts/imports from recreating the same physical
-- listing under a suffixed slug. Existing historical records are preserved so
-- their public URLs can continue returning permanent redirects.
create or replace function public.prevent_duplicate_property_unit()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if exists (
    select 1
    from public.properties p
    where p.id <> new.id
      and lower(btrim(p.title)) = lower(btrim(new.title))
      and p.listing_type is not distinct from new.listing_type
      and p.property_type is not distinct from new.property_type
      and p.area_sqft is not distinct from new.area_sqft
      and lower(coalesce(btrim(p.sector), '')) = lower(coalesce(btrim(new.sector), ''))
      and p.floor_number is not distinct from new.floor_number
      and lower(coalesce(btrim(p.facing), '')) = lower(coalesce(btrim(new.facing), ''))
  ) then
    raise exception using
      errcode = '23505',
      message = 'Duplicate property unit: update the existing listing instead of creating a suffixed URL.';
  end if;
  return new;
end;
$$;

revoke all on function public.prevent_duplicate_property_unit() from public;

drop trigger if exists properties_prevent_duplicate_unit on public.properties;
create trigger properties_prevent_duplicate_unit
before insert
on public.properties
for each row execute function public.prevent_duplicate_property_unit();
