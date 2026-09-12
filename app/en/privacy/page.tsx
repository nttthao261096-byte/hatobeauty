import { createPageMetadata } from "../../seo-metadata";
import { TrustPage } from "../../seo-pages";

export const metadata = createPageMetadata({ title: "Privacy policy", description: "Learn how Hato Beauty receives, uses and protects personal information submitted through consultation and appointment requests.", path: "/en/privacy/", viPath: "/chinh-sach-bao-mat/", enPath: "/en/privacy/", lang: "en" });

export default function Page() {
  return <TrustPage lang="en" kind="privacy" />;
}
