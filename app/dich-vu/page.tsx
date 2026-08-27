import type { Metadata } from "next";
import { ServiceIndex } from "../seo-pages";

export const metadata: Metadata = {
  title: "Dịch vụ làm đẹp tại Đà Nẵng",
  description: "Khám phá Chăm sóc da, Mi & Mày, Chăm sóc da đầu & Thư giãn, Triệt lông và Tẩy lông tại hato Beauty Đà Nẵng.",
  alternates: { canonical: "/dich-vu/", languages: { "vi-VN": "/dich-vu/", en: "/en/services/" } },
};

export default function Page() { return <ServiceIndex lang="vi" />; }
