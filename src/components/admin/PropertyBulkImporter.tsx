import { useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, FileSpreadsheet, Loader2, Upload, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { savePropertyDraft } from "@/lib/admin.functions";
import {
  buildCanonical,
  buildMetaDescription,
  buildOgTitle,
  buildSeoTitle,
  buildSlug,
  PROPERTY_TYPE_LABEL,
  type SeoSource,
} from "@/lib/seo";

type RawRow = Record<string, unknown>;

type ImportRow = {
  rowNumber: number;
  propertyCode: string;
  listingType: "sale" | "rent";
  projectName: string;
  builderName: string;
  propertyType: keyof typeof PROPERTY_TYPE_LABEL;
  bhk: string;
  areaSqft: number | null;
  carpetAreaSqft: number | null;
  price: number;
  sector: string;
  locality: string;
  city: string;
  floorNumber: number | null;
  totalFloors: number | null;
  facing: string;
  bathrooms: number | null;
  balconies: number | null;
  parking: number;
  furnishing: string;
  status: "ready_to_move" | "under_construction" | "new_launch" | "sold_out";
  servantRoom: boolean;
  studyRoom: boolean;
  view: string;
  unitFeatures: string;
  negotiable: boolean;
  reraNumber: string;
  notes: string;
  sourceUrl: string;
  description: string;
  amenities: string[];
  errors: string[];
};

function cell(row: RawRow, ...names: string[]) {
  for (const name of names) {
    const value = row[name];
    if (value !== undefined && value !== null && String(value).trim() !== "") return String(value).trim();
  }
  return "";
}

function numberCell(row: RawRow, ...names: string[]): number | null {
  const value = cell(row, ...names);
  if (!value) return null;
  const parsed = Number(value.replace(/[₹,$,]/g, "").replace(/\s/g, ""));
  if (Number.isFinite(parsed)) return parsed;
  const loose = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(loose) ? loose : null;
}

function intCell(row: RawRow, ...names: string[]): number | null {
  const value = numberCell(row, ...names);
  return value === null ? null : Math.trunc(value);
}

function yes(value: string) {
  return /^(yes|y|true|1)$/i.test(value.trim());
}

function propertyType(value: string): keyof typeof PROPERTY_TYPE_LABEL {
  const v = value.toLowerCase().replace(/[-\s]+/g, "_");
  if (v.includes("builder") && v.includes("floor")) return "builder_floor";
  if (v.includes("villa")) return "villa";
  if (v.includes("plot")) return "plot";
  if (v.includes("office")) return "office";
  if (v.includes("retail") || v.includes("shop")) return "retail";
  if (v.includes("commercial")) return "commercial";
  return "apartment";
}

function status(value: string): ImportRow["status"] {
  const v = value.toLowerCase();
  if (v.includes("under")) return "under_construction";
  if (v.includes("launch")) return "new_launch";
  if (v.includes("sold") || v.includes("rented")) return "sold_out";
  return "ready_to_move";
}

function splitList(value: string) {
  return value
    .split(/[,;|]/g)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 60);
}

function formatPrice(price: number) {
  if (!price) return "price on request";
  if (price >= 10_000_000) return `₹${(price / 10_000_000).toFixed(price % 10_000_000 === 0 ? 0 : 2)} Cr`;
  if (price >= 100_000) return `₹${(price / 100_000).toFixed(price % 100_000 === 0 ? 0 : 2)} Lakh`;
  return `₹${price.toLocaleString("en-IN")}`;
}

