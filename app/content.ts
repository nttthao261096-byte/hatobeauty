import { mediaUrl, seoServices } from "./seo-data";

export type Lang = "vi" | "en";
export type Category = "all" | "care" | "relax" | "shape" | "smooth" | "body";

export interface ServiceContent {
  id: string;
  category: Exclude<Category, "all">;
  number: string;
  image: string;
  vi: {
    title: string;
    summary: string;
    description: string;
    suitable: string;
  };
  en: {
    title: string;
    summary: string;
    description: string;
    suitable: string;
  };
}

export interface ServiceDetailContent {
  price: string;
  duration: string;
  plan: string;
  vi: string[];
  en: string[];
  options?: {
    vi: string[];
    en: string[];
  };
  groups?: Array<{
    viTitle: string;
    enTitle: string;
    vi: string[];
    en: string[];
  }>;
}

const curatedServiceChoices: Partial<Record<string, Pick<ServiceDetailContent, "options" | "groups">>> = {
  skin: {
    groups: [
      {
        viTitle: "Chăm sóc da mặt",
        enTitle: "Facial care",
        vi: [
          "Trị liệu làm sạch da chuyên sâu",
          "Trị liệu phục hồi da chuyên sâu",
          "Trị liệu căng bóng & trẻ hóa da",
          "Trị liệu chăm sóc da mụn",
          "Trị liệu tăng sắc tố và nám",
          "Trị liệu Mesotherapy",
        ],
        en: [
          "Deep-cleansing facial",
          "Intensive skin recovery",
          "Glow & rejuvenation facial",
          "Acne-prone skin care",
          "Pigmentation & melasma care",
          "Mesotherapy treatment",
        ],
      },
      {
        viTitle: "Chăm sóc da cơ thể",
        enTitle: "Body skin care",
        vi: [
          "Tẩy tế bào chết & dưỡng ẩm chuyên sâu",
          "Phục hồi da cháy nắng",
          "Chăm sóc & điều trị mụn lưng",
        ],
        en: [
          "Intensive exfoliation & hydration",
          "Sun-exposed skin recovery",
          "Back acne care & treatment",
        ],
      },
    ],
  },
  "brow-lash": {
    groups: [
      {
        viTitle: "Dịch vụ Mi",
        enTitle: "Lash services",
        vi: ["Uốn mi", "Nhuộm mi", "Uốn mi kiểu Hàn + nhuộm mi"],
        en: ["Lash lift", "Lash tint", "Korean lash lift + tint"],
      },
      {
        viTitle: "Dịch vụ Mày",
        enTitle: "Brow services",
        vi: ["Nhuộm chân mày", "Nhuộm + tạo hình chân mày", "Định hình + nhuộm mày"],
        en: ["Brow tint", "Brow tint + shaping", "Brow definition + tint"],
      },
    ],
  },
  scalp: {
    options: {
      vi: [
        "Gội đầu chăm sóc da đầu cơ bản",
        "Gội đầu thư giãn",
        "Gội đầu chăm sóc da đầu chuyên sâu",
        "Gội đầu & Massage mặt chuyên sâu",
        "Gội đầu thư giãn cao cấp",
      ],
      en: [
        "Essential scalp-care wash",
        "Relaxing hair wash",
        "Intensive scalp-care wash",
        "Hair wash & intensive facial massage",
        "Premium relaxing hair wash",
      ],
    },
  },
  "hair-removal": {
    options: {
      vi: ["Triệt vùng mặt", "Triệt vùng nách", "Triệt vùng tay", "Triệt vùng chân", "Triệt bikini", "Triệt full body"],
      en: ["Face", "Underarms", "Arms", "Legs", "Bikini", "Full body"],
    },
  },
  waxing: {
    options: {
      vi: ["Tẩy lông mày", "Tẩy môi trên", "Tẩy theo vùng cơ thể"],
      en: ["Brow waxing", "Upper-lip waxing", "Body-area waxing"],
    },
  },
};

function applyCuratedServiceChoices(details: Record<string, ServiceDetailContent>) {
  Object.entries(curatedServiceChoices).forEach(([serviceId, choices]) => {
    if (details[serviceId]) details[serviceId] = { ...details[serviceId], ...choices };
  });
  return details;
}

export interface HighlightContent {
  number: string;
  image: string;
  vi: [string, string];
  en: [string, string];
}

