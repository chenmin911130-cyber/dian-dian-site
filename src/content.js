import { articles as articleRecords } from "./articles";
import { ARTICLE_ORDER, sortArticles } from "./articleOrder";

export { ARTICLE_ORDER };
export const articles = sortArticles(articleRecords);

export const CONTACT_EMAIL = "yuditawang0925@gmail.com";

export const INQUIRY_OG_IMAGE = "https://diandianyudita.com/images/hero-wanaka.jpg";

export const inquiryCopy = {
  zh: {
    kicker: "DIANDIAN · NZ STUDY",
    title: "留学意向咨询",
    lead: "填写以下信息，点点会在微信或邮件回复你。仅用于留学规划沟通，不会公开你的资料。",
    educationLabel: "学历 *",
    employmentLabel: "工作情况 *",
    jobLabel: "具体做什么工作",
    jobPlaceholder: "例如：市场专员、软件工程师、在读…",
    incomeLabel: "年收入（人民币）*",
    savingsLabel: "存款（人民币）*",
    majorLabel: "想要就读的专业方向 *",
    majorOtherLabel: "请说明其他专业方向 *",
    majorPlaceholder: "例如：建筑、法律、酒店管理…",
    emailLabel: "邮箱 *",
    submit: "提交咨询",
    submitting: "提交中…",
    privacy: "提交即表示你同意点点仅将信息用于留学咨询联系。",
    successTitle: "已收到你的咨询",
    successBody: "谢谢！点点会尽快通过微信或邮件联系你，请留意消息。",
    backHome: "返回首页",
    submitFail:
      "暂时无法提交，请检查网络后重试，或返回首页查看微信二维码联系点点。",
    pageTitle: "留学意向咨询｜点点新西兰留学咨询",
    metaDescription:
      "面向计划赴新西兰留学的学生：填写学历、工作与意向专业，点点会通过微信或邮件回复。",
    ogTitle: "点点｜留学意向咨询",
    ogDescription: "几分钟填写意向，点点帮你对接新西兰留学规划。",
  },
  en: {
    kicker: "DIANDIAN · NZ STUDY",
    title: "Study inquiry",
    lead: "Share a few details and DianDian will reply on WeChat or email. Used only for study planning—not published.",
    educationLabel: "Education level *",
    employmentLabel: "Employment status *",
    jobLabel: "What job do you do",
    jobPlaceholder: "e.g. marketing coordinator, software engineer, full-time student…",
    incomeLabel: "Annual income (RMB) *",
    savingsLabel: "Savings (RMB) *",
    majorLabel: "Intended field of study *",
    majorOtherLabel: "Describe your field *",
    majorPlaceholder: "e.g. architecture, law, hospitality…",
    emailLabel: "Email *",
    submit: "Send inquiry",
    submitting: "Sending…",
    privacy: "By submitting, you agree DianDian may use this only to contact you about study planning.",
    successTitle: "Inquiry received",
    successBody: "Thank you! DianDian will reach out on WeChat or email soon—please watch for a message.",
    backHome: "Back to home",
    submitFail:
      "Could not send right now. Check your connection and try again, or return home to contact DianDian via WeChat.",
    pageTitle: "Study inquiry | DianDian NZ Study Consulting",
    metaDescription:
      "For students planning to study in New Zealand: education, work and intended major—DianDian replies on WeChat or email.",
    ogTitle: "DianDian | Study inquiry",
    ogDescription: "A short form for New Zealand study planning—DianDian follows up personally.",
  },
};

