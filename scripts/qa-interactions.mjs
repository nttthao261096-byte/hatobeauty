import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { startLeadTestServer } from "../tests/helpers/lead-test-server.mjs";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const output = path.resolve("../audit-2026-09-13/implementation");
const articles = JSON.parse(
  await readFile(path.join(output, "public-articles.json"), "utf8"),
);
const previous = JSON.parse(
  await readFile(path.join(output, "browser-after.json"), "utf8"),
);
const app = await startLeadTestServer(3046, articles);
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const report = { tests: [], errors: [], links: [], languages: [], images: [] };
page.on("pageerror", (error) => report.errors.push(error.message));
const check = (test, pass, evidence) => {
  report.tests.push({ test, pass, evidence });
  if (!pass) console.log("FAIL: " + test);
};
const go = (route) =>
  page.goto(app.origin + route, { waitUntil: "networkidle" });
try {
  const routes = [
    ...new Set(previous.pages.map((p) => new URL(p.url).pathname)),
  ];
  for (const route of routes) {
    await go(route);
    const lang = route.startsWith("/en") ? "vi-VN" : "en";
    const target = await page
      .locator('.header-tools [hreflang="' + lang + '"]')
      .getAttribute("href");
    await page.locator('.header-tools [hreflang="' + lang + '"]').click();
    await page.waitForURL(app.origin + target);
    report.languages.push({
      from: route,
      to: new URL(page.url()).pathname,
      pass: new URL(page.url()).pathname === target,
    });
  }
  check(
    "50 actual VI/EN language-switch clicks preserve entity",
    report.languages.every((item) => item.pass),
  );
  const targets = [
    ...new Set(
      previous.pages
        .flatMap((p) => p.links)
        .map((l) => l.href)
        .filter((h) => h?.startsWith("/") && !h.startsWith("//")),
    ),
  ];
  for (const target of targets) {
    const url = new URL(target, app.origin);
    const response = await fetch(url, { redirect: "manual" });
    const html = await response.text();
    const hashExists =
      !url.hash ||
      html.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"');
    report.links.push({ target, status: response.status, hashExists });
  }
  check(
    "all discovered internal links have a final 200 and valid fragment",
    report.links.every((link) => link.status === 200 && link.hashExists),
    report.links.filter((link) => link.status !== 200 || !link.hashExists),
  );
  await go("/en/book?service=skin");
  await page.locator('.header-tools [hreflang="vi-VN"]').click();
  check(
    "booking language switch retains selected service",
    new URL(page.url()).searchParams.get("service") === "skin" &&
      (await page.locator('[name="service"]').inputValue()) === "skin",
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await go("/en");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.locator('.nav-drawer-language [hreflang="vi-VN"]').click();
  await page.waitForURL(app.origin + "/");
  check(
    "mobile language switch closes drawer and restores page",
    (await page.getByRole("dialog").count()) === 0 &&
      (await page.locator("main").evaluate((el) => !el.inert)),
  );
  await go("/en");
  const filter = page.locator(".service-filters button").nth(1);
  await filter.focus();
  await page.keyboard.press("Enter");
  check(
    "keyboard service filter updates pressed state and cards",
    (await filter.getAttribute("aria-pressed")) === "true" &&
      (await page.locator(".service-card").count()) === 1,
  );
  await page.locator(".service-filters button").first().focus();
  await page.keyboard.press("Enter");
  check(
    "All filter restores five groups",
    (await page.locator(".service-card").count()) === 5,
  );
  const next = page.getByRole("button", { name: "Next slide", exact: true });
  const before = await page.locator(".feature-copy h3").textContent();
  await next.focus();
  await page.keyboard.press("Enter");
  check(
    "keyboard carousel changes slide and selection",
    (await page.locator(".feature-copy h3").textContent()) !== before &&
      (await page
        .locator('.feature-controls button[aria-pressed="true"]')
        .count()) === 1,
  );
  await page.locator(".service-card-skin").click();
  await page.waitForURL(app.origin + "/en/services/facial-treatment-da-nang");
  const summary = page.locator("details summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  check(
    "FAQ opens by keyboard",
    await summary.evaluate((el) => el.parentElement.open),
  );
  const request = page.locator(".service-menu-actions a");
  await request.click();
  await page.waitForURL(app.origin + "/en/book?service=skin");
  check(
    "service→request actual click prefills form",
    (await page.locator('[name="service"]').inputValue()) === "skin",
  );
  check(
    "mobile dock does not cover booking page",
    !(await page.locator(".mobile-dock").isVisible()),
  );
  await page.screenshot({
    path: path.join(output, "booking-final-mobile.png"),
  });

  await page.locator('[name="name"]').fill("QA Fixture");
  await page.locator('[name="preference"]').selectOption("whatsapp");
  await page.locator('[name="phone"]').fill("0901234567");
  await page.locator('[name="date"]').fill("2099-01-01");
  await page.locator('.booking-page-form button[type="submit"]').click();
  check(
    "invalid WhatsApp number rejected in browser",
    app.saved.length === 0 &&
      (await page
        .locator('[name="phone"]')
        .evaluate((el) => !el.validity.valid)),
  );
  await page.locator('[name="phone"]').fill("+84901234567");
  app.control.fail = true;
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/bookings") && response.status() === 502,
    ),
    page.locator('.booking-page-form button[type="submit"]').click(),
  ]);
  await page.locator(".booking-error[role=alert]").waitFor();
  check(
    "backend error keeps form data and never shows success",
    app.saved.length === 0 &&
      (await page.getByRole("status").count()) === 0 &&
      (await page.locator('[name="phone"]').inputValue()) === "+84901234567",
  );
  app.control.fail = false;
  await page.locator('.booking-page-form button[type="submit"]').click();
  await page.getByRole("status").waitFor();
  check("retry after error saves exactly one request", app.saved.length === 1);

  await go("/en/contact");
  check(
    "contact dock hidden and visible fields at least 16px",
    !(await page.locator(".mobile-dock").isVisible()) &&
      (await page
        .locator(
          ".contact-form-grid input:visible, .contact-form-grid select:visible, .contact-form-grid textarea:visible",
        )
        .evaluateAll((fields) =>
          fields.every((el) => parseFloat(getComputedStyle(el).fontSize) >= 16),
        )),
  );
  await page.locator('[name="name"]').fill("x".repeat(180));
  check(
    "name input bounds long values to 120",
    (await page.locator('[name="name"]').inputValue()).length === 120,
  );
  await go("/en/services/head-spa-da-nang");
  await page.getByRole("link", { name: "Back to top ↑", exact: true }).click();
  check(
    "back-to-top stays on current route",
    new URL(page.url()).pathname === "/en/services/head-spa-da-nang" &&
      (await page.evaluate(() => scrollY < 10)),
  );
  for (const route of [
    "/en/services/head-spa-da-nang",
    "/en/services/waxing-da-nang",
    "/en/about",
  ]) {
    await go(route);
    await page.screenshot({
      path: path.join(
        output,
        route.replaceAll("/", "-").slice(1) + "-final-mobile.png",
      ),
    });
    check(
      "mobile service content fits, including clipped containers: " + route,
      await page
        .locator(
          ".service-detail-menu-heading, .service-detail-menu-summary, .about-value-image",
        )
        .evaluateAll((elements) =>
          elements.every(
            (el) => el.getBoundingClientRect().width <= innerWidth,
          ),
        ),
    );
  }
  for (const width of [768, 1024, 1366, 1920]) {
    await page.setViewportSize({
      width,
      height: width === 768 ? 1024 : width === 1366 ? 768 : 1080,
    });
    for (const route of ["/", "/en"]) {
      await go(route);
      const result = await page.evaluate(() => {
        const nav = document.querySelector(".nav"),
          tools = document.querySelector(".header-tools");
        const n = nav.getBoundingClientRect(),
          t = tools.getBoundingClientRect();
        return {
          documentWidth: document.documentElement.scrollWidth,
          width: innerWidth,
          overlap:
            n.width > 0 &&
            n.right > t.left &&
            n.top < t.bottom &&
            n.bottom > t.top &&
            getComputedStyle(nav).visibility !== "hidden",
        };
      });
      check(
        "header geometry " + width + " " + route,
        !result.overlap && result.documentWidth <= width,
        result,
      );
      if (width === 1024)
        await page.screenshot({
          path: path.join(
            output,
            "header-" + (route === "/" ? "vi" : "en") + "-1024.png",
          ),
        });
      if (width >= 1024) {
        const cta = page.locator(".header-tools .header-booking-link");
        for (const state of ["hover", "focus", "active"]) {
          if (state === "hover") await cta.hover();
          if (state === "focus") await cta.focus();
          if (state === "active") {
            await cta.hover();
            await page.mouse.down();
          }
          const visible = await cta.evaluate((el) => {
            const span = el.querySelector(".header-book-full"),
              style = getComputedStyle(span),
              box = span.getBoundingClientRect();
            return (
              box.width > 0 &&
              box.height > 0 &&
              style.visibility === "visible" &&
              style.opacity !== "0" &&
              style.color !== "rgba(0, 0, 0, 0)"
            );
          });
          if (state === "active") {
            await page.mouse.move(0, 0);
            await page.mouse.up();
          }
          check(
            "booking label visible " + width + " " + route + " " + state,
            visible,
          );
        }
      }
    }
  }
  // 1440px browser window at 200% gives a 720 CSS-pixel layout.
  const zoomContext = await browser.newContext({
    viewport: { width: 720, height: 450 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const zoom = await zoomContext.newPage();
  for (const route of [
    "/en",
    "/en/book",
    "/lien-he",
    "/dich-vu/goi-dau-duong-sinh-da-nang",
  ]) {
    await zoom.goto(app.origin + route, { waitUntil: "networkidle" });
    check(
      "200% reflow equivalent " + route,
      await zoom.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
  }
  await zoomContext.close();
  const highDpr = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    reducedMotion: "reduce",
  });
  const phone = await highDpr.newPage();
  await phone.goto(app.origin + "/en/services/head-spa-da-nang", {
    waitUntil: "networkidle",
  });
  report.images = await phone
    .locator(".service-detail-menu-label img, .site-header > .brand img")
    .evaluateAll((images) =>
      images.map((img) => ({
        currentSrc: img.currentSrc,
        sizes: img.parentElement.querySelector("source")?.sizes,
        naturalWidth: img.naturalWidth,
        renderedWidth: img.getBoundingClientRect().width,
        dpr: devicePixelRatio,
        complete: img.complete,
      })),
    );
  check(
    "DPR3 imagery selects responsive sources",
    report.images.every(
      (img) =>
        img.complete &&
        img.currentSrc.includes("/media/") &&
        img.naturalWidth >= img.renderedWidth * 0.95,
    ),
    report.images,
  );
  await highDpr.close();
  check("no browser JS errors", report.errors.length === 0, report.errors);
} finally {
  if (report.tests.some((test) => !test.pass) || report.errors.length)
    process.exitCode = 1;
  await writeFile(
    path.join(output, "interactions-after.json"),
    JSON.stringify(report, null, 2),
  );
  await browser.close();
  await app.stop();
  console.log(
    JSON.stringify(
      {
        tests: report.tests.length,
        failed: report.tests.filter((test) => !test.pass),
        languages: report.languages.length,
        internalLinks: report.links.length,
        errors: report.errors,
      },
      null,
      2,
    ),
  );
}
