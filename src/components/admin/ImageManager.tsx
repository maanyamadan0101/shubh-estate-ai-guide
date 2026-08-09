import { useCallback, useRef, useState } from "react";
import { GripVertical, ImagePlus, Loader2, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { requestMediaUpload } from "@/lib/media-upload.client";

export type ManagedImage = {
  image_url: string;
  alt_text: string;
  is_primary: boolean;
};

export function ImageManager({
  images,
  onChange,
  altFor,
}: {
  images: ManagedImage[];
  onChange: (next: ManagedImage[]) => void;
  altFor: (index: number) => string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (!list.length) {
        toast.error("Please choose an image file.");
        return;
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (sessionError || !accessToken) {
        toast.error("Your login session has expired. Please sign in again.");
        return;
      }

      setUploading(true);
      const added: ManagedImage[] = [];
      try {
        for (const file of list) {
          if (file.size > 10 * 1024 * 1024) {
            toast.error(`${file.name} is larger than 10 MB`);
            continue;
          }

          const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
          try {
            const signed = await requestMediaUpload({
              kind: "image",
              extension,
              contentType: file.type || "image/jpeg",
              accessToken,
            });

            const { error } = await supabase.storage
              .from("property-images")
              .uploadToSignedUrl(signed.path, signed.token, file, {
                cacheControl: "31536000",
                contentType: file.type || "image/jpeg",
              });

            if (error) {
              toast.error(`Upload failed: ${error.message}`);
              continue;
            }

            added.push({
              image_url: `/api/public/img/${signed.path}`,
              alt_text: altFor(images.length + added.length),
              is_primary: false,
            });
          } catch (error) {
            toast.error(error instanceof Error ? error.message : `Could not upload ${file.name}`);
          }
        }
      } finally {
        setUploading(false);
      }

      if (!added.length) return;
      const next = [...images, ...added];
      if (!next.some((i) => i.is_primary)) next[0] = { ...next[0]!, is_primary: true };
      onChange(next);
      toast.success(`${added.length} photo${added.length > 1 ? "s" : ""} added`);
    },
    [images, onChange, altFor],
  );

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length || from === to) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item!);
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) void upload(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
          dragOver ? "border-gold bg-accent/40" : "border-border"
        }`}
      >
        {uploading ? (
          <Loader2 className="size-6 animate-spin text-gold" aria-hidden="true" />
        ) : (
          <ImagePlus className="size-6 text-gold" aria-hidden="true" />
        )}
        <p className="mt-3 text-sm font-medium">Drag & drop photos here</p>
        <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, WebP or AVIF, up to 10 MB each</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Choose photos"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files) void upload(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {images.length > 0 ? (
        <ul className="grid gap-3">
          {images.map((image, index) => (
            <li
              key={image.image_url}
              draggable
              onDragStart={() => (dragIndex.current = index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIndex.current !== null) move(dragIndex.current, index);
                dragIndex.current = null;
              }}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3"
            >
              <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground" aria-hidden="true" />
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="size-16 shrink-0 rounded-md object-cover"
                loading="lazy"
              />
              <div className="min-w-[12rem] flex-1">
                <label className="sr-only" htmlFor={`alt-${index}`}>
                  Image description
                </label>
                <Input
                  id={`alt-${index}`}
                  value={image.alt_text}
                  onChange={(e) => {
                    const next = [...images];
                    next[index] = { ...image, alt_text: e.target.value };
                    onChange(next);
                  }}
                  placeholder="Image description"
                  className="h-9"
                />
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant={image.is_primary ? "gold" : "outline"}
                  onClick={() => onChange(images.map((im, i) => ({ ...im, is_primary: i === index })))}
                >
                  <Star className="size-3.5" aria-hidden="true" />
                  {image.is_primary ? "Cover" : "Set cover"}
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={() => move(index, index - 1)} aria-label="Move up">
                  ↑
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={() => move(index, index + 1)} aria-label="Move down">
                  ↓
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  aria-label="Remove photo"
                  onClick={() => {
                    const next = images.filter((_, i) => i !== index);
                    if (next.length && !next.some((i) => i.is_primary)) next[0] = { ...next[0]!, is_primary: true };
                    onChange(next);
                  }}
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
