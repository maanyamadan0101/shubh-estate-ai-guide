import { createFileRoute, Link } from "@tanstack/react-router";
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
  Phone,
  Scale,
  School,
  ShieldCheck,
  Sparkles,
  Trees,
  Video,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/emaar-urban-oasis-sector-62";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Emaar Urban Oasis Sector 62 Resale Price & Inventory";
const description =
  "Explore verified Emaar Urban Oasis Sector 62 resale and assignment inventory around ₹20,000/sq ft all-inclusive. Compare 3 & 4 BHK units and contact for best price.";
const LAST_REVIEWED = "24 August 2026";

const EMAAR_PAGE = "https://in.emaar.com/en/properties/urban-oasis/";
const RERA_PAGE = "https://haryanarera.gov.in/view_project/project_preview_open/2518";
const RBI_PAGE = "https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=1855";
const MARKET_REPORT =
  "https://www.crematrix.com/blog/gurugrams-ultra-luxury-housing-market-hits-record-high-in-cy-2025/";
const CURRENT_LISTING = "/property/3-bhk-emaar-urban-oasis-apartment-sector-62-gurgaon";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Mr Arun Madaan, I am interested in Emaar Urban Oasis Sector 62 resale inventory around ₹20,000 per sq ft all-inclusive. Please share the best available price, tower, floor, facing, view, payment status and total acquisition cost.",
);
const WHATSAPP_URL = `${CONTACT.whatsapp}?text=${WHATSAPP_MESSAGE}`;

const QUICK_FACTS = [
  ["Resale guidance", "Around ₹20,000/sq ft*"],
  ["Indicative entry", "From approx. ₹4.25 Cr*"],
  ["Configurations", "3 BHK, 4 BHK & duplex"],
  ["Home sizes", "2,122.64–5,266.31 sq ft"],
  ["Location", "Sector 62, Golf Course Extension"],
  ["RERA", "GGM/741/473/2023/85"],
] as const;

const UNIT_COMPARISON = [
  {
    configuration: "3 BHK + 3T",
    area: "2,122.64 sq ft",
    guidance: "Around ₹20,000/sq ft all-inclusive",
    total: "Approx. ₹4.25 Cr",
  },
  {
    configuration: "4 BHK + 4T + Utility",
    area: "3,039.87 sq ft",
    guidance: "Around ₹20,000/sq ft all-inclusive",
    total: "Approx. ₹6.08 Cr",
  },
  {
    configuration: "4 BHK Duplex + 6T",
    area: "3,589.74 sq ft",
    guidance: "Around ₹20,000/sq ft all-inclusive",
    total: "Approx. ₹7.18 Cr",
  },
  {
    configuration: "Large 4 BHK + 6T Terrace",
    area: "5,266.31 sq ft",
    guidance: "Around ₹20,000/sq ft all-inclusive",
    total: "Approx. ₹10.53 Cr",
  },
] as const;

const AMENITIES = [
  {
    icon: Sparkles,
    title: "Smart-home readiness",
    text: "Ask for the unit-level automation schedule, including voice-enabled controls and installed devices, before finalising.",
  },
  {
    icon: Building2,
    title: "Low-density floor planning",
    text: "Select tower plans are designed around four residences per floor, supporting greater privacy and quieter lift lobbies.",
  },
  {
    icon: Trees,
    title: "Landscape-led living",
    text: "The master plan prioritises open landscaped areas, recreation zones and generous outdoor community space.",
  },
  {
    icon: Landmark,
    title: "Lifestyle clubhouse",
    text: "A large-format clubhouse anchors fitness, wellness, indoor recreation and social experiences for residents.",
  },
  {
    icon: ShieldCheck,
    title: "Comfort specification",
    text: "VRF air-conditioning and other specifications should be matched to the signed agreement and unit schedule.",
  },
  {
    icon: CheckCircle2,
    title: "Emaar community experience",
    text: "Residents retain access to the same project amenities and common facilities, subject to project rules and handover terms.",
  },
] as const;

