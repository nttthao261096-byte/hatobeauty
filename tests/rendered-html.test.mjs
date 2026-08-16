import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import test from "node:test";

const contentFixtures = {
  services: [
    ["skin", "care", "01", "/images/service-skin-v2.webp", "Chăm sóc da chuyên sâu", "Personalized facial care", "Làm sạch · Phục hồi · Nuôi dưỡng"],
    ["scalp", "relax", "02", "/images/service-hair-v2.webp", "Gội đầu dưỡng sinh", "Herbal scalp therapy", "Thảo mộc · Massage · Thư giãn"],
    ["brow-lash", "shape", "03", "/images/service-brow-v2.webp", "Định hình chân mày & Uốn mi", "Brow shaping & Lash lift", "Cân đối · Tự nhiên · Tinh tế"],
    ["hair-removal", "smooth", "04", "/images/service-hair-removal-v2.webp", "Triệt lông công nghệ cao", "Advanced hair removal", "Êm dịu · Chính xác · Riêng tư"],
    ["waxing", "smooth", "05", "/images/service-waxing-v2.webp", "Waxing dịu nhẹ", "Gentle waxing", "Gọn gàng · Nhanh chóng · Chăm da"],
    ["body", "body", "06", "/images/service-body-scrub-v2.webp", "Chăm sóc body", "Body care ritual", "Tẩy tế bào chết · Dưỡng ẩm · Thư giãn"],
  ].map(([slug, category, display_number, image_path, title_vi, title_en, summary_vi], index) => ({
    slug, category, display_number, image_path, title_vi, title_en, summary_vi,
    summary_en: summary_vi, description_vi: `${title_vi} được thiết kế theo nhu cầu riêng.`, description_en: `${title_en} is personalized.`,
    suitable_vi: "Phù hợp sau tư vấn cá nhân.", suitable_en: "Suitable after a personal consultation.",
    price_label: "450.000 – 1.200.000đ", duration_label: "60 – 90 phút", plan_label: "Theo tư vấn",
    steps_vi: ["Tư vấn", "Chăm sóc"], steps_en: ["Consultation", "Care"], sort_order: index + 1, is_published: true,
  })),
  highlights: [
    ["01", "/images/feature-equipment-v2.webp", "Thiết bị hiện đại", "Modern technology"],
    ["02", "/images/feature-team-v2.webp", "Đội ngũ chuyên nghiệp", "Professional team"],
    ["03", "/images/feature-personalized-v2.webp", "Dịch vụ cá nhân hóa", "Personalized services"],
    ["04", "/images/feature-space-v2.webp", "Không gian thư giãn", "A calming space"],
  ].map(([display_number, image_path, title_vi, title_en], index) => ({ display_number, image_path, title_vi, title_en, description_vi: "Kết hợp công nghệ phù hợp và tư vấn rõ ràng.", description_en: "Suitable technology with clear guidance.", sort_order: index + 1, is_published: true })),
  results: [
    ["/images/result-skin-v2.webp", "Da sáng khỏe, ẩm mượt tự nhiên", "Naturally brighter skin"],
    ["/images/result-brow-lash-v2.webp", "Chân mày thanh thoát, hàng mi cong nhẹ", "Refined brows and lashes"],
    ["/images/result-body-v2.webp", "Da body mịn màng, rạng rỡ hơn", "Smoother body skin"],
  ].map(([image_path, title_vi, title_en], index) => ({ image_path, title_vi, title_en, description_vi: "Sau trải nghiệm chăm sóc", description_en: "After a care ritual", category_label_vi: "Chăm sóc da", category_label_en: "Care", sort_order: index + 1, is_published: true })),
  testimonials: [{ initials: "NT", name_vi: "Nguyễn Thảo", name_en: "Nguyen Thao", quote_vi: "Không gian rất dịu và sạch.", quote_en: "The space felt calm and immaculate.", sort_order: 1, is_published: true }],
  journal_articles: [
    { display_number: "01", image_path: "/images/journal-skin-v2.webp", title_vi: "Da cần làm sạch sâu hay ưu tiên phục hồi?", title_en: "Does your skin need cleansing or recovery?", reading_time_vi: "3 phút đọc", reading_time_en: "3 min read", sort_order: 1, is_published: true },
    { display_number: "04", image_path: "/images/journal-technology-v2.webp", title_vi: "Cần chuẩn bị gì trước một liệu trình công nghệ cao?", title_en: "How should you prepare?", reading_time_vi: "3 phút đọc", reading_time_en: "3 min read", sort_order: 2, is_published: true },
    { display_number: "05", image_path: "/images/journal-aftercare-v2.webp", title_vi: "Làm thế nào để làn da dịu hơn sau liệu trình?", title_en: "How can skin feel calmer?", reading_time_vi: "3 phút đọc", reading_time_en: "3 min read", sort_order: 3, is_published: true },
  ],
};

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  const contentServer = createServer((request, response) => {
    const table = new URL(request.url ?? "/", "http://localhost").pathname.split("/").at(-1);
    const rows = table && table in contentFixtures ? contentFixtures[table] : null;
    response.writeHead(rows ? 200 : 404, { "content-type": "application/json" });
    response.end(JSON.stringify(rows ?? { error: "Not found" }));
  });
  await new Promise((resolve) => contentServer.listen(0, "127.0.0.1", resolve));
  const address = contentServer.address();
  assert.ok(address && typeof address === "object");
  const contentUrl = `http://127.0.0.1:${address.port}`;
  process.env.SUPABASE_URL = contentUrl;
  process.env.SUPABASE_PUBLISHABLE_KEY = "test-publishable-key";

  try {
    const response = await worker.fetch(
      new Request("http://localhost/", { headers: { accept: "text/html" } }),
      {
        ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
        SUPABASE_URL: contentUrl,
        SUPABASE_PUBLISHABLE_KEY: "test-publishable-key",
      },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const body = await response.arrayBuffer();
    return new Response(body, { status: response.status, headers: response.headers });
  } finally {
    await new Promise((resolve, reject) => contentServer.close((error) => error ? reject(error) : resolve()));
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_PUBLISHABLE_KEY;
    else process.env.SUPABASE_PUBLISHABLE_KEY = originalKey;
  }
}

