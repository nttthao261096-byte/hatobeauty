import type { SeoLang } from "./seo-data";

interface BookingErrorPayload {
  code?: string;
}

export async function getBookingErrorMessage(
  response: Response,
  lang: SeoLang,
  context: "booking" | "contact" = "booking",
) {
  const payload = (await response
    .json()
    .catch(() => ({}))) as BookingErrorPayload;

  if (
    [
      "invalid_email",
      "invalid_whatsapp",
      "invalid_social",
      "invalid_channel",
    ].includes(payload.code ?? "")
  ) {
    return lang === "vi"
      ? "Vui lòng kiểm tra email, số WhatsApp có mã quốc gia hoặc tài khoản mạng xã hội của kênh đã chọn."
      : "Check the email, WhatsApp number with country code, or social profile for your selected contact method.";
  }
  if (context === "contact" && response.status === 400) {
    return lang === "vi"
      ? "Vui lòng kiểm tra họ tên, kênh liên hệ, ghi chú và đồng ý liên hệ lại."
      : "Please check your name, preferred contact details, notes and contact consent.";
  }

  if (payload.code === "unknown_service") {
    return lang === "vi"
      ? "Dịch vụ bạn chọn hiện không còn khả dụng. Vui lòng chọn lại."
      : "The selected service is no longer available. Please choose another service.";
  }

  if (payload.code === "invalid_phone") {
    return lang === "vi"
      ? "Vui lòng nhập số điện thoại hợp lệ gồm 8–15 chữ số."
      : "Please enter a valid phone number containing 8–15 digits.";
  }

  if (payload.code === "invalid_date") {
    return lang === "vi"
      ? "Vui lòng chọn hôm nay hoặc một ngày trong tương lai."
      : "Please choose today or a future date.";
  }

  if (response.status === 400) {
    return lang === "vi"
      ? "Vui lòng kiểm tra họ tên (ít nhất 2 ký tự), số điện thoại, dịch vụ và ngày mong muốn."
      : "Please check your name (at least 2 characters), phone number, service and preferred date.";
  }

  if (response.status === 503) {
    return lang === "vi"
      ? "Hệ thống đặt lịch đang tạm gián đoạn. Vui lòng thử lại sau ít phút."
      : "Booking is temporarily unavailable. Please try again in a few minutes.";
  }

  return lang === "vi"
    ? "Chưa thể gửi yêu cầu. Vui lòng thử lại sau ít phút."
    : "We could not send your request. Please try again shortly.";
}
