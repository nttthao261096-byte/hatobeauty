import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hatobeauty.vn"),
  title: {
    default: "Hato Beauty | Beauty, made personal",
    template: "%s | Hato Beauty",
  },
  description: "Không gian chăm sóc sắc đẹp tinh tế, ấm áp và được cá nhân hóa tại Hato Beauty.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
