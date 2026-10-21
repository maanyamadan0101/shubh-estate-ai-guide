import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  CircleHelp,
  FileCheck2,
  Landmark,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wallet,
} from "lucide-react";
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
import { trackContact } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/seo";

const FAQS = [
  {
    q: "How do I choose the best bank for a home loan in India?",
    a: "Compare the effective rate and benchmark, spread and reset terms, all fees, prepayment rules, eligibility assessment, property-document requirements, servicing and flexibility. The best fit depends on your income, credit profile, property and future plans—not only the advertised rate.",
  },
  {
    q: "Is the lowest home-loan interest rate always the best option?",
    a: "Not necessarily. A lower rate may come with different fees, eligibility conditions or less useful features. Compare the written offer, total cost over your expected holding period and the conditions under which the rate can change.",
  },
  {
    q: "What is the difference between a regular home loan and a Smart Home Loan?",
    a: "A regular term loan typically follows a scheduled EMI repayment structure. A Smart or overdraft-linked home loan may let eligible surplus balances reduce the amount used to calculate interest, while allowing withdrawals subject to the lender's rules. Product names and features vary by bank.",
  },
  {
    q: "Is a home-loan overdraft facility worth it?",
    a: "It can suit borrowers who regularly hold surplus cash but may need access to it again. It is not automatically cheaper: compare the rate, fees, interest-calculation method, withdrawal conditions and the amount of surplus you realistically expect to maintain.",
  },
  {
    q: "Should I choose a 15-, 20- or 25-year home loan?",
    a: "A shorter tenure usually means a higher EMI and lower total interest, all else being equal. A longer tenure generally lowers the EMI but can increase total interest. Choose a term that leaves room for regular expenses, emergencies and other goals, considering age and retirement plans.",
  },
  {
    q: "Can I reduce my home-loan tenure through prepayments?",
    a: "Often, eligible part-prepayments can reduce the principal and may shorten the remaining tenure or reduce the EMI, subject to lender rules and your instructions. Ask the lender how the payment will be applied and review any applicable terms before paying.",
  },
  {
    q: "What is the difference between loan eligibility and affordability?",
    a: "Eligibility is the amount a lender may consider based on its policies, income, liabilities, credit profile and property. Affordability is what you can comfortably repay after accounting for living costs, other goals, emergency savings and the full cost of owning the home.",
  },
  {
    q: "Can self-employed people obtain home loans?",
    a: "Yes, eligible self-employed applicants can apply. Lenders commonly assess income-tax returns, financial statements where applicable, business continuity, bank statements, existing obligations, credit profile and the property. Requirements vary by lender.",
  },
  {
    q: "Can NRIs obtain home loans for property in India?",
    a: "Eligible NRI and OCI applicants may apply under lender policy and applicable rules. Income-country requirements, documentation, repayment arrangements and power-of-attorney processes can differ. Confirm details with the lender and qualified legal or tax professionals for your circumstances.",
  },
  {
    q: "Can I transfer my existing home loan to another bank?",
    a: "A balance transfer may be possible if the new lender accepts your profile and property. Compare the new rate and remaining tenure against processing, legal, valuation, closure and other costs. Calculate net savings and the break-even period before switching.",
  },
  {
    q: "What property documents should I check before taking a home loan?",
    a: "The lender may ask for the allotment letter or agreement, sale deed, title-chain documents, approved plans and completion or occupancy records where applicable. The exact list depends on the property. A lender's legal review does not replace independent buyer-side due diligence.",
  },
  {
    q: "Should I consult a home-loan advisor before finalising a property?",
    a: "Early discussion can help you estimate affordability, compare lender requirements and understand how the property's documents and valuation may affect financing. Final eligibility, terms and sanction remain with the lending institution.",
  },
] as const;

