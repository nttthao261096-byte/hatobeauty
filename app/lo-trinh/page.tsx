import { createPageMetadata } from "../seo-metadata";
import { TrustPage } from "../seo-pages";

export const metadata = createPageMetadata({ title: "Lộ trình chăm sóc tại hato Beauty", description: "Khám phá bốn bước lắng nghe, đánh giá, thiết kế và theo dõi lộ trình chăm sóc dành riêng cho bạn tại hato Beauty Đà Nẵng.", path: "/lo-trinh/", viPath: "/lo-trinh/", enPath: "/en/care-plan/", lang: "vi" });

export default function Page() { return <TrustPage lang="vi" kind="carePlan" />; }
