import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Home,
  IndianRupee,
  Landmark,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Trees,
  Video,
  type LucideIcon,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/emaar-emerald-hills-sector-65-gurgaon";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "Emaar Emerald Hills Sector 65 Gurgaon | Resale Price";
const description =
  "Explore Emaar Emerald Hills resale floors and plots in Sector 65 Gurgaon. East-facing 4 BHK available at ₹5 Cr. Request video or site visit.";
const LAST_REVIEWED = "24 August 2026";

const LEGACY_RERA_PAGE = "https://haryanarera.gov.in/view_project/searchprojectDetail/1302";
const PHASE_TWO_RERA_PAGE = "https://haryanarera.gov.in/view_project/project_preview_open/2425";
const EMAAR_COMMUNITY_PAGE = "https://in.emaar.com/en/our-communities/emerald-hills/";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Arun ji, I am interested in the east-facing 4 BHK corner residence at Emaar Emerald Hills, Sector 65 Gurgaon, asking ₹5 crore. Please share the current property video, exact area basis, documents and best price.",
);
const VIDEO_MESSAGE = encodeURIComponent(
  "Hello Arun ji, please share the actual video and current availability of the ₹5 crore 4 BHK residence at Emaar Emerald Hills, Sector 65 Gurgaon.",
);
const SITE_VISIT_MESSAGE = encodeURIComponent(
  "Hello Arun ji, I would like to arrange a private site visit for the 4 BHK residence at Emaar Emerald Hills, Sector 65 Gurgaon.",
);
const WHATSAPP_URL = `${CONTACT.whatsapp}?text=${WHATSAPP_MESSAGE}`;
const VIDEO_URL = `${CONTACT.whatsapp}?text=${VIDEO_MESSAGE}`;
const SITE_VISIT_URL = `${CONTACT.whatsapp}?text=${SITE_VISIT_MESSAGE}`;

const QUICK_FACTS = [
  ["Property types", "Low-rise floors, homes & plots"],
  ["Resale status", "Ready-to-move options"],
  ["Featured home", "4 BHK + puja room"],
  ["Featured asking", "₹5 crore"],
  ["Legacy RERA", "162 OF 2017"],
  ["Phase 2 RERA", "GGM/716/448/2023/60"],
] as const;

const FEATURED_DETAILS = [
  ["Configuration", "4 bedrooms + puja room"],
  ["Floor", "Second floor"],
  ["Stated plot area", "Approx. 4,000 sq ft / 444 sq yd"],
  ["Facing", "East-facing"],
  ["Position", "Corner property"],
  ["Furnishing", "Semi-furnished"],
  ["Interiors", "Marble, ACs, wardrobes & modular kitchen"],
  ["Outdoor benefit", "Private half terrace"],
  ["Access", "Lift access"],
  ["Status", "Ready to move"],
] as const;

const PRICE_ROWS = [
  {
    category: "Established 3 BHK floor",
    size: "Around 2,403 sq ft",
    price: "₹2.65–3.50 Cr",
  },
  {
    category: "4 BHK builder floor",
    size: "Around 267 sq yd plot",
    price: "₹3.70–5.99 Cr",
  },
  {
    category: "4 BHK builder floor",
    size: "Around 300 sq yd plot",
    price: "₹4.59–4.85 Cr",
  },
  {
    category: "Select older 4 BHK floors",
    size: "Around 350 sq yd plot",
    price: "From approx. ₹2.80 Cr*",
  },
  {
    category: "Featured east-facing 4 BHK",
    size: "Stated 4,000 sq ft / 444 sq yd plot",
    price: "₹5 Cr",
  },
  {
    category: "Larger 4 BHK floor",
    size: "Around 400 sq yd plot",
    price: "Around ₹5.89 Cr",
  },
  {
    category: "Premium 4 BHK floor",
    size: "Around 502 sq yd plot",
    price: "₹7.10–8 Cr",
  },
  {
    category: "Residential plots",
    size: "Approx. 265–500 sq yd",
    price: "Selected asks ₹11.50–17.50 Cr",
  },
] as const;

