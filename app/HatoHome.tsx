"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";

type Lang = "vi" | "en";
type Category = "all" | "care" | "relax" | "shape" | "smooth" | "body";

function brandText(text: string): ReactNode {
  return text.split(/(hato)/gi).map((part, index) =>
    /^hato$/i.test(part) ? <span className="hato-word" key={`${part}-${index}`}>hato</span> : part,
  );
}

const services = [
  {
    id: "skin",
    category: "care" as const,
    number: "01",
    image: "/images/service-skin-v2.webp",
    vi: { title: "Chăm sóc da chuyên sâu", summary: "Làm sạch · Phục hồi · Nuôi dưỡng", description: "Liệu trình được thiết kế sau bước soi và lắng nghe làn da, tập trung vào nhu cầu thực tế thay vì áp dụng một công thức chung.", suitable: "Da thiếu ẩm, xỉn màu, cần làm sạch và phục hồi nhịp chăm sóc." },
    en: { title: "Personalized facial care", summary: "Cleanse · Restore · Nourish", description: "A thoughtful facial designed after listening to your skin, focused on what it genuinely needs rather than a one-size-fits-all routine.", suitable: "For dehydrated, tired-looking skin in need of cleansing and restoration." },
  },
  {
    id: "scalp",
    category: "relax" as const,
    number: "02",
    image: "/images/service-hair-v2.webp",
    vi: { title: "Gội đầu dưỡng sinh", summary: "Thảo mộc · Massage · Thư giãn", description: "Nghi thức chăm sóc da đầu kết hợp làm sạch, massage vùng đầu–vai–gáy và nhịp chạm thư thái để cơ thể được nghỉ ngơi trọn vẹn.", suitable: "Người thường xuyên căng thẳng, mỏi vai gáy hoặc cần một khoảng nghỉ sâu." },
    en: { title: "Herbal scalp therapy", summary: "Herbs · Massage · Relaxation", description: "A restorative scalp ritual combining cleansing, head–shoulder massage and an unhurried rhythm for complete relaxation.", suitable: "For anyone feeling stressed, tense through the shoulders or simply in need of a deep pause." },
  },
  {
    id: "brow-lash",
    category: "shape" as const,
    number: "03",
    image: "/images/service-brow-v2.webp",
    vi: { title: "Định hình chân mày & Uốn mi", summary: "Cân đối · Tự nhiên · Tinh tế", description: "Chân mày được định hình theo tỷ lệ gương mặt; hàng mi được uốn cong mềm mại để làm rõ đường nét tự nhiên mà không tạo cảm giác nặng nề.", suitable: "Khách hàng muốn gương mặt sáng, đường nét hài hòa và dễ chăm sóc mỗi ngày." },
    en: { title: "Brow shaping & Lash lift", summary: "Balanced · Natural · Refined", description: "Brows are shaped to your facial proportions while lashes are softly lifted to enhance your natural features without heaviness.", suitable: "For a brighter, balanced look that stays effortless day to day." },
  },
  {
    id: "hair-removal",
    category: "smooth" as const,
    number: "04",
    image: "/images/service-hair-removal-v2.webp",
    vi: { title: "Triệt lông công nghệ cao", summary: "Êm dịu · Chính xác · Riêng tư", description: "Ứng dụng thiết bị hiện đại với thông số được điều chỉnh theo vùng da, thực hiện trong không gian riêng tư và quy trình vệ sinh rõ ràng.", suitable: "Các vùng tay, chân, nách hoặc vùng cần chăm sóc theo tư vấn cá nhân." },
    en: { title: "Advanced hair removal", summary: "Gentle · Precise · Private", description: "Modern technology with settings tailored to each treatment area, delivered in a private space with a clear hygiene protocol.", suitable: "For arms, legs, underarms or other areas following a personal consultation." },
  },
  {
    id: "waxing",
    category: "smooth" as const,
    number: "05",
    image: "/images/service-waxing-v2.webp",
    vi: { title: "Waxing dịu nhẹ", summary: "Gọn gàng · Nhanh chóng · Chăm da", description: "Kỹ thuật waxing cẩn trọng, lựa chọn sản phẩm phù hợp và chăm sóc da trước–sau dịch vụ để hạn chế cảm giác khó chịu.", suitable: "Khách hàng cần hiệu quả gọn gàng ngay và một quy trình chăm sóc kín đáo." },
    en: { title: "Gentle waxing", summary: "Smooth · Efficient · Skin-aware", description: "Careful waxing techniques, considered product selection and before–after skin care for a more comfortable experience.", suitable: "For an immediate smooth result delivered with discretion and care." },
  },
  {
    id: "body",
    category: "body" as const,
    number: "06",
    image: "/images/service-body-scrub-v2.webp",
    vi: { title: "Chăm sóc body", summary: "Tẩy tế bào chết · Dưỡng ẩm · Thư giãn", description: "Nghi thức tẩy tế bào chết body kết hợp thao tác nhẹ nhàng và dưỡng ẩm, giúp bề mặt da sạch thoáng, mềm mại và được chăm sóc trọn vẹn hơn.", suitable: "Làn da body khô ráp, thiếu mềm mại hoặc cần một khoảng chăm sóc thư giãn định kỳ." },
    en: { title: "Body care ritual", summary: "Exfoliate · Hydrate · Unwind", description: "A gentle body exfoliation ritual followed by thoughtful hydration, leaving skin feeling refreshed, smoother and cared for.", suitable: "For dry or rough body skin, or anyone seeking a regular restorative ritual." },
  },
];

