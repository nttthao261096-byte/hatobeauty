import { NextResponse } from "next/server";

import {
  parseContactValue,
  contactValueError,
  channelLabels,
} from "../../contact-validation";

type LeadPayload = Record<string, unknown>;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body))
      throw new Error("Invalid payload");
    payload = body as LeadPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body.", code: "invalid_json" },
      { status: 400 },
    );
  }

  if (cleanText(payload.website)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = cleanText(payload.name);
  const contact = parseContactValue({
    ...payload,
    preference: payload.preference ?? "phone",
  });
  if (!contact)
    return NextResponse.json({ code: "invalid_channel" }, { status: 400 });
  const contactError = contactValueError(contact);
  if (contactError)
    return NextResponse.json({ code: contactError }, { status: 400 });
  const message = cleanText(payload.message);
  const locale = payload.locale === "en" ? "en" : "vi";

  if (name.length < 2 || name.length > 120 || payload.consent !== true) {
    return NextResponse.json(
      { error: "Invalid contact details.", code: "invalid_details" },
      { status: 400 },
    );
  }

  if (message.length > 2000 || message.length === 1) {
    return NextResponse.json(
      { error: "Invalid contact details.", code: "invalid_details" },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    console.error("Supabase runtime environment is not configured.");
    return NextResponse.json(
      { error: "Contact service is unavailable.", code: "unavailable" },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/contact_requests`, {
      method: "POST",
      signal: AbortSignal.timeout(15000),
      headers: {
        apikey: secretKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        full_name: name,
        phone: contact.phone || null,
        email: contact.email || null,
        social_contact: contact.social || null,
        contact_preference: contact.preference,
        subject: `${locale === "vi" ? "Yêu cầu liên hệ qua" : "Contact request via"} ${channelLabels[locale][contact.preference]}`,
        message:
          message ||
          (locale === "vi"
            ? "Khách hàng chưa để lại ghi chú."
            : "The guest did not leave a note."),
        status: "new",
        source: "hato-contact-page",
      }),
    });

    if (!response.ok) {
      console.error("Supabase insert failed.", response.status);
      return NextResponse.json(
        { error: "Could not save contact request.", code: "save_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    console.error("Supabase request could not be completed.");
    return NextResponse.json(
      { error: "Could not reach contact service.", code: "unreachable" },
      { status: 502 },
    );
  }
}
