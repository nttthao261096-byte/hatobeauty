import type { Metadata } from "next";
import { ServiceIndex } from "../seo-pages";

export const metadata: Metadata = {
  title: "Dịch vụ chăm sóc tại Đà Nẵng",
  description: "Khám phá năm nhóm dịch vụ Skin, Head Spa, Body, Brow & Lash và Hair Removal tại hato Beauty.",
  alternates: { canonical: "/dich-vu/", languages: { "vi-VN": "/dich-vu/", en: "/en/services/" } },
};

export default function Page() { return <ServiceIndex lang="vi" />; }