function makeDescription(item: Omit<ImportRow, "description" | "errors">) {
  const location = [item.projectName, item.sector, item.locality, item.city].filter(Boolean).join(", ");
  const intro = `${item.bhk || "Property"} ${PROPERTY_TYPE_LABEL[item.propertyType].toLowerCase()}${item.areaSqft ? ` of approximately ${item.areaSqft.toLocaleString("en-IN")} sq ft` : ""} is available for ${item.listingType === "sale" ? "sale" : "rent"} in ${location || "Gurugram"}${item.price ? ` at ${formatPrice(item.price)}${item.negotiable ? ", negotiable" : ""}` : ""}.`;

  const details = [
    item.floorNumber !== null && item.totalFloors !== null ? `Located on the ${item.floorNumber}${ordinal(item.floorNumber)} floor of a ${item.totalFloors}-storey building` : item.floorNumber !== null ? `Located on floor ${item.floorNumber}` : "",
    item.facing ? `${item.facing} facing` : "",
    item.view ? `${item.view}` : "",
    item.bathrooms !== null ? `${item.bathrooms} bathroom${item.bathrooms === 1 ? "" : "s"}` : "",
    item.balconies !== null ? `${item.balconies}+ balcon${item.balconies === 1 ? "y" : "ies"}` : "",
    item.furnishing ? `${item.furnishing.toLowerCase()}` : "",
  ].filter(Boolean);

  const unit = details.length ? `${details.join(", ")}.` : "";
  const features = item.unitFeatures ? `Unit highlights include ${item.unitFeatures.replace(/[.;]+$/g, "")}.` : "";
  const possession = item.status === "ready_to_move" ? "The property is ready to move." : item.status === "under_construction" ? "The property is under construction." : item.status === "new_launch" ? "This is a new-launch property." : "";
  const notes = item.notes ? item.notes : "";
  const source = item.sourceUrl ? "Listing details are based on the supplied source information and should be reconfirmed at the time of inspection and transaction." : "Property details should be reconfirmed at the time of inspection and transaction.";

  return [intro, unit, features, possession, notes, source].filter(Boolean).join("\n\n");
}

