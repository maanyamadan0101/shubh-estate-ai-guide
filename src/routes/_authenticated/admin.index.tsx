import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  FilePenLine,
  Globe2,
  ImagePlus,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  bootstrapAdmin,
  listAdminProperties,
  setPropertyState,
  type AdminPropertyRow,
} from "@/lib/admin.functions";
import { listAdminEnquiries, type PortalEnquiry } from "@/lib/admin.portal.functions";
import { formatINR, STATUS_LABEL } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Property Management Dashboard | Shubh Estate Brokers" },
      {
        name: "description",
        content: "Manage property inventory, publishing, enquiries and SEO operations for Shubh Estate Brokers.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminHome,
});

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "Apartments",
  builder_floor: "Builder floors",
  villa: "Villas",
  plot: "Plots",
  commercial: "Commercial",
  office: "Office spaces",
  retail: "Retail / Shops",
};

function AdminHome() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    void bootstrapAdmin().catch(() => undefined);
  }, []);

  const propertiesQuery = useQuery({
    queryKey: ["admin-properties"],
    queryFn: () => listAdminProperties(),
  });
  const enquiriesQuery = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: () => listAdminEnquiries(),
  });

  const properties = propertiesQuery.data ?? [];
  const enquiries = enquiriesQuery.data ?? [];
  const published = properties.filter((property) => property.is_published).length;
  const drafts = properties.length - published;
  const saleListings = properties.filter((property) => property.listing_type === "sale").length;
  const rentalListings = properties.filter((property) => property.listing_type === "rent").length;
  const newEnquiries = enquiries.filter((lead) => lead.status === "new").length;
  const openEnquiries = enquiries.filter((lead) => !["closed", "lost"].includes(lead.status)).length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return properties.filter((property) => {
      const matchesSearch =
        !q ||
        [
          property.title,
          property.sector,
          property.locality,
          property.bhk,
          property.listing_type,
          property.property_type,
          property.status,
          property.slug,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q));
      const matchesType = typeFilter === "all" || property.property_type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [properties, search, typeFilter]);

  const typeBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    for (const property of properties) {
      counts.set(property.property_type, (counts.get(property.property_type) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([type, count]) => ({
        type,
        count,
        label: PROPERTY_TYPE_LABELS[type] ?? type.replace(/_/g, " "),
      }))
      .sort((a, b) => b.count - a.count);
  }, [properties]);

  const locationBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    for (const property of properties) {
      const location = property.sector?.trim() || property.locality?.trim();
      if (location) counts.set(location, (counts.get(location) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [properties]);

  const recentProperties = filtered.slice(0, 6);
  const recentEnquiries = enquiries.slice(0, 5);

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
      title="Property Management"
      subtitle="A single workspace for inventory, enquiries and website publishing."
      actions={
        <Button asChild variant="outline" className="hidden md:inline-flex">
          <Link to="/flats-for-sale-in-gurgaon">
            <Globe2 className="size-4" aria-hidden="true" />
            View Website
          </Link>
        </Button>
      }
    >
      <div className="space-y-8">
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Property operations</Badge>
                <span className="text-xs text-muted-foreground">Shubh Estate Brokers · Gurugram</span>
              </div>
              <h2 className="mt-3 max-w-2xl font-display text-2xl sm:text-3xl">
                Manage every listing from draft to customer enquiry.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Keep property information accurate, publish verified inventory and follow up with buyers, sellers, landlords and tenants.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="gold">
                <Link to="/admin/new">
                  <Plus className="size-4" aria-hidden="true" />
                  Add Property
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admin/import">Import Listings</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Property and lead overview">
          <StatCard icon={Building2} label="Total properties" value={properties.length} helper="All records in the catalogue" loading={propertiesQuery.isLoading} />
          <StatCard icon={Globe2} label="Published listings" value={published} helper="Currently marked public" loading={propertiesQuery.isLoading} />
          <StatCard icon={FilePenLine} label="Draft / unpublished" value={drafts} helper="Not currently published" loading={propertiesQuery.isLoading} />
          <StatCard icon={Tags} label="For sale" value={saleListings} helper="Sale inventory" loading={propertiesQuery.isLoading} />
          <StatCard icon={Building2} label="For rent" value={rentalListings} helper="Rental inventory" loading={propertiesQuery.isLoading} />
          <StatCard icon={MessageSquare} label="New enquiries" value={newEnquiries} helper={`${openEnquiries} open follow-ups in latest 250 leads`} loading={enquiriesQuery.isLoading} />
        </section>

        <section>
          <SectionHeading eyebrow="Quick access" title="Manage your business" description="Open the tools you use most often." />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <ActionCard icon={Plus} title="Add New Property" description="Create a sale or rental listing with property details, photos and SEO fields." to="/admin/new" action="Create listing" />
            <ActionCard icon={Building2} title="Property Catalogue" description="Search inventory, edit details, preview pages and publish or unpublish listings." href="#property-catalogue" action="Manage inventory" />
            <ActionCard icon={Users} title="Enquiries & Leads" description="Review customer enquiries and update follow-up status." href="/admin/enquiries" action="Open lead inbox" />
            <ActionCard icon={ImagePlus} title="Photos & Videos" description="Review property images and video assets already attached to listings." href="/admin/media" action="Manage media" />
            <ActionCard icon={BarChart3} title="SEO & Google" description="Review the property publishing checklist and website SEO settings." href="/admin/seo" action="Open SEO tools" />
            <ActionCard icon={Settings} title="Website Settings" description="Manage website defaults and operational preferences." href="/admin/settings" action="Open settings" />
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <SectionHeading eyebrow="Inventory intelligence" title="Property mix" description="A live breakdown based on the current catalogue records." />
            {propertiesQuery.isLoading ? (
              <p className="mt-5 text-sm text-muted-foreground">Loading inventory breakdown…</p>
            ) : propertiesQuery.error ? (
              <p className="mt-5 text-sm text-destructive">Inventory breakdown is unavailable.</p>
            ) : typeBreakdown.length ? (
              <div className="mt-5 space-y-4">
                {typeBreakdown.map((item) => {
                  const percent = properties.length ? Math.round((item.count / properties.length) * 100) : 0;
                  return (
                    <div key={item.type}>
                      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                        <span className="capitalize">{item.label}</span>
                        <span className="tabular-nums text-muted-foreground">{item.count} <span className="text-xs">({percent}%)</span></span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyHint text="Property categories will appear here after listings are added." />
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <SectionHeading eyebrow="Location coverage" title="Top inventory locations" description="Most represented sectors and localities in your catalogue." />
            {locationBreakdown.length ? (
              <ul className="mt-5 space-y-3">
                {locationBreakdown.map(([location, count]) => (
                  <li key={location} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2 truncate">
                      <MapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
                      <span className="truncate">{location}</span>
                    </span>
                    <Badge variant="secondary">{count} listings</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyHint text="Sector and locality coverage will appear here when location details are added." />
            )}
            <div className="mt-6 rounded-xl bg-muted/60 p-4">
              <p className="text-sm font-medium">Keep location data consistent</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Use the correct sector, locality and corridor on each listing so buyers can filter inventory accurately.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div id="property-catalogue" className="scroll-mt-24 rounded-2xl border border-border bg-card">
            <div className="border-b border-border p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Inventory control</p>
                  <h2 className="mt-1 font-display text-2xl">Property Catalogue</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Search, filter and manage existing listings.</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative w-full sm:w-64">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, sector, URL…" className="pl-9" />
                  </div>
                  <select
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    aria-label="Filter by property type"
                  >
                    <option value="all">All property types</option>
                    {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {propertiesQuery.isLoading ? <p className="p-8 text-sm text-muted-foreground">Loading properties…</p> : null}
            {propertiesQuery.error ? (
              <p className="m-5 rounded-lg border border-border p-6 text-sm text-muted-foreground">
                You don't have publishing access yet. Ask an administrator to grant it.
              </p>
            ) : null}

            {!propertiesQuery.isLoading && !propertiesQuery.error && recentProperties.length ? (
              <ul className="divide-y divide-border">
                {recentProperties.map((property: AdminPropertyRow) => (
                  <li key={property.id} className="grid gap-3 p-4 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:p-5">
                    <div className="size-16 overflow-hidden rounded-xl bg-muted">
                      {property.cover_image_url ? <img src={property.cover_image_url} alt="" className="size-full object-cover" loading="lazy" /> : null}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-medium">{property.title}</p>
                        <Badge variant={property.is_published ? "default" : "secondary"} className="font-normal">
                          {property.is_published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {[property.bhk, property.sector, property.locality].filter(Boolean).join(" · ")}
                        {property.price ? ` · ${formatINR(Number(property.price))}` : ""}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {PROPERTY_TYPE_LABELS[property.property_type] ?? property.property_type} · {property.listing_type === "rent" ? "Rent" : "Sale"} · {STATUS_LABEL[property.status] ?? property.status}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <Button asChild size="sm" variant="gold">
                        <Link to="/admin/$id" params={{ id: property.id }}>
                          <FilePenLine className="size-3.5" aria-hidden="true" /> Edit
                        </Link>
                      </Button>
                      {property.is_published ? (
                        <Button asChild size="sm" variant="outline">
                          <Link to="/property/$slug" params={{ slug: property.slug }}>
                            <Eye className="size-3.5" aria-hidden="true" /> View
                          </Link>
                        </Button>
                      ) : null}
                      <Button size="sm" variant="outline" onClick={() => void toggle(property.id, property.is_published)}>
                        {property.is_published ? "Unpublish" : "Publish"}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            {!propertiesQuery.isLoading && !propertiesQuery.error && properties.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-muted-foreground">No properties yet.</p>
                <Button asChild variant="gold" className="mt-4"><Link to="/admin/new">Add your first property</Link></Button>
              </div>
            ) : null}
            {!propertiesQuery.isLoading && !propertiesQuery.error && properties.length > 0 && recentProperties.length === 0 ? (
              <p className="p-10 text-center text-sm text-muted-foreground">No listings match the selected search or property type.</p>
            ) : null}
            {!propertiesQuery.isLoading && !propertiesQuery.error && properties.length > 6 ? (
              <div className="border-t border-border p-4 text-center">
                <p className="text-xs text-muted-foreground">Showing {recentProperties.length} of {filtered.length} matching listings · {properties.length} total</p>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-start justify-between gap-3 border-b border-border p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Lead management</p>
                <h2 className="mt-1 font-display text-2xl">Latest Enquiries</h2>
                <p className="mt-1 text-sm text-muted-foreground">Recent customer interest from the website.</p>
              </div>
              <MessageSquare className="mt-1 size-5 text-gold" aria-hidden="true" />
            </div>
            {enquiriesQuery.isLoading ? <p className="p-6 text-sm text-muted-foreground">Loading enquiries…</p> : null}
            {enquiriesQuery.error ? <p className="p-6 text-sm text-muted-foreground">Lead summary is unavailable. Open the lead inbox to check access.</p> : null}
            {!enquiriesQuery.isLoading && !enquiriesQuery.error && recentEnquiries.length ? (
              <ul className="divide-y divide-border">
                {recentEnquiries.map((lead: PortalEnquiry) => (
                  <li key={lead.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{lead.full_name}</p>
                        <p className="mt-1 truncate text-xs text-muted-foreground">{lead.interest || lead.property?.title || "Property enquiry"}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <Badge variant={lead.status === "new" ? "default" : "secondary"}>{lead.status.replace(/_/g, " ")}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
            {!enquiriesQuery.isLoading && !enquiriesQuery.error && enquiries.length === 0 ? (
              <EmptyHint text="New customer enquiries will appear here." />
            ) : null}
            <div className="border-t border-border p-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/enquiries">Open Lead Inbox <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-gold"><CheckCircle2 className="size-5" aria-hidden="true" /><Sparkles className="size-5" aria-hidden="true" /></div>
            <h2 className="mt-3 font-display text-xl">SEO & Search Discovery</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Review the publishing checklist, property page metadata and current public sitemap. Sitemap inclusion supports discovery but does not guarantee indexing or ranking.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm"><Link to="/admin/seo">SEO Checklist</Link></Button>
              <Button asChild variant="outline" size="sm"><a href="/sitemap.xml" target="_blank" rel="noreferrer">Open XML Sitemap <ArrowUpRight className="size-3.5" aria-hidden="true" /></a></Button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-gold"><Clock3 className="size-5" aria-hidden="true" /><MapPin className="size-5" aria-hidden="true" /></div>
            <h2 className="mt-3 font-display text-xl">Publishing discipline</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Confirm actual availability, price, area, image permission and property details before publishing. Preserve existing URLs when editing a live listing.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4"><Link to="/admin/seo">View Publishing Checklist <ArrowUpRight className="size-3.5" aria-hidden="true" /></Link></Button>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  loading = false,
}: {
  icon: typeof Building2;
  label: string;
  value: number;
  helper: string;
  loading?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <Icon className="size-4 text-gold" aria-hidden="true" />
      </div>
      <p className="mt-3 font-display text-3xl tabular-nums">{loading ? "—" : value.toLocaleString("en-IN")}</p>
      <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
      <h2 className="mt-1 font-display text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return <p className="p-5 text-sm text-muted-foreground">{text}</p>;
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
      <h3 className="mt-4 font-display text-lg">{title}</h3>
      <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{description}</p>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-gold">{action} →</p>
    </div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  return <a href={href}>{content}</a>;
}
