import { useState } from "react";
import { ArticlePage } from "./ArticlePage";
import { LogoMark } from "./LogoMark";
import { ArticleRow } from "./ArticleRow";
import { AuthorNote } from "./AuthorNote";
import { ConsultForm } from "./ConsultForm";
import { GuidePage } from "./GuidePage";
import {
  getArticle,
  getArticlesByGuide,
  getGuide,
  getHomeArticles,
  siteCopy,
} from "./content";

export function App() {
  const [locale, setLocale] = useState("zh");
  const [view, setView] = useState({ name: "home" });
  const copy = siteCopy[locale];

  function scrollTop() {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // jsdom does not implement scrollTo
    }
  }

  function openConsultation() {
    setView({ name: "consult" });
    scrollTop();
  }

  function openGuide(guideId) {
    setView({ name: "guide", guideId });
    scrollTop();
  }

  function openArticle(slug) {
    setView({ name: "article", slug });
    scrollTop();
  }

  function goHome() {
    setView({ name: "home" });
    scrollTop();
  }

  const guide =
    view.name === "guide" || view.name === "article"
      ? getGuide(
          view.name === "guide"
            ? view.guideId
            : getArticle(view.slug)?.guideId,
        )
      : null;
  const article = view.name === "article" ? getArticle(view.slug) : null;

  return (
    <main className="site-shell">
      <section className={view.name === "home" ? "hero" : "hero hero--compact"}>
        <header className="site-header">
          <a
            className="wordmark"
            href="#top"
            aria-label={copy.siteName}
            onClick={(event) => {
              event.preventDefault();
              goHome();
            }}
          >
            <LogoMark className="wordmark__mark" />
            <span className="wordmark__brand">{copy.siteBrand}</span>
            <span className="wordmark__divider" aria-hidden="true" />
            <span className="wordmark__tag">{copy.siteTag}</span>
          </a>
          <nav aria-label={locale === "zh" ? "主导航" : "Primary navigation"}>
            <span className="locale-switch" aria-label="Language">
              <button
                type="button"
                className={locale === "zh" ? "is-active" : ""}
                aria-pressed={locale === "zh"}
                onClick={() => setLocale("zh")}
              >
                中文
              </button>
              <span aria-hidden="true">|</span>
              <button
                type="button"
                className={locale === "en" ? "is-active" : ""}
                aria-pressed={locale === "en"}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </span>
          </nav>
        </header>
        {view.name === "home" ? (
          <div id="top" className="hero-copy">
            <h1>{copy.heroTitle}</h1>
            <button
              className="primary-cta"
              type="button"
              onClick={openConsultation}
            >
              {copy.heroCta}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : null}
      </section>

      <div className="content-frame">
        {view.name === "home" ? (
          <>
            <section id="latest" className="article-list">
              {getHomeArticles(locale).map((item) => (
                <ArticleRow
                  key={item.guideId}
                  article={item}
                  featuredLabel={copy.featuredLabel}
                  onOpenGuide={openGuide}
                  onOpenArticle={openArticle}
                />
              ))}
            </section>
            <AuthorNote title={copy.authorTitle} body={copy.authorBody} />
          </>
        ) : null}

        {view.name === "guide" && guide ? (
          <GuidePage
            guide={guide}
            articles={getArticlesByGuide(guide.id)}
            locale={locale}
            labels={copy}
            onBack={goHome}
            onOpenArticle={openArticle}
          />
        ) : null}

        {view.name === "article" && article ? (
          <ArticlePage
            article={article}
            locale={locale}
            labels={copy}
            onBackHome={goHome}
            onBackGuide={() => openGuide(article.guideId)}
          />
        ) : null}

        {view.name === "consult" ? (
          <ConsultForm locale={locale} labels={copy} onBack={goHome} />
        ) : null}
      </div>
    </main>
  );
}
