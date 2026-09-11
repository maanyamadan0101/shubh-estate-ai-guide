import { createFileRoute, Link } from "@tanstack/react-router";
import { HaryanaStampDutyCalculator } from "@/components/site/HaryanaStampDutyCalculator";
import { PageHero } from "@/components/site/SectionHead";
import { HARYANA_STAMP_DUTY_METADATA } from "@/lib/haryana-stamp-duty";
import { SITE_ORIGIN } from "@/lib/seo";

const CANONICAL = `${SITE_ORIGIN}/haryana-stamp-duty-registration-calculator`;

const FAQS = [
  {
    question: "What is the stamp duty rate for a female buyer in urban Haryana?",
    answer:
      "For an ordinary sale or conveyance deed, the standard planning rate is 5% for a woman in an urban area. Haryana Revenue states that sale/conveyance duty is 7% in urban areas with a 2% remission where the sale is in favour of a woman.",
  },
  {
    question: "What is the maximum property registration fee in Haryana?",
    answer:
      "Haryana charges registration fees on a value-based slab schedule. The current maximum registration fee is Rs 50,000 for high-value property documents.",
  },
  {
    question: "Does the calculator use the agreement value or Collector-rate value?",
    answer:
      "For a practical planning estimate, the calculator uses the higher of the entered agreement value and Collector-rate valuation. The Sub-Registrar and HARIS process determines the final assessable amount, and section 47-A procedures can apply where valuation is disputed.",
  },
  {
    question: "Can this calculator be used for gift deeds or family transfers?",
    answer:
      "No. This calculator is designed for an ordinary property sale/conveyance. Family transfers, gifts, leases, mortgages, PMAY-U 2.0 eligible transactions and other deed types can have different concessions or charges and should be checked separately.",
  },
];

