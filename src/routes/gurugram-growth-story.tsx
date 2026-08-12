import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { LOCALITIES } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/gurugram-growth-story")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/gurugram-growth-story`;
    const title = "The Growth Story of Gurugram – India's Millennium City";
    const description =
      "From Sanskrit villages to Cyber City: how DLF, Golf Course Road, Dwarka Expressway, SPR, the Metro and major infrastructure shaped Gurugram's property market.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "A deep dive into Gurugram's infrastructure, property corridors, housing market and investment considerations.",
        },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        { property: "article:modified_time", content: "2026-08-12T00:00:00+05:30" },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${canonical}#article`,
            headline: title,
            description,
            url: canonical,
            mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
            dateModified: "2026-08-12",
            author: {
              "@type": "Organization",
              name: "Shubh Estate Brokers",
              url: SITE_ORIGIN,
            },
            publisher: {
              "@type": "RealEstateAgent",
              "@id": `${SITE_ORIGIN}/#real-estate-agent`,
              name: "Shubh Estate Brokers",
              url: SITE_ORIGIN,
            },
            about: [
              "Gurugram real estate market",
              "Dwarka Expressway",
              "Golf Course Road",
              "Golf Course Extension Road",
              "Southern Peripheral Road",
              "New Gurgaon",
            ],
          }),
        },
      ],
    };
  },
  component: GrowthStory,
});

const TIMELINE = [
  ["1980s", "DLF begins aggregating farmland in Gurgaon, laying out DLF Phases I–V and inventing India's first large private township."],
  ["1997", "GE's captive centre lands in Gurgaon, seeding the BPO and IT boom that would define the district."],
  ["2002", "Cyber City takes shape; global occupiers anchor Gurgaon as the NCR's corporate address."],
  ["2008", "Golf Course Road densifies with premium condominiums; the city's luxury benchmark is set."],
  ["2013", "Rapid Metro opens, linking Cyber City with the Delhi Metro Yellow Line at Sikanderpur."],
  ["2016", "Golf Course Extension Road and Sohna Road mature into mid-to-premium residential corridors."],
  ["2021", "Southern Peripheral Road completes key stretches, unlocking Sectors 68–80."],
  ["2024", "Dwarka Expressway opens, cutting airport travel time and re-rating Sectors 99–113."],
  ["Next", "Global City, DMIC nodes, metro extension to Old Gurugram and broader NCR connectivity."],
];

const CORRIDORS = [
  {
    name: "Golf Course Road",
    path: "/locations/golf-course-road",
    body: "Gurugram's blue-chip address — a mature premium corridor with established social infrastructure and a deep luxury resale market. Buyers should compare unit quality, building age, maintenance and entry price rather than relying on the address alone.",
  },
  {
    name: "Golf Course Extension Road",
    path: "/locations/golf-course-extension-road",
    body: "The natural extension of the luxury belt, with completed condominiums, schools, retail and ongoing development. Project selection, access and surrounding supply remain important to the risk-return decision.",
  },
  {
    name: "Dwarka Expressway",
    path: "/locations/dwarka-expressway",
    body: "A major NCR connectivity corridor with direct access toward Delhi and IGI Airport and a large pipeline of branded residences across western Gurugram. Entry price, project stage and future supply should be reviewed together.",
  },
  {
    name: "Southern Peripheral Road (SPR)",
    path: "/locations/southern-peripheral-road",
    body: "The connector between Golf Course Extension Road and NH-48, serving several emerging residential and commercial sectors. Infrastructure delivery can support demand, but appreciation is never guaranteed and remains project-specific.",
  },
  {
    name: "New Gurgaon (Sectors 82–95)",
    path: "/locations/new-gurgaon",
    body: "Township-led living with comparatively varied entry points, large development parcels and improving retail. It can suit value-conscious end users and investors willing to compare occupancy, connectivity and future supply carefully.",
  },
  {
    name: "Sohna Road & South of Gurugram",
    path: "/locations/sohna-road",
    body: "A broad affordable-to-premium market influenced by Sohna connectivity, employment nodes and access toward the Delhi–Mumbai Expressway. Individual project quality and actual commute patterns matter more than corridor-level marketing claims.",
  },
] as const;

