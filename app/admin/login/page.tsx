import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "../_lib/admin";
import LoginForm from "./login-form";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="admin-login-shell">
      <section className="admin-login-card" aria-labelledby="login-title">
        <Link className="admin-brand" href="/" aria-label="Về trang chủ Hato Beauty">
          <span>HATO</span><small>BEAUTY</small>
        </Link>
        <p className="admin-eyebrow">Khu vực nội bộ</p>
        <h1 id="login-title">Đăng nhập quản trị</h1>
        <p className="admin-muted">Quản lý bài viết, khách hàng, yêu cầu liên hệ và lịch hẹn.</p>
        <LoginForm />
      </section>
    </main>
  );
}

