import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalLanding } from "../../../seo-pages";
import { journalPath, journalTopics, siteUrl } from "../../../seo-data";
export const dynamicParams = false;
export function generateStaticParams() { return journalTopics.map(x => ({ slug: x.enSlug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> { const {slug}=await params; const x=journalTopics.find(i=>i.enSlug===slug); if(!x)return {}; const path=journalPath(x.service,"en"); const title=`${x.service.en.name}: preparation and aftercare guide`; const image=`${siteUrl}${x.image}`; return {title,description:x.service.en.description,alternates:{canonical:path,languages:{"vi-VN":journalPath(x.service,"vi"),en:path,"x-default":journalPath(x.service,"vi")}},openGraph:{url:`${siteUrl}${path}`,title,description:x.service.en.description,images:[image],locale:"en_US"},twitter:{card:"summary_large_image",title,description:x.service.en.description,images:[image]}}; }
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const x=journalTopics.find(i=>i.enSlug===slug);if(!x)notFound();return <JournalLanding service={x.service} lang="en"/>}
