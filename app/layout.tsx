import type { Metadata } from "next";
import Script from "next/script";
import { LanguageSync } from "./LanguageSync";
import { mediaUrl } from "./seo-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hatobeauty.com"),
  title: {
    default: "hato Beauty — Shine as you are",
    template: "%s | hato Beauty",
  },
  description: "Skin, Head Spa, Body, Brow & Lash, Waxing và Hair Removal tại hato Beauty Đà Nẵng — thông tin rõ ràng, chăm sóc nhẹ nhàng và kỳ vọng thực tế.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: mediaUrl("/brand/hato-logo-transparent-v3.png"), shortcut: mediaUrl("/brand/hato-logo-transparent-v3.png") },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    title: "hato Beauty — Shine as you are",
    description: "Six personalized care worlds: Skin, Head Spa, Body, Brow & Lash, Waxing and Hair Removal.",
    images: [{ url: mediaUrl("/og-shine.png"), width: 1731, height: 909, alt: "hato Beauty — SHINE AS YOU ARE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "hato Beauty — Shine as you are",
    description: "Skin, Head Spa, Body, Brow & Lash, Waxing and Hair Removal — designed around you.",
    images: [mediaUrl("/og-shine.png")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" data-scroll-behavior="smooth" suppressHydrationWarning><body>
    <Script id="sync-document-language" strategy="beforeInteractive">{`document.documentElement.lang=location.pathname.startsWith('/en')?'en':'vi'`}</Script>
    <LanguageSync />
    {children}
  </body></html>;
}
