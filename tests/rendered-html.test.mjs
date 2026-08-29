import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import test from "node:test";

const contentFixtures = {
  services: [
    ["skin", "care", "01", "/images/service-skin-v2.webp", "Chăm sóc da chuyên sâu", "Personalized facial care", "Làm sạch · Phục hồi · Nuôi dưỡng"],
    ["scalp", "relax", "02", "/images/service-hair-v2.webp", "Gội đầu dưỡng sinh", "Herbal scalp therapy", "Thảo mộc · Massage · Thư giãn"],
    ["brow-lash", "shape", "03", "/images/service-brow-v2.webp", "Định hình chân mày & Uốn mi", "Brow shaping & Lash lift", "Cân đối · Tự nhiên · Tinh tế"],
    ["hair-removal", "smooth", "04", "/images/service-hair-removal-v2.webp", "Triệt lông", "Advanced hair removal", "Êm dịu · Chính xác · Riêng tư"],
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

async function render(pathname = "/") {
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
      new Request(new URL(pathname, "http://localhost"), { headers: { accept: "text/html" } }),
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
  assert.match(html, /<html lang="vi"[^>]*>/i);
  assert.match(html, /data-scroll-behavior="smooth"/i);
  assert.match(html, /hato Beauty Đà Nẵng \| Chăm sóc da, Mi Mày &amp; Tẩy lông/);
  assert.match(html, />Triệt lông</i);
  assert.match(html, />Tẩy lông</i);
  assert.match(html, /Chăm sóc da đầu &amp; Thư giãn/i);
  assert.doesNotMatch(html, /class="hero-proof"/i);
  assert.doesNotMatch(html, />Bảng giá</i);
  assert.match(html, />Kết quả</i);
  assert.doesNotMatch(html, /class="service-card service-card-body"/i);
  assert.match(html, /Tẩy tế bào chết/i);
  assert.match(html, /(?:Mi &amp; Mày|Định hình chân mày &amp; Uốn mi)/i);
  assert.match(html, /Xem chi tiết/i);
  assert.match(html, /Hãy để chúng tôi đánh thức vẻ đẹp trong bạn/i);
  assert.match(html, /Tỏa sáng theo cách của bạn\./i);
  assert.match(html, /Hiệu quả đến từ sự thấu hiểu/i);
  assert.match(html, /Thiết bị hiện đại/i);
  assert.match(html, /Không gian thư giãn/i);
  assert.match(html, /Đội ngũ chuyên nghiệp/i);
  assert.match(html, /Dịch vụ cá nhân hóa/i);
  assert.doesNotMatch(html, /Hình ảnh minh họa/i);
  assert.match(html, /Da sáng khỏe, ẩm mượt tự nhiên/i);
  assert.match(html, /Chân mày thanh thoát, hàng mi cong nhẹ/i);
  assert.match(html, /Da cơ thể mịn màng, rạng rỡ hơn/i);
  assert.doesNotMatch(html, />Chăm sóc body</i);
  assert.doesNotMatch(html, />Da body/i);
  assert.match(html, /Chạm đến phiên bản đẹp nhất của bạn/i);
  assert.doesNotMatch(html, /Giảm giá 10% ngay hôm nay/i);
  assert.doesNotMatch(html, /Đăng ký nhận ưu đãi/i);
  assert.match(html, /Khách Việt Nam &amp; quốc tế/i);
  assert.match(html, /Nguyễn Thảo/i);
  assert.match(html, /Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi/i);
  assert.match(html, /Chúng tôi cam kết sẽ mang đến những điều tốt nhất/i);
  assert.match(html, /TỎA SÁNG THEO CÁCH CỦA BẠN/i);
  assert.match(html, /Nhận tư vấn riêng/i);
  assert.match(html, /aria-label="Hotline hato Beauty"/i);
  assert.match(html, /href="tel:[+]84703214868">0703214868/i);
  assert.doesNotMatch(html, /0915 860 446|[+]84915860446/i);
  assert.match(html, /href="https:\/\/zalo\.me\/0703214868"/i);
  assert.match(html, /href="\/dich-vu\/"[^>]*><strong>05<\/strong>/i);
  assert.match(html, /href="\/dat-lich\/"[^>]*><strong>08:00–19:30<\/strong>/i);
  assert.match(html, /google\.com\/maps\/dir\/\?api=1&amp;destination=/i);
  assert.match(html, />Tư vấn ngay</i);
});

test("routes English consultation actions to WhatsApp", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /href="https:\/\/wa\.me\/84703214868"/i);
  assert.match(html, />Consult now</i);
  assert.doesNotMatch(html, /href="https:\/\/zalo\.me\/0703214868"/i);
});

