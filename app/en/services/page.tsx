import type { Metadata } from "next";
import { ServiceIndex } from "../../seo-pages";

export const metadata: Metadata = {
  title: "Beauty care services in Da Nang",
  description: "Explore Skin, Brow & Lash, Scalp Care & Relaxation, Hair Removal and Waxing services at hato Beauty in Da Nang.",
  alternates: { canonical: "/en/services/", languages: { "vi-VN": "/dich-vu/", en: "/en/services/" } },
};

export default function Page() { return <ServiceIndex lang="en" />; }
