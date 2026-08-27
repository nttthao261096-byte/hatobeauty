type ContactLang = "vi" | "en";

const socialLinks = [
  { label: "TikTok", short: "TT", href: "https://www.tiktok.com/@hatobeauty" },
  { label: "WhatsApp", short: "WA", href: "https://wa.me/84703214868" },
  { label: "Instagram", short: "IG", href: "https://www.instagram.com/hatobeauty/" },
  { label: "Facebook", short: "f", href: "https://facebook.com/hatobeautyy" },
] as const;

export function ContactDetails({ lang, compact = false }: { lang: ContactLang; compact?: boolean }) {
  return <section className={`contact-details${compact ? " contact-details--compact" : ""}`} aria-label={lang === "vi" ? "Thông tin liên hệ hato Beauty" : "hato Beauty contact details"}>
    <div className="contact-detail-block">
      <span className="contact-detail-label">{lang === "vi" ? "Điện thoại" : "Phone"}</span>
      <div className="contact-phone-links"><a href="tel:+84703214868">0703 214 868</a><a href="tel:+84915860446">0915 860 446</a></div>
    </div>
    <div className="contact-detail-block">
      <span className="contact-detail-label">Email</span>
      <a className="contact-email" href="mailto:hatobeautydanang@gmail.com">hatobeautydanang@gmail.com</a>
    </div>
    <div className="contact-detail-block">
      <span className="contact-detail-label">{lang === "vi" ? "Giờ mở cửa" : "Opening hours"}</span>
      <p className="contact-hours">{lang === "vi" ? "Hằng ngày · 08:00–19:30" : "Daily · 8:00 AM–7:30 PM"}</p>
    </div>
    <div className="contact-socials" aria-label={lang === "vi" ? "Mạng xã hội" : "Social media"}>{socialLinks.map((social) => <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} hato Beauty`} title={social.label} key={social.label}><span aria-hidden="true">{social.short}</span><b>{social.label}</b></a>)}</div>
  </section>;
}