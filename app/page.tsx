import type { Metadata } from "next";
import { HatoHome } from "./HatoHome";
import { loadHomeContent } from "./content";
import { JsonLd } from "./seo-pages";
import { siteUrl } from "./seo-data";

export const metadata: Metadata = {
  title: { absolute: "hato Beauty Đà Nẵng | Skin, Head Spa, Body & Beauty Care" },
  description:
    "Khám phá Skin, Head Spa, Body, Brow & Lash và Hair Removal tại hato Beauty Đà Nẵng. Thông tin dịch vụ rõ ràng, song ngữ Việt–Anh.",
  alternates: { canonical: "/", languages: { "vi-VN": "/", en: "/en/", "x-default": "/" } },
  openGraph: { url: siteUrl, locale: "vi_VN", title: "hato Beauty Đà Nẵng | SHINE AS YOU ARE", description: "Năm nhóm chăm sóc thẩm mỹ với thông tin rõ ràng cho khách Việt Nam và quốc tế.", images: [{ url: "/og-shine.png", width: 1731, height: 909 }] },
  twitter: { card: "summary_large_image", title: "hato Beauty Đà Nẵng | SHINE AS YOU ARE", description: "Năm nhóm chăm sóc thẩm mỹ với thông tin rõ ràng cho khách Việt Nam và quốc tế.", images: ["/og-shine.png"] },
};

export default async function Home() {
  const content = await loadHomeContent();
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "hato Beauty", url: siteUrl, logo: `${siteUrl}/brand/hato-logo-transparent-v3.png` },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "hato Beauty", inLanguage: ["vi-VN", "en"], publisher: { "@id": `${siteUrl}/#organization` } },
    { "@type": "WebPage", "@id": `${siteUrl}/#webpage`, url: siteUrl, name: "hato Beauty Đà Nẵng", inLanguage: "vi-VN", isPartOf: { "@id": `${siteUrl}/#website` } },
  ] };
  return <><JsonLd data={schema} /><HatoHome content={content} initialLang="vi" /></>;
}
