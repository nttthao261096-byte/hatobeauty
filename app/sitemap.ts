export const dynamic = "force-dynamic";
import { articlePath, loadPublishedArticles } from "./journal-content";
import type { MetadataRoute } from "next";
import { journalPath, seoServices, servicePath, siteUrl } from "./seo-data";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles=await loadPublishedArticles();
  const previousModified = new Date("2026-08-27T00:00:00+07:00");
  const optimizedModified = new Date("2026-08-28T00:00:00+07:00");
  const paths = ["/", "/en/", "/dich-vu/", "/en/services/", "/san-pham/", "/san-pham-cham-soc/", "/en/care-products/", "/lo-trinh/", "/en/care-plan/", "/kien-thuc/", "/en/journal/", "/ve-hato-beauty/", "/en/about/", "/lien-he/", "/en/contact/", "/ket-qua/", "/en/results/", "/bang-gia/", "/en/prices/", "/dat-lich/", "/en/book/", "/chinh-sach-bien-tap/", "/en/editorial-policy/", "/chinh-sach-bao-mat/", "/en/privacy/", ...seoServices.flatMap(s => [servicePath(s,"vi"),servicePath(s,"en"),journalPath(s,"vi"),journalPath(s,"en")])];
  const updatedPaths = new Set(["/", "/en/", "/dich-vu/", "/en/services/", "/kien-thuc/", "/en/journal/", "/ve-hato-beauty/", "/en/about/", "/lien-he/", "/en/contact/", "/bang-gia/", "/en/prices/", "/dat-lich/", "/en/book/", "/chinh-sach-bien-tap/", "/en/editorial-policy/", "/chinh-sach-bao-mat/", "/en/privacy/", "/dich-vu/cham-soc-da-body-da-nang/", "/en/services/body-treatment-da-nang/", "/kien-thuc/goi-dau-duong-sinh/", "/en/journal/brow-lash/"]);
  const entries: MetadataRoute.Sitemap = paths.map((path,index)=>({
    url:`${siteUrl}${path === "/" ? "" : path}`,
    lastModified:updatedPaths.has(path) ? optimizedModified : previousModified,
    changeFrequency:index<2?"weekly":"monthly",
    priority:index<2?1:(path.includes("dich-vu")||path.includes("services"))?0.9:0.7,
  }));
  return [...entries,...articles.flatMap(article => (["vi","en"] as const).map(lang => ({url:siteUrl+articlePath(article,lang),changeFrequency:"monthly" as const,priority:0.7})))];
}
