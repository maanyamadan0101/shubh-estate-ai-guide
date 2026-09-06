import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { ListingCard } from "@/components/site/ListingCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/locations/golf-course-extension-road`;
const title = "Residential Projects on Golf Course Extension Road, Gurugram";
const description =
  "Compare residential projects on Golf Course Extension Road, Gurugram: ready homes, 3 & 4 BHK options, developer-listed amenities and resale enquiries.";
const EMERALD_ESTATE_PROJECT = "/projects/emaar-emerald-estate-sector-65-gurgaon";
const EMERALD_ESTATE_LISTING = "/3-bhk-for-sale-emaar-emerald-estate-sector-65-gurgaon-1395-sqft";

export const Route = createFileRoute("/locations/golf-course-extension-road")({
  loader: async () => {
    const { properties } = await listPublicProperties({
      data: { locality: "Golf Course Extension Road", limit: 12 },
    });
    return { properties };
  },
  head: () => ({
    meta: [
      { title: `${title} | Shubh Estate Brokers` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: comparisonProjects.length,
            itemListElement: comparisonProjects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.name,
              url: `${SITE_ORIGIN}${project.href}`,
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
            {
              "@type": "ListItem",
              position: 2,
              name: "Property in Gurgaon",
              item: `${SITE_ORIGIN}/locations/gurgaon`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Golf Course Extension Road",
              item: canonical,
            },
          ],
        }),
      },
    ],
  }),
  component: GolfCourseExtensionPage,
});

const clusters = [
  {
    sector: "Sector 65",
    href: "/flats-for-sale-in-gurgaon?q=Sector%2065",
    projects: [
      {
        name: "Emaar Emerald Estate",
        href: EMERALD_ESTATE_PROJECT,
      },
      {
        name: "Emaar Emerald Hills",
        href: "/emaar-emerald-hills-sector-65-gurgaon",
      },
    ],
  },
  {
    sector: "Sector 63",
    href: "/flats-for-sale-in-gurgaon?q=Sector%2063",
    projects: [
      {
        name: "DLF The Arbour",
        href: "/projects/dlf-the-arbour-sector-63-gurgaon",
      },
    ],
  },
  {
    sector: "Sector 62",
    href: "/property-sector-62-gurgaon",
    projects: [
      { name: "Conscient Heritage One", href: "/projects/conscient-heritage-one-sector-62" },
      { name: "Emaar Urban Oasis", href: "/projects/emaar-urban-oasis-sector-62" },
    ],
  },
  {
    sector: "Sector 60",
    href: "/property-sector-60-gurgaon",
    projects: [{ name: "Ireo Skyon", href: "/projects/ireo-skyon-sector-60" }],
  },
  {
    sector: "Sector 59",
    href: "/property-sector-59-gurgaon",
    projects: [
      { name: "Tata Raisina Residency", href: "/projects/tata-raisina-residency-sector-59" },
    ],
  },
];

