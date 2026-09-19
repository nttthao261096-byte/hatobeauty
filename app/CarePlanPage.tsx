import Image from "./OptimizedImage";
import Link from "next/link";

import {
  SAMPLE_PRICE_NOTE,
  careCombos,
  careFaqs,
  careProducts,
  careSteps,
  formatVnd,
  productById,
  skinJourneys,
  spaSkinPrices,
  visitNotes,
  type CareLang,
} from "./care-catalog";
import { bookingPath } from "./route-paths";
import { ProductCard } from "./ProductCard";
import { IconArrow } from "./icons";
import { SeoFooter, SeoHeader } from "./seo-pages";

const zalo = "https://zalo.me/0703214868";
const wa = "https://wa.me/84703214868";

export function CarePlanPage({ lang }: { lang: CareLang }) {
  const consult = lang === "vi" ? zalo : wa;
  const notes = visitNotes[lang];

  return (
    <div className="seo-page care-plan-page" lang={lang}>
      <SeoHeader lang={lang} />
      <main id="main-content" tabIndex={-1} className="plan-page">
        <nav
          className="plan-crumbs"
          aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}
        >
          <Link href={lang === "vi" ? "/" : "/en"}>
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <span>/</span>
          <span>{lang === "vi" ? "Lộ trình da" : "Skin plan"}</span>
        </nav>

        <section className="plan-hero">
          <div className="plan-hero-copy">
            <p className="eyebrow">
              {lang === "vi"
                ? "Hato Beauty · Đà Nẵng"
                : "Hato Beauty · Da Nang"}
            </p>
            <h1>
              {lang === "vi"
                ? "Hiểu làn da, chăm sóc phù hợp."
                : "Personalised skincare, from your visit to your daily routine."}
            </h1>
            <p className="plan-lead">
              {lang === "vi"
                ? "Bắt đầu bằng lắng nghe và đánh giá nhu cầu của da. Hato Beauty cùng bạn lựa chọn chăm sóc tại spa và tại nhà, đồng thời xác nhận chi phí trước khi thực hiện."
                : "Start with a conversation about your skin. We explain the care plan and confirm pricing before your visit, with home-care guidance tailored to your needs."}
            </p>
            <div className="plan-hero-actions">
              <a className="button primary" href={bookingPath(lang, "skin")}>
                {lang === "vi" ? "Đặt lịch hẹn" : "Request an appointment"}
                <IconArrow />
              </a>
              <a className="button ghost" href="#steps">
                {lang === "vi"
                  ? "Xem các bước chăm sóc"
                  : "Explore the care steps"}
                <IconArrow />
              </a>
            </div>
          </div>
          <div className="plan-hero-media">
            <Image
              priority
              src="/images/lifestyle-skin-assess-v1.jpg"
              alt={
                lang === "vi"
                  ? "Minh họa bước đánh giá nhu cầu chăm sóc da"
                  : "Illustration of a skincare consultation"
              }
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </section>

        <section
          className="plan-steps"
          id="steps"
          aria-labelledby="steps-title"
        >
          <header className="plan-section-head">
            <p className="eyebrow">
              {lang === "vi" ? "Năm bước" : "Five steps"}
            </p>
            <h2 id="steps-title">
              {lang === "vi"
                ? "Buổi đầu diễn ra như thế nào"
                : "How the first visit runs"}
            </h2>
            <p>
              {lang === "vi"
                ? "Mỗi bước được lựa chọn theo tình trạng da và nhu cầu của bạn."
                : "Each step is selected for your skin and your needs."}
            </p>
          </header>
          <ol className="plan-stepper">
            {careSteps.map((step) => (
              <li key={step.id}>
                <span className="plan-step-num">{step.id}</span>
                <h3>{step[lang].title}</h3>
                <p>{step[lang].body}</p>
                <p className="plan-step-meta">
                  <span>{step.output[lang]}</span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        {skinJourneys.length > 0 && (
          <section
            className="plan-journeys"
            id="journeys"
            aria-labelledby="journeys-title"
          >
            <header className="plan-section-head">
              <p className="eyebrow">
                {lang === "vi" ? "Theo tình trạng da" : "By skin need"}
              </p>
              <h2 id="journeys-title">
                {lang === "vi"
                  ? "Bốn lộ trình da hay gặp"
                  : "Four plans we see most"}
              </h2>
              <p>
                {lang === "vi"
                  ? "Chọn hướng gần nhất. Soi da sẽ chỉnh số buổi và món mang về."
                  : "Pick the nearest match. The skin check will trim sessions and take-home items."}
              </p>
            </header>
            <div className="plan-journey-grid">
              {skinJourneys.map((journey) => (
                <article
                  className="plan-journey-card"
                  key={journey.id}
                  id={`journey-${journey.id}`}
                >
                  <div className="plan-journey-photo">
                    <Image
                      src={journey.image}
                      alt={journey[lang].name}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  </div>
                  <div className="plan-journey-copy">
                    <h3>{journey[lang].name}</h3>
                    <p className="plan-fit">
                      <strong>
                        {lang === "vi" ? "Phù hợp với" : "Best for"}
                      </strong>{" "}
                      {journey[lang].fit}
                    </p>
                    <table>
                      <caption>
                        {lang === "vi"
                          ? "Buổi spa gợi ý"
                          : "Suggested spa visits"}
                      </caption>
                      <tbody>
                        {journey[lang].sessions.map(([name, freq, price]) => (
                          <tr key={name}>
                            <th>{name}</th>
                            <td>{freq}</td>
                            <td>{price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <ul className="plan-journey-products">
                      {journey.products.map((id) => {
                        const item = productById(id);
                        if (!item) return null;
                        return (
                          <li key={id}>
                            <Image
                              src={item.image}
                              alt=""
                              width={56}
                              height={70}
                            />
                            <span>
                              <b>{item[lang].name}</b>
                              <small>
                                {item.size} · {item.when[lang]} ·{" "}
                                {"priceLabel" in item
                                  ? item.priceLabel[lang]
                                  : formatVnd(item.price)}
                              </small>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="plan-result">{journey[lang].result}</p>
                    <a
                      className="button ghost"
                      href={consult}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lang === "vi"
                        ? "Đặt lịch soi da cho lộ trình này"
                        : "Book a check for this plan"}
                      <IconArrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {careProducts.length > 0 && (
          <section
            className="plan-products"
            id="products"
            aria-labelledby="products-title"
          >
            <header className="plan-section-head">
              <p className="eyebrow">
                {lang === "vi" ? "Mang về nhà" : "Take home"}
              </p>
              <h2 id="products-title">
                {lang === "vi"
                  ? "Sản phẩm chăm sóc da dùng cùng lộ trình"
                  : "Home care to complement your facial"}
              </h2>
              <p>{SAMPLE_PRICE_NOTE[lang]}</p>
            </header>
            <div className="product-grid">
              {careProducts.map((product) => (
                <ProductCard product={product} lang={lang} key={product.id} />
              ))}
            </div>
            <p className="plan-products-more">
              <Link
                className="button ghost"
                href={lang === "vi" ? "/san-pham" : "/en/care-products"}
              >
                {lang === "vi" ? "Xem tất cả sản phẩm" : "View all products"}
                <IconArrow />
              </Link>
            </p>
          </section>
        )}

        {careCombos.length > 0 && (
          <section
            className="plan-combos"
            id="combos"
            aria-labelledby="combos-title"
          >
            <header className="plan-section-head">
              <p className="eyebrow">
                {lang === "vi" ? "Bộ theo lộ trình" : "Plan sets"}
              </p>
              <h2 id="combos-title">
                {lang === "vi"
                  ? "Ba bộ tiết kiệm nếu dùng đủ món"
                  : "Three sets that save if you use every item"}
              </h2>
            </header>
            <div className="plan-combo-grid">
              {careCombos.map((combo) => {
                const items = combo.items
                  .map((id) => productById(id))
                  .filter(Boolean);
                const retail = items.reduce(
                  (sum, item) => sum + (item?.price ?? 0),
                  0,
                );
                const setPrice = retail - combo.save;
                const needsPriceConfirmation = items.some(
                  (item) => item && "priceLabel" in item,
                );
                return (
                  <article className="plan-combo-card" key={combo.id}>
                    <div className="plan-combo-photo">
                      <Image
                        src={combo.image}
                        alt={combo[lang].name}
                        fill
                        sizes="(max-width: 900px) 100vw, 33vw"
                      />
                    </div>
                    <h3>{combo[lang].name}</h3>
                    <p className="product-price">
                      {needsPriceConfirmation
                        ? lang === "vi"
                          ? "Liên hệ"
                          : "Contact us"
                        : formatVnd(setPrice)}
                    </p>
                    <p className="plan-combo-save">
                      {needsPriceConfirmation
                        ? lang === "vi"
                          ? "Vui lòng xác nhận giá với chuyên viên"
                          : "Please confirm pricing with the team"
                        : lang === "vi"
                          ? `Lẻ ${formatVnd(retail)} · tiết kiệm ${formatVnd(combo.save)}`
                          : `Singly ${formatVnd(retail)} · save ${formatVnd(combo.save)}`}
                    </p>
                    <p>{combo[lang].fit}</p>
                    <ul>
                      {items.map(
                        (item) =>
                          item && (
                            <li key={item.id}>
                              {item[lang].name} · {item.size}
                            </li>
                          ),
                      )}
                    </ul>
                    <a href={consult} target="_blank" rel="noopener noreferrer">
                      {lang === "vi"
                        ? "Hỏi chuyên viên về bộ này"
                        : "Ask about this set"}
                      <IconArrow />
                    </a>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {spaSkinPrices.length > 0 && (
          <section
            className="plan-pricing"
            id="pricing"
            aria-labelledby="pricing-title"
          >
            <header className="plan-section-head">
              <p className="eyebrow">
                {lang === "vi" ? "Giá spa" : "Spa prices"}
              </p>
              <h2 id="pricing-title">
                {lang === "vi"
                  ? "Thời lượng và giá từ–đến cho da"
                  : "Time and from–to prices for skin"}
              </h2>
              <p>
                {lang === "vi"
                  ? "Giá chốt sau khi soi da. Không phát sinh bước nếu bạn không đồng ý."
                  : "Final price after the skin check. No extra step unless you agree."}
              </p>
            </header>
            <table className="plan-price-table">
              <thead>
                <tr>
                  <th>{lang === "vi" ? "Dịch vụ" : "Service"}</th>
                  <th>{lang === "vi" ? "Phút" : "Minutes"}</th>
                  <th>{lang === "vi" ? "Giá" : "Price"}</th>
                </tr>
              </thead>
              <tbody>
                {spaSkinPrices.map((row) => (
                  <tr key={row.vi}>
                    <th>{row[lang]}</th>
                    <td>{row.minutes}</td>
                    <td>
                      {row.from === 0
                        ? lang === "vi"
                          ? "Trong buổi liệu trình / nhắn trước"
                          : "Inside a treatment / message first"
                        : `${formatVnd(row.from)} – ${formatVnd(row.to)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section className="plan-visit" aria-labelledby="visit-title">
          <header className="plan-section-head">
            <p className="eyebrow">
              {lang === "vi" ? "Trước & sau buổi" : "Before & after"}
            </p>
            <h2 id="visit-title">
              {lang === "vi"
                ? "Trước và sau buổi chăm sóc"
                : "Before and after your visit"}
            </h2>
          </header>
          <div className="plan-visit-grid">
            <article>
              <h3>{lang === "vi" ? "Trước khi đến" : "Before you arrive"}</h3>
              <ul>
                {notes.before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>{lang === "vi" ? "Sau buổi hẹn" : "After your visit"}</h3>
              <ul>
                {notes.after.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="plan-faq" aria-labelledby="faq-title">
          <header className="plan-section-head">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">
              {lang === "vi"
                ? "Câu hỏi trước khi đặt"
                : "Questions before you book"}
            </h2>
          </header>
          {careFaqs.map((item) => (
            <details key={item[lang][0]}>
              <summary>{item[lang][0]}</summary>
              <p>{item[lang][1]}</p>
            </details>
          ))}
        </section>

        <section className="plan-close" id="book">
          <h2>
            {lang === "vi" ? "Sẵn sàng soi da?" : "Ready for a skin check?"}
          </h2>
          <p>
            {lang === "vi"
              ? "Gửi yêu cầu đặt lịch hoặc nhắn Zalo để trao đổi về nhu cầu chăm sóc da."
              : "Send an appointment request or message us on WhatsApp to discuss your skincare needs."}
          </p>
          <div className="plan-hero-actions">
            <a
              className="button primary"
              href={consult}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang === "vi"
                ? "Nhắn Zalo 0703 214 868"
                : "WhatsApp +84 703 214 868"}
              <IconArrow />
            </a>
            <Link className="button ghost" href={bookingPath(lang, "skin")}>
              {lang === "vi"
                ? "Gửi yêu cầu đặt lịch"
                : "Request an appointment"}
              <IconArrow />
            </Link>
          </div>
        </section>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}
