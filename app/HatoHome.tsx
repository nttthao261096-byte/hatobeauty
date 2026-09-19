"use client";

import Image from "./OptimizedImage";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

import type { Category, HomeContent, Lang } from "./content";
import { SiteFooter } from "./SiteFooter";
import { bookingPath, pageRoutes } from "./route-paths";
import { journalTitle, journalReadingTime } from "./journal-copy";
import { serviceFacts } from "./business-data";
import { IconArrow, IconChevron } from "./icons";
import { journalPath, seoServices, servicePath } from "./seo-data";
import { SiteHeader } from "./SiteHeader";
import { HeroMedia } from "./HeroMedia";

function isTechHighlight(item: {
  image: string;
  vi: readonly [string, string];
  en: readonly [string, string];
}) {
  return /equipment|technology|thiết bị|công nghệ/i.test(
    `${item.image} ${item.vi[0]} ${item.en[0]}`,
  );
}

function brandText(text: string): ReactNode {
  return text.split(/(hato)/gi).map((part, index) =>
    /^hato$/i.test(part) ? (
      <span className="hato-word" key={`${part}-${index}`}>
        hato
      </span>
    ) : (
      part
    ),
  );
}

const copy = {
  vi: {
    announcement:
      "Soi da khi đặt liệu trình · 09:00–19:00 · 127 Châu Thị Vĩnh Tế, Ngũ Hành Sơn",
    book: "Đặt lịch hẹn",
    nav: ["Về Hato Beauty", "Dịch vụ", "Trải nghiệm", "Kết quả", "Cảm nhận"],
    heroTitle: "Tỏa sáng là chính bạn.",
    heroText:
      "Chăm sóc da, mi mày, da đầu, triệt lông và waxing tại Đà Nẵng. Hato Beauty lắng nghe nhu cầu để cùng bạn chọn dịch vụ phù hợp.",
    explore: "Xem dịch vụ & giá",
    learn: "Hiểu về chúng tôi",
    whyEyebrow: "Vì sao Hato Beauty",
    whyTitle: "Hiểu làn da trước, chăm đúng điều da cần.",
    servicesEyebrow: "Năm nhóm dịch vụ",
    servicesTitle: "Chọn đúng nhóm trước khi đặt.",
    servicesText:
      "Da, mi mày, da đầu, triệt lông hoặc tẩy lông. Xem thông tin dịch vụ và liên hệ để xác nhận lựa chọn, thời lượng và chi phí.",
    categories: {
      all: "Tất cả",
      care: "Chăm sóc da",
      shape: "Mi & Mày",
      relax: "Da đầu & thư giãn",
      smooth: "Triệt lông & Tẩy lông",
    },
    suitable: "Phù hợp với",
    choose: "Xem dịch vụ",
    experienceEyebrow: "Trải nghiệm dành cho bạn",
    experienceTitle: "Hiện đại trong kỹ thuật, mềm mại trong từng chạm.",
    resultEyebrow: "Kết quả khách hàng",
    resultTitle: "Chạm đến phiên bản đẹp nhất của bạn.",
    resultNote:
      "Kết quả thực tế phụ thuộc vào tình trạng và liệu trình riêng của từng khách hàng.",
    testimonialEyebrow: "Cảm nhận khách hàng",
    testimonialTitle: "Điều khách hàng nhớ sau một buổi hẹn cùng chúng tôi.",
    bannerTitle:
      "Cảm ơn bạn đã tin tưởng và lựa chọn chúng tôi trên hành trình làm đẹp của chúng mình.",
    bannerText:
      "Chúng tôi cam kết sẽ mang đến những điều tốt nhất cho khách hàng của mình.\nTừng thay đổi nhỏ của bạn không chỉ là niềm hạnh phúc mà còn là động lực để chúng tôi cố gắng mỗi ngày.",
    contactNow: "Hãy liên hệ ngay",
    modalTitle: "Đặt lịch cùng chúng tôi",
    modalText:
      "Để lại thông tin, chúng tôi sẽ liên hệ tư vấn và xác nhận thời gian phù hợp.",
    name: "Họ và tên",
    phone: "Số điện thoại",
    service: "Dịch vụ quan tâm",
    date: "Ngày mong muốn",
    submit: "Gửi yêu cầu",
    close: "Đóng",
    chooseService: "Chọn dịch vụ",
    received: "Chúng tôi đã nhận yêu cầu",
    thanks:
      "Cảm ơn bạn. Chúng tôi sẽ sớm liên hệ để lắng nghe và xác nhận lịch phù hợp.",
    done: "Hoàn tất",
    menu: "Mở menu",
    sending: "Đang gửi...",
    bookingError: "Chưa thể gửi yêu cầu. Vui lòng thử lại sau ít phút.",
  },
  en: {
    announcement:
      "Skin check with treatment · 09:00–19:00 · 127 Chau Thi Vinh Te, Ngu Hanh Son",
    book: "Request an appointment",
    nav: ["About us", "Services", "Experience", "Results", "Reviews"],
    heroTitle: "Shine as you are.",
    heroText:
      "Personalised facials, lash and brow care, head spa, hair removal and waxing in Da Nang. We listen to your needs and help you choose suitable care.",
    explore: "Explore services & prices",
    learn: "Discover us",
    whyEyebrow: "Why Hato Beauty",
    whyTitle: "Understand the skin first, then care for what it needs.",
    servicesEyebrow: "Five service groups",
    servicesTitle: "Pick the right group before you book.",
    servicesText:
      "Skin, brow and lash, scalp, hair removal or waxing. Explore each service and contact us to confirm options, duration and pricing.",
    categories: {
      all: "All",
      care: "Skin",
      shape: "Brow & Lash",
      relax: "Scalp & Relaxation",
      smooth: "Hair Removal & Waxing",
    },
    suitable: "Best suited for",
    choose: "View service",
    experienceEyebrow: "Your experience",
    experienceTitle: "Modern in technique, gentle in every touch.",
    resultEyebrow: "Client results",
    resultTitle: "Become the most beautiful version of yourself.",
    resultNote:
      "Individual results vary according to your starting point and personal care plan.",
    testimonialEyebrow: "Client notes",
    testimonialTitle: "What guests remember after time with us.",
    bannerTitle: "Thank you for trusting us to be part of your beauty journey.",
    bannerText:
      "We are committed to bringing the very best to every guest.\nEvery small change in you is not only our happiness, but also the motivation that keeps us growing each day.",
    contactNow: "Contact us now",
    modalTitle: "Book with us",
    modalText:
      "Leave your details and we will contact you for a personal consultation.",
    name: "Full name",
    phone: "Phone number",
    service: "Service of interest",
    date: "Preferred date",
    submit: "Send request",
    close: "Close",
    chooseService: "Choose a service",
    received: "Request received",
    thanks:
      "Thank you. We will contact you shortly to listen and confirm a suitable time.",
    done: "Done",
    menu: "Open menu",
    sending: "Sending...",
    bookingError:
      "We could not send your request. Please try again in a few minutes.",
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

const originalHighlightCopy = {
  vi: [
    [
      "Thiết bị hiện đại",
      "Thiết bị được lựa chọn phù hợp với từng nhu cầu chăm sóc.",
    ],
    [
      "Đội ngũ chuyên nghiệp",
      "Đội ngũ lắng nghe kỹ và chăm chút trong từng bước thực hiện.",
    ],
    [
      "Dịch vụ cá nhân hóa",
      "Mỗi dịch vụ được điều chỉnh theo tình trạng và nhu cầu riêng của bạn.",
    ],
    [
      "Không gian thư giãn",
      "Không gian riêng tư, sạch sẽ và đủ chậm để bạn thư giãn.",
    ],
  ],
  en: [
    ["Modern equipment", "Equipment selected to suit each care need."],
    ["Professional team", "An attentive team that takes care with every step."],
    [
      "Personalized service",
      "Each service is tailored to your condition and individual needs.",
    ],
    [
      "A relaxing space",
      "A private, clean and unhurried space where you can relax.",
    ],
  ],
} as const;

const serviceCardCopy = {
  skin: {
    vi: {
      description: "Làm sạch và cấp ẩm theo nhu cầu của làn da.",
      suitable: "Da thiếu ẩm, xỉn màu hoặc cần chăm sóc định kỳ.",
    },
    en: {
      description: "Cleansing and hydration tailored to your skin’s needs.",
      suitable: "Dehydrated or dull skin, or a regular care routine.",
    },
  },
  "brow-lash": {
    vi: {
      description: "Uốn mi, nhuộm và tạo dáng mày theo xương mặt.",
      suitable: "Muốn mi cong, mày gọn, dễ makeup.",
    },
    en: {
      description: "Lift, tint and shape lashes and brows to the face.",
      suitable: "For a lift and a neater brow line.",
    },
  },
  scalp: {
    vi: {
      description: "Gội sạch da đầu, massage đầu–vai–gáy.",
      suitable: "Dành cho da đầu cần làm sạch và một khoảng nghỉ thư giãn.",
    },
    en: {
      description: "Scalp cleanse with a head–shoulder massage.",
      suitable: "For a refreshed scalp and a relaxing break.",
    },
  },
  body: {
    vi: {
      description: "Tẩy bề mặt và dưỡng ẩm da cơ thể.",
      suitable: "Da khô sau biển, sần, cần lớp kem khóa ẩm.",
    },
    en: {
      description: "Exfoliate and hydrate body skin.",
      suitable: "Dry after the beach, rough, in need of a cream seal.",
    },
  },
  "hair-removal": {
    vi: {
      description: "Trao đổi nhu cầu giảm lông theo từng vùng.",
      suitable: "Nách, chân, mặt — kín đáo, không hứa vĩnh viễn.",
    },
    en: {
      description:
        "Hair reduction tailored to the treatment area and your needs.",
      suitable: "Discreet care with suitability confirmed before your visit.",
    },
  },
  waxing: {
    vi: {
      description: "Tẩy sáp từng vùng, làm dịu ngay sau.",
      suitable: "Mày, môi trên, một vùng cơ thể cần gọn trong buổi.",
    },
    en: {
      description:
        "Targeted waxing with gentle preparation and soothing aftercare.",
      suitable: "Brows, upper lip, one body area that needs to be neat today.",
    },
  },
} as const;

export function HatoHome({
  content,
  initialLang = "vi",
}: {
  content: Pick<HomeContent, "services" | "highlights">;
  initialLang?: Lang;
}) {
  const { services } = content;
  const highlights = content.highlights.map((item, index) => ({
    ...item,
    vi: originalHighlightCopy.vi[index] ?? item.vi,
    en: originalHighlightCopy.en[index] ?? item.en,
  }));
  const lang = initialLang;
  const [category, setCategory] = useState<Category>("all");
  const [highlightIndex, setHighlightIndex] = useState(() => {
    const firstCalm = highlights.findIndex((item) => !isTechHighlight(item));
    return firstCalm >= 0 ? firstCalm : 0;
  });
  const [serviceQuery, setServiceQuery] = useState("");
  const [ribbonPaused, setRibbonPaused] = useState(false);
  const t = copy[lang];
  const normalizedQuery = serviceQuery
    .trim()
    .toLocaleLowerCase(lang === "vi" ? "vi" : "en");
  const filteredServices = services.filter((service) => {
    const matchesCategory = category === "all" || service.category === category;
    const searchableText =
      `${service[lang].title} ${service[lang].summary} ${service[lang].description}`.toLocaleLowerCase(
        lang === "vi" ? "vi" : "en",
      );
    return (
      matchesCategory &&
      (!normalizedQuery || searchableText.includes(normalizedQuery))
    );
  });
  const ribbonGroups = [
    "skin",
    "brow-lash",
    "scalp",
    "hair-removal",
    "waxing",
  ] as const;

  return (
    <div className="home-page" lang={lang}>
      <SiteHeader
        lang={lang}
        search={{
          value: serviceQuery,
          onChange: setServiceQuery,
          onSubmit: () =>
            document
              .querySelector("#services")
              ?.scrollIntoView({ behavior: "smooth" }),
        }}
      />

      <main id="main-content" tabIndex={-1}>
        <section className="hero">
          <HeroMedia lang={lang} />
          <div className="hero-overlay" />
          <div className="hero-copy">
            <p className="eyebrow">
              {lang === "vi"
                ? "HATO BEAUTY · ĐÀ NẴNG"
                : "HATO BEAUTY · DA NANG"}
            </p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-lead">{t.heroText}</p>
            <div className="hero-actions">
              <a className="button primary" href={bookingPath(lang)}>
                {t.book}
                <IconArrow />
              </a>
              <a className="button ghost" href={pageRoutes.prices[lang]}>
                {t.explore}
                <IconArrow />
              </a>
            </div>
          </div>
        </section>

        <div
          className={
            ribbonPaused ? "service-ribbon is-paused" : "service-ribbon"
          }
          aria-label={t.servicesEyebrow}
        >
          <div className="service-ribbon-track">
            {[0, 1].flatMap((copy) =>
              ribbonGroups.map((id) => (
                <Link
                  className="ribbon-item"
                  href={servicePath(
                    seoServices.find((service) => service.id === id) ??
                      seoServices[0],
                    lang,
                  )}
                  aria-hidden={copy === 1 || undefined}
                  tabIndex={copy === 1 ? -1 : undefined}
                  key={`${copy}-${id}`}
                >
                  <span>{serviceGroupLabels[lang][id]}</span>
                  <i aria-hidden="true">✦</i>
                </Link>
              )),
            )}
          </div>
          <button
            className="ribbon-pause"
            onClick={() => setRibbonPaused(!ribbonPaused)}
            aria-pressed={ribbonPaused}
            aria-label={
              lang === "vi"
                ? "Dừng chuyển động danh mục"
                : "Pause service ribbon"
            }
          >
            {ribbonPaused ? "▷" : "Ⅱ"}
          </button>
        </div>

        <section className="why section" id="about">
          <div className="section-heading">
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2>{t.whyTitle}</h2>
            <div className="section-heading-side">
              <p>
                {lang === "vi"
                  ? "Mỗi buổi chăm sóc bắt đầu bằng soi da và lắng nghe nhu cầu. Hato Beauty cùng bạn thống nhất mục tiêu, chi phí và dịch vụ trước khi thực hiện; sau đó hướng dẫn chăm sóc tại nhà và lịch theo dõi phù hợp."
                  : "Every visit begins with listening and a skin check. We agree on goals, costs and suitable care before treatment, then guide your home routine and follow-up timing."}
              </p>
              <Link
                className="section-route-link"
                href={lang === "vi" ? "/lo-trinh" : "/en/care-plan"}
              >
                {lang === "vi" ? "Xem lộ trình da" : "See the skin plan"}
                <IconArrow />
              </Link>
            </div>
          </div>
          <div className="feature-slider" id="experience">
            <Link
              className={`feature-stage${isTechHighlight(highlights[highlightIndex]) ? " feature-stage-tech" : ""}`}
              href={lang === "vi" ? "/ve-hato-beauty" : "/en/about"}
              key={highlights[highlightIndex].number}
            >
              <div className="feature-image">
                <Image
                  src={highlights[highlightIndex].image}
                  alt={highlights[highlightIndex][lang][0]}
                  fill
                  sizes="(max-width: 760px) 100vw, 58vw"
                />
              </div>
              <article className="feature-copy">
                <span>{highlights[highlightIndex].number} / 04</span>
                <h3>{highlights[highlightIndex][lang][0]}</h3>
                <p>{brandText(highlights[highlightIndex][lang][1])}</p>
              </article>
            </Link>
            <div className="feature-controls">
              <div>
                {highlights.map((item, index) => (
                  <button
                    key={item.number}
                    aria-pressed={highlightIndex === index}
                    className={highlightIndex === index ? "active" : ""}
                    onClick={() => setHighlightIndex(index)}
                  >
                    <span>{item.number}</span>
                    {item[lang][0]}
                  </button>
                ))}
              </div>
              <div className="feature-arrows">
                <button
                  onClick={() =>
                    setHighlightIndex(
                      (highlightIndex + highlights.length - 1) %
                        highlights.length,
                    )
                  }
                  aria-label={lang === "vi" ? "Slide trước" : "Previous slide"}
                >
                  <IconChevron direction="left" />
                </button>
                <button
                  onClick={() =>
                    setHighlightIndex((highlightIndex + 1) % highlights.length)
                  }
                  aria-label={lang === "vi" ? "Slide sau" : "Next slide"}
                >
                  <IconChevron />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section section" id="services">
          <div className="services-intro">
            <div>
              <p className="eyebrow">{brandText(t.servicesEyebrow)}</p>
              <h2>{t.servicesTitle}</h2>
            </div>
            <div className="services-intro-side">
              <p>{t.servicesText}</p>
              <Link
                className="section-route-link"
                href={lang === "vi" ? "/dich-vu" : "/en/services"}
              >
                {lang === "vi" ? "Xem tất cả dịch vụ" : "View all services"}
                <IconArrow />
              </Link>
            </div>
          </div>
          <div
            className="service-filters"
            role="group"
            aria-label={t.servicesEyebrow}
          >
            {(
              Object.keys(t.categories) as Array<keyof typeof t.categories>
            ).map((key) => (
              <button
                key={key}
                aria-pressed={category === key}
                className={category === key ? "active" : ""}
                onClick={() => setCategory(key)}
              >
                {t.categories[key]}
              </button>
            ))}
          </div>
          {serviceQuery && (
            <p className="search-status">
              {lang === "vi"
                ? `Kết quả cho “${serviceQuery}”`
                : `Results for “${serviceQuery}”`}{" "}
              <button onClick={() => setServiceQuery("")}>
                {lang === "vi" ? "Xóa tìm kiếm" : "Clear search"}
              </button>
            </p>
          )}
          <div className="service-grid">
            {filteredServices.map((service) => {
              const conciseCopy =
                serviceCardCopy[service.id as keyof typeof serviceCardCopy]?.[
                  lang
                ] ?? service[lang];
              return (
                <Link
                  className={`service-card service-card-${service.id}`}
                  href={servicePath(
                    seoServices.find((item) => item.id === service.id) ??
                      seoServices[0],
                    lang,
                  )}
                  key={service.id}
                >
                  <div className="service-photo">
                    <Image
                      src={service.image}
                      alt={service[lang].title}
                      fill
                      sizes={
                        service.id === "skin"
                          ? "(max-width: 760px) 92vw, 52vw"
                          : "(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 40vw"
                      }
                    />
                  </div>
                  <div className="service-body">
                    {service.id === "skin" && (
                      <span className="skin-signature">
                        {lang === "vi" ? "Dịch vụ chủ đạo" : "Signature care"}
                      </span>
                    )}
                    <p className="service-summary">
                      {
                        serviceGroupLabels[lang][
                          service.id as keyof typeof serviceGroupLabels.vi
                        ]
                      }
                    </p>
                    <h3>
                      {seoServices.find((item) => item.id === service.id)?.[
                        lang
                      ].name ?? service[lang].title}
                    </h3>
                    <p className="service-description">
                      {conciseCopy.description}
                    </p>
                    <div className="service-suitable">
                      <strong>{t.suitable}</strong>
                      <p>{conciseCopy.suitable}</p>
                    </div>
                    {
                      <p className="service-price-line">
                        <strong>{serviceFacts(service.id, lang)[0]}</strong>
                        <span>{serviceFacts(service.id, lang)[1]}</span>
                      </p>
                    }
                    <span className="service-discover">
                      {t.choose}
                      <IconArrow />
                    </span>
                  </div>
                </Link>
              );
            })}
            {filteredServices.length === 0 && (
              <p className="service-empty">
                {lang === "vi"
                  ? "Chưa tìm thấy dịch vụ phù hợp. Hãy thử một từ khóa khác."
                  : "No matching service yet. Try another keyword."}
              </p>
            )}
          </div>
        </section>

        <section className="knowledge section" id="knowledge">
          <span className="knowledge-orbit" aria-hidden="true" />
          <div className="knowledge-heading">
            <div>
              <h2>
                {lang === "vi"
                  ? "Hiểu đúng để mỗi lựa chọn chăm sóc đều nhẹ nhàng hơn."
                  : "A little knowledge makes every care choice feel easier."}
              </h2>
            </div>
            <p>
              {lang === "vi"
                ? "Đây là nơi Hato Beauty chia sẻ kiến thức chăm sóc da, mi mày, da đầu và cơ thể — giúp bạn hiểu đúng, lựa chọn phù hợp và duy trì kết quả nhẹ nhàng tại nhà."
                : "This is where Hato Beauty shares care knowledge across skin, brow, lash, scalp and body, helping you make informed choices and maintain results at home."}
            </p>
          </div>
          <div className="knowledge-grid">
            {seoServices.slice(0, 4).map((item) => (
              <article className="knowledge-card" key={item.id}>
                <Link href={journalPath(item, lang)} prefetch={false}>
                  <div className="knowledge-image">
                    <Image
                      src={item.image}
                      alt={journalTitle(item, lang)}
                      fill
                      sizes="(max-width: 900px) 82vw, 50vw"
                    />
                  </div>
                  <div className="knowledge-body">
                    <div className="knowledge-meta">
                      <span>{item[lang].name}</span>
                      <small>{journalReadingTime(item, lang)}</small>
                    </div>
                    <h3>{journalTitle(item, lang)}</h3>
                    <span className="knowledge-arrow" aria-hidden="true">
                      <IconArrow />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <p className="knowledge-more">
            <Link
              className="button primary"
              href={lang === "vi" ? "/kien-thuc" : "/en/journal"}
            >
              {lang === "vi" ? "Xem tất cả bài viết" : "View all articles"}
              <IconArrow />
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
