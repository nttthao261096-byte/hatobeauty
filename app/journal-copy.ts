import type { SeoLang, SeoService } from "./seo-data";
import { journalGuidance } from "./journal-guidance";
import { journalIntentFaqs } from "./seo-faq-data";

export function journalTitle(service: SeoService, lang: SeoLang) {
  return lang === "vi"
    ? `${service.vi.name}: hướng dẫn chuẩn bị và chăm sóc`
    : `${service.en.name}: preparation and aftercare guide`;
}
export function journalDescription(service: SeoService, lang: SeoLang) {
  return lang === "vi"
    ? `Hướng dẫn trước và sau ${service.vi.name.toLocaleLowerCase("vi")}: cách chuẩn bị, chăm sóc tại nhà, lưu ý an toàn và những điều cần hỏi trước buổi hẹn.`
    : `Prepare for ${service.en.name.toLowerCase()}: practical aftercare, safety considerations and questions to discuss before your visit in Da Nang.`;
}
export function journalReadingTime(service: SeoService, lang: SeoLang) {
  const copy = service[lang];
  const guide = journalGuidance[service.id][lang];
  const words = [
    ...guide.paragraphs,
    ...guide.questions,
    ...copy.preparation,
    ...copy.aftercare,
    copy.caution,
    ...journalIntentFaqs[service.id][lang].flat(),
  ]
    .join(" ")
    .split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 180))} ${lang === "vi" ? "phút đọc" : "min read"}`;
}
