import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Shubh Estate Brokers | Arun Madan, Ex-Banker — Gurugram" },
      {
        name: "description",
        content:
          "Founder-led Gurugram property advisory by Arun Madan, MBA, LLB and former senior banking professional. Expertise in mortgages, valuation, title assessment, investment safety and transparent transactions.",
      },
      { property: "og:title", content: "About Shubh Estate Brokers | Founder Arun Madan" },
      {
        property: "og:description",
        content: "Banking-led property advice focused on title clarity, investment safety, integrity and fair, transparent deals.",
      },
    ],
  }),
  component: About,
});

const EXPERTISE = [
  "Mortgage Lending",
  "Property Valuation",
  "Loan Structuring",
  "Title Creation & Assessment",
  "Legal Verification",
  "Investment Safety Review",
  "Banking Documentation",
  "Due Diligence",
  "Risk Assessment",
];

const PROMISE = [
  "Integrity First",
  "Fair Pricing",
  "Transparent Advice",
  "Title & Documentation Clarity",
  "Mortgage Support",
  "Investment Protection",
  "After-Sales Support",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Property advice shaped by senior-level banking experience"
        body="Shubh Estate Brokers approaches real estate as a capital, title and risk decision — combining Gurugram market knowledge with banking discipline, mortgage expertise, valuation experience and practical understanding of title and documentation processes."
      />

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead eyebrow="Our Promise" title="Integrity, clarity and investment safety before the transaction" />
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
              A property can look attractive and still be a poor financial decision. The risk may sit in an inflated
              price, unclear ownership history, incomplete title chain, unsuitable financing, weak documentation or an
              exit assumption that does not stand up to scrutiny. Our process starts by understanding these risks before
              asking a client to commit capital.
            </p>
            <p className="mt-5 text-navy-foreground/80">
              We believe the brokerage relationship must be built on integrity. When a deal does not make financial,
              legal or practical sense, the client should hear that clearly — even if it means walking away from the
              transaction.
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
              <p className="mt-1 text-sm text-muted-foreground">MBA · LLB · Former Senior Banking Professional</p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>Mortgage & Credit Perspective</li>
                <li>Property Valuation</li>
                <li>Title Creation & Legal Title Assessment</li>
                <li>Investment Risk & Safety Review</li>
              </ul>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">Professional exposure includes</p>
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
                Arun's senior-level exposure in banking provides a perspective that goes beyond conventional property
                brokerage. Years spent around credit, mortgages, collateral valuation, documentation and title processes
                shape how Shubh Estate Brokers evaluates a transaction today.
              </p>
              <p className="mt-5 text-muted-foreground">
                This background brings a deeper understanding of how title is created and examined, how lenders assess a
                property, where documentation gaps can create risk, how financing affects the true cost of ownership, and
                how an investor should think about capital protection before expected returns.
              </p>
              <p className="mt-5 text-muted-foreground">
                The guiding principle is simple: integrity comes before commission. Advice is intended to remain fair,
                transparent and independent enough to tell a client when a property, price, title position or investment
                proposition deserves caution.
              </p>
              <p className="mt-8 eyebrow">Core Expertise</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {EXPERTISE.map((e) => (
                  <li key={e} className="text-sm text-muted-foreground">
                    · {e}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="navy">
                  <a href={CONTACT.phoneHref}>Speak with Arun</a>
                </Button>
                <Button asChild variant="outline">
                  <a href={CONTACT.googleBusinessProfile} target="_blank" rel="noreferrer">View Google Business Profile</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
