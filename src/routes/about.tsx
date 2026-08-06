import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Shubh Estate Brokers | Arun Madan, Founder — Gurugram" },
      {
        name: "description",
        content:
          "Founded by Arun Madan (MBA, LLB) — former banking professional with HDFC, ICICI, Citigroup and IndusInd. Mortgage, valuation and legal due-diligence expertise in Gurugram.",
      },
      { property: "og:title", content: "About Shubh Estate Brokers | Founder Arun Madan" },
      {
        property: "og:description",
        content: "Banking-grade advisory for one of the biggest financial decisions of your life.",
      },
    ],
  }),
  component: About,
});

const EXPERTISE = [
  "Mortgage Lending",
  "Property Valuation",
  "Loan Structuring",
  "Legal Verification",
  "Investment Advisory",
  "Banking Documentation",
  "Due Diligence",
  "Risk Assessment",
];

const PROMISE = [
  "Fair Pricing",
  "Transparency",
  "Genuine Advice",
  "Legal Due Diligence",
  "Mortgage Support",
  "Investment Protection",
  "After-Sales Support",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Buying a home is a financial decision before it is an emotional one"
        body="We advise on apartments, builder floors, villas, plots, commercial assets, rentals, luxury homes and investments across Gurugram — with the rigour of a bank credit desk."
      />

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead eyebrow="Our Promise" title="What every client gets, without asking" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {PROMISE.map((p) => (
                <li key={p} className="rounded-lg border border-border bg-card px-5 py-4 text-sm">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl surface-navy p-8">
            <p className="eyebrow">Our approach</p>
            <p className="mt-4 text-navy-foreground/80">
              Most property purchases in Gurugram go wrong for financial reasons, not aesthetic ones — an inflated
              price, an unverified title, an unsuitable loan, or an exit that never materialises. We work the deal
              backwards from those risks: valuation first, legal next, financing structured around your cash flow, and
              only then the search.
            </p>
            <Button asChild variant="gold" className="mt-8">
              <Link to="/contact">Book a consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="container-page">
          <SectionHead eyebrow="Founder" title="Arun Madan — Founder & Promoter" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="font-display text-2xl">Arun Madan</p>
              <p className="mt-1 text-sm text-muted-foreground">MBA · LLB · Former Banking Professional</p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>Mortgage Expert</li>
                <li>Property Valuation Specialist</li>
                <li>Legal Title Assessment Specialist</li>
              </ul>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">Worked with</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {["HDFC Bank", "ICICI Bank", "Citigroup", "IndusInd Bank"].map((b) => (
                  <li key={b} className="rounded-full border border-gold/50 px-4 py-1.5 text-xs text-gold">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-muted-foreground">
                Years spent inside banking credit and mortgage teams shape how Shubh Estate Brokers advises today.
                Having assessed titles, valued collateral and structured loans from the lender's side, Arun brings the
                same discipline to the buyer's side of the table — so clients purchase with financial clarity, not
                optimism.
              </p>
              <p className="mt-5 text-muted-foreground">
                That perspective is why every recommendation is stress-tested against valuation, approvals,
                serviceability and exit — before a token amount is paid.
              </p>
              <p className="mt-8 eyebrow">Core Expertise</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {EXPERTISE.map((e) => (
                  <li key={e} className="text-sm text-muted-foreground">
                    · {e}
                  </li>
                ))}
              </ul>
              <Button asChild variant="navy" className="mt-8">
                <a href={CONTACT.phoneHref}>Speak with Arun</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
