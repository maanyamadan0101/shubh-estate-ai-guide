import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Compass,
  Car,
  Layers,
  Landmark,
  MapPin,
  Phone,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Sofa,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ListingCard } from "@/components/site/ListingCard";
import { CONTACT } from "@/data/site";
import { trackContact } from "@/lib/analytics";
import { formatArea, formatINR, PROPERTY_TYPE_LABEL, STATUS_LABEL } from "@/lib/seo";
import type { ListingRow } from "@/lib/properties.functions";

export type PropertyRecord = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  property_type: string;
  status: string;
  listing_type: string;
  bhk: string | null;
  bathrooms: number | null;
  balconies: number | null;
  area_sqft: number | null;
  carpet_area_sqft: number | null;
  price: number;
  furnishing: string | null;
  facing: string | null;
  floor_number: number | null;
  total_floors: number | null;
  parking?: number | null;
  servant_room?: boolean | null;
  study_room?: boolean | null;
  sector: string | null;
  locality: string | null;
  city: string;
  rera_number: string | null;
  cover_image_url: string | null;
  is_luxury?: boolean | null;
  meta_title?: string | null;
  meta_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  canonical_url?: string | null;
  updated_at?: string;
  builder?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    website: string | null;
  } | null;
  project?: {
    id: string;
    name: string;
    slug: string;
    locality: string | null;
    sector: string | null;
    rera_number: string | null;
    possession_date: string | null;
    description: string | null;
  } | null;
};

export type PropertyViewData = {
  property: PropertyRecord;
  images: Array<{ id: string; image_url: string; alt_text: string | null; is_primary: boolean }>;
  amenities: string[];
  features: string[];
  videos?: string[];
};

