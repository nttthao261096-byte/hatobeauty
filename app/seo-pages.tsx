import Image from "next/image";
import Link from "next/link";

import { BookingForm } from "./BookingForm";
import { ContactForm } from "./ContactForm";
import { ContactDetails, ContactMap } from "./ContactDetails";
import type { ResultContent } from "./content";
import { IconArrow } from "./icons";
import { journalPath, journalTopics, mediaUrl, primarySeoServices, seoServices, servicePath, siteUrl, type SeoLang, type SeoService } from "./seo-data";
import { SiteHeader } from "./SiteHeader";

import { journalIntentFaqs, serviceIntentFaqs } from "./seo-faq-data";
const facts: Record<SeoService["id"], { vi: [string, string]; en: [string, string] }> = {
  skin: { vi: ["450.000 – 1.200.000đ", "60 – 90 phút"], en: ["VND 450,000 – 1,200,000", "60 – 90 minutes"] },
  scalp: { vi: ["180.000 – 450.000đ", "45 – 75 phút"], en: ["VND 180,000 – 450,000", "45 – 75 minutes"] },
  body: { vi: ["350.000 – 850.000đ", "60 – 90 phút"], en: ["VND 350,000 – 850,000", "60 – 90 minutes"] },
  "brow-lash": { vi: ["250.000 – 750.000đ", "45 – 90 phút"], en: ["VND 250,000 – 750,000", "45 – 90 minutes"] },
  "hair-removal": { vi: ["250.000 – 1.500.000đ/vùng", "20 – 60 phút"], en: ["VND 250,000 – 1,500,000/area", "20 – 60 minutes"] },
  waxing: { vi: ["Tư vấn theo vùng", "20 – 50 phút"], en: ["Quoted by area", "20 – 50 minutes"] },
};

type ServiceDetailGroup = { title: string; items: string[] };

const serviceNumbers: Partial<Record<SeoService["id"], string>> = {
  skin: "01", "brow-lash": "02", scalp: "03", "hair-removal": "04", waxing: "05",
};

const serviceCardTaglines: Partial<Record<SeoService["id"], Record<SeoLang, string>>> = {
  skin: { vi: "Chăm sóc da mặt và cơ thể với liệu trình làm sạch, phục hồi theo nhu cầu riêng.", en: "Face and body care with cleansing and recovery tailored to individual needs." },
  "brow-lash": { vi: "Uốn, nhuộm và định hình mi mày hài hòa, giúp đường nét gương mặt tự nhiên hơn.", en: "Lifting, tinting and shaping for naturally balanced lashes, brows and facial features." },
  scalp: { vi: "Làm sạch da đầu kết hợp massage thư giãn, giúp cơ thể thả lỏng nhẹ nhàng.", en: "Scalp cleansing with relaxing massage to help the body gently unwind." },
  "hair-removal": { vi: "Giảm lông theo từng vùng với lộ trình phù hợp tình trạng da và nhu cầu cá nhân.", en: "Area-focused hair reduction with a plan suited to skin condition and personal needs." },
  waxing: { vi: "Tẩy lông theo vùng nhanh gọn, kín đáo và chú trọng làm dịu bề mặt da.", en: "Efficient, discreet area waxing with thoughtful care to soothe the skin." },
};

