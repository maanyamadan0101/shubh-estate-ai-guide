import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
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
      "A practical guide to buying property in Gurgaon: key residential corridors, due diligence, financing and verified listings.",
    intro:
      "Gurugram has several distinct residential corridors, each with a different mix of completed homes, new launches, connectivity and price points. Choosing the right micro-market is as important as choosing the project.",
    body: [
      "Golf Course Road remains an established premium address, while Golf Course Extension Road and the Southern Peripheral Road offer a broad mix of newer luxury and mid-premium developments. Dwarka Expressway and New Gurgaon provide another large pool of residential options for buyers comparing connectivity, possession status and value.",
      "For end users, possession certainty matters more than headline discounts. We verify the occupation certificate where applicable, the completion status of the specific tower, and the maintenance handover position before recommending a ready-to-move purchase.",
      "For investors, we compare rental demand, total cost of ownership, developer execution history and likely resale liquidity instead of relying only on a quoted per-square-foot rate.",
    ],
    highlights: [
      "Verify RERA registration and the exact tower or phase",
      "Check the sanctioned plan against the layout you were shown",
      "Confirm occupation and completion documentation for ready homes",
      "Budget for stamp duty, registration, maintenance and fit-out costs",
    ],
  },
  "golf-course-road": {
    slug: "golf-course-road",
    name: "Golf Course Road",
    localityFilter: "Golf Course Road",
    title: "Property on Golf Course Road, Gurgaon",
    description:
      "Apartments and premium residences on Golf Course Road, Gurugram, with resale, location and due-diligence guidance.",
    intro:
      "Golf Course Road is one of Gurugram's most established premium residential and commercial corridors, with mature infrastructure and a deep resale market.",
    body: [
      "The corridor is dominated by completed developments, so buyers can compare the actual apartment, society maintenance, traffic pattern and surrounding infrastructure before committing.",
      "For end users and NRI buyers, we focus on liveability, title and approval checks, maintenance quality, rental demand and realistic resale comparables rather than brochure pricing.",
    ],
    highlights: ["Established social infrastructure", "Rapid Metro access in parts of the corridor", "Deep completed-home resale market"],
  },
  "golf-course-extension-road": {
    slug: "golf-course-extension-road",
    name: "Golf Course Extension Road",
    localityFilter: "Golf Course Extension Road",
    title: "Property on Golf Course Extension Road, Gurgaon",
    description:
      "Luxury and premium homes on Golf Course Extension Road, Gurugram, with project, possession and investment guidance.",
    intro:
      "Golf Course Extension Road connects established Gurugram sectors with newer residential development towards the Southern Peripheral Road and Sohna Road catchment.",
    body: [
      "The corridor combines completed societies with newer launches and under-construction projects. Buyers should compare actual delivery history, tower density, access roads, maintenance plans and possession timelines before deciding between projects.",
      "For investors, project selection matters more than simply buying the newest launch. We compare developer execution, construction progress and likely end-user demand before recommending an entry point.",
    ],
    highlights: ["Wide choice of premium projects", "Access to SPR and Sohna Road catchments", "Mix of completed and under-construction inventory"],
  },
  "dwarka-expressway": {
    slug: "dwarka-expressway",
    name: "Dwarka Expressway",
    localityFilter: "Dwarka Expressway",
    title: "Property on Dwarka Expressway, Gurgaon",
    description:
      "Apartments and investment property along Dwarka Expressway, Gurugram, with connectivity, project and possession guidance.",
    intro:
      "Dwarka Expressway has developed into a major residential corridor linking west Gurugram with Delhi-side connectivity and a large supply of newer housing.",
    body: [
      "The corridor includes delivered, near-delivery and under-construction projects across multiple sectors. Because supply is broad, buyers should compare developer execution, access to the expressway, surrounding social infrastructure and the status of the specific phase or tower.",
      "For investors, we focus on actual construction progress, end-user demand and realistic resale competition within the same sector rather than relying only on launch-stage appreciation projections.",
    ],
    highlights: ["Delhi-side connectivity", "Large choice of newer residential projects", "Project and sector selection are especially important"],
  },
  "southern-peripheral-road": {
    slug: "southern-peripheral-road",
    name: "Southern Peripheral Road (SPR)",
    localityFilter: "Southern Peripheral Road",
    title: "Property on Southern Peripheral Road (SPR), Gurgaon",
    description:
      "Homes and investment property along SPR, Gurugram, with connectivity, project-quality and possession guidance.",
    intro:
      "The Southern Peripheral Road connects several fast-growing residential sectors in Gurugram and acts as an important link between Golf Course Extension Road, Sohna Road and NH-48-side areas.",
    body: [
      "SPR offers a mix of completed societies and newer development. Buyers should compare the approach road to the project, surrounding construction, tower density, possession status and everyday access to schools, healthcare and retail.",
      "For investors, we compare competing supply within the same sector and nearby corridors so the decision is based on likely end-user demand and resale liquidity rather than a single launch price.",
    ],
    highlights: ["Connects multiple Gurugram growth corridors", "Mix of completed and new inventory", "Strong need for project-level due diligence"],
  },
  "sohna-road": {
    slug: "sohna-road",
    name: "Sohna Road",
    localityFilter: "Sohna Road",
    title: "Property on Sohna Road, Gurgaon",
    description:
      "Apartments and homes around Sohna Road, Gurugram, with location, resale, financing and due-diligence guidance.",
    intro:
      "Sohna Road is an established Gurugram residential and commercial corridor with a broad range of completed societies, offices, schools, hospitals and retail.",
    body: [
      "The corridor offers a wide spread of apartment sizes and budgets, making project condition and society management important differentiators. We compare actual maintenance, parking, access, occupancy and resale evidence before recommending a property.",
      "For buyers considering newer projects nearby, we also compare the same budget against Golf Course Extension Road and SPR so the trade-off between maturity, configuration and future supply is clear.",
    ],
    highlights: ["Established residential catchment", "Broad range of completed inventory", "Useful benchmark against newer nearby corridors"],
  },
  "new-gurgaon": {
    slug: "new-gurgaon",
    name: "New Gurgaon",
    localityFilter: "New Gurgaon",
    title: "Property in New Gurgaon — Buying Guide & Listings",
    description:
      "Residential property in New Gurgaon with project, possession, connectivity and investment due-diligence guidance.",
    intro:
      "New Gurgaon covers a large cluster of developing sectors with substantial residential supply and a mix of ready, near-ready and under-construction projects.",
    body: [
      "Because the area contains many competing projects, buyers should compare the exact sector, access roads, occupancy, nearby commercial development, developer delivery record and the amount of future supply still to come.",
      "For end users, we prioritise liveability and possession certainty. For investors, we compare realistic rental demand and resale competition before recommending a project or unit.",
    ],
    highlights: ["Large choice across multiple sectors", "Wide range of budgets and configurations", "Developer and sector selection are critical"],
  },
};

