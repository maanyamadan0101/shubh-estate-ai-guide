import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ImageManager, type ManagedImage } from "@/components/admin/ImageManager";
import { generateDescription, savePropertyDraft } from "@/lib/admin.functions";
import {
  buildCanonical,
  buildImageAlt,
  buildMetaDescription,
  buildOgTitle,
  buildSeoTitle,
  buildSlug,
  PROPERTY_TYPE_LABEL,
  type SeoSource,
} from "@/lib/seo";

const AMENITY_PRESETS = [
  "Swimming Pool",
  "Clubhouse",
  "Gymnasium",
  "24x7 Security",
  "Power Backup",
  "Landscaped Gardens",
  "Kids Play Area",
  "Concierge",
  "Spa & Sauna",
  "Indoor Games",
  "Jogging Track",
  "EV Charging",
];

const FEATURE_PRESETS = [
  "Modular Kitchen",
  "Private Lift Lobby",
  "Wooden Flooring",
  "VRV Air Conditioning",
  "Piped Gas",
  "Corner Unit",
  "Golf Course View",
  "Vaastu Compliant",
  "Home Automation",
  "Wide Sun Deck",
];

export type PropertyFormValues = {
  id: string | null;
  title: string;
  slug: string;
  listing_type: "sale" | "rent";
  property_type: keyof typeof PROPERTY_TYPE_LABEL;
  status: "ready_to_move" | "under_construction" | "new_launch" | "sold_out";
  bhk: string;
  project_id: string | null;
  builder_id: string | null;
  sector: string;
  locality: string;
  city: string;
  price: string;
  area_sqft: string;
  carpet_area_sqft: string;
  bathrooms: string;
  balconies: string;
  floor_number: string;
  total_floors: string;
  facing: string;
  furnishing: string;
  parking: string;
  servant_room: boolean;
  study_room: boolean;
  rera_number: string;
  description: string;
  is_published: boolean;
  is_featured: boolean;
  is_luxury: boolean;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  canonical_url: string;
  amenities: string[];
  features: string[];
  images: ManagedImage[];
};

export const EMPTY_PROPERTY: PropertyFormValues = {
  id: null,
  title: "",
  slug: "",
  listing_type: "sale",
  property_type: "apartment",
  status: "ready_to_move",
  bhk: "3 BHK",
  project_id: null,
  builder_id: null,
  sector: "",
  locality: "",
  city: "Gurugram",
  price: "",
  area_sqft: "",
  carpet_area_sqft: "",
  bathrooms: "",
  balconies: "",
  floor_number: "",
  total_floors: "",
  facing: "",
  furnishing: "Unfurnished",
  parking: "1",
  servant_room: false,
  study_room: false,
  rera_number: "",
  description: "",
  is_published: false,
  is_featured: false,
  is_luxury: false,
  meta_title: "",
  meta_description: "",
  og_title: "",
  og_description: "",
  canonical_url: "",
  amenities: [],
  features: [],
  images: [],
};

const STEPS = ["Basics", "Details", "Photos", "Description", "SEO & Publish"];

