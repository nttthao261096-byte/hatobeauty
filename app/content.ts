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

const serviceEditorial: Record<string, {
  vi: { description: string; suitable: string };
  en: { description: string; suitable: string };
}> = {
  skin: {
    vi: { description: "Làm sạch, cấp ẩm và phục hồi theo tình trạng da sau khi soi.", suitable: "Da thiếu ẩm, xỉn màu hoặc cần phục hồi." },
    en: { description: "Cleanse, hydrate and restore according to your skin assessment.", suitable: "Dehydrated, dull or recovery-focused skin." },
  },
  scalp: {
    vi: { description: "Làm sạch da đầu, massage đầu–vai–gáy để cơ thể thả lỏng.", suitable: "Da đầu bết, vai gáy căng hoặc cần thư giãn." },
    en: { description: "Cleanse the scalp and release tension through head, neck and shoulder massage.", suitable: "Oily scalp, tense shoulders or a need to unwind." },
  },
  "brow-lash": {
    vi: { description: "Tạo dáng mày và độ cong mi hài hòa với gương mặt.", suitable: "Muốn đường nét sáng, tự nhiên và dễ chăm sóc." },
    en: { description: "Shape brows and lift lashes to suit your natural features.", suitable: "A brighter, balanced look that is easy to maintain." },
  },
  "hair-removal": {
    vi: { description: "Điều chỉnh thông số theo từng vùng da, trong không gian riêng tư.", suitable: "Tay, chân, nách và vùng cần chăm sóc riêng." },
    en: { description: "Tailored settings for each area, delivered in complete privacy.", suitable: "Arms, legs, underarms and personally assessed areas." },
  },
  waxing: {
    vi: { description: "Waxing cẩn trọng, kết hợp làm dịu da trước và sau dịch vụ.", suitable: "Cần làn da gọn mịn ngay, với quy trình kín đáo." },
    en: { description: "Careful waxing with soothing care before and after.", suitable: "An immediate smooth result with discreet care." },
  },
  body: {
    vi: { description: "Tẩy tế bào chết, dưỡng ẩm và thư giãn cho da cơ thể.", suitable: "Da khô ráp hoặc cần chăm sóc định kỳ." },
    en: { description: "Exfoliate, hydrate and relax with a complete body ritual.", suitable: "Dry, rough skin or regular restorative care." },
  },
};

const highlightEditorial: Record<string, { vi: string; en: string }> = {
  "01": { vi: "Thiết bị được chọn và điều chỉnh theo từng vùng da, sau bước đánh giá rõ ràng.", en: "Technology is selected and adjusted for each area after a clear assessment." },
  "02": { vi: "Thao tác cẩn trọng, tư vấn chân thành và luôn tôn trọng cảm nhận của bạn.", en: "Careful technique, honest guidance and respect for your comfort." },
  "03": { vi: "Mỗi liệu trình bắt đầu từ nhu cầu thật và mục tiêu đã thống nhất.", en: "Every plan begins with your real needs and an agreed goal." },
  "04": { vi: "Không gian ấm, riêng tư và đủ yên để bạn thực sự thả lỏng.", en: "A warm, private space designed for genuine relaxation." },
};

const resultEditorial: Record<string, { vi: string; en: string }> = {
  "1": { vi: "Da sáng khỏe, ẩm mượt", en: "Brighter, replenished skin" },
  "2": { vi: "Chân mày thanh, mi cong nhẹ", en: "Refined brows, softly lifted lashes" },
  "3": { vi: "Da cơ thể mịn màng hơn", en: "Smoother body skin" },
};

const testimonialEditorial: Record<string, { vi: string; en: string }> = {
  "1": { vi: "Không gian dịu, sạch và tư vấn vừa đủ — không hề bị thúc ép.", en: "Calm, immaculate and thoughtfully guided, without any pressure." },
  "2": { vi: "Mọi bước rõ ràng, chuyên nghiệp mà vẫn gần gũi, riêng tư.", en: "Every step was clear, professional, welcoming and private." },
  "3": { vi: "Đội ngũ nhẹ nhàng và luôn hỏi lại mức độ thoải mái.", en: "The team was gentle and always checked my comfort." },
  "4": { vi: "Tư vấn thực tế; sau buổi hẹn, mình biết cách chăm sóc tiếp.", en: "Practical advice left me knowing exactly what to do next." },
  "5": { vi: "Chỉn chu từ đặt lịch đến khi ra về. Mình muốn quay lại.", en: "Thoughtful from booking to goodbye. I would gladly return." },
  "6": { vi: "Mình được chăm đúng nhu cầu, không theo công thức chung.", en: "The care matched my needs, never a one-size-fits-all formula." },
  "7": { vi: "Không gian, mùi hương và nhịp phục vụ đều rất dễ chịu.", en: "The space, scent and pace all felt genuinely soothing." },
  "8": { vi: "Sự cẩn thận trong từng chi tiết khiến mình an tâm ngay lần đầu.", en: "Care in every detail reassured me from my first visit." },
};