const VALUE_FACTORS = [
  "Vacant plot, complete house or one independent floor",
  "Plot size and proportionate land rights conveyed",
  "Original Emaar floor or subsequently reconstructed residence",
  "Floor position, private terrace and roof rights",
  "Corner, park-facing, road width and orientation",
  "Construction age, lift, parking and interior condition",
  "Title documents, approved plan and outstanding dues",
  "Seller timeline and genuine negotiation flexibility",
] as const;

const LIFESTYLE_FEATURES: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: Home,
    title: "Low-rise privacy",
    text: "An independent-floor setting offers greater individuality than a conventional high-rise apartment.",
  },
  {
    icon: Trees,
    title: "Established green setting",
    text: "Landscaped surroundings, internal streets and a plotted neighbourhood shape the community experience.",
  },
  {
    icon: Sparkles,
    title: "Flexible home choices",
    text: "Buyers can compare original floors, renovated homes, newer luxury construction and vacant plots.",
  },
  {
    icon: Landmark,
    title: "Sector 65 access",
    text: "Schools, hospitals, neighbourhood retail and major commercial developments are accessible nearby.",
  },
];

const BUYER_CHECKS = [
  {
    title: "Match the exact phase",
    text: "Confirm the project phase, plot identification, licence and RERA record applicable to the selected property.",
  },
  {
    title: "Review the ownership chain",
    text: "Examine the current title document, prior transfers, seller authority, encumbrances and any lender charge.",
  },
  {
    title: "Verify construction documents",
    text: "Check sanctioned plans, occupation or completion records where applicable and any material alterations.",
  },
  {
    title: "Confirm property rights",
    text: "Match floor, proportionate land share, terrace, parking, lift and common-area rights to the registered deed.",
  },
  {
    title: "Reconcile all dues",
    text: "Review property tax, maintenance, utilities, mortgage closure and the seller's possession commitment.",
  },
  {
    title: "Compare the complete cost",
    text: "Assess consideration, brokerage, stamp duty, registration, renovation and financing together—not only the headline ask.",
  },
] as const;

const LOCATION_POINTS = [
  {
    title: "Golf Course Extension Road",
    text: "Direct access to one of Gurgaon's established premium residential and commercial corridors.",
  },
  {
    title: "SPR and Sohna Road",
    text: "Road connectivity towards Southern Peripheral Road, Sohna Road and adjoining business districts.",
  },
  {
    title: "Rapid Metro access",
    text: "Connectivity towards the Sector 55–56 Rapid Metro station; actual travel time depends on traffic.",
  },
  {
    title: "Premium neighbourhood",
    text: "Emerald Plaza, Trump Towers Gurgaon and other major Sector 65 developments are located nearby.",
  },
] as const;

const NRI_STEPS = [
  {
    title: "Remote shortlist and video",
    text: "Receive the current property video, specification comparison and live walkthrough before planning travel.",
  },
  {
    title: "Document coordination",
    text: "Organise the ownership chain, property papers, seller documents and lender requirements for review.",
  },
  {
    title: "Loan and payment planning",
    text: "Coordinate NRI loan eligibility and transaction payments through permitted banking channels, subject to policy.",
  },
  {
    title: "Transaction support",
    text: "Coordinate the appropriate legal and tax professionals for POA, TDS, FEMA and registration matters.",
  },
] as const;

