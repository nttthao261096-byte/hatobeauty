import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:3040";
const output = path.resolve("../audit-2026-09-13/implementation");
await mkdir(output, { recursive: true });
const viewports = [
  [360, 800],
  [375, 667],
  [390, 844],
  [393, 852],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1366, 768],
  [1440, 900],
  [1920, 1080],
];
const routes = [
  "/",
  "/en",
  "/dat-lich?service=skin",
  "/en/book?service=skin",
  "/lien-he",
  "/en/contact",
  "/dich-vu",
  "/en/services",
  "/bang-gia",
  "/en/prices",
  "/kien-thuc",
  "/en/journal",
];
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const report = {
  environment: "Chrome viewport emulation; not physical devices",
  pages: [],
  errors: [],
};
page.on("pageerror", (error) =>
  report.errors.push({ url: page.url(), message: error.message }),
);
try {
  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      const response = await page.goto(origin + route, {
        waitUntil: "networkidle",
      });
      const evidence = await page.evaluate(() => {
        const visible = (element) => element.getClientRects().length > 0;
        // Checkbox/radio controls have no editable text and cannot trigger
        // iOS's small-input text zoom; their touch targets are checked separately.
        const inputs = [
          ...document.querySelectorAll(
            "input:not([type=hidden]):not([type=checkbox]):not([type=radio]), select, textarea",
          ),
        ]
          .filter(visible)
          .map((element) => ({
            name: element.getAttribute("name"),
            size: parseFloat(getComputedStyle(element).fontSize),
          }));
        const clipped = [
          ...document.querySelectorAll(
            "h1, .header-book, .hero-actions a, .booking-form input:not([type=hidden]), .booking-form select",
          ),
        ]
          .filter(visible)
          .filter((element) => {
            const r = element.getBoundingClientRect();
            return r.left < -1 || r.right > innerWidth + 1;
          })
          .map((element) => ({
            tag: element.tagName,
            text: element.textContent?.trim().slice(0, 80),
          }));
        return {
          documentWidth: document.documentElement.scrollWidth,
          h1: document.querySelectorAll("h1").length,
          inputs,
          clipped,
          errorOverlay: !!document.querySelector(
            "[data-nextjs-dialog], .vite-error-overlay",
          ),
        };
      });
      const pass =
        response.status() === 200 &&
        evidence.documentWidth <= width + 1 &&
        evidence.h1 === 1 &&
        !evidence.clipped.length &&
        !evidence.errorOverlay &&
        (width > 768 || evidence.inputs.every((input) => input.size >= 16));
      report.pages.push({
        route,
        width,
        height,
        status: response.status(),
        pass,
        ...evidence,
      });
      if (!pass) console.log("FAIL", route, width, height, evidence);
      if (
        (route === "/" && [375, 768, 1366, 1920].includes(width)) ||
        (route === "/en/book?service=skin" && width === 375)
      ) {
        await page.screenshot({
          path: path.join(
            output,
            `final-${route === "/" ? "home" : "booking-en"}-${width}x${height}.png`,
          ),
        });
      }
    }
    console.log(`${width}x${height}: ${routes.length} route checks`);
  }
} finally {
  await browser.close();
  await writeFile(
    path.join(output, "exact-viewports-after.json"),
    JSON.stringify(report, null, 2),
  );
}
const failures = report.pages.filter((entry) => !entry.pass);
console.log(
  JSON.stringify({
    pages: report.pages.length,
    failures: failures.length,
    errors: report.errors.length,
  }),
);
if (failures.length || report.errors.length) process.exitCode = 1;
