import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
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
  Wind,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const PAGE_PATH = "/projects/dlf-the-primus-sector-82a-gurgaon-apartments";
const canonical = `${SITE_ORIGIN}${PAGE_PATH}`;
const title = "DLF The Primus 4 BHK for Sale Gurgaon | 2576 Sq Ft";
const description =
  "4 BHK 2576 sq ft DLF apartment for sale in Sector 82A Gurgaon. 11th floor, sun-facing. Contact Shubh Estate Brokers for price and site visit.";
const PRICE_GUIDE_REVIEWED = "24 August 2026";
const UNIT_LISTING_REVIEWED = "23 September 2026";

const DLF_CORPORATE_PAGE = "https://www.dlf.in/";
const INSTAGRAM_REEL_URL = "https://www.instagram.com/reel/DdlnpV5HIG7/";
const INSTAGRAM_EMBED_URL = "https://www.instagram.com/reel/DdlnpV5HIG7/embed";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Mr Arun Madaan, I am interested in the 4 BHK 2576 sq ft apartment for sale at DLF The Primus, Sector 82A Gurgaon, on the 11th floor and sun-facing. Please share the current asking price, tower, parking, furnishing, inclusions and site-visit availability.",
);
const WHATSAPP_URL = `${CONTACT.whatsapp}?text=${WHATSAPP_MESSAGE}`;

const CURRENT_UNIT = [
  ["Configuration", "4 BHK"],
  ["Super area", "2,576 sq ft"],
  ["Floor", "11th floor"],
  ["Facing", "Sun-facing"],
  ["Status", "For sale · Ready to move"],
  ["Location", "Sector 82A, Gurgaon"],
] as const;

const QUICK_FACTS = [
  ["Status", "Ready to move"],
  ["Possession", "Since January 2017"],
  ["Project area", "Approx. 12.5 acres"],
  ["Development", "9 towers · up to 32 floors"],
  ["Published homes", "Approx. 626 residences"],
  ["Pin code", "122004"],
] as const;

const PRICE_ROWS = [
  {
    configuration: "3 BHK + 3T",
    area: "1,799 sq ft",
    guidance: "Approx. ₹2.80-3.00 Cr",
    buyerFit: "End users seeking the most efficient Primus layout",
  },
  {
    configuration: "3 BHK + utility / staff room",
    area: "2,086 sq ft",
    guidance: "Approx. ₹3.15-3.50 Cr",
    buyerFit: "Families wanting added service or flexible-use space",
  },
  {
    configuration: "4 BHK + 4T",
    area: "2,273 sq ft",
    guidance: "Approx. ₹3.80-4.00 Cr",
    buyerFit: "Larger families prioritising four full bedrooms",
  },
  {
    configuration: "4 BHK + utility / staff room",
    area: "2,576 sq ft",
    guidance: "Approx. ₹4.20-4.60 Cr",
    buyerFit: "Buyers seeking the largest regular Primus layout",
  },
] as const;

const SPECIFICATIONS = [
  {
    icon: Wind,
    title: "VRV / VRF air-conditioning",
    text: "Published project specifications include air-conditioned homes and air-conditioned entrance or lift-lobby areas.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fitted modular kitchens",
    text: "The original specification included modular kitchens and selected appliances; confirm the present condition and inventory unit by unit.",
  },
  {
    icon: Sparkles,
    title: "Premium interior finish",
    text: "Imported-marble areas, fitted wardrobes and double-glazed openings formed part of the published project positioning.",
  },
  {
    icon: Building2,
    title: "Double-height arrival",
    text: "The residential towers feature premium entrance-lobby treatment designed to create a stronger sense of arrival.",
  },
  {
    icon: Trees,
    title: "Landscape-led planning",
    text: "The landscape design is associated with Paul Friedberg, while ARCOP is identified as the design consultant.",
  },
  {
    icon: Landmark,
    title: "Club Primus",
    text: "Resident facilities include a clubhouse, swimming pool, gymnasium, squash and indoor recreation spaces.",
  },
] as const;

const LOCATION_POINTS = [
  {
    title: "NH-48 access",
    text: "The project is positioned close to NH-48, supporting movement towards Delhi, central Gurugram and Manesar.",
  },
  {
    title: "Dwarka Expressway corridor",
    text: "Connectivity to the Dwarka Expressway broadens access towards Delhi and the airport-side growth corridor.",
  },
  {
    title: "IMT Manesar",
    text: "The location is practical for executives and business owners working across the Manesar industrial and corporate belt.",
  },
  {
    title: "New Gurgaon conveniences",
    text: "Schools, healthcare, neighbourhood retail and commercial destinations are distributed across Sectors 81-86 and nearby townships.",
  },
] as const;

