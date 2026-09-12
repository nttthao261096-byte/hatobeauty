import { redirect } from "next/navigation";
import { adminRest, getAdminSession } from "./_lib/admin";
import AdminDashboard from "./admin-dashboard";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const definitions = {
    articles: ["journal_articles", "sort_order.asc"],
    customers: ["customers", "created_at.desc"],
    contacts: ["contact_requests", "created_at.desc"],
    bookings: ["booking_requests", "created_at.desc"],
  } as const;
  const initialData = Object.fromEntries(await Promise.all(Object.entries(definitions).map(async ([resource, [table, order]]) => {
    const query = new URLSearchParams({ select: "*", order, limit: "500" });
    return [resource, await adminRest(`${table}?${query}`)];
  })));

  return <AdminDashboard adminName={session.displayName} initialData={initialData} />;
}

