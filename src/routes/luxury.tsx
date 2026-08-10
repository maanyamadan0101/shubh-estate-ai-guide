import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, Landmark, ShieldCheck } from "lucide-react";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const CANONICAL = `${SITE_ORIGIN}/luxury`;

const FAQS = [
  {
    q: "Which Gurgaon locations are commonly considered for luxury apartments?",
    a: "Golf Course Road, Golf Course Extension Road, Dwarka Expressway and selected established or emerging sectors are commonly evaluated. The right location depends on daily use, access, project density, possession stage, specifications and entry price.",
  },
  {
    q: "What should I verify before buying a luxury property in Gurgaon?",
    a: "Review the exact unit, title and approvals, developer track record, construction or maintenance position, total acquisition cost, financing acceptance, comparable inventory and likely resale or rental depth before paying a token amount.",
  },
  {
    q: "Can overseas buyers arrange private video walkthroughs?",
    a: "Yes. NRI and OCI buyers can request scheduled live walkthroughs, written comparisons, financing coordination and transaction follow-up before planning travel to India.",
  },
];

export const Route = createFileRoute("/luxury")({
  loader: async () => listPublicProperties({ data: { limit: 60 } }),
  head: () => ({
    meta: [
      { title: "Luxury Apartments in Gurgaon | Private Property Collection" },
      {
        name: "description",
        content:
          "Explore luxury apartments and premium property in Gurgaon with private viewings, price comparison, due diligence, NRI support and home-loan coordination.",
      },
      { property: "og:title", content: "Luxury Apartments in Gurgaon | Shubh Estate Brokers" },
      {
        property: "og:description",
        content:
          "A curated Gurgaon luxury property collection with founder-led price, documentation and financing advice.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
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
  component: LuxuryPage,
});

function LuxuryPage() {
  const { properties, error } = Route.useLoaderData() as {
    properties: ListingRow[];
    error: string | null;
  };
  const luxuryProperties = properties.filter(
    (property) => property.is_luxury || property.price >= 40_000_000,
  );

  return (
    <>
      <PageHero
        eyebrow="Private Collection · Gurgaon"
        title="Luxury apartments and premium property in Gurgaon"
        body="A carefully selected collection for buyers who want more than a premium brochure—private viewings, realistic price context, documentation coordination and financing advice around the exact property."
      />

      <section className="container-page py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Gem,
              title: "Curated, not crowded",
              body: "Focus on relevant luxury apartments, penthouses, villas and high-value resale opportunities rather than an unfiltered inventory dump.",
            },
            {
              icon: ShieldCheck,
              title: "Risk reviewed",
              body: "Evaluate project position, title and documentation inputs, entry price and exit assumptions before a major commitment.",
            },
            {
              icon: Landmark,
              title: "Finance considered",
              body: "Coordinate eligibility, lender valuation and mortgage requirements alongside the property decision, subject to bank approval.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-xl border border-border bg-card p-6">
              <Icon className="size-5 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Current Luxury Listings
            </p>
            <h2 className="mt-2 font-display text-3xl">Premium homes available for enquiry</h2>
          </div>
          <Link to="/properties" className="text-sm font-medium text-gold hover:underline">
            Browse all Gurgaon properties
          </Link>
        </div>

        {error ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="font-display text-2xl">The collection is being refreshed</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Call or WhatsApp for current private and off-market options.
            </p>
          </div>
        ) : luxuryProperties.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {luxuryProperties.slice(0, 12).map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gold/30 bg-gold/5 p-8 text-center">
            <p className="font-display text-2xl">Private listings are shared on request</p>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Tell us your preferred corridor, budget, configuration and possession timeline. We
              will share relevant available options and arrange private viewings.
            </p>
            <Button asChild variant="gold" className="mt-5">
              <a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a>
            </Button>
          </div>
        )}
      </section>

      <section className="border-y border-border bg-secondary/50 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Luxury Buyer Advisory
            </p>
            <h2 className="mt-2 font-display text-3xl">
              The premium is justified only when the details support it
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                A luxury address can command very different prices by tower, floor, view, layout,
                specifications and possession position. We compare the actual unit with available
                alternatives and examine how much premium is already built into the asking price.
              </p>
              <p>
                Buyers can also request support for private viewings, NRI video walkthroughs, lender
                coordination and transaction follow-up. Legal and tax conclusions should be
                confirmed by qualified professionals for the specific purchase.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link to="/nri" className="text-gold hover:underline">
                NRI property services
              </Link>
              <Link to="/home-loans" className="text-gold hover:underline">
                Luxury home-loan assistance
              </Link>
              <Link to="/contact" className="text-gold hover:underline">
                Request a private consultation
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl">Luxury property questions</h2>
            <div className="mt-5 space-y-5">
              {FAQS.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-medium">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
