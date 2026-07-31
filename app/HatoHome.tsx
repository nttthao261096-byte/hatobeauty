"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FormEvent, TouchEvent, useEffect, useRef, useState } from "react";

type Lang = "vi" | "en";

function brandText(text: string): ReactNode {
  return text.split(/(hato)/gi).map((part, index) =>
    /^hato$/i.test(part) ? <span className="hato-word" key={`${part}-${index}`}>hato</span> : part,
  );
}

const services = [
  {
    number: "01",
    image: "/images/service-skin-v2.png",
    vi: {
      title: "Gói chăm sóc da",
      short: "Làm sạch · Cân bằng · Nuôi dưỡng",
      description: "Liệu trình được điều chỉnh theo tình trạng da, giúp làn da được làm sạch, cấp ẩm và chăm sóc trong nhịp điệu thư thái.",
    },
    en: {
      title: "Facial care package",
      short: "Cleanse · Balance · Nourish",
      description: "A personalized ritual tailored to your skin, combining gentle cleansing, hydration and restorative care at an unhurried pace.",
    },
  },
  {
    number: "02",
    image: "/images/service-hair-v2.png",
    vi: {
      title: "Gói gội đầu dưỡng sinh",
      short: "Thảo mộc · Massage · Thư giãn",
      description: "Nghi thức chăm sóc tóc và da đầu kết hợp massage thư giãn, mang lại cảm giác nhẹ nhõm cho cả cơ thể lẫn tinh thần.",
    },
    en: {
      title: "Herbal scalp therapy",
      short: "Herbs · Massage · Relaxation",
      description: "A calming hair and scalp ritual with gentle massage techniques, designed to leave both body and mind feeling refreshed.",
    },
  },
  {
    number: "03",
    image: "/images/service-brow-v2.png",
    vi: {
      title: "Gói mi và mày",
      short: "Tự nhiên · Cân đối · Tinh tế",
      description: "Chăm chút dáng mày và hàng mi theo đường nét riêng, ưu tiên vẻ đẹp tự nhiên, hài hòa và phù hợp với gương mặt.",
    },
    en: {
      title: "Lash & brow package",
      short: "Natural · Balanced · Refined",
      description: "Thoughtful lash and brow styling shaped around your features, with a focus on natural, balanced and elegant results.",
    },
  },
] as const;