test("renders complete contact details and social links", async () => {
  const response = await render("/lien-he");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /href="tel:\+84703214868"/i);
  assert.doesNotMatch(html, /href="tel:\+84915860446"/i);
  assert.match(html, /href="mailto:hatobeautydanang@gmail\.com"/i);
  assert.match(html, /href="https:\/\/www\.tiktok\.com\/@hatobeauty"/i);
  assert.match(html, /href="https:\/\/wa\.me\/84703214868"/i);
  assert.match(html, /href="https:\/\/www\.instagram\.com\/hatobeauty\/"/i);
  assert.match(html, /href="https:\/\/facebook\.com\/hatobeautyy"/i);
  assert.match(html, /Hằng ngày · 08:00–19:30/i);
  assert.match(html, /127 Châu Thị Vĩnh Tế, Ngũ Hành Sơn, Đà Nẵng/i);
  assert.match(html, /<iframe[^>]+google\.com\/maps/i);
  assert.match(html, /aria-label="TikTok hato Beauty"[^>]*><span[^>]*><svg/i);
  assert.match(html, /<h1>Liên hệ hato Beauty<[/]h1>/i);
  assert.doesNotMatch(html, /<p class="seo-eyebrow">hato Beauty<[/]p>/i);
  assert.match(html, /class="contact-page-intro"/i);
  assert.match(html, /class="contact-orbit contact-orbit-one"/i);
  assert.match(html, /class="contact-lead-form"/i);
  assert.match(html, /name="name"/i);
  assert.match(html, /name="phone"/i);
  assert.match(html, /name="email"/i);
  assert.match(html, /name="preference"/i);
  assert.match(html, /name="message"/i);
  assert.match(html, /class="contact-page-map"/i);
});

test("validates and stores contact requests through the server API", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("contact-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const context = { waitUntil() {}, passThroughOnException() {} };
  const assets = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };

  const invalidResponse = await worker.fetch(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "A", phone: "abc", preference: "phone" }),
    }),
    assets,
    context,
  );
  assert.equal(invalidResponse.status, 400);
  assert.equal((await invalidResponse.json()).code, "invalid_details");

  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.SUPABASE_URL;
  const originalSecret = process.env.SUPABASE_SECRET_KEY;
  let savedContact;

  process.env.SUPABASE_URL = "https://hato-test.supabase.co";
  process.env.SUPABASE_SECRET_KEY = "server-only-test-key";
  globalThis.fetch = async (input, init) => {
    assert.equal(input, "https://hato-test.supabase.co/rest/v1/contact_requests");
    assert.equal(init.headers.apikey, "server-only-test-key");
    assert.equal(init.headers.Authorization, undefined);
    savedContact = JSON.parse(init.body);
    return new Response(null, { status: 201 });
  };

  try {
    const savedResponse = await worker.fetch(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Nguyễn Thảo",
          phone: "0901234567",
          email: "Thao@Example.com",
          preference: "phone",
          message: "Tư vấn chăm sóc da",
          locale: "vi",
        }),
      }),
      assets,
      context,
    );
    assert.equal(savedResponse.status, 201);
    assert.deepEqual(savedContact, {
      full_name: "Nguyễn Thảo",
      phone: "0901234567",
      email: "thao@example.com",
      subject: "Yêu cầu liên hệ qua Điện thoại",
      message: "Tư vấn chăm sóc da",
      status: "new",
      source: "hato-contact-page",
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalSecret === undefined) delete process.env.SUPABASE_SECRET_KEY;
    else process.env.SUPABASE_SECRET_KEY = originalSecret;
  }
});
test("renders valid URLs for every service breadcrumb item", async () => {
  const cases = [
    ["/dich-vu/cham-soc-da-chuyen-sau-da-nang", "https://hatobeauty.com/dich-vu/"],
    ["/en/services/facial-treatment-da-nang", "https://hatobeauty.com/en/services/"],
  ];

  for (const [pathname, expectedSectionUrl] of cases) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
      .map((match) => JSON.parse(match[1]));
    const breadcrumb = jsonLdBlocks
      .flatMap((block) => block["@graph"] ?? [block])
      .find((entry) => entry["@type"] === "BreadcrumbList");

    assert.ok(breadcrumb, `Missing BreadcrumbList on ${pathname}`);
    assert.equal(breadcrumb.itemListElement[1].item, expectedSectionUrl);
    assert.ok(breadcrumb.itemListElement.every((entry) => typeof entry.item === "string" && entry.item.startsWith("https://")));
  }
});