const serviceDetailMenus: Partial<Record<SeoService["id"], Record<SeoLang, ServiceDetailGroup[]>>> = {
  skin: {
    vi: [
      { title: "Chăm sóc da cơ thể", items: ["Tẩy tế bào chết & dưỡng ẩm chuyên sâu", "Phục hồi da cháy nắng", "Chăm sóc & điều trị mụn lưng"] },
      { title: "Chăm sóc da mặt", items: ["Trị liệu làm sạch da chuyên sâu", "Trị liệu phục hồi da chuyên sâu", "Trị liệu căng bóng & trẻ hóa da", "Trị liệu chăm sóc da mụn", "Trị liệu tăng sắc tố và nám", "Trị liệu Mesotherapy", "Trị liệu phục hồi hàng rào bảo vệ & da nhạy cảm", "Trị liệu chăm sóc da cá nhân hóa"] },
    ],
    en: [
      { title: "Body skin care", items: ["Deep exfoliation & hydration", "Sun-damaged skin recovery", "Back acne care & treatment"] },
      { title: "Facial skin care", items: ["Deep-cleansing therapy", "Intensive skin recovery therapy", "Radiance & rejuvenation therapy", "Acne care therapy", "Pigmentation & melasma therapy", "Mesotherapy", "Barrier repair & sensitive skin therapy", "Personalised facial care"] },
    ],
  },
  "brow-lash": {
    vi: [
      { title: "Mi", items: ["Uốn mi", "Nhuộm mi", "Uốn mi kiểu Hàn + nhuộm mi"] },
      { title: "Mày", items: ["Nhuộm chân mày", "Nhuộm + tạo hình chân mày", "Định hình + nhuộm mày"] },
    ],
    en: [
      { title: "Lashes", items: ["Lash lift", "Lash tint", "Korean lash lift + tint"] },
      { title: "Brows", items: ["Brow tint", "Brow tint + shaping", "Brow definition + tint"] },
    ],
  },
  scalp: {
    vi: [{ title: "Chăm sóc da đầu & thư giãn", items: ["Gội đầu chăm sóc da đầu cơ bản", "Gội đầu thư giãn", "Gội đầu chăm sóc da đầu chuyên sâu", "Gội đầu & massage mặt chuyên sâu", "Gội đầu thư giãn cao cấp"] }],
    en: [{ title: "Scalp care & relaxation", items: ["Essential scalp cleansing", "Relaxing head wash", "Intensive scalp care", "Head wash & intensive facial massage", "Premium relaxing head spa"] }],
  },
  "hair-removal": {
    vi: [{ title: "Triệt lông theo vùng", items: ["Triệt vùng mặt", "Triệt vùng nách", "Triệt vùng tay", "Triệt vùng chân", "Triệt bikini", "Triệt full body"] }],
    en: [{ title: "Hair removal by area", items: ["Face", "Underarms", "Arms", "Legs", "Bikini", "Full body"] }],
  },
  waxing: {
    vi: [{ title: "Tẩy lông theo vùng", items: ["Tẩy lông mày", "Tẩy môi trên", "Tẩy theo vùng cơ thể"] }],
    en: [{ title: "Waxing by area", items: ["Brow waxing", "Upper-lip waxing", "Body-area waxing"] }],
  },
};

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function SeoHeader({ lang }: { lang: SeoLang }) {
  return <SiteHeader lang={lang} />;
}

export function SeoFooter({ lang }: { lang: SeoLang }) {
  const consultationHref = lang === "vi" ? "https://zalo.me/0703214868" : "https://wa.me/84703214868";
  const links = lang === "vi"
    ? [["/ve-hato-beauty/", "Về chúng tôi"], ["/dich-vu/", "Dịch vụ"], ["/kien-thuc/", "Kiến thức"], ["/ket-qua/", "Kết quả"]]
    : [["/en/about/", "About us"], ["/en/services/", "Services"], ["/en/journal/", "Journal"], ["/en/results/", "Results"]];
  return <footer className="site-footer inner-page-footer">
    <span className="footer-halo footer-halo-one" aria-hidden="true" /><span className="footer-halo footer-halo-two" aria-hidden="true" />
    <div className="footer-intro"><p>{lang === "vi" ? "hato Beauty · Không gian làm đẹp" : "hato Beauty · Beauty Studio"}</p><h2>{lang === "vi" ? "Hẹn gặp bạn trong một ngày gần nhất." : "We hope to see you very soon."}</h2></div>
    <div className="footer-brand"><Image src={mediaUrl("/brand/hato-logo-transparent-v3.png")} alt="hato Beauty" width={1016} height={638} /></div>
    <div className="footer-links"><h3>{lang === "vi" ? "Khám phá" : "Discover"}</h3>{links.map(([href, label], index) => <Link href={href} key={href}><span>0{index + 1}</span>{label}</Link>)}</div>
    <div className="footer-contact"><h3>{lang === "vi" ? "Hẹn cùng chúng tôi" : "Plan your visit"}</h3><ContactDetails lang={lang} compact /><a href={consultationHref} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Đặt lịch tư vấn" : "Book a consultation"}<IconArrow /></a></div>
    <div className="footer-bottom"><span>© 2026 hato Beauty</span><div><Link href={lang === "vi" ? "/" : "/en/"}>{lang === "vi" ? "Về đầu trang" : "Back to top"} ↑</Link><Link href={lang === "vi" ? "/chinh-sach-bien-tap/" : "/en/editorial-policy/"}>{lang === "vi" ? "Biên tập" : "Editorial"}</Link><Link href={lang === "vi" ? "/chinh-sach-bao-mat/" : "/en/privacy/"}>{lang === "vi" ? "Bảo mật" : "Privacy"}</Link></div></div>
  </footer>;
}

