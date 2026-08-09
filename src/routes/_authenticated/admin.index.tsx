import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Building2, Eye, FilePenLine, Globe2, ImagePlus, Plus, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bootstrapAdmin, listAdminProperties, setPropertyState, type AdminPropertyRow } from "@/lib/admin.functions";
import { formatINR, STATUS_LABEL } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Business Dashboard | Shubh Estate Brokers" },
      { name: "description", content: "Manage, edit and publish Shubh Estate Brokers property listings." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  useEffect(() => {
    void bootstrapAdmin().catch(() => undefined);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: () => listAdminProperties(),
  });

  const properties = data ?? [];
  const published = properties.filter((p) => p.is_published).length;
  const drafts = properties.length - published;
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter((p) =>
      [p.title, p.sector, p.locality, p.bhk, p.listing_type, p.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [properties, search]);

  async function toggle(id: string, isPublished: boolean) {
    try {
      await setPropertyState({ data: { id, is_published: !isPublished } });
      toast.success(isPublished ? "Property unpublished" : "Property published");
      void queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
    } catch {
      toast.error("Could not update this property.");
    }
  }

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Manage your website and property catalogue from one place."
      actions={
        <Button asChild variant="outline" className="hidden md:inline-flex">
          <Link to="/properties">
            <Globe2 className="size-4" aria-hidden="true" />
            View Website
          </Link>
        </Button>
      }
    >
      <div className="space-y-8">
        <section className="grid gap-4 sm:grid-cols-3" aria-label="Listing overview">
          <StatCard label="Total properties" value={properties.length} helper="All listings" />
          <StatCard label="Published" value={published} helper="Visible on website" />
          <StatCard label="Drafts" value={drafts} helper="Not yet public" />
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Manage Content</p>
              <h2 className="mt-1 font-display text-2xl">What would you like to update?</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ActionCard
              icon={Plus}
              title="Add Property"
              description="Create a new sale or rental listing."
              to="/admin/new"
              action="Start"
            />
            <ActionCard
              icon={Building2}
              title="Property Catalogue"
              description="Edit, publish or unpublish existing listings."
              href="#property-catalogue"
              action="Manage"
            />
            <ActionCard
              icon={ImagePlus}
              title="Photos & Videos"
              description="Upload media while adding or editing a property."
              href="#property-catalogue"
              action="Choose listing"
            />
            <ActionCard
              icon={Sparkles}
              title="SEO & Website"
              description="Edit listing content, preview it and publish updates."
              href="#property-catalogue"
              action="Edit listing"
            />
          </div>
        </section>

        <section id="property-catalogue" className="scroll-mt-24 rounded-2xl border border-border bg-card">
          <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Manage Content</p>
              <h2 className="mt-1 font-display text-2xl">Property Catalogue</h2>
              <p className="mt-1 text-sm text-muted-foreground">Open any listing to edit details, photos, videos and description.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search properties" className="pl-9" />
            </div>
          </div>

          {isLoading ? <p className="p-8 text-sm text-muted-foreground">Loading properties…</p> : null}
          {error ? (
            <p className="m-5 rounded-lg border border-border p-6 text-sm text-muted-foreground">
              You don't have publishing access yet. Ask an administrator to grant it.
            </p>
          ) : null}

          {!isLoading && !error && filtered.length ? (
            <ul className="divide-y divide-border">
              {filtered.map((p: AdminPropertyRow) => (
                <li key={p.id} className="grid gap-4 p-4 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:p-5">
                  <div className="size-[72px] overflow-hidden rounded-xl bg-muted">
                    {p.cover_image_url ? <img src={p.cover_image_url} alt="" className="size-full object-cover" loading="lazy" /> : null}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-display text-lg">{p.title}</p>
                      <Badge variant={p.is_published ? "default" : "secondary"} className="font-normal">
                        {p.is_published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[p.bhk, p.sector, p.locality].filter(Boolean).join(" · ")} {p.price ? ` · ${formatINR(Number(p.price))}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{STATUS_LABEL[p.status] ?? p.status}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <Button asChild size="sm" variant="gold">
                      <Link to="/admin/$id" params={{ id: p.id }}>
                        <FilePenLine className="size-3.5" aria-hidden="true" />
                        Edit
                      </Link>
                    </Button>
                    {p.is_published ? (
                      <Button asChild size="sm" variant="outline">
                        <Link to="/property/$slug" params={{ slug: p.slug }}>
                          <Eye className="size-3.5" aria-hidden="true" />
                          View
                        </Link>
                      </Button>
                    ) : null}
                    <Button size="sm" variant="outline" onClick={() => void toggle(p.id, p.is_published)}>
                      {p.is_published ? "Unpublish" : "Publish"}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {!isLoading && !error && properties.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-muted-foreground">No properties yet.</p>
              <Button asChild variant="gold" className="mt-4">
                <Link to="/admin/new">Add your first property</Link>
              </Button>
            </div>
          ) : null}

          {!isLoading && !error && properties.length > 0 && filtered.length === 0 ? (
            <p className="p-10 text-center text-sm text-muted-foreground">No listings match “{search}”.</p>
          ) : null}
        </section>
      </div>
    </AdminShell>
  );
}

function StatCard({ label, value, helper }: { label: string; value: number; helper: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-4xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description,
  action,
  to,
  href,
}: {
  icon: typeof Plus;
  title: string;
  description: string;
  action: string;
  to?: "/admin/new";
  href?: string;
}) {
  const content = (
    <div className="group h-full rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-sm">
      <div className="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-xl">{title}</h3>
      <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{description}</p>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-gold">{action} →</p>
    </div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  return <a href={href}>{content}</a>;
}
