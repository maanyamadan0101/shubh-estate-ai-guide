import { createFileRoute } from "@tanstack/react-router";
import { SeoIntentLanding } from "@/components/site/SeoIntentLanding";
import { SITE_ORIGIN } from "@/lib/seo";

const path = "/school-building-for-rent-in-gurgaon";
const title = "School Building for Rent in Gurgaon | 20,035 Sq Ft";
const description = "School building for rent in Gurgaon: approx. 20,035 sq ft with classrooms, play area, lift and parking. Negotiable rent. Enquire with Shubh Estate Brokers.";
const faqs = [
  { title: "What is the asking rent for this school building?", paragraphs: ["The asking rent for the entire premises is ₹7,34,546 per month, negotiable. GST, maintenance, electricity and other agreed charges are additional. Final terms are subject to the owner's agreement."] },
  { title: "Can the premises be considered for a preschool or daycare?", paragraphs: ["The owner describes an existing nursery school setup with classrooms, children's toilets and play and assembly areas. Preschool, play school or daycare operators should assess the layout, age-group requirements, permitted use and current approvals before committing."] },
  { title: "Is there a playground and how many classrooms are possible?", paragraphs: ["The ground/stilt level includes designated play and assembly space. The owner describes flexible layouts allowing up to four classrooms on each of four upper floors and a designed capacity of 240 students. A separate outdoor playground's dimensions and operational capacity require confirmation during inspection."] },
  { title: "Can I lease a smaller portion of the building?", paragraphs: ["The quoted proposal is for the entire premises. Partial leasing has not been confirmed. Share your required area so we can discuss options with the owner."] },
  { title: "When is possession available and how do I request the location?", paragraphs: ["The owner's proposal describes the premises as occupied, so vacant possession and handover dates need confirmation. The school name and exact address are withheld publicly. Contact Shubh Estate Brokers to request location details and an appointment."] },
];

export const Route = createFileRoute("/school-building-for-rent-in-gurgaon")({
  head: () => ({
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: SITE_ORIGIN + path }, { property: "og:type", content: "website" }],
    links: [{ rel: "canonical", href: SITE_ORIGIN + path }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "RealEstateListing", name: title, description, url: SITE_ORIGIN + path, datePosted: "2026-10-08", dateModified: "2026-10-08", mainEntity: { "@type": "Place", name: "School building for lease in Gurgaon", address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" } } },
      { "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.title, acceptedAnswer: { "@type": "Answer", text: f.paragraphs[0] } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN }, { "@type": "ListItem", position: 2, name: "School building for rent in Gurgaon", item: SITE_ORIGIN + path }] },
    ] }) }],
  }),
  component: SchoolBuildingPage,
});

function SchoolBuildingPage() {
  return <SeoIntentLanding
    eyebrow="School premises for lease · Gurugram"
    title="School Building for Rent in Gurgaon"
    body="Approx. 20,035 sq ft · Existing school infrastructure · ₹7,34,546 per month, negotiable"
    intro="Explore an entire school building for lease in Gurgaon through Shubh Estate Brokers. With flexible classroom layouts, designated play and assembly areas, administrative rooms and lift access, this property is an option for education brands evaluating preschool, nursery school or pre-primary school premises. Property identity and exact location are shared privately on enquiry."
    interest="School building for rent in Gurgaon — 20,035 sq ft"
    ctaTitle="Request details or a site visit"
    ctaBody="Share your organisation, required area, budget and relocation date. We will confirm availability and arrange a private inspection."
    media={<section className="rounded-2xl border border-gold/40 bg-card p-6 md:p-8"><h2 className="font-display text-2xl">School premises at a glance</h2><dl className="mt-5 divide-y divide-border">{[
      ["Location", "Gurgaon (Gurugram); exact address on enquiry"], ["Plot area", "Approx. 1,170 sq metres"], ["Total rentable area", "Approx. 20,035 sq ft; not a verified carpet area"], ["Building", "Basement + ground/stilt + four upper floors + terrace"], ["Asking rent", "₹7,34,546 per month, negotiable"], ["Availability", "Handover date to be confirmed"],
    ].map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-2"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium">{value}</dd></div>)}</dl><div className="mt-6 flex flex-wrap gap-4"><a className="font-medium text-gold underline underline-offset-4" href="tel:+919911050561">Call Arun Madan</a><a className="font-medium text-gold underline underline-offset-4" href="https://wa.me/919911050561?text=I%20am%20interested%20in%20the%20school%20building%20for%20rent%20in%20Gurgaon">Enquire on WhatsApp</a></div></section>}
    sections={[
      { title: "Floor-wise layout and rooms", paragraphs: ["Areas below are approximate figures supplied by the owner; rounded floor areas may differ slightly from the total. Request measured plans and the permitted use of each level before space planning."], bullets: ["Basement: approx. 4,464 sq ft; air-conditioned, natural light, lift access and a layout described as having only one pillar.", "Ground/stilt: approx. 3,170 sq ft; parking, play and assembly areas, reception, principal's room, pantry, medical room, one accessible toilet and three staff toilets.", "First to fourth floors: approx. 2,904 sq ft each, with flexible layouts for up to four classrooms per floor.", "Each upper floor: separate boys' and girls' toilets/bathrooms, a staff toilet, pantry area and balcony/utility space.", "Terrace: approx. 785 sq ft listed area, with utilities, signage provision and a front area described as available for activities."] },
      { title: "Play space, access and building facilities", paragraphs: ["The existing school infrastructure brings teaching, administration and activity spaces into one building. The owner describes a designed capacity of 240 students; actual enrolment capacity depends on your layout and applicable approvals."], bullets: ["Designated play and assembly space on the ground/stilt level", "Two staircases with non-slip granite, secure railings and safety nets", "12-passenger lift from basement to terrace with backup and safety features", "Fixed furniture/storage, imported flooring and curtains", "Full-length green wall and parking provision", "Occupancy, fire, lift and generator permissions and Seismic Zone IV compliance stated by the owner; current documents require verification"] },
      { title: "Negotiable rent and proposed lease terms", paragraphs: ["The entire-building asking rent is ₹7,34,546 per month, negotiable, excluding GST. Maintenance, electricity and lift/generator/green-wall maintenance are additional; amounts and responsibilities must be agreed in writing.", "The owner's starting terms are a 9-year lease, 3-year lock-in, 5% annual escalation, a security deposit equivalent to 6 months' rent and equally shared lease-registration expenses. Shubh Estate Brokers can facilitate discussions based on your requirements; revised terms and any fit-out concession require the owner's agreement."] },
      ...faqs,
    ]}
    related={[{ href: "/office-space-for-rent-in-gurgaon", label: "Commercial office leasing in Gurgaon" }, { href: "/rent-out-property-in-gurgaon", label: "Rent out your property in Gurgaon" }, { href: "/contact", label: "Contact Shubh Estate Brokers" }]}
  />;
}