function youtubeEmbed(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id =
        parsed.searchParams.get("v") ??
        (parsed.pathname.startsWith("/shorts/") ? parsed.pathname.split("/")[2] : null);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function PropertyView({
  data,
  related = [],
  isPreview = false,
}: {
  data: PropertyViewData;
  related?: ListingRow[];
  isPreview?: boolean;
}) {
  const { property, images, amenities, features, videos = [] } = data;
  const [active, setActive] = useState(0);
  const gallery = images.length
    ? images
    : property.cover_image_url
      ? [
          {
            id: "cover",
            image_url: property.cover_image_url,
            alt_text: property.title,
            is_primary: true,
          },
        ]
      : [];

  const place = [property.sector, property.locality, property.city].filter(Boolean).join(", ");
  const mapQuery = encodeURIComponent(`${property.project?.name ?? property.title}, ${place}`);
  const whatsappText = encodeURIComponent(
    `Hi Shubh Estate Brokers, I am interested in ${property.title} (${place}). Please share current availability and arrange a call.`,
  );
  const forSale = property.listing_type !== "rent";

  const specs = [
    property.bhk ? { icon: Building2, label: "Configuration", value: property.bhk } : null,
    { icon: Ruler, label: "Built-up area", value: formatArea(property.area_sqft) },
    property.carpet_area_sqft
      ? { icon: Ruler, label: "Carpet area", value: formatArea(property.carpet_area_sqft) }
      : null,
    property.bathrooms
      ? { icon: Building2, label: "Bathrooms", value: String(property.bathrooms) }
      : null,
    property.balconies
      ? { icon: Building2, label: "Balconies", value: String(property.balconies) }
      : null,
    property.floor_number
      ? {
          icon: Layers,
          label: "Floor",
          value: `${property.floor_number}${property.total_floors ? ` of ${property.total_floors}` : ""}`,
        }
      : null,
    property.facing ? { icon: Compass, label: "Facing", value: property.facing } : null,
    property.furnishing ? { icon: Sofa, label: "Furnishing", value: property.furnishing } : null,
    property.parking
      ? {
          icon: Car,
          label: "Parking",
          value: `${property.parking} space${property.parking > 1 ? "s" : ""}`,
        }
      : null,
    property.servant_room ? { icon: Building2, label: "Servant room", value: "Yes" } : null,
    property.study_room ? { icon: Building2, label: "Study room", value: "Yes" } : null,
    {
      icon: ShieldCheck,
      label: "Possession",
      value: STATUS_LABEL[property.status] ?? property.status,
    },
    property.rera_number ? { icon: ShieldCheck, label: "RERA", value: property.rera_number } : null,
  ].filter(Boolean) as Array<{ icon: typeof Building2; label: string; value: string }>;

  return (
    <>
      {isPreview ? (
        <div className="bg-gold/15 py-2 text-center text-xs uppercase tracking-[0.2em] text-foreground">
          Preview — not visible to the public
        </div>
      ) : null}

      <section className="container-page pt-8">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link to="/properties" className="hover:text-foreground">
            Properties
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{property.title}</span>
        </nav>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-gold text-gold-foreground hover:bg-gold">
                {STATUS_LABEL[property.status]}
              </Badge>
              <Badge variant="secondary" className="font-normal">
                {PROPERTY_TYPE_LABEL[property.property_type] ?? "Property"} ·{" "}
                {property.listing_type === "rent" ? "For Rent" : "For Sale"}
              </Badge>
              {forSale ? (
                <Badge variant="secondary" className="font-normal">
                  Home loan up to 90%*
                </Badge>
              ) : null}
              {property.is_luxury ? (
                <Badge variant="secondary" className="font-normal">
                  Private Collection
                </Badge>
              ) : null}
            </div>
            <h1 className="mt-3 font-display text-3xl md:text-4xl">{property.title}</h1>
            {place ? (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-gold" aria-hidden="true" />
                {place}
              </p>
            ) : null}
          </div>
          <p className="font-display text-3xl md:text-4xl">{formatINR(property.price)}</p>
        </div>
      </section>

      {gallery.length ? (
        <section className="container-page mt-6">
          <div className="overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={gallery[active]!.image_url}
              alt={gallery[active]!.alt_text ?? property.title}
              className="aspect-[16/10] w-full object-cover"
              width={1600}
              height={1000}
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 1280px) 1216px, calc(100vw - 2rem)"
            />
          </div>
          {gallery.length > 1 ? (
            <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {gallery.map((image, i) => (
                <li key={image.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show photo ${i + 1}`}
                    className={`overflow-hidden rounded-md border-2 transition-colors ${i === active ? "border-gold" : "border-transparent"}`}
                  >
                    <img
                      src={image.image_url}
                      alt={image.alt_text ?? ""}
                      loading="lazy"
                      decoding="async"
                      width={80}
                      height={80}
                      className="size-20 object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {videos.length ? (
        <section className="container-page mt-8">
          <h2 className="font-display text-2xl">Property videos</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {videos.map((url, index) => {
              const embed = youtubeEmbed(url);
              return (
                <div
                  key={`${url}-${index}`}
                  className="overflow-hidden rounded-xl border border-border bg-black"
                >
                  {embed ? (
                    <iframe
                      title={`${property.title} video ${index + 1}`}
                      src={embed}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="aspect-video w-full border-0"
                    />
                  ) : (
                    <video
                      src={url}
                      controls
                      preload="metadata"
                      className="aspect-video w-full object-contain"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-2xl">Specifications</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {specs.map((spec) => (
                <div key={spec.label} className="rounded-lg border border-border bg-card p-4">
                  <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    <spec.icon className="size-3.5 text-gold" aria-hidden="true" />
                    {spec.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {property.description ? (
            <div>
              <h2 className="font-display text-2xl">About this property</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                {String(property.description)
                  .split(/\n{1,}/)
                  .filter((p: string) => p.trim())
                  .map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
            </div>
          ) : null}

          {features.length ? (
            <div>
              <h2 className="font-display text-2xl">Features</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {features.map((f) => (
                  <li key={f}>
                    <Badge variant="secondary" className="font-normal">
                      {f}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {amenities.length ? (
            <div>
              <h2 className="font-display text-2xl">Amenities</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="size-4 text-gold" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {property.project || property.builder ? (
            <div>
              <h2 className="font-display text-2xl">Project & developer</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {property.project ? (
                  <div className="rounded-lg border border-border bg-card p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Project
                    </p>
                    <p className="mt-1 font-display text-xl">{property.project.name}</p>
                    {property.project.description ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {property.project.description}
                      </p>
                    ) : null}
                    {property.project.rera_number ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        RERA: {property.project.rera_number}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                {property.builder ? (
                  <div className="rounded-lg border border-border bg-card p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Developer
                    </p>
                    <p className="mt-1 font-display text-xl">{property.builder.name}</p>
                    {property.builder.description ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {property.builder.description}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          <div>
            <h2 className="font-display text-2xl">Location</h2>
            <p className="mt-2 text-sm text-muted-foreground">{place}</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <iframe
                title={`Map of ${property.title}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0"
              />
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="font-display text-2xl">{formatINR(property.price)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatArea(property.area_sqft)}
              {property.bhk ? ` · ${property.bhk}` : ""}
            </p>

            {forSale ? (
              <div className="mt-4 rounded-lg border border-gold/30 bg-gold/5 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Landmark className="size-4 text-gold" aria-hidden="true" />
                  Home loan up to 90%*
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Subject to buyer eligibility, lender approval and property/document verification.
                </p>
                <Link
                  to="/home-loans"
                  className="mt-2 inline-block text-xs font-medium text-gold underline-offset-4 hover:underline"
                >
                  Check home-loan assistance
                </Link>
              </div>
            ) : null}

            <div className="mt-5 grid gap-2">
              <Button asChild variant="gold">
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => trackContact("phone", "property_detail")}
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call an advisor
                </a>
              </Button>
              <Button asChild variant="goldOutline">
                <a
                  href={`${CONTACT.whatsapp}?text=${whatsappText}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackContact("whatsapp", "property_detail")}
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="font-display text-lg">Request a private viewing</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Discreet, appointment-only visits for serious buyers and NRI clients.
              </p>
              <div className="mt-4">
                <EnquiryForm
                  propertyId={property.id}
                  interest={`Private viewing — ${property.title}`}
                  compact
                />
              </div>
            </div>
            <div className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
              Buying from overseas?{" "}
              <Link to="/nri" className="font-medium text-gold underline-offset-4 hover:underline">
                View NRI property assistance
              </Link>{" "}
              for remote review and transaction coordination.
            </div>
          </div>
        </aside>
      </section>

      {related.length ? (
        <section className="container-page pb-16">
          <h2 className="font-display text-2xl">Similar properties</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((item) => (
              <ListingCard key={item.id} property={item} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
