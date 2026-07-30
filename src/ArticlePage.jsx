import { ArticleBlocks } from "./ArticleBlocks";

export function ArticlePage({
  article,
  locale,
  labels,
  onBackHome,
  onBackGuide,
  onOpenArticle,
}) {
  const zh = locale === "zh";
  const blocks = zh ? article.sectionsZh : article.sectionsEn;
  const categoryLabel = zh ? article.categoryZh : article.categoryEn;
  const websiteLabel = zh ? "打开官网" : "Open official site";

  return (
    <article className="detail-page detail-page--article">
      <div className="detail-back-row">
        <a
          className="detail-back"
          href="#/"
          onClick={(event) => {
            event.preventDefault();
            onBackHome();
          }}
        >
          ← {labels.backHome}
        </a>
        <a
          className="detail-back"
          href={`#/guide/${article.guideId}`}
          onClick={(event) => {
            event.preventDefault();
            onBackGuide();
          }}
        >
          ← {labels.backGuide}
        </a>
      </div>

      <header className="article-detail__head">
        <p className="detail-kicker">
          {categoryLabel ? `${categoryLabel} · ` : ""}
          ARTICLE
        </p>
        <h1>{zh ? article.titleZh : article.titleEn}</h1>
        <p className="detail-lead">
          {zh ? article.excerptZh : article.excerptEn}
        </p>
        {article.readingMins ? (
          <p className="article-detail__meta">
            {labels.readingLabel} {article.readingMins} {labels.readingUnit}
          </p>
        ) : null}
        {article.website ? (
          <p className="article-detail__website">
            <a
              className="article-detail__website-btn"
              href={article.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {websiteLabel}
              <span aria-hidden="true">↗</span>
            </a>
            <span className="article-detail__website-url">
              {article.website.replace(/^https?:\/\//, "")}
            </span>
          </p>
        ) : null}
      </header>

      <figure className="article-detail__hero-figure">
        <img
          className="article-detail__image"
          src={article.image}
          alt={zh ? article.imageAltZh : article.imageAltEn}
        />
      </figure>

      <ArticleBlocks
        blocks={blocks}
        onOpenArticle={onOpenArticle}
        articleLinkCta="→"
      />
    </article>
  );
}
