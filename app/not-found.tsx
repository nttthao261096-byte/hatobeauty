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
        <p>{lang === "vi" ? "Đường dẫn có thể đã thay đổi. Bạn có thể quay lại trang chủ hoặc để lại thông tin để được tư vấn lịch hẹn." : "The link may have changed. Return home or leave your details for a consultation."}</p>
        <div className="not-found-actions">
          <Link className="button primary" href={home}>{lang === "vi" ? "Về trang chủ" : "Back home"}<IconArrow /></Link>
          <a className="text-link" href={consultation} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Đặt lịch tư vấn" : "Book a consultation"}<IconArrow /></a>
        </div>
      </main>
    </div>
  );
}