const FAQS = [
  {
    q: "What is the current price of property in Emaar Emerald Hills?",
    a: "Indicative resale asking prices begin around ₹2.65 crore for selected established 3 BHK floors. Depending on plot size, construction and property rights, 4 BHK floors can range from approximately ₹3.70 crore to ₹8 crore. Vacant plots are generally substantially more expensive.",
  },
  {
    q: "Is Emaar Emerald Hills ready to move?",
    a: "Established resale floors and constructed homes are available on a ready-to-move basis. Phase 2 plotted inventory should be evaluated separately according to its current regulatory and development status.",
  },
  {
    q: "What is the correct RERA number for Emaar Emerald Hills?",
    a: "The established legacy project is associated with registration 162 OF 2017, while Emerald Hills Phase 2 is registered as GGM/716/448/2023/60. The applicable registration must be matched to the selected property.",
  },
  {
    q: "What is the difference between the older project and Phase 2?",
    a: "The older community contains established resale floors, houses and plots. Phase 2 is a separately registered plotted development and should not be presented as the registration for every ready-to-move floor.",
  },
  {
    q: "How much does a 4 BHK builder floor cost?",
    a: "Current asking prices vary from approximately ₹3.70 crore to ₹8 crore depending on plot size, construction age, location, floor, terrace rights, lift, parking and interiors.",
  },
  {
    q: "Is a 4 BHK available for approximately ₹5 crore?",
    a: "Yes. A second-floor, east-facing corner residence with four bedrooms, a puja room, private half terrace and lift access is offered at an asking price of ₹5 crore, subject to current availability.",
  },
  {
    q: "Does the ₹5 crore property include terrace access?",
    a: "The featured property is represented with a private half terrace. The precise terrace rights should also be matched to the title and transfer documents.",
  },
  {
    q: "Is the featured property east-facing?",
    a: "Yes. The residence is described as east-facing and positioned on a corner property.",
  },
  {
    q: "Why are plots more expensive than individual floors?",
    a: "A plot provides ownership of the complete land parcel, whereas a floor purchase generally relates to one residence and the proportionate rights stated in its registered documents.",
  },
  {
    q: "Can a home loan be arranged?",
    a: "Home-loan coordination is available, subject to the applicant's eligibility, lender valuation and satisfactory legal and technical verification of the property.",
  },
  {
    q: "Can an NRI buy or sell property in Emaar Emerald Hills?",
    a: "Eligible NRI buyers and sellers can transact subject to applicable Indian regulations. Remote shortlisting, video inspection, loan coordination and document support can be arranged.",
  },
  {
    q: "How can I arrange a site visit or receive the property video?",
    a: "Contact Shubh Estate Brokers by Call or WhatsApp and mention Emaar Emerald Hills 4 BHK. The current video, availability and a private inspection can then be coordinated.",
  },
] as const;

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

export const Route = createFileRoute("/emaar-emerald-hills-sector-65-gurgaon")({
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
                  name: "Emaar Emerald Hills Sector 65",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "ApartmentComplex",
              "@id": `${canonical}#community`,
              name: "Emaar Emerald Hills",
              url: canonical,
              description,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Emaar Emerald Hills, Sector 65",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              additionalProperty: [
                {
                  "@type": "PropertyValue",
                  name: "Legacy RERA registration",
                  value: "162 OF 2017 dated 29.08.2017",
                },
                {
                  "@type": "PropertyValue",
                  name: "Phase 2 RERA registration",
                  value: "GGM/716/448/2023/60 dated 08.05.2023",
                },
                {
                  "@type": "PropertyValue",
                  name: "Property types",
                  value: "Low-rise floors, constructed residences and residential plots",
                },
              ],
            },
            {
              "@type": "Apartment",
              "@id": `${canonical}#featured-property`,
              name: "East-facing 4 BHK builder floor in Emaar Emerald Hills",
              description:
                "Ready-to-move second-floor 4 BHK plus puja room residence with lift access, private half terrace, marble flooring, modular kitchen, air-conditioners and wardrobes.",
              numberOfRooms: 4,
              floorLevel: "2",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Emaar Emerald Hills, Sector 65",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              additionalProperty: [
                {
                  "@type": "PropertyValue",
                  name: "Stated plot area",
                  value: "Approximately 4,000 sq ft / 444 sq yd",
                },
                { "@type": "PropertyValue", name: "Facing", value: "East" },
                { "@type": "PropertyValue", name: "Position", value: "Corner" },
                {
                  "@type": "PropertyValue",
                  name: "Outdoor space",
                  value: "Private half terrace",
                },
              ],
              offers: {
                "@type": "Offer",
                url: canonical,
                price: "50000000",
                priceCurrency: "INR",
                availability: "https://schema.org/LimitedAvailability",
                itemCondition: "https://schema.org/UsedCondition",
              },
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
  component: EmaarEmeraldHillsPage,
});