export interface ResultContent {
  image: string;
  vi: [string, string, string];
  en: [string, string, string];
}

export interface TestimonialContent {
  initials: string;
  name: Record<Lang, string>;
  quote: Record<Lang, string>;
}

export interface JournalArticleContent {
  number: string;
  image: string;
  vi: { title: string; readingTime: string };
  en: { title: string; readingTime: string };
}

export interface HomeContent {
  services: ServiceContent[];
  serviceDetails: Record<string, ServiceDetailContent>;
  highlights: HighlightContent[];
  results: ResultContent[];
  testimonials: TestimonialContent[];
  journalArticles: JournalArticleContent[];
}

type JsonRow = Record<string, unknown>;

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function lowercaseHato(value: string): string {
  return value.replace(/hato/gi, "hato");
}

function withMediaOrigin(content: HomeContent): HomeContent {
  const resolve = (path: string) => path.startsWith("/") ? mediaUrl(path) : path;
  return {
    ...content,
    services: content.services.map((item) => ({ ...item, image: resolve(item.image) })),
    highlights: content.highlights.map((item) => ({ ...item, image: resolve(item.image) })),
    results: content.results.map((item) => ({ ...item, image: resolve(item.image) })),
    journalArticles: content.journalArticles.map((item) => ({ ...item, image: resolve(item.image) })),
  };
}

function textArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").map(lowercaseHato) : [];
}

function vietnamizeBody(value: string): string {
  return value.replace(/\bbody\b/gi, "cơ thể");
}

function localized(row: JsonRow, field: string, lang: Lang): string {
  return lowercaseHato(text(row[`${field}_${lang}`]));
}

