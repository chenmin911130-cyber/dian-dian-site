import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const credits = JSON.parse(
  fs.readFileSync(path.join(root, "public/images/article/credits.json"), "utf8"),
);
const bySrc = Object.fromEntries(credits.map((c) => [c.src, c]));

function credit(item, zh) {
  const href = item.commonsUrl || item.sourceUrl;
  return {
    text: zh ? `图片：${item.author} · ${item.license}` : `Photo: ${item.author} · ${item.license}`,
    href,
  };
}

const articlesPath = path.join(root, "src/articles.js");
let src = fs.readFileSync(articlesPath, "utf8");
const headerMatch = src.match(/^\/\*\*[\s\S]*?\*\/\s*/);
const header = headerMatch ? headerMatch[0] : "";
const body = src.slice(header.length).replace(/^export const articles\s*=\s*/, "").replace(/;\s*$/, "");
const articles = eval(`(${body})`);

const PATH_FIX = {
  "/images/article/tuition-invoice.jpg": "/images/article/tuition-invoice.png",
  "/images/article/visa-documents.jpg": "/images/article/visa-documents.png",
};

for (const article of articles) {
  if (article.image && PATH_FIX[article.image]) article.image = PATH_FIX[article.image];
  if (article.image && bySrc[article.image]) {
    const item = bySrc[article.image];
    article.imageCreditZh = credit(item, true);
    article.imageCreditEn = credit(item, false);
  }
  for (const blocks of [article.bodyZh, article.bodyEn]) {
    if (!blocks) continue;
    const zh = blocks === article.bodyZh;
    for (const block of blocks) {
      if (!block || block.type !== "image") continue;
      if (PATH_FIX[block.src]) block.src = PATH_FIX[block.src];
      const item = bySrc[block.src];
      if (item) block.credit = credit(item, zh);
    }
  }
}

fs.writeFileSync(articlesPath, `${header}export const articles = ${JSON.stringify(articles, null, 2)};\n`);
console.log("Synced credits and path fixes in articles.js");
