"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";

import type { Category, HomeContent, Lang } from "./content";

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
    heroEyebrow: "SHINE AS YOU ARE",
    heroTitle: "Effective & Personalized Skin Solutions.",
    heroText: "Bởi mỗi người đều có một vẻ đẹp riêng. Tại đây, chúng tôi lắng nghe, thấu hiểu và thiết kế từng trải nghiệm để phù hợp với làn da, nhu cầu và nhịp sống của bạn.",
    explore: "Khám phá dịch vụ",
    learn: "Hiểu về chúng tôi",
    whyEyebrow: "Vì sao chọn chúng tôi",
    whyTitle: "Mọi chi tiết đều có lý do.",
    servicesEyebrow: "Dịch vụ của chúng tôi",
    servicesTitle: "Để chúng tôi giúp bạn tỏa sáng theo cách của chính mình.",
    servicesText: "Năm nhóm chăm sóc được sắp xếp như năm không gian riêng, giúp bạn dễ dàng tìm đúng trải nghiệm cho làn da, cơ thể và nhịp sống của mình.",
    categories: { all: "Tất cả", care: "Skin", relax: "Head Spa", body: "Body", shape: "Brow & Lash", smooth: "Hair Removal" },
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
    heroTitle: "Effective & Personalized Skin Solutions.",
    heroText: "Because everyone has a beauty of their own. Here, we listen, understand and shape every experience around your skin, your needs and the rhythm of your life.",
    explore: "Explore services", learn: "Discover us",
    whyEyebrow: "Why choose us", whyTitle: "Every detail has a purpose.",
    servicesEyebrow: "Our services", servicesTitle: "Five care worlds. One place to feel like yourself.", servicesText: "Five care worlds arranged as a living gallery, so every local and international guest can understand the experience before booking.",
    categories: { all: "All", care: "Skin", relax: "Head Spa", body: "Body", shape: "Brow & Lash", smooth: "Hair Removal" },
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

