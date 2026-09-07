import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  Dumbbell,
  FileCheck2,
  Landmark,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Trees,
} from "lucide-react";
import { AstaireInventory, AstaireMobileActions } from "@/components/site/AstaireInventory";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { trackContact, trackEvent } from "@/lib/analytics";
import { listPublicProjectHubs, type ProjectHub } from "@/lib/project-hub.functions";
import { formatArea, formatINR, SITE_ORIGIN } from "@/lib/seo";

const SLUG = "bptp-astaire-gardens-sector-70a";
const PATH = "/projects/bptp-astaire-gardens-sector-70a-gurgaon";
const canonical = `${SITE_ORIGIN}${PATH}`;
const title = "BPTP Astaire Gardens Sector 70A Gurgaon | Properties for Sale";
const description =
  "Compare current BPTP Astaire Gardens Sector 70A Gurgaon builder floors for sale, asking prices, areas, floors, features and buyer checks with Shubh Estate Brokers.";
const LAST_VERIFIED = "6 September 2026";

const fallbackHub: ProjectHub = {
  name: "BPTP Astaire Gardens",
  slug: SLUG,
  sector: "Sector 70A",
  locality: "Southern Peripheral Road",
  city: "Gurugram",
  description: null,
  rera_number: "RC/REP/HARERA/GGM/487/219/2021/55 dated 21.09.2021",
  possession_date: null,
  builder_name: "BPTP (promoter: Countrywide Promoters Private Limited)",
  updated_at: null,
  listings: [],
};

const FAQs = [
  [
    "Where is BPTP Astaire Gardens located?",
    "BPTP Astaire Gardens is in Sector 70A, Gurugram. The location connects with the wider Southern Peripheral Road, Golf Course Extension Road, Sohna Road and NH-48 road network.",
  ],
  [
    "Is BPTP Astaire Gardens ready to move?",
    "The community includes established and occupied/resale property, but possession and completion must be checked for the exact phase and unit. Haryana RERA currently labels registration GGM/487/219/2021/55 as lapsed after 31 August 2026.",
  ],
  [
    "What types of properties may be available for resale?",
    "Astaire Gardens includes plotted colony, floor and villa formats in the Haryana RERA record. This page displays only currently published Shubh Estate Brokers listings; availability changes by owner inventory.",
  ],
  [
    "What is the current price in BPTP Astaire Gardens?",
    "Any prices shown here are published asking prices for specific active Shubh Estate Brokers listings, not a project-wide market value. If no listing is published, request a current owner-inventory check.",
  ],
  [
    "Are 3 BHK or 4 BHK builder floors available?",
    "Use the live filters above. If a configuration is absent, share your exact requirement and Shubh Estate Brokers can check current owner availability.",
  ],
  [
    "Does Astaire Gardens have a clubhouse and swimming pool?",
    "BPTP's official project page promotes a community clubhouse, gym, swimming pool, landscaped lawns, pergolas and gazebos, a three-acre Garden of Dreams and gated security.",
  ],
  [
    "What should buyers check before purchasing a resale floor?",
    "Verify the exact title and ownership chain, sanctioned layout, area basis, floor, parking, roof rights, property condition, dues, transfer conditions and lender valuation before committing funds.",
  ],
  [
    "Can I get a home loan for a resale property?",
    "Home-loan assistance is available subject to applicant eligibility, lender policy, property eligibility, valuation and documentation.",
  ],
  [
    "How can I arrange a site visit?",
    "Use the enquiry form, WhatsApp button or call Shubh Estate Brokers. Availability should be reconfirmed before travel.",
  ],
  [
    "How can an owner list a property through Shubh Estate Brokers?",
    "Owners can use the Sell My Property or Give Selling Mandate links below. Private owner contact details and documents are not displayed publicly.",
  ],
] as const;

export const Route = createFileRoute("/projects/bptp-astaire-gardens-sector-70a-gurgaon")({
  loader: async () => {
    const hubs = await listPublicProjectHubs();
    return (
      hubs.find(
        (hub) =>
          hub.slug === SLUG || hub.name.toLocaleLowerCase("en-IN").includes("astaire gardens"),
      ) ?? fallbackHub
    );
  },
  head: ({ loaderData }) => {
    const listings = loaderData?.listings ?? [];
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
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
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: title,
            description,
            url: canonical,
            dateModified: "2026-09-07",
            about: {
              "@type": "Place",
              name: "BPTP Astaire Gardens",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sector 70A",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
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
                name: "Projects",
                item: `${SITE_ORIGIN}/projects`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Sector 70A",
                item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
              },
              { "@type": "ListItem", position: 4, name: "BPTP Astaire Gardens", item: canonical },
            ],
          }),
        },
        ...(listings.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  name: "Current BPTP Astaire Gardens resale inventory",
                  numberOfItems: listings.length,
                  itemListElement: listings.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.title,
                    url: `${SITE_ORIGIN}${item.href}`,
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: AstairePage,
});

