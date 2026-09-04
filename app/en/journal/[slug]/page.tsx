export const dynamic = "force-dynamic";
import { findPublishedArticle } from "../../../journal-content";
import { PublishedJournal, publishedMetadata } from "../../../PublishedJournal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalLanding } from "../../../seo-pages";
import { journalPath, journalTopics, siteUrl } from "../../../seo-data";
export const dynamicParams = true;
export function generateStaticParams() { return journalTopics.map(x => ({ slug: x.enSlug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> { const {slug}=await params; const x=journalTopics.find(i=>i.enSlug===slug); if(!x){const article=await findPublishedArticle(slug,"en");return article?publishedMetadata(article,"en"):{};} const path=journalPath(x.service,"en"); const title=x.service.id === "brow-lash" ? "Lash & brow care: preparation and aftercare" : `${x.service.en.name}: preparation and aftercare guide`; const image=x.image; return {title,description:x.service.en.description,alternates:{canonical:path,languages:{"vi-VN":journalPath(x.service,"vi"),en:path,"x-default":journalPath(x.service,"vi")}},openGraph:{url:`${siteUrl}${path}`,title,description:x.service.en.description,images:[image],locale:"en_US"},twitter:{card:"summary_large_image",title,description:x.service.en.description,images:[image]}}; }
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const x=journalTopics.find(i=>i.enSlug===slug);if(!x){const article=await findPublishedArticle(slug,"en");if(!article)notFound();return <PublishedJournal article={article} lang="en"/>;}return <JournalLanding service={x.service} lang="en"/>}