export function HatoHome({ content }: { content: HomeContent }) {
  const { services, serviceDetails, highlights, results, testimonials, journalArticles } = content;
  const [lang, setLang] = useState<Lang>("vi");
  const [category, setCategory] = useState<Category>("all");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [reviewOffset, setReviewOffset] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceQuery, setServiceQuery] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [bookingServiceId, setBookingServiceId] = useState("");
  const [offerOpen, setOfferOpen] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const serviceDialogRef = useRef<HTMLElement>(null);
  const t = copy[lang];
  const selectedService = services.find((service) => service.id === selectedServiceId);
  const normalizedQuery = serviceQuery.trim().toLocaleLowerCase(lang === "vi" ? "vi" : "en");
  const filteredServices = services.filter((service) => {
    const matchesCategory = category === "all" || service.category === category;
    const searchableText = `${service[lang].title} ${service[lang].summary} ${service[lang].description}`.toLocaleLowerCase(lang === "vi" ? "vi" : "en");
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
  const navItems = lang === "vi"
    ? [["#about", "Về chúng tôi"], ["#knowledge", "Kiến thức"], ["#services", "Dịch vụ"], ["#results", "Kết quả"], ["#testimonials", "Đánh giá"], ["#contact", "Liên hệ"]]
    : [["#about", "About"], ["#knowledge", "Journal"], ["#services", "Services"], ["#results", "Results"], ["#testimonials", "Reviews"], ["#contact", "Contact"]];

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    if (!offerOpen) return;
    const timer = window.setTimeout(() => setOfferOpen(false), 1800);
    return () => window.clearTimeout(timer);
  }, [offerOpen]);
  useEffect(() => {
    document.body.style.overflow = bookingOpen || offerOpen || Boolean(selectedService) ? "hidden" : "";
    if (bookingOpen) window.requestAnimationFrame(() => dialogRef.current?.focus());
    if (selectedService) window.requestAnimationFrame(() => serviceDialogRef.current?.focus());
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (bookingOpen) setBookingOpen(false);
      else if (selectedService) setSelectedServiceId(null);
      else setOfferOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [bookingOpen, offerOpen, selectedService]);

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

      if (!response.ok) throw new Error(`Booking request failed with ${response.status}`);
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
        <a className="brand" href="#top" aria-label="hato Beauty"><Image src="/brand/hato-logo-transparent-v3.png" alt="hato Beauty" width={1016} height={638} priority unoptimized /></a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}>
          {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <form className="nav-search" role="search" onSubmit={(event) => { event.preventDefault(); setMenuOpen(false); document.querySelector("#services")?.scrollIntoView(); }}>
            <label><span>{lang === "vi" ? "Tìm kiếm" : "Search"}</span><input value={serviceQuery} onChange={(event) => setServiceQuery(event.target.value)} aria-label={lang === "vi" ? "Tìm kiếm dịch vụ" : "Search services"} /><button type="submit" aria-label={lang === "vi" ? "Tìm kiếm" : "Search"}>⌕</button></label>
          </form>
        </nav>
        <div className="header-tools">
          <form className="header-search" role="search" onSubmit={(event) => { event.preventDefault(); document.querySelector("#services")?.scrollIntoView(); }}>
            <label><span>{lang === "vi" ? "Tìm kiếm" : "Search"}</span><input value={serviceQuery} onChange={(event) => setServiceQuery(event.target.value)} aria-label={lang === "vi" ? "Tìm kiếm dịch vụ" : "Search services"} /><button type="submit" aria-label={lang === "vi" ? "Tìm kiếm" : "Search"}>⌕</button></label>
          </form>
          <div className="language-switch"><button className={lang === "vi" ? "active" : ""} onClick={() => setLang("vi")}>VI</button><span>/</span><button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button></div>
          <button className="menu-button" aria-label={t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-label={lang === "vi" ? "Chuỗi trải nghiệm chăm sóc tại hato Beauty" : "A sequence of care experiences at hato Beauty"}>
          {[
            ["/video/hero-head-spa.mp4", "Gội đầu dưỡng sinh", "Head spa"],
            ["/video/hero-hair-removal.mp4", "Triệt lông", "Hair removal"],
            ["/video/hero-brow-warm.mp4", "Uốn mi & định hình mày", "Lash & brow"],
            ["/video/hero-care-beige-clinic.mp4", "Chăm sóc da", "Facial care"],
          ].map((scene, index) => <video className={`hero-video hero-video-${index + 1}`} autoPlay loop muted playsInline preload="auto" aria-hidden="true" key={scene[0]}><source src={scene[0]} type="video/mp4" /></video>)}
        </div>
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">SHINE AS YOU ARE</p>
          <h1>Effective &amp; Personalized Skin Solutions.</h1>
          <p className="hero-lead">{lang === "vi" ? "Hiệu quả đến từ sự thấu hiểu: công nghệ phù hợp, chuyên môn cẩn trọng và một lộ trình được thiết kế theo nhu cầu thật của bạn." : "Results begin with understanding: considered technology, careful expertise and a plan shaped around what you truly need."}</p>
          <div className="hero-actions"><a className="button primary" href="#services">{t.explore}<span>↗</span></a><a className="text-link" href="#about">{brandText(t.learn)}<span>↓</span></a></div>
        </div>
      </section>

      <div className="service-ribbon" aria-label={lang === "vi" ? "Năm nhóm dịch vụ" : "Five service groups"}><div><span>Skin</span><i>✦</i><span>Head Spa</span><i>✦</i><span>Body</span><i>✦</i><span>Brow &amp; Lash</span><i>✦</i><span>Hair Removal</span><i>✦</i><span>Skin</span><i>✦</i><span>Head Spa</span><i>✦</i></div></div>

      <section className="why section" id="about">
        <div className="section-heading"><p className="eyebrow">{t.whyEyebrow}</p><h2>{t.whyTitle}</h2><p>{lang === "vi" ? "Chúng tôi xây dựng trải nghiệm làm đẹp từ những điều cụ thể: công nghệ phù hợp, không gian dễ chịu, dịch vụ minh bạch và đội ngũ có chuyên môn." : "We build every beauty experience around concrete values: suitable technology, a calming space, clear services and a capable team."}</p></div>
        <div className="feature-slider" id="experience">
          <div className="feature-stage" key={highlights[highlightIndex].number}>
            <div className="feature-image"><Image src={highlights[highlightIndex].image} alt={highlights[highlightIndex][lang][0]} fill sizes="(max-width: 760px) 100vw, 58vw" unoptimized /></div>
            <article className="feature-copy"><span>{highlights[highlightIndex].number} / 04</span><h3>{highlights[highlightIndex][lang][0]}</h3><p>{brandText(highlights[highlightIndex][lang][1])}</p></article>
          </div>
          <div className="feature-controls">
            <div>{highlights.map((item, index) => <button key={item.number} className={highlightIndex === index ? "active" : ""} onClick={() => setHighlightIndex(index)} aria-label={`${lang === "vi" ? "Xem" : "View"} ${item[lang][0]}`}><span>{item.number}</span>{item[lang][0]}</button>)}</div>
            <div className="feature-arrows"><button onClick={() => setHighlightIndex((highlightIndex + highlights.length - 1) % highlights.length)} aria-label={lang === "vi" ? "Slide trước" : "Previous slide"}>←</button><button onClick={() => setHighlightIndex((highlightIndex + 1) % highlights.length)} aria-label={lang === "vi" ? "Slide sau" : "Next slide"}>→</button></div>
          </div>
        </div>
      </section>

      <section className="services-section section" id="services">
        <div className="services-intro"><div><p className="eyebrow">{brandText(t.servicesEyebrow)}</p><h2>{t.servicesTitle}</h2></div><p>{t.servicesText}</p></div>
        <div className="service-filters" role="group" aria-label={t.servicesEyebrow}>{(Object.keys(t.categories) as Category[]).map((key) => <button key={key} className={category === key ? "active" : ""} onClick={() => setCategory(key)}>{t.categories[key]}</button>)}</div>
        {serviceQuery && <p className="search-status">{lang === "vi" ? `Kết quả cho “${serviceQuery}”` : `Results for “${serviceQuery}”`} <button onClick={() => setServiceQuery("")}>{lang === "vi" ? "Xóa tìm kiếm" : "Clear search"}</button></p>}
        <div className="service-grid">{filteredServices.map((service) => <article className="service-card" key={service.id}>
          <div className="service-photo"><Image src={service.image} alt={service[lang].title} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized /><span>{service.number}</span></div>
          <div className="service-body"><p className="service-summary">{service[lang].summary}</p><h3>{service[lang].title}</h3><p className="service-description">{service[lang].description}</p><div className="service-suitable"><strong>{t.suitable}</strong><p>{service[lang].suitable}</p></div><button onClick={() => setSelectedServiceId(service.id)}>{t.choose}<span>↗</span></button></div>
        </article>)}{filteredServices.length === 0 && <p className="service-empty">{lang === "vi" ? "Chưa tìm thấy dịch vụ phù hợp. Hãy thử một từ khóa khác." : "No matching service yet. Try another keyword."}</p>}</div>
      </section>

      <section className="knowledge section" id="knowledge">
        <span className="knowledge-orbit" aria-hidden="true" />
        <div className="knowledge-heading"><div><p className="eyebrow">{lang === "vi" ? "Góc kiến thức · 05 chuyên mục" : "The journal · 05 care notes"}</p><h2>{lang === "vi" ? "Hiểu đúng để mỗi lựa chọn chăm sóc đều nhẹ nhàng hơn." : "A little knowledge makes every care choice feel easier."}</h2></div><p>{lang === "vi" ? "Những ghi chú thực tế dành cho Skin, Head Spa, Body, Brow & Lash và Hair Removal — dễ đọc, dễ áp dụng cho cả khách Việt Nam và quốc tế." : "Practical, bilingual notes for Skin, Head Spa, Body, Brow & Lash and Hair Removal — clear for both Vietnamese and international guests."}</p></div>
        <div className="knowledge-grid">
          {journalArticles.map((item) => <article className="knowledge-card" key={item.number}><div className="knowledge-image"><Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div><div className="knowledge-body"><div className="knowledge-meta"><span>{item.number}</span><small>{item[lang].readingTime}</small></div><h3>{item[lang].title}</h3><span className="knowledge-arrow" aria-hidden="true">↗</span></div></article>)}
        </div>
      </section>

      <section className="results section" id="results">
        <div className="results-head"><div><p className="eyebrow">{t.resultEyebrow}</p><h2>{t.resultTitle}</h2></div><p>{t.resultNote}</p></div>
        <div className="result-grid">{results.map((result) => <article key={result.vi[0]}><div className="result-image"><Image src={result.image} alt={result[lang][0]} fill sizes="(max-width: 720px) 100vw, 33vw" unoptimized /><div className="comparison-labels"><span>{lang === "vi" ? "Trước" : "Before"}</span><span>{lang === "vi" ? "Sau" : "After"}</span></div></div><div className="result-copy"><h3>{result[lang][0]}</h3><p>{result[lang][1]}</p></div></article>)}</div>
      </section>

      <section className="testimonials section" id="testimonials">
        <div className="testimonial-heading"><div><p className="eyebrow">{lang === "vi" ? "Khách Việt Nam & quốc tế" : "Vietnamese & international guests"}</p><h2>{lang === "vi" ? "Những điều khách hàng nhớ về Hato Beauty." : "What guests remember about Hato Beauty."}</h2></div><div className="review-heading-side"><p>{lang === "vi" ? "Những chia sẻ chân thành từ khách Việt Nam và bạn bè quốc tế về không gian, đội ngũ và toàn bộ trải nghiệm tại Hato." : "Honest notes from Vietnamese and international guests about the space, the team and the complete Hato experience."}</p><div className="review-controls"><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá trước" : "Previous review group"}>←</button><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá tiếp theo" : "Next review group"}>→</button></div></div></div>
        <div className="review-grid" aria-live="polite">
          {Array.from({ length: 4 }, (_, column) => testimonials[(reviewOffset + column) % testimonials.length]).map((review, index) => <article className={`review-card review-card-${index + 1}`} key={`${reviewOffset}-${review.initials}`}><div className="review-top"><span>0{((reviewOffset + index) % testimonials.length) + 1}</span><b>“</b></div><blockquote>{review.quote[lang]}</blockquote><footer><strong>{review.initials}</strong><div><b>{review.name[lang]}</b><small>{lang === "vi" ? "Khách hàng Hato Beauty" : "Hato Beauty guest"}</small></div></footer></article>)}
        </div>
        <div className="review-pagination" aria-label={lang === "vi" ? "Nhóm đánh giá" : "Review group"}><span>{reviewOffset === 0 ? "01 — 04" : "05 — 08"}<small>/ 08</small></span><div><button className={reviewOffset === 0 ? "active" : ""} onClick={() => setReviewOffset(0)} aria-label={lang === "vi" ? "Xem đánh giá 1 đến 4" : "View reviews 1 to 4"} /><button className={reviewOffset === 4 ? "active" : ""} onClick={() => setReviewOffset(4)} aria-label={lang === "vi" ? "Xem đánh giá 5 đến 8" : "View reviews 5 to 8"} /></div></div>
      </section>

      <section className="booking-banner" id="contact"><div className="banner-orbit" /><article><div className="banner-note"><span className="banner-note-brand"><b>hato</b></span><span className="banner-note-mark" aria-hidden="true"><i>✦</i></span><span className="banner-note-tag"><small>SHINE AS YOU ARE</small></span></div><h2>{t.bannerTitle}</h2><p>{brandText(t.bannerText)}</p><button className="button light" onClick={openBooking}><span>{lang === "vi" ? "Nhận tư vấn riêng" : "Request personal guidance"}</span><b>↗</b></button></article></section>

      <footer className="site-footer">
        <span className="footer-halo footer-halo-one" aria-hidden="true" /><span className="footer-halo footer-halo-two" aria-hidden="true" />
        <div className="footer-intro"><p>{lang === "vi" ? "Hato Beauty · Beauty Studio" : "Hato Beauty · Beauty Studio"}</p><h2>{lang === "vi" ? "Hẹn gặp bạn trong một ngày gần nhất." : "We hope to see you very soon."}</h2></div>
        <div className="footer-brand"><Image src="/brand/hato-logo-transparent-v3.png" alt="hato Beauty" width={1016} height={638} unoptimized /></div>
        <div className="footer-links"><h3>{lang === "vi" ? "Khám phá" : "Discover"}</h3>{navItems.slice(0, 4).map(([href, label], index) => <a href={href} key={href}><span>0{index + 1}</span>{label}</a>)}</div>
        <div className="footer-contact"><h3>{lang === "vi" ? "Ghé thăm chúng tôi" : "Visit us"}</h3><p>{lang === "vi" ? "Thứ Hai – Chủ Nhật" : "Monday – Sunday"}<br /><strong>09:00 – 20:00</strong></p><button onClick={openBooking}>{t.book}<span>↗</span></button></div>
        <div className="footer-bottom"><span>© 2026 hato Beauty</span><div><a href="#top">{lang === "vi" ? "Về đầu trang" : "Back to top"} ↑</a><span>Instagram</span><span>Facebook</span></div></div>
      </footer>

      <button className="floating-book" onClick={openBooking} aria-label={t.book}>↗<span>{t.book}</span></button>

      {offerOpen && <div className="offer-backdrop" role="presentation">
        <section className="offer-modal" role="dialog" aria-modal="true" aria-labelledby="offer-title">
          <button className="offer-close" onClick={() => setOfferOpen(false)} aria-label={t.close}>×</button>
          <div className="offer-visual"><span className="offer-star" aria-hidden="true">✦</span><strong>SHINE<br />AS YOU ARE</strong><span>{lang === "vi" ? "Chăm sóc theo cách của bạn" : "Care, in your own way"}</span></div>
          <div className="offer-copy"><p className="eyebrow">SHINE AS YOU ARE</p><h2 id="offer-title">{lang === "vi" ? "Giảm giá 10% ngay hôm nay" : "Enjoy 10% off today"}</h2><p>{lang === "vi" ? "Kích vào đường link đăng ký bên dưới để nhận ưu đãi dành riêng cho lần trải nghiệm tiếp theo của bạn." : "Use the registration link below to receive your offer for your next experience."}</p><a href="#contact" className="offer-link" onClick={(event) => { event.preventDefault(); setOfferOpen(false); openBooking(); }}><span>{lang === "vi" ? "Đăng ký nhận ưu đãi" : "Register for the offer"}</span><b>↗</b></a><button className="offer-later" onClick={() => setOfferOpen(false)}>{lang === "vi" ? "Tiếp tục xem website" : "Continue to website"}</button></div>
          <span className="offer-timer" aria-hidden="true" />
        </section>
      </div>}

      {selectedService && <div className="modal-backdrop service-detail-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelectedServiceId(null)}>
        <section className="service-detail-modal" ref={serviceDialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="service-detail-title">
          <button className="modal-close" onClick={() => setSelectedServiceId(null)} aria-label={t.close}>×</button>
          <div className="service-detail-image"><Image src={selectedService.image} alt={selectedService[lang].title} fill sizes="(max-width: 760px) 100vw, 42vw" unoptimized /><span>{selectedService.number}</span></div>
          <div className="service-detail-copy">
            <p className="eyebrow">{lang === "vi" ? "Chi tiết dịch vụ" : "Service details"}</p>
            <h2 id="service-detail-title">{selectedService[lang].title}</h2>
            <p className="service-detail-lead">{selectedService[lang].description}</p>
            <dl className="service-facts">
              <div><dt>{lang === "vi" ? "Giá tham khảo" : "Guide price"}</dt><dd>{serviceDetails[selectedService.id as keyof typeof serviceDetails].price}</dd></div>
              <div><dt>{lang === "vi" ? "Thời lượng" : "Duration"}</dt><dd>{serviceDetails[selectedService.id as keyof typeof serviceDetails].duration}</dd></div>
              <div><dt>{lang === "vi" ? "Gợi ý liệu trình" : "Suggested plan"}</dt><dd>{serviceDetails[selectedService.id as keyof typeof serviceDetails].plan}</dd></div>
            </dl>
            <div className="service-steps"><h3>{lang === "vi" ? "Trải nghiệm gồm" : "What to expect"}</h3><ol>{serviceDetails[selectedService.id as keyof typeof serviceDetails][lang].map((step) => <li key={step}><span>✓</span>{step}</li>)}</ol></div>
            <p className="price-note">{lang === "vi" ? "Khoảng giá mang tính tham khảo và có thể thay đổi theo vùng chăm sóc, tình trạng thực tế, sản phẩm và liệu trình được tư vấn. Hato sẽ xác nhận giá trước khi thực hiện." : "Prices are indicative and may vary by treatment area, condition, products and the recommended plan. Hato will confirm the price before treatment."}</p>
            <button className="button primary" onClick={() => { const serviceId = selectedService.id; setSelectedServiceId(null); openBooking(serviceId); }}>{lang === "vi" ? "Đặt lịch dịch vụ này" : "Book this service"}<span>↗</span></button>
          </div>
        </section>
      </div>}

      {bookingOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setBookingOpen(false)}>
        <section className="booking-modal" ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label={t.close}>×</button>
          {submitted ? <div className="success" role="status"><span>✓</span><p className="eyebrow">{brandText(t.received)}</p><h2>{brandText(t.modalTitle)}</h2><p>{brandText(t.thanks)}</p><button className="button primary" onClick={() => setBookingOpen(false)}>{t.done}</button></div> : <><p className="eyebrow">SHINE AS YOU ARE</p><h2 id="booking-title">{brandText(t.modalTitle)}</h2><p>{brandText(t.modalText)}</p><form onSubmit={submitBooking}><label>{t.name}<input name="name" autoComplete="name" maxLength={120} required /></label><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={8} maxLength={30} required /></label><label>{t.service}<select name="service" defaultValue={bookingServiceId} required><option value="" disabled>{t.chooseService}</option>{services.map((service) => <option value={service.id} key={service.id}>{service[lang].title}</option>)}</select></label><label>{t.date}<input name="date" type="date" required /></label>{bookingError && <p className="booking-error" role="alert">{bookingError}</p>}<button className="button primary" type="submit" disabled={isSubmitting}>{isSubmitting ? t.sending : t.submit}<span>↗</span></button></form></>}
        </section>
      </div>}
    </main>
  );
}
