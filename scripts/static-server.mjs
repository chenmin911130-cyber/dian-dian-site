#!/usr/bin/env node
import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SECURITY_HEADER_VALUES } from "../worker/security-headers.js";
import { acceptsHtmlNavigation, classifyAppPath } from "../worker/spa-routing.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientRoot = path.join(root, "dist", "client");
const port = Number(process.env.PORT || 8080);

const indexPath = path.join(clientRoot, "index.html");
let indexHtml = await readFile(indexPath);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  if (decoded === "/" || decoded === "") {
    return indexPath;
  }
  const relative = decoded.replace(/^\/+/, "");
  const candidate = path.normalize(path.join(clientRoot, relative));
  if (!candidate.startsWith(clientRoot)) return null;
  if (!existsSync(candidate) || !statSync(candidate).isFile()) return null;
  return candidate;
}

function send(response, status, body, extraHeaders = {}) {
  const headers = { ...SECURITY_HEADER_VALUES, ...extraHeaders };
  response.writeHead(status, headers);
  if (body === undefined) {
    response.end();
    return;
  }
  if (typeof body === "string" || body instanceof Uint8Array) {
    response.end(body);
    return;
  }
  body.pipe(response);
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const filePath = resolveFile(url.pathname);

  if (filePath) {
    const ext = path.extname(filePath).toLowerCase();
    send(response, 200, createReadStream(filePath), {
      "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
    });
    return;
  }

  if (!acceptsHtmlNavigation(request)) {
    send(response, 404, "Not Found", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  const routeKind = classifyAppPath(url.pathname);
  const status = routeKind === "app" ? 200 : 404;
  send(response, status, indexHtml, { "Content-Type": "text/html; charset=utf-8" });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Static server listening on http://0.0.0.0:${port}`);
});
