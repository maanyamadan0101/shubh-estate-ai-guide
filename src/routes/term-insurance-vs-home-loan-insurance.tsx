import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight, CheckCircle2, ChevronDown, FileCheck2, HeartHandshake,
  Landmark, LockKeyhole, ShieldCheck, Wallet, Calculator, Users, Info,
} from "lucide-react";
import { CONTACT } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";
import { Button } from "@/components/ui/button";

const PAGE_PATH = "/term-insurance-vs-home-loan-insurance";
const PAGE_TITLE = "Term Insurance vs Home Loan Insurance | Shubh Estate Brokers";
const PAGE_DESCRIPTION =
  "Confused between term insurance and a bank loan shield? Compare home loan protection, premiums, cover, exclusions and flexibility before choosing.";

export const Route = createFileRoute(PAGE_PATH)({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE_ORIGIN}${PAGE_PATH}` },
      { property: "og:site_name", content: "Shubh Estate Brokers" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}${PAGE_PATH}` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
          { "@type": "ListItem", position: 2, name: "Home Loan Resources", item: `${SITE_ORIGIN}/home-loans` },
          { "@type": "ListItem", position: 3, name: "Term Insurance vs Home Loan Insurance", item: `${SITE_ORIGIN}${PAGE_PATH}` },
        ],
      }),
    }],
  }),
  component: HomeLoanProtectionPage,
});

const money = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.max(0, Number.isFinite(n) ? n : 0));
const numberInput = (value: string) => Math.max(0, Number(value) || 0);

const comparisonRows = [
  ["Main purpose", "Family life cover for a chosen period", "Primarily designed to protect a specified loan liability"],
  ["Cover amount", "May be level or have another structure, depending on product", "May reduce with the loan, remain level, or follow another structure"],
  ["Who receives the benefit?", "As set out in policy, nomination, assignment and claim terms", "May be payable to lender or another beneficiary under the policy"],
  ["Beyond the home loan", "Can provide a broader family safety net if cover is adequate", "Usually focused on specified loan-related risks; verify exact benefits"],
  ["Premium payment", "Often regular premiums; product options vary", "May be regular or a single premium"],
  ["Single premium added to loan", "Not usually relevant to a separate regular-premium term plan", "If financed, extra interest may apply under the loan agreement"],
  ["Early loan repayment", "Can continue if premiums are paid and policy remains active", "Cancellation, continuation or refund depends on policy wording"],
  ["Property sale or loan transfer", "May remain active subject to policy terms", "Check assignment, lender change and continuation provisions"],
  ["Medical underwriting", "Depends on insurer, age, disclosures and underwriting", "Depends on product and underwriting rules"],
  ["Policy term", "Chosen policy term; cover ends according to its terms", "Defined by the specific loan-linked product"],
  ["Critical illness / disability", "Only if included as a covered benefit or rider", "Only if expressly included in the policy"],
  ["Claims and documents", "Subject to insurer's claims process and policy requirements", "Subject to insurer's claims process, lender arrangements and policy requirements"],
  ["Cancellation / refund", "Depends on product, free-look rules and applicable terms", "Depends on product, free-look rules, surrender and refund terms"],
  ["Flexibility", "May be useful for multiple family obligations", "May be targeted to the covered loan liability"],
  ["Total cost", "Compare premiums over the same period and comparable cover", "Include premium and any interest if financed through the loan"],
];

