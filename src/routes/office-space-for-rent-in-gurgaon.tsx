import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const path = "/office-space-for-rent-in-gurgaon";
const title = "Office Space for Rent in Gurgaon | Commercial Leasing";
const description = "Explore office space for rent in Gurgaon. Compare carpet area, rent and maintenance, including One09 Sector 109 on Dwarka Expressway. Arrange a site visit.";
export const Route = createFileRoute("/office-space-for-rent-in-gurgaon")({
  head: () => ({
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: SITE_ORIGIN + path }, { property: "og:type", content: "website" }],
    links: [{ rel: "canonical", href: SITE_ORIGIN + path }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: SITE_ORIGIN + path, dateModified: "2026-10-07" }) }],
  }),
  component: OfficeLeasingPage,
});

function OfficeLeasingPage() {
  return <SeoIntentLanding
    eyebrow="Commercial leasing · Gurugram"
    title="Office Space for Rent in Gurgaon"
    body="Find an office that fits your team, location and monthly occupancy budget."
    intro="Shubh Estate Brokers helps businesses shortlist commercial office space for rent in Gurgaon (Gurugram), compare usable area and leasing costs, and coordinate inspections and lease discussions. Share your team size, preferred business corridor, fit-out needs and move-in date to start your search."
    interest="Office space for rent in Gurgaon"
    ctaTitle="Find your next office"
    ctaBody="Tell us your team size, monthly budget, location, furnishing needs and move-in date."
    media={<article className="rounded-2xl border border-gold/40 bg-card p-6 md:p-8"><p className="eyebrow">Featured office for lease · Updated 7 October 2026</p><h2 className="mt-3 font-display text-2xl">One09, Sector 109, Dwarka Expressway</h2><p className="mt-4 leading-7 text-muted-foreground">Office 311 · Approx. 2,500 sq ft super area · Approx. 1,450 sq ft carpet area. Monthly base rent ₹1,62,500 plus approximately ₹43,500 maintenance. Taxes and other charges extra as applicable.</p><a className="mt-5 inline-block font-medium text-gold underline underline-offset-4" href="/office-space-for-rent-one09-sector-109-gurgaon">View One09 office space for rent on Dwarka Expressway, Gurgaon →</a></article>}
    sections={[
      { title: "Looking for office space in a Grade A building in Gurgaon?", paragraphs: ["Start with the building's operating specifications and your team's requirements. Review access control, fire-safety documentation, lift capacity, backup power, air-conditioning arrangements, parking and facility management before deciding whether an office meets your Grade A brief.", "Building classification and unit fit-out are separate considerations. Ask for supporting specifications for each shortlisted building; a Grade A search does not by itself establish the classification of any listing on this page."] },
      { title: "Choose the right Gurgaon office location", paragraphs: ["Share whether you prefer Golf Course Road, Golf Course Extension Road, Sohna Road, Sector 44, Udyog Vihar or Dwarka Expressway. We can use your preferred corridor to guide the search, subject to available inventory.", "Compare employee commuting routes, client access and the exact building entrance. Visit during your usual office hours to assess traffic, parking and access rather than relying on fixed travel-time promises."] },
      { title: "Compare the full monthly office cost", paragraphs: ["Compare rent and maintenance on their stated area bases. Super area is not the same as carpet area: two similarly advertised offices can offer different usable space. Add applicable taxes, electricity, air-conditioning, parking, fit-out and other agreed charges to understand your actual occupancy budget."], bullets: ["Usable carpet area and space-planning requirements", "Rent, maintenance and their billing area bases", "Furnishing, cabins, meeting rooms and workstations", "Deposit, lock-in, lease term and escalation", "Parking allocation and operating hours", "Handover date and fit-out period"] },
      { title: "Commercial leasing support from Shubh Estate Brokers", paragraphs: ["From an initial shortlist to site visits and commercial discussions, we help you compare properties on the points that affect your business. We can coordinate requests for ownership records, building documentation, maintenance details and the proposed lease terms for review before commitment."] },
      { title: "Can I request furnished or unfurnished office space?", paragraphs: ["Yes. Specify whether you need a furnished office, a fitted space or a bare-shell unit. Availability and fit-out specifications must be confirmed for each office; the One09 listing currently does not confirm furnishing or seating capacity."] },
    ]}
    related={[{ href: "/office-space-for-rent-one09-sector-109-gurgaon", label: "Office space for rent in Sector 109 Gurgaon" }, { href: "/rent-out-property-in-gurgaon", label: "Lease out your Gurgaon property" }, { href: "/contact", label: "Contact our Gurugram office" }]}
  />;
}
