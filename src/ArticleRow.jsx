export function ArticleRow({ article, featuredLabel, onOpenGuide, onOpenArticle }) {
  return (
    <article className="article-row">
      <div className="article-copy">
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <a
          className="text-link"
          href={`#/guide/${article.guideId}`}
          onClick={(event) => {
            event.preventDefault();
            onOpenGuide(article.guideId);
          }}
        >
          {article.action}
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <img src={article.image} alt={article.imageAlt} loading="lazy" />
      <div className="article-feature">
        <span>{featuredLabel}</span>
        <h3>{article.featured}</h3>
        <a
          className="text-link"
          href={`#/article/${article.featuredSlug}`}
          onClick={(event) => {
            event.preventDefault();
            onOpenArticle(article.featuredSlug);
          }}
        >
          {article.read}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
