import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, FileCheck2, Landmark, Video } from "lucide-react";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { LOAN_DISCLAIMER } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

const STEPS = [
  {
    icon: Video,
    title: "Shortlist remotely",
    body: "Live video walkthroughs of every shortlisted unit, with honest commentary on light, layout and neighbouring construction.",
  },
  {
    icon: FileCheck2,
    title: "Title and approval checks",
    body: "Title assessment, RERA verification, sanctioned plan review and encumbrance checks completed before any payment.",
  },
  {
    icon: Landmark,
    title: "NRI home loan and banking",
    body: "NRE/NRO account guidance and NRI home loan arrangement with leading Indian lenders, coordinated end to end.",
  },
  {
    icon: Globe2,
    title: "Power of attorney and closing",
    body: "POA drafting guidance, registration coordination and repatriation-compliant documentation for future resale.",
  },
];

const FAQS = [
  {
    q: "Can an NRI buy residential property in India?",
    a: "Yes. An NRI or OCI cardholder may purchase residential and commercial property in India under RBI's general permission. Agricultural land, plantations and farmhouses cannot be purchased, only inherited.",
  },
  {
    q: "How is payment made from abroad?",
    a: "Payments must be routed through normal banking channels using an NRE, NRO or FCNR account. Cash and travellers' cheques are not permitted for property purchase.",
  },
  {
    q: "Is a physical visit required?",
    a: "No. A registered power of attorney granted to a trusted representative in India allows the transaction to be completed without travel. We coordinate the drafting and attestation process with your legal advisor.",
  },
  {
    q: "Can sale proceeds be repatriated later?",
    a: "Repatriation is permitted subject to RBI conditions, including limits on the number of residential properties and evidence that the purchase was funded through permissible channels. Keeping clean records from day one is essential.",
  },
];

export const Route = createFileRoute("/nri")({
  loader: async () => {
    const { properties } = await listPublicProperties({ data: { limit: 6 } });
    return { properties };
  },
  head: () => ({
    meta: [
      { title: "NRI Property Investment in Gurgaon | Shubh Estate Brokers" },
      {
        name: "description",
        content:
          "End-to-end property buying support for NRIs in Gurugram: remote shortlisting, title and RERA checks, NRI home loans, POA guidance and repatriation-compliant documentation.",
      },
      { property: "og:title", content: "NRI Property Investment in Gurgaon" },
      {
        property: "og:description",
        content: "Buy property in Gurugram from anywhere in the world, with verified title checks and NRI loan support.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_ORIGIN}/nri` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/nri` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: NriPage,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">This page didn't load</h1>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Page not found</h1>
    </div>
  ),
});

function NriPage() {
  const { properties } = Route.useLoaderData() as { properties: ListingRow[] };

  return (
    <>
      <PageHero
        eyebrow="NRI Desk"
        title="Buying property in Gurugram from overseas"
        body="A single point of accountability across shortlisting, due diligence, financing and registration — designed for buyers in the Gulf, UK, US, Singapore and Australia."
      />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="font-display text-2xl">How the process works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {STEPS.map((step) => (
              <div key={step.title} className="rounded-xl border border-border bg-card p-6">
                <step.icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl">NRI questions we're asked most</h2>
          <dl className="mt-6 space-y-5">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-card p-6">
                <dt className="font-medium">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-xs text-muted-foreground">{LOAN_DISCLAIMER}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Explore <Link to="/luxury" className="text-gold underline-offset-4 hover:underline">the private collection</Link>{" "}
            or read the{" "}
            <Link to="/locations/$slug" params={{ slug: "gurgaon" }} className="text-gold underline-offset-4 hover:underline">
              Gurgaon location guide
            </Link>
            .
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl">Talk to the NRI desk</h2>
          <p className="mt-1 text-xs text-muted-foreground">Share your timezone — we'll call at a convenient hour.</p>
          <div className="mt-4">
            <EnquiryForm interest="NRI enquiry" compact />
          </div>
        </aside>
      </section>

      {properties.length ? (
        <section className="container-page pb-16">
          <h2 className="font-display text-2xl">Currently recommended for NRI buyers</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
