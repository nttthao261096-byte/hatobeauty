import type { Metadata } from "next";
import { HatoHome } from "../HatoHome";
import { loadHomeContent } from "../content";
import { JsonLd } from "../seo-pages";
import { siteUrl } from "../seo-data";
export const metadata: Metadata = { title: { absolute: "hato Beauty Da Nang | Skin, Head Spa, Body & Beauty Care" }, description: "Explore Skin, Head Spa, Body, Brow & Lash and Hair Removal at hato Beauty in Da Nang, with clear English service information.", alternates: { canonical: "/en/", languages: { "vi-VN": "/", en: "/en/", "x-default": "/" } }, openGraph: { url: `${siteUrl}/en/`, locale: "en_US", title: "hato Beauty Da Nang | SHINE AS YOU ARE", description: "Five considered beauty care worlds for Vietnamese and international guests.", images: ["/og-shine.png"] }, twitter: { card: "summary_large_image", title: "hato Beauty Da Nang | SHINE AS YOU ARE", description: "Five considered beauty care worlds for Vietnamese and international guests.", images: ["/og-shine.png"] } };
export default async function Page(){const content=await loadHomeContent();return <><JsonLd data={{"@context":"https://schema.org","@type":"WebPage","@id":`${siteUrl}/en/#webpage`,url:`${siteUrl}/en/`,name:"hato Beauty Da Nang",inLanguage:"en",isPartOf:{"@id":`${siteUrl}/#website`}}}/><HatoHome content={content} initialLang="en"/></>}
