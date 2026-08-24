"use client";

import { FormEvent, useState } from "react";

export default function LoginForm({ activated = false }: { activated?: boolean }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Không thể đăng nhập.");
      window.location.assign("/admin");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Không thể đăng nhập.");
      setPending(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <label>Email<input name="email" type="email" autoComplete="username" required /></label>
      <label>Mật khẩu<input name="password" type="password" autoComplete="current-password" minLength={8} required /></label>
      {activated && (
        <p className="admin-notice" role="status">
          Mật khẩu đã được thiết lập. Bạn có thể đăng nhập ngay.
        </p>
      )}
      {error && <p className="admin-alert" role="alert">{error}</p>}
      <button className="admin-primary-button" type="submit" disabled={pending}>{pending ? "Đang đăng nhập…" : "Đăng nhập"}</button>
    </form>
  );
}

