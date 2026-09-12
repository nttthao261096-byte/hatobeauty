import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLanding } from "../../seo-pages";
import { seoServices, serviceByViSlug, servicePath, siteUrl, type SeoService } from "../../seo-data";

export const dynamicParams = false;
export function generateStaticParams() { return seoServices.map(service => ({ slug: service.viSlug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const s = serviceByViSlug[slug] as SeoService | undefined; if (!s) return {}; const path = servicePath(s, "vi"); const image = s.image; return { title: s.vi.title, description: s.vi.description, alternates: { canonical: path, languages: { "vi-VN": path, en: servicePath(s, "en"), "x-default": path } }, openGraph: { type: "website", locale: "vi_VN", url: `${siteUrl}${path}`, title: s.vi.title, description: s.vi.description, images: [{ url: image, alt: s.vi.name }] }, twitter: { card: "summary_large_image", title: s.vi.title, description: s.vi.description, images: [image] } }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const s = serviceByViSlug[slug] as SeoService | undefined; if (!s) notFound(); return <ServiceLanding service={s} lang="vi" />; }
