import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { INQUIRY_ASK_SHARE } from "../scripts/lib/inquiry-share-meta.mjs";
import worker from "../worker/index.js";
import { SECURITY_HEADER_VALUES } from "../worker/security-headers.js";

function expectSecurityHeaders(response) {
  for (const [key, value] of Object.entries(SECURITY_HEADER_VALUES)) {
    assert.equal(response.headers.get(key), value, key);
  }
}

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
  expectSecurityHeaders(response);
});

test("serves prebuilt /ask HTML directly when the static file exists", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/ask", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          if (url.pathname === "/ask") {
            return new Response("<!doctype html><title>ask</title>", { status: 200 });
          }
          return new Response("missing", { status: 404 });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/ask"]);
  expectSecurityHeaders(response);
});

test("falls back to index.html for a known app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/study", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/study", "/index.html"]);
  expectSecurityHeaders(response);
});

test("returns 404 for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/this-does-not-exist-xyz", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 404);
  assert.deepEqual(calls, ["/this-does-not-exist-xyz", "/index.html"]);
  expectSecurityHeaders(response);
});

test("returns 404 for an unknown article slug", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/article/not-a-real-slug", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 404);
  expectSecurityHeaders(response);
});

test("serves a known article route with 200", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/article/nz-universities-overview", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  expectSecurityHeaders(response);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
    expectSecurityHeaders(response);
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/client/ask/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

test("built ask/index.html includes static WeChat share meta tags", async () => {
  const contentSource = await readFile(new URL("../src/content.js", import.meta.url), "utf8");
  for (const key of ["pageTitle", "metaDescription", "ogTitle", "ogDescription"]) {
    const value = INQUIRY_ASK_SHARE[key];
    assert.ok(contentSource.includes(value), `src/content.js should include inquiry zh ${key} text`);
  }
  assert.ok(contentSource.includes(`export const INQUIRY_OG_IMAGE = "${INQUIRY_ASK_SHARE.ogImage}"`));

  const askHtml = await readFile(new URL("../dist/client/ask/index.html", import.meta.url), "utf8");
  assert.ok(askHtml.includes(`<title>${INQUIRY_ASK_SHARE.pageTitle}</title>`));
  assert.ok(askHtml.includes(`name="description" content="${INQUIRY_ASK_SHARE.metaDescription}"`));
  assert.ok(askHtml.includes(`property="og:title" content="${INQUIRY_ASK_SHARE.ogTitle}"`));
  assert.ok(askHtml.includes(`property="og:description" content="${INQUIRY_ASK_SHARE.ogDescription}"`));
  assert.ok(askHtml.includes(`property="og:url" content="${INQUIRY_ASK_SHARE.ogUrl}"`));
  assert.ok(askHtml.includes(`property="og:image" content="${INQUIRY_ASK_SHARE.ogImage}"`));
  assert.match(askHtml, /<script type="module"[^>]+src="\/assets\//);
});