const BUYER_CHECKS = [
  {
    title: "Match the exact unit",
    text: "Confirm tower, apartment number, super area, configuration, floor, facing, view, parking rights and the approved layout before paying a token.",
  },
  {
    title: "Review title and transfer papers",
    text: "Check the complete allotment or conveyance chain, possession papers, seller identity, encumbrance position and society or maintenance records.",
  },
  {
    title: "Reconcile all dues",
    text: "Obtain written confirmation of maintenance, utility and other pending dues and record which party will clear them before transfer.",
  },
  {
    title: "Inspect the apartment condition",
    text: "Evaluate air-conditioning, kitchen appliances, wardrobes, plumbing, seepage, glazing and the exact fixtures included in the sale.",
  },
  {
    title: "Compare total acquisition cost",
    text: "Assess the seller consideration together with brokerage, stamp duty, registration and any transfer or documentation expenses.",
  },
] as const;

const FAQS = [
  {
    q: "Is a 2576 sq ft 4 BHK currently available for sale at DLF The Primus?",
    a: "Yes. As of 23 September 2026, Shubh Estate Brokers is marketing a 2,576 sq ft 4 BHK resale apartment on the 11th floor, described as sun-facing. Availability can change, so buyers should confirm the current asking price, tower, parking, furnishing and inclusions before planning a visit.",
  },
  {
    q: "What is the current resale price of DLF The Primus Sector 82A?",
    a: "Indicative asking guidance reviewed in August 2026 is approximately ₹2.80-3.50 crore for the principal 3 BHK layouts and approximately ₹3.80-4.60 crore for the principal 4 BHK layouts. The executable price depends on tower, floor, facing, view, condition, furnishing, parking, seller urgency and availability.",
  },
  {
    q: "Is ₹1.85 crore the current starting price of DLF The Primus?",
    a: "No. ₹1.85 crore appears in older launch or historical marketing material and should not be presented as the current resale starting price. Buyers should request a fresh unit-wise inventory and total-cost sheet.",
  },
  {
    q: "What apartment sizes are available at DLF The Primus?",
    a: "The principal published 3 and 4 BHK super-area layouts are approximately 1,799 sq ft, 2,086 sq ft, 2,273 sq ft and 2,576 sq ft. The exact area and configuration must be matched to the seller's title and project documents.",
  },
  {
    q: "Who can help me buy a DLF apartment for sale in Gurgaon?",
    a: "Shubh Estate Brokers is an independent professional real estate brokerage in Gurugram assisting buyers with DLF resale apartments, unit shortlisting, site visits, price comparison, documentation coordination, valuation and home-loan support. Shubh Estate Brokers is not an official DLF sales office.",
  },
  {
    q: "What rent can an apartment at DLF The Primus achieve?",
    a: "Current public asking examples commonly place semi-furnished 3 BHK homes around ₹45,000-60,000 per month and larger or better-furnished 4 BHK homes around ₹55,000-75,000 or more. Actual rent depends on size, furnishing, floor, view, condition and lease terms; rent and occupancy are not guaranteed.",
  },
  {
    q: "Is DLF The Primus ready to move?",
    a: "Yes. DLF The Primus is an occupied, ready-to-move residential development, with possession reported from January 2017.",
  },
  {
    q: "Can an overseas Indian buyer shortlist a resale apartment remotely?",
    a: "Initial shortlisting, live video inspection, document collection, price comparison and loan coordination can be handled remotely. Overseas buyers should obtain transaction-specific legal and tax advice for FEMA-compliant payments, TDS, power of attorney and future repatriation where applicable.",
  },
] as const;

