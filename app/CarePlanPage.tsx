import Image from "./OptimizedImage";
import Link from "next/link";

import type { CareLang } from "./care-catalog";
import { IconArrow } from "./icons";
import { SeoFooter, SeoHeader } from "./seo-pages";

const zalo = "https://zalo.me/0703214868";
const wa = "https://wa.me/84703214868";

const journeySteps = [
  {
    id: "01",
    minutes: { vi: "10 phút", en: "10 min" },
    output: { vi: "Nhu cầu và điều cần lưu ý được ghi nhận rõ ràng.", en: "Your needs and important notes are clearly recorded." },
    vi: { title: "Tiếp nhận & lắng nghe", body: "Bạn chia sẻ điều đang quan tâm, quỹ thời gian, mong muốn và những trải nghiệm trước đây. Hato lắng nghe trước khi đưa ra bất kỳ gợi ý nào." },
    en: { title: "Welcome & listen", body: "Share what matters to you, your available time, expectations and previous experiences. Hato listens before making any suggestion." },
  },
  {
    id: "02",
    minutes: { vi: "10–15 phút", en: "10–15 min" },
    output: { vi: "Một định hướng ngắn gọn, dễ hiểu và phù hợp.", en: "A concise, easy-to-understand direction that fits you." },
    vi: { title: "Tư vấn & định hướng", body: "Chúng tôi cùng bạn làm rõ ưu tiên hiện tại, điều nên thực hiện trước và những gì có thể để dành cho lần sau." },
    en: { title: "Discuss & orient", body: "Together, we clarify your current priority, what should happen first and what can comfortably wait until later." },
  },
  {
    id: "03",
    minutes: { vi: "5–10 phút", en: "5–10 min" },
    output: { vi: "Mục tiêu, thời gian và ngân sách được thống nhất.", en: "Goals, timing and budget are agreed." },
    vi: { title: "Thống nhất kế hoạch", body: "Lộ trình được chốt theo mục tiêu thực tế, thời gian bạn có và mức ngân sách phù hợp. Mọi thay đổi đều được trao đổi trước." },
    en: { title: "Agree the plan", body: "The journey is shaped around realistic goals, your available time and a suitable budget. Any change is discussed first." },
  },
  {
    id: "04",
    minutes: { vi: "Theo thời lượng đã hẹn", en: "As scheduled" },
    output: { vi: "Tiến trình trong buổi được ghi nhận để theo dõi.", en: "The session progress is noted for follow-up." },
    vi: { title: "Trải nghiệm theo kế hoạch", body: "Mọi bước diễn ra đúng nội dung đã thống nhất, với nhịp độ thoải mái. Bạn luôn có thể phản hồi để Hato điều chỉnh ngay trong buổi." },
    en: { title: "Follow the plan", body: "Everything follows the agreed plan at a comfortable pace. You can always share feedback so Hato can adjust during the visit." },
  },
  {
    id: "05",
    minutes: { vi: "10 phút", en: "10 min" },
    output: { vi: "Dặn dò sau buổi và lịch tái khám phù hợp.", en: "Clear after-visit notes and a suitable follow-up date." },
    vi: { title: "Dặn dò & tái khám", body: "Cuối buổi, Hato nhắc lại những điều nên làm, dấu hiệu cần lưu ý và thời điểm tái khám. Lần sau, chúng tôi cùng bạn xem lại tiến trình rồi mới quyết định bước tiếp theo." },
    en: { title: "Aftercare & follow-up", body: "At the end, Hato reviews what to do, what to notice and when to return. At the next visit, we look at your progress together before deciding the next step." },
  },
] as const;

const journeyPrinciples = [
  {
    vi: ["Rõ ràng từ đầu", "Bạn biết trước mục tiêu, thời lượng, ngân sách và điều sẽ diễn ra trong từng chặng."],
    en: ["Clear from the start", "You know the goal, timing, budget and what will happen at every stage."],
  },
  {
    vi: ["Linh hoạt theo bạn", "Lộ trình có thể rút gọn, tạm dừng hoặc điều chỉnh theo phản hồi và lịch cá nhân."],
    en: ["Flexible around you", "The journey can be shortened, paused or adjusted around your feedback and schedule."],
  },
  {
    vi: ["Có theo dõi sau buổi", "Dặn dò được ghi lại rõ ràng và Hato chủ động hẹn thời điểm phù hợp để xem lại tiến trình."],
    en: ["Thoughtful follow-up", "After-visit notes are clear, with a suitable time agreed to review your progress."],
  },
] as const;

