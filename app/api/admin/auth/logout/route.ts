import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isSameOrigin } from "../../../../admin/_lib/admin";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

