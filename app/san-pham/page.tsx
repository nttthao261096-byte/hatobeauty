import { ProductsPage } from "../ProductsPage";
import { createPageMetadata } from "../seo-metadata";

export const metadata = createPageMetadata({
  title: "Sản phẩm chăm sóc da",
  description: "Sữa rửa mặt, toner, serum, kem dưỡng và chống nắng đi cùng lộ trình spa tại hato Beauty Đà Nẵng. Giá hiện dưới từng ảnh.",
  path: "/san-pham/",
  viPath: "/san-pham/",
  enPath: "/en/care-products/",
  lang: "vi",
});

export default function Page() {
  return <ProductsPage lang="vi" />;
}
