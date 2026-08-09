import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PortalSettingsEditor } from "@/components/admin/PortalSettingsEditor";

export const Route = createFileRoute("/_authenticated/admin/seo")({
  head: () => ({
    meta: [
      { title: "SEO & Google | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SeoPage,
});

function SeoPage() {
  return (
    <AdminShell title="SEO / Google" subtitle="Keep your search, analytics and business-profile references organized in one place.">
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-3">
          <StatusCard title="Property SEO" text="Automatic title, description, slug and image ALT generation is active in the property editor." />
          <StatusCard title="Search Visibility" text="Published property pages include canonical URLs and structured property data." />
          <StatusCard title="Indexing Controls" text="Admin pages are noindex; public property pages are designed for indexing." />
        </section>

        <PortalSettingsEditor
          settingKey="seo"
          defaults={{
            search_console_property: "https://www.shubhestatebroker.in",
            ga_measurement_id: "",
            google_business_url: "",
            default_title_suffix: "Shubh Estate Brokers | Gurugram",
          }}
          fields={[
            { name: "search_console_property", label: "Google Search Console Property", placeholder: "https://www.shubhestatebroker.in" },
            { name: "ga_measurement_id", label: "Google Analytics Measurement ID", placeholder: "G-XXXXXXXXXX", help: "Store the ID here for reference. Tracking code activation should be verified separately before changing production analytics." },
            { name: "google_business_url", label: "Google Business Profile URL", placeholder: "https://g.page/..." },
            { name: "default_title_suffix", label: "Default SEO Title Suffix", placeholder: "Shubh Estate Brokers | Gurugram" },
          ]}
          note="This page records the SEO/Google configuration centrally. Existing property SEO remains automatic and unchanged."
        />
      </div>
    </AdminShell>
  );
}

function StatusCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-gold"><CheckCircle2 className="size-4" aria-hidden="true" /><BarChart3 className="size-4" aria-hidden="true" /></div>
      <h2 className="mt-3 font-display text-lg">{title}</h2>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
    </div>
  );
}
