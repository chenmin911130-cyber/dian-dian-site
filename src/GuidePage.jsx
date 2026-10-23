import { Link } from "react-router-dom";

const SECTION_ORDER = [
  "process",
  "universities",
  "foundation",
  "pathways",
  "highschools",
  "ai",
  "creative",
  "skills",
  "career",
  "life",
];

const SECTION_LABELS = {
  universities: { zh: "八所大学", en: "Eight universities" },
  highschools: { zh: "奥克兰中学", en: "Auckland secondary schools" },
  creative: { zh: "创意私立路径", en: "Creative private path" },
  skills: { zh: "技能与应用管理", en: "Skills and applied management" },
  ai: { zh: "AI 课程专文", en: "AI programmes" },
  foundation: { zh: "热门专业与预科", en: "Popular fields and foundation" },
  process: { zh: "申请、签证与预算", en: "Applications, visas and budget" },
  pathways: { zh: "毕业后签证政策（官方信息摘录）", en: "Post-study visa policy (official information)" },
  career: { zh: "求职与工时", en: "Jobs and work hours" },
  life: { zh: "落地生活", en: "Settling in" },
};

function groupArticles(articles) {
  const groups = new Map();
  for (const article of articles) {
    const key = article.section || "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(article);
  }

  const ordered = SECTION_ORDER.filter((key) => groups.has(key)).map((key) => [
    key,
    groups.get(key),
  ]);
  for (const [key, items] of groups) {
    if (!SECTION_ORDER.includes(key)) ordered.push([key, items]);
  }
  return ordered;
}

export function GuidePage({
  guide,
  articles,
  locale,
  labels,
  onBack,
}) {
  const zh = locale === "zh";
  const groups = groupArticles(articles);

  return (
    <section className="detail-page">
      <button className="detail-back" type="button" onClick={onBack}>
        ← {labels.backHome}
      </button>

      <header className="detail-hero">
        <div className="detail-hero__copy">
          <p className="detail-kicker">{zh ? "GUIDE" : "GUIDE"}</p>
          <h1>{zh ? guide.titleZh : guide.titleEn}</h1>
          <p className="detail-lead">
            {zh ? guide.introZh : guide.introEn}
          </p>
        </div>
        <img
          src={guide.image}
          alt={zh ? guide.imageAltZh : guide.imageAltEn}
        />
      </header>

      <div className="detail-article-list">
        {groups.map(([section, items]) => {
          const label = SECTION_LABELS[section];
          return (
            <section key={section} className="detail-article-group">
              <h2 className="detail-article-group__title">
                {label ? (zh ? label.zh : label.en) : zh ? "本指南文章" : "Articles in this guide"}
              </h2>
              <ul>
                {items.map((article) => (
                  <li key={article.slug}>
                    <Link
                      to={`/article/${article.slug}`}
                      className="detail-article-link"
                    >
                      <span className="detail-article-link__title">
                        {zh ? article.titleZh : article.titleEn}
                      </span>
                      <span className="detail-article-link__excerpt">
                        {zh ? article.excerptZh : article.excerptEn}
                      </span>
                      <span className="detail-article-link__cta">
                        {labels.readArticle} →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
