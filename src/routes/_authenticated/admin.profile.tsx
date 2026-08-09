import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { PortalSettingsEditor } from "@/components/admin/PortalSettingsEditor";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/_authenticated/admin/profile")({
  head: () => ({
    meta: [
      { title: "Business Profile | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BusinessProfilePage,
});

function BusinessProfilePage() {
  return (
    <AdminShell title="Business Profile" subtitle="Maintain the core business details used across your management portal.">
      <PortalSettingsEditor
        settingKey="business_profile"
        defaults={{
          business_name: CONTACT.name,
          tagline: CONTACT.tagline,
          address: CONTACT.address,
          phone: CONTACT.phone,
          email: CONTACT.email,
          website: CONTACT.website,
        }}
        fields={[
          { name: "business_name", label: "Business Name" },
          { name: "tagline", label: "Tagline", multiline: true },
          { name: "address", label: "Office Address", multiline: true },
          { name: "phone", label: "Phone / WhatsApp" },
          { name: "email", label: "Business Email" },
          { name: "website", label: "Website" },
        ]}
        note="This creates a central business-profile record in the portal. The current public website still uses the verified contact details already in the site code; public-site synchronization can be enabled after this portal phase is stable."
      />
    </AdminShell>
  );
}
