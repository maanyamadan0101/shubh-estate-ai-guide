import { createFileRoute, Link } from "@tanstack/react-router";
import { Landmark, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { ListingCard } from "@/components/site/ListingCard";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const CORRIDORS = [
  { slug: "dwarka-expressway", label: "Dwarka Expressway" },
  { slug: "golf-course-extension-road", label: "Golf Course Extension Road" },
  { slug: "southern-peripheral-road", label: "Southern Peripheral Road" },
  { slug: "sohna-road", label: "Sohna Road" },
  { slug: "new-gurgaon", label: "New Gurugram" },
  { slug: "golf-course-road", label: "Golf Course Road" },
];

export const Route = createFileRoute("/properties")({
  loader: async () => listPublicProperties({ data: { limit: 60 } }),
  head: () => ({
    meta: [
      { title: "Properties for Sale in Gurgaon | Shubh Estate Brokers" },
      {
        name: "description",
        content:
          "Browse current properties for sale in Gurgaon published by Shubh Estate Brokers across Dwarka Expressway, Golf Course Extension Road, New Gurugram, SPR and Sohna Road. Property details, representative or actual images where available, NRI assistance and home-loan support up to 90% subject to eligibility.",
      },
      { property: "og:title", content: "Properties for Sale in Gurgaon | Shubh Estate Brokers" },
      {
        property: "og:description",
        content: "Current Gurugram property listings with buyer guidance, NRI support and home-loan assistance.",
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
        title="Properties for sale in Gurgaon"
        body="Browse genuine inventory published by Shubh Estate Brokers. Each listing is presented with unit details, project information, enquiry options and buyer support for end-users and NRI clients."
      />

      <section className="container-page pt-10">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Browse by corridor</p>
                <h2 className="mt-1 font-display text-2xl">Explore Gurugram micro-markets</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {CORRIDORS.map((corridor) => (
                    <Link
                      key={corridor.slug}
                      to="/locations/$slug"
                      params={{ slug: corridor.slug }}
                      className="rounded-full border border-border bg-background px-3 py-2 text-xs font-medium transition-colors hover:border-gold hover:text-gold"
                    >
                      {corridor.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
            <div className="flex items-start gap-3">
              <Landmark className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Financing Support</p>
                <h2 className="mt-1 font-display text-2xl">Home loan up to 90%*</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  We can coordinate home-loan assistance for eligible buyers. Final sanction depends on buyer eligibility, lender approval and property/document verification.
                </p>
                <Link to="/home-loans" className="mt-3 inline-block text-sm font-medium text-gold underline-offset-4 hover:underline">
                  View home-loan assistance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  No portal-style search clutter—only properties currently published by our team. Open a listing for complete specifications, project context, NRI assistance and enquiry options.
                </p>
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
