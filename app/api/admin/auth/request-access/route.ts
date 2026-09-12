import { NextResponse } from "next/server";
import { isSameOrigin, requestOwnerMagicLink } from "../../../../admin/_lib/admin";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
  }

  try {
    const redirectTo = new URL("/admin/set-password", request.url).toString();
    const sent = await requestOwnerMagicLink(redirectTo);
    if (!sent) {
      return NextResponse.json({ error: "Không thể gửi liên kết lúc này." }, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Không thể gửi liên kết lúc này." }, { status: 500 });
  }
}
