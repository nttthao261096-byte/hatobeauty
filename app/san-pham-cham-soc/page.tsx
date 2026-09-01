import { createPageMetadata } from "../seo-metadata";
import { TrustPage } from "../seo-pages";

export const metadata = createPageMetadata({
  title: "Sản phẩm chăm sóc",
  description: "Khám phá định hướng sản phẩm chăm sóc tại nhà từ hato Beauty, phù hợp với nhu cầu và tình trạng thực tế của từng khách.",
  path: "/san-pham-cham-soc/",
  viPath: "/san-pham-cham-soc/",
  enPath: "/en/care-products/",
  lang: "vi",
});

export default function Page() {
  return <TrustPage lang="vi" kind="products" />;
}
