import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, FileVideo2, Image as ImageIcon, MessageCircle, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listSellerSubmissions, type SellerSubmission } from "@/lib/seller-submissions.functions";

export const Route = createFileRoute("/_authenticated/admin/seller-submissions")({
  head: () => ({
    meta: [
      { title: "Private Seller Submissions | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SellerSubmissionsAdmin,
});

function SellerSubmissionsAdmin() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["seller-submissions"],
    queryFn: () => listSellerSubmissions(),
  });
  const submissions = data ?? [];

  return (
    <AdminShell
      title="Private Seller Submissions"
      subtitle="Owner-submitted properties stay private here until you choose to create and publish a buyer listing."
      actions={
        <Button asChild variant="outline">
          <a href="/seller-submit" target="_blank" rel="noreferrer">Open seller link</a>
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="rounded-2xl border border-gold/30 bg-card p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="font-medium">Private intake only</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                These are seller leads, not public properties. Review the unit, speak with the owner, verify details and then create a separate draft in the Property Catalogue if you want to market it.
              </p>
            </div>
          </div>
        </div>

        {isLoading ? <p className="text-sm text-muted-foreground">Loading seller submissions…</p> : null}
        {error ? <p className="rounded-xl border border-destructive/30 p-5 text-sm">Could not load seller submissions.</p> : null}
        {!isLoading && !error && submissions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-display text-2xl">No private seller submissions yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Share the private seller link with owners and NRIs who want to sell.</p>
          </div>
        ) : null}

        {submissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} />)}
      </div>
    </AdminShell>
  );
}

function SubmissionCard({ submission }: { submission: SellerSubmission }) {
  const p = submission.property;
  const whatsapp = `https://wa.me/${submission.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Regarding your private property submission ${submission.reference} for ${p.project || "your Gurgaon property"}.`)}`;

  return (
    <article className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">PRIVATE · NOT PUBLISHED</Badge>
            {submission.seller.is_nri ? <Badge variant="outline">NRI / Overseas</Badge> : null}
          </div>
          <h2 className="mt-3 font-display text-2xl">{p.project || "Seller property"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {[p.configuration, p.sector, p.property_type, p.area_sqft ? `${p.area_sqft} sq.ft.` : null].filter(Boolean).join(" · ")}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Reference {submission.reference} · {new Date(submission.created_at).toLocaleString("en-IN")}</p>
        </div>
        <div className="text-sm md:text-right">
          <p className="font-medium">{submission.full_name}</p>
          <p className="text-muted-foreground">{submission.phone}</p>
          {submission.email ? <p className="text-muted-foreground">{submission.email}</p> : null}
          {submission.seller.country ? <p className="text-muted-foreground">{submission.seller.country}</p> : null}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Detail label="Expected price" value={p.expected_price} />
        <Detail label="Floor / facing" value={[p.floor, p.facing].filter(Boolean).join(" · ")} />
        <Detail label="Occupancy" value={p.occupancy} />
        <Detail label="Visit availability" value={p.availability} />
      </div>

      {submission.notes ? (
        <div className="mt-5 rounded-xl bg-muted/40 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Seller notes</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{submission.notes}</p>
        </div>
      ) : null}

      {submission.media.length || submission.media_link ? (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Private media</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {submission.media.map((media, index) => media.signed_url ? (
              <Button key={media.path} asChild size="sm" variant="outline">
                <a href={media.signed_url} target="_blank" rel="noreferrer">
                  {media.kind === "image" ? <ImageIcon className="size-3.5" aria-hidden="true" /> : <FileVideo2 className="size-3.5" aria-hidden="true" />}
                  {media.kind === "image" ? `Photo ${index + 1}` : `Video ${index + 1}`}
                </a>
              </Button>
            ) : null)}
            {submission.media_link ? (
              <Button asChild size="sm" variant="outline">
                <a href={submission.media_link} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  Seller media link
                </a>
              </Button>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Direct media links are temporary and private; refresh this page to generate fresh links.</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="gold" size="sm">
          <a href={whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle className="size-3.5" aria-hidden="true" />
            WhatsApp seller
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href="/admin/new">Create listing draft</a>
        </Button>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value?: string | null | undefined }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-medium">{value || "Not provided"}</p>
    </div>
  );
}
