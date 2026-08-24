import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Globe2,
  IndianRupee,
  Landmark,
  MapPin,
  MessageCircle,
  PlayCircle,
  Scale,
  ShieldCheck,
  Trees,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/m3m-golf-hills-sector-79-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "M3M Golf Hills Sector 79 Gurgaon | Resale from ₹13,000";
const description =
  "Explore indicative M3M Golf Hills Sector 79 resale and investor units from ₹13,000/sq ft, RERA details, price examples, videos and NRI buying support.";
const LAST_REVIEWED = "24 August 2026";
const INDICATIVE_RATE = 13_000;

const M3M_PROJECT_PAGE = "https://m3mindia.com/residential/m3m-golf-hills";
const M3M_PUBLIC_ENQUIRY_PAGE = "https://m3mindia.com/enquire-now";
const RERA_PHASE_1 = "https://haryanarera.gov.in/view_project/searchprojectDetail/2405";
const RERA_PHASE_2 = "https://haryanarera.gov.in/view_project/searchprojectDetail/2838";

const PRICE_EXAMPLES = [
  { configuration: "2.5 BHK", area: 1_420 },
  { configuration: "3.5 BHK", area: 2_260 },
  { configuration: "3.5 BHK", area: 2_365 },
  { configuration: "4.5 BHK", area: 2_685 },
] as const;

const BUYER_CHECKS = [
  "Confirm the exact phase, tower, apartment number, floor, view and orientation.",
  "Match the allotment, builder ledger, paid amount and future construction-linked demands.",
  "Obtain the promoter's current transfer procedure, charges, lock-in conditions and written unit eligibility.",
  "Add PLC, parking, club or IFMS charges, applicable tax, transfer expenses, stamp duty and registration.",
  "Verify RERA disclosures, sanctioned plans and the agreement documents for the applicable phase.",
  "Use realistic comparable transactions and lender valuation before paying a substantial token.",
] as const;

const FAQS = [
  {
    q: "What is the current resale price of M3M Golf Hills Sector 79?",
    a: "Select seller-held or investor-assignment opportunities may be indicated from about ₹13,000 per sq ft. The executable rate depends on the exact phase, tower, floor, view, seller payment position, outstanding builder demands, transfer eligibility and availability on the day of confirmation.",
  },
  {
    q: "Does ₹13,000 per sq ft include every charge?",
    a: "No. It is an indicative per-square-foot rate used for initial comparison. Buyers should request a written total-acquisition-cost sheet covering the seller consideration, unpaid builder demands, PLC and other project charges, transfer expenses, applicable tax, stamp duty and registration.",
  },
  {
    q: "What are the RERA numbers for M3M Golf Hills?",
    a: "M3M Golf Hills is being developed in phases. Phase 1 is registered as RERA-GRG-1331-2023 and Phase 2 as RERA-GRG-1578-2024. The relevant registration must be matched to the exact unit under consideration.",
  },
  {
    q: "Who is the promoter of M3M Golf Hills?",
    a: "Haryana RERA records Loon Land Development Limited as the promoter for both registered phases. The project is marketed under the M3M Golf Hills brand; the official project disclosure also advises buyers to verify phase and promoter details independently.",
  },
  {
    q: "Can an NRI buy an investor-assignment unit remotely?",
    a: "Initial shortlisting, live video viewing, seller-document collection, cost comparison and loan coordination can be handled remotely. The buyer should obtain transaction-specific legal and tax advice for FEMA, NRE or NRO payments, TDS, power of attorney and future repatriation.",
  },
  {
    q: "Is a rental yield or capital gain guaranteed?",
    a: "No. Rent, occupancy, resale price and capital appreciation depend on market conditions, project delivery, the specific unit and future supply. Any return estimate should be treated as a scenario, not a promise.",
  },
] as const;

function formatCrore(value: number) {
  return `₹${(value / 10_000_000).toFixed(2)} Cr`;
}

export const Route = createFileRoute("/projects/m3m-golf-hills-sector-79-gurgaon")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large,max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: "https://i.ytimg.com/vi/4Vk46XV6jtM/maxresdefault.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://i.ytimg.com/vi/4Vk46XV6jtM/maxresdefault.jpg" },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Gurgaon Project Guides",
                  item: `${SITE_ORIGIN}/projects`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "M3M Golf Hills Sector 79",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "ApartmentComplex",
              "@id": `${canonical}#project`,
              name: "M3M Golf Hills",
              url: canonical,
              description,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sector 79 and 79B",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              additionalProperty: [
                {
                  "@type": "PropertyValue",
                  name: "Promoter",
                  value: "Loon Land Development Limited",
                },
                { "@type": "PropertyValue", name: "Phase 1 RERA", value: "RERA-GRG-1331-2023" },
                { "@type": "PropertyValue", name: "Phase 2 RERA", value: "RERA-GRG-1578-2024" },
                { "@type": "PropertyValue", name: "Status", value: "Under construction" },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: M3MGolfHillsPage,
});