const LOCATION_LINKS = Object.values(LOCATIONS).map(({ slug, name }) => ({ slug, name }));

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
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: "Gurgaon Property", item: `${SITE_ORIGIN}/locations/gurgaon` },
        { "@type": "ListItem", position: 3, name: location.name, item: url },
      ],
    };
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
      scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) }],
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
  const { location, properties } = Route.useLoaderData() as {
    location: Location;
    properties: ListingRow[];
  };

  return (
    <>
      <PageHero eyebrow="Location Guide" title={location.name} body={location.intro} />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          {location.body.map((paragraph: string, i: number) => (
            <p key={i} className="text-muted-foreground">{paragraph}</p>
          ))}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">What we check before recommending a purchase</h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {location.highlights.map((h: string) => (
                <li key={h}>• {h}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Explore Gurgaon property corridors</h2>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {LOCATION_LINKS.filter((item) => item.slug !== location.slug).map((item) => (
                <Link
                  key={item.slug}
                  to="/locations/$slug"
                  params={{ slug: item.slug }}
                  className="text-gold underline-offset-4 hover:underline"
                >
                  Property in {item.name}
                </Link>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Related: <Link to="/nri" className="text-gold underline-offset-4 hover:underline">NRI property buying guide</Link>{" "}
            · <Link to="/luxury" className="text-gold underline-offset-4 hover:underline">Luxury homes in Gurgaon</Link>{" "}
            · <Link to="/home-loans" className="text-gold underline-offset-4 hover:underline">Home loan assistance</Link>
          </p>
        </div>
        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Speak to an advisor</h2>
          <p className="mt-1 text-xs text-muted-foreground">Local pricing, availability and practical guidance.</p>
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
