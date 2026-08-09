import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PropertyView, type PropertyRecord } from "@/components/site/PropertyView";
import { getAdminProperty } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/preview/$id")({
  head: () => ({
    meta: [
      { title: "Property Preview | Shubh Estate Brokers" },
      { name: "description", content: "Private preview of a property listing before publishing." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Property Preview" },
      { property: "og:description", content: "Private preview of a property listing before publishing." },
    ],
  }),
  component: PreviewProperty,
});

function PreviewProperty() {
  const { id } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-property", id],
    queryFn: () => getAdminProperty({ data: { id } }),
  });

  if (isLoading) return <p className="container-page py-16 text-sm text-muted-foreground">Loading preview…</p>;
  if (!data) return <p className="container-page py-16 text-sm text-muted-foreground">Property not found.</p>;

  return (
    <>
      <div className="container-page pt-6">
        <Link to="/admin/$id" params={{ id }} className="text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">← Back to editing</Link>
      </div>
      <PropertyView
        isPreview
        data={{
          property: data.property as unknown as PropertyRecord,
          images: data.images,
          amenities: data.amenities,
          features: data.features,
          videos: data.videos ?? [],
        }}
      />
    </>
  );
}
