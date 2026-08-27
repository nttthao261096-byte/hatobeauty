"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";

import type { Category, HomeContent, Lang } from "./content";
import { getBookingErrorMessage } from "./booking-errors";
import { BOOKING_PHONE_PATTERN } from "./booking-validation";
import { journalPath, mediaUrl, seoServices, servicePath } from "./seo-data";
import { useMinimumBookingDate } from "./use-minimum-booking-date";

function brandText(text: string): ReactNode {
  return text.split(/(hato)/gi).map((part, index) =>
    /^hato$/i.test(part) ? <span className="hato-word" key={`${part}-${index}`}>hato</span> : part,
  );
}

const copy = {
  vi: {
    announcement: "Hãy để chúng tôi đánh thức vẻ đẹp trong bạn.",
    book: "Đặt lịch tư vấn",
    nav: ["Về chúng tôi", "Dịch vụ", "Trải nghiệm", "Kết quả", "Cảm nhận"],
    heroEyebrow: "TỎA SÁNG THEO CÁCH CỦA BẠN",
    heroTitle: "Giải pháp chăm sóc da hiệu quả.",
    heroText: "Bởi mỗi người đều có một vẻ đẹp riêng. Tại đây, chúng tôi lắng nghe, thấu hiểu và thiết kế từng trải nghiệm để phù hợp với làn da, nhu cầu và nhịp sống của bạn.",
    explore: "Khám phá dịch vụ",
    learn: "Hiểu về chúng tôi",
    whyEyebrow: "Vì sao chọn chúng tôi",
    whyTitle: "Mọi chi tiết đều có lý do.",
    servicesEyebrow: "Dịch vụ của chúng tôi",
    servicesTitle: "Để chúng tôi giúp bạn tỏa sáng theo cách của chính mình.",
    servicesText: "Năm nhóm dịch vụ được sắp xếp rõ ràng, giúp bạn dễ dàng tìm đúng trải nghiệm cho làn da, diện mạo và nhịp sống của mình.",
    categories: { all: "Tất cả", care: "Chăm sóc da", shape: "Mi & Mày", relax: "Da đầu & thư giãn", smooth: "Triệt lông & Tẩy lông" },
    suitable: "Phù hợp với",
    choose: "Khám phá dịch vụ",
    experienceEyebrow: "Trải nghiệm dành cho bạn",
    experienceTitle: "Hiện đại trong kỹ thuật, mềm mại trong từng chạm.",
    resultEyebrow: "Kết quả khách hàng",
    resultTitle: "Chạm đến phiên bản đẹp nhất của bạn.",
    resultNote: "Kết quả thực tế phụ thuộc vào tình trạng và liệu trình riêng của từng khách hàng.",
    testimonialEyebrow: "Cảm nhận khách hàng",
    testimonialTitle: "Điều khách hàng nhớ sau một buổi hẹn cùng chúng tôi.",
    bannerTitle: "Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi trên hành trình làm đẹp của chúng mình.",
    bannerText: "Chúng tôi cam kết sẽ mang đến những điều tốt nhất cho khách hàng của mình.\nTừng thay đổi nhỏ của bạn không chỉ là niềm hạnh phúc mà còn là động lực để chúng tôi cố gắng mỗi ngày.",
    contactNow: "Hãy liên hệ ngay",
    modalTitle: "Đặt lịch cùng chúng tôi",
    modalText: "Để lại thông tin, chúng tôi sẽ liên hệ tư vấn và xác nhận thời gian phù hợp.",
    name: "Họ và tên", phone: "Số điện thoại", service: "Dịch vụ quan tâm", date: "Ngày mong muốn", submit: "Gửi yêu cầu", close: "Đóng", chooseService: "Chọn dịch vụ", received: "Chúng tôi đã nhận yêu cầu", thanks: "Cảm ơn bạn. Chúng tôi sẽ sớm liên hệ để lắng nghe và xác nhận lịch phù hợp.", done: "Hoàn tất", menu: "Mở menu",
    sending: "Đang gửi...", bookingError: "Chưa thể gửi yêu cầu. Vui lòng thử lại sau ít phút.",
  },
  en: {
    announcement: "Let us awaken the beauty within you.",
    book: "Book a consultation",
    nav: ["About us", "Services", "Experience", "Results", "Reviews"],
    heroEyebrow: "SHINE AS YOU ARE",
    heroTitle: "Effective Skin Solutions.",
    heroText: "Because everyone has a beauty of their own. Here, we listen, understand and shape every experience around your skin, your needs and the rhythm of your life.",
    explore: "Explore services", learn: "Discover us",
    whyEyebrow: "Why choose us", whyTitle: "Every detail has a purpose.",
    servicesEyebrow: "Our services", servicesTitle: "Five care worlds. One place to feel like yourself.", servicesText: "Five service groups arranged clearly, so every local and international guest can understand the experience before booking.",
    categories: { all: "All", care: "Skin", shape: "Brow & Lash", relax: "Scalp & Relaxation", smooth: "Hair Removal & Waxing" },
    suitable: "Best suited for", choose: "Choose this service",
    experienceEyebrow: "Your experience", experienceTitle: "Modern in technique, gentle in every touch.",
    resultEyebrow: "Client results", resultTitle: "Become the most beautiful version of yourself.", resultNote: "Individual results vary according to your starting point and personal care plan.",
    testimonialEyebrow: "Client notes", testimonialTitle: "What guests remember after time with us.",
    bannerTitle: "Thank you for trusting us to be part of your beauty journey.", bannerText: "We are committed to bringing the very best to every guest.\nEvery small change in you is not only our happiness, but also the motivation that keeps us growing each day.", contactNow: "Contact us now",
    modalTitle: "Book with us", modalText: "Leave your details and we will contact you for a personal consultation.",
    name: "Full name", phone: "Phone number", service: "Service of interest", date: "Preferred date", submit: "Send request", close: "Close", chooseService: "Choose a service", received: "Request received", thanks: "Thank you. We will contact you shortly to listen and confirm a suitable time.", done: "Done", menu: "Open menu",
    sending: "Sending...", bookingError: "We could not send your request. Please try again in a few minutes.",
  },
} as const;

