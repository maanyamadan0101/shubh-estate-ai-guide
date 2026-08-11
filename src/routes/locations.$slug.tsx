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
  sectorFilter?: string;
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
      "A practical guide to buying property in Gurgaon: key residential corridors, due diligence, financing and current listings from Shubh Estate Brokers.",
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
    highlights: [
      "Established social infrastructure",
      "Rapid Metro access in parts of the corridor",
      "Deep completed-home resale market",
    ],
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
    highlights: [
      "Wide choice of premium projects",
      "Access to SPR and Sohna Road catchments",
      "Mix of completed and under-construction inventory",
    ],
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
    highlights: [
      "Delhi-side connectivity",
      "Large choice of newer residential projects",
      "Project and sector selection are especially important",
    ],
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
    highlights: [
      "Connects multiple Gurugram growth corridors",
      "Mix of completed and new inventory",
      "Strong need for project-level due diligence",
    ],
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
    highlights: [
      "Established residential catchment",
      "Broad range of completed inventory",
      "Useful benchmark against newer nearby corridors",
    ],
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
    highlights: [
      "Large choice across multiple sectors",
      "Wide range of budgets and configurations",
      "Developer and sector selection are critical",
    ],
  },
  "sector-46-gurgaon": {
    slug: "sector-46-gurgaon",
    name: "Sector 46, Gurgaon",
    sectorFilter: "Sector 46",
    title: "Property in Sector 46 Gurgaon — Flats & Buying Guide",
    description:
      "Explore property and flats in Sector 46 Gurgaon with current availability, resale checks, pricing context, home-loan assistance and local buyer guidance.",
    intro:
      "Sector 46 is an established central Gurgaon residential area where buyers compare apartments, builder floors and plotted neighbourhood options against nearby sectors and the Sohna Road catchment.",
    body: [
      "A Sector 46 purchase should be judged at the exact property level. Building age, parking, access lane, floor, renovation condition, maintenance and documentation can create a meaningful difference between two homes carrying a similar headline price.",
      "For end users, we compare commute needs, daily-use infrastructure and the condition of the actual unit. For investors, we examine realistic rental demand, maintenance outgo and resale liquidity instead of relying on a broad sector average.",
    ],
    highlights: [
      "Compare apartment, builder-floor and plotted options separately",
      "Check parking, building condition and sanctioned construction",
      "Benchmark the exact unit against nearby central Gurgaon sectors",
    ],
  },
  "sector-49-gurgaon": {
    slug: "sector-49-gurgaon",
    name: "Sector 49, Gurgaon",
    sectorFilter: "Sector 49",
    title: "Property in Sector 49 Gurgaon — Apartments & Resale Guide",
    description:
      "Browse property in Sector 49 Gurgaon and compare apartments, resale homes, project quality, financing, documentation and current buyer opportunities.",
    intro:
      "Sector 49 sits in the Sohna Road residential catchment and offers a mix of established group-housing societies, independent homes and nearby retail and everyday infrastructure.",
    body: [
      "Buyers should separate the value of the specific society and tower from the general popularity of the sector. Occupancy, maintenance quality, lift and power-backup condition, parking, apartment orientation and renovation requirements all affect a sensible purchase price.",
      "We compare shortlisted Sector 49 homes with relevant Sohna Road and Golf Course Extension Road alternatives so end users and investors can see the trade-off between maturity, configuration, price and future supply.",
    ],
    highlights: [
      "Established residential and retail catchment",
      "Wide variation between societies and individual units",
      "Useful comparison point for Sohna Road and Golf Course Extension Road",
    ],
  },
  "sector-56-gurgaon": {
    slug: "sector-56-gurgaon",
    name: "Sector 56, Gurgaon",
    sectorFilter: "Sector 56",
    title: "Property in Sector 56 Gurgaon — Flats, Resale & Advice",
    description:
      "Explore flats and property in Sector 56 Gurgaon with resale comparisons, Rapid Metro access context, documentation checks and home-loan coordination.",
    intro:
      "Sector 56 is an established Golf Course Road-side micro-market with completed apartments, cooperative societies, builder floors and access to a mature residential catchment.",
    body: [
      "Completed inventory allows buyers to inspect the actual society, occupancy, approach, maintenance and apartment condition before committing. The project name alone is not enough: tower position, view, floor, sunlight, parking and renovation can materially change value.",
      "For a resale purchase, title flow, society records, dues, sanctioned construction and lender acceptance should be reviewed alongside price. We also compare the same budget with nearby Golf Course Road and Golf Course Extension Road options.",
    ],
    highlights: [
      "Predominantly completed residential inventory",
      "Inspect society records, maintenance and exact unit condition",
      "Compare established-location value with newer corridor options",
    ],
  },
  "sector-62-gurgaon": {
    slug: "sector-62-gurgaon",
    name: "Sector 62, Gurgaon",
    sectorFilter: "Sector 62",
    title: "Property in Sector 62 Gurgaon — Current Flats & Projects",
    description:
      "View property and flats in Sector 62 Gurgaon, including current listings, project comparisons, Golf Course Extension Road access and buyer due diligence.",
    intro:
      "Sector 62 is a Golf Course Extension Road micro-market with a mix of completed, resale and newer residential options across different configurations and price bands.",
    body: [
      "Buyers should compare the exact project and tower on construction quality, density, access, possession position, maintenance, usable layout and competing supply. A quoted sector rate can hide substantial differences between ready and under-construction inventory.",
      "For current resale units, we review the asking price against the apartment's floor, view, furnishing, condition and project alternatives. Financing and property-document requirements can be coordinated before a token amount is considered.",
    ],
    highlights: [
      "Direct comparison of current Sector 62 listings",
      "Mix of ready, resale and newer project inventory",
      "Project, tower and entry-price discipline are essential",
    ],
  },
  "sector-65-gurgaon": {
    slug: "sector-65-gurgaon",
    name: "Sector 65, Gurgaon",
    sectorFilter: "Sector 65",
    title: "Property in Sector 65 Gurgaon — Premium Flats & Guide",
    description:
      "Explore premium property and apartments in Sector 65 Gurgaon with project, resale, pricing, financing and Golf Course Extension Road buyer guidance.",
    intro:
      "Sector 65 is a premium Golf Course Extension Road micro-market with high-rise apartments, plotted communities and commercial development serving a broad end-user catchment.",
    body: [
      "Premium branding does not make every unit equally attractive. Buyers should compare tower location, density, floor, view, specifications, maintenance and the premium already included in the asking price.",
      "For an investment purchase, we examine competing supply, realistic rent, total acquisition cost and resale depth. For end users, access, construction quality and the suitability of the actual layout carry more weight than launch-stage marketing.",
    ],
    highlights: [
      "Premium Golf Course Extension Road positioning",
      "Compare completed and newer inventory on total cost",
      "Evaluate tower, view, density and realistic rental depth",
    ],
  },
  "sector-66-gurgaon": {
    slug: "sector-66-gurgaon",
    name: "Sector 66, Gurgaon",
    sectorFilter: "Sector 66",
    title: "Property in Sector 66 Gurgaon — Apartments & Buying Guide",
    description:
      "Browse property in Sector 66 Gurgaon with apartment, project, resale, price, due-diligence and home-loan guidance near Golf Course Extension Road.",
    intro:
      "Sector 66 combines established and premium residential projects with commercial development around Golf Course Extension Road and the wider SPR catchment.",
    body: [
      "The correct comparison is between the specific apartment and realistic alternatives in Sector 65, Sector 67 and the wider corridor. Floor, view, tower placement, apartment condition, maintenance and entry price can change the risk-reward materially.",
      "We help buyers separate usable property value from brochure positioning, then coordinate price discussion, document checks, lender valuation and transaction follow-up for the shortlisted unit.",
    ],
    highlights: [
      "Established premium and mid-premium project choice",
      "Compare with adjacent Golf Course Extension Road sectors",
      "Review entry price, maintenance and future competing supply",
    ],
  },
  "sector-82-gurgaon": {
    slug: "sector-82-gurgaon",
    name: "Sector 82, Gurgaon",
    sectorFilter: "Sector 82",
    title: "Property in Sector 82 Gurgaon — Flats in New Gurgaon",
    description:
      "Explore flats and property in Sector 82 Gurgaon with current listings, New Gurgaon project comparisons, possession checks and financing guidance.",
    intro:
      "Sector 82 is part of the New Gurgaon residential belt and offers a mix of completed apartments, integrated township development and access to NH-48-side employment corridors.",
    body: [
      "Buyers should inspect actual access, occupancy, society operations and the status of the specific phase rather than judging the area only by future infrastructure. Delivered inventory can be compared on maintenance, layout, parking and liveability before purchase.",
      "For investors, we compare rent, resale competition and future supply within nearby New Gurgaon sectors. For end users, daily commute and the quality of the actual unit remain the primary decision points.",
    ],
    highlights: [
      "Completed and resale inventory in New Gurgaon",
      "Compare actual occupancy and access, not only sector plans",
      "Review future supply before assuming resale appreciation",
    ],
  },
  "sector-85-gurgaon": {
    slug: "sector-85-gurgaon",
    name: "Sector 85, Gurgaon",
    sectorFilter: "Sector 85",
    title: "Property in Sector 85 Gurgaon — Flats & Project Guide",
    description:
      "Explore property and apartments in Sector 85 Gurgaon with New Gurgaon project comparisons, resale checks, current availability and buyer support.",
    intro:
      "Sector 85 is a developing New Gurgaon micro-market with multiple group-housing options and a broad choice of ready, resale and newer residential inventory nearby.",
    body: [
      "Project selection is especially important where several societies compete for the same end-user and tenant demand. Buyers should compare delivery record, occupancy, approach road, maintenance, density and the exact apartment's condition.",
      "A lower entry price is useful only when the project, documents and realistic exit also work. We compare Sector 85 opportunities with nearby sectors before recommending a visit or offer.",
    ],
    highlights: [
      "Broad choice across the New Gurgaon residential belt",
      "Compare delivery, occupancy, access and project density",
      "Stress-test price against nearby resale competition",
    ],
  },
  "sector-86-gurgaon": {
    slug: "sector-86-gurgaon",
    name: "Sector 86, Gurgaon",
    sectorFilter: "Sector 86",
    title: "Property in Sector 86 Gurgaon — Flats & Resale Guide",
    description:
      "Browse flats and property in Sector 86 Gurgaon with current resale opportunities, New Gurgaon project checks, financing and transaction guidance.",
    intro:
      "Sector 86 is a New Gurgaon residential micro-market where buyers can compare completed societies and resale apartments against newer inventory in adjoining sectors.",
    body: [
      "For completed apartments, the actual floor, view, condition, parking and society maintenance should be reflected in the offer price. Buyers should also understand the amount of competing inventory within the same project.",
      "We review current availability, documents and financing together so the buyer can compare the full acquisition cost and likely resale position before committing a token amount.",
    ],
    highlights: [
      "Current resale and completed-home opportunities",
      "Compare the exact unit against supply in the same project",
      "Coordinate valuation, financing and document review early",
    ],
  },
  "sector-102-gurgaon": {
    slug: "sector-102-gurgaon",
    name: "Sector 102, Gurgaon",
    sectorFilter: "Sector 102",
    title: "Property in Sector 102 Gurgaon — Dwarka Expressway Flats",
    description:
      "Explore property and apartments in Sector 102 Gurgaon with Dwarka Expressway project comparisons, possession, pricing and buyer due-diligence guidance.",
    intro:
      "Sector 102 is a Dwarka Expressway micro-market with several established and newer residential projects serving buyers who want west Gurgaon and Delhi-side connectivity.",
    body: [
      "Different projects and phases can have very different construction, occupancy and access positions. Buyers should confirm the status of the exact tower, approach, documents, maintenance and usable apartment layout before comparing prices.",
      "For investment decisions, we evaluate realistic tenant demand and future resale competition across the Dwarka Expressway corridor. For end users, the commute and liveability of the actual property take priority over corridor-level appreciation claims.",
    ],
    highlights: [
      "Dwarka Expressway residential project choice",
      "Verify exact tower, possession and approach-road position",
      "Compare rent and resale supply across adjoining sectors",
    ],
  },
  "sector-113-gurgaon": {
    slug: "sector-113-gurgaon",
    name: "Sector 113, Gurgaon",
    sectorFilter: "Sector 113",
    title: "Property in Sector 113 Gurgaon — Flats Near Delhi Border",
    description:
      "Browse property and apartments in Sector 113 Gurgaon with Dwarka Expressway connectivity, current listings, project checks and NRI buyer support.",
    intro:
      "Sector 113 is positioned on the Delhi-side stretch of Dwarka Expressway and attracts buyers comparing newer residential projects close to the Delhi-Gurgaon border.",
    body: [
      "A Delhi-side location premium should be tested against the project's construction stage, delivery record, access, density, specifications and the total price of the exact apartment. Buyers should avoid treating every project in the sector as interchangeable.",
      "For NRI and end-user purchases, remote walkthroughs, document coordination and lender requirements can be arranged alongside project comparison. Final legal and tax questions should be confirmed for the specific transaction.",
    ],
    highlights: [
      "Delhi-side Dwarka Expressway positioning",
      "Compare location premium with construction and delivery risk",
      "Remote shortlisting and NRI transaction coordination available",
    ],
  },
};

