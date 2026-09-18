import {
  journalPath,
  seoServices,
  servicePath,
  type SeoLang,
} from "./seo-data";

export function canonicalPath(path: string) {
  return path;
}

export const pageRoutes = {
  home: { vi: "/", en: "/en" },
  services: { vi: "/dich-vu", en: "/en/services" },
  prices: { vi: "/bang-gia", en: "/en/prices" },
  products: { vi: "/san-pham", en: "/en/care-products" },
  plan: { vi: "/lo-trinh", en: "/en/care-plan" },
  journal: { vi: "/kien-thuc", en: "/en/journal" },
  about: { vi: "/ve-hato-beauty", en: "/en/about" },
  contact: { vi: "/lien-he", en: "/en/contact" },
  results: { vi: "/ket-qua", en: "/en/results" },
  book: { vi: "/dat-lich", en: "/en/book" },
  privacy: { vi: "/chinh-sach-bao-mat", en: "/en/privacy" },
  editorial: { vi: "/chinh-sach-bien-tap", en: "/en/editorial-policy" },
} as const;

export type LanguagePaths = Record<SeoLang, string>;

export function equivalentPaths(pathname: string): LanguagePaths | undefined {
  const path = canonicalPath(pathname);
  const pairs: LanguagePaths[] = [
    ...Object.values(pageRoutes),
    ...seoServices.flatMap((service) => [
      { vi: servicePath(service, "vi"), en: servicePath(service, "en") },
      { vi: journalPath(service, "vi"), en: journalPath(service, "en") },
    ]),
  ];
  return pairs.find((pair) => pair.vi === path || pair.en === path);
}

export function bookingPath(lang: SeoLang, service?: string, option?: string) {
  const query = new URLSearchParams();
  if (service && seoServices.some((item) => item.id === service))
    query.set("service", service);
  if (option) query.set("option", option);
  return pageRoutes.book[lang] + (query.size ? `?${query}` : "");
}
