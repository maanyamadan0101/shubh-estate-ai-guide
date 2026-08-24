import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SectionHead";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { LOAN_DISCLAIMER } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/emi-calculator")({
  head: () => ({
    meta: [
      { title: "Home Loan EMI Calculator Gurgaon | Shubh Estate Brokers" },
      {
        name: "description",
        content:
          "Calculate your home loan EMI, total interest and loan-to-value instantly. Model property price, down payment, interest rate and tenure for Gurugram properties.",
      },
      { property: "og:title", content: "Home Loan EMI Calculator | Shubh Estate Brokers" },
      {
        property: "og:description",
        content: "Real-time EMI, interest breakdown and LTV for Gurugram home loans.",
      },
      { property: "og:url", content: `${SITE_ORIGIN}/emi-calculator` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/emi-calculator` }],
  }),
  component: EmiPage,
});

function EmiPage() {
  return (
    <>
      <PageHero
        eyebrow="EMI Calculator"
        title="Know the monthly number before you fall in love with the house"
        body="Adjust price, down payment, rate and tenure to see EMI, total interest and loan-to-value in real time."
      />
      <section className="container-page py-14">
        <EmiCalculator />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-2xl">How to use the estimate</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Test more than one interest rate and tenure, then include stamp duty, registration,
              maintenance, furnishing and other acquisition costs in your overall budget. A lower
              EMI from a longer tenure can increase the total interest paid over the life of the
              loan.
            </p>
          </div>
          <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
            <h2 className="font-display text-2xl">Need a lender-ready property shortlist?</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We can coordinate buyer eligibility, property valuation, document requirements and
              bank follow-up alongside your Gurgaon property search. Final terms and sanction remain
              subject to the lender's policies and approval.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link to="/home-loans" className="text-gold hover:underline">
                View home-loan assistance
              </Link>
              <Link to="/flats-for-sale-in-gurgaon" className="text-gold hover:underline">
                Browse properties for sale
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">{LOAN_DISCLAIMER}</p>
      </section>
    </>
  );
}
