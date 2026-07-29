export function ArticleRow({ article, featuredLabel, onOpenGuide, onOpenArticle }) {
  return (
    <article className="article-row">
      <div className="article-copy">
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <button type="button" onClick={() => onOpenGuide(article.guideId)}>
          {article.action}
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <img src={article.image} alt={article.imageAlt} />
      <div className="article-feature">
        <span>{featuredLabel}</span>
        <h3>{article.featured}</h3>
        <button
          type="button"
          onClick={() => onOpenArticle(article.featuredSlug)}
        >
          {article.read}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
