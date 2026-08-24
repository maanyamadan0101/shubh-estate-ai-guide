import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Landmark } from "lucide-react";
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
    title: "Gurgaon Residential Property Market & Buying Guide",
    description:
      "A practical Gurgaon residential-market guide covering corridors, due diligence, financing and buyer decision checks from Shubh Estate Brokers.",
    intro:
      "Gurugram has several distinct residential corridors, each with a different mix of completed homes, new launches, connectivity and price points. Choosing the right micro-market is as important as choosing the project.",
    body: [
      "Golf Course Road remains an established premium address, while Golf Course Extension Road and the Southern Peripheral Road offer a broad mix of newer premium and mid-premium developments. Dwarka Expressway and New Gurugram provide another large pool of residential options for buyers comparing connectivity, possession status and value.",
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
    title: "Apartments for Sale on Golf Course Road, Gurgaon",
    description:
      "Browse apartments and premium flats for sale on Golf Course Road, Gurugram, with resale, location, financing and title due-diligence guidance from Shubh Estate Brokers.",
    intro:
      "For buyers searching apartments for sale on Golf Course Road, Gurgaon, this established premium corridor offers a deep completed-home resale market where the actual unit, society, price and documentation can be evaluated before purchase.",
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
    title: "Apartments for Sale on Golf Course Extension Road, Gurgaon",
    description:
      "Browse apartments and flats for sale on Golf Course Extension Road, Gurugram, with project, possession, NRI, financing and due-diligence guidance from Shubh Estate Brokers.",
    intro:
      "Buyers searching apartments for sale on Golf Course Extension Road can compare completed societies, resale flats, newer launches and under-construction projects across one of Gurugram's major premium residential corridors.",
    body: [
      "The corridor combines completed societies with newer launches and under-construction projects. Buyers should compare actual delivery history, tower density, access roads, maintenance plans and possession timelines before deciding between projects.",
      "For investors, project selection matters more than simply buying the newest launch. We compare developer execution, construction progress and likely end-user demand before recommending an entry point.",
      "For NRI and end-user buyers, financing can be coordinated alongside legal and project due diligence. Home loans of up to 90% may be available subject to buyer eligibility, lender approval and property/document verification.",
    ],
    highlights: ["Wide choice of premium projects", "Access to SPR and Sohna Road catchments", "Mix of completed and under-construction inventory"],
  },
  "dwarka-expressway": {
    slug: "dwarka-expressway",
    name: "Dwarka Expressway",
    localityFilter: "Dwarka Expressway",
    title: "Property on Dwarka Expressway, Gurgaon | Current Listings",
    description:
      "Browse current apartments on Dwarka Expressway, Gurugram, with connectivity, project, NRI, possession and home-loan guidance from Shubh Estate Brokers.",
    intro:
      "Dwarka Expressway has developed into a major residential corridor linking west Gurugram with Delhi-side connectivity and a large supply of newer housing.",
    body: [
      "The corridor includes delivered, near-delivery and under-construction projects across multiple sectors. Because supply is broad, buyers should compare developer execution, access to the expressway, surrounding social infrastructure and the status of the specific phase or tower.",
      "For investors, we focus on actual construction progress, end-user demand and realistic resale competition within the same sector rather than relying only on launch-stage appreciation projections.",
      "For NRI and end-user buyers, we can coordinate financing and documentation review together. Home loans of up to 90% may be available subject to buyer eligibility, lender approval and property/document verification.",
    ],
    highlights: ["Delhi-side connectivity", "Large choice of newer residential projects", "Project and sector selection are especially important"],
  },
  "southern-peripheral-road": {
    slug: "southern-peripheral-road",
    name: "Southern Peripheral Road (SPR)",
    localityFilter: "Southern Peripheral Road",
    title: "Property on Southern Peripheral Road (SPR), Gurgaon",
    description:
      "Homes and investment property along SPR, Gurugram, with connectivity, project-quality, financing and possession guidance.",
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
    name: "New Gurugram",
    localityFilter: "New Gurugram",
    title: "Property in New Gurugram — Buying Guide & Current Listings",
    description:
      "Residential property in New Gurugram with current listings, project, possession, connectivity, financing and investment due-diligence guidance.",
    intro:
      "New Gurugram covers a large cluster of developing sectors with substantial residential supply and a mix of ready, near-ready and under-construction projects.",
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
    const { properties } =
      location.slug === "gurgaon"
        ? { properties: [] as ListingRow[] }
        : await listPublicProperties({
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
        <Link to="/flats-for-sale-in-gurgaon" className="text-gold underline-offset-4 hover:underline">Browse all properties</Link>
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
      <PageHero eyebrow="Location Guide" title={location.title} body={location.intro} />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          {location.body.map((paragraph: string, i: number) => (
            <p key={i} className="text-muted-foreground">{paragraph}</p>
          ))}

          <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
            <div className="flex items-start gap-3">
              <Landmark className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl">Home-loan assistance</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Home loans of up to 90% may be available for eligible buyers, subject to lender approval and property/document verification.
                </p>
                <Link to="/home-loans" className="mt-2 inline-block text-sm font-medium text-gold underline-offset-4 hover:underline">
                  Understand home-loan support
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gold/30 bg-card p-6">
            <h2 className="font-display text-xl">Own property in {location.name}?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Get pricing guidance, listing preparation and qualified buyer follow-up. Overseas owners can coordinate the sale remotely through our NRI seller desk.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link to="/sell-property-gurgaon" className="font-medium text-gold underline-offset-4 hover:underline">
                Sell property in Gurgaon
              </Link>
              <Link to="/nri-sell-property-gurgaon" className="font-medium text-gold underline-offset-4 hover:underline">
                NRI owner selling support
              </Link>
            </div>
          </div>

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
            Related: <Link to="/flats-for-sale-in-gurgaon" className="text-gold underline-offset-4 hover:underline">Flats for sale in Gurgaon</Link>{" "}
            · <Link to="/nri" className="text-gold underline-offset-4 hover:underline">NRI property buying guide</Link>{" "}
            · <Link to="/home-loans" className="text-gold underline-offset-4 hover:underline">Home loan assistance</Link>{" "}
            · <a href="/best-areas-gurgaon-property-investment" className="text-gold underline-offset-4 hover:underline">Investment-area guide</a>{" "}
            · <Link to="/sell-property-gurgaon" className="text-gold underline-offset-4 hover:underline">Sell property in Gurgaon</Link>
            {location.slug === "golf-course-extension-road" ? <>{" · "}<a href="/higher-floor-apartments-golf-course-extension-road" className="text-gold underline-offset-4 hover:underline">Higher-floor apartments</a></> : null}
          </p>
        </div>
        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Speak to an advisor</h2>
          <p className="mt-1 text-xs text-muted-foreground">Local pricing, availability, financing and practical guidance.</p>
          <div className="mt-4">
            <EnquiryForm interest={`Location enquiry — ${location.name}`} compact />
          </div>
        </aside>
      </section>

      {properties.length ? (
        <section className="container-page pb-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Current Inventory</p>
              <h2 className="mt-1 font-display text-2xl">Available in {location.name}</h2>
            </div>
            <Link to="/flats-for-sale-in-gurgaon" className="text-sm font-medium text-gold underline-offset-4 hover:underline">
              View all properties
            </Link>
          </div>
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
