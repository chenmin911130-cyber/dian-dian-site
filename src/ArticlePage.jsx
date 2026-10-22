import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticle } from "./content";

function shortLabel(href) {
  try {
    const u = new URL(href);
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname.replace(/\/+$/, "");
    if (!path) return host;
    const segs = path.split("/").filter(Boolean);
    const last = decodeURIComponent(segs[segs.length - 1] || "");
    const shown = segs.length > 1 ? `${host}/…/${last}` : `${host}/${last}`;
    return shown.length > 48 ? `${shown.slice(0, 45)}…` : shown;
  } catch {
    return href;
  }
}

function slugId(index) {
  return `sec-${index}`;
}

function BackToTop({ label }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      className="back-to-top"
      aria-label={label}
      onClick={() => {
        try {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
          /* jsdom */
        }
      }}
    >
      ↑
    </button>
  );
}

function textWithLinks(text) {
  const parts = text.split(/(https?:\/\/[A-Za-z0-9._~:/?#\[\]@!$&'*+,;=%-]+)/g);
  return parts.map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const href = part.replace(/[),.;:]+$/g, "");
    const trail = part.slice(href.length);
    return (
      <span key={index}>
        <a className="ext-link" href={href} target="_blank" rel="noreferrer" title={href}>
          {shortLabel(href)}
        </a>
        {trail}
      </span>
    );
  });
}

function CreditLine({ credit }) {
  if (!credit) return null;
  const text = typeof credit === "string" ? credit : credit.text;
  const href = typeof credit === "string" ? null : credit.href;
  return (
    <p className="article-detail__credit">
      {text}
      {href ? (
        <>
          {" · "}
          <a href={href} target="_blank" rel="noreferrer">
            Wikimedia Commons
          </a>
        </>
      ) : null}
    </p>
  );
}

function renderBlocks(blocks) {
  return blocks.map((block, index) => {
    if (typeof block === "string") {
      return <p key={`p-${index}`}>{textWithLinks(block)}</p>;
    }

    if (block?.type === "h2") {
      return (
        <h2 key={`h2-${index}`} id={slugId(index)} className="article-detail__subhead">
          {block.text}
        </h2>
      );
    }

    if (block?.type === "image") {
      return (
        <figure key={`img-${index}`} className="article-detail__figure">
          <img src={block.src} alt={block.alt || ""} loading="lazy" decoding="async" />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
          <CreditLine credit={block.credit} />
        </figure>
      );
    }

    if (block?.type === "table") {
      return (
        <figure key={`tbl-${index}`} className="article-detail__table">
          <p className="article-detail__table-hint" aria-hidden="true">← 左右滑动查看 →</p>
          <div className="article-detail__table-scroll">
            <table>
              <thead>
                <tr>{block.head.map((cell, i) => <th key={i}>{cell}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>{row.map((cell, i) => <td key={i}>{textWithLinks(cell)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
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
  const toc = (blocks || [])
    .map((block, index) => (block?.type === "h2" ? { id: slugId(index), text: block.text } : null))
    .filter(Boolean);

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

      <figure className="article-detail__hero">
        <img
          className="article-detail__image"
          src={article.image}
          alt={zh ? article.imageAltZh : article.imageAltEn}
          decoding="async"
        />
        <CreditLine credit={zh ? article.imageCreditZh : article.imageCreditEn} />
      </figure>

      {toc.length >= 3 ? (
        <nav className="article-toc" aria-label={zh ? "目录" : "Contents"}>
          <h2>{zh ? "目录" : "Contents"}</h2>
          <ol>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="article-detail__body">{renderBlocks(blocks)}</div>
      <BackToTop label={zh ? "回到顶部" : "Back to top"} />
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
