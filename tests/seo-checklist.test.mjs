import { test } from "node:test";
import assert from "node:assert/strict";
import { articleSeoChecks, countWords, parseTags } from "../app/admin/_lib/seo-checklist.ts";

test("SEO checklist counts the Vietnamese editorial fields", () => {
  const content = `${Array(600).fill("da").join(" ")}\n\n## Chuẩn bị\n[Da mặt](/dich-vu/cham-soc-da/)\n[Da đầu](/dich-vu/goi-dau-duong-sinh/)\n[Body](/dich-vu/cham-soc-body/)\n[Đặt lịch](/dat-lich/)\n\n## Câu hỏi thường gặp\n### Có phù hợp không?\nCó.\n### Bao lâu một lần?\nTùy nhu cầu.`;
  const checks = articleSeoChecks({
    title_vi: "Hướng dẫn chăm sóc làn da dịu khỏe mỗi ngày",
    excerpt_vi: "Một hướng dẫn chăm sóc da rõ ràng, thực tế và dễ áp dụng tại nhà, giúp bạn chuẩn bị tốt hơn trước khi lựa chọn liệu trình phù hợp tại Hato.",
    image_path: "/images/cover.webp",
    slug_vi: "huong-dan-cham-soc-da-diu-khoe",
    tags_vi: "chăm sóc da, da khỏe, Hato Beauty",
    content_vi: content,
  });
  assert.equal(countWords(content) >= 600, true);
  assert.deepEqual(parseTags("a, b; c\nd"), ["a", "b", "c", "d"]);
  assert.equal(checks.find((x) => x.id === "links")?.passed, true);
  assert.equal(checks.find((x) => x.id === "cta")?.passed, true);
  assert.equal(checks.find((x) => x.id === "faq")?.value, "2 câu");
  assert.equal(checks.find((x) => x.id === "tags")?.passed, true);
  assert.equal(checks.find((x) => x.id === "slug")?.passed, true);
});
