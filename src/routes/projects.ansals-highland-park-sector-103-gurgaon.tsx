import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  IndianRupee,
  Landmark,
  MapPin,
  MessageCircle,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/ansals-highland-park-sector-103-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Ansals Highland Park Sector 103 Gurgaon | Price & Buyer Guide";
const description =
  "Ansals Highland Park Sector 103 Gurgaon guide with 1361-2670 sq ft floor plans, current market prices, RERA facts, nearby project comparison and home-loan guidance.";
const LAST_REVIEWED = "24 August 2026";

const DEVELOPER_PAGE = "https://www.ansals.com/home/project_detail/ansals-highland-park";
const RERA_PAGE = "https://haryanarera.gov.in/view_project/searchprojectDetail/359";

const QUICK_FACTS = [
  ["Location", "Sector 103, Dwarka Expressway"],
  ["Project area", "Approx. 11.70 acres"],
  ["Towers / homes", "8 towers / 620 units"],
  ["Layouts", "2, 3 & large-format homes"],
  ["Saleable area", "1,361-2,670 sq ft"],
  ["RERA", "GGM/322/54/2019/16"],
] as const;

const PRICE_SNAPSHOTS = [
  {
    configuration: "2 BHK",
    saleableArea: "1,361 sq ft",
    carpetArea: "810 sq ft",
    balconyArea: "183.96 sq ft",
    marketRange: "₹1.04-1.52 Cr",
    rateRange: "Approx. ₹7,640-11,170/sq ft",
  },
  {
    configuration: "3 BHK",
    saleableArea: "1,762 sq ft",
    carpetArea: "1,064 sq ft",
    balconyArea: "239.93 sq ft",
    marketRange: "₹1.50-1.75 Cr",
    rateRange: "Approx. ₹8,510-9,930/sq ft",
  },
  {
    configuration: "3 BHK + Utility",
    saleableArea: "1,940 sq ft",
    carpetArea: "1,215 sq ft",
    balconyArea: "265.98 sq ft",
    marketRange: "₹1.57-1.60 Cr",
    rateRange: "Approx. ₹8,090-8,250/sq ft",
  },
  {
    configuration: "3 BHK + Room + Utility",
    saleableArea: "2,670 sq ft",
    carpetArea: "1,487 sq ft",
    balconyArea: "473.50 sq ft",
    marketRange: "₹2.25-2.26 Cr",
    rateRange: "Approx. ₹8,430-8,460/sq ft",
  },
] as const;

const CORRIDOR_COMPARISON = [
  {
    project: "Ansals Highland Park",
    sector: "103",
    marketSnapshot: "₹1.04 Cr onward across current size-specific resale inventory",
    rateContext: "Market range around ₹7,600-10,000/sq ft for several available layouts",
  },
  {
    project: "Adani M2K Oyster Grande",
    sector: "102",
    marketSnapshot: "3 BHK resale range around ₹1.95-2.80 Cr",
    rateContext: "Market context around ₹13,050/sq ft",
  },
  {
    project: "Emaar Gurgaon Greens",
    sector: "102",
    marketSnapshot: "1,650 sq ft resale examples around ₹1.90-2.24 Cr",
    rateContext: "Observed examples around ₹11,500-13,600/sq ft",
  },
  {
    project: "Godrej Summit",
    sector: "104",
    marketSnapshot: "3 BHK examples around ₹1.54-2.00 Cr",
    rateContext: "Wide spread; compare the same area basis",
  },
  {
    project: "Tata Gurgaon Gateway",
    sector: "112",
    marketSnapshot: "3 BHK resale example around ₹3.30 Cr",
    rateContext: "Observed example around ₹14,830/sq ft",
  },
] as const;

