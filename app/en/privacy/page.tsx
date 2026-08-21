import type { Metadata } from "next";

import { TrustPage } from "../../seo-pages";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How hato Beauty uses details submitted in consultation and booking requests.",
  alternates: {
    canonical: "/en/privacy/",
    languages: {
      "vi-VN": "/chinh-sach-bao-mat/",
      en: "/en/privacy/",
      "x-default": "/chinh-sach-bao-mat/",
    },
  },
};

export default function Page() {
  return <TrustPage lang="en" kind="privacy" />;
}
