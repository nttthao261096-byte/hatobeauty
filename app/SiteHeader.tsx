"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { ContactDetails } from "./ContactDetails";
import type { Lang } from "./content";
import { IconArrow } from "./icons";
import { mediaUrl } from "./seo-data";

const navByLang = {
  vi: [
    { href: "/dich-vu/", label: "Dịch vụ" },
    { href: "/san-pham/", label: "Sản phẩm" },
    { href: "/lo-trinh/", label: "Lộ trình" },
    { href: "/kien-thuc/", label: "Kiến thức" },
    { href: "/ve-hato-beauty/", label: "Về hato" },
  ],
  en: [
    { href: "/en/services/", label: "Services" },
    { href: "/en/care-products/", label: "Products" },
    { href: "/en/care-plan/", label: "Care plan" },
    { href: "/en/journal/", label: "Journal" },
    { href: "/en/about/", label: "About" },
  ],
} as const;

export function SiteHeader({
  lang,
  search,
  hideDesktopConsultation = false,
}: {
  lang: Lang;
  hideDesktopConsultation?: boolean;
  search?: {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
  };
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const navItems = navByLang[lang];
  const homeHref = lang === "vi" ? "/" : "/en/";
  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href);
  }
  const consultationHref = lang === "vi" ? "https://zalo.me/0703214868" : "https://wa.me/84703214868";
  const bookLabel = lang === "vi" ? "Đặt lịch tư vấn" : "Book a consultation";
  const menuLabel = lang === "vi" ? (menuOpen ? "Đóng menu" : "Mở menu") : (menuOpen ? "Close menu" : "Open menu");

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMenuOpen(false);
    search?.onSubmit?.();
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
    <header className="site-header inner-site-header">
      <a className="brand" href={homeHref} aria-label="hato Beauty">
        <Image src={mediaUrl("/brand/hato-logo-transparent-v3.png")} alt="hato Beauty" width={1016} height={638} priority />
      </a>
      <nav id="site-menu" className={menuOpen ? "nav is-open" : "nav"} aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}>
        <div className="nav-drawer-head">
          <a className="nav-drawer-brand" href={homeHref} aria-label="hato Beauty" onClick={() => setMenuOpen(false)}>
            <Image src={mediaUrl("/brand/hato-logo-transparent-v3.png")} alt="hato Beauty" width={1016} height={638} />
          </a>
          <button type="button" className="nav-drawer-close" aria-label={lang === "vi" ? "Đóng menu" : "Close menu"} onClick={() => setMenuOpen(false)}>×</button>
        </div>
        <div className="nav-drawer-language" aria-label={lang === "vi" ? "Chọn ngôn ngữ" : "Choose language"}>
          <span>{lang === "vi" ? "Ngôn ngữ" : "Language"}</span>
          <div className="language-switch">
            <Link className={lang === "vi" ? "active" : ""} href="/" hrefLang="vi-VN" onClick={() => setMenuOpen(false)}>VI</Link>
            <span>/</span>
            <Link className={lang === "en" ? "active" : ""} href="/en/" hrefLang="en" onClick={() => setMenuOpen(false)}>EN</Link>
          </div>
        </div>
        {navItems.map(({ href, label }) => (
          <a className={`nav-item${isActive(href) ? " is-active" : ""}`} key={href} href={href} aria-current={isActive(href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        {search ? (
          <form className="nav-search" role="search" onSubmit={submitSearch}>
            <label>
              <span>{lang === "vi" ? "Tìm kiếm" : "Search"}</span>
              <input
                value={search.value}
                onChange={(event) => search.onChange(event.target.value)}
                aria-label={lang === "vi" ? "Tìm kiếm dịch vụ" : "Search services"}
              />
              <button type="submit" aria-label={lang === "vi" ? "Tìm kiếm" : "Search"}>⌕</button>
            </label>
          </form>
        ) : null}
        <div className="nav-drawer-tools">
          <a className="header-booking-link nav-drawer-book" href={consultationHref} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            <span className="header-book-full">{lang === "vi" ? "Liên hệ ngay" : "Contact now"}</span><IconArrow />
          </a>
          <ContactDetails lang={lang} />
        </div>
      </nav>
      <div className="header-tools">
        <div className="language-switch">
          <Link className={lang === "vi" ? "active" : ""} href="/" hrefLang="vi-VN">VI</Link>
          <span>/</span>
          <Link className={lang === "en" ? "active" : ""} href="/en/" hrefLang="en">EN</Link>
        </div>
        {!hideDesktopConsultation ? <a className="header-booking-link" href={consultationHref} target="_blank" rel="noopener noreferrer">
          <span className="header-book-full">{bookLabel}</span>
          <span className="header-book-short">{lang === "vi" ? "Đặt lịch" : "Book"}</span>
          <IconArrow />
        </a> : null}
        <button className={menuOpen ? "menu-button is-open" : "menu-button"} aria-label={menuLabel} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
        </button>
      </div>
    </header>
    <div className="mobile-dock" aria-label={lang === "vi" ? "Liên hệ nhanh" : "Quick contact"}>
      <a className="mobile-dock-call" href="tel:+84703214868"><span>{lang === "vi" ? "Gọi" : "Call"}</span><strong>0703 214 868</strong></a>
      <a className="mobile-dock-book" href={consultationHref} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Đặt lịch" : "Book now"}</a>
    </div>
    </>
  );
}
