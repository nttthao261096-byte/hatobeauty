"use client";

import Link from "next/link";
import { ArticleAiPanel } from "./article-ai-panel";
import { FormEvent, useCallback, useDeferredValue, useMemo, useState } from "react";
import { articleSeoChecks } from "./_lib/seo-checklist";

type Row = Record<string, unknown> & { id: number };
type Resource = "articles" | "customers" | "contacts" | "bookings";
type Tab = "overview" | Resource;

const resourceLabels: Record<Resource, string> = {
  articles: "Bài viết",
  customers: "Khách hàng",
  contacts: "Liên hệ",
  bookings: "Lịch hẹn",
};

const statusLabels: Record<string, string> = {
  potential: "Tiềm năng", active: "Đang hoạt động", inactive: "Ngừng theo dõi", vip: "VIP",
  new: "Mới", contacted: "Đã liên hệ", resolved: "Đã xử lý", spam: "Spam",
  pending: "Chờ xử lý", confirmed: "Đã xác nhận", completed: "Hoàn thành", cancelled: "Đã hủy",
};

const blankArticle = { display_number: "", image_path: "", title_vi: "", title_en: "", slug_vi: "", slug_en: "", excerpt_vi: "", excerpt_en: "", content_vi: "", content_en: "", tags_vi: "", tags_en: "", reading_time_vi: "3 phút đọc", reading_time_en: "3 min read", sort_order: 1, is_published: false };
const blankCustomer = { full_name: "", phone: "", email: "", status: "potential", notes: "", last_contacted_at: "" };
const blankContact = { full_name: "", phone: "", email: "", subject: "", message: "", status: "new", source: "manual" };

function text(value: unknown) { return typeof value === "string" ? value : value == null ? "" : String(value); }
function date(value: unknown) { return value ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(String(value))) : "—"; }

