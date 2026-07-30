import { LinkifiedText } from "./linkify";

function BlockParagraph({ text }) {
  return (
    <p>
      <LinkifiedText text={text} />
    </p>
  );
}

function BlockHeading({ text }) {
  return <h2 className="article-block__h2">{text}</h2>;
}

function BlockList({ items, ordered = false }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="article-block__list">
      {items.map((item) => (
        <li key={item}>
          <LinkifiedText text={item} />
        </li>
      ))}
    </Tag>
  );
}

function BlockTip({ title, text }) {
  return (
    <aside className="article-block__tip" role="note">
      {title ? <strong>{title}</strong> : null}
      <p>
        <LinkifiedText text={text} />
      </p>
    </aside>
  );
}

function BlockFigure({ src, alt, caption }) {
  return (
    <figure className="article-block__figure">
      <img src={src} alt={alt || ""} loading="lazy" />
      {caption ? (
        <figcaption>
          <LinkifiedText text={caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

function BlockTable({ caption, headers, rows }) {
  return (
    <div className="article-block__table-wrap">
      {caption ? (
        <p className="article-block__table-caption">
          <LinkifiedText text={caption} />
        </p>
      ) : null}
      <table className="article-block__table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`}>
                  <LinkifiedText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockSteps({ items }) {
  return (
    <ol className="article-block__steps">
      {items.map((item, index) => (
        <li key={item.title || item.text}>
          <span className="article-block__step-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            {item.title ? <strong>{item.title}</strong> : null}
            <p>
              <LinkifiedText text={item.text} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function BlockLinks({ items, locale }) {
  return (
    <div className="article-block__links">
      {items.map((item) => (
        <a
          key={item.href}
          className="article-block__link-btn"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label || item.href.replace(/^https?:\/\//, "")}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
      {!items?.length && locale ? null : null}
    </div>
  );
}

function BlockArticleLinks({ items, onOpenArticle, ctaLabel }) {
  if (!items?.length) return null;
  return (
    <div className="article-block__article-links">
      {items.map((item) => (
        <a
          key={item.slug}
          className="article-block__article-link"
          href={`#/article/${item.slug}`}
          onClick={(event) => {
            if (!onOpenArticle) return;
            event.preventDefault();
            onOpenArticle(item.slug);
          }}
        >
          <span>{item.label}</span>
          <span aria-hidden="true">{ctaLabel || "→"}</span>
        </a>
      ))}
    </div>
  );
}

export function ArticleBlocks({ blocks, onOpenArticle, articleLinkCta }) {
  if (!blocks?.length) return null;

  return (
    <div className="article-detail__body">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "h2":
            return <BlockHeading key={key} text={block.text} />;
          case "p":
            return <BlockParagraph key={key} text={block.text} />;
          case "ul":
            return <BlockList key={key} items={block.items} />;
          case "ol":
            return <BlockList key={key} items={block.items} ordered />;
          case "tip":
            return (
              <BlockTip key={key} title={block.title} text={block.text} />
            );
          case "figure":
            return (
              <BlockFigure
                key={key}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
              />
            );
          case "table":
            return (
              <BlockTable
                key={key}
                caption={block.caption}
                headers={block.headers}
                rows={block.rows}
              />
            );
          case "steps":
            return <BlockSteps key={key} items={block.items} />;
          case "links":
            return <BlockLinks key={key} items={block.items} />;
          case "articleLinks":
            return (
              <BlockArticleLinks
                key={key}
                items={block.items}
                onOpenArticle={onOpenArticle}
                ctaLabel={articleLinkCta}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
