"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { getBookingErrorMessage } from "./booking-errors";
import { BOOKING_PHONE_PATTERN } from "./booking-validation";
import type { SeoLang } from "./seo-data";

export function ContactForm({ lang }: { lang: SeoLang }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          preference: data.get("preference"),
          message: data.get("message"),
          website: data.get("website"),
          locale: lang,
        }),
      });

      if (!response.ok) {
        setError(await getBookingErrorMessage(response, lang));
        return;
      }

      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      console.error(submitError);
      setError(lang === "vi" ? "Chưa thể gửi yêu cầu. Vui lòng thử lại sau ít phút." : "We could not send your request. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return <section className="contact-form-success" role="status">
      <span aria-hidden="true">✓</span>
      <h2>{lang === "vi" ? "hato đã nhận được yêu cầu" : "hato has received your request"}</h2>
      <p>{lang === "vi" ? "Đội ngũ sẽ liên hệ với bạn qua phương thức đã chọn trong thời gian sớm nhất." : "Our team will contact you through your preferred method as soon as possible."}</p>
      <button type="button" onClick={() => setSubmitted(false)}>{lang === "vi" ? "Gửi yêu cầu khác" : "Send another request"}</button>
    </section>;
  }

  return <form className="contact-lead-form" onSubmit={submit}>
    <header>
      <p>{lang === "vi" ? "GỬI YÊU CẦU" : "SEND A REQUEST"}</p>
      <h2>{lang === "vi" ? "Để hato liên hệ với bạn" : "Let hato contact you"}</h2>
      <span>{lang === "vi" ? "Chia sẻ nhu cầu của bạn, đội ngũ hato sẽ tư vấn và xác nhận thông tin phù hợp." : "Share what you need and the hato team will follow up with suitable information."}</span>
    </header>
    <div className="contact-form-grid">
      <label>{lang === "vi" ? "Họ và tên *" : "Full name *"}<input name="name" autoComplete="name" minLength={2} maxLength={120} required /></label>
      <label>{lang === "vi" ? "Số điện thoại *" : "Phone number *"}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={8} maxLength={30} pattern={BOOKING_PHONE_PATTERN} title={lang === "vi" ? "Nhập số điện thoại gồm 8–15 chữ số." : "Enter a phone number containing 8–15 digits."} required /></label>
      <label className="contact-form-wide">{lang === "vi" ? "Email (nếu có)" : "Email (optional)"}<input name="email" type="email" autoComplete="email" maxLength={254} /></label>
      <label className="contact-form-wide">{lang === "vi" ? "Bạn muốn hato liên hệ bằng cách nào?" : "How should hato contact you?"}<select name="preference" defaultValue="phone"><option value="phone">{lang === "vi" ? "Liên hệ lại qua điện thoại" : "Call me by phone"}</option><option value="email">{lang === "vi" ? "Liên hệ lại qua email" : "Contact me by email"}</option><option value="whatsapp">WhatsApp</option><option value="instagram">Instagram</option><option value="facebook">Facebook</option></select></label>
      <label className="contact-form-wide">{lang === "vi" ? "Nhu cầu / ghi chú" : "Your needs / notes"}<textarea name="message" maxLength={2000} rows={5} /></label>
      <label className="contact-form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
    <p className="contact-form-note">{lang === "vi" ? "Chi phí, thời gian và chính sách chỉ được xác nhận khi hato liên hệ lại." : "Pricing, timing and policies are confirmed when hato contacts you."}</p>
    <label className="contact-form-consent"><input type="checkbox" required /><span>{lang === "vi" ? "Tôi đồng ý để hato liên hệ lại về yêu cầu này theo " : "I agree that hato may contact me about this request under the "}<Link href={lang === "vi" ? "/chinh-sach-bao-mat/" : "/en/privacy/"}>{lang === "vi" ? "chính sách bảo mật" : "privacy policy"}</Link>.</span></label>
    {error && <p className="booking-error" role="alert">{error}</p>}
    <button type="submit" disabled={isSubmitting}>{isSubmitting ? (lang === "vi" ? "Đang gửi..." : "Sending...") : (lang === "vi" ? "Gửi yêu cầu" : "Send request")}<span aria-hidden="true">↗</span></button>
  </form>;
}
