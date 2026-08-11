import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { LOCALITIES } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/gurugram-growth-story")({
  head: () => ({
    meta: [
      { title: "The Growth Story of Gurugram – India's Millennium City" },
      {
        name: "description",
        content:
          "From Sanskrit villages to Cyber City: how DLF, Golf Course Road, Dwarka Expressway, SPR, the Metro and Jewar Airport shaped Gurugram's property market — and where it goes next.",
      },
      { property: "og:title", content: "The Growth Story of Gurugram – India's Millennium City" },
      {
        property: "og:description",
        content: "A deep dive into Gurugram's infrastructure, corridors, luxury housing and investment potential.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE_ORIGIN}/gurugram-growth-story` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/gurugram-growth-story` }],
  }),
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
  ["Next", "Global City, DMIC nodes, metro extension to Old Gurugram and Jewar Airport connectivity."],
];

const CORRIDORS = [
  {
    name: "Golf Course Road",
    body: "Gurugram's blue-chip address — 16-lane spine, mature social infrastructure and the deepest luxury resale market in the NCR. Buyers pay for scarcity and liquidity rather than upside.",
  },
  {
    name: "Golf Course Extension Road",
    body: "The natural extension of the luxury belt, now with completed condominiums, schools and retail. Balanced risk-return for end-users upgrading from Sohna Road.",
  },
  {
    name: "Dwarka Expressway",
    body: "The single largest re-rating story of the decade. Sixteen lanes, direct IGI access and a pipeline of branded residences across Sectors 99–113.",
  },
  {
    name: "Southern Peripheral Road (SPR)",
    body: "The connector between Golf Course Extension and NH-48, widening into a 90-metre corridor. Strong appreciation potential as commercial density arrives.",
  },
  {
    name: "New Gurgaon (Sectors 82–95)",
    body: "Township-led living with lower entry prices, large land parcels and improving retail. Best suited to patient capital and value-conscious end users.",
  },
  {
    name: "Sohna Road & South of Gurugram",
    body: "Affordable-to-mid segment with the Delhi–Mumbai Expressway interchange, Sohna elevated corridor and industrial demand from Manesar and IMT.",
  },
];

function GrowthStory() {
  return (
    <>
      <PageHero
        eyebrow="Market Pillar"
        title="The Growth Story of Gurugram – India's Millennium City"
        body="How a cluster of farmland villages on the Delhi border became India's most valuable private-sector city — and what that means for property buyers today."
      />

      <article className="container-page py-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-3xl space-y-10">
            <section>
              <h2 className="font-display text-3xl">From Guru Dronacharya's village to Cyber City</h2>
              <p className="mt-4 text-muted-foreground">
                Gurugram takes its name from Guru Dronacharya, the teacher of the Pandavas, and for most of the
                twentieth century it remained an agrarian district on Delhi's south-western edge. The transformation
                began in the 1980s, when DLF began consolidating farmland parcels and Haryana's licensing policy
                allowed private developers to build entire townships — an approach no other Indian state permitted at
                the time.
              </p>
              <p className="mt-4 text-muted-foreground">
                What followed was unusual in Indian urbanism: a city built almost entirely by private capital, with
                roads, power backup, water and security delivered at the project level rather than by the municipality.
                That model explains both Gurugram's speed and its infrastructure asymmetries — and why location
                selection here rewards diligence more than in most Indian markets.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl">The corporate engine</h2>
              <p className="mt-4 text-muted-foreground">
                GE's captive centre in the late 1990s proved that global back offices could run from Gurgaon. Cyber
                City followed, then Udyog Vihar, Golf Course Road's office clusters, and later the Dwarka Expressway
                and SPR commercial belts. Roughly half of India's Fortune 500 presence in the NCR now sits within a
                fifteen-kilometre radius of Cyber Hub. Residential demand in Gurugram has always been an echo of this
                office absorption — which is why serious investors track leasing data, not just launch prices.
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
                  <div key={c.name} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-xl">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl">Connectivity: the next re-rating</h2>
              <p className="mt-4 text-muted-foreground">
                Three infrastructure programmes will shape the next cycle. The approved metro extension through Old
                Gurugram and Sectors 9, 22 and 101 will finally connect the western sectors to mass transit. The
                Delhi–Mumbai Industrial Corridor and Haryana's Global City project at Sectors 36B and 37 introduce a
                planned commercial node of a scale Gurugram has not attempted before. And Noida International Airport
                at Jewar, linked via the Delhi–Mumbai Expressway and proposed corridors, adds a second aviation anchor
                for the NCR.
              </p>
              <p className="mt-4 text-muted-foreground">
                Each of these has a familiar pattern: land values move on announcement, stall through construction, and
                re-rate on commissioning. The buyers who do best are the ones who enter during the stall — with clean
                title, verified approvals and financing structured for a longer hold.
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
                      <th scope="col" className="py-3">Avg. price</th>
                      <th scope="col" className="py-3">Growth</th>
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
                Indicative figures compiled from market observation and transaction feedback; verify current pricing
                before transacting.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl">What this means for you</h2>
              <p className="mt-4 text-muted-foreground">
                Gurugram is no longer a single market. A Golf Course Road apartment, a Dwarka Expressway launch, a New
                Gurgaon builder floor and an SPR commercial suite behave like four different asset classes, with
                different liquidity, financing profiles and holding periods. Choosing between them is an underwriting
                exercise — which is exactly how we approach every mandate.
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
              <li>Origins & the DLF model</li>
              <li>The corporate engine</li>
              <li>Timeline 1980s → today</li>
              <li>Corridors that matter</li>
              <li>Connectivity & the next cycle</li>
              <li>Price and growth table</li>
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
