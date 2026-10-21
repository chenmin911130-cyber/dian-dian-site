import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fig } from "./article-kit.mjs";

const AUTHOR_CLEAN = {
  "uni-otago": "Bernard Spragg. NZ",
  "hs-macleans": "EryZ",
  "hs-takapuna": "Auckland Libraries",
};

const credits = JSON.parse(
  fs.readFileSync(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../public/images/campus/credits.json",
    ),
    "utf8",
  ),
);

export const CAMPUS = Object.fromEntries(
  credits.map((item) => [
    item.id,
    { ...item, author: AUTHOR_CLEAN[item.id] || item.author },
  ]),
);

export function campusCredit(id, zh = true) {
  const item = CAMPUS[id];
  if (!item) throw new Error(`Unknown campus image: ${id}`);
  return {
    text: zh
      ? `图片：${item.author} · ${item.license}`
      : `Photo: ${item.author} · ${item.license}`,
    href: item.commonsUrl,
  };
}

export function campusHero(id) {
  const item = CAMPUS[id];
  if (!item) throw new Error(`Unknown campus image: ${id}`);
  return {
    image: item.src,
    imageCreditZh: campusCredit(id, true),
    imageCreditEn: campusCredit(id, false),
  };
}

export function campusFig(id, alt, caption, zh = true) {
  const item = CAMPUS[id];
  if (!item) throw new Error(`Unknown campus image: ${id}`);
  return fig(item.src, alt, caption, campusCredit(id, zh));
}