test("renders the service index in the requested five-group order", async () => {
  const seoData = await readFile(new URL("../app/seo-data.ts", import.meta.url), "utf8");
  const seoPages = await readFile(new URL("../app/seo-pages.tsx", import.meta.url), "utf8");
  assert.match(seoData, /primaryServiceOrder[^=]*=\s*\["skin",\s*"brow-lash",\s*"scalp",\s*"hair-removal",\s*"waxing"\]/i);
  assert.match(seoData, /waxing:\s*"Tẩy lông"/i);
  assert.match(seoData, /service-waxing-v2\.webp/i);
  assert.match(seoPages, /primarySeoServices\.map\(\(service, index\)/i);
});

test("ships the new brand hierarchy and accessible booking form", async () => {
  const response = await render();
  const html = await response.text();
  const source = await readFile(new URL("../app/HatoHome.tsx", import.meta.url), "utf8");
  const headerSource = await readFile(new URL("../app/SiteHeader.tsx", import.meta.url), "utf8");
  const bookingSource = await readFile(new URL("../app/BookingForm.tsx", import.meta.url), "utf8");
  const bookingErrorSource = await readFile(new URL("../app/booking-errors.ts", import.meta.url), "utf8");
  const bookingValidationSource = await readFile(new URL("../app/booking-validation.ts", import.meta.url), "utf8");
  const seoPagesSource = await readFile(new URL("../app/seo-pages.tsx", import.meta.url), "utf8");
  const contentSource = await readFile(new URL("../app/content.ts", import.meta.url), "utf8");
  const dataMigration = await readFile(new URL("../supabase/migrations/20260814114657_create_site_pages.sql", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(source, /Khách Việt Nam/);
  assert.match(source, /Khách quốc tế/);
  assert.match(source, /International guest/);
  assert.match(source, /href=\{guest\.href\[lang\]\}/i);
  assert.match(headerSource, /hideDesktopConsultation/i);
  assert.match(headerSource, /Tư vấn ngay/i);
  assert.match(headerSource, /Liên hệ ngay/i);
  assert.match(seoPagesSource, /className="breadcrumbs page-breadcrumbs"/i);
  assert.doesNotMatch(html, />[^<]*\b(?:Hato|HATO)\b[^<]*</);
  assert.doesNotMatch(seoPagesSource, />Bảng giá</i);
  assert.match(seoPagesSource, /Khoảng giá tham khảo/i);
  assert.match(seoPagesSource, /DANH MỤC DỊCH VỤ/i);
  assert.match(seoPagesSource, /service-care-grid/i);
  assert.match(html, /hato-logo-transparent-v3\.png/i);
  assert.doesNotMatch(html, /class="hero-manifesto"/i);
  assert.doesNotMatch(html, /class="hero-brand">hato</i);
  assert.match(html, /href="\/kien-thuc\/">Kiến thức</i);
  assert.match(html, /role="search"/i);
  assert.match(html, /class="announcement"/i);
  assert.match(html, /Hãy để chúng tôi đánh thức vẻ đẹp trong bạn/i);
  assert.match(html, /class="footer-intro"/i);
  assert.match(html, /Hẹn gặp bạn trong một ngày gần nhất/i);
  assert.match(html, /Góc kiến thức/i);
  assert.match(source, /Xem tất cả bài viết/i);
  assert.match(html, /Mi &amp; chân mày: Giữ đường nét tự nhiên/i);
  assert.match(html, /class="service-card service-card-skin"/i);
  assert.match(html, /Dịch vụ chủ đạo/i);
  assert.doesNotMatch(html, /class="header-cta"/i);
  assert.match(source, /aria-modal="true"/i);
  assert.match(source, /autoComplete="tel"/i);
  assert.match(source, /name="name"[^>]*minLength=\{2\}/i);
  assert.match(bookingSource, /name="name"[^>]*minLength=\{2\}/i);
  assert.match(bookingSource, /getBookingErrorMessage\(response, lang\)/i);
  assert.match(source, /pattern=\{BOOKING_PHONE_PATTERN\}/i);
  assert.match(bookingSource, /pattern=\{BOOKING_PHONE_PATTERN\}/i);
  assert.match(source, /min=\{minimumBookingDate\}/i);
  assert.match(bookingSource, /min=\{minimumBookingDate\}/i);
  assert.match(bookingValidationSource, /Asia\/Ho_Chi_Minh/i);
  assert.match(bookingErrorSource, /response\.status === 400/i);
  assert.doesNotMatch(source, /className="hero-note"/i);
  assert.match(source, /className="review-grid"/i);
  assert.match(source, /className="service-detail-modal"/i);
  assert.match(contentSource, /Gội đầu chăm sóc da đầu cơ bản/i);
  assert.match(contentSource, /Gội đầu thư giãn/i);
  assert.match(contentSource, /Trị liệu làm sạch da chuyên sâu/i);
  assert.match(contentSource, /Trị liệu phục hồi hàng rào bảo vệ & da nhạy cảm/i);
  assert.match(contentSource, /Trị liệu chăm sóc da cá nhân hóa/i);
  assert.match(contentSource, /Chăm sóc da cơ thể/i);
  assert.match(contentSource, /Dịch vụ Mi/i);
  assert.match(contentSource, /Dịch vụ Mày/i);
  assert.match(contentSource, /Triệt full body/i);
  assert.match(contentSource, /Tẩy môi trên/i);
  assert.match(contentSource, /service-skin-signature-v3\.png/i);
  assert.doesNotMatch(source, /selectedServiceDetail\.price/i);
  assert.match(source, /Kết quả hướng đến/i);
  assert.match(source, /service-option-group-image/i);
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
  assert.doesNotMatch(source, /className="offer-modal"/i);
  assert.doesNotMatch(source, /setOfferOpen/i);
  assert.doesNotMatch(source, /Giảm giá 10% ngay hôm nay/i);
  assert.doesNotMatch(source, /hero-scene-label/i);
  assert.match(source, /Về chúng tôi/i);
  assert.match(dataMigration, /feature-equipment-v2\.webp/i);
  assert.match(dataMigration, /feature-team-v2\.webp/i);
  assert.match(dataMigration, /feature-personalized-v2\.webp/i);
  assert.match(dataMigration, /feature-space-v2\.webp/i);
  assert.match(dataMigration, /result-skin-v2\.webp/i);
  assert.match(dataMigration, /result-brow-lash-v2\.webp/i);
  assert.match(dataMigration, /result-body-v2\.webp/i);
  assert.match(styles, /--display: var\(--font-display\)/i);
  assert.match(source, /setLoadHeroSequence\(true\)/i);
  assert.match(source, /const shouldLoad = index === 0 \|\| loadHeroSequence/i);
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
  assert.equal((await invalidResponse.json()).code, "invalid_details");

  const invalidPhoneResponse = await worker.fetch(
    new Request("http://localhost/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Nguyễn Thảo",
        phone: "abcdefgh",
        service: "skin",
        date: "2099-09-01",
        locale: "vi",
      }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    context,
  );
  assert.equal(invalidPhoneResponse.status, 400);
  assert.equal((await invalidPhoneResponse.json()).code, "invalid_phone");

  const pastDateResponse = await worker.fetch(
    new Request("http://localhost/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Nguyễn Thảo",
        phone: "0901234567",
        service: "skin",
        date: "2020-01-01",
        locale: "vi",
      }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    context,
  );
  assert.equal(pastDateResponse.status, 400);
  assert.equal((await pastDateResponse.json()).code, "invalid_date");

  const impossibleDateResponse = await worker.fetch(
    new Request("http://localhost/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Nguyễn Thảo",
        phone: "+84 901 234 567",
        service: "skin",
        date: "2099-02-30",
        locale: "vi",
      }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    context,
  );
  assert.equal(impossibleDateResponse.status, 400);
  assert.equal((await impossibleDateResponse.json()).code, "invalid_date");

  const unconfiguredResponse = await worker.fetch(
    new Request("http://localhost/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Nguyễn Thảo",
        phone: "0901234567",
        service: "skin",
        date: "2099-09-01",
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
          date: "2099-09-01",
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
      preferred_date: "2099-09-01",
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

test("explains booking validation errors in both languages", async () => {
  const moduleUrl = new URL("../app/booking-errors.ts", import.meta.url);
  moduleUrl.searchParams.set("booking-errors-test", `${process.pid}-${Date.now()}`);
  const { getBookingErrorMessage } = await import(moduleUrl.href);

  assert.match(
    await getBookingErrorMessage(Response.json({ code: "invalid_phone" }, { status: 400 }), "vi"),
    /8–15 chữ số/,
  );
  assert.match(
    await getBookingErrorMessage(Response.json({ code: "invalid_phone" }, { status: 400 }), "en"),
    /8–15 digits/,
  );
  assert.match(
    await getBookingErrorMessage(Response.json({ code: "invalid_date" }, { status: 400 }), "vi"),
    /hôm nay hoặc một ngày trong tương lai/,
  );
  assert.match(
    await getBookingErrorMessage(Response.json({ code: "invalid_date" }, { status: 400 }), "en"),
    /today or a future date/,
  );
});