function GolfCourseExtensionPage() {
  const { properties } = Route.useLoaderData() as { properties: ListingRow[] };

  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-page py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link
              to="/locations/$slug"
              params={{ slug: "gurgaon" }}
              className="hover:text-foreground"
            >
              Gurgaon
            </Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Golf Course Extension Road</span>
          </nav>
          <div className="mt-6 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Gurgaon residential project comparison
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Residential Projects on Golf Course Extension Road, Gurugram
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
              Explore established communities and newer residential projects in the Golf Course
              Extension Road belt of Gurugram. Compare the sector, apartment layout, stage of
              development and amenities before choosing a home. Golf Course Extn Road searches often
              include adjoining sectors: a corridor address does not always mean direct frontage on
              the main road.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold">
                <a href="#sector-clusters">Explore Sectors & Projects</a>
              </Button>
              <Button asChild variant="goldOutline">
                <a href="#current-inventory">View Current Inventory</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ProjectComparison />

      <section id="sector-clusters" className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Choose your neighbourhood
          </p>
          <h2 className="mt-2 font-display text-3xl">
            Explore Golf Course Extension Road by sector
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Sector accuracy matters. Emaar Emerald Estate and Emaar Emerald Hills are associated
            with Sector 65, while DLF The Arbour is in Sector 63. Conscient Heritage One and Emaar
            Urban Oasis are in Sector 62, Ireo Skyon is in Sector 60 and Tata Raisina Residency is
            in Sector 59. Keeping these relationships correct helps buyers compare the right
            micro-market, then move from the project page to current available units.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {clusters.map((cluster) => (
            <article key={cluster.sector} className="rounded-xl border border-border bg-card p-6">
              <MapPin className="size-5 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl">{cluster.sector} Gurgaon</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Open the sector guide first, then compare project pages and individual property
                inventory.
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <a
                  href={cluster.href}
                  className="font-medium text-gold underline-offset-4 hover:underline"
                >
                  Explore {cluster.sector}
                </a>
                <div className="mt-4 grid gap-2 text-sm">
                  {cluster.projects.map((project) => (
                    <a
                      key={project.href}
                      href={project.href}
                      className="flex items-center gap-2 text-muted-foreground hover:text-gold"
                    >
                      <Building2 className="size-4 text-gold" aria-hidden="true" />
                      {project.name}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-gold/20 bg-card">
        <div className="container-page py-10 md:py-12">
          <div className="grid gap-6 rounded-2xl border border-gold/30 bg-muted/20 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Current Sector 65 opportunity
              </p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl">
                Emaar Emerald Estate 3 BHK + 1 · 1,395 sq ft · Higher floor
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                Published asking price reviewed 6 September 2026: ₹2.30 crore for an unused
                East-facing apartment. Please enquire for current availability. The dedicated
                listing page includes actual apartment photographs, project context and site-visit
                enquiry.
              </p>
            </div>
            <a
              href={EMERALD_ESTATE_LISTING}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-gold px-5 py-2 text-sm font-medium text-gold-foreground transition hover:bg-gold/90"
            >
              View Emerald Estate apartment
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_22rem]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Buyer framework
            </p>
            <h2 className="mt-2 font-display text-3xl">
              Compare corridor, sector, project and exact unit together
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Sector context",
                  "Check access roads, everyday services, traffic pattern and nearby development for the exact sector.",
                ],
                [
                  "Project quality",
                  "Compare delivery history, occupancy, maintenance, density, amenities and competing inventory.",
                ],
                [
                  "Exact apartment",
                  "Floor, facing, view, area, condition, parking and asking price can change value materially.",
                ],
                [
                  "Transaction safety",
                  "Review ownership documents, dues, transfer terms and lender valuation before committing funds.",
                ],
              ].map(([heading, text]) => (
                <div key={heading} className="rounded-xl border border-border bg-card p-5">
                  <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-xl">{heading}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Need a shortlist?
            </p>
            <p className="mt-2 font-display text-2xl">Compare Golf Course Extension options</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Share budget, preferred sector, configuration and whether the purchase is for end use
              or investment.
            </p>
            <div className="mt-5">
              <EnquiryForm interest="Golf Course Extension Road property shortlist" compact />
            </div>
          </aside>
        </div>
      </section>

      <BuyerQuestions />

      <section id="current-inventory" className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Current inventory
            </p>
            <h2 className="mt-1 font-display text-3xl">
              Published properties in the corridor and adjoining sectors
            </h2>
          </div>
          <Link
            to="/flats-for-sale-in-gurgaon"
            className="text-sm font-medium text-gold underline-offset-4 hover:underline"
          >
            View all properties
          </Link>
        </div>
        {properties.length ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Current corridor inventory is being refreshed. Project and sector guides remain
            available for research and enquiry.
          </div>
        )}
      </section>
    </>
  );
}

// Project facts are deliberately narrower than broker brochure claims.
// Sources checked 2026-09-06; project status is separate from unit availability.
const comparisonProjects = [
  {
    name: "Emaar Emerald Estate",
    href: EMERALD_ESTATE_PROJECT,
    developer: "Emaar",
    sector: "65",
    location: "Sector-road and Golf Course Extension Road access stated by Emaar",
    configuration: "3 BHK resale listing linked below; check the exact layout",
    status: "Established community / resale",
    amenities:
      "Spanish-inspired architecture; over 50% landscaped greens. Pool and clubhouse scope to be confirmed for the selected phase.",
    source: "https://in.emaar.com/en/our-communities/emerald-estate-gurugram/",
  },
  {
    name: "Emaar Urban Oasis",
    href: "/projects/emaar-urban-oasis-sector-62",
    developer: "Emaar India",
    sector: "62 (RERA site record includes 62 & 65)",
    location: "Golf Course Extension Road belt; confirm phase and entrance",
    configuration: "3 & 4 BHK",
    status: "Under construction; developer page says sold out, enquire about resale",
    amenities:
      "Developer-listed pool, gym, yoga zone, indoor games, children's play area and amphitheatre; planned facilities, not a claim of operation.",
    source: "https://in.emaar.com/en/properties/urban-oasis/",
  },
  {
    name: "DLF The Arbour",
    href: "/projects/dlf-the-arbour-sector-63-gurgaon",
    developer: "DLF Home Developers Limited",
    sector: "63",
    location: "Sector 63 in the corridor belt; verify the approach to the selected tower",
    configuration: "4-bedroom residences",
    status: "Under construction (DLF compliance update: 10 July 2026)",
    amenities:
      "Compare the approved plans and contractual specifications in DLF's compliance documents; no operational amenity claim here.",
    source: "https://www.dlf.in/homes/luxury/thearbour/compliance",
  },
  {
    name: "Tata Raisina Residency",
    href: "/projects/tata-raisina-residency-sector-59",
    developer: "Tata Housing (joint development)",
    sector: "59",
    location:
      "Adjoining Sector 59, towards the Aravalli foothills; not labelled main-road frontage",
    configuration:
      "Compare apartment resale layouts separately from the developer's duplex offering",
    status: "Completed; phased occupation certificates disclosed by Tata",
    amenities:
      "Swimming pools, gym, squash courts, steam and sauna; landscaped setting. Confirm the facilities included with your unit.",
    source: "https://www.tatahousing.com/residential-property-in-gurgaon/tata-raisina-residency",
  },
  {
    name: "Conscient Heritage One",
    href: "/projects/conscient-heritage-one-sector-62",
    developer: "Conscient",
    sector: "62",
    location: "Sector 62 in the corridor belt; check the sector-road approach",
    configuration: "3 & 4 BHK",
    status: "Delivered / ready to move (Conscient portfolio)",
    amenities:
      "Clubhouse, pool, gym, indoor badminton and squash, multipurpose playground, jogging trail, greens and three-tier security.",
    source: "https://conscient.in/heritage-one/",
  },
  {
    name: "M3M Merlin",
    href: "/projects/m3m-merlin-sector-67",
    developer: "M3M India",
    sector: "67",
    location: "Adjoining-sector option: M3M lists Golf Course Road Extn. as 3.9 km away",
    configuration: "3 & 4 BHK and penthouses",
    status: "Ready-to-move project; verify the offered unit",
    amenities:
      "Developer page describes a fitness centre and game zone. Confirm pool and clubhouse access separately; do not confuse Merlin with M3M Opus.",
    source: "https://m3mindia.com/residential/m3m-merlin",
  },
];

function ProjectComparison() {
  return (
    <section className="container-page py-12" aria-labelledby="project-comparison">
      <h2 id="project-comparison" className="font-display text-3xl">
        Compare residential projects, layouts and amenities
      </h2>
      <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
        Project sources reviewed on 6 September 2026. These are selected communities, not an
        exhaustive inventory. Golf Course Road is a separate corridor. The location notes
        distinguish sector access from verified main-road frontage.
      </p>
      <div
        className="mt-6 overflow-x-auto rounded-xl border border-border"
        role="region"
        aria-label="Residential project comparison; scroll horizontally on small screens"
        tabIndex={0}
      >
        <table className="w-full min-w-[880px] text-left text-sm">
          <caption className="sr-only">
            Six projects in the Golf Course Extension Road belt and adjoining sectors
          </caption>
          <thead className="bg-muted">
            <tr>
              {[
                "Project / developer",
                "Sector / access",
                "Configuration / status",
                "Developer-listed features",
              ].map((label) => (
                <th key={label} scope="col" className="p-4">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonProjects.map((project) => (
              <tr key={project.href} className="border-t border-border align-top">
                <th scope="row" className="p-4 font-normal">
                  <a
                    href={project.href}
                    className="font-semibold text-gold underline underline-offset-4"
                  >
                    {project.name}
                  </a>
                  <p className="mt-2">{project.developer}</p>
                </th>
                <td className="p-4">
                  <p className="font-medium">Sector {project.sector}</p>
                  <p className="mt-2 text-muted-foreground">{project.location}</p>
                </td>
                <td className="p-4">
                  <p>{project.configuration}</p>
                  <p className="mt-2 text-muted-foreground">{project.status}</p>
                </td>
                <td className="p-4">
                  <p>{project.amenities}</p>
                  <a
                    href={project.source}
                    className="mt-3 inline-block text-gold underline underline-offset-4"
                  >
                    Developer source for {project.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        For every shortlist, compare allocated parking, visitor parking, power-backup capacity and
        charges, security arrangements, maintenance fees and actual amenity access. A feature not
        confirmed here is not necessarily absent.
      </p>
    </section>
  );
}

const buyerQuestions = [
  [
    "Which residential projects are on Golf Course Extension Road?",
    "The wider residential belt includes Emaar Emerald Estate, Emaar Urban Oasis, DLF The Arbour and Conscient Heritage One. Tata Raisina Residency in Sector 59 and M3M Merlin in Sector 67 are included as adjoining-sector alternatives. Compare the entrance and approach road rather than assuming every project fronts the corridor.",
  ],
  [
    "Which projects offer ready-to-move apartments?",
    "Conscient lists Heritage One as delivered and ready to move. Tata discloses phased occupation certificates for Raisina Residency, while M3M describes Merlin as ready to move. Emerald Estate has an established community and a linked resale listing. Confirm possession, occupation documentation and availability for the exact apartment.",
  ],
  [
    "Which projects have a verified swimming pool and clubhouse?",
    "Conscient explicitly lists both a clubhouse and swimming pool at Heritage One. Emaar lists a pool at Urban Oasis and Tata lists pools at Raisina Residency. A pool listing alone does not verify clubhouse access or operating hours. For under-construction homes, compare promised facilities and delivery phases with the sale documents.",
  ],
  [
    "What 3 BHK and 4 BHK options can I compare?",
    "Urban Oasis, Heritage One and Merlin have developer-listed 3 and 4 BHK configurations. The Arbour is a four-bedroom option. The linked Emerald Estate listing is a 3 BHK + 1 of 1,395 sq ft. Match carpet area, utility space, balcony area and the actual floor plan before comparing prices per square foot.",
  ],
  [
    "How do location, layout and amenities change the shortlist?",
    "Compare your regular route to work and school from the project gate, then inspect daylight, usable room dimensions, lift access, tower density and maintenance. Walk the community to assess parks, sports facilities and the route from parking to the apartment. Check live journey conditions at your normal travel time; a fixed corridor-wide travel time is not useful.",
  ],
  [
    "How should I compare resale and under-construction homes?",
    "For resale, inspect the home, repairs, occupancy, maintenance and the complete acquisition cost. For under-construction options, compare the current construction update, payment schedule, contractual possession terms and remaining payments. Developer sold-out status does not by itself rule out a permitted resale transfer.",
  ],
];

function BuyerQuestions() {
  return (
    <section className="container-page py-12" aria-labelledby="buyer-questions">
      <h2 id="buyer-questions" className="font-display text-3xl">
        Questions buyers ask about Golf Course Extension Road
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {buyerQuestions.map(([question, answer]) => (
          <article key={question} className="rounded-xl border border-border p-6">
            <h3 className="font-display text-xl">{question}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-xl bg-muted/40 p-6">
        <h3 className="font-display text-2xl">Build a shortlist around your daily life</h3>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          Shubh Estate Brokers helps compare properties, coordinate site visits, discuss price and
          support transaction documentation. Share your budget, preferred 3 BHK or 4 BHK layout and
          moving date so we can check suitable units.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="gold">
            <a href="/contact">Enquire or book a site visit</a>
          </Button>
          <Button asChild variant="goldOutline">
            <a href="#current-inventory">Explore available listings</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

