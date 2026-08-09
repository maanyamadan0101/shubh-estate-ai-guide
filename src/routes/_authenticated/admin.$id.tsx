import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin/AdminShell";
import { EMPTY_PROPERTY, PropertyForm, type PropertyFormValues } from "@/components/admin/PropertyForm";
import { getAdminProperty, listTaxonomy } from "@/lib/admin.functions";
import { PROPERTY_TYPE_LABEL } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/$id")({
  head: () => ({
    meta: [
      { title: "Edit Property | Shubh Estate Brokers" },
      { name: "description", content: "Update and republish a property listing." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EditProperty,
});

function str(value: unknown): string {
  return value === null || value === undefined ? "" : String(value);
}

function EditProperty() {
  const { id } = Route.useParams();
  const taxonomy = useQuery({ queryKey: ["taxonomy"], queryFn: () => listTaxonomy() });
  const record = useQuery({ queryKey: ["admin-property", id], queryFn: () => getAdminProperty({ data: { id } }) });

  if (record.isLoading) {
    return (
      <AdminShell title="Edit Property" subtitle="Loading listing…">
        <p className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">Loading property details…</p>
      </AdminShell>
    );
  }

  if (!record.data) {
    return (
      <AdminShell title="Edit Property" subtitle="This listing could not be found.">
        <p className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">Property not found.</p>
      </AdminShell>
    );
  }

  const p = record.data.property as Record<string, unknown>;
  const initial: PropertyFormValues = {
    ...EMPTY_PROPERTY,
    id: String(p["id"]),
    title: str(p["title"]),
    slug: str(p["slug"]),
    listing_type: (str(p["listing_type"]) === "rent" ? "rent" : "sale") as PropertyFormValues["listing_type"],
    property_type: (str(p["property_type"]) in PROPERTY_TYPE_LABEL ? str(p["property_type"]) : "apartment") as PropertyFormValues["property_type"],
    status: str(p["status"]) as PropertyFormValues["status"],
    bhk: str(p["bhk"]),
    project_id: (p["project_id"] as string | null) ?? null,
    builder_id: (p["builder_id"] as string | null) ?? null,
    sector: str(p["sector"]),
    locality: str(p["locality"]),
    city: str(p["city"]) || "Gurugram",
    price: str(p["price"]),
    area_sqft: str(p["area_sqft"]),
    carpet_area_sqft: str(p["carpet_area_sqft"]),
    bathrooms: str(p["bathrooms"]),
    balconies: str(p["balconies"]),
    floor_number: str(p["floor_number"]),
    total_floors: str(p["total_floors"]),
    facing: str(p["facing"]),
    furnishing: str(p["furnishing"]),
    parking: str(p["parking"]),
    servant_room: Boolean(p["servant_room"]),
    study_room: Boolean(p["study_room"]),
    rera_number: str(p["rera_number"]),
    description: str(p["description"]),
    is_published: Boolean(p["is_published"]),
    is_featured: Boolean(p["is_featured"]),
    is_luxury: Boolean(p["is_luxury"]),
    meta_title: str(p["meta_title"]),
    meta_description: str(p["meta_description"]),
    og_title: str(p["og_title"]),
    og_description: str(p["og_description"]),
    canonical_url: str(p["canonical_url"]),
    amenities: record.data.amenities,
    features: record.data.features,
    images: record.data.images.map((img: { image_url: string; alt_text: string | null; is_primary: boolean }) => ({
      image_url: img.image_url,
      alt_text: img.alt_text ?? "",
      is_primary: img.is_primary,
    })),
    videos: record.data.videos ?? [],
  };

  return (
    <AdminShell title="Edit Property" subtitle={initial.title || "Update listing details and media."}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Manage Content</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Edit any section below, preview the result, then use Publish to update the live property page.
          </p>
        </div>
        <PropertyForm initial={initial} builders={taxonomy.data?.builders ?? []} projects={taxonomy.data?.projects ?? []} />
      </div>
    </AdminShell>
  );
}
