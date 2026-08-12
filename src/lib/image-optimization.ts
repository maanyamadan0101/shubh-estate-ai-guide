const DEFAULT_QUALITY = 72;

function canUseVercelImageOptimization(src: string) {
  return src.startsWith("/api/public/img/") || src.startsWith("/assets/");
}

export function vercelImageUrl(src: string, width: number, quality = DEFAULT_QUALITY) {
  if (!canUseVercelImageOptimization(src)) return src;
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

export function vercelSrcSet(
  src: string,
  widths: number[],
  quality = DEFAULT_QUALITY,
): string | undefined {
  if (!canUseVercelImageOptimization(src)) return undefined;

  return [...new Set(widths)]
    .sort((a, b) => a - b)
    .map((width) => `${vercelImageUrl(src, width, quality)} ${width}w`)
    .join(", ");
}
