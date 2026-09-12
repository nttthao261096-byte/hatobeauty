import type { Metadata } from "next";

import { mediaUrl, siteUrl, type SeoLang } from "./seo-data";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  viPath: string;
  enPath: string;
  lang: SeoLang;
};

export function createPageMetadata({
  title,
  description,
  path,
  viPath,
  enPath,
  lang,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const image = mediaUrl("/og-shine.png");

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "vi-VN": viPath,
        en: enPath,
        "x-default": viPath,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      alternateLocale: lang === "vi" ? "en_US" : "vi_VN",
      url,
      siteName: "Hato Beauty",
      title,
      description,
      images: [
        {
          url: image,
          width: 1731,
          height: 909,
          alt: "Hato Beauty — Shine as you are",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
