import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/opt/cursor/artifacts/screenshots";
mkdirSync(OUT, { recursive: true });

const WECHAT_UA =
  "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/107.0.5304.141 Mobile Safari/537.36 MicroMessenger/8.0.49.2601(0x28003137) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64";

const iPhone = devices["iPhone 13"];
const baseURL = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";
const viewport = { width: 390, height: 844 };

async function shot(page, name) {
  await page.setViewportSize(viewport);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
}

async function fillValid(page) {
  await page.getByRole("radio", { name: "本科" }).click();
  await page.getByRole("radio", { name: "在职" }).click();
  await page.fill("#inquiry-job", "软件工程师");
  await page.getByRole("radio", { name: "20-50万" }).click();
  await page.getByRole("radio", { name: "30-50万" }).click();
  await page.getByRole("radio", { name: "IT" }).click();
  await page.fill("#inquiry-email", "demo@example.com");
}

const browser = await chromium.launch();
const context = await browser.newContext({
  ...iPhone,
  userAgent: WECHAT_UA,
  locale: "zh-CN",
  viewport,
});
const page = await context.newPage();

await page.goto(`${baseURL}/ask`, { waitUntil: "networkidle" });
await shot(page, "ask-zh-form-mobile-wechat");

await page.getByRole("button", { name: "提交咨询" }).click();
await page.waitForTimeout(200);
await shot(page, "ask-zh-errors-mobile-wechat");

await page.evaluate(() => localStorage.setItem("diandian-inquiry-last-submit", "0"));

await page.route("**/api.web3forms.com/**", async (route) => {
  await new Promise((r) => setTimeout(r, 2500));
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true }),
  });
});

await fillValid(page);
await page.waitForTimeout(3500);
const submitClick = page.getByRole("button", { name: "提交咨询" }).click();
await page.getByRole("button", { name: "提交中…" }).waitFor({ timeout: 5000 });
await shot(page, "ask-zh-loading-mobile-wechat");
await submitClick;

await page.waitForSelector("#inquiry-success-title", { timeout: 8000 });
await shot(page, "ask-zh-confirmation-mobile-wechat");

const enPage = await context.newPage();
await enPage.goto(`${baseURL}/ask`, { waitUntil: "networkidle" });
await enPage.getByRole("button", { name: "EN" }).click();
await enPage.waitForTimeout(300);
await shot(enPage, "ask-en-form-mobile-wechat");

await enPage.route("**/api.web3forms.com/**", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true }),
  });
});
await enPage.evaluate(() => localStorage.setItem("diandian-inquiry-last-submit", "0"));
await enPage.getByRole("radio", { name: "Bachelor" }).click();
await enPage.getByRole("radio", { name: "Employed", exact: true }).click();
await enPage.getByRole("radio", { name: "¥200k–500k" }).click();
await enPage.getByRole("radio", { name: "¥300k–500k" }).click();
await enPage.getByRole("radio", { name: "IT" }).click();
await enPage.fill("#inquiry-job", "Software engineer");
await enPage.fill("#inquiry-email", "demo@example.com");
await enPage.waitForTimeout(3500);
await enPage.getByRole("button", { name: "Send inquiry" }).click();
await enPage.waitForSelector("#inquiry-success-title", { timeout: 8000 });
await shot(enPage, "ask-en-confirmation-mobile-wechat");

await browser.close();
console.log("Saved screenshots to", OUT);