const journalEditorial: Record<string, { vi: string; en: string }> = {
  "01": { vi: "Làm sạch sâu hay ưu tiên phục hồi?", en: "Deep cleanse or restore first?" },
  "02": { vi: "Vì sao nên thư giãn đầu, vai và gáy cùng lúc?", en: "Why relax the scalp, neck and shoulders together?" },
  "03": { vi: "Đường nét nào giữ gương mặt tự nhiên?", en: "Which shape keeps your features natural?" },
  "04": { vi: "Chuẩn bị gì trước liệu trình công nghệ cao?", en: "How should you prepare for advanced care?" },
  "05": { vi: "Cách làm dịu da sau liệu trình", en: "How to calm skin after a treatment" },
  "06": { vi: "Khi nào nên làm mới bề mặt da?", en: "When should you refresh the skin's surface?" },
  "07": { vi: "Uốn mi giữ được bao lâu?", en: "How long does a lash lift last?" },
};

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function key(value: unknown): string {
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
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

  const [serviceRows, highlightRows, resultRows, testimonialRows, journalRows] = await Promise.all([
    fetchRows(baseUrl, apiKey, "services"),
    fetchRows(baseUrl, apiKey, "highlights"),
    fetchRows(baseUrl, apiKey, "results"),
    fetchRows(baseUrl, apiKey, "testimonials"),
    fetchRows(baseUrl, apiKey, "journal_articles"),
  ]);

  const services = serviceRows.map((row) => {
    const id = text(row.slug);
    const editorial = serviceEditorial[id];
    return {
      id,
      category: text(row.category) as ServiceContent["category"],
      number: text(row.display_number),
      image: text(row.image_path),
      vi: {
        title: localized(row, "title", "vi"),
        summary: localized(row, "summary", "vi"),
        description: editorial?.vi.description ?? localized(row, "description", "vi"),
        suitable: editorial?.vi.suitable ?? localized(row, "suitable", "vi"),
      },
      en: {
        title: localized(row, "title", "en"),
        summary: localized(row, "summary", "en"),
        description: editorial?.en.description ?? localized(row, "description", "en"),
        suitable: editorial?.en.suitable ?? localized(row, "suitable", "en"),
      },
    };
  });

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

  return {
    services,
    serviceDetails,
    highlights: highlightRows.map((row) => {
      const number = text(row.display_number);
      return {
        number,
        image: text(row.image_path),
        vi: [localized(row, "title", "vi"), highlightEditorial[number]?.vi ?? localized(row, "description", "vi")],
        en: [localized(row, "title", "en"), highlightEditorial[number]?.en ?? localized(row, "description", "en")],
      };
    }),
    results: resultRows.map((row) => {
      const id = key(row.id);
      return {
        image: text(row.image_path),
        vi: [resultEditorial[id]?.vi ?? localized(row, "title", "vi"), localized(row, "description", "vi"), localized(row, "category_label", "vi")],
        en: [resultEditorial[id]?.en ?? localized(row, "title", "en"), localized(row, "description", "en"), localized(row, "category_label", "en")],
      };
    }),
    testimonials: testimonialRows.map((row) => ({
      initials: text(row.initials),
      name: { vi: localized(row, "name", "vi"), en: localized(row, "name", "en") },
      quote: {
        vi: testimonialEditorial[key(row.id)]?.vi ?? localized(row, "quote", "vi"),
        en: testimonialEditorial[key(row.id)]?.en ?? localized(row, "quote", "en"),
      },
    })),
    journalArticles: journalRows.map((row) => {
      const number = text(row.display_number);
      return {
        number,
        image: text(row.image_path),
        vi: { title: journalEditorial[number]?.vi ?? localized(row, "title", "vi"), readingTime: localized(row, "reading_time", "vi") },
        en: { title: journalEditorial[number]?.en ?? localized(row, "title", "en"), readingTime: localized(row, "reading_time", "en") },
      };
    }),
  };
}
