import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const path = "/office-space-for-rent-one09-sector-109-gurgaon";
const title = "One09 Office for Rent, Sector 109 Gurgaon | 2,500 Sq Ft";
const description = "Lease Office 311 at One09, Sector 109, Dwarka Expressway Gurgaon. Approx. 2,500 sq ft super area, 1,450 sq ft carpet; rent ₹1,62,500 plus maintenance.";
const faqs = [
  { title: "What is the monthly rent for this One09 office?", paragraphs: ["The quoted rent is ₹65 per sq ft per month on approximately 2,500 sq ft super area, giving an approximate monthly base rent of ₹1,62,500. Maintenance is separate."] },
  { title: "How much is maintenance and the combined monthly amount?", paragraphs: ["Maintenance is quoted at ₹30 per sq ft on approximately 1,450 sq ft carpet area, or ₹43,500 per month. Base rent plus maintenance is approximately ₹2,06,000 per month, before applicable taxes, utilities and other agreed charges."] },
  { title: "Is 2,500 sq ft the usable carpet area?", paragraphs: ["No. Approximately 2,500 sq ft is the stated super area; approximately 1,450 sq ft is the stated carpet area. Confirm both against the unit's area statement and inspect the layout before planning workstations."] },
  { title: "Is the office furnished and how many seats are available?", paragraphs: ["Furnishing, workstation capacity, cabins, parking allocation, floor level and unit-specific services have not been confirmed in the supplied listing. Request the current layout, photographs and specifications before finalising a visit."] },
  { title: "How can I arrange a site visit?", paragraphs: ["Contact Shubh Estate Brokers with your preferred visit time, team size, budget and move-in date. We will reconfirm Office 311 availability and coordinate the inspection and commercial discussion."] },
];
export const Route = createFileRoute("/office-space-for-rent-one09-sector-109-gurgaon")({
  head: () => ({
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: SITE_ORIGIN + path }, { property: "og:type", content: "website" }],
    links: [{ rel: "canonical", href: SITE_ORIGIN + path }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "RealEstateListing", "@id": SITE_ORIGIN + path + "#listing", name: title, description, url: SITE_ORIGIN + path, datePosted: "2026-10-07", dateModified: "2026-10-07", mainEntity: { "@type": "Place", name: "Office 311, One09", address: { "@type": "PostalAddress", streetAddress: "Office 311, One09, Sector 109, Dwarka Expressway", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" } } },
      { "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.title, acceptedAnswer: { "@type": "Answer", text: f.paragraphs[0] } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN }, { "@type": "ListItem", position: 2, name: "Office space for rent in Gurgaon", item: SITE_ORIGIN + "/office-space-for-rent-in-gurgaon" }, { "@type": "ListItem", position: 3, name: "One09 Sector 109 office", item: SITE_ORIGIN + path }] },
    ] }) }],
  }),
  component: One09OfficePage,
});

function One09OfficePage() {
  return <SeoIntentLanding
    eyebrow="One09 · Sector 109 · Dwarka Expressway"
    title="Office Space for Rent at One09, Sector 109 Gurgaon"
    body="Office 311 · Approx. 2,500 sq ft super area · ₹1,62,500 monthly rent + maintenance"
    intro="Give your business a commercial address on Dwarka Expressway. Available for lease through Shubh Estate Brokers, Office 311 at One09 (Indiabulls One09), Sector 109, Gurugram offers approximately 2,500 sq ft super area and 1,450 sq ft carpet area. A practical option to evaluate for corporate teams and professional practices seeking office space for rent in Gurgaon. Listing details supplied on 7 October 2026; current availability is subject to reconfirmation."
    interest="Office 311 One09 Sector 109 Gurgaon leasing"
    ctaTitle="Arrange a One09 office visit"
    ctaBody="Request availability, layout, fit-out details and commercial terms for Office 311."
    media={<section className="rounded-2xl border border-gold/40 bg-card p-6 md:p-8"><h2 className="font-display text-2xl">Rent and area at a glance</h2><dl className="mt-5 divide-y divide-border">{[
      ["Office", "311, One09, Sector 109"], ["Super area", "Approx. 2,500 sq ft"], ["Carpet area", "Approx. 1,450 sq ft"], ["Monthly base rent", "₹65 × 2,500 = ₹1,62,500"], ["Monthly maintenance", "₹30 × 1,450 = ₹43,500"], ["Rent + maintenance", "Approx. ₹2,06,000 per month"],
    ].map(([label,value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-2"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium">{value}</dd></div>)}</dl><p className="mt-4 text-sm leading-6 text-muted-foreground">Taxes, utilities, parking and other charges, if applicable, are additional. Final charges, deposit, lease term, escalation and fit-out arrangements require written confirmation.</p></section>}
    sections={[
      { title: "A business address on Dwarka Expressway", paragraphs: ["One09 brings office and retail uses together in Sector 109, Gurgaon. The developer's project information describes a mixed-use commercial development with office, retail and multiplex components on the Dwarka Expressway corridor.", "For businesses considering office space on Dwarka Expressway, assess this unit against staff commuting routes, client access, parking needs and the usable layout. The supplied proposal describes a prominent road location; inspect the actual approach and office frontage during your visit."] },
      { title: "Who should consider this office?", paragraphs: ["The supplied proposal identifies corporate and professional office users as potential occupiers. Suitability depends on the permitted use, fit-out, building services and final lease terms."], bullets: ["IT, technology and software teams", "Consulting and accounting practices", "Finance, insurance and fintech offices", "Legal and professional services", "Marketing, media, engineering and design teams", "Corporate administration and back-office teams"] },
      { title: "Plan the layout around carpet area", paragraphs: ["Use the approximately 1,450 sq ft carpet area as the starting point for a seating plan. Reception, meeting rooms, circulation, storage and pantry needs affect how many workstations the unit can accommodate. No seating capacity or furnishing package is represented as confirmed.", "If your brief requires a Grade A office building in Gurgaon, request the building specifications and independently confirm fire safety, backup power, lifts, HVAC, parking and access arrangements. The supplied screenshots do not establish a verified Grade A classification for this unit or building."] },
      ...faqs,
    ]}
    related={[{ href: "/office-space-for-rent-in-gurgaon", label: "Office space for rent in Gurgaon: locations and leasing guide" }, { href: "/rent-out-property-in-gurgaon", label: "Rent out your property in Gurgaon" }, { href: "https://embassyindia.com/project/one09-gurgaon/", label: "One09 official developer project information" }]}
  />;
}
