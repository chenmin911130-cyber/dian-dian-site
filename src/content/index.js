import { careerArticles } from "./articlesCareer.js";
import { lifeArticles } from "./articlesLife.js";
import { studyArticles } from "./articlesStudy.js";
import { guides } from "./guides.js";
import { guideCategories, siteCopy } from "./site.js";

export { guides, guideCategories, siteCopy };

export const articles = [...studyArticles, ...careerArticles, ...lifeArticles].map(
  (article) => {
    const category = (guideCategories[article.guideId] || []).find(
      (item) => item.id === article.categoryId,
    );
    return {
      ...article,
      categoryZh: category?.zh,
      categoryEn: category?.en,
    };
  },
);

export function getGuide(id) {
  return guides.find((guide) => guide.id === id);
}

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByGuide(guideId) {
  return articles.filter((article) => article.guideId === guideId);
}

export function getHomeArticles(locale) {
  const zh = locale === "zh";
  return guides.map((guide) => {
    const featured = getArticle(guide.featuredSlug);
    return {
      guideId: guide.id,
      title: zh ? guide.titleZh : guide.titleEn,
      summary: zh ? guide.summaryZh : guide.summaryEn,
      featured: zh
        ? guide.featuredTitleZh || featured?.titleZh
        : guide.featuredTitleEn || featured?.titleEn,
      featuredSlug: guide.featuredSlug,
      action: zh ? siteCopy.zh.exploreGuide : siteCopy.en.exploreGuide,
      read: zh ? siteCopy.zh.readArticle : siteCopy.en.readArticle,
      image: guide.image,
      imageAlt: zh ? guide.imageAltZh : guide.imageAltEn,
    };
  });
}
