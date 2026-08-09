import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Youtube } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PortalSettingsEditor } from "@/components/admin/PortalSettingsEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/social")({
  head: () => ({
    meta: [
      { title: "YouTube & Social | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SocialPage,
});

function SocialPage() {
  return (
    <AdminShell title="YouTube & Social" subtitle="Keep your channel and social links in one place. YouTube publishing authorization is handled separately.">
      <div className="space-y-6">
        <section className="max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Youtube className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-xl">YouTube Publishing</h2>
                <p className="mt-1 text-sm text-muted-foreground">Property videos can be prepared for YouTube, but Google OAuth has not yet been authorized for automatic uploads.</p>
              </div>
            </div>
            <Badge variant="secondary" className="font-normal">Not connected</Badge>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <a href="https://studio.youtube.com" target="_blank" rel="noreferrer">
                Open YouTube Studio <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </section>

        <PortalSettingsEditor
          settingKey="social"
          defaults={{ youtube_url: "", youtube_handle: "", instagram_url: "", facebook_url: "", linkedin_url: "" }}
          fields={[
            { name: "youtube_url", label: "YouTube Channel URL", placeholder: "https://www.youtube.com/@ShubhEstateBrokers", help: "Use the public channel URL, not the Gmail address." },
            { name: "youtube_handle", label: "YouTube Handle", placeholder: "@ShubhEstateBrokers" },
            { name: "instagram_url", label: "Instagram URL", placeholder: "https://www.instagram.com/..." },
            { name: "facebook_url", label: "Facebook URL", placeholder: "https://www.facebook.com/..." },
            { name: "linkedin_url", label: "LinkedIn URL", placeholder: "https://www.linkedin.com/company/..." },
          ]}
          note="These links are stored in your central portal settings. Automatic YouTube uploads will only be enabled after a secure Google OAuth authorization flow is added."
        />
      </div>
    </AdminShell>
  );
}
