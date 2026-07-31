import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hato-beauty-studio.nttthao261096.chatgpt.site"),
  title: {
    default: "hato Beauty | Beauty, made personal",
    template: "%s | hato Beauty",
  },
  description: "Personal facial care, herbal scalp therapy, lashes and brows in a calm, refined space. Chăm sóc sắc đẹp được thiết kế riêng tại hato Beauty.",
  icons: { icon: "/brand/hato-logo.png", shortcut: "/brand/hato-logo.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "vi_VN",
    title: "hato Beauty | Beauty, made personal",
    description: "Personal facial care, herbal scalp therapy, lashes and brows — thoughtful rituals designed around you.",
    images: [{ url: "/og.png", width: 1792, height: 936, alt: "hato Beauty — Beauty, made personal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "hato Beauty | Beauty, made personal",
    description: "Facial care, herbal scalp therapy, lashes and brows — designed around you.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
