import { articlePath, loadPublishedArticles } from "./journal-content";
import Image from "./OptimizedImage";
import Link from "next/link";
import { journalGuidance } from "./journal-guidance";

import { BookingForm } from "./BookingForm";
import { ContactForm } from "./ContactForm";
import { ContactDetails, ContactMap } from "./ContactDetails";
import type { ResultContent } from "./content";
import { IconArrow } from "./icons";
import {
  journalPath,
  journalTopics,
  primarySeoServices,
  seoServices,
  servicePath,
  siteUrl,
  type SeoLang,
  type SeoService,
} from "./seo-data";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { bookingPath, type LanguagePaths } from "./route-paths";
import {
  approvedServiceOptions,
  commercialNotice,
  isBusinessDataApproved,
  serviceFacts,
} from "./business-data";
import {
  journalTitle,
  journalDescription,
  journalReadingTime,
} from "./journal-copy";
import { ServicePriceTable } from "./ServicePriceTable";

import { journalIntentFaqs, serviceIntentFaqs } from "./seo-faq-data";

type ServiceDetailGroup = { title: string; items: string[] };

type ServiceExperienceCopy = { introKicker: string; answerKicker: string };

const serviceExperienceCopy: Partial<
  Record<SeoService["id"], Record<SeoLang, ServiceExperienceCopy>>
> = {
  "brow-lash": {
    vi: {
      introKicker: "Tôn đường nét tự nhiên",
      answerKicker: "Cân đối theo gương mặt",
    },
    en: {
      introKicker: "Natural definition",
      answerKicker: "Balanced for your features",
    },
  },
  scalp: {
    vi: {
      introKicker: "Thả lỏng từ da đầu",
      answerKicker: "Một khoảng nghỉ nhẹ nhàng",
    },
    en: {
      introKicker: "Unwind from the scalp",
      answerKicker: "A gentler pause",
    },
  },
  "hair-removal": {
    vi: {
      introKicker: "Lộ trình theo từng vùng",
      answerKicker: "Đều đặn và rõ ràng",
    },
    en: {
      introKicker: "A plan for each area",
      answerKicker: "Consistent and considered",
    },
  },
  waxing: {
    vi: {
      introKicker: "Nhanh gọn theo vùng",
      answerKicker: "Êm dịu cho bề mặt da",
    },
    en: {
      introKicker: "Efficient area care",
      answerKicker: "A softer skin finish",
    },
  },
};

const serviceCardTaglines: Partial<
  Record<SeoService["id"], Record<SeoLang, string>>
> = {
  skin: {
    vi: "Chăm sóc da mặt và cơ thể với liệu trình làm sạch, phục hồi theo nhu cầu riêng.",
    en: "Face and body care with cleansing and recovery tailored to individual needs.",
  },
  "brow-lash": {
    vi: "Uốn, nhuộm và định hình mi mày hài hòa, giúp đường nét gương mặt tự nhiên hơn.",
    en: "Lifting, tinting and shaping for naturally balanced lashes, brows and facial features.",
  },
  scalp: {
    vi: "Làm sạch da đầu kết hợp massage thư giãn, giúp cơ thể thả lỏng nhẹ nhàng.",
    en: "Scalp cleansing with relaxing massage to help the body gently unwind.",
  },
  "hair-removal": {
    vi: "Giảm lông theo từng vùng với lộ trình phù hợp tình trạng da và nhu cầu cá nhân.",
    en: "Area-focused hair reduction with a plan suited to skin condition and personal needs.",
  },
  waxing: {
    vi: "Tẩy lông theo vùng nhanh gọn, kín đáo và chú trọng làm dịu bề mặt da.",
    en: "Efficient, discreet area waxing with thoughtful care to soothe the skin.",
  },
};

const serviceResultGalleries: Partial<
  Record<
    SeoService["id"],
    {
      image: string;
      vi: [string, string];
      en: [string, string];
      viExamples: [string, string][];
      enExamples: [string, string][];
    }
  >
