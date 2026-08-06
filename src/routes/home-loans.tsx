import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CONTACT, LOAN_DISCLAIMER } from "@/data/site";

export const Route = createFileRoute("/home-loans")({
  head: () => ({
    meta: [
      { title: "Home Loan in Gurgaon | Mortgage Consultant — Shubh Estate Brokers" },
      {
        name: "description",
        content:
          "Home loans up to 90% at the best available interest rates with minimal documentation. Valuation, legal verification, loan structuring and bank coordination in Gurugram.",
      },
      { property: "og:title", content: "Home Loan Assistance in Gurgaon | Shubh Estate Brokers" },
      {
        property: "og:description",
        content: "Mortgage structuring by a former banking professional — salaried, self-employed and NRI applicants.",
      },
    ],
  }),
  component: HomeLoans,
});

const SERVICES = [
  "Home Loans up to 90% (subject to lender eligibility)",
  "Best Available Interest Rates",
  "Minimal Documentation",
  "Faster Processing",
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
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    Math.round(n),
  );

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
        body="We arrange home loans at the best available interest rates with minimal documentation through leading banks and financial institutions."
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
              <Field id="income" label="Net monthly income (₹)" value={income} onChange={setIncome} step={5000} />
              <Field id="emi" label="Existing monthly EMIs (₹)" value={existingEmi} onChange={setExistingEmi} step={1000} />
              <Field id="age" label="Age (years)" value={age} onChange={setAge} step={1} />
              <Field id="cost" label="Property cost (₹)" value={cost} onChange={setCost} step={100000} />
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
                <div key={k} className="flex justify-between border-b border-navy-foreground/15 pb-2">
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
            {[
              {
                q: "How much can I borrow against a Gurugram property?",
                a: "Eligible applicants may be funded up to 90% of property value, subject to income eligibility, credit profile, property approvals and lender policy.",
              },
              {
                q: "What documents are required?",
                a: "Typically KYC, income proof (salary slips or ITRs), bank statements and property documents. We keep documentation minimal and pre-check files before submission.",
              },
              {
                q: "Can NRIs apply?",
                a: "Yes. We arrange NRI home loans including POA-based documentation, repatriation-compliant structuring and coordination across time zones.",
              },
              {
                q: "Do you help with balance transfer?",
                a: "Yes — we benchmark your current rate against live offers and manage the switch, including top-up funding where eligible.",
              },
            ].map((f) => (
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