export default function AdminDashboard({ adminName, initialData }: { adminName: string; initialData: Record<string, unknown> }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [data, setData] = useState<Record<Resource, Row[]>>(initialData as Record<Resource, Row[]>);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editor, setEditor] = useState<{ resource: Exclude<Resource, "bookings">; row: Record<string, unknown> } | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const entries = await Promise.all((Object.keys(resourceLabels) as Resource[]).map(async (resource) => {
        const response = await fetch(`/api/admin/${resource}`, { cache: "no-store" });
        if (response.status === 401) { window.location.assign("/admin/login"); throw new Error("Phiên đăng nhập đã hết hạn."); }
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Không thể tải dữ liệu.");
        return [resource, result.data] as const;
      }));
      setData(Object.fromEntries(entries) as Record<Resource, Row[]>);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Không thể tải dữ liệu."); }
    finally { setLoading(false); }
  }, []);

  const metrics = useMemo(() => ({
    published: data.articles.filter((item) => item.is_published).length,
    activeCustomers: data.customers.filter((item) => item.status === "active" || item.status === "vip").length,
    newContacts: data.contacts.filter((item) => item.status === "new").length,
    pendingBookings: data.bookings.filter((item) => item.status === "pending").length,
  }), [data]);

  async function logout() { await fetch("/api/admin/auth/logout", { method: "POST" }); window.location.assign("/admin/login"); }

  async function updateStatus(resource: Resource, id: number, status: string) {
    const response = await fetch(`/api/admin/${resource}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) setError("Không thể cập nhật trạng thái."); else await load();
  }

  async function remove(resource: Exclude<Resource, "bookings">, id: number) {
    if (!window.confirm("Bạn có chắc muốn xóa mục này? Thao tác không thể hoàn tác.")) return;
    const response = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    if (!response.ok) setError("Không thể xóa dữ liệu."); else await load();
  }

  function create(resource: Exclude<Resource, "bookings">) {
    setEditor({ resource, row: resource === "articles" ? blankArticle : resource === "customers" ? blankCustomer : blankContact });
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link className="admin-brand admin-brand-light" href="/"><span>HATO</span><small>BEAUTY</small></Link>
        <nav aria-label="Điều hướng quản trị">
          <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Tổng quan</button>
          {(Object.keys(resourceLabels) as Resource[]).map((resource) => <button key={resource} className={tab === resource ? "active" : ""} onClick={() => setTab(resource)}>{resourceLabels[resource]} <span>{data[resource].length}</span></button>)}
        </nav>
        <button className="admin-logout" onClick={logout}>Đăng xuất</button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar"><div><p className="admin-eyebrow">Hato Beauty Studio</p><h1>{tab === "overview" ? "Tổng quan" : resourceLabels[tab]}</h1></div><div className="admin-user"><span>{adminName.slice(0, 1).toUpperCase()}</span><small>{adminName}</small></div></header>
        {error && <div className="admin-alert admin-page-alert" role="alert">{error}<button onClick={() => setError("")}>×</button></div>}
        {loading ? <div className="admin-loading">Đang tải dữ liệu…</div> : tab === "overview" ? (
          <section className="admin-metrics" aria-label="Thống kê">
            <Metric label="Bài đang hiển thị" value={metrics.published} note={`${data.articles.length} bài viết`} />
            <Metric label="Khách đang chăm sóc" value={metrics.activeCustomers} note={`${data.customers.length} hồ sơ`} />
            <Metric label="Liên hệ mới" value={metrics.newContacts} note="Cần phản hồi" attention={metrics.newContacts > 0} />
            <Metric label="Lịch hẹn chờ" value={metrics.pendingBookings} note="Cần xác nhận" attention={metrics.pendingBookings > 0} />
          </section>
        ) : <ResourcePanel resource={tab} rows={data[tab]} onCreate={() => tab !== "bookings" && create(tab)} onEdit={(row) => tab !== "bookings" && setEditor({ resource: tab, row })} onDelete={(id) => tab !== "bookings" && remove(tab, id)} onStatus={(id, status) => updateStatus(tab, id, status)} />}
      </main>
      {editor && <Editor editor={editor} onClose={() => setEditor(null)} onSaved={async () => { setEditor(null); await load(); }} />}
    </div>
  );
}

function Metric({ label, value, note, attention = false }: { label: string; value: number; note: string; attention?: boolean }) {
  return <article className={`admin-metric ${attention ? "attention" : ""}`}><p>{label}</p><strong>{value}</strong><small>{note}</small></article>;
}

function ResourcePanel({ resource, rows, onCreate, onEdit, onDelete, onStatus }: { resource: Resource; rows: Row[]; onCreate: () => void; onEdit: (row: Row) => void; onDelete: (id: number) => void; onStatus: (id: number, status: string) => void }) {
  const statuses = resource === "customers" ? ["potential", "active", "vip", "inactive"] : resource === "contacts" ? ["new", "contacted", "resolved", "spam"] : resource === "bookings" ? ["pending", "contacted", "confirmed", "completed", "cancelled"] : [];
  return <section className="admin-panel">
    <div className="admin-panel-head"><div><h2>{resourceLabels[resource]}</h2><p>{rows.length} mục trong hệ thống</p></div>{resource !== "bookings" && <button className="admin-primary-button" onClick={onCreate}>+ Thêm mới</button>}</div>
    {rows.length === 0 ? <div className="admin-empty"><strong>Chưa có dữ liệu</strong><p>{resource === "bookings" ? "Lịch hẹn từ website sẽ xuất hiện tại đây." : "Nhấn “Thêm mới” để bắt đầu."}</p></div> : <div className="admin-table-wrap"><table><thead><tr><th>Nội dung</th><th>Thông tin</th><th>Trạng thái</th><th>Cập nhật</th><th><span className="sr-only">Thao tác</span></th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}>
      <td><strong>{text(row.title_vi || row.full_name)}</strong><small>{text(row.display_number || row.subject || row.service_slug)}</small></td>
      <td><span>{text(row.phone || row.slug_vi || row.email)}</span><small>{text(row.email || row.preferred_date || row.reading_time_vi)}</small></td>
      <td>{resource === "articles" ? <span className={`admin-badge ${row.is_published ? "good" : "muted"}`}>{row.is_published ? "Đang hiển thị" : "Bản nháp"}</span> : <select aria-label="Trạng thái" value={text(row.status)} onChange={(event) => onStatus(row.id, event.target.value)}>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select>}</td>
      <td>{date(row.updated_at || row.created_at)}</td>
      <td><div className="admin-row-actions">{resource !== "bookings" && <><button onClick={() => onEdit(row)}>Sửa</button><button className="danger" onClick={() => onDelete(row.id)}>Xóa</button></>}</div></td>
    </tr>)}</tbody></table></div>}
  </section>;
}

function Editor({ editor, onClose, onSaved }: { editor: { resource: Exclude<Resource, "bookings">; row: Record<string, unknown> }; onClose: () => void; onSaved: () => void }) {
  const [pending, setPending] = useState(false); const [error, setError] = useState("");
  const [articleRow, setArticleRow] = useState(editor.row);
  const [generation, setGeneration] = useState(0);
  const [aiBusy, setAiBusy] = useState(false);
  const [seoRow, setSeoRow] = useState(editor.row);
  const isEdit = Boolean(editor.row.id);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("");
    const form = new FormData(event.currentTarget); const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    if (editor.resource === "articles") { payload.sort_order = Number(payload.sort_order); payload.is_published = form.get("is_published") === "on"; }
    if (editor.resource === "customers" && !payload.last_contacted_at) payload.last_contacted_at = null;
    const url = isEdit ? `/api/admin/${editor.resource}/${editor.row.id}` : `/api/admin/${editor.resource}`;
    const response = await fetch(url, { method: isEdit ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Không thể lưu."); setPending(false); return; }
    onSaved();
  }
  function updateSeo(form: HTMLFormElement) {
    setSeoRow(Object.fromEntries(new FormData(form).entries()));
  }
  const deferredSeoRow = useDeferredValue(seoRow);
  const checks = editor.resource === "articles" ? articleSeoChecks(deferredSeoRow) : [];
  return <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className={`admin-modal ${editor.resource === "articles" ? "admin-article-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="editor-title"><div className="admin-modal-head"><div><p className="admin-eyebrow">{isEdit ? "Chỉnh sửa" : "Tạo mới"}</p><h2 id="editor-title">{resourceLabels[editor.resource]}</h2></div><button aria-label="Đóng" onClick={onClose}>×</button></div><form className="admin-editor-form" onSubmit={submit} onInput={(event) => editor.resource === "articles" && updateSeo(event.currentTarget)}>
    {editor.resource === "articles" && <div className="admin-article-workspace"><div className="admin-article-editor">{!isEdit && <ArticleAiPanel onBusy={setAiBusy} onGenerated={(draft) => { setArticleRow(draft); setSeoRow(draft); setGeneration(x => x + 1); }} />}<fieldset className="admin-article-fields" disabled={aiBusy}><ArticleFields key={generation} row={articleRow} /></fieldset></div><SeoChecklist checks={checks} /></div>}{editor.resource === "customers" && <CustomerFields row={editor.row} />}{editor.resource === "contacts" && <ContactFields row={editor.row} />}
    {error && <p className="admin-alert" role="alert">{error}</p>}<div className="admin-form-actions"><button type="button" onClick={onClose}>Hủy</button><button className="admin-primary-button" disabled={pending || aiBusy}>{pending ? "Đang lưu…" : "Lưu thay đổi"}</button></div>
  </form></section></div>;
}

function SeoChecklist({ checks }: { checks: ReturnType<typeof articleSeoChecks> }) {
  const passed = checks.filter((check) => check.passed).length;
  return <aside className="admin-seo-checklist" aria-labelledby="seo-checklist-title" aria-live="polite"><div className="admin-seo-summary"><div><p className="admin-eyebrow">Bản tiếng Việt · trực tiếp</p><h3 id="seo-checklist-title">Checklist SEO bài mới</h3></div><strong>{passed}/{checks.length}</strong></div><div className="admin-seo-progress" role="progressbar" aria-label="Tiến độ checklist SEO" aria-valuemin={0} aria-valuemax={checks.length} aria-valuenow={passed}><span style={{ width: `${passed / checks.length * 100}%` }} /></div><ul>{checks.map((check) => <li key={check.id} className={check.passed ? "passed" : "pending"}><span className="admin-seo-icon" aria-hidden="true">{check.passed ? "✓" : "!"}</span><div><div className="admin-seo-label"><strong>{check.label}</strong><span>{check.value}</span></div><small>{check.hint}</small></div></li>)}</ul><p className="admin-seo-note">Ngưỡng là gợi ý biên tập. FAQ hữu ích cho người đọc nhưng không bảo đảm Google hiển thị rich result.</p></aside>;
}

function Field({ label, name, row, type = "text", required = false }: { label: string; name: string; row: Record<string, unknown>; type?: string; required?: boolean }) { return <label>{label}<input name={name} type={type} defaultValue={text(row[name])} required={required} /></label>; }
function Area({ label, name, row, required = false }: { label: string; name: string; row: Record<string, unknown>; required?: boolean }) { return <label className="admin-full-field">{label}<textarea name={name} defaultValue={text(row[name])} required={required} rows={name.startsWith("content") ? 8 : 3} /></label>; }
function ArticleFields({ row }: { row: Record<string, unknown> }) { return <><div className="admin-form-grid"><Field label="Số hiển thị" name="display_number" row={row} required /><Field label="Thứ tự" name="sort_order" row={row} type="number" required /><Field label="Tiêu đề tiếng Việt" name="title_vi" row={row} required /><Field label="English title" name="title_en" row={row} required /><Field label="Slug tiếng Việt" name="slug_vi" row={row} required /><Field label="English slug" name="slug_en" row={row} required /><Field label="Thời gian đọc VI" name="reading_time_vi" row={row} required /><Field label="Reading time EN" name="reading_time_en" row={row} required /><Field label="Đường dẫn ảnh" name="image_path" row={row} required /><Field label="Tags VI (phân cách bằng dấu phẩy)" name="tags_vi" row={row} /><Field label="English tags (comma-separated)" name="tags_en" row={row} /></div><Area label="Mô tả SEO tiếng Việt" name="excerpt_vi" row={row} /><Area label="English SEO description" name="excerpt_en" row={row} /><Area label="Nội dung tiếng Việt (Markdown)" name="content_vi" row={row} /><Area label="English content (Markdown)" name="content_en" row={row} /><label className="admin-checkbox"><input name="is_published" type="checkbox" defaultChecked={Boolean(row.is_published)} /> Hiển thị bài viết</label></>; }
function CustomerFields({ row }: { row: Record<string, unknown> }) { return <><div className="admin-form-grid"><Field label="Họ và tên" name="full_name" row={row} required /><Field label="Số điện thoại" name="phone" row={row} required /><Field label="Email" name="email" row={row} type="email" /><label>Phân loại<select name="status" defaultValue={text(row.status) || "potential"}>{["potential", "active", "vip", "inactive"].map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></label><Field label="Liên hệ gần nhất" name="last_contacted_at" row={row} type="datetime-local" /></div><Area label="Ghi chú chăm sóc" name="notes" row={row} /></>; }
function ContactFields({ row }: { row: Record<string, unknown> }) { return <><div className="admin-form-grid"><Field label="Họ và tên" name="full_name" row={row} required /><Field label="Số điện thoại" name="phone" row={row} /><Field label="Email" name="email" row={row} type="email" /><Field label="Chủ đề" name="subject" row={row} /><Field label="Nguồn" name="source" row={row} required /><label>Trạng thái<select name="status" defaultValue={text(row.status) || "new"}>{["new", "contacted", "resolved", "spam"].map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></label></div><Area label="Nội dung liên hệ" name="message" row={row} required /></>; }
