import { NextResponse } from "next/server";

import { isValidBookingPhone } from "../../booking-validation";

interface ContactPayload {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  preference?: unknown;
  message?: unknown;
  website?: unknown;
  locale?: unknown;
}

const PREFERENCES = new Set(["phone", "email", "whatsapp", "instagram", "facebook"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body.", code: "invalid_json" }, { status: 400 });
  }

  if (cleanText(payload.website)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = cleanText(payload.name);
  const phone = cleanText(payload.phone);
  const email = cleanText(payload.email).toLowerCase();
  const preference = cleanText(payload.preference);
  const message = cleanText(payload.message);
  const locale = payload.locale === "en" ? "en" : "vi";

  if (name.length < 2 || name.length > 120 || !isValidBookingPhone(phone) || !PREFERENCES.has(preference)) {
    return NextResponse.json({ error: "Invalid contact details.", code: "invalid_details" }, { status: 400 });
  }

  if ((email && (!EMAIL_PATTERN.test(email) || email.length > 254)) || message.length > 2000) {
    return NextResponse.json({ error: "Invalid contact details.", code: "invalid_details" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    console.error("Supabase runtime environment is not configured.");
    return NextResponse.json({ error: "Contact service is unavailable.", code: "unavailable" }, { status: 503 });
  }

  const preferenceLabels = {
    vi: { phone: "Điện thoại", email: "Email", whatsapp: "WhatsApp", instagram: "Instagram", facebook: "Facebook" },
    en: { phone: "Phone", email: "Email", whatsapp: "WhatsApp", instagram: "Instagram", facebook: "Facebook" },
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/contact_requests`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        full_name: name,
        phone,
        email: email || null,
        subject: `${locale === "vi" ? "Yêu cầu liên hệ qua" : "Contact request via"} ${preferenceLabels[locale][preference as keyof typeof preferenceLabels.vi]}`,
        message: message || (locale === "vi" ? "Khách hàng chưa để lại ghi chú." : "The guest did not leave a note."),
        status: "new",
        source: "hato-contact-page",
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Supabase contact insert failed.", response.status, details);
      return NextResponse.json({ error: "Could not save contact request.", code: "save_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Supabase contact request failed.", error);
    return NextResponse.json({ error: "Could not reach contact service.", code: "unreachable" }, { status: 502 });
  }
}
