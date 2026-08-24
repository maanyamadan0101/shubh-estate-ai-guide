import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Gauge,
  IndianRupee,
  Landmark,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Trees,
  UtensilsCrossed,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/dlf-the-arbour-sector-63-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "DLF The Arbour Sector 63 Gurgaon | 4 BHK Price & Resale";
const description =
  "Explore DLF The Arbour Sector 63 Gurgaon: 4 BHK + utility homes, current resale prices, floor plans, amenities and verified inventory with Shubh Estate.";
const LAST_REVIEWED = "24 August 2026";

const DLF_COMPLIANCE_PAGE = "https://www.dlf.in/homes/luxury/thearbour/compliance";
const RERA_PAGE = "https://haryanarera.gov.in/view_project/project_preview_open/2076";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Mr Arun Madaan, I am interested in a resale or permitted transfer apartment at DLF The Arbour, Sector 63 Gurgaon. Please share current verified units with tower, floor, facing, view, payment status and complete acquisition cost.",
);
const WHATSAPP_URL = `${CONTACT.whatsapp}?text=${WHATSAPP_MESSAGE}`;

const QUICK_FACTS = [
  ["Configuration", "4 BHK + utility"],
  ["Approx. size", "3,950–3,956 sq ft"],
  ["Development", "5 towers · 1,137 residences"],
  ["Project area", "25.087 acres"],
  ["RERA completion", "31 March 2030"],
  ["Registration", "GGM/671/403/2023/15"],
] as const;

const RESIDENCE_FEATURES: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: Gauge,
    title: "Low-density lift core",
    text: "Two apartments per residential core share three dedicated high-speed elevators, supporting privacy and efficient movement.",
  },
  {
    icon: Sparkles,
    title: "Grand proportions",
    text: "Published project positioning includes approximately 3.4-metre floor-to-floor height and a large-format four-bedroom plan.",
  },
  {
    icon: Trees,
    title: "Deep party decks",
    text: "Approximately 2.9-metre-deep decks extend the living experience and create meaningful outdoor entertaining space.",
  },
  {
    icon: Building2,
    title: "Majestic tower arrival",
    text: "Air-conditioned entrance lobbies of approximately 3,600 sq ft create a premium double-height arrival experience.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fitted kitchen specification",
    text: "Modular kitchen cabinetry and selected appliances form part of published specifications; verify the exact contractual schedule.",
  },
  {
    icon: Zap,
    title: "Parking and EV provision",
    text: "The project has been marketed with three basement parking spaces per residence and provision for electric-vehicle charging.",
  },
];

const CLUB_FEATURES = [
  {
    icon: Waves,
    title: "Aquatic & wellness",
    text: "Temperature-controlled pool and wellness-led spaces.",
  },
  {
    icon: Landmark,
    title: "Social experiences",
    text: "Dining, lounge and celebration areas for residents.",
  },
  {
    icon: Trees,
    title: "Outdoor recreation",
    text: "Landscape, walking and activity zones across the community.",
  },
] as const;

const VALUE_DRIVERS = [
  "Tower and residential core",
  "Floor band and lift access",
  "Facing, daylight and view",
  "Amount paid to the developer",
  "Balance construction-linked demands",
  "Transfer timing and seller terms",
] as const;

const BUYER_CHECKS = [
  {
    title: "Match the exact allotment",
    text: "Confirm tower, floor, unit number, super area, orientation, sanctioned layout and apartment-specific entitlements before paying a token.",
  },
  {
    title: "Review the ownership documents",
    text: "Examine the original allotment letter, buyer agreement, seller KYC, payment receipts and any endorsements in the ownership chain.",
  },
  {
    title: "Reconcile the developer ledger",
    text: "Check the amount already paid, future demands, delayed-payment charges, transfer fees and any other outstanding amount.",
  },
  {
    title: "Confirm transfer eligibility",
    text: "Obtain the current DLF process, required NOC or endorsement, applicable charges and execution timeline for the selected apartment.",
  },
  {
    title: "Compare the complete cost",
    text: "Evaluate seller consideration together with future builder dues, transfer expenses, taxes, stamp duty, registration and funding cost.",
  },
] as const;

