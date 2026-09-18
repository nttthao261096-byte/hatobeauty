import { ProductsPage } from "../../ProductsPage";
import { createPageMetadata } from "../../seo-metadata";

export const metadata = createPageMetadata({
  title: "Skin care products",
  description:
    "Ask Hato Beauty in Da Nang about home skincare suited to your needs. Product availability and pricing are confirmed before you buy.",
  path: "/en/care-products/",
  viPath: "/san-pham/",
  enPath: "/en/care-products/",
  lang: "en",
});

export default function Page() {
  return <ProductsPage lang="en" />;
}
