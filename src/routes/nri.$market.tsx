import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Globe2, SearchCheck, ShieldCheck, Video } from "lucide-react";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE_ORIGIN } from "@/lib/seo";

const MARKETS = {
  usa: {
    slug: "usa",
    name: "United States",
    shortName: "USA",
    title: "Buy Property in Gurgaon from USA | NRI Property India",
    description:
      "Gurgaon and Gurugram property advisory for NRI and OCI buyers in the USA: remote shortlisting, video walkthroughs, due-diligence coordination and NRI home-loan support.",
    intro:
      "For NRI and OCI buyers in the United States looking at property in India, Delhi NCR or Gurugram, we provide a single advisory point in Gurgaon from first shortlist to possession support.",
    remote:
      "We coordinate calls and live video walkthroughs around US time zones, compare shortlisted projects side by side, and keep the process documented so you can make decisions without relying only on sales-brochure information.",
    focus:
      "Typical searches we help with include buying property in Gurgaon from the USA, NRI investment property in Gurugram, luxury homes in Delhi NCR, and ready-to-move apartments in Gurgaon for overseas Indians.",
    searches: [
      "Buy property in Gurgaon from USA",
      "NRI property investment in Gurugram India",
      "Delhi NCR luxury property for NRI buyers",
      "Ready-to-move property in Gurgaon from USA",
    ],
  },
  canada: {
    slug: "canada",
    name: "Canada",
    shortName: "Canada",
    title: "Buy Property in Gurgaon from Canada | NRI Property India",
    description:
      "Gurgaon property advisory for NRI and OCI buyers in Canada, with remote project comparison, video tours, documentation coordination and NRI mortgage support in India.",
    intro:
      "For buyers in Canada researching property in India, Delhi NCR or Gurgaon, we help narrow a large market into a practical shortlist based on use, budget, possession stage and location.",
    remote:
      "The process is designed for remote decision-making: scheduled walkthroughs, written comparisons, document checklists and coordination with lenders or independent legal professionals in India when required.",
    focus:
      "We commonly assist with searches around Gurugram apartments from Canada, NRI home buying in India, premium property in Gurgaon, and long-term family or investment purchases in Delhi NCR.",
    searches: [
      "Buy property in Gurgaon from Canada",
      "NRI property in India for Canadian residents",
      "Gurugram apartments for overseas Indians",
      "Delhi NCR property advisory from Canada",
    ],
  },
  australia: {
    slug: "australia",
    name: "Australia",
    shortName: "Australia",
    title: "Buy Property in Gurgaon from Australia | NRI Property India",
    description:
      "Property buying support in Gurgaon and Gurugram for NRI and OCI buyers in Australia, including remote shortlisting, project due-diligence coordination and NRI home-loan assistance.",
    intro:
      "For Australia-based NRIs and OCI buyers considering real estate in India, we provide local Gurgaon execution with remote communication across Australian time zones.",
    remote:
      "We can organise live unit walkthroughs, compare developer and project options, coordinate banking discussions in India and structure the buying process around your travel schedule rather than requiring repeated visits.",
    focus:
      "The page is built for buyers searching for property in Gurgaon from Australia, NRI investment in Gurugram, Delhi NCR apartments, and premium or ready-to-move homes in India.",
    searches: [
      "Buy property in Gurgaon from Australia",
      "NRI property investment in Gurugram",
      "Delhi NCR apartments for overseas buyers",
      "India property advisory for Australian NRIs",
    ],
  },
  europe: {
    slug: "europe",
    name: "Europe",
    shortName: "Europe",
    title: "Buy Property in Gurgaon from Europe | NRI Property India",
    description:
      "Gurgaon and Delhi NCR property advisory for NRI and OCI buyers across Europe, with remote shortlisting, video tours, due-diligence coordination and NRI financing support.",
    intro:
      "For NRIs and OCI buyers across the UK and continental Europe searching property in India, Delhi NCR, Gurgaon or Gurugram, we provide on-ground advisory and transaction coordination from Gurgaon.",
    remote:
      "We work remotely across European time zones, arrange live walkthroughs and provide structured project comparisons so buyers can evaluate location, possession stage, developer track record and documentation before travelling.",
    focus:
      "Typical enquiries include buying Gurgaon property from Europe, luxury homes in Gurugram, Delhi NCR investment property for NRIs, and family homes in India for overseas residents.",
    searches: [
      "Buy property in Gurgaon from Europe",
      "NRI property investment in Delhi NCR",
      "Luxury property in Gurugram for overseas Indians",
      "India property advisory for European NRIs",
    ],
  },
} as const;

type MarketKey = keyof typeof MARKETS;

const REGIONAL_ALTERNATES = [
  { hreflang: "en-US", href: `${SITE_ORIGIN}/nri/usa` },
  { hreflang: "en-CA", href: `${SITE_ORIGIN}/nri/canada` },
  { hreflang: "en-AU", href: `${SITE_ORIGIN}/nri/australia` },
  { hreflang: "x-default", href: `${SITE_ORIGIN}/nri` },
];

