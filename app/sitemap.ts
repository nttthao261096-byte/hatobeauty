import type { MetadataRoute } from "next";
import { journalPath, seoServices, servicePath, siteUrl } from "./seo-data";
export default function sitemap(): MetadataRoute.Sitemap {
  const modified = new Date("2026-08-17T00:00:00+07:00");
  const paths = ["/", "/en/", "/ve-hato-beauty/", "/en/about/", "/lien-he/", "/en/contact/", "/bang-gia/", "/en/prices/", "/dat-lich/", "/en/book/", "/chinh-sach-bien-tap/", "/chinh-sach-bao-mat/", ...seoServices.flatMap(s => [servicePath(s,"vi"),servicePath(s,"en"),journalPath(s,"vi"),journalPath(s,"en")])];
  return paths.map((path,index)=>({
    url:`${siteUrl}${path === "/" ? "" : path}`,
    lastModified:modified,
    changeFrequency:index<2?"weekly":"monthly",
    priority:index<2?1:(path.includes("dich-vu")||path.includes("services"))?0.9:0.7,
  }));
}
