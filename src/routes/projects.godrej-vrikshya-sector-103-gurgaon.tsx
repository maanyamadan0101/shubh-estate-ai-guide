import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Trees,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/godrej-vrikshya-sector-103-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Godrej Vrikshya Sector 103 Gurgaon | Price, RERA & Resale";
const description =
  "Godrej Vrikshya Sector 103 Gurgaon guide: official price, RERA GGM/846/578/2024/73, June 2031 possession, 3 & 4 BHK, 1948 sq ft resale and Dwarka Expressway connectivity.";
const GODREJ_PAGE = "https://www.godrejproperties.com/gurugram/residential/godrej-vrikshya";
const GODREJ_AMENITIES =
  "https://www.godrejproperties.com/gurugram/residential/godrej-vrikshya/amenities";
const RERA_PAGE = "https://haryanarera.gov.in/view_project/searchprojectDetail/2950";
const RERA_NUMBER = "GGM/846/578/2024/73";
const WA = `${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hello Mr Arun Madaan, I am interested in Godrej Vrikshya Sector 103 Gurugram. Please share current 3 BHK / 1948 sq ft resale inventory, tower, floor, facing, payment status and best available price.",
)}`;

const FACTS = [
  ["Developer", "Godrej Properties / Godrej Vestamark LLP"],
  ["Location", "Sector 103, Gurugram"],
  ["Configuration", "3 & 4 BHK"],
  ["Official starting price", "₹3.81 Cr onwards*"],
  ["Official possession", "June 2031"],
  ["Haryana RERA", RERA_NUMBER],
] as const;

const AMENITIES = [
  ["Infinity pool", "Olympic-length infinity pool overlooking the central greenspace."],
  ["Temperature-controlled pool", "Covered temperature-controlled pool listed by Godrej Properties."],
  ["Sports", "Squash court and skating rink are part of the official amenity programme."],
  ["Recreation", "Silent cinema and other lifestyle spaces are highlighted by the developer."],
] as const;

const RESALE_SNAPSHOT = [
  ["Housing.com", "1,948 sq ft", "₹3.72 Cr", "₹19.1K/sq ft"],
  ["SquareYards", "1,948 sq ft", "₹3.74–₹3.75 Cr", "Indicative resale asks"],
  ["MagicBricks", "1,948 sq ft", "₹3.75–₹4.00 Cr", "Multiple resale asks"],
] as const;

const FAQS = [
  [
    "What is the official starting price of Godrej Vrikshya?",
    "Godrej Properties currently displays Godrej Vrikshya from ₹3.81 Cr onwards. The final cost depends on configuration, floor, PLC, taxes, payment plan and availability, so the exact cost sheet should be reconfirmed before booking.",
  ],
  [
    "Is Godrej Vrikshya RERA registered?",
    `Yes. The project is registered with Haryana RERA under ${RERA_NUMBER}, dated 1 July 2024. Buyers should still verify the exact tower, unit and agreement details against the current authority record.`,
  ],
  [
    "What is the possession timeline?",
    "Godrej Properties currently displays June 2031 as the project possession timeline. The agreement for sale and RERA record for the exact phase and tower remain controlling.",
  ],
  [
    "Is 1,948 sq ft an official RERA carpet area?",
    "No. 1,948 sq ft is commonly used as a saleable, super-area or built-up label in online resale listings. RERA carpet area is a separate measurement. Verify the exact unit's allotment letter, agreement for sale and RERA documents before comparing price per sq ft.",
  ],
  [
    "What are current online asking prices for a 1,948 sq ft 3 BHK?",
    "A market snapshot reviewed on 18 September 2026 found online asking references around ₹3.72 Cr to ₹4.00 Cr for 1,948 sq ft listings. These are advertisements, not registered transaction prices, and may change or duplicate the same inventory.",
  ],
] as const;

function Heading({ eyebrow, title: h, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-navy sm:text-4xl">{h}</h2>
      {copy ? <p className="mt-4 leading-7 text-muted-foreground">{copy}</p> : null}
    </div>
  );
}

