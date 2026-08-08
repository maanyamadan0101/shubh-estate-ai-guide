
CREATE POLICY "property_images_staff_read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'property-images' AND public.is_staff(auth.uid()));
CREATE POLICY "property_images_staff_insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'property-images' AND public.can_edit(auth.uid()));
CREATE POLICY "property_images_staff_update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'property-images' AND public.can_edit(auth.uid()))
  WITH CHECK (bucket_id = 'property-images' AND public.can_edit(auth.uid()));
CREATE POLICY "property_images_staff_delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'property-images' AND public.can_edit(auth.uid()));