const FAQS = [
  {
    q: "What is the current price of DLF The Arbour Sector 63?",
    a: "Indicative resale asking prices begin around ₹8.50 crore and can exceed ₹10 crore. The executable price depends on the tower, floor, view, payment position, transfer timing, seller expectation and live availability.",
  },
  {
    q: "Is direct developer inventory available in DLF The Arbour?",
    a: "DLF's official compliance page shows all 1,137 four-bedroom residences as allotted. Current opportunities should therefore be evaluated as resale or permitted transfer inventory, subject to project rules and documentation.",
  },
  {
    q: "What apartment configuration and size are available?",
    a: "The project offers large-format 4 BHK + utility residences measuring approximately 3,950 to 3,956 sq ft. The exact area must be matched to the selected allotment and executed documents.",
  },
  {
    q: "What is the RERA registration number of DLF The Arbour?",
    a: "The Haryana RERA registration is RC/REP/HARERA/GGM/671/403/2023/15, dated 23 January 2023. The authority record identifies the project originally as The Sixty Three and records its name change to The Arbour.",
  },
  {
    q: "When is DLF The Arbour expected to be completed?",
    a: "The Haryana RERA project record states a likely completion date of 31 March 2030. Apartment handover remains subject to construction progress, approvals and the buyer's contractual terms.",
  },
  {
    q: "Can an NRI buy a resale apartment in DLF The Arbour remotely?",
    a: "Shortlisting, live video inspection, document collection, payment-ledger review and loan coordination can largely be managed remotely. Transaction-specific FEMA, tax and power-of-attorney advice should be obtained from qualified professionals.",
  },
];

