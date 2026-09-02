import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { PropertyView } from "@/components/site/PropertyView";
import { ProjectExperience } from "@/components/site/ProjectExperience";
import { ProjectImageDisclosure } from "@/components/site/ProjectImageDisclosure";
import { DWARKA_CATALOGUE_LISTINGS } from "@/data/dwarka-catalogue-listings";
import { projectIdentityFor } from "@/lib/project-hubs";
import { getPublicPropertyDetail } from "@/lib/public-property-detail.functions";
import { listPublicProperties } from "@/lib/properties.functions";
import { representativeProjectImageFor } from "@/lib/project-image-catalog";
import {
  buildCanonical,
  buildMetaDescription,
  buildSeoTitle,
  compactSeoTitle,
  listingReference,
  PROPERTY_TYPE_LABEL,
  SITE_ORIGIN,
  stripInternalListingReference,
  wordSafeText,
} from "@/lib/seo";

const DEDICATED_PROJECT_GUIDES: Record<string, string> = {
  "dlf-skycourt": "/dlf-skycourt-sector-86-gurgaon",
  "dlf-skycourt-sector-86": "/dlf-skycourt-sector-86-gurgaon",
  "godrej-101": "/godrej-101-sector-79-gurgaon",
  "godrej-101-sector-79": "/godrej-101-sector-79-gurgaon",
};

function storedDescriptionLooksUsable(value: string | null | undefined) {
  if (!value?.trim()) return false;
  const compact = value.trim();
  if (compact.length >= 150 && !/[.!?…]$/.test(compact)) return false;
  return true;
}

export const Route = createFileRoute("/property/$slug")({
  loader: async ({ params }) => {
    const curatedListing = DWARKA_CATALOGUE_LISTINGS.find((item) => item.slug === params.slug);
    if (curatedListing) {
      throw redirect({ href: curatedListing.detail_href, statusCode: 301 });
    }

    const data = await getPublicPropertyDetail({ data: { slug: params.slug } });
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
      data: { locality: data.property.locality ?? undefined, limit: 4, excludeSlug: params.slug },
    });
    let related = localRelated.properties;

    if (related.length < 3) {
      const catalogueRelated = await listPublicProperties({
        data: { limit: 6, excludeSlug: params.slug },
      });
      related = [...related, ...catalogueRelated.properties].filter(
        (item, index, rows) => rows.findIndex((candidate) => candidate.id === item.id) === index,
      );
    }

    return { ...data, images, fallbackProjectImage, related };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Property unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.property;
    const listingRef = listingReference(String(p.id));
    const seoSource = {
      title: p.title,
      bhk: p.bhk,
      propertyType: p.property_type,
      listingType: p.listing_type,
      projectName: p.project?.name ?? null,
      builderName: p.builder?.name ?? null,
      sector: p.project?.sector ?? p.sector,
      locality: p.project?.locality ?? p.locality,
      city: p.city,
      price: p.price,
      areaSqft: p.area_sqft,
      floorNumber: p.floor_number,
      facing: p.facing,
      description: p.description,
    };

    const generatedTitle = buildSeoTitle(seoSource);
    const storedTitle = p.meta_title ? stripInternalListingReference(p.meta_title) : "";
    const title = p.project?.name
      ? generatedTitle
      : storedTitle
        ? compactSeoTitle(storedTitle)
        : generatedTitle;

    const generatedDescription = buildMetaDescription(seoSource);
    const storedDescription = storedDescriptionLooksUsable(p.meta_description)
      ? stripInternalListingReference(p.meta_description!)
      : "";
    const description = storedDescription
      ? wordSafeText(storedDescription, 158)
      : generatedDescription;
    const ogDescription = storedDescriptionLooksUsable(p.og_description)
      ? wordSafeText(stripInternalListingReference(p.og_description!), 158)
      : description;
    const ogTitle = p.og_title
      ? compactSeoTitle(stripInternalListingReference(p.og_title))
      : title;

    const canonical = buildCanonical(params.slug);
    const fallback = representativeProjectImageFor(p.title);
    const image = p.cover_image_url?.startsWith("http")
      ? p.cover_image_url
      : p.cover_image_url
        ? `${SITE_ORIGIN}${p.cover_image_url}`
        : (fallback?.url ?? null);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Residence",
      "@id": `${canonical}#property`,
      identifier: listingRef,
      name: p.title,
      description,
      url: canonical,
      ...(image ? { image } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: [p.sector, p.locality].filter(Boolean).join(", "),
        addressLocality: p.city,
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      ...(p.area_sqft
        ? { floorSize: { "@type": "QuantitativeValue", value: p.area_sqft, unitCode: "FTK" } }
        : {}),
      ...(p.bathrooms ? { numberOfBathroomsTotal: p.bathrooms } : {}),
      ...(p.bhk ? { numberOfRooms: Number.parseFloat(p.bhk) || undefined } : {}),
      ...(p.floor_number !== null && p.floor_number !== undefined
        ? { floorLevel: String(p.floor_number) }
        : {}),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
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
              url: canonical,
            },
          }
        : {}),
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: ogDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
    };
  },
  component: PropertyPage,
  errorComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">This property didn't load</h1>
      <p className="mt-2 text-muted-foreground">Please refresh, or browse all properties.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl">Property not found</h1>
      <p className="mt-2 text-muted-foreground">
        It may have been sold or withdrawn from the market.
      </p>
    </div>
  ),
});

function PropertyPage() {
  const data = Route.useLoaderData();
  const projectIdentity = projectIdentityFor({
    title: data.property.title,
    sector: data.property.project?.sector ?? data.property.sector,
    project: data.property.project
      ? { name: data.property.project.name, slug: data.property.project.slug }
      : null,
  });
  const projectGuideHref = projectIdentity
    ? DEDICATED_PROJECT_GUIDES[projectIdentity.slug] ?? `/projects/${projectIdentity.slug}`
    : null;

  return (
    <>
      <ProjectImageDisclosure coverImageUrl={data.property.cover_image_url} images={data.images} />
      {projectIdentity && projectGuideHref ? (
        <section className="container-page pt-6">
          <div className="flex flex-col gap-4 rounded-xl border border-gold/30 bg-gold/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <Building2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Project guide & current inventory
                </p>
                <p className="mt-1 font-display text-xl">{projectIdentity.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Compare this unit with other published options, size and asking-price context before shortlisting.
                </p>
              </div>
            </div>
            <a
              href={projectGuideHref}
              className="shrink-0 text-sm font-semibold text-gold underline-offset-4 hover:underline"
            >
              View {projectIdentity.name} guide
            </a>
          </div>
        </section>
      ) : null}
      <PropertyView
        data={{
          property: data.property,
          images: data.images,
          amenities: data.amenities,
          features: data.features,
          videos: data.videos,
        }}
        related={data.related}
      />
      <section className="container-page pb-16">
        <ProjectExperience
          title={data.property.title}
          project={data.property.project}
          sector={data.property.project?.sector ?? data.property.sector}
          locality={data.property.project?.locality ?? data.property.locality}
        />
      </section>
    </>
  );
}
