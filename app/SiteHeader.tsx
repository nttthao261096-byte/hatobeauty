"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { ContactDetails } from "./ContactDetails";
import type { Lang } from "./content";
import { IconArrow } from "./icons";
import { mediaUrl } from "./seo-data";

const navByLang = {
  vi: [
    { href: "/dich-vu/", label: "Dịch vụ" },
    { href: "/ket-qua/", label: "Đánh giá", mobileLabel: "Kết quả" },
    { href: "/kien-thuc/", label: "Kiến thức" },
    { href: "/ve-hato-beauty/", label: "Về Hato Beauty" },
    { href: "/san-pham-cham-soc/", label: "Sản phẩm chăm sóc", desktopOnly: true },
    { href: "/lien-he/", label: "Liên hệ", desktopOnly: true },
  ],
  en: [
    { href: "/en/services/", label: "Services" },
    { href: "/en/results/", label: "Reviews", mobileLabel: "Results" },
    { href: "/en/journal/", label: "Knowledge" },
    { href: "/en/about/", label: "About us" },
    { href: "/en/care-products/", label: "Care products", desktopOnly: true },
    { href: "/en/contact/", label: "Contact", desktopOnly: true },
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
  const navItems = navByLang[lang];
  const homeHref = lang === "vi" ? "/" : "/en/";
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
        {navItems.map(({ href, label, ...item }) => (
          <a className={`nav-item${"desktopOnly" in item ? " nav-item-desktop-only" : ""}`} key={href} href={href} onClick={() => setMenuOpen(false)}>
            {"mobileLabel" in item ? <><span className="nav-label-desktop">{label}</span><span className="nav-label-mobile">{item.mobileLabel}</span></> : label}
          </a>
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
      <a className="mobile-dock-call" href="tel:+84703214868"><span>Hotline</span><strong>0703214868</strong></a>
      <a className="mobile-dock-book" href={consultationHref} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Tư vấn ngay" : "Consult now"}</a>
    </div>
    </>
  );
}
