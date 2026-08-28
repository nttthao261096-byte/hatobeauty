import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond, Lora } from "next/font/google";
import Script from "next/script";
import { LanguageSync } from "./LanguageSync";
import { mediaUrl } from "./seo-data";
import "./globals.css";

const bodyFont = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["300", "400", "500", "600"], variable: "--font-body", display: "swap" });
const brandFont = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"], variable: "--font-brand", display: "swap" });
const displayFont = Lora({ subsets: ["latin", "vietnamese"], weight: ["400", "500"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hatobeauty.com"),
  title: {
    default: "hato Beauty — Shine as you are",
    template: "%s | hato Beauty",
  },
  description: "Chăm sóc da, Mi & Mày, Chăm sóc da đầu & Thư giãn, Triệt lông và Tẩy lông tại hato Beauty Đà Nẵng.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: mediaUrl("/brand/hato-logo-transparent-v3.png"), shortcut: mediaUrl("/brand/hato-logo-transparent-v3.png") },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    title: "hato Beauty — Shine as you are",
    description: "Five care groups in Da Nang: Skin, Brow & Lash, Scalp Care & Relaxation, Hair Removal and Waxing.",
    images: [{ url: mediaUrl("/og-shine.png"), width: 1731, height: 909, alt: "hato Beauty — SHINE AS YOU ARE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "hato Beauty — Shine as you are",
    description: "Skin, Brow & Lash, Scalp Care & Relaxation, Hair Removal and Waxing in Da Nang.",
    images: [mediaUrl("/og-shine.png")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" data-scroll-behavior="smooth" suppressHydrationWarning><body className={`${bodyFont.variable} ${brandFont.variable} ${displayFont.variable}`}>
    <Script id="sync-document-language" strategy="beforeInteractive">{`document.documentElement.lang=location.pathname.startsWith('/en')?'en':'vi'`}</Script>
    <LanguageSync />
    {children}
  </body></html>;
}