test("server-renders the redesigned hato Beauty experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html lang="vi">/i);
  assert.match(html, /HATO BEAUTY — Shine as you are/i);
  assert.match(html, /Triệt lông &amp; làm sạch lông bằng sáp/i);
  assert.doesNotMatch(html, /Waxing dịu nhẹ/i);
  assert.match(html, /Chăm sóc body/i);
  assert.match(html, /Tẩy tế bào chết/i);
  assert.match(html, /Định hình chân mày &amp; Uốn mi/i);
  assert.match(html, /Hãy để chúng tôi đánh thức vẻ đẹp trong bạn/i);
  assert.match(html, /Giải pháp chăm sóc da hiệu quả &amp; cá nhân hóa/i);
  assert.match(html, /Hiệu quả đến từ sự thấu hiểu/i);
  assert.match(html, /Thiết bị hiện đại/i);
  assert.match(html, /Không gian thư giãn/i);
  assert.match(html, /Đội ngũ chuyên nghiệp/i);
  assert.match(html, /Dịch vụ cá nhân hóa/i);
  assert.doesNotMatch(html, /Hình ảnh minh họa/i);
  assert.match(html, /Da sáng khỏe, ẩm mượt tự nhiên/i);
  assert.match(html, /Chân mày thanh thoát, hàng mi cong nhẹ/i);
  assert.match(html, /Da body mịn màng, rạng rỡ hơn/i);
  assert.match(html, /Chạm đến phiên bản đẹp nhất của bạn/i);
  assert.match(html, /Giảm giá 10% ngay hôm nay/i);
  assert.match(html, /Đăng ký nhận ưu đãi/i);
  assert.match(html, /Khách Việt Nam &amp; quốc tế/i);
  assert.match(html, /Nguyễn Thảo/i);
  assert.match(html, /Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi/i);
  assert.match(html, /Chúng tôi cam kết sẽ mang đến những điều tốt nhất/i);
  assert.match(html, /TỎA SÁNG THEO CÁCH CỦA BẠN/i);
  assert.match(html, /Nhận tư vấn riêng/i);
});

