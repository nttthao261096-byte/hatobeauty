import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the redesigned hato Beauty experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html lang="vi">/i);
  assert.match(html, /hato Beauty \| Shine as you are/i);
  assert.match(html, /Triệt lông công nghệ cao/i);
  assert.match(html, /Waxing dịu nhẹ/i);
  assert.match(html, /Chăm sóc body/i);
  assert.match(html, /Tẩy tế bào chết/i);
  assert.match(html, /Định hình chân mày &amp; Uốn mi/i);
  assert.match(html, /Hãy để chúng tôi đánh thức vẻ đẹp trong bạn/i);
  assert.match(html, /Những giải pháp hiện đại cho làn da/i);
  assert.match(html, /Kết hợp công nghệ phù hợp/i);
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
  assert.match(html, /Đánh giá chung/i);
  assert.match(html, /Nguyễn Thảo/i);
  assert.match(html, /Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi/i);
  assert.match(html, /Chúng tôi cam kết sẽ mang đến những điều tốt nhất/i);
  assert.match(html, /SHINE AS YOU ARE/i);
  assert.match(html, /Nhận tư vấn riêng/i);
});

test("ships the new brand hierarchy and accessible booking form", async () => {
  const response = await render();
  const html = await response.text();
  const source = await readFile(new URL("../app/HatoHome.tsx", import.meta.url), "utf8");
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
  assert.match(html, /Cần chuẩn bị gì trước một liệu trình công nghệ cao/i);
  assert.match(html, /Làm thế nào để làn da dịu hơn sau liệu trình/i);
  assert.doesNotMatch(html, /class="header-cta"/i);
  assert.match(source, /aria-modal="true"/i);
  assert.match(source, /autoComplete="tel"/i);
  assert.doesNotMatch(source, /className="hero-note"/i);
  assert.match(source, /className="review-grid"/i);
  assert.match(source, /className="service-detail-modal"/i);
  assert.match(source, /journal-skin-v2\.webp/i);
  assert.match(source, /className=\{`hero-video hero-video-/i);
  assert.match(source, /\/video\/hero-care-beige-clinic\.mp4/i);
  assert.doesNotMatch(source, /hero-care-image/i);
  assert.doesNotMatch(styles, /hero-signature/i);
  assert.ok(source.indexOf('/video/hero-head-spa.mp4') < source.indexOf('/video/hero-care-beige-clinic.mp4'));
  assert.match(source, /\/video\/hero-hair-removal\.mp4/i);
  assert.match(source, /\/video\/hero-head-spa\.mp4/i);
  assert.match(source, /\/video\/hero-brow-warm\.mp4/i);
  assert.match(source, /className="offer-modal"/i);
  assert.match(source, /className="offer-logo"/i);
  assert.match(source, /setTimeout\(\(\) => setOfferOpen\(false\), 1800\)/i);
  assert.doesNotMatch(source, /hero-scene-label/i);
  assert.match(source, /Về chúng tôi/i);
  assert.match(source, /feature-equipment-v2\.webp/i);
  assert.match(source, /feature-team-v2\.webp/i);
  assert.match(source, /feature-personalized-v2\.webp/i);
  assert.match(source, /feature-space-v2\.webp/i);
  assert.match(source, /result-skin-v2\.webp/i);
  assert.match(source, /result-brow-lash-v2\.webp/i);
  assert.match(source, /result-body-v2\.webp/i);
  assert.match(styles, /--display: "Lora"/i);
  assert.match(styles, /\.hato-word[^}]*font-size: 1\.78em/is);
  assert.match(styles, /prefers-reduced-motion: reduce/i);
});
