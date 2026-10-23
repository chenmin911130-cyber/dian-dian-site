/** Display rank for list/featured surfaces. Lower index = more useful + higher click appeal. */
export const ARTICLE_ORDER = [
  "international-student-gp-guide",
  "student-visa-basics",
  "nz-monthly-budget",
  "tuition-living-budget",
  "renting-guide",
  "arrival-first-week",
  "health-insurance-gp",
  "nz-universities-overview",
  "nz-application-timeline",
  "english-test-guide",
  "offer-acceptance-checklist",
  "student-visa-processing",
  "visa-scams-fake-degrees",
  "bank-account-setup",
  "phone-sim-transport",
  "seek-trademe-jobs",
  "ird-work-hours",
  "nz-popular-courses-2026",
  "nz-foundation-for-gaokao-students",
  "post-study-work-visa",
  "short-term-graduate-work-visa",
  "school-auckland",
  "school-aut",
  "school-otago",
  "school-canterbury",
  "school-vuw",
  "school-massey",
  "school-waikato",
  "school-lincoln",
  "auckland-secondary-schools",
  "nz-cv-cover-letter",
  "interview-star",
  "supermarket-savings",
  "intake-deadlines-scholarships",
  "nz-culture-etiquette",
  "used-car-driving-licence",
  "school-auckland-grammar",
  "school-epsom-girls",
  "school-mags",
  "school-westlake-girls",
  "school-rangitoto",
  "school-macleans",
  "school-diocesan",
  "school-st-cuthberts",
  "school-kings-college",
  "school-pinehurst",
  "school-westlake-takapuna",
  "nz-ai-masters-overview",
  "massey-ai-business-it",
  "school-yoobee",
  "school-nzse",
  "school-future-skills",
  "school-nzse-ai",
  "school-future-skills-ai",
  "green-list-residence",
  "skilled-migrant-category",
  "nz-study-advice-from-x",
  "nz-weekend-social-activities",
];

const rankBySlug = new Map(ARTICLE_ORDER.map((slug, index) => [slug, index]));

export function articleRank(slug) {
  const rank = rankBySlug.get(slug);
  return rank === undefined ? ARTICLE_ORDER.length : rank;
}

export function compareArticles(a, b) {
  const delta = articleRank(a.slug) - articleRank(b.slug);
  return delta !== 0 ? delta : a.slug.localeCompare(b.slug);
}

export function sortArticles(list) {
  return [...list].sort(compareArticles);
}
