import { Link } from "@tanstack/react-router";
import { BedDouble, Building2, Landmark, MapPin, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatArea, formatINR, PROPERTY_TYPE_LABEL, STATUS_LABEL } from "@/lib/seo";
import { representativeProjectImageFor } from "@/lib/project-image-catalog";
import { vercelSrcSet } from "@/lib/image-optimization";
import type { ListingRow } from "@/lib/properties.functions";

type CatalogueCardRow = Omit<ListingRow, "status" | "price"> & {
  status: string | null;
  price: number | null;
  display_price?: string;
  detail_href?: string;
  floor?: string | null;
  facing?: string | null;
};

export function ListingCard({ property }: { property: CatalogueCardRow }) {
  const place = [property.sector, property.locality].filter(Boolean).join(", ");
  const fallbackProjectImage = property.cover_image_url
    ? null
    : representativeProjectImageFor(property.title);
  const visualUrl = property.cover_image_url || fallbackProjectImage?.url || null;
  const representativeImage = Boolean(
    fallbackProjectImage ||
    property.cover_image_url?.startsWith("https://") ||
    property.cover_image_url?.startsWith("http://"),
  );
  const forSale = property.listing_type !== "rent";
  const responsiveSrcSet = visualUrl ? vercelSrcSet(visualUrl, [320, 480, 640, 768]) : undefined;
  const statusLabel = property.status ? STATUS_LABEL[property.status] : null;
  const priceLabel = property.display_price ?? formatINR(property.price);

  const visual = (
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      {visualUrl ? (
        <img
          src={visualUrl}
          srcSet={responsiveSrcSet}
          alt={
            fallbackProjectImage?.altText ??
            `${property.bhk ?? ""} ${PROPERTY_TYPE_LABEL[property.property_type] ?? "Property"} in ${place || property.city}`.trim()
          }
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center bg-navy px-6 text-center text-navy-foreground">
          <div className="flex size-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
            <Building2 className="size-6" aria-hidden="true" />
          </div>
          <p className="mt-4 font-display text-lg leading-snug">{property.title}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-navy-foreground/65">
            Project photo on request
          </p>
        </div>
      )}
      {statusLabel ? (
        <Badge className="absolute left-3 top-3 bg-gold text-gold-foreground hover:bg-gold">
          {statusLabel}
        </Badge>
      ) : null}
      {representativeImage ? (
        <Badge
          variant="secondary"
          className="absolute bottom-3 left-3 bg-background/90 text-[10px] font-medium uppercase tracking-[0.12em] backdrop-blur"
        >
          Project image
        </Badge>
      ) : !visualUrl ? (
        <Badge
          variant="secondary"
          className="absolute bottom-3 left-3 bg-background/90 text-[10px] font-medium uppercase tracking-[0.12em] backdrop-blur"
        >
          Photo on request
        </Badge>
      ) : null}
    </div>
  );

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      {property.detail_href ? (
        <a href={property.detail_href} className="block">
          {visual}
        </a>
      ) : (
        <Link to="/property/$slug" params={{ slug: property.slug }} className="block">
          {visual}
        </Link>
      )}

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {PROPERTY_TYPE_LABEL[property.property_type] ?? "Property"} ·{" "}
            {property.listing_type === "rent" ? "For Rent" : "For Sale"}
          </p>
          <h3 className="mt-1 font-display text-xl">
            {property.detail_href ? (
              <a href={property.detail_href} className="hover:text-gold">
                {property.title}
              </a>
            ) : (
              <Link to="/property/$slug" params={{ slug: property.slug }} className="hover:text-gold">
                {property.title}
              </Link>
            )}
          </h3>
          {place ? (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 text-gold" aria-hidden="true" />
              {place}
            </p>
          ) : null}
        </div>

        <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {property.bhk ? (
            <div className="flex items-center gap-1.5">
              <BedDouble className="size-4 text-gold" aria-hidden="true" />
              <dt className="sr-only">Configuration</dt>
              <dd>{property.bhk}</dd>
            </div>
          ) : null}
          {property.area_sqft ? (
            <div className="flex items-center gap-1.5">
              <Maximize className="size-4 text-gold" aria-hidden="true" />
              <dt className="sr-only">Area</dt>
              <dd>{formatArea(property.area_sqft)}</dd>
            </div>
          ) : null}
        </dl>

        {forSale ? (
          <div className="rounded-lg border border-gold/25 bg-gold/5 px-3 py-2.5">
            <p className="flex items-center gap-2 text-xs font-medium text-foreground">
              <Landmark className="size-4 shrink-0 text-gold" aria-hidden="true" />
              Home-loan assistance available*
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="font-display text-2xl">{priceLabel}</p>
          {property.detail_href ? (
            <a
              href={property.detail_href}
              className="text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
              View details
            </a>
          ) : (
            <Link
              to="/property/$slug"
              params={{ slug: property.slug }}
              className="text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
              View details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