const content = {
  vi: {
    announcement: "HATO RITUAL · Trải nghiệm chăm sóc được thiết kế riêng",
    consult: "Đặt lịch tư vấn",
    nav: ["Về Hato", "Dịch vụ", "Trải nghiệm", "Cẩm nang", "Liên hệ"],
    heroEyebrow: ["Beauty, made personal", "Skin ritual", "Herbal relaxation", "Lash & brow artistry"],
    heroTitle: ["Vẻ đẹp tự nhiên,", "Làn da được lắng nghe,", "Thả lỏng từ những chạm dịu dàng,", "Đường nét riêng, vẻ đẹp riêng."],
    heroAccent: ["theo cách của bạn.", "chăm sóc theo cách riêng.", "dành trọn cho bạn.", "tinh tế và tự nhiên."],
    heroLead: [
      "Hato là một khoảng dừng tinh tế, nơi mỗi nghi thức chăm sóc bắt đầu từ việc lắng nghe bạn.",
      "Một chu trình vừa đủ, được điều chỉnh theo làn da và nhịp sống của riêng bạn.",
      "Nghi thức dưỡng sinh ấm áp giúp da đầu, mái tóc và tinh thần cùng được thư giãn.",
      "Mi và mày được chăm chút hài hòa với đường nét tự nhiên của gương mặt.",
    ],
    explore: "Khám phá dịch vụ",
    story: "Câu chuyện Hato",
    introLabel: "Triết lý Hato",
    introKicker: "Chăm sóc không chỉ để đẹp hơn.",
    introTitle: "Đó là cách bạn trở về với",
    introAccent: "phiên bản dịu dàng nhất",
    introSuffix: "của chính mình.",
    introText: "Hato kết hợp sự chỉn chu trong từng thao tác, sản phẩm chọn lọc và một không gian giàu cảm xúc để mỗi lần bạn ghé thăm đều trở thành khoảng thời gian đáng nhớ.",
    introLink: "Hiểu thêm về Hato",
    serviceLabel: "Dịch vụ của Hato",
    serviceTitle: "Ba nghi thức dành",
    serviceAccent: "riêng cho bạn.",
    serviceText: "Mỗi gói dịch vụ được tinh chỉnh theo nhu cầu, quỹ thời gian và cảm nhận riêng của từng khách hàng.",
    serviceCta: "Đặt gói dịch vụ này",
    previous: "Dịch vụ trước",
    next: "Dịch vụ tiếp theo",
    ritualLabel: "Nghi thức Hato",
    ritualEyebrow: "Lắng nghe · Cá nhân hóa · Chăm sóc",
    ritualTitle: "Từng chạm nhỏ,",
    ritualAccent: "một thay đổi lớn.",
    steps: [
      ["Lắng nghe", "Bắt đầu bằng một cuộc trò chuyện đủ chậm để hiểu điều bạn thật sự cần."],
      ["Thiết kế liệu trình", "Dịch vụ và nhịp chăm sóc được điều chỉnh riêng, không áp dụng một khuôn mẫu cho tất cả."],
      ["Tận hưởng và duy trì", "Trọn vẹn trải nghiệm tại Hato cùng hướng dẫn chăm sóc phù hợp sau liệu trình."],
    ],
    privateConsult: "Nhận tư vấn riêng",
    whyLabel: "Vì sao chọn Hato",
    whyTitle: "Chuẩn mực nằm trong",
    whyAccent: "từng chi tiết.",
    commitments: [
      ["Cá nhân hóa thực sự", "Mỗi khách hàng là một câu chuyện riêng; mỗi liệu trình là một thiết kế riêng."],
      ["Quy trình chỉn chu", "Thao tác cẩn trọng, không gian sạch sẽ và trải nghiệm rõ ràng trong từng bước."],
      ["Không gian riêng tư", "Tinh giản, nhẹ nhàng và đủ tĩnh để bạn thật sự thư giãn khi ghé Hato."],
      ["Đồng hành lâu dài", "Không chỉ một buổi hẹn, Hato xây dựng hành trình chăm sóc bền vững cùng bạn."],
    ],
    journalLabel: "Cẩm nang Hato",
    journalTitle: "Chăm mình,",
    journalAccent: "đúng cách.",
    journalText: "Những ghi chú nhỏ về làn da, mái tóc và cách tạo ra những khoảng nghỉ chất lượng trong đời sống thường ngày.",
    articles: [
      ["Chăm sóc da · 5 phút đọc", "Một chu trình tối giản đôi khi lại là điều làn da cần nhất"],
      ["Sống chậm · 4 phút đọc", "Vì sao những khoảng nghỉ nhỏ có thể tạo nên thay đổi lớn?"],
    ],
    read: "Đọc bài viết",
    bannerTitle: "Dành một khoảng",
    bannerAccent: "cho chính mình.",
    bannerText: "Hãy để Hato lắng nghe và gợi ý trải nghiệm phù hợp nhất với bạn.",
    bookWith: "Đặt lịch cùng Hato",
    discover: "Khám phá",
    contact: "Liên hệ",
    openTime: "Thứ Hai – Chủ Nhật",
    sendConsult: "Gửi yêu cầu tư vấn",
    newsletter: "Nhận ghi chú từ Hato",
    newsletterText: "Một chút cảm hứng chăm mình, gửi đến bạn mỗi tháng.",
    email: "Email của bạn",
    received: "Đã nhận yêu cầu",
    thankYou: "Cảm ơn bạn đã chọn Hato.",
    thankText: "Đội ngũ Hato sẽ liên hệ để lắng nghe nhu cầu và xác nhận thời gian phù hợp.",
    finish: "Hoàn tất",
    modalTitle: "Đặt lịch cùng Hato",
    modalText: "Để lại thông tin, Hato sẽ liên hệ tư vấn và xác nhận lịch phù hợp.",
    name: "Họ và tên",
    namePlaceholder: "Tên của bạn",
    phone: "Số điện thoại",
    selectService: "Dịch vụ quan tâm",
    chooseService: "Chọn dịch vụ",
    preferredDate: "Ngày mong muốn",
    submit: "Gửi yêu cầu",
    close: "Đóng",
    menuOpen: "Mở menu",
    menuClose: "Đóng menu",
  },
  en: {
    announcement: "HATO RITUAL · A beauty experience designed around you",
    consult: "Book a consultation",
    nav: ["About Hato", "Services", "The ritual", "Journal", "Contact"],
    heroEyebrow: ["Beauty, made personal", "Skin ritual", "Herbal relaxation", "Lash & brow artistry"],
    heroTitle: ["Natural beauty,", "A ritual that listens", "Unwind through gentle touch,", "Your features, refined."],
    heroAccent: ["in your own way.", "to your skin.", "a moment made for you.", "Naturally and gracefully."],
    heroLead: [
      "Hato is a refined pause, where every beauty ritual begins by truly listening to you.",
      "A thoughtful routine tailored to your skin and the rhythm of your everyday life.",
      "A warm herbal ritual designed to relax your scalp, hair and mind together.",
      "Lashes and brows styled in harmony with the natural lines of your face.",
    ],
    explore: "Explore services",
    story: "The Hato story",
    introLabel: "Hato philosophy",
    introKicker: "Care is about more than looking beautiful.",
    introTitle: "It is how you return to",
    introAccent: "your gentlest self,",
    introSuffix: "one ritual at a time.",
    introText: "Hato brings together thoughtful techniques, carefully selected products and an atmosphere rich in feeling, turning every visit into meaningful time for yourself.",
    introLink: "Discover Hato",
    serviceLabel: "Hato services",
    serviceTitle: "Three rituals designed",
    serviceAccent: "just for you.",
    serviceText: "Each package is adjusted to your needs, your available time and the way you want to feel.",
    serviceCta: "Book this service",
    previous: "Previous service",
    next: "Next service",
    ritualLabel: "The Hato ritual",
    ritualEyebrow: "Listen · Personalize · Care",
    ritualTitle: "Small, thoughtful touches.",
    ritualAccent: "A meaningful change.",
    steps: [
      ["Listen", "We begin with an unhurried conversation to understand what you genuinely need."],
      ["Design your ritual", "The service and its pace are adjusted to you rather than shaped by a one-size-fits-all routine."],
      ["Enjoy and maintain", "Complete your time at Hato with thoughtful aftercare guidance suited to your ritual."],
    ],
    privateConsult: "Personal consultation",
    whyLabel: "Why Hato",
    whyTitle: "Our standards live in",
    whyAccent: "every detail.",
    commitments: [
      ["Truly personal", "Every guest has a different story, so every ritual is thoughtfully designed."],
      ["Thoughtful process", "Careful techniques, a clean environment and a clear experience from beginning to end."],
      ["A private retreat", "Minimal, calming and quiet enough for you to genuinely unwind."],
      ["Long-term care", "Beyond a single appointment, Hato supports a sustainable beauty journey with you."],
    ],
    journalLabel: "Hato journal",
    journalTitle: "Caring for yourself,",
    journalAccent: "thoughtfully.",
    journalText: "Gentle notes on skin, hair and creating meaningful pauses in everyday life.",
    articles: [
      ["Skin care · 5 min read", "Sometimes a simpler routine is exactly what your skin needs"],
      ["Slow living · 4 min read", "Why can small pauses create meaningful change?"],
    ],
    read: "Read article",
    bannerTitle: "Make a little space",
    bannerAccent: "for yourself.",
    bannerText: "Let Hato listen and recommend the experience that feels right for you.",
    bookWith: "Book with Hato",
    discover: "Discover",
    contact: "Contact",
    openTime: "Monday – Sunday",
    sendConsult: "Send a consultation request",
    newsletter: "Notes from Hato",
    newsletterText: "A little monthly inspiration for caring for yourself.",
    email: "Your email",
    received: "Request received",
    thankYou: "Thank you for choosing Hato.",
    thankText: "Our team will contact you to understand your needs and confirm a suitable time.",
    finish: "Done",
    modalTitle: "Book with Hato",
    modalText: "Leave your details and Hato will get in touch to consult and confirm your appointment.",
    name: "Full name",
    namePlaceholder: "Your name",
    phone: "Phone number",
    selectService: "Service of interest",
    chooseService: "Choose a service",
    preferredDate: "Preferred date",
    submit: "Send request",
    close: "Close",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
} as const;

export function HatoHome() {
  const [lang, setLang] = useState<Lang>("vi");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);
  const touchStart = useRef(0);
  const t = content[lang];
  const activeService = services[serviceIndex];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [bookingOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex((index) => (index + 1) % 4), 6500);
    return () => window.clearInterval(timer);
  }, []);

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function changeService(direction: number) {
    setServiceIndex((index) => (index + direction + services.length) % services.length);
  }

  function handleSwipe(event: TouchEvent) {
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) changeService(distance > 0 ? -1 : 1);
  }

  const heroImages = ["/images/hato-hero.png", ...services.map((service) => service.image)];
  const navTargets = ["#about", "#services", "#ritual", "#journal", "#contact"];

  return (
    <main>
      <div className="announcement">
        <span>{brandText(t.announcement)}</span>
        <button onClick={() => setBookingOpen(true)}>{t.consult}</button>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hato Beauty">
          <Image src="/brand/hato-logo.png" alt="Hato Beauty" width={280} height={150} priority />
        </a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}>
          {t.nav.map((label, index) => <a key={label} href={navTargets[index]} onClick={() => setMenuOpen(false)}>{brandText(label)}</a>)}
        </nav>
        <div className="header-tools">
          <div className="language-switch" aria-label="Language">
            <button className={lang === "vi" ? "active" : ""} onClick={() => setLang("vi")} aria-pressed={lang === "vi"}>VI</button>
            <span>/</span>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
          </div>
          <button className="header-cta" onClick={() => setBookingOpen(true)}>{t.consult}<span>↗</span></button>
          <button className="menu-button" aria-label={menuOpen ? t.menuClose : t.menuOpen} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-slides">
          {heroImages.map((image, index) => (
            <Image key={image} className={index === heroIndex ? "hero-image active" : "hero-image"} src={image} alt="Hato Beauty" fill priority={index === 0} sizes="100vw" />
          ))}
        </div>
        <div className="hero-shade" />
        <div className="hero-copy" key={`${lang}-${heroIndex}`}>
          <p className="eyebrow">{t.heroEyebrow[heroIndex]}</p>
          <h1>{t.heroTitle[heroIndex]}<br /><em>{t.heroAccent[heroIndex]}</em></h1>
          <p className="hero-lead">{brandText(t.heroLead[heroIndex])}</p>
          <div className="hero-actions">
            <a className="button primary" href="#services">{t.explore}<span>↗</span></a>
            <a className="text-link" href="#about">{brandText(t.story)}<span>↓</span></a>
          </div>
        </div>
        <div className="hero-controls" aria-label="Hero slides">
          {heroImages.map((_, index) => <button key={index} className={index === heroIndex ? "active" : ""} onClick={() => setHeroIndex(index)} aria-label={`Slide ${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span><i /></button>)}
        </div>
        <div className="hero-counter">{String(heroIndex + 1).padStart(2, "0")} <span>/</span> 04</div>
      </section>

      <section className="intro section" id="about">
        <div className="section-label"><span>01</span>{brandText(t.introLabel)}</div>
        <div className="intro-copy">
          <p className="kicker">{t.introKicker}</p>
          <h2><span>{t.introTitle}</span><br /><em>{t.introAccent}</em><br /><span>{t.introSuffix}</span></h2>
        </div>
        <div className="intro-aside">
          <div className="intro-logo"><Image src="/brand/hato-logo.png" alt="Hato Beauty" width={220} height={118} /></div>
          <p>{brandText(t.introText)}</p><a href="#ritual">{brandText(t.introLink)}<span>→</span></a>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="services-heading">
          <div className="section-label light"><span>02</span>{brandText(t.serviceLabel)}</div>
          <h2>{t.serviceTitle}<br /><em>{t.serviceAccent}</em></h2>
          <p>{t.serviceText}</p>
          <div className="service-arrows">
            <button onClick={() => changeService(-1)} aria-label={t.previous}>←</button>
            <span>{String(serviceIndex + 1).padStart(2, "0")} / 03</span>
            <button onClick={() => changeService(1)} aria-label={t.next}>→</button>
          </div>
        </div>
        <div className="service-slider" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleSwipe}>
          <div className="service-image-wrap">
            {services.map((service, index) => <Image key={service.image} className={index === serviceIndex ? "active" : ""} src={service.image} alt={service[lang].title} fill sizes="(max-width: 980px) 100vw, 50vw" />)}
            <span className="service-badge">{activeService.number}</span>
          </div>
          <div className="service-content" key={`${lang}-${serviceIndex}`}>
            <p>{activeService[lang].short}</p>
            <h3>{activeService[lang].title}</h3>
            <div><p>{activeService[lang].description}</p><button onClick={() => setBookingOpen(true)}>{t.serviceCta}<span>↗</span></button></div>
          </div>
          <div className="service-dots">{services.map((service, index) => <button key={service.number} className={index === serviceIndex ? "active" : ""} onClick={() => setServiceIndex(index)} aria-label={`${t.serviceLabel} ${index + 1}`} />)}</div>
        </div>
      </section>

      <section className="ritual section" id="ritual">
        <div className="ritual-visual"><Image src="/images/service-hair-v2.png" alt={services[1][lang].title} fill sizes="(max-width: 800px) 100vw, 48vw" /><div className="ritual-card"><span>H</span><p>{lang === "vi" ? "Khoảng thời gian dành trọn cho bạn" : "Time reserved entirely for you"}</p></div></div>
        <div className="ritual-copy">
          <div className="section-label"><span>03</span>{brandText(t.ritualLabel)}</div><p className="eyebrow">{t.ritualEyebrow}</p><h2>{t.ritualTitle}<br /><em>{t.ritualAccent}</em></h2>
          <div className="ritual-steps">{t.steps.map((step, index) => <div key={step[0]}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step[0]}</h3><p>{step[1]}</p></div>)}</div>
          <button className="button outline" onClick={() => setBookingOpen(true)}>{t.privateConsult}<span>↗</span></button>
        </div>
      </section>

      <section className="commitment section">
        <div><div className="section-label"><span>04</span>{brandText(t.whyLabel)}</div><h2>{t.whyTitle}<br /><em>{t.whyAccent}</em></h2></div>
        <div className="commitment-grid">{t.commitments.map((item, index) => <article key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item[0]}</h3><p>{brandText(item[1])}</p></article>)}</div>
      </section>

      <section className="journal section" id="journal">
        <div className="journal-head"><div><div className="section-label"><span>05</span>{brandText(t.journalLabel)}</div><h2>{t.journalTitle}<br /><em>{t.journalAccent}</em></h2></div><p>{t.journalText}</p></div>
        <div className="journal-grid">
          <article><div className="journal-image"><Image src="/images/service-skin-v2.png" alt={t.articles[0][1]} fill sizes="(max-width: 640px) 100vw, 55vw" /><span>SKIN NOTES</span></div><p>{t.articles[0][0]}</p><h3>{t.articles[0][1]}</h3><a href="#contact">{t.read}<span>→</span></a></article>
          <article><div className="journal-image"><Image src="/images/service-brow-v2.png" alt={t.articles[1][1]} fill sizes="(max-width: 640px) 100vw, 40vw" /><span>SLOW BEAUTY</span></div><p>{t.articles[1][0]}</p><h3>{t.articles[1][1]}</h3><a href="#contact">{t.read}<span>→</span></a></article>
        </div>
      </section>

      <section className="booking-banner section" id="contact"><p className="eyebrow">Your moment starts here</p><h2>{t.bannerTitle}<br /><em>{t.bannerAccent}</em></h2><p>{brandText(t.bannerText)}</p><button className="button light-button" onClick={() => setBookingOpen(true)}>{brandText(t.bookWith)}<span>↗</span></button></section>

      <footer>
        <div className="footer-brand"><Image src="/brand/hato-logo.png" alt="Hato Beauty" width={300} height={160} /><p>Beauty, made personal.</p></div>
        <div><h3>{t.discover}</h3><a href="#about">{t.nav[0]}</a><a href="#services">{t.nav[1]}</a><a href="#journal">{t.nav[3]}</a></div>
        <div><h3>{t.contact}</h3><p>{t.openTime}<br />09:00 – 20:00</p><button onClick={() => setBookingOpen(true)}>{t.sendConsult}</button></div>
        <div className="footer-news"><h3>{brandText(t.newsletter)}</h3><p>{t.newsletterText}</p><label><span className="sr-only">{t.email}</span><input type="email" placeholder={t.email} /><button aria-label={t.newsletter}>→</button></label></div>
        <div className="footer-bottom"><span>© 2026 {brandText("Hato")} Beauty</span><span>Instagram&nbsp;&nbsp;·&nbsp;&nbsp;Facebook</span></div>
      </footer>

      <button className="floating-book" onClick={() => setBookingOpen(true)} aria-label={t.consult}><span>{t.consult}</span>↗</button>

      {bookingOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setBookingOpen(false)}>
        <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label={t.close}>×</button>
          {submitted ? <div className="success"><span>✓</span><p className="eyebrow">{t.received}</p><h2>{brandText(t.thankYou)}</h2><p>{brandText(t.thankText)}</p><button className="button primary" onClick={() => { setBookingOpen(false); setSubmitted(false); }}>{t.finish}</button></div> : <><p className="eyebrow">A moment for you</p><h2 id="booking-title">{brandText(t.modalTitle)}</h2><p>{brandText(t.modalText)}</p>
          <form onSubmit={submitBooking}><label>{t.name}<input name="name" required placeholder={t.namePlaceholder} /></label><label>{t.phone}<input name="phone" required inputMode="tel" placeholder={t.phone} /></label><label>{t.selectService}<select name="service" defaultValue=""><option value="" disabled>{t.chooseService}</option>{services.map((service) => <option key={service.number}>{service[lang].title}</option>)}</select></label><label>{t.preferredDate}<input name="date" type="date" required /></label><button className="button primary" type="submit">{t.submit}<span>↗</span></button></form></>}
        </section>
      </div>}
    </main>
  );
}
