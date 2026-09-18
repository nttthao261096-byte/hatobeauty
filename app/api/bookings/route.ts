import { NextResponse } from "next/server";

import { isValidBookingDate } from "../../booking-validation";
import { parseContactValue, contactValueError } from "../../contact-validation";
import {
  approvedServiceOptions,
  publicServiceCatalog,
} from "../../business-data";

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
  const service = cleanText(payload.service);
  const date = cleanText(payload.date);
  const option = cleanText(payload.option);
  if (
    !publicServiceCatalog.some((item) => item.id === service) ||
    (option &&
      !approvedServiceOptions(service).some((item) => item.id === option))
  ) {
    return NextResponse.json({ code: "unknown_service" }, { status: 400 });
  }
  const locale = payload.locale === "en" ? "en" : "vi";

  if (
    name.length < 2 ||
    name.length > 120 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service)
  ) {
    return NextResponse.json(
      { error: "Invalid booking details.", code: "invalid_details" },
      { status: 400 },
    );
  }

  if (!isValidBookingDate(date)) {
    return NextResponse.json(
      { error: "Invalid booking date.", code: "invalid_date" },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    console.error("Supabase runtime environment is not configured.");
    return NextResponse.json(
      { error: "Booking service is unavailable.", code: "unavailable" },
      { status: 503 },
    );
  }

  try {
    const serviceResponse = await fetch(
      `${supabaseUrl}/rest/v1/services?slug=eq.${encodeURIComponent(service)}&is_published=eq.true&select=slug&limit=1`,
      {
        signal: AbortSignal.timeout(15000),
        headers: {
          apikey: secretKey,
        },
      },
    );

    if (!serviceResponse.ok) {
      console.error(
        "Supabase service validation failed.",
        serviceResponse.status,
      );
      return NextResponse.json(
        {
          error: "Could not validate service.",
          code: "service_validation_failed",
        },
        { status: 502 },
      );
    }

    const matchingServices = (await serviceResponse.json()) as Array<{
      slug?: string;
    }>;
    if (
      matchingServices.length !== 1 ||
      matchingServices[0]?.slug !== service
    ) {
      return NextResponse.json(
        { error: "Unknown service.", code: "unknown_service" },
        { status: 400 },
      );
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/booking_requests`, {
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
        service_slug: service,
        service_option_id: option || null,
        preferred_date: date,
        locale,
        source: "hato-website",
      }),
    });

    if (!response.ok) {
      console.error("Supabase insert failed.", response.status);
      return NextResponse.json(
        { error: "Could not save booking.", code: "save_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    console.error("Supabase request could not be completed.");
    return NextResponse.json(
      { error: "Could not reach booking service.", code: "unreachable" },
      { status: 502 },
    );
  }
}
