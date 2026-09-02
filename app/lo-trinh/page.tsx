import { CarePlanPage } from "../CarePlanPage";
import { createPageMetadata } from "../seo-metadata";

export const metadata = createPageMetadata({
  title: "Lộ trình da tại hato Beauty Đà Nẵng",
  description: "Soi da, liệu trình spa, bộ dưỡng tại nhà và tái đánh giá sau 4–6 tuần. Xem giá tham khảo và sản phẩm chăm sóc da tại hato Beauty, Ngũ Hành Sơn.",
  path: "/lo-trinh/",
  viPath: "/lo-trinh/",
  enPath: "/en/care-plan/",
  lang: "vi",
});

export default function Page() {
  return <CarePlanPage lang="vi" />;
}