const copy = {
  vi: {
    announcement: "Hãy để chúng tôi đánh thức vẻ đẹp trong bạn.",
    book: "Đặt lịch tư vấn",
    nav: ["Về chúng tôi", "Dịch vụ", "Trải nghiệm", "Kết quả", "Cảm nhận"],
    heroEyebrow: "Beauty, made personal",
    heroTitle: "Vẻ đẹp được chăm sóc theo cách của riêng bạn.",
    heroText: "Bởi mỗi người đều có một vẻ đẹp riêng. Tại đây, chúng tôi lắng nghe, thấu hiểu và thiết kế từng trải nghiệm để phù hợp với làn da, nhu cầu và nhịp sống của bạn.",
    explore: "Khám phá dịch vụ",
    learn: "Hiểu về chúng tôi",
    whyEyebrow: "Vì sao chọn chúng tôi",
    whyTitle: "Mọi chi tiết đều có lý do.",
    servicesEyebrow: "Dịch vụ của chúng tôi",
    servicesTitle: "Để chúng tôi giúp bạn tỏa sáng theo cách của chính mình.",
    servicesText: "Mỗi dịch vụ được giải thích rõ về trải nghiệm, thời lượng và khoảng giá tham khảo để bạn dễ dàng chọn điều phù hợp trước khi đặt lịch.",
    categories: { all: "Tất cả", care: "Chăm sóc da", relax: "Thư giãn", shape: "Mi & mày", smooth: "Triệt lông & Waxing", body: "Chăm sóc body" },
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
  },
  en: {
    announcement: "Let us awaken the beauty within you.",
    book: "Book a consultation",
    nav: ["About us", "Services", "Experience", "Results", "Reviews"],
    heroEyebrow: "Beauty, made personal",
    heroTitle: "Beauty cared for in a way that is uniquely yours.",
    heroText: "Because everyone has a beauty of their own. Here, we listen, understand and shape every experience around your skin, your needs and the rhythm of your life.",
    explore: "Explore services", learn: "Discover us",
    whyEyebrow: "Why choose us", whyTitle: "Every detail has a purpose.",
    servicesEyebrow: "Our services", servicesTitle: "Choose with clarity. Know what to expect.", servicesText: "Six care groups arranged clearly, so you understand the goal and experience before booking.",
    categories: { all: "All", care: "Facial care", relax: "Relaxation", shape: "Lash & brow", smooth: "Hair removal & Waxing", body: "Body care" },
    suitable: "Best suited for", choose: "Choose this service",
    experienceEyebrow: "Your experience", experienceTitle: "Modern in technique, gentle in every touch.",
    resultEyebrow: "Client results", resultTitle: "Become the most beautiful version of yourself.", resultNote: "Individual results vary according to your starting point and personal care plan.",
    testimonialEyebrow: "Client notes", testimonialTitle: "What guests remember after time with us.",
    bannerTitle: "Thank you for trusting us to be part of your beauty journey.", bannerText: "We are committed to bringing the very best to every guest.\nEvery small change in you is not only our happiness, but also the motivation that keeps us growing each day.", contactNow: "Contact us now",
    modalTitle: "Book with us", modalText: "Leave your details and we will contact you for a personal consultation.",
    name: "Full name", phone: "Phone number", service: "Service of interest", date: "Preferred date", submit: "Send request", close: "Close", chooseService: "Choose a service", received: "Request received", thanks: "Thank you. We will contact you shortly to listen and confirm a suitable time.", done: "Done", menu: "Open menu",
  },
} as const;

