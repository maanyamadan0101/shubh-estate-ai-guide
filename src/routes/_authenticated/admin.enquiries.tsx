import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mail, MessageCircle, Phone, Users } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listAdminEnquiries, updateAdminEnquiryStatus, type PortalEnquiry } from "@/lib/admin.portal.functions";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  head: () => ({
    meta: [
      { title: "Enquiries & Leads | Shubh Estate Brokers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnquiriesPage,
});

const STATUS_LABELS: Record<PortalEnquiry["status"], string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  site_visit: "Site Visit",
  closed: "Closed",
  lost: "Lost",
};

function EnquiriesPage() {
  const queryClient = useQueryClient();
  const updateStatus = useServerFn(updateAdminEnquiryStatus);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: () => listAdminEnquiries(),
  });

  const enquiries = data ?? [];
  const openLeads = enquiries.filter((lead) => !["closed", "lost"].includes(lead.status)).length;
  const newLeads = enquiries.filter((lead) => lead.status === "new").length;

  async function changeStatus(id: string, status: PortalEnquiry["status"]) {
    try {
      await updateStatus({ data: { id, status } });
      toast.success("Lead status updated");
      await queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update lead");
    }
  }

  return (
    <AdminShell title="Enquiries / Leads" subtitle="Website enquiries appear here automatically so you can follow up and track each lead.">
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-3">
          <LeadStat label="Total enquiries" value={enquiries.length} />
          <LeadStat label="New leads" value={newLeads} />
          <LeadStat label="Open follow-ups" value={openLeads} />
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="border-b border-border p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Users className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-2xl">Lead Inbox</h2>
                <p className="text-sm text-muted-foreground">Newest enquiries are shown first.</p>
              </div>
            </div>
          </div>

          {isLoading ? <p className="p-8 text-sm text-muted-foreground">Loading enquiries…</p> : null}
          {error ? <p className="p-8 text-sm text-destructive">Could not load enquiries.</p> : null}

          {!isLoading && !error && enquiries.length ? (
            <ul className="divide-y divide-border">
              {enquiries.map((lead) => (
                <li key={lead.id} className="p-5">
                  <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl">{lead.full_name}</h3>
                        <Badge variant={lead.status === "new" ? "default" : "secondary"} className="font-normal">
                          {STATUS_LABELS[lead.status]}
                        </Badge>
                        <Badge variant="secondary" className="font-normal">{lead.source}</Badge>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {lead.interest || "Property enquiry"}
                        {lead.property?.title ? ` · ${lead.property.title}` : ""}
                      </p>
                      {lead.message ? <p className="mt-3 max-w-3xl text-sm leading-6">{lead.message}</p> : null}
                      <p className="mt-3 text-xs text-muted-foreground">
                        Received {new Date(lead.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>

                    <div className="flex min-w-56 flex-col gap-3">
                      <select
                        value={lead.status}
                        onChange={(event) => void changeStatus(lead.id, event.target.value as PortalEnquiry["status"])}
                        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                        aria-label={`Status for ${lead.full_name}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>

                      <div className="flex flex-wrap gap-2">
                        <Button asChild size="sm" variant="outline">
                          <a href={`tel:${lead.phone}`}><Phone className="size-3.5" aria-hidden="true" />Call</a>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                            <MessageCircle className="size-3.5" aria-hidden="true" />WhatsApp
                          </a>
                        </Button>
                        {lead.email ? (
                          <Button asChild size="sm" variant="outline">
                            <a href={`mailto:${lead.email}`}><Mail className="size-3.5" aria-hidden="true" />Email</a>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {!isLoading && !error && enquiries.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">No website enquiries have been received yet.</div>
          ) : null}
        </section>
      </div>
    </AdminShell>
  );
}

function LeadStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-4xl">{value}</p>
    </div>
  );
}
