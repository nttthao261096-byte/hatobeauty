import type { Metadata } from "next";
import Link from "next/link";
import Image from "./OptimizedImage";
import { ArticleMarkdown } from "./ArticleMarkdown";
import { articlePath, type PublishedArticle } from "./journal-content";
import { SeoFooter, SeoHeader } from "./seo-pages";
import { siteUrl, type SeoLang } from "./seo-data";
function cover(article: PublishedArticle) {
  return /^\/(?!\/)/.test(article.image_path) &&
    !article.image_path.includes("\\")
    ? article.image_path
    : "/images/journal-skin-v2.webp";
}
export function publishedMetadata(
  article: PublishedArticle,
  lang: SeoLang,
): Metadata {
  const title = article[`title_${lang}`],
    description = article[`excerpt_${lang}`],
    path = articlePath(article, lang),
    image = siteUrl + cover(article);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "vi-VN": articlePath(article, "vi"),
        en: articlePath(article, "en"),
        "x-default": articlePath(article, "vi"),
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: siteUrl + path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
export function PublishedJournal({
  article,
  lang,
}: {
  article: PublishedArticle;
  lang: SeoLang;
}) {
  const title = article[`title_${lang}`],
    path = articlePath(article, lang),
    index = lang === "vi" ? "/kien-thuc/" : "/en/journal/";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: article[`excerpt_${lang}`],
    inLanguage: lang === "vi" ? "vi-VN" : "en",
    mainEntityOfPage: siteUrl + path,
    url: siteUrl + path,
    image: siteUrl + cover(article),
    publisher: { "@type": "Organization", name: "Hato Beauty", url: siteUrl },
  };
  return (
    <div className="seo-page" lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\u003c"),
        }}
      />
      <SeoHeader lang={lang} />
      <main className="seo-article journal-article">
        <nav
          className="breadcrumbs"
          aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}
        >
          <Link href={lang === "vi" ? "/" : "/en/"}>
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <span>/</span>
          <Link href={index}>{lang === "vi" ? "Kiến thức" : "Journal"}</Link>
        </nav>
        <header>
          <p className="seo-eyebrow">
            HATO BEAUTY · {article[`reading_time_${lang}`]}
          </p>
          <h1>{title}</h1>
          <p>{article[`excerpt_${lang}`]}</p>
        </header>
        <div
          style={{ position: "relative", aspectRatio: "16/9", marginBlock: 24 }}
        >
          <Image
            src={cover(article)}
            alt={title}
            fill
            sizes="(max-width: 760px) 100vw, 900px"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <ArticleMarkdown content={article[`content_${lang}`]} />
        <div className="article-next">
          <Link href={index}>
            {lang === "vi" ? "Xem tất cả bài viết" : "View all articles"}
          </Link>
          <Link
            href={articlePath(article, lang === "vi" ? "en" : "vi")}
            hrefLang={lang === "vi" ? "en" : "vi-VN"}
          >
            {lang === "vi" ? "Read in English" : "Đọc tiếng Việt"}
          </Link>
        </div>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}
