"use client";

import { useState, type FormEvent } from "react";
import Image from "./OptimizedImage";
import { ContactDetails, ContactSocials } from "./ContactDetails";
import { IconArrow } from "./icons";
import { mediaUrl, type SeoLang } from "./seo-data";
import { pageRoutes } from "./route-paths";

export function SiteFooter({ lang }: { lang: SeoLang }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const navItems = [
    [pageRoutes.services[lang], lang === "vi" ? "Dịch vụ" : "Services"],
    [
      pageRoutes.prices[lang],
      lang === "vi" ? "Giá & lựa chọn" : "Prices & options",
    ],
    [pageRoutes.journal[lang], lang === "vi" ? "Kiến thức" : "Journal"],
    [pageRoutes.contact[lang], lang === "vi" ? "Liên hệ" : "Contact"],
  ];
  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject =
      lang === "vi"
        ? "Yêu cầu đăng ký nhận ưu đãi"
        : "Request to receive offers";
    const body =
      lang === "vi"
        ? `Tôi muốn đăng ký nhận email ưu đãi của Hato Beauty tại: ${newsletterEmail}. Vui lòng xác nhận cách đăng ký và ngừng nhận email.`
        : `I would like to receive Hato Beauty offers at: ${newsletterEmail}. Please confirm how to subscribe and unsubscribe.`;
    window.location.href = `mailto:hatobeautydanang@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return (
    <footer className="site-footer" id="contact">
      <span className="footer-halo footer-halo-one" aria-hidden="true" />
      <span className="footer-halo footer-halo-two" aria-hidden="true" />
      <div className="footer-intro footer-newsletter">
        <div className="footer-newsletter-copy">
          <p className="eyebrow">
            {lang === "vi"
              ? "Ưu đãi dành riêng cho bạn"
              : "A thoughtful note for you"}
          </p>
          <h2>
            {lang === "vi"
              ? "Nhận ưu đãi mới mỗi tháng."
              : "Receive new offers each month."}
          </h2>
          <p>
            {lang === "vi"
              ? "Gợi ý chăm sóc theo mùa và cập nhật hữu ích từ Hato Beauty."
              : "Seasonal care ideas and useful updates from Hato Beauty."}
          </p>
        </div>
        <form className="footer-newsletter-form" onSubmit={submitNewsletter}>
          <label htmlFor={`newsletter-email-${lang}`}>
            {lang === "vi" ? "Email của bạn" : "Your email"}
          </label>
          <div>
            <input
              id={`newsletter-email-${lang}`}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder={lang === "vi" ? "Email của bạn" : "Your email"}
              value={newsletterEmail}
              onChange={(event) => {
                setNewsletterEmail(event.target.value);
              }}
            />
            <button type="submit">
              {lang === "vi" ? "Soạn email đăng ký" : "Email to subscribe"}
              <IconArrow />
            </button>
          </div>
          <p className="newsletter-message">
            {lang === "vi"
              ? "Nút này mở ứng dụng email. Bạn cần gửi email để yêu cầu đăng ký; website không tự ghi nhận đăng ký."
              : "This opens your email app. Send the email to request a subscription; this website does not subscribe you automatically."}
          </p>
        </form>
      </div>
      <div className="footer-brand">
        <Image
          src={mediaUrl("/brand/hato-logo-transparent-v3.png")}
          alt="Hato Beauty"
          width={1016}
          height={638}
          sizes="(max-width: 760px) 280px, (max-width: 1100px) 320px, 380px"
        />
        <ContactSocials lang={lang} />
      </div>
      <div className="footer-links">
        <h3>{lang === "vi" ? "Khám phá" : "Discover"}</h3>
        {navItems.slice(0, 4).map(([href, label], index) => (
          <a href={href} key={href}>
            <span>0{index + 1}</span>
            {label}
          </a>
        ))}
      </div>
      <div className="footer-contact">
        <h3>{lang === "vi" ? "Hẹn cùng chúng tôi" : "Plan your visit"}</h3>
        <ContactDetails lang={lang} compact showSocials={false} />
      </div>
      <div className="footer-bottom">
        <span>© 2026 Hato Beauty</span>
        <div>
          <a href="#top">{lang === "vi" ? "Về đầu trang" : "Back to top"} ↑</a>
          <a
            href={
              lang === "vi" ? "/chinh-sach-bien-tap" : "/en/editorial-policy"
            }
          >
            {lang === "vi" ? "Biên tập" : "Editorial"}
          </a>
          <a href={lang === "vi" ? "/chinh-sach-bao-mat" : "/en/privacy"}>
            {lang === "vi" ? "Bảo mật" : "Privacy"}
          </a>
        </div>
      </div>
    </footer>
  );
}
