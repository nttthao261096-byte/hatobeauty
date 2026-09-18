import { createPageMetadata } from "../../seo-metadata";
import { TrustPage } from "../../seo-pages";
export const metadata = createPageMetadata({
  title: "Book Hato Beauty",
  description:
    "Share your contact details, preferred service and time; the Hato Beauty team will call to consult and confirm your appointment.",
  path: "/en/book/",
  viPath: "/dat-lich/",
  enPath: "/en/book/",
  lang: "en",
});
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <TrustPage
      lang="en"
      kind="book"
      initialService={typeof params.service === "string" ? params.service : ""}
      initialOption={typeof params.option === "string" ? params.option : ""}
    />
  );
}
