import ts from "typescript";
import { readFileSync, mkdirSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
const root = fileURLToPath(new URL("..", import.meta.url));
const dir = mkdtempSync(tmpdir() + "/shubh-seo-");
process.on("exit", () => rmSync(dir, { recursive: true, force: true }));
mkdirSync(dir + "/lib", { recursive: true });
mkdirSync(dir + "/data", { recursive: true });
for (const file of ["lib/seo", "lib/url-routing", "data/dwarka-catalogue-listings"]) {
  const source = readFileSync(`${root}/src/${file}.ts`, "utf8")
    .replace('"./seo"', '"./seo.mjs"')
    .replace('"../data/dwarka-catalogue-listings"', '"../data/dwarka-catalogue-listings.mjs"');
  writeFileSync(
    `${dir}/${file}.mjs`,
    ts.transpileModule(source, {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
    }).outputText,
  );
}
const { canonicalRedirect, internalHref } = await import(dir + "/lib/url-routing.mjs");
const { buildCanonical } = await import(dir + "/lib/seo.mjs");
assert.equal(buildCanonical("example"), "https://shubhestatebroker.in/property/example");
for (const [from, to] of [
  [
    "http://www.shubhestatebroker.in/sell-property-in-gurgaon/",
    "https://shubhestatebroker.in/sell-property-gurgaon",
  ],
  [
    "https://www.shubhestatebroker.in/nri/australia/?utm_source=x",
    "https://shubhestatebroker.in/nri-sell-property-gurgaon",
  ],
  [
    "https://shubhestatebroker.in/properties/?purpose=sale&page=2",
    "https://shubhestatebroker.in/flats-for-sale-in-gurgaon?purpose=sale&page=2",
  ],
  [
    "https://www.shubhestatebroker.in/property/indiabulls-enigma-inventory-1",
    "https://shubhestatebroker.in/dwarka-expressway-flats-for-sale-gurgaon#indiabulls-enigma",
  ],
  ["https://preview.vercel.app/home-loan/", "https://preview.vercel.app/home-loans"],
  ["http://shubhestatebroker.in/", "https://shubhestatebroker.in/"],
]) {
  const response = canonicalRedirect(new Request(from));
  assert.equal(response?.status, 301);
  assert.equal(response.headers.get("location"), to);
  assert.equal(canonicalRedirect(new Request(to.replace(/#.*$/, ""))), null);
}
for (const url of [
  "https://shubhestatebroker.in/",
  "https://shubhestatebroker.in/locations/southern-peripheral-road",
  "https://shubhestatebroker.in/sitemap.xml",
  "https://shubhestatebroker.in/robots.txt",
  "https://preview.vercel.app/",
  "http://localhost:3000/",
])
  assert.equal(canonicalRedirect(new Request(url)), null);
assert.equal(
  canonicalRedirect(
    new Request("https://www.shubhestatebroker.in/api/enquiry", { method: "POST" }),
  ),
  null,
);
assert.equal(internalHref("https://www.shubhestatebroker.in/home-loan/"), "/home-loans");
assert.equal(internalHref("https://example.com/a/"), "https://example.com/a/");
console.log(
  "PASS: canonical origin, one-hop legacy redirects, destination stability, relative links, preview hosts and POST preservation",
);

// Exercise the real sitemap handler with duplicate and redirecting fixture rows.
let sitemapSource = readFileSync(`${root}/src/routes/sitemap[.]xml.ts`, "utf8")
  .replace(
    'import { internalHref } from "@/lib/url-routing";',
    'import { internalHref } from "./lib/url-routing.mjs";',
  )
  .replace(
    'import { SITE_ORIGIN } from "@/lib/seo";',
    'import { SITE_ORIGIN } from "./lib/seo.mjs";',
  )
  .replace(
    'import { createFileRoute } from "@tanstack/react-router";',
    "const createFileRoute = () => (options) => options;",
  )
  .replace(
    'import { listProjectHubSitemapEntries } from "@/lib/project-hub.functions";',
    `const listProjectHubSitemapEntries = async () => [{slug:"bptp-astaire-gardens-sector-70a"}, {slug:"example-project"}, {slug:"example-project"}];`,
  )
  .replace(
    'import { listSitemapProperties } from "@/lib/properties.functions";',
    `const listSitemapProperties = async () => [{slug:"indiabulls-enigma-inventory-1"}, {slug:"example", cover_image_url:"/image.jpg?a=1&b=2"}, {slug:"example"}];`,
  );
writeFileSync(
  `${dir}/sitemap.mjs`,
  ts.transpileModule(sitemapSource, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
  }).outputText,
);
const { Route } = await import(`${dir}/sitemap.mjs`);
const response = await Route.server.handlers.GET();
assert.equal(response.status, 200);
assert.match(response.headers.get("content-type"), /application\/xml/);
const xml = await response.text();
const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(locations.length, new Set(locations).size);
for (const loc of locations) {
  assert.ok(loc.startsWith("https://shubhestatebroker.in/"));
  assert.equal(canonicalRedirect(new Request(loc)), null);
}
assert.ok(locations.includes("https://shubhestatebroker.in/locations/southern-peripheral-road"));
assert.ok(locations.includes("https://shubhestatebroker.in/property/example"));
assert.ok(!xml.includes("indiabulls-enigma-inventory-1"));
assert.ok(
  !locations.includes("https://shubhestatebroker.in/projects/bptp-astaire-gardens-sector-70a"),
);
assert.ok(xml.includes("image.jpg?a=1&amp;b=2"));
assert.match(
  readFileSync(`${root}/public/robots.txt`, "utf8"),
  /Sitemap: https:\/\/shubhestatebroker\.in\/sitemap\.xml/,
);
console.log(
  `PASS: sitemap handler, ${locations.length} unique final URLs, alias exclusions, XML escaping and robots sitemap declaration`,
);
