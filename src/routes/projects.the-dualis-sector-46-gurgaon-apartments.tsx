import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE_ORIGIN } from "@/lib/seo";
import { trackContact, trackEvent } from "@/lib/analytics";

const PATH = "/projects/the-dualis-sector-46-gurgaon-apartments";
const ASSETS = "/projects/the-dualis";
const title = "The Dualis Sector 46 Gurgaon | 3 & 4 BHK Luxury Apartments";
const description =
  "Explore The Dualis by Shapoorji Pallonji in Sector 46 Gurgaon. View the project video, sizes and brochure. Enquiries from USA, Canada, Europe and Australia.";
const faqs = [
  [
    "Where is The Dualis located?",
    "The Dualis is in Jal Vihar, Sector 46, Gurugram, Haryana. The central Gurgaon location connects with Sohna Road and established healthcare, schools and business districts.",
  ],
  [
    "What apartment sizes are being marketed?",
    "The supplied sales brief lists 3 BHK + utility at 2,852–3,010 sq ft and 4 BHK + utility at 3,519–3,605 sq ft. These are marketing-area figures, not verified carpet areas. Request the unit-specific area statement and sanctioned floor plan before comparing prices.",
  ],
  [
    "Can I enquire from the USA, Canada, Europe or Australia?",
    "Yes. Share your country, time zone, preferred configuration and budget with Shubh Estate Brokers. Request a video consultation, current inventory, floor plans and a written cost sheet. Purchase eligibility and transaction documentation must be assessed for the individual buyer.",
  ],
  [
    "What is the current price?",
    "Request a dated, unit-specific quotation showing base price, applicable taxes, parking, maintenance deposits and other charges. Availability, floor premiums and commercial terms can change.",
  ],
  [
    "Is The Dualis ready for possession?",
    "The developer describes the project as under construction. The project film and brochure include artist impressions. Confirm the current construction stage and contractual possession schedule before booking.",
  ],
  [
    "What is the HARERA registration number?",
    "The published project registration is RC/REP/HARERA/GGM/939/671/2025/42. Review current disclosures on the Haryana RERA website.",
  ],
];
const amenities = [
  "Swimming pool & Jacuzzi",
  "Gym and fitness spaces",
  "Yoga & aerobics deck",
  "Spa, steam & sauna",
  "Salon",
  "Badminton & pickleball courts",
  "Golf simulator & indoor games",
  "Reading lounge & library",
  "Kids’ play areas",
  "Banquet & multipurpose spaces",
  "Pet park & landscaped walkways",
  "Double-height entrance lobby",
];
export const Route = createFileRoute("/projects/the-dualis-sector-46-gurgaon-apartments")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${SITE_ORIGIN}${PATH}` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_ORIGIN}${ASSETS}/project-exterior.webp` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_ORIGIN}${PATH}#webpage`,
              url: `${SITE_ORIGIN}${PATH}`,
              name: title,
              description,
              inLanguage: "en",
              dateModified: "2026-10-03",
              about: {
                "@type": "ApartmentComplex",
                name: "The Dualis",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Jal Vihar, Sector 46",
                  addressLocality: "Gurugram",
                  addressRegion: "Haryana",
                  postalCode: "122022",
                  addressCountry: "IN",
                },
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Projects in Gurgaon",
                  item: `${SITE_ORIGIN}/projects-in-gurgaon`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "The Dualis",
                  item: `${SITE_ORIGIN}${PATH}`,
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: DualisPage,
});
function DualisPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="container-page py-4 text-sm">
        <a href="/">Home</a> / <a href="/projects-in-gurgaon">Projects in Gurgaon</a> / The Dualis
      </nav>
      <section className="surface-navy">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-2 items-center">
          <div>
            <p className="eyebrow">Shapoorji Pallonji · Sector 46, Gurugram</p>
            <h1 className="mt-4 font-display text-5xl">The Dualis</h1>
            <p className="mt-4 text-2xl text-gold">
              A home in Gurgaon. A connection that spans the world.
            </p>
            <p className="mt-5 leading-7">
              Explore 3 &amp; 4 BHK luxury apartments for sale in Sector 46, Gurgaon. Twin-tower
              living, generous decks and spaces for wellness, leisure and everyday connection.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                className="rounded-md bg-gold px-5 py-3 text-navy font-semibold"
                href="#enquire"
                onClick={() => trackContact("site_visit", "dualis_hero")}
              >
                Request price &amp; video consultation
              </a>
              <a
                className="rounded-md border border-gold px-5 py-3"
                href={`${ASSETS}/the-dualis-brochure.pdf`}
                download
                onClick={() =>
                  trackEvent("download_project_brochure", {
                    project: "The Dualis",
                    page_path: PATH,
                  })
                }
              >
                Download brochure
              </a>
            </div>
            <p className="mt-5 text-sm">HARERA: RC/REP/HARERA/GGM/939/671/2025/42</p>
          </div>
          <figure>
            <img
              src={`${ASSETS}/project-exterior.webp`}
              alt="The Dualis twin towers in Sector 46 Gurgaon, artist impression from the supplied brochure"
              width="1584"
              height="898"
              fetchPriority="high"
              className="rounded-xl w-full"
            />
            <figcaption className="mt-2 text-sm">
              Artist’s impression. Project under construction.
            </figcaption>
          </figure>
        </div>
      </section>
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-3xl">Space to make Gurgaon your home</h2>
            <p className="mt-4 leading-7">
              The Dualis brings together a central address and a residential setting with room to
              unwind. The supplied project brief describes 198 residences across two towers,
              including a dedicated tower for 4 BHK homes. The brochure highlights wrap-around
              decks, selected 4 BHK homes with three-sided views, a 3.45-metre floor-to-floor height
              and smart-home features.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left">
                <caption className="text-left mb-3 text-sm">
                  Sizes from the supplied sales brief
                </caption>
                <thead>
                  <tr className="border-b">
                    <th className="p-3">Configuration</th>
                    <th className="p-3">Marketed size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">3 BHK + utility</td>
                    <td className="p-3">2,852–3,010 sq ft</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">4 BHK + utility</td>
                    <td className="p-3">3,519–3,605 sq ft</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Area basis requires unit-specific confirmation; these figures are not presented as
              carpet areas. Compare the carpet area, balcony area and total marketed area
              separately. Current price and availability on request.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">Watch the project film</h2>
            <video
              controls
              playsInline
              preload="none"
              poster={`${ASSETS}/project-exterior.webp`}
              className="mt-5 w-full rounded-xl"
              aria-label="The Dualis project walkthrough"
            >
              <source src={`${ASSETS}/the-dualis-project-video.mp4`} type="video/mp4" />
            </video>
            <p className="mt-3 text-sm text-muted-foreground">
              Supplied promotional film; visualisations and furnishings are illustrative.{" "}
              <a
                className="underline"
                href="https://youtu.be/Jq3gozsFvkM"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch the supplied YouTube video
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">Wellness, recreation and time together</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {amenities.map((a) => (
                <li key={a} className="rounded-lg border border-border p-4">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Amenities are described in project marketing materials. Delivery, access, operating
              arrangements and charges are subject to the final project specifications.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">An established central Gurgaon location</h2>
            <p className="mt-4 leading-7">
              Sector 46 places you near Medanta, established schools and the business districts
              around Sectors 32 and 44. Sohna Road and NH48 connect with wider Gurgaon, while
              Millennium City Centre Metro offers a public transport option. Consider your own
              office, school and airport routes when shortlisting.
            </p>
            <p className="mt-4 leading-7">
              The supplied brochure identifies Manav Rachna and Amity International schools, Taj
              City Centre and an upcoming IKEA development among nearby landmarks. Proposed
              infrastructure is not an operating amenity; travel times depend on traffic and route.
            </p>
            <a
              className="mt-4 inline-block text-gold underline"
              href="https://maps.app.goo.gl/yfDbjs9BTSuqPseHA?g_st=awb"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the supplied project location
            </a>
          </section>
          <section className="rounded-xl bg-card border border-gold/30 p-6">
            <h2 className="font-display text-3xl">Explore your Gurgaon home from overseas</h2>
            <p className="mt-4 leading-7">
              Living in the USA, Canada, the UK or elsewhere in Europe, or Australia? Start with a
              conversation about how you plan to use your home: returning to India, keeping family
              close, or purchasing a long-term residence. Shubh Estate Brokers can coordinate
              project information and help you compare the exact apartment, layout and total cost.
            </p>
            <ol className="mt-5 list-decimal pl-5 space-y-3">
              <li>Share your country, time zone, budget and preferred 3 or 4 BHK configuration.</li>
              <li>Request a video consultation, available-unit list and floor plans.</li>
              <li>Review a written cost sheet, payment milestones and possession terms.</li>
              <li>
                Coordinate documentation review, financing enquiries and a visit by you or your
                representative.
              </li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              Buyer eligibility, financing and documentation depend on personal circumstances and
              applicable requirements. No rental return, appreciation or loan approval is promised.
            </p>
            <a href="/nri-sell-property-gurgaon" className="mt-4 inline-block text-gold underline">
              Explore our overseas property assistance
            </a>
          </section>
          <section>
            <h2 className="font-display text-3xl">Questions about The Dualis</h2>
            <div className="mt-5 space-y-3">
              {faqs.map(([q, a]) => (
                <details key={q} className="rounded-lg border p-4">
                  <summary className="cursor-pointer font-semibold">{q}</summary>
                  <p className="mt-3 leading-7">{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="text-sm text-muted-foreground leading-6">
            <h2 className="font-display text-xl text-foreground">
              Project information &amp; sources
            </h2>
            <p className="mt-3">
              Prepared from the supplied project presentation, sales brief and{" "}
              <a
                className="underline"
                href="https://shapoorjirealestate.com/residential/the-dualis/"
                target="_blank"
                rel="noopener noreferrer"
              >
                developer’s project page
              </a>
              . Reviewed 3 October 2026. Verify current disclosures with{" "}
              <a
                className="underline"
                href="https://haryanarera.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Haryana RERA
              </a>
              . Shubh Estate Brokers is the property adviser presenting this page, not the
              developer. The downloadable PDF is an optimised copy of the complete supplied
              presentation; introductory pages also feature other projects.
            </p>
          </section>
        </div>
        <aside
          id="enquire"
          className="scroll-mt-24 lg:sticky lg:top-28 lg:self-start rounded-xl border border-border bg-card p-6"
        >
          <h2 className="font-display text-2xl">Find your home at The Dualis</h2>
          <p className="mt-3 mb-5 text-sm leading-6">
            Ask for the brochure, current unit options and a written price quote. Overseas buyers:
            include your country and preferred callback time in your message.
          </p>
          <EnquiryForm
            interest="The Dualis Sector 46 — price and overseas video consultation"
            compact
          />
          <a
            className="mt-5 block text-gold underline"
            href="https://wa.me/919911050561?text=Hello%2C%20please%20share%20The%20Dualis%20Sector%2046%20brochure%2C%20current%20prices%20and%20video%20consultation%20options."
            onClick={() => trackContact("whatsapp", "dualis_enquiry")}
          >
            WhatsApp Shubh Estate Brokers
          </a>
          <a className="mt-3 block" href="tel:+919911050561">
            Call +91 99110 50561
          </a>
        </aside>
      </div>
    </>
  );
}