const highlights = [
  { number: "01", image: "/images/feature-equipment-v2.webp", vi: ["Thiết bị hiện đại", "Công nghệ được lựa chọn có mục đích và điều chỉnh theo từng vùng da, luôn đi cùng bước đánh giá và tư vấn rõ ràng."], en: ["Modern technology", "Purposefully selected technology, adjusted to each treatment area and guided by a clear consultation."] },
  { number: "02", image: "/images/feature-team-v2.webp", vi: ["Đội ngũ chuyên nghiệp", "Đội ngũ của chúng tôi thao tác cẩn trọng, giao tiếp chân thành và luôn tôn trọng cảm nhận riêng của mỗi khách hàng."], en: ["Professional team", "Our team combines careful technique, honest communication and respect for every guest's comfort."] },
  { number: "03", image: "/images/feature-personalized-v2.webp", vi: ["Dịch vụ cá nhân hóa", "Mỗi liệu trình bắt đầu bằng việc lắng nghe, phân tích nhu cầu và giải thích rõ mục tiêu trước khi thực hiện."], en: ["Personalized services", "Every ritual begins by listening, understanding your needs and clarifying the goal before treatment."] },
  { number: "04", image: "/images/feature-space-v2.webp", vi: ["Không gian thư giãn", "Màu sắc ấm, chất liệu tự nhiên và nhịp phục vụ không vội tạo nên một khoảng riêng đủ dịu để bạn thả lỏng."], en: ["A calming space", "Warm tones, natural textures and an unhurried rhythm create a private pause where you can unwind."] },
];

const results = [
  { image: "/images/result-skin-v2.webp", vi: ["Da sáng khỏe, ẩm mượt tự nhiên", "Sau trải nghiệm chăm sóc da chuyên sâu", "Chăm sóc da"], en: ["Naturally brighter, replenished skin", "After a personalized facial ritual", "Facial care"] },
  { image: "/images/result-brow-lash-v2.webp", vi: ["Chân mày thanh thoát, hàng mi cong nhẹ", "Sau định hình chân mày và uốn mi", "Chân mày & Mi"], en: ["Refined brows, softly lifted lashes", "After brow shaping and a lash lift", "Brow & Lash"] },
  { image: "/images/result-body-v2.webp", vi: ["Da body mịn màng, rạng rỡ hơn", "Sau nghi thức tẩy tế bào chết body", "Chăm sóc body"], en: ["Smoother, more radiant body skin", "After a body exfoliation ritual", "Body care"] },
];

