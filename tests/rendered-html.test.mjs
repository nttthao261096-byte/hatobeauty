import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { startLeadTestServer } from "./helpers/lead-test-server.mjs";

// The 2026-09 audit supersedes the old assertions requiring sample prices,
// invented testimonials, medical menus and four eagerly loaded hero videos.
// Test the deployed Next runtime, not the previous Workers-only build.
const visibleMarkup = (html) =>
  html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
test("keeps image assets intact (not Git LFS pointers)", async () => {
  const signature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  for (const name of [
    "guest-trust-avatars-v1.png",
    "results-skin-gallery-v1.png",
    "results-brow-lash-gallery-v1.png",
    "results-scalp-gallery-v1.png",
    "results-hair-removal-gallery-v1.png",
    "results-waxing-gallery-v1.png",
  ]) {
    const file = await readFile(
      new URL("../public/images/" + name, import.meta.url),
    );
    assert.ok(file.subarray(0, 8).equals(signature), name);
    assert.ok(file.length > 10000, name);
  }
});

test("public route, brand, claim, canonical and booking contracts", async (t) => {
  const app = await startLeadTestServer(3045);
  const get = async (path) => {
    const response = await fetch(app.origin + path, { redirect: "follow" });
    assert.equal(response.status, 200, path);
    return visibleMarkup(await response.text());
  };
  try {
    await t.test(
      "preserves brand, five groups, approved carousel, video and shared footer",
      async () => {
        const vi = await get("/");
        const en = await get("/en");
        for (const text of [
          "Tỏa sáng là chính bạn.",
          "Thiết bị hiện đại",
          "Đội ngũ chuyên nghiệp",
          "Dịch vụ cá nhân hóa",
          "Không gian thư giãn",
          "Nhận ưu đãi mới mỗi tháng",
        ])
          assert.ok(vi.includes(text), text);
        assert.match(en, /Shine as you are/);
        for (const html of [vi, en]) {
          assert.equal((html.match(/<video\b/g) || []).length, 1);
          assert.match(html, /hato-logo-transparent-v3/);
          assert.match(html, /class="site-footer/);
          assert.match(html, /<footer[\s\S]*class="contact-socials/);
          assert.match(html, /href="#top"/);
          assert.match(html, /href="tel:\+84703214868"/);
          assert.match(html, /href="mailto:hatobeautydanang@gmail\.com"/);
          assert.doesNotMatch(
            html,
            /4\.9\/5|5[.,]000\+|class="review-grid|class="results section/,
          );
          assert.equal(
            (html.match(/class="service-card service-card-/g) || []).length,
            5,
          );
        }
        assert.match(vi, /href="\/dat-lich"/);
        assert.match(en, /href="\/en\/book"/);
        assert.match(en, /href="https:\/\/wa\.me\/84703214868"/);
        assert.doesNotMatch(en, /href="https:\/\/zalo\.me/);
      },
    );
    await t.test(
      "restores the approved bilingual product catalogue",
      async () => {
        const vi = await get("/san-pham/");
        const en = await get("/en/care-products/");
        for (const html of [vi, en]) {
          assert.equal(
            (html.match(/class="product-card(?:\s|\")/g) || []).length,
            10,
          );
          assert.doesNotMatch(
            html,
            /Danh mục đang được cập nhật|catalogue is being updated/,
          );
        }
        assert.match(vi, /Sữa rửa mặt OXYGEN 2 in 1 Cleanser/);
        assert.match(vi, /DermEden LUMIXDERM Brightening Cream/);
        assert.match(vi, /Purlés 156 SOS Calm Mask/);
        assert.match(vi, /DermEden Intense Night Cream/);
        assert.match(vi, /SUZANOBAGIMD® Claribright Lotion/);
        assert.match(vi, /1\.867\.000đ/);
        assert.match(vi, /658\.000đ/);
        assert.match(vi, /1\.714\.000đ/);
        assert.match(vi, /4\.629\.000đ/);
        assert.doesNotMatch(vi, /Toner cân bằng/);
        assert.doesNotMatch(vi, /Serum HA cấp ẩm/);
        assert.doesNotMatch(vi, /Serum niacinamide làm đều tone/);
        assert.doesNotMatch(vi, /Kem dưỡng phục hồi hàng rào/);
        assert.ok(
          vi.indexOf("DermEden LUMIXDERM Brightening Cream") <
            vi.indexOf("Sữa rửa mặt OXYGEN 2 in 1 Cleanser"),
        );
        assert.match(en, /OXYGEN 2 in 1 Cleanser/);
      },
    );
    await t.test(
      "all sitemap URLs return final 200, one H1, metadata and reciprocal final alternates",
      async () => {
        const xml = await (await fetch(app.origin + "/sitemap.xml")).text();
        assert.match(xml, /san-pham-cham-soc|laser-hair-removal/);
        assert.match(xml, /<lastmod>/);
        const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
        assert.ok(urls.length >= 48);
        const documents = new Map();
        for (const url of urls) {
          const route = new URL(url).pathname;
          assert.ok(route === "/" || route.endsWith("/"), route);
          const html = await get(route);
          documents.set(new URL(url).href, html);
          assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route);
          assert.match(html, /<title>[^<]+<\/title>/, route);
          assert.match(html, /<meta name="description" content="[^"]+"/, route);
          const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
          const expectedCanonical =
            route === "/san-pham-cham-soc/"
              ? "https://hatobeauty.com/san-pham/"
              : new URL(url).href;
          assert.equal(new URL(canonical).href, expectedCanonical, route);
          assert.doesNotMatch(
            html,
            /GIÁ MẪU|SAMPLE —|replace with|4\.9\/5|5[.,]000\+|Laser Hair Removal/,
            route,
          );
          assert.match(html, /id="main-content"/, route);
          assert.match(html, /class="site-footer/, route);
        }
        for (const [url, html] of documents) {
          if (url.includes("/san-pham-cham-soc/")) continue;
          for (const link of html.matchAll(
            /<link rel="alternate" hrefLang="(?:vi-VN|en)" href="([^"]+)"/g,
          )) {
            assert.ok(
              documents.has(new URL(link[1]).href),
              "Missing alternate: " + link[1],
            );
            assert.ok(
              [
                ...documents
                  .get(new URL(link[1]).href)
                  .matchAll(
                    /<link rel="alternate" hrefLang="(?:vi-VN|en)" href="([^"]+)"/g,
                  ),
              ].some((entry) => new URL(entry[1]).href === url),
              "Nonreciprocal: " + url,
            );
          }
        }
      },
    );
    await t.test(
      "existing URL variants remain reachable and preserve query parameters",
      async () => {
        for (const from of [
          "/san-pham-cham-soc?qa=1",
          "/en/services/laser-hair-removal-da-nang?qa=1",
          "/en/services/?qa=1",
        ]) {
          const response = await fetch(app.origin + from, {
            redirect: "manual",
          });
          assert.ok([200, 308].includes(response.status), from);
        }
        assert.equal(
          (await fetch(app.origin + "/qa-not-a-real-page")).status,
          404,
        );
      },
    );
    await t.test(
      "shared service facts, structured breadcrumbs and prefilled booking",
      async () => {
        const xml = await (await fetch(app.origin + "/sitemap.xml")).text();
        for (const route of [
          ...xml.matchAll(
            /<loc>https:\/\/hatobeauty.com((?:\/dich-vu\/|\/en\/services\/)[^<]+)<\/loc>/g,
          ),
        ].map((m) => m[1])) {
          const response = await fetch(app.origin + route);
          const raw = await response.text();
          const html = visibleMarkup(raw);
          assert.match(
            html,
            /href="\/(?:dat-lich|en\/book)\?service=[a-z-]+"/,
            route,
          );
          assert.match(html, /Liên hệ xác nhận|Contact for pricing/, route);
          const schemas = [
            ...raw.matchAll(
              /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
            ),
          ].map((m) => JSON.parse(m[1]));
          const breadcrumb = schemas
            .flatMap((s) => s["@graph"] || [s])
            .find((s) => s["@type"] === "BreadcrumbList");
          assert.ok(
            breadcrumb?.itemListElement.every((item) =>
              item.item.startsWith("https://hatobeauty.com"),
            ),
            route,
          );
        }
        for (const route of ["/bang-gia", "/en/prices"])
          assert.match(await get(route), /<table/);
        for (const [route, serviceName] of [
          [
            "/dich-vu/cham-soc-da-chuyen-sau-da-nang",
            "Trị liệu làm sạch da chuyên sâu",
          ],
          [
            "/dich-vu/uon-mi-brow-lamination-da-nang",
            "Uốn mi kiểu Hàn + nhuộm mi",
          ],
          [
            "/dich-vu/goi-dau-duong-sinh-da-nang",
            "Gội đầu chăm sóc da đầu chuyên sâu",
          ],
          ["/dich-vu/triet-long-da-nang", "Triệt full body"],
          ["/dich-vu/tay-long-da-nang", "Tẩy theo vùng cơ thể"],
        ]) {
          const html = await get(route);
          assert.ok(html.includes(serviceName), route);
          assert.doesNotMatch(html, />Chọn<\/a>/, route);
        }
        for (const route of [
          "/dat-lich?service=skin",
          "/en/book?service=skin",
        ]) {
          const html = await get(route);
          assert.match(html, /<option value="skin" selected/);
          assert.match(html, /name="preference"/);
          assert.match(html, /type="email"/); // Footer newsletter is labelled and truthful.
        }
      },
    );
  } finally {
    await app.stop();
  }
});
