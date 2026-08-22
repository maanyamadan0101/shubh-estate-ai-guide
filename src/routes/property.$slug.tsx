import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PropertyView } from "@/components/site/PropertyView";
import { ProjectImageDisclosure } from "@/components/site/ProjectImageDisclosure";
import { DWARKA_CATALOGUE_LISTINGS } from "@/data/dwarka-catalogue-listings";
import { getPublicPropertyDetail } from "@/lib/public-property-detail.functions";
import { listPublicProperties } from "@/lib/properties.functions";
import { representativeProjectImageFor } from "@/lib/project-image-catalog";
import { buildCanonical, formatArea, formatINR, PROPERTY_TYPE_LABEL, SITE_ORIGIN } from "@/lib/seo";

function wordSafeMetaDescription(value: string, maxLength = 158) {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) return compact;

  const candidate = compact.slice(0, maxLength - 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const safe = lastSpace > 100 ? candidate.slice(0, lastSpace) : candidate;
  return `${safe.replace(/[,:;\-–—]+$/g, "")}…`;
}

function storedDescriptionLooksUsable(value: string | null | undefined) {
  if (!value?.trim()) return false;
  const compact = value.trim();

  // Imported descriptions that were previously cut at a fixed character count
  // often end mid-word (for example "Shubh Estate B"). Prefer a fresh,
  // sentence-complete description in that case rather than exposing the broken
  // text to search engines and social previews.
  if (compact.length >= 150 && !/[.!?…]$/.test(compact)) return false;
  return true;
}

function listingReference(id: string) {
  const compact = id.replace(/-/g, "").toUpperCase();
  return `SEB-${compact.slice(0, 8)}`;
}

function titleWithListingReference(base: string, reference: string, maxLength = 70) {
  const compact = base.replace(/\s+/g, " ").trim();
  const suffix = ` | ${reference}`;
  if (`${compact}${suffix}`.length <= maxLength) return `${compact}${suffix}`;

  const available = Math.max(20, maxLength - suffix.length);
  const candidate = compact.slice(0, available);
  const lastSpace = candidate.lastIndexOf(" ");
  const safe = lastSpace > 20 ? candidate.slice(0, lastSpace) : candidate;
  return `${safe.replace(/[,:;\-–—|]+$/g, "").trim()}${suffix}`;
}

function descriptionWithListingReference(base: string, reference: string, maxLength = 158) {
  const compact = base.replace(/\s+/g, " ").trim();
  const suffix = ` Ref ${reference}.`;
  if (`${compact}${suffix}`.length <= maxLength) return `${compact}${suffix}`;

  const available = Math.max(90, maxLength - suffix.length);
  const candidate = compact.slice(0, available);
  const lastSpace = candidate.lastIndexOf(" ");
  const safe = lastSpace > 80 ? candidate.slice(0, lastSpace) : candidate;
  return `${safe.replace(/[,:;\-–—.]+$/g, "").trim()}.${suffix}`.replace("..", ".");
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

    // Keep every live listing connected to the wider catalogue, even when it
    // is the only published property in its micro-market.
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
    const typeLabel = PROPERTY_TYPE_LABEL[p.property_type] ?? "Property";
    const listingRef = listingReference(String(p.id));
    const titleBase = p.meta_title || `${p.bhk ?? ""} ${typeLabel} in ${p.sector ?? p.city}`;
    const title = titleWithListingReference(titleBase, listingRef);
    const listingIntent = p.listing_type === "rent" ? "for rent" : "for sale";
    const locationLabel = [p.sector, p.city].filter(Boolean).join(", ");
    const generatedDescription = wordSafeMetaDescription(
      [
        p.bhk ? `${p.bhk} ${typeLabel}` : typeLabel,
        listingIntent,
        p.title ? `at ${p.title}` : null,
        locationLabel ? `in ${locationLabel}` : null,
        p.area_sqft ? formatArea(p.area_sqft) : null,
        p.floor_number !== null && p.floor_number !== undefined ? `floor ${p.floor_number}` : null,
        p.facing ? `${p.facing} facing` : null,
        p.price ? formatINR(p.price) : null,
      ]
        .filter(Boolean)
        .join(" · ") +
        ". View photos, specifications, home-loan assistance and current availability.",
    );
    const descriptionBase = storedDescriptionLooksUsable(p.meta_description)
      ? wordSafeMetaDescription(p.meta_description!)
      : generatedDescription;
    const description = descriptionWithListingReference(descriptionBase, listingRef);
    const ogDescription = storedDescriptionLooksUsable(p.og_description)
      ? descriptionWithListingReference(wordSafeMetaDescription(p.og_description!), listingRef)
      : description;

    // Property detail pages are the canonical URL for their own listing.
    // Keeping this aligned with the sitemap avoids conflicting canonical signals
    // from stale or manually-entered database values.
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
        { property: "og:title", content: titleWithListingReference(p.og_title || titleBase, listingRef) },
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
  return (
    <>
      <ProjectImageDisclosure coverImageUrl={data.property.cover_image_url} images={data.images} />
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
    </>
  );
}
