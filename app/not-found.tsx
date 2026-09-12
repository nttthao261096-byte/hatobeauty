"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconArrow } from "./icons";
import { SiteHeader } from "./SiteHeader";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/en") ? "en" : "vi";
  const home = lang === "vi" ? "/" : "/en/";
  const consultation = lang === "vi" ? "https://zalo.me/0703214868" : "https://wa.me/84703214868";

  return (
    <div className="not-found-page" lang={lang}>
      <SiteHeader lang={lang} />
      <main className="not-found-main">
        <p className="eyebrow">{lang === "vi" ? "TRANG KHÔNG TÌM THẤY" : "PAGE NOT FOUND"}</p>
        <h1>{lang === "vi" ? "Trang này chưa có trong hành trình của hato." : "This page is not part of the hato journey."}</h1>
        <p>{lang === "vi" ? "Đường dẫn có thể đã đổi. Đi tiếp bằng một trong ba việc dưới đây." : "The link may have moved. Continue with one of the three paths below."}</p>
        <div className="not-found-actions">
          <Link className="button primary" href={lang === "vi" ? "/lo-trinh/" : "/en/care-plan/"}>{lang === "vi" ? "Xem lộ trình da" : "See the skin plan"}<IconArrow /></Link>
          <Link className="button ghost" href={lang === "vi" ? "/san-pham/" : "/en/care-products/"}>{lang === "vi" ? "Xem sản phẩm" : "See products"}<IconArrow /></Link>
          <a className="text-link" href={consultation} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Đặt lịch soi da" : "Book a skin check"}<IconArrow /></a>
          <Link className="text-link" href={home}>{lang === "vi" ? "Về trang chủ" : "Back home"}</Link>
        </div>
      </main>
    </div>
  );
}
