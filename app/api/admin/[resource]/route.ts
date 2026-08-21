import { NextResponse } from "next/server";
import { adminRest, getAdminSession, isSameOrigin } from "../../../admin/_lib/admin";

type Resource = "articles" | "customers" | "contacts" | "bookings";

const resources: Record<Resource, { table: string; order: string; creatable: boolean; fields: string[] }> = {
  articles: {
    table: "journal_articles",
    order: "sort_order.asc",
    creatable: true,
    fields: ["display_number", "image_path", "title_vi", "title_en", "slug_vi", "slug_en", "excerpt_vi", "excerpt_en", "content_vi", "content_en", "reading_time_vi", "reading_time_en", "sort_order", "is_published"],
  },
  customers: {
    table: "customers",
    order: "created_at.desc",
    creatable: true,
    fields: ["full_name", "phone", "email", "status", "notes", "last_contacted_at"],
  },
  contacts: {
    table: "contact_requests",
    order: "created_at.desc",
    creatable: true,
    fields: ["full_name", "phone", "email", "subject", "message", "status", "source"],
  },
  bookings: {
    table: "booking_requests",
    order: "created_at.desc",
    creatable: false,
    fields: [],
  },
};

function selectFields(input: unknown, fields: string[]) {
  const source = input && typeof input === "object" ? input as Record<string, unknown> : {};
  return Object.fromEntries(fields.filter((field) => field in source).map((field) => [field, source[field]]));
}

function getConfig(value: string) {
  return resources[value as Resource] ?? null;
}

export async function GET(_request: Request, context: { params: Promise<{ resource: string }> }) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401, headers: { "Cache-Control": "private, no-store" } });
  }
  const { resource } = await context.params;
  const config = getConfig(resource);
  if (!config) return NextResponse.json({ error: "Không tìm thấy dữ liệu." }, { status: 404 });

  try {
    const query = new URLSearchParams({ select: "*", order: config.order, limit: "500" });
    const data = await adminRest(`${config.table}?${query}`);
    return NextResponse.json({ data }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Không thể tải dữ liệu." }, { status: 500 });
  }
}

export async function POST(request: Request, context: { params: Promise<{ resource: string }> }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
  if (!(await getAdminSession())) return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const { resource } = await context.params;
  const config = getConfig(resource);
  if (!config?.creatable) return NextResponse.json({ error: "Không hỗ trợ thao tác này." }, { status: 405 });

  const payload = selectFields(await request.json().catch(() => null), config.fields);
  if (Object.keys(payload).length === 0) return NextResponse.json({ error: "Dữ liệu trống." }, { status: 400 });

  try {
    const data = await adminRest(config.table, { method: "POST", body: JSON.stringify(payload) });
    return NextResponse.json({ data }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Không thể lưu dữ liệu. Vui lòng kiểm tra các trường bắt buộc và giá trị trùng." }, { status: 400 });
  }
}

