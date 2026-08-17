import { articles } from "./articles";

export { articles };

export const siteCopy = {
  zh: {
    siteName: "点点新西兰留学咨询",
    siteBrand: "点点",
    siteTag: "新西兰留学咨询",
    consultation: "咨询申请",
    heroTitle: "留学新西兰，从规划到落地",
    heroCta: "咨询申请",
    featuredLabel: "精选文章",
    backHome: "返回首页",
    backGuide: "返回指南",
    readArticle: "阅读文章",
    exploreGuide: "探索指南",
    authorTitle: "联系点点",
    authorBody:
      "2024 年来到新西兰，目前在 ICL 商学院就读。一边适应新环境，一边整理留学、求职与生活里踩过的坑和有用的经验。希望这个网站能给你真实、实用的参考；也欢迎你分享自己的故事，我们一起慢慢成长。",
    authorEmail: "yuditawang0925@gmail.com",
    authorEmailLabel: "邮箱",
  },
  en: {
    siteName: "DianDian NZ Study Consulting",
    siteBrand: "DianDian",
    siteTag: "NZ Study Consulting",
    consultation: "Consultation",
    heroTitle: "From plan to arrival in New Zealand.",
    heroCta: "Request a consultation",
    featuredLabel: "Featured",
    backHome: "Back to home",
    backGuide: "Back to guide",
    readArticle: "Read article",
    exploreGuide: "Explore guide",
    authorTitle: "Contact DianDian",
    authorBody:
      "I arrived in New Zealand in 2024 and am currently studying at ICL Business School. While settling in, I collect practical notes on study, work and daily life—what helped, and what I wish I had known sooner. I hope these pages are useful, and you are welcome to share your story too.",
    authorEmail: "yuditawang0925@gmail.com",
    authorEmailLabel: "Email",
  },
};

export const guides = [
  {
    id: "study",
    image: "/images/study-feature.png",
    imageAltZh: "新西兰私立学院与技能学校",
    imageAltEn: "A New Zealand private college campus",
    titleZh: "留学准备",
    titleEn: "Study preparation",
    summaryZh:
      "聚焦 AIS、ICL、Yoobee、NZSE、Future Skills 等私立/技能学校与学费区间，以及签证、语言、预算与申请节奏。",
    summaryEn:
      "Focus on AIS, ICL, Yoobee, NZSE and Future Skills-style private/skills providers with tuition ranges, plus visas, English, budget and timing.",
    introZh:
      "很多人问的不是八大排名，而是：奥克兰私立学院读什么、学费大概多少、PTE/语言班能不能衔接、商科 IT 酒店创意哪条路更贴自己。这里按 AIS、ICL、Yoobee、NZSE（NZSEG）、Future Skills 整理实用对照——讲清适合谁、学费大致区间，并提醒务必核对官网最新费用与 NZQA 级别。",
    introEn:
      "Many students need private/skills-provider options more than university rankings: what to study in Auckland colleges, typical tuition, PTE/English pathways, and which track fits—business, IT, hospitality or creative. These notes cover AIS, ICL, Yoobee, NZSE (NZSEG) and Future Skills with honest “who it suits” notes and approximate fee ranges—always verify current NZQA level and fees on the official site.",
    featuredSlug: "pte-private-schools",
    featuredTitleZh: "AIS / ICL / Yoobee / NZSE / Future Skills：学费与怎么选",
    featuredTitleEn: "AIS, ICL, Yoobee, NZSE, Future Skills: fees and who they suit",
  },
  {
    id: "career",
    image: "/images/career-feature.png",
    imageAltZh: "奥克兰城市天际线",
    imageAltEn: "The Auckland city skyline",
    titleZh: "求职与工作",
    titleEn: "Career and work",
    summaryZh:
      "Seek、Trade Me Jobs、简历、面试、IRD 与学生工时——本地找工刚需清单。",
    summaryEn:
      "Seek, Trade Me Jobs, CVs, interviews, IRD and student work hours—the essentials.",
    introZh:
      "本地兼职与全职大多从线上开始。Seek 岗位更全，Trade Me Jobs 本地感更强。下面把平台用法、简历、面试与合规工时一次讲清。",
    introEn:
      "Most local jobs start online. Seek is broader; Trade Me Jobs feels more local. Below: platforms, CVs, interviews and lawful work hours.",
    featuredSlug: "seek-trademe-jobs",
    featuredTitleZh: "在 Seek 与 Trade Me 找工作：实用建议",
    featuredTitleEn: "Finding work on Seek and Trade Me: practical tips",
  },
  {
    id: "life",
    image: "/images/hero-coast.png",
    imageAltZh: "新西兰海岸与城市生活",
    imageAltEn: "New Zealand coast and everyday life",
    titleZh: "生活指南",
    titleEn: "Living in NZ",
    summaryZh: "月度生活费预算、租房、开户、超市省钱、手机公交、保险看病与落地第一周。",
    summaryEn:
      "Monthly living budget, renting, banking, supermarket savings, SIM/transport, insurance and your first week.",
    introZh:
      "落地后最先卡住的往往不是课程，而是租房、银行卡、手机卡和看病。这一区按刚需顺序整理，帮你少花冤枉钱、少踩坑。",
    introEn:
      "After arrival, housing, banking, a SIM and healthcare usually come before coursework. This guide follows that essential order.",
    featuredSlug: "nz-monthly-budget",
    featuredTitleZh: "留学生一个月生活费怎么算",
    featuredTitleEn: "A practical one-month NZ living budget",
  },
];

export function getGuide(id) {
  return guides.find((guide) => guide.id === id);
}

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByGuide(guideId) {
  return articles.filter((article) => article.guideId === guideId);
}

export function getHomeArticles(locale) {
  const zh = locale === "zh";
  return guides.map((guide) => {
    const featured = getArticle(guide.featuredSlug);
    return {
      guideId: guide.id,
      title: zh ? guide.titleZh : guide.titleEn,
      summary: zh ? guide.summaryZh : guide.summaryEn,
      featured: zh
        ? guide.featuredTitleZh || featured?.titleZh
        : guide.featuredTitleEn || featured?.titleEn,
      featuredSlug: guide.featuredSlug,
      action: zh ? siteCopy.zh.exploreGuide : siteCopy.en.exploreGuide,
      read: zh ? siteCopy.zh.readArticle : siteCopy.en.readArticle,
      image: guide.image,
      imageAlt: zh ? guide.imageAltZh : guide.imageAltEn,
    };
  });
}
