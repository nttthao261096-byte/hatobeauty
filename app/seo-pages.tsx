import Image from "next/image";
import Link from "next/link";

import { BookingForm } from "./BookingForm";
import { journalPath, journalTopics, seoServices, servicePath, siteUrl, type SeoLang, type SeoService } from "./seo-data";

const facts: Record<SeoService["id"], { vi: [string, string]; en: [string, string] }> = {
  skin: { vi: ["450.000 – 1.200.000đ", "60 – 90 phút"], en: ["VND 450,000 – 1,200,000", "60 – 90 minutes"] },
  scalp: { vi: ["180.000 – 450.000đ", "45 – 75 phút"], en: ["VND 180,000 – 450,000", "45 – 75 minutes"] },
  body: { vi: ["350.000 – 850.000đ", "60 – 90 phút"], en: ["VND 350,000 – 850,000", "60 – 90 minutes"] },
  "brow-lash": { vi: ["250.000 – 750.000đ", "45 – 90 phút"], en: ["VND 250,000 – 750,000", "45 – 90 minutes"] },
  "hair-removal": { vi: ["250.000 – 1.500.000đ/vùng", "20 – 60 phút"], en: ["VND 250,000 – 1,500,000/area", "20 – 60 minutes"] },
};

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function SeoHeader({ lang }: { lang: SeoLang }) {
  const other = lang === "vi" ? "en" : "vi";
  return <header className="seo-header">
    <Link className="seo-brand" href={lang === "vi" ? "/" : "/en/"}>hato <span>BEAUTY</span></Link>
    <nav aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}>
      <Link href={lang === "vi" ? "/ve-hato-beauty/" : "/en/about/"}>{lang === "vi" ? "Về hato" : "About"}</Link>
      <Link href={lang === "vi" ? "/dich-vu/" : "/en/services/"}>{lang === "vi" ? "Dịch vụ" : "Services"}</Link>
      <Link href={lang === "vi" ? "/kien-thuc/" : "/en/journal/"}>{lang === "vi" ? "Kiến thức" : "Journal"}</Link>
      <Link href={lang === "vi" ? "/bang-gia/" : "/en/prices/"}>{lang === "vi" ? "Bảng giá" : "Prices"}</Link>
      <Link href={lang === "vi" ? "/lien-he/" : "/en/contact/"}>{lang === "vi" ? "Liên hệ" : "Contact"}</Link>
    </nav>
    <div className="seo-header-actions"><Link className="seo-lang" href={other === "vi" ? "/" : "/en/"} hrefLang={other === "vi" ? "vi-VN" : "en"}>{other.toUpperCase()}</Link><Link className="seo-book-link" href={lang === "vi" ? "/dat-lich/" : "/en/book/"}>{lang === "vi" ? "Đặt lịch" : "Book now"}<span>↗</span></Link></div>
  </header>;
}

export function SeoFooter({ lang }: { lang: SeoLang }) {
  return <footer className="seo-footer">
    <div><strong>hato Beauty</strong><p>{lang === "vi" ? "SHINE AS YOU ARE · Chăm sóc thẩm mỹ tại Đà Nẵng" : "SHINE AS YOU ARE · Beauty care in Da Nang"}</p></div>
    <nav aria-label={lang === "vi" ? "Liên kết chân trang" : "Footer links"}>
      <Link href={lang === "vi" ? "/dat-lich/" : "/en/book/"}>{lang === "vi" ? "Đặt lịch" : "Book"}</Link>
      <Link href={lang === "vi" ? "/bang-gia/" : "/en/prices/"}>{lang === "vi" ? "Bảng giá" : "Prices"}</Link>
      <Link href="/chinh-sach-bao-mat/">{lang === "vi" ? "Bảo mật" : "Privacy"}</Link>
    </nav>
  </footer>;
}

export function ServiceIndex({ lang }: { lang: SeoLang }) {
  const title = lang === "vi" ? "Dịch vụ chăm sóc tại hato Beauty" : "Care services at hato Beauty";
  const intro = lang === "vi"
    ? "Năm nhóm dịch vụ được xây dựng như năm hành trình riêng. Chạm hoặc trỏ vào từng thẻ để mở trang thông tin đầy đủ về quy trình, mức giá, chuẩn bị và chăm sóc sau buổi hẹn."
    : "Five care categories, each with its own complete page covering the experience, guide price, preparation and aftercare.";

  return <div className="seo-page" lang={lang}><SeoHeader lang={lang} /><main className="index-page">
    <header className="index-hero"><p className="seo-eyebrow">{lang === "vi" ? "KHÁM PHÁ DỊCH VỤ" : "EXPLORE SERVICES"}</p><h1>{title}</h1><p>{intro}</p></header>
    <section className="index-grid service-index-grid" aria-label={title}>{seoServices.map((service, index) => <Link className="index-card" href={servicePath(service, lang)} key={service.id}>
      <div className="index-card-image"><Image src={service.image} alt={service[lang].name} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      <div className="index-card-copy"><span>{String(index + 1).padStart(2, "0")}</span><p>{service[lang].description}</p><h2>{service[lang].name}</h2><strong>{lang === "vi" ? "Xem dịch vụ" : "View service"} ↗</strong></div>
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
        <div className="index-card-copy"><div><span>{String(index + 1).padStart(2, "0")}</span><small>{index % 2 === 0 ? (lang === "vi" ? "5 phút đọc" : "5 min read") : (lang === "vi" ? "4 phút đọc" : "4 min read")}</small></div><h2>{articleTitle}</h2><p>{service[lang].description}</p><strong>{lang === "vi" ? "Đọc bài viết" : "Read article"} ↗</strong></div>
      </Link>;
    })}</section>
  </main><SeoFooter lang={lang} /></div>;
}

