"use client";

import { useId, useState } from "react";
import {
  channelLabels,
  contactChannels,
  contactValueError,
  type ContactChannel,
} from "./contact-validation";
import { BOOKING_PHONE_PATTERN } from "./booking-validation";
import type { SeoLang } from "./seo-data";

export function ContactChannelFields({ lang }: { lang: SeoLang }) {
  const [channel, setChannel] = useState<ContactChannel>("phone");
  const id = useId();
  const isPhone = channel === "phone" || channel === "whatsapp";
  const hint =
    channel === "whatsapp"
      ? lang === "vi"
        ? "Gồm mã quốc gia, ví dụ +84…"
        : "Include the country code, e.g. +84…"
      : channel === "instagram"
        ? "@username / https://www.instagram.com/username/"
        : channel === "facebook"
          ? "https://www.facebook.com/your-profile"
          : "";
  return (
    <>
      <label className="contact-form-wide">
        {lang === "vi" ? "Kênh liên hệ mong muốn" : "Preferred contact method"}
        <select
          name="preference"
          value={channel}
          onChange={(event) => setChannel(event.target.value as ContactChannel)}
        >
          {contactChannels.map((item) => (
            <option value={item} key={item}>
              {channelLabels[lang][item]}
            </option>
          ))}
        </select>
      </label>
      <label className="contact-form-wide">
        {channelLabels[lang][channel]} *
        <input
          key={channel}
          name={isPhone ? "phone" : channel === "email" ? "email" : "social"}
          type={isPhone ? "tel" : channel === "email" ? "email" : "text"}
          inputMode={isPhone ? "tel" : channel === "email" ? "email" : "text"}
          autoComplete={isPhone ? "tel" : channel === "email" ? "email" : "off"}
          autoCapitalize="none"
          spellCheck={false}
          pattern={channel === "phone" ? BOOKING_PHONE_PATTERN : undefined}
          maxLength={isPhone ? 30 : channel === "email" ? 254 : 300}
          required
          aria-describedby={hint ? id : undefined}
          onChange={(event) => event.target.setCustomValidity("")}
          onBlur={(event) => {
            const text = event.target.value.trim();
            const error = contactValueError({
              preference: channel,
              phone: isPhone ? text : "",
              email: channel === "email" ? text : "",
              social: text,
            });
            event.target.setCustomValidity(
              error
                ? lang === "vi"
                  ? "Vui lòng nhập thông tin hợp lệ cho kênh đã chọn."
                  : "Please enter valid details for your selected contact method."
                : "",
            );
          }}
        />
        {hint && <small id={id}>{hint}</small>}
      </label>
    </>
  );
}
