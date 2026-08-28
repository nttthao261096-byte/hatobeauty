"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import type { Lang } from "./content";
import { IconArrow } from "./icons";
import { mediaUrl } from "./seo-data";

const navByLang = {
  vi: [
    ["/ve-hato-beauty/", "Về chúng tôi"],
    ["/dich-vu/", "Dịch vụ"],
    ["/kien-thuc/", "Kiến thức"],
    ["/ket-qua/", "Kết quả"],
    ["/lien-he/", "Liên hệ"],
  ],
  en: [
    ["/en/about/", "About"],
    ["/en/services/", "Services"],
    ["/en/journal/", "Journal"],
    ["/en/results/", "Results"],
    ["/en/contact/", "Contact"],
  ],
} as const;

export function SiteHeader({
  lang,
  search,
}: {
  lang: Lang;
  search?: {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
  };
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = navByLang[lang];
  const homeHref = lang === "vi" ? "/" : "/en/";
  const bookHref = lang === "vi" ? "/dat-lich/" : "/en/book/";
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
    <header className="site-header inner-site-header">
      <a className="brand" href={homeHref} aria-label="hato Beauty">
        <Image src={mediaUrl("/brand/hato-logo-transparent-v3.png")} alt="hato Beauty" width={1016} height={638} priority />
      </a>
      <nav id="site-menu" className={menuOpen ? "nav is-open" : "nav"} aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}>
        {navItems.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
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
          <div className="language-switch">
            <Link className={lang === "vi" ? "active" : ""} href="/" hrefLang="vi-VN" onClick={() => setMenuOpen(false)}>VI</Link>
            <span>/</span>
            <Link className={lang === "en" ? "active" : ""} href="/en/" hrefLang="en" onClick={() => setMenuOpen(false)}>EN</Link>
          </div>
          <div className="header-hotline" aria-label={lang === "vi" ? "Hotline hato Beauty" : "hato Beauty hotline"}>
            <span>Hotline</span>
            <a href="tel:+84703214868">0703 214 868</a>
            <i aria-hidden="true">·</i>
            <a href="tel:+84915860446">0915 860 446</a>
          </div>
          <Link className="header-booking-link nav-drawer-book" href={bookHref} onClick={() => setMenuOpen(false)}>
            <span className="header-book-full">{bookLabel}</span><IconArrow />
          </Link>
        </div>
      </nav>
      <div className="header-tools">
        <div className="language-switch">
          <Link className={lang === "vi" ? "active" : ""} href="/" hrefLang="vi-VN">VI</Link>
          <span>/</span>
          <Link className={lang === "en" ? "active" : ""} href="/en/" hrefLang="en">EN</Link>
        </div>
        <Link className="header-booking-link" href={bookHref}>
          <span className="header-book-full">{bookLabel}</span>
          <span className="header-book-short">{lang === "vi" ? "Đặt lịch" : "Book"}</span>
          <IconArrow />
        </Link>
        <button className={menuOpen ? "menu-button is-open" : "menu-button"} aria-label={menuLabel} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