const BUYER_CHECKS = [
  {
    factor: "Exact tower and possession position",
    action:
      "Verify the tower, occupation/completion documentation, possession status and any pending developer or association handover items for the shortlisted unit.",
  },
  {
    factor: "Ownership, allotment and transfer trail",
    action:
      "Review the allotment/transfer chain, agreement, payment record, possession papers, seller identity, encumbrance position and current transfer procedure.",
  },
  {
    factor: "Bank legal and technical acceptance",
    action:
      "Start lender document and valuation checks early. A previous sanction in the project is helpful context, but it does not approve every tower, unit or transaction automatically.",
  },
  {
    factor: "Dues, parking and fit-out condition",
    action:
      "Confirm maintenance, utility and developer dues, parking rights, furnishing inventory, seepage or repair needs and the handover condition in writing.",
  },
  {
    factor: "Comparable market evidence",
    action:
      "Compare the exact size, tower, floor, view and condition to identify the strongest price and value opportunity.",
  },
] as const;

const FAQS = [
  {
    q: "What apartment sizes are available in Ansals Highland Park?",
    a: "The developer brochure publishes four layouts: 2 BHK of approximately 1,361 sq ft, 3 BHK of 1,762 sq ft, 3 BHK plus utility of 1,940 sq ft, and 3 BHK plus one room and utility of 2,670 sq ft. The brochure describes these as approximate saleable areas.",
  },
  {
    q: "What is the current market price of Ansals Highland Park?",
    a: "The Shubh Estate market snapshot reviewed on 24 August 2026 records size-specific prices from approximately ₹1.04 crore for 1,361 sq ft to approximately ₹2.26 crore for 2,670 sq ft.",
  },
  {
    q: "Why is Ansals Highland Park cheaper than some nearby branded projects?",
    a: "The project offers a substantial entry-price advantage because the market applies an Ansal brand discount even though buyers receive large layouts, Dwarka Expressway connectivity and a location surrounded by established projects from Adani, Emaar, Godrej and Tata. This makes Highland Park the best entry-level value opportunity in the corridor based on current market prices.",
  },
  {
    q: "Is Ansals Highland Park RERA registered?",
    a: "The Haryana RERA project record identifies Ansals Highland Park, Sector 103, promoter Identity Buildtech Pvt. Ltd., under registration GGM/322/54/2019/16 dated 1 April 2019. The current project-detail record states that an extension certificate has been uploaded.",
  },
  {
    q: "Is Ansals Highland Park legally and technically sound?",
    a: "The project has an identifiable Haryana RERA record, and the developer brochure specifies earthquake-resistant RCC framed construction with infill brick walls. The project also receives bank legal and technical consideration for funding of eligible units.",
  },
  {
    q: "Can a bank fund up to 90% for Ansals Highland Park?",
    a: "Banks may fund up to 90% of the market value for eligible borrowers and qualifying units, as per the lender's prevailing credit, valuation and loan-to-value policy.",
  },
] as const;

