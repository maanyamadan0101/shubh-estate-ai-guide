import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRightLeft, Landmark, PiggyBank, WalletCards } from "lucide-react";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT, LOAN_DISCLAIMER } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

const LOAN_FAQS = [
  {
    q: "Can I buy a Gurugram property with a small down payment?",
    a: "Possibly, if your income, credit profile, existing obligations and the property support the required loan-to-value. We first review the applicant profile and property documentation, then compare indicative eligibility through suitable authorised lender channels. Final approval, loan amount and terms remain with the lender.",
  },
  {
    q: "How much can I borrow against a Gurugram property?",
    a: "Eligible applicants may be funded up to 90% of the eligible property value, subject to income, existing obligations, credit profile, property approvals, valuation, documentation and lender policy. The purchase price and lender-assessed value can differ.",
  },
  {
    q: "What documents are normally required for a home loan?",
    a: "Lenders typically request identity and address proof, income documents, bank statements, credit information and property papers. The exact checklist varies by applicant type, lender and property, so it should be confirmed before submission.",
  },
  {
    q: "Can Shubh Estate Brokers coordinate the property search and bank loan together?",
    a: "Yes. Budget and indicative eligibility can be considered before shortlisting, and we can coordinate property-related lender requirements, valuation access, documentation follow-up and the application process. Final sanction and terms remain entirely with the lender.",
  },
  {
    q: "Can NRIs apply for a Gurgaon home loan?",
    a: "Eligible NRI and OCI applicants can apply subject to lender policy, income country, documentation, property eligibility and applicable regulations. We can coordinate the property and lender process; transaction-specific legal, tax, power of attorney and repatriation questions should be confirmed with qualified professionals.",
  },
  {
    q: "Do you help with a home-loan balance transfer or top-up?",
    a: "We can compare the existing facility with available lender options and coordinate a balance-transfer or top-up application where eligible. Savings should be calculated after processing, legal, valuation, foreclosure and other applicable charges.",
  },
  {
    q: "What is an overdraft-linked or smart home loan?",
    a: "Eligible products may link a savings or overdraft account to the home loan. Under the lender's rules, eligible daily credit can reduce the balance used for interest calculation while preserving access to liquidity. Availability, pricing, withdrawal rules and fees vary by lender and borrower profile.",
  },
  {
    q: "Will a home-loan takeover always reduce my total cost?",
    a: "No. A lower quoted rate can still produce weak savings after the new tenure, processing fee, valuation, legal, insurance, documentation and closure costs are considered. The comparison should use the expected net saving and break-even period, not only the new EMI.",
  },
  {
    q: "Can you advise on home-loan tax benefits?",
    a: "We can explain the financing structure and documents commonly provided by lenders, but tax deductions depend on current law, ownership, possession, use of the property and the borrower's circumstances. A chartered accountant or qualified tax professional should confirm the applicable benefit.",
  },
] as const;

export const Route = createFileRoute("/home-loans")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/home-loans`;
    const title = "Home Loan Assistance Gurgaon | Mortgage Coordination";
    const description =
      "Get Gurgaon home-loan assistance for eligibility, lender comparison, valuation, documentation, balance transfer, takeover and mortgage coordination.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Home Loan and Mortgage Coordination in Gurgaon",
            provider: {
              "@type": "RealEstateAgent",
              "@id": `${SITE_ORIGIN}/#real-estate-agent`,
              name: "Shubh Estate Brokers",
              url: SITE_ORIGIN,
            },
            areaServed: "Gurugram, Haryana, India",
            serviceType: "Home-loan eligibility, documentation, valuation and lender coordination",
            url: canonical,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: LOAN_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        },
      ],
    };
  },
  component: HomeLoans,
});