export const Route = createFileRoute("/haryana-stamp-duty-registration-calculator")({
  head: () => ({
    meta: [
      { title: "Haryana Stamp Duty Calculator 2026 | Registration Fees" },
      {
        name: "description",
        content:
          "Calculate Haryana stamp duty and registration fees for property purchases using urban or rural rates, buyer category and the current ₹50,000 fee cap.",
      },
      { property: "og:title", content: "Haryana Stamp Duty & Registration Calculator 2026" },
      {
        property: "og:description",
        content:
          "Estimate Haryana property stamp duty and slab-based registration fees with buyer and location concessions.",
      },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: HaryanaStampDutyPage,
});

const registrationSlabs = [
  ["Up to ₹50,000", "₹100"],
  ["₹50,001 – ₹1,00,000", "₹500"],
  ["₹1,00,001 – ₹5,00,000", "₹1,000"],
  ["₹5,00,001 – ₹10,00,000", "₹5,000"],
  ["₹10,00,001 – ₹20,00,000", "₹10,000"],
  ["₹20,00,001 – ₹25,00,000", "₹12,500"],
  ["₹25,00,001 – ₹30,00,000", "₹15,000"],
  ["₹30,00,001 – ₹40,00,000", "₹20,000"],
  ["₹40,00,001 – ₹50,00,000", "₹25,000"],
  ["₹50,00,001 – ₹60,00,000", "₹30,000"],
  ["₹60,00,001 – ₹70,00,000", "₹35,000"],
  ["₹70,00,001 – ₹80,00,000", "₹40,000"],
  ["₹80,00,001 – ₹90,00,000", "₹45,000"],
  ["Above ₹90,00,000", "₹50,000 maximum"],
] as const;

function HaryanaStampDutyPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Haryana Stamp Duty & Registration Fee Calculator",
    url: CANONICAL,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description:
      "Indicative calculator for ordinary Haryana property sale/conveyance stamp duty and registration fees.",
    provider: {
      "@type": "RealEstateAgent",
      name: "Shubh Estate Brokers",
      url: SITE_ORIGIN,
    },
  };

  return (
    <>
      <PageHero
        eyebrow="Haryana Property Calculator"
        title="Haryana Stamp Duty & Registration Fee Calculator"
        body="Estimate property purchase charges using current Haryana sale/conveyance rates, the women-buyer concession and the slab-based registration fee cap."
      />

      <main className="container-page py-12 sm:py-16">
        <HaryanaStampDutyCalculator />

        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          Rates last verified {HARYANA_STAMP_DUTY_METADATA.lastVerified}. This is an indicative
          planning tool, not a substitute for the final HARIS/e-GRAS demand or Sub-Registrar determination.
        </p>

        <section className="mt-14 grid gap-8 lg:grid-cols-2" aria-labelledby="rates-heading">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="eyebrow">Current planning rates</p>
            <h2 id="rates-heading" className="mt-2 font-display text-2xl sm:text-3xl">
              Haryana stamp duty: urban, rural and women-buyer rates
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-3 pr-4 font-medium">Purchaser</th>
                    <th className="py-3 pr-4 font-medium">Urban</th>
                    <th className="py-3 font-medium">Rural</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/70"><td className="py-3 pr-4">Male sole buyer</td><td className="py-3 pr-4">7%</td><td className="py-3">5%</td></tr>
                  <tr className="border-b border-border/70"><td className="py-3 pr-4">Female sole buyer</td><td className="py-3 pr-4">5%</td><td className="py-3">3%</td></tr>
                  <tr><td className="py-3 pr-4">Male + female joint buyers*</td><td className="py-3 pr-4">6%</td><td className="py-3">4%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              *The 6%/4% male-female joint rates are commonly published planning rates. Ownership
              shares and deed structure can affect the final computation, so confirm the HARIS/e-GRAS demand.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Haryana Revenue's published FAQ states 5% for sale/conveyance in rural areas and 7%
              in urban areas, with the woman-buyer rate reduced to 3% rural and 5% urban. A July
              2026 Haryana Government release also confirms a 2% rebate where conveyance is executed
              in favour of a woman and a registration-fee maximum of ₹50,000.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="eyebrow">Worked Gurugram example</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">₹42.25 crore property in a woman's name</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-border pb-3"><span className="text-muted-foreground">Assessable value</span><strong>₹42,25,00,000</strong></div>
              <div className="flex justify-between gap-4 border-b border-border pb-3"><span className="text-muted-foreground">Urban female rate</span><strong>5%</strong></div>
              <div className="flex justify-between gap-4 border-b border-border pb-3"><span className="text-muted-foreground">Stamp duty</span><strong>₹2,11,25,000</strong></div>
              <div className="flex justify-between gap-4 border-b border-border pb-3"><span className="text-muted-foreground">Registration fee</span><strong>₹50,000</strong></div>
              <div className="flex justify-between gap-4 pt-1 text-base"><span>Basic total</span><strong>₹2,11,75,000</strong></div>
            </div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              A calculator that simply applies 1% as a registration fee would show ₹42.25 lakh on
              this example. Haryana's current registration fee is slab-based and capped at ₹50,000,
              so that approach materially overstates the registration fee.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8" aria-labelledby="fee-slabs-heading">
          <p className="eyebrow">Registration fee schedule</p>
          <h2 id="fee-slabs-heading" className="mt-2 font-display text-2xl sm:text-3xl">
            Haryana property registration-fee slabs
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Registration fee is not an uncapped percentage of a high-value property. The calculator
            applies the value slabs below and caps the fee at ₹50,000.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 pr-4 font-medium">Property / document value</th>
                  <th className="py-3 font-medium">Registration fee</th>
                </tr>
              </thead>
              <tbody>
                {registrationSlabs.map(([range, fee]) => (
                  <tr key={range} className="border-b border-border/60 last:border-0">
                    <td className="py-3 pr-4">{range}</td>
                    <td className="py-3 font-medium">{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Valuation & exceptions</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">What value should be used?</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Haryana's registration process checks property valuation and applicable charges through
              HARIS. For a useful consumer estimate, this calculator compares the entered agreement
              consideration with the entered Collector-rate valuation and uses the higher amount.
              Haryana Revenue also notes that a party can seek determination under section 47-A where
              valuation is disputed.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Do not apply this ordinary-sale formula blindly to family transfers, gift deeds, leases,
              mortgages or special housing schemes. Haryana currently has specific concessions for
              qualifying family transfers and eligible PMAY-U 2.0 EWS dwelling units.
            </p>
          </div>
          <aside className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
            <h2 className="font-display text-2xl">Official references</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6">
              <li><a className="text-gold hover:underline" href="https://revenueharyana.gov.in/faq/" target="_blank" rel="noreferrer">Haryana Revenue & Disaster Management FAQ</a></li>
              <li><a className="text-gold hover:underline" href="https://prms.prharyana.gov.in/press-release/3446" target="_blank" rel="noreferrer">Haryana Government release, 28 July 2026</a></li>
              <li><a className="text-gold hover:underline" href="https://gurugram.gov.in/final-collector-rate-year-2026-27/" target="_blank" rel="noreferrer">Gurugram Collector Rates 2026–27</a></li>
            </ul>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Always verify the relevant property classification, municipal status and final deed demand before payment.
            </p>
          </aside>
        </section>

        <section className="mt-14" aria-labelledby="faq-heading">
          <p className="eyebrow">FAQs</p>
          <h2 id="faq-heading" className="mt-2 font-display text-2xl sm:text-3xl">Haryana stamp duty questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {FAQS.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <h2 className="font-display text-2xl">Planning a Gurugram property purchase?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Use the calculator for an initial acquisition-cost estimate, then combine it with title
            checks, valuation and loan planning before committing funds.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link to="/property-buying-advisory-gurgaon" className="text-gold hover:underline">Property buying advisory</Link>
            <Link to="/home-loans" className="text-gold hover:underline">Home loan assistance</Link>
            <Link to="/emi-calculator" className="text-gold hover:underline">EMI calculator</Link>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
    </>
  );
}
