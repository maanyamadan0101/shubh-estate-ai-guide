import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, Image, MapPin, PlayCircle, SearchCheck, Text } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PortalSettingsEditor } from "@/components/admin/PortalSettingsEditor";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/seo")({
  head: () => ({
    meta: [
      { title: "SEO & Google | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SeoPage,
});

const POSTING_CHECKLIST = [
  {
    icon: SearchCheck,
    title: "Use a specific property title",
    text: "Write configuration + property type/project + sector. Example: 3 BHK + Servant at Conscient Heritage One, Sector 62 Gurgaon. Avoid vague titles such as Premium Property or Best Deal.",
  },
  {
    icon: MapPin,
    title: "Complete the location fields",
    text: "Always enter sector, locality/corridor and city accurately. Project, sector and Gurgaon are used automatically in the SEO title, URL and search description.",
  },
  {
    icon: Image,
    title: "Upload strong actual photos",
    text: "Use a clear cover photo and several sharp real-property images. Reorder them logically. The editor creates descriptive ALT text; edit it only when a photo shows something more specific.",
  },
  {
    icon: Text,
    title: "Write unique useful content",
    text: "Describe the exact unit: area, floor, facing, view, furnishing, condition, possession, parking, key features and locality advantage. Do not copy the same description between multiple units and avoid keyword stuffing.",
  },
  {
    icon: CheckCircle2,
    title: "Fill factual decision-making details",
    text: "Add price, built-up/carpet area, bathrooms, balconies, floor, total floors, facing, parking, possession and RERA number when applicable. Only select amenities and features that are actually available.",
  },
  {
    icon: PlayCircle,
    title: "Add a video when available",
    text: "A walkthrough or YouTube video gives buyers more context and can bring traffic from video search and social sharing. Use the same property name, sector and website property URL in the YouTube description.",
  },
];

function SeoPage() {
  return (
    <AdminShell title="SEO / Google" subtitle="A practical checklist for publishing property pages that search engines and buyers can understand clearly.">
      <div className="space-y-8">
        <section className="grid gap-4 sm:grid-cols-3">
          <StatusCard title="Automatic Property SEO" text="SEO title, search description, URL slug, canonical URL and image ALT text are generated from the property details you enter." />
          <StatusCard title="Search Visibility" text="Published property pages include crawlable metadata and structured property information." />
          <StatusCard title="Image Discovery" text="Published property cover images are included in the website sitemap to help search engines discover them." />
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Before every Publish</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl">Property SEO posting checklist</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Complete these items for every property. Accuracy and genuinely useful, unique information are more valuable than repeating keywords.
              </p>
            </div>
            <Button asChild variant="gold">
              <Link to="/admin/new">Add Property</Link>
            </Button>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {POSTING_CHECKLIST.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-xl border border-border bg-background p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-muted/60 p-5 text-sm leading-6 text-muted-foreground">
            <strong className="text-foreground">Recommended description pattern:</strong> opening summary → exact unit details → floor/view/condition → project amenities → location/connectivity → price/availability → clear enquiry call-to-action. Keep it natural; do not add repeated lists of “property in Gurgaon” keywords.
          </div>
        </section>

        <PortalSettingsEditor
          settingKey="seo"
          defaults={{
            search_console_property: "https://www.shubhestatebroker.in",
            ga_measurement_id: "G-8EWLZD8V5H",
            google_business_url: "",
            default_title_suffix: "Shubh Estate Brokers | Gurugram",
          }}
          fields={[
            { name: "search_console_property", label: "Google Search Console Property", placeholder: "https://www.shubhestatebroker.in" },
            { name: "ga_measurement_id", label: "Google Analytics Measurement ID", placeholder: "G-XXXXXXXXXX", help: "The production website already contains a GA4 measurement ID. Keep this record aligned with the live configuration." },
            { name: "google_business_url", label: "Google Business Profile URL", placeholder: "https://g.page/..." },
            { name: "default_title_suffix", label: "Default SEO Title Suffix", placeholder: "Shubh Estate Brokers | Gurugram" },
          ]}
          note="Search performance should be reviewed in Google Search Console over time. New property pages are added to the sitemap automatically after publication."
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
