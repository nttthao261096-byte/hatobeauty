"use client";

import Image from "./OptimizedImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  bookingPath,
  equivalentPaths,
  pageRoutes,
  type LanguagePaths,
} from "./route-paths";
import { useModalFocus } from "./use-modal-focus";

import { trackEvent } from "./analytics";
import { ContactDetails } from "./ContactDetails";
import type { Lang } from "./content";
import { IconArrow } from "./icons";
import { mediaUrl } from "./seo-data";

const navByLang = {
  vi: [
    { href: "/dich-vu", label: "Dịch vụ" },
    { href: "/san-pham", label: "Sản phẩm" },
    { href: "/lo-trinh", label: "Lộ trình" },
    { href: "/kien-thuc", label: "Kiến thức" },
    { href: "/ve-hato-beauty", label: "Về hato" },
  ],
  en: [
    { href: "/en/services", label: "Services" },
    { href: "/en/care-products", label: "Products" },
    { href: "/en/care-plan", label: "Care plan" },
    { href: "/en/journal", label: "Journal" },
    { href: "/en/about", label: "About" },
  ],
} as const;

export function SiteHeader({
  lang,
  search,
  hideDesktopConsultation = false,
  languagePaths,
}: {
  lang: Lang;
  languagePaths?: LanguagePaths;
  hideDesktopConsultation?: boolean;
  search?: {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void;
  };
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useModalFocus(menuOpen, menuRef, () => setMenuOpen(false));
  const pathname = usePathname() ?? "";
  const isLeadPage = [
    pageRoutes.book.vi,
    pageRoutes.book.en,
    pageRoutes.contact.vi,
    pageRoutes.contact.en,
  ].some((path) => path === pathname);
  const translations = languagePaths ?? equivalentPaths(pathname);
  const navItems = navByLang[lang];
  const homeHref = lang === "vi" ? "/" : "/en";
  function isActive(href: string) {
    const path = href.replace(/\/$/, "");
    return pathname === path || pathname.startsWith(path + "/");
  }
  const consultationHref = bookingPath(lang);
  const bookLabel = lang === "vi" ? "Đặt lịch hẹn" : "Request an appointment";
  const menuLabel =
    lang === "vi"
      ? menuOpen
        ? "Đóng menu"
        : "Mở menu"
      : menuOpen
        ? "Close menu"
        : "Open menu";

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    const desktop = matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.classList.remove("nav-open");
      desktop.removeEventListener("change", closeOnDesktop);
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
      <a className="skip-link" href="#main-content">
        {lang === "vi" ? "Đến nội dung chính" : "Skip to content"}
      </a>
      <div id="top" aria-hidden="true" />
      <header className="site-header inner-site-header">
        <a className="brand" href={homeHref} aria-label="Hato Beauty">
          <Image
            src={mediaUrl("/brand/hato-logo-transparent-v3.png")}
            alt="Hato Beauty"
            width={1016}
            height={638}
            sizes="(max-width: 760px) 132px, 180px"
            priority
          />
        </a>
        <div
          ref={menuRef}
          id="site-menu"
          className={menuOpen ? "nav is-open" : "nav"}
          role={menuOpen ? "dialog" : "navigation"}
          aria-modal={menuOpen || undefined}
          tabIndex={-1}
          aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}
        >
          <div className="nav-drawer-head">
            <a
              className="nav-drawer-brand"
              href={homeHref}
              aria-label="Hato Beauty"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src={mediaUrl("/brand/hato-logo-transparent-v3.png")}
                alt="Hato Beauty"
                width={192}
                height={121}
                sizes="(max-width: 760px) 132px, 180px"
              />
            </a>
            <button
              type="button"
              className="nav-drawer-close"
              aria-label={lang === "vi" ? "Đóng menu" : "Close menu"}
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <div
            className="nav-drawer-language"
            aria-label={lang === "vi" ? "Chọn ngôn ngữ" : "Choose language"}
          >
            <span>{lang === "vi" ? "Ngôn ngữ" : "Language"}</span>
            <div className="language-switch">
              <Link
                className={lang === "vi" ? "active" : ""}
                href={translations?.vi ?? pageRoutes.home.vi}
                hrefLang="vi-VN"
                onClick={() => setMenuOpen(false)}
              >
                VI
              </Link>
              <span>/</span>
              <Link
                className={lang === "en" ? "active" : ""}
                href={translations?.en ?? pageRoutes.home.en}
                hrefLang="en"
                onClick={() => setMenuOpen(false)}
              >
                EN
              </Link>
            </div>
          </div>
          {navItems.map(({ href, label }) => (
            <a
              className={`nav-item${isActive(href) ? " is-active" : ""}`}
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          {search ? (
            <form className="nav-search" role="search" onSubmit={submitSearch}>
              <label>
                <span>{lang === "vi" ? "Tìm kiếm" : "Search"}</span>
                <input
                  value={search.value}
                  onChange={(event) => search.onChange(event.target.value)}
                  aria-label={
                    lang === "vi" ? "Tìm kiếm dịch vụ" : "Search services"
                  }
                />
                <button
                  type="submit"
                  aria-label={lang === "vi" ? "Tìm kiếm" : "Search"}
                >
                  ⌕
                </button>
              </label>
            </form>
          ) : null}
          <div className="nav-drawer-tools">
            <a
              className="header-booking-link nav-drawer-book"
              href={consultationHref}
              onClick={() => {
                setMenuOpen(false);
                trackEvent("booking_start", { language: lang, placement: "menu" });
              }}
            >
              <span className="header-book-full">{bookLabel}</span>
              <IconArrow />
            </a>
            <ContactDetails lang={lang} />
          </div>
        </div>
        <div className="header-tools">
          <div className="language-switch">
            <Link
              className={lang === "vi" ? "active" : ""}
              href={translations?.vi ?? pageRoutes.home.vi}
              hrefLang="vi-VN"
              title={
                !translations
                  ? "Bản dịch chưa có — về trang chủ tiếng Việt"
                  : undefined
              }
            >
              VI
            </Link>
            <span>/</span>
            <Link
              className={lang === "en" ? "active" : ""}
              href={translations?.en ?? pageRoutes.home.en}
              hrefLang="en"
              title={
                !translations
                  ? "Translation unavailable — English homepage"
                  : undefined
              }
            >
              EN
            </Link>
          </div>
          {!hideDesktopConsultation ? (
            <a className="header-booking-link" href={consultationHref} onClick={() => trackEvent("booking_start", { language: lang, placement: "header" })}>
              <span className="header-book-full">{bookLabel}</span>
              <span className="header-book-short">
                {lang === "vi" ? "Đặt lịch" : "Book"}
              </span>
              <IconArrow />
            </a>
          ) : null}
          <button
            className={menuOpen ? "menu-button is-open" : "menu-button"}
            aria-label={menuLabel}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div
        className="mobile-dock"
        hidden={menuOpen || isLeadPage}
        aria-label={lang === "vi" ? "Liên hệ nhanh" : "Quick contact"}
      >
        <a className="mobile-dock-call" href="tel:+84703214868" onClick={() => trackEvent("contact_click", { channel: "phone", language: lang, placement: "mobile_dock" })}>
          <span>{lang === "vi" ? "Gọi" : "Call"}</span>
          <strong>0703 214 868</strong>
        </a>
        <a className="mobile-dock-book" href={consultationHref} onClick={() => trackEvent("booking_start", { language: lang, placement: "mobile_dock" })}>
          {lang === "vi" ? "Đặt lịch hẹn" : "Request appointment"}
        </a>
      </div>
    </>
  );
}
