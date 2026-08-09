import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { PortalSettingsEditor } from "@/components/admin/PortalSettingsEditor";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({
    meta: [
      { title: "Website Settings | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: WebsiteSettingsPage,
});

function WebsiteSettingsPage() {
  return (
    <AdminShell title="Website Settings" subtitle="Store the operational defaults used when managing listings and enquiries.">
      <PortalSettingsEditor
        settingKey="website"
        defaults={{
          default_city: "Gurugram",
          currency: "INR",
          lead_response_target: "Within 1 business day",
          property_contact_cta: "Request a private viewing",
          listing_default_status: "Ready to Move",
        }}
        fields={[
          { name: "default_city", label: "Default City" },
          { name: "currency", label: "Default Currency" },
          { name: "lead_response_target", label: "Lead Response Target" },
          { name: "property_contact_cta", label: "Preferred Property CTA" },
          { name: "listing_default_status", label: "Default Listing Status" },
        ]}
        note="These are portal defaults and operational preferences. They do not overwrite existing published property data."
      />
    </AdminShell>
  );
}
