import Image from "next/image";
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
      <main className="plan-page">
        <nav className="plan-crumbs" aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}>
          <Link href={lang === "vi" ? "/" : "/en/"}>{lang === "vi" ? "Trang chủ" : "Home"}</Link>
          <span>/</span>
          <span>{lang === "vi" ? "Lộ trình da" : "Skin plan"}</span>
        </nav>

        <section className="plan-hero">
          <div className="plan-hero-copy">
            <p className="eyebrow">{lang === "vi" ? "hato Beauty · Đà Nẵng" : "hato Beauty · Da Nang"}</p>
            <h1>{lang === "vi" ? "Soi da. Chăm đúng việc. Mang về nhà." : "Check the skin. Do the right work. Take it home."}</h1>
            <p className="plan-lead">
              {lang === "vi"
                ? "Lộ trình ở hato gồm bốn phần nối nhau: soi da, liệu trình tại spa, bộ dưỡng dùng sáng/tối, rồi hẹn tái đánh giá sau 4–6 tuần. Giá và mục tiêu nói trước khi nằm ghế."
                : "A hato plan has four linked parts: a skin check, treatment in the room, an AM/PM home set, then a review in 4–6 weeks. Price and aim are said before you lie down."}
            </p>
            <div className="plan-hero-actions">
              <a className="button primary" href={consult} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Đặt lịch soi da" : "Book a skin check"}<IconArrow /></a>
              <a className="button ghost" href="#products">{lang === "vi" ? "Xem sản phẩm theo lộ trình" : "See products in the plan"}<IconArrow /></a>
            </div>
            <ul className="plan-trust">
              <li><strong>4.9/5</strong><span>{lang === "vi" ? "điểm khách" : "guest score"}</span></li>
              <li><strong>5.000+</strong><span>{lang === "vi" ? "khách đã đến" : "guests"}</span></li>
              <li><strong>08:00–19:30</strong><span>Đà Nẵng</span></li>
            </ul>
          </div>
          <div className="plan-hero-media">
            <Image src="/images/lifestyle-skin-assess-v1.jpg" alt={lang === "vi" ? "Soi da tại hato Beauty" : "Skin check at hato Beauty"} fill sizes="(max-width: 900px) 100vw, 48vw" unoptimized />
          </div>
        </section>

        <section className="plan-steps" id="steps" aria-labelledby="steps-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Năm bước" : "Five steps"}</p>
            <h2 id="steps-title">{lang === "vi" ? "Buổi đầu diễn ra như thế nào" : "How the first visit runs"}</h2>
            <p>{lang === "vi" ? "Mỗi bước có việc cụ thể và thứ bạn mang về. Không thêm gói cho đủ checklist." : "Each step has a job and something you leave with. No extra package to fill a checklist."}</p>
          </header>
          <ol className="plan-stepper">
            {careSteps.map((step) => (
              <li key={step.id}>
                <span className="plan-step-num">{step.id}</span>
                <h3>{step[lang].title}</h3>
                <p>{step[lang].body}</p>
                <p className="plan-step-meta"><strong>{step.minutes[lang]}</strong><span>{step.output[lang]}</span></p>
              </li>
            ))}
          </ol>
        </section>

        <section className="plan-journeys" id="journeys" aria-labelledby="journeys-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Theo tình trạng da" : "By skin need"}</p>
            <h2 id="journeys-title">{lang === "vi" ? "Bốn lộ trình da hay gặp" : "Four plans we see most"}</h2>
            <p>{lang === "vi" ? "Chọn hướng gần nhất. Soi da sẽ chỉnh số buổi và món mang về." : "Pick the nearest match. The skin check will trim sessions and take-home items."}</p>
          </header>
          <div className="plan-journey-grid">
            {skinJourneys.map((journey) => (
              <article className="plan-journey-card" key={journey.id} id={`journey-${journey.id}`}>
                <div className="plan-journey-photo">
                  <Image src={journey.image} alt={journey[lang].name} fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized />
                </div>
                <div className="plan-journey-copy">
                  <h3>{journey[lang].name}</h3>
                  <p className="plan-fit"><strong>{lang === "vi" ? "Phù hợp với" : "Best for"}</strong> {journey[lang].fit}</p>
                  <table>
                    <caption>{lang === "vi" ? "Buổi spa gợi ý" : "Suggested spa visits"}</caption>
                    <tbody>
                      {journey[lang].sessions.map(([name, freq, price]) => (
                        <tr key={name}><th>{name}</th><td>{freq}</td><td>{price}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="plan-journey-products">
                    {journey.products.map((id) => {
                      const item = productById(id);
                      if (!item) return null;
                      return (
                        <li key={id}>
                          <Image src={item.image} alt="" width={56} height={70} unoptimized />
                          <span>
                            <b>{item[lang].name}</b>
                            <small>{item.size} · {item.when[lang]} · {formatVnd(item.price)}</small>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="plan-result">{journey[lang].result}</p>
                  <a className="button ghost" href={consult} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Đặt lịch soi da cho lộ trình này" : "Book a check for this plan"}<IconArrow /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="plan-products" id="products" aria-labelledby="products-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Mang về nhà" : "Take home"}</p>
            <h2 id="products-title">{lang === "vi" ? "Sản phẩm chăm sóc da dùng cùng lộ trình" : "Skin products that sit with the plan"}</h2>
            <p>{SAMPLE_PRICE_NOTE[lang]}</p>
          </header>
          <div className="product-grid">
            {careProducts.map((product) => <ProductCard product={product} lang={lang} key={product.id} />)}
          </div>
          <p className="plan-products-more"><Link className="button ghost" href={lang === "vi" ? "/san-pham/" : "/en/care-products/"}>{lang === "vi" ? "Xem tất cả sản phẩm" : "View all products"}<IconArrow /></Link></p>
        </section>

        <section className="plan-combos" id="combos" aria-labelledby="combos-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Bộ theo lộ trình" : "Plan sets"}</p>
            <h2 id="combos-title">{lang === "vi" ? "Ba bộ tiết kiệm nếu dùng đủ món" : "Three sets that save if you use every item"}</h2>
          </header>
          <div className="plan-combo-grid">
            {careCombos.map((combo) => {
              const items = combo.items.map((id) => productById(id)).filter(Boolean);
              const retail = items.reduce((sum, item) => sum + (item?.price ?? 0), 0);
              const setPrice = retail - combo.save;
              return (
                <article className="plan-combo-card" key={combo.id}>
                  <div className="plan-combo-photo">
                    <Image src={combo.image} alt={combo[lang].name} fill sizes="(max-width: 900px) 100vw, 33vw" unoptimized />
                  </div>
                  <h3>{combo[lang].name}</h3>
                  <p className="product-price">{formatVnd(setPrice)}</p>
                  <p className="plan-combo-save">{lang === "vi" ? `Lẻ ${formatVnd(retail)} · tiết kiệm ${formatVnd(combo.save)}` : `Singly ${formatVnd(retail)} · save ${formatVnd(combo.save)}`}</p>
                  <p>{combo[lang].fit}</p>
                  <ul>{items.map((item) => item && <li key={item.id}>{item[lang].name} · {item.size}</li>)}</ul>
                  <a href={consult} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Hỏi chuyên viên về bộ này" : "Ask about this set"}<IconArrow /></a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="plan-pricing" id="pricing" aria-labelledby="pricing-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Giá spa" : "Spa prices"}</p>
            <h2 id="pricing-title">{lang === "vi" ? "Thời lượng và giá từ–đến cho da" : "Time and from–to prices for skin"}</h2>
            <p>{lang === "vi" ? "Giá chốt sau khi soi da. Không phát sinh bước nếu bạn không đồng ý." : "Final price after the skin check. No extra step unless you agree."}</p>
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
                  <td>{row.from === 0 ? (lang === "vi" ? "Trong buổi liệu trình / nhắn trước" : "Inside a treatment / message first") : `${formatVnd(row.from)} – ${formatVnd(row.to)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="plan-visit" aria-labelledby="visit-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Trước & sau buổi" : "Before & after"}</p>
            <h2 id="visit-title">{lang === "vi" ? "Việc nhỏ giúp da chịu buổi tốt hơn" : "Small habits that help the visit land"}</h2>
          </header>
          <div className="plan-visit-grid">
            <article>
              <h3>{lang === "vi" ? "Trước khi đến" : "Before you arrive"}</h3>
              <ul>{notes.before.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <h3>{lang === "vi" ? "48 giờ sau" : "The next 48 hours"}</h3>
              <ul>{notes.after.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="plan-faq" aria-labelledby="faq-title">
          <header className="plan-section-head">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">{lang === "vi" ? "Câu hỏi trước khi đặt" : "Questions before you book"}</h2>
          </header>
          {careFaqs.map((item) => (
            <details key={item[lang][0]}>
              <summary>{item[lang][0]}</summary>
              <p>{item[lang][1]}</p>
            </details>
          ))}
        </section>

        <section className="plan-close" id="book">
          <h2>{lang === "vi" ? "Sẵn sàng soi da?" : "Ready for a skin check?"}</h2>
          <p>{lang === "vi" ? "Nhắn Zalo hoặc để số. Chúng tôi gọi lại trong giờ 08:00–19:30." : "Message WhatsApp or leave a number. We call back between 08:00 and 19:30."}</p>
          <div className="plan-hero-actions">
            <a className="button primary" href={consult} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Nhắn Zalo 0703 214 868" : "WhatsApp +84 703 214 868"}<IconArrow /></a>
            <Link className="button ghost" href={lang === "vi" ? "/dat-lich/" : "/en/book/"}>{lang === "vi" ? "Đặt lịch trên web" : "Book on the site"}<IconArrow /></Link>
          </div>
        </section>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}
