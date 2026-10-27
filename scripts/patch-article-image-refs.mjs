import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articlesPath = path.join(root, "src/articles.js");
const credits = JSON.parse(
  fs.readFileSync(path.join(root, "public/images/article/credits.json"), "utf8"),
);
const byId = Object.fromEntries(credits.map((c) => [c.id, c]));

function creditBlock(id, zh = true) {
  const item = byId[id];
  if (!item) throw new Error(`Unknown image id ${id}`);
  const href = item.commonsUrl || item.sourceUrl;
  return {
    text: zh
      ? `图片：${item.author} · ${item.license}`
      : `Photo: ${item.author} · ${item.license}`,
    href,
  };
}

function heroCredit(id) {
  return { imageCreditZh: creditBlock(id, true), imageCreditEn: creditBlock(id, false) };
}

const CITY_FLAT = {
  "school-auckland": "city-auckland",
  "school-aut": "city-aut",
  "school-waikato": "city-hamilton",
  "school-massey": "city-palmerston-north",
  "school-vuw": "city-wellington",
  "school-canterbury": "city-christchurch",
  "school-lincoln": "city-lincoln",
  "school-otago": "city-dunedin",
  "auckland-secondary-schools": "city-auckland-north",
};

const HERO = {
  "renting-guide": "rental-viewing",
  "international-student-gp-guide": "health-gp-clinic",
  "health-insurance-gp": "health-pharmacy",
  "bank-account-setup": "bank-branch",
  "supermarket-savings": "supermarket-shelves",
  "ird-work-hours": "payslip-tax",
  "student-visa-basics": "visa-airport",
  "nz-application-timeline": "calendar-planning",
  "english-test-guide": "ielts-study",
  "intake-deadlines-scholarships": "calendar-planning",
  "visa-scams-fake-degrees": "scam-warning",
  "offer-acceptance-checklist": "offer-envelope",
  "tuition-living-budget": "tuition-invoice",
  "post-study-work-visa": "graduation-cap",
  "student-visa-processing": "visa-documents",
  "seek-trademe-jobs": "job-hunt",
  "nz-cv-cover-letter": "job-hunt",
  "interview-star": "job-hunt",
  "short-term-graduate-work-visa": "graduation-cap",
  "skilled-migrant-category": "job-hunt",
  "green-list-residence": "job-hunt",
  "nz-monthly-budget": "supermarket-shelves",
  "nz-culture-etiquette": "culture-haka",
  "nz-weekend-social-activities": "weekend-hiking",
  "arrival-first-week": "visa-airport",
  "phone-sim-transport": "transport-bus",
  "used-car-driving-licence": "transport-bus",
  "school-yoobee": "lecture-auckland",
  "school-nzse": "lecture-auckland",
  "school-future-skills": "lecture-canterbury",
};

const VISA_BY_SLUG = {
  "nz-application-timeline": "calendar-planning",
  "student-visa-basics": "visa-documents",
  "english-test-guide": "ielts-study",
  "offer-acceptance-checklist": "offer-envelope",
  "school-future-skills": "offer-envelope",
  "post-study-work-visa": "graduation-cap",
  "intake-deadlines-scholarships": "calendar-planning",
  "visa-scams-fake-degrees": "scam-warning",
  "student-visa-processing": "visa-documents",
  "bank-account-setup": "bank-branch",
  "health-insurance-gp": "health-gp-clinic",
  "ird-work-hours": "tax-form",
};

const FLAT_BY_SLUG = {
  "student-visa-basics": "flat-share",
  "tuition-living-budget": "city-auckland",
  "nz-monthly-budget": "flat-share",
  "renting-guide": "rental-viewing",
  "health-insurance-gp": "health-pharmacy",
};

const TRANSPORT_SLUGS = new Set([
  "bank-account-setup",
  "phone-sim-transport",
  "arrival-first-week",
  "used-car-driving-licence",
]);

const JOB_SLUGS_IRD = new Set(["ird-work-hours"]);

let src = fs.readFileSync(articlesPath, "utf8");
const headerMatch = src.match(/^\/\*\*[\s\S]*?\*\/\s*/);
const header = headerMatch ? headerMatch[0] : "";
const body = src.slice(header.length).replace(/^export const articles\s*=\s*/, "").replace(/;\s*$/, "");
const articles = eval(`(${body})`);

for (const article of articles) {
  const slug = article.slug;
  if (HERO[slug]) {
    const id = HERO[slug];
    article.image = byId[id].src;
    Object.assign(article, heroCredit(id));
  }

  const patchBody = (blocks, zh) => {
    if (!blocks) return;
    for (const block of blocks) {
      if (!block || block.type !== "image") continue;
      const srcPath = block.src;

      if (srcPath === "/images/campus/ai-lecture.webp") {
        block.src = byId["lecture-auckland"].src;
        block.credit = creditBlock("lecture-auckland", zh);
        if (zh) {
          block.caption =
            "奥克兰大学钟楼一带校园实景（研究型大学课堂与私立技能学院不是同一条赛道）。";
        } else {
          block.caption =
            "University of Auckland campus (research universities are a different track from private skills colleges).";
        }
      }

      if (
        srcPath === "/images/campus/uni-canterbury.webp" &&
        (slug === "nz-ai-masters-overview" || slug === "nz-foundation-for-gaokao-students")
      ) {
        block.src = byId["lecture-canterbury"].src;
        block.credit = creditBlock("lecture-canterbury", zh);
        if (slug === "nz-ai-masters-overview") {
          if (zh) {
            block.alt = "坎特伯雷大学 James Hight 楼";
            block.caption =
              "坎特伯雷大学 Puaka–James Hight 一带校园实景；授课型 AI 硕士与线上 MAAI 的国际政策要分开核对。";
          } else {
            block.alt = "University of Canterbury James Hight building";
            block.caption =
              "University of Canterbury campus; taught AI master’s and the online MAAI have separate international policies.";
          }
        }
      }

      if (srcPath === "/images/article-shared-flat.png") {
        const id = CITY_FLAT[slug] || FLAT_BY_SLUG[slug];
        if (id) {
          block.src = byId[id].src;
          block.credit = creditBlock(id, zh);
        }
      }

      if (srcPath === "/images/article-visa-docs.png" && VISA_BY_SLUG[slug]) {
        const id = VISA_BY_SLUG[slug];
        block.src = byId[id].src;
        block.credit = creditBlock(id, zh);
      }

      if (srcPath === "/images/article-transport.png") {
        const id = slug === "bank-account-setup" ? "bank-card" : "transport-bus";
        if (TRANSPORT_SLUGS.has(slug) || slug === "bank-account-setup") {
          block.src = byId[id].src;
          block.credit = creditBlock(id, zh);
        }
      }

      if (srcPath === "/images/article-job-search.png" && JOB_SLUGS_IRD.has(slug)) {
        block.src = byId["payslip-tax"].src;
        block.credit = creditBlock("payslip-tax", zh);
      }

      if (srcPath === "/images/life-feature.png" && (slug === "nz-culture-etiquette" || slug === "nz-weekend-social-activities")) {
        const id = slug === "nz-culture-etiquette" ? "culture-haka" : "weekend-hiking";
        block.src = byId[id].src;
        block.credit = creditBlock(id, zh);
      }
    }
  };

  patchBody(article.bodyZh, true);
  patchBody(article.bodyEn, false);
}

const out =
  header +
  `export const articles = ${JSON.stringify(articles, null, 2)};\n`;
fs.writeFileSync(articlesPath, out);
console.log("Patched", articlesPath);
