import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock3, FileCheck2, Landmark, Video } from "lucide-react";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const MARKETS = {
  usa: {
    label: "USA",
    hrefLang: "en-US",
    title: "Buy Property in Gurgaon from USA | NRI Property Guide",
    description:
      "Gurgaon property buying support for USA-based NRIs and OCIs: remote shortlisting, video walkthroughs, due-diligence coordination, NRI home-loan assistance and transaction support.",
    hero: "Buying property in Gurgaon from the USA",
    body:
      "For USA-based NRIs and OCIs who want a reliable local team in Gurugram for property search, live video walkthroughs, price comparisons, documentation coordination and closing support.",
    timezone: "US time zones",
  },
  canada: {
    label: "Canada",
    hrefLang: "en-CA",
    title: "Buy Property in Gurgaon from Canada | NRI Property Guide",
    description:
      "Gurgaon property buying support for Canada-based NRIs and OCIs: remote shortlisting, video tours, due-diligence coordination, NRI loan assistance and transaction support.",
    hero: "Buying property in Gurgaon from Canada",
    body:
      "For Canada-based NRIs and OCIs who need on-ground Gurugram property support while they remain overseas, from shortlisting and live viewing to financing and transaction coordination.",
    timezone: "Canadian time zones",
  },
  australia: {
    label: "Australia",
    hrefLang: "en-AU",
    title: "Buy Property in Gurgaon from Australia | NRI Property Guide",
    description:
      "Gurgaon property buying support for Australia-based NRIs and OCIs: remote shortlisting, live video tours, documentation coordination, NRI loan assistance and closing support.",
    hero: "Buying property in Gurgaon from Australia",
    body:
      "For Australia-based NRIs and OCIs looking for a Gurugram property advisor who can coordinate search, video walkthroughs, property comparisons, financing and transaction steps remotely.",
    timezone: "Australian time zones",
  },
  europe: {
    label: "UK & Europe",
    hrefLang: "en-GB",
    title: "Buy Property in Gurgaon from UK & Europe | NRI Property Guide",
    description:
      "Gurgaon property support for UK and Europe-based NRIs and OCIs: remote shortlisting, video walkthroughs, documentation coordination, NRI loan assistance and transaction support.",
    hero: "Buying property in Gurgaon from the UK or Europe",
    body:
      "For NRIs and OCIs across the UK and Europe who want local Gurugram execution for property shortlisting, live viewing, price comparisons, financing coordination and transaction support.",
    timezone: "UK and European time zones",
  },
} as const;

type MarketKey = keyof typeof MARKETS;

const PROCESS = [
  {
    icon: Video,
    title: "Remote property shortlisting",
    body: "Compare suitable Gurgaon properties by budget, location, project, construction stage and end-use or investment objective before scheduling live walkthroughs.",
  },
  {
    icon: FileCheck2,
    title: "Documentation coordination",
    body: "We help organise project and property documents for review and coordinate RERA, title and transaction checks with the appropriate professionals before commitment.",
  },
  {
    icon: Landmark,
    title: "NRI financing support",
    body: "Home-loan options, property valuation requirements and lender documentation can be coordinated alongside the property decision, subject to lender eligibility and approval.",
  },
  {
    icon: Clock3,
    title: "Overseas-friendly communication",
    body: "Calls and video walkthroughs are scheduled around your location so the transaction can move forward without depending on frequent travel to India.",
  },
];

const FAQS = [
  {
    q: "Can I shortlist Gurgaon property without travelling to India?",
    a: "Yes. We can narrow options remotely and arrange live video walkthroughs so you can compare the actual unit, layout, surroundings and project before deciding whether a physical visit is necessary.",
  },
  {
    q: "Can you compare resale and new-launch properties for an NRI buyer?",
    a: "Yes. The comparison can include entry price, construction stage, location, developer track record, financing, likely holding period and practical resale or rental considerations.",
  },
  {
    q: "Can you coordinate an NRI home loan?",
    a: "We can coordinate the mortgage process and property-related lender requirements with banks. Final eligibility, rates, valuation and sanction remain subject to the lender's policies and approval.",
  },
];

const ALTERNATES = Object.entries(MARKETS).map(([country, market]) => ({
  rel: "alternate",
  hrefLang: market.hrefLang,
  href: `${SITE_ORIGIN}/nri/${country}`,
}));

export const Route = createFileRoute("/nri/$country")({
  loader: async ({ params }) => {
    if (!(params.country in MARKETS)) throw notFound();
    const market = MARKETS[params.country as MarketKey];
    const { properties } = await listPublicProperties({ data: { limit: 6 } });
    return { market, properties };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData || !(params.country in MARKETS)) {
      return { meta: [{ title: "NRI property guide unavailable" }, { name: "robots", content: "noindex" }] };
    }

    const market = loaderData.market;
    const canonical = `${SITE_ORIGIN}/nri/${params.country}`;
    return {
      meta: [
        { title: market.title },
        { name: "description", content: market.description },
        { property: "og:title", content: market.title },
        { property: "og:description", content: market.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
      ],
      links: [
        { rel: "canonical", href: canonical },
        ...ALTERNATES,
        { rel: "alternate", hrefLang: "x-default", href: `${SITE_ORIGIN}/nri` },
      ],
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
    };
  },
  component: NriCountryPage,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">NRI guide not found</h1>
      <p className="mt-3 text-muted-foreground">
        <Link to="/nri" className="text-gold underline-offset-4 hover:underline">View the main NRI property guide</Link>
      </p>
    </div>
  ),
});

function NriCountryPage() {
  const { market, properties } = Route.useLoaderData() as {
    market: (typeof MARKETS)[MarketKey];
    properties: ListingRow[];
  };

  return (
    <>
      <PageHero
        eyebrow={`NRI Desk · ${market.label}`}
        title={market.hero}
        body={market.body}
      />

      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            Shubh Estate Brokers provides an on-ground point of contact in Gurugram for overseas buyers. We focus on practical property comparison, transparent communication and coordination across the steps that are difficult to manage from another country.
          </p>

          <h2 className="mt-10 font-display text-2xl">How we help from {market.label}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PROCESS.map((step) => (
              <div key={step.title} className="rounded-xl border border-border bg-card p-6">
                <step.icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
            <p className="eyebrow">Remote-first process</p>
            <h2 className="mt-3 font-display text-2xl">Gurgaon execution, scheduled around {market.timezone}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Start with your purpose, preferred Gurgaon sectors or projects, budget, property type and expected timeline. We can then narrow the search before arranging live video walkthroughs and deeper due-diligence coordination.
            </p>
          </div>

          <h2 className="mt-12 font-display text-2xl">Frequently asked questions</h2>
          <dl className="mt-6 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm text-muted-foreground">
            Browse <Link to="/properties" className="text-gold underline-offset-4 hover:underline">current Gurgaon properties</Link>{" "}
            or return to the <Link to="/nri" className="text-gold underline-offset-4 hover:underline">main NRI property guide</Link>.
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Talk to the NRI desk</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Mention {market.label} and your preferred callback time.
          </p>
          <div className="mt-4">
            <EnquiryForm interest={`NRI enquiry — ${market.label}`} compact />
          </div>
        </aside>
      </section>

      {properties.length ? (
        <section className="container-page pb-16">
          <h2 className="font-display text-2xl">Gurgaon properties to explore</h2>
          <p className="mt-2 text-sm text-muted-foreground">Current listings published by Shubh Estate Brokers.</p>
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
