import { createFileRoute, Link } from "@tanstack/react-router";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/luxury")({
  loader: async () => {
    const { properties } = await listPublicProperties({ data: { luxury: true, limit: 12 } });
    return { properties };
  },
  head: () => ({
    meta: [
      { title: "Luxury & Private Property Collection, Gurgaon | Shubh Estate" },
      {
        name: "description",
        content:
          "A discreet collection of luxury apartments, penthouses and villas in Gurugram, including off-market residences shared privately on request.",
      },
      { property: "og:title", content: "Luxury & Private Property Collection, Gurgaon" },
      {
        property: "og:description",
        content: "Penthouses, villas and low-density residences across Gurugram's premium corridors.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/luxury` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/luxury` }],
  }),
  component: LuxuryPage,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">This page didn't load</h1>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Page not found</h1>
    </div>
  ),
});

function LuxuryPage() {
  const { properties } = Route.useLoaderData() as { properties: ListingRow[] };

  return (
    <>
      <PageHero
        eyebrow="Private Collection"
        title="Luxury residences in Gurugram"
        body="Low-density apartments, penthouses and villas across Golf Course Road, Golf Course Extension Road and Dwarka Expressway — including residences we only share privately."
      />

      <section className="container-page py-12">
        {properties.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Current luxury inventory is shared privately. Tell us your requirement and we'll send a curated shortlist.
          </p>
        )}

        <div className="mt-12 grid gap-8 rounded-xl border border-border bg-card p-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <h2 className="font-display text-2xl">Off-market residences</h2>
            <p className="mt-3 text-muted-foreground">
              A meaningful share of Gurugram's finest homes never reaches a portal. Owners of penthouses and large villas
              usually prefer discretion, so these transactions happen through direct relationships.
            </p>
            <p className="mt-3 text-muted-foreground">
              Share your budget, preferred corridor and timeline, and we'll revert with a private shortlist — including
              units that are not publicly listed.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              See also the{" "}
              <Link to="/locations/$slug" params={{ slug: "golf-course-road" }} className="text-gold underline-offset-4 hover:underline">
                Golf Course Road guide
              </Link>{" "}
              and the{" "}
              <Link to="/nri" className="text-gold underline-offset-4 hover:underline">NRI desk</Link>.
            </p>
          </div>
          <div>
            <EnquiryForm interest="Luxury / private collection enquiry" compact />
          </div>
        </div>
      </section>
    </>
  );
}
