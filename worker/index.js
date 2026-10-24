import { applySecurityHeaders } from "./security-headers.js";
import { acceptsHtmlNavigation, classifyAppPath } from "./spa-routing.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || !acceptsHtmlNavigation(request)) {
      return applySecurityHeaders(response);
    }

    const routeKind = classifyAppPath(url.pathname);
    if (routeKind === "not-found") {
      const indexResponse = await fetchAppShell(request, env);
      return applySecurityHeaders(
        new Response(indexResponse.body, {
          status: 404,
          statusText: "Not Found",
          headers: indexResponse.headers,
        }),
      );
    }

    const indexResponse = await fetchAppShell(request, env);
    return applySecurityHeaders(
      new Response(indexResponse.body, {
        status: 200,
        headers: indexResponse.headers,
      }),
    );
  },
};

async function fetchAppShell(request, env) {
  const indexUrl = new URL(request.url);
  indexUrl.pathname = "/index.html";
  indexUrl.search = "";
  return env.ASSETS.fetch(new Request(indexUrl, request));
}