const journeyNotes = {
  vi: {
    before: ["Đến đúng giờ để có đủ thời gian trao đổi.", "Chia sẻ các thay đổi gần đây hoặc điều khiến bạn băn khoăn.", "Nói trước nếu bạn muốn giới hạn thời gian hoặc ngân sách."],
    after: ["Làm theo phần dặn dò đã thống nhất cuối buổi.", "Ghi lại phản hồi để trao đổi trong lần tái khám.", "Liên hệ Hato sớm nếu có cảm giác khó chịu kéo dài."],
  },
  en: {
    before: ["Arrive on time so there is space for a proper conversation.", "Share any recent changes or concerns.", "Tell us if you need to keep within a time or budget limit."],
    after: ["Follow the notes agreed at the end of your visit.", "Keep track of feedback to discuss at follow-up.", "Contact Hato early if discomfort continues."],
  },
} as const;

const journeyFaqs = [
  {
    vi: ["Tôi cần chuẩn bị gì trước buổi hẹn?", "Bạn chỉ cần đến đúng giờ và chia sẻ trung thực điều đang quan tâm, trải nghiệm trước đây cùng giới hạn thời gian hoặc ngân sách nếu có."],
    en: ["What should I prepare before the appointment?", "Arrive on time and openly share your concerns, previous experiences and any time or budget limits."],
  },
  {
    vi: ["Lộ trình có bắt buộc phải theo gói không?", "Không. Mỗi chặng được thống nhất riêng. Bạn có thể tiếp tục, điều chỉnh hoặc tạm dừng sau khi trao đổi với Hato."],
    en: ["Do I have to commit to a package?", "No. Each stage is agreed separately. You can continue, adjust or pause after speaking with Hato."],
  },
  {
    vi: ["Nếu tôi muốn thay đổi kế hoạch thì sao?", "Bạn có thể phản hồi bất cứ lúc nào. Hato sẽ cùng bạn xem lại mục tiêu, lịch cá nhân và ngân sách trước khi điều chỉnh."],
    en: ["What if I want to change the plan?", "You can share feedback at any time. Hato will review your goals, schedule and budget with you before adjusting it."],
  },
  {
    vi: ["Khi nào tôi nên tái khám?", "Thời điểm tái khám được hẹn ở cuối buổi dựa trên tiến trình thực tế. Nếu có điều bất thường hoặc khó chịu kéo dài, hãy liên hệ Hato sớm hơn."],
    en: ["When should I return for follow-up?", "The follow-up date is agreed at the end of your visit based on your progress. Contact Hato sooner if anything unusual or uncomfortable continues."],
  },
] as const;

