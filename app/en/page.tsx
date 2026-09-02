import type { Metadata } from "next";
import { HatoHome } from "../HatoHome";
import { loadHomeContent } from "../content";
import { JsonLd } from "../seo-pages";
import { mediaUrl, siteUrl } from "../seo-data";
export const metadata: Metadata = { title: { absolute: "Hato Beauty Da Nang | Skin, Brow, Scalp Care & Waxing" }, description: "Explore Skin, Brow & Lash, Scalp Care & Relaxation, Hair Removal and Waxing at Hato Beauty in Da Nang.", alternates: { canonical: "/en/", languages: { "vi-VN": "/", en: "/en/", "x-default": "/" } }, openGraph: { url: `${siteUrl}/en/`, locale: "en_US", title: "Hato Beauty Da Nang | SHINE AS YOU ARE", description: "Five clear care groups for Vietnamese and international guests.", images: [mediaUrl("/og-shine.png")] }, twitter: { card: "summary_large_image", title: "Hato Beauty Da Nang | SHINE AS YOU ARE", description: "Five clear care groups for Vietnamese and international guests.", images: [mediaUrl("/og-shine.png")] } };
export default async function Page(){const content=await loadHomeContent();return <><JsonLd data={{"@context":"https://schema.org","@type":"WebPage","@id":`${siteUrl}/en/#webpage`,url:`${siteUrl}/en/`,name:"Hato Beauty Da Nang",inLanguage:"en",isPartOf:{"@id":`${siteUrl}/#website`}}}/><HatoHome content={content} initialLang="en"/></>}
