export const PROJECT_IMAGE_PREFIX = "[PROJECT_IMAGE]";

export type ProjectImageMeta = {
  description: string;
  credit: string;
  license: string;
  sourceUrl: string;
};

export function isRepresentativeProjectImage(url: string | null | undefined, altText?: string | null) {
  return Boolean(altText?.startsWith(PROJECT_IMAGE_PREFIX) || url?.startsWith("https://") || url?.startsWith("http://"));
}

export function isReusableImageLicense(value: string) {
  return /public\s*domain|\bcc0\b|cc\s*by(?:-sa)?|creative\s*commons|open\s*government\s*licen[cs]e|\bogl\b/i.test(value);
}

export function encodeProjectImageAlt(meta: ProjectImageMeta) {
  const description = meta.description.replace(/\s+/g, " ").trim().slice(0, 105);
  const credit = meta.credit.replace(/\s+/g, " ").trim().slice(0, 60);
  const license = meta.license.replace(/\s+/g, " ").trim().slice(0, 40);
  const sourceUrl = meta.sourceUrl.trim().slice(0, 120);
  return `${PROJECT_IMAGE_PREFIX} ${description} || Credit: ${credit} || License: ${license} || Source: ${sourceUrl}`.slice(0, 300);
}

export function parseProjectImageAlt(value: string | null | undefined): ProjectImageMeta | null {
  if (!value?.startsWith(PROJECT_IMAGE_PREFIX)) return null;
  const body = value.slice(PROJECT_IMAGE_PREFIX.length).trim();
  const parts = body.split("||").map((part) => part.trim());
  const description = parts[0] || "Representative project image";
  const credit = parts.find((part) => part.startsWith("Credit:"))?.replace(/^Credit:\s*/, "") ?? "";
  const license = parts.find((part) => part.startsWith("License:"))?.replace(/^License:\s*/, "") ?? "";
  const sourceUrl = parts.find((part) => part.startsWith("Source:"))?.replace(/^Source:\s*/, "") ?? "";
  return { description, credit, license, sourceUrl };
}

export function licenseUrlFor(license: string) {
  const text = license.toLowerCase();
  if (text.includes("cc by-sa 4.0") || text.includes("attribution-sharealike 4.0")) return "https://creativecommons.org/licenses/by-sa/4.0/";
  if (text.includes("cc by 4.0") || text.includes("attribution 4.0")) return "https://creativecommons.org/licenses/by/4.0/";
  if (text.includes("cc0")) return "https://creativecommons.org/publicdomain/zero/1.0/";
  if (text.includes("open government") || /\bogl\b/.test(text)) return "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/";
  return null;
}
