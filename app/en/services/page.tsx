import type { Metadata } from "next";
import { ServiceIndex } from "../../seo-pages";

export const metadata: Metadata = {
  title: "Beauty care services in Da Nang",
  description: "Explore Skin, Head Spa, Body, Brow & Lash and Hair Removal services at hato Beauty.",
  alternates: { canonical: "/en/services/", languages: { "vi-VN": "/dich-vu/", en: "/en/services/" } },
};

export default function Page() { return <ServiceIndex lang="en" />; }
