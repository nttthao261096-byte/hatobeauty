import type { Metadata } from "next";
import { HatoHome } from "./HatoHome";
import { loadHomeContent } from "./content";
import { JsonLd } from "./seo-pages";
import { mediaUrl, siteUrl } from "./seo-data";

export const metadata: Metadata = {
  title: { absolute: "hato Beauty Đà Nẵng | Chăm sóc da, Mi Mày & Tẩy lông" },
  description:
    "Chăm sóc da, Mi & Mày, Chăm sóc da đầu & Thư giãn, Triệt lông và Tẩy lông tại hato Beauty Đà Nẵng. Xem dịch vụ, giá tham khảo và đặt lịch.",
  alternates: { canonical: "/", languages: { "vi-VN": "/", en: "/en/", "x-default": "/" } },
  openGraph: { url: siteUrl, locale: "vi_VN", title: "hato Beauty Đà Nẵng | Chăm sóc theo nhu cầu", description: "Năm nhóm dịch vụ: Chăm sóc da, Mi & Mày, Chăm sóc da đầu & Thư giãn, Triệt lông và Tẩy lông.", images: [{ url: mediaUrl("/og-shine.png"), width: 1731, height: 909 }] },
  twitter: { card: "summary_large_image", title: "hato Beauty Đà Nẵng | Chăm sóc theo nhu cầu", description: "Chăm sóc da, Mi & Mày, Chăm sóc da đầu & Thư giãn, Triệt lông và Tẩy lông.", images: [mediaUrl("/og-shine.png")] },
};

export default async function Home() {
  const content = await loadHomeContent();
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "hato Beauty", url: siteUrl, logo: mediaUrl("/brand/hato-logo-transparent-v3.png") },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "hato Beauty", inLanguage: ["vi-VN", "en"], publisher: { "@id": `${siteUrl}/#organization` } },
    { "@type": "WebPage", "@id": `${siteUrl}/#webpage`, url: siteUrl, name: "hato Beauty Đà Nẵng", inLanguage: "vi-VN", isPartOf: { "@id": `${siteUrl}/#website` } },
  ] };
  return <><JsonLd data={schema} /><HatoHome content={content} initialLang="vi" /></>;
}