const serviceDetails = {
  skin: { price: "450.000 – 1.200.000đ", duration: "60 – 90 phút", plan: "1 – 4 buổi, tùy tình trạng", vi: ["Soi da và trao đổi nhu cầu", "Làm sạch – tẩy da chết phù hợp", "Chăm sóc chuyên sâu và phục hồi", "Hướng dẫn duy trì tại nhà"], en: ["Skin consultation", "Suitable cleanse and exfoliation", "Targeted care and recovery", "Simple home-care guidance"] },
  scalp: { price: "180.000 – 450.000đ", duration: "45 – 75 phút", plan: "Theo nhu cầu thư giãn", vi: ["Kiểm tra da đầu và lựa chọn thảo mộc", "Làm sạch da đầu nhẹ nhàng", "Massage đầu – vai – gáy", "Sấy và hoàn thiện thư giãn"], en: ["Scalp check and herb selection", "Gentle scalp cleansing", "Head, neck and shoulder massage", "Drying and finishing ritual"] },
  "brow-lash": { price: "250.000 – 750.000đ", duration: "45 – 90 phút", plan: "Duy trì sau 4 – 8 tuần", vi: ["Phân tích tỷ lệ gương mặt", "Thống nhất dáng mày và độ cong", "Tạo dáng hoặc uốn mi cẩn trọng", "Hướng dẫn chăm sóc sau dịch vụ"], en: ["Facial proportion consultation", "Agree on shape and lift", "Careful shaping or lash lift", "Aftercare guidance"] },
  "hair-removal": { price: "250.000 – 1.500.000đ / vùng", duration: "20 – 60 phút", plan: "Thường 6 – 10 buổi", vi: ["Đánh giá vùng da và sợi lông", "Làm sạch và bảo vệ vùng da", "Điều chỉnh thiết bị theo vùng", "Làm dịu và dặn dò sau buổi"], en: ["Assess skin and hair", "Cleanse and protect the area", "Tailor device settings", "Soothe and explain aftercare"] },
  waxing: { price: "120.000 – 650.000đ / vùng", duration: "20 – 50 phút", plan: "Lặp lại sau 3 – 6 tuần", vi: ["Kiểm tra tình trạng da", "Làm sạch và chuẩn bị vùng wax", "Wax theo hướng phù hợp", "Làm dịu và dưỡng ẩm"], en: ["Check skin condition", "Cleanse and prepare", "Wax with suitable technique", "Soothe and moisturize"] },
  body: { price: "350.000 – 850.000đ", duration: "60 – 90 phút", plan: "2 – 4 tuần / lần", vi: ["Trao đổi nhu cầu và vùng ưu tiên", "Làm sạch và tẩy tế bào chết", "Thao tác thư giãn nhẹ nhàng", "Dưỡng ẩm và hoàn thiện"], en: ["Discuss priorities", "Cleanse and exfoliate", "Gentle relaxing technique", "Hydrate and finish"] },
} as const;

const testimonials = [
  { initials: "NT", name: { vi: "Nguyễn Thảo", en: "Nguyen Thao" }, quote: { vi: "Không gian rất dịu và sạch. Mình được hỏi kỹ về điều mình cần, không hề có cảm giác bị thúc ép chọn thêm dịch vụ.", en: "The space felt calm and immaculate. I was listened to carefully and never pressured into adding services." } },
  { initials: "MA", name: { vi: "Minh Anh", en: "Minh Anh" }, quote: { vi: "Mọi bước đều được giải thích rõ ràng. Mình thích cảm giác chuyên nghiệp nhưng vẫn gần gũi và thật sự riêng tư.", en: "Every step was clearly explained. It felt professional, welcoming and genuinely private." } },
  { initials: "KL", name: { vi: "Khánh Linh", en: "Khanh Linh" }, quote: { vi: "Đội ngũ nhẹ nhàng, quan sát kỹ phản ứng của mình và luôn hỏi lại mức độ thoải mái trong suốt buổi chăm sóc.", en: "The team was gentle, attentive and checked my comfort throughout the entire visit." } },
  { initials: "BT", name: { vi: "Bảo Trân", en: "Bao Tran" }, quote: { vi: "Mình ấn tượng vì cách tư vấn vừa đủ và thực tế. Sau buổi hẹn, mình biết rõ nên chăm sóc tiếp như thế nào.", en: "The advice was practical and considered. I left knowing exactly how to continue caring for myself." } },
  { initials: "TH", name: { vi: "Thu Hà", en: "Thu Ha" }, quote: { vi: "Từ lúc đặt lịch đến khi ra về đều rất chỉn chu. Đây là nơi mình muốn quay lại khi cần một khoảng nghỉ thật sự.", en: "From booking to goodbye, everything felt thoughtful. It is where I want to return for a genuine pause." } },
  { initials: "NM", name: { vi: "Ngọc Mai", en: "Ngoc Mai" }, quote: { vi: "Mình thấy được tôn trọng và chăm sóc theo đúng nhu cầu, không theo một công thức có sẵn cho tất cả mọi người.", en: "I felt respected and cared for according to my needs, never treated with a one-size-fits-all formula." } },
  { initials: "TV", name: { vi: "Thanh Vy", en: "Thanh Vy" }, quote: { vi: "Tông màu, mùi hương và nhịp phục vụ đều rất dễ chịu. Một trải nghiệm đẹp nhưng không hề phô trương.", en: "The palette, scent and pace were all soothing—beautifully refined without ever feeling showy." } },
  { initials: "HA", name: { vi: "Hoài An", en: "Hoai An" }, quote: { vi: "Điều mình nhớ nhất là sự cẩn thận. Những chi tiết nhỏ khiến mình cảm thấy an tâm ngay từ lần đầu tiên.", en: "What stayed with me was the care in every detail. I felt reassured from my very first visit." } },
];

