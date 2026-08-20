import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleRow } from "./ArticleRow";
import { AuthorNote } from "./AuthorNote";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { CONTACT_EMAIL, getHomeArticles, siteCopy } from "./content";

export function HomeLanding({ locale, header }) {
  const zh = locale !== "en";
  const copy = siteCopy[locale];
  const guides = getHomeArticles(locale);
  const heroLines = zh ? ["留学新西兰", "从规划到落地"] : null;

  return (
    <>
      <PageTitle
        title={
          zh
            ? "点点新西兰留学咨询｜留学、求职与生活"
            : "DianDian NZ Study Consulting | Study, work and life"
        }
      />
      <section className="hero hero--cinematic">
        <HeroAtmosphere />
        {header}
        <div id="top" className="hero-copy">
          <h1>
            {heroLines ? (
              <>
                <span>{heroLines[0]}</span>
                <span>{heroLines[1]}</span>
              </>
            ) : (
              copy.heroTitle
            )}
          </h1>
          <p>{copy.heroLead}</p>
          <Link className="home-btn" to="/consult">
            {copy.heroCta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <div className="home-template">
        <div className="home-frame">
          <section id="latest" className="article-list article-list--cinematic">
            {guides.map((item) => (
              <ArticleRow
                key={item.guideId}
                article={item}
                featuredLabel={copy.featuredLabel}
              />
            ))}
          </section>
          <AuthorNote
            title={copy.authorTitle}
            body={copy.authorBody}
            email={CONTACT_EMAIL}
            locale={locale}
          />
        </div>
      </div>
    </>
  );
}

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}
