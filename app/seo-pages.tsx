import Image from "next/image";
import Link from "next/link";

import { journalPath, seoServices, servicePath, siteUrl, type SeoLang, type SeoService } from "./seo-data";

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
      <Link href={servicePath(seoServices[0], lang)}>{lang === "vi" ? "Dịch vụ" : "Services"}</Link>
      <Link href={journalPath(seoServices[0], lang)}>{lang === "vi" ? "Kiến thức" : "Journal"}</Link>
      <Link href={lang === "vi" ? "/ve-hato-beauty/" : "/en/about/"}>{lang === "vi" ? "Về hato" : "About"}</Link>
      <Link href={lang === "vi" ? "/lien-he/" : "/en/contact/"}>{lang === "vi" ? "Liên hệ" : "Contact"}</Link>
    </nav>
    <Link className="seo-lang" href={other === "vi" ? "/" : "/en/"} hrefLang={other === "vi" ? "vi-VN" : "en"}>{other.toUpperCase()}</Link>
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
  return <div className="seo-page"><JsonLd data={schema} /><SeoHeader lang={lang} />
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
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: title, description: c.description, image: `${siteUrl}${service.image}`, dateModified: "2026-08-17", inLanguage: lang === "vi" ? "vi-VN" : "en", author: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, mainEntityOfPage: `${siteUrl}${path}` };
  return <div className="seo-page"><JsonLd data={schema} /><SeoHeader lang={lang} /><main className="seo-article"><p className="seo-eyebrow">{lang === "vi" ? "GÓC KIẾN THỨC" : "JOURNAL"}</p><h1>{title}</h1><p className="seo-answer">{c.answer}</p><Image src={service.image} alt={c.name} width={1400} height={900} priority /><div className="seo-article-body"><h2>{lang === "vi" ? "Ai nên cân nhắc?" : "Who may consider it?"}</h2><p>{c.suitable}</p><h2>{lang === "vi" ? "Cần chuẩn bị gì?" : "How should you prepare?"}</h2><ul>{c.preparation.map(x => <li key={x}>{x}</li>)}</ul><h2>{lang === "vi" ? "Chăm sóc sau đó" : "Aftercare"}</h2><ul>{c.aftercare.map(x => <li key={x}>{x}</li>)}</ul><h2>{lang === "vi" ? "Điều cần lưu ý" : "What to keep in mind"}</h2><p>{c.caution}</p><p>{c.expectations}</p>{service.id === "hair-removal" && <p className="seo-source">{lang === "vi" ? "Nguồn tham khảo y khoa:" : "Medical reference:"} <a href="https://www.aad.org/public/cosmetic/hair-removal/laser-hair-removal-preparation" rel="noopener noreferrer">American Academy of Dermatology</a>.</p>}<p><Link className="seo-cta" href={servicePath(service, lang)}>{lang === "vi" ? "Xem dịch vụ" : "View service"} ↗</Link></p></div></main><SeoFooter lang={lang} /></div>;
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
  return <div className="seo-page"><SeoHeader lang={lang} /><main className="seo-trust"><p className="seo-eyebrow">hato Beauty</p><h1>{data[0]}</h1><p className="seo-answer">{data[1]}</p><div className="seo-related"><h2>{lang === "vi" ? "Bắt đầu từ dịch vụ phù hợp" : "Start with the right service"}</h2><div>{seoServices.map(s => <Link href={servicePath(s, lang)} key={s.id}>{s[lang].name}<span>↗</span></Link>)}</div></div></main><SeoFooter lang={lang} /></div>;
}