export const Route = createFileRoute("/projects/godrej-vrikshya-sector-103-gurgaon")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large,max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: `${SITE_ORIGIN}/shubh-estate-logo.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${SITE_ORIGIN}/shubh-estate-logo.png` },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ApartmentComplex",
              name: "Godrej Vrikshya",
              url: canonical,
              description,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sector 103, Dwarka Expressway",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              additionalProperty: [
                { "@type": "PropertyValue", name: "Developer", value: "Godrej Properties" },
                { "@type": "PropertyValue", name: "RERA", value: RERA_NUMBER },
                { "@type": "PropertyValue", name: "Configuration", value: "3 & 4 BHK" },
                { "@type": "PropertyValue", name: "Possession", value: "June 2031" },
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_ORIGIN}/projects` },
                { "@type": "ListItem", position: 3, name: "Godrej Vrikshya", item: canonical },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="surface-navy text-white">
        <div className="container-page grid min-h-[650px] items-center gap-12 py-20 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-white/55">
              <Link to="/">Home</Link>
              <span className="px-2">/</span>
              <Link to="/projects">Projects</Link>
              <span className="px-2">/</span>
              <span>Godrej Vrikshya</span>
            </nav>
            <div className="mt-7 flex flex-wrap gap-2">
              <Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">
                Sector 103 · Dwarka Expressway
              </Badge>
              <Badge className="border-white/15 bg-white/5 text-white/75 hover:bg-white/5">
                RERA verified project reference
              </Badge>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              3 & 4 BHK · New booking & resale research
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Godrej Vrikshya
              <span className="mt-2 block text-gradient-gold">Sector 103, Gurugram</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              A research-first guide to Godrej Vrikshya with official developer and Haryana RERA
              references, current online resale signals, and a clear distinction between saleable
              area and RERA carpet area. Godrej currently displays <strong className="text-white">₹3.81 Cr onwards*</strong> and <strong className="text-white">June 2031</strong> possession.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" variant="gold">
                <a
                  href={WA}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "godrej_vrikshya_hero")}
                >
                  Get Current Inventory <MessageCircle />
                </a>
              </Button>
              <Button asChild size="xl" variant="goldOutline">
                <a href="#price">Check 1,948 Sq Ft Market <ArrowRight /></a>
              </Button>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-6 shadow-2xl backdrop-blur sm:p-8">
            <div className="flex items-center gap-3">
              <Trees className="size-8 text-gold" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Verified project snapshot</p>
                <p className="font-display text-2xl">Godrej Vrikshya</p>
              </div>
            </div>
            <dl className="mt-7 space-y-4">
              {FACTS.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-5 border-b border-white/10 pb-4">
                  <dt className="text-sm text-white/55">{label}</dt>
                  <dd className="max-w-[58%] text-right text-sm font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-5 text-white/50">
              *Developer pricing and availability can change. Exact cost sheet, tower, floor, PLC,
              taxes and payment schedule should be reconfirmed.
            </p>
          </aside>
        </div>
      </section>

      <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur" aria-label="Page sections">
        <div className="container-page flex gap-7 overflow-x-auto py-4 text-sm font-medium text-muted-foreground">
          {[
            ["Overview", "#overview"],
            ["1,948 sq ft price", "#price"],
            ["Amenities", "#amenities"],
            ["Connectivity", "#connectivity"],
            ["Due diligence", "#due-diligence"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="shrink-0 hover:text-gold">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="container-page py-16 sm:py-20">
        <Heading
          eyebrow="Project overview"
          title="Official facts first, market claims second"
          copy="The page separates facts published by Godrej Properties and Haryana RERA from resale advertisements. This matters because online portals can use different area labels, possession dates and duplicate inventory."
        />
        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map(([label, value]) => (
            <div key={label} className="bg-card p-5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
              <dd className="mt-2 font-display text-lg text-navy">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-7 flex flex-wrap gap-4 text-sm">
          <a href={GODREJ_PAGE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline">
            Official Godrej project page <ExternalLink className="size-4" />
          </a>
          <a href={RERA_PAGE} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-gold hover:underline">
            Haryana RERA record <ExternalLink className="size-4" />
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Research reviewed 18 September 2026.</p>
      </section>

      <section id="price" className="border-y border-border bg-secondary/25 py-16 sm:py-20">
        <div className="container-page">
          <Heading
            eyebrow="1,948 sq ft resale snapshot"
            title="Current online asking prices are not the same as transaction prices"
            copy="For the widely advertised 1,948 sq ft 3 BHK, multiple portals currently show asking references in the mid-₹3 crore range. Treat this as negotiation intelligence—not proof of a completed sale."
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-[1fr_.9fr_.9fr] gap-3 border-b border-border bg-muted/40 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-4">
              <span>Source</span><span>Area label</span><span>Asking</span><span className="hidden sm:block">Reference</span>
            </div>
            {RESALE_SNAPSHOT.map(([source, area, asking, reference]) => (
              <div key={source} className="grid grid-cols-[1fr_.9fr_.9fr] gap-3 border-b border-border px-5 py-4 text-sm last:border-0 sm:grid-cols-4">
                <span className="font-medium text-navy">{source}</span><span>{area}</span><span className="font-semibold">{asking}</span><span className="hidden text-muted-foreground sm:block">{reference}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
            <strong>Area caution:</strong> 1,948 sq ft is an online saleable/super-area label in these
            advertisements. Do not equate it with RERA carpet area. Compare the exact allotment
            letter, agreement for sale, carpet area, balcony/exclusive area, payment status and
            remaining builder demands before calculating the effective price.
          </div>
          <div className="mt-7 flex flex-wrap gap-4">
            <Button asChild variant="gold">
              <a href={WA} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "godrej_vrikshya_price")}>Ask for Verified 1,948 Sq Ft Inventory <MessageCircle /></a>
            </Button>
            <Button asChild variant="outline"><Link to="/haryana-stamp-duty-registration-calculator">Estimate Stamp Duty</Link></Button>
          </div>
        </div>
      </section>

      <section id="amenities" className="container-page py-16 sm:py-20">
        <Heading
          eyebrow="Lifestyle amenities"
          title="Amenities verified from Godrej's official project material"
          copy="Rather than a generic amenities checklist, these are facilities currently highlighted by the developer for Godrej Vrikshya."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map(([name, body]) => (
            <article key={name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <ShieldCheck className="size-6 text-gold" />
              <h3 className="mt-5 font-display text-xl text-navy">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
        <a href={GODREJ_AMENITIES} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:underline">
          View official Godrej amenities <ExternalLink className="size-4" />
        </a>
      </section>

      <section id="connectivity" className="border-y border-border bg-secondary/25 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <MapPin className="size-8 text-gold" />
            <Heading
              eyebrow="Sector 103"
              title="Dwarka Expressway location context"
              copy="Sector 103 sits in the Dwarka Expressway micro-market. For a purchase decision, compare the project with the corridor as a whole instead of relying on a single project's marketing travel times."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/dwarka-expressway-flats-for-sale-gurgaon" className="rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50">
              <Building2 className="size-6 text-gold" />
              <h3 className="mt-4 font-display text-xl text-navy">Dwarka Expressway flats for sale</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Compare current inventory and projects across the corridor.</p>
            </Link>
            <Link to="/locations/dwarka-expressway" className="rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50">
              <MapPin className="size-6 text-gold" />
              <h3 className="mt-4 font-display text-xl text-navy">Dwarka Expressway location guide</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Review the wider location, connectivity and property context.</p>
            </Link>
            <Link to="/projects/aipl-riviera-resale-sector-103-gurgaon" className="rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50">
              <h3 className="font-display text-xl text-navy">Compare AIPL Riviera, Sector 103</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Another Sector 103 under-construction option for a unit-level comparison.</p>
            </Link>
            <Link to="/projects/emaar-urban-oasis-sector-62" className="rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50">
              <h3 className="font-display text-xl text-navy">Compare Emaar Urban Oasis</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Compare a Golf Course Extension Road premium project with Sector 103.</p>
            </Link>
          </div>
        </div>
      </section>

      <section id="due-diligence" className="container-page py-16 sm:py-20">
        <Heading
          eyebrow="Banking-grade buyer checks"
          title="What Shubh Estate Brokers checks before a resale recommendation"
          copy="A low portal asking price is useful only after the unit, payment position and transfer economics are reconciled."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Unit documents", "Allotment letter, agreement for sale, area statement and exact tower/unit identity."],
            ["Payment status", "Amount paid, future builder demands, overdue interest if any and seller receivables."],
            ["Transfer economics", "Transfer eligibility, applicable charges, taxes and documentation required for assignment/resale."],
            ["RERA verification", "Project registration, phase/tower details and consistency with the exact unit documentation."],
            ["Price comparison", "Like-for-like floor, facing, view, area basis and payment plan—not headline ₹/sq ft alone."],
            ["Loan feasibility", "Bank valuation, eligibility, funding stage and transaction structure before commitment."],
          ].map(([name, body]) => (
            <article key={name} className="rounded-2xl border border-border bg-card p-6">
              <CheckCircle2 className="size-5 text-gold" />
              <h3 className="mt-4 font-display text-xl text-navy">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="navy"><Link to="/property-buying-advisory-gurgaon">Property Buying Advisory <ArrowRight /></Link></Button>
          <Button asChild variant="outline"><Link to="/blog/gurgaon-property-due-diligence-checklist-2026">Due Diligence Checklist</Link></Button>
        </div>
      </section>

      <section id="faq" className="border-y border-border bg-secondary/25 py-16 sm:py-20">
        <div className="container-page">
          <Heading eyebrow="Buyer FAQ" title="Godrej Vrikshya questions buyers should resolve before paying a token" />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {FAQS.map(([q, a]) => (
              <article key={q} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-xl text-navy">{q}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 rounded-3xl surface-navy p-7 text-white sm:p-10 lg:grid-cols-[1fr_24rem]">
          <div>
            <p className="eyebrow">Current inventory request</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Shortlist the exact unit—not just the project</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">Share your preferred budget, 3 or 4 BHK requirement, floor/view preference and whether you are considering new booking or resale. We can compare payment status and effective acquisition cost before a site visit.</p>
          </div>
          <div className="rounded-2xl bg-white p-5 text-foreground">
            <EnquiryForm interest="Godrej Vrikshya Sector 103" compact includeRequirements />
          </div>
        </div>
      </section>
    </main>
  );
}
