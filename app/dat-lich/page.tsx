import { createPageMetadata } from "../seo-metadata";
import { TrustPage } from "../seo-pages";
export const metadata = createPageMetadata({
  title: "Đặt lịch Hato Beauty",
  description:
    "Gửi thông tin liên hệ, chọn dịch vụ và thời gian mong muốn; đội ngũ Hato Beauty sẽ gọi lại để tư vấn và xác nhận lịch hẹn.",
  path: "/dat-lich/",
  viPath: "/dat-lich/",
  enPath: "/en/book/",
  lang: "vi",
});
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <TrustPage
      lang="vi"
      kind="book"
      initialService={typeof params.service === "string" ? params.service : ""}
      initialOption={typeof params.option === "string" ? params.option : ""}
    />
  );
}
