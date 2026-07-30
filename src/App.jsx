import { useEffect, useState } from "react";
import { ArticlePage } from "./ArticlePage";
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

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  if (!raw || raw === "top") return { name: "home" };

  const [kind, id] = raw.split("/");
  if (kind === "consult") return { name: "consult" };
  if (kind === "guide" && id && getGuide(id)) return { name: "guide", guideId: id };
  if (kind === "article" && id && getArticle(id)) {
    return { name: "article", slug: id };
  }
  return { name: "home" };
}

function hashForView(view) {
  if (view.name === "consult") return "#/consult";
  if (view.name === "guide") return `#/guide/${view.guideId}`;
  if (view.name === "article") return `#/article/${view.slug}`;
  return "#/";
}

export function App() {
  const [locale, setLocale] = useState("zh");
  const [view, setView] = useState(() =>
    typeof window === "undefined" ? { name: "home" } : parseHash(),
  );
  const copy = siteCopy[locale];

  function scrollTop() {
    if (typeof window.scrollTo !== "function") return;
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // jsdom may stub scrollTo incompletely
    }
  }

  function navigate(next) {
    setView(next);
    const hash = hashForView(next);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
    scrollTop();
  }

  useEffect(() => {
    function onHashChange() {
      setView(parseHash());
      scrollTop();
    }
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) {
      window.location.replace("#/");
    }
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function openConsultation() {
    navigate({ name: "consult" });
  }

  function openGuide(guideId) {
    navigate({ name: "guide", guideId });
  }

  function openArticle(slug) {
    navigate({ name: "article", slug });
  }

  function goHome() {
    navigate({ name: "home" });
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
            href="#/"
            aria-label={copy.siteName}
            onClick={(event) => {
              event.preventDefault();
              goHome();
            }}
          >
            <span className="wordmark__dot" aria-hidden="true" />
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
            <a
              className="primary-cta"
              href="#/consult"
              onClick={(event) => {
                event.preventDefault();
                openConsultation();
              }}
            >
              {copy.heroCta}
              <span aria-hidden="true">→</span>
            </a>
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
            <AuthorNote
              title={copy.authorTitle}
              body={copy.authorBody}
              email={copy.authorEmail}
              emailLabel={copy.authorEmailLabel}
            />
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
            onOpenArticle={openArticle}
          />
        ) : null}

        {view.name === "consult" ? (
          <ConsultForm locale={locale} labels={copy} onBack={goHome} />
        ) : null}
      </div>
    </main>
  );
}
