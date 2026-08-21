import { NextResponse } from "next/server";
import { adminRest, getAdminSession, isSameOrigin } from "../../../../admin/_lib/admin";

type Resource = "articles" | "customers" | "contacts" | "bookings";
const resources: Record<Resource, { table: string; fields: string[]; deletable: boolean }> = {
  articles: { table: "journal_articles", deletable: true, fields: ["display_number", "image_path", "title_vi", "title_en", "slug_vi", "slug_en", "excerpt_vi", "excerpt_en", "content_vi", "content_en", "reading_time_vi", "reading_time_en", "sort_order", "is_published"] },
  customers: { table: "customers", deletable: true, fields: ["full_name", "phone", "email", "status", "notes", "last_contacted_at"] },
  contacts: { table: "contact_requests", deletable: true, fields: ["full_name", "phone", "email", "subject", "message", "status", "source"] },
  bookings: { table: "booking_requests", deletable: false, fields: ["status"] },
};

function configFor(value: string) {
  return resources[value as Resource] ?? null;
}

async function authorize(request: Request) {
  return isSameOrigin(request) && Boolean(await getAdminSession());
}

export async function PATCH(request: Request, context: { params: Promise<{ resource: string; id: string }> }) {
  if (!(await authorize(request))) return NextResponse.json({ error: "Không có quyền thực hiện." }, { status: 401 });
  const { resource, id } = await context.params;
  const config = configFor(resource);
  if (!config || !/^\d+$/.test(id)) return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  const raw = await request.json().catch(() => null);
  const source = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const payload = Object.fromEntries(config.fields.filter((field) => field in source).map((field) => [field, source[field]]));
  if (!Object.keys(payload).length) return NextResponse.json({ error: "Dữ liệu trống." }, { status: 400 });

  try {
    const data = await adminRest(`${config.table}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(payload) });
    return NextResponse.json({ data }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Không thể cập nhật dữ liệu." }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ resource: string; id: string }> }) {
  if (!(await authorize(request))) return NextResponse.json({ error: "Không có quyền thực hiện." }, { status: 401 });
  const { resource, id } = await context.params;
  const config = configFor(resource);
  if (!config?.deletable || !/^\d+$/.test(id)) return NextResponse.json({ error: "Không hỗ trợ thao tác này." }, { status: 405 });

  try {
    await adminRest(`${config.table}?id=eq.${id}`, { method: "DELETE" });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Không thể xóa dữ liệu." }, { status: 400 });
  }
}
