export function ArticlePage({
  article,
  locale,
  labels,
  onBackHome,
  onBackGuide,
}) {
  const zh = locale === "zh";
  const paragraphs = zh ? article.bodyZh : article.bodyEn;

  return (
    <article className="detail-page detail-page--article">
      <div className="detail-back-row">
        <button className="detail-back" type="button" onClick={onBackHome}>
          ← {labels.backHome}
        </button>
        <button className="detail-back" type="button" onClick={onBackGuide}>
          ← {labels.backGuide}
        </button>
      </div>

      <header className="article-detail__head">
        <p className="detail-kicker">{zh ? "ARTICLE" : "ARTICLE"}</p>
        <h1>{zh ? article.titleZh : article.titleEn}</h1>
        <p className="detail-lead">
          {zh ? article.excerptZh : article.excerptEn}
        </p>
      </header>

      <img
        className="article-detail__image"
        src={article.image}
        alt={zh ? article.imageAltZh : article.imageAltEn}
      />

      <div className="article-detail__body">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