export const Route = createFileRoute("/projects/dlf-the-primus-sector-82a-gurgaon-apartments")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large,max-video-preview:-1" },
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
                  item: `${SITE_ORIGIN}/projects-in-gurgaon`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "DLF The Primus Sector 82A",
                  item: canonical,
                },
              ],
            },
            {
              "@type": "ApartmentComplex",
              "@id": `${canonical}#project`,
              name: "DLF The Primus",
              url: canonical,
              description,
              address: {
                "@type": "PostalAddress",
                streetAddress: "DLF Garden City, Sector 82A",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                postalCode: "122004",
                addressCountry: "IN",
              },
              numberOfAccommodationUnits: 626,
              additionalProperty: [
                { "@type": "PropertyValue", name: "Developer", value: "DLF Limited" },
                { "@type": "PropertyValue", name: "Status", value: "Ready to move" },
                {
                  "@type": "PropertyValue",
                  name: "Principal configurations",
                  value: "3 BHK and 4 BHK apartments",
                },
                {
                  "@type": "PropertyValue",
                  name: "Principal size range",
                  value: "1,799 to 2,576 sq ft",
                },
              ],
            },
            {
              "@type": "Apartment",
              "@id": `${canonical}#current-2576-unit`,
              name: "4 BHK 2576 sq ft apartment for sale in DLF The Primus Sector 82A Gurgaon",
              url: canonical,
              description:
                "Current resale opportunity: 4 BHK, 2,576 sq ft, 11th floor, sun-facing apartment in DLF The Primus, Sector 82A Gurgaon.",
              numberOfRooms: 4,
              floorSize: {
                "@type": "QuantitativeValue",
                value: 2576,
                unitText: "sq ft",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "DLF The Primus, Sector 82A",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                postalCode: "122004",
                addressCountry: "IN",
              },
              containedInPlace: { "@id": `${canonical}#project` },
              additionalProperty: [
                { "@type": "PropertyValue", name: "Floor", value: "11th floor" },
                { "@type": "PropertyValue", name: "Facing", value: "Sun-facing" },
                { "@type": "PropertyValue", name: "Transaction", value: "Resale / for sale" },
                { "@type": "PropertyValue", name: "Status", value: "Ready to move" },
                { "@type": "PropertyValue", name: "Listing reviewed", value: UNIT_LISTING_REVIEWED },
              ],
            },
            {
              "@type": "RealEstateAgent",
              "@id": `${SITE_ORIGIN}/#real-estate-agent`,
              name: CONTACT.name,
              url: SITE_ORIGIN,
              telephone: "+919911050561",
              email: CONTACT.email,
              description:
                "Professional estate brokers and property dealers in Gurgaon helping buyers and sellers with apartments, DLF resales, valuation, documentation, home-loan coordination and site visits.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "15th Floor, Ocus Quantum Mall, Sector 51",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                postalCode: "122003",
                addressCountry: "IN",
              },
              areaServed: { "@type": "City", name: "Gurugram (Gurgaon)" },
              knowsAbout: [
                "Apartments for sale in Gurgaon",
                "DLF resale apartments in Gurgaon",
                "Property buying and selling in Gurgaon",
                "Property valuation and documentation",
                "Home-loan coordination",
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
  component: DLFThePrimusPage,
});

