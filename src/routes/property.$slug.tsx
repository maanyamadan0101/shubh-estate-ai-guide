import { createFileRoute, notFound } from "@tanstack/react-router";
import { PropertyView } from "@/components/site/PropertyView";
import { ProjectImageDisclosure } from "@/components/site/ProjectImageDisclosure";
import { getPublicPropertyDetail } from "@/lib/public-property-detail.functions";
import { listPublicProperties } from "@/lib/properties.functions";
import { representativeProjectImageFor } from "@/lib/project-image-catalog";
import { buildCanonical, formatArea, formatINR, PROPERTY_TYPE_LABEL, SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/property/$slug")({
  loader: async ({ params }) => {
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
    const title =
      p.meta_title ||
      `${p.bhk ?? ""} ${PROPERTY_TYPE_LABEL[p.property_type] ?? "Property"} in ${p.sector ?? p.city}`;
    const description =
      p.meta_description ||
      `${p.title} — ${formatArea(p.area_sqft)} at ${formatINR(p.price)} in ${[p.sector, p.locality, p.city].filter(Boolean).join(", ")}.`;
    const canonical = p.canonical_url || buildCanonical(params.slug);
    const fallback = representativeProjectImageFor(p.title);
    const image = p.cover_image_url?.startsWith("http")
      ? p.cover_image_url
      : p.cover_image_url
        ? `${SITE_ORIGIN}${p.cover_image_url}`
        : (fallback?.url ?? null);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Residence",
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
        { property: "og:title", content: p.og_title || title },
        { property: "og:description", content: p.og_description || description },
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
