import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { listPublicProperties } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

type Location = {
  slug: string;
  name: string;
  localityFilter?: string;
  title: string;
  description: string;
  intro: string;
  body: string[];
  highlights: string[];
};

const LOCATIONS: Record<string, Location> = {
  gurgaon: {
    slug: "gurgaon",
    name: "Gurgaon (Gurugram)",
    title: "Property in Gurgaon — Buying Guide & Listings",
    description:
      "A practical guide to buying property in Gurgaon: where the corridors are, what they cost, and which approvals to verify before you pay.",
    intro:
      "Gurugram is India's most institutionally owned residential market. Pricing varies sharply between corridors, so the sector you choose matters more than the brand on the gate.",
    body: [
      "Golf Course Road remains the established premium address, with completed infrastructure, mature retail and the deepest resale market. Golf Course Extension Road and the Southern Peripheral Road carry most of the new luxury supply, while Dwarka Expressway has absorbed the largest volume of fresh launches since the corridor opened.",
      "For end users, possession certainty matters more than headline discounts. We verify the occupation certificate, the completion status of the specific tower, and the maintenance handover position before recommending a ready-to-move purchase.",
      "For investors, we look at rental yield against total cost of ownership, including maintenance, parking and society charges — not just the per-square-foot rate quoted in a launch brochure.",
    ],
    highlights: [
      "Verify RERA registration for the tower, not only the project",
      "Check the sanctioned plan against the layout you were shown",
      "Confirm the occupation certificate before a ready-to-move handover",
      "Budget for stamp duty, registration and maintenance corpus",
    ],
  },
  "golf-course-road": {
    slug: "golf-course-road",
    name: "Golf Course Road",
    localityFilter: "Golf Course Road",
    title: "Property on Golf Course Road, Gurgaon",
    description:
      "Apartments and penthouses on Golf Course Road, Gurugram — the city's most established premium residential corridor.",
    intro:
      "Golf Course Road runs from Sector 42 to Sector 56 and holds Gurugram's deepest concentration of completed luxury housing, offices and organised retail.",
    body: [
      "The corridor is fully built out, which means supply is largely resale and the premium reflects certainty rather than promise. Rapid Metro connectivity, schools and hospitals are all within the same catchment.",
      "Buyers here are typically end users upgrading within Gurugram, or NRI owners holding for long-term capital preservation. Rental demand is consistent because of proximity to Cyber City and Udyog Vihar.",
    ],
    highlights: ["Completed social infrastructure", "Rapid Metro access", "Strongest resale liquidity in Gurugram"],
  },
  "golf-course-extension-road": {
    slug: "golf-course-extension-road",
    name: "Golf Course Extension Road",
    localityFilter: "Golf Course Extension Road",
    title: "Property on Golf Course Extension Road, Gurgaon",
    description:
      "New-launch and under-construction luxury homes on Golf Course Extension Road, Gurugram, with pricing and possession guidance.",
    intro:
      "Golf Course Extension Road carries much of Gurugram's current luxury pipeline, connecting Sector 56 towards Sohna Road and the Southern Peripheral Road.",
    body: [
      "The corridor combines new premium launches with improving road infrastructure. Price appreciation has tracked construction progress closely, so timing an entry against the delivery schedule matters.",
      "We advise buyers to compare the builder's last three delivered projects in Gurugram before committing to an under-construction unit here.",
    ],
    highlights: ["Deep new-launch supply", "Connects to SPR and Sohna Road", "Strong appreciation tied to delivery"],
  },
  "dwarka-expressway": {
    slug: "dwarka-expressway",
    name: "Dwarka Expressway",
    localityFilter: "Dwarka Expressway",
    title: "Property on Dwarka Expressway, Gurgaon",
    description:
      "Apartments, floors and commercial property along Dwarka Expressway, Gurugram — connectivity, pricing and possession outlook.",
    intro:
      "Dwarka Expressway links Gurugram to Delhi and the airport, and has seen the highest volume of new residential supply in the city over the last decade.",
    body: [
      "Sectors 99 to 113 hold most of the delivered and near-delivery stock. Entry pricing remains lower than the Golf Course corridors, which is why the area attracts first-time buyers and investors alike.",
      "Because supply is high, the difference between projects is largely execution quality. We shortlist on developer delivery record, tower-level RERA status and actual site progress rather than on brochure amenities.",
    ],
    highlights: ["Airport and Delhi connectivity", "Lower entry pricing", "High supply — developer selection is critical"],
  },
};

export const Route = createFileRoute("/locations/$slug")({
  loader: async ({ params }) => {
    const location = LOCATIONS[params.slug];
    if (!location) throw notFound();
    const { properties } = await listPublicProperties({
      data: { locality: location.localityFilter, limit: 12 },
    });
    return { location, properties };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Location unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { location } = loaderData;
    const url = `${SITE_ORIGIN}/locations/${params.slug}`;
    return {
      meta: [
        { title: `${location.title} | Shubh Estate Brokers` },
        { name: "description", content: location.description },
        { property: "og:title", content: location.title },
        { property: "og:description", content: location.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: LocationPage,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">This page didn't load</h1>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Location not found</h1>
      <p className="mt-2 text-muted-foreground">
        <Link to="/properties" className="text-gold underline-offset-4 hover:underline">Browse all properties</Link>
      </p>
    </div>
  ),
});

function LocationPage() {
  const { location, properties } = Route.useLoaderData();

  return (
    <>
      <PageHero eyebrow="Location Guide" title={location.name} body={location.intro} />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          {location.body.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground">{paragraph}</p>
          ))}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">What we check before recommending a purchase</h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {location.highlights.map((h) => (
                <li key={h}>• {h}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Related: <Link to="/nri" className="text-gold underline-offset-4 hover:underline">NRI buying guide</Link>{" "}
            · <Link to="/luxury" className="text-gold underline-offset-4 hover:underline">Private collection</Link>{" "}
            · <Link to="/home-loans" className="text-gold underline-offset-4 hover:underline">Home loans</Link>
          </p>
        </div>
        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Speak to an advisor</h2>
          <p className="mt-1 text-xs text-muted-foreground">Local pricing, availability and honest guidance.</p>
          <div className="mt-4">
            <EnquiryForm interest={`Location enquiry — ${location.name}`} compact />
          </div>
        </aside>
      </section>

      {properties.length ? (
        <section className="container-page pb-16">
          <h2 className="font-display text-2xl">Available in {location.name}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
