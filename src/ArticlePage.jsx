function renderBlocks(blocks) {
  return blocks.map((block, index) => {
    if (typeof block === "string") {
      return <p key={`p-${index}`}>{block}</p>;
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
    </article>
  );
}
