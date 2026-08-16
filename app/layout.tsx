import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hatobeauty.vercel.app"),
  title: {
    default: "hato Beauty — Shine as you are",
    template: "%s | hato Beauty",
  },
  description: "Skin, Head Spa, Body, Brow & Lash và Hair Removal trong không gian riêng tư tại hato Beauty.",
  icons: { icon: "/brand/hato-logo-transparent-v3.png", shortcut: "/brand/hato-logo-transparent-v3.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "vi_VN",
    title: "hato Beauty — Shine as you are",
    description: "Five personalized care worlds: Skin, Head Spa, Body, Brow & Lash and Hair Removal.",
    images: [{ url: "/og-shine.png", width: 1731, height: 909, alt: "hato Beauty — SHINE AS YOU ARE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "hato Beauty — Shine as you are",
    description: "Skin, Head Spa, Body, Brow & Lash and Hair Removal — designed around you.",
    images: ["/og-shine.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
