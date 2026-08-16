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

function textArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function localized(row: JsonRow, field: string, lang: Lang): string {
  return text(row[`${field}_${lang}`]);
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

export async function loadHomeContent(): Promise<HomeContent> {
  const baseUrl = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const apiKey =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_SECRET_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("Supabase public content environment is not configured.");
  }

  const [serviceRows, highlightRows, resultRows, testimonialRows] = await Promise.all([
    fetchRows(baseUrl, apiKey, "services"),
    fetchRows(baseUrl, apiKey, "highlights"),
    fetchRows(baseUrl, apiKey, "results"),
    fetchRows(baseUrl, apiKey, "testimonials"),
  ]);

  const serviceOrder = ["skin", "scalp", "body", "brow-lash", "hair-removal"];
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
      if (service.id !== "hair-removal") return { ...service, number };

      return {
        ...service,
        number,
        vi: {
          ...service.vi,
          title: "Triệt lông & Waxing",
          summary: "Công nghệ · Waxing · Riêng tư",
          description: "Giải pháp loại bỏ lông bằng công nghệ hoặc waxing, được lựa chọn theo vùng da, nhu cầu và mức độ thoải mái của riêng bạn.",
          suitable: "Các vùng mặt, tay, chân, nách hoặc body cần chăm sóc kín đáo và phù hợp với tình trạng da.",
        },
        en: {
          ...service.en,
          title: "Hair Removal & Waxing",
          summary: "Technology · Waxing · Privacy",
          description: "Technology-led hair removal or waxing, selected around the treatment area, your skin and your preferred level of comfort.",
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

  const journalOrder = ["01", "02", "06", "03", "04"];
  const journalOverrides: Record<string, JournalArticleContent> = {
    "01": { number: "01", image: "/images/journal-skin-v2.webp", vi: { title: "Skin: Làm sạch sâu hay ưu tiên phục hồi?", readingTime: "3 phút đọc" }, en: { title: "Skin: Deep cleansing or recovery first?", readingTime: "3 min read" } },
    "02": { number: "02", image: "/images/journal-scalp-v2.webp", vi: { title: "Head Spa: Vì sao da đầu và vai gáy nên thả lỏng cùng nhau?", readingTime: "4 phút đọc" }, en: { title: "Head Spa: Why should the scalp, neck and shoulders unwind together?", readingTime: "4 min read" } },
    "06": { number: "03", image: "/images/journal-body-v2.webp", vi: { title: "Body: Khi nào là lúc phù hợp để làm mới bề mặt da?", readingTime: "4 phút đọc" }, en: { title: "Body: When is the right time to refresh your skin?", readingTime: "4 min read" } },
    "03": { number: "04", image: "/images/journal-brow-v2.webp", vi: { title: "Brow & Lash: Giữ đường nét tự nhiên bằng cách nào?", readingTime: "3 phút đọc" }, en: { title: "Brow & Lash: How do you keep the result naturally yours?", readingTime: "3 min read" } },
    "04": { number: "05", image: "/images/journal-technology-v2.webp", vi: { title: "Hair Removal: Chuẩn bị gì trước triệt lông hoặc waxing?", readingTime: "3 phút đọc" }, en: { title: "Hair Removal: How should you prepare for technology or waxing?", readingTime: "3 min read" } },
  };

  return {
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
      vi: [localized(row, "title", "vi"), localized(row, "description", "vi"), localized(row, "category_label", "vi")],
      en: [localized(row, "title", "en"), localized(row, "description", "en"), localized(row, "category_label", "en")],
    })),
    testimonials: testimonialRows.map((row, index) => {
      const internationalGuests: Record<number, TestimonialContent> = {
        4: { initials: "EL", name: { vi: "Emma Lewis · Úc", en: "Emma Lewis · Australia" }, quote: { vi: "Tư vấn bằng tiếng Anh rất rõ ràng và chu đáo. Tôi cảm thấy thoải mái, được lắng nghe và hiểu từng bước của liệu trình.", en: "The English consultation was clear and thoughtful. I felt comfortable, listened to and informed at every step." } },
        5: { initials: "YK", name: { vi: "Yuna Kim · Hàn Quốc", en: "Yuna Kim · South Korea" }, quote: { vi: "Không gian thanh lịch nhưng gần gũi. Đội ngũ luôn kiểm tra cảm giác của tôi nên toàn bộ trải nghiệm rất dễ chịu.", en: "The space is elegant yet welcoming. The team checked my comfort throughout, which made the whole experience effortless." } },
        6: { initials: "MS", name: { vi: "Mia Santos · Singapore", en: "Mia Santos · Singapore" }, quote: { vi: "Tôi thích cách mọi lựa chọn đều được giải thích thực tế, không hề tạo áp lực. Đây là nơi tôi muốn quay lại khi đến Việt Nam.", en: "I loved how every option was explained without pressure. This is somewhere I would return to whenever I am in Vietnam." } },
        7: { initials: "CL", name: { vi: "Chloé Laurent · Pháp", en: "Chloé Laurent · France" }, quote: { vi: "Từng chi tiết đều tinh tế, từ mùi hương đến nhịp phục vụ. Một trải nghiệm làm đẹp rất riêng và đáng nhớ.", en: "Every detail felt considered, from the scent to the pace of care. A personal and memorable beauty experience." } },
      };
      return internationalGuests[index] ?? {
        initials: text(row.initials),
        name: { vi: localized(row, "name", "vi"), en: localized(row, "name", "en") },
        quote: { vi: localized(row, "quote", "vi"), en: localized(row, "quote", "en") },
      };
    }),
    journalArticles: journalOrder.map((number) => journalOverrides[number]),
  };
}