> = {
  skin: {
    image: "/images/results-skin-gallery-v1.png",
    vi: [
      "Kết quả chăm sóc da tham khảo",
      "Ba ví dụ trước–sau về độ ẩm, bề mặt và vẻ tươi sáng của da.",
    ],
    en: [
      "Illustrative skin-care outcomes",
      "Three before-and-after examples covering hydration, texture and radiance.",
    ],
    viExamples: [
      ["Da dịu và đều màu hơn", "Sau trải nghiệm làm sạch và phục hồi"],
      ["Bề mặt da trông mịn hơn", "Sau liệu trình cấp ẩm phù hợp"],
      ["Da tươi sáng tự nhiên", "Sau chăm sóc theo tình trạng da"],
    ],
    enExamples: [
      ["Calmer, more even-looking skin", "After cleansing and recovery care"],
      ["A smoother-looking surface", "After suitable hydration care"],
      ["Naturally refreshed skin", "After condition-led skin care"],
    ],
  },
  "brow-lash": {
    image: "/images/results-brow-lash-gallery-v1.png",
    vi: [
      "Kết quả mi & chân mày tham khảo",
      "Ba ví dụ trước–sau về đường mày tự nhiên và độ cong mềm của mi.",
    ],
    en: [
      "Illustrative brow & lash outcomes",
      "Three before-and-after examples of natural brow definition and softly lifted lashes.",
    ],
    viExamples: [
      ["Chân mày cân đối hơn", "Sau tạo hình theo đường nét gương mặt"],
      ["Hàng mi cong mềm tự nhiên", "Sau uốn và dưỡng mi"],
      ["Đường mày gọn, thanh thoát", "Sau định hình và nhuộm nhẹ"],
    ],
    enExamples: [
      ["More balanced brows", "After face-led brow shaping"],
      ["Softly lifted natural lashes", "After lifting and conditioning"],
      ["A cleaner, lighter brow line", "After shaping and a soft tint"],
    ],
  },
  scalp: {
    image: "/images/results-scalp-gallery-v1.png",
    vi: [
      "Kết quả chăm sóc da đầu tham khảo",
      "Ba ví dụ trước–sau về chân tóc sạch thoáng và diện mạo thư giãn hơn.",
    ],
    en: [
      "Illustrative scalp-care outcomes",
      "Three before-and-after examples of fresher roots and a more relaxed finish.",
    ],
    viExamples: [
      ["Chân tóc sạch thoáng hơn", "Sau làm sạch da đầu nhẹ nhàng"],
      ["Mái tóc trông tơi hơn", "Sau chăm sóc da đầu chuyên sâu"],
      ["Diện mạo thư giãn, chỉn chu", "Sau nghi thức head spa"],
    ],
    enExamples: [
      ["Fresher-looking roots", "After gentle scalp cleansing"],
      ["Hair appears lighter and cleaner", "After focused scalp care"],
      ["A relaxed, polished finish", "After a head-spa ritual"],
    ],
  },
  "hair-removal": {
    image: "/images/results-hair-removal-gallery-v1.png",
    vi: [
      "Kết quả triệt lông tham khảo",
      "Ba ví dụ trước–sau theo vùng: nách, cẳng chân và cẳng tay.",
    ],
    en: [
      "Illustrative hair-removal outcomes",
      "Three before-and-after examples across underarm, lower-leg and forearm areas.",
    ],
    viExamples: [
      ["Vùng nách trông gọn mịn hơn", "Sau chăm sóc theo lộ trình riêng"],
      ["Cẳng chân thông thoáng hơn", "Sau triệt lông theo vùng"],
      ["Cẳng tay trông mịn màng", "Sau liệu trình phù hợp"],
    ],
    enExamples: [
      ["A smoother-looking underarm", "After a personal care plan"],
      ["Cleaner-looking lower legs", "After area-focused hair removal"],
      ["Smoother-looking forearms", "After a suitable treatment plan"],
    ],
  },
  waxing: {
    image: "/images/results-waxing-gallery-v1.png",
    vi: [
      "Kết quả waxing tham khảo",
      "Ba ví dụ trước–sau theo vùng: cẳng chân, cẳng tay và đường chân mày.",
    ],
    en: [
      "Illustrative waxing outcomes",
      "Three before-and-after examples across lower-leg, forearm and brow-line areas.",
    ],
    viExamples: [
      ["Cẳng chân gọn mịn hơn", "Sau waxing và làm dịu da"],
      ["Cẳng tay sạch thoáng", "Sau tẩy lông theo vùng"],
      ["Đường chân mày sắc nét hơn", "Sau waxing tạo hình nhẹ"],
    ],
    enExamples: [
      ["Smoother-looking lower legs", "After waxing and soothing care"],
      ["Cleaner-looking forearms", "After area waxing"],
      ["A neater brow line", "After gentle shaping wax"],
    ],
  },
};

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function PageBreadcrumb({
  lang,
  label,
  parent,
}: {
  lang: SeoLang;
  label: string;
  parent?: { href: string; label: string };
}) {
  return (
    <nav
      className="breadcrumbs page-breadcrumbs"
      aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}
    >
      <Link href={lang === "vi" ? "/" : "/en"}>
        {lang === "vi" ? "Trang chủ" : "Home"}
      </Link>
      <span>/</span>
      {parent ? (
        <>
          <Link href={parent.href}>{parent.label}</Link>
          <span>/</span>
        </>
      ) : null}
      <span>{label}</span>
    </nav>
  );
}

export function SeoHeader({
  lang,
  languagePaths,
}: {
  lang: SeoLang;
  languagePaths?: LanguagePaths;
}) {
  return <SiteHeader lang={lang} languagePaths={languagePaths} />;
}

export function SeoFooter({ lang }: { lang: SeoLang }) {
  return <SiteFooter lang={lang} />;
}

