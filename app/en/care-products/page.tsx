import { createPageMetadata } from "../../seo-metadata";
import { TrustPage } from "../../seo-pages";

export const metadata = createPageMetadata({
  title: "Care products",
  description: "Explore at-home care guidance from hato Beauty, shaped around each guest’s needs and current condition.",
  path: "/en/care-products/",
  viPath: "/san-pham-cham-soc/",
  enPath: "/en/care-products/",
  lang: "en",
});

export default function Page() {
  return <TrustPage lang="en" kind="products" />;
}
