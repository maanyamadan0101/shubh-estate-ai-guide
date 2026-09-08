-- Prevent new listings from being published without the minimum buyer-facing facts.
-- Existing published inventory is intentionally left untouched to avoid abrupt URL/index loss.

alter table public.properties
  add column if not exists image_license_confirmed boolean not null default false;

create or replace function public.enforce_property_publish_quality()
returns trigger
language plpgsql
set search_path to 'public'
as $function$
begin
  if new.is_published is true and (tg_op = 'INSERT' or coalesce(old.is_published, false) is false) then
    if new.price is null or new.price <= 0 then
      raise exception 'Cannot publish property: confirmed price is required.';
    end if;

    if new.area_sqft is null or new.area_sqft <= 0 then
      raise exception 'Cannot publish property: confirmed area_sqft is required.';
    end if;

    if new.image_license_confirmed is not true then
      raise exception 'Cannot publish property: image licence/permission must be confirmed.';
    end if;

    if not (
      (
        new.cover_image_url is not null
        and btrim(new.cover_image_url) <> ''
        and lower(new.cover_image_url) !~ '(placeholder|image[-_ ]?(pending|awaited)|official[-_ ]?project[-_ ]?image[-_ ]?awaited)'
      )
      or exists (
        select 1
        from public.property_images pi
        where pi.property_id = new.id
          and pi.image_url is not null
          and btrim(pi.image_url) <> ''
          and lower(pi.image_url) !~ '(placeholder|image[-_ ]?(pending|awaited)|official[-_ ]?project[-_ ]?image[-_ ]?awaited)'
      )
    ) then
      raise exception 'Cannot publish property: a non-placeholder image is required.';
    end if;
  end if;

  return new;
end;
$function$;

drop trigger if exists properties_publish_quality_gate on public.properties;

create trigger properties_publish_quality_gate
before insert or update of is_published on public.properties
for each row
execute function public.enforce_property_publish_quality();
