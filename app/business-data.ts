import { seoServices, type SeoLang, type SeoService } from "./seo-data";

export type Approval = { evidence: string; approvedAt: string };
// Empty intentionally: repository seed data is not owner approval.
// Add a verifiable source reference and approval date before publishing.
const publicationApprovals: Readonly<Record<string, Approval>> = {};
export function isBusinessDataApproved(key: string): boolean {
  const approval = publicationApprovals[key];
  return Boolean(
    approval?.evidence.trim() &&
    /^\d{4}-\d{2}-\d{2}$/.test(approval.approvedAt),
  );
}

export type ServiceOption = {
  id: string;
  serviceId: SeoService["id"];
  name: Record<SeoLang, string>;
  priceVnd: number;
  durationMinutes: number;
  approval: Approval;
};
// H01–H03/M08: no approved price list, technology or treatment-option source supplied.
const serviceOptions: readonly ServiceOption[] = [];
export function approvedServiceOptions(serviceId?: string) {
  return serviceOptions.filter(
    (option) =>
      (!serviceId || option.serviceId === serviceId) &&
      option.approval.evidence.trim() &&
      /^\d{4}-\d{2}-\d{2}$/.test(option.approval.approvedAt) &&
      Number.isFinite(option.priceVnd) &&
      option.priceVnd >= 0 &&
      option.durationMinutes > 0,
  );
}
export const publicServiceCatalog = seoServices.map((service) => ({
  ...service,
  options: approvedServiceOptions(service.id),
}));
export const commercialNotice = {
  vi: "Vui lòng liên hệ để xác nhận lựa chọn, thời lượng và chi phí trước khi đặt lịch.",
  en: "Please contact us to confirm available options, duration and pricing before booking.",
};

export function serviceFacts(
  serviceId: string,
  lang: SeoLang,
): [string, string] {
  const options = approvedServiceOptions(serviceId);
  if (!options.length)
    return lang === "vi"
      ? ["Liên hệ xác nhận", "Xác nhận khi tư vấn"]
      : ["Contact for pricing", "Confirmed during consultation"];
  const money = new Intl.NumberFormat(lang === "vi" ? "vi-VN" : "en", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
  const prices = options.map((option) => option.priceVnd);
  const durations = options.map((option) => option.durationMinutes);
  return [
    `${money.format(Math.min(...prices))} – ${money.format(Math.max(...prices))}`,
    `${Math.min(...durations)}–${Math.max(...durations)} ${lang === "vi" ? "phút" : "min"}`,
  ];
}
