import { createPageMetadata } from "../seo-metadata";
import { ServiceIndex } from "../seo-pages";

export const metadata = createPageMetadata({ title: "Dịch vụ làm đẹp tại Đà Nẵng", description: "Khám phá Chăm sóc da, Mi & Mày, Chăm sóc da đầu & Thư giãn, Triệt lông và Tẩy lông tại hato Beauty Đà Nẵng.", path: "/dich-vu/", viPath: "/dich-vu/", enPath: "/en/services/", lang: "vi" });

export default function Page() { return <ServiceIndex lang="vi" />; }