export function HatoHome() {
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
  }, []);

  function openBooking(serviceId?: unknown) { setBookingServiceId(typeof serviceId === "string" ? serviceId : ""); setSubmitted(false); setBookingOpen(true); }
  function submitBooking(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }

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
          <h1>{lang === "vi" ? "Những giải pháp hiện đại cho làn da." : "Modern solutions for your skin."}</h1>
          <p className="hero-lead">{lang === "vi" ? "Kết hợp công nghệ phù hợp, chuyên môn cẩn trọng và một lộ trình được thiết kế theo nhu cầu thật của làn da bạn." : "Considered technology, careful expertise and a plan shaped around what your skin truly needs."}</p>
          <div className="hero-actions"><a className="button primary" href="#services">{t.explore}<span>↗</span></a><a className="text-link" href="#about">{brandText(t.learn)}<span>↓</span></a></div>
        </div>
      </section>

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
        <div className="knowledge-heading"><div><p className="eyebrow">{lang === "vi" ? "Góc kiến thức" : "The journal"}</p><h2>{lang === "vi" ? "Những mẹo nhỏ giúp bạn chăm sóc chính mình." : "Small rituals to help you care for yourself."}</h2></div><p>{lang === "vi" ? "Những gợi ý ngắn gọn, dễ áp dụng để bạn hiểu làn da hơn và duy trì cảm giác khỏe đẹp mỗi ngày." : "Simple, practical notes to help you understand your skin and sustain a healthy glow every day."}</p></div>
        <div className="knowledge-grid">
          {[
            lang === "vi" ? ["01", "Da cần làm sạch sâu hay ưu tiên phục hồi?", "3 phút đọc", "/images/journal-skin-v2.webp"] : ["01", "Does your skin need deep cleansing or recovery first?", "3 min read", "/images/journal-skin-v2.webp"],
            lang === "vi" ? ["02", "Vì sao vùng đầu và vai gáy nên được thả lỏng cùng nhau?", "4 phút đọc", "/images/journal-scalp-v2.webp"] : ["02", "Why should the scalp, neck and shoulders unwind together?", "4 min read", "/images/journal-scalp-v2.webp"],
            lang === "vi" ? ["03", "Đường nét nào giúp gương mặt vẫn giữ vẻ tự nhiên?", "3 phút đọc", "/images/journal-brow-v2.webp"] : ["03", "Which shape keeps your features feeling naturally yours?", "3 min read", "/images/journal-brow-v2.webp"],
            lang === "vi" ? ["04", "Cần chuẩn bị gì trước một liệu trình công nghệ cao?", "3 phút đọc", "/images/journal-technology-v2.webp"] : ["04", "How should you prepare for an advanced treatment?", "3 min read", "/images/journal-technology-v2.webp"],
            lang === "vi" ? ["05", "Làm thế nào để làn da dịu hơn sau liệu trình?", "3 phút đọc", "/images/journal-aftercare-v2.webp"] : ["05", "How can skin feel calmer after a treatment?", "3 min read", "/images/journal-aftercare-v2.webp"],
            lang === "vi" ? ["06", "Khi nào là thời điểm phù hợp để tái tạo bề mặt da?", "4 phút đọc", "/images/journal-body-v2.webp"] : ["06", "When is the right time to refresh the skin's surface?", "4 min read", "/images/journal-body-v2.webp"],
          ].map((item) => <article className="knowledge-card" key={item[0]}><div className="knowledge-image"><Image src={item[3]} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized /></div><div className="knowledge-body"><div className="knowledge-meta"><span>{item[0]}</span><small>{item[2]}</small></div><h3>{item[1]}</h3><span className="knowledge-arrow" aria-hidden="true">↗</span></div></article>)}
        </div>
      </section>

      <section className="results section" id="results">
        <div className="results-head"><div><p className="eyebrow">{t.resultEyebrow}</p><h2>{t.resultTitle}</h2></div><p>{t.resultNote}</p></div>
        <div className="result-grid">{results.map((result) => <article key={result.vi[0]}><div className="result-image"><Image src={result.image} alt={result[lang][0]} fill sizes="(max-width: 720px) 100vw, 33vw" unoptimized /><div className="comparison-labels"><span>{lang === "vi" ? "Trước" : "Before"}</span><span>{lang === "vi" ? "Sau" : "After"}</span></div></div><div className="result-copy"><h3>{result[lang][0]}</h3><p>{result[lang][1]}</p></div></article>)}</div>
      </section>

      <section className="testimonials section" id="testimonials">
        <div className="testimonial-heading"><div><p className="eyebrow">{lang === "vi" ? "Đánh giá chung" : "Guest reviews"}</p><h2>{lang === "vi" ? "Những điều khách hàng nhớ về Hato Beauty." : "What guests remember about Hato Beauty."}</h2></div><div className="review-heading-side"><p>{lang === "vi" ? "Những chia sẻ chân thành về không gian, đội ngũ và toàn bộ trải nghiệm tại Hato." : "Honest notes about the space, the team and the complete Hato experience."}</p><div className="review-controls"><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá trước" : "Previous review group"}>←</button><button onClick={() => setReviewOffset((reviewOffset + 4) % testimonials.length)} aria-label={lang === "vi" ? "Nhóm đánh giá tiếp theo" : "Next review group"}>→</button></div></div></div>
        <div className="review-grid" aria-live="polite">
          {Array.from({ length: 4 }, (_, column) => testimonials[(reviewOffset + column) % testimonials.length]).map((review, index) => <article className={`review-card review-card-${index + 1}`} key={`${reviewOffset}-${review.initials}`}><div className="review-top"><span>0{((reviewOffset + index) % testimonials.length) + 1}</span><b>“</b></div><blockquote>{review.quote[lang]}</blockquote><footer><strong>{review.initials}</strong><div><b>{review.name[lang]}</b><small>{lang === "vi" ? "Khách hàng Hato Beauty" : "Hato Beauty guest"}</small></div></footer></article>)}
        </div>
        <div className="review-pagination" aria-label={lang === "vi" ? "Nhóm đánh giá" : "Review group"}><span>{reviewOffset === 0 ? "01 — 04" : "05 — 08"}<small>/ 08</small></span><div><button className={reviewOffset === 0 ? "active" : ""} onClick={() => setReviewOffset(0)} aria-label={lang === "vi" ? "Xem đánh giá 1 đến 4" : "View reviews 1 to 4"} /><button className={reviewOffset === 4 ? "active" : ""} onClick={() => setReviewOffset(4)} aria-label={lang === "vi" ? "Xem đánh giá 5 đến 8" : "View reviews 5 to 8"} /></div></div>
      </section>

      <section className="booking-banner" id="contact"><div className="banner-orbit" /><article><div className="banner-note"><span className="banner-note-brand"><b>hato</b><em>Beauty</em></span><i aria-hidden="true" /><small>SHINE AS YOU ARE</small></div><h2>{t.bannerTitle}</h2><p>{brandText(t.bannerText)}</p><button className="button light" onClick={openBooking}><span>{lang === "vi" ? "Nhận tư vấn riêng" : "Request personal guidance"}</span><b>↗</b></button></article></section>

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
          <div className="offer-visual"><Image className="offer-logo" src="/brand/hato-logo-transparent-v3.png" alt="hato Beauty" width={1016} height={638} unoptimized /><strong>10<small>%</small></strong><span>{lang === "vi" ? "Ưu đãi hôm nay" : "Today only"}</span></div>
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
          {submitted ? <div className="success" role="status"><span>✓</span><p className="eyebrow">{brandText(t.received)}</p><h2>{brandText(t.modalTitle)}</h2><p>{brandText(t.thanks)}</p><button className="button primary" onClick={() => setBookingOpen(false)}>{t.done}</button></div> : <><p className="eyebrow">SHINE AS YOU ARE</p><h2 id="booking-title">{brandText(t.modalTitle)}</h2><p>{brandText(t.modalText)}</p><form onSubmit={submitBooking}><label>{t.name}<input name="name" autoComplete="name" required /></label><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label><label>{t.service}<select name="service" defaultValue={bookingServiceId} required><option value="" disabled>{t.chooseService}</option>{services.map((service) => <option value={service.id} key={service.id}>{service[lang].title}</option>)}</select></label><label>{t.date}<input name="date" type="date" required /></label><button className="button primary" type="submit">{t.submit}<span>↗</span></button></form></>}
        </section>
      </div>}
    </main>
  );
}
