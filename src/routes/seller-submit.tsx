import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, ImagePlus, Link2, MessageCircle, ShieldCheck, UploadCloud, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const EMPTY = {
  full_name: "",
  phone: "",
  email: "",
  is_nri: false,
  country: "",
  project: "",
  sector: "",
  property_type: "Apartment",
  configuration: "",
  area_sqft: "",
  floor: "",
  facing: "",
  expected_price: "",
  occupancy: "",
  availability: "",
  media_link: "",
  notes: "",
  website: "",
};

type FormState = typeof EMPTY;
type UploadInstruction = { index: number; path: string; token: string };
type SubmissionResponse = {
  ok?: boolean;
  error?: string;
  reference?: string;
  bucket?: string;
  uploads?: UploadInstruction[];
};

function extensionFor(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (fromName && fromName.length >= 2 && fromName.length <= 5) return fromName;
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "video/quicktime") return "mov";
  return file.type.split("/")[1]?.replace(/[^a-z0-9]/g, "").slice(0, 5) || "bin";
}

export const Route = createFileRoute("/seller-submit")({
  head: () => ({
    meta: [
      { title: "Private Seller Property Submission | Shubh Estate Brokers" },
      {
        name: "description",
        content: "Private property submission form for owners who want Shubh Estate Brokers to review and market a Gurgaon property.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: SellerSubmitPage,
});

function SellerSubmitPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const [uploadWarnings, setUploadWarnings] = useState<string[]>([]);

  const whatsappUrl = useMemo(() => {
    const text = reference
      ? `Seller property submission ${reference}. I would like to send additional property photos/videos.`
      : "I want to submit a Gurgaon property for sale and send property photos/videos.";
    return `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [reference]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function choosePhotos(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files).filter((file) => file.type.startsWith("image/")).slice(0, 10);
    const tooLarge = next.filter((file) => file.size > 10 * 1024 * 1024);
    if (tooLarge.length) toast.error("Each photo must be 10 MB or smaller.");
    setPhotos(next.filter((file) => file.size <= 10 * 1024 * 1024));
  }

  function chooseVideos(files: FileList | null) {
    if (!files) return;
    const accepted = new Set(["video/mp4", "video/webm", "video/quicktime"]);
    const next = Array.from(files).filter((file) => accepted.has(file.type)).slice(0, 2);
    const tooLarge = next.filter((file) => file.size > 50 * 1024 * 1024);
    if (tooLarge.length) toast.error("Each video must be 50 MB or smaller. Use WhatsApp or a sharing link for larger files.");
    setVideos(next.filter((file) => file.size <= 50 * 1024 * 1024));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name.trim() || form.phone.trim().length < 8 || !form.project.trim()) {
      toast.error("Please add your name, phone number and project/property location.");
      return;
    }

    const files = [
      ...photos.map((file) => ({ kind: "image" as const, file })),
      ...videos.map((file) => ({ kind: "video" as const, file })),
    ];
    const media = files.map(({ kind, file }) => ({
      kind,
      name: file.name,
      extension: extensionFor(file),
      contentType: file.type,
      size: file.size,
    }));

    setSending(true);
    setUploadWarnings([]);
    setProgress("Saving your private property details…");
    try {
      const response = await fetch("/api/seller-submission", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, media }),
      });
      const payload = (await response.json()) as SubmissionResponse;
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Could not submit the property.");

      const warnings: string[] = [];
      const uploads = payload.uploads ?? [];
      for (let i = 0; i < uploads.length; i += 1) {
        const instruction = uploads[i]!;
        const selected = files[instruction.index];
        if (!selected) continue;
        setProgress(`Uploading media ${i + 1} of ${uploads.length}…`);
        const { error } = await supabase.storage
          .from(payload.bucket || "seller-submissions")
          .uploadToSignedUrl(instruction.path, instruction.token, selected.file, {
            contentType: selected.file.type,
            cacheControl: "3600",
          });
        if (error) warnings.push(`${selected.file.name}: ${error.message}`);
      }

      trackEvent("seller_submission", {
        seller_type: form.is_nri ? "nri" : "local",
        project: form.project,
        sector: form.sector || "not_provided",
        media_count: files.length,
        page_path: window.location.pathname,
      });
      setReference(payload.reference || "received");
      setUploadWarnings(warnings);
      setProgress("");
      toast.success("Property submitted privately for review.");
    } catch (error) {
      setProgress("");
      toast.error(error instanceof Error ? error.message : "Could not submit the property.");
    } finally {
      setSending(false);
    }
  }

  if (reference) {
    return (
      <main className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-card p-7 md:p-10">
          <CheckCircle2 className="size-9 text-gold" aria-hidden="true" />
          <p className="mt-5 eyebrow">Private submission received</p>
          <h1 className="mt-3 font-display text-3xl">Your property has been sent to Shubh Estate Brokers</h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Reference: <strong className="text-foreground">{reference}</strong>. Your property is <strong className="text-foreground">not published on the buyer website</strong>. We will review the details first and contact you before any public listing is created.
          </p>
          {uploadWarnings.length ? (
            <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 text-sm">
              <p className="font-medium">Some media did not upload.</p>
              <p className="mt-1 text-muted-foreground">Your property details were still received. Please send the remaining media by WhatsApp.</p>
            </div>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="gold">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" />
                Send more media on WhatsApp
              </a>
            </Button>
            <Button variant="outline" onClick={() => {
              setReference(null);
              setForm(EMPTY);
              setPhotos([]);
              setVideos([]);
            }}>
              Submit another property
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl surface-navy p-7 md:p-10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 size-6 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="eyebrow">Private Seller Link</p>
              <h1 className="mt-3 font-display text-3xl md:text-4xl">Submit your property privately</h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-navy-foreground/75">
                Send the property details directly to our team. This submission does not create a public buyer listing. We review the property, discuss pricing and marketing with you, and publish only after our team approves it with you.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <p className="eyebrow">1 · Owner Details</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Owner name *"><Input value={form.full_name} onChange={(e) => set("full_name", e.target.value)} required /></Field>
              <Field label="Phone / WhatsApp *"><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 / country code" required /></Field>
              <Field label="Email"><Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
              <Field label="Country (for NRI / overseas seller)"><Input value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="USA, Canada, UAE, UK…" /></Field>
            </div>
            <label className="mt-4 flex items-center gap-3 text-sm">
              <input type="checkbox" checked={form.is_nri} onChange={(e) => set("is_nri", e.target.checked)} className="size-4" />
              I am an NRI / OCI / overseas property owner
            </label>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <p className="eyebrow">2 · Property Details</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Project / society / property location *" className="md:col-span-2"><Input value={form.project} onChange={(e) => set("project", e.target.value)} placeholder="e.g. Emaar Palm Hills" required /></Field>
              <Field label="Sector / locality"><Input value={form.sector} onChange={(e) => set("sector", e.target.value)} placeholder="Sector 77, Gurgaon" /></Field>
              <Field label="Property type">
                <select value={form.property_type} onChange={(e) => set("property_type", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {['Apartment','Builder Floor','Villa','Plot','Penthouse','Commercial','Other'].map((option) => <option key={option}>{option}</option>)}
                </select>
              </Field>
              <Field label="Configuration"><Input value={form.configuration} onChange={(e) => set("configuration", e.target.value)} placeholder="3 BHK + Servant" /></Field>
              <Field label="Area (sq.ft.)"><Input value={form.area_sqft} onChange={(e) => set("area_sqft", e.target.value)} inputMode="numeric" /></Field>
              <Field label="Floor"><Input value={form.floor} onChange={(e) => set("floor", e.target.value)} placeholder="6th of 12" /></Field>
              <Field label="Facing / view"><Input value={form.facing} onChange={(e) => set("facing", e.target.value)} placeholder="East / park facing" /></Field>
              <Field label="Expected price"><Input value={form.expected_price} onChange={(e) => set("expected_price", e.target.value)} placeholder="₹1.85 Cr / negotiable" /></Field>
              <Field label="Occupancy"><Input value={form.occupancy} onChange={(e) => set("occupancy", e.target.value)} placeholder="Vacant / self occupied / rented" /></Field>
              <Field label="Visit / possession availability" className="md:col-span-2"><Input value={form.availability} onChange={(e) => set("availability", e.target.value)} placeholder="Keys with owner / tenant / caretaker; preferred visit timing" /></Field>
            </div>
            <Field label="Anything else buyers should know" className="mt-4">
              <Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={4} placeholder="Parking, renovation, loan outstanding, urgency, special view, furnishings, etc." />
            </Field>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <p className="eyebrow">3 · Photos & Videos — Choose Either Option or Both</p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-xl border border-border p-5">
                <UploadCloud className="size-6 text-gold" aria-hidden="true" />
                <h2 className="mt-3 font-display text-xl">Upload directly here</h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">Private upload. Up to 10 photos (10 MB each) and 2 videos (50 MB each).</p>
                <label className="mt-5 block text-sm font-medium">Photos</label>
                <Input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif" multiple onChange={(e) => choosePhotos(e.target.files)} className="mt-2" />
                {photos.length ? <p className="mt-2 text-xs text-muted-foreground"><ImagePlus className="mr-1 inline size-3.5" />{photos.length} photo{photos.length === 1 ? "" : "s"} selected</p> : null}
                <label className="mt-5 block text-sm font-medium">Videos</label>
                <Input type="file" accept="video/mp4,video/webm,video/quicktime" multiple onChange={(e) => chooseVideos(e.target.files)} className="mt-2" />
                {videos.length ? <p className="mt-2 text-xs text-muted-foreground"><Video className="mr-1 inline size-3.5" />{videos.length} video{videos.length === 1 ? "" : "s"} selected</p> : null}
              </div>

              <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
                <Link2 className="size-6 text-gold" aria-hidden="true" />
                <h2 className="mt-3 font-display text-xl">Send media separately</h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">Best for large videos or existing albums. You can use Google Drive, Dropbox, OneDrive, YouTube/Unlisted, or WhatsApp.</p>
                <Field label="Photo / video sharing link" className="mt-5">
                  <Input value={form.media_link} onChange={(e) => set("media_link", e.target.value)} placeholder="Paste Google Drive / Dropbox / video link" />
                </Field>
                <Button asChild variant="outline" className="mt-5 w-full">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Send media on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gold/30 bg-card p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-sm leading-6 text-muted-foreground">
                <strong className="text-foreground">Private by default:</strong> this form sends information to Shubh Estate Brokers for review. The property is not automatically added to public listings or shown to buyers. Public marketing starts only after our team reviews the submission and coordinates with you.
              </p>
            </div>
          </section>

          <input type="text" value={form.website} onChange={(e) => set("website", e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <Button type="submit" variant="gold" size="xl" className="w-full" disabled={sending}>
            {sending ? progress || "Submitting…" : "Submit Property Privately"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">By submitting, you permit Shubh Estate Brokers to contact you regarding this property.</p>
        </form>
      </div>
    </main>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
