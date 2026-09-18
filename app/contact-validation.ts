import { isValidBookingPhone } from "./booking-validation";

export const contactChannels = [
  "phone",
  "email",
  "whatsapp",
  "instagram",
  "facebook",
] as const;
export type ContactChannel = (typeof contactChannels)[number];
export type ContactValue = {
  preference: ContactChannel;
  phone: string;
  email: string;
  social: string;
};
export const channelLabels = {
  vi: {
    phone: "Điện thoại",
    email: "Email",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
  },
  en: {
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
  },
};
export function isContactChannel(value: string): value is ContactChannel {
  return contactChannels.some((channel) => channel === value);
}
export function contactValueError(value: ContactValue): string | undefined {
  if (value.preference === "phone")
    return isValidBookingPhone(value.phone) ? undefined : "invalid_phone";
  if (value.preference === "whatsapp")
    return value.phone.length <= 30 &&
      /^\+[1-9][0-9]{7,14}$/.test(value.phone.replace(/[ .-]/g, ""))
      ? undefined
      : "invalid_whatsapp";
  if (value.preference === "email")
    return value.email.length <= 254 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)
      ? undefined
      : "invalid_email";
  if (value.social.length > 300) return "invalid_social";
  if (
    value.preference === "instagram" &&
    /^@?[A-Za-z0-9._]{1,30}$/.test(value.social)
  )
    return undefined;
  try {
    const url = new URL(value.social);
    const hosts =
      value.preference === "instagram"
        ? ["instagram.com", "www.instagram.com"]
        : ["facebook.com", "www.facebook.com", "m.facebook.com"];
    return url.protocol === "https:" &&
      hosts.includes(url.hostname) &&
      url.pathname !== "/" &&
      !url.username &&
      !url.password
      ? undefined
      : "invalid_social";
  } catch {
    return "invalid_social";
  }
}
export function parseContactValue(
  payload: Record<string, unknown>,
): ContactValue | undefined {
  const text = (key: string) =>
    typeof payload[key] === "string" ? payload[key].trim() : "";
  const preference = text("preference");
  if (!isContactChannel(preference)) return undefined;
  return {
    preference,
    phone:
      preference === "phone" || preference === "whatsapp" ? text("phone") : "",
    email: preference === "email" ? text("email").toLowerCase() : "",
    social:
      preference === "instagram" || preference === "facebook"
        ? text("social")
        : "",
  };
}
