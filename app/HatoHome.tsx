"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";

import type { Category, HomeContent, Lang } from "./content";

function brandText(text?: string): ReactNode {
  if (!text) return null;
  return text.split(/(hato)/gi).map((part, index) =>
    /^hato$/i.test(part) ? <span className="hato-word" key={`${part}-${index}`}>hato</span> : part,
  );
}

function SocialIcon({ name }: { name: "facebook" | "instagram" | "tiktok" | "whatsapp" }) {
  if (name === "facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 22v-8h3l.5-3H14V9.2C14 8.3 14.4 8 15.4 8H18V5.2A17 17 0 0 0 15.7 5C13.4 5 11 6.4 11 9.4V11H8v3h3v8h3Z" /></svg>;
  if (name === "instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.6" cy="6.6" r="1" className="fill-dot" /></svg>;
  if (name === "tiktok") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.2a4.2 4.2 0 1 1-3.3-4.1v3.1a1.4 1.4 0 1 0 .5 1V4h2.8c.4 1.9 1.6 3.2 3.8 3.6v2.9A7.3 7.3 0 0 1 14 9.1" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a8.5 8.5 0 0 0-7.4 12.7L3.5 20l4.4-1.1A8.5 8.5 0 1 0 12 3Z" /><path d="M9 8.2c.3-.2.7-.1.9.2l1 1.6c.2.3.2.6 0 .8l-.7.8c.6 1.2 1.5 2.1 2.7 2.7l.8-.7c.3-.2.6-.2.8 0l1.7 1c.3.2.4.6.2.9-.4.8-1.2 1.3-2.1 1.3-3.8-.3-6.8-3.3-7.1-7.1 0-.9.6-1.7 1.3-2.1Z" /></svg>;
}

const copy = {
  vi: {
    book: "Đặt lịch tư vấn",
    nav: ["Về chúng tôi", "Dịch vụ", "Trải nghiệm", "Kết quả", "Cảm nhận"],
    heroEyebrow: "Beauty, made personal",
    heroTitle: "Hiểu da. Chăm đúng nhu cầu.",
    heroText: "Soi da, tư vấn rõ và thiết kế liệu trình phù hợp với làn da, thời gian cùng ngân sách của bạn.",
    explore: "Khám phá dịch vụ",
    learn: "Hiểu về chúng tôi",
    whyEyebrow: "Vì sao chọn chúng tôi",
    whyTitle: "Hiểu làn da trước, chăm đúng điều da cần.",
    servicesEyebrow: "Dịch vụ của chúng tôi",
    servicesTitle: "Chọn đúng dịch vụ cho điều làn da cần.",
    servicesText: "Mục tiêu, thời lượng và chi phí đều được trình bày rõ trước khi bạn đặt lịch.",
    categories: { all: "Tất cả", care: "Chăm sóc da", relax: "Thư giãn", shape: "Mi & mày", smooth: "Triệt lông & Waxing", body: "Chăm sóc body" },
    suitable: "Phù hợp với",
    choose: "Khám phá dịch vụ",
    experienceEyebrow: "Trải nghiệm dành cho bạn",
    experienceTitle: "Kỹ thuật hiện đại. Trải nghiệm nhẹ nhàng.",
    resultEyebrow: "Kết quả khách hàng",
    resultTitle: "Vẻ đẹp rõ hơn, vẫn là bạn.",
    resultNote: "Kết quả thay đổi theo tình trạng da và liệu trình cá nhân.",
    testimonialEyebrow: "Cảm nhận khách hàng",
    testimonialTitle: "Một buổi hẹn, một cảm giác được chăm sóc.",
    newsletterEyebrow: "Ưu đãi dành riêng cho bạn",
    newsletterTitle: "Nhận ưu đãi mới mỗi tháng.",
    newsletterText: "Gợi ý chăm sóc theo mùa và cập nhật hữu ích từ Hato Beauty.",
    newsletterEmail: "Email của bạn",
    newsletterSubmit: "Đăng ký",
    newsletterStatus: "Email đã sẵn sàng trong ứng dụng thư của bạn.",
    contactNow: "Hãy liên hệ ngay",
    modalTitle: "Đặt lịch cùng chúng tôi",
    modalText: "Trao đổi trực tiếp để được tư vấn dịch vụ và xác nhận thời gian phù hợp.",
    name: "Họ và tên", phone: "Số điện thoại", service: "Dịch vụ quan tâm", date: "Ngày mong muốn", submit: "Gửi yêu cầu", close: "Đóng", chooseService: "Chọn dịch vụ", received: "Chúng tôi đã nhận yêu cầu", thanks: "Cảm ơn bạn. Chúng tôi sẽ sớm liên hệ để lắng nghe và xác nhận lịch phù hợp.", done: "Hoàn tất", menu: "Mở menu",
    zalo: "Nhắn Hato qua Zalo", call: "Gọi 0703 214 868",
  },
  en: {
    book: "Book a consultation",
    nav: ["About us", "Services", "Experience", "Results", "Reviews"],
    heroEyebrow: "Beauty, made personal",
    heroTitle: "Know your skin. Care with purpose.",
    heroText: "A clear skin consultation and a plan shaped around your needs, time and budget.",
    explore: "Explore services", learn: "Discover us",
    whyEyebrow: "Why choose us", whyTitle: "Every detail has a purpose.",
    servicesEyebrow: "Our services", servicesTitle: "Choose what your skin truly needs.", servicesText: "Goals, timing and guide prices are clear before you book.",
    categories: { all: "All", care: "Facial care", relax: "Relaxation", shape: "Lash & brow", smooth: "Hair removal & Waxing", body: "Body care" },
    suitable: "Best suited for", choose: "Choose this service",
    experienceEyebrow: "Your experience", experienceTitle: "Modern in technique, gentle in every touch.",
    resultEyebrow: "Client results", resultTitle: "A visible difference, still naturally you.", resultNote: "Results vary with your starting point and personal care plan.",
    testimonialEyebrow: "Client notes", testimonialTitle: "One visit, a lasting sense of care.",
    newsletterEyebrow: "A little extra for you", newsletterTitle: "Receive our monthly offers.", newsletterText: "Seasonal care tips and useful updates from Hato Beauty.", newsletterEmail: "Your email", newsletterSubmit: "Subscribe", newsletterStatus: "Your email is ready in your mail app.", contactNow: "Contact us now",
    modalTitle: "Book with us", modalText: "Leave your details and we will contact you for a personal consultation.",
    name: "Full name", phone: "Phone number", service: "Service of interest", date: "Preferred date", submit: "Send request", close: "Close", chooseService: "Choose a service", received: "Request received", thanks: "Thank you. We will contact you shortly to listen and confirm a suitable time.", done: "Done", menu: "Open menu",
    zalo: "Message Hato on Zalo", call: "Call 0703 214 868",
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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState("");
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
  }, []);

  function openBooking(serviceId?: unknown) {
    setBookingServiceId(typeof serviceId === "string" ? serviceId : "");
    setBookingOpen(true);
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("newsletter-email");
    if (typeof email !== "string") return;
    const subject = lang === "vi" ? "Đăng ký nhận ưu đãi Hato Beauty" : "Hato Beauty offers subscription";
    const body = lang === "vi" ? `Tôi muốn nhận ưu đãi tại email: ${email}` : `I would like to receive offers at: ${email}`;
    setNewsletterStatus(t.newsletterStatus);
    window.location.href = `mailto:hatobeautydanang@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
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
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-lead">{t.heroText}</p>
          <div className="hero-actions"><a className="button primary" href="#services">{t.explore}<span>↗</span></a><a className="text-link" href="#about">{brandText(t.learn)}<span>↓</span></a></div>
        </div>
      </section>

      <section className="why section" id="about">
        <div className="section-heading"><p className="eyebrow">{t.whyEyebrow}</p><h2>{t.whyTitle}</h2><p>{lang === "vi" ? "Soi da, thống nhất mục tiêu và chi phí trước khi thực hiện. Sau buổi hẹn, bạn nhận hướng dẫn chăm sóc tại nhà cùng lịch theo dõi phù hợp." : "We assess your skin, agree on goals and costs, then leave you with clear home care and a suitable follow-up plan."}</p></div>
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
        <div className="knowledge-heading"><div><p className="eyebrow">{lang === "vi" ? "Góc kiến thức" : "The journal"}</p><h2>{lang === "vi" ? "Hiểu đúng để chăm nhẹ nhàng hơn." : "Understand more. Care with ease."}</h2></div><p>{lang === "vi" ? "Kiến thức ngắn, dễ áp dụng cho làn da và nhịp sống mỗi ngày." : "Short, practical notes for your skin and everyday rhythm."}</p></div>
        <div className="knowledge-grid">
          {journalArticles.map((item) => <article className="knowledge-card" key={item.number}><div className="knowledge-image"><Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div><div className="knowledge-body"><div className="knowledge-meta"><span>{item.number}</span><small>{item[lang].readingTime}</small></div><h3>{item[lang].title}</h3><span className="knowledge-arrow" aria-hidden="true">↗</span></div></article>)}
        </div>
      </section>

      <section className="results section" id="results">
        <div className="results-head"><div><p className="eyebrow">{t.resultEyebrow}</p><h2>{t.resultTitle}</h2></div><p>{t.resultNote}</p></div>
        <div className="result-grid">{results.map((result) => <article key={result.vi[0]}><div className="result-image"><Image src={result.image} alt={result[lang][0]} fill sizes="(max-width: 720px) 100vw, 33vw" unoptimized /><div className="comparison-labels"><span>{lang === "vi" ? "Trước" : "Before"}</span><span>{lang === "vi" ? "Sau" : "After"}</span></div></div><div className="result-copy"><h3>{result[lang][0]}</h3><p>{result[lang][1]}</p></div></article>)}</div>
      </section>

      <section className="testimonials section" id="testimonials">
        <div className="testimonial-heading"><div><p className="eyebrow">{t.testimonialEyebrow}</p><h2>{t.testimonialTitle}</h2></div><div className="review-heading-side"><p>{lang === "vi" ? "Chia sẻ thật về không gian, đội ngũ và trải nghiệm tại Hato Beauty." : "Honest notes about the space, team and experience at Hato Beauty."}</p><div className="review-controls"><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá trước" : "Previous review group"}>←</button><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá tiếp theo" : "Next review group"}>→</button></div></div></div>
        <div className="review-grid" aria-live="polite">
          {Array.from({ length: 4 }, (_, column) => testimonials[(reviewOffset + column) % testimonials.length]).map((review, index) => <article className={`review-card review-card-${index + 1}`} key={`${reviewOffset}-${review.initials}`}><div className="review-top"><span>0{((reviewOffset + index) % testimonials.length) + 1}</span><b>“</b></div><blockquote>{review.quote[lang]}</blockquote><footer><strong>{review.initials}</strong><div><b>{review.name[lang]}</b><small>{lang === "vi" ? "Khách hàng Hato Beauty" : "Hato Beauty guest"}</small></div></footer></article>)}
        </div>
        <div className="review-pagination" aria-label={lang === "vi" ? "Nhóm đánh giá" : "Review group"}><span>{reviewOffset === 0 ? "01 — 04" : "05 — 08"}<small>/ 08</small></span><div><button className={reviewOffset === 0 ? "active" : ""} onClick={() => setReviewOffset(0)} aria-label={lang === "vi" ? "Xem đánh giá 1 đến 4" : "View reviews 1 to 4"} /><button className={reviewOffset === 4 ? "active" : ""} onClick={() => setReviewOffset(4)} aria-label={lang === "vi" ? "Xem đánh giá 5 đến 8" : "View reviews 5 to 8"} /></div></div>
      </section>

      <footer className="site-footer" id="contact">
        <span className="footer-halo footer-halo-one" aria-hidden="true" /><span className="footer-halo footer-halo-two" aria-hidden="true" />
        <section className="newsletter" aria-labelledby="newsletter-title"><div><p className="eyebrow">{t.newsletterEyebrow}</p><h2 id="newsletter-title">{t.newsletterTitle}</h2><p>{t.newsletterText}</p></div><form onSubmit={submitNewsletter}><label htmlFor="newsletter-email">{t.newsletterEmail}</label><div><input id="newsletter-email" name="newsletter-email" type="email" placeholder={t.newsletterEmail} autoComplete="email" required /><button type="submit">{t.newsletterSubmit}<span>↗</span></button></div><small aria-live="polite">{newsletterStatus}</small></form></section>
        <div className="footer-intro"><p>Hato Beauty · Beauty Studio</p><h2>{lang === "vi" ? "Hẹn gặp bạn tại Hato Beauty." : "We look forward to welcoming you."}</h2></div>
        <div className="footer-brand"><Image src="/brand/hato-logo-transparent-v3.png" alt="hato Beauty" width={1016} height={638} unoptimized /><div className="footer-socials" aria-label={lang === "vi" ? "Mạng xã hội" : "Social media"}><a href="https://www.facebook.com/hatobeautyy" target="_blank" rel="noreferrer" aria-label="Facebook Hato Beauty"><SocialIcon name="facebook" /></a><a href="https://www.instagram.com/hatobeauty/" target="_blank" rel="noreferrer" aria-label="Instagram Hato Beauty"><SocialIcon name="instagram" /></a><a href="https://www.tiktok.com/@hatobeauty" target="_blank" rel="noreferrer" aria-label="TikTok Hato Beauty"><SocialIcon name="tiktok" /></a><a href="https://wa.me/84703214868" target="_blank" rel="noreferrer" aria-label="WhatsApp Hato Beauty"><SocialIcon name="whatsapp" /></a></div></div>
        <div className="footer-links"><h3>{lang === "vi" ? "Khám phá" : "Discover"}</h3>{navItems.slice(0, 4).map(([href, label], index) => <a href={href} key={href}><span>0{index + 1}</span>{label}</a>)}</div>
        <div className="footer-contact"><h3>{lang === "vi" ? "Ghé thăm chúng tôi" : "Visit us"}</h3><p>{lang === "vi" ? "Hằng ngày" : "Every day"}<br /><strong>08:30 – 19:30</strong></p><button onClick={openBooking}>{t.book}<span>↗</span></button></div>
        <div className="footer-bottom"><span>© 2026 hato Beauty</span><div><a href="#top">{lang === "vi" ? "Về đầu trang" : "Back to top"} ↑</a></div></div>
      </footer>

      <button className="floating-book" onClick={openBooking} aria-label={t.book}><span>{t.book}</span>↗</button>

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
          <p className="eyebrow">SHINE AS YOU ARE</p><h2 id="booking-title">{brandText(t.modalTitle)}</h2><p>{brandText(t.modalText)}</p>{bookingServiceId && <p className="booking-service"><span>{lang === "vi" ? "Dịch vụ quan tâm" : "Service"}</span><strong>{services.find((service) => service.id === bookingServiceId)?.[lang].title}</strong></p>}<div className="booking-actions"><a className="button primary" href="https://zalo.me/0703214868" target="_blank" rel="noreferrer">{t.zalo}<span>↗</span></a><a className="text-link" href="tel:+84703214868">{t.call}<span>→</span></a></div>
        </section>
      </div>}
    </main>
  );
}
