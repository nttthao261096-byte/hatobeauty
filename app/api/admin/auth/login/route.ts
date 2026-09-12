import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isSameOrigin, signInWithPassword } from "../../../../admin/_lib/admin";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as { email?: unknown; password?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || password.length < 8) {
    return NextResponse.json({ error: "Email hoặc mật khẩu không đúng." }, { status: 400 });
  }

  try {
    const result = await signInWithPassword(email, password);
    if (!result) {
      return NextResponse.json({ error: "Email hoặc mật khẩu không đúng." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, result.access_token, {
      httpOnly: true,
      sameSite: "strict",
      secure: new URL(request.url).protocol === "https:",
      path: "/",
      maxAge: Math.max(60, Math.min(result.expires_in, 3600)),
    });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch {
    return NextResponse.json({ error: "Không thể đăng nhập lúc này." }, { status: 500 });
  }
}

