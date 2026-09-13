import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Building2, MapPin, ShieldCheck } from "lucide-react";
import { ProjectExperience } from "@/components/site/ProjectExperience";
import { ProjectImageDisclosure } from "@/components/site/ProjectImageDisclosure";
import { PropertyView } from "@/components/site/PropertyView";
import { listPublicProperties } from "@/lib/properties.functions";
import { getPublicPropertyDetail } from "@/lib/public-property-detail.functions";
import { representativeProjectImageFor } from "@/lib/project-image-catalog";
import { SITE_ORIGIN } from "@/lib/seo";

const SOURCE_SLUG = "3-bhk-servant-room-emaar-mgf-palm-hills-apartment-sector-77-gurugram";
const CANONICAL_PATH = "/emaar-palm-hills-sector-77-gurgaon-flats-for-sale";
const CANONICAL_URL = `${SITE_ORIGIN}${CANONICAL_PATH}`;
const SEO_TITLE = "Emaar Palm Hills Sector 77 Gurgaon Flats for Sale";
const SEO_DESCRIPTION =
  "Explore flats for sale in Emaar Palm Hills, Sector 77 Gurgaon. View current 3 BHK inventory, asking price, specifications, photos and buyer assistance.";

export const Route = createFileRoute("/emaar-palm-hills-sector-77-gurgaon-flats-for-sale")({
  loader: async () => {
    const data = await getPublicPropertyDetail({ data: { slug: SOURCE_SLUG } });
    if (!data) throw notFound();

    const fallbackProjectImage =
      data.images.length || data.property.cover_image_url
        ? null
        : representativeProjectImageFor(data.property.title);
    const images = fallbackProjectImage
      ? [
          {
            id: "licensed-project-fallback",
            image_url: fallbackProjectImage.url,
            alt_text: fallbackProjectImage.altText,
            is_primary: true,
          },
        ]
      : data.images;

    const localRelated = await listPublicProperties({
      data: {
        locality: data.property.locality ?? undefined,
        limit: 4,
        excludeSlug: SOURCE_SLUG,
      },
    });
    let related = localRelated.properties;

    if (related.length < 3) {
      const catalogueRelated = await listPublicProperties({
        data: { limit: 6, excludeSlug: SOURCE_SLUG },
      });
      related = [...related, ...catalogueRelated.properties].filter(
        (item, index, rows) => rows.findIndex((candidate) => candidate.id === item.id) === index,
      );
    }

    return { ...data, images, fallbackProjectImage, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Emaar Palm Hills property unavailable" }, { name: "robots", content: "noindex" }],
      };
    }

    const p = loaderData.property;
    const fallback = representativeProjectImageFor(p.title);
    const image = p.cover_image_url?.startsWith("http")
      ? p.cover_image_url
      : p.cover_image_url
        ? `${SITE_ORIGIN}${p.cover_image_url}`
        : (fallback?.url ?? null);

    const apartmentSchema = {
      "@context": "https://schema.org",
      "@type": p.property_type === "apartment" ? "Apartment" : "Residence",
      "@id": `${CANONICAL_URL}#property`,
      name: "Emaar Palm Hills Sector 77 Gurgaon",
      description: SEO_DESCRIPTION,
      url: CANONICAL_URL,
      ...(image ? { image } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: "Emaar Palm Hills, Sector 77",
        addressLocality: "Gurgaon",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      ...(p.area_sqft
        ? {
            floorSize: {
              "@type": "QuantitativeValue",
              value: p.area_sqft,
              unitCode: "FTK",
              unitText: "square feet",
            },
          }
        : {}),
      ...(p.bathrooms ? { numberOfBathroomsTotal: p.bathrooms } : {}),
      ...(p.bhk ? { numberOfRooms: Number.parseFloat(p.bhk) || undefined } : {}),
      ...(p.price
        ? {
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "INR",
              availability:
                p.status === "sold_out"
                  ? "https://schema.org/SoldOut"
                  : "https://schema.org/InStock",
              url: CANONICAL_URL,
            },
          }
        : {}),
      mainEntityOfPage: { "@type": "WebPage", "@id": `${CANONICAL_URL}#webpage` },
    };

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL_URL}#webpage`,
      url: CANONICAL_URL,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      mainEntity: { "@id": `${CANONICAL_URL}#property` },
      ...(p.updated_at ? { dateModified: new Date(p.updated_at).toISOString() } : {}),
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        {
          "@type": "ListItem",
          position: 2,
          name: "Flats for Sale in Gurgaon",
          item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Emaar Palm Hills Sector 77 Gurgaon",
          item: CANONICAL_URL,
        },
      ],
    };

    return {
      meta: [
        { title: SEO_TITLE },
        { name: "description", content: SEO_DESCRIPTION },
        {
          name: "robots",
          content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
        },
        { property: "og:title", content: SEO_TITLE },
        { property: "og:description", content: SEO_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: CANONICAL_URL },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SEO_TITLE },
        { name: "twitter:description", content: SEO_DESCRIPTION },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: CANONICAL_URL }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(apartmentSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
        { type: "application/ld+json", children: JSON.stringify(webPageSchema) },
      ],
    };
  },
  component: PalmHillsPage,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Emaar Palm Hills inventory unavailable</h1>
      <p className="mt-2 text-muted-foreground">Please browse current Gurgaon properties.</p>
    </div>
  ),
});

