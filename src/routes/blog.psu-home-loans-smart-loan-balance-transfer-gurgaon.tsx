import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SITE_ORIGIN } from "@/lib/seo";

const canonical = `${SITE_ORIGIN}/blog/psu-home-loans-smart-loan-balance-transfer-gurgaon`;
const title = "PSU Home Loans in Gurgaon: Rates, Smart Loans & Balance Transfers";
const description =
  "Compare Bank of India, Indian Bank, Bank of Maharashtra and Bank of Baroda home-loan rates, CIBIL slabs, smart overdraft options, fees, LTV, tenure, takeovers and top-up terms.";

export const Route = createFileRoute(
  "/blog/psu-home-loans-smart-loan-balance-transfer-gurgaon",
)({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: canonical },
      { property: "article:published_time", content: "2026-09-24" },
      { property: "article:modified_time", content: "2026-09-24" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          datePublished: "2026-09-24",
          dateModified: "2026-09-24",
          mainEntityOfPage: canonical,
          author: { "@type": "Person", name: "Arun Madaan", "@id": `${SITE_ORIGIN}/about#arun-madaan` },
          publisher: { "@type": "RealEstateAgent", name: "Shubh Estate Brokers", "@id": `${SITE_ORIGIN}/#real-estate-agent` },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
            { "@type": "ListItem", position: 2, name: "Property Guides", item: `${SITE_ORIGIN}/blog` },
            { "@type": "ListItem", position: 3, name: "PSU Home Loan Comparison", item: canonical },
          ],
        }),
      },
    ],
  }),
  component: Article,
});

const banks = [
  ["Bank of India", "7.10%–10.00%; 7.10% at CIBIL 840+", "Star Smart Home Loan", "0.35%; ₹3,500–₹30,000 + GST"],
  ["Indian Bank", "7.15%–8.55% official floating range", "IB Home Advantage overdraft", "Paisabazaar lists NIL; confirm current written terms"],
  ["Bank of Maharashtra", "7.00%–9.15% salaried; 7.10%–9.65% non-salaried", "Maha Super Flexi; +0.25% over regular", "Paisabazaar NIL; current waiver needs confirmation"],
  ["Bank of Baroda", "7.20%–8.95% reported range", "Baroda Max Savings", "0.50% up to ₹50L; 0.25% above; takeover ₹8,500 + GST"],
] as const;

