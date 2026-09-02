"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";

import type { Category, HomeContent, Lang } from "./content";
import { getBookingErrorMessage } from "./booking-errors";
import { BOOKING_PHONE_PATTERN } from "./booking-validation";
import { ContactDetails } from "./ContactDetails";
import { IconArrow, IconChevron } from "./icons";
import { journalPath, mediaUrl, seoServices, servicePath } from "./seo-data";
import { SiteHeader } from "./SiteHeader";
import { useMinimumBookingDate } from "./use-minimum-booking-date";

function isTechHighlight(item: { image: string; vi: [string, string]; en: [string, string] }) {
  return /equipment|technology|thiết bị|công nghệ/i.test(`${item.image} ${item.vi[0]} ${item.en[0]}`);
}

function brandText(text: string): ReactNode {
  return text.split(/(hato)/gi).map((part, index) =>
    /^hato$/i.test(part) ? <span className="hato-word" key={`${part}-${index}`}>hato</span> : part,
  );
}

const copy = {
  vi: {
    announcement: "Soi da khi đặt liệu trình · 08:30–19:30 · 127 Châu Thị Vĩnh Tế, Ngũ Hành Sơn",
    book: "Đặt lịch soi da",
    nav: ["Về Hato Beauty", "Dịch vụ", "Trải nghiệm", "Kết quả", "Cảm nhận"],
    heroEyebrow: "Hato Beauty · Đà Nẵng",
    heroTitle: "Tỏa sáng là chính bạn.",
    heroText: "Bắt đầu bằng bước soi da để hiểu làn da đang cần gì. Từ đó, Hato Beauty cùng bạn chọn dịch vụ và cách chăm sóc tại nhà phù hợp, nhẹ nhàng và dễ duy trì.",
    explore: "Khám phá dịch vụ",
    learn: "Hiểu về chúng tôi",
    whyEyebrow: "Vì sao Hato Beauty",
    whyTitle: "Hiểu làn da trước, chăm đúng điều da cần.",
    servicesEyebrow: "Năm nhóm dịch vụ",
    servicesTitle: "Chọn đúng nhóm trước khi đặt.",
    servicesText: "Da, mi mày, da đầu, triệt lông hoặc tẩy lông. Mỗi nhóm có thời lượng và giá từ–đến trên trang chi tiết.",
    categories: { all: "Tất cả", care: "Chăm sóc da", shape: "Mi & Mày", relax: "Da đầu & thư giãn", smooth: "Triệt lông & Tẩy lông" },
    suitable: "Phù hợp với",
    choose: "Xem chi tiết",
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
    announcement: "Skin check with treatment · 08:30–19:30 · 127 Chau Thi Vinh Te, Ngu Hanh Son",
    book: "Book a skin check",
    nav: ["About us", "Services", "Experience", "Results", "Reviews"],
    heroEyebrow: "Hato Beauty · Da Nang",
    heroTitle: "Shine as you are.",
    heroText: "Begin with a skin check to understand what your skin needs. Hato Beauty then helps you choose suitable services and a gentle, practical home-care routine.",
    explore: "Explore services", learn: "Discover us",
    whyEyebrow: "Why Hato Beauty", whyTitle: "Understand the skin first, then care for what it needs.",
    servicesEyebrow: "Five service groups", servicesTitle: "Pick the right group before you book.", servicesText: "Skin, brow and lash, scalp, hair removal or waxing. Time and a from–to price sit on each detail page.",
    categories: { all: "All", care: "Skin", shape: "Brow & Lash", relax: "Scalp & Relaxation", smooth: "Hair Removal & Waxing" },
    suitable: "Best suited for", choose: "View details",
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
    "brow-lash": "Mi & Mày",
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

const testimonialGuests = [
  { initials: "TH", name: "Thu Hà", country: { vi: "Việt Nam", en: "Vietnam" }, local: true },
  { initials: "EC", name: "Emily Carter", country: { vi: "Úc", en: "Australia" }, local: false },
  { initials: "NM", name: "Ngọc Mai", country: { vi: "Việt Nam", en: "Vietnam" }, local: true },
  { initials: "SL", name: "Sophie Laurent", country: { vi: "Pháp", en: "France" }, local: false },
  { initials: "YT", name: "Yuki Tanaka", country: { vi: "Nhật Bản", en: "Japan" }, local: false },
  { initials: "BA", name: "Bảo Anh", country: { vi: "Việt Nam", en: "Vietnam" }, local: true },
  { initials: "MP", name: "Min-ji Park", country: { vi: "Hàn Quốc", en: "South Korea" }, local: false },
  { initials: "ON", name: "Olivia Nguyen", country: { vi: "Singapore", en: "Singapore" }, local: false },
] as const;

const serviceCardCopy = {
  skin: {
    vi: { description: "Làm sạch, cấp ẩm, phục hồi theo da vừa soi.", suitable: "Da thiếu ẩm, xỉn, mụn nhẹ — không thay da liễu.", price: "Từ 450.000đ", duration: "60–90 phút" },
    en: { description: "Cleanse, hydrate and recover the skin we just checked.", suitable: "Dry, dull or mildly blemished skin — not a clinic substitute.", price: "From VND 450,000", duration: "60–90 min" },
  },
  "brow-lash": {
    vi: { description: "Uốn mi, nhuộm và tạo dáng mày theo xương mặt.", suitable: "Muốn mi cong, mày gọn, dễ makeup.", price: "Từ 250.000đ", duration: "45–90 phút" },
    en: { description: "Lift, tint and shape lashes and brows to the face.", suitable: "For a lift and a neater brow line.", price: "From VND 250,000", duration: "45–90 min" },
  },
  scalp: {
    vi: { description: "Gội sạch da đầu, massage đầu–vai–gáy.", suitable: "Mỏi vai, da đầu bết, cần một giờ nằm yên.", price: "Từ 180.000đ", duration: "45–75 phút" },
    en: { description: "Scalp cleanse with a head–shoulder massage.", suitable: "Tired shoulders, a heavy scalp, an hour to lie still.", price: "From VND 180,000", duration: "45–75 min" },
  },
  body: {
    vi: { description: "Tẩy bề mặt và dưỡng ẩm da cơ thể.", suitable: "Da khô sau biển, sần, cần lớp kem khóa ẩm.", price: "Từ 350.000đ", duration: "60–90 phút" },
    en: { description: "Exfoliate and hydrate body skin.", suitable: "Dry after the beach, rough, in need of a cream seal.", price: "From VND 350,000", duration: "60–90 min" },
  },
  "hair-removal": {
    vi: { description: "Giảm lông theo vùng, nói số buổi thật.", suitable: "Nách, chân, mặt — kín đáo, không hứa vĩnh viễn.", price: "Từ 250.000đ/vùng", duration: "20–60 phút" },
    en: { description: "Area hair reduction with an honest session count.", suitable: "Underarms, legs, face — discreet, no forever claim.", price: "From VND 250,000 / area", duration: "20–60 min" },
  },
  waxing: {
    vi: { description: "Tẩy sáp từng vùng, làm dịu ngay sau.", suitable: "Mày, môi trên, một vùng cơ thể cần gọn trong buổi.", price: "Từ 120.000đ/vùng", duration: "20–50 phút" },
    en: { description: "Area waxing, soothed before you leave.", suitable: "Brows, upper lip, one body area that needs to be neat today.", price: "From VND 120,000 / area", duration: "20–50 min" },
  },
} as const;

export function HatoHome({ content, initialLang = "vi" }: { content: HomeContent; initialLang?: Lang }) {
  const { services, serviceDetails, highlights, results, testimonials, journalArticles } = content;
  const lang = initialLang;
  const [category, setCategory] = useState<Category>("all");
  const [highlightIndex, setHighlightIndex] = useState(() => {
    const firstCalm = highlights.findIndex((item) => !isTechHighlight(item));
    return firstCalm >= 0 ? firstCalm : 0;
  });
  const [reviewOffset, setReviewOffset] = useState(0);
  const [serviceQuery, setServiceQuery] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [bookingServiceId, setBookingServiceId] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [loadHeroSequence, setLoadHeroSequence] = useState(false);
  const [heroSequenceReady, setHeroSequenceReady] = useState(false);
  const heroReadyVideos = useRef(new Set<number>());
  const dialogRef = useRef<HTMLElement>(null);
  const serviceDialogRef = useRef<HTMLElement>(null);
  const t = copy[lang];
  const selectedService = services.find((service) => service.id === selectedServiceId);
  const selectedServiceDetail = selectedService ? serviceDetails[selectedService.id] : undefined;
  const minimumBookingDate = useMinimumBookingDate();
  const consultationHref = lang === "vi" ? "https://zalo.me/0703214868" : "https://wa.me/84703214868";
  const normalizedQuery = serviceQuery.trim().toLocaleLowerCase(lang === "vi" ? "vi" : "en");
  const filteredServices = services.filter((service) => {
    const matchesCategory = category === "all" || service.category === category;
    const searchableText = `${service[lang].title} ${service[lang].summary} ${service[lang].description}`.toLocaleLowerCase(lang === "vi" ? "vi" : "en");
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
  const navItems = lang === "vi"
    ? [["/dich-vu/", "Dịch vụ"], ["/san-pham/", "Sản phẩm"], ["/lo-trinh/", "Lộ trình"], ["/kien-thuc/", "Kiến thức"], ["/ve-hato-beauty/", "Về hato"]]
    : [["/en/services/", "Services"], ["/en/care-products/", "Products"], ["/en/care-plan/", "Care plan"], ["/en/journal/", "Journal"], ["/en/about/", "About"]];
  const ribbonGroups = ["skin", "brow-lash", "scalp", "hair-removal", "waxing"] as const;
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

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadHeroSequence(true), 12000);
    return () => window.clearTimeout(timer);
  }, []);

  function markHeroVideoReady(index: number) {
    if (index === 0) return;
    heroReadyVideos.current.add(index);
    if (heroReadyVideos.current.size === 3) setHeroSequenceReady(true);
  }

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

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = lang === "vi" ? "Đăng ký nhận ưu đãi hằng tháng" : "Monthly offer subscription";
    const body = lang === "vi" ? `Tôi đồng ý đăng ký nhận thông tin ưu đãi hằng tháng từ Hato Beauty qua email: ${newsletterEmail}` : `I agree to receive monthly Hato Beauty offers at: ${newsletterEmail}`;
    window.location.href = `mailto:hatobeautydanang@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNewsletterStatus("success");
  }

  return (
    <main className="home-page" id="main" lang={lang}>
      <a className="skip-link" href="#services">{lang === "vi" ? "Đến nội dung chính" : "Skip to content"}</a>
      <div className="announcement">
        <div className="announcement-track">
          <p>{t.announcement}</p>
          <p>{t.announcement}</p>
        </div>
      </div>

      <SiteHeader
        lang={lang}
        search={{
          value: serviceQuery,
          onChange: setServiceQuery,
          onSubmit: () => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }),
        }}
      />

      <section className="hero" id="top">
        <div className={`hero-media${heroSequenceReady ? " is-sequence-ready" : ""}`} aria-label={lang === "vi" ? "Chuỗi trải nghiệm chăm sóc tại Hato Beauty" : "A sequence of care experiences at Hato Beauty"}>
          {[
            [mediaUrl("/video/hero-head-spa.mp4"), "Gội đầu dưỡng sinh", "Head spa"],
            [mediaUrl("/video/hero-hair-removal.mp4"), "Triệt lông", "Hair removal"],
            [mediaUrl("/video/hero-brow-warm.mp4"), "Uốn mi & định hình mày", "Lash & brow"],
            [mediaUrl("/video/hero-care-beige-clinic.mp4"), "Chăm sóc da", "Facial care"],
          ].map((scene, index) => { const shouldLoad = index === 0 || loadHeroSequence; return <video className={`hero-video hero-video-${index + 1}`} autoPlay={shouldLoad} loop muted playsInline preload={index === 0 ? "auto" : "none"} poster={mediaUrl("/images/service-hair-v2.webp")} src={shouldLoad ? scene[0] : undefined} onCanPlay={() => markHeroVideoReady(index)} aria-hidden="true" key={scene[0]} />; })}
        </div>
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-lead">{t.heroText}</p>
          <div className="hero-actions">
            <a className="button primary" href={consultationHref} target="_blank" rel="noopener noreferrer">{t.book}<IconArrow /></a>
            <a className="button ghost" href={lang === "vi" ? "/dich-vu/" : "/en/services/"}>{t.explore}<IconArrow /></a>
          </div>
          <Link className="hero-trust" href={lang === "vi" ? "/lo-trinh/" : "/en/care-plan/"} aria-label={lang === "vi" ? "4,9 trên 5 từ hơn 5.000 khách hàng" : "4.9 out of 5 from more than 5,000 guests"}>
            <span className="hero-trust-avatars" aria-hidden="true">
              {[0, 1, 2].map((index) => <span className={`hero-trust-avatar hero-trust-avatar-${index + 1}`} key={index}><Image src="/images/guest-trust-avatars-v1.png" alt="" fill sizes="54px" unoptimized /></span>)}
            </span>
            <span className="hero-trust-copy"><strong><span aria-hidden="true">★★★★★</span> 4.9/5</strong><small>{lang === "vi" ? "5.000+ khách hàng" : "5,000+ guests"}</small></span>
          </Link>
        </div>
      </section>

      <div className="service-ribbon" aria-label={lang === "vi" ? "Năm nhóm dịch vụ" : "Five service groups"}><div className="service-ribbon-track">{[0, 1].flatMap((copy) => ribbonGroups.map((id) => <Link className="ribbon-item" href={id === "waxing" ? (lang === "vi" ? "/dich-vu/" : "/en/services/") : servicePath(seoServices.find(service => service.id === id) ?? seoServices[0], lang)} key={`${copy}-${id}`}><span>{serviceGroupLabels[lang][id]}</span><i aria-hidden="true">✦</i></Link>))}</div></div>

      <section className="why section" id="about">
        <div className="section-heading"><p className="eyebrow">{t.whyEyebrow}</p><h2>{t.whyTitle}</h2><div className="section-heading-side"><p>{lang === "vi" ? "Mỗi buổi chăm sóc tại Hato Beauty bắt đầu bằng lắng nghe và soi da để hiểu tình trạng hiện tại. Chúng tôi cùng bạn xác định mục tiêu, ngân sách và dịch vụ phù hợp trước khi thực hiện; sau đó hướng dẫn cách chăm sóc tại nhà và thời điểm nên soi lại. Hato Beauty là không gian chăm sóc thẩm mỹ, không thay thế thăm khám da liễu. Mở cửa hằng ngày 08:30–19:30 tại 127 Châu Thị Vĩnh Tế, Ngũ Hành Sơn." : "Every Hato Beauty visit begins with listening and a skin check. We agree on the goal, budget and suitable service before care, then guide your home routine and review timing. Hato Beauty provides cosmetic care and does not replace dermatology. Open daily 08:30–19:30 at 127 Chau Thi Vinh Te."}</p><Link className="section-route-link" href={lang === "vi" ? "/lo-trinh/" : "/en/care-plan/"}>{lang === "vi" ? "Xem lộ trình da" : "See the skin plan"}<IconArrow /></Link></div></div>
        <div className="feature-slider" id="experience">
          <Link className={`feature-stage${isTechHighlight(highlights[highlightIndex]) ? " feature-stage-tech" : ""}`} href={lang === "vi" ? "/ve-hato-beauty/" : "/en/about/"} key={highlights[highlightIndex].number}>
            <div className="feature-image"><Image src={highlights[highlightIndex].image} alt={highlights[highlightIndex][lang][0]} fill sizes="(max-width: 760px) 100vw, 58vw" /></div>
            <article className="feature-copy"><span>{highlights[highlightIndex].number} / 04</span><h3>{highlights[highlightIndex][lang][0]}</h3><p>{brandText(highlights[highlightIndex][lang][1])}</p></article>
          </Link>
          <div className="feature-controls">
            <div>{highlights.map((item, index) => <button key={item.number} className={highlightIndex === index ? "active" : ""} onClick={() => setHighlightIndex(index)} aria-label={`${lang === "vi" ? "Xem" : "View"} ${item[lang][0]}`}><span>{item.number}</span>{item[lang][0]}</button>)}</div>
            <div className="feature-arrows"><button onClick={() => setHighlightIndex((highlightIndex + highlights.length - 1) % highlights.length)} aria-label={lang === "vi" ? "Slide trước" : "Previous slide"}><IconChevron direction="left" /></button><button onClick={() => setHighlightIndex((highlightIndex + 1) % highlights.length)} aria-label={lang === "vi" ? "Slide sau" : "Next slide"}><IconChevron /></button></div>
          </div>
        </div>
      </section>

      <section className="services-section section" id="services">
        <div className="services-intro"><div><p className="eyebrow">{brandText(t.servicesEyebrow)}</p><h2>{t.servicesTitle}</h2></div><div className="services-intro-side"><p>{t.servicesText}</p><Link className="section-route-link" href={lang === "vi" ? "/dich-vu/" : "/en/services/"}>{lang === "vi" ? "Xem tất cả dịch vụ" : "View all services"}<IconArrow /></Link></div></div>
        <div className="service-filters" role="group" aria-label={t.servicesEyebrow}>{(Object.keys(t.categories) as Array<keyof typeof t.categories>).map((key) => <button key={key} className={category === key ? "active" : ""} onClick={() => setCategory(key)}>{t.categories[key]}</button>)}</div>
        {serviceQuery && <p className="search-status">{lang === "vi" ? `Kết quả cho “${serviceQuery}”` : `Results for “${serviceQuery}”`} <button onClick={() => setServiceQuery("")}>{lang === "vi" ? "Xóa tìm kiếm" : "Clear search"}</button></p>}
        <div className="service-grid">{filteredServices.map((service) => {
          const conciseCopy = serviceCardCopy[service.id as keyof typeof serviceCardCopy]?.[lang] ?? service[lang];
          return <button type="button" className={`service-card service-card-${service.id}`} onClick={() => setSelectedServiceId(service.id)} aria-haspopup="dialog" key={service.id}>
            <div className="service-photo"><Image src={service.image} alt={service[lang].title} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized /><span>{service.number}</span></div>
            <div className="service-body">{service.id === "skin" && <span className="skin-signature">{lang === "vi" ? "Dịch vụ chủ đạo" : "Signature care"}</span>}<p className="service-summary">{serviceGroupLabels[lang][service.id as keyof typeof serviceGroupLabels.vi]}</p><h3>{service[lang].title}</h3><p className="service-description">{conciseCopy.description}</p><div className="service-suitable"><strong>{t.suitable}</strong><p>{conciseCopy.suitable}</p></div>{"price" in conciseCopy && <p className="service-price-line"><strong>{conciseCopy.price}</strong><span>{conciseCopy.duration}</span></p>}<span className="service-discover">{t.choose}<IconArrow /></span></div>
          </button>;
        })}{filteredServices.length === 0 && <p className="service-empty">{lang === "vi" ? "Chưa tìm thấy dịch vụ phù hợp. Hãy thử một từ khóa khác." : "No matching service yet. Try another keyword."}</p>}</div>
      </section>

      {results.length > 0 ? <section className="results section" id="results">
        <div className="results-head">
          <div>
            <p className="eyebrow">{t.resultEyebrow}</p>
            <h2>{t.resultTitle}</h2>
          </div>
          <div className="section-heading-side">
            <p>{t.resultNote}</p>
            <Link className="section-route-link" href={lang === "vi" ? "/ket-qua/" : "/en/results/"}>{lang === "vi" ? "Xem tất cả kết quả" : "View all results"}<IconArrow /></Link>
          </div>
        </div>
        <div className="result-grid">
          {results.slice(0, 3).map((item) => (
            <Link href={lang === "vi" ? "/ket-qua/" : "/en/results/"} key={item.image}>
              <div className="result-image">
                <Image src={item.image} alt={item[lang][0]} fill sizes="(max-width: 720px) 80vw, 33vw" />
                <em>{item[lang][2]}</em>
              </div>
              <div className="result-copy">
                <h3>{item[lang][0]}</h3>
                <p>{item[lang][1]}</p>
                <span className="result-link-label">{lang === "vi" ? "Xem kết quả" : "View results"}<IconArrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </section> : null}

      <section className="knowledge section" id="knowledge">
        <span className="knowledge-orbit" aria-hidden="true" />
        <div className="knowledge-heading"><div><h2>{lang === "vi" ? "Hiểu đúng để mỗi lựa chọn chăm sóc đều nhẹ nhàng hơn." : "A little knowledge makes every care choice feel easier."}</h2></div><p>{lang === "vi" ? "Đây là nơi Hato Beauty chia sẻ kiến thức chăm sóc da, mi mày, da đầu và cơ thể — giúp bạn hiểu đúng, lựa chọn phù hợp và duy trì kết quả nhẹ nhàng tại nhà." : "This is where Hato Beauty shares care knowledge across skin, brow, lash, scalp and body, helping you make informed choices and maintain results at home."}</p></div>
        <div className="knowledge-grid">
          {journalArticles.slice(0, 4).map((item, index) => <article className="knowledge-card" key={item.number}><Link href={journalPath(seoServices[index] ?? seoServices[0], lang)}><div className="knowledge-image"><Image src={item.image} alt={item[lang].title} fill sizes="(max-width: 900px) 82vw, 50vw" /></div><div className="knowledge-body"><div className="knowledge-meta"><span>{item.number}</span><small>{item[lang].readingTime}</small></div><h3>{item[lang].title}</h3><span className="knowledge-arrow" aria-hidden="true"><IconArrow /></span></div></Link></article>)}
        </div>
        <p className="knowledge-more"><Link className="button primary" href={lang === "vi" ? "/kien-thuc/" : "/en/journal/"}>{lang === "vi" ? "Xem tất cả bài viết" : "View all articles"}<IconArrow /></Link></p>
      </section>

      <section className="testimonials section" id="testimonials">
        <div className="testimonial-heading"><div><h2>{lang === "vi" ? "Những điều khách hàng nhớ về Hato Beauty." : "What guests remember about Hato Beauty."}</h2></div><div className="review-heading-side"><p>{lang === "vi" ? "Những chia sẻ chân thành về không gian, đội ngũ và trải nghiệm chăm sóc tại Hato Beauty." : "Honest notes about the space, the team and the complete Hato Beauty experience."}</p><div className="review-controls"><button onClick={() => setReviewOffset((reviewOffset - 4 + testimonials.length) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá trước" : "Previous review group"}><IconChevron direction="left" /></button><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá tiếp theo" : "Next review group"}><IconChevron /></button></div></div></div>
        <div className="review-grid" aria-live="polite">
          {Array.from({ length: 4 }, (_, column) => testimonials[(reviewOffset + column) % testimonials.length]).map((review, index) => {
            const guestIndex = (reviewOffset + index) % testimonialGuests.length;
            const guest = testimonialGuests[guestIndex];
            const guestType = lang === "vi"
              ? (guest.local ? "Khách Việt Nam" : "Khách quốc tế")
              : (guest.local ? "Vietnamese guest" : "International guest");
            return <article className={`review-card review-card-${index + 1}`} aria-label={`${guest.name} · ${guest.country[lang]}`} key={`${reviewOffset}-${guest.name}`}><div className="review-top"><span>0{guestIndex + 1}</span><b>“</b></div><blockquote>{review.quote[lang]}</blockquote><footer><strong>{guest.initials}</strong><div><b>{guest.name}</b><small>{guestType} · {guest.country[lang]}</small></div></footer></article>;
          })}
        </div>
        <div className="review-pagination" aria-label={lang === "vi" ? "Nhóm đánh giá" : "Review group"}><span>{reviewOffset === 0 ? "01 — 04" : "05 — 08"}<small>/ 08</small></span><div><button className={reviewOffset === 0 ? "active" : ""} onClick={() => setReviewOffset(0)} aria-label={lang === "vi" ? "Xem đánh giá 1 đến 4" : "View reviews 1 to 4"} /><button className={reviewOffset === 4 ? "active" : ""} onClick={() => setReviewOffset(4)} aria-label={lang === "vi" ? "Xem đánh giá 5 đến 8" : "View reviews 5 to 8"} /></div></div>
      </section>

      <section className="newsletter-section" id="contact">
        <div><p className="eyebrow">{lang === "vi" ? "Ưu đãi dành riêng cho bạn" : "A thoughtful note for you"}</p><h2>{lang === "vi" ? "Nhận thông tin ưu đãi của Hato Beauty hằng tháng" : "Receive Hato Beauty offers each month"}</h2><p>{lang === "vi" ? "Ưu đãi mới, gợi ý chăm sóc theo mùa và những cập nhật nhẹ nhàng từ Hato Beauty." : "New offers, seasonal care ideas and thoughtful updates from Hato Beauty."}</p></div>
        <form onSubmit={submitNewsletter}>
          <label htmlFor={`newsletter-email-${lang}`}>{lang === "vi" ? "Email của bạn" : "Your email"}</label>
          <div><input id={`newsletter-email-${lang}`} type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder={lang === "vi" ? "Email của bạn" : "Your email"} value={newsletterEmail} onChange={(event) => { setNewsletterEmail(event.target.value); setNewsletterStatus("idle"); }} /><button type="submit" disabled={newsletterStatus === "sending"}>{newsletterStatus === "sending" ? (lang === "vi" ? "Đang gửi..." : "Sending...") : (lang === "vi" ? "Đăng ký" : "Subscribe")}<IconArrow /></button></div>
          <p className={`newsletter-message is-${newsletterStatus}`} aria-live="polite">{newsletterStatus === "success" ? (lang === "vi" ? "Ứng dụng email đã được mở để bạn xác nhận đăng ký." : "Your email app has opened so you can confirm.") : newsletterStatus === "error" ? (lang === "vi" ? "Chưa thể đăng ký lúc này. Vui lòng thử lại." : "Unable to subscribe right now. Please try again.") : (lang === "vi" ? "Bạn có thể hủy đăng ký bất kỳ lúc nào." : "You can unsubscribe at any time.")}</p>
        </form>
      </section>

      <footer className="site-footer">
        <span className="footer-halo footer-halo-one" aria-hidden="true" /><span className="footer-halo footer-halo-two" aria-hidden="true" />
        <div className="footer-intro"><p>{lang === "vi" ? "Hato Beauty · Không gian làm đẹp" : "Hato Beauty · Beauty Studio"}</p><h2>{lang === "vi" ? "Hẹn gặp bạn trong một ngày gần nhất." : "We hope to see you very soon."}</h2></div>
        <div className="footer-brand"><Image src={mediaUrl("/brand/hato-logo-transparent-v3.png")} alt="Hato Beauty" width={1016} height={638} /></div>
        <div className="footer-links"><h3>{lang === "vi" ? "Khám phá" : "Discover"}</h3>{navItems.slice(0, 4).map(([href, label], index) => <a href={href} key={href}><span>0{index + 1}</span>{label}</a>)}</div>
        <div className="footer-contact"><h3>{lang === "vi" ? "Hẹn cùng chúng tôi" : "Plan your visit"}</h3><ContactDetails lang={lang} compact /><a className="footer-consultation-link" href={consultationHref} target="_blank" rel="noopener noreferrer">{t.book}<IconArrow /></a></div>
        <div className="footer-bottom"><span>© 2026 Hato Beauty</span><div><a href="#top">{lang === "vi" ? "Về đầu trang" : "Back to top"} ↑</a><a href={lang === "vi" ? "/chinh-sach-bien-tap/" : "/en/editorial-policy/"}>{lang === "vi" ? "Biên tập" : "Editorial"}</a><a href={lang === "vi" ? "/chinh-sach-bao-mat/" : "/en/privacy/"}>{lang === "vi" ? "Bảo mật" : "Privacy"}</a></div></div>
      </footer>

      {selectedService && selectedServiceDetail && <div className="modal-backdrop service-detail-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelectedServiceId(null)}>
        <section className="service-detail-modal" ref={serviceDialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="service-detail-title">
          <button className="modal-close" onClick={() => setSelectedServiceId(null)} aria-label={t.close}>×</button>
          <div className="service-detail-image"><Image src={selectedService.image} alt={selectedService[lang].title} fill sizes="(max-width: 760px) 100vw, 42vw" /><span>{selectedService.number}</span></div>
          <div className="service-detail-copy">
            <p className="eyebrow">{lang === "vi" ? "Chi tiết dịch vụ" : "Service details"}</p>
            <h2 id="service-detail-title">{selectedService[lang].title}</h2>
            <p className="service-detail-lead">{selectedService[lang].description}</p>
            {selectedServiceDetail.groups && <div className={`service-option-groups ${selectedService.id === "skin" ? "service-option-groups-featured" : ""}`}>
              {selectedServiceDetail.groups.map((group, index) => <section className="service-option-group" key={group.viTitle}>
                <div className="service-option-group-image"><Image src={group.image} alt={lang === "vi" ? group.viTitle : group.enTitle} fill sizes="(max-width: 760px) 100vw, 300px" /></div>
                <div className="service-option-group-heading"><span>0{index + 1}</span><h3>{lang === "vi" ? group.viTitle : group.enTitle}</h3></div>
                <ul>{group[lang].map((option) => <li key={option}><IconArrow />{option}</li>)}</ul>
              </section>)}
            </div>}
            {selectedServiceDetail.options && <div className="service-options">
              <h3>{lang === "vi" ? "Dịch vụ trong nhóm" : "Services in this group"}</h3>
              <ul>{selectedServiceDetail.options[lang].map((option) => <li key={option}><IconArrow />{option}</li>)}</ul>
            </div>}
            <dl className="service-facts">
              <div><dt>{lang === "vi" ? "Kết quả hướng đến" : "Intended result"}</dt><dd>{selectedServiceDetail.result?.[lang] ?? selectedService[lang].suitable}</dd></div>
              <div><dt>{lang === "vi" ? "Thời lượng" : "Duration"}</dt><dd>{selectedServiceDetail.duration}</dd></div>
              <div><dt>{lang === "vi" ? "Gợi ý liệu trình" : "Suggested plan"}</dt><dd>{selectedServiceDetail.plan}</dd></div>
            </dl>
            <div className="service-steps"><h3>{lang === "vi" ? "Trải nghiệm gồm" : "What to expect"}</h3><ol>{selectedServiceDetail[lang].map((step) => <li key={step}><span>✓</span>{step}</li>)}</ol></div>
            <button className="button primary" onClick={() => { const serviceId = selectedService.id; setSelectedServiceId(null); openBooking(serviceId); }}>{lang === "vi" ? "Đặt lịch dịch vụ này" : "Book this service"}<IconArrow /></button>
          </div>
        </section>
      </div>}

      {bookingOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setBookingOpen(false)}>
        <section className="booking-modal" ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label={t.close}>×</button>
          {submitted ? <div className="success" role="status"><span>✓</span><p className="eyebrow">{brandText(t.received)}</p><h2>{brandText(t.modalTitle)}</h2><p>{brandText(t.thanks)}</p><button className="button primary" onClick={() => setBookingOpen(false)}>{t.done}</button></div> : <><p className="eyebrow">{lang === "vi" ? "TỎA SÁNG LÀ CHÍNH BẠN" : "SHINE AS YOU ARE"}</p><h2 id="booking-title">{brandText(t.modalTitle)}</h2><p>{brandText(t.modalText)}</p><form onSubmit={submitBooking}><label>{t.name}<input name="name" autoComplete="name" minLength={2} maxLength={120} required /></label><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={8} maxLength={30} pattern={BOOKING_PHONE_PATTERN} title={lang === "vi" ? "Nhập số điện thoại gồm 8–15 chữ số." : "Enter a phone number containing 8–15 digits."} required /></label><label>{t.service}<select name="service" defaultValue={bookingServiceId} required><option value="" disabled>{t.chooseService}</option>{services.map((service) => <option value={service.id} key={service.id}>{service[lang].title}</option>)}</select></label><label>{t.date}<input name="date" type="date" min={minimumBookingDate} required /></label>{bookingError && <p className="booking-error" role="alert">{bookingError}</p>}<button className="button primary" type="submit" disabled={isSubmitting}>{isSubmitting ? t.sending : t.submit}<IconArrow /></button></form></>}
        </section>
      </div>}
    </main>
  );
}