async function fetchRows(baseUrl: string, apiKey: string, table: string): Promise<JsonRow[]> {
  const response = await fetch(
    `${baseUrl}/rest/v1/${table}?select=*&is_published=eq.true&order=sort_order.asc`,
    {
      headers: { apikey: apiKey },
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase content query failed for ${table}: ${response.status}`);
  }

  return (await response.json()) as JsonRow[];
}

function fallbackHomeContent(): HomeContent {
  const categories: Record<string, ServiceContent["category"]> = { skin: "care", scalp: "relax", body: "body", "brow-lash": "shape", "hair-removal": "smooth" };
  const services: ServiceContent[] = seoServices.map((service, index) => ({
    id: service.id,
    category: categories[service.id],
    number: String(index + 1).padStart(2, "0"),
    image: service.image,
    vi: { title: service.vi.name, summary: service.vi.title, description: service.vi.description, suitable: service.vi.suitable },
    en: { title: service.en.name, summary: service.en.title, description: service.en.description, suitable: service.en.suitable },
  }));
  const scalp = services.find((service) => service.id === "scalp");
  if (scalp) {
    scalp.vi.title = "Chăm sóc da đầu & Thư giãn";
    scalp.en.title = "Scalp Care & Relaxation";
  }
  const skin = services.find((service) => service.id === "skin");
  if (skin) {
    skin.vi.title = "Chăm sóc da";
    skin.en.title = "Skin Care";
  }
  const browLash = services.find((service) => service.id === "brow-lash");
  if (browLash) {
    browLash.vi.title = "Mi & Mày";
    browLash.en.title = "Lashes & Brows";
  }
  const hairRemoval = services.find((service) => service.id === "hair-removal");
  if (hairRemoval) {
    hairRemoval.vi.title = "Triệt lông công nghệ cao";
    hairRemoval.en.title = "Advanced hair removal";
  }
  services.splice(4, 0, {
    id: "waxing",
    category: "smooth",
    number: "05",
    image: mediaUrl("/images/service-waxing-v2.webp"),
    vi: {
      title: "Tẩy lông bằng sáp",
      summary: "Gọn gàng · Nhanh chóng · Chăm da",
      description: "Kỹ thuật waxing cẩn trọng, lựa chọn sản phẩm phù hợp và chăm sóc da trước–sau dịch vụ để hạn chế cảm giác khó chịu.",
      suitable: "Khách hàng cần hiệu quả gọn gàng ngay và một quy trình chăm sóc kín đáo.",
    },
    en: {
      title: "Gentle waxing",
      summary: "Smooth · Efficient · Skin-aware",
      description: "Careful waxing techniques, considered product selection and before–after skin care for a more comfortable experience.",
      suitable: "For an immediate smooth result delivered with discretion and care.",
    },
  });
  services.forEach((service, index) => { service.number = String(index + 1).padStart(2, "0"); });
  const serviceDetails = Object.fromEntries(seoServices.map((service) => [service.id, {
    price: service.id === "skin" ? "450.000 – 1.200.000đ" : service.id === "hair-removal" ? "250.000 – 1.500.000đ/vùng" : "Tư vấn theo nhu cầu",
    duration: service.id === "hair-removal" ? "20 – 60 phút" : "45 – 90 phút",
    plan: "Cá nhân hóa sau tư vấn",
    vi: ["Trao đổi nhu cầu", ...service.vi.preparation.slice(0, 2), "Thực hiện và hướng dẫn chăm sóc"],
    en: ["Discuss your needs", ...service.en.preparation.slice(0, 2), "Care and aftercare guidance"],
  }]));
  serviceDetails.waxing = {
    price: "120.000 – 650.000đ/vùng",
    duration: "20 – 50 phút",
    plan: "Lặp lại sau 3 – 6 tuần",
    vi: ["Kiểm tra tình trạng da", "Làm sạch và chuẩn bị vùng wax", "Wax theo hướng phù hợp", "Làm dịu và dưỡng ẩm"],
    en: ["Check skin condition", "Cleanse and prepare", "Wax with suitable technique", "Soothe and moisturize"],
  };
  applyCuratedServiceChoices(serviceDetails);
  const journalArticles: JournalArticleContent[] = [
    { number: "01", image: "/images/journal-skin-v2.webp", vi: { title: "Chăm sóc da: Làm sạch sâu hay ưu tiên phục hồi?", readingTime: "3 phút đọc" }, en: { title: "Skin: Deep cleansing or recovery first?", readingTime: "3 min read" } },
    { number: "02", image: "/images/journal-scalp-v2.webp", vi: { title: "Gội đầu dưỡng sinh: Vì sao da đầu và vai gáy nên thả lỏng cùng nhau?", readingTime: "4 phút đọc" }, en: { title: "Head Spa: Why should the scalp, neck and shoulders unwind together?", readingTime: "4 min read" } },
    { number: "03", image: "/images/journal-body-v2.webp", vi: { title: "Chăm sóc cơ thể: Khi nào là lúc phù hợp để làm mới bề mặt da?", readingTime: "4 phút đọc" }, en: { title: "Body: When is the right time to refresh your skin?", readingTime: "4 min read" } },
    { number: "04", image: "/images/journal-brow-v2.webp", vi: { title: "Mi & chân mày: Giữ đường nét tự nhiên bằng cách nào?", readingTime: "3 phút đọc" }, en: { title: "Brow & Lash: How do you keep the result naturally yours?", readingTime: "3 min read" } },
    { number: "05", image: "/images/journal-technology-v2.webp", vi: { title: "Triệt lông: Cần chuẩn bị gì trước khi thực hiện?", readingTime: "3 phút đọc" }, en: { title: "Hair Removal: How should you prepare?", readingTime: "3 min read" } },
  ];
  return withMediaOrigin({
    services,
    serviceDetails,
    highlights: [
      { number: "01", image: "/images/feature-equipment-v2.webp", vi: ["Công nghệ phù hợp", "Thiết bị được lựa chọn theo nhu cầu thật, không chạy theo lời hứa quá mức."], en: ["Suitable technology", "Technology chosen around real needs, without inflated promises."] },
      { number: "02", image: "/images/feature-space-v2.webp", vi: ["Không gian dễ chịu", "Một nhịp chăm sóc riêng tư, sạch sẽ và đủ chậm để bạn thư giãn."], en: ["A calming space", "A private, clean and unhurried rhythm of care."] },
      { number: "03", image: "/images/feature-personalized-v2.webp", vi: ["Thông tin minh bạch", "Quy trình, chi phí và kỳ vọng được trao đổi trước khi bắt đầu."], en: ["Clear information", "Process, price and expectations are discussed before care begins."] },
      { number: "04", image: "/images/feature-team-v2.webp", vi: ["Lắng nghe cẩn trọng", "Đội ngũ bắt đầu từ câu hỏi và điều chỉnh theo cảm nhận của bạn."], en: ["Careful listening", "The team starts with questions and adapts to your comfort."] },
    ],
    results: [
      { image: "/images/result-skin-v2.webp", vi: ["Làn da đủ ẩm", "Bề mặt da mềm mại và dễ chịu hơn sau chăm sóc.", "Chăm sóc da"], en: ["Replenished skin", "A softer, more comfortable surface after care.", "Skin"] },
      { image: "/images/result-brow-lash-v2.webp", vi: ["Đường nét tự nhiên", "Mi và chân mày được định hình hài hòa với gương mặt.", "Mi & chân mày"], en: ["Natural definition", "Lashes and brows shaped around your face.", "Brow & Lash"] },
      { image: "/images/result-body-v2.webp", vi: ["Cảm giác nhẹ nhàng", "Chăm sóc cơ thể hướng đến bề mặt sạch và mềm hơn.", "Cơ thể"], en: ["A lighter feeling", "Body care for a cleaner, softer-feeling surface.", "Body"] },
    ],
    testimonials: Array.from({ length: 8 }, (_, index) => ({ initials: `H${index + 1}`, name: { vi: `Khách hàng ${index + 1}`, en: `Guest ${index + 1}` }, quote: { vi: "Không gian ấm áp, đội ngũ lắng nghe kỹ và giải thích rõ từng bước trước khi thực hiện.", en: "A warm space, attentive team and a clear explanation before every step." } })),
    journalArticles,
  });
}

export async function loadHomeContent(): Promise<HomeContent> {
  const baseUrl = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const apiKey =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_SECRET_KEY;

  if (!baseUrl || !apiKey) return fallbackHomeContent();

  let serviceRows: JsonRow[]; let highlightRows: JsonRow[]; let resultRows: JsonRow[]; let testimonialRows: JsonRow[];
  try {
    [serviceRows, highlightRows, resultRows, testimonialRows] = await Promise.all([
      fetchRows(baseUrl, apiKey, "services"),
      fetchRows(baseUrl, apiKey, "highlights"),
      fetchRows(baseUrl, apiKey, "results"),
      fetchRows(baseUrl, apiKey, "testimonials"),
    ]);
  } catch (error) {
    console.error("Falling back to bundled homepage content.", error);
    return fallbackHomeContent();
  }

  const serviceOrder = ["skin", "scalp", "body", "brow-lash", "waxing", "hair-removal"];
  const services = serviceRows.map((row) => ({
    id: text(row.slug),
    category: text(row.category) as ServiceContent["category"],
    number: text(row.display_number),
    image: text(row.image_path),
    vi: {
      title: localized(row, "title", "vi"),
      summary: localized(row, "summary", "vi"),
      description: localized(row, "description", "vi"),
      suitable: localized(row, "suitable", "vi"),
    },
    en: {
      title: localized(row, "title", "en"),
      summary: localized(row, "summary", "en"),
      description: localized(row, "description", "en"),
      suitable: localized(row, "suitable", "en"),
    },
  })).filter((service) => serviceOrder.includes(service.id))
    .map((service) => {
      const number = String(serviceOrder.indexOf(service.id) + 1).padStart(2, "0");
      if (service.id === "body") {
        return {
          ...service,
          number,
          vi: {
            title: vietnamizeBody(service.vi.title),
            summary: vietnamizeBody(service.vi.summary),
            description: vietnamizeBody(service.vi.description),
            suitable: vietnamizeBody(service.vi.suitable),
          },
        };
      }

      if (service.id === "scalp") {
        return {
          ...service,
          number,
          vi: { ...service.vi, title: "Chăm sóc da đầu & Thư giãn" },
          en: { ...service.en, title: "Scalp Care & Relaxation" },
        };
      }

      if (service.id === "skin") {
        return {
          ...service,
          number,
          vi: { ...service.vi, title: "Chăm sóc da" },
          en: { ...service.en, title: "Skin Care" },
        };
      }

      if (service.id === "brow-lash") {
        return {
          ...service,
          number,
          vi: { ...service.vi, title: "Mi & Mày" },
          en: { ...service.en, title: "Lashes & Brows" },
        };
      }

      if (service.id === "waxing") {
        return {
          ...service,
          number,
          vi: { ...service.vi, title: "Tẩy lông bằng sáp" },
          en: { ...service.en, title: "Waxing" },
        };
      }

      if (service.id !== "hair-removal") return { ...service, number };

      return {
        ...service,
        number,
        vi: {
          ...service.vi,
          title: "Triệt lông công nghệ cao",
          summary: "Công nghệ · Êm dịu · Riêng tư",
          description: "Giải pháp giảm lông bằng công nghệ được lựa chọn theo vùng da, nhu cầu và mức độ thoải mái của riêng bạn.",
          suitable: "Các vùng mặt, tay, chân, nách hoặc cơ thể cần chăm sóc kín đáo và phù hợp với tình trạng da.",
        },
        en: {
          ...service.en,
          title: "Advanced hair removal",
          summary: "Technology · Gentle · Private",
          description: "Technology-led hair removal selected around the treatment area, your skin and your preferred level of comfort.",
          suitable: "For the face, arms, legs, underarms or body areas that benefit from discreet, skin-aware care.",
        },
      };
    })
    .sort((a, b) => serviceOrder.indexOf(a.id) - serviceOrder.indexOf(b.id));

  const serviceDetails = Object.fromEntries(
    serviceRows.map((row) => [
      text(row.slug),
      {
        price: text(row.price_label),
        duration: text(row.duration_label),
        plan: text(row.plan_label),
        vi: textArray(row.steps_vi),
        en: textArray(row.steps_en),
      },
    ]),
  );
  applyCuratedServiceChoices(serviceDetails);

  const journalOrder = ["01", "02", "06", "03", "04"];
  const journalOverrides: Record<string, JournalArticleContent> = {
    "01": { number: "01", image: "/images/journal-skin-v2.webp", vi: { title: "Chăm sóc da: Làm sạch sâu hay ưu tiên phục hồi?", readingTime: "3 phút đọc" }, en: { title: "Skin: Deep cleansing or recovery first?", readingTime: "3 min read" } },
    "02": { number: "02", image: "/images/journal-scalp-v2.webp", vi: { title: "Gội đầu dưỡng sinh: Vì sao da đầu và vai gáy nên thả lỏng cùng nhau?", readingTime: "4 phút đọc" }, en: { title: "Head Spa: Why should the scalp, neck and shoulders unwind together?", readingTime: "4 min read" } },
    "06": { number: "03", image: "/images/journal-body-v2.webp", vi: { title: "Chăm sóc cơ thể: Khi nào là lúc phù hợp để làm mới bề mặt da?", readingTime: "4 phút đọc" }, en: { title: "Body: When is the right time to refresh your skin?", readingTime: "4 min read" } },
    "03": { number: "04", image: "/images/journal-brow-v2.webp", vi: { title: "Mi & chân mày: Giữ đường nét tự nhiên bằng cách nào?", readingTime: "3 phút đọc" }, en: { title: "Brow & Lash: How do you keep the result naturally yours?", readingTime: "3 min read" } },
    "04": { number: "05", image: "/images/journal-technology-v2.webp", vi: { title: "Triệt lông: Cần chuẩn bị gì trước khi thực hiện?", readingTime: "3 phút đọc" }, en: { title: "Hair Removal: How should you prepare for technology or waxing?", readingTime: "3 min read" } },
  };

  return withMediaOrigin({
    services,
    serviceDetails,
    highlights: highlightRows.map((row) => ({
      number: text(row.display_number),
      image: text(row.image_path),
      vi: [localized(row, "title", "vi"), localized(row, "description", "vi")],
      en: [localized(row, "title", "en"), localized(row, "description", "en")],
    })),
    results: resultRows.map((row) => ({
      image: text(row.image_path),
      vi: [
        vietnamizeBody(localized(row, "title", "vi")),
        vietnamizeBody(localized(row, "description", "vi")),
        vietnamizeBody(localized(row, "category_label", "vi")),
      ],
      en: [localized(row, "title", "en"), localized(row, "description", "en"), localized(row, "category_label", "en")],
    })),
    testimonials: testimonialRows.map((row) => {
      return {
        initials: text(row.initials),
        name: { vi: localized(row, "name", "vi"), en: localized(row, "name", "en") },
        quote: { vi: localized(row, "quote", "vi"), en: localized(row, "quote", "en") },
      };
    }),
    journalArticles: journalOrder.map((number) => journalOverrides[number]),
  });
}
