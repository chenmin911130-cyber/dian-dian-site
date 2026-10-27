/** @param {string} value */
function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * @param {string} html
 * @param {"name" | "property"} attr
 * @param {string} key
 * @param {string} content
 */
function setMeta(html, attr, key, content) {
  const pattern = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/>`);
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

/**
 * @param {string} shellHtml Vite-built index.html
 * @param {{
 *   pageTitle: string;
 *   metaDescription: string;
 *   ogTitle: string;
 *   ogDescription: string;
 *   ogImage: string;
 *   ogUrl: string;
 *   ogSiteName: string;
 *   ogLocale: string;
 * }} meta
 */
export function buildAskShareHtml(shellHtml, meta) {
  let html = shellHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.pageTitle)}</title>`);
  html = setMeta(html, "name", "description", meta.metaDescription);
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeAttr(meta.ogUrl)}" />`,
  );
  html = setMeta(html, "property", "og:title", meta.ogTitle);
  html = setMeta(html, "property", "og:description", meta.ogDescription);
  html = setMeta(html, "property", "og:url", meta.ogUrl);
  html = setMeta(html, "property", "og:image", meta.ogImage);
  html = setMeta(html, "property", "og:site_name", meta.ogSiteName);
  html = setMeta(html, "property", "og:locale", meta.ogLocale);
  return html;
}