export function CarePlanPage({ lang }: { lang: CareLang }) {
  const consult = lang === "vi" ? zalo : wa;
  const notes = journeyNotes[lang];

  return (
    <div className="seo-page care-plan-page" lang={lang}>
      <SeoHeader lang={lang} />
      <main className="plan-page">
        <nav className="plan-crumbs" aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}>
          <Link href={lang === "vi" ? "/" : "/en/"}>{lang === "vi" ? "Trang chủ" : "Home"}</Link>
          <span>/</span>
          <span>{lang === "vi" ? "Lộ trình" : "Journey"}</span>
        </nav>

        <section className="plan-hero">
          <div className="plan-hero-copy">
            <p className="eyebrow">{lang === "vi" ? "Đồng hành cùng Hato" : "Your journey with Hato"}</p>
            <h1>{lang === "vi" ? "Một lộ trình rõ ràng, nhẹ nhàng và vừa đủ." : "A clear, thoughtful journey shaped around you."}</h1>
            <p className="plan-lead">
              {lang === "vi"
                ? "Từ lần đầu gặp gỡ đến buổi tái khám, mỗi chặng đều được trao đổi trước để bạn luôn biết mình đang ở đâu, điều gì sẽ diễn ra và khi nào nên bước tiếp."
                : "From the first conversation to follow-up, every stage is discussed in advance so you know where you are, what happens next and when to continue."}
            </p>
            <div className="plan-hero-actions">
              <a className="button primary" href={consult} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Trao đổi cùng Hato" : "Talk with Hato"}<IconArrow /></a>
              <a className="button ghost" href="#journey-steps">{lang === "vi" ? "Xem năm bước" : "See the five steps"}<IconArrow /></a>
            </div>
            <ul className="plan-trust">
              <li><strong>{lang === "vi" ? "Rõ mục tiêu" : "Clear goals"}</strong><span>{lang === "vi" ? "trao đổi trước" : "agreed first"}</span></li>
              <li><strong>{lang === "vi" ? "Đúng nhịp" : "Your pace"}</strong><span>{lang === "vi" ? "linh hoạt theo bạn" : "flexible for you"}</span></li>
              <li><strong>{lang === "vi" ? "Có theo dõi" : "Follow-up"}</strong><span>{lang === "vi" ? "sau mỗi buổi" : "after each visit"}</span></li>
            </ul>
          </div>
          <div className="plan-hero-media">
            <Image priority src="/images/feature-space-v2.webp" alt={lang === "vi" ? "Không gian đón tiếp tại Hato Beauty" : "The welcoming space at Hato Beauty"} fill sizes="(max-width: 900px) 100vw, 48vw" />
          </div>
        </section>

        <section className="plan-steps" id="journey-steps" aria-labelledby="steps-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Năm chặng đồng hành" : "Five stages"}</p>
            <h2 id="steps-title">{lang === "vi" ? "Từ lắng nghe đến tái khám" : "From listening to follow-up"}</h2>
            <p>{lang === "vi" ? "Một quy trình liền mạch, đủ rõ để bạn chủ động và đủ linh hoạt để thay đổi khi cần." : "A connected process that keeps you informed and remains flexible when things change."}</p>
          </header>
          <ol className="plan-stepper">
            {journeySteps.map((step) => (
              <li key={step.id}>
                <span className="plan-step-num">{(lang === "vi" ? "Bước " : "Step ") + step.id}</span>
                <h3>{step[lang].title}</h3>
                <p>{step[lang].body}</p>
                <p className="plan-step-meta"><strong>{step.minutes[lang]}</strong><span>{step.output[lang]}</span></p>
              </li>
            ))}
          </ol>
        </section>

        <section className="plan-principles" aria-labelledby="principles-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Cách Hato đồng hành" : "How Hato supports you"}</p>
            <h2 id="principles-title">{lang === "vi" ? "Lộ trình được xây quanh bạn" : "A journey built around you"}</h2>
            <p>{lang === "vi" ? "Không khuôn mẫu cứng, không tạo áp lực phải tiếp tục. Mỗi quyết định được đưa ra sau khi hai bên cùng trao đổi." : "No rigid template and no pressure to continue. Every decision follows a conversation together."}</p>
          </header>
          <div className="plan-principle-grid">
            {journeyPrinciples.map((item) => (
              <article className="plan-principle-card" key={item[lang][0]}>
                <h3>{item[lang][0]}</h3>
                <p>{item[lang][1]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="plan-visit" aria-labelledby="visit-title">
          <header className="plan-section-head">
            <p className="eyebrow">{lang === "vi" ? "Trước & sau buổi hẹn" : "Before & after"}</p>
            <h2 id="visit-title">{lang === "vi" ? "Chuẩn bị ít, an tâm nhiều hơn" : "A little preparation, much more ease"}</h2>
          </header>
          <div className="plan-visit-grid">
            <article>
              <h3>{lang === "vi" ? "Trước khi đến" : "Before you arrive"}</h3>
              <ul>{notes.before.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <h3>{lang === "vi" ? "Sau buổi hẹn" : "After your visit"}</h3>
              <ul>{notes.after.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="plan-faq" aria-labelledby="faq-title">
          <header className="plan-section-head">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">{lang === "vi" ? "Câu hỏi thường gặp về lộ trình" : "Questions about the journey"}</h2>
          </header>
          {journeyFaqs.map((item) => (
            <details key={item[lang][0]}>
              <summary>{item[lang][0]}</summary>
              <p>{item[lang][1]}</p>
            </details>
          ))}
        </section>

        <section className="plan-close" id="book">
          <p className="eyebrow">{lang === "vi" ? "Bắt đầu thật nhẹ nhàng" : "Start gently"}</p>
          <h2>{lang === "vi" ? "Trước hết, hãy để Hato lắng nghe bạn." : "First, let Hato listen."}</h2>
          <p>{lang === "vi" ? "Nhắn cho chúng tôi điều bạn đang quan tâm. Hato sẽ cùng bạn chọn bước bắt đầu phù hợp." : "Tell us what is on your mind. Hato will help you choose a comfortable first step."}</p>
          <div className="plan-hero-actions">
            <a className="button primary" href={consult} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Nhắn Zalo 0703 214 868" : "WhatsApp +84 703 214 868"}<IconArrow /></a>
            <Link className="button ghost" href={lang === "vi" ? "/dat-lich/" : "/en/book/"}>{lang === "vi" ? "Đặt lịch trên web" : "Book on the site"}<IconArrow /></Link>
          </div>
        </section>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}