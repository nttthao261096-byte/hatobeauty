"use client";

import { FormEvent, useEffect, useState } from "react";

export default function SetPasswordForm() {
  const [accessToken, setAccessToken] = useState("");
  const [linkError, setLinkError] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const token = fragment.get("access_token") ?? "";
      const type = fragment.get("type");
      const description = fragment.get("error_description");

      if (description) {
        setLinkError(decodeURIComponent(description.replace(/\+/g, " ")));
      } else if (
        !token || !type || !["email", "invite", "magiclink", "recovery", "signup"].includes(type)
      ) {
        setLinkError("Liên kết kích hoạt không hợp lệ hoặc đã hết hạn.");
      } else {
        setAccessToken(token);
        window.history.replaceState(null, "", window.location.pathname);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");

    if (password.length < 12) {
      setError("Mật khẩu cần có ít nhất 12 ký tự.");
      return;
    }
    if (password !== confirmation) {
      setError("Hai mật khẩu chưa trùng khớp.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/admin/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Không thể đặt mật khẩu.");
      window.location.replace("/admin/login?activated=1");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Không thể đặt mật khẩu.");
      setPending(false);
    }
  }

  if (linkError) {
    return (
      <div className="admin-login-form">
        <p className="admin-alert" role="alert">{linkError}</p>
        <a className="admin-primary-button" href="/admin/login">Quay lại đăng nhập</a>
      </div>
    );
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <label>Mật khẩu mới<input name="password" type="password" autoComplete="new-password" minLength={12} required /></label>
      <label>Nhập lại mật khẩu<input name="confirmation" type="password" autoComplete="new-password" minLength={12} required /></label>
      <p className="admin-muted">Dùng ít nhất 12 ký tự và không sử dụng lại mật khẩu email.</p>
      {error && <p className="admin-alert" role="alert">{error}</p>}
      <button className="admin-primary-button" type="submit" disabled={pending || !accessToken}>
        {pending ? "Đang lưu…" : "Đặt mật khẩu và kích hoạt"}
      </button>
    </form>
  );
}
