import { Link } from "react-router-dom";
import { getArticle } from "./content";

function textWithLinks(text) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) =>
    /^https?:\/\//.test(part) ? <a key={index} href={part} target="_blank" rel="noreferrer">{part}</a> : part,
  );
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
      {article.slug === "pte-private-schools" ? (
        <section className="article-related" aria-label={zh ? "学校详解" : "School guides"}>
          <h2>{zh ? "继续看每所学校的详解" : "Read each school guide"}</h2>
          <div>
            {["school-ais", "school-icl", "school-yoobee", "school-nzse", "school-future-skills"].map((slug) => {
              const school = getArticle(slug);
              return <Link key={slug} to={`/article/${slug}`}>{school ? (zh ? school.titleZh : school.titleEn) : slug}</Link>;
            })}
          </div>
        </section>
      ) : null}
    </article>
  );
}