const LOCATION_POINTS = [
  {
    icon: Waypoints,
    title: "Rapid Metro access",
    text: "Convenient access towards the Golf Course Road Rapid Metro corridor and Gurugram's key business districts.",
  },
  {
    icon: Building2,
    title: "Cyber City connectivity",
    text: "Golf Course Extension Road links efficiently towards Golf Course Road, Cyber City and major office clusters.",
  },
  {
    icon: School,
    title: "Established social infrastructure",
    text: "Leading schools, hospitals, retail destinations and daily conveniences are distributed across the surrounding micro-market.",
  },
] as const;

const UNIT_VALUE_DRIVERS = [
  "Tower position and access",
  "Floor height and lift-core proximity",
  "Facing, daylight and internal planning",
  "Open, green, club or city view",
  "Seller payment status and future demands",
  "Transfer timing and commercial terms",
] as const;

const BUYER_CHECKS = [
  {
    title: "Verify the ownership chain",
    text: "Review the allotment letter, buyer agreement, payment receipts and seller KYC before paying a token.",
  },
  {
    title: "Reconcile the builder ledger",
    text: "Confirm amounts already paid, outstanding demands, delayed-payment charges, transfer fees and upcoming instalments.",
  },
  {
    title: "Obtain transfer confirmation",
    text: "Check Emaar's current NOC or endorsement process, transfer eligibility and documentation for the specific allotment.",
  },
  {
    title: "Compare the total acquisition cost",
    text: "Evaluate the seller consideration together with applicable statutory charges, transfer expenses and future builder dues.",
  },
] as const;

const NRI_STEPS = [
  {
    title: "Shortlist remotely",
    text: "Receive a live inventory comparison covering tower, floor, facing, view, payment status and seller expectation.",
  },
  {
    title: "Complete legal and RERA review",
    text: "Match the selected unit with the registered project, executed documents, payment ledger and current transfer conditions.",
  },
  {
    title: "Route funds compliantly",
    text: "Eligible NRI/OCI buyers can use normal banking channels and permitted NRE, NRO or FCNR(B) accounts, subject to RBI rules and bank checks.",
  },
  {
    title: "Close with coordinated support",
    text: "Coordinate NOC, endorsement, power of attorney where required, TDS, registration and possession-stage documentation.",
  },
] as const;

const FAQS = [
  {
    q: "What is the resale price of Emaar Urban Oasis Sector 62?",
    a: "Current resale and assignment guidance is around ₹20,000 per sq ft all-inclusive. The best price varies by tower placement, floor, facing, view, payment status, seller terms and availability.",
  },
  {
    q: "What is the total price of a 3 BHK in Emaar Urban Oasis?",
    a: "At the indicative ₹20,000 per sq ft level, a 2,122.64 sq ft 3 BHK works out to approximately ₹4.25 crore. The final acquisition cost must be confirmed against the exact unit and transaction breakup.",
  },
  {
    q: "What sizes are available in Emaar Urban Oasis?",
    a: "Key layouts include approximately 2,122.64 sq ft 3 BHK homes, 3,039.87 sq ft 4 BHK homes, 3,589.74 sq ft duplex residences and select 5,266.31 sq ft large terrace residences.",
  },
  {
    q: "Is Emaar Urban Oasis RERA registered?",
    a: "Yes. The project registration referenced by Emaar and Haryana RERA is RC/REP/HARERA/GGM/741/473/2023/85, dated 7 August 2023. Buyers should review the latest authority record before committing funds.",
  },
  {
    q: "Can an NRI buy a resale or assignment unit remotely?",
    a: "Much of the shortlisting, video presentation, document review and transaction coordination can be handled remotely. NRI buyers should obtain transaction-specific tax, FEMA and power-of-attorney advice from qualified professionals.",
  },
  {
    q: "Why does the price differ between units in the same project?",
    a: "Resale pricing is unit-specific. Tower position, floor, facing, view, apartment condition, seller payment status, transfer timing and outstanding builder demands can materially change the final value.",
  },
] as const;

