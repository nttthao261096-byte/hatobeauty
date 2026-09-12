export const BOOKING_PHONE_PATTERN = "(?=(?:[^0-9]*[0-9]){8,15}[^0-9]*$)[+0-9 .\\-]{8,30}";

const PHONE_ALLOWED_CHARACTERS = /^[+0-9 .-]+$/;
const DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;
const BOOKING_TIME_ZONE = "Asia/Ho_Chi_Minh";

export function isValidBookingPhone(phone: string) {
  const digitCount = phone.replace(/\D/g, "").length;
  return (
    phone.length >= 8 &&
    phone.length <= 30 &&
    digitCount >= 8 &&
    digitCount <= 15 &&
    PHONE_ALLOWED_CHARACTERS.test(phone)
  );
}

export function getMinimumBookingDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function isValidBookingDate(date: string, minimumDate = getMinimumBookingDate()) {
  const match = DATE_FORMAT.exec(date);
  if (!match || date < minimumDate) return false;

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  );
}