const BANK_FACTORS = [
  ["Effective rate & benchmark", "Ask what benchmark applies, the current spread and how rate resets are handled."],
  ["Fixed or floating terms", "Understand whether the rate can change, when it can reset and what options apply if it does."],
  ["All-in charges", "Compare processing, legal, technical valuation, documentation and account charges—not just the headline rate."],
  ["Prepayment rules", "Confirm how part-prepayments are treated and what rules apply to foreclosure or closure."],
  ["Eligibility assessment", "Check how salary or business income, credit history, existing EMIs and co-applicants are assessed."],
  ["Property requirements", "Ask which title, approval, valuation and construction-stage documents are needed."],
  ["Loan-to-value & own funds", "The lender's eligible value and permitted funding can differ from the seller's asking price. Budget for your contribution and transaction costs."],
  ["Disbursement coordination", "Understand the steps and documents required before each disbursement, especially for under-construction property."],
  ["Servicing & digital access", "Review account access, statements, support, repayment instructions and the process for resolving errors."],
  ["Future flexibility", "Compare balance transfer, top-up eligibility, tenure changes and any overdraft-linked options."],
] as const;

const DOCUMENTS = [
  "PAN and identity/address proof",
  "Salary slips, Form 16 and bank statements for salaried applicants, as requested",
  "Income-tax returns, financial statements and bank statements for self-employed applicants, as applicable",
  "Details of existing loans, EMIs and other financial obligations",
  "Property allotment letter, agreement or sale deed, as applicable",
  "Title-chain and other property papers requested by the lender",
  "Approved plans and completion/occupancy documents, where applicable",
  "Additional lender-specific documents for NRIs, co-applicants or particular property types",
];

const MISTAKES = [
  "Choosing only by the advertised interest rate",
  "Ignoring processing, legal, valuation and account charges",
  "Borrowing the maximum eligible amount without testing household affordability",
  "Choosing a long tenure without reviewing total interest and retirement plans",
  "Taking an OD-linked facility without understanding how surplus funds and withdrawals work",
  "Ignoring rate-reset terms, prepayment rules or the written sanction conditions",
  "Using all available savings for the down payment and leaving no emergency reserve",
  "Assuming a lender's property approval replaces independent legal due diligence",
  "Signing before reading the Key Facts Statement, sanction letter and loan agreement",
];

const inr = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(Number.isFinite(value) ? value : 0));

function calculateEmi(principal: number, annualRate: number, years: number) {
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualRate / 1200;
  if (principal <= 0) return { emi: 0, total: 0, interest: 0 };
  const emi =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
  const total = emi * months;
  return { emi, total, interest: Math.max(0, total - principal) };
}

export const Route = createFileRoute("/homeloan")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/homeloan`;
    const title = "Home Loan in Gurgaon & Delhi | Compare 6 Banks";
    const description =
      "Compare six bank options for a home loan in Gurgaon, Delhi and NCR. Get EMI estimates, eligibility guidance, documentation support and mortgage coordination.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: title,
            description,
            url: canonical,
            about: ["Home loans in India", "Mortgage selection", "Loan tenure"],
            publisher: {
              "@type": "RealEstateAgent",
              "@id": `${SITE_ORIGIN}/#real-estate-agent`,
              name: "Shubh Estate Brokers",
              url: SITE_ORIGIN,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
              { "@type": "ListItem", position: 2, name: "Home Loan Advisory", item: canonical },
            ],
          }),
        },
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
  component: HomeLoanGuide,
});

