import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, FileCheck2, Landmark, Video, Home, BadgeIndianRupee } from "lucide-react";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { LOAN_DISCLAIMER } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

const STEPS = [
  {
    icon: Video,
    title: "Remote property support",
    body: "Live video walkthroughs for buyers and remote property review for owners who want to sell while living overseas.",
  },
  {
    icon: FileCheck2,
    title: "Document coordination",
    body: "We help organise property information and coordinate the documentation and professional checks required for a serious transaction.",
  },
  {
    icon: Landmark,
    title: "NRI banking and financing",
    body: "NRI home-loan and property-related lender coordination can be handled alongside the purchase, subject to bank eligibility and approval.",
  },
  {
    icon: Globe2,
    title: "Overseas-friendly execution",
    body: "Calls, video walkthroughs, buyer discussions and transaction follow-up are coordinated around your country and timezone.",
  },
];

const NRI_MARKETS = [
  {
    slug: "usa",
    label: "USA",
    title: "Buying Gurgaon property from the USA",
    body: "For US-based NRI and OCI buyers searching India, Delhi NCR, Gurgaon or Gurugram property.",
  },
  {
    slug: "canada",
    label: "Canada",
    title: "Buying Gurgaon property from Canada",
    body: "Remote shortlisting and transaction coordination for Canada-based overseas Indian buyers.",
  },
  {
    slug: "australia",
    label: "Australia",
    title: "Buying Gurgaon property from Australia",
    body: "Gurugram property guidance designed around remote viewing and Australian time zones.",
  },
  {
    slug: "europe",
    label: "UK & Europe",
    title: "Buying Gurgaon property from UK & Europe",
    body: "On-ground Gurgaon advisory for NRI and OCI buyers across the UK and continental Europe.",
  },
] as const;

const FAQS = [
  {
    q: "Can an NRI buy residential property in India?",
    a: "NRIs and OCI cardholders can generally purchase residential and commercial property in India, subject to applicable Indian regulations. For transaction-specific legal or tax advice, use an appropriate professional advisor.",
  },
  {
    q: "Can an NRI owner sell a Gurgaon property while living abroad?",
    a: "Yes, much of the marketing, buyer communication and transaction coordination can be handled remotely. Your legal and tax advisors can guide you on any transaction-specific documentation, power of attorney, tax or repatriation requirements.",
  },
  {
    q: "Can you find buyers for an NRI-owned resale property?",
    a: "Yes. We can prepare and market the property, coordinate buyer visits and video walkthroughs, qualify enquiries, negotiate offers and follow the transaction locally in Gurgaon.",
  },
  {
    q: "Is a physical visit always required for an NRI buyer?",
    a: "Not for initial shortlisting. Buyers can compare suitable options through detailed information and live video walkthroughs before deciding whether and when to travel to India.",
  },
  {
    q: "How can someone returning from abroad shortlist a Gurgaon home after many years away?",
    a: "We begin with the returning buyer's current budget, work location, family needs, preferred possession timeline and financing position. Gurgaon sectors and projects are then compared on present-day access, occupied surroundings, schools or hospitals where relevant, maintenance, supply and realistic price context rather than relying on an outdated view of the city.",
  },
  {
    q: "Can you help coordinate Power of Attorney documentation for an NRI property transaction?",
    a: "We can coordinate the property and transaction information with the NRI's appointed lawyer or authorised professional. The form, scope, execution and acceptance of a power of attorney are transaction-specific legal matters and should be confirmed by a qualified lawyer and the relevant registration or lending authority.",
  },
  {
    q: "How is an overseas client's personal and financial information handled?",
    a: "Only information needed for the agreed enquiry, property search, sale or financing coordination should be collected and shared with relevant parties. Client details and private documents are not intended for unrelated promotion or public listing without permission.",
  },
];

const NRI_ALTERNATES = [
  { rel: "alternate", hrefLang: "en-US", href: `${SITE_ORIGIN}/nri/usa` },
  { rel: "alternate", hrefLang: "en-CA", href: `${SITE_ORIGIN}/nri/canada` },
  { rel: "alternate", hrefLang: "en-AU", href: `${SITE_ORIGIN}/nri/australia` },
  { rel: "alternate", hrefLang: "en-GB", href: `${SITE_ORIGIN}/nri/europe` },
  { rel: "alternate", hrefLang: "x-default", href: `${SITE_ORIGIN}/nri` },
] as const;

