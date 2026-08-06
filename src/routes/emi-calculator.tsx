import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SectionHead";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { LOAN_DISCLAIMER } from "@/data/site";

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
    ],
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
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">{LOAN_DISCLAIMER}</p>
      </section>
    </>
  );
}
