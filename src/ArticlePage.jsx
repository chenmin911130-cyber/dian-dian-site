import { Link } from "react-router-dom";
import { getArticle } from "./content";

function textWithLinks(text) {
  const parts = text.split(/(https?:\/\/[A-Za-z0-9._~:/?#\[\]@!$&'*+,;=%-]+)/g);
  return parts.map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const href = part.replace(/[),.;:]+$/g, "");
    const trail = part.slice(href.length);
    return (
      <span key={index}>
        <a href={href} target="_blank" rel="noreferrer">
          {href}
        </a>
        {trail}
      </span>
    );
  });
}

function renderBlocks(blocks) {
  return blocks.map((block, index) => {
    if (typeof block === "string") {
      return <p key={`p-${index}`}>{textWithLinks(block)}</p>;
    }

    if (block?.type === "h2") {
      return (
        <h2 key={`h2-${index}`} className="article-detail__subhead">
          {block.text}
        </h2>
      );
    }

    if (block?.type === "image") {
      return (
        <figure key={`img-${index}`} className="article-detail__figure">
          <img src={block.src} alt={block.alt || ""} loading="lazy" />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    }

    return null;
  });
}

export function ArticlePage({
  article,
  locale,
  labels,
  onBackHome,
  onBackGuide,
}) {
  const zh = locale === "zh";
  const blocks = zh ? article.bodyZh : article.bodyEn;

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
        {article.updatedAt ? (
          <p className="article-detail__updated">
            {zh ? `最近核对：${article.updatedAt}` : `Last checked: ${article.updatedAt}`}
          </p>
        ) : null}
        {article.website ? (
          <p className="article-detail__website">
            <a
              href={article.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {zh ? "官网：" : "Official site: "}
              {article.website.replace(/^https?:\/\//, "")}
            </a>
          </p>
        ) : null}
      </header>

      <img
        className="article-detail__image"
        src={article.image}
        alt={zh ? article.imageAltZh : article.imageAltEn}
      />

      <div className="article-detail__body">{renderBlocks(blocks)}</div>
      {article.related?.length ? (
        <section className="article-related" aria-label={zh ? "相关文章" : "Related articles"}>
          <h2>{zh ? "相关文章" : "Related articles"}</h2>
          <div>
            {article.related.map((slug) => {
              const related = getArticle(slug);
              return (
                <Link key={slug} to={`/article/${slug}`}>
                  {related ? (zh ? related.titleZh : related.titleEn) : slug}
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </article>
  );
}
