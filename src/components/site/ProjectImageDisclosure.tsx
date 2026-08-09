import { ImageIcon } from "lucide-react";
import { licenseUrlFor, parseProjectImageAlt } from "@/lib/project-image";

type ImageRow = { image_url: string; alt_text: string | null };

export function ProjectImageDisclosure({
  coverImageUrl,
  images,
}: {
  coverImageUrl: string | null | undefined;
  images: ImageRow[];
}) {
  const encoded = images.find((image) => parseProjectImageAlt(image.alt_text));
  const meta = parseProjectImageAlt(encoded?.alt_text);
  const externalCover = Boolean(coverImageUrl?.startsWith("https://") || coverImageUrl?.startsWith("http://"));
  if (!meta && !externalCover) return null;

  const licenseUrl = meta ? licenseUrlFor(meta.license) : null;

  return (
    <div className="container-page pt-5">
      <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-sm">
        <ImageIcon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
        <div className="min-w-0">
          <p className="font-medium text-foreground">Project / representative image</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            This image represents the residential project and is not a photograph of the specific unit being offered.
          </p>
          {meta ? (
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {meta.credit ? <>Credit: {meta.credit}. </> : null}
              {meta.license ? (
                licenseUrl ? <><a href={licenseUrl} target="_blank" rel="noreferrer" className="text-gold underline-offset-4 hover:underline">{meta.license}</a>. </> : <>License: {meta.license}. </>
              ) : null}
              {meta.sourceUrl ? <a href={meta.sourceUrl} target="_blank" rel="noreferrer" className="text-gold underline-offset-4 hover:underline">Image source</a> : null}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
