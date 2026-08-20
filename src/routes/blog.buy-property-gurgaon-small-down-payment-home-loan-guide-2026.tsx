import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, FileCheck2, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_ORIGIN } from "@/lib/seo";

const SLUG = "/blog/buy-property-gurgaon-small-down-payment-home-loan-guide-2026";

export const Route = createFileRoute(SLUG)({
  head: () => ({
    meta: [
      {
        title: "Buy Property in Gurgaon With a Small Down Payment | Home Loan Guide 2026",
      },
      {
        name: "description",
        content:
          "Learn how Gurgaon home buyers can plan a smaller upfront contribution through realistic property selection, loan eligibility, valuation and documentation. Practical 2026 buyer guide from Shubh Estate Brokers.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}${SLUG}` }],
  }),
  component: Article,
});

const steps = [
  {
    icon: Calculator,
    title: "Start with eligibility, not the property price",
    text: "Before shortlisting homes, estimate the loan amount your income profile can realistically support. This keeps the search inside a workable purchase budget and prevents a late-stage funding gap.",
  },
  {
    icon: Landmark,
    title: "Understand how the bank will value the property",
    text: "A lender normally considers its own valuation and policy limits, not simply the seller's asking price. A property priced well above the lender's assessed value can increase the cash you need to bring in.",
  },
  {
    icon: FileCheck2,
    title: "Keep documentation loan-ready",
    text: "Income records, banking history, existing obligations and the property's legal documents all influence the speed and strength of a home-loan assessment. Preparing them early can materially improve execution.",
  },
  {
    icon: ShieldCheck,
    title: "Do the legal and property checks before paying heavily",
    text: "Loan approval is not a substitute for buyer due diligence. Title, approvals, ownership chain, society or builder records and transaction documentation should still be reviewed independently.",
  },
] as const;

function Article() {
  return (
    <main>
      <article>
        <header className="surface-navy">
          <div className="container-page max-w-5xl py-16 md:py-24">
            <p className="eyebrow">Home Loan & Buyer Guide · 2026</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              How to Buy Property in Gurgaon With a Small Down Payment
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-navy-foreground/75 md:text-lg">
              A smaller upfront contribution is sometimes achievable, but it depends on the buyer's eligibility, the property's bank valuation, lender policy and the quality of the transaction documents. The right approach is to structure the financing before finalising the property.
            </p>
          </div>
        </header>

        <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-20">
          <div className="max-w-3xl space-y-10">
            <section>
              <h2 className="font-display text-3xl">Can you really buy a Gurgaon property with a small down payment?</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  Potentially, yes. But the correct question is not simply, “What percentage will the bank finance?” The final cash requirement depends on several moving parts: your sanctioned loan amount, the lender's assessed property value, the agreed purchase price, stamp duty and registration costs, and any other transaction expenses.
                </p>
                <p>
                  In some eligible cases, lenders may finance a high proportion of the acceptable property value, subject to their prevailing policy. This does not mean every buyer or every resale property will qualify for the same percentage. A strong financing plan starts with the borrower profile and then matches it to a bankable property.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl">Four things that determine your actual upfront contribution</h2>
              <div className="mt-6 grid gap-5">
                {steps.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex gap-4">
                      <Icon className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                      <div>
                        <h3 className="font-display text-xl">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl">A practical example</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  Suppose you shortlist a Gurgaon resale apartment at ₹2.50 crore. The most useful first step is to estimate how much the lender may sanction against your income and how the selected bank is likely to view the property. If the lender's acceptable valuation is close to the negotiated purchase price and your eligibility is strong, your required purchase contribution can be materially lower than in a case where the property is over-priced or your eligibility is constrained.
                </p>
                <p>
                  This is why property negotiation and home-loan planning should happen together. A lower purchase price can reduce both your funding gap and your borrowing requirement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl">What buyers often miss</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  Buyers sometimes focus only on the loan-to-value percentage and ignore stamp duty, registration, brokerage, maintenance or transfer-related expenses. These costs may need to be funded separately and should be included in the cash-flow plan from day one.
                </p>
                <p>
                  Another common mistake is paying a large token amount before confirming whether the property documents and the buyer's financing structure are acceptable. Where financing is important to the transaction, document review and lender discussions should start before the commitment becomes difficult to reverse.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl">The Shubh Estate Brokers approach</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                We treat the property decision, valuation, documentation and mortgage structure as one connected transaction. The objective is not to promise a fixed loan percentage; it is to identify a suitable property, negotiate realistically, assess the borrower profile and coordinate the financing so the buyer knows the likely funding requirement before closing.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="navy">
                  <Link to="/properties">View Gurgaon properties</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/home-loans">Explore home-loan assistance</Link>
                </Button>
              </div>
            </section>

            <section className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
              <p className="eyebrow">Next step</p>
              <h2 className="mt-2 font-display text-3xl">Know your workable property budget first</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                If you already have an approximate income profile and purchase budget, we can help you understand the likely financing range and then shortlist Gurgaon properties that fit it.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild variant="gold">
                  <Link to="/contact">Discuss your requirement</Link>
                </Button>
                <Link to="/emi-calculator" className="inline-flex items-center gap-2 text-sm font-medium hover:text-gold">
                  Use EMI calculator <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
            <p className="eyebrow">Related Gurgaon guides</p>
            <nav className="mt-4 grid gap-3 text-sm">
              <Link to="/property-buying-advisory-gurgaon" className="hover:text-gold">Property Buying Advisory</Link>
              <Link to="/best-areas-gurgaon-property-investment" className="hover:text-gold">Best Areas for Property Investment</Link>
              <Link to="/property-services-gurgaon" className="hover:text-gold">Legal Due Diligence & Valuation</Link>
              <Link to="/nri" className="hover:text-gold">NRI Property Services</Link>
              <Link to="/blog" className="hover:text-gold">All Property Guides</Link>
            </nav>
            <p className="mt-6 text-xs leading-5 text-muted-foreground">
              Home-loan eligibility, valuation and loan-to-value are subject to lender policy, borrower eligibility and property/document verification. Nothing on this page constitutes a sanction or lending commitment.
            </p>
          </aside>
        </div>
      </article>
    </main>
  );
}