function ordinal(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  switch (value % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

function parseRow(row: RawRow, index: number): ImportRow {
  const listing = cell(row, "Listing Type *", "Listing Type", "Sale / Rent").toLowerCase() === "rent" ? "rent" : "sale";
  const projectName = cell(row, "Project Name *", "Project Name", "Project");
  const bhk = cell(row, "Configuration / BHK *", "Configuration / BHK", "BHK", "Configuration");
  const pType = propertyType(cell(row, "Property Type *", "Property Type"));
  const areaSqft = numberCell(row, "Area (Sq Ft) *", "Area (Sq Ft)", "Area", "Super Area");
  const price = numberCell(row, "Price (INR) *", "Price (INR)", "Price") ?? 0;
  const sector = cell(row, "Sector *", "Sector");
  const locality = cell(row, "Locality / Corridor *", "Locality / Corridor", "Locality");
  const city = cell(row, "City") || "Gurugram";
  const base = {
    rowNumber: index + 2,
    propertyCode: cell(row, "Property Code *", "Property Code"),
    listingType: listing as "sale" | "rent",
    projectName,
    builderName: cell(row, "Builder / Developer", "Builder", "Developer"),
    propertyType: pType,
    bhk,
    areaSqft,
    carpetAreaSqft: numberCell(row, "Carpet Area (Sq Ft)", "Carpet Area"),
    price,
    sector,
    locality,
    city,
    floorNumber: intCell(row, "Floor", "Floor Number"),
    totalFloors: intCell(row, "Total Floors"),
    facing: cell(row, "Facing"),
    bathrooms: intCell(row, "Bathrooms"),
    balconies: intCell(row, "Balconies"),
    parking: intCell(row, "Parking") ?? 0,
    furnishing: cell(row, "Furnishing"),
    status: status(cell(row, "Possession Status *", "Possession Status", "Possession")),
    servantRoom: yes(cell(row, "Servant Room")),
    studyRoom: yes(cell(row, "Study Room")),
    view: cell(row, "Unit View / Facing USP", "View", "Overlooking"),
    unitFeatures: cell(row, "Unit-specific Features / Condition", "Unit Features", "Features"),
    negotiable: yes(cell(row, "Negotiable")),
    reraNumber: cell(row, "RERA Number (if known)", "RERA Number", "RERA"),
    notes: cell(row, "Availability / Internal Notes", "Notes"),
    sourceUrl: cell(row, "Source Listing URL", "Source URL"),
    amenities: splitList(cell(row, "Amenities", "Project Amenities")),
  };

  const errors: string[] = [];
  if (!projectName) errors.push("Project Name missing");
  if (!bhk && pType !== "plot" && pType !== "commercial") errors.push("Configuration/BHK missing");
  if (!areaSqft) errors.push("Area missing");
  if (!price) errors.push("Price missing");
  if (!sector) errors.push("Sector missing");

  const description = cell(row, "SEO Description", "Property Description", "Description") || makeDescription(base);
  return { ...base, description, errors };
}

export function PropertyBulkImporter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [reading, setReading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<Array<{ row: number; ok: boolean; message: string }>>([]);
  const save = useServerFn(savePropertyDraft);

  const validRows = useMemo(() => rows.filter((row) => row.errors.length === 0), [rows]);

  async function readFile(file: File) {
    setReading(true);
    setRows([]);
    setResults([]);
    try {
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames.includes("Property_Data") ? "Property_Data" : workbook.SheetNames[0];
      if (!sheetName) throw new Error("No worksheet found in this Excel file.");
      const worksheet = workbook.Sheets[sheetName];
      const rawRows = XLSX.utils.sheet_to_json<RawRow>(worksheet, { defval: "", raw: false });
      const parsed = rawRows.map(parseRow).filter((row) => row.projectName || row.propertyCode || row.bhk || row.price);
      if (!parsed.length) throw new Error("No property rows were found. Please use the Shubh Estate property template.");
      setRows(parsed);
      setFileName(file.name);
      toast.success(`${parsed.length} propert${parsed.length === 1 ? "y" : "ies"} read from Excel`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not read the Excel file.");
    } finally {
      setReading(false);
    }
  }

  async function importAndPublish() {
    if (!validRows.length) {
      toast.error("No valid rows are ready to import.");
      return;
    }
    setImporting(true);
    setResults([]);
    const nextResults: Array<{ row: number; ok: boolean; message: string }> = [];

    for (const item of validRows) {
      try {
        const titleParts = [
          item.bhk,
          PROPERTY_TYPE_LABEL[item.propertyType],
          item.listingType === "sale" ? "for Sale" : "for Rent",
          item.projectName ? `in ${item.projectName}` : "",
          item.sector,
          item.city === "Gurugram" ? "Gurgaon" : item.city,
          item.areaSqft ? `- ${item.areaSqft} Sq Ft` : "",
        ].filter(Boolean);
        const title = titleParts.join(" ").replace(/\s+/g, " ").slice(0, 160);
        const seoSource: SeoSource = {
          title,
          bhk: item.bhk,
          propertyType: item.propertyType,
          listingType: item.listingType,
          projectName: item.projectName || null,
          builderName: item.builderName || null,
          sector: item.sector,
          locality: item.locality,
          city: item.city,
          price: item.price,
          areaSqft: item.areaSqft,
          description: item.description,
        };
        const slug = buildSlug(seoSource);
        const result = await save({
          data: {
            id: null,
            title,
            slug,
            listing_type: item.listingType,
            property_type: item.propertyType,
            status: item.status,
            bhk: item.bhk || null,
            project_id: null,
            builder_id: null,
            sector: item.sector || null,
            locality: item.locality || null,
            city: item.city,
            price: item.price,
            area_sqft: item.areaSqft,
            carpet_area_sqft: item.carpetAreaSqft,
            bathrooms: item.bathrooms,
            balconies: item.balconies,
            floor_number: item.floorNumber,
            total_floors: item.totalFloors,
            facing: item.facing || null,
            furnishing: item.furnishing || null,
            parking: item.parking,
            servant_room: item.servantRoom,
            study_room: item.studyRoom,
            rera_number: item.reraNumber || null,
            description: item.description,
            is_published: true,
            is_featured: false,
            is_luxury: false,
            meta_title: buildSeoTitle(seoSource),
            meta_description: buildMetaDescription(seoSource),
            og_title: buildOgTitle(seoSource),
            og_description: buildMetaDescription(seoSource),
            canonical_url: buildCanonical(slug),
            cover_image_url: null,
            amenities: item.amenities,
            features: [item.view, item.unitFeatures, item.negotiable ? "Price Negotiable" : ""].filter(Boolean),
            videos: [],
            images: [],
          },
        });
        nextResults.push({ row: item.rowNumber, ok: true, message: `Published: /property/${result.slug}` });
      } catch (error) {
        nextResults.push({ row: item.rowNumber, ok: false, message: error instanceof Error ? error.message : "Import failed" });
      }
    }

    setResults(nextResults);
    setImporting(false);
    const success = nextResults.filter((item) => item.ok).length;
    const failed = nextResults.length - success;
    if (success) toast.success(`${success} propert${success === 1 ? "y" : "ies"} published`);
    if (failed) toast.error(`${failed} row${failed === 1 ? "" : "s"} could not be imported`);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Excel → Website</p>
            <h2 className="mt-2 font-display text-2xl">Bulk import properties</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Upload the Shubh Estate Excel template. Rows are previewed first and are published only after you press Import & Publish. Photos are not required.
            </p>
          </div>
          <Button type="button" variant="gold" onClick={() => inputRef.current?.click()} disabled={reading || importing}>
            {reading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            {reading ? "Reading…" : "Choose Excel"}
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void readFile(file);
              event.target.value = "";
            }}
          />
        </div>
        {fileName ? <p className="mt-4 text-xs text-muted-foreground">Loaded: <strong className="text-foreground">{fileName}</strong></p> : null}
      </section>

      {rows.length ? (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl">Preview</h2>
              <p className="mt-1 text-sm text-muted-foreground">{validRows.length} of {rows.length} rows ready to publish.</p>
            </div>
            <Button type="button" variant="gold" onClick={() => void importAndPublish()} disabled={importing || !validRows.length}>
              {importing ? <Loader2 className="size-4 animate-spin" /> : <FileSpreadsheet className="size-4" />}
              {importing ? "Publishing…" : `Import & Publish ${validRows.length}`}
            </Button>
          </div>

          <div className="mt-5 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="px-4 py-3">Row</th><th className="px-4 py-3">Property</th><th className="px-4 py-3">Area</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Floor / View</th><th className="px-4 py-3">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={`${row.rowNumber}-${row.propertyCode}`}>
                    <td className="px-4 py-4 align-top">{row.rowNumber}</td>
                    <td className="px-4 py-4 align-top"><p className="font-medium">{row.bhk} {row.projectName}</p><p className="mt-1 text-xs text-muted-foreground">{[row.sector, row.locality, row.city].filter(Boolean).join(" · ")}</p></td>
                    <td className="px-4 py-4 align-top">{row.areaSqft ? `${row.areaSqft.toLocaleString("en-IN")} sq ft` : "—"}</td>
                    <td className="px-4 py-4 align-top">{formatPrice(row.price)}</td>
                    <td className="px-4 py-4 align-top">{row.floorNumber !== null ? `${row.floorNumber}${row.totalFloors !== null ? ` / ${row.totalFloors}` : ""}` : "—"}<p className="mt-1 text-xs text-muted-foreground">{row.view || row.facing || ""}</p></td>
                    <td className="px-4 py-4 align-top">{row.errors.length ? <div><Badge variant="destructive">Needs correction</Badge><p className="mt-2 max-w-xs text-xs text-destructive">{row.errors.join(" · ")}</p></div> : <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Ready</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {results.length ? (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7">
          <h2 className="font-display text-xl">Import result</h2>
          <div className="mt-4 space-y-2">
            {results.map((result) => (
              <div key={`${result.row}-${result.message}`} className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm">
                {result.ok ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" /> : <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />}
                <div><p className="font-medium">Excel row {result.row}</p><p className="mt-1 break-all text-xs text-muted-foreground">{result.message}</p></div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
