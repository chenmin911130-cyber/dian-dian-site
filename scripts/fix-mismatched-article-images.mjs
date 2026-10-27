import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchCommonsToFile } from "./download-commons-asset.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articleDir = path.join(root, "public/images/article");
const creditsPath = path.join(articleDir, "credits.json");

/** id -> { commonsTitle, file (basename under article/) } */
const REPLACEMENTS = [
  {
    id: "tax-form",
    file: "tax-form.jpg",
    commonsTitle: "Form 4868, 2010, with pen glasses phone.jpg",
  },
  {
    id: "bank-branch",
    file: "bank-branch.jpg",
    commonsTitle: "ANZ Bank Newton, Auckland PA01.jpg",
  },
  {
    id: "offer-envelope",
    file: "offer-envelope.jpg",
    commonsTitle: "Letter from President Theodore Roosevelt with an envelope, 1909.jpg",
  },
  {
    id: "tuition-invoice",
    file: "tuition-invoice.png",
    commonsTitle: "Tuition-fee-breakdown-sample.png",
  },
  {
    id: "transport-bus",
    file: "transport-bus.jpg",
    commonsTitle: "Go Bus bus in Howick, Auckland.jpg",
  },
  {
    id: "culture-haka",
    file: "culture-haka.jpg",
    commonsTitle: "All Blacks Haka at Westpac Stadium, Wellington, NZ.jpg",
  },
  {
    id: "city-wellington",
    file: "city-wellington.jpg",
    commonsTitle: "Cuba Street, 2013 (06).jpg",
  },
  {
    id: "city-aut",
    file: "city-aut.jpg",
    commonsTitle: "North Campus.jpg",
  },
  {
    id: "payslip-tax",
    file: "payslip-tax.jpg",
    commonsTitle: "Metropolitan Police 1955 Payslip.jpg",
  },
  {
    id: "visa-airport",
    file: "visa-airport.jpg",
    commonsTitle: "Auckland Airport In Main Hall.jpg",
  },
  {
    id: "ielts-study",
    file: "ielts-study.jpg",
    commonsTitle: "Smiling Student Working on Assignments at Desk.jpg",
  },
  {
    id: "visa-documents",
    file: "visa-documents.png",
    commonsTitle: "New Zealand Official Passport Outside Front Cover.png",
  },
  {
    id: "supermarket-shelves",
    file: "supermarket-shelves.jpg",
    commonsTitle: "Woolworths South Dunedin supermarket, 10 Dec 2025.jpg",
  },
  {
    id: "rental-viewing",
    file: "rental-viewing.jpg",
    commonsTitle: "View of a suburban house (AM 82113-1).jpg",
  },
];

const credits = JSON.parse(fs.readFileSync(creditsPath, "utf8"));
const byId = Object.fromEntries(credits.map((c) => [c.id, c]));

for (const item of REPLACEMENTS) {
  const dest = path.join(articleDir, item.file);
  console.log(`Fetching ${item.id}…`);
  const meta = await fetchCommonsToFile(item.commonsTitle, dest);
  const old = byId[item.id];
  const entry = {
    id: item.id,
    src: `/images/article/${item.file}`,
    commonsTitle: meta.commonsTitle,
    commonsUrl: meta.commonsUrl,
    author: meta.author,
    license: meta.license,
    bytes: meta.bytes,
  };
  if (old && old.src !== entry.src && fs.existsSync(path.join(articleDir, path.basename(old.src)))) {
    console.log(`  (old file left on disk: ${old.src})`);
  }
  const idx = credits.findIndex((c) => c.id === item.id);
  if (idx >= 0) credits[idx] = entry;
  else credits.push(entry);
  await new Promise((r) => setTimeout(r, 500));
}

fs.writeFileSync(creditsPath, `${JSON.stringify(credits, null, 2)}\n`);
console.log("Updated credits.json");
