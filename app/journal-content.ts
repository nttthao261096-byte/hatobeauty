import { cache } from "react";
import { journalTopics, type SeoLang } from "./seo-data";
export type PublishedArticle = {
  id: number;
  title_vi: string;
  title_en: string;
  slug_vi: string;
  slug_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  content_vi: string;
  content_en: string;
  image_path: string;
  reading_time_vi: string;
  reading_time_en: string;
  created_at: string;
  updated_at?: string;
  is_published: boolean;
};
export const articlePath = (article: PublishedArticle, lang: SeoLang) =>
  (lang === "vi" ? "/kien-thuc/" : "/en/journal/") +
  encodeURIComponent(article[`slug_${lang}`]) +
  "/";
export const loadPublishedArticles = cache(
  async (): Promise<PublishedArticle[]> => {
    const base = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!base || !key) return [];
    const query = new URLSearchParams({
      select:
        "id,title_vi,title_en,slug_vi,slug_en,excerpt_vi,excerpt_en,content_vi,content_en,image_path,reading_time_vi,reading_time_en,created_at,updated_at,is_published",
      is_published: "eq.true",
      order: "sort_order.asc",
      limit: "1000",
    });
    const response = await fetch(
      base.replace(/\/$/, "") + "/rest/v1/journal_articles?" + query,
      {
        headers: { apikey: key },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!response.ok) throw new Error("Không thể tải bài viết đã xuất bản.");
    const rows = (await response.json()) as PublishedArticle[];
    return rows.filter(
      (x) =>
        x.is_published === true &&
        x.content_vi?.trim() &&
        x.content_en?.trim() &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x.slug_vi) &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x.slug_en) &&
        !journalTopics.some(
          (t) => t.viSlug === x.slug_vi || t.enSlug === x.slug_en,
        ),
    );
  },
);
export async function findPublishedArticle(slug: string, lang: SeoLang) {
  return (await loadPublishedArticles()).find(
    (x) => x[`slug_${lang}`] === slug,
  );
}
