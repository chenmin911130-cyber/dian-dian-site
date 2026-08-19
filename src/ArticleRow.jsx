import { Link } from "react-router-dom";

export function ArticleRow({ article, featuredLabel, onOpenGuide, onOpenArticle }) {
  return (
    <article className="article-row">
      <div className="article-copy">
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <Link to={`/${article.guideId}`}>
          {article.action}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <img src={article.image} alt={article.imageAlt} />
      <div className="article-feature">
        <span>{featuredLabel}</span>
        <h3>{article.featured}</h3>
        <Link to={`/article/${article.featuredSlug}`}>
          {article.read}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
