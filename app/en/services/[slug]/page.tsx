import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLanding } from "../../../seo-pages";
import { seoServices, serviceByEnSlug, servicePath, siteUrl, type SeoService } from "../../../seo-data";
export const dynamicParams = false;
export function generateStaticParams() { return seoServices.map(service => ({ slug: service.enSlug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const s = serviceByEnSlug[slug] as SeoService | undefined; if (!s) return {}; const path = servicePath(s, "en"); const image = `${siteUrl}${s.image}`; return { title: s.en.title, description: s.en.description, alternates: { canonical: path, languages: { "vi-VN": servicePath(s, "vi"), en: path, "x-default": servicePath(s, "vi") } }, openGraph: { type: "website", locale: "en_US", url: `${siteUrl}${path}`, title: s.en.title, description: s.en.description, images: [{ url: image, alt: s.en.name }] }, twitter: { card: "summary_large_image", title: s.en.title, description: s.en.description, images: [image] } }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const s = serviceByEnSlug[slug] as SeoService | undefined; if (!s) notFound(); return <ServiceLanding service={s} lang="en" />; }