function HomeLoanGuide() {
  const [principal, setPrincipal] = useState(8000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [employment, setEmployment] = useState("Salaried");
  const [budget, setBudget] = useState("");
  const [loanNeed, setLoanNeed] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [city, setCity] = useState("Gurgaon / Gurugram");
  const [preferredBank, setPreferredBank] = useState("No preference");
  const [consent, setConsent] = useState(false);

  const result = useMemo(() => calculateEmi(principal, rate, years), [principal, rate, years]);
  const tenureRows = useMemo(
    () => [15, 20, 25].map((term) => ({ years: term, ...calculateEmi(principal, rate, term) })),
    [principal, rate],
  );

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || !name.trim() || !phone.trim()) return;
    const message = [
      "Hello Shubh Estate Brokers, I would like a home-loan consultation.",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Employment type: ${employment}`,
      `Purchase city: ${city}`,
      `Preferred bank: ${preferredBank}`,
      budget.trim() ? `Approximate property budget: ${budget.trim()}` : "",
      loanNeed.trim() ? `Estimated loan requirement: ${loanNeed.trim()}` : "",
      `Preferred contact: ${contactMethod}`,
      "Please contact me about comparing home-loan options.",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/919911050561?text=${encodeURIComponent(message)}`;
    trackContact("whatsapp", "homeloan_enquiry_form");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const whatsappUrl =
    "https://wa.me/919911050561?text=" +
    encodeURIComponent("Hello Shubh Estate Brokers, I would like to compare home-loan options before buying a property.");

  return (
    <>
      <PageHero
        eyebrow="Banking-Grade Mortgage Guidance"
        title="Home Loan in Gurgaon & Delhi — Compare Banks with Expert Mortgage Guidance"
        body="Buying a home in Gurugram or Delhi? Compare suitable lending options, estimate your EMI and understand eligibility, documentation, balance transfer and overdraft-linked facilities—with clear guidance and no promise of approval."
      />
      <section className="container-page py-8">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg">
            <a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "homeloan_hero")}>
              <Phone aria-hidden="true" /> Call {CONTACT.phone}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "home_loan_guide_hero")}>
              <MessageCircle aria-hidden="true" /> WhatsApp an Advisor
            </a>
          </Button>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-muted-foreground">
          Shubh Estate Brokers brings a banking and mortgage perspective to property decisions. We help you understand lender options and coordinate the process; the lender makes the final credit decision and sets the final terms.
        </p>
      </section>

      <section className="container-page py-12">
        <SectionHead
          eyebrow="Start with the right questions"
          title="How to choose a bank for your home loan"
          body="The best bank is the one whose total terms fit your financial profile, property and future plans. Compare the written offer—not just a rate quoted in an advertisement."
        />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-secondary/70">
              <tr><th className="p-4 font-semibold">Factor</th><th className="p-4 font-semibold">What to check</th></tr>
            </thead>
            <tbody>
              {BANK_FACTORS.map(([factor, detail]) => (
                <tr key={factor} className="border-t border-border align-top">
                  <th scope="row" className="p-4 font-medium">{factor}</th>
                  <td className="p-4 leading-6 text-muted-foreground">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Advertised rates and charges change. Eligibility and final terms depend on lender policy, credit profile, income, loan amount, property valuation and documentation. Ask each lender for its current written terms and Key Facts Statement.
        </p>
      </section>

      <section className="bg-secondary/50 py-16" id="bank-comparison">
        <div className="container-page">
          <SectionHead
            eyebrow="Official bank product sources"
            title="Compare six home-loan options"
            body="We help you shortlist options; each bank independently assesses the borrower and property. Use the official pages below to confirm live rates, fees, eligibility and product terms before applying."
          />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Official product pages reviewed on 21 October 2026. Interest rates and charges change; where a current, comparable rate schedule could not be reliably confirmed, no numerical rate is advertised here. Ask the lender for its current written offer and Key Facts Statement.</p>
          <h3 className="mt-8 font-display text-2xl">Public-sector banks</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {name:"Bank of India", product:"Star Home Loan / Star Smart Home Loan", details:"Official pages describe purchase, construction, plot-plus-construction, renovation and balance-transfer/top-up options subject to scheme terms. The Star Smart product page describes an overdraft facility.", url:"https://bankofindia.bank.in/home-loan", label:"View BOI home-loan products"},
              {name:"Bank of Maharashtra", product:"Home Loan / Maha Super Housing Loan", details:"Official page covers eligible purchase, construction, plot-plus-construction and certain repair or renovation needs. Check the current rate schedule and fee terms directly.", url:"https://bankofmaharashtra.bank.in/personal-banking/loans/home-loan", label:"View Bank of Maharashtra"},
              {name:"Indian Bank", product:"IB Home Loan", details:"Use Indian Bank's official website to confirm the current product brochure, eligibility, charges, rate schedule and any balance-transfer or additional-loan features.", url:"https://www.indianbank.in/", label:"Visit Indian Bank official site"}
            ].map((bank) => (
              <article key={bank.name} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">Public sector</p>
                <h4 className="mt-2 font-display text-xl">{bank.name}</h4>
                <p className="mt-2 text-sm font-medium">{bank.product}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{bank.details}</p>
                <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold underline-offset-4 hover:underline" href={bank.url} target="_blank" rel="noopener noreferrer">{bank.label} <ArrowRight aria-hidden="true" className="size-4" /></a>
              </article>
            ))}
          </div>
          <h3 className="mt-10 font-display text-2xl">Private-sector banks</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {name:"HDFC Bank", product:"Home Loan", details:"Official resources cover home purchase, refinance/balance transfer, top-up and applicant-specific fee schedules. Confirm applicable product and charges for your borrower category.", url:"https://www.hdfcbank.com/personal/borrow/popular-loans/home-loan"},
              {name:"ICICI Bank", product:"Home Loan", details:"Official resources cover home-loan variants, balance transfer and top-up options. Overdraft and prepayment terms are product-specific; verify the current schedule before comparing.", url:"https://www.icicibank.com/personal-banking/loans/home-loan"},
              {name:"Axis Bank", product:"Home Loan", details:"Official resources describe home-loan variants, balance transfer and product-specific rates and fees. Pricing depends on the applicant profile, credit score and selected variant.", url:"https://www.axisbank.com/retail/loans/home-loan"}
            ].map((bank) => (
              <article key={bank.name} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">Private sector</p>
                <h4 className="mt-2 font-display text-xl">{bank.name}</h4>
                <p className="mt-2 text-sm font-medium">{bank.product}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{bank.details}</p>
                <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold underline-offset-4 hover:underline" href={bank.url} target="_blank" rel="noopener noreferrer">View official bank page <ArrowRight aria-hidden="true" className="size-4" /></a>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm leading-6 text-muted-foreground">
            <strong className="text-foreground">How to compare fairly:</strong> compare the effective rate and benchmark, spread and reset terms, processing and legal/valuation costs, prepayment rules, tenure, service quality, property acceptance and the written sanction conditions. Shubh Estate Brokers does not sanction loans or guarantee preferential pricing.
          </div>
        </div>
      </section>

      <section className="container-page py-16" id="home-loan-services">
        <SectionHead eyebrow="Home-loan assistance" title="Support for different property and borrower needs" body="Product availability varies by lender. We help you understand what to ask and coordinate the application; the bank confirms eligibility and the final product." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ["First-home buyers","Estimate affordability, own contribution and the likely documentation path before committing."],
            ["Salaried professionals","Organise income and existing-EMI information for an initial lender comparison."],
            ["Self-employed applicants","Understand typical business-income evidence and lender-specific financial-document requirements."],
            ["Resale and ready-to-move homes","Coordinate sale/title papers, seller documents and lender valuation requirements."],
            ["Under-construction homes","Review stage-wise disbursement requirements and project/property documents with the lender."],
            ["Balance transfer or takeover","Compare potential savings after fees, remaining tenure, legal and valuation costs."],
            ["Eligible top-up loans","Check whether the existing lender offers a top-up and how end-use and eligibility rules apply."],
            ["Smart / overdraft-linked options","Compare linked-account rules, surplus-balance treatment, charges and liquidity needs."],
            ["NRI home-loan enquiries","Coordinate initial questions on eligible products and documents; confirm all rules directly with the bank."],
          ].map(([title, detail]) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-16" id="gurgaon-delhi">
        <div className="container-page">
          <SectionHead eyebrow="Local property-finance context" title="Home-loan guidance for Gurgaon, Gurugram and Delhi NCR" body="A lender may assess each property, project, construction stage, title chain and valuation separately. Never assume that a project is approved by a particular bank without current confirmation for that lender and phase." />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Gurugram / Gurgaon</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Support for purchases around Golf Course Road, Golf Course Extension Road, Dwarka Expressway, Southern Peripheral Road (SPR), Sohna Road, Central Gurgaon and New Gurgaon. Property type, builder paperwork, title, approvals and lender valuation can affect the process.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Delhi and wider NCR</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Guidance for eligible residential purchases in Delhi, Dwarka, South Delhi and other NCR locations. Confirm the lender's geographic, property-type and legal-document requirements for the specific transaction.</p>
            </div>
          </div>
          <h3 className="mt-8 font-display text-xl">A transparent six-step process</h3>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Discuss the property, budget, employment and timeline.",
              "Review indicative affordability and existing obligations.",
              "Shortlist lender options to evaluate against your needs.",
              "Coordinate the application and requested documents.",
              "The lender performs credit, legal and property valuation checks.",
              "The lender decides whether to sanction and disburse the loan."
            ].map((step, index) => <li key={step} className="rounded-xl border border-border bg-card p-4 text-sm leading-6"><span className="mr-2 font-semibold text-gold">{index + 1}.</span>{step}</li>)}
          </ol>
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container-page">
          <SectionHead
            eyebrow="Loan structure"
            title="Regular term home loan vs Smart Home Loan / overdraft"
            body="An overdraft-linked facility may offer liquidity flexibility, but it is not automatically cheaper. Confirm the exact features and rules of the individual bank product."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center gap-3"><Landmark className="size-6 text-gold" aria-hidden="true" /><h3 className="font-display text-2xl">Regular term home loan</h3></div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">A straightforward repayment facility where the borrower generally pays scheduled EMIs comprising interest and principal, according to the sanctioned repayment structure.</p>
              <ul className="mt-5 space-y-3 text-sm">
                {["Predictable scheduled repayment structure", "Principal generally reduces through scheduled repayment", "May suit buyers who do not need to access surplus funds through a linked facility", "Still compare rate resets, fees and prepayment terms"].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />{item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-gold/40 bg-card p-7">
              <div className="flex items-center gap-3"><Wallet className="size-6 text-gold" aria-hidden="true" /><h3 className="font-display text-2xl">Smart / OD-linked home loan</h3></div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Some lenders link a home loan to an account or overdraft facility. Eligible surplus funds may reduce the balance used to calculate interest, while withdrawals remain subject to product rules and available limits.</p>
              <ul className="mt-5 space-y-3 text-sm">
                {["May suit borrowers with recurring surplus cash or variable cash flow", "Check interest calculation, withdrawal rules and account charges", "Surplus must actually remain in the linked account to create potential benefit", "Product eligibility, pricing and features differ by lender"].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-secondary/70"><tr><th className="p-4">Comparison</th><th className="p-4">Regular term loan</th><th className="p-4">OD-linked facility</th></tr></thead>
              <tbody>
                {[
                  ["Interest calculation", "Typically on the outstanding loan balance under the lender's method.", "May be based on the net eligible balance after eligible linked-account funds, per product rules."],
                  ["Surplus cash", "Part-prepayment may reduce principal, subject to lender rules.", "Eligible balance may reduce interest while keeping funds accessible, subject to limits."],
                  ["Liquidity", "Re-accessing repaid funds is generally not automatic.", "Withdrawals may be permitted under the overdraft facility's terms."],
                  ["Costs", "Compare processing, legal, valuation and other charges.", "Also check any additional account or facility charges and rate premium."],
                  ["Potential fit", "Borrowers preferring a simpler scheduled structure.", "Borrowers who expect to maintain surplus funds and value access to liquidity."],
                  ["Key caution", "A longer tenure can increase total interest.", "Do not assume savings; model actual surplus, duration, rate difference and fees."],
                ].map(([label, regular, od]) => <tr key={label} className="border-t border-border align-top"><th scope="row" className="p-4 font-medium">{label}</th><td className="p-4 leading-6 text-muted-foreground">{regular}</td><td className="p-4 leading-6 text-muted-foreground">{od}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="font-display text-xl">Illustrative example—not a bank quotation</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Imagine a borrower has an OD-linked loan and keeps ₹5 lakh of eligible surplus in the linked account for part of the year. If the lender calculates interest on a net eligible balance, that surplus could reduce interest for the period it remains there. The actual benefit depends on the product's calculation method, daily balances, rate, fees and withdrawals. Compare this with making a normal part-prepayment, including whether you may need the money again.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHead
          eyebrow="Tenure planning"
          title="Choose a tenure your monthly budget can sustain"
          body="A shorter term usually means a higher EMI and less total interest. A longer term usually lowers the EMI but can increase the total amount repaid. Test the trade-off using your own numbers."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-display text-xl">Your estimated EMI</h3>
            <div className="mt-5 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="guide-loan-amount">Loan amount (₹)</Label>
                <Input id="guide-loan-amount" type="number" min="0" max="1000000000" step="100000" value={principal} onChange={(e) => setPrincipal(Math.max(0, Math.min(1000000000, Number(e.target.value) || 0)))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guide-interest-rate">Annual interest rate (%)</Label>
                <Input id="guide-interest-rate" type="number" min="0" max="30" step="0.05" value={rate} onChange={(e) => setRate(Math.max(0, Math.min(30, Number(e.target.value) || 0)))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guide-tenure">Tenure (years)</Label>
                <Input id="guide-tenure" type="number" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Math.max(1, Math.min(40, Number(e.target.value) || 1)))} />
              </div>
            </div>
            <div className="mt-6 rounded-xl surface-navy p-5">
              <p className="text-sm text-navy-foreground/70">Estimated monthly EMI</p>
              <p className="mt-2 font-display text-3xl text-gradient-gold">{inr(result.emi)}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div><p className="text-xs text-navy-foreground/60">Total repayment</p><p className="mt-1 font-semibold text-navy-foreground">{inr(result.total)}</p></div>
                <div><p className="text-xs text-navy-foreground/60">Estimated interest</p><p className="mt-1 font-semibold text-navy-foreground">{inr(result.interest)}</p></div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Estimate only, using a standard monthly reducing-balance formula. Actual amounts may vary with lender calculations, disbursement timing, rate changes, fees, insurance and other terms.</p>
          </div>
          <div>
            <h3 className="font-display text-xl">Compare 15, 20 and 25 years</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">The table uses the loan amount and annual rate entered on the left, with the same assumptions for each term.</p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full min-w-[440px] border-collapse text-left text-sm">
                <thead className="bg-secondary/70"><tr><th className="p-3">Tenure</th><th className="p-3">Monthly EMI</th><th className="p-3">Total interest</th></tr></thead>
                <tbody>{tenureRows.map((row) => <tr key={row.years} className="border-t border-border"><th scope="row" className="p-3 font-medium">{row.years} years</th><td className="p-3">{inr(row.emi)}</td><td className="p-3">{inr(row.interest)}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="mt-5 rounded-xl border border-border p-5">
              <h4 className="font-semibold">Before choosing a term, consider</h4>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {["Age and retirement plans", "Income stability", "Existing EMIs and family expenses", "Emergency savings", "Education and other future costs", "Plans for prepayment or moving"].map((item) => <li key={item} className="flex gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Affordability" title="How much home loan should you take?" />
            <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
              <li><strong className="text-foreground">Eligibility is not affordability.</strong> A lender may consider a particular amount, but your household budget may support less.</li>
              <li><strong className="text-foreground">Budget for more than the down payment.</strong> Include registration, stamp duty, legal or advisory costs, maintenance, insurance, interiors and moving expenses where applicable.</li>
              <li><strong className="text-foreground">Keep a cash buffer.</strong> Avoid using every available saving for the purchase if that leaves no emergency reserve.</li>
              <li><strong className="text-foreground">Understand the lender's valuation.</strong> The eligible property value and funding ratio may differ from the negotiated price. Loan-to-value limits and sanction amounts depend on applicable rules and lender policy.</li>
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="Documents" title="Prepare your file—and check the property" />
            <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
              {DOCUMENTS.map((doc) => <li key={doc} className="flex gap-2"><FileCheck2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />{doc}</li>)}
            </ul>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">A lender's legal and technical approval does not replace independent title and transaction due diligence. NRIs may have additional documentation, income-assessment, remittance or power-of-attorney requirements; confirm your specific position with the lender and qualified professionals.</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHead eyebrow="Avoidable mistakes" title="Home-loan mistakes that can become expensive" />
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {MISTAKES.map((mistake) => <div key={mistake} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-6"><CircleHelp className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" /><span>{mistake}</span></div>)}
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHead eyebrow="Frequently asked questions" title="Home-loan questions, answered" body="General guidance only. Specific terms, eligibility and legal or tax implications depend on your circumstances and lender." />
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => <AccordionItem key={faq.q} value={String(index)}><AccordionTrigger className="text-left">{faq.q}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-6">{faq.a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl surface-navy p-7 md:p-9">
            <BadgeCheck className="size-8 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl text-navy-foreground">Compare your options before you sign</h2>
            <p className="mt-4 text-sm leading-7 text-navy-foreground/75">Shubh Estate Brokers brings a banking and mortgage perspective to property decisions, including lender comparisons, loan structuring, documentation coordination and property due diligence.</p>
            <div className="mt-6 space-y-3 text-sm text-navy-foreground/85">
              <p><strong>Phone:</strong> {CONTACT.phone}</p>
              <p><strong>Office:</strong> {CONTACT.address}</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="gold"><a href={CONTACT.phoneHref} onClick={() => trackContact("phone", "homeloan_final")}> <Phone aria-hidden="true" /> Call an Advisor</a></Button>
              <Button asChild variant="goldOutline"><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackContact("whatsapp", "home_loan_guide_final")}><MessageCircle aria-hidden="true" /> WhatsApp</a></Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link to="/homeloan" className="text-gold underline-offset-4 hover:underline">Home-loan assistance</Link>
              <Link to="/emi-calculator" className="text-gold underline-offset-4 hover:underline">Full EMI calculator</Link>
              <Link to="/property-buying-advisory-gurgaon" className="text-gold underline-offset-4 hover:underline">Buyer advisory</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 md:p-9">
            <div className="flex items-center gap-3"><Calculator className="size-6 text-gold" aria-hidden="true" /><h2 className="font-display text-2xl">Request a home-loan consultation</h2></div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Share a few details and your WhatsApp app will open with a prepared enquiry message. Nothing is submitted to or stored by this form; you choose whether to send the message.</p>
            <form className="mt-6 space-y-4" onSubmit={submitEnquiry}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="loan-guide-name">Name *</Label><Input id="loan-guide-name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></div>
                <div className="space-y-2"><Label htmlFor="loan-guide-phone">Phone number *</Label><Input id="loan-guide-phone" autoComplete="tel" type="tel" required minLength={7} maxLength={20} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone / WhatsApp" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="loan-guide-city">Purchase city *</Label><select id="loan-guide-city" required value={city} onChange={(e) => setCity(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option>Gurgaon / Gurugram</option><option>Delhi</option><option>Other NCR</option><option>Other</option></select></div>
                <div className="space-y-2"><Label htmlFor="loan-guide-bank">Preferred bank (optional)</Label><select id="loan-guide-bank" value={preferredBank} onChange={(e) => setPreferredBank(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option>No preference</option><option>Bank of India</option><option>Bank of Maharashtra</option><option>Indian Bank</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option></select></div>
              </div>
              <div className="space-y-2"><Label htmlFor="loan-guide-employment">Employment type</Label><select id="loan-guide-employment" value={employment} onChange={(e) => setEmployment(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option>Salaried</option><option>Self-employed</option><option>NRI</option><option>Other</option></select></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="loan-guide-budget">Approximate property budget (optional)</Label><Input id="loan-guide-budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. ₹2.5 crore" maxLength={80} /></div>
                <div className="space-y-2"><Label htmlFor="loan-guide-need">Estimated loan requirement (optional)</Label><Input id="loan-guide-need" value={loanNeed} onChange={(e) => setLoanNeed(e.target.value)} placeholder="e.g. ₹1.5 crore" maxLength={80} /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="loan-guide-contact-method">Preferred contact method</Label><select id="loan-guide-contact-method" value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option>WhatsApp</option><option>Phone call</option></select></div>
              <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1 size-4 shrink-0 accent-current" /><span>I agree that Shubh Estate Brokers may contact me about this home-loan enquiry. I understand that clicking the button opens WhatsApp and I must send the message myself.</span></label>
              <Button type="submit" variant="gold" size="lg" className="w-full" disabled={!consent || !name.trim() || !phone.trim()}>Prepare WhatsApp Enquiry <ArrowRight aria-hidden="true" /></Button>
            </form>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">{LOAN_DISCLAIMER} Review the lender's Key Facts Statement, sanction letter and loan agreement before accepting any offer. Shubh Estate Brokers is an advisory and brokerage firm, not a lending institution; approval and final terms are determined by the lender.</p>
          </div>
        </div>
      </section>
    </>
  );
}
