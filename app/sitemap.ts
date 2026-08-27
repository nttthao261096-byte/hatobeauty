import type { MetadataRoute } from "next";
import { journalPath, seoServices, servicePath, siteUrl } from "./seo-data";
export default function sitemap(): MetadataRoute.Sitemap {
  const previousModified = new Date("2026-08-18T00:00:00+07:00");
  const optimizedModified = new Date("2026-08-27T00:00:00+07:00");
  const paths = ["/", "/en/", "/dich-vu/", "/en/services/", "/kien-thuc/", "/en/journal/", "/ve-hato-beauty/", "/en/about/", "/lien-he/", "/en/contact/", "/bang-gia/", "/en/prices/", "/dat-lich/", "/en/book/", "/chinh-sach-bien-tap/", "/en/editorial-policy/", "/chinh-sach-bao-mat/", "/en/privacy/", ...seoServices.flatMap(s => [servicePath(s,"vi"),servicePath(s,"en"),journalPath(s,"vi"),journalPath(s,"en")])];
  return paths.map((path,index)=>({
    url:`${siteUrl}${path === "/" ? "" : path}`,
    lastModified:path === "/" || path === "/en/" || path.includes("/dich-vu/") || path.includes("/en/services/") || path.includes("/kien-thuc/") || path.includes("/en/journal/") || path === "/dat-lich/" || path === "/en/book/" || path === "/en/editorial-policy/" || path === "/en/privacy/"
      ? optimizedModified
      : previousModified,
    changeFrequency:index<2?"weekly":"monthly",
    priority:index<2?1:(path.includes("dich-vu")||path.includes("services"))?0.9:0.7,
  }));
}
