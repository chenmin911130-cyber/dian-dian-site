import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/images/article",
);

const UA = "DianDianSite/1.0 (NZ study consulting; https://diandianyudita.com/)";

/** @type {{ id: string, file: string, commonsTitle?: string, directUrl?: string, author: string, license: string, sourceUrl: string }[]} */
const FILES = [
  {
    id: "city-auckland",
    file: "city-auckland.jpg",
    commonsTitle: "Queen Street, Auckland PA01.jpg",
    author: "Russell Street",
    license: "CC BY-SA 3.0",
  },
  {
    id: "city-aut",
    file: "city-aut.jpg",
    commonsTitle: "Hobson Street, Auckland City.jpg",
    author: "Russell Street",
    license: "CC BY-SA 3.0",
  },
  {
    id: "city-hamilton",
    file: "city-hamilton.jpg",
    commonsTitle: "Rail track Hamilton, Hamilton city, New Zealand.jpg",
    author: "Michal Klajban",
    license: "CC BY-SA 4.0",
  },
  {
    id: "city-palmerston-north",
    file: "city-palmerston-north.jpg",
    commonsTitle: "The Square, Palmerston North, North Island, New Zealand.jpg",
    author: "Michal Klajban",
    license: "CC BY-SA 4.0",
  },
  {
    id: "city-wellington",
    file: "city-wellington.jpg",
    commonsTitle: "Cuba Street, Wellington by Sam Cairncross.jpg",
    author: "Nigel Cross",
    license: "CC BY 2.0",
  },
  {
    id: "city-christchurch",
    file: "city-christchurch.jpg",
    commonsTitle: "Tram tracks on Cathedral Square, Christchurch, New Zealand.jpg",
    author: "Jocelyn Kinghorn",
    license: "CC BY 2.0",
  },
  {
    id: "city-lincoln",
    file: "city-lincoln.jpg",
    commonsTitle: "Union Church Lincoln, NZ FZ200; 2014.jpg",
    author: "Michal Klajban",
    license: "CC BY-SA 4.0",
  },
  {
    id: "city-dunedin",
    file: "city-dunedin.jpg",
    commonsTitle: "Dunedin Railway Station Full Exterior.jpg",
    author: "Bernard Spragg. NZ",
    license: "CC0",
  },
  {
    id: "city-auckland-north",
    file: "city-auckland-north.jpg",
    commonsTitle: "Takapuna, North Shore City, Auckland, New Zealand.jpg",
    author: "Ingolfson",
    license: "Public domain",
  },
  {
    id: "health-pharmacy",
    file: "health-pharmacy.jpg",
    commonsTitle: "Unichem Pharmacy Cuba.jpg",
    author: "Ingolfson",
    license: "Public domain",
  },
  {
    id: "health-gp-clinic",
    file: "health-gp-clinic.jpg",
    commonsTitle: "North Avon Medical Centre & Pharmacy, Richmond, Christchurch, New Zealand.jpg",
    author: "Ingolfson",
    license: "Public domain",
  },
  {
    id: "visa-airport",
    file: "visa-airport.jpg",
    directUrl:
      "https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "JESHOOTS.com",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/people-walking-inside-airport-912050/",
  },
  {
    id: "visa-documents",
    file: "visa-documents.jpg",
    author: "Pexels",
    license: "Pexels License",
    directUrl:
      "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sourceUrl: "https://www.pexels.com/photo/blue-passport-on-top-of-white-paper-4484078/",
  },
  {
    id: "calendar-planning",
    file: "calendar-planning.jpg",
    commonsTitle: "Calendar (PSF).jpg",
    author: "Pbroks13",
    license: "Public domain",
  },
  {
    id: "bank-branch",
    file: "bank-branch.jpg",
    directUrl:
      "https://images.pexels.com/photos/509092/pexels-photo-509092.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Expect Best",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/low-angle-photo-of-city-buildings-509092/",
  },
  {
    id: "bank-card",
    file: "bank-card.jpg",
    directUrl:
      "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Pixabay",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/person-holding-credit-card-50987/",
  },
  {
    id: "ielts-study",
    file: "ielts-study.jpg",
    directUrl:
      "https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Stux",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/person-writing-on-notebook-256520/",
  },
  {
    id: "offer-envelope",
    file: "offer-envelope.jpg",
    directUrl:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Karolina Grabowska",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/person-holding-white-envelope-7688336/",
  },
  {
    id: "tuition-invoice",
    file: "tuition-invoice.jpg",
    directUrl:
      "https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Karolina Grabowska",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/person-holding-white-paper-6863332/",
  },
  {
    id: "rental-viewing",
    file: "rental-viewing.jpg",
    directUrl:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Pixabay",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/modern-house-with-landscape-106399/",
  },
  {
    id: "flat-share",
    file: "flat-share.jpg",
    directUrl:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Quang Nguyen Vinh",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/modern-living-room-1571460/",
  },
  {
    id: "supermarket-shelves",
    file: "supermarket-shelves.jpg",
    directUrl:
      "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Mike",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/assorted-fruits-and-vegetables-on-display-264636/",
  },
  {
    id: "transport-bus",
    file: "transport-bus.jpg",
    directUrl:
      "https://images.pexels.com/photos/209900/pexels-photo-209900.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Pixabay",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/white-and-red-bus-on-road-during-daytime-209900/",
  },
  {
    id: "payslip-tax",
    file: "payslip-tax.jpg",
    directUrl:
      "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Lukas",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/person-holding-white-paper-4386321/",
  },
  {
    id: "tax-form",
    file: "tax-form.jpg",
    directUrl:
      "https://images.pexels.com/photos/6864961/pexels-photo-6864961.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Karolina Grabowska",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/person-writing-on-white-paper-6864961/",
  },
  {
    id: "job-hunt",
    file: "job-hunt.jpg",
    directUrl:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "fauxels",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/people-sitting-on-chairs-3184465/",
  },
  {
    id: "lecture-auckland",
    file: "lecture-auckland.jpg",
    commonsTitle: "Clock Tower, University of Auckland.jpg",
    author: "Uhooep",
    license: "CC BY-SA 4.0",
  },
  {
    id: "lecture-canterbury",
    file: "lecture-canterbury.jpg",
    commonsTitle: "James Hight Building 003.JPG",
    author: "Michal Klajban",
    license: "CC BY-SA 4.0",
  },
  {
    id: "culture-haka",
    file: "culture-haka.jpg",
    commonsTitle: "Haka for Lillian Hetet-Owen (31659287718).jpg",
    author: "New Zealand Defence Force",
    license: "CC BY 4.0",
  },
  {
    id: "weekend-hiking",
    file: "weekend-hiking.jpg",
    commonsTitle: "Tongariro Alpine Crossing.jpg",
    author: "Michal Klajban",
    license: "CC BY-SA 4.0",
  },
  {
    id: "scam-warning",
    file: "scam-warning.jpg",
    directUrl:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Pixabay",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/padlock-on-laptop-keyboard-60504/",
  },
  {
    id: "graduation-cap",
    file: "graduation-cap.jpg",
    directUrl:
      "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600",
    author: "Pixabay",
    license: "Pexels License",
    sourceUrl: "https://www.pexels.com/photo/graduates-throwing-their-hats-in-the-air-267885/",
  },
];

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
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
    iiurlwidth: "1600",
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

