"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

import { getBookingErrorMessage } from "./booking-errors";
import { ContactChannelFields } from "./ContactChannelFields";
import { contactValueError, parseContactValue } from "./contact-validation";
import { approvedServiceOptions, publicServiceCatalog } from "./business-data";
import { IconArrow } from "./icons";
import { type SeoLang } from "./seo-data";
import { useMinimumBookingDate } from "./use-minimum-booking-date";

export function BookingForm({
  lang,
  initialService = "",
  initialOption = "",
}: {
  lang: SeoLang;
  initialService?: string;
  initialOption?: string;
}) {
  const [serviceId, setServiceId] = useState(
    publicServiceCatalog.some((service) => service.id === initialService)
      ? initialService
      : "",
  );
  const options = approvedServiceOptions(serviceId);
  const submitting = useRef(false);
  const minimumBookingDate = useMinimumBookingDate();
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
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          social: data.get("social"),
          preference: data.get("preference"),
          option: data.get("option"),
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
      <section className="booking-page-success" role="status">
        <span aria-hidden="true">✓</span>
        <h2>
          {lang === "vi"
            ? "Yêu cầu đã được ghi nhận"
            : "We’ve received your request"}
        </h2>
        <p>
          {lang === "vi"
            ? "Lịch hẹn chưa được xác nhận. Hato Beauty sẽ liên hệ qua kênh bạn đã chọn để xác nhận dịch vụ và thời gian."
            : "Your appointment is not confirmed yet. We’ll contact you through your preferred channel to confirm the service and availability."}
        </p>
        <button type="button" onClick={() => setSubmitted(false)}>
          {lang === "vi" ? "Gửi yêu cầu khác" : "Send another request"}
        </button>
      </section>
    );
  }

  return (
    <form className="booking-page-form" onSubmit={submit}>
      <div className="booking-form-heading">
        <p className="seo-eyebrow">
          {lang === "vi" ? "THÔNG TIN LỊCH HẸN" : "APPOINTMENT DETAILS"}
        </p>
        <h2>{lang === "vi" ? "Thông tin của bạn" : "Your details"}</h2>
      </div>
      <div className="booking-form-grid">
        <label>
          {lang === "vi" ? "Họ và tên" : "Full name"}
          <input
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
          />
        </label>
        <ContactChannelFields lang={lang} />
        <label>
          {lang === "vi" ? "Dịch vụ quan tâm" : "Service of interest"}
          <select
            name="service"
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
            required
          >
            <option value="" disabled>
              {lang === "vi" ? "Chọn một dịch vụ" : "Choose a service"}
            </option>
            {publicServiceCatalog.map((service) => (
              <option value={service.id} key={service.id}>
                {service[lang].name}
              </option>
            ))}
          </select>
        </label>
        {options.length > 0 && (
          <label>
            {lang === "vi" ? "Lựa chọn dịch vụ" : "Service option"}
            <select
              key={serviceId}
              name="option"
              defaultValue={
                options.some((option) => option.id === initialOption)
                  ? initialOption
                  : ""
              }
            >
              <option value="">
                {lang === "vi" ? "Cần tư vấn thêm" : "Help me choose"}
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name[lang]}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          {lang === "vi" ? "Ngày mong muốn" : "Preferred date"}
          <input name="date" type="date" min={minimumBookingDate} required />
        </label>
      </div>
      <p className="booking-consent">
        {lang === "vi"
          ? "Khi gửi yêu cầu, bạn đồng ý để hato liên hệ về lịch hẹn này theo "
          : "By sending this request, you agree that hato may contact you about this appointment under the "}
        <Link href={lang === "vi" ? "/chinh-sach-bao-mat" : "/en/privacy"}>
          {lang === "vi" ? "chính sách bảo mật" : "privacy policy"}
        </Link>
        .
      </p>
      {error && (
        <p className="booking-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="seo-cta button primary"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? lang === "vi"
            ? "Đang gửi..."
            : "Sending..."
          : lang === "vi"
            ? "Gửi yêu cầu đặt lịch"
            : "Send booking request"}{" "}
        <IconArrow />
      </button>
    </form>
  );
}