export const Route = createFileRoute("/projects/ansals-highland-park-sector-103-gurgaon")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      {
        property: "og:image",
        content: `${SITE_ORIGIN}/projects/ansals-highland-park/ansals-highland-park-bird-eye.webp`,
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
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
              name: "Gurgaon Project Guides",
              item: `${SITE_ORIGIN}/projects`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Ansals Highland Park Sector 103 Gurgaon",
              item: canonical,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ApartmentComplex",
          "@id": `${canonical}#project`,
          name: "Ansals Highland Park",
          alternateName: "Ansal Housing Highland Park",
          url: canonical,
          description,
          image: `${SITE_ORIGIN}/projects/ansals-highland-park/ansals-highland-park-bird-eye.webp`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sector 103, Dwarka Expressway",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          numberOfAccommodationUnits: 620,
          additionalProperty: [
            { "@type": "PropertyValue", name: "Promoter", value: "Identity Buildtech Pvt. Ltd." },
            { "@type": "PropertyValue", name: "Project area", value: "Approximately 11.70 acres" },
            { "@type": "PropertyValue", name: "Towers", value: "8" },
            {
              "@type": "PropertyValue",
              name: "Published saleable area",
              value: "1,361-2,670 sq ft",
            },
            { "@type": "PropertyValue", name: "RERA registration", value: "GGM/322/54/2019/16" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: AnsalsHighlandParkPage,
});

function AnsalsHighlandParkPage() {
  const whatsappMessage = encodeURIComponent(
    "Hello Mr Arun Madaan, I want current resale options and a site visit for Ansals Highland Park, Sector 103 Gurgaon.",
  );

  return (
    <>
      <section className="surface-navy border-b border-gold/20">
        <div className="container-page grid items-center gap-9 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)] lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-white/60">
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
              <span className="px-2">/</span>
              <Link to="/projects" className="hover:text-gold">
                Projects
              </Link>
              <span className="px-2">/</span>
              <span className="text-white">Ansals Highland Park</span>
            </nav>
            <div className="mt-7 flex flex-wrap gap-2">
              <Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">
                Best entry-level value
              </Badge>
              <Badge className="border-white/20 bg-white/5 text-white hover:bg-white/5">
                Sector 103
              </Badge>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Ansals Highland Park, Sector 103 Gurgaon
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
              The best entry-level value project on Dwarka Expressway, with large published layouts,
              competitive market prices, nearby Adani, Emaar, Godrej and Tata projects, RERA
              registration and strong home-loan potential.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a
                  href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "ansals_highland_park_hero")}
                >
                  <MessageCircle aria-hidden="true" />
                  Check Current Options
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="lg">
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => trackContact("phone", "ansals_highland_park_hero")}
                >
                  Call {CONTACT.phone}
                </a>
              </Button>
            </div>
            <p className="mt-5 text-xs leading-5 text-white/60">
              Shubh Estate market price snapshot reviewed {LAST_REVIEWED}.
            </p>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl">
            <img
              src="/projects/ansals-highland-park/ansals-highland-park-bird-eye.webp"
              alt="Developer brochure bird-eye rendering of Ansals Highland Park Sector 103 Gurgaon"
              className="aspect-[5/3] w-full object-cover"
              width={1800}
              height={1078}
              loading="eager"
            />
            <figcaption className="px-4 py-3 text-xs leading-5 text-white/60">
              Ansals Highland Park developer brochure rendering.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-px sm:grid-cols-2 lg:grid-cols-6">
          {QUICK_FACTS.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-border px-4 py-5 sm:border-r lg:border-b-0 last:border-r-0"
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold leading-5">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <nav
        className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur"
        aria-label="Ansals Highland Park page sections"
      >
        <div className="container-page flex gap-5 overflow-x-auto py-3 text-sm">
          <a href="#value-case" className="whitespace-nowrap hover:text-gold">
            Value case
          </a>
          <a href="#prices" className="whitespace-nowrap hover:text-gold">
            Prices by size
          </a>
          <a href="#comparison" className="whitespace-nowrap hover:text-gold">
            Nearby comparison
          </a>
          <a href="#plans" className="whitespace-nowrap hover:text-gold">
            Floor plans
          </a>
          <a href="#legal" className="whitespace-nowrap hover:text-gold">
            RERA & diligence
          </a>
          <a href="#finance" className="whitespace-nowrap hover:text-gold">
            Home loan
          </a>
          <a href="#faq" className="whitespace-nowrap hover:text-gold">
            FAQ
          </a>
        </div>
      </nav>

      <div>
        <section id="value-case" className="container-page scroll-mt-24 py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                The value case
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-3xl leading-tight md:text-4xl">
                The best entry-level value in this Dwarka Expressway micro-market
              </h2>
              <p className="mt-5 max-w-4xl leading-8 text-muted-foreground">
                Ansals Highland Park sits in Sector 103 within the same wider Dwarka Expressway belt
                as established projects by Adani, Emaar, Godrej and Tata. Its current market price
                is materially lower than many nearby branded alternatives, while offering generous
                apartment sizes from 1,361 to 2,670 sq ft. This creates an exceptional entry point
                for end users and investors seeking space, connectivity and value.
              </p>
              <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
                The market is applying an Ansal brand discount despite the project&apos;s
                established location, RERA registration, large layouts and access to bank funding.
                For a buyer focused on the property&apos;s actual space and price rather than paying
                a premium only for the builder name, Highland Park stands out as the corridor&apos;s
                strongest entry-level value proposition.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: IndianRupee,
                    title: "Best entry-level price",
                    text: "Current size-specific market prices begin near ₹1.04 crore for a 1,361 sq ft home.",
                  },
                  {
                    icon: Building2,
                    title: "Four published layouts",
                    text: "The brochure covers saleable areas from 1,361 to 2,670 sq ft, including utility and large-family formats.",
                  },
                  {
                    icon: MapPin,
                    title: "Branded micro-market",
                    text: "Adani and Emaar in Sector 102, Godrej in Sector 104 and Tata projects further along the same corridor improve comparison depth.",
                  },
                ].map(({ icon: Icon, title: cardTitle, text }) => (
                  <div key={cardTitle} className="rounded-xl border border-border bg-card p-5">
                    <Icon className="size-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-xl">{cardTitle}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-2xl border border-gold/30 bg-gold/5 p-6 lg:self-start">
              <ShieldCheck className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl">Our position</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Based on current market prices, available apartment sizes and nearby branded project
                comparisons, Shubh Estate positions Ansals Highland Park as the best entry-level
                residential opportunity on Dwarka Expressway.
              </p>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Reviewed by Arun Madaan, MBA, LLB · Founder & Promoter · Former Senior Banking
                Professional.
              </p>
            </aside>
          </div>
        </section>

        <section id="prices" className="scroll-mt-24 border-y border-border bg-muted/30">
          <div className="container-page py-14 md:py-16">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Shubh Estate market snapshot
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Current market price for every brochure size
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Shubh Estate reviewed the available resale market on {LAST_REVIEWED} and prepared
                this size-wise price comparison for buyers considering Ansals Highland Park.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-secondary/70">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Configuration</th>
                    <th className="px-5 py-4 font-semibold">Saleable area</th>
                    <th className="px-5 py-4 font-semibold">Brochure carpet / balcony</th>
                    <th className="px-5 py-4 font-semibold">Current market range</th>
                    <th className="px-5 py-4 font-semibold">Approx. market rate</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_SNAPSHOTS.map((row) => (
                    <tr key={row.saleableArea} className="border-t border-border align-top">
                      <td className="px-5 py-4 font-semibold">{row.configuration}</td>
                      <td className="px-5 py-4">{row.saleableArea}</td>
                      <td className="px-5 py-4 leading-6 text-muted-foreground">
                        {row.carpetArea} / {row.balconyArea}
                      </td>
                      <td className="px-5 py-4 font-semibold text-gold">{row.marketRange}</td>
                      <td className="px-5 py-4 leading-6 text-muted-foreground">{row.rateRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-7 text-muted-foreground">
              <strong className="text-foreground">Shubh Estate advantage:</strong> The market-rate
              comparison is calculated on the published saleable area, giving buyers a consistent
              size-to-size view of Highland Park&apos;s entry price and value.
            </div>
          </div>
        </section>

        <section id="comparison" className="container-page scroll-mt-24 py-14 md:py-16">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
              Dwarka Expressway context
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              How Highland Park compares with nearby branded projects
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Current market prices show a clear entry-price advantage for Highland Park when
              compared with established projects by Adani, Emaar, Godrej and Tata across the wider
              Dwarka Expressway corridor.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <thead className="bg-secondary/70">
                <tr>
                  <th className="px-5 py-4 font-semibold">Project</th>
                  <th className="px-5 py-4 font-semibold">Sector</th>
                  <th className="px-5 py-4 font-semibold">Current market snapshot</th>
                  <th className="px-5 py-4 font-semibold">Rate context</th>
                </tr>
              </thead>
              <tbody>
                {CORRIDOR_COMPARISON.map((row) => (
                  <tr key={row.project} className="border-t border-border align-top">
                    <td className="px-5 py-4 font-semibold">{row.project}</td>
                    <td className="px-5 py-4">{row.sector}</td>
                    <td className="px-5 py-4 leading-6 text-muted-foreground">
                      {row.marketSnapshot}
                    </td>
                    <td className="px-5 py-4 leading-6 text-muted-foreground">{row.rateContext}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-7 rounded-2xl surface-navy p-7">
            <p className="eyebrow">What the comparison says</p>
            <p className="mt-4 max-w-4xl leading-8 text-white/75">
              Highland Park&apos;s large 1,940 and 2,670 sq ft layouts are particularly important to
              compare on total acquisition cost, not only builder reputation. A buyer may obtain
              materially more saleable space for the same budget, making it a compelling option for
              families and investors who prioritise usable space and entry price.
            </p>
          </div>
        </section>

        <section id="plans" className="scroll-mt-24 border-y border-border bg-muted/30">
          <div className="container-page py-14 md:py-16">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Developer brochure plans
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Four layouts from 1,361 to 2,670 sq ft
              </h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                The floor plans below are reproduced from the supplied developer brochure. Areas are
                approximate and the exact sanctioned/as-built unit particulars should be matched
                with the apartment documents before a purchase decision.
              </p>
            </div>

            <div className="mt-8 grid gap-7">
              {[
                {
                  src: "/projects/ansals-highland-park/ansals-highland-park-layouts-1361-1762.webp",
                  alt: "Ansals Highland Park 1361 sq ft 2 BHK and 1762 sq ft 3 BHK brochure floor plans",
                  caption: "2 BHK - 1,361 sq ft and 3 BHK - 1,762 sq ft",
                },
                {
                  src: "/projects/ansals-highland-park/ansals-highland-park-layouts-1940-2670.webp",
                  alt: "Ansals Highland Park 1940 sq ft 3 BHK utility and 2670 sq ft large family brochure floor plans",
                  caption: "3 BHK + utility - 1,940 sq ft and 3 BHK + room + utility - 2,670 sq ft",
                },
              ].map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full bg-white object-contain"
                    width={1800}
                    height={946}
                    loading="lazy"
                  />
                  <figcaption className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                    {image.caption} · Indicative developer brochure plans.
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src="/projects/ansals-highland-park/ansals-highland-park-site-plan.webp"
                  alt="Ansals Highland Park developer brochure site plan"
                  className="aspect-square w-full bg-white object-contain"
                  width={1174}
                  height={1200}
                  loading="lazy"
                />
                <figcaption className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                  Indicative site plan from the developer brochure.
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src="/projects/ansals-highland-park/ansals-highland-park-location-map.webp"
                  alt="Historic developer brochure location map for Ansals Highland Park Sector 103 Gurgaon"
                  className="aspect-square w-full bg-white object-contain"
                  width={1161}
                  height={1200}
                  loading="lazy"
                />
                <figcaption className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                  Historic brochure map; verify current roads, transit proposals and travel times
                  independently.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="legal" className="container-page scroll-mt-24 py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Legal and technical strength
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                RERA-registered project with established bank funding support
              </h2>
              <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <div className="flex gap-3">
                  <FileCheck2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl">Official project identity is traceable</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Haryana RERA identifies Ansals Highland Park at Sector 103, Gurugram, promoter
                      Identity Buildtech Pvt. Ltd., registration GGM/322/54/2019/16 dated 1 April
                      2019. The current detail page records “Extension Certificate Uploaded”.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <a
                        href={RERA_PAGE}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline"
                      >
                        Check Haryana RERA <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                      <a
                        href={DEVELOPER_PAGE}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline"
                      >
                        View developer project page{" "}
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 leading-8 text-muted-foreground">
                The brochure states earthquake-resistant RCC framed construction with infill brick
                walls. The project&apos;s RERA identity, published structural specifications and
                acceptance for bank legal and technical appraisal support its position as a
                financeable entry-level residential option in Sector 103.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                {BUYER_CHECKS.map((row, index) => (
                  <div
                    key={row.factor}
                    className={`grid gap-2 p-5 md:grid-cols-[15rem_1fr] ${index ? "border-t border-border" : ""}`}
                  >
                    <p className="font-semibold">{row.factor}</p>
                    <p className="text-sm leading-7 text-muted-foreground">{row.action}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28 lg:self-start">
              <Scale className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl">Strong transaction support</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Shubh Estate coordinates ownership-document review, project paperwork, bank legal
                appraisal, technical valuation, home-loan processing and transaction execution for
                shortlisted Highland Park units.
              </p>
            </aside>
          </div>
        </section>

        <section id="finance" className="scroll-mt-24 border-y border-border bg-muted/30">
          <div className="container-page grid gap-10 py-14 md:py-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Home-loan planning
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Bank funding up to 90% may be available as per policy
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                Ansals Highland Park is supported by bank legal and technical appraisal processes.
                Eligible borrowers purchasing qualifying units may receive funding of up to 90% of
                the market value, in accordance with the lender&apos;s credit, valuation and
                loan-to-value policy.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  "Borrower income, obligations, credit profile and repayment capacity",
                  "Bank empanelled-lawyer approval of the exact property documents",
                  "Technical valuation of the exact tower and apartment",
                  "Applicable loan-to-value cap for the sanctioned loan slab",
                  "Own contribution plus stamp duty, registration and transaction costs",
                  "Sanction conditions and disbursement-stage documentation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-6 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="rounded-2xl surface-navy p-6 lg:self-start">
              <Landmark className="size-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl text-white">
                Ask for a funding assessment
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Share your income profile, current obligations, own contribution and preferred
                Highland Park size. We can coordinate eligibility, valuation, document review and
                lender follow-up to structure the maximum eligible home loan under bank policy.
              </p>
              <Button asChild variant="gold" className="mt-5 w-full">
                <Link to="/home-loans">Review Home-Loan Options</Link>
              </Button>
            </aside>
          </div>
        </section>

        <section id="faq" className="container-page scroll-mt-24 py-14 md:py-16">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
              Buyer questions
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Ansals Highland Park FAQ</h2>
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group p-5 open:bg-muted/20 md:p-6">
                  <summary className="cursor-pointer list-none font-semibold marker:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {faq.q}
                      <span
                        className="text-gold transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30">
          <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_23rem]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-gold">
                Plan the next step
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl md:text-4xl">
                Compare the right Highland Park unit before deciding
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
                Tell us your preferred size, budget, floor, facing, end-use or investment purpose
                and funding requirement. We can reconfirm genuine availability, compare owner asks,
                arrange a site visit and coordinate the transaction and home-loan checks.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link
                  to="/dwarka-expressway-flats-for-sale-gurgaon"
                  className="font-medium text-gold hover:underline"
                >
                  Dwarka Expressway inventory
                </Link>
                <Link
                  to="/locations/$slug"
                  params={{ slug: "dwarka-expressway" }}
                  className="font-medium text-gold hover:underline"
                >
                  Dwarka Expressway guide
                </Link>
                <Link
                  to="/blog/gurgaon-property-due-diligence-checklist-2026"
                  className="font-medium text-gold hover:underline"
                >
                  Due-diligence checklist
                </Link>
              </div>
            </div>
            <aside className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Ansals Highland Park enquiry
              </p>
              <p className="mt-2 font-display text-2xl">Request current availability</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Share your preferred configuration and whether bank funding is required.
              </p>
              <div className="mt-5">
                <EnquiryForm interest="Ansals Highland Park Sector 103 Gurgaon" compact />
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
