import { Link } from "@tanstack/react-router";
import {
  BedDouble,
  Building2,
  CalendarCheck,
  CalendarClock,
  Landmark,
  MapPin,
  Maximize,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { formatArea, formatINR, PROPERTY_TYPE_LABEL, STATUS_LABEL } from "@/lib/seo";
import { representativeProjectImageFor } from "@/lib/project-image-catalog";
import { vercelSrcSet } from "@/lib/image-optimization";
import type { ListingRow } from "@/lib/properties.functions";

const LISTING_DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatAvailabilityDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : LISTING_DATE_FORMATTER.format(date);
}

type CatalogueCardRow = Omit<ListingRow, "status" | "price"> & {
  status: string | null;
  price: number | null;
  display_price?: string;
  detail_href?: string;
  floor?: string | null;
  facing?: string | null;
};

export function ListingCard({
  property,
  showContactActions = false,
}: {
  property: CatalogueCardRow;
  showContactActions?: boolean;
}) {
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
  const availabilityDate = formatAvailabilityDate(property.updated_at);
  const displayArea = property.carpet_area_sqft ?? property.area_sqft;
  const floorLabel = property.floor
    ? property.floor
    : property.floor_number != null
      ? `${property.floor_number}${property.total_floors ? ` of ${property.total_floors}` : ""} floor`
      : null;
  const whatsappMessage = encodeURIComponent(
    `Hi Shubh Estate Brokers, please reconfirm the current price and availability for ${property.title}.`,
  );

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
              <Link
                to="/property/$slug"
                params={{ slug: property.slug }}
                className="hover:text-gold"
              >
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
          {displayArea ? (
            <div className="flex items-center gap-1.5">
              <Maximize className="size-4 text-gold" aria-hidden="true" />
              <dt className="sr-only">Area and basis</dt>
              <dd>
                {formatArea(displayArea)} ·{" "}
                {property.carpet_area_sqft ? "carpet area" : "area basis to confirm"}
              </dd>
            </div>
          ) : null}
          {floorLabel ? <div>Floor: {floorLabel}</div> : null}
          {property.facing ? <div>Facing: {property.facing}</div> : null}
          {property.furnishing ? <div>Furnishing: {property.furnishing}</div> : null}
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
        {availabilityDate ? (
          <p className="flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
            <CalendarClock className="size-3.5 text-gold" aria-hidden="true" />
            Listing updated {availabilityDate}; reconfirm before visiting
          </p>
        ) : null}
        {showContactActions ? (
          <div className="grid grid-cols-2 gap-2 border-t border-border pt-4">
            <a
              href={`${CONTACT.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackContact("whatsapp", "gurgaon_inventory_card", {
                  property_slug: property.slug,
                })
              }
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gold/50 px-3 text-sm font-medium text-gold hover:bg-gold/5"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={`/contact?interest=${encodeURIComponent(`Site visit — ${property.title}`)}`}
              onClick={() =>
                trackContact("site_visit", "gurgaon_inventory_card", {
                  property_slug: property.slug,
                })
              }
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <CalendarCheck className="size-4 text-gold" aria-hidden="true" />
              Site visit
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
