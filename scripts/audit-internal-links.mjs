import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../src", import.meta.url));
const extensions = new Set([".ts", ".tsx", ".js", ".jsx"]);
const findings = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (extensions.has(path.slice(path.lastIndexOf(".")))) inspect(path);
  }
}

function inspect(path) {
  const source = readFileSync(path, "utf8");
  const lineOf = (offset) => source.slice(0, offset).split("\n").length;
  const checks = [
    { pattern: /(?:href|to)\s*=\s*["']https?:\/\/[^"']+/g, reason: "hard-coded absolute internal URL" },
    { pattern: /(?:href|to)\s*=\s*["'][^"']*(?:utm_|gclid|fbclid|dclid|msclkid|mc_cid|mc_eid)[^"']*/gi, reason: "tracking parameter in internal link" },
    { pattern: /(?:href|to)\s*=\s*["'][^"']*(?:\/properties(?:\?|\/)|\/sell-property-in-gurgaon|\/property-for-sale-in-gurgaon|\/home-loan(?:["'?/]|$)|\/nri(?:["'?/]|$))[^"']*/g, reason: "legacy or redirecting internal path" },
    { pattern: /(?:href|to)\s*=\s*["']\/[^"']+\/$/gm, reason: "trailing-slash internal path" },
  ];
  for (const { pattern, reason } of checks) {
    for (const match of source.matchAll(pattern)) {
      findings.push({ file: relative(process.cwd(), path), line: lineOf(match.index ?? 0), reason, value: match[0] });
    }
  }
}

walk(root);
if (findings.length) {
  console.error("SEO internal-link audit failed:");
  for (const item of findings) console.error(`- ${item.file}:${item.line} ${item.reason}: ${item.value}`);
  process.exitCode = 1;
} else {
  console.log("PASS: no absolute, tracking, legacy, or trailing-slash internal links found.");
}
