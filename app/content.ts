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

  const [serviceRows, highlightRows, resultRows, testimonialRows, journalRows] = await Promise.all([
    fetchRows(baseUrl, apiKey, "services"),
    fetchRows(baseUrl, apiKey, "highlights"),
    fetchRows(baseUrl, apiKey, "results"),
    fetchRows(baseUrl, apiKey, "testimonials"),
    fetchRows(baseUrl, apiKey, "journal_articles"),
  ]);

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
  }));

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
    testimonials: testimonialRows.map((row) => ({
      initials: text(row.initials),
      name: { vi: localized(row, "name", "vi"), en: localized(row, "name", "en") },
      quote: { vi: localized(row, "quote", "vi"), en: localized(row, "quote", "en") },
    })),
    journalArticles: journalRows.map((row) => ({
      number: text(row.display_number),
      image: text(row.image_path),
      vi: { title: localized(row, "title", "vi"), readingTime: localized(row, "reading_time", "vi") },
      en: { title: localized(row, "title", "en"), readingTime: localized(row, "reading_time", "en") },
    })),
  };
}
