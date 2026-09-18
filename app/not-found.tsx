"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconArrow } from "./icons";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { bookingPath } from "./route-paths";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/en") ? "en" : "vi";
  const home = lang === "vi" ? "/" : "/en";
  const consultation = bookingPath(lang);

  return (
    <div className="not-found-page" lang={lang}>
      <SiteHeader lang={lang} />
      <main id="main-content" tabIndex={-1} className="not-found-main">
        <p className="eyebrow">
          {lang === "vi" ? "TRANG KHÔNG TÌM THẤY" : "PAGE NOT FOUND"}
        </p>
        <h1>
          {lang === "vi"
            ? "Trang này chưa có trong hành trình của hato."
            : "This page is not part of the hato journey."}
        </h1>
        <p>
          {lang === "vi"
            ? "Đường dẫn có thể đã đổi. Đi tiếp bằng một trong ba việc dưới đây."
            : "The link may have moved. Continue with one of the three paths below."}
        </p>
        <div className="not-found-actions">
          <Link
            className="button primary"
            href={lang === "vi" ? "/lo-trinh" : "/en/care-plan"}
          >
            {lang === "vi" ? "Xem lộ trình da" : "See the skin plan"}
            <IconArrow />
          </Link>
          <Link
            className="button ghost"
            href={lang === "vi" ? "/san-pham" : "/en/care-products"}
          >
            {lang === "vi" ? "Xem sản phẩm" : "See products"}
            <IconArrow />
          </Link>
          <a className="text-link" href={consultation}>
            {lang === "vi" ? "Đặt lịch hẹn" : "Request an appointment"}
            <IconArrow />
          </a>
          <Link className="text-link" href={home}>
            {lang === "vi" ? "Về trang chủ" : "Back home"}
          </Link>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