function GrowthStory() {
  return (
    <>
      <PageHero
        eyebrow="Market Pillar"
        title="The Growth Story of Gurugram – India's Millennium City"
        body="How a cluster of farmland villages on the Delhi border became one of India's most important private-sector business centres — and what that means for property buyers today."
      />

      <article className="container-page py-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-3xl space-y-10">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Market guide reviewed and updated August 2026
            </p>

            <section>
              <h2 className="font-display text-3xl">From Guru Dronacharya's village to Cyber City</h2>
              <p className="mt-4 text-muted-foreground">
                Gurugram takes its name from Guru Dronacharya, the teacher of the Pandavas, and for most of the
                twentieth century it remained an agrarian district on Delhi's south-western edge. The transformation
                accelerated from the 1980s as private development, industrial growth and proximity to Delhi reshaped
                the district.
              </p>
              <p className="mt-4 text-muted-foreground">
                What followed was unusual in Indian urbanism: large parts of the modern city were delivered through
                private townships and commercial developments, while public infrastructure expanded in parallel. That
                model helps explain both Gurugram's speed of growth and its infrastructure asymmetries — and why
                location and project-level diligence remain important here.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl">The corporate engine</h2>
              <p className="mt-4 text-muted-foreground">
                Global services companies and large Indian employers helped establish Gurgaon as a major office market.
                Cyber City, Udyog Vihar, Golf Course Road's office clusters and newer commercial corridors support a
                substantial employment base. Residential demand is closely connected to this occupier ecosystem, which
                is why serious property analysis should consider office absorption, commute patterns and rental depth —
                not only launch prices.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl">Timeline of a millennium city</h2>
              <ol className="mt-6 space-y-0 border-l border-border">
                {TIMELINE.map(([year, text]) => (
                  <li key={year} className="relative pb-8 pl-8">
                    <span className="absolute left-0 top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-gold" />
                    <p className="font-display text-xl">{year}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-display text-3xl">The corridors that matter</h2>
              <div className="mt-6 space-y-5">
                {CORRIDORS.map((c) => (
                  <Link
                    key={c.name}
                    to={c.path}
                    className="block rounded-xl border border-border bg-card p-6 transition-colors hover:border-gold/50"
                  >
                    <h3 className="font-display text-xl">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                    <span className="mt-4 inline-block text-sm font-medium text-gold">Explore this Gurugram corridor →</span>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl">Connectivity: how infrastructure changes the decision</h2>
              <p className="mt-4 text-muted-foreground">
                Metro expansion, expressway connectivity, new commercial districts and wider NCR infrastructure can
                change travel times, occupier interest and the relative appeal of different Gurugram sectors. These
                projects should be evaluated by current construction status, actual access, delivery risk and the price
                premium already reflected in a property.
              </p>
              <p className="mt-4 text-muted-foreground">
                Infrastructure announcements do not guarantee property appreciation. A disciplined buyer should compare
                title and approvals, developer execution, surrounding supply, financing cost, rental demand and a
                realistic holding period before paying an infrastructure-led premium.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl">Where the market stands today</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-md text-left text-sm">
                  <caption className="sr-only">Indicative average prices and annual growth by Gurugram corridor</caption>
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      <th scope="col" className="py-3">Corridor</th>
                      <th scope="col" className="py-3">Indicative price</th>
                      <th scope="col" className="py-3">Observed trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LOCALITIES.map((l) => (
                      <tr key={l.name} className="border-b border-border">
                        <td className="py-3">{l.name}</td>
                        <td className="py-3 text-muted-foreground">{l.price}</td>
                        <td className="py-3 text-gold">{l.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Indicative market observations only; corridor averages can hide large differences between projects and
                individual units. Verify current asking prices, recent comparable transactions and project-specific
                conditions before transacting.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl">What this means for you</h2>
              <p className="mt-4 text-muted-foreground">
                Gurugram is not a single property market. A Golf Course Road apartment, a Dwarka Expressway launch, a New
                Gurgaon apartment and an SPR commercial asset can have different liquidity, financing profiles, supply
                dynamics and holding periods. Choosing between them requires project-specific analysis rather than a
                city-wide appreciation assumption.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link to="/properties">Browse current inventory</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Get a market view for your budget</Link>
                </Button>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl surface-navy p-7 lg:sticky lg:top-28">
            <p className="eyebrow">On this page</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              <li>Origins & urban growth</li>
              <li>The corporate engine</li>
              <li>Timeline 1980s → today</li>
              <li>Corridors that matter</li>
              <li>Connectivity & infrastructure</li>
              <li>Indicative market context</li>
            </ul>
            <Button asChild variant="gold" className="mt-7 w-full">
              <Link to="/emi-calculator">Check affordability</Link>
            </Button>
          </aside>
        </div>
      </article>
    </>
  );
}
