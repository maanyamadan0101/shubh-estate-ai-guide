import { useRef, useState } from "react";
import { Loader2, Trash2, Upload, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { requestMediaUpload } from "@/lib/media-upload.client";

export function VideoManager({ videos, onChange }: { videos: string[]; onChange: (next: string[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const [link, setLink] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(files: FileList | File[]) {
    const list = Array.from(files).filter((file) => file.type === "video/mp4" || file.type === "video/webm");
    if (!list.length) {
      toast.error("Please choose an MP4 or WebM video.");
      return;
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;
    if (sessionError || !accessToken) {
      toast.error("Your login session has expired. Please sign in again.");
      return;
    }

    setUploading(true);
    const added: string[] = [];
    try {
      for (const file of list.slice(0, 4)) {
        if (file.size > 100 * 1024 * 1024) {
          toast.error(`${file.name} is larger than 100 MB`);
          continue;
        }

        const extension = file.name.split(".").pop()?.toLowerCase() || "mp4";
        try {
          const signed = await requestMediaUpload({
            kind: "video",
            extension,
            contentType: file.type,
            accessToken,
          });

          const { error } = await supabase.storage
            .from("property-images")
            .uploadToSignedUrl(signed.path, signed.token, file, {
              cacheControl: "31536000",
              contentType: file.type,
            });

          if (error) {
            toast.error(`Video upload failed: ${error.message}`);
            continue;
          }
          added.push(`/api/public/img/${signed.path}`);
        } catch (error) {
          toast.error(error instanceof Error ? error.message : `Could not upload ${file.name}`);
        }
      }
    } finally {
      setUploading(false);
    }

    if (added.length) {
      onChange([...videos, ...added].slice(0, 4));
      toast.success(`${added.length} video${added.length > 1 ? "s" : ""} added`);
    }
  }

  function addLink() {
    const value = link.trim();
    if (!value) return;
    try {
      const url = new URL(value);
      if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Invalid protocol");
    } catch {
      toast.error("Please enter a valid video or YouTube URL.");
      return;
    }
    if (videos.includes(value)) {
      toast.error("This video is already added.");
      return;
    }
    if (videos.length >= 4) {
      toast.error("You can add up to 4 videos per property.");
      return;
    }
    onChange([...videos, value]);
    setLink("");
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-background p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading || videos.length >= 4}>
            {uploading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Upload className="size-4" aria-hidden="true" />}
            {uploading ? "Uploading…" : "Upload MP4 / WebM"}
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm"
            multiple
            className="sr-only"
            onChange={(event) => {
              if (event.target.files) void upload(event.target.files);
              event.target.value = "";
            }}
          />
          <span className="text-xs text-muted-foreground">Up to 100 MB each · maximum 4 videos</span>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder="Or paste a YouTube / video URL"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addLink();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addLink} disabled={videos.length >= 4}>
            Add link
          </Button>
        </div>
      </div>

      {videos.length ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {videos.map((videoUrl, index) => {
            const isUploaded = videoUrl.startsWith("/api/public/img/");
            return (
              <li key={`${videoUrl}-${index}`} className="overflow-hidden rounded-xl border border-border bg-card">
                {isUploaded ? (
                  <video src={videoUrl} controls preload="metadata" className="aspect-video w-full bg-black object-contain" />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-muted p-6 text-center">
                    <div>
                      <Video className="mx-auto size-8 text-gold" aria-hidden="true" />
                      <p className="mt-3 break-all text-xs text-muted-foreground">{videoUrl}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3 p-3">
                  <span className="text-xs text-muted-foreground">Video {index + 1}</span>
                  <Button type="button" size="sm" variant="outline" onClick={() => onChange(videos.filter((_, i) => i !== index))}>
                    <Trash2 className="size-3.5" aria-hidden="true" />
                    Remove
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