function SectionHeading({
  eyebrow,
  title: heading,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-navy sm:text-4xl">{heading}</h2>
      {copy ? <p className="mt-4 leading-7 text-muted-foreground">{copy}</p> : null}
    </div>
  );
}

function FeatureCard({ icon: Icon, title: cardTitle, text }: (typeof AMENITIES)[number]) {
  return (
    <article className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex size-11 items-center justify-center rounded-full bg-gold/12 text-gold">
        <Icon aria-hidden="true" className="size-5" />
      </div>
      <h3 className="mt-5 font-display text-xl text-navy">{cardTitle}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </article>
  );
}

function LocationCard({
  icon: Icon,
  title: cardTitle,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article className="border-l border-gold/50 pl-5">
      <Icon aria-hidden="true" className="size-5 text-gold" />
      <h3 className="mt-4 font-display text-xl text-white">{cardTitle}</h3>
      <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
    </article>
  );
}

export const Route = createFileRoute("/projects/emaar-urban-oasis-sector-62")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary" },
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
              name: "Emaar Urban Oasis Sector 62",
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
          name: "Emaar Urban Oasis",
          url: canonical,
          description,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sector 62, Golf Course Extension Road",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          additionalProperty: [
            { "@type": "PropertyValue", name: "Developer", value: "Emaar India" },
            {
              "@type": "PropertyValue",
              name: "RERA registration",
              value: "RC/REP/HARERA/GGM/741/473/2023/85",
            },
            {
              "@type": "PropertyValue",
              name: "Indicative resale guidance",
              value: "Around INR 20,000 per sq ft all-inclusive; unit-specific",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: EmaarUrbanOasisPage,
});