function DLFThePrimusPage() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative isolate border-b border-border surface-navy text-white">
        <div className="absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(circle_at_78%_18%,rgba(200,166,85,.4),transparent_30%),linear-gradient(120deg,transparent_55%,rgba(255,255,255,.04)_55%)]" />
        <div className="container-page py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60">
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link to="/projects-in-gurgaon" className="hover:text-gold">
              Projects
            </Link>
            <span className="px-2">/</span>
            <span className="text-white">DLF The Primus</span>
          </nav>

          <div className="mt-8 grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_23rem]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-gold/35 bg-gold/10 text-gold hover:bg-gold/10">
                  2576 sq ft unit currently available
                </Badge>
                <Badge className="border-white/15 bg-white/5 text-white/75 hover:bg-white/5">
                  Independent resale advisory
                </Badge>
              </div>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Sector 82A · DLF Garden City · New Gurgaon
              </p>
              <h1 className="mt-4 max-w-5xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                <span className="block text-white">DLF The Primus</span>{" "}
                <span className="mt-2 block text-gradient-gold">4 BHK apartment for sale in Gurgaon</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                Current resale opportunity: a <strong className="font-semibold text-white">2,576 sq ft 4 BHK</strong>{" "}
                apartment on the <strong className="font-semibold text-white">11th floor</strong>, described as{" "}
                <strong className="font-semibold text-white">sun-facing</strong>. Contact Shubh Estate Brokers for the
                current asking price, exact unit details and a site visit.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="xl" variant="gold">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "dlf_primus_current_unit_hero")}
                  >
                    Ask Current Price <MessageCircle aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="xl" variant="goldOutline">
                  <a href="#available-unit">
                    View 2576 Sq Ft Unit <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-white/50">
                <ShieldCheck aria-hidden="true" className="size-4 text-gold" />
                Unit availability reviewed {UNIT_LISTING_REVIEWED}. Price and inclusions should be reconfirmed before a visit.
              </p>
            </div>

            <aside className="rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Featured resale unit</p>
              <p className="mt-3 font-display text-4xl">2,576 Sq Ft</p>
              <p className="mt-2 text-sm leading-6 text-white/60">4 BHK · 11th floor · Sun-facing</p>
              <div className="my-6 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <dl className="grid grid-cols-2 gap-5 text-sm">
                <div>
                  <dt className="text-white/45">Project</dt>
                  <dd className="mt-1 font-medium">DLF The Primus</dd>
                </div>
                <div>
                  <dt className="text-white/45">Location</dt>
                  <dd className="mt-1 font-medium">Sector 82A</dd>
                </div>
                <div>
                  <dt className="text-white/45">Status</dt>
                  <dd className="mt-1 font-medium">Ready to move</dd>
                </div>
                <div>
                  <dt className="text-white/45">Price</dt>
                  <dd className="mt-1 font-medium">On request</dd>
                </div>
              </dl>
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
            ["Available 2576 unit", "#available-unit"],
            ["Overview", "#overview"],
            ["Prices", "#price-guide"],
            ["Specifications", "#specifications"],
            ["Location", "#location"],
            ["Buyer checks", "#buyer-checks"],
            ["Enquire", "#enquire"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="shrink-0 hover:text-navy">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section id="available-unit" className="border-b border-border bg-card">
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <p className="eyebrow">Current resale opportunity</p>
              <h2 className="mt-3 max-w-4xl font-display text-3xl leading-tight text-navy sm:text-4xl">
                4 BHK 2576 sq ft DLF apartment for sale in Sector 82A Gurgaon
              </h2>
              <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
                Shubh Estate Brokers is currently marketing this spacious 2,576 sq ft 4 BHK apartment in
                DLF The Primus. The home is on the 11th floor and is described as sun-facing, making it a
                relevant option for buyers searching for a large ready-to-move DLF apartment for sale in Gurgaon.
              </p>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
                The asking price is deliberately shown on request because a live resale price should be reconfirmed
                with the seller. Exact tower, parking, furnishing, fixtures and other inclusions will be shared with
                serious buyers before or during the site-visit discussion.
              </p>

              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border sm:grid-cols-2 lg:grid-cols-3">
                {CURRENT_UNIT.map(([label, value]) => (
                  <div key={label} className="bg-background px-5 py-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
                    <p className="mt-2 font-display text-xl text-navy">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" variant="gold">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContact("whatsapp", "dlf_primus_2576_unit")}
                  >
                    <MessageCircle aria-hidden="true" /> Get Price and Unit Details
                  </a>
                </Button>
                <Button asChild size="lg" variant="goldOutline">
                  <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "dlf_primus_2576_unit")}>
                    <Phone aria-hidden="true" /> Book a Site Visit
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={INSTAGRAM_REEL_URL} target="_blank" rel="noreferrer">
                    Watch Video Walkthrough <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                Listing details reviewed {UNIT_LISTING_REVIEWED}. Resale inventory can be sold, withdrawn or revised without notice.
              </p>
            </div>

            <aside className="overflow-hidden rounded-2xl border border-border bg-muted/35 p-3 shadow-sm">
              <div className="aspect-[9/16] overflow-hidden rounded-xl bg-black">
                <iframe
                  title="DLF The Primus 2576 sq ft apartment video walkthrough"
                  src={INSTAGRAM_EMBED_URL}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="px-2 pb-2 pt-4 text-sm leading-6 text-muted-foreground">
                Video walkthrough of the featured DLF The Primus resale opportunity.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section id="overview" className="border-b border-border bg-card">
        <div className="container-page grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_FACTS.map(([label, value]) => (
            <div key={label} className="border-b border-border px-6 py-6 sm:border-r">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
              <p className="mt-2 font-display text-xl text-navy">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="eyebrow">Project overview</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-navy sm:text-4xl">
              Established DLF living with immediate possession
            </h2>
            <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                DLF The Primus is an occupied residential development in Sector 82A, Gurgaon,
                positioned within the wider DLF Garden City environment. Published project data
                describes approximately 12.5 acres, nine high-rise towers and about 626 residences.
              </p>
              <p>
                The project&apos;s strongest end-user appeal comes from its ready-to-move status,
                practical access to NH-48, established club facilities and fitted apartment
                specifications. Resale buyers can inspect the actual home, view, common areas and
                maintenance condition before completing the transaction.
              </p>
              <p>
                This is an independent Shubh Estate Brokers buyer guide and is not an official DLF
                website. Brand names are used only to identify the project. For corporate developer
                information, visit the{" "}
                <a
                  href={DLF_CORPORATE_PAGE}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-navy underline decoration-gold/60 underline-offset-4"
                >
                  DLF corporate website
                </a>
                .
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
            <div className="flex size-11 items-center justify-center rounded-full bg-gold/15 text-gold">
              <IndianRupee aria-hidden="true" className="size-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl text-navy">Live price should be reconfirmed</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Portal asking prices are useful for comparison but are not a substitute for the seller&apos;s
              current expectation and the exact unit&apos;s condition, floor, facing, view and inclusions.
              Ask for a fresh unit-wise cost sheet before making a buying decision.
            </p>
          </aside>
        </div>
      </section>

      <section id="price-guide" className="border-y border-border bg-muted/35">
        <div className="container-page py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Size-wise resale guidance</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-navy sm:text-4xl">
              DLF The Primus price and configuration guide
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              These are indicative asking ranges for initial comparison, not guaranteed transaction prices.
              The featured 2,576 sq ft apartment&apos;s current seller expectation is available on request.
            </p>
          </div>

          <div className="mt-9 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-6 py-4 font-medium">Configuration</th>
                  <th className="px-6 py-4 font-medium">Published super area</th>
                  <th className="px-6 py-4 font-medium">Indicative resale guidance*</th>
                  <th className="px-6 py-4 font-medium">Typical buyer fit</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map((row) => (
                  <tr key={row.area} className="border-t border-border align-top">
                    <td className="px-6 py-5 font-medium text-navy">{row.configuration}</td>
                    <td className="px-6 py-5">{row.area}</td>
                    <td className="px-6 py-5 font-semibold text-gold">{row.guidance}</td>
                    <td className="px-6 py-5 text-muted-foreground">{row.buyerFit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            *Indicative public asking context reviewed {PRICE_GUIDE_REVIEWED}. Registration, stamp duty,
            brokerage and other transaction expenses are separate unless a written quotation states otherwise.
            Verify the exact area and configuration from the unit documents.
          </p>
        </div>
      </section>

      <section id="specifications" className="container-page py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Project character</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy sm:text-4xl">
            Premium specifications and resident amenities
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Original project specifications establish the design intent; a resale inspection should
            confirm what remains installed, operational and included in the transaction.
          </p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SPECIFICATIONS.map(({ icon: Icon, title: itemTitle, text }) => (
            <article
              key={itemTitle}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-gold/12 text-gold">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl text-navy">{itemTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="location" className="surface-navy text-white">
        <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.9fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Sector 82A connectivity
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
              Close to NH-48 and New Gurgaon&apos;s employment corridor
            </h2>
            <p className="mt-5 max-w-3xl leading-7 text-white/65">
              Travel times vary substantially with traffic and the selected route. Use the map and a
              live navigation check for the date and hour that match your daily commute.
            </p>
            <div className="mt-9 grid gap-7 sm:grid-cols-2">
              {LOCATION_POINTS.map((point) => (
                <article key={point.title} className="border-l border-gold/50 pl-5">
                  <MapPin aria-hidden="true" className="size-5 text-gold" />
                  <h3 className="mt-4 font-display text-xl">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{point.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-2 shadow-2xl">
            <iframe
              title="Map showing DLF The Primus, Sector 82A, Gurugram"
              src="https://www.google.com/maps?q=DLF+The+Primus+Sector+82A+Gurugram&output=embed"
              className="min-h-[430px] w-full rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <p className="eyebrow">Professional Gurgaon property advisory</p>
              <h2 className="mt-3 max-w-4xl font-display text-3xl leading-tight text-navy sm:text-4xl">
                Looking for an apartment for sale in Gurgaon or a DLF resale apartment?
              </h2>
              <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  Buyers searching for an apartment for sale in Gurgaon often compare established DLF
                  communities because the actual home, occupancy, common areas and maintenance can be inspected
                  before purchase. This 2,576 sq ft Primus unit is a ready-to-move DLF apartment for sale in
                  Gurgaon&apos;s Sector 82A and can be evaluated alongside other New Gurgaon resale options.
                </p>
                <p>
                  Shubh Estate Brokers is an independent professional estate brokerage based in Gurugram. We help
                  buyers and sellers with property shortlisting, resale comparisons, site visits, price discussions,
                  documentation coordination, property valuation and home-loan support. If you are comparing
                  property dealers in Gurgaon or looking for a property agent in Gurgaon, our focus is to provide
                  exact unit-level information rather than generic portal data.
                </p>
                <p>
                  We are not the developer&apos;s official sales office. Our role is independent resale and property
                  advisory, with attention to title documents, transaction costs, lender requirements and practical
                  buyer due diligence.
                </p>
              </div>
            </div>
            <aside className="h-fit rounded-2xl border border-gold/30 bg-gold/5 p-6">
              <h3 className="font-display text-2xl text-navy">Shubh Estate Brokers</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Professional estate brokers and property dealers in Gurgaon for residential resale, rentals,
                valuation, documentation support and home-loan coordination.
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p className="flex gap-2.5">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  {CONTACT.address}
                </p>
                <p className="flex gap-2.5">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                  {CONTACT.phone}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="buyer-checks" className="container-page py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="eyebrow">Banking-grade resale review</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-navy sm:text-4xl">
              Five checks before you pay a token
            </h2>
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
            <div className="flex items-center gap-3">
              <Scale aria-hidden="true" className="size-5 text-gold" />
              <h3 className="font-display text-2xl text-navy">What we compare</h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              {[
                "Tower, floor, facing and view",
                "Area and approved configuration",
                "Title chain and possession papers",
                "Dues, parking and included fixtures",
                "Comparable asking and executable value",
                "Loan eligibility and lender valuation",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-muted/35">
        <div className="container-page py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Frequently asked questions</p>
            <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">
              DLF The Primus buyer questions
            </h2>
          </div>
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
        </div>
      </section>

      <nav aria-label="Related DLF The Primus property guides" className="container-page py-8">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Continue your research
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link
              to="/locations/$slug"
              params={{ slug: "new-gurgaon" }}
              className="font-medium text-gold hover:underline"
            >
              New Gurgaon property guide
            </Link>
            <Link
              to="/ready-to-move-flats-in-gurgaon"
              className="font-medium text-gold hover:underline"
            >
              Ready-to-move flats in Gurgaon
            </Link>
            <Link to="/flats-for-sale-in-gurgaon" className="font-medium text-gold hover:underline">
              Apartments and flats for sale in Gurgaon
            </Link>
            <Link to="/home-loans" className="font-medium text-gold hover:underline">
              Home-loan assistance
            </Link>
          </div>
        </div>
      </nav>

      <section id="enquire" className="container-page py-14 md:py-20">
        <div className="grid gap-10 rounded-[2rem] border border-border bg-card p-7 shadow-sm md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(330px,.72fr)]">
          <div>
            <Badge className="border-gold/30 bg-gold/10 text-gold hover:bg-gold/10">
              Shubh Estate Brokers · Gurgaon Resale Desk
            </Badge>
            <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-navy sm:text-4xl">
              Enquire for the 2576 sq ft DLF The Primus apartment
            </h2>
            <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
              Ask for the current seller expectation, tower, parking, furnishing, inclusions and available
              site-visit slots. We can also compare this unit with other DLF and ready-to-move apartments for
              sale in Gurgaon within your budget.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" variant="gold">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "dlf_primus_cta")}
                >
                  <MessageCircle aria-hidden="true" /> WhatsApp Shubh Estate Brokers
                </a>
              </Button>
              <Button asChild size="lg" variant="goldOutline">
                <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "dlf_primus_cta")}>
                  <Phone aria-hidden="true" /> {CONTACT.phone}
                </a>
              </Button>
            </div>
            <div className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <p className="flex gap-2">
                <FileCheck2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                Document-led resale review
              </p>
              <p className="flex gap-2">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                Loan and valuation coordination
              </p>
            </div>
          </div>
          <EnquiryForm interest="DLF The Primus 2576 sq ft 4 BHK Sector 82A" />
        </div>
      </section>
    </main>
  );
}
