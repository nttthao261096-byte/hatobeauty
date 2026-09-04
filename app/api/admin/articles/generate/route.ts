import { NextResponse } from "next/server";
import {
  adminRest,
  getAdminSession,
  isSameOrigin,
} from "../../../../admin/_lib/admin";
import {
  callArticleAI,
  lengths,
  parseInput,
  uniqueSlug,
} from "../../../../admin/_lib/article-ai";
import { journalTopics, seoServices, servicePath } from "../../../../seo-data";
export const runtime = "nodejs";
export const maxDuration = 180;
const headers = { "Cache-Control": "private, no-store" };
export async function POST(request: Request) {
  if (!isSameOrigin(request))
    return NextResponse.json(
      { error: "Yêu cầu không hợp lệ." },
      { status: 403, headers },
    );
  if (!(await getAdminSession()))
    return NextResponse.json(
      { error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." },
      { status: 401, headers },
    );
  let input;
  try {
    const raw = await request.text();
    if (raw.length > 12000) throw new Error("Thông tin quá dài.");
    input = parseInput(JSON.parse(raw));
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Dữ liệu không hợp lệ.",
      },
      { status: 400, headers },
    );
  }
  try {
    const existing = (await adminRest(
      "journal_articles?select=slug_vi,slug_en,sort_order&order=sort_order.desc&limit=1000",
    )) as { slug_vi: string; slug_en: string; sort_order: number }[];
    const services = seoServices.map((s) => ({
      id: s.id,
      vi: s.vi,
      en: s.en,
      links: { vi: servicePath(s, "vi"), en: servicePath(s, "en") },
    }));
    const draft = await callArticleAI(
      input,
      { brand: "Hato Beauty", city: "Đà Nẵng", services },
      request.signal,
    );
    for (const lang of ["vi", "en"] as const)
      draft[`slug_${lang}`] = uniqueSlug(draft[`slug_${lang}`], [
        ...existing.map((x) => x[`slug_${lang}`]),
        ...journalTopics.map((x) => (lang === "vi" ? x.viSlug : x.enSlug)),
      ]);
    const order =
      Math.max(0, ...existing.map((x) => Number(x.sort_order) || 0)) + 1;
    const selected =
      seoServices.find(
        (s) =>
          s.id ===
          (
            {
              "Chăm sóc da": "skin",
              "Gội đầu dưỡng sinh": "scalp",
              "Chăm sóc cơ thể": "body",
              "Mi và mày": "brow-lash",
              "Triệt lông": "hair-removal",
              Waxing: "waxing",
            } as Record<string, string>
          )[input.pillar],
      ) || seoServices[0];
    const data = {
      ...draft,
      display_number: String(order).padStart(2, "0"),
      sort_order: order,
      image_path: new URL(selected.image).pathname,
      is_published: false,
    };
    const lengthWarnings = (["vi", "en"] as const).flatMap((lang) => {
      const count = draft[`content_${lang}`].split(/\s+/).length;
      const [min, max] = lengths[input.length];
      return count < min || count > max
        ? [
            `Bản ${lang.toUpperCase()} có ${count} từ; khoảng đề nghị ${min}–${max}. Bạn có thể bổ sung hoặc rút gọn khi duyệt.`,
          ]
        : [];
    });
    return NextResponse.json(
      {
        data,
        warnings: [
          ...lengthWarnings,
          "Đã điền bản nháp Việt–Anh. Kiểm tra độ chính xác, nguồn tham khảo, ảnh bìa và nội dung chuyên môn trước khi đăng.",
          "Ảnh bìa được chọn từ thư viện Hato hiện có. Bạn có thể thay ảnh phù hợp hơn.",
        ],
      },
      { headers },
    );
  } catch (error) {
    const message =
      error instanceof Error && !error.message.startsWith("Supabase")
        ? error.message
        : "Không thể chuẩn bị bài viết. Vui lòng thử lại.";
    return NextResponse.json({ error: message }, { status: 502, headers });
  }
}
