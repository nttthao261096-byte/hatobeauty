import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hato-beauty-studio.nttthao261096.chatgpt.site"),
  title: {
    default: "Hato Beauty | Beauty, made personal",
    template: "%s | Hato Beauty",
  },
  description: "Hato Beauty — chăm sóc da, gội đầu dưỡng sinh, mi và mày trong không gian màu be tinh tế. Facial care, herbal scalp therapy, lashes and brows.",
  icons: { icon: "/brand/hato-logo.png", shortcut: "/brand/hato-logo.png" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    title: "Hato Beauty | Beauty, made personal",
    description: "Ba nghi thức chăm sóc được thiết kế riêng: chăm sóc da, gội đầu dưỡng sinh, mi và mày.",
    images: [{ url: "/og.png", width: 1792, height: 936, alt: "Hato Beauty — Beauty, made personal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hato Beauty | Beauty, made personal",
    description: "Facial care, herbal scalp therapy, lashes and brows — designed around you.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
