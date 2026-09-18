import { createRequire } from "node:module";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { startLeadTestServer } from "../tests/helpers/lead-test-server.mjs";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const output = path.resolve(
  process.env.QA_OUTPUT || "../audit-2026-09-13/implementation",
);
await mkdir(output, { recursive: true });
const articles = JSON.parse(
  await readFile(path.join(output, "public-articles.json"), "utf8"),
);
const app = await startLeadTestServer(3043, articles);
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const report = { pages: [], widths: [], interactions: [], errors: [] };
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
page.on("pageerror", (error) =>
  report.errors.push({ url: page.url(), error: error.message }),
);
async function settleImages() {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 650) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 45));
    }
    scrollTo(0, 0);
    await Promise.all(
      Array.from(document.images)
        .filter((image) => image.complete)
        .map((image) => image.decode().catch(() => {})),
    );
  });
}
async function inspect() {
  return page.evaluate(() => ({
    url: location.href,
    width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    h1: Array.from(document.querySelectorAll("h1")).map((el) => el.textContent),
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    alternates: Array.from(document.querySelectorAll("link[hreflang]")).map(
      (el) => ({ lang: el.hreflang, href: el.href }),
    ),
    images: Array.from(document.images).map((img) => ({
      alt: img.alt,
      currentSrc: img.currentSrc,
      natural: img.naturalWidth,
      rendered: Math.round(img.getBoundingClientRect().width),
      dpr: devicePixelRatio,
      complete: img.complete,
    })),
    inputSizes: Array.from(
      document.querySelectorAll('input:not([type="checkbox"]),select,textarea'),
    )
      .filter((el) => el.getClientRects().length)
      .map((el) => ({ name: el.name, size: getComputedStyle(el).fontSize })),
    placeholders:
      (document.querySelector("main")?.innerText || "").match(
        /GIÁ MẪU|SAMPLE —|4\.9\/5|5[,.]000\+|Mesotherapy|melasma therapy|Laser Hair Removal/g,
      ) || [],
    links: Array.from(document.querySelectorAll("a[href]")).map((el) => ({
      href: el.getAttribute("href"),
      text: el.innerText,
      hidden: el.getAttribute("aria-hidden"),
      tabIndex: el.tabIndex,
    })),
  }));
}
try {
  const sitemap = await (await fetch(app.origin + "/sitemap.xml")).text();
  await writeFile(path.join(output, "sitemap-after.xml"), sitemap);
  const paths = [
    ...sitemap.matchAll(/<loc>https:\/\/hatobeauty.com([^<]*)<\/loc>/g),
  ].map((match) => match[1] || "/");
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    for (const route of paths) {
      const response = await page.goto(app.origin + route, {
        waitUntil: "networkidle",
      });
      await settleImages();
      const snapshot = await inspect();
      let axe;
      if (process.env.AXE_PATH) {
        await page.addScriptTag({ path: process.env.AXE_PATH });
        axe = await page.evaluate(async () => {
          const results = await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          });
          return results.violations.map((issue) => ({
            id: issue.id,
            impact: issue.impact,
            nodes: issue.nodes.map((node) => ({
              target: node.target,
              summary: node.failureSummary,
            })),
          }));
        });
      }
      report.pages.push({ ...snapshot, status: response.status(), axe });
      if (
        [
          "/",
          "/en",
          "/en/book",
          "/lien-he",
          "/en/services/facial-treatment-da-nang",
        ].includes(route)
      ) {
        const name =
          route === "/" ? "home" : route.replaceAll("/", "-").slice(1);
        await page.screenshot({
          path: path.join(output, `${name}-${width}.png`),
        });
        if (route === "/en") {
          await page.locator(".site-footer").scrollIntoViewIfNeeded();
          await page.screenshot({
            path: path.join(output, `footer-${width}.png`),
          });
        }
      }
      if (report.pages.length % 10 === 0)
        console.log(
          `Scanned ${report.pages.length} page/viewport combinations`,
        );
    }
  }
  for (const width of [360, 375, 390, 393, 430, 768, 1024, 1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    for (const route of [
      "/",
      "/en",
      "/dat-lich?service=skin",
      "/en/book?service=brow-lash",
    ]) {
      await page.goto(app.origin + route, { waitUntil: "networkidle" });
      report.widths.push(await inspect());
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(app.origin + "/en", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const focusResults = [];
  for (let count = 0; count < 35; count++) {
    await page.keyboard.press("Tab");
    focusResults.push(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    );
  }
  for (let count = 0; count < 35; count++) {
    await page.keyboard.press("Shift+Tab");
    focusResults.push(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    );
  }
  await page.keyboard.press("Escape");
  report.interactions.push({
    test: "drawer keyboard trap + restore",
    pass:
      focusResults.every(Boolean) &&
      (await page
        .getByRole("button", { name: "Open menu", exact: true })
        .evaluate((el) => el === document.activeElement)),
  });
  await page.goto(app.origin + "/en/book?service=brow-lash", {
    waitUntil: "networkidle",
  });
  report.interactions.push({
    test: "booking prefill",
    pass: (await page.locator('[name="service"]').inputValue()) === "brow-lash",
  });
  await page.locator('button[type="submit"]').first().click();
  report.interactions.push({
    test: "empty form rejected",
    pass: app.saved.length === 0,
  });
  await page.locator('[name="name"]').fill("QA Fixture");
  await page.locator('[name="preference"]').selectOption("email");
  await page.locator('[name="email"]').fill("qa@example.test");
  await page.locator('[name="date"]').fill("2099-01-01");
  app.control.delay = 150;
  await page.locator('.booking-page-form button[type="submit"]').focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  await page.getByRole("status").waitFor();
  report.interactions.push({
    test: "UI→API→isolated database→success, double submit guarded",
    pass:
      app.saved.length === 1 &&
      app.saved[0].email === "qa@example.test" &&
      /not confirmed/i.test(await page.getByRole("status").innerText()),
  });
  app.control.delay = 0;
  await page.goto(app.origin + "/en/contact", { waitUntil: "networkidle" });
  await page.locator('[name="name"]').fill("QA Fixture");
  await page.locator('[name="preference"]').selectOption("instagram");
  await page.locator('[name="social"]').fill("@qa.fixture");
  await page.locator('[name="consent"]').check();
  await page.locator('.contact-lead-form button[type="submit"]').focus();
  await page.keyboard.press("Enter");
  await page.getByRole("status").waitFor();
  report.interactions.push({
    test: "Instagram lead without phone",
    pass:
      app.saved.at(-1).social_contact === "@qa.fixture" &&
      app.saved.at(-1).phone === null,
  });
  const normal = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const media = await normal.newPage();
  const mp4 = new Set();
  media.on("request", (request) => {
    if (request.url().includes(".mp4")) mp4.add(request.url());
  });
  await media.goto(app.origin, { waitUntil: "networkidle" });
  const firstPlaying = await media
    .locator("video")
    .evaluate((el) => !el.paused);
  await media.locator(".site-footer").scrollIntoViewIfNeeded();
  await media.waitForTimeout(150);
  const pausedOffscreen = await media
    .locator("video")
    .evaluate((el) => el.paused);
  report.interactions.push({
    test: "only active video loads; pauses offscreen",
    pass: mp4.size === 1 && firstPlaying && pausedOffscreen,
    requests: [...mp4],
  });
  await page.goto(app.origin, { waitUntil: "networkidle" });
  report.interactions.push({
    test: "reduced motion does not attach video src",
    pass: (await page.locator("video").getAttribute("src")) === null,
  });
  await normal.close();
  console.log(
    JSON.stringify(
      {
        pages: report.pages.length,
        viewportChecks: report.widths.length,
        axeFailures: report.pages.filter((p) => p.axe?.length).length,
        overflow: [...report.pages, ...report.widths].filter(
          (p) => p.documentWidth > p.width,
        ).length,
        interactions: report.interactions,
        errors: report.errors,
      },
      null,
      2,
    ),
  );
} finally {
  if (
    report.errors.length ||
    report.interactions.some((test) => !test.pass) ||
    report.pages.some(
      (page) =>
        page.status !== 200 ||
        page.h1.length !== 1 ||
        page.placeholders.length ||
        page.axe?.length,
    ) ||
    [...report.pages, ...report.widths].some(
      (page) => page.documentWidth > page.width,
    )
  )
    process.exitCode = 1;
  await writeFile(
    path.join(output, "browser-after.json"),
    JSON.stringify(report, null, 2),
  );
  await browser.close();
  await app.stop();
}
