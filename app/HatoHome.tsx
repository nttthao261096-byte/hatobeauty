"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const services = [
  {
    number: "01",
    title: "Chăm sóc da",
    description: "Nghi thức làm sạch và nuôi dưỡng được thiết kế theo tình trạng da và nhịp sống riêng.",
    tone: "skin",
  },
  {
    number: "02",
    title: "Gội đầu thư giãn",
    description: "Khoảng nghỉ dịu nhẹ cho da đầu, mái tóc và tinh thần sau những ngày bận rộn.",
    tone: "hair",
  },
  {
    number: "03",
    title: "Nail & mi",
    description: "Những chi tiết nhỏ được chăm chút để vẻ ngoài của bạn luôn chỉn chu, thanh lịch.",
    tone: "nail",
  },
  {
    number: "04",
    title: "Thư giãn cơ thể",
    description: "Liệu trình cân bằng giúp cơ thể thả lỏng trong không gian riêng tư và ấm áp.",
    tone: "body",
  },
];

export function HatoHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <div className="announcement">
        <span>HATO RITUAL · Trải nghiệm chăm sóc được thiết kế riêng</span>
        <button onClick={() => setBookingOpen(true)}>Đặt lịch tư vấn</button>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hato Beauty — Trang chủ">
          <Image src="/brand/hato-logo.png" alt="Hato Beauty" width={220} height={118} priority />
        </a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Điều hướng chính">
          <a href="#about" onClick={() => setMenuOpen(false)}>Về Hato</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Dịch vụ</a>
          <a href="#ritual" onClick={() => setMenuOpen(false)}>Trải nghiệm</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Cẩm nang</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Liên hệ</a>
        </nav>
        <button className="header-cta" onClick={() => setBookingOpen(true)}>Đặt lịch <span>↗</span></button>
        <button
          className="menu-button"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="top">
        <Image className="hero-image" src="/images/hato-hero.png" alt="Chân dung vẻ đẹp tự nhiên trong không gian màu be ấm áp" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Beauty, made personal</p>
          <h1>Vẻ đẹp tự nhiên,<br /><em>theo cách của bạn.</em></h1>
          <p className="hero-lead">Hato là một khoảng dừng tinh tế — nơi mỗi nghi thức chăm sóc bắt đầu từ việc lắng nghe bạn.</p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => setBookingOpen(true)}>Khám phá liệu trình <span>↗</span></button>
            <a className="text-link" href="#about">Câu chuyện Hato <span>↓</span></a>
          </div>
        </div>
        <div className="hero-index"><span>01</span><i /><span>03</span></div>
        <div className="hero-note">Chạm để bắt đầu<br />một khoảng nghỉ cho riêng mình</div>
      </section>

      <section className="intro section" id="about">
        <div className="section-label"><span>01</span> Hato philosophy</div>
        <div className="intro-copy">
          <p className="kicker">Chăm sóc không chỉ để đẹp hơn.</p>
          <h2>Đó là cách bạn trở về với <em>phiên bản dịu dàng nhất</em> của chính mình.</h2>
        </div>
        <div className="intro-aside">
          <p>Chúng tôi kết hợp sự chỉn chu trong từng thao tác, sản phẩm chọn lọc và không gian giàu cảm xúc để mỗi lần ghé Hato đều là một trải nghiệm đáng nhớ.</p>
          <a href="#ritual">Hiểu thêm về Hato <span>→</span></a>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="services-heading">
          <div className="section-label light"><span>02</span> Dịch vụ nổi bật</div>
          <h2>Một nghi thức dành<br />riêng cho <em>bạn.</em></h2>
          <p>Mỗi liệu trình được tinh chỉnh theo nhu cầu, quỹ thời gian và cảm nhận riêng của từng khách hàng.</p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div className={`service-orb ${service.tone}`} aria-hidden="true" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button aria-label={`Xem ${service.title}`}>↗</button>
            </article>
          ))}
        </div>
      </section>

      <section className="ritual section" id="ritual">
        <div className="ritual-visual">
          <Image src="/images/hato-hero.png" alt="Không gian chăm sóc Hato Beauty" fill sizes="(max-width: 800px) 100vw, 48vw" />
          <div className="ritual-card"><span>90&apos;</span><p>Khoảng thời gian dành trọn cho bạn</p></div>
        </div>
        <div className="ritual-copy">
          <div className="section-label"><span>03</span> The Hato ritual</div>
          <p className="eyebrow">Lắng nghe · Cá nhân hóa · Chăm sóc</p>
          <h2>Từng chạm nhỏ,<br />một thay đổi <em>lớn.</em></h2>
          <div className="ritual-steps">
            <div><span>01</span><h3>Lắng nghe</h3><p>Chúng tôi bắt đầu bằng một cuộc trò chuyện đủ chậm để hiểu điều bạn thật sự cần.</p></div>
            <div><span>02</span><h3>Thiết kế liệu trình</h3><p>Dịch vụ, thời lượng và nhịp chăm sóc được điều chỉnh riêng, không theo khuôn mẫu.</p></div>
            <div><span>03</span><h3>Tận hưởng & duy trì</h3><p>Một trải nghiệm trọn vẹn tại Hato, cùng hướng dẫn chăm sóc phù hợp sau liệu trình.</p></div>
          </div>
          <button className="button outline" onClick={() => setBookingOpen(true)}>Nhận tư vấn riêng <span>↗</span></button>
        </div>
      </section>

      <section className="commitment section">
        <div>
          <div className="section-label"><span>04</span> Vì sao chọn Hato</div>
          <h2>Chuẩn mực nằm trong<br /><em>từng chi tiết.</em></h2>
        </div>
        <div className="commitment-grid">
          <article><span>01</span><h3>Cá nhân hóa thực sự</h3><p>Mỗi khách hàng là một câu chuyện riêng, mỗi liệu trình là một thiết kế riêng.</p></article>
          <article><span>02</span><h3>Chuyên môn chỉn chu</h3><p>Quy trình rõ ràng, thao tác cẩn trọng và tiêu chuẩn vệ sinh được ưu tiên.</p></article>
          <article><span>03</span><h3>Không gian riêng tư</h3><p>Tinh giản, nhẹ nhàng và đủ tĩnh để bạn thật sự thư giãn khi ghé Hato.</p></article>
          <article><span>04</span><h3>Đồng hành lâu dài</h3><p>Không chỉ một buổi hẹn, chúng tôi xây dựng hành trình chăm sóc bền vững cùng bạn.</p></article>
        </div>
      </section>

      <section className="journal section" id="journal">
        <div className="journal-head">
          <div><div className="section-label"><span>05</span> Hato journal</div><h2>Chăm mình,<br /><em>đúng cách.</em></h2></div>
          <p>Những ghi chú nhỏ về làn da, mái tóc và cách tạo ra những khoảng nghỉ chất lượng trong đời sống thường ngày.</p>
        </div>
        <div className="journal-grid">
          <article className="journal-feature"><div className="journal-art art-one"><span>SKIN NOTES</span></div><p>Chăm sóc da · 5 phút đọc</p><h3>Một chu trình tối giản đôi khi lại là điều làn da cần nhất</h3><a href="#contact">Đọc bài viết <span>→</span></a></article>
          <article><div className="journal-art art-two"><span>SLOW BEAUTY</span></div><p>Wellness · 4 phút đọc</p><h3>Vì sao những khoảng nghỉ nhỏ tạo nên thay đổi lớn?</h3><a href="#contact">Đọc bài viết <span>→</span></a></article>
        </div>
      </section>

      <section className="booking-banner section" id="contact">
        <p className="eyebrow">Your moment starts here</p>
        <h2>Dành một khoảng<br /><em>cho chính mình.</em></h2>
        <p>Hãy để Hato lắng nghe và gợi ý trải nghiệm phù hợp nhất với bạn.</p>
        <button className="button light-button" onClick={() => setBookingOpen(true)}>Đặt lịch cùng Hato <span>↗</span></button>
      </section>

      <footer>
        <div className="footer-brand"><Image src="/brand/hato-logo.png" alt="Hato Beauty" width={240} height={129} /><p>Beauty, made personal.</p></div>
        <div><h3>Khám phá</h3><a href="#about">Về Hato</a><a href="#services">Dịch vụ</a><a href="#journal">Cẩm nang</a></div>
        <div><h3>Liên hệ</h3><p>Thứ Hai – Chủ Nhật<br />09:00 – 20:00</p><button onClick={() => setBookingOpen(true)}>Gửi yêu cầu tư vấn</button></div>
        <div className="footer-news"><h3>Nhận ghi chú từ Hato</h3><p>Một chút cảm hứng chăm mình, gửi đến bạn mỗi tháng.</p><label><span className="sr-only">Email của bạn</span><input type="email" placeholder="Email của bạn" /><button aria-label="Đăng ký nhận tin">→</button></label></div>
        <div className="footer-bottom"><span>© 2026 Hato Beauty</span><span>Instagram&nbsp;&nbsp;·&nbsp;&nbsp;Facebook</span></div>
      </footer>

      <button className="floating-book" onClick={() => setBookingOpen(true)} aria-label="Đặt lịch"><span>Đặt lịch</span>↗</button>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setBookingOpen(false)}>
          <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Đóng">×</button>
            {submitted ? (
              <div className="success"><span>✓</span><p className="eyebrow">Đã nhận yêu cầu</p><h2>Cảm ơn bạn đã chọn Hato.</h2><p>Đội ngũ Hato sẽ liên hệ để lắng nghe nhu cầu và xác nhận thời gian phù hợp.</p><button className="button primary" onClick={() => { setBookingOpen(false); setSubmitted(false); }}>Hoàn tất</button></div>
            ) : (
              <><p className="eyebrow">A moment for you</p><h2 id="booking-title">Đặt lịch cùng Hato</h2><p>Để lại thông tin, Hato sẽ liên hệ tư vấn và xác nhận lịch phù hợp.</p>
              <form onSubmit={submitBooking}>
                <label>Họ và tên<input name="name" required placeholder="Tên của bạn" /></label>
                <label>Số điện thoại<input name="phone" required inputMode="tel" placeholder="Số điện thoại" /></label>
                <label>Dịch vụ quan tâm<select name="service" defaultValue=""><option value="" disabled>Chọn dịch vụ</option>{services.map((service) => <option key={service.number}>{service.title}</option>)}</select></label>
                <label>Thời gian mong muốn<input name="date" type="date" required /></label>
                <button className="button primary" type="submit">Gửi yêu cầu <span>↗</span></button>
              </form></>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