const faqs = [
  ["Is home loan insurance compulsory in India?", "Do not assume a loan shield is compulsory just because it is presented during sanction. Ask the lender to identify any actual requirement in the written loan terms and distinguish it from an optional insurance product. Lender policies and contractual circumstances can differ; seek written clarification before declining or accepting cover."],
  ["Can I choose an individual term policy instead of a bank's loan shield?", "You can ask the lender whether a separate policy is acceptable for any stated protection requirement. Compare the proposed policy, the loan agreement and any assignment or beneficiary conditions. Do not assume one product automatically substitutes for another."],
  ["Is term insurance always cheaper than home loan insurance?", "No universal answer is reliable. Cost depends on age, health and underwriting, cover amount, term, premium frequency, policy benefits and exclusions. Compare equivalent cover over a common period and include loan interest if a single premium is financed."],
  ["Can I use an existing term insurance policy to protect my home loan?", "Possibly, if the existing cover and term are sufficient for your wider responsibilities. Review the sum assured, remaining policy term, other liabilities, dependants and any assignment or lender conditions before relying on it."],
  ["What happens if I repay my home loan early?", "A separate term policy can generally continue if it remains in force and premiums are paid. For loan-linked insurance, cancellation, continuation and any refund depend on the actual policy wording and applicable rules; obtain written confirmation."],
  ["What if I sell the property or transfer my home loan?", "A separate term policy may remain active independently of the property, subject to its terms. For loan-linked cover, ask the insurer and lender how sale, refinancing, assignment or a lender change affects the policy."],
  ["Should I accept a single-premium loan protection policy?", "Compare its benefits, exclusions, premium, cancellation/refund terms and duration with alternatives. If the premium is added to the loan, calculate the extra EMI and interest over the loan term before deciding."],
  ["Will a term insurance claim automatically repay the home loan?", "Not automatically in every arrangement. Payment depends on policy terms, nomination, assignment, lender arrangements and claim approval. Understand who receives the benefit and what paperwork is required."],
  ["Can the nominee use term insurance proceeds for family expenses?", "That depends on the policy, any valid assignment or security arrangement, applicable law and claim circumstances. Check whether any amount is earmarked or payable to a lender before assuming the entire benefit is freely available."],
  ["What if I have diabetes or another pre-existing medical condition?", "Disclose health information accurately when applying. Eligibility, premium, medical tests, exclusions and available options depend on insurer underwriting. Never hide a condition to obtain cover."],
  ["Should both spouses have life cover for a joint home loan?", "Assess each co-borrower's income contribution, outstanding obligations, dependants and existing cover. If the family relies on both incomes, cover needs may differ for each spouse."],
  ["How much life cover should a homebuyer consider?", "Consider outstanding debts, future family expenses, income replacement, dependants, existing assets and existing life cover. A loan amount alone is not enough to determine an appropriate sum assured."],
  ["Does loan protection cover disability or critical illness?", "Only if the particular policy expressly includes the relevant benefit and the event meets its definitions, waiting periods and exclusions. Do not infer these benefits from the name 'loan shield'."],
  ["What documents should I read before accepting a loan shield?", "Read the product brochure, policy wording, Customer Information Sheet where applicable, premium illustration, exclusions, benefit schedule and cancellation/refund provisions. Ask for written clarification of any lender-related condition."],
  ["Can I compare policies before my loan is disbursed?", "Ask for the complete policy and premium details as early as possible. Give yourself time to compare benefits and costs, and request written answers to any conditions linked to sanction or disbursement."],
];

