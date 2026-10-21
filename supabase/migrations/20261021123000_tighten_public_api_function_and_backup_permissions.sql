-- Tighten API access to backup tables and privileged helper functions.
-- Keep authenticated EXECUTE on can_edit/is_staff because RLS policies call them.
-- Event triggers execute as their owner; clients should not call this function directly.

REVOKE ALL ON TABLE public."Properties_backup", public.property_images_backup
  FROM anon, authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.can_edit(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