test("ships the new brand hierarchy and accessible booking form", async () => {
  const response = await render();
  const html = await response.text();
  const source = await readFile(new URL("../app/HatoHome.tsx", import.meta.url), "utf8");
  const contentSource = await readFile(new URL("../app/content.ts", import.meta.url), "utf8");
  const dataMigration = await readFile(new URL("../supabase/migrations/20260814114657_create_site_pages.sql", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(source, /Khách hàng Hato Beauty/i);
  assert.match(source, /Giá tham khảo/i);
  assert.match(html, /hato-logo-transparent-v3\.png/i);
  assert.doesNotMatch(html, /class="hero-manifesto"/i);
  assert.doesNotMatch(html, /class="hero-brand">hato</i);
  assert.match(html, /href="#knowledge">Kiến thức</i);
  assert.match(html, /role="search"/i);
  assert.match(html, /<div class="announcement"><p>[^<]+<\/p><\/div>/i);
  assert.match(html, /class="footer-intro"/i);
  assert.match(html, /Hẹn gặp bạn trong một ngày gần nhất/i);
  assert.match(html, /Góc kiến thức/i);
  assert.match(html, /Triệt lông: Cần chuẩn bị gì trước khi thực hiện/i);
  assert.match(html, /Mi &amp; chân mày: Giữ đường nét tự nhiên/i);
  assert.match(html, /class="service-card service-card-skin"/i);
  assert.match(html, /Dịch vụ chủ đạo/i);
  assert.doesNotMatch(html, /class="header-cta"/i);
  assert.match(source, /aria-modal="true"/i);
  assert.match(source, /autoComplete="tel"/i);
  assert.doesNotMatch(source, /className="hero-note"/i);
  assert.match(source, /className="review-grid"/i);
  assert.match(source, /className="service-detail-modal"/i);
  assert.match(contentSource, /rest\/v1\/\$\{table\}/i);
  assert.match(dataMigration, /journal-skin-v2\.webp/i);
  assert.match(source, /className=\{`hero-video hero-video-/i);
  assert.match(source, /\/video\/hero-care-beige-clinic\.mp4/i);
  assert.doesNotMatch(source, /hero-care-image/i);
  assert.doesNotMatch(styles, /hero-signature/i);
  assert.ok(source.indexOf('/video/hero-head-spa.mp4') < source.indexOf('/video/hero-care-beige-clinic.mp4'));
  assert.match(source, /\/video\/hero-hair-removal\.mp4/i);
  assert.match(source, /\/video\/hero-head-spa\.mp4/i);
  assert.match(source, /\/video\/hero-brow-warm\.mp4/i);
  assert.match(source, /className="offer-modal"/i);
  assert.match(source, /className="offer-star"/i);
  assert.match(source, /setTimeout\(\(\) => setOfferOpen\(false\), 1800\)/i);
  assert.doesNotMatch(source, /hero-scene-label/i);
  assert.match(source, /Về chúng tôi/i);
  assert.match(dataMigration, /feature-equipment-v2\.webp/i);
  assert.match(dataMigration, /feature-team-v2\.webp/i);
  assert.match(dataMigration, /feature-personalized-v2\.webp/i);
  assert.match(dataMigration, /feature-space-v2\.webp/i);
  assert.match(dataMigration, /result-skin-v2\.webp/i);
  assert.match(dataMigration, /result-brow-lash-v2\.webp/i);
  assert.match(dataMigration, /result-body-v2\.webp/i);
  assert.match(styles, /--display: "Lora"/i);
  assert.match(styles, /\.hato-word[^}]*font-size: 1\.78em/is);
  assert.match(styles, /prefers-reduced-motion: reduce/i);
});

test("validates booking requests before contacting Supabase", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("booking-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const context = { waitUntil() {}, passThroughOnException() {} };

  const invalidResponse = await worker.fetch(
    new Request("http://localhost/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "A" }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    context,
  );
  assert.equal(invalidResponse.status, 400);

  const unconfiguredResponse = await worker.fetch(
    new Request("http://localhost/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Nguyễn Thảo",
        phone: "0901234567",
        service: "skin",
        date: "2026-09-01",
        locale: "vi",
      }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    context,
  );
  assert.equal(unconfiguredResponse.status, 503);

  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.SUPABASE_URL;
  const originalSecret = process.env.SUPABASE_SECRET_KEY;
  let savedBooking;

  process.env.SUPABASE_URL = "https://hato-test.supabase.co";
  process.env.SUPABASE_SECRET_KEY = "server-only-test-key";
  globalThis.fetch = async (input, init) => {
    if (String(input).includes("/rest/v1/services?")) {
      assert.match(String(input), /slug=eq\.skin/);
      assert.equal(init.headers.apikey, "server-only-test-key");
      assert.equal(init.headers.Authorization, undefined);
      return Response.json([{ slug: "skin" }]);
    }
    assert.equal(input, "https://hato-test.supabase.co/rest/v1/booking_requests");
    assert.equal(init.headers.apikey, "server-only-test-key");
    assert.equal(init.headers.Authorization, undefined);
    savedBooking = JSON.parse(init.body);
    assert.equal(init.headers.Prefer, "return=minimal");
    return new Response(null, { status: 201 });
  };

  try {
    const savedResponse = await worker.fetch(
      new Request("http://localhost/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Nguyễn Thảo",
          phone: "0901234567",
          service: "skin",
          date: "2026-09-01",
          locale: "vi",
        }),
      }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      context,
    );
    assert.equal(savedResponse.status, 201);
    assert.deepEqual(savedBooking, {
      full_name: "Nguyễn Thảo",
      phone: "0901234567",
      service_slug: "skin",
      preferred_date: "2026-09-01",
      locale: "vi",
      source: "hato-website",
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalSecret === undefined) delete process.env.SUPABASE_SECRET_KEY;
    else process.env.SUPABASE_SECRET_KEY = originalSecret;
  }
});
