import { NextResponse } from "next/server";
import { isSameOrigin, setAdminPassword } from "../../../../admin/_lib/admin";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as {
    accessToken?: unknown;
    password?: unknown;
  } | null;
  const accessToken = typeof body?.accessToken === "string" ? body.accessToken : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!accessToken || password.length < 12) {
    return NextResponse.json(
      { error: "Liên kết không hợp lệ hoặc mật khẩu chưa đủ 12 ký tự." },
      { status: 400 },
    );
  }

  try {
    const updated = await setAdminPassword(accessToken, password);
    if (!updated) {
      return NextResponse.json(
        { error: "Liên kết kích hoạt không hợp lệ hoặc đã hết hạn." },
        { status: 401 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Không thể đặt mật khẩu lúc này." }, { status: 500 });
  }
}