function EmaarEmeraldHillsPage() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative isolate border-b border-border surface-navy text-white">
        <div className="absolute inset-0 -z-10 opacity-45 [background-image:radial-gradient(circle_at_84%_15%,rgba(200,166,85,.46),transparent_28%),linear-gradient(125deg,transparent_52%,rgba(255,255,255,.04)_52%)]" />
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
            <span className="text-white">Emaar Emerald Hills</span>
          </nav>

          <div className="mt-9 grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">
                  Current resale & plot guide
                </Badge>
                <Badge className="border-white/15 bg-white/5 text-white/75 hover:bg-white/5">
                  Ready-to-move 4 BHK available
                </Badge>
              </div>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Sector 65 · Golf Course Extension Road · Gurgaon
              </p>
              <h1 className="mt-4 max-w-5xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                Emaar Emerald Hills
                <span className="mt-2 block text-gradient-gold">
                  resale floors, plots and current prices
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                Compare established low-rise homes, newly constructed luxury floors and residential
                plots in one of Sector 65&apos;s best-known gated communities. A ready-to-move,
                east-facing{" "}
                <strong className="font-semibold text-white">4 BHK corner residence</strong> is
                currently offered at an asking price of{" "}
                <strong className="font-semibold text-white">₹5 crore</strong>.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="xl" variant="gold">
                  <a
                    href={VIDEO_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "emerald_hills_hero_video")}
                  >
                    Request Property Video <Video aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="xl" variant="goldOutline">
                  <a href="#price-guide">
                    View Current Price Guide <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="xl" variant="goldOutline">
                  <a
                    href={CONTACT.phoneHref}
                    onClick={() => trackContact("phone", "emerald_hills_hero")}
                  >
                    Call {CONTACT.phone} <Phone aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-white/50">
                <ShieldCheck aria-hidden="true" className="size-4 text-gold" />
                Phase, title and property rights verified against the selected unit&apos;s documents
              </p>
            </div>

            <aside className="rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Featured opportunity</p>
              <p className="mt-3 font-display text-4xl">₹5 Cr asking</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                East-facing corner residence with private half terrace
              </p>
              <div className="my-6 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <dl className="grid grid-cols-2 gap-5 text-sm">
                <div>
                  <dt className="text-white/45">Configuration</dt>
                  <dd className="mt-1 font-medium">4 BHK + puja</dd>
                </div>
                <div>
                  <dt className="text-white/45">Floor</dt>
                  <dd className="mt-1 font-medium">Second</dd>
                </div>
                <div>
                  <dt className="text-white/45">Stated plot</dt>
                  <dd className="mt-1 font-medium">Approx. 4,000 sq ft</dd>
                </div>
                <div>
                  <dt className="text-white/45">Access</dt>
                  <dd className="mt-1 font-medium">Lift + terrace</dd>
                </div>
              </dl>
              <Button asChild variant="gold" className="mt-7 w-full">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "emerald_hills_hero_card")}
                >
                  Check Best Price <MessageCircle aria-hidden="true" />
                </a>
              </Button>
              <p className="mt-4 text-xs leading-5 text-white/45">
                Current owner asking level · Availability confirmed before visit · Updated{" "}
                {LAST_REVIEWED}
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
            ["Featured 4 BHK", "#featured-property"],
            ["Price guide", "#price-guide"],
            ["RERA phases", "#project-phases"],
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
            eyebrow="Emaar Emerald Hills at a glance"
            heading="Low-rise privacy in an established Sector 65 neighbourhood"
            copy="Emaar Emerald Hills includes different generations and categories of property: established low-rise floors, upgraded residences, newly constructed builder floors and residential plots. This variety creates meaningful differences in pricing, ownership rights and physical condition."
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
            href={EMAAR_COMMUNITY_PAGE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-gold"
          >
            Emaar community page <ExternalLink aria-hidden="true" className="size-3" />
          </a>
          <a
            href={LEGACY_RERA_PAGE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-gold"
          >
            Legacy Haryana RERA record <ExternalLink aria-hidden="true" className="size-3" />
          </a>
          <a
            href={PHASE_TWO_RERA_PAGE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-gold"
          >
            Phase 2 Haryana RERA record <ExternalLink aria-hidden="true" className="size-3" />
          </a>
        </div>
      </section>

      <section id="featured-property" className="border-y border-border bg-muted/35">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
            <div>
              <SectionHeading
                eyebrow="Current ready-to-move opportunity"
                heading="East-facing 4 BHK corner residence with private half terrace"
                copy="This second-floor, villa-style residence is suited to a family seeking an independent home environment with lift convenience, fitted interiors and valuable private outdoor space."
              />
              <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {FEATURED_DETAILS.map(([label, value]) => (
                  <div key={label} className="bg-card p-5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm font-medium leading-6 text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                The property is close to Trump Towers Gurgaon and combines a corner position with
                east orientation, marble flooring, fitted air-conditioners and wardrobes, a modular
                kitchen, lift access and a private half terrace. The stated 4,000 sq ft refers to
                the approximate plot area; the exact area basis and property rights are matched to
                the documents before commitment.
              </p>
            </div>

            <aside className="h-fit rounded-2xl border border-gold/30 bg-card p-7 shadow-sm">
              <Badge className="border-gold/30 bg-gold/10 text-gold hover:bg-gold/10">
                Featured verified inventory
              </Badge>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Asking price
              </p>
              <p className="mt-2 font-display text-4xl text-navy">₹5 crore</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Contact for current availability, actual video, document-led area confirmation and
                the best achievable price.
              </p>
              <div className="mt-6 grid gap-3">
                <Button asChild variant="gold">
                  <a
                    href={VIDEO_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "emerald_hills_featured_video")}
                  >
                    Request Actual Video <Video aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="goldOutline">
                  <a
                    href={SITE_VISIT_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("site_visit", "emerald_hills_featured_visit")}
                  >
                    Schedule Private Visit <MapPin aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="price-guide" className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Emaar Emerald Hills resale price"
          heading="Compare the property category before comparing the asking price"
          copy="There is no single uniform rate for the community. A vacant plot, an original low-rise floor and a newly constructed luxury residence on the same plot size are different assets with different property rights and cost structures."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="surface-navy text-white">
                <tr className="text-xs uppercase tracking-wider text-white/65">
                  <th className="px-6 py-4 font-medium">Property category</th>
                  <th className="px-6 py-4 font-medium">Approximate size context</th>
                  <th className="px-6 py-4 font-medium">Indicative owner asking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PRICE_ROWS.map((row) => (
                  <tr key={`${row.category}-${row.size}`}>
                    <td className="px-6 py-5 font-medium text-navy">{row.category}</td>
                    <td className="px-6 py-5 text-sm text-muted-foreground">{row.size}</td>
                    <td className="px-6 py-5 font-display text-lg text-navy">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">
          *Indicative owner asking levels reviewed on {LAST_REVIEWED}; not registered transaction
          values. The lower end for older floors can reflect condition, limited rights or motivated
          seller terms. Contact Shubh Estate Brokers for current inventory, property-specific
          valuation and the best achievable price.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Why prices vary</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-navy">
              A 4 BHK label does not make two homes comparable
            </h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              The correct comparison considers the underlying land rights, property condition, exact
              floor and location before negotiation begins.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {VALUE_FACTORS.map((factor) => (
              <div key={factor} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
                <p className="text-sm leading-6 text-muted-foreground">{factor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="project-phases" className="border-y border-border bg-muted/35">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="RERA and product distinction"
            heading="Do not combine the established community and Phase 2 under one registration"
            copy="The exact phase, licence, plot identity and applicable registration must be matched to the individual property documents before a buyer commits funds."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <FileCheck2 aria-hidden="true" className="size-7 text-gold" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Established community
              </p>
              <h3 className="mt-2 font-display text-2xl text-navy">
                Ready-to-move floors, houses and plots
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The established development includes older Emaar floors, upgraded residences,
                constructed homes and plots. The legacy Haryana RERA registration is{" "}
                <strong className="text-foreground">162 OF 2017 dated 29.08.2017</strong>.
              </p>
              <a
                href={LEGACY_RERA_PAGE}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
              >
                Review authority record <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </article>
            <article className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <Scale aria-hidden="true" className="size-7 text-gold" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Emerald Hills Phase 2
              </p>
              <h3 className="mt-2 font-display text-2xl text-navy">
                Separately registered plotted development
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The later plotted phase carries Haryana RERA registration{" "}
                <strong className="text-foreground">GGM/716/448/2023/60 dated 08.05.2023</strong>.
                It should not be used as the registration for every ready-to-move builder floor.
              </p>
              <a
                href={PHASE_TWO_RERA_PAGE}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
              >
                Review Phase 2 record <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </article>
          </div>

          <div className="mt-10 rounded-2xl surface-navy p-7 text-white md:p-9">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Plot versus builder floor
                </p>
                <h3 className="mt-3 font-display text-3xl">
                  Land ownership explains the large price gap
                </h3>
              </div>
              <p className="leading-8 text-white/68">
                A vacant-plot buyer acquires the complete land parcel and development potential,
                subject to approvals. A floor buyer acquires one residence together with the land,
                terrace, parking and common-area rights stated in the registered documents. The
                deed—not the advertisement—determines what transfers to the buyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Community and lifestyle"
          heading="Independent-floor living within an established gated neighbourhood"
          copy="The appeal lies in the combination of low-rise privacy, a plotted setting and access to the established schools, hospitals, retail and business districts around Sector 65."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {LIFESTYLE_FEATURES.map(({ icon: Icon, title: cardTitle, text }) => (
            <article key={cardTitle} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-full bg-gold/12 text-gold">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl text-navy">{cardTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">
          Power backup, clubhouse access, maintenance, parking and other facilities can vary by
          phase and individual property. These provisions are confirmed during the physical
          inspection and document review for the selected unit.
        </p>
      </section>

      <section id="location" className="surface-navy text-white">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Sector 65 connectivity
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                Connected to the Golf Course Extension Road micro-market
              </h2>
              <p className="mt-5 leading-8 text-white/68">
                The community has access towards Golf Course Extension Road, the 60-metre sector
                road, Southern Peripheral Road, Sohna Road, MG Road and Cyber Hub. Buyers should
                inspect normal office and school routes during peak traffic hours.
              </p>
              <Button asChild variant="goldOutline" className="mt-7">
                <Link to="/locations/golf-course-extension-road">
                  Explore Corridor Guide <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              {LOCATION_POINTS.map((item) => (
                <article key={item.title} className="border-l border-gold/50 pl-5">
                  <MapPin aria-hidden="true" className="size-5 text-gold" />
                  <h3 className="mt-4 font-display text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="buyer-checks" className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionHeading
              eyebrow="Buyer due diligence"
              heading="Verify the rights being purchased before paying a token"
              copy="A premium location does not replace transaction-level verification. The floor, land share, terrace, lift, parking and common-area rights must be supported by the property documents."
            />
            <div className="mt-7 rounded-2xl border border-gold/30 bg-gold/5 p-6">
              <ShieldCheck aria-hidden="true" className="size-6 text-gold" />
              <p className="mt-4 font-display text-xl text-navy">Document-led buyer support</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Shubh Estate Brokers can coordinate valuation, lender review and appropriate legal
                or technical professionals for the selected property.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {BUYER_CHECKS.map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-8 items-center justify-center rounded-full bg-gold/12 text-sm font-semibold text-gold">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-xl text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/35">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-7 md:p-8">
              <Banknote aria-hidden="true" className="size-7 text-gold" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Valuation and home loan
              </p>
              <h2 className="mt-3 font-display text-3xl text-navy">
                Finance the exact property—not only the purchase budget
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Loan eligibility depends on the applicant profile, title documents, construction
                approvals, lender valuation and prevailing credit policy. We coordinate eligibility,
                valuation, property-related lender requirements and the seller&apos;s existing loan,
                where applicable.
              </p>
              <Button asChild variant="goldOutline" className="mt-6">
                <Link to="/home-loans">
                  Discuss Home Loan <IndianRupee aria-hidden="true" />
                </Link>
              </Button>
            </article>
            <article className="rounded-2xl border border-border bg-card p-7 md:p-8">
              <Building2 aria-hidden="true" className="size-7 text-gold" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                End user and investment fit
              </p>
              <h2 className="mt-3 font-display text-3xl text-navy">
                Best suited to buyers who value low-rise ownership
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Families can prioritise privacy, outdoor space and an established neighbourhood.
                Plot buyers can evaluate long-term land ownership and customised construction.
                Investors should assess entry valuation, rental depth, document clarity and holding
                period rather than relying on guaranteed appreciation claims.
              </p>
              <Button asChild variant="goldOutline" className="mt-6">
                <Link to="/property-buying-advisory-gurgaon">
                  Compare Buyer Options <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </article>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[.68fr_1.32fr]">
            <div>
              <p className="eyebrow">NRI buyer and seller support</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-navy">
                Evaluate the property remotely before travelling
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Shortlisting, live video inspection, documentation and loan coordination can be
                organised remotely. Transaction-specific tax, FEMA and power-of-attorney advice
                should come from qualified professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="gold">
                  <Link to="/nri">NRI Buyer Services</Link>
                </Button>
                <Button asChild variant="goldOutline">
                  <Link to="/nri-sell-property-gurgaon">NRI Seller Services</Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {NRI_STEPS.map((step) => (
                <article key={step.title} className="rounded-xl border border-border bg-card p-5">
                  <CheckCircle2 aria-hidden="true" className="size-5 text-gold" />
                  <h3 className="mt-3 font-display text-xl text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-7">
            <CheckCircle2 aria-hidden="true" className="size-7 text-gold" />
            <h2 className="mt-4 font-display text-3xl text-navy">Practical advantages</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              {[
                "Premium Sector 65 address",
                "Established gated neighbourhood",
                "Low-rise and plotted character",
                "Multiple floor and plot sizes",
                "Ready-to-move resale choices",
                "Golf Course Extension Road access",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-border bg-card p-7">
            <ShieldCheck aria-hidden="true" className="size-7 text-gold" />
            <h2 className="mt-4 font-display text-3xl text-navy">Inspect before commitment</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              {[
                "Exact phase and registration",
                "Construction and structural condition",
                "Approach road and peak traffic",
                "Terrace and parking rights",
                "Lift and maintenance responsibility",
                "Property-specific title documents",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <FileCheck2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="faq" className="border-y border-border bg-muted/35">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            eyebrow="Frequently asked questions"
            heading="Emaar Emerald Hills price, RERA and availability"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-border bg-card p-6">
                <summary className="cursor-pointer list-none pr-8 font-display text-lg text-navy">
                  {faq.q}
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-border lg:grid-cols-[1.1fr_.9fr]">
          <div className="surface-navy p-8 text-white md:p-11">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Current buyer opportunity
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Request the ₹5 crore 4 BHK video and private site visit
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/68">
              Compare the exact home, documents, rights and negotiation position with Arun Madan.
              Shubh Estate Brokers can coordinate inspection, valuation, loan planning and
              transaction follow-up.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="gold">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "emerald_hills_final")}
                >
                  WhatsApp Current Enquiry <MessageCircle aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="goldOutline">
                <a
                  href={SITE_VISIT_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("site_visit", "emerald_hills_final")}
                >
                  Schedule Site Visit <MapPin aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="mt-10 border-t border-white/12 pt-7">
              <p className="text-xs uppercase tracking-[0.14em] text-gold">Reviewed by</p>
              <p className="mt-2 font-display text-2xl">Arun Madan</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                Founder, Shubh Estate Brokers · Former banking professional and law graduate with
                approximately two decades of mortgage, credit-evaluation and property-finance
                experience.
              </p>
            </div>
          </div>
          <aside className="bg-card p-8 md:p-11">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Request a callback
            </p>
            <h3 className="mt-3 font-display text-2xl text-navy">
              Share your preferred floor or plot size
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Tell us whether you need the featured 4 BHK, another floor, a plot or a confidential
              owner valuation.
            </p>
            <div className="mt-6">
              <EnquiryForm
                propertyId="emaar-emerald-hills-4bhk-5-crore"
                interest="Emaar Emerald Hills Sector 65 resale enquiry"
                compact
              />
            </div>
            <div className="mt-7 border-t border-border pt-6">
              <p className="font-display text-xl text-navy">Own a property here?</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Request a confidential market assessment, genuine buyer screening and transaction
                coordination.
              </p>
              <Button asChild variant="goldOutline" className="mt-4 w-full">
                <Link to="/sell-property-gurgaon">Request Owner Valuation</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