function EmaarUrbanOasisPage() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative isolate surface-navy text-white">
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_80%_15%,rgba(200,166,85,.38),transparent_28%),linear-gradient(125deg,transparent_50%,rgba(255,255,255,.035)_50%)]" />
        <div className="container-page grid min-h-[730px] items-center gap-12 py-20 lg:grid-cols-[1.08fr_.92fr] lg:py-28">
          <div className="animate-rise">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">
                Sector 62 · Golf Course Extension Road
              </Badge>
              <Badge className="border-white/15 bg-white/5 text-white/75 hover:bg-white/5">
                Independent Buyer Portal
              </Badge>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Resale · Pre-owned · Assignment inventory
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Emaar Urban Oasis
              <span className="mt-2 block text-gradient-gold">Sector 62, Gurugram</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Golf Course Extension Road has emerged as one of Gurugram's most closely watched
              luxury residential corridors, supported by improving connectivity, premium social
              infrastructure and sustained end-user demand. This specialist buyer portal helps NRIs
              and domestic HNIs evaluate high-floor, corner and preferred-view units in Emaar Urban
              Oasis with unit-level commercial clarity. Current resale and assignment guidance is
              around{" "}
              <strong className="font-semibold text-white">₹20,000 per sq ft all-inclusive</strong>.
              Exact pricing varies by tower placement, floor, facing, view, payment status and
              seller terms. Contact our advisory desk for the best currently available price.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="xl" variant="gold">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "urban_oasis_hero")}
                >
                  Contact for Best Price <MessageCircle aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="xl" variant="goldOutline">
                <a href="#inventory">
                  View Price & Inventory <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck aria-hidden="true" className="size-4 text-gold" />
              Unit-led verification · NRI remote assistance · No price guarantee
            </p>
          </div>

          <aside className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -inset-7 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-md sm:p-9">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">Current guidance</p>
                  <p className="mt-3 font-display text-4xl">₹20,000</p>
                  <p className="mt-1 text-sm text-white/60">per sq ft · all-inclusive*</p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <IndianRupee aria-hidden="true" className="size-6" />
                </div>
              </div>
              <div className="my-7 h-px bg-gradient-to-r from-gold/55 to-transparent" />
              <dl className="grid grid-cols-2 gap-5">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-white/45">3 BHK</dt>
                  <dd className="mt-1 text-lg font-medium">2,122.64 sq ft</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-white/45">4 BHK</dt>
                  <dd className="mt-1 text-lg font-medium">3,039.87 sq ft</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-white/45">
                    Indicative entry
                  </dt>
                  <dd className="mt-1 text-lg font-medium">₹4.25 Cr*</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-white/45">Inventory</dt>
                  <dd className="mt-1 text-lg font-medium">Unit-specific</dd>
                </div>
              </dl>
              <div className="mt-7 rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm font-medium">Private buyer brief includes</p>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  {[
                    "Tower, floor, facing and view",
                    "Seller payment and builder dues",
                    "Transfer process and total cost",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-gold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <nav
        aria-label="Page sections"
        className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="container-page flex gap-7 overflow-x-auto py-4 text-sm font-medium text-muted-foreground">
          {[
            ["Overview", "#overview"],
            ["Price & inventory", "#inventory"],
            ["Residences", "#residences"],
            ["Location", "#location"],
            ["NRI desk", "#nri"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="shrink-0 transition hover:text-gold">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Emaar Urban Oasis at a glance"
            title="A sharper way to evaluate a luxury resale"
            copy="Instead of treating every allotment as identical, we compare the details that materially affect value: position, floor, view, payment status, transfer eligibility and total acquisition cost."
          />
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_FACTS.map(([label, value]) => (
              <div key={label} className="bg-card p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-2 font-display text-lg text-navy">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>Information reviewed {LAST_REVIEWED}</span>
          <a
            href={EMAAR_PAGE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-gold"
          >
            Emaar project page <ExternalLink aria-hidden="true" className="size-3" />
          </a>
          <a
            href={RERA_PAGE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-gold"
          >
            Haryana RERA record <ExternalLink aria-hidden="true" className="size-3" />
          </a>
        </div>
      </section>

      <section id="inventory" className="bg-secondary/35 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Emaar Urban Oasis resale price list"
              title="Indicative configuration and acquisition values"
              copy="The working resale level is approximately ₹20,000 per sq ft all-inclusive. These calculations are orientation figures—not quotations—and live availability must be confirmed unit by unit."
            />
            <Button asChild variant="navy" size="lg">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp", "urban_oasis_inventory")}
              >
                Get Live Inventory <MessageCircle aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left">
                <thead className="surface-navy text-white">
                  <tr className="text-xs uppercase tracking-wider text-white/65">
                    <th className="px-6 py-4 font-medium">Configuration</th>
                    <th className="px-6 py-4 font-medium">Approx. area</th>
                    <th className="px-6 py-4 font-medium">Resale guidance</th>
                    <th className="px-6 py-4 font-medium">Indicative total*</th>
                    <th className="px-6 py-4 font-medium">Live quote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {UNIT_COMPARISON.map((unit) => (
                    <tr key={unit.configuration} className="transition hover:bg-secondary/30">
                      <td className="px-6 py-5 font-medium text-navy">{unit.configuration}</td>
                      <td className="px-6 py-5 text-sm text-muted-foreground">{unit.area}</td>
                      <td className="px-6 py-5 text-sm text-muted-foreground">{unit.guidance}</td>
                      <td className="px-6 py-5 font-display text-lg text-navy">{unit.total}</td>
                      <td className="px-6 py-5">
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => trackContact("whatsapp", "urban_oasis_table")}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline"
                        >
                          Contact for Best Price{" "}
                          <ArrowRight aria-hidden="true" className="size-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-border px-6 py-4 text-xs leading-5 text-muted-foreground">
              *Indicative arithmetic at approximately ₹20,000 per sq ft. “All-inclusive” scope,
              taxes, transfer or statutory costs, future demands and the final commercial breakup
              must be confirmed for the specific unit. Price and availability can change without
              notice.
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-xl text-navy">
                A verified 3 BHK listing is currently published
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Review the unit snapshot, then ask us to compare it with live off-market options.
              </p>
            </div>
            <Button asChild variant="gold" className="shrink-0">
              <a href={CURRENT_LISTING}>
                View Current Listing <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Market context"
              title="Why Golf Course Extension Road commands investor attention"
              copy="The corridor is no longer an emerging address alone. It is now a luxury residential market supported by established employment centres, new premium supply and an increasingly discerning end-user base."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border p-5">
                <p className="font-display text-3xl text-gold">₹3,319 Cr</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  reported 2025 ultra-luxury transaction value on Golf Course Extension Road
                </p>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <p className="font-display text-3xl text-gold">379%</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  reported year-on-year increase in transaction value
                </p>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <p className="font-display text-3xl text-gold">Prime</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  connectivity to Golf Course Road, business districts and social infrastructure
                </p>
              </div>
            </div>
            <a
              href={MARKET_REPORT}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gold"
            >
              Source: CRE Matrix, CY 2025 Gurugram ultra-luxury report{" "}
              <ExternalLink aria-hidden="true" className="size-3" />
            </a>
          </div>
          <aside className="rounded-3xl surface-navy p-8 text-white sm:p-10">
            <p className="eyebrow">Unit-level pricing logic</p>
            <h3 className="mt-3 font-display text-3xl">
              Why one Urban Oasis home can price differently from another
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Resale values are negotiated between buyer and seller. The decisive comparison is the
              complete commercial and physical profile—not only the headline rate.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {UNIT_VALUE_DRIVERS.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-white/75">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="residences" className="border-y border-border bg-secondary/25 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Architecture & smart living"
            title="Large-format residences, privacy and connected comfort"
            copy="Urban Oasis combines expansive apartment planning with a landscape- and amenity-led residential experience. Specifications must always be verified against the agreement for the exact unit."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="surface-navy py-16 text-white sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">Sector 62 micro-market</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Connected to the places that shape Gurugram's luxury economy
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-white/65">
              The address sits on the Golf Course Extension corridor with practical access towards
              Golf Course Road, Rapid Metro links, business districts, premium schools, healthcare
              and destination retail.
            </p>
            <Button asChild variant="gold" className="mt-8">
              <Link to="/locations/golf-course-extension-road">
                Explore the Location Guide <MapPin aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {LOCATION_POINTS.map((item) => (
              <LocationCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Resale & assignment due diligence"
              title="The buyer checks that protect the transaction"
              copy="The apartment and its transfer history deserve the same scrutiny as the project itself. Our comparison brief is built around these four controls."
            />
            <div className="mt-8 space-y-4">
              {BUYER_CHECKS.map((item, index) => (
                <article
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-border p-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/12 font-display text-gold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-9">
            <div className="flex items-center gap-3">
              <FileCheck2 aria-hidden="true" className="size-6 text-gold" />
              <p className="eyebrow">Private acquisition brief</p>
            </div>
            <h3 className="mt-4 font-display text-3xl text-navy">
              Download complete inventory & floor plan PDF
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Tell us your preferred configuration, budget, floor band and view. We will share the
              most relevant live options and available plans directly.
            </p>
            <div className="mt-7">
              <EnquiryForm interest="Emaar Urban Oasis inventory and floor plan PDF" compact />
            </div>
          </aside>
        </div>
      </section>

      <section id="nri" className="bg-secondary/35 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <div className="flex size-12 items-center justify-center rounded-full bg-gold/12 text-gold">
                <Globe2 aria-hidden="true" className="size-6" />
              </div>
              <SectionHeading
                eyebrow="Dedicated NRI desk"
                title="A clear framework for overseas buyers"
                copy="From UAE and GCC time zones to the US, UK and Singapore, we coordinate shortlisting and transaction follow-up around the buyer's location."
              />
              <Button asChild variant="gold" size="lg" className="mt-7">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "urban_oasis_nri")}
                >
                  Connect on WhatsApp <MessageCircle aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {NRI_STEPS.map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-border bg-card p-6">
                  <span className="text-xs font-semibold uppercase tracking-[.2em] text-gold">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-background p-6 text-sm md:grid-cols-3">
            <p className="flex gap-3">
              <Scale aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                <strong className="block text-navy">RERA reference</strong>
                <span className="text-muted-foreground">GGM/741/473/2023/85</span>
              </span>
            </p>
            <p className="flex gap-3">
              <Landmark aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                <strong className="block text-navy">Builder process</strong>
                <span className="text-muted-foreground">
                  NOC or endorsement to be confirmed unit-wise
                </span>
              </span>
            </p>
            <a
              href={RBI_PAGE}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 hover:text-gold"
            >
              <IndianRupee aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                <strong className="block text-navy">RBI framework</strong>
                <span className="text-muted-foreground">
                  NRE/NRO/FCNR(B) and banking-channel guidance
                </span>
              </span>
            </a>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Legal, tax and FEMA treatment depends on the parties and transaction. Obtain advice from
            qualified professionals before remitting funds or executing documents.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid overflow-hidden rounded-3xl border border-border lg:grid-cols-[1.1fr_.9fr]">
          <div className="surface-navy p-8 text-white sm:p-12">
            <Video aria-hidden="true" className="size-8 text-gold" />
            <p className="mt-7 eyebrow">Remote property inspection</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight sm:text-4xl">
              Request a private virtual video walkthrough
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/65">
              See the exact apartment, approach, tower lobby, floor, view and internal condition on
              a live guided call before you travel or appoint a representative.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp", "urban_oasis_walkthrough")}
              >
                Book Virtual Walkthrough <Video aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="bg-gold/8 p-8 sm:p-12">
            <p className="eyebrow">Your walkthrough checklist</p>
            <ul className="mt-6 space-y-4">
              {[
                "Tower approach and arrival experience",
                "Lift lobby and floor density",
                "Daylight, orientation and view",
                "Room proportions and specification",
                "Site progress and surrounding context",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="border-y border-border bg-secondary/25 py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Buyer questions"
            title="Emaar Urban Oasis Sector 62 FAQ"
            copy="Straight answers based on current guidance and public project records."
          />
          <div className="space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none pr-8 font-display text-lg text-navy marker:content-none">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="rounded-[2rem] surface-navy px-7 py-12 text-center text-white sm:px-12">
          <p className="eyebrow">Private buyer representation</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
            Find the right Urban Oasis unit—not just an available one
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/65">
            Share your preferred configuration, floor, view and purchase timeline. We will compare
            live resale and assignment options and return with the best available price.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp", "urban_oasis_final")}
              >
                Contact for Best Price <MessageCircle aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="goldOutline" size="xl">
              <a
                href={CONTACT.phoneHref}
                onClick={() => trackContact("phone", "urban_oasis_final")}
              >
                Call {CONTACT.phone} <Phone aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 text-xs leading-6 text-muted-foreground">
        <div className="border-t border-border pt-6">
          <p>
            <strong className="text-foreground">Portal identity:</strong> This is an independent
            buyer advisory page operated by {CONTACT.name}. It is not the official Emaar website and
            does not claim affiliation with Emaar India. Project names and marks belong to their
            respective owners.
          </p>
          <p className="mt-2">
            Pricing is indicative, seller-led and subject to unit availability, documentation,
            builder confirmation and negotiation. Buyers should independently verify measurements,
            specifications, approvals, RERA disclosures and all financial terms.
          </p>
        </div>
      </section>
    </main>
  );
}