export function ServiceIndex({ lang }: { lang: SeoLang }) {
  const title = lang === "vi" ? "Dịch vụ chăm sóc tại hato Beauty" : "Care services at hato Beauty";

  return <div className="seo-page" lang={lang}><SeoHeader lang={lang} /><main className="index-page service-index-page">
    <header className="service-index-compact-intro"><div><p>{lang === "vi" ? <>DỊCH VỤ <span className="compact-hato-kicker">hato</span></> : <>SERVICES BY <span className="compact-hato-kicker">hato</span></>}</p><h1>{lang === "vi" ? <>Chăm sóc tại <span className="hato-heading-word">hato</span> Beauty</> : <>Care at <span className="hato-heading-word">hato</span> Beauty</>}</h1></div><p><span>{lang === "vi" ? "05 nhóm dịch vụ" : "05 service groups"}</span>{lang === "vi" ? "Chạm vào từng khung để xem chi tiết." : "Select a card to view the details."}<i aria-hidden="true">↓</i></p></header>
    <section className="index-grid service-index-grid" aria-label={title}>{primarySeoServices.map((service, index) => <Link className={`index-card index-card--${service.id}`} href={`${servicePath(service, lang)}#service-menu`} key={service.id}>
      <div className="index-card-image"><Image src={service.image} alt={service[lang].name} fill priority={index === 0} sizes="(max-width: 760px) 100vw, 50vw" /></div>
      <div className="index-card-copy"><span>{String(index + 1).padStart(2, "0")}{index === 0 && <small>{lang === "vi" ? "Đặc biệt" : "Signature"}</small>}</span><div className="service-card-title"><h2>{service[lang].name}</h2><p>{serviceCardTaglines[service.id]?.[lang]}</p></div></div>
    </Link>)}</section>
  </main><SeoFooter lang={lang} /></div>;
}

export function KnowledgeIndex({ lang }: { lang: SeoLang }) {
  const title = lang === "vi" ? "Kiến thức để chăm sóc nhẹ nhàng và đúng lúc" : "Knowledge for gentler, better-timed care";
  const intro = lang === "vi"
    ? "Thư viện bài viết từ đội ngũ biên tập hato Beauty, giúp bạn hiểu dịch vụ, chuẩn bị trước buổi hẹn và đặt kỳ vọng thực tế."
    : "Editorial guides from hato Beauty to help you understand each service, prepare well and set realistic expectations.";

  return <div className="seo-page" lang={lang}><SeoHeader lang={lang} /><main className="index-page knowledge-index">
    <header className="index-hero"><nav className="breadcrumbs" aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}><Link href={lang === "vi" ? "/" : "/en/"}>{lang === "vi" ? "Trang chủ" : "Home"}</Link><span>/</span><span>{lang === "vi" ? "Kiến thức" : "Journal"}</span></nav><p className="seo-eyebrow">{lang === "vi" ? "THƯ VIỆN HATO" : "HATO JOURNAL"}</p><h1>{title}</h1><p>{intro}</p></header>
    <section className="index-grid knowledge-index-grid" aria-label={title}>{journalTopics.map((topic, index) => {
      const service = topic.service;
      const articleTitle = lang === "vi" ? `${service.vi.name}: hướng dẫn chuẩn bị và chăm sóc` : `${service.en.name}: preparation and aftercare guide`;
      return <Link className="index-card journal-index-card" href={journalPath(service, lang)} key={topic.id}>
        <div className="index-card-image"><Image src={topic.image} alt={articleTitle} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="index-card-copy"><div><span>{String(index + 1).padStart(2, "0")}</span><small>{index % 2 === 0 ? (lang === "vi" ? "5 phút đọc" : "5 min read") : (lang === "vi" ? "4 phút đọc" : "4 min read")}</small></div><h2>{articleTitle}</h2><p>{service[lang].description}</p><strong>{lang === "vi" ? "Đọc bài viết" : "Read article"} <IconArrow /></strong></div>
      </Link>;
    })}</section>
  </main><SeoFooter lang={lang} /></div>;
}

