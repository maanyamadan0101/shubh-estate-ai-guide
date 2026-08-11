import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeIndianRupee,
  Banknote,
  Building2,
  FileCheck2,
  FileSearch,
  Handshake,
  KeyRound,
  Landmark,
  PlayCircle,
  Quote,
  Scale,
  ShieldCheck,
  TrendingUp,
  Wrench,
} from "lucide-react";
import heroImage from "@/assets/hero-gurugram.jpg";
import { HomeActionPanel } from "@/components/site/HomeActionPanel";
import { ListingCard } from "@/components/site/ListingCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT, FAQS } from "@/data/site";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async () =>
    listPublicProperties({
      data: { limit: 6, statuses: ["under_construction", "new_launch"] },
    }),
  head: () => {
    const title = "Property in Gurgaon | Shubh Estate Brokers";
    const description =
      "Explore verified property in Gurgaon with founder-led advice for buying, selling, luxury apartments, NRI services, home loans, valuation and due diligence.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          property: "og:title",
          content: "Property in Gurgaon | Founder-led Gurugram Advisory",
        },
        {
          property: "og:description",
          content:
            "Verified Gurgaon properties with budget-first shortlisting, price context, mortgage coordination and transaction support.",
        },
        { property: "og:url", content: SITE_ORIGIN },
      ],
      links: [{ rel: "canonical", href: SITE_ORIGIN }],
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
    };
  },
  component: Home,
});

const WHY = [
  {
    icon: Landmark,
    title: "Banking Perspective",
    body: "Advice shaped by years inside banking, mortgage and credit environments — not only by brokerage experience.",
  },
  {
    icon: Scale,
    title: "Legal & Title Review",
    body: "We look at ownership, approvals, documentation and RERA position before asking you to commit capital.",
  },
  {
    icon: Banknote,
    title: "Mortgage Structuring",
    body: "Financing is evaluated alongside the property so the purchase fits your cash flow and long-term plan.",
  },
  {
    icon: TrendingUp,
    title: "Investment Discipline",
    body: "Entry price, micro-market supply, rental demand, developer quality and likely exit are reviewed together.",
  },
  {
    icon: ShieldCheck,
    title: "Fair & Transparent",
    body: "The objective is not to sell every property. We are comfortable advising a client not to buy when the risk-reward is weak.",
  },
  {
    icon: FileCheck2,
    title: "End-to-End Execution",
    body: "Shortlisting, valuation, negotiation, documentation, financing coordination and transaction support in one advisory relationship.",
  },
];

const MARKET_FACTS = [
  ["250+", "Fortune 500 companies in Gurugram"],
  ["100+ mn sq. ft.", "Completed office stock"],
  ["~US$6.0 bn", "Investment inflows since 2018"],
];

const PROPERTY_SERVICES = [
  {
    icon: Wrench,
    label: "Remote Owners",
    title: "Property Management",
    body: "Inspection, maintenance, tenant and renewal coordination for NRI and outstation owners.",
    to: "/property-services-gurgaon",
  },
  {
    icon: BadgeIndianRupee,
    label: "Reliable Price Context",
    title: "Property Valuation",
    body: "Sale or rental price positioning based on the exact unit and available market evidence.",
    to: "/property-services-gurgaon",
  },
  {
    icon: FileSearch,
    label: "Document Confidence",
    title: "Due-Diligence Coordination",
    body: "Document checklist, RERA context and coordination with qualified legal and lending professionals.",
    to: "/property-services-gurgaon",
  },
  {
    icon: Landmark,
    label: "Existing Borrowers",
    title: "Loan Takeover & Smart OD",
    body: "Compare balance transfer, top-up and eligible overdraft-linked home-loan structures.",
    to: "/home-loans",
  },
  {
    icon: KeyRound,
    label: "Tenants",
    title: "Find a Rental Home",
    body: "Requirement-based rental shortlisting, planned visits and lease-process coordination.",
    to: "/properties",
    search: { purpose: "rent" },
  },
  {
    icon: Handshake,
    label: "Property Owners",
    title: "Sell or Rent Out",
    body: "Pricing, media, qualified enquiries, negotiation and local transaction follow-up.",
    to: "/sell-property-gurgaon",
  },
] as const;

