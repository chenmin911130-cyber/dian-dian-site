import { Link } from "react-router-dom";

export function GuidePage({
  guide,
  articles,
  locale,
  labels,
  onBack,
  onOpenArticle,
}) {
  const zh = locale === "zh";

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
        <h2>{zh ? "本指南文章" : "Articles in this guide"}</h2>
        <ul>
          {articles.map((article) => (
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
      </div>
    </section>
  );
}