function HomeLoanProtectionPage() {
  const [loan, setLoan] = useState("7500000");
  const [tenure, setTenure] = useState("20");
  const [age, setAge] = useState("35");
  const [existingCover, setExistingCover] = useState("5000000");
  const [familyExpenses, setFamilyExpenses] = useState("900000");
  const [otherLiabilities, setOtherLiabilities] = useState("500000");
  const [dependants, setDependants] = useState("2");
  const [shieldPremium, setShieldPremium] = useState("150000");
  const [rate, setRate] = useState("8.5");
  const [termPremium, setTermPremium] = useState("18000");
  const [annualShieldPremium, setAnnualShieldPremium] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Gurugram");
  const [loanStatus, setLoanStatus] = useState("Planning");
  const [coverStatus, setCoverStatus] = useState("Not sure");
  const [concern, setConcern] = useState("Not sure");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [enquiryConsent, setEnquiryConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formError, setFormError] = useState("");

  const calc = useMemo(() => {
    const principal = numberInput(loan);
    const years = Math.max(1, numberInput(tenure));
    const annualRate = numberInput(rate) / 100;
    const months = years * 12;
    const monthlyRate = annualRate / 12;
    const emi = monthlyRate === 0 ? principal / months : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const financedPremium = numberInput(shieldPremium);
    const premiumEmi = monthlyRate === 0 ? financedPremium / months : financedPremium * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const premiumTotalRepayment = premiumEmi * months;
    const cover = numberInput(existingCover);
    const annualExpenses = numberInput(familyExpenses);
    const liabilities = numberInput(otherLiabilities);
    // Illustrative baseline: loan + other liabilities + 5 years of entered family expenses - existing cover.
    const illustrativeNeed = principal + liabilities + annualExpenses * 5;
    const gap = Math.max(0, illustrativeNeed - cover);
    return { principal, years, months, emi, totalRepayment: emi * months, totalInterest: emi * months - principal, premiumEmi, premiumTotalRepayment, premiumInterest: premiumTotalRepayment - financedPremium, cover, illustrativeNeed, gap, dependants: numberInput(dependants), age: numberInput(age) };
  }, [loan, tenure, rate, shieldPremium, existingCover, familyExpenses, otherLiabilities, dependants, age]);

  const whatsappHref = CONTACT.whatsapp;
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    if (!enquiryConsent) {
      setFormError("Please provide consent for us to contact you about this enquiry.");
      return;
    }
    if (!name.trim() || !/^[6-9]\d{9}$/.test(mobile.replace(/\D/g, ""))) {
      setFormError("Enter your name and a valid 10-digit Indian mobile number.");
      return;
    }
    const message = [
      "Home Loan Protection Review enquiry — Shubh Estate Brokers",
      `Name: ${name.trim()}`, `Mobile: ${mobile.trim()}`, email ? `Email: ${email.trim()}` : "",
      `City: ${city}`, `Loan amount range: ${money(calc.principal)}`, `Loan status: ${loanStatus}`,
      `Existing life insurance: ${coverStatus}`, `Main concern: ${concern}`, `Preferred contact: ${contactMethod}`,
      `Consent to contact about enquiry: Yes`, `Optional marketing consent: ${marketingConsent ? "Yes" : "No"}`,
    ].filter(Boolean).join("\n");
    // The site uses an existing WhatsApp bridge. The user reviews and sends the message in WhatsApp.
    window.location.href = `${whatsappHref}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-[#0A1128]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(200,155,60,0.20),transparent_55%)]" />
        <div className="container-page py-12 text-white md:py-20 lg:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-gold">
              <ShieldCheck className="size-4" aria-hidden="true" /> Homebuyer protection guide
            </div>
            <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">Buying a Home with a Loan? <span className="text-gold">Protect Your Family Before You Sign.</span></h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">Your home loan may last 15–30 years. If something happens to you, will your family be able to keep the home, repay the loan, and manage everyday expenses? Understand term insurance versus bank or NBFC loan protection before making a decision.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl"><a href="#decision-guide">Help Me Choose the Right Protection <ArrowRight className="ml-1 size-4" /></a></Button>
              <Button asChild variant="goldOutline" size="xl"><a href="#comparison">Compare Term Insurance vs Loan Shield</a></Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-3">
              {["Understand options before committing", "Compare cost, cover and policy conditions", "Decide for your family's needs"].map((item) => <div key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Breadcrumb" className="container-page py-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link><span className="mx-2">/</span><Link to="/home-loans" className="hover:text-primary">Home Loans</Link><span className="mx-2">/</span><span aria-current="page">Term Insurance vs Home Loan Insurance</span>
      </nav>

      <section className="container-page py-10 md:py-14">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><HeartHandshake className="size-6" /></div>
            <h2 className="mt-5 font-display text-2xl">Option A: Individual Term Life Insurance</h2>
            <p className="mt-3 leading-7 text-muted-foreground">A term policy provides life cover for a defined period. An eligible death benefit is paid under the policy's terms, nomination, assignment and claim provisions.</p>
            <ul className="mt-5 space-y-3 text-sm leading-6">{["Can provide protection for the loan and other family needs if the sum assured is appropriate.", "May remain relevant after a property sale, lender change or loan repayment if the policy stays active.", "Cover, premium, term, underwriting, exclusions and riders depend on the product.", "An existing policy is not automatically sufficient; assess all family obligations."].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />{x}</li>)}</ul>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gold/15 text-foreground"><Landmark className="size-6" /></div>
            <h2 className="mt-5 font-display text-2xl">Option B: Bank or NBFC Loan Shield</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Loan-linked cover is designed to protect a specified borrowing liability in defined circumstances. Structure and benefits differ by insurer and product.</p>
            <ul className="mt-5 space-y-3 text-sm leading-6">{["Cover may reduce with the loan, remain level or follow another schedule.", "A claim may be paid to a lender or another beneficiary under policy terms.", "Premiums may be regular or single-pay; financing a single premium can add interest.", "Cancellation, refunds, continuation, lender changes and extra benefits must be verified."].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />{x}</li>)}</ul>
          </article>
        </div>
        <p className="mt-4 rounded-xl bg-muted/60 p-4 text-sm leading-6 text-muted-foreground"><Info className="mr-2 inline size-4" />Neither option is automatically best for everyone. Compare the actual policy wording, costs and your family's financial needs.</p>
      </section>

      <section id="comparison" className="bg-muted/35 py-12 md:py-16">
        <div className="container-page">
          <div className="max-w-3xl"><p className="eyebrow">Side-by-side comparison</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Term Insurance vs Home Loan Insurance</h2><p className="mt-4 leading-7 text-muted-foreground">Features vary by policy. Use this table as a question checklist, then verify the official documents for the product offered to you.</p></div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead><tr className="bg-[#0A1128] text-white"><th className="p-4 font-semibold">Factor</th><th className="p-4 font-semibold">Individual term insurance</th><th className="p-4 font-semibold">Loan protection / loan shield</th></tr></thead>
              <tbody>{comparisonRows.map((row, i) => <tr key={row[0]} className={i % 2 ? "bg-muted/30" : ""}><th scope="row" className="w-[22%] p-4 align-top font-semibold">{row[0]}</th><td className="w-[39%] p-4 align-top leading-6">{row[1]}</td><td className="w-[39%] p-4 align-top leading-6">{row[2]}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="decision-guide" className="container-page py-12 md:py-16">
        <div className="max-w-3xl"><p className="eyebrow">Decision guide</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Which Option May Suit Your Situation?</h2><p className="mt-4 leading-7 text-muted-foreground">Start with the risk you need to cover, then compare the actual products available to you.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["You want to protect your family beyond the loan", "Explore whether an adequately sized individual term policy covers the mortgage and other family responsibilities."],
            ["You want protection specifically tied to the debt", "Review the loan-linked plan's benefit structure, exclusions, beneficiary and claim process."],
            ["You already have life cover", "Compare existing cover with outstanding debts, income needs, dependants and future goals before buying more."],
            ["You are offered a single-premium shield", "Calculate the full financed cost, including additional EMI and interest, and compare like-for-like alternatives."],
            ["Age or health affects your options", "Disclose information accurately and compare the underwriting outcome, terms and exclusions of available options."],
            ["You have a joint home loan", "Assess each co-borrower's income contribution, liabilities, dependants and existing cover separately."],
          ].map(([title, body]) => <article key={title} className="rounded-xl border border-border p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></article>)}
        </div>
      </section>

      <section id="calculator" className="bg-[#0A1128] py-12 text-white md:py-16">
        <div className="container-page">
          <div className="max-w-3xl"><p className="eyebrow text-gold">Illustrative calculator</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Understand the Loan Cost and Protection Gap</h2><p className="mt-4 leading-7 text-white/70">Enter estimates to see how the home-loan repayment and a financed single premium may affect cost. These calculations are educational illustrations, not insurance quotations or a personalised recommendation.</p></div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 sm:grid-cols-2 md:p-7">
              <Field label="Home loan amount (₹)" value={loan} onChange={setLoan} />
              <Field label="Loan tenure (years)" value={tenure} onChange={setTenure} />
              <Field label="Borrower's age" value={age} onChange={setAge} />
              <Field label="Existing life cover (₹)" value={existingCover} onChange={setExistingCover} />
              <Field label="Annual family expenses (₹)" value={familyExpenses} onChange={setFamilyExpenses} />
              <Field label="Other liabilities (₹)" value={otherLiabilities} onChange={setOtherLiabilities} />
              <Field label="Financial dependants" value={dependants} onChange={setDependants} />
              <Field label="Loan interest rate (% p.a.)" value={rate} onChange={setRate} />
              <Field label="Optional single shield premium (₹)" value={shieldPremium} onChange={setShieldPremium} />
              <Field label="Term policy annual premium (₹)" value={termPremium} onChange={setTermPremium} />
              <Field label="Loan shield annual premium (₹, optional)" value={annualShieldPremium} onChange={setAnnualShieldPremium} />
            </div>
            <div className="space-y-4">
              <Metric icon={<Calculator className="size-5" />} label="Illustrative monthly home-loan EMI" value={money(calc.emi)} note="Assumes the entered rate remains constant for the full tenure." />
              <Metric icon={<Wallet className="size-5" />} label="Total loan repayment" value={money(calc.totalRepayment)} note={`Includes estimated interest of ${money(calc.totalInterest)}.`} />
              <Metric icon={<ShieldCheck className="size-5" />} label="Illustrative protection gap" value={money(calc.gap)} note={`Baseline = loan + other liabilities + 5 years of family expenses − existing cover. Dependants entered: ${calc.dependants}; age entered: ${calc.age}.`} />
              <Metric icon={<Landmark className="size-5" />} label="Extra EMI if single premium is financed" value={money(calc.premiumEmi)} note={`Estimated total repayment for premium: ${money(calc.premiumTotalRepayment)}; estimated interest on it: ${money(calc.premiumInterest)}.`} />
              <div className="rounded-xl border border-gold/40 bg-gold/10 p-5 text-sm leading-6 text-white/80"><strong className="text-gold">How to interpret this:</strong> the protection-gap formula is only a rough starting point. It does not account for assets, future income, inflation, taxes, existing savings or policy-specific terms. Compare policy costs over the same period and equivalent benefits.</div>
              <div className="rounded-xl border border-white/15 p-5"><h3 className="font-semibold">Optional annual-premium comparison</h3><p className="mt-2 text-sm text-white/70">Over {calc.years} years, the entered term premium totals approximately {money(numberInput(termPremium) * calc.years)}. The loan-shield annual premium totals approximately {money(numberInput(annualShieldPremium) * calc.years)}. This is only a simple sum and does not adjust for premium changes, taxes, payment timing or differences in benefits.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow">Consumer checklist</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Before You Sign for Loan Protection, Ask These 8 Questions</h2><p className="mt-4 leading-7 text-muted-foreground">Request the documents and written answers before you commit.</p></div>
          <div className="space-y-3">{[
            "Is this policy required under my actual loan terms, or is it optional?",
            "What exactly is covered, and what exclusions apply?",
            "Does the sum assured decrease with the outstanding loan?",
            "Who receives the claim benefit?",
            "What is the total premium, and will I pay interest if it is financed?",
            "What happens after early repayment, refinancing or sale of the property?",
            "Can the policy be cancelled, surrendered or refunded, and on what terms?",
            "Have I compared this option with suitable individual term insurance?",
          ].map((item, i) => <div key={item} className="flex gap-3 rounded-xl border border-border p-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{i + 1}</span><p className="pt-1 text-sm leading-6">{item}</p></div>)}</div>
        </div>
        <div className="mt-6 rounded-xl bg-muted/60 p-5 text-sm leading-6 text-muted-foreground"><FileCheck2 className="mr-2 inline size-4" />Ask for the product brochure, policy wording, Customer Information Sheet where applicable, premium illustration, benefit schedule and written clarification of any lender-related conditions.</div>
      </section>

      <section className="bg-muted/35 py-12 md:py-16">
        <div className="container-page">
          <div className="max-w-3xl"><p className="eyebrow">Common questions</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Home Loan Insurance FAQs</h2><p className="mt-4 leading-7 text-muted-foreground">General information for Indian homebuyers. Your actual loan agreement and insurance policy wording take precedence.</p></div>
          <div className="mt-7 max-w-4xl space-y-3">{faqs.map(([q, a], i) => <div key={q} className="overflow-hidden rounded-xl border border-border bg-card"><button type="button" className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{q}</span><ChevronDown className={`size-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} /></button>{openFaq === i && <div className="px-5 pb-5 text-sm leading-7 text-muted-foreground">{a}</div>}</div>)}</div>
        </div>
      </section>

      <section id="review" className="container-page py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Homebuyer support</p><h2 className="mt-3 font-display text-3xl md:text-4xl">Not Sure Which Protection Is Right for You?</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Start with a Home Loan Protection Review. Share a few basic details so we can help you understand the questions to ask and factors to compare before deciding.</p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground"><p className="flex gap-2"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-primary" />Your details are placed into a message for you to review and send through WhatsApp; they are not submitted to a website database by this form.</p><p className="flex gap-2"><Users className="mt-0.5 size-4 shrink-0 text-primary" />This is general home-loan decision support, not a regulated insurance sale or personalised insurance recommendation.</p></div>
            <div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="outline"><a href={CONTACT.phoneHref}>Call {CONTACT.phone}</a></Button><Button asChild variant="outline"><a href={CONTACT.whatsapp}>Open WhatsApp</a></Button></div>
          </div>
          <form onSubmit={submitEnquiry} className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">Name *<input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 font-normal" placeholder="Your name" /></label>
              <label className="text-sm font-medium">Mobile number *<input required inputMode="tel" autoComplete="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 font-normal" placeholder="10-digit mobile number" /></label>
              <label className="text-sm font-medium">Email (optional)<input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 font-normal" placeholder="you@example.com" /></label>
              <label className="text-sm font-medium">City<input value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 font-normal" /></label>
              <label className="text-sm font-medium">Loan status<select value={loanStatus} onChange={(e) => setLoanStatus(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 font-normal"><option>Planning</option><option>Applied</option><option>Sanctioned</option><option>Already disbursed</option></select></label>
              <label className="text-sm font-medium">Existing life insurance<select value={coverStatus} onChange={(e) => setCoverStatus(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 font-normal"><option>Yes</option><option>No</option><option>Not sure</option></select></label>
              <label className="text-sm font-medium">Main concern<select value={concern} onChange={(e) => setConcern(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 font-normal"><option>Cost</option><option>Family security</option><option>Existing cover</option><option>Loan shield terms</option><option>Not sure</option></select></label>
              <label className="text-sm font-medium">Preferred contact<select value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3 font-normal"><option>WhatsApp</option><option>Phone call</option><option>Email</option></select></label>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-6">
              <label className="flex items-start gap-3"><input type="checkbox" checked={enquiryConsent} onChange={(e) => setEnquiryConsent(e.target.checked)} className="mt-1 size-4 shrink-0" /><span>I consent to Shubh Estate Brokers contacting me about this enquiry. I understand that clicking submit will open a pre-filled WhatsApp message for me to review and send. *</span></label>
              <label className="flex items-start gap-3 text-muted-foreground"><input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} className="mt-1 size-4 shrink-0" /><span>I would also like to receive occasional marketing updates. (Optional)</span></label>
              <p className="text-xs text-muted-foreground">Please do not include policy numbers, medical records, identity documents or banking credentials. See our <a className="underline" href="/privacy-policy">Privacy Policy</a> for details on website privacy. No information is sent until you choose to send the message in WhatsApp.</p>
            </div>
            {formError && <p role="alert" className="mt-4 text-sm font-medium text-destructive">{formError}</p>}
            <div className="mt-6"><Button type="submit" variant="gold" size="xl" className="w-full">Review Enquiry in WhatsApp <ArrowRight className="ml-2 size-4" /></Button></div>
          </form>
        </div>
      </section>

      <section className="border-t border-border py-8">
        <div className="container-page">
          <div className="rounded-xl border border-border p-5 text-xs leading-6 text-muted-foreground">
            <strong className="text-foreground">Important disclaimer:</strong> This page is for general educational purposes only and is not a substitute for personalised insurance, legal or financial advice. Insurance benefits, eligibility, exclusions, premiums and claim payments depend on the applicable policy terms and underwriting. Compare official policy documents and obtain qualified advice where needed. Regulatory information and product terms should be checked against current official sources, including <a href="https://irdai.gov.in/" target="_blank" rel="noreferrer" className="underline">IRDAI</a> and <a href="https://www.rbi.org.in/" target="_blank" rel="noreferrer" className="underline">RBI</a>. Last reviewed: 20 October 2026.
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm"><Link to="/home-loans" className="inline-flex items-center gap-2 text-primary hover:underline">Explore home loan support <ArrowRight className="size-4" /></Link><a href={CONTACT.phoneHref} className="text-muted-foreground hover:text-foreground">Questions? Call {CONTACT.phone}</a></div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="text-sm font-medium text-white/90">{label}<input type="number" min="0" step="any" value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-white/20 bg-[#111b37] px-3 py-3 text-white outline-none focus:border-gold" /></label>;
}

function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return <div className="rounded-xl border border-white/15 bg-white/5 p-5"><div className="flex items-center gap-2 text-sm text-white/70">{icon}{label}</div><p className="mt-2 font-display text-2xl text-gold">{value}</p><p className="mt-2 text-xs leading-5 text-white/60">{note}</p></div>;
}
