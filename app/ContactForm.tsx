"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

import { trackEvent } from "./analytics";
import { getBookingErrorMessage } from "./booking-errors";
import { ContactChannelFields } from "./ContactChannelFields";
import { contactValueError, parseContactValue } from "./contact-validation";
import { IconArrow } from "./icons";
import type { SeoLang } from "./seo-data";

export function ContactForm({ lang }: { lang: SeoLang }) {
  const submitting = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setError("");
    setIsSubmitting(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const contact = parseContactValue(Object.fromEntries(data));
    if (!contact || contactValueError(contact)) {
      setError(
        lang === "vi"
          ? "Vui lòng kiểm tra thông tin của kênh liên hệ đã chọn."
          : "Please check the details for your selected contact method.",
      );
      submitting.current = false;
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          preference: data.get("preference"),
          social: data.get("social"),
          consent: data.get("consent") === "on",
          message: data.get("message"),
          website: data.get("website"),
          locale: lang,
        }),
      });

      if (!response.ok) {
        trackEvent("contact_submit_error", {
          language: lang,
          response_status: response.status,
        });
        setError(await getBookingErrorMessage(response, lang, "contact"));
        return;
      }

      form.reset();
      setSubmitted(true);
      trackEvent("generate_lead", {
        language: lang,
        contact_channel: String(data.get("preference") || "unknown"),
        lead_source: "contact_form",
      });
    } catch (submitError) {
      console.error(submitError);
      trackEvent("contact_submit_error", {
        language: lang,
        response_status: "network_error",
      });
      setError(
        lang === "vi"
          ? "Chưa thể gửi yêu cầu. Vui lòng thử lại sau ít phút."
          : "We could not send your request. Please try again shortly.",
      );
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="contact-form-success" role="status">
        <span aria-hidden="true">✓</span>
        <h2>
          {lang === "vi"
            ? "hato đã nhận được yêu cầu"
            : "hato has received your request"}
        </h2>
        <p>
          {lang === "vi"
            ? "Đội ngũ sẽ liên hệ với bạn qua phương thức đã chọn."
            : "Our team will contact you through your preferred method."}
        </p>
        <button type="button" onClick={() => setSubmitted(false)}>
          {lang === "vi" ? "Gửi yêu cầu khác" : "Send another request"}
        </button>
      </section>
    );
  }

  return (
    <form className="contact-lead-form" onSubmit={submit}>
      <header>
        <p>{lang === "vi" ? "GỬI YÊU CẦU" : "SEND A REQUEST"}</p>
        <h2>
          {lang === "vi" ? "Để hato liên hệ với bạn" : "Let hato contact you"}
        </h2>
        <span>
          {lang === "vi"
            ? "Chia sẻ nhu cầu của bạn, đội ngũ hato sẽ tư vấn và xác nhận thông tin phù hợp."
            : "Share what you need and the hato team will follow up with suitable information."}
        </span>
      </header>
      <div className="contact-form-grid">
        <label>
          {lang === "vi" ? "Họ và tên *" : "Full name *"}
          <input
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
          />
        </label>
        <ContactChannelFields lang={lang} />
        <label className="contact-form-wide">
          {lang === "vi" ? "Nhu cầu / ghi chú" : "Your needs / notes"}
          <textarea name="message" minLength={2} maxLength={2000} rows={5} />
        </label>
        <label className="contact-form-honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="contact-form-note">
        {lang === "vi"
          ? "Chi phí, thời gian và chính sách chỉ được xác nhận khi hato liên hệ lại."
          : "Pricing, timing and policies are confirmed when hato contacts you."}
      </p>
      <label className="contact-form-consent">
        <input name="consent" type="checkbox" required />
        <span>
          {lang === "vi"
            ? "Tôi đồng ý để hato liên hệ lại về yêu cầu này theo "
            : "I agree that hato may contact me about this request under the "}
          <Link href={lang === "vi" ? "/chinh-sach-bao-mat" : "/en/privacy"}>
            {lang === "vi" ? "chính sách bảo mật" : "privacy policy"}
          </Link>
          .
        </span>
      </label>
      {error && (
        <p className="booking-error" role="alert">
          {error}
        </p>
      )}
      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? lang === "vi"
            ? "Đang gửi..."
            : "Sending..."
          : lang === "vi"
            ? "Gửi yêu cầu"
            : "Send request"}
        <IconArrow />
      </button>
    </form>
  );
}
