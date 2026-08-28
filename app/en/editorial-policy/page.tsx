import { createPageMetadata } from "../../seo-metadata";
import { TrustPage } from "../../seo-pages";

export const metadata = createPageMetadata({ title: "Editorial policy", description: "Learn how hato Beauty selects sources, prepares, reviews and updates the practical beauty-care information published in its journal.", path: "/en/editorial-policy/", viPath: "/chinh-sach-bien-tap/", enPath: "/en/editorial-policy/", lang: "en" });

export default function Page() {
  return <TrustPage lang="en" kind="editorial" />;
}