fs.mkdirSync(OUT_DIR, { recursive: true });
const credits = [];

for (const item of FILES) {
  process.stdout.write(`${item.id}… `);
  const dest = path.join(OUT_DIR, item.file);
  let downloadUrl;
  let commonsUrl = item.sourceUrl;
  let author = item.author;
  let license = item.license;
  let bytes;

  if (item.commonsTitle) {
    const info = await apiInfo(item.commonsTitle);
    const meta = info.extmetadata || {};
    license = meta.LicenseShortName?.value || license;
    const allowed = /^(Public domain|CC0|CC BY|CC BY-SA|PD)/i.test(license);
    if (!allowed) throw new Error(`Incompatible licence ${license} for ${item.commonsTitle}`);
    author = stripHtml(meta.Artist?.value || meta.Credit?.value || author).slice(0, 80) || author;
    downloadUrl = info.thumburl || info.url;
    commonsUrl = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(item.commonsTitle.replaceAll(" ", "_"))}`;
  } else if (item.directUrl) {
    downloadUrl = item.directUrl;
    commonsUrl = item.sourceUrl;
  } else {
    throw new Error(`No source for ${item.id}`);
  }

  await download(downloadUrl, dest);
  bytes = fs.statSync(dest).size;
  credits.push({
    id: item.id,
    src: `/images/article/${item.file}`,
    ...(item.commonsTitle ? { commonsTitle: item.commonsTitle, commonsUrl } : { sourceUrl: commonsUrl }),
    author,
    license,
    bytes,
  });
  console.log(`${license} · ${author} · ${(bytes / 1024).toFixed(0)}KB`);
  await new Promise((r) => setTimeout(r, 350));
}

fs.writeFileSync(path.join(OUT_DIR, "credits.json"), `${JSON.stringify(credits, null, 2)}\n`);
console.log("Wrote", credits.length, "images to", OUT_DIR);