const serviceGroupLabels = {
  vi: {
    skin: "Chăm sóc da",
    scalp: "Chăm sóc da đầu & Thư giãn",
    body: "Chăm sóc cơ thể",
    "brow-lash": "Mi & chân mày",
    waxing: "Tẩy lông",
    "hair-removal": "Triệt lông",
  },
  en: {
    skin: "Skin",
    scalp: "Head Spa",
    body: "Body",
    "brow-lash": "Brow & Lash",
    waxing: "Waxing",
    "hair-removal": "Hair Removal",
  },
} as const;

export function HatoHome({ content, initialLang = "vi" }: { content: HomeContent; initialLang?: Lang }) {
  const { services, serviceDetails, highlights, results, testimonials, journalArticles } = content;
  const [lang] = useState<Lang>(initialLang);
  const [category, setCategory] = useState<Category>("all");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [reviewOffset, setReviewOffset] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceQuery, setServiceQuery] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [bookingServiceId, setBookingServiceId] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const serviceDialogRef = useRef<HTMLElement>(null);
  const t = copy[lang];
  const selectedService = services.find((service) => service.id === selectedServiceId);
  const selectedServiceDetail = selectedService ? serviceDetails[selectedService.id] : undefined;
  const minimumBookingDate = useMinimumBookingDate();
  const normalizedQuery = serviceQuery.trim().toLocaleLowerCase(lang === "vi" ? "vi" : "en");
  const filteredServices = services.filter((service) => {
    const matchesCategory = category === "all" || service.category === category;
    const searchableText = `${service[lang].title} ${service[lang].summary} ${service[lang].description}`.toLocaleLowerCase(lang === "vi" ? "vi" : "en");
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
  const navItems = lang === "vi"
    ? [["/ve-hato-beauty/", "Về chúng tôi"], ["/dich-vu/", "Dịch vụ"], ["/kien-thuc/", "Kiến thức"], ["#results", "Kết quả"], ["/lien-he/", "Liên hệ"]]
    : [["/en/about/", "About"], ["/en/services/", "Services"], ["/en/journal/", "Journal"], ["#results", "Results"], ["/en/contact/", "Contact"]];
  useEffect(() => {
    document.body.style.overflow = bookingOpen || Boolean(selectedService) ? "hidden" : "";
    if (bookingOpen) window.requestAnimationFrame(() => dialogRef.current?.focus());
    if (selectedService) window.requestAnimationFrame(() => serviceDialogRef.current?.focus());
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (bookingOpen) setBookingOpen(false);
      else if (selectedService) setSelectedServiceId(null);
    };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [bookingOpen, selectedService]);

  useEffect(() => {
    const timer = window.setInterval(() => setReviewOffset((current) => (current + 4) % testimonials.length), 5200);
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  function openBooking(serviceId?: unknown) {
    setBookingServiceId(typeof serviceId === "string" ? serviceId : "");
    setSubmitted(false);
    setBookingError("");
    setBookingOpen(true);
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          date: formData.get("date"),
          locale: lang,
        }),
      });

      if (!response.ok) {
        setBookingError(await getBookingErrorMessage(response, lang));
        return;
      }
      form.reset();
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setBookingError(t.bookingError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <div className="announcement"><p>{brandText(t.announcement)}</p></div>

      <header className="site-header">
        <a className="brand" href={lang === "vi" ? "/" : "/en/"} aria-label="hato Beauty"><Image src={mediaUrl("/brand/hato-logo-transparent-v3.png")} alt="hato Beauty" width={1016} height={638} priority unoptimized /></a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}>
          {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <form className="nav-search" role="search" onSubmit={(event) => { event.preventDefault(); setMenuOpen(false); document.querySelector("#services")?.scrollIntoView(); }}>
            <label><span>{lang === "vi" ? "Tìm kiếm" : "Search"}</span><input value={serviceQuery} onChange={(event) => setServiceQuery(event.target.value)} aria-label={lang === "vi" ? "Tìm kiếm dịch vụ" : "Search services"} /><button type="submit" aria-label={lang === "vi" ? "Tìm kiếm" : "Search"}>⌕</button></label>
          </form>
        </nav>
        <div className="header-tools">
          <div className="language-switch"><Link className={lang === "vi" ? "active" : ""} href="/" hrefLang="vi-VN">VI</Link><span>/</span><Link className={lang === "en" ? "active" : ""} href="/en/" hrefLang="en">EN</Link></div>
          <Link className="header-booking-link" href={lang === "vi" ? "/dat-lich/" : "/en/book/"}>{t.book}<span>↗</span></Link>
          <button className="menu-button" aria-label={t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-label={lang === "vi" ? "Chuỗi trải nghiệm chăm sóc tại hato Beauty" : "A sequence of care experiences at hato Beauty"}>
          {[
            [mediaUrl("/video/hero-head-spa.mp4"), "Gội đầu dưỡng sinh", "Head spa"],
            [mediaUrl("/video/hero-hair-removal.mp4"), "Triệt lông", "Hair removal"],
            [mediaUrl("/video/hero-brow-warm.mp4"), "Uốn mi & định hình mày", "Lash & brow"],
            [mediaUrl("/video/hero-care-beige-clinic.mp4"), "Chăm sóc da", "Facial care"],
          ].map((scene, index) => <video className={`hero-video hero-video-${index + 1}`} autoPlay loop muted playsInline preload={index === 0 ? "metadata" : "none"} poster={index === 0 ? mediaUrl("/images/service-hair-v2.webp") : undefined} aria-hidden="true" key={scene[0]}><source src={scene[0]} type="video/mp4" /></video>)}
        </div>
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-lead">{lang === "vi" ? "Hiệu quả đến từ sự thấu hiểu: công nghệ phù hợp, chuyên môn cẩn trọng và một lộ trình được thiết kế theo nhu cầu thật của bạn." : "Results begin with understanding: considered technology, careful expertise and a plan shaped around what you truly need."}</p>
          <div className="hero-actions"><a className="button primary" href={lang === "vi" ? "/dich-vu/" : "/en/services/"}>{t.explore}<span>↗</span></a><a className="text-link" href={lang === "vi" ? "/dat-lich/" : "/en/book/"}>{t.book}<span>↗</span></a></div>
          <div className="hero-proof"><span>05</span><p>{lang === "vi" ? "nhóm dịch vụ chăm sóc" : "care service groups"}</p><span>VI · EN</span><p>{lang === "vi" ? "tư vấn rõ ràng, dễ tiếp cận" : "clear, accessible guidance"}</p></div>
        </div>
      </section>

      <div className="service-ribbon" aria-label={lang === "vi" ? "Năm nhóm dịch vụ" : "Five service groups"}><div>{(["skin", "brow-lash", "scalp", "hair-removal", "waxing", "skin"] as const).map((id, index) => <Link className="ribbon-item" href={id === "waxing" ? (lang === "vi" ? "/dich-vu/" : "/en/services/") : servicePath(seoServices.find(service => service.id === id) ?? seoServices[0], lang)} key={`${id}-${index}`}><span>{serviceGroupLabels[lang][id]}</span><i>✦</i></Link>)}</div></div>

      <section className="why section" id="about">
        <div className="section-heading"><p className="eyebrow">{t.whyEyebrow}</p><h2>{t.whyTitle}</h2><div className="section-heading-side"><p>{lang === "vi" ? "Chúng tôi xây dựng trải nghiệm làm đẹp từ những điều cụ thể: công nghệ phù hợp, không gian dễ chịu, dịch vụ minh bạch và đội ngũ có chuyên môn." : "We build every beauty experience around concrete values: suitable technology, a calming space, clear services and a capable team."}</p><Link className="section-route-link" href={lang === "vi" ? "/ve-hato-beauty/" : "/en/about/"}>{lang === "vi" ? "Về hato Beauty" : "About hato Beauty"}<span>↗</span></Link></div></div>
        <div className="feature-slider" id="experience">
          <Link className="feature-stage" href={lang === "vi" ? "/ve-hato-beauty/" : "/en/about/"} key={highlights[highlightIndex].number}>
            <div className="feature-image"><Image src={highlights[highlightIndex].image} alt={highlights[highlightIndex][lang][0]} fill sizes="(max-width: 760px) 100vw, 58vw" unoptimized /></div>
            <article className="feature-copy"><span>{highlights[highlightIndex].number} / 04</span><h3>{highlights[highlightIndex][lang][0]}</h3><p>{brandText(highlights[highlightIndex][lang][1])}</p></article>
          </Link>
          <div className="feature-controls">
            <div>{highlights.map((item, index) => <button key={item.number} className={highlightIndex === index ? "active" : ""} onClick={() => setHighlightIndex(index)} aria-label={`${lang === "vi" ? "Xem" : "View"} ${item[lang][0]}`}><span>{item.number}</span>{item[lang][0]}</button>)}</div>
            <div className="feature-arrows"><button onClick={() => setHighlightIndex((highlightIndex + highlights.length - 1) % highlights.length)} aria-label={lang === "vi" ? "Slide trước" : "Previous slide"}>←</button><button onClick={() => setHighlightIndex((highlightIndex + 1) % highlights.length)} aria-label={lang === "vi" ? "Slide sau" : "Next slide"}>→</button></div>
          </div>
        </div>
      </section>

      <section className="services-section section" id="services">
        <div className="services-intro"><div><p className="eyebrow">{brandText(t.servicesEyebrow)}</p><h2>{t.servicesTitle}</h2></div><div className="services-intro-side"><p>{t.servicesText}</p><Link className="section-route-link" href={lang === "vi" ? "/dich-vu/" : "/en/services/"}>{lang === "vi" ? "Xem tất cả dịch vụ" : "View all services"}<span>↗</span></Link></div></div>
        <div className="service-filters" role="group" aria-label={t.servicesEyebrow}>{(Object.keys(t.categories) as Category[]).map((key) => <button key={key} className={category === key ? "active" : ""} onClick={() => setCategory(key)}>{t.categories[key]}</button>)}</div>
        {serviceQuery && <p className="search-status">{lang === "vi" ? `Kết quả cho “${serviceQuery}”` : `Results for “${serviceQuery}”`} <button onClick={() => setServiceQuery("")}>{lang === "vi" ? "Xóa tìm kiếm" : "Clear search"}</button></p>}
        <div className="service-grid">{filteredServices.map((service) => <button type="button" className={`service-card service-card-${service.id}`} onClick={() => setSelectedServiceId(service.id)} aria-haspopup="dialog" key={service.id}>
          <div className="service-photo"><Image src={service.image} alt={service[lang].title} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized /><span>{service.number}</span></div>
          <div className="service-body">{service.id === "skin" && <span className="skin-signature">{lang === "vi" ? "Dịch vụ chủ đạo" : "Signature care"}</span>}<p className="service-summary">{serviceGroupLabels[lang][service.id as keyof typeof serviceGroupLabels.vi]}</p><h3>{service[lang].title}</h3><p className="service-description">{service[lang].description}</p><div className="service-suitable"><strong>{t.suitable}</strong><p>{service[lang].suitable}</p></div><span className="service-discover">{t.choose}<span>↗</span></span></div>
        </button>)}{filteredServices.length === 0 && <p className="service-empty">{lang === "vi" ? "Chưa tìm thấy dịch vụ phù hợp. Hãy thử một từ khóa khác." : "No matching service yet. Try another keyword."}</p>}</div>
      </section>

      <section className="knowledge section" id="knowledge">
        <span className="knowledge-orbit" aria-hidden="true" />
        <div className="knowledge-heading"><div><p className="eyebrow">{lang === "vi" ? "Góc kiến thức · 04 bài nổi bật" : "The journal · 04 featured notes"}</p><h2>{lang === "vi" ? "Hiểu đúng để mỗi lựa chọn chăm sóc đều nhẹ nhàng hơn." : "A little knowledge makes every care choice feel easier."}</h2></div><p>{lang === "vi" ? "Bốn bài nổi bật trên trang chủ và thư viện đầy đủ cho năm nhóm dịch vụ — dễ đọc, dễ áp dụng cho cả khách Việt Nam và quốc tế." : "Four featured reads here, with a complete library covering all five care groups for Vietnamese and international guests."}</p></div>
        <div className="knowledge-grid">
          {journalArticles.slice(0, 4).map((item, index) => <article className="knowledge-card" key={item.number}><Link href={journalPath(seoServices[index] ?? seoServices[0], lang)}><div className="knowledge-image"><Image src={item.image} alt={item[lang].title} fill sizes="(max-width: 900px) 100vw, 25vw" unoptimized /></div><div className="knowledge-body"><div className="knowledge-meta"><span>{item.number}</span><small>{item[lang].readingTime}</small></div><h3>{item[lang].title}</h3><span className="knowledge-arrow" aria-hidden="true">↗</span></div></Link></article>)}
        </div>
        <p className="knowledge-more"><Link className="button primary" href={lang === "vi" ? "/kien-thuc/" : "/en/journal/"}>{lang === "vi" ? "Xem tất cả bài viết" : "View all articles"}<span>↗</span></Link></p>
      </section>

      <section className="results section" id="results">
        <div className="results-head"><div><p className="eyebrow">{t.resultEyebrow}</p><h2>{t.resultTitle}</h2></div><p>{t.resultNote}</p></div>
        <div className="result-grid">{results.map((result, index) => <Link href={servicePath(seoServices[[0, 3, 2][index]] ?? seoServices[0], lang)} key={result.vi[0]}><div className="result-image"><Image src={result.image} alt={result[lang][0]} fill sizes="(max-width: 720px) 100vw, 33vw" unoptimized /><div className="comparison-labels"><span>{lang === "vi" ? "Trước" : "Before"}</span><span>{lang === "vi" ? "Sau" : "After"}</span></div></div><div className="result-copy"><h3>{result[lang][0]}</h3><p>{result[lang][1]}</p><span className="result-link-label">{lang === "vi" ? "Xem dịch vụ" : "View service"} ↗</span></div></Link>)}</div>
      </section>

      <section className="testimonials section" id="testimonials">
        <div className="testimonial-heading"><div><p className="eyebrow">{lang === "vi" ? "Khách Việt Nam & quốc tế" : "Vietnamese & international guests"}</p><h2>{lang === "vi" ? "Những điều khách hàng nhớ về hato Beauty." : "What guests remember about hato Beauty."}</h2></div><div className="review-heading-side"><p>{lang === "vi" ? "Những chia sẻ chân thành từ khách Việt Nam và bạn bè quốc tế về không gian, đội ngũ và toàn bộ trải nghiệm tại hato." : "Honest notes from Vietnamese and international guests about the space, the team and the complete hato experience."}</p><div className="review-controls"><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá trước" : "Previous review group"}>←</button><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá tiếp theo" : "Next review group"}>→</button></div></div></div>
        <div className="review-grid" aria-live="polite">
          {Array.from({ length: 4 }, (_, column) => testimonials[(reviewOffset + column) % testimonials.length]).map((review, index) => <article className={`review-card review-card-${index + 1}`} key={`${reviewOffset}-${review.initials}`}><div className="review-top"><span>0{((reviewOffset + index) % testimonials.length) + 1}</span><b>“</b></div><blockquote>{review.quote[lang]}</blockquote><footer><strong>{review.initials}</strong><div><b>{review.name[lang]}</b><small>{lang === "vi" ? "Khách hàng hato Beauty" : "hato Beauty guest"}</small></div></footer></article>)}
        </div>
        <div className="review-pagination" aria-label={lang === "vi" ? "Nhóm đánh giá" : "Review group"}><span>{reviewOffset === 0 ? "01 — 04" : "05 — 08"}<small>/ 08</small></span><div><button className={reviewOffset === 0 ? "active" : ""} onClick={() => setReviewOffset(0)} aria-label={lang === "vi" ? "Xem đánh giá 1 đến 4" : "View reviews 1 to 4"} /><button className={reviewOffset === 4 ? "active" : ""} onClick={() => setReviewOffset(4)} aria-label={lang === "vi" ? "Xem đánh giá 5 đến 8" : "View reviews 5 to 8"} /></div></div>
      </section>

      <section className="booking-banner" id="contact"><div className="banner-orbit" /><article><div className="banner-note"><span className="banner-note-brand"><b>hato</b><em>Beauty</em></span><span className="banner-note-line" aria-hidden="true" /><span className="banner-note-mark" aria-hidden="true"><i>✦</i></span><span className="banner-note-line" aria-hidden="true" /><span className="banner-note-tag"><small>{lang === "vi" ? "TỎA SÁNG THEO CÁCH CỦA BẠN" : "SHINE AS YOU ARE"}</small></span></div><h2>{t.bannerTitle}</h2><p>{brandText(t.bannerText)}</p><button className="button light" onClick={openBooking}><span>{lang === "vi" ? "Nhận tư vấn riêng" : "Request personal guidance"}</span><b>↗</b></button></article></section>

      <footer className="site-footer">
        <span className="footer-halo footer-halo-one" aria-hidden="true" /><span className="footer-halo footer-halo-two" aria-hidden="true" />
        <div className="footer-intro"><p>{lang === "vi" ? "hato Beauty · Không gian làm đẹp" : "hato Beauty · Beauty Studio"}</p><h2>{lang === "vi" ? "Hẹn gặp bạn trong một ngày gần nhất." : "We hope to see you very soon."}</h2></div>
        <div className="footer-brand"><Image src={mediaUrl("/brand/hato-logo-transparent-v3.png")} alt="hato Beauty" width={1016} height={638} unoptimized /></div>
        <div className="footer-links"><h3>{lang === "vi" ? "Khám phá" : "Discover"}</h3>{navItems.slice(0, 4).map(([href, label], index) => <a href={href} key={href}><span>0{index + 1}</span>{label}</a>)}</div>
        <div className="footer-contact"><h3>{lang === "vi" ? "Hẹn cùng chúng tôi" : "Plan your visit"}</h3><p>{lang === "vi" ? "Thời gian và địa điểm được xác nhận trực tiếp cùng lịch hẹn." : "Time and location are confirmed directly with your appointment."}</p><button onClick={openBooking}>{t.book}<span>↗</span></button></div>
        <div className="footer-bottom"><span>© 2026 hato Beauty</span><div><a href="#top">{lang === "vi" ? "Về đầu trang" : "Back to top"} ↑</a><a href={lang === "vi" ? "/chinh-sach-bien-tap/" : "/en/editorial-policy/"}>{lang === "vi" ? "Biên tập" : "Editorial"}</a><a href={lang === "vi" ? "/chinh-sach-bao-mat/" : "/en/privacy/"}>{lang === "vi" ? "Bảo mật" : "Privacy"}</a></div></div>
      </footer>

      <button className="floating-book" onClick={openBooking} aria-label={t.book}>↗<span>{t.book}</span></button>

      {selectedService && selectedServiceDetail && <div className="modal-backdrop service-detail-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelectedServiceId(null)}>
        <section className="service-detail-modal" ref={serviceDialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="service-detail-title">
          <button className="modal-close" onClick={() => setSelectedServiceId(null)} aria-label={t.close}>×</button>
          <div className="service-detail-image"><Image src={selectedService.image} alt={selectedService[lang].title} fill sizes="(max-width: 760px) 100vw, 42vw" unoptimized /><span>{selectedService.number}</span></div>
          <div className="service-detail-copy">
            <p className="eyebrow">{lang === "vi" ? "Chi tiết dịch vụ" : "Service details"}</p>
            <h2 id="service-detail-title">{selectedService[lang].title}</h2>
            <p className="service-detail-lead">{selectedService[lang].description}</p>
            {selectedServiceDetail.groups && <div className={`service-option-groups ${selectedService.id === "skin" ? "service-option-groups-featured" : ""}`}>
              {selectedServiceDetail.groups.map((group, index) => <section className="service-option-group" key={group.viTitle}>
                <div className="service-option-group-image"><Image src={group.image} alt={lang === "vi" ? group.viTitle : group.enTitle} fill sizes="(max-width: 760px) 100vw, 300px" /></div>
                <div className="service-option-group-heading"><span>0{index + 1}</span><h3>{lang === "vi" ? group.viTitle : group.enTitle}</h3></div>
                <ul>{group[lang].map((option) => <li key={option}><span>↗</span>{option}</li>)}</ul>
              </section>)}
            </div>}
            {selectedServiceDetail.options && <div className="service-options">
              <h3>{lang === "vi" ? "Dịch vụ trong nhóm" : "Services in this group"}</h3>
              <ul>{selectedServiceDetail.options[lang].map((option) => <li key={option}><span>↗</span>{option}</li>)}</ul>
            </div>}
            <dl className="service-facts">
              <div><dt>{lang === "vi" ? "Kết quả hướng đến" : "Intended result"}</dt><dd>{selectedServiceDetail.result?.[lang] ?? selectedService[lang].suitable}</dd></div>
              <div><dt>{lang === "vi" ? "Thời lượng" : "Duration"}</dt><dd>{selectedServiceDetail.duration}</dd></div>
              <div><dt>{lang === "vi" ? "Gợi ý liệu trình" : "Suggested plan"}</dt><dd>{selectedServiceDetail.plan}</dd></div>
            </dl>
            <div className="service-steps"><h3>{lang === "vi" ? "Trải nghiệm gồm" : "What to expect"}</h3><ol>{selectedServiceDetail[lang].map((step) => <li key={step}><span>✓</span>{step}</li>)}</ol></div>
            <button className="button primary" onClick={() => { const serviceId = selectedService.id; setSelectedServiceId(null); openBooking(serviceId); }}>{lang === "vi" ? "Đặt lịch dịch vụ này" : "Book this service"}<span>↗</span></button>
          </div>
        </section>
      </div>}

      {bookingOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setBookingOpen(false)}>
        <section className="booking-modal" ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label={t.close}>×</button>
          {submitted ? <div className="success" role="status"><span>✓</span><p className="eyebrow">{brandText(t.received)}</p><h2>{brandText(t.modalTitle)}</h2><p>{brandText(t.thanks)}</p><button className="button primary" onClick={() => setBookingOpen(false)}>{t.done}</button></div> : <><p className="eyebrow">{lang === "vi" ? "TỎA SÁNG THEO CÁCH CỦA BẠN" : "SHINE AS YOU ARE"}</p><h2 id="booking-title">{brandText(t.modalTitle)}</h2><p>{brandText(t.modalText)}</p><form onSubmit={submitBooking}><label>{t.name}<input name="name" autoComplete="name" minLength={2} maxLength={120} required /></label><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={8} maxLength={30} pattern={BOOKING_PHONE_PATTERN} title={lang === "vi" ? "Nhập số điện thoại gồm 8–15 chữ số." : "Enter a phone number containing 8–15 digits."} required /></label><label>{t.service}<select name="service" defaultValue={bookingServiceId} required><option value="" disabled>{t.chooseService}</option>{services.map((service) => <option value={service.id} key={service.id}>{service[lang].title}</option>)}</select></label><label>{t.date}<input name="date" type="date" min={minimumBookingDate} required /></label>{bookingError && <p className="booking-error" role="alert">{bookingError}</p>}<button className="button primary" type="submit" disabled={isSubmitting}>{isSubmitting ? t.sending : t.submit}<span>↗</span></button></form></>}
        </section>
      </div>}
    </main>
  );
}
