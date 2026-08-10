import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Banknote,
  Building2,
  FileCheck2,
  Landmark,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/assets/hero-gurugram.jpg";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CONTACT, FAQS } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gurugram Real Estate Advisory | Shubh Estate Brokers" },
      {
        name: "description",
        content:
          "Founder-led Gurugram real estate advisory backed by banking, mortgage, valuation and legal due-diligence experience. Buy, sell and invest with financial clarity.",
      },
      { property: "og:title", content: "Shubh Estate Brokers | Founder-led Gurugram Property Advisory" },
      {
        property: "og:description",
        content: "Fair and transparent Gurugram property advice backed by banking, mortgage, valuation and title-assessment experience.",
      },
    ],
  }),
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

function Home() {
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
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.21_0.042_248/0.94),oklch(0.21_0.042_248/0.76))]" />

        <div className="container-page py-24 text-navy-foreground md:py-36">
          <div className="max-w-3xl animate-rise">
            <span className="eyebrow">Founder-led · Gurugram</span>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Property advice backed by
              <span className="text-gradient-gold"> banking-grade judgement</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-navy-foreground/80 md:text-lg">
              Shubh Estate Brokers helps buyers, sellers, investors and NRIs make property decisions with financial clarity — combining Gurugram market knowledge with mortgage, valuation and legal due-diligence experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl">
                <Link to="/properties">View Verified Properties</Link>
              </Button>
              <Button asChild variant="goldOutline" size="xl">
                <a href={CONTACT.phoneHref}>Speak with Arun Madan</a>
              </Button>
            </div>
            <p className="mt-5 flex max-w-2xl items-start gap-2 text-xs leading-5 text-navy-foreground/65">
              <Sparkles className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
              The objective is not to push inventory. It is to help you understand the price, title, financing, downside and exit before you commit.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-2xl surface-navy p-8 md:p-10">
            <p className="eyebrow">Founder Profile</p>
            <h2 className="mt-4 font-display text-3xl text-navy-foreground">Arun Madan</h2>
            <p className="mt-2 text-sm text-navy-foreground/70">Founder & Promoter · MBA · LLB · Former Banking Professional</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                "Mortgage Expert",
                "Property Valuation Specialist",
                "Legal Title Assessment",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-navy-foreground/15 bg-white/5 p-4 text-sm text-navy-foreground/85">
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.18em] text-navy-foreground/55">Professional experience includes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["HDFC Bank", "ICICI Bank", "Citigroup", "IndusInd Bank"].map((bank) => (
                <span key={bank} className="rounded-full border border-gold/50 px-4 py-1.5 text-xs text-gold">
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
                A home or investment property is often one of the largest financial commitments a family makes. Our role is therefore wider than finding an attractive unit. We examine whether the asking price is sensible, whether the title and approvals deserve confidence, how the loan should be structured and whether the asset still makes sense when you think about resale or rental exit.
              </p>
              <p>
                That is why recommendations are stress-tested before a token amount is paid. If valuation, documentation, financing or exit assumptions do not work, we say so. The relationship is designed around protecting the client's capital first and completing a transaction second.
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
                <p className="font-display text-2xl">Growth does not make every property a good investment.</p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  City-level momentum can support demand, but returns remain project- and entry-price-specific. We therefore evaluate supply, developer quality, construction stage, legal position, rental depth, financing cost and realistic exit before recommending a property.
                </p>
              </div>
              <Button asChild variant="gold" size="lg">
                <Link to="/gurugram-growth-story">Explore Gurugram Growth Story</Link>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            Market context updated July 2026. Sources: {" "}
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
            <div key={title} className="rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-elegant)]">
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
            <h2 className="mt-4 font-display text-3xl md:text-4xl">The property and the financing should work together</h2>
            <p className="mt-4 max-w-2xl text-navy-foreground/75">
              Mortgage eligibility, property valuation, documentation and lender acceptance are considered as part of the purchase — not as an afterthought after the property is selected.
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
            <p className="mt-5 font-display text-2xl">“The best property is not the one with the loudest sales pitch. It is the one whose price, paperwork, financing and exit all stand up to scrutiny.”</p>
            <p className="mt-5 text-sm text-muted-foreground">— Shubh Estate Brokers advisory approach</p>
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
            <Link to="/properties" className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]">
              <p className="eyebrow">Buyers</p>
              <h3 className="mt-3 font-display text-2xl">Browse Gurgaon properties</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Current flats and apartments with unit details, financing support and transaction guidance.</p>
              <span className="mt-5 inline-block text-sm font-medium text-gold">View properties →</span>
            </Link>
            <Link to="/sell-property-gurgaon" className="rounded-2xl border border-gold/30 bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]">
              <p className="eyebrow">Property Owners</p>
              <h3 className="mt-3 font-display text-2xl">Sell property in Gurgaon</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Price positioning, listing preparation, qualified buyer enquiries and transaction coordination.</p>
              <span className="mt-5 inline-block text-sm font-medium text-gold">List your property →</span>
            </Link>
            <Link to="/nri" className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]">
              <p className="eyebrow">Overseas Buyers</p>
              <h3 className="mt-3 font-display text-2xl">NRI property services</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Remote shortlisting, video walkthroughs, home-loan assistance and local execution.</p>
              <span className="mt-5 inline-block text-sm font-medium text-gold">Visit the NRI desk →</span>
            </Link>
            <Link to="/nri-sell-property-gurgaon" className="rounded-2xl border border-gold/30 bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]">
              <p className="eyebrow">Overseas Owners</p>
              <h3 className="mt-3 font-display text-2xl">Sell from abroad</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">A Gurgaon-based team for marketing, buyer visits, negotiation and remote follow-up.</p>
              <span className="mt-5 inline-block text-sm font-medium text-gold">Submit an NRI-owned property →</span>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link to="/godrej-101-sector-79-gurgaon" className="text-gold underline-offset-4 hover:underline">Godrej 101 Sector 79 Gurgaon</Link>
            <Link to="/property-sector-79-gurgaon" className="text-gold underline-offset-4 hover:underline">Property in Sector 79 Gurgaon</Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="rounded-2xl surface-navy px-8 py-14 text-center">
          <Building2 className="mx-auto size-8 text-gold" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl md:text-4xl">Discuss the decision before you discuss the property</h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-foreground/75">
            Tell us your objective, budget, time horizon and financing position. We will help you evaluate where — and whether — you should buy in Gurugram.
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

export function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl md:text-4xl">{title}</h2>
      <span className="gold-rule mt-4" />
      {body ? <p className="mt-4 leading-7 text-muted-foreground">{body}</p> : null}
    </div>
  );
}
