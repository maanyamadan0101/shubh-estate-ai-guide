import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SectionHead";
import { ListingCard } from "@/components/site/ListingCard";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/properties")({
  loader: async () => listPublicProperties({ data: { limit: 60 } }),
  head: () => ({
    meta: [
      { title: "Properties in Gurgaon | Shubh Estate Brokers" },
      {
        name: "description",
        content:
          "View properties personally published by Shubh Estate Brokers across Gurugram. Each listing includes the actual property details, photos and availability entered by our team.",
      },
      { property: "og:title", content: "Published Properties | Shubh Estate Brokers" },
      {
        property: "og:description",
        content: "Current property listings published directly by Shubh Estate Brokers in Gurugram.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/properties` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/properties` }],
  }),
  component: Properties,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Properties could not be loaded</h1>
      <p className="mt-2 text-muted-foreground">Please refresh the page in a moment.</p>
    </div>
  ),
});

function Properties() {
  const { properties, error } = Route.useLoaderData() as { properties: ListingRow[]; error: string | null };

  return (
    <>
      <PageHero
        eyebrow="Current Listings"
        title="Properties published by Shubh Estate Brokers"
        body="Only properties posted and published by our team are displayed here. Open any listing for complete details, photos, videos and enquiry options."
      />

      <section className="container-page py-14">
        {error ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="font-medium">Published properties could not be loaded.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please refresh the page. The server has recorded the underlying data error for diagnosis.
            </p>
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Property Catalogue</p>
                <h2 className="mt-1 font-display text-2xl md:text-3xl">Available properties</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {properties.length} {properties.length === 1 ? "published property" : "published properties"}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <ListingCard key={property.id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <h2 className="font-display text-2xl">No published properties are visible yet</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Once a property is published from the Shubh Estate Brokers admin dashboard, it will appear here automatically.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
