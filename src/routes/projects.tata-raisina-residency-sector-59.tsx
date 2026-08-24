import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { getPublicProjectHub } from "@/lib/project-hub.functions";
import { formatArea, formatINR, SITE_ORIGIN } from "@/lib/seo";

const slug = "tata-raisina-residency-sector-59";
const canonical = `${SITE_ORIGIN}/projects/${slug}`;
const title = "Tata Raisina Residency Sector 59 Gurgaon | Project & Resale Guide";
const description =
  "Tata Raisina Residency Sector 59 Gurgaon buyer guide with project context, 12-acre setting, 9 towers, resale checks, current inventory and home-loan guidance.";

export const Route = createFileRoute("/projects/tata-raisina-residency-sector-59")({
  loader: () => getPublicProjectHub({ data: { slug } }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
            { "@type": "ListItem", position: 2, name: "Gurgaon Project Guides", item: `${SITE_ORIGIN}/projects` },
            { "@type": "ListItem", position: 3, name: "Tata Raisina Residency", item: canonical },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ApartmentComplex",
          "@id": `${canonical}#project`,
          name: "Tata Raisina Residency",
          alternateName: "Raisina Residency",
          url: canonical,
          description,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sector 59",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          additionalProperty: [
            { "@type": "PropertyValue", name: "Developer brand", value: "Tata" },
            { "@type": "PropertyValue", name: "Project setting", value: "Approximately 12 acres" },
            { "@type": "PropertyValue", name: "Towers", value: "9" },
          ],
        }),
      },
    ],
  }),
  component: TataRaisinaPage,
});

function TataRaisinaPage() {
  const hub = Route.useLoaderData();
  const listings = hub?.listings ?? [];

  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-page py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <Link to="/projects" className="hover:text-foreground">Projects</Link>
            <span className="px-2">/</span>
            <span className="text-foreground">Tata Raisina Residency</span>
          </nav>
          <div className="mt-6 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Golf Course Extension Road · Sector 59</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Tata Raisina Residency, Sector 59 Gurgaon</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
              A buyer-first project and resale guide for Tata Raisina Residency, connecting stable project context with genuine Shubh Estate Brokers inventory whenever a unit is currently published.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold"><a href="#current-inventory">Check Current Inventory</a></Button>
              <Button asChild variant="goldOutline"><Link to="/property-sector-59-gurgaon">Explore Sector 59</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Location", "Sector 59, Gurgaon"],
            ["Corridor", "Golf Course Extension Road"],
            ["Project setting", "Approx. 12 acres"],
            ["Towers", "9"],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-border px-5 py-5 sm:border-r lg:border-b-0 last:border-r-0">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
              <p className="mt-1 font-display text-xl">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
        <main className="space-y-12">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Project overview</p>
            <h2 className="mt-2 font-display text-3xl">What buyers should know about Tata Raisina Residency</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Tata Raisina Residency is an established Tata-branded residential community in Sector 59 near the Aravalli foothills. Public developer information describes an approximately 12-acre setting with 9 residential towers and large-format luxury residences. For a resale buyer, however, project reputation is only the starting point: the exact tower, floor, orientation, view, apartment condition and commercial terms can materially change value.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                [Building2, "Established community", "Evaluate the actual tower, common areas, maintenance and resident environment rather than only brochure positioning."],
                [MapPin, "Sector 59 location", "Compare daily access, peak-hour commute and proximity to Golf Course Extension Road based on your own routine."],
                [ShieldCheck, "Unit-level diligence", "Check title, dues, parking, fit-out condition, lender valuation and transfer requirements for the exact apartment."],
              ].map(([Icon, heading, text]) => {
                const Component = Icon as typeof Building2;
                return (
                  <div key={heading as string} className="rounded-xl border border-border bg-card p-5">
                    <Component className="size-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl">{heading as string}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="current-inventory" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Current inventory</p>
            <h2 className="mt-2 font-display text-3xl">Published Tata Raisina Residency properties</h2>
            {listings.length ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {listings.map((listing) => (
                  <article key={listing.id} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="font-display text-xl leading-snug">{listing.title}</h3>
                    <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      <p><strong className="text-foreground">Config:</strong> {listing.bhk || "Unit-specific"}</p>
                      <p><strong className="text-foreground">Area:</strong> {listing.area_sqft ? formatArea(listing.area_sqft) : "Confirm"}</p>
                      <p><strong className="text-foreground">Floor:</strong> {listing.floor || "Confirm"}</p>
                      <p><strong className="text-foreground">Facing:</strong> {listing.facing || "Confirm"}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                      <p className="font-display text-lg">{listing.price ? formatINR(listing.price) : listing.display_price || "Price on request"}</p>
                      <Button asChild size="sm" variant="goldOutline"><a href={listing.href}>View property</a></Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-border bg-card p-6">
                <p className="font-medium">No Tata Raisina Residency unit is being represented as live inventory on this page right now.</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  We are keeping the project guide live without inventing availability. Ask us to reconfirm owner inventory before planning a visit.
                </p>
              </div>
            )}
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Resale checks</p>
            <h2 className="mt-2 font-display text-3xl">Compare the exact residence, not only the project name</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Inspect the actual tower, floor, orientation, daylight and view.",
                "Estimate renovation or fit-out cost before comparing headline prices.",
                "Confirm parking rights, society dues and transfer requirements.",
                "Review ownership documents and lender valuation before a large token payment.",
                "Compare asking price with competing units and realistic transaction evidence.",
                "For financed purchases, begin eligibility and property checks early enough to avoid deadline pressure.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl surface-navy p-7">
            <p className="eyebrow">Continue your research</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <Link to="/property-sector-59-gurgaon" className="text-gold hover:underline">Sector 59 Gurgaon guide</Link>
              <Link to="/locations/$slug" params={{ slug: "golf-course-extension-road" }} className="text-gold hover:underline">Golf Course Extension Road</Link>
              <Link to="/projects" className="text-gold hover:underline">All Gurgaon project guides</Link>
              <Link to="/flats-for-sale-in-gurgaon" className="text-gold hover:underline">Current Gurgaon properties</Link>
            </div>
          </section>
        </main>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Tata Raisina Residency enquiry</p>
          <p className="mt-2 font-display text-2xl">Check current options</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Share your budget, preferred configuration and whether the purchase is for end use or investment.</p>
          <div className="mt-5"><EnquiryForm interest="Tata Raisina Residency Sector 59" compact /></div>
        </aside>
      </section>
    </>
  );
}