const PROCESS = [
  {
    icon: SearchCheck,
    title: "Shortlist the right Gurgaon micro-market",
    body: "Compare Golf Course Road, Golf Course Extension Road, Dwarka Expressway, SPR, Sohna Road and New Gurgaon against your own use case.",
  },
  {
    icon: Video,
    title: "Inspect remotely before you travel",
    body: "Use scheduled video walkthroughs and written comparisons to reduce unnecessary travel and avoid making decisions from marketing material alone.",
  },
  {
    icon: ShieldCheck,
    title: "Coordinate independent checks",
    body: "We can coordinate project documents, RERA information, lender requirements and your chosen legal or tax professionals before major commitments.",
  },
  {
    icon: Globe2,
    title: "One point of contact in Gurugram",
    body: "Keep property, builder, loan and closing coordination with one local advisory team while you remain overseas.",
  },
];

export const Route = createFileRoute("/nri/$market")({
  loader: async ({ params }) => {
    const key = params.market as MarketKey;
    const market = MARKETS[key];
    if (!market) throw notFound();
    return { market };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "NRI property guide unavailable" }, { name: "robots", content: "noindex" }] };
    }

    const { market } = loaderData;
    const canonical = `${SITE_ORIGIN}/nri/${market.slug}`;
    const links: Array<Record<string, string>> = [{ rel: "canonical", href: canonical }];

    if (market.slug !== "europe") {
      for (const alternate of REGIONAL_ALTERNATES) {
        links.push({ rel: "alternate", hrefLang: alternate.hreflang, href: alternate.href });
      }
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: "NRI Property Services", item: `${SITE_ORIGIN}/nri` },
        { "@type": "ListItem", position: 3, name: market.name, item: canonical },
      ],
    };

    return {
      meta: [
        { title: market.title },
        { name: "description", content: market.description },
        { property: "og:title", content: market.title },
        { property: "og:description", content: market.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
      ],
      links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) }],
    };
  },
  component: MarketPage,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">NRI market guide not found</h1>
      <p className="mt-3 text-muted-foreground">
        <Link to="/nri" className="text-gold underline-offset-4 hover:underline">Visit the NRI property desk</Link>
      </p>
    </div>
  ),
});

function MarketPage() {
  const { market } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow={`NRI Desk · ${market.shortName}`}
        title={`Buying property in Gurgaon from ${market.name}`}
        body={market.intro}
      />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-2xl">Remote property buying support in India</h2>
            <p className="mt-4 text-muted-foreground">{market.remote}</p>
            <p className="mt-4 text-muted-foreground">{market.focus}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PROCESS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <Icon className="size-5 text-gold" aria-hidden="true" />
                <h2 className="mt-3 font-display text-lg">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Popular search needs we cover</h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {market.searches.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl">Explore Gurgaon and Gurugram locations</h2>
            <p className="mt-3 text-muted-foreground">
              Gurgaon (officially Gurugram) is part of Delhi NCR. Start with our local guides before comparing individual projects.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link to="/locations/$slug" params={{ slug: "gurgaon" }} className="text-gold underline-offset-4 hover:underline">Gurgaon property guide</Link>
              <Link to="/locations/$slug" params={{ slug: "golf-course-road" }} className="text-gold underline-offset-4 hover:underline">Golf Course Road</Link>
              <Link to="/locations/$slug" params={{ slug: "golf-course-extension-road" }} className="text-gold underline-offset-4 hover:underline">Golf Course Extension Road</Link>
              <Link to="/locations/$slug" params={{ slug: "dwarka-expressway" }} className="text-gold underline-offset-4 hover:underline">Dwarka Expressway</Link>
              <Link to="/locations/$slug" params={{ slug: "new-gurgaon" }} className="text-gold underline-offset-4 hover:underline">New Gurgaon</Link>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-sm text-muted-foreground">
            <p>
              Also see our <Link to="/nri" className="text-gold underline-offset-4 hover:underline">NRI property buying guide</Link>,{" "}
              <Link to="/luxury" className="text-gold underline-offset-4 hover:underline">luxury Gurgaon collection</Link> and{" "}
              <Link to="/home-loans" className="text-gold underline-offset-4 hover:underline">home-loan assistance</Link>.
            </p>
            <p className="mt-3 text-xs">
              Information on this page is general. Legal, tax, foreign-exchange and documentation requirements can depend on the buyer and transaction; use qualified professional advice where required.
            </p>
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Talk to the Gurgaon NRI desk</h2>
          <p className="mt-1 text-xs text-muted-foreground">Tell us your country, timezone, budget and preferred Gurgaon corridor.</p>
          <div className="mt-4">
            <EnquiryForm interest={`NRI enquiry — ${market.name}`} compact />
          </div>
        </aside>
      </section>
    </>
  );
}