export function ServiceLanding({ service, lang }: { service: SeoService; lang: SeoLang }) {
  const c = service[lang];
  const [price, duration] = facts[service.id][lang];
  const path = servicePath(service, lang);
  const pairedPath = servicePath(service, lang === "vi" ? "en" : "vi");
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${siteUrl}${path}#webpage`, url: `${siteUrl}${path}`, name: c.title, inLanguage: lang === "vi" ? "vi-VN" : "en", isPartOf: { "@id": `${siteUrl}/#website` } },
      { "@type": "Service", "@id": `${siteUrl}${path}#service`, name: c.name, description: c.description, image: `${siteUrl}${service.image}`, areaServed: { "@type": "City", name: "Da Nang" }, provider: { "@id": `${siteUrl}/#organization` }, offers: { "@type": "Offer", priceCurrency: "VND", description: `${price} · ${duration}`, url: `${siteUrl}${path}` } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "vi" ? "Trang chủ" : "Home", item: `${siteUrl}${lang === "vi" ? "/" : "/en/"}` },
        { "@type": "ListItem", position: 2, name: lang === "vi" ? "Dịch vụ" : "Services" },
        { "@type": "ListItem", position: 3, name: c.name, item: `${siteUrl}${path}` },
      ] },
      { "@type": "FAQPage", mainEntity: c.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };
  return <div className="seo-page" lang={lang}><JsonLd data={schema} /><SeoHeader lang={lang} />
    <main>
      <section className="seo-hero"><div><p className="seo-eyebrow">{lang === "vi" ? "DỊCH VỤ · ĐÀ NẴNG" : "SERVICE · DA NANG"}</p><h1>{c.title}</h1><p className="seo-answer">{c.answer}</p><div className="seo-facts"><span><small>{lang === "vi" ? "Giá tham khảo" : "Guide price"}</small>{price}</span><span><small>{lang === "vi" ? "Thời lượng" : "Duration"}</small>{duration}</span></div><Link className="seo-cta" href={lang === "vi" ? "/dat-lich/" : "/en/book/"}>{lang === "vi" ? "Đặt lịch tư vấn" : "Book a consultation"} ↗</Link></div><div className="seo-hero-image"><Image src={service.image} alt={`${c.name} tại hato Beauty`} fill priority sizes="(max-width: 800px) 100vw, 45vw" /></div></section>
      <section className="seo-content"><article><h2>{lang === "vi" ? "Dịch vụ này phù hợp với ai?" : "Who is this service for?"}</h2><p>{c.suitable}</p><h2>{lang === "vi" ? "Trước buổi hẹn" : "Before your visit"}</h2><ul>{c.preparation.map(x => <li key={x}>{x}</li>)}</ul><h2>{lang === "vi" ? "Sau buổi chăm sóc" : "Aftercare"}</h2><ul>{c.aftercare.map(x => <li key={x}>{x}</li>)}</ul></article><aside><h2>{lang === "vi" ? "Lưu ý an toàn" : "Safety note"}</h2><p>{c.caution}</p><h2>{lang === "vi" ? "Kỳ vọng thực tế" : "Realistic expectations"}</h2><p>{c.expectations}</p></aside></section>
      <section className="seo-faq"><p className="seo-eyebrow">FAQ</p><h2>{lang === "vi" ? "Câu hỏi thường gặp" : "Frequently asked questions"}</h2>{c.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
      <section className="seo-related"><h2>{lang === "vi" ? "Khám phá thêm" : "Explore more"}</h2><div>{seoServices.filter(x => x.id !== service.id).map(x => <Link href={servicePath(x, lang)} key={x.id}>{x[lang].name}<span>↗</span></Link>)}</div><p><Link href={journalPath(service, lang)}>{lang === "vi" ? "Đọc kiến thức liên quan" : "Read the related care guide"} →</Link> · <Link href={pairedPath} hrefLang={lang === "vi" ? "en" : "vi-VN"}>{lang === "vi" ? "Read in English" : "Đọc tiếng Việt"}</Link></p></section>
    </main><SeoFooter lang={lang} /></div>;
}

