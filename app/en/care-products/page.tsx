import { ProductsPage } from "../../ProductsPage";
import { createPageMetadata } from "../../seo-metadata";

export const metadata = createPageMetadata({
  title: "Skin care products",
  description: "Cleanser, toner, serum, cream and SPF that sit with the spa plan at hato Beauty in Da Nang. Price sits under each photo.",
  path: "/en/care-products/",
  viPath: "/san-pham/",
  enPath: "/en/care-products/",
  lang: "en",
});

export default function Page() {
  return <ProductsPage lang="en" />;
}
