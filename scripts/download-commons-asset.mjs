import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const UA = "DianDianSite/1.0 (NZ study consulting; https://diandianyudita.com/)";

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function apiInfo(title) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    titles: `File:${title}`,
    prop: "imageinfo",
    iiprop: "url|extmetadata|size|mime",
    iiurlwidth: "1920",
    format: "json",
  }).toString();
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`API ${res.status} for ${title}`);
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  if (page.missing) throw new Error(`Missing file: ${title}`);
  if (!page?.imageinfo?.[0]) throw new Error(`No imageinfo for ${title}`);
  return page.imageinfo[0];
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Download ${res.status} ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

export async function fetchCommonsToFile(commonsTitle, destPath) {
  const info = await apiInfo(commonsTitle);
  const meta = info.extmetadata || {};
  const license = meta.LicenseShortName?.value || meta.License?.value || "Unknown";
  const allowed = /^(Public domain|CC0|CC BY|CC BY-SA|PD)/i.test(license);
  if (!allowed) throw new Error(`Incompatible licence ${license} for ${commonsTitle}`);
  const author = stripHtml(meta.Artist?.value || meta.Credit?.value || "Unknown").slice(0, 120);
  const downloadUrl = info.thumburl || info.url;
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  await download(downloadUrl, destPath);
  const bytes = fs.statSync(destPath).size;
  return {
    commonsTitle,
    commonsUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(commonsTitle.replaceAll(" ", "_"))}`,
    author,
    license,
    bytes,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [, , title, dest] = process.argv.slice(2);
  if (!title || !dest) {
    console.error("Usage: node download-commons-asset.mjs <CommonsFileTitle> <destPath>");
    process.exit(1);
  }
  const meta = await fetchCommonsToFile(title, dest);
  console.log(JSON.stringify(meta, null, 2));
}
