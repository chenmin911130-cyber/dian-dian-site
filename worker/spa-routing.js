import { ARTICLE_SLUGS, STATIC_APP_ROUTES } from "./routes-data.js";

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

/** @returns {"app" | "not-found"} */
export function classifyAppPath(pathname) {
  const path = normalizePath(pathname);
  if (path === "/") return "app";
  if (STATIC_APP_ROUTES.has(path)) return "app";
  const articleMatch = path.match(/^\/article\/([^/]+)$/);
  if (articleMatch) {
    return ARTICLE_SLUGS.has(articleMatch[1]) ? "app" : "not-found";
  }
  return "not-found";
}

function headerValue(request, name) {
  const headers = request.headers;
  if (headers && typeof headers.get === "function") {
    return headers.get(name) ?? "";
  }
  const value = headers?.[name.toLowerCase()];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function acceptsHtmlNavigation(request) {
  if (!["GET", "HEAD"].includes(request.method)) return false;
  const accept = headerValue(request, "accept");
  if (!accept) return true;
  if (accept.includes("text/html")) return true;
  if (accept.includes("*/*") && !accept.includes("application/json")) return true;
  return false;
}
