import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Landmark, Scale, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Gurgaon Property Blog | Real Estate, Home Loans & Legal Guides" },
      {
        name: "description",
        content:
          "Practical Gurgaon property guides from Shubh Estate Brokers covering resale homes, investment, home loans, legal due diligence and NRI property decisions.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/blog` }],
  }),
  component: BlogPage,
});

const TOPICS = [
  {
    icon: TrendingUp,
    title: "Gurgaon Property & Investment",
    text: "Sector comparisons, resale opportunities, budgets and practical market insights for buyers and investors.",
    to: "/best-areas-gurgaon-property-investment",
    cta: "Explore investment guide",
  },
  {
    icon: Landmark,
    title: "Home Loans & Mortgage Strategy",
    text: "Understand eligibility, loan structuring, balance transfer and financing options before committing to a property.",
    to: "/home-loans",
    cta: "Read home-loan guidance",
  },
  {
    icon: Scale,
    title: "Legal & Property Due Diligence",
    text: "Buyer-focused guidance on title, documentation, valuation and checks that can reduce transaction risk.",
    to: "/property-services-gurgaon",
    cta: "Explore due-diligence services",
  },
] as const;

const FEATURED = [
  {
    title: "Best Areas in Gurgaon for Property Investment",
    description: "Compare established and emerging Gurgaon corridors through an end-user and investment lens.",
    to: "/best-areas-gurgaon-property-investment",
  },
  {
    title: "Gurgaon Property Buying Advisory",
    description: "A practical framework for selecting, financing and checking a resale or new property before purchase.",
    to: "/property-buying-advisory-gurgaon",
  },
  {
    title: "Gurugram Growth Story",
    description: "Understand the infrastructure and economic factors shaping Gurugram's residential property market.",
    to: "/gurugram-growth-story",
  },
  {
    title: "NRI Property Services in Gurgaon",
    description: "Guidance for overseas Indians buying, selling or managing Gurgaon property from abroad.",
    to: "/nri",
  },
] as const;

function BlogPage() {
  return (
    <main>
      <section className="surface-navy">
        <div className="container-page py-16 md:py-24">
          <p className="eyebrow">Property Knowledge Centre</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-4xl leading-tight md:text-6xl">
                Gurgaon Property Blog & Buyer Guides
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-navy-foreground/75 md:text-lg">
                Practical insights on Gurgaon real estate, resale opportunities, home loans, legal checks and NRI property decisions — with an advisory-first approach rather than generic property news.
              </p>
            </div>
            <div className="rounded-2xl border border-gold/25 bg-white/5 p-6">
              <BookOpen className="size-7 text-gold" aria-hidden="true" />
              <p className="mt-4 font-display text-xl">Looking for an actual property?</p>
              <p className="mt-2 text-sm leading-6 text-navy-foreground/70">
                Move from research to current Gurgaon inventory and discuss financing or due diligence alongside the property search.
              </p>
              <Button asChild variant="gold" className="mt-5">
                <Link to="/properties">View current properties</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {TOPICS.map(({ icon: Icon, title, text, to, cta }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Icon className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-5 font-display text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              <Link to={to} className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:text-gold">
                {cta} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured reading</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Start with these Gurgaon property guides</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {FEATURED.map((article) => (
            <article key={article.title} className="rounded-2xl border border-border p-6 md:p-7">
              <h3 className="font-display text-2xl">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.description}</p>
              <Link to={article.to} className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:text-gold">
                Read guide <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