function num(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function PropertyForm({
  initial,
  builders,
  projects,
}: {
  initial: PropertyFormValues;
  builders: Array<{ id: string; name: string }>;
  projects: Array<{ id: string; name: string; builder_id: string | null }>;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<PropertyFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();
  const save = useServerFn(savePropertyDraft);
  const askAi = useServerFn(generateDescription);

  const set = <K extends keyof PropertyFormValues>(key: K, value: PropertyFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const projectName = projects.find((p) => p.id === values.project_id)?.name ?? null;
  const builderName = builders.find((b) => b.id === values.builder_id)?.name ?? null;

  const seoSource: SeoSource = useMemo(
    () => ({
      title: values.title,
      bhk: values.bhk,
      propertyType: values.property_type,
      listingType: values.listing_type,
      projectName,
      builderName,
      sector: values.sector,
      locality: values.locality,
      city: values.city,
      price: num(values.price),
      areaSqft: num(values.area_sqft),
      description: values.description,
    }),
    [values, projectName, builderName],
  );

  function autoFillSeo(force = false) {
    setValues((prev) => {
      const slug = prev.slug && !force ? prev.slug : buildSlug(seoSource);
      return {
        ...prev,
        slug,
        meta_title: force || !prev.meta_title ? buildSeoTitle(seoSource) : prev.meta_title,
        meta_description:
          force || !prev.meta_description ? buildMetaDescription(seoSource) : prev.meta_description,
        og_title: force || !prev.og_title ? buildOgTitle(seoSource) : prev.og_title,
        og_description:
          force || !prev.og_description ? buildMetaDescription(seoSource) : prev.og_description,
        canonical_url: force || !prev.canonical_url ? buildCanonical(slug) : prev.canonical_url,
        images: prev.images.map((img, i) => ({
          ...img,
          alt_text: force || !img.alt_text ? buildImageAlt(seoSource, i) : img.alt_text,
        })),
      };
    });
  }

  async function runAi() {
    setAiLoading(true);
    const prompt = [
      `Property: ${values.title}`,
      projectName ? `Project: ${projectName}` : null,
      builderName ? `Builder: ${builderName}` : null,
      `Type: ${PROPERTY_TYPE_LABEL[values.property_type]} for ${values.listing_type}`,
      values.bhk ? `Configuration: ${values.bhk}` : null,
      `Location: ${[values.sector, values.locality, values.city].filter(Boolean).join(", ")}`,
      values.price ? `Price: INR ${values.price}` : null,
      values.area_sqft ? `Built-up area: ${values.area_sqft} sq.ft.` : null,
      values.carpet_area_sqft ? `Carpet area: ${values.carpet_area_sqft} sq.ft.` : null,
      values.bathrooms ? `Bathrooms: ${values.bathrooms}` : null,
      values.balconies ? `Balconies: ${values.balconies}` : null,
      values.floor_number ? `Floor: ${values.floor_number} of ${values.total_floors || "?"}` : null,
      values.facing ? `Facing: ${values.facing}` : null,
      values.furnishing ? `Furnishing: ${values.furnishing}` : null,
      values.parking ? `Parking: ${values.parking}` : null,
      values.servant_room ? "Has servant room" : null,
      values.study_room ? "Has study room" : null,
      values.rera_number ? `RERA: ${values.rera_number}` : null,
      values.amenities.length ? `Amenities: ${values.amenities.join(", ")}` : null,
      values.features.length ? `Features: ${values.features.join(", ")}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const result = await askAi({ data: { prompt } });
      if (result.error || !result.text) {
        toast.error(result.error ?? "Could not generate a description.");
      } else {
        set("description", result.text);
        toast.success("Description drafted — please review it.");
      }
    } catch {
      toast.error("Could not generate a description.");
    }
    setAiLoading(false);
  }

  async function persist(overrides: Partial<PropertyFormValues> = {}) {
    const merged = { ...values, ...overrides };
    if (!merged.title.trim()) {
      toast.error("Please add a property title.");
      setStep(0);
      return null;
    }
    const slug = merged.slug.trim() || buildSlug(seoSource);
    setSaving(true);
    try {
      const result = await save({
        data: {
          id: merged.id,
          title: merged.title.trim(),
          slug,
          listing_type: merged.listing_type,
          property_type: merged.property_type,
          status: merged.status,
          bhk: merged.bhk || null,
          project_id: merged.project_id,
          builder_id: merged.builder_id,
          sector: merged.sector || null,
          locality: merged.locality || null,
          city: merged.city || "Gurugram",
          price: num(merged.price) ?? 0,
          area_sqft: num(merged.area_sqft),
          carpet_area_sqft: num(merged.carpet_area_sqft),
          bathrooms: num(merged.bathrooms),
          balconies: num(merged.balconies),
          floor_number: num(merged.floor_number),
          total_floors: num(merged.total_floors),
          facing: merged.facing || null,
          furnishing: merged.furnishing || null,
          parking: num(merged.parking) ?? 0,
          servant_room: merged.servant_room,
          study_room: merged.study_room,
          rera_number: merged.rera_number || null,
          description: merged.description || null,
          is_published: merged.is_published,
          is_featured: merged.is_featured,
          is_luxury: merged.is_luxury,
          meta_title: merged.meta_title || buildSeoTitle(seoSource),
          meta_description: merged.meta_description || buildMetaDescription(seoSource),
          og_title: merged.og_title || buildOgTitle(seoSource),
          og_description: merged.og_description || buildMetaDescription(seoSource),
          canonical_url: merged.canonical_url || buildCanonical(slug),
          cover_image_url: merged.images.find((i) => i.is_primary)?.image_url ?? merged.images[0]?.image_url ?? null,
          amenities: merged.amenities,
          features: merged.features,
          images: merged.images.map((i) => ({
            image_url: i.image_url,
            alt_text: i.alt_text || null,
            is_primary: i.is_primary,
          })),
        },
      });
      setValues((prev) => ({ ...prev, ...overrides, id: result.id, slug: result.slug }));
      return result;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this property.");
      return null;
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <ol className="flex flex-wrap gap-2" aria-label="Steps">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => {
                if (i === 4) autoFillSeo();
                setStep(i);
              }}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.14em] transition-colors ${
                step === i ? "border-gold bg-gold text-gold-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {i + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-border bg-card p-6">
        {step === 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Property title" className="md:col-span-2">
              <Input value={values.title} onChange={(e) => set("title", e.target.value)} placeholder="3 BHK at Conscient Heritage One" />
            </Field>
            <Field label="Sale or rent">
              <Select value={values.listing_type} onChange={(v) => set("listing_type", v as "sale" | "rent")} options={[["sale", "For Sale"], ["rent", "For Rent"]]} />
            </Field>
            <Field label="Property type">
              <Select
                value={values.property_type}
                onChange={(v) => set("property_type", v as PropertyFormValues["property_type"])}
                options={Object.entries(PROPERTY_TYPE_LABEL)}
              />
            </Field>
            <Field label="Configuration (BHK)">
              <Input value={values.bhk} onChange={(e) => set("bhk", e.target.value)} placeholder="3 BHK" />
            </Field>
            <Field label="Project">
              <Select
                value={values.project_id ?? ""}
                onChange={(v) => set("project_id", v || null)}
                options={[["", "Not linked"], ...projects.map((p) => [p.id, p.name] as [string, string])]}
              />
            </Field>
            <Field label="Builder">
              <Select
                value={values.builder_id ?? ""}
                onChange={(v) => set("builder_id", v || null)}
                options={[["", "Not linked"], ...builders.map((b) => [b.id, b.name] as [string, string])]}
              />
            </Field>
            <Field label="Sector">
              <Input value={values.sector} onChange={(e) => set("sector", e.target.value)} placeholder="Sector 62" />
            </Field>
            <Field label="Locality">
              <Input value={values.locality} onChange={(e) => set("locality", e.target.value)} placeholder="Golf Course Extension Road" />
            </Field>
            <Field label="City">
              <Input value={values.city} onChange={(e) => set("city", e.target.value)} />
            </Field>
            <Field label="Price (₹)">
              <Input inputMode="numeric" value={values.price} onChange={(e) => set("price", e.target.value)} placeholder="47500000" />
            </Field>
            <Field label="Built-up area (sq.ft.)">
              <Input inputMode="numeric" value={values.area_sqft} onChange={(e) => set("area_sqft", e.target.value)} />
            </Field>
            <Field label="Carpet area (sq.ft.)">
              <Input inputMode="numeric" value={values.carpet_area_sqft} onChange={(e) => set("carpet_area_sqft", e.target.value)} />
            </Field>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Bathrooms">
                <Input inputMode="numeric" value={values.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} />
              </Field>
              <Field label="Balconies">
                <Input inputMode="numeric" value={values.balconies} onChange={(e) => set("balconies", e.target.value)} />
              </Field>
              <Field label="Parking spaces">
                <Input inputMode="numeric" value={values.parking} onChange={(e) => set("parking", e.target.value)} />
              </Field>
              <Field label="Floor">
                <Input inputMode="numeric" value={values.floor_number} onChange={(e) => set("floor_number", e.target.value)} />
              </Field>
              <Field label="Total floors">
                <Input inputMode="numeric" value={values.total_floors} onChange={(e) => set("total_floors", e.target.value)} />
              </Field>
              <Field label="Facing">
                <Select
                  value={values.facing}
                  onChange={(v) => set("facing", v)}
                  options={[["", "Not specified"], ...["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"].map((f) => [f, f] as [string, string])]}
                />
              </Field>
              <Field label="Furnishing">
                <Select
                  value={values.furnishing}
                  onChange={(v) => set("furnishing", v)}
                  options={[["Unfurnished", "Unfurnished"], ["Semi-Furnished", "Semi-Furnished"], ["Fully Furnished", "Fully Furnished"]]}
                />
              </Field>
              <Field label="Possession status">
                <Select
                  value={values.status}
                  onChange={(v) => set("status", v as PropertyFormValues["status"])}
                  options={[
                    ["ready_to_move", "Ready to Move"],
                    ["under_construction", "Under Construction"],
                    ["new_launch", "New Launch"],
                    ["sold_out", "Sold / Rented"],
                  ]}
                />
              </Field>
              <Field label="RERA number">
                <Input value={values.rera_number} onChange={(e) => set("rera_number", e.target.value)} />
              </Field>
            </div>

            <div className="flex flex-wrap gap-6">
              <Toggle label="Servant room" checked={values.servant_room} onChange={(v) => set("servant_room", v)} />
              <Toggle label="Study room" checked={values.study_room} onChange={(v) => set("study_room", v)} />
              <Toggle label="Luxury collection" checked={values.is_luxury} onChange={(v) => set("is_luxury", v)} />
              <Toggle label="Featured" checked={values.is_featured} onChange={(v) => set("is_featured", v)} />
            </div>

            <TagPicker
              label="Amenities"
              presets={AMENITY_PRESETS}
              value={values.amenities}
              onChange={(v) => set("amenities", v)}
            />
            <TagPicker label="Features" presets={FEATURE_PRESETS} value={values.features} onChange={(v) => set("features", v)} />
          </div>
        ) : null}

        {step === 2 ? (
          <ImageManager
            images={values.images}
            onChange={(next) => set("images", next)}
            altFor={(i) => buildImageAlt(seoSource, i)}
          />
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Label htmlFor="description">Property description</Label>
              <Button type="button" variant="goldOutline" size="sm" onClick={() => void runAi()} disabled={aiLoading}>
                {aiLoading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Sparkles className="size-4" aria-hidden="true" />}
                Write with AI
              </Button>
            </div>
            <Textarea
              id="description"
              rows={14}
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the home, the project and the neighbourhood in plain language."
            />
            <p className="text-xs text-muted-foreground">
              AI drafts are a starting point. Please read and correct before publishing.
            </p>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                These fields are generated for you. Edit anything before publishing.
              </p>
              <Button type="button" variant="outline" size="sm" onClick={() => autoFillSeo(true)}>
                <Wand2 className="size-4" aria-hidden="true" />
                Regenerate
              </Button>
            </div>
            <Field label="Page address (slug)">
              <Input value={values.slug} onChange={(e) => set("slug", e.target.value)} />
            </Field>
            <p className="-mt-3 text-xs text-muted-foreground">/property/{values.slug || "…"}</p>
            <Field label="SEO title">
              <Input value={values.meta_title} onChange={(e) => set("meta_title", e.target.value)} maxLength={70} />
            </Field>
            <Field label="Meta description">
              <Textarea rows={3} value={values.meta_description} onChange={(e) => set("meta_description", e.target.value)} maxLength={170} />
            </Field>
            <Field label="Social share title">
              <Input value={values.og_title} onChange={(e) => set("og_title", e.target.value)} />
            </Field>
            <Field label="Social share description">
              <Textarea rows={3} value={values.og_description} onChange={(e) => set("og_description", e.target.value)} />
            </Field>
            <Field label="Canonical URL">
              <Input value={values.canonical_url} onChange={(e) => set("canonical_url", e.target.value)} />
            </Field>
          </div>
        ) : null}
      </div>

      <div className="sticky bottom-0 flex flex-wrap items-center gap-2 border-t border-border bg-background/95 py-4 backdrop-blur">
        <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          Back
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={step === 4}
          onClick={() => {
            if (step === 3) autoFillSeo();
            setStep((s) => Math.min(4, s + 1));
          }}
        >
          Next
        </Button>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button type="button" variant="outline" disabled={saving} onClick={() => void persist({ is_published: false }).then((r) => r && toast.success("Draft saved"))}>
            {saving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            Save draft
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={() =>
              void persist().then((r) => {
                if (r) void navigate({ to: "/admin/preview/$id", params: { id: r.id } });
              })
            }
          >
            Preview
          </Button>
          {values.is_published ? (
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => void persist({ is_published: false }).then((r) => r && toast.success("Unpublished"))}
            >
              Unpublish
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={() => void persist({ status: "sold_out" }).then((r) => r && toast.success("Marked sold / rented"))}
          >
            Mark sold
          </Button>
          <Button
            type="button"
            variant="gold"
            disabled={saving}
            onClick={() => {
              autoFillSeo();
              void persist({ is_published: true }).then((r) => {
                if (r) {
                  toast.success("Property published");
                  void navigate({ to: "/property/$slug", params: { slug: r.slug } });
                }
              });
            }}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block space-y-2 ${className ?? ""}`}>
      <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
    >
      {options.map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <Switch checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  );
}

function TagPicker({
  label,
  presets,
  value,
  onChange,
}: {
  label: string;
  presets: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [custom, setCustom] = useState("");
  const toggle = (tag: string) =>
    onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {[...presets, ...value.filter((v) => !presets.includes(v))].map((tag) => (
          <button key={tag} type="button" onClick={() => toggle(tag)}>
            <Badge variant={value.includes(tag) ? "default" : "secondary"} className="cursor-pointer font-normal">
              {tag}
            </Badge>
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder={`Add another ${label.toLowerCase().slice(0, -1)}`}
          className="h-9 max-w-xs"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (custom.trim() && !value.includes(custom.trim())) onChange([...value, custom.trim()]);
              setCustom("");
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            if (custom.trim() && !value.includes(custom.trim())) onChange([...value, custom.trim()]);
            setCustom("");
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