export function ServiceLanding({ service, lang }: { service: SeoService; lang: SeoLang }) {
  const c = service[lang];
  const [price, duration] = facts[service.id][lang];
  const detailGroups = serviceDetailMenus[service.id]?.[lang] ?? [];
  const serviceNumber = serviceNumbers[service.id];
  const path = servicePath(service, lang);
  const pairedPath = servicePath(service, lang === "vi" ? "en" : "vi");
  const consultationHref = lang === "vi" ? "https://zalo.me/0703214868" : "https://wa.me/84703214868";
  const faqs = [...c.faq, ...serviceIntentFaqs[service.id][lang]];
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${siteUrl}${path}#webpage`, url: `${siteUrl}${path}`, name: c.title, inLanguage: lang === "vi" ? "vi-VN" : "en", isPartOf: { "@id": `${siteUrl}/#website` } },
      { "@type": "Service", "@id": `${siteUrl}${path}#service`, name: c.name, description: c.description, image: service.image, areaServed: { "@type": "City", name: "Da Nang" }, provider: { "@id": `${siteUrl}/#organization` }, offers: { "@type": "Offer", priceCurrency: "VND", description: `${price} · ${duration}`, url: `${siteUrl}${path}` } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "vi" ? "Trang chủ" : "Home", item: `${siteUrl}${lang === "vi" ? "/" : "/en/"}` },
        { "@type": "ListItem", position: 2, name: lang === "vi" ? "Dịch vụ" : "Services", item: `${siteUrl}${lang === "vi" ? "/dich-vu/" : "/en/services/"}` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${siteUrl}${path}` },
      ] },
      { "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };
  return <div className="seo-page" lang={lang}><JsonLd data={schema} /><SeoHeader lang={lang} />
    <main>
      {detailGroups.length > 0 && <section className={`service-detail-menu service-detail-menu--${service.id}`} id="service-menu">
        <header className="service-detail-menu-heading"><div className="service-detail-menu-label"><span>{serviceNumber}</span><p>{lang === "vi" ? "DANH MỤC DỊCH VỤ" : "SERVICE MENU"}</p></div><div className="service-detail-menu-summary"><h1>{c.name}</h1><p>{c.description}</p><div className="service-menu-facts"><span><small>{lang === "vi" ? "Thời gian dự kiến" : "Estimated time"}</small><strong>{duration}</strong></span><span><small>{lang === "vi" ? "Khoảng giá tham khảo" : "Guide price"}</small><strong>{price}</strong></span></div><a href={consultationHref} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Đặt lịch tư vấn" : "Book a consultation"}<IconArrow /></a></div></header>
        <div className={`service-detail-groups ${detailGroups.length === 1 ? "single" : ""}`}>{detailGroups.map((group, groupIndex) => <article key={group.title}>
          <div className="service-detail-group-title"><span>{serviceNumber}.{groupIndex + 1}</span><h3>{group.title}</h3></div>
          <ol>{group.items.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol>
        </article>)}</div>
      </section>}
      <section className="seo-content service-answer-panel" aria-labelledby="service-answer-title">
        <p className="seo-eyebrow">{lang === "vi" ? "CÂU TRẢ LỜI NHANH" : "QUICK ANSWER"}</p>
        {detailGroups.length === 0
          ? <h1 id="service-answer-title">{lang === "vi" ? `${c.name} phù hợp khi nào?` : `When is ${c.name} a good fit?`}</h1>
          : <h2 id="service-answer-title">{lang === "vi" ? `${c.name} phù hợp khi nào?` : `When is ${c.name} a good fit?`}</h2>}
        <p className="seo-answer">{c.answer}</p>
        <p>{c.expectations}</p>
      </section>
      <section className="seo-content service-care-grid">
        <article className="service-care-card"><span>01</span><h2>{lang === "vi" ? "Phù hợp với bạn khi" : "A good fit when"}</h2><p>{c.suitable}</p></article>
        <article className="service-care-card"><span>02</span><h2>{lang === "vi" ? "Trước buổi hẹn" : "Before your visit"}</h2><ul>{c.preparation.map(x => <li key={x}>{x}</li>)}</ul></article>
        <article className="service-care-card"><span>03</span><h2>{lang === "vi" ? "Sau buổi chăm sóc" : "Aftercare"}</h2><ul>{c.aftercare.map(x => <li key={x}>{x}</li>)}</ul></article>
        <aside className="service-care-card service-care-note"><span>04</span><h2>{lang === "vi" ? "Lưu ý nhẹ nhàng" : "A gentle safety note"}</h2><p>{c.caution}</p></aside>
      </section>
      <section className="seo-faq"><p className="seo-eyebrow">FAQ</p><h2>{lang === "vi" ? "Câu hỏi thường gặp" : "Frequently asked questions"}</h2>{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
      <section className="seo-related"><h2>{lang === "vi" ? "Khám phá thêm" : "Explore more"}</h2><div>{primarySeoServices.filter(x => x.id !== service.id).map(x => <Link href={servicePath(x, lang)} key={x.id}>{x[lang].name}<IconArrow /></Link>)}</div><p><Link href={journalPath(service, lang)}>{lang === "vi" ? "Đọc kiến thức liên quan" : "Read the related care guide"} →</Link> · <Link href={pairedPath} hrefLang={lang === "vi" ? "en" : "vi-VN"}>{lang === "vi" ? "Read in English" : "Đọc tiếng Việt"}</Link></p></section>
    </main><SeoFooter lang={lang} /></div>;
}

export function JournalLanding({ service, lang }: { service: SeoService; lang: SeoLang }) {
  const c = service[lang]; const path = journalPath(service, lang);
  const title = lang === "vi" ? `${c.name}: hướng dẫn chuẩn bị và chăm sóc` : `${c.name}: preparation and aftercare guide`;
  const faqs = journalIntentFaqs[service.id][lang];
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: title, description: c.description, image: service.image, dateModified: "2026-08-21", inLanguage: lang === "vi" ? "vi-VN" : "en", author: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, mainEntityOfPage: `${siteUrl}${path}` };
  return <div className="seo-page" lang={lang}><JsonLd data={schema} /><SeoHeader lang={lang} /><main className="seo-article journal-article">
    <nav className="breadcrumbs" aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}><Link href={lang === "vi" ? "/" : "/en/"}>{lang === "vi" ? "Trang chủ" : "Home"}</Link><span>/</span><Link href={lang === "vi" ? "/kien-thuc/" : "/en/journal/"}>{lang === "vi" ? "Kiến thức" : "Journal"}</Link><span>/</span><span>{c.name}</span></nav>
    <div className="article-tags"><span>{c.name}</span><span>{lang === "vi" ? "Hướng dẫn thực tế" : "Practical guide"}</span></div>
    <h1>{title}</h1><p className="seo-answer">{c.answer}</p>
    <div className="article-meta"><span className="article-avatar" aria-hidden="true">HB</span><p><strong>{lang === "vi" ? "Ban biên tập hato Beauty" : "hato Beauty editorial team"}</strong><small>{lang === "vi" ? "Chăm sóc & trải nghiệm · Cập nhật 18/08/2026 · 5 phút đọc" : "Care & experience · Updated 18 Aug 2026 · 5 min read"}</small></p></div>
    <Image src={service.image} alt={c.name} width={1400} height={900} priority />
    <article className="seo-article-body">
      <p className="article-lead">{c.description}</p>
      <h2>{lang === "vi" ? `Hiểu đúng về ${c.name.toLocaleLowerCase("vi")}` : `Understanding ${c.name}`}</h2><p>{c.answer}</p>
      <blockquote>{lang === "vi" ? "Một lựa chọn phù hợp bắt đầu từ việc hiểu tình trạng hiện tại, mục tiêu thật sự và giới hạn an toàn của chính mình." : "A suitable choice begins with understanding your current condition, real goals and personal safety limits."}</blockquote>
      <h2>{lang === "vi" ? "Ai nên cân nhắc?" : "Who may consider it?"}</h2><p>{c.suitable}</p>
      <h2>{lang === "vi" ? "Cần chuẩn bị gì trước buổi hẹn?" : "How should you prepare?"}</h2><ol>{c.preparation.map(x => <li key={x}>{x}</li>)}</ol>
      <h2>{lang === "vi" ? "Chăm sóc sau buổi thực hiện" : "Aftercare"}</h2><ul>{c.aftercare.map(x => <li key={x}>{x}</li>)}</ul>
      <h2>{lang === "vi" ? "An toàn và kỳ vọng thực tế" : "Safety and realistic expectations"}</h2><p>{c.caution}</p><p>{c.expectations}</p>
      <section className="article-faq"><h2>{lang === "vi" ? "Câu hỏi thường gặp" : "Frequently asked questions"}</h2>{faqs.map(([question, answer]) => <div key={question}><h3>{question}</h3><p>{answer}</p></div>)}</section>
      {service.id === "hair-removal" && <p className="seo-source">{lang === "vi" ? "Nguồn tham khảo y khoa:" : "Medical reference:"} <a href="https://www.aad.org/public/cosmetic/hair-removal/laser-hair-removal-preparation" rel="noopener noreferrer">American Academy of Dermatology</a>.</p>}
      <div className="article-next"><Link className="seo-cta" href={servicePath(service, lang)}>{lang === "vi" ? "Xem dịch vụ liên quan" : "View related service"} <IconArrow /></Link><Link href={lang === "vi" ? "/kien-thuc/" : "/en/journal/"}>{lang === "vi" ? "Xem tất cả bài viết" : "View all articles"}</Link></div>
    </article>
  </main><SeoFooter lang={lang} /></div>;
}

export function TrustPage({ lang, kind }: { lang: SeoLang; kind: "about" | "contact" | "prices" | "book" | "privacy" | "editorial" }) {
  const data = {
    vi: {
      about: ["Về hato Beauty", "hato Beauty xây dựng trải nghiệm chăm sóc dựa trên lắng nghe, thông tin rõ ràng và kỳ vọng thực tế. Năm nhóm dịch vụ gồm Chăm sóc da, Mi & Mày, Chăm sóc da đầu & Thư giãn, Triệt lông và Tẩy lông."],
      contact: ["Liên hệ hato Beauty", "Gửi yêu cầu đặt lịch để đội ngũ liên hệ, trao đổi nhu cầu và xác nhận thông tin địa điểm, thời gian phù hợp trước buổi hẹn."],
      prices: ["Bảng giá tham khảo", "Giá cuối cùng phụ thuộc vùng thực hiện, thời lượng và lựa chọn được xác nhận sau tư vấn. Mỗi trang dịch vụ hiển thị khoảng giá để bạn chủ động dự trù."],
      book: ["Đặt lịch tư vấn", "Chọn dịch vụ phù hợp trên trang chủ và gửi biểu mẫu. hato sẽ liên hệ để lắng nghe nhu cầu, xác nhận thời gian và các lưu ý trước buổi hẹn."],
      privacy: ["Chính sách bảo mật", "Thông tin bạn gửi qua biểu mẫu chỉ được dùng để tư vấn, xác nhận lịch và hỗ trợ liên quan đến yêu cầu của bạn. hato không công khai dữ liệu liên hệ của khách hàng."],
      editorial: ["Chính sách biên tập", "Nội dung kiến thức nhằm giúp khách hiểu dịch vụ thẩm mỹ, không thay thế tư vấn y khoa. Các tuyên bố kỹ thuật hoặc sức khỏe được diễn đạt thận trọng và dẫn nguồn khi cần."],
    },
    en: {
      about: ["About hato Beauty", "hato Beauty shapes care around listening, clear information and realistic expectations across Skin, Brow & Lash, Head Spa, Hair Removal and Waxing."],
      contact: ["Contact hato Beauty", "Send a booking request so the team can discuss your needs and confirm the location and a suitable time before your visit."],
      prices: ["Guide prices", "Final pricing depends on the area, duration and options confirmed after consultation. Each service page provides a range for planning."],
      book: ["Book a consultation", "Choose a service on the home page and send the form. hato will contact you to discuss your needs, timing and preparation."],
      privacy: ["Privacy policy", "Details sent through the form are used only to discuss and confirm your appointment and support your request. hato does not publish guest contact details."],
      editorial: ["Editorial policy", "Journal content helps guests understand cosmetic care and does not replace medical advice. Technical or health claims are phrased carefully and sourced when needed."],
    },
  }[lang][kind];
  return <div className="seo-page" lang={lang}><SeoHeader lang={lang} /><main className={`seo-trust ${kind === "book" ? "booking-page" : ""}${kind === "contact" ? " contact-page" : ""}`}>{kind === "contact" ? <header className="contact-page-intro"><span className="contact-orbit contact-orbit-one" aria-hidden="true" /><span className="contact-orbit contact-orbit-two" aria-hidden="true" /><h1>{data[0]}</h1><p className="seo-answer">{data[1]}</p></header> : <><p className="seo-eyebrow">hato Beauty</p><h1>{data[0]}</h1><p className="seo-answer">{data[1]}</p></>}{kind === "book" ? <BookingForm lang={lang} /> : kind === "contact" ? <><div className="contact-page-panel"><div className="contact-page-info"><ContactDetails lang={lang} /></div><ContactForm lang={lang} /></div><div className="contact-page-map"><ContactMap lang={lang} /></div></> : <div className="seo-related"><h2>{lang === "vi" ? "Bắt đầu từ dịch vụ phù hợp" : "Start with the right service"}</h2><div>{primarySeoServices.map(s => <Link href={servicePath(s, lang)} key={s.id}>{s[lang].name}<IconArrow /></Link>)}</div></div>}</main><SeoFooter lang={lang} /></div>;
}

export function ResultsIndex({ lang, results }: { lang: SeoLang; results: ResultContent[] }) {
  const title = lang === "vi" ? "Kết quả khách hàng" : "Client results";
  const intro = lang === "vi"
    ? "Hình ảnh trước và sau được chia sẻ với sự đồng ý của khách. Kết quả thực tế phụ thuộc vào tình trạng ban đầu và liệu trình riêng."
    : "Before-and-after images shared with guest consent. Individual results vary with starting point and personal care plan.";
  const serviceLinks = [seoServices[0], seoServices[3], seoServices[2]] as const;

  return <div className="seo-page results-page" lang={lang}><SeoHeader lang={lang} /><main className="index-page">
    <header className="index-hero">
      <nav className="breadcrumbs" aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}><Link href={lang === "vi" ? "/" : "/en/"}>{lang === "vi" ? "Trang chủ" : "Home"}</Link><span>/</span><span>{title}</span></nav>
      <p className="seo-eyebrow">{lang === "vi" ? "TRƯỚC & SAU" : "BEFORE & AFTER"}</p>
      <h1>{title}</h1>
      <p>{intro}</p>
    </header>
    <section className="result-grid" aria-label={title}>
      {results.map((result, index) => {
        const service = serviceLinks[index] ?? seoServices[0];
        return <Link href={servicePath(service, lang)} key={result.vi[0]}>
          <div className="result-image"><Image src={result.image} alt={result[lang][0]} fill sizes="(max-width: 720px) 100vw, 33vw" /><div className="comparison-labels"><span>{lang === "vi" ? "Trước" : "Before"}</span><span>{lang === "vi" ? "Sau" : "After"}</span></div></div>
          <div className="result-copy"><h3>{result[lang][0]}</h3><p>{result[lang][1]}</p><span className="result-link-label">{lang === "vi" ? "Xem dịch vụ" : "View service"} <IconArrow /></span></div>
        </Link>;
      })}
    </section>
  </main><SeoFooter lang={lang} /></div>;
}
