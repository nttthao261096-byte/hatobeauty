import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

import { IconArrow, IconClock, IconMail, IconPhone, IconPin } from "./icons";

type ContactLang = "vi" | "en";

export const hatoAddress = "127 Châu Thị Vĩnh Tế, Ngũ Hành Sơn, Đà Nẵng";
const encodedAddress = encodeURIComponent(hatoAddress);
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
const socialLinks = [
  { label: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@hatobeauty" },
  { label: "WhatsApp", icon: FaWhatsapp, href: "https://wa.me/84703214868" },
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/hatobeauty/" },
  { label: "Facebook", icon: FaFacebookF, href: "https://facebook.com/hatobeautyy" },
] as const;

export function ContactDetails({ lang, compact = false }: { lang: ContactLang; compact?: boolean }) {
  return <section className={`contact-details${compact ? " contact-details--compact" : ""}`} aria-label={lang === "vi" ? "Thông tin liên hệ Hato Beauty" : "Hato Beauty contact details"}>
    <div className="contact-list">
      <div className="contact-row">
        <span className="contact-row-icon" aria-hidden="true"><IconPhone /></span><span><small>{lang === "vi" ? "Điện thoại" : "Phone"}</small><strong className="contact-phone-links"><a href="tel:+84703214868">0703214868</a></strong></span>
      </div>
      <a className="contact-row" href={directionsUrl} target="_blank" rel="noopener noreferrer">
        <span className="contact-row-icon" aria-hidden="true"><IconPin /></span><span><small>{lang === "vi" ? "Địa chỉ" : "Address"}</small><strong>{hatoAddress}</strong></span>
      </a>
      <a className="contact-row" href="mailto:hatobeautydanang@gmail.com">
        <span className="contact-row-icon" aria-hidden="true"><IconMail /></span><span><small>Email</small><strong>hatobeautydanang@gmail.com</strong></span>
      </a>
      <div className="contact-row">
        <span className="contact-row-icon" aria-hidden="true"><IconClock /></span><span><small>{lang === "vi" ? "Giờ mở cửa" : "Opening hours"}</small><strong>{lang === "vi" ? "Hằng ngày · 08:30–19:30" : "Daily · 8:30 AM–7:30 PM"}</strong></span>
      </div>
    </div>
    <div className="contact-socials" aria-label={lang === "vi" ? "Mạng xã hội" : "Social media"}>{socialLinks.map((social) => { const Icon = social.icon; return <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} Hato Beauty`} title={social.label} key={social.label}><span aria-hidden="true"><Icon /></span><b>{social.label}</b></a>; })}</div>
  </section>;
}

export function ContactMap({ lang }: { lang: ContactLang }) {
  return <section className="contact-map-card" aria-label={lang === "vi" ? "Bản đồ Hato Beauty" : "Hato Beauty map"}>
    <iframe src={mapEmbedUrl} title={lang === "vi" ? "Bản đồ đến Hato Beauty" : "Map to Hato Beauty"} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    <div className="contact-map-caption"><span aria-hidden="true"><IconPin /></span><div><small>{lang === "vi" ? "Ghé thăm Hato Beauty" : "Visit Hato Beauty"}</small><strong>{hatoAddress}</strong></div><a href={directionsUrl} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Chỉ đường" : "Directions"}<IconArrow /></a></div>
  </section>;
}