function PalmHillsPage() {
  const data = Route.useLoaderData();
  const updated = data.property.updated_at
    ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(data.property.updated_at),
      )
    : null;

  const propertyForPage = {
    ...data.property,
    title: "Emaar Palm Hills Sector 77 Gurgaon Flats for Sale",
  };

  return (
    <>
      <ProjectImageDisclosure coverImageUrl={data.property.cover_image_url} images={data.images} />

      <section className="container-page pt-6">
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-5 md:p-6">
          <div className="flex gap-3">
            <Building2 className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Emaar Palm Hills resale & buyer advisory
              </p>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
                Looking to buy a flat in Emaar Palm Hills, Sector 77 Gurgaon? Review the currently
                published apartment below, compare specifications and asking price, and contact
                Shubh Estate Brokers for current resale availability, site visits, documentation
                checks and home-loan assistance.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link
                  to="/flats-for-sale-in-gurgaon"
                  className="font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Flats for sale in Gurgaon
                </Link>
                <Link
                  to="/ready-to-move-flats-in-gurgaon"
                  className="font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Ready-to-move flats in Gurgaon
                </Link>
                <Link
                  to="/property-buying-advisory-gurgaon"
                  className="font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Buyer advisory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PropertyView
        data={{
          property: propertyForPage,
          images: data.images,
          amenities: data.amenities,
          features: data.features,
          videos: data.videos,
        }}
        related={data.related}
      />

      <section className="container-page pb-10">
        <ProjectExperience
          title="Emaar MGF Palm Hills"
          project={data.property.project}
          sector={data.property.project?.sector ?? data.property.sector}
          locality={data.property.project?.locality ?? data.property.locality}
        />
      </section>

      <section className="border-y border-border bg-muted/25">
        <div className="container-page py-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Buying in Emaar Palm Hills
              </p>
              <h2 className="mt-2 font-display text-2xl">
                Sector 77 Gurgaon resale guidance from one permanent project URL
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
                This page is the permanent Shubh Estate Brokers URL for Emaar Palm Hills sale
                inventory. Published apartments can change over time, while this page remains the
                main search and comparison destination for buyers researching Emaar Palm Hills,
                Sector 77 Gurgaon.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <Link
                  to="/property-sector-79-gurgaon"
                  className="font-semibold text-gold underline-offset-4 hover:underline"
                >
                  <MapPin className="mr-1 inline size-3.5" aria-hidden="true" />
                  New Gurgaon property options
                </Link>
                <Link
                  to="/home-loans"
                  className="font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Home-loan assistance
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <ShieldCheck className="size-5 text-gold" aria-hidden="true" />
              <p className="mt-3 font-semibold">Current information</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Price and availability are based on published inventory and should be reconfirmed
                before a site visit or offer.
              </p>
              {updated ? (
                <p className="mt-3 text-xs text-muted-foreground">Last updated {updated}.</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