export function ServiceIndex({ lang }: { lang: SeoLang }) {
  const title =
    lang === "vi"
      ? "Dịch vụ chăm sóc tại Hato Beauty"
      : "Care services at Hato Beauty";

  return (
    <div className="seo-page" lang={lang}>
      <SeoHeader lang={lang} />
      <main
        id="main-content"
        tabIndex={-1}
        className="index-page service-index-page"
      >
        <PageBreadcrumb
          lang={lang}
          label={lang === "vi" ? "Dịch vụ" : "Services"}
        />
        <header className="service-index-compact-intro">
          <div className="service-index-heading">
            <p>{lang === "vi" ? "CHĂM SÓC CÁ NHÂN" : "PERSONAL CARE"}</p>
            <h1>
              {lang === "vi"
                ? "Dịch vụ tại Hato Beauty"
                : "Services at Hato Beauty"}
            </h1>
          </div>
          <div className="service-index-welcome">
            <p>
              {lang === "vi"
                ? "Năm nhóm dịch vụ được lựa chọn theo nhu cầu riêng, giúp bạn thư giãn và chăm sóc vẻ đẹp tự nhiên."
                : "Five care groups selected around your needs, helping you relax and care for your natural beauty."}
            </p>
            <a href="#service-collections">
              {lang === "vi" ? "Khám phá dịch vụ" : "Explore services"}
              <IconArrow />
            </a>
          </div>
        </header>
        <section
          className="index-grid service-index-grid"
          id="service-collections"
          aria-label={title}
        >
          {primarySeoServices.map((service, index) => (
            <Link
              className={`index-card index-card--${service.id}`}
              href={servicePath(service, lang)}
              key={service.id}
            >
              <div className="index-card-image">
                <Image
                  src={service.image}
                  alt={service[lang].name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              </div>
              <div className="index-card-copy">
                {index === 0 && (
                  <span className="service-card-badge">
                    {lang === "vi" ? "Đặc biệt" : "Signature"}
                  </span>
                )}
                <div className="service-card-title">
                  <h2>{service[lang].name}</h2>
                  <p>{serviceCardTaglines[service.id]?.[lang]}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}

export async function KnowledgeIndex({ lang }: { lang: SeoLang }) {
  const published = await loadPublishedArticles();
  const title =
    lang === "vi"
      ? "Kiến thức để chăm sóc nhẹ nhàng và đúng lúc"
      : "Practical guides to beauty care";
  const intro =
    lang === "vi"
      ? "Thư viện bài viết từ đội ngũ biên tập Hato Beauty, giúp bạn hiểu dịch vụ, chuẩn bị trước buổi hẹn và đặt kỳ vọng thực tế."
      : "Editorial guides from Hato Beauty to help you understand each service, prepare well and set realistic expectations.";

  return (
    <div className="seo-page" lang={lang}>
      <SeoHeader lang={lang} />
      <main
        id="main-content"
        tabIndex={-1}
        className="index-page knowledge-index"
      >
        <header className="index-hero">
          <nav
            className="breadcrumbs"
            aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}
          >
            <Link href={lang === "vi" ? "/" : "/en"}>
              {lang === "vi" ? "Trang chủ" : "Home"}
            </Link>
            <span>/</span>
            <span>{lang === "vi" ? "Kiến thức" : "Journal"}</span>
          </nav>
          <p className="seo-eyebrow">
            {lang === "vi" ? "THƯ VIỆN HATO" : "HATO JOURNAL"}
          </p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>
        <section className="index-grid knowledge-index-grid" aria-label={title}>
          {published.map((article) => (
            <Link
              className="index-card journal-index-card"
              href={articlePath(article, lang)}
              prefetch={false}
              key={article.id}
            >
              <div className="index-card-copy">
                <small>{article[`reading_time_${lang}`]}</small>
                <h2>{article[`title_${lang}`]}</h2>
                <p>{article[`excerpt_${lang}`]}</p>
                <strong>
                  {lang === "vi" ? "Đọc bài viết" : "Read article"}{" "}
                  <IconArrow />
                </strong>
              </div>
            </Link>
          ))}
          {journalTopics.map((topic, index) => {
            const service = topic.service;
            const articleTitle = journalTitle(service, lang);
            return (
              <Link
                className="index-card journal-index-card"
                href={journalPath(service, lang)}
                prefetch={false}
                key={topic.id}
              >
                <div className="index-card-image">
                  <Image
                    src={topic.image}
                    alt={articleTitle}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <div className="index-card-copy">
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{journalReadingTime(service, lang)}</small>
                  </div>
                  <h2>{articleTitle}</h2>
                  <p>{journalDescription(service, lang)}</p>
                  <strong>
                    {lang === "vi" ? "Đọc bài viết" : "Read article"}{" "}
                    <IconArrow />
                  </strong>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}

export function ServiceLanding({
  service,
  lang,
}: {
  service: SeoService;
  lang: SeoLang;
}) {
  const c = service[lang];
  const [price, duration] = serviceFacts(service.id, lang);
  const options = approvedServiceOptions(service.id);
  const detailGroups: ServiceDetailGroup[] = options.length
    ? [{ title: c.name, items: options.map((option) => option.name[lang]) }]
    : [];
  const resultGallery = isBusinessDataApproved("results")
    ? serviceResultGalleries[service.id]
    : undefined;
  const experienceCopy = serviceExperienceCopy[service.id]?.[lang];
  const path = servicePath(service, lang);
  const pairedPath = servicePath(service, lang === "vi" ? "en" : "vi");
  const consultationHref =
    lang === "vi" ? "https://zalo.me/0703214868" : "https://wa.me/84703214868";
  const faqs = [...c.faq, ...serviceIntentFaqs[service.id][lang]];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${path}#webpage`,
        url: `${siteUrl}${path}`,
        name: c.title,
        inLanguage: lang === "vi" ? "vi-VN" : "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}${path}#service`,
        name: c.name,
        description: c.description,
        image: service.image,
        areaServed: { "@type": "City", name: "Da Nang" },
        provider: { "@id": `${siteUrl}/#organization` },
        ...(options.length
          ? {
              offers: options.map((option) => ({
                "@type": "Offer",
                priceCurrency: "VND",
                price: option.priceVnd,
                name: option.name[lang],
                url: `${siteUrl}${bookingPath(lang, service.id, option.id)}`,
              })),
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "vi" ? "Trang chủ" : "Home",
            item: `${siteUrl}${lang === "vi" ? "/" : "/en"}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: lang === "vi" ? "Dịch vụ" : "Services",
            item: `${siteUrl}${lang === "vi" ? "/dich-vu" : "/en/services"}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: c.name,
            item: `${siteUrl}${path}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
  return (
    <div
      className={`seo-page service-landing-page service-landing-page--${service.id}`}
      lang={lang}
    >
      <JsonLd data={schema} />
      <SeoHeader lang={lang} />
      <main id="main-content" tabIndex={-1}>
        <PageBreadcrumb
          lang={lang}
          label={c.name}
          parent={{
            href: lang === "vi" ? "/dich-vu" : "/en/services",
            label: lang === "vi" ? "Dịch vụ" : "Services",
          }}
        />
        {
          <section
            className={`service-detail-menu service-detail-menu--${service.id}`}
            id="service-menu"
          >
            <header className="service-detail-menu-heading">
              <div className="service-detail-menu-label">
                <Image
                  src={service.image}
                  alt={c.name}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <p>{lang === "vi" ? "DANH MỤC DỊCH VỤ" : "SERVICE MENU"}</p>
              </div>
              <div className="service-detail-menu-summary">
                <p className="service-intro-kicker">
                  {experienceCopy?.introKicker ??
                    (lang === "vi"
                      ? "Chọn đúng chăm sóc cho nhu cầu hiện tại"
                      : "Choose care for what you need now")}
                </p>
                <h1>{c.name}</h1>
                <p>{c.description}</p>
                <div
                  className="service-assurance"
                  aria-label={
                    lang === "vi" ? "Cam kết tư vấn" : "Consultation principles"
                  }
                >
                  <span>{lang === "vi" ? "Rõ nhu cầu" : "Clear needs"}</span>
                  <span>{lang === "vi" ? "Rõ chi phí" : "Clear pricing"}</span>
                  <span>
                    {lang === "vi" ? "Rõ kỳ vọng" : "Clear expectations"}
                  </span>
                </div>
                <div className="service-menu-actions">
                  <div className="service-menu-facts">
                    <span>
                      <small>
                        {lang === "vi" ? "Thời gian dự kiến" : "Estimated time"}
                      </small>
                      <strong>{duration}</strong>
                    </span>
                    <span>
                      <small>
                        {lang === "vi" ? "Khoảng giá tham khảo" : "Guide price"}
                      </small>
                      <strong>{price}</strong>
                    </span>
                  </div>
                  <a href={bookingPath(lang, service.id)}>
                    {lang === "vi" ? "Đặt dịch vụ này" : "Request this service"}
                    <IconArrow />
                  </a>
                </div>
              </div>
            </header>
            {!options.length && (
              <p className="service-availability">{commercialNotice[lang]}</p>
            )}
            <div
              className={`service-detail-groups ${detailGroups.length === 1 ? "single" : ""}`}
            >
              {detailGroups.map((group) => (
                <article key={group.title}>
                  <div className="service-detail-group-title">
                    <h3>{group.title}</h3>
                  </div>
                  <ol>
                    {group.items.map((item, itemIndex) => (
                      <li key={item}>
                        <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                        <strong>{item}</strong>
                        <Link
                          href={bookingPath(
                            lang,
                            service.id,
                            options[itemIndex]?.id,
                          )}
                        >
                          {lang === "vi" ? "Chọn" : "Select"}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>
        }
        {service.id === "skin" && (
          <p className="service-body-link">
            <Link
              href={servicePath(
                seoServices.find((item) => item.id === "body")!,
                lang,
              )}
            >
              {lang === "vi"
                ? "Khám phá chăm sóc da cơ thể"
                : "Explore body skin care"}
              <IconArrow />
            </Link>
          </p>
        )}
        <p className="service-chat-link">
          <a href={consultationHref} target="_blank" rel="noopener noreferrer">
            {lang === "vi" ? "Hỏi thêm qua Zalo" : "Ask us on WhatsApp"}
            <IconArrow />
          </a>
        </p>
        {resultGallery && (
          <section
            className="service-result-gallery"
            aria-labelledby={`service-results-${service.id}`}
          >
            <header>
              <div>
                <p className="seo-eyebrow">
                  {lang === "vi" ? "TRƯỚC & SAU" : "BEFORE & AFTER"}
                </p>
                <h2 id={`service-results-${service.id}`}>
                  {resultGallery[lang][0]}
                </h2>
              </div>
              <p>
                {resultGallery[lang][1]}{" "}
                {lang === "vi"
                  ? "Hình ảnh minh hoạ; kết quả thực tế thay đổi theo tình trạng và lộ trình riêng."
                  : "Illustrative imagery; individual results vary by condition and care plan."}
              </p>
            </header>
            <div className="service-result-cards">
              {(lang === "vi"
                ? resultGallery.viExamples
                : resultGallery.enExamples
              ).map(([title, caption], index) => (
                <article className="service-result-card" key={title}>
                  <div
                    className={`service-result-card-image service-result-crop-${index + 1}`}
                  >
                    <Image
                      src={resultGallery.image}
                      alt={title}
                      fill
                      sizes="(max-width: 760px) 246vw, 90vw"
                    />
                    <div className="service-result-legend">
                      <span>{lang === "vi" ? "Trước" : "Before"}</span>
                      <span>{lang === "vi" ? "Sau" : "After"}</span>
                    </div>
                  </div>
                  <div className="service-result-card-copy">
                    <h3>{title}</h3>
                    <p>{caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        <section
          className="seo-content service-answer-panel"
          aria-labelledby="service-answer-title"
        >
          <div className="service-answer-heading">
            <p className="seo-eyebrow">
              {experienceCopy?.answerKicker ??
                (lang === "vi" ? "LẮNG NGHE NHU CẦU" : "LISTEN TO YOUR NEEDS")}
            </p>
            <h2 id="service-answer-title">
              {lang === "vi"
                ? `${c.name} phù hợp khi nào?`
                : `When is ${c.name} a good fit?`}
            </h2>
          </div>
          <div className="service-answer-copy">
            <p className="seo-answer">{c.answer}</p>
            <p>{c.expectations}</p>
          </div>
        </section>
        <section className="seo-content service-care-grid">
          <article className="service-care-card">
            <span>01</span>
            <h2>{lang === "vi" ? "Phù hợp với bạn khi" : "A good fit when"}</h2>
            <p>{c.suitable}</p>
          </article>
          <article className="service-care-card">
            <span>02</span>
            <h2>{lang === "vi" ? "Trước buổi hẹn" : "Before your visit"}</h2>
            <ul>
              {c.preparation.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
          <article className="service-care-card">
            <span>03</span>
            <h2>{lang === "vi" ? "Sau buổi chăm sóc" : "Aftercare"}</h2>
            <ul>
              {c.aftercare.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
          <aside className="service-care-card service-care-note">
            <span>04</span>
            <h2>
              {lang === "vi" ? "Lưu ý nhẹ nhàng" : "A gentle safety note"}
            </h2>
            <p>{c.caution}</p>
          </aside>
        </section>
        <section className="seo-faq">
          <h2>
            {lang === "vi"
              ? "Câu hỏi thường gặp"
              : "Frequently asked questions"}
          </h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
        <section className="seo-related service-related">
          <header>
            <p className="seo-eyebrow">
              {lang === "vi" ? "CHĂM SÓC THEO NHU CẦU" : "CARE BY NEED"}
            </p>
            <h2>{lang === "vi" ? "Khám phá thêm" : "Explore more"}</h2>
            <p>
              {lang === "vi"
                ? "Chọn một nhóm dịch vụ gần với điều bạn đang quan tâm. Xem hướng dẫn và liên hệ để xác nhận lựa chọn phù hợp trước khi đặt lịch."
                : "Choose the service group closest to your current concern. Read the guide and contact us to confirm the options that suit you before booking."}
            </p>
          </header>
          <div>
            {primarySeoServices
              .filter((x) => x.id !== service.id)
              .map((x, index) => (
                <Link href={servicePath(x, lang)} key={x.id}>
                  <span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    {x[lang].name}
                  </span>
                  <IconArrow />
                </Link>
              ))}
          </div>
          <p className="service-related-footer">
            <Link href={journalPath(service, lang)}>
              {lang === "vi"
                ? "Đọc hướng dẫn chăm sóc liên quan"
                : "Read the related care guide"}
              <IconArrow />
            </Link>
            <Link href={pairedPath} hrefLang={lang === "vi" ? "en" : "vi-VN"}>
              {lang === "vi" ? "Read in English" : "Đọc tiếng Việt"}
            </Link>
          </p>
        </section>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}

export function JournalLanding({
  service,
  lang,
}: {
  service: SeoService;
  lang: SeoLang;
}) {
  const c = service[lang];
  const path = journalPath(service, lang);
  const title = journalTitle(service, lang);
  const faqs = journalIntentFaqs[service.id][lang];
  const guide = journalGuidance[service.id][lang];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: journalDescription(service, lang),
    image: service.image,
    inLanguage: lang === "vi" ? "vi-VN" : "en",
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}${path}`,
  };
  return (
    <div className="seo-page" lang={lang}>
      <JsonLd data={schema} />
      <SeoHeader lang={lang} />
      <main
        id="main-content"
        tabIndex={-1}
        className="seo-article journal-article"
      >
        <nav
          className="breadcrumbs"
          aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}
        >
          <Link href={lang === "vi" ? "/" : "/en"}>
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <span>/</span>
          <Link href={lang === "vi" ? "/kien-thuc" : "/en/journal"}>
            {lang === "vi" ? "Kiến thức" : "Journal"}
          </Link>
          <span>/</span>
          <span>{c.name}</span>
        </nav>
        <div className="article-tags">
          <span>{c.name}</span>
          <span>{lang === "vi" ? "Hướng dẫn thực tế" : "Practical guide"}</span>
        </div>
        <h1>{title}</h1>
        <p className="seo-answer">
          {lang === "vi"
            ? `Chuẩn bị trước buổi ${c.name.toLocaleLowerCase("vi")}, chăm sóc sau buổi hẹn và những điều cần trao đổi để chọn dịch vụ phù hợp.`
            : `Prepare for ${c.name.toLowerCase()}, understand aftercare and know what to discuss before your visit.`}
        </p>
        <div className="article-meta">
          <span className="article-avatar" aria-hidden="true">
            HB
          </span>
          <p>
            <strong>
              {lang === "vi"
                ? "Ban biên tập Hato Beauty"
                : "Hato Beauty editorial team"}
            </strong>
            <small>{journalReadingTime(service, lang)}</small>
          </p>
        </div>
        <Image
          src={service.image}
          alt={c.name}
          width={1400}
          height={900}
          sizes="(max-width: 760px) 100vw, 60vw"
          priority
        />
        <article className="seo-article-body">
          <h2>{guide.heading}</h2>
          {guide.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>
            {lang === "vi"
              ? "Những câu nên hỏi trước khi quyết định"
              : "Questions to ask before deciding"}
          </h2>
          <ul>
            {guide.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
          <h2>
            {lang === "vi"
              ? "Cần chuẩn bị gì trước buổi hẹn?"
              : "How should you prepare?"}
          </h2>
          <ol>
            {c.preparation.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <h2>{lang === "vi" ? "Chăm sóc sau buổi thực hiện" : "Aftercare"}</h2>
          <ul>
            {c.aftercare.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h2>
            {lang === "vi"
              ? "An toàn và kỳ vọng thực tế"
              : "Safety and realistic expectations"}
          </h2>
          <p>{c.caution}</p>
          <section className="article-faq">
            <h2>
              {lang === "vi"
                ? "Câu hỏi thường gặp"
                : "Frequently asked questions"}
            </h2>
            {faqs.map(([question, answer]) => (
              <div key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </div>
            ))}
          </section>
          {service.id === "hair-removal" && (
            <p className="seo-source">
              {lang === "vi" ? "Nguồn tham khảo y khoa:" : "Medical reference:"}{" "}
              <a
                href="https://www.aad.org/public/cosmetic/hair-removal/laser-hair-removal-preparation"
                rel="noopener noreferrer"
              >
                American Academy of Dermatology
              </a>
              .
            </p>
          )}
          <div className="article-next">
            <Link className="seo-cta" href={servicePath(service, lang)}>
              {lang === "vi" ? "Xem dịch vụ liên quan" : "View related service"}{" "}
              <IconArrow />
            </Link>
            <Link href={lang === "vi" ? "/kien-thuc" : "/en/journal"}>
              {lang === "vi" ? "Xem tất cả bài viết" : "View all articles"}
            </Link>
          </div>
        </article>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}

export function TrustPage({
  lang,
  kind,
  initialService,
  initialOption,
}: {
  lang: SeoLang;
  initialService?: string;
  initialOption?: string;
  kind:
    | "about"
    | "contact"
    | "prices"
    | "book"
    | "privacy"
    | "editorial"
    | "products"
    | "carePlan";
}) {
  const data = {
    vi: {
      about: [
        "Về Hato Beauty",
        "Hato Beauty xây dựng trải nghiệm chăm sóc dựa trên lắng nghe, thông tin rõ ràng và kỳ vọng thực tế. Năm nhóm dịch vụ gồm Chăm sóc da, Mi & Mày, Chăm sóc da đầu & Thư giãn, Triệt lông và Tẩy lông.",
      ],
      contact: [
        "Liên hệ Hato Beauty",
        "Gửi yêu cầu đặt lịch để đội ngũ liên hệ, trao đổi nhu cầu và xác nhận thông tin địa điểm, thời gian phù hợp trước buổi hẹn.",
      ],
      prices: [
        "Bảng giá tham khảo",
        "Xem các nhóm dịch vụ bên dưới. Vui lòng liên hệ để xác nhận giá, thời lượng và lựa chọn hiện có trước khi đặt lịch.",
      ],
      book: [
        "Đặt lịch hẹn",
        "Chọn dịch vụ và ngày mong muốn bên dưới. Hato Beauty sẽ liên hệ qua kênh bạn chọn để xác nhận lịch hẹn.",
      ],
      privacy: [
        "Chính sách bảo mật",
        "Thông tin bạn gửi qua biểu mẫu chỉ được dùng để tư vấn, xác nhận lịch và hỗ trợ liên quan đến yêu cầu của bạn. hato không công khai dữ liệu liên hệ của khách hàng.",
      ],
      editorial: [
        "Chính sách biên tập",
        "Nội dung kiến thức nhằm giúp khách hiểu dịch vụ thẩm mỹ, không thay thế tư vấn y khoa. Các tuyên bố kỹ thuật hoặc sức khỏe được diễn đạt thận trọng và dẫn nguồn khi cần.",
      ],
      products: [
        "Sản phẩm chăm sóc",
        "Hato Beauty chọn sản phẩm chăm sóc tại nhà dựa trên nhu cầu và tình trạng thực tế của từng khách. Hãy liên hệ để được gợi ý cách chăm sóc phù hợp, rõ ràng và dễ duy trì.",
      ],
      carePlan: [
        "Lộ trình chăm sóc dành riêng cho bạn",
        "Mỗi lộ trình tại hato bắt đầu từ việc lắng nghe và đánh giá nhu cầu, sau đó được điều chỉnh theo phản hồi thực tế của làn da, cơ thể và nhịp sống của bạn.",
      ],
    },
    en: {
      about: [
        "About Hato Beauty",
        "Hato Beauty shapes care around listening, clear information and realistic expectations across Skin, Brow & Lash, Head Spa, Hair Removal and Waxing.",
      ],
      contact: [
        "Contact Hato Beauty",
        "Send a booking request so the team can discuss your needs and confirm the location and a suitable time before your visit.",
      ],
      prices: [
        "Guide prices",
        "Explore the service groups below. Please contact us to confirm current prices, duration and available options before booking.",
      ],
      book: [
        "Request an appointment",
        "Choose your service and preferred date below. We’ll contact you through your selected channel to confirm your appointment.",
      ],
      privacy: [
        "Privacy policy",
        "Details sent through the form are used only to discuss and confirm your appointment and support your request. hato does not publish guest contact details.",
      ],
      editorial: [
        "Editorial policy",
        "Journal content helps guests understand cosmetic care and does not replace medical advice. Technical or health claims are phrased carefully and sourced when needed.",
      ],
      products: [
        "Care products",
        "Hato Beauty recommends at-home care products around each guest’s needs and current condition. Contact us for clear, practical guidance that fits your routine.",
      ],
      carePlan: [
        "A care plan shaped around you",
        "Every hato plan begins with listening and an assessment, then evolves around the real response of your skin, body and everyday rhythm.",
      ],
    },
  }[lang][kind];
  const planSteps =
    lang === "vi"
      ? [
          ["01", "Lắng nghe", "Hiểu nhu cầu, thói quen và điều bạn mong muốn."],
          [
            "02",
            "Đánh giá",
            "Quan sát tình trạng hiện tại và thống nhất kỳ vọng thực tế.",
          ],
          [
            "03",
            "Thiết kế lộ trình",
            "Chọn dịch vụ, tần suất và chăm sóc tại nhà phù hợp.",
          ],
          [
            "04",
            "Theo dõi & điều chỉnh",
            "Ghi nhận phản hồi để duy trì kết quả an toàn, nhẹ nhàng.",
          ],
        ]
      : [
          [
            "01",
            "Listen",
            "Understand your needs, habits and desired outcome.",
          ],
          [
            "02",
            "Assess",
            "Review your current condition and agree realistic expectations.",
          ],
          [
            "03",
            "Shape the plan",
            "Select services, timing and practical at-home care.",
          ],
          [
            "04",
            "Review & refine",
            "Track responses and adjust for gentle, sustainable results.",
          ],
        ];
  const visual =
    kind === "carePlan"
      ? {
          src: "/images/feature-personalized-v2.webp",
          alt:
            lang === "vi"
              ? "Chuyên viên Hato Beauty tư vấn lộ trình chăm sóc cá nhân"
              : "A Hato Beauty specialist discussing a personal care plan",
        }
      : kind === "products"
        ? {
            src: "/images/service-skin-v2.webp",
            alt:
              lang === "vi"
                ? "Sản phẩm và trải nghiệm chăm sóc tại Hato Beauty"
                : "Care products and experience at Hato Beauty",
          }
        : null;
  const aboutValues =
    lang === "vi"
      ? [
          [
            "/images/feature-equipment-v2.webp",
            "Công nghệ phù hợp",
            "Thiết bị được lựa chọn theo nhu cầu thật, không chạy theo lời hứa quá mức.",
          ],
          [
            "/images/feature-space-v2.webp",
            "Không gian dễ chịu",
            "Một nhịp chăm sóc riêng tư, sạch sẽ và đủ chậm để bạn thư giãn.",
          ],
          [
            "/images/feature-personalized-v2.webp",
            "Thông tin minh bạch",
            "Quy trình, chi phí và kỳ vọng được trao đổi trước khi bắt đầu.",
          ],
          [
            "/images/feature-team-v2.webp",
            "Lắng nghe cẩn trọng",
            "Đội ngũ bắt đầu từ câu hỏi và điều chỉnh theo cảm nhận của bạn.",
          ],
        ]
      : ([
          [
            "/images/feature-equipment-v2.webp",
            "Suitable technology",
            "Technology chosen around real needs, without inflated promises.",
          ],
          [
            "/images/feature-space-v2.webp",
            "A calming space",
            "A private, clean and unhurried rhythm of care.",
          ],
          [
            "/images/feature-personalized-v2.webp",
            "Clear information",
            "Process, price and expectations are discussed before care begins.",
          ],
          [
            "/images/feature-team-v2.webp",
            "Careful listening",
            "The team starts with questions and adapts to your comfort.",
          ],
        ] as const);
  const teamProfiles = [
    {
      number: "01",
      image: "/images/hato-team-nguyen-thi-thu-thao.png",
      alt:
        lang === "vi"
          ? "Dược sĩ Nguyễn Thị Thu Thảo tại Hato Beauty"
          : "Pharmacist Nguyen Thi Thu Thao at Hato Beauty",
      name: "Nguyễn Thị Thu Thảo",
      role:
        lang === "vi"
          ? "Dược sĩ · Chuyên gia tư vấn & phân tích da"
          : "Pharmacist · Skin consultation & analysis specialist",
      description:
        lang === "vi"
          ? "Tập trung lắng nghe nhu cầu, hỗ trợ quan sát tình trạng bề mặt da và giải thích các lựa chọn chăm sóc phù hợp theo hướng rõ ràng, thực tế."
          : "Focused on listening carefully, observing visible skin concerns and explaining suitable care options in a clear, realistic way.",
      expertise:
        lang === "vi"
          ? ["Tư vấn cá nhân hóa", "Phân tích nhu cầu da", "Hướng dẫn chăm sóc tại nhà"]
          : ["Personalised consultation", "Skin-needs analysis", "Home-care guidance"],
    },
    {
      number: "02",
      image: "/images/hato-team-nguyen-thi-huyen.png",
      alt:
        lang === "vi"
          ? "Chuyên gia chăm sóc da Nguyễn Thị Huyền tại Hato Beauty"
          : "Facial care specialist Nguyen Thi Huyen at Hato Beauty",
      name: "Nguyễn Thị Huyền",
      role:
        lang === "vi"
          ? "Chuyên gia chăm sóc da chuyên sâu"
          : "Advanced facial care specialist",
      description:
        lang === "vi"
          ? "Tập trung vào quy trình làm sạch, cấp ẩm và chăm sóc bề mặt da theo nhu cầu thực tế; theo dõi phản hồi của da trong từng bước để điều chỉnh trải nghiệm nhẹ nhàng, phù hợp."
          : "Focused on cleansing, hydration and surface-level skin care tailored to each guest, with close attention to the skin’s response throughout every step.",
      expertise:
        lang === "vi"
          ? ["Chăm sóc da chuyên sâu", "Làm sạch & cấp ẩm", "Theo dõi phản hồi của da"]
          : ["Advanced facial care", "Cleansing & hydration", "Skin-response observation"],
    },
    ...Array.from({ length: 4 }, (_, index) => ({
      number: String(index + 3).padStart(2, "0"),
      image: null,
      alt: "",
      name:
        lang === "vi"
          ? `Thành viên ${String(index + 3).padStart(2, "0")}`
          : `Team member ${String(index + 3).padStart(2, "0")}`,
      role:
        lang === "vi"
          ? "Hồ sơ đang được cập nhật"
          : "Profile coming soon",
      description:
        lang === "vi"
          ? "Thông tin chuyên môn và hình ảnh sẽ được bổ sung khi Hato Beauty xác nhận hồ sơ."
          : "Professional details and photography will be added once the profile is confirmed by Hato Beauty.",
      expertise: [] as string[],
    })),
  ];
  const consultationHref = bookingPath(lang);
  return (
    <div className="seo-page" lang={lang}>
      <SeoHeader
        lang={lang}
        languagePaths={
          kind === "book"
            ? {
                vi: bookingPath("vi", initialService, initialOption),
                en: bookingPath("en", initialService, initialOption),
              }
            : undefined
        }
      />
      <main
        id="main-content"
        tabIndex={-1}
        className={`seo-trust ${kind === "book" ? "booking-page" : ""}${kind === "contact" ? " contact-page" : ""}${kind === "carePlan" ? " care-plan-page" : ""}${kind === "products" ? " products-page" : ""}${kind === "about" ? " about-page" : ""}`}
      >
        <PageBreadcrumb lang={lang} label={data[0]} />
        {kind === "contact" ? (
          <header className="contact-page-intro">
            <span
              className="contact-orbit contact-orbit-one"
              aria-hidden="true"
            />
            <span
              className="contact-orbit contact-orbit-two"
              aria-hidden="true"
            />
            <h1>{data[0]}</h1>
            <p className="seo-answer">{data[1]}</p>
          </header>
        ) : (
          <>
            <p className="seo-eyebrow">Hato Beauty</p>
            <h1>{data[0]}</h1>
            <p className="seo-answer">{data[1]}</p>
          </>
        )}
        {visual && (
          <div className="trust-visual">
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 80vw"
            />
          </div>
        )}
        {kind === "about" && (
          <section
            className="about-values"
            aria-label={
              lang === "vi"
                ? "Giá trị của Hato Beauty"
                : "What Hato Beauty stands for"
            }
          >
            {aboutValues.map(([image, title, text], index) => (
              <article key={title}>
                <div className="about-value-image">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </section>
        )}
        {kind === "about" && (
          <section
            className="about-team"
            aria-labelledby="about-team-title"
          >
            <div className="about-team-heading">
              <div>
                <p className="seo-eyebrow">
                  {lang === "vi" ? "Đội ngũ Hato Beauty" : "The Hato Beauty team"}
                </p>
                <h2 id="about-team-title">
                  {lang === "vi"
                    ? "Chuyên môn rõ ràng, chăm sóc bằng sự lắng nghe."
                    : "Clear expertise, care shaped by listening."}
                </h2>
              </div>
              <p>
                {lang === "vi"
                  ? "Gặp gỡ những người trực tiếp lắng nghe, tư vấn và đồng hành cùng trải nghiệm chăm sóc của bạn tại Hato Beauty."
                  : "Meet the people who listen, advise and support your care experience at Hato Beauty."}
              </p>
            </div>
            <div className="about-team-grid">
              {teamProfiles.map((profile) => (
                <article
                  className={`about-team-card${profile.image ? " is-profiled" : " is-placeholder"}`}
                  key={profile.number}
                >
                  {profile.image ? (
                    <div className="about-team-photo">
                      <Image
                        src={profile.image}
                        alt={profile.alt}
                        fill
                        sizes="(max-width: 700px) 84vw, (max-width: 1000px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="about-team-placeholder" aria-hidden="true">
                      <span>{profile.number}</span>
                      <i>hato</i>
                    </div>
                  )}
                  <div className="about-team-copy">
                    <div className="about-team-meta">
                      <span>{profile.number}</span>
                      <small>{profile.role}</small>
                    </div>
                    <h3>{profile.name}</h3>
                    <p>{profile.description}</p>
                    {profile.expertise.length > 0 && (
                      <ul aria-label={lang === "vi" ? "Chuyên môn" : "Expertise"}>
                        {profile.expertise.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        {kind === "about" && (
          <div className="about-actions">
            <a className="button primary" href={consultationHref}>
              {lang === "vi" ? "Đặt lịch hẹn" : "Request an appointment"}
              <IconArrow />
            </a>
            <Link
              className="button ghost"
              href={lang === "vi" ? "/dich-vu" : "/en/services"}
            >
              {lang === "vi" ? "Khám phá dịch vụ" : "Explore services"}
              <IconArrow />
            </Link>
          </div>
        )}
        {kind === "book" ? (
          <BookingForm
            lang={lang}
            initialService={initialService}
            initialOption={initialOption}
          />
        ) : kind === "contact" ? (
          <>
            <div className="contact-page-panel">
              <div className="contact-page-info">
                <ContactDetails lang={lang} />
              </div>
              <ContactForm lang={lang} />
            </div>
            <div className="contact-page-map">
              <ContactMap lang={lang} />
            </div>
          </>
        ) : (
          <>
            {kind === "prices" && <ServicePriceTable lang={lang} />}
            {kind === "carePlan" && (
              <section className="care-plan-steps" aria-label={data[0]}>
                {planSteps.map(([number, title, text]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </article>
                ))}
              </section>
            )}
            <div className="seo-related">
              <h2>
                {lang === "vi"
                  ? "Bắt đầu từ dịch vụ phù hợp"
                  : "Start with the right service"}
              </h2>
              <div>
                {primarySeoServices.map((s) => (
                  <Link href={servicePath(s, lang)} key={s.id}>
                    {s[lang].name}
                    <IconArrow />
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}

export function ResultsIndex({
  lang,
  results,
}: {
  lang: SeoLang;
  results: ResultContent[];
}) {
  const publishedResults = isBusinessDataApproved("results") ? results : [];
  const title = lang === "vi" ? "Kết quả khách hàng" : "Client results";
  const intro =
    lang === "vi"
      ? "Thư viện đang được cập nhật. Hình ảnh khách hàng chỉ được công bố khi nguồn ảnh và sự đồng ý sử dụng đã được xác nhận."
      : "This gallery is being updated. Client images are published only after their source and permission for use have been verified.";
  const resultGuides =
    lang === "vi"
      ? [
          {
            title: "Da trông tươi và đủ ẩm hơn",
            summary:
              "Điều dễ nhận thấy là bề mặt da mềm, căng khỏe và bắt sáng tự nhiên hơn — không phải cảm giác trắng bật tông thiếu thực tế.",
            label: "Khách hàng thường quan tâm",
            detail:
              "Da bớt khô căng, lớp nền nhìn mượt hơn và cảm giác dễ chịu được duy trì khi chăm sóc tại nhà đúng cách.",
          },
          {
            title: "Đường nét gọn nhưng vẫn là bạn",
            summary:
              "Dáng mày và độ cong của mi được điều chỉnh theo gương mặt, giúp tổng thể sáng và có thần hơn mà không tạo cảm giác quá sắc.",
            label: "Khách hàng thường quan tâm",
            detail:
              "Ít thời gian chỉnh sửa mỗi sáng, đường nét cân đối hơn và kết quả vẫn hài hòa với sợi tự nhiên.",
          },
          {
            title: "Làn da cơ thể mềm và sáng khỏe",
            summary:
              "Bề mặt da được làm sạch nhẹ nhàng và bổ sung độ ẩm, vì vậy nhìn mịn màng, đều màu và có sức sống hơn sau chăm sóc.",
            label: "Khách hàng thường quan tâm",
            detail:
              "Vùng da khô ráp trở nên dễ chịu hơn; độ mịn và vẻ rạng rỡ phụ thuộc tình trạng da cùng thói quen dưỡng tại nhà.",
          },
        ]
      : [
          {
            title: "Fresher, comfortably hydrated skin",
            summary:
              "The most visible change is a softer, naturally luminous surface — not an unrealistic overnight transformation.",
            label: "What guests care about",
            detail:
              "Less tightness, smoother-looking makeup and comfort that lasts longer with suitable home care.",
          },
          {
            title: "Defined features that still feel like you",
            summary:
              "Brow shape and lash lift are balanced to the face, creating a brighter look without making the features feel overly sharp.",
            label: "What guests care about",
            detail:
              "Less styling time in the morning, more balanced definition and a result that works with your natural hair.",
          },
          {
            title: "Softer, healthier-looking body skin",
            summary:
              "Gentle surface cleansing and hydration help the skin look smoother, more even and visibly refreshed after care.",
            label: "What guests care about",
            detail:
              "Dry texture can feel more comfortable; smoothness and radiance still depend on your skin and home routine.",
          },
        ];

  return (
    <div className="seo-page results-page" lang={lang}>
      <SeoHeader lang={lang} />
      <main id="main-content" tabIndex={-1} className="index-page">
        <header className="index-hero">
          <nav
            className="breadcrumbs"
            aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}
          >
            <Link href={lang === "vi" ? "/" : "/en"}>
              {lang === "vi" ? "Trang chủ" : "Home"}
            </Link>
            <span>/</span>
            <span>{title}</span>
          </nav>
          <p className="seo-eyebrow">
            {lang === "vi" ? "TRƯỚC & SAU" : "BEFORE & AFTER"}
          </p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>
        <section className="result-grid" aria-label={title}>
          {publishedResults.map((result, index) => {
            const guide = resultGuides[index] ?? {
              title: result[lang][0],
              summary: result[lang][1],
              label:
                lang === "vi"
                  ? "Kết quả có thể quan sát"
                  : "What you may notice",
              detail:
                lang === "vi"
                  ? "Kết quả thực tế được trao đổi theo tình trạng ban đầu và cách chăm sóc phù hợp với từng người."
                  : "Your expected result is discussed around your starting point and suitable individual care.",
            };
            return (
              <article className="result-story-card" key={result.vi[0]}>
                <div className="result-image">
                  <Image
                    src={result.image}
                    alt={result[lang][0]}
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                  />
                  <div className="comparison-labels">
                    <span>{lang === "vi" ? "Trước" : "Before"}</span>
                    <span>{lang === "vi" ? "Sau" : "After"}</span>
                  </div>
                </div>
                <div className="result-copy">
                  <h3>{guide.title}</h3>
                  <p>{guide.summary}</p>
                  <div className="result-expectation">
                    <span>{guide.label}</span>
                    <p>{guide.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}
