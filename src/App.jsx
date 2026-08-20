import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ArticlePage } from "./ArticlePage";
import { LogoMark } from "./LogoMark";
import { ArticleRow } from "./ArticleRow";
import { AuthorNote } from "./AuthorNote";
import { ConsultForm } from "./ConsultForm";
import { GuidePage } from "./GuidePage";
import {
  CONTACT_EMAIL,
  getArticle,
  getArticlesByGuide,
  getGuide,
  getHomeArticles,
  siteCopy,
} from "./content";

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}

function Header({ locale, setLocale }) {
  const copy = siteCopy[locale];

  return (
    <section className="hero hero--compact">
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label={copy.siteName}>
          <LogoMark className="wordmark__mark" />
          <span className="wordmark__brand">{copy.siteBrand}</span>
          <span className="wordmark__divider" aria-hidden="true" />
          <span className="wordmark__tag">{copy.siteTag}</span>
        </Link>
        <nav aria-label={locale === "zh" ? "主导航" : "Primary navigation"}>
          <span className="main-nav">
            {[
              ["/", locale === "zh" ? "首页" : "Home"],
              ["/study", locale === "zh" ? "留学" : "Study"],
              ["/career", locale === "zh" ? "求职" : "Career"],
              ["/life", locale === "zh" ? "生活" : "Life"],
              ["/consult", locale === "zh" ? "咨询" : "Consult"],
            ].map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
          </span>
          <span className="locale-switch" aria-label="Language">
            <button type="button" className={locale === "zh" ? "is-active" : ""} aria-pressed={locale === "zh"} onClick={() => setLocale("zh")}>中文</button>
            <span aria-hidden="true">|</span>
            <button type="button" className={locale === "en" ? "is-active" : ""} aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button>
          </span>
        </nav>
      </header>
    </section>
  );
}

function Footer({ locale }) {
  const copy = siteCopy[locale];
  return (
    <footer className="site-footer">
      <div>
        <strong>{copy.siteName}</strong>
        <span>Auckland · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span>
      </div>
      <div>
        <a href="https://www.immigration.govt.nz/" target="_blank" rel="noreferrer">Immigration New Zealand</a>
        <span>{copy.privacyNote}</span>
        <small>{copy.disclaimer}</small>
      </div>
    </footer>
  );
}

function Home({ locale }) {
  const copy = siteCopy[locale];
  return (
    <>
      <PageTitle title={locale === "zh" ? "点点新西兰留学咨询｜留学、求职与生活" : "DianDian NZ Study Consulting | Study, work and life"} />
      <section className="hero hero--home">
        <div id="top" className="hero-copy">
          <h1>{copy.heroTitle}</h1>
          <Link className="primary-cta" to="/consult">{copy.heroCta}<span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <div className="content-frame">
        <section id="latest" className="article-list">
          {getHomeArticles(locale).map((item) => <ArticleRow key={item.guideId} article={item} featuredLabel={copy.featuredLabel} />)}
        </section>
        <AuthorNote title={copy.authorTitle} body={copy.authorBody} email={CONTACT_EMAIL} />
      </div>
    </>
  );
}

function GuideRoute({ locale, guideId }) {
  const guide = getGuide(guideId);
  const navigate = useNavigate();
  if (!guide) return <NotFound locale={locale} />;
  return (
    <div className="content-frame">
      <PageTitle title={`${locale === "zh" ? guide.titleZh : guide.titleEn}｜点点新西兰留学咨询`} />
      <GuidePage guide={guide} articles={getArticlesByGuide(guide.id)} locale={locale} labels={siteCopy[locale]} onBack={() => navigate("/")} />
    </div>
  );
}

function ArticleRoute({ locale }) {
  const { slug } = useParams();
  const article = getArticle(slug);
  const navigate = useNavigate();
  if (!article) return <NotFound locale={locale} />;
  return (
    <div className="content-frame">
      <PageTitle title={`${locale === "zh" ? article.titleZh : article.titleEn}｜点点新西兰留学咨询`} />
      <ArticlePage article={article} locale={locale} labels={siteCopy[locale]} onBackHome={() => navigate("/")} onBackGuide={() => navigate(`/${article.guideId}`)} />
    </div>
  );
}

function NotFound({ locale }) {
  return <div className="content-frame"><PageTitle title={`404｜点点新西兰留学咨询`} /><section className="detail-page not-found"><h1>{locale === "zh" ? "页面没有找到" : "Page not found"}</h1><p>{locale === "zh" ? "这个链接可能已经变更。请从首页继续浏览。" : "This link may have changed. Continue from the home page."}</p><Link className="primary-cta" to="/">{locale === "zh" ? "返回首页" : "Back home"}</Link></section></div>;
}

function AppContent() {
  const [locale, setLocale] = useState(() => localStorage.getItem("diandian-locale") || "zh");
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("diandian-locale", locale);
  }, [locale]);

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // jsdom does not implement scrollTo.
    }
  }, [location.pathname]);

  return (
    <main className="site-shell">
      <Header locale={locale} setLocale={setLocale} />
      <Routes>
        <Route path="/" element={<Home locale={locale} />} />
        <Route path="/study" element={<GuideRoute locale={locale} guideId="study" />} />
        <Route path="/career" element={<GuideRoute locale={locale} guideId="career" />} />
        <Route path="/life" element={<GuideRoute locale={locale} guideId="life" />} />
        <Route path="/article/:slug" element={<ArticleRoute locale={locale} />} />
        <Route path="/consult" element={<div className="content-frame"><PageTitle title={`${locale === "zh" ? "咨询" : "Consultation"}｜点点新西兰留学咨询`} /><ConsultForm locale={locale} labels={siteCopy[locale]} onBack={() => window.history.back()} /></div>} />
        <Route path="*" element={<NotFound locale={locale} />} />
      </Routes>
      <Footer locale={locale} />
    </main>
  );
}

export function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}
