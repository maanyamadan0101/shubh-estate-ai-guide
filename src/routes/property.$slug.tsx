import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { Building2, Landmark, MapPin } from "lucide-react";
import { PropertyView } from "@/components/site/PropertyView";
import { ProjectExperience } from "@/components/site/ProjectExperience";
import { ProjectImageDisclosure } from "@/components/site/ProjectImageDisclosure";
import { DWARKA_CATALOGUE_LISTINGS } from "@/data/dwarka-catalogue-listings";
import { corridorPath, projectGuideHref, projectIdentityFor } from "@/lib/project-hubs";
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

function storedDescriptionLooksUsable(value: string | null | undefined) {
  if (!value?.trim()) return false;
  const compact = value.trim();
  if (compact.length >= 150 && !/[.!?…]$/.test(compact)) return false;
  return true;
}

function corridorLabel(path: string) {
  const labels: Record<string, string> = {
    "/locations/dwarka-expressway": "Dwarka Expressway",
    "/locations/golf-course-extension-road": "Golf Course Extension Road",
    "/locations/golf-course-road": "Golf Course Road",
    "/locations/southern-peripheral-road": "Southern Peripheral Road (SPR)",
    "/locations/sohna-road": "Sohna Road",
    "/locations/new-gurgaon": "New Gurgaon",
    "/locations/gurgaon": "Gurgaon property guide",
  };
  return labels[path] ?? "Gurgaon property guide";
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
    const identity = projectIdentityFor({
      title: p.title,
      sector: p.project?.sector ?? p.sector,
      project: p.project ? { name: p.project.name, slug: p.project.slug } : null,
    });
    const guideHref = projectGuideHref(identity);
    const projectCanonical = guideHref ? `${SITE_ORIGIN}${guideHref}` : null;

    const residenceSchema = {
      "@context": "https://schema.org",
      "@type": p.property_type === "apartment" ? "Apartment" : "Residence",
      "@id": `${canonical}#property`,
      identifier: listingRef,
      name: p.title,
      description,
      url: canonical,
      ...(image ? { image } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: [p.project?.name, p.sector, p.locality].filter(Boolean).join(", "),
        addressLocality: p.city,
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      ...(p.area_sqft
        ? { floorSize: { "@type": "QuantitativeValue", value: p.area_sqft, unitCode: "FTK", unitText: "square feet" } }
        : {}),
      ...(p.bathrooms ? { numberOfBathroomsTotal: p.bathrooms } : {}),
      ...(p.bhk ? { numberOfRooms: Number.parseFloat(p.bhk) || undefined } : {}),
      ...(p.floor_number !== null && p.floor_number !== undefined
        ? { floorLevel: String(p.floor_number) }
        : {}),
      ...(identity
        ? {
            isPartOf: {
              "@type": "ApartmentComplex",
              name: identity.name,
              ...(projectCanonical ? { url: projectCanonical } : {}),
            },
          }
        : {}),
      mainEntityOfPage: { "@type": "WebPage", "@id": `${canonical}#webpage` },
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

    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
      {
        "@type": "ListItem",
        position: 2,
        name: p.listing_type === "rent" ? "Gurgaon Properties" : "Flats for Sale in Gurgaon",
        item: `${SITE_ORIGIN}/flats-for-sale-in-gurgaon`,
      },
      ...(identity && projectCanonical
        ? [{ "@type": "ListItem", position: 3, name: identity.name, item: projectCanonical }]
        : []),
      {
        "@type": "ListItem",
        position: identity && projectCanonical ? 4 : 3,
        name: p.title,
        item: canonical,
      },
    ];

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      mainEntity: { "@id": `${canonical}#property` },
      ...(p.updated_at ? { dateModified: new Date(p.updated_at).toISOString() } : {}),
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: ogDescription },
        { property: "og:type", content: "product" },
        { property: "og:url", content: canonical },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ogTitle },
        { name: "twitter:description", content: ogDescription },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(residenceSchema) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems,
          }),
        },
        { type: "application/ld+json", children: JSON.stringify(webPageSchema) },
      ],
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
  const projectGuideHrefValue = projectGuideHref(projectIdentity);
  const corridorHref = corridorPath(data.property.project?.locality ?? data.property.locality);
  const locationName = corridorLabel(corridorHref);
  const statusHref =
    data.property.status === "ready_to_move"
      ? "/ready-to-move-flats-in-gurgaon"
      : data.property.status === "under_construction"
        ? "/under-construction-projects-gurgaon"
        : null;
  const statusLabel =
    data.property.status === "ready_to_move"
      ? "Ready-to-move flats in Gurgaon"
      : data.property.status === "under_construction"
        ? "Under-construction projects in Gurgaon"
        : null;
  const updated = data.property.updated_at
    ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(data.property.updated_at),
      )
    : null;

  return (
    <>
      <ProjectImageDisclosure coverImageUrl={data.property.cover_image_url} images={data.images} />
      {projectIdentity && projectGuideHrefValue ? (
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
                  Compare this exact unit with project information, other published inventory and location context before shortlisting.
                </p>
              </div>
            </div>
            <a
              href={projectGuideHrefValue}
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
      <section className="container-page pb-10">
        <ProjectExperience
          title={data.property.title}
          project={data.property.project}
          sector={data.property.project?.sector ?? data.property.sector}
          locality={data.property.project?.locality ?? data.property.locality}
        />
      </section>

      <section className="border-y border-border bg-muted/25">
        <div className="container-page py-10">
          <div className="flex items-start gap-3">
            <Landmark className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Related property research</p>
              <h2 className="mt-2 font-display text-2xl">Continue from this listing to the right project and location pages</h2>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
                Internal links below connect the individual apartment to its project, corridor, Gurgaon inventory and financing resources. This makes it easier for buyers to compare the exact unit in context instead of viewing an isolated listing.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                {projectIdentity && projectGuideHrefValue ? (
                  <a href={projectGuideHrefValue} className="font-semibold text-gold underline-offset-4 hover:underline">
                    {projectIdentity.name} project guide
                  </a>
                ) : null}
                <Link to={corridorHref} className="font-semibold text-gold underline-offset-4 hover:underline">
                  <MapPin className="mr-1 inline size-3.5" aria-hidden="true" />
                  {locationName}
                </Link>
                {statusHref && statusLabel ? (
                  <a href={statusHref} className="font-semibold text-gold underline-offset-4 hover:underline">
                    {statusLabel}
                  </a>
                ) : null}
                <Link to="/flats-for-sale-in-gurgaon" className="font-semibold text-gold underline-offset-4 hover:underline">
                  Flats for sale in Gurgaon
                </Link>
                <Link to="/home-loans" className="font-semibold text-gold underline-offset-4 hover:underline">
                  Home-loan assistance
                </Link>
                <Link to="/property-buying-advisory-gurgaon" className="font-semibold text-gold underline-offset-4 hover:underline">
                  Gurgaon buyer advisory
                </Link>
              </div>
              {updated ? (
                <p className="mt-5 text-xs text-muted-foreground">Listing information last updated {updated}. Current price and availability should be reconfirmed at enquiry.</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
