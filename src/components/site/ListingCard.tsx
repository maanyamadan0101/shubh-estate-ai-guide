import { Link } from "@tanstack/react-router";
import { BedDouble, MapPin, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatArea, formatINR, PROPERTY_TYPE_LABEL, STATUS_LABEL } from "@/lib/seo";
import type { ListingRow } from "@/lib/properties.functions";

export function ListingCard({ property }: { property: ListingRow }) {
  const place = [property.sector, property.locality].filter(Boolean).join(", ");
  const representativeImage = Boolean(property.cover_image_url?.startsWith("https://") || property.cover_image_url?.startsWith("http://"));

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link to="/property/$slug" params={{ slug: property.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {property.cover_image_url ? (
            <img
              src={property.cover_image_url}
              alt={`${property.bhk ?? ""} ${PROPERTY_TYPE_LABEL[property.property_type] ?? "Property"} in ${place || property.city}`.trim()}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Photos on request
            </div>
          )}
          <Badge className="absolute left-3 top-3 bg-gold text-gold-foreground hover:bg-gold">
            {STATUS_LABEL[property.status]}
          </Badge>
          {representativeImage ? (
            <Badge variant="secondary" className="absolute bottom-3 left-3 bg-background/90 text-[10px] font-medium uppercase tracking-[0.12em] backdrop-blur">
              Project image
            </Badge>
          ) : null}
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {PROPERTY_TYPE_LABEL[property.property_type] ?? "Property"} · {property.listing_type === "rent" ? "For Rent" : "For Sale"}
          </p>
          <h3 className="mt-1 font-display text-xl">
            <Link to="/property/$slug" params={{ slug: property.slug }} className="hover:text-gold">
              {property.title}
            </Link>
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
          <div className="flex items-center gap-1.5">
            <Maximize className="size-4 text-gold" aria-hidden="true" />
            <dt className="sr-only">Area</dt>
            <dd>{formatArea(property.area_sqft)}</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="font-display text-2xl">{formatINR(property.price)}</p>
          <Link
            to="/property/$slug"
            params={{ slug: property.slug }}
            className="text-sm font-medium text-gold underline-offset-4 hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
