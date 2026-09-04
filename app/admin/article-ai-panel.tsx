"use client";
import { useEffect, useRef, useState } from "react";
type Props = {
  onGenerated: (draft: Record<string, unknown>) => void;
  onBusy: (busy: boolean) => void;
};
export function ArticleAiPanel({ onGenerated, onBusy }: Props) {
  const [topic, setTopic] = useState("");
  const [pillar, setPillar] = useState("Chăm sóc da");
  const [length, setLength] = useState("medium");
  const [keyword, setKeyword] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  async function generate() {
    if (busy) return;
    if (topic.trim().length < 5) {
      setError("Nhập chủ đề có ít nhất 5 ký tự.");
      return;
    }
    if (
      message &&
      !window.confirm(
        "Sinh lại sẽ thay nội dung đang điền trong biểu mẫu. Tiếp tục?",
      )
    )
      return;
    setBusy(true);
    onBusy(true);
    setError("");
    setMessage("");
    abort.current = new AbortController();
    try {
      const response = await fetch("/api/admin/articles/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, pillar, length, keyword, notes }),
        signal: abort.current.signal,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Không thể sinh bài.");
      onGenerated(result.data);
      setMessage(result.warnings.join(" "));
    } catch (e) {
      setError(
        e instanceof Error && e.name === "AbortError"
          ? "Đã hủy sinh bài. Nội dung đang soạn được giữ lại."
          : e instanceof Error
            ? e.message
            : "Không thể kết nối.",
      );
    } finally {
      setBusy(false);
      onBusy(false);
      abort.current = null;
    }
  }
  return (
    <section
      className="admin-ai-panel"
      aria-labelledby="ai-heading"
      aria-busy={busy}
    >
      <div>
        <h3 id="ai-heading">Tạo bài bằng AI</h3>
        <p>
          Bản nháp song ngữ theo hướng dẫn SEO · AEO · GEO — bạn duyệt rồi đăng.
        </p>
      </div>
      <label>
        Chủ đề *
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          maxLength={300}
          disabled={busy}
          placeholder="VD: Chăm sóc da nhạy cảm sau buổi spa"
        />
      </label>
      <div className="admin-form-grid">
        <label>
          Trụ cột
          <select
            value={pillar}
            onChange={(e) => setPillar(e.target.value)}
            disabled={busy}
          >
            {[
              "Chăm sóc da",
              "Gội đầu dưỡng sinh",
              "Chăm sóc cơ thể",
              "Mi và mày",
              "Triệt lông",
              "Waxing",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Độ dài mỗi ngôn ngữ
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            disabled={busy}
          >
            <option value="short">Ngắn (~600–900 từ)</option>
            <option value="medium">Vừa (~1200–1800 từ)</option>
            <option value="long">Dài (~1800–2400 từ)</option>
          </select>
        </label>
        <label className="admin-full-field">
          Từ khóa chính (tùy chọn)
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            maxLength={200}
            disabled={busy}
          />
        </label>
      </div>
      <details>
        <summary>Thông tin thực tế và nguồn tham khảo</summary>
        <label>
          Ghi chú cho bài viết
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            maxLength={6000}
            disabled={busy}
            placeholder="Thông tin đã kiểm chứng, điểm khác biệt thực tế, trích đoạn và URL nguồn bạn muốn sử dụng…"
          />
        </label>
        <p>
          AI không tự tra cứu web. Hãy bổ sung nguồn cho số liệu hoặc thông tin
          mới.
        </p>
      </details>
      <div>
        <button
          type="button"
          className="admin-primary-button"
          disabled={busy}
          onClick={generate}
        >
          {busy ? "Đang viết bản nháp Việt–Anh…" : "Sinh bài bằng AI"}
        </button>
        {busy && (
          <button type="button" onClick={() => abort.current?.abort()}>
            Dừng
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="admin-alert">
          {error}
        </p>
      )}
      {message && <p role="status">{message}</p>}
    </section>
  );
}
