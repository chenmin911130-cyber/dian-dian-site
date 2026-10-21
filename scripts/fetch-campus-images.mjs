import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const OUT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/images/campus",
);

const FILES = [
  { id: "uni-auckland", title: "Clock Tower, University of Auckland.jpg" },
  { id: "uni-aut", title: "North Campus.jpg" },
  { id: "uni-waikato", title: "University of Waikato village green.jpg" },
  { id: "uni-massey", title: "Massey University, Palmerston North Campus, New Zealand 03.jpg" },
  { id: "uni-massey-albany", title: "Massey University, Albany Campus I.jpg" },
  { id: "uni-vuw", title: "Hunter VUW.jpg" },
  { id: "uni-canterbury", title: "Ilam Fields University of Canterbury New Zealand 2007.jpg" },
  { id: "uni-lincoln", title: "Ivey Hall, Lincoln University, New Zealand.jpg" },
  { id: "uni-otago", title: "University of Otago Clocktower. NZ (22954035383).jpg" },
  { id: "hs-grammar", title: "Auckland Grammar School, East Part.jpg" },
  { id: "hs-epsom", title: "Epsom Girls' Grammar School.jpg" },
  { id: "hs-mags", title: "NZ AK Mt Albert Grammar School (4).jpg" },
  { id: "hs-westlake-girls", title: "Westlake Girls' High School 20230823 131801.jpg" },
  { id: "hs-rangitoto", title: "Maths Building, Rangitoto College, Auckland 20100211 1.jpg" },
  { id: "hs-macleans", title: "Macleans college Auckland New Zealand front office.jpg" },
  { id: "hs-diocesan", title: "Diocesan School for Girls, Auckland (cropped).jpg" },
  { id: "hs-stcuthberts", title: "Saint Cuthbert's College, Epsom, Auckland.jpg" },
  { id: "hs-kings", title: "King's College Chapel and Charles Thomas Major Statue.jpg" },
  { id: "hs-pinehurst", title: "Pinehurst School, Albany - Reception.jpg" },
  { id: "hs-westlake-boys", title: "Quad Panorama.jpg" },
  { id: "hs-takapuna", title: "Aerial view, Belmont, 1992 (Takapuna Grammar).jpg" },
  { id: "street-queen", title: "Queen Street, Auckland PA01.jpg" },
  { id: "ai-lecture", title: "Mathematics lecture at the Helsinki University of Technology.jpg" },
  { id: "ai-lab", title: "A computer science classroom at Lee University in Cleveland, Tennessee, United States 02.jpg" },
];

const UA = "DianDianSite/1.0 (NZ study consulting; https://diandianyudita.com/)";

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const AUTHOR_CLEAN = {
  "uni-otago": "Bernard Spragg. NZ",
  "hs-macleans": "EryZ",
  "hs-takapuna": "Auckland Libraries",
};

function cleanAuthor(raw, id) {
  if (AUTHOR_CLEAN[id]) return AUTHOR_CLEAN[id];
  let text = stripHtml(raw);
  text = text.replace(/^User:\s*/i, "");
  if (text.length > 80) text = text.slice(0, 77) + "…";
  return text || "Unknown";
}

async function apiInfo(title) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    titles: `File:${title}`,
    prop: "imageinfo",
    iiprop: "url|extmetadata|size|mime",
    iiurlwidth: "1600",
    format: "json",
  }).toString();
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`API ${res.status} for ${title}`);
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  if (!page?.imageinfo?.[0]) throw new Error(`No imageinfo for ${title}`);
  return page.imageinfo[0];
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Download ${res.status} ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const credits = [];

for (const item of FILES) {
  process.stdout.write(`${item.id}… `);
  const info = await apiInfo(item.title);
  const meta = info.extmetadata || {};
  const license = meta.LicenseShortName?.value || meta.License?.value || "Unknown";
  const allowed = /^(Public domain|CC0|CC BY|CC BY-SA|PD)/i.test(license);
  if (!allowed) throw new Error(`Incompatible licence ${license} for ${item.title}`);
  const author = cleanAuthor(meta.Artist?.value || meta.Credit?.value, item.id);
  const downloadUrl = info.thumburl || info.url;
  const tmp = path.join(OUT_DIR, `${item.id}.src`);
  const webp = path.join(OUT_DIR, `${item.id}.webp`);
  await download(downloadUrl, tmp);
  const tall = info.height && info.width && info.height > info.width * 1.25;
  const vf = tall
    ? "crop=iw:iw*0.62:0:ih*0.08,scale='min(1400,iw)':-2"
    : "scale='min(1400,iw)':-2";
  const result = spawnSync(
    "ffmpeg",
    ["-y", "-i", tmp, "-vf", vf, "-c:v", "libwebp", "-quality", "72", webp],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${tmp}: ${result.stderr}`);
  }
  fs.unlinkSync(tmp);
  const bytes = fs.statSync(webp).size;
  const credit = {
    id: item.id,
    src: `/images/campus/${item.id}.webp`,
    commonsTitle: item.title,
    commonsUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(item.title.replaceAll(" ", "_"))}`,
    author,
    license,
    bytes,
  };
  credits.push(credit);
  console.log(`${license} · ${author} · ${(bytes / 1024).toFixed(0)}KB`);
}

fs.writeFileSync(path.join(OUT_DIR, "credits.json"), `${JSON.stringify(credits, null, 2)}\n`);
console.log("Wrote", credits.length, "images to", OUT_DIR);
