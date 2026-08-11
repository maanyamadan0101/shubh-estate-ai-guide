import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarClock,
  FileCheck2,
  Landmark,
  PlayCircle,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { ListingCard } from "@/components/site/ListingCard";
import { PageHero, SectionHead } from "@/components/site/SectionHead";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/site";
import { listPublicProperties, type ListingRow } from "@/lib/properties.functions";
import { SITE_ORIGIN } from "@/lib/seo";

const REVIEW_POINTS = [
  {
    icon: ShieldCheck,
    title: "RERA and approval position",
    body: "Check the applicable registration, disclosed plans, approvals and project-specific conditions before paying a token.",
  },
  {
    icon: CalendarClock,
    title: "Construction and possession risk",
    body: "Compare the disclosed timeline with current progress, payment milestones and the buyer's own holding capacity.",
  },
  {
    icon: Scale,
    title: "Developer and agreement review",
    body: "Study the developer track record, allotment terms, cancellation clauses and buyer obligations with qualified legal support.",
  },
  {
    icon: Landmark,
    title: "Loan and payment-plan fit",
    body: "Review bank acceptance, cash-flow timing, pre-EMI exposure and the complete cost rather than only the headline price.",
  },
  {
    icon: TrendingUp,
    title: "Supply and exit assumptions",
    body: "Test future competing supply, rental depth, resale demand and whether today's premium already prices in the expected growth.",
  },
  {
    icon: FileCheck2,
    title: "Claims against official disclosures",
    body: "Treat brochures and videos as marketing context. Current RERA disclosures and transaction documents should govern the decision.",
  },
] as const;

export const Route = createFileRoute("/under-construction-projects-gurgaon")({
  loader: async () =>
    listPublicProperties({
      data: { limit: 60, statuses: ["under_construction", "new_launch"] },
    }),
  head: ({ loaderData }) => {
    const canonical = `${SITE_ORIGIN}/under-construction-projects-gurgaon`;
    const title = "Under-Construction & New Launch Projects in Gurgaon";
    const description =
      "Explore current under-construction and new-launch Gurgaon property inventory with project videos where available, RERA context, financing and due-diligence support.";
    const properties = loaderData?.properties ?? [];

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Under-construction and new-launch properties in Gurgaon",
            numberOfItems: properties.length,
            itemListElement: properties.map((property, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: property.title,
              url: `${SITE_ORIGIN}/property/${property.slug}`,
            })),
          }),
        },
      ],
    };
  },
  component: UnderConstructionProjects,
});

function UnderConstructionProjects() {
  const { properties, error } = Route.useLoaderData() as {
    properties: ListingRow[];
    error: string | null;
  };
  const whatsappMessage = encodeURIComponent(
    "Hi Shubh Estate Brokers, I want to compare new-launch and under-construction projects in Gurgaon. Please arrange a consultation.",
  );

  return (
    <>
      <PageHero
        eyebrow="New Launches & Construction-Stage Opportunities"
        title="Under-construction projects in Gurgaon, evaluated beyond the brochure"
        body="Browse currently published inventory and compare developer, RERA, construction stage, payment plan, financing, supply and exit risk before shortlisting."
      />

      <section className="container-page py-12 md:py-16">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-gold/30 bg-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                <PlayCircle className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Official videos and walkthroughs</p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl">
                  View the project remotely before planning a visit
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Project pages can include videos embedded from an official developer or authorised
                  public channel, plus original Shubh Estate Brokers walkthroughs. Open a listing to
                  view available videos and always verify current specifications against official
                  disclosures.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl surface-navy p-6 md:p-8">
            <Building2 className="size-6 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl">Need a comparison shortlist?</h2>
            <p className="mt-3 text-sm leading-6 text-navy-foreground/70">
              Share your budget, preferred corridor, timeline and end-use or investment objective.
            </p>
            <Button asChild variant="gold" className="mt-5 w-full">
              <a
                href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                Request project comparison
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 md:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow="Current project inventory"
            title="New launches and under-construction homes"
            body="Availability, price, construction stage and offers can change. Confirm the exact unit and documents before visiting or paying any amount."
          />
          <Link
            to="/properties"
            search={{ status: "under_construction" }}
            className="text-sm font-medium text-gold hover:underline"
          >
            Open full catalogue
          </Link>
        </div>

        {error ? (
          <div className="mt-10 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="font-medium">Current project inventory could not be loaded.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please use the full property catalogue or contact the advisory team for the current
              shortlist.
            </p>
          </div>
        ) : properties.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.slice(0, 12).map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
            <h2 className="font-display text-2xl">Ask for the current new-project shortlist</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              New project inventory is being updated. The team can share live options by budget and
              corridor.
            </p>
            <Button asChild variant="gold" className="mt-5">
              <Link to="/contact">Request a callback</Link>
            </Button>
          </div>
        )}
      </section>

      <section className="bg-secondary/60 py-16 md:py-20">
        <div className="container-page">
          <SectionHead
            eyebrow="Before booking"
            title="Six checks that matter more than launch-day urgency"
            body="A new project should work as a property, a financial commitment and a future resale or rental asset."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEW_POINTS.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-6">
                <Icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-muted-foreground">
            Project names, logos, brochures and developer videos remain the property of their
            respective owners. Embedded public videos remain hosted by the original publisher.
            Visuals are illustrative unless a listing explicitly identifies an actual-unit image or
            Shubh Estate Brokers walkthrough. Verify current Haryana RERA disclosures, approvals,
            plans, specifications, price and possession before booking.
          </p>
        </div>
      </section>
    </>
  );
}
