import { createFileRoute } from "@tanstack/react-router";
import { useState, type MouseEvent } from "react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { guideHtml, guideFaq } from "@/data/gurgaon-property-guide";
import { SITE_ORIGIN } from "@/lib/seo";
import { trackContact } from "@/lib/analytics";

const canonical = `${SITE_ORIGIN}/gurgaon-property-guide`;
const title = "Gurgaon Property Guide: Rent, Buy, Sell & Office Leasing";
const description = "Compare Gurgaon rentals near metro, apartment prices and office leases. Get selling advice and a free initial valuation consultation. Call 9911050561.";
const interests = ["1 BHK rental near metro", "Sell property: free valuation", "Buy apartment: corridor comparison", "Commercial office lease"] as const;

export const Route = createFileRoute("/gurgaon-property-guide")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:url", content: canonical }, { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@graph": [
        { "@type": "WebPage", "@id": canonical, url: canonical, name: title, description,
          datePublished: "2026-09-24", dateModified: "2026-09-24",
          publisher: { "@id": `${SITE_ORIGIN}/#real-estate-agent` } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
          { "@type": "ListItem", position: 2, name: "Gurgaon Property Guide", item: canonical },
        ] },
        { "@type": "FAQPage", "@id": `${canonical}#faq`, mainEntity: guideFaq },
      ],
    }) }],
  }),
  component: GurgaonPropertyGuide,
});

function GurgaonPropertyGuide() {
  const [interest, setInterest] = useState<string>(interests[0]);
  function onArticleClick(event: MouseEvent<HTMLElement>) {
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("tel:")) trackContact("phone", "gurgaon_property_guide");
    if (href.includes("wa.me/")) trackContact("whatsapp", "gurgaon_property_guide");
    if (href === "#enquire") {
      const copy = anchor.closest("aside")?.textContent || "";
      setInterest(/valuation/i.test(copy) ? interests[1] : /corridor/i.test(copy) ? interests[2] : /office/i.test(copy) ? interests[3] : interests[0]);
    }
  }
  return (
    <div className="container-page py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground"><a href="/" className="underline">Home</a> / Gurgaon Property Guide</nav>
      <p className="eyebrow mb-4">Gurugram advisory · Updated 24 September 2026</p>
      <article className="property-guide max-w-5xl" onClick={onArticleClick} dangerouslySetInnerHTML={{ __html: guideHtml }} />
      <section id="enquire" className="mt-14 max-w-3xl scroll-mt-28 rounded-2xl border bg-card p-6 md:p-10" aria-labelledby="enquiry-heading">
        <h2 id="enquiry-heading" className="font-display text-3xl">Tell us what you need</h2>
        <p className="mt-3 text-muted-foreground">Select your requirement for a focused callback from Shubh Estate Brokers.</p>
        <label htmlFor="guide-interest" className="mt-6 block text-sm font-medium">I would like help with</label>
        <select id="guide-interest" value={interest} onChange={e => setInterest(e.target.value)} className="mb-6 mt-2 w-full rounded-md border bg-background p-3">
          {interests.map(value => <option key={value}>{value}</option>)}
        </select>
        <p className="mb-4 text-sm text-muted-foreground">In your message, include the project or preferred area, budget, size or team seats, and your target move-in or sale date.</p>
        <EnquiryForm key={interest} interest={interest} includeRequirements={interest === interests[2]} submitLabel="Request My Consultation" />
      </section>
      <style>{`
        .property-guide { color: var(--foreground); line-height: 1.8; overflow-wrap: anywhere; }
        .property-guide h1 { font-family: var(--font-display); font-size: clamp(2.1rem, 5vw, 3.8rem); line-height: 1.12; margin: 0 0 1.5rem; max-width: 950px; }
        .property-guide h2 { font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.25rem); line-height: 1.25; margin: 3.5rem 0 1.25rem; scroll-margin-top: 7rem; }
        .property-guide h3 { font-size: 1.2rem; font-weight: 600; margin: 2rem 0 .8rem; }
        .property-guide p { margin: 1rem 0; }
        .property-guide a { color: inherit; text-decoration: underline; text-underline-offset: 4px; }
        .property-guide a:hover { opacity: .75; }
        .property-guide ul, .property-guide ol { padding-left: 1.5rem; margin: 1rem 0; }
        .property-guide ul { list-style: disc; } .property-guide ol { list-style: decimal; }
        .property-guide li { margin: .65rem 0; }
        .property-guide .table-scroll { overflow-x: auto; margin: 1.5rem 0; border: 1px solid var(--border); border-radius: .75rem; }
        .property-guide table { border-collapse: collapse; min-width: 680px; width: 100%; font-size: .9rem; line-height: 1.6; }
        .property-guide th, .property-guide td { padding: 1rem; text-align: left; vertical-align: top; border-bottom: 1px solid var(--border); }
        .property-guide th { background: var(--muted); font-weight: 600; }
        .property-guide .guide-cta { padding: 1.5rem; border: 1px solid var(--border); border-left: 4px solid var(--gold); border-radius: .75rem; background: var(--muted); margin: 2rem 0; }
      `}</style>
    </div>
  );
}
