import { CarePlanPage } from "../CarePlanPage";
import { createPageMetadata } from "../seo-metadata";

export const metadata = createPageMetadata({
  title: "Lộ trình đồng hành tại Hato Beauty Đà Nẵng",
  description: "Khám phá hành trình năm bước tại Hato Beauty: lắng nghe, định hướng, thống nhất kế hoạch, trải nghiệm, dặn dò và tái khám.",
  path: "/lo-trinh/",
  viPath: "/lo-trinh/",
  enPath: "/en/care-plan/",
  lang: "vi",
});

export default function Page() {
  return <CarePlanPage lang="vi" />;
}