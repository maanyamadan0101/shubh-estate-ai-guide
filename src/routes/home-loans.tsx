import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
    q: "Can you advise on home-loan tax benefits?",
    a: "We can explain the financing structure and documents commonly provided by lenders, but tax deductions depend on current law, ownership, possession, use of the property and the borrower's circumstances. A chartered accountant or qualified tax professional should confirm the applicable benefit.",
  },
] as const;

export const Route = createFileRoute("/home-loans")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/home-loans`;
    const title = "Home Loan Assistance in Gurgaon | Bank & Mortgage Coordination";
    const description =
      "Gurgaon home-loan assistance for eligibility review, lender comparison, property valuation, documentation, bank coordination and NRI applicants.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
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

const SERVICES = [
  "Home Loans up to 90% (subject to lender eligibility)",
  "Lender and Rate Comparison",
  "Applicant-Specific Document Checklist",
  "Application Follow-Up",
  "Property Valuation",
  "Legal Verification",
  "Title Assessment",
  "Loan Structuring",
  "Documentation Support",
  "Bank Coordination",
  "Balance Transfer",
  "Top-Up Loans",
  "NRI Home Loans",
  "Salaried & Self-Employed Solutions",
];

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

function HomeLoans() {
  const [income, setIncome] = useState(150000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [age, setAge] = useState(35);
  const [cost, setCost] = useState(15000000);

  const result = useMemo(() => {
    const tenure = Math.min(30, Math.max(5, 60 - age));
    const rate = 8.75;
    const foir = income > 200000 ? 0.6 : income > 100000 ? 0.55 : 0.5;
    const capacity = Math.max(income * foir - existingEmi, 0);
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const eligible = (capacity * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    const capped = Math.min(eligible, cost * 0.9);
    return { tenure, rate, capacity, eligible: capped, ltv: (capped / Math.max(cost, 1)) * 100 };
  }, [income, existingEmi, age, cost]);

  return (
    <>
      <PageHero
        eyebrow="Home Loan Assistance"
        title="Home loans arranged the way a banker would structure them"
        body="We coordinate eligibility, lender comparison, property valuation, documentation and application follow-up through suitable banks and financial institutions."
      />

      <section className="container-page py-16">
        <SectionHead eyebrow="What we handle" title="End-to-end mortgage support" />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s} className="rounded-lg border border-border bg-card px-5 py-4 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead
              eyebrow="Eligibility Checker"
              title="Estimate what you can borrow"
              body="An indicative view based on income, obligations, age and property cost. Final sanction rests with the lender."
            />
            <div className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6">
              <Field
                id="income"
                label="Net monthly income (₹)"
                value={income}
                onChange={setIncome}
                step={5000}
              />
              <Field
                id="emi"
                label="Existing monthly EMIs (₹)"
                value={existingEmi}
                onChange={setExistingEmi}
                step={1000}
              />
              <Field id="age" label="Age (years)" value={age} onChange={setAge} step={1} />
              <Field
                id="cost"
                label="Property cost (₹)"
                value={cost}
                onChange={setCost}
                step={100000}
              />
            </div>
          </div>

          <div className="self-start rounded-2xl surface-navy p-8">
            <p className="eyebrow">Indicative outcome</p>
            <p className="mt-3 font-display text-4xl text-gradient-gold">{inr(result.eligible)}</p>
            <p className="mt-2 text-sm text-navy-foreground/70">Estimated eligible loan amount</p>
            <dl className="mt-8 space-y-3 text-sm">
              {[
                ["Suggested interest rate", `${result.rate.toFixed(2)}% p.a.`],
                ["Recommended tenure", `${result.tenure} years`],
                ["Monthly repayment capacity", inr(result.capacity)],
                ["Recommended LTV", `${result.ltv.toFixed(0)}%`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between border-b border-navy-foreground/15 pb-2"
                >
                  <dt className="text-navy-foreground/70">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold">
                <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
                  Talk to a Mortgage Expert
                </a>
              </Button>
              <Button asChild variant="goldOutline">
                <Link to="/emi-calculator">Calculate EMI</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead eyebrow="Loan FAQ" title="Before you apply" />
          <Accordion type="single" collapsible>
            {LOAN_FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <p className="mt-10 rounded-lg border border-border bg-secondary/60 p-5 text-xs leading-relaxed text-muted-foreground">
          {LOAN_DISCLAIMER}
        </p>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  step,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}
