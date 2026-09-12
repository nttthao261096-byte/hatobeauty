import Link from "next/link";
import SetPasswordForm from "./set-password-form";

export default function SetPasswordPage() {
  return (
    <main className="admin-login-shell">
      <section className="admin-login-card" aria-labelledby="set-password-title">
        <Link className="admin-brand" href="/" aria-label="Về trang chủ Hato Beauty">
          <span>HATO</span><small>BEAUTY</small>
        </Link>
        <p className="admin-eyebrow">Khu vực nội bộ</p>
        <h1 id="set-password-title">Kích hoạt quản trị</h1>
        <p className="admin-muted">Tạo mật khẩu riêng để bảo vệ khu vực quản trị Hato Beauty.</p>
        <SetPasswordForm />
      </section>
    </main>
  );
}