export function JournalLanding({ service, lang }: { service: SeoService; lang: SeoLang }) {
  const c = service[lang]; const path = journalPath(service, lang);
  const title = lang === "vi" ? `${c.name}: hướng dẫn chuẩn bị và chăm sóc` : `${c.name}: preparation and aftercare guide`;
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: title, description: c.description, image: `${siteUrl}${service.image}`, dateModified: "2026-08-18", inLanguage: lang === "vi" ? "vi-VN" : "en", author: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, mainEntityOfPage: `${siteUrl}${path}` };
  return <div className="seo-page" lang={lang}><JsonLd data={schema} /><SeoHeader lang={lang} /><main className="seo-article">
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
      <section className="article-faq"><h2>{lang === "vi" ? "Câu hỏi thường gặp" : "Frequently asked questions"}</h2>{c.faq.map(([question, answer]) => <div key={question}><h3>{question}</h3><p>{answer}</p></div>)}</section>
      {service.id === "hair-removal" && <p className="seo-source">{lang === "vi" ? "Nguồn tham khảo y khoa:" : "Medical reference:"} <a href="https://www.aad.org/public/cosmetic/hair-removal/laser-hair-removal-preparation" rel="noopener noreferrer">American Academy of Dermatology</a>.</p>}
      <div className="article-next"><Link className="seo-cta" href={servicePath(service, lang)}>{lang === "vi" ? "Xem dịch vụ liên quan" : "View related service"} ↗</Link><Link href={lang === "vi" ? "/kien-thuc/" : "/en/journal/"}>{lang === "vi" ? "Xem tất cả bài viết" : "View all articles"} →</Link></div>
    </article>
  </main><SeoFooter lang={lang} /></div>;
}

export function TrustPage({ lang, kind }: { lang: SeoLang; kind: "about" | "contact" | "prices" | "book" | "privacy" | "editorial" }) {
  const data = {
    vi: {
      about: ["Về hato Beauty", "hato Beauty xây dựng trải nghiệm chăm sóc dựa trên lắng nghe, thông tin rõ ràng và kỳ vọng thực tế. Năm nhóm dịch vụ gồm Skin, Head Spa, Body, Brow & Lash và Hair Removal."],
      contact: ["Liên hệ hato Beauty", "Gửi yêu cầu đặt lịch để đội ngũ liên hệ, trao đổi nhu cầu và xác nhận thông tin địa điểm, thời gian phù hợp trước buổi hẹn."],
      prices: ["Bảng giá tham khảo", "Giá cuối cùng phụ thuộc vùng thực hiện, thời lượng và lựa chọn được xác nhận sau tư vấn. Mỗi trang dịch vụ hiển thị khoảng giá để bạn chủ động dự trù."],
      book: ["Đặt lịch tư vấn", "Chọn dịch vụ phù hợp trên trang chủ và gửi biểu mẫu. hato sẽ liên hệ để lắng nghe nhu cầu, xác nhận thời gian và các lưu ý trước buổi hẹn."],
      privacy: ["Chính sách bảo mật", "Thông tin bạn gửi qua biểu mẫu chỉ được dùng để tư vấn, xác nhận lịch và hỗ trợ liên quan đến yêu cầu của bạn. hato không công khai dữ liệu liên hệ của khách hàng."],
      editorial: ["Chính sách biên tập", "Nội dung kiến thức nhằm giúp khách hiểu dịch vụ thẩm mỹ, không thay thế tư vấn y khoa. Các tuyên bố kỹ thuật hoặc sức khỏe được diễn đạt thận trọng và dẫn nguồn khi cần."],
    },
    en: {
      about: ["About hato Beauty", "hato Beauty shapes care around listening, clear information and realistic expectations across Skin, Head Spa, Body, Brow & Lash and Hair Removal."],
      contact: ["Contact hato Beauty", "Send a booking request so the team can discuss your needs and confirm the location and a suitable time before your visit."],
      prices: ["Guide prices", "Final pricing depends on the area, duration and options confirmed after consultation. Each service page provides a range for planning."],
      book: ["Book a consultation", "Choose a service on the home page and send the form. hato will contact you to discuss your needs, timing and preparation."],
      privacy: ["Privacy policy", "Details sent through the form are used only to discuss and confirm your appointment and support your request. hato does not publish guest contact details."],
      editorial: ["Editorial policy", "Journal content helps guests understand cosmetic care and does not replace medical advice. Technical or health claims are phrased carefully and sourced when needed."],
    },
  }[lang][kind];
  return <div className="seo-page" lang={lang}><SeoHeader lang={lang} /><main className={`seo-trust ${kind === "book" ? "booking-page" : ""}`}><p className="seo-eyebrow">hato Beauty</p><h1>{data[0]}</h1><p className="seo-answer">{data[1]}</p>{kind === "book" ? <BookingForm lang={lang} /> : <div className="seo-related"><h2>{lang === "vi" ? "Bắt đầu từ dịch vụ phù hợp" : "Start with the right service"}</h2><div>{seoServices.map(s => <Link href={servicePath(s, lang)} key={s.id}>{s[lang].name}<span>↗</span></Link>)}</div></div>}</main><SeoFooter lang={lang} /></div>;
}