function Home() {
  const { properties: newProjects = [] } = Route.useLoaderData() as {
    properties: ListingRow[];
    error: string | null;
  };

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Gurugram skyline at twilight"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.18_0.044_248/0.98)_0%,oklch(0.2_0.045_248/0.9)_48%,oklch(0.2_0.045_248/0.72)_100%)]" />

        <div className="container-page py-14 text-navy-foreground md:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-3xl animate-rise">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold">
                  Founder-led Gurgaon advisory
                </span>
                <a
                  href={CONTACT.googleBusinessProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/85 hover:border-gold/50 hover:text-gold"
                >
                  View Google Business Profile
                </a>
              </div>
              <h1 className="mt-5 font-display text-4xl leading-[1.06] text-white sm:text-5xl md:text-6xl">
                Gurgaon property decisions, backed by
                <span className="text-gradient-gold"> banking-grade judgement</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
                Buy, rent, sell, manage or finance property with one Gurgaon team for price context,
                due-diligence coordination, loan structuring and local execution.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="xl">
                  <Link to="/properties" search={{ purpose: "sale" }}>
                    Explore Current Properties
                  </Link>
                </Button>
                <Button asChild variant="goldOutline" size="xl">
                  <a href={CONTACT.phoneHref}>Speak with Arun Madan</a>
                </Button>
              </div>
              <ul className="mt-7 grid max-w-2xl gap-2 text-sm text-white/80 sm:grid-cols-2">
                {[
                  "Current resale and rental inventory",
                  "New and under-construction projects",
                  "NRI and remote-owner coordination",
                  "Home loans, takeover and smart OD options",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <HomeActionPanel />
          </div>

          <div className="mt-12 grid gap-3 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.14em] text-white/65 sm:grid-cols-2 lg:grid-cols-4">
            <span>Gurgaon-focused advice</span>
            <span>Mortgage & banking experience</span>
            <span>Remote support for owners & NRIs</span>
            <span>Call, WhatsApp or video consultation</span>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHead
            eyebrow="What can we solve for you?"
            title="Property services designed around real client situations"
            body="Choose the outcome you need instead of navigating a long portal menu. Each service leads to a clear next step."
          />
          <Button asChild variant="outline">
            <Link to="/property-services-gurgaon">View all property services</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROPERTY_SERVICES.map(({ icon: Icon, label, title, body, to, ...service }) => (
            <Link
              key={title}
              to={to}
              {...("search" in service ? { search: service.search } : {})}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-gold">
                  {label}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl group-hover:text-gold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-16 md:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHead
              eyebrow="New project discovery"
              title="Under-construction and new-launch opportunities"
              body="Compare live inventory with construction-stage, RERA, payment-plan, financing and exit-risk context. Official project videos can be added to each listing when available."
            />
            <Button asChild variant="navy">
              <Link to="/under-construction-projects-gurgaon">
                <PlayCircle aria-hidden="true" />
                View New Projects
              </Link>
            </Button>
          </div>

          {newProjects.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newProjects.slice(0, 6).map((property) => (
                <ListingCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <Building2 className="mx-auto size-7 text-gold" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl">Ask for the latest project shortlist</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                The advisory team can share current new-launch and under-construction options by
                budget and corridor.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-2xl surface-navy p-8 md:p-10">
            <p className="eyebrow">Founder Profile</p>
            <h2 className="mt-4 font-display text-3xl text-navy-foreground">Arun Madan</h2>
            <p className="mt-2 text-sm text-navy-foreground/70">
              Founder & Promoter · MBA · LLB · Former Banking Professional
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {["Mortgage Expert", "Property Valuation Specialist", "Legal Title Assessment"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-navy-foreground/15 bg-white/5 p-4 text-sm text-navy-foreground/85"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.18em] text-navy-foreground/55">
              Professional experience includes
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["HDFC Bank", "ICICI Bank", "Citigroup", "IndusInd Bank"].map((bank) => (
                <span
                  key={bank}
                  className="rounded-full border border-gold/50 px-4 py-1.5 text-xs text-gold"
                >
                  {bank}
                </span>
              ))}
            </div>
          </div>

          <div>
            <SectionHead
              eyebrow="Why clients can trust the advice"
              title="A property decision reviewed like a financial decision"
              body="Years spent around banking credit, mortgages, collateral valuation and documentation shape how Shubh Estate Brokers approaches a transaction today."
            />
            <div className="mt-7 space-y-5 text-muted-foreground">
              <p>
                A home or investment property is often one of the largest financial commitments a
                family makes. Our role is therefore wider than finding an attractive unit. We
                examine whether the asking price is sensible, whether the title and approvals
                deserve confidence, how the loan should be structured and whether the asset still
                makes sense when you think about resale or rental exit.
              </p>
              <p>
                That is why recommendations are stress-tested before a token amount is paid. If
                valuation, documentation, financing or exit assumptions do not work, we say so. The
                relationship is designed around protecting the client's capital first and completing
                a transaction second.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="navy" size="lg">
                <Link to="/about">Read Arun's Full Profile</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="container-page">
          <SectionHead
            eyebrow="Gurugram Property Market"
            title="Growth backed by jobs, capital and connectivity"
            body="Gurugram's property story is tied to the depth of its corporate economy and the continued expansion of NCR infrastructure — not simply to launch prices or marketing narratives."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {MARKET_FACTS.map(([stat, label]) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-6">
                <p className="font-display text-3xl">{stat}</p>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <MarketCard
              title="Employment & occupier depth"
              body="A large corporate and office base supports end-user housing demand, rental demand and the long-term relevance of well-connected residential micro-markets."
            />
            <MarketCard
              title="Infrastructure-led expansion"
              body="Expressways, metro extensions and planned RRTS corridors are opening new growth nodes while improving access between established Gurugram and emerging corridors."
            />
            <MarketCard
              title="Shift toward quality"
              body="India's 2026 residential market continues to show stronger preference for high-end and quality housing. In Gurugram, this makes developer track record, specifications and entry price even more important."
            />
          </div>

          <div className="mt-8 rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-display text-2xl">
                  Growth does not make every property a good investment.
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  City-level momentum can support demand, but returns remain project- and
                  entry-price-specific. We therefore evaluate supply, developer quality,
                  construction stage, legal position, rental depth, financing cost and realistic
                  exit before recommending a property.
                </p>
              </div>
              <Button asChild variant="gold" size="lg">
                <Link to="/gurugram-growth-story">Explore Gurugram Growth Story</Link>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            Market context updated July 2026. Sources:{" "}
            <a
              href="https://www.cbre.co.in/insights/reports/corridors-clusters-driving-haryana-s-next-growth-phase"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-gold/50 underline-offset-4 hover:text-foreground"
            >
              CBRE Research — Corridors & Clusters: Driving Haryana's Next Growth Phase
            </a>
            {" · "}
            <a
              href="https://www.knightfrank.co.in/research/india-real-estate-office-and-residential-market-h1-2026-12927.aspx"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-gold/50 underline-offset-4 hover:text-foreground"
            >
              Knight Frank India — H1 2026 Office & Residential Market
            </a>
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHead eyebrow="Our Advisory Standard" title="Advisory first. Brokerage second." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-elegant)]"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-accent">
                <Icon className="size-5 text-gold" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-navy py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow">Mortgage & Transaction Support</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              The property and the financing should work together
            </h2>
            <p className="mt-4 max-w-2xl text-navy-foreground/75">
              Mortgage eligibility, property valuation, documentation and lender acceptance are
              considered as part of the purchase — not as an afterthought after the property is
              selected.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Property valuation",
                "Title & document review",
                "Loan structuring",
                "Bank coordination",
                "NRI home-loan assistance",
                "Registry & transaction support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy-foreground/85">
                  <ShieldCheck className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl glass-panel p-8 text-foreground">
            <Quote className="size-7 text-gold" aria-hidden="true" />
            <p className="mt-5 font-display text-2xl">
              “The best property is not the one with the loudest sales pitch. It is the one whose
              price, paperwork, financing and exit all stand up to scrutiny.”
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              — Shubh Estate Brokers advisory approach
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="navy">
                <Link to="/home-loans">Home Loan Assistance</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/emi-calculator">EMI Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead eyebrow="FAQ" title="Questions serious buyers should ask" />
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="container-page">
          <SectionHead
            eyebrow="Buy, Sell & NRI Property Services"
            title="Choose the right Gurgaon property path"
            body="Dedicated guidance for buyers, local owners and overseas clients—each with a clear next step and direct access to the relevant team."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/property-buying-advisory-gurgaon"
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]"
            >
              <p className="eyebrow">Buyers</p>
              <h3 className="mt-3 font-display text-2xl">Budget-first property advice</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Clear shortlisting, price context, site visits, due diligence, financing and
                transaction coordination.
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-gold">
                See the buyer process →
              </span>
            </Link>
            <Link
              to="/sell-property-gurgaon"
              className="rounded-2xl border border-gold/30 bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]"
            >
              <p className="eyebrow">Property Owners</p>
              <h3 className="mt-3 font-display text-2xl">Sell property in Gurgaon</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Price positioning, listing preparation, qualified buyer enquiries and transaction
                coordination.
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-gold">
                List your property →
              </span>
            </Link>
            <Link
              to="/nri"
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]"
            >
              <p className="eyebrow">Overseas Buyers</p>
              <h3 className="mt-3 font-display text-2xl">NRI property services</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Remote shortlisting, video walkthroughs, home-loan assistance and local execution.
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-gold">
                Visit the NRI desk →
              </span>
            </Link>
            <Link
              to="/nri-sell-property-gurgaon"
              className="rounded-2xl border border-gold/30 bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]"
            >
              <p className="eyebrow">Overseas Owners</p>
              <h3 className="mt-3 font-display text-2xl">Sell from abroad</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A Gurgaon-based team for marketing, buyer visits, negotiation and remote follow-up.
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-gold">
                Submit an NRI-owned property →
              </span>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link to="/properties" className="text-gold underline-offset-4 hover:underline">
              Flats for sale in Gurgaon
            </Link>
            <Link to="/luxury" className="text-gold underline-offset-4 hover:underline">
              Luxury apartments in Gurgaon
            </Link>
            <Link
              to="/locations/$slug"
              params={{ slug: "dwarka-expressway" }}
              className="text-gold underline-offset-4 hover:underline"
            >
              Dwarka Expressway property
            </Link>
            <Link
              to="/locations/$slug"
              params={{ slug: "new-gurgaon" }}
              className="text-gold underline-offset-4 hover:underline"
            >
              New Gurgaon property
            </Link>
            <Link
              to="/godrej-101-sector-79-gurgaon"
              className="text-gold underline-offset-4 hover:underline"
            >
              Godrej 101 Sector 79 Gurgaon
            </Link>
            <Link
              to="/property-sector-79-gurgaon"
              className="text-gold underline-offset-4 hover:underline"
            >
              Property in Sector 79 Gurgaon
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="rounded-2xl surface-navy px-8 py-14 text-center">
          <Building2 className="mx-auto size-8 text-gold" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl md:text-4xl">
            Discuss the decision before you discuss the property
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-foreground/75">
            Tell us your objective, budget, time horizon and financing position. We will help you
            evaluate where — and whether — you should buy in Gurugram.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="lg">
              <a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <Link to="/contact">Request a Callback</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function MarketCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <TrendingUp className="size-5 text-gold" aria-hidden="true" />
      <h3 className="mt-4 font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl md:text-4xl">{title}</h2>
      <span className="gold-rule mt-4" />
      {body ? <p className="mt-4 leading-7 text-muted-foreground">{body}</p> : null}
    </div>
  );
}