function HomeLoans() {
  const [propertyValue, setPropertyValue] = useState(25000000);
  const [loanAmount, setLoanAmount] = useState(20000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const emi = useMemo(() => {
    const principal = Math.max(0, loanAmount);
    const months = Math.max(1, Math.round(years * 12));
    const monthlyRate = Math.max(0, rate) / 1200;
    if (!principal) return 0;
    if (!monthlyRate) return principal / months;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  }, [loanAmount, rate, years]);

  const ltv = propertyValue > 0 ? Math.min(100, (loanAmount / propertyValue) * 100) : 0;

  return (
    <>
      <PageHero
        eyebrow="Home Loans & Mortgage Advisory"
        title="Home loan support that starts with the property decision"
        body="Understand affordability, loan eligibility, lender valuation, documentation and mortgage structure before committing to a Gurgaon property."
      />

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <SectionHead
              eyebrow="Buyer Financing"
              title="Coordinate the property and loan process together"
              body="A property may fit your budget on paper but still create problems if the lender valuation, title documents, project approvals or repayment structure do not fit. We review financing early so these issues surface before a large token or payment."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <LoanCard icon={Landmark} title="Eligibility review" body="Review income, obligations, credit profile and target property budget before shortlisting." />
              <LoanCard icon={WalletCards} title="Loan-to-value planning" body="Understand the likely own-contribution requirement and how lender valuation can differ from the purchase price." />
              <LoanCard icon={ArrowRightLeft} title="Takeover & balance transfer" body="Compare the existing facility with available lender options after all applicable charges and remaining tenure." />
              <LoanCard icon={PiggyBank} title="Overdraft-linked options" body="Evaluate eligible products that may reduce interest calculation when surplus funds remain linked, subject to lender rules." />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-7">
            <p className="eyebrow">Indicative EMI</p>
            <h2 className="mt-2 font-display text-2xl">Affordability calculator</h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Illustrative only. This is not a sanction, quotation or lender commitment.</p>

            <div className="mt-6 grid gap-4">
              <NumberField label="Property value (₹)" value={propertyValue} onChange={setPropertyValue} step={100000} />
              <NumberField label="Desired loan amount (₹)" value={loanAmount} onChange={setLoanAmount} step={100000} />
              <div className="grid grid-cols-2 gap-4">
                <NumberField label="Interest rate (%)" value={rate} onChange={setRate} step={0.05} />
                <NumberField label="Tenure (years)" value={years} onChange={setYears} step={1} />
              </div>
            </div>

            <div className="mt-6 grid gap-3 rounded-xl bg-secondary/60 p-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Indicative EMI</p>
                <p className="mt-1 font-display text-2xl">₹{Math.round(emi).toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Requested LTV</p>
                <p className="mt-1 font-display text-2xl">{ltv.toFixed(1)}%</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">{LOAN_DISCLAIMER}</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="container-page">
          <SectionHead eyebrow="Mortgage Questions" title="What buyers and borrowers usually need to understand" />
          <Accordion type="single" collapsible className="mt-8 rounded-xl border border-border bg-card px-5">
            {LOAN_FAQS.map((faq, index) => (
              <AccordionItem key={faq.q} value={`loan-faq-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent className="leading-6 text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-2xl surface-navy p-8 md:p-10">
          <p className="eyebrow">Plan Financing Before Token Payment</p>
          <h2 className="mt-3 font-display text-3xl">Discuss your budget, property and loan requirement together</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-navy-foreground/75">
            Share your target property value, own contribution, employment or business profile and preferred purchase timeline. We can coordinate the property-side information and lender process while final credit approval remains with the selected financial institution.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="gold"><a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a></Button>
            <Button asChild variant="goldOutline"><Link to="/flats-for-sale-in-gurgaon">Browse Gurgaon Properties</Link></Button>
            <Button asChild variant="goldOutline"><Link to="/contact">Request Loan Assistance</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}

function LoanCard({ icon: Icon, title, body }: { icon: typeof Landmark; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <Icon className="size-5 text-gold" aria-hidden="true" />
      <h3 className="mt-3 font-display text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function NumberField({ label, value, onChange, step }: { label: string; value: number; onChange: (value: number) => void; step: number }) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={0}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