const LOCATION_LINKS = Object.values(LOCATIONS).map(({ slug, name }) => ({ slug, name }));

function locationFaqs(location: Location) {
  return [
    {
      q: `How should I compare property prices in ${location.name}?`,
      a: `Compare the exact unit on project, tower, floor, view, area, condition, parking, possession, maintenance and documentation. A broad sector or corridor rate is only a starting point and should not replace unit-level comparison.`,
    },
    {
      q: `Can Shubh Estate Brokers arrange property visits in ${location.name}?`,
      a: `Yes. We first narrow the requirement by budget, purpose, configuration and timeline, then confirm current availability before arranging suitable site visits or live video walkthroughs for overseas buyers.`,
    },
    {
      q: `Is home-loan assistance available for property in ${location.name}?`,
      a: `Home-loan eligibility, lender valuation, property documents and bank coordination can be supported. Final sanction and the financed percentage depend on the applicant, lender policy and property approval.`,
    },
  ];
}

export const Route = createFileRoute("/locations/$slug")({
  loader: async ({ params }) => {
    const location = LOCATIONS[params.slug];
    if (!location) throw notFound();
    const { properties } = await listPublicProperties({
      data: {
        locality: location.localityFilter,
        sector: location.sectorFilter,
        limit: 12,
      },
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Gurgaon Property",
          item: `${SITE_ORIGIN}/locations/gurgaon`,
        },
        { "@type": "ListItem", position: 3, name: location.name, item: url },
      ],
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: locationFaqs(location).map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    };
    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: location.title,
      description: location.description,
      url,
      about: {
        "@type": "Place",
        name: location.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: loaderData.properties.length,
        itemListElement: loaderData.properties.map((property, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: property.title,
          url: `${SITE_ORIGIN}/property/${property.slug}`,
        })),
      },
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
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(collectionSchema) },
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      ],
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
        <Link to="/properties" className="text-gold underline-offset-4 hover:underline">
          Browse all properties
        </Link>
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
            <p key={i} className="text-muted-foreground">
              {paragraph}
            </p>
          ))}

          <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
            <div className="flex items-start gap-3">
              <Landmark className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl">Home-loan assistance</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Home loans of up to 90% may be available for eligible buyers, subject to lender
                  approval and property/document verification.
                </p>
                <Link
                  to="/home-loans"
                  className="mt-2 inline-block text-sm font-medium text-gold underline-offset-4 hover:underline"
                >
                  Understand home-loan support
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gold/30 bg-card p-6">
            <h2 className="font-display text-xl">Own property in {location.name}?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Get pricing guidance, listing preparation and qualified buyer follow-up. Overseas
              owners can coordinate the sale remotely through our NRI seller desk.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link
                to="/sell-property-gurgaon"
                className="font-medium text-gold underline-offset-4 hover:underline"
              >
                Sell property in Gurgaon
              </Link>
              <Link
                to="/nri-sell-property-gurgaon"
                className="font-medium text-gold underline-offset-4 hover:underline"
              >
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

          <div>
            <h2 className="font-display text-2xl">Property questions about {location.name}</h2>
            <dl className="mt-5 space-y-4">
              {locationFaqs(location).map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                  <dt className="font-medium">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="text-sm text-muted-foreground">
            Related:{" "}
            <Link to="/properties" className="text-gold underline-offset-4 hover:underline">
              Flats for sale in Gurgaon
            </Link>{" "}
            ·{" "}
            <Link to="/nri" className="text-gold underline-offset-4 hover:underline">
              NRI property buying guide
            </Link>{" "}
            ·{" "}
            <Link to="/home-loans" className="text-gold underline-offset-4 hover:underline">
              Home loan assistance
            </Link>{" "}
            ·{" "}
            <a
              href="/best-areas-gurgaon-property-investment"
              className="text-gold underline-offset-4 hover:underline"
            >
              Investment-area guide
            </a>{" "}
            ·{" "}
            <Link
              to="/sell-property-gurgaon"
              className="text-gold underline-offset-4 hover:underline"
            >
              Sell property in Gurgaon
            </Link>
            {location.slug === "golf-course-extension-road" ? (
              <>
                {" · "}
                <a
                  href="/higher-floor-apartments-golf-course-extension-road"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  Higher-floor apartments
                </a>
              </>
            ) : null}
          </p>
        </div>
        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Speak to an advisor</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Local pricing, availability, financing and practical guidance.
          </p>
          <div className="mt-4">
            <EnquiryForm interest={`Location enquiry — ${location.name}`} compact />
          </div>
        </aside>
      </section>

      {properties.length ? (
        <section className="container-page pb-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                Current Inventory
              </p>
              <h2 className="mt-1 font-display text-2xl">Available in {location.name}</h2>
            </div>
            <Link
              to="/properties"
              className="text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
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