function SectionHeading({
  eyebrow,
  heading,
  copy,
}: {
  eyebrow: string;
  heading: string;
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

export const Route = createFileRoute("/projects/dlf-the-arbour-sector-63-gurgaon")({
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
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
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
                  name: "DLF The Arbour Sector 63",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "ApartmentComplex",
              "@id": `${canonical}#project`,
              name: "DLF The Arbour",
              url: canonical,
              description,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sector 63, Golf Course Extension Road",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                postalCode: "122102",
                addressCountry: "IN",
              },
              numberOfAccommodationUnits: 1137,
              additionalProperty: [
                {
                  "@type": "PropertyValue",
                  name: "Developer",
                  value: "DLF Home Developers Limited",
                },
                { "@type": "PropertyValue", name: "Configuration", value: "4 BHK plus utility" },
                {
                  "@type": "PropertyValue",
                  name: "Approximate size",
                  value: "3,950 to 3,956 sq ft",
                },
                {
                  "@type": "PropertyValue",
                  name: "RERA registration",
                  value: "GGM/671/403/2023/15",
                },
                { "@type": "PropertyValue", name: "RERA completion", value: "31 March 2030" },
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
  component: DLFTheArbourPage,
});

function DLFTheArbourPage() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative isolate border-b border-border surface-navy text-white">
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_82%_15%,rgba(200,166,85,.42),transparent_28%),linear-gradient(125deg,transparent_52%,rgba(255,255,255,.04)_52%)]" />
        <div className="container-page py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60">
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link to="/projects" className="hover:text-gold">
              Projects
            </Link>
            <span className="px-2">/</span>
            <span className="text-white">DLF The Arbour</span>
          </nav>

          <div className="mt-9 grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">
                  Verified resale & transfer guide
                </Badge>
                <Badge className="border-white/15 bg-white/5 text-white/75 hover:bg-white/5">
                  Independent buyer advisory
                </Badge>
              </div>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Sector 63 · Golf Course Extension Road · Gurgaon
              </p>
              <h1 className="mt-4 max-w-5xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                DLF The Arbour
                <span className="mt-2 block text-gradient-gold">4 BHK ultra-luxury residences</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                Compare large-format 4 BHK + utility residences by exact tower, floor, view, payment
                status and transfer terms. Indicative resale asking prices begin around{" "}
                <strong className="font-semibold text-white">₹8.50 crore</strong> and can exceed ₹10
                crore. Contact Shubh Estate Brokers for the best currently available unit and a
                complete acquisition-cost breakup.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="xl" variant="gold">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "dlf_arbour_hero")}
                  >
                    Check Current Inventory <MessageCircle aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="xl" variant="goldOutline">
                  <a href="#price-guide">
                    View Price & Buyer Guide <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-white/50">
                <ShieldCheck aria-hidden="true" className="size-4 text-gold" />
                Resale and permitted transfer inventory only · Exact details verified unit by unit
              </p>
            </div>

            <aside className="rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">
                Indicative resale entry
              </p>
              <p className="mt-3 font-display text-4xl">₹8.50 Cr onwards*</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Exact asking price varies by the selected allotment
              </p>
              <div className="my-6 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <dl className="grid grid-cols-2 gap-5 text-sm">
                <div>
                  <dt className="text-white/45">Configuration</dt>
                  <dd className="mt-1 font-medium">4 BHK + utility</dd>
                </div>
                <div>
                  <dt className="text-white/45">Approx. size</dt>
                  <dd className="mt-1 font-medium">3,950–3,956 sq ft</dd>
                </div>
                <div>
                  <dt className="text-white/45">Residences</dt>
                  <dd className="mt-1 font-medium">1,137</dd>
                </div>
                <div>
                  <dt className="text-white/45">RERA completion</dt>
                  <dd className="mt-1 font-medium">31 Mar 2030</dd>
                </div>
              </dl>
              <p className="mt-6 text-xs leading-5 text-white/45">
                *Not a live-stock or price guarantee. Updated {LAST_REVIEWED}.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <nav
        aria-label="Page sections"
        className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="container-page flex gap-7 overflow-x-auto py-4 text-sm font-medium text-muted-foreground">
          {[
            ["Overview", "#overview"],
            ["Price", "#price-guide"],
            ["Residences", "#residences"],
            ["Clubhouse", "#clubhouse"],
            ["Location", "#location"],
            ["Buyer checks", "#buyer-checks"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="shrink-0 transition hover:text-gold">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <SectionHeading
            eyebrow="DLF The Arbour at a glance"
            heading="Five towers planned around privacy, space and a grand arrival"
            copy="The official project disclosures identify 25.087 acres, five residential towers and 1,137 four-bedroom residences. The development is under construction and the Haryana RERA record states a likely completion date of 31 March 2030."
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
            href={DLF_COMPLIANCE_PAGE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-gold"
          >
            DLF compliance page <ExternalLink aria-hidden="true" className="size-3" />
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

      <section id="price-guide" className="border-y border-border bg-muted/35">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem]">
            <div>
              <SectionHeading
                eyebrow="DLF The Arbour resale price"
                heading="Compare the exact allotment—not only the headline rate"
                copy="All residences are shown as allotted on DLF's compliance page. Current opportunities should therefore be assessed as resale or permitted transfer transactions with unit-specific commercial terms."
              />
              <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead className="surface-navy text-white">
                      <tr className="text-xs uppercase tracking-wider text-white/65">
                        <th className="px-6 py-4 font-medium">Configuration</th>
                        <th className="px-6 py-4 font-medium">Approx. size</th>
                        <th className="px-6 py-4 font-medium">Price context</th>
                        <th className="px-6 py-4 font-medium">Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-6 font-medium text-navy">4 BHK + utility</td>
                        <td className="px-6 py-6 text-sm text-muted-foreground">
                          3,950–3,956 sq ft
                        </td>
                        <td className="px-6 py-6 font-display text-lg text-navy">
                          ₹8.50 Cr onwards*
                        </td>
                        <td className="px-6 py-6">
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => trackContact("whatsapp", "dlf_arbour_price_table")}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline"
                          >
                            Request live options{" "}
                            <ArrowRight aria-hidden="true" className="size-4" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="border-t border-border px-6 py-4 text-xs leading-5 text-muted-foreground">
                  *Indicative asking-price context. Selected units may be priced above ₹10 crore.
                  Confirm seller consideration, paid amount, future demands, transfer charges, taxes
                  and statutory costs for the exact apartment.
                </p>
              </div>
            </div>

            <aside className="h-fit rounded-3xl surface-navy p-7 text-white lg:sticky lg:top-24">
              <IndianRupee aria-hidden="true" className="size-7 text-gold" />
              <h3 className="mt-5 font-display text-2xl">What changes the price?</h3>
              <ul className="mt-6 space-y-3">
                {VALUE_DRIVERS.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/70">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section id="residences" className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Architecture & apartment planning"
          heading="Large-format homes designed for privacy and entertaining"
          copy="Published project features should be matched to the agreement and specification schedule for the selected allotment. The guide below explains the principal planning advantages buyers are likely to compare."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESIDENCE_FEATURES.map(({ icon: Icon, title: featureTitle, text }) => (
            <article
              key={featureTitle}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-gold/12 text-gold">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl text-navy">{featureTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="clubhouse" className="surface-navy py-16 text-white md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="eyebrow">Approximately 1.25 lakh sq ft</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              A clubhouse conceived as the social heart of the community
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-white/65">
              The planned clubhouse brings recreation, fitness, wellness, dining and resident
              experiences together at a scale suited to an ultra-luxury community. Confirm the
              latest amenity schedule and operating terms from the project documents.
            </p>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {CLUB_FEATURES.map(({ icon: Icon, title: featureTitle, text }) => (
              <article key={featureTitle} className="border-l border-gold/50 pl-5">
                <Icon aria-hidden="true" className="size-5 text-gold" />
                <h3 className="mt-4 font-display text-xl">{featureTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.9fr)] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Sector 63, Golf Course Extension Road"
              heading="Connected to Gurgaon's premium residential and business corridor"
              copy="Sector 63 provides practical access towards Golf Course Road, Southern Peripheral Road, Sohna Road and NH-48, together with nearby schools, hospitals, destination retail and office districts. Actual travel time varies by route and traffic."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold">
                <Link to="/locations/golf-course-extension-road">
                  Explore Corridor Guide <MapPin aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="goldOutline">
                <Link to="/projects/dlf-the-primus-sector-82a-gurgaon">
                  Compare Ready-to-Move DLF Primus <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-lg">
            <iframe
              title="Map showing DLF The Arbour, Sector 63, Gurugram"
              src="https://www.google.com/maps?q=DLF+The+Arbour+Sector+63+Gurugram&output=embed"
              className="min-h-[430px] w-full rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="buyer-checks" className="border-y border-border bg-muted/35">
        <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <SectionHeading
              eyebrow="Banking-grade transfer review"
              heading="Five checks before you commit funds"
              copy="An under-construction resale requires a simultaneous review of the apartment, the seller's allotment and the remaining developer obligations."
            />
            <div className="mt-8 grid gap-4">
              {BUYER_CHECKS.map((check, index) => (
                <article
                  key={check.title}
                  className="flex gap-5 rounded-2xl border border-border bg-card p-6"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/12 text-sm font-semibold text-gold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-navy">{check.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{check.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-gold/30 bg-gold/5 p-6 lg:sticky lg:top-24">
            <Scale aria-hidden="true" className="size-6 text-gold" />
            <h3 className="mt-4 font-display text-2xl text-navy">Independent buyer comparison</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Shubh Estate Brokers compares unit-level price, documentation, payment position,
              transfer process and funding rather than treating every Arbour apartment as identical.
            </p>
            <Button asChild variant="navy" className="mt-6 w-full">
              <Link to="/blog/gurgaon-property-due-diligence-checklist-2026">
                Open Due-Diligence Guide <FileCheck2 aria-hidden="true" />
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      <section id="faq" className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Buyer questions"
          heading="DLF The Arbour frequently asked questions"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-border bg-card p-6">
              <summary className="cursor-pointer list-none pr-6 font-display text-lg text-navy">
                {faq.q}
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="enquire" className="border-t border-border bg-muted/35">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 rounded-[2rem] border border-border bg-card p-7 shadow-sm md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(330px,.72fr)]">
            <div>
              <Badge className="border-gold/30 bg-gold/10 text-gold hover:bg-gold/10">
                Shubh Estate Brokers · Luxury Resale Desk
              </Badge>
              <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-navy sm:text-4xl">
                Request current DLF The Arbour resale inventory
              </h2>
              <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
                Share your preferred floor, view, budget and purchase purpose. We will compare the
                currently represented options and provide exact unit-level details and total cost.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" variant="gold">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "dlf_arbour_cta")}
                  >
                    <MessageCircle aria-hidden="true" /> WhatsApp Arun Madaan
                  </a>
                </Button>
                <Button asChild size="lg" variant="goldOutline">
                  <a
                    href={CONTACT.phoneHref}
                    onClick={() => trackContact("phone", "dlf_arbour_cta")}
                  >
                    <Phone aria-hidden="true" /> {CONTACT.phone}
                  </a>
                </Button>
              </div>
              <div className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <p className="flex gap-2">
                  <FileCheck2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  Document and payment-ledger review
                </p>
                <p className="flex gap-2">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  Loan and valuation coordination
                </p>
              </div>
            </div>
            <EnquiryForm interest="DLF The Arbour verified resale inventory" compact />
          </div>
        </div>
      </section>
    </main>
  );
}