export const Route = createFileRoute("/nri")({
  loader: async () => {
    const { properties } = await listPublicProperties({ data: { limit: 6 } });
    return { properties };
  },
  head: () => ({
    meta: [
      { title: "NRI Property Services in Gurgaon | Buy or Sell from Abroad" },
      {
        name: "description",
        content:
          "NRI property services in Gurgaon for overseas buyers and sellers: property search, remote walkthroughs, resale marketing, buyer sourcing, financing and transaction coordination.",
      },
      { property: "og:title", content: "NRI Property Services in Gurgaon | Buyers & Sellers" },
      {
        property: "og:description",
        content:
          "Buy or sell Gurgaon property while living overseas with a local team for property search, resale marketing and transaction coordination.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/nri` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/nri` }, ...NRI_ALTERNATES],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: NriPage,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">This page didn't load</h1>
    </div>
  ),
});

function NriPage() {
  const { properties } = Route.useLoaderData() as { properties: ListingRow[] };

  return (
    <>
      <PageHero
        eyebrow="NRI Buyer & Seller Desk"
        title="Buy or sell property in Gurugram from overseas"
        body="A local Gurgaon team for NRIs and OCIs who need property search, remote viewing, resale marketing, buyer sourcing, financing coordination and transaction follow-up while living abroad."
      />

      <section className="container-page pt-12">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7">
            <Home className="size-6 text-gold" aria-hidden="true" />
            <p className="mt-4 eyebrow">NRI Buyers</p>
            <h2 className="mt-2 font-display text-2xl">Looking to buy in Gurgaon?</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Tell us your budget, preferred sectors or projects and objective. We can shortlist
              properties, arrange live video walkthroughs and coordinate the transaction locally.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/properties"
                className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                View Properties
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gold/40 bg-card p-7">
            <BadgeIndianRupee className="size-6 text-gold" aria-hidden="true" />
            <p className="mt-4 eyebrow">NRI Property Owners</p>
            <h2 className="mt-2 font-display text-2xl">Own a Gurgaon property you want to sell?</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              We can prepare and market your resale property, source and qualify buyers, coordinate
              visits, negotiate offers and manage local follow-up while you remain overseas.
            </p>
            <div className="mt-5">
              <Link
                to="/nri-sell-property-gurgaon"
                className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Sell Property from Abroad
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pt-12">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <p className="eyebrow">International NRI Buyer Guides</p>
          <h2 className="mt-3 font-display text-2xl">Buying Gurgaon property from overseas?</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Choose your region for a country-focused buying guide with remote viewing and local
            Gurgaon transaction coordination.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NRI_MARKETS.map((market) => (
              <a
                key={market.slug}
                href={`/nri/${market.slug}`}
                className="rounded-xl border border-border p-5 transition-colors hover:border-gold"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-gold">
                  {market.label}
                </span>
                <h3 className="mt-2 font-display text-lg">{market.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{market.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pt-12">
        <div className="grid gap-6 overflow-hidden rounded-2xl border border-gold/35 bg-gold/5 p-6 md:grid-cols-[minmax(0,1fr)_18rem] md:p-8">
          <div>
            <p className="eyebrow">Featured NRI resale opportunity</p>
            <h2 className="mt-3 font-display text-3xl">
              AIPL Riviera, Sector 103 at around ₹12,000/sq. ft.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              Explore select seller-held 3 and 4 BHK allotments indicated approximately 31% below
              AIPL&apos;s published inaugural reference. The dedicated guide includes the project
              walkthrough, size-wise value comparison, remote transaction support and mandatory
              unit-level RERA checks.
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Indicative resale rate
            </p>
            <p className="mt-2 font-display text-3xl text-gold">₹12,000/sq. ft.</p>
            <Link
              to="/projects/aipl-riviera-resale-sector-103-gurgaon"
              className="mt-5 inline-flex justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              View AIPL Riviera Resale Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="font-display text-2xl">How our NRI desk works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {STEPS.map((step) => (
              <div key={step.title} className="rounded-xl border border-border bg-card p-6">
                <step.icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl">NRI questions we're asked most</h2>
          <dl className="mt-6 space-y-5">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-card p-6">
                <dt className="font-medium">{f.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-xs text-muted-foreground">{LOAN_DISCLAIMER}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Explore{" "}
            <Link to="/luxury" className="text-gold underline-offset-4 hover:underline">
              the private collection
            </Link>{" "}
            or read the{" "}
            <Link
              to="/locations/$slug"
              params={{ slug: "gurgaon" }}
              className="text-gold underline-offset-4 hover:underline"
            >
              Gurgaon location guide
            </Link>
            .
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Talk to the NRI desk</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Buyer or seller — share your country, timezone and requirement.
          </p>
          <div className="mt-4">
            <EnquiryForm interest="NRI buyer or seller enquiry" compact />
          </div>
        </aside>
      </section>

      {properties.length ? (
        <section className="container-page pb-16">
          <h2 className="font-display text-2xl">Currently recommended for NRI buyers</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
