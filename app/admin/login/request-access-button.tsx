"use client";

import { useState } from "react";

export default function RequestAccessButton() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function requestAccess() {
    setPending(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/auth/request-access", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Không thể gửi liên kết.");
      setMessage("Đã gửi liên kết kích hoạt đến email chủ website. Vui lòng kiểm tra cả thư rác.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Không thể gửi liên kết.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-login-form">
      <p className="admin-muted">Lần đầu đăng nhập hoặc chưa có tài khoản?</p>
      <button className="admin-primary-button" type="button" onClick={requestAccess} disabled={pending}>
        {pending ? "Đang gửi…" : "Gửi liên kết kích hoạt"}
      </button>
      {message && <p className="admin-muted" role="status">{message}</p>}
      {error && <p className="admin-alert" role="alert">{error}</p>}
    </div>
  );
}
