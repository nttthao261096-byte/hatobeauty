export type SeoCheck = {
  id: string;
  label: string;
  value: string;
  hint: string;
  passed: boolean;
};

const pillarPrefixes = ["/dich-vu/", "/lo-trinh/", "/san-pham-cham-soc/"];
const ctaPrefixes = ["/dat-lich/", "/dich-vu/"];

export function parseTags(value: unknown) {
  return String(value || "")
    .split(/[,;\n]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function countWords(value: unknown) {
  const clean = String(value || "")
    .replace(/\[[^\]]+\]\([^\s)]+\)/g, " ")
    .replace(/[#*_>`~\-]+/g, " ")
    .trim();
  return clean ? clean.split(/\s+/u).length : 0;
}

function markdownLinks(value: unknown) {
  return [...String(value || "").matchAll(/\[[^\]]+\]\((\/[^\s)#]+)[^)]*\)/g)].map(
    (match) => match[1],
  );
}

export function articleSeoChecks(row: Record<string, unknown>): SeoCheck[] {
  const titleLength = String(row.title_vi || "").trim().length;
  const descriptionLength = String(row.excerpt_vi || "").trim().length;
  const slug = String(row.slug_vi || "").trim();
  const content = String(row.content_vi || "");
  const h2Count = (content.match(/^##\s+\S.+$/gm) || []).length;
  const faqSection = content.match(/^##\s+(?:FAQ|Câu hỏi thường gặp)\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/im)?.[1] || "";
  const faqCount = (faqSection.match(/^###\s+\S.+$/gm) || []).length;
  const links = markdownLinks(content);
  const internalLinks = new Set(links.filter((href) => pillarPrefixes.some((prefix) => href.startsWith(prefix)))).size;
  const hasCta = links.some((href) => ctaPrefixes.some((prefix) => href.startsWith(prefix)));
  const words = countWords(content);
  const tags = parseTags(row.tags_vi);
  const image = String(row.image_path || "").trim();

  return [
    { id: "title", label: "Tiêu đề SEO", value: `${titleLength} ký tự`, hint: "Nên 40–60 ký tự", passed: titleLength >= 40 && titleLength <= 60 },
    { id: "description", label: "Mô tả SEO", value: `${descriptionLength} ký tự`, hint: "Nên 120–160 ký tự", passed: descriptionLength >= 120 && descriptionLength <= 160 },
    { id: "cover", label: "Ảnh bìa", value: image ? "Đã có" : "Chưa có", hint: "Cần ảnh phù hợp với bài", passed: Boolean(image) },
    { id: "links", label: "Internal link", value: `${internalLinks} link pillar`, hint: "Nên ≥ 3 link khác nhau", passed: internalLinks >= 3 },
    { id: "cta", label: "CTA dịch vụ/đăng ký", value: hasCta ? "Đã có" : "Chưa có", hint: "Link tới dịch vụ hoặc đặt lịch", passed: hasCta },
    { id: "h2", label: "Tiêu đề H2 (##)", value: `${h2Count} tiêu đề`, hint: "Nên ≥ 2", passed: h2Count >= 2 },
    { id: "length", label: "Độ dài", value: `${words} từ`, hint: "Nên ≥ 600 từ", passed: words >= 600 },
    { id: "faq", label: "FAQ", value: `${faqCount} câu`, hint: "Nên có ≥ 2 câu hỏi hữu ích", passed: faqCount >= 2 },
    { id: "tags", label: "Tags", value: `${tags.length} tag`, hint: "Nên 2–6", passed: tags.length >= 2 && tags.length <= 6 },
    { id: "slug", label: "Slug", value: `${slug.length} ký tự`, hint: "≤ 60, chữ thường không dấu", passed: slug.length > 0 && slug.length <= 60 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) },
  ];
}
