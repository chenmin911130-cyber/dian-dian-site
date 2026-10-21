export const UPDATED = "2026-10-21";

export const h2 = (text) => ({ type: "h2", text });
export const fig = (src, alt, caption) => ({ type: "image", src, alt, caption });

export const IMG = {
  cbd: "/images/article-auckland-cbd.png",
  class: "/images/article-campus-class.png",
  creative: "/images/article-creative-studio.png",
  skills: "/images/article-skills-lab.png",
  job: "/images/article-job-search.png",
  flat: "/images/article-shared-flat.png",
  visa: "/images/article-visa-docs.png",
  market: "/images/article-supermarket.png",
  transport: "/images/article-transport.png",
  arrival: "/images/article-arrival.png",
  study: "/images/study-feature.png",
  career: "/images/career-feature.png",
  life: "/images/life-feature.png",
};

export const INZ = {
  home: "https://www.immigration.govt.nz/",
  workHours: "https://www.immigration.govt.nz/study/once-you-have-a-student-visa/working-on-a-student-visa/",
  workHoursNews: "https://www.immigration.govt.nz/about-us/news-centre/upcoming-changes-to-student-visa-work-rights/",
  funds: "https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/providing-evidence-and-documents-to-support-your-visa-application/student-fund-requirements/",
  applyOnline: "https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/applying-online/how-to-apply-for-a-visa-online/",
  studentVisas: "https://www.immigration.govt.nz/study/study-visas/visas-for-studying-in-new-zealand/",
  studentNews: "https://www.immigration.govt.nz/about-us/news-centre/student-visas/",
  stayWork: "https://www.immigration.govt.nz/study/after-you-finish-your-study/staying-to-work-after-finishing-your-study/",
  stgwv: "https://www.immigration.govt.nz/about-us/news-centre/new-short-term-graduate-work-visa-launching-on-16-november-2026/",
  pswvExtend: "https://www.immigration.govt.nz/about-us/news-centre/post-study-work-visa-eligibility-extended-from-16-november-2026/",
  postStudyOptions: "https://www.immigration.govt.nz/about-us/news-centre/new-and-updated-post-study-work-visa-options/",
  smcChanges: "https://www.immigration.govt.nz/about-us/news-centre/further-changes-to-the-skilled-migrant-category-to-come-into-effect-in-august-2026/",
  smcFinal: "https://www.immigration.govt.nz/about-us/news-centre/final-details-about-changes-to-the-skilled-migrant-category-resident-visa-and-work-to-residence-visa/",
  smcWageTool: "https://www.immigration.govt.nz/live/resident-visas-to-live-in-new-zealand/skilled-residence-pathways-in-new-zealand/skilled-migrant-category-pathway-to-residence/smc-wage-threshold-tool/",
  greenList: "https://www.immigration.govt.nz/live/resident-visas-to-live-in-new-zealand/skilled-residence-pathways-in-new-zealand/green-list-pathway-to-residence/",
  greenRoles: "https://www.immigration.govt.nz/work/requirements-for-work-visas/green-list-occupations-qualifications-and-skills/green-list-roles-jobs-we-need-people-for-in-new-zealand/",
  providers: "https://www.immigration.govt.nz/study/for-education-providers/rules-for-approved-education-providers/",
  fraud: "https://www.immigration.govt.nz/about-us/our-strategies-and-programmes/stopping-fraud-and-exploitation/stopping-immigration-fraud/",
  statsPdf: "https://www.immigration.govt.nz/assets/inz/documents/statistics/statistics-student-applications-decided.pdf",
  online: "https://online.immigration.govt.nz/student",
};

export function feeNoteZh(extra = "") {
  return `以上费用为约数，核对日期 ${UPDATED}。学年、专业、奖学金与汇率都会变，报名前请以学校官网当季学费表和 Offer 为准。${extra}`;
}

export function feeNoteEn(extra = "") {
  return `Fee figures are approximate as of ${UPDATED}. They change by year, programme and scholarship—verify on the official site and your offer letter.${extra}`;
}

export function sourcesBlock(zh, links) {
  const heading = zh ? "官方来源（请点开核对）" : "Official sources (please verify)";
  return [h2(heading), ...links];
}

export function article({
  slug,
  guideId,
  section,
  titleZh,
  titleEn,
  excerptZh,
  excerptEn,
  image,
  imageAltZh,
  imageAltEn,
  website,
  related,
  bodyZh,
  bodyEn,
}) {
  return {
    slug,
    guideId,
    section,
    updatedAt: UPDATED,
    titleZh,
    titleEn,
    excerptZh,
    excerptEn,
    image,
    imageAltZh,
    imageAltEn,
    ...(website ? { website } : {}),
    ...(related ? { related } : {}),
    bodyZh,
    bodyEn,
  };
}
