import { cookies } from "next/headers";

export const ADMIN_COOKIE = "hato_admin_session";

type AdminUser = {
  id: string;
  email?: string;
};

export type AdminSession = {
  userId: string;
  email: string;
  displayName: string;
};

function env() {
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !publishableKey || !secretKey) {
    throw new Error("Supabase admin configuration is incomplete.");
  }

  return { url: url.replace(/\/$/, ""), publishableKey, secretKey };
}

async function verifyAccessToken(token: string): Promise<AdminUser | null> {
  const { url, publishableKey } = env();
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) return null;
  return (await response.json()) as AdminUser;
}

async function findMembership(userId: string) {
  const { url, secretKey } = env();
  const query = new URLSearchParams({
    user_id: `eq.${userId}`,
    is_active: "eq.true",
    select: "user_id,display_name",
    limit: "1",
  });
  const response = await fetch(`${url}/rest/v1/admin_users?${query}`, {
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Could not verify admin membership.");
  const rows = (await response.json()) as Array<{ user_id: string; display_name: string }>;
  return rows[0] ?? null;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return null;

  const user = await verifyAccessToken(token);
  if (!user) return null;
  const membership = await findMembership(user.id);
  if (!membership) return null;

  return {
    userId: user.id,
    email: user.email ?? "",
    displayName: membership.display_name || user.email || "Quản trị viên",
  };
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    return originUrl.host === requestUrl.host || Boolean(forwardedHost && originUrl.host === forwardedHost);
  } catch {
    return false;
  }
}

export async function signInWithPassword(email: string, password: string) {
  const { url, publishableKey } = env();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: publishableKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!response.ok) return null;
  const result = (await response.json()) as {
    access_token: string;
    expires_in: number;
    user: AdminUser;
  };
  const membership = await findMembership(result.user.id);
  if (!membership) return null;
  return result;
}

export async function adminRest(path: string, init: RequestInit = {}) {
  const { url, secretKey } = env();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  return response.status === 204 ? null : response.json();
}