function priceRange(listings: ProjectHub["listings"]) {
  const values = listings
    .map((item) => item.price)
    .filter((value): value is number => Boolean(value && value > 0));
  if (!values.length) return null;
  const min = Math.min(...values),
    max = Math.max(...values);
  return min === max ? formatINR(min) : `${formatINR(min)} – ${formatINR(max)}`;
}

function areaRange(listings: ProjectHub["listings"]) {
  const values = listings
    .map((item) => item.area_sqft)
    .filter((value): value is number => Boolean(value && value > 0));
  if (!values.length) return null;
  const min = Math.min(...values),
    max = Math.max(...values);
  return min === max ? formatArea(min) : `${formatArea(min)} – ${formatArea(max)}`;
}

function AstairePage() {
  const hub = Route.useLoaderData();
  const saleListings = hub.listings.filter((item) => item.listing_type !== "rent");
  const rentListings = hub.listings.filter((item) => item.listing_type === "rent");
  const asking = priceRange(saleListings);
  const areas = areaRange(saleListings);
  const configs = [...new Set(saleListings.map((item) => item.bhk).filter(Boolean))].join(", ");
  const updated = hub.updated_at
    ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(
        new Date(hub.updated_at),
      )
    : null;

  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-page py-10 md:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/">Home</Link>
            <span className="px-2">/</span>
            <Link to="/projects">Projects</Link>
            <span className="px-2">/</span>
            <span>Sector 70A</span>
            <span className="px-2">/</span>
            <span className="text-foreground">BPTP Astaire Gardens</span>
          </nav>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Gurgaon Project & Current Inventory Guide
          </p>
          <h1 className="mt-3 max-w-5xl font-display text-4xl leading-tight md:text-6xl">
            BPTP Astaire Gardens, Sector 70A Gurgaon
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
            Compare currently published resale properties in BPTP Astaire Gardens with their asking
            price, configuration, area, floor, facing, parking and possession status before
            shortlisting a visit.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="gold">
              <a
                href="#properties"
                onClick={() => trackEvent("project_view", { project: "BPTP Astaire Gardens" })}
              >
                View Current Properties
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={CONTACT.whatsapp} onClick={() => trackContact("whatsapp", "astaire_hero")}>
                WhatsApp Shubh Estate Brokers
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "astaire_hero")}>
                Call
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#enquire">Request a Property Shortlist</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Location", "Sector 70A, Gurugram"],
            ["Developer brand", "BPTP"],
            ["Property character", "Plots, floors & villas"],
            ["Current sale inventory", `${saleListings.length} published`],
            ...(rentListings.length
              ? [["Current rental inventory", `${rentListings.length} published`]]
              : []),
            ...(asking ? [["Published asking range", asking]] : []),
            ...(areas ? [["Published size range", areas]] : []),
            ...(configs ? [["Published configurations", configs]] : []),
            ["RERA reference", "GGM/487/219/2021/55"],
            ...(updated ? [["Inventory updated", updated]] : []),
          ].map(([label, value]) => (
            <div key={label} className="border-b border-border px-5 py-5 sm:border-r">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
              <p className="mt-1 font-display text-lg">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <nav
        className="sticky top-16 z-20 border-b border-border bg-background/95 backdrop-blur"
        aria-label="Project sections"
      >
        <div className="container-page flex gap-5 overflow-x-auto py-3 text-sm">
          {[
            ["Overview", "overview"],
            ["Properties for Sale", "properties"],
            ["Price & Sizes", "price-sizes"],
            ["Configurations", "properties"],
            ["Amenities", "amenities"],
            ["Buyer Checks", "buyer-checks"],
            ["Location", "location"],
            ["FAQ", "faq"],
          ].map(([label, id]) => (
            <a key={label} href={`#${id}`} className="whitespace-nowrap hover:text-gold">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main className="container-page space-y-16 py-12 pb-28 md:pb-12">
        <section id="overview" className="scroll-mt-36 grid gap-8 lg:grid-cols-[1.4fr_.6fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Project overview
            </p>
            <h2 className="mt-2 font-display text-3xl">
              About BPTP Astaire Gardens Sector 70A Gurgaon
            </h2>
            <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
              <p>
                Astaire Gardens is an established residential community in Sector 70A with plotted,
                floor and villa formats recorded by Haryana RERA. Its low-rise and plotted character
                can appeal to buyers who prefer a more independent residential format, but the exact
                sanctioned use, construction, possession and documentation must be verified for each
                property.
              </p>
              <p>
                BPTP's official project page highlights landscaped lawns, pergolas and gazebos, a
                community clubhouse, gym, swimming pool, gated security and the approximately
                three-acre Garden of Dreams. Resale buyers should compare the exact usable area,
                floor, parking, roof rights, condition and seller documentation rather than relying
                only on the project name.
              </p>
            </div>
          </div>
          <aside className="rounded-2xl border border-amber-300/60 bg-amber-50 p-6 text-sm text-amber-950">
            <p className="font-semibold">Current regulatory note</p>
            <p className="mt-2 leading-6">
              Haryana RERA identifies Countrywide Promoters Private Limited as promoter and
              currently lists registration GGM/487/219/2021/55 as lapsed after 31 August 2026.
              Buyers should check the exact phase/unit and latest authority record.
            </p>
            <p className="mt-3 text-xs">Project facts reviewed {LAST_VERIFIED}.</p>
          </aside>
        </section>

        <section id="properties" className="scroll-mt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Live Shubh inventory
          </p>
          <h2 className="mt-2 font-display text-3xl">
            Properties for Sale in BPTP Astaire Gardens
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
            Only published Shubh Estate Brokers records appear below. Filters change the on-page
            view and do not create crawlable query-string duplicates.
          </p>
          <AstaireInventory listings={hub.listings} />
        </section>

        <section id="price-sizes" className="scroll-mt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Inventory intelligence
          </p>
          <h2 className="mt-2 font-display text-3xl">BPTP Astaire Gardens Current Asking Prices</h2>
          {saleListings.length ? (
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="min-w-[620px] w-full text-left text-sm">
                <thead className="bg-muted">
                  <tr>
                    {["Configuration", "Area", "Published asking price", "Floor", "Updated"].map(
                      (h) => (
                        <th key={h} className="p-4 font-medium">
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {saleListings.map((item) => (
                    <tr key={item.id} className="border-t border-border">
                      <td className="p-4">{item.bhk ?? "Property"}</td>
                      <td className="p-4">
                        {item.area_sqft ? formatArea(item.area_sqft) : "Confirm"}
                      </td>
                      <td className="p-4">{item.display_price || formatINR(item.price)}</td>
                      <td className="p-4">{item.floor ?? "Confirm"}</td>
                      <td className="p-4">
                        {item.updated_at
                          ? new Date(item.updated_at).toLocaleDateString("en-IN")
                          : "Reconfirm"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 leading-7 text-muted-foreground">
              Contact Shubh Estate Brokers for current unit-wise asking prices, areas, floor
              positions and availability in BPTP Astaire Gardens.
            </p>
          )}
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Asking prices vary with plot or covered area, floor, age, furnishing, corner or park
            position, roof rights, parking, condition, documentation and seller expectation.
          </p>
        </section>

        <section id="amenities" className="scroll-mt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Officially promoted amenities
          </p>
          <h2 className="mt-2 font-display text-3xl">Community and open-space features</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Trees, "Green spaces", "Garden of Dreams, landscaped and manicured lawns"],
              [Dumbbell, "Sports & fitness", "Gymnasium and swimming pool"],
              [Building2, "Community", "Community clubhouse, pergolas and gazebos"],
              [ShieldCheck, "Safety", "Gated community with 24x7 security"],
            ].map(([Icon, heading, text]) => {
              const I = Icon as typeof Trees;
              return (
                <div key={String(heading)} className="rounded-xl border border-border bg-card p-5">
                  <I className="size-5 text-gold" />
                  <h3 className="mt-3 font-medium">{String(heading)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{String(text)}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Community availability, operating status, charges and access should be confirmed during
            inspection.
          </p>
        </section>

        <section
          id="buyer-checks"
          className="scroll-mt-36 rounded-3xl bg-navy p-7 text-navy-foreground md:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Shubh buyer advisory
          </p>
          <h2 className="mt-2 font-display text-3xl">Before You Buy in BPTP Astaire Gardens</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                CheckCircle2,
                "Exact Unit Verification",
                "Verify floor, area basis, parking, roof rights and inclusions.",
              ],
              [
                FileCheck2,
                "Title & Documentation",
                "Check ownership chain, sanctioned documents and transaction papers.",
              ],
              [
                Scale,
                "Price Assessment",
                "Compare the exact property with competing owner inventory.",
              ],
              [
                Landmark,
                "Loan & Valuation",
                "Check lender acceptance, valuation, eligibility and own contribution.",
              ],
              [
                Sparkles,
                "Maintenance / Transfer Costs",
                "Confirm dues and applicable transfer-related costs.",
              ],
              [
                MapPin,
                "Site Inspection",
                "Check condition, access, view, common areas and surroundings.",
              ],
            ].map(([Icon, heading, text]) => {
              const I = Icon as typeof Trees;
              return (
                <div
                  key={String(heading)}
                  className="rounded-xl border border-white/15 bg-white/5 p-5"
                >
                  <I className="size-5 text-gold" />
                  <h3 className="mt-3 font-medium">{String(heading)}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{String(text)}</p>
                </div>
              );
            })}
          </div>
          <Button asChild variant="gold" className="mt-7">
            <a href="#enquire">Request Buyer Due-Diligence Assistance</a>
          </Button>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7">
            <Landmark className="size-6 text-gold" />
            <h2 className="mt-3 font-display text-2xl">Home Loan Assistance Available</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Home-loan assistance is available subject to applicant eligibility, lender policy,
              property eligibility, valuation and documentation.
            </p>
            <div className="mt-5 flex gap-4 text-sm">
              <Link to="/home-loans" className="text-gold hover:underline">
                Home loans
              </Link>
              <Link to="/emi-calculator" className="text-gold hover:underline">
                EMI calculator
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="font-display text-2xl">Own a Property in BPTP Astaire Gardens?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              We can help assess the asking price, documentation, buyer positioning and financing
              feasibility before marketing your floor, apartment, plot or villa.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="goldOutline">
                <Link to="/sell-property-gurgaon">Sell My Property</Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  to="/mandate-to-sell-property-in-gurgaon"
                  onClick={() =>
                    trackEvent("seller_cta_click", { project: "BPTP Astaire Gardens" })
                  }
                >
                  Give Selling Mandate
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="location" className="scroll-mt-36 grid gap-7 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Location</p>
            <h2 className="mt-2 font-display text-3xl">
              BPTP Astaire Gardens Location — Sector 70A Gurgaon
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Sector 70A connects into the Southern Peripheral Road area and the wider Golf Course
              Extension Road, Sohna Road and NH-48 network. Schools, hospitals, commercial areas and
              everyday shopping are available across the surrounding sectors; exact routes and
              travel times vary with traffic and should be checked for the buyer's regular journey.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href="/locations/southern-peripheral-road" className="text-gold">
                SPR property guide
              </a>
              <Link to="/locations/golf-course-extension-road" className="text-gold">
                Golf Course Extension Road
              </Link>
              <Link to="/flats-for-sale-in-gurgaon" className="text-gold">
                Flats for sale in Gurgaon
              </Link>
              <a
                href="/capital-residences-360-3-bhk-for-sale-sector-70a-gurgaon"
                className="text-gold"
              >
                Capital Residences 360 resale in Sector 70A
              </a>
            </div>
          </div>
          <iframe
            title="Map showing BPTP Astaire Gardens in Sector 70A Gurugram"
            src="https://www.google.com/maps?q=BPTP%20Astaire%20Gardens%20Sector%2070A%20Gurugram&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full rounded-2xl border border-border"
          />
        </section>

        <section id="faq" className="scroll-mt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Buyer questions
          </p>
          <h2 className="mt-2 font-display text-3xl">BPTP Astaire Gardens FAQ</h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQs.map(([q, a]) => (
              <details key={q} className="group p-5">
                <summary className="cursor-pointer font-medium">{q}</summary>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="enquire"
          className="scroll-mt-36 grid gap-8 rounded-3xl border border-gold/30 bg-gold/5 p-7 md:grid-cols-[1fr_1.1fr] md:p-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Shortlist with an advisor
            </p>
            <h2 className="mt-2 font-display text-3xl">Request current owner inventory</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Tell us the configuration, budget, preferred floor and area. We will reconfirm
              availability before recommending a visit.
            </p>
            <div className="mt-5 flex gap-4 text-sm">
              <a
                href={CONTACT.whatsapp}
                onClick={() => trackContact("whatsapp", "astaire_enquiry")}
                className="flex items-center gap-2 text-gold"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a
                href={CONTACT.phoneHref}
                onClick={() => trackContact("phone", "astaire_enquiry")}
                className="flex items-center gap-2 text-gold"
              >
                <Phone className="size-4" /> Call
              </a>
            </div>
          </div>
          <EnquiryForm
            interest="BPTP Astaire Gardens resale inventory and buyer due diligence"
            includeRequirements
            submitLabel="Request Property Shortlist"
          />
        </section>

        <section className="text-sm leading-7 text-muted-foreground">
          <p>
            Inventory and asking prices can change. Reconfirm the exact property's availability,
            price, area, specifications, ownership documentation and applicable charges before
            making a financial commitment.
          </p>
          <p className="mt-3">
            Project facts:{" "}
            <a
              href="https://www.bptp.com/projects/astaire-gardens"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:underline"
            >
              official BPTP project page
            </a>{" "}
            and{" "}
            <a
              href="https://haryanarera.gov.in/view_project/searchprojectDetail/1696"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:underline"
            >
              Haryana RERA project record
            </a>
            .
          </p>
        </section>
      </main>
      <AstaireMobileActions />
    </>
  );
}
