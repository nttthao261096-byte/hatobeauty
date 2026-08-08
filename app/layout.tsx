import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hato-beauty-studio.nttthao261096.chatgpt.site"),
  title: {
    default: "hato Beauty | Shine as you are",
    template: "%s | hato Beauty",
  },
  description: "Chăm sóc da, gội đầu dưỡng sinh, định hình chân mày, uốn mi, triệt lông và waxing trong không gian riêng tư tại hato Beauty.",
  icons: { icon: "/brand/hato-logo-transparent-v3.png", shortcut: "/brand/hato-logo-transparent-v3.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "vi_VN",
    title: "hato Beauty | Shine as you are",
    description: "Beauty rituals designed around you: facial care, herbal scalp therapy, brow shaping, lash lift, hair removal and waxing.",
    images: [{ url: "/og-v2.png", width: 1736, height: 907, alt: "hato Beauty — Shine as you are" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "hato Beauty | Shine as you are",
    description: "Facial care, herbal scalp therapy, brow shaping, lash lift, hair removal and waxing — designed around you.",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
