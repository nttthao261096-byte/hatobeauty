"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { getBookingErrorMessage } from "./booking-errors";
import { BOOKING_PHONE_PATTERN, getMinimumBookingDate } from "./booking-validation";
import { seoServices, type SeoLang } from "./seo-data";

export function BookingForm({ lang }: { lang: SeoLang }) {
  const minimumBookingDate = getMinimumBookingDate();
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
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          service: data.get("service"),
          date: data.get("date"),
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
    return <section className="booking-page-success" role="status">
      <span aria-hidden="true">✓</span>
      <h2>{lang === "vi" ? "Yêu cầu đã được ghi nhận" : "Your request is received"}</h2>
      <p>{lang === "vi" ? "Đội ngũ hato sẽ liên hệ để lắng nghe nhu cầu và xác nhận thời gian phù hợp." : "The hato team will contact you to discuss your needs and confirm a suitable time."}</p>
      <button type="button" onClick={() => setSubmitted(false)}>{lang === "vi" ? "Gửi yêu cầu khác" : "Send another request"}</button>
    </section>;
  }

  return <form className="booking-page-form" onSubmit={submit}>
    <div className="booking-form-heading">
      <p className="seo-eyebrow">{lang === "vi" ? "THÔNG TIN LỊCH HẸN" : "APPOINTMENT DETAILS"}</p>
      <h2>{lang === "vi" ? "Chúng tôi có thể hỗ trợ bạn điều gì?" : "How can we care for you?"}</h2>
      <p>{lang === "vi" ? "Điền thông tin bên dưới. hato sẽ gọi lại để tư vấn, xác nhận dịch vụ, chi phí và địa điểm trước buổi hẹn." : "Share the details below. hato will call to discuss the service, price and location before your visit."}</p>
    </div>
    <div className="booking-form-grid">
      <label>{lang === "vi" ? "Họ và tên" : "Full name"}<input name="name" autoComplete="name" minLength={2} maxLength={120} required /></label>
      <label>{lang === "vi" ? "Số điện thoại" : "Phone number"}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={8} maxLength={30} pattern={BOOKING_PHONE_PATTERN} title={lang === "vi" ? "Nhập số điện thoại gồm 8–15 chữ số." : "Enter a phone number containing 8–15 digits."} required /></label>
      <label>{lang === "vi" ? "Dịch vụ quan tâm" : "Service of interest"}<select name="service" defaultValue="" required><option value="" disabled>{lang === "vi" ? "Chọn một dịch vụ" : "Choose a service"}</option>{seoServices.map(service => <option value={service.id} key={service.id}>{service[lang].name}</option>)}</select></label>
      <label>{lang === "vi" ? "Ngày mong muốn" : "Preferred date"}<input name="date" type="date" min={minimumBookingDate} required /></label>
    </div>
    <p className="booking-consent">{lang === "vi" ? "Khi gửi yêu cầu, bạn đồng ý để hato liên hệ về lịch hẹn này theo " : "By sending this request, you agree that hato may contact you about this appointment under the "}<Link href="/chinh-sach-bao-mat/">{lang === "vi" ? "chính sách bảo mật" : "privacy policy"}</Link>.</p>
    {error && <p className="booking-error" role="alert">{error}</p>}
    <button className="seo-cta" type="submit" disabled={isSubmitting}>{isSubmitting ? (lang === "vi" ? "Đang gửi..." : "Sending...") : (lang === "vi" ? "Gửi yêu cầu đặt lịch" : "Send booking request")} <span>↗</span></button>
  </form>;
}
