import { NextResponse } from "next/server";

import { isValidBookingDate, isValidBookingPhone } from "../../booking-validation";

interface BookingPayload {
  name?: unknown;
  phone?: unknown;
  service?: unknown;
  date?: unknown;
  locale?: unknown;
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body.", code: "invalid_json" }, { status: 400 });
  }

  const name = cleanText(payload.name);
  const phone = cleanText(payload.phone);
  const service = cleanText(payload.service);
  const date = cleanText(payload.date);
  const locale = payload.locale === "en" ? "en" : "vi";

  if (
    name.length < 2 ||
    name.length > 120 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service)
  ) {
    return NextResponse.json({ error: "Invalid booking details.", code: "invalid_details" }, { status: 400 });
  }

  if (!isValidBookingPhone(phone)) {
    return NextResponse.json({ error: "Invalid phone number.", code: "invalid_phone" }, { status: 400 });
  }

  if (!isValidBookingDate(date)) {
    return NextResponse.json({ error: "Invalid booking date.", code: "invalid_date" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    console.error("Supabase runtime environment is not configured.");
    return NextResponse.json({ error: "Booking service is unavailable.", code: "unavailable" }, { status: 503 });
  }

  try {
    const serviceResponse = await fetch(
      `${supabaseUrl}/rest/v1/services?slug=eq.${encodeURIComponent(service)}&is_published=eq.true&select=slug&limit=1`,
      {
        headers: {
          apikey: secretKey,
        },
      },
    );

    if (!serviceResponse.ok) {
      console.error("Supabase service validation failed.", serviceResponse.status);
      return NextResponse.json({ error: "Could not validate service.", code: "service_validation_failed" }, { status: 502 });
    }

    const matchingServices = (await serviceResponse.json()) as Array<{ slug?: string }>;
    if (matchingServices.length !== 1 || matchingServices[0]?.slug !== service) {
      return NextResponse.json({ error: "Unknown service.", code: "unknown_service" }, { status: 400 });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/booking_requests`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        full_name: name,
        phone,
        service_slug: service,
        preferred_date: date,
        locale,
        source: "hato-website",
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Supabase booking insert failed.", response.status, details);
      return NextResponse.json({ error: "Could not save booking.", code: "save_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Supabase booking request failed.", error);
    return NextResponse.json({ error: "Could not reach booking service.", code: "unreachable" }, { status: 502 });
  }
}