function M3MGolfHillsPage() {
  const whatsappMessage = encodeURIComponent(
    "Hi Arun ji, I want the current unit-wise inventory and total cost for M3M Golf Hills Sector 79. Please share phase, tower, floor, view, seller payment status and transfer details.",
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border surface-navy">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_75%_20%,hsl(var(--gold))_0,transparent_34%)]" />
        <div className="container-page relative py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-navy-foreground/65">
            <a href="/" className="hover:text-gold">
              Home
            </a>
            <span className="px-2">/</span>
            <a href="/projects" className="hover:text-gold">
              Projects
            </a>
            <span className="px-2">/</span>
            <span className="text-navy-foreground">M3M Golf Hills Sector 79</span>
          </nav>

          <div className="mt-7 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-gold/30 bg-gold/10 text-gold hover:bg-gold/10">
                  NRI investment portal
                </Badge>
                <Badge variant="secondary">Under construction</Badge>
                <Badge variant="secondary">RERA registered in 2 phases</Badge>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Sector 79 & 79B · New Gurugram
              </p>
              <h1 className="mt-3 max-w-5xl font-display text-4xl leading-tight md:text-6xl">
                M3M Golf Hills Sector 79: select investor units from ₹13,000/sq. ft.*
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-navy-foreground/75 md:text-lg">
                Compare seller-held allotments, phase-specific RERA information and the complete
                acquisition cost with Shubh Estate Brokers&apos; Gurgaon NRI Desk before committing
                funds.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <a href="#price-table">View price examples</a>
                </Button>
                <Button asChild variant="goldOutline" size="lg">
                  <a
                    href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "m3m_golf_hills_hero")}
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Check live inventory
                  </a>
                </Button>
              </div>
            </div>

            <aside className="rounded-2xl border border-gold/30 bg-background/10 p-6 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-navy-foreground/60">
                Indicative entry rate
              </p>
              <p className="mt-2 font-display text-4xl text-gold">₹13,000</p>
              <p className="text-sm text-navy-foreground/70">
                per sq. ft.* on select seller-held inventory
              </p>
              <div className="mt-5 border-t border-navy-foreground/15 pt-4 text-xs leading-5 text-navy-foreground/60">
                <p>
                  *Subject to exact unit, phase, transfer eligibility, seller terms, outstanding
                  demands and continuing availability.
                </p>
                <p className="mt-2">Page reviewed: {LAST_REVIEWED}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {[
            [MapPin, "Location", "Sector 79 & 79B, Gurugram"],
            [Building2, "Home formats", "2.5, 3.5 & 4.5 BHK"],
            [Trees, "Project character", "Golf-inspired central landscape"],
            [FileCheck2, "RERA", "Phase 1 + Phase 2 registrations"],
          ].map(([Icon, label, value]) => {
            const Component = Icon as typeof MapPin;
            return (
              <div
                key={label as string}
                className="border-b border-border px-5 py-5 sm:border-r lg:border-b-0 last:border-r-0"
              >
                <Component className="size-4 text-gold" aria-hidden="true" />
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {label as string}
                </p>
                <p className="mt-1 font-display text-xl">{value as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <main className="space-y-14">
          <section>
            <p className="eyebrow">Project overview</p>
            <h2 className="mt-2 font-display text-3xl">
              Golf-themed residences near the Aravalli foothills
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              M3M Golf Hills is a golf-inspired residential development in Sector 79 and 79B,
              Gurugram. The official project page highlights a central golf landscape,
              Aravalli-facing balconies, sports facilities, a large clubhouse, rooftop dining and
              wellness spaces. The residential formats are marketed as 2.5, 3.5 and 4.5 BHK homes.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              For investment analysis, the project name is only the starting point. Phase, tower,
              floor, view, apartment plan, construction-linked payment status and the seller&apos;s
              transfer eligibility can materially change both the entry cost and the future resale
              case.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                [
                  Trees,
                  "Lifestyle proposition",
                  "Golf greens, sports, clubhouse, rooftop and wellness amenities form the project's core lifestyle positioning.",
                ],
                [
                  MapPin,
                  "New Gurugram location",
                  "Access towards NH-48, SPR, Dwarka Expressway and employment districts should be checked by route and travel time.",
                ],
                [
                  Globe2,
                  "Remote NRI shortlisting",
                  "Compare unit videos, payment ledgers, written cost sheets and documents before scheduling travel to India.",
                ],
                [
                  Landmark,
                  "Finance-led comparison",
                  "Test affordability using the total acquisition cost, payment timeline, lender valuation and currency movement—not only the headline rate.",
                ],
              ].map(([Icon, heading, text]) => {
                const Component = Icon as typeof Trees;
                return (
                  <article
                    key={heading as string}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <Component className="size-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl">{heading as string}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="price-table" className="scroll-mt-28">
            <p className="eyebrow">Price and layout illustration</p>
            <h2 className="mt-2 font-display text-3xl">
              What ₹13,000/sq. ft. means by apartment size
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The calculations below illustrate only the area multiplied by the indicative entry
              rate. They are not an all-inclusive quotation and do not represent every layout or
              available unit.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full min-w-[42rem] text-left text-sm">
                <caption className="sr-only">
                  M3M Golf Hills price illustration at ₹13,000 per square foot
                </caption>
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-5 py-4 font-medium">Configuration</th>
                    <th className="px-5 py-4 font-medium">Illustrative area</th>
                    <th className="px-5 py-4 font-medium">Rate used</th>
                    <th className="px-5 py-4 font-medium">Area × rate</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_EXAMPLES.map((unit) => (
                    <tr
                      key={`${unit.configuration}-${unit.area}`}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="px-5 py-4 font-medium">{unit.configuration}</td>
                      <td className="px-5 py-4">{unit.area.toLocaleString("en-IN")} sq. ft.</td>
                      <td className="px-5 py-4">
                        ₹{INDICATIVE_RATE.toLocaleString("en-IN")}/sq. ft.
                      </td>
                      <td className="px-5 py-4 font-display text-lg text-gold">
                        {formatCrore(unit.area * INDICATIVE_RATE)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">Request the complete cost sheet.</strong> Add
              seller consideration, outstanding builder demands, preferential location charges,
              parking, club or IFMS charges, applicable tax, promoter transfer expenses, brokerage
              if applicable, stamp duty and registration. A lower per-square-foot rate does not
              automatically mean a lower all-in acquisition cost.
            </div>
          </section>

          <section>
            <p className="eyebrow">Current price context</p>
            <h2 className="mt-2 font-display text-3xl">
              Compare written, dated offers—not an old price list
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              At the time this guide was reviewed, M3M&apos;s public enquiry page displayed an
              indicative promotional rate of ₹13,600 per sq. ft. for the Sector 79 Golf Hills Road
              offering. Shubh Estate Brokers may have select seller-held units indicated from
              ₹13,000 per sq. ft. Because public schemes and owner expectations can change, no
              blanket savings percentage is promised. We calculate the gap only after matching the
              same phase, comparable apartment and total payable cost.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="goldOutline">
                <a href={M3M_PUBLIC_ENQUIRY_PAGE} target="_blank" rel="noopener noreferrer">
                  View M3M public price context{" "}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="goldOutline">
                <a href={M3M_PROJECT_PAGE} target="_blank" rel="noopener noreferrer">
                  View project information <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </section>

          <section>
            <p className="eyebrow">RERA and promoter check</p>
            <h2 className="mt-2 font-display text-3xl">M3M Golf Hills has two registered phases</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Haryana RERA records Loon Land Development Limited as promoter. Match the exact
              allotment to its phase before relying on a possession date, plan, payment schedule or
              transfer process.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  name: "M3M Golf Hills Phase 1",
                  registration: "RERA-GRG-1331-2023",
                  certificate: "GGM/704/436/2023/48 dated 29 March 2023",
                  completion: "RERA completion: 28 February 2031",
                  href: RERA_PHASE_1,
                },
                {
                  name: "M3M Golf Hills Phase 2",
                  registration: "RERA-GRG-1578-2024",
                  certificate: "GGM/809/541/2024/36 dated 1 April 2024",
                  completion: "RERA completion: 31 May 2030",
                  href: RERA_PHASE_2,
                },
              ].map((phase) => (
                <article
                  key={phase.registration}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <FileCheck2 className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-xl">{phase.name}</h3>
                  <p className="mt-3 font-medium">{phase.registration}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {phase.certificate}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">{phase.completion}</p>
                  <a
                    href={phase.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
                  >
                    Verify on Haryana RERA <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section>
            <p className="eyebrow">Project videos</p>
            <h2 className="mt-2 font-display text-3xl">
              Concept walkthrough and construction footage
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Use videos for early remote screening only. Marketing visuals may be artistic
              representations, while construction footage can age quickly. Confirm current site
              progress and specifications independently.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[
                { id: "4Vk46XV6jtM", title: "M3M Golf Hills concept and lifestyle walkthrough" },
                { id: "yOHfIcR5UVI", title: "M3M Golf Hills public construction update" },
              ].map((video) => (
                <article
                  key={video.id}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className="aspect-video bg-muted">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex items-center gap-3 p-4">
                    <PlayCircle className="size-5 shrink-0 text-gold" aria-hidden="true" />
                    <h3 className="font-medium">{video.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <p className="eyebrow">NRI transaction support</p>
            <h2 className="mt-2 font-display text-3xl">
              A remote-first process with unit-level controls
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                [
                  Globe2,
                  "Live remote review",
                  "Video calls for the project, surroundings and shortlisted unit details, scheduled for your timezone.",
                ],
                [
                  FileCheck2,
                  "Seller document pack",
                  "Collection of the allotment chain, payment receipts, builder ledger and current demand position.",
                ],
                [
                  Scale,
                  "Legal and tax coordination",
                  "Coordinate with qualified professionals for FEMA, payment route, TDS, power of attorney and repatriation questions.",
                ],
                [
                  Landmark,
                  "NRI home-loan support",
                  "Eligibility, lender-document and property-approval coordination, subject to the bank's final policy and sanction.",
                ],
              ].map(([Icon, heading, text]) => {
                const Component = Icon as typeof Globe2;
                return (
                  <article
                    key={heading as string}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <Component className="size-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl">{heading as string}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section>
            <p className="eyebrow">Before paying a token</p>
            <h2 className="mt-2 font-display text-3xl">
              Six checks for an investor-assignment purchase
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BUYER_CHECKS.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-6 text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="eyebrow">Frequently asked questions</p>
            <h2 className="mt-2 font-display text-3xl">M3M Golf Hills buyer questions</h2>
            <dl className="mt-6 space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                  <dt className="font-display text-xl">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl surface-navy p-7">
            <p className="eyebrow">Continue your research</p>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              {[
                ["/property-sector-79-gurgaon", "Sector 79 Gurgaon property guide"],
                ["/under-construction-projects-gurgaon", "Under-construction projects in Gurgaon"],
                ["/nri", "NRI property services in Gurgaon"],
                ["/home-loans", "NRI and resident home-loan assistance"],
                [
                  "/blog/gurgaon-property-due-diligence-checklist-2026",
                  "Gurgaon property due-diligence checklist",
                ],
                ["/projects", "All Gurgaon project guides"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-2 text-gold hover:underline"
                >
                  {label} <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        </main>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              M3M Golf Hills enquiry
            </p>
            <h2 className="mt-2 font-display text-2xl">Request the current inventory sheet</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Share your preferred configuration, budget, country and buying timeline. Ask for
              phase, tower, floor, view, payment ledger and total cost.
            </p>
            <div className="mt-5">
              <EnquiryForm interest="M3M Golf Hills Sector 79 NRI or investor enquiry" compact />
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-gold/30 bg-gold/5 p-5">
            <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
            <h2 className="mt-3 font-display text-xl">
              No inventory is treated as confirmed until checked
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Availability and price can change without notice. A seller&apos;s allotment, ledger
              and transfer eligibility should be reconfirmed before a visit or payment.
            </p>
          </div>

          <div className="mt-5 rounded-xl surface-navy p-5">
            <IndianRupee className="size-5 text-gold" aria-hidden="true" />
            <h2 className="mt-3 font-display text-xl">Need the all-in cost on WhatsApp?</h2>
            <Button asChild variant="gold" className="mt-4 w-full">
              <a
                href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp", "m3m_golf_hills_sidebar")}
              >
                Message Arun Madaan
              </a>
            </Button>
          </div>
        </aside>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="container-page py-8 text-xs leading-5 text-muted-foreground">
          <p>
            Independent advisory page by Shubh Estate Brokers. Shubh Estate Brokers is not the
            promoter and this is not an official M3M website. Project names and trademarks belong to
            their respective owners. Price examples are indicative, not a legal offer, and must be
            verified against the exact apartment, promoter records and transaction documents. RERA
            dates and public price context were reviewed on {LAST_REVIEWED}.
          </p>
        </div>
      </section>
    </>
  );
}
