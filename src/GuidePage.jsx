import { guideCategories } from "./content/site";

export function GuidePage({
  guide,
  articles,
  locale,
  labels,
  onBack,
  onOpenArticle,
}) {
  const zh = locale === "zh";
  const categories = guideCategories[guide.id] || [];

  const grouped = categories
    .map((category) => ({
      ...category,
      articles: articles.filter((article) => article.categoryId === category.id),
    }))
    .filter((group) => group.articles.length > 0);

  const uncategorized = articles.filter(
    (article) => !categories.some((category) => category.id === article.categoryId),
  );

  return (
    <section className="detail-page">
      <a
        className="detail-back"
        href="#/"
        onClick={(event) => {
          event.preventDefault();
          onBack();
        }}
      >
        ← {labels.backHome}
      </a>

      <header className="detail-hero">
        <div className="detail-hero__copy">
          <p className="detail-kicker">GUIDE</p>
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
        <h2>{labels.guideArticlesHeading}</h2>

        {grouped.map((group) => (
          <section key={group.id} className="guide-category">
            <h3 className="guide-category__title">
              {zh ? group.zh : group.en}
            </h3>
            <ul>
              {group.articles.map((article) => (
                <li key={article.slug}>
                  <a
                    className="detail-article-link"
                    href={`#/article/${article.slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onOpenArticle(article.slug);
                    }}
                  >
                    <span className="detail-article-link__title">
                      {zh ? article.titleZh : article.titleEn}
                    </span>
                    <span className="detail-article-link__excerpt">
                      {zh ? article.excerptZh : article.excerptEn}
                    </span>
                    <span className="detail-article-link__meta">
                      {article.readingMins
                        ? `${labels.readingLabel} ${article.readingMins} ${labels.readingUnit}`
                        : null}
                    </span>
                    <span className="detail-article-link__cta">
                      {labels.readArticle} →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {uncategorized.length ? (
          <ul>
            {uncategorized.map((article) => (
              <li key={article.slug}>
                <a
                  className="detail-article-link"
                  href={`#/article/${article.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenArticle(article.slug);
                  }}
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
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
