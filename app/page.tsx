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
    { "@type": "BeautySalon", "@id": `${siteUrl}/#organization`, name: "hato Beauty", url: siteUrl, logo: mediaUrl("/brand/hato-logo-transparent-v3.png"), telephone: "+84703214868", email: "hatobeautydanang@gmail.com", address: { "@type": "PostalAddress", streetAddress: "127 Châu Thị Vĩnh Tế", addressLocality: "Ngũ Hành Sơn", addressRegion: "Đà Nẵng", addressCountry: "VN" }, hasMap: "https://www.google.com/maps/search/?api=1&query=127%20Ch%C3%A2u%20Th%E1%BB%8B%20V%C4%A9nh%20T%E1%BA%BF%2C%20Ng%C5%A9%20H%C3%A0nh%20S%C6%A1n%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng", openingHours: "Mo-Su 08:30-19:30", sameAs: ["https://www.tiktok.com/@hatobeauty", "https://www.instagram.com/hatobeauty/", "https://facebook.com/hatobeautyy", "https://wa.me/84703214868"] },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "hato Beauty", inLanguage: ["vi-VN", "en"], publisher: { "@id": `${siteUrl}/#organization` } },
    { "@type": "WebPage", "@id": `${siteUrl}/#webpage`, url: siteUrl, name: "hato Beauty Đà Nẵng", inLanguage: "vi-VN", isPartOf: { "@id": `${siteUrl}/#website` } },
  ] };
  return <><JsonLd data={schema} /><HatoHome content={content} initialLang="vi" /></>;
}