export const siteCopy = {
  zh: {
    siteName: "点点新西兰留学咨询",
    siteBrand: "点点",
    siteTag: "新西兰留学咨询",
    consultation: "填写留学咨询",
    inquiryFormLink: "快速意向咨询",
    heroTitle: "留学新西兰，从规划到落地",
    heroLead: "面向计划赴新西兰留学的学生，提供选校、申请材料与落地建议。",
    heroCta: "填写留学咨询",
    featuredLabel: "精选文章",
    backHome: "返回首页",
    backGuide: "返回指南",
    readArticle: "阅读文章",
    exploreGuide: "探索指南",
    authorTitle: "联系点点",
    menuLabel: "菜单",
    closeMenu: "关闭菜单",
    authorBody:
      "2024 年来到新西兰，一边适应新环境，一边整理留学、求职与生活里踩过的坑和有用的经验。希望这个网站能给你真实、实用的参考；也欢迎你分享自己的故事，我们一起慢慢成长。",
    privacyNote:
      "隐私：表单和 Word 文件仅在你的浏览器中处理，不会上传。",
    disclaimer:
      "本站内容仅为一般性留学信息，不构成移民或法律建议。签证与移民问题请咨询新西兰持牌移民顾问（LIA）或参考 immigration.govt.nz。文中费用与数字均为约数，请以学校官网为准。",
  },
  en: {
    siteName: "DianDian NZ Study Consulting",
    siteBrand: "DianDian",
    siteTag: "NZ Study Consulting",
    consultation: "Fill in a consult form",
    inquiryFormLink: "Quick inquiry",
    heroTitle: "From plan to arrival in New Zealand.",
    heroLead:
      "For students planning to study in New Zealand: school shortlists, application materials, and settling-in advice.",
    heroCta: "Fill in a consult form",
    featuredLabel: "Featured",
    backHome: "Back to home",
    backGuide: "Back to guide",
    readArticle: "Read article",
    exploreGuide: "Explore guide",
    authorTitle: "Contact DianDian",
    menuLabel: "Menu",
    closeMenu: "Close menu",
    authorBody:
      "I arrived in New Zealand in 2024. While settling in, I collect practical notes on study, work and daily life—what helped, and what I wish I had known sooner. I hope these pages are useful, and you are welcome to share your story too.",
    privacyNote:
      "Privacy: form data and Word files stay in your browser and are never uploaded.",
    disclaimer:
      "This site provides general study information only and is not immigration or legal advice. For visa and immigration questions, consult a licensed New Zealand immigration adviser (LIA) or immigration.govt.nz. Figures are approximate; check official school sites.",
  },
};

export const guides = [
  {
    id: "study",
    image: "/images/study-feature.png",
    imageAltZh: "新西兰大学与中学校园",
    imageAltEn: "A New Zealand university campus",
    titleZh: "留学准备",
    titleEn: "Study preparation",
    summaryZh:
      "对照新西兰八所大学与奥克兰常见国际生中学，以及签证、语言、预算；私立路径仍保留 Yoobee、NZSE 与 Future Skills。",
    summaryEn:
      "The eight universities and commonly asked Auckland secondary schools, plus visas, English and budget. Yoobee, NZSE and Future Skills remain for private/skills paths.",
    introZh:
      "主线是新西兰八所公立大学，以及奥克兰一批常被国际家庭问起的中学。每所大学和多数中学都有专文：优势专业、排名来源与年份、国际学费约数、英语与开学季。签证走 Immigration Online，生活费证明与工时以移民局为准。应用型私立路径仍保留 Yoobee、NZSE、Future Skills——本站不再介绍 ICL。",
    introEn:
      "The main track is New Zealand’s eight public universities, plus Auckland secondary schools international families often ask about. Each university—and most of those schools—has a deep-dive with cited rankings, approximate fees, English and intakes. Student visas go through Immigration Online. Yoobee, NZSE and Future Skills remain for private/skills paths. This site no longer covers ICL.",
    featuredSlug: "nz-universities-overview",
    featuredTitleZh: "新西兰八大怎么选：城市、专业、学费与适合谁",
    featuredTitleEn: "Choosing among New Zealand’s eight universities",
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
    image: "/images/life-feature.png",
    imageAltZh: "新西兰海岸与城市生活",
    imageAltEn: "New Zealand coast and everyday life",
    titleZh: "生活指南",
    titleEn: "Living in NZ",
    summaryZh: "月度生活费预算、租房、开户、超市省钱、手机公交、保险看病、落地第一周、买车开车、文化礼仪与周末社交。",
    summaryEn:
      "Monthly living budget, renting, banking, supermarket savings, SIM/transport, insurance, your first week, cars and driving, culture and weekend activities.",
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
  return sortArticles(articles.filter((article) => article.guideId === guideId));
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
