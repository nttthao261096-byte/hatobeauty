import type { Metadata } from "next";

import { TrustPage } from "../../seo-pages";

export const metadata: Metadata = {
  title: "Editorial policy",
  description: "How hato Beauty prepares, reviews and qualifies its beauty-care journal content.",
  alternates: {
    canonical: "/en/editorial-policy/",
    languages: {
      "vi-VN": "/chinh-sach-bien-tap/",
      en: "/en/editorial-policy/",
      "x-default": "/chinh-sach-bien-tap/",
    },
  },
};

export default function Page() {
  return <TrustPage lang="en" kind="editorial" />;
}
