export const dynamic = "force-dynamic";
import { findPublishedArticle } from "../../journal-content";
import { PublishedJournal, publishedMetadata } from "../../PublishedJournal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalLanding } from "../../seo-pages";
import { journalPath, journalTopics, siteUrl } from "../../seo-data";
export const dynamicParams = true;
export function generateStaticParams() { return journalTopics.map(x => ({ slug: x.viSlug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> { const {slug}=await params; const x=journalTopics.find(i=>i.viSlug===slug); if(!x){const article=await findPublishedArticle(slug,"vi");return article?publishedMetadata(article,"vi"):{};} const path=journalPath(x.service,"vi"); const title=x.service.id === "scalp" ? "Gội đầu dưỡng sinh: chuẩn bị & chăm sóc" : `${x.service.vi.name}: hướng dẫn chuẩn bị và chăm sóc`; const image=x.image; return {title,description:x.service.vi.description,alternates:{canonical:path,languages:{"vi-VN":path,en:journalPath(x.service,"en"),"x-default":path}},openGraph:{url:`${siteUrl}${path}`,title,description:x.service.vi.description,images:[image],locale:"vi_VN"},twitter:{card:"summary_large_image",title,description:x.service.vi.description,images:[image]}}; }
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const x=journalTopics.find(i=>i.viSlug===slug);if(!x){const article=await findPublishedArticle(slug,"vi");if(!article)notFound();return <PublishedJournal article={article} lang="vi"/>;}return <JournalLanding service={x.service} lang="vi"/>}