function Article() {
  return (
    <main>
      <article>
        <header className="surface-navy">
          <div className="container-page max-w-5xl py-16 md:py-24">
            <p className="eyebrow">Home Loan & Mortgage Guide · Checked 24 September 2026</p>
            <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-navy-foreground/75 md:text-lg">
              Compare regular term loans with smart overdraft structures and review published PSU-bank pricing before choosing a home loan for a Gurgaon property.
            </p>
          </div>
        </header>

        <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-20">
          <div className="max-w-4xl space-y-12">
            <section>
              <h2 className="font-display text-3xl">Why loan structure matters</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                The lowest advertised rate is only one part of borrowing cost. CIBIL score, loan amount, property valuation, processing charges, repayment period and balance-transfer terms can change the final cost by lakhs. Rates and fees below are published figures and must be confirmed in the bank’s written sanction.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl">PSU bank comparison</h2>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-muted"><tr><th className="p-4">Bank</th><th className="p-4">Floating rate</th><th className="p-4">Smart option</th><th className="p-4">Processing fee</th></tr></thead>
                  <tbody>{banks.map((row) => <tr key={row[0]} className="border-t border-border align-top">{row.map((cell, i) => <td key={i} className="p-4 leading-6">{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Indian Bank’s official page updated on 10 September 2026 shows 7.15%–8.55%. Bank of Maharashtra’s official schedule shows the detailed CIBIL table beginning at 7.00% for salaried borrowers with CIBIL 800+. These newer bank figures differ from older Paisabazaar headlines.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl">CIBIL-linked rate examples</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl">Bank of India</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">840+: 7.10%; 825–839: 7.25%; 800–824: 7.25%; 760–799: 7.40% salaried / 7.50% non-salaried; 725–759: 7.90% / 8.00%; below 700: 10.00%.</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl">Bank of Maharashtra</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">800+: 7.00% / 7.10%; 750–799: 7.25% / 7.35%; 725–749: 7.70% / 7.80%; below 600: 9.15% / 9.65% (salaried / non-salaried).</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Indian Bank and Bank of Baroda publish ranges and benchmark spreads on the reviewed pages, but not a complete comparable score-by-score grid. A 750 or 800 score does not guarantee the minimum rate.</p>
            </section>

            <section>
              <h2 className="font-display text-3xl">Term loan versus smart or overdraft loan</h2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead className="bg-muted"><tr><th className="p-4">Feature</th><th className="p-4">Regular term loan</th><th className="p-4">Smart / overdraft loan</th></tr></thead>
                  <tbody>
                    <tr className="border-t border-border"><td className="p-4">Surplus cash</td><td className="p-4">Permanent prepayment reduces principal.</td><td className="p-4">Eligible parked funds reduce interest-bearing balance and may remain accessible.</td></tr>
                    <tr className="border-t border-border"><td className="p-4">Interest</td><td className="p-4">Charged on outstanding principal under the loan schedule.</td><td className="p-4">Offset is calculated using the linked account rules; Baroda counts eligible end-of-day credit.</td></tr>
                    <tr className="border-t border-border"><td className="p-4">Best fit</td><td className="p-4">Borrowers prioritising simple repayment and permanent debt reduction.</td><td className="p-4">Borrowers who can consistently park bonuses or business surplus.</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl">LTV, tenure, balance transfer and top-up terms</h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
                <li>Typical published LTV ceilings are 90% up to ₹30 lakh, 80% from above ₹30 lakh through ₹75 lakh, and 75% above ₹75 lakh. These are loan-amount bands and are subject to valuation and eligibility.</li>
                <li>Regular housing-loan tenures generally extend to 30 years. Indian Bank Home Loan Plus has a maximum 15-year term or step-down overdraft period.</li>
                <li>Bank of India Star Top Up is linked to the home-loan rate plus 0.50 percentage points. Bank of Maharashtra top-up premiums range from 0.50 to 3.00 percentage points by CIBIL slab, with 0.50% processing listed by Paisabazaar.</li>
                <li>Bank of Baroda takeover processing is ₹8,500 plus GST. Its top-up is linked home-loan ROI plus a 0.25-point strategic premium plus 0.60 points, with 0.35% processing subject to ₹5,000–₹12,500 limits.</li>
                <li>Transfer charges from the existing lender, legal review, valuation, mortgage and registration costs should be added to the new lender’s processing fee.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-3xl">How Shubh Estate Brokers can help</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Shubh Estate Brokers helps buyers compare financing structures, coordinate documentation and assess property title and valuation alongside the loan. Arun Madaan is an ex-banker and law graduate with approximately 20 years of mortgage experience. Final eligibility, interest rate, concession and approval remain subject to the bank’s current policy and written sanction.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="gold"><Link to="/home-loans">Discuss home-loan assistance</Link></Button>
                <Button asChild variant="navy"><Link to="/flats-for-sale-in-gurgaon">View Gurgaon properties</Link></Button>
              </div>
            </section>

            <section className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
              <p className="eyebrow">Sources checked</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Paisabazaar pages for Bank of India, Indian Bank, Bank of Maharashtra and Bank of Baroda; Bank of India’s June 2026 floating-rate schedule; Indian Bank’s official floating-rate page; Bank of Maharashtra’s official retail-rate schedule; and Bank of Baroda’s official Max Savings and service-charge pages.
              </p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">Rates and charges change. Confirm current terms directly with the lender before application.</p>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <p className="eyebrow">Shubh Estate Brokers</p>
            <h2 className="mt-2 font-display text-2xl">Plan the property and finance together</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Call or WhatsApp 9911050561 for Gurugram property and home-loan guidance.</p>
            <Button asChild variant="gold" className="mt-5 w-full"><a href="https://wa.me/919911050561">WhatsApp Arun Madaan</a></Button>
          </aside>
        </div>
      </article>
    </main>
  );
}
