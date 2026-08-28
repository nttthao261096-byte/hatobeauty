import { loadHomeContent } from "../content";
import { createPageMetadata } from "../seo-metadata";
import { ResultsIndex } from "../seo-pages";

export const metadata = createPageMetadata({
  title: "Kết quả khách hàng",
  description: "Hình ảnh trước và sau các liệu trình chăm sóc da, mi mày và cơ thể tại hato Beauty Đà Nẵng.",
  path: "/ket-qua/",
  viPath: "/ket-qua/",
  enPath: "/en/results/",
  lang: "vi",
});

export default async function Page() {
  const content = await loadHomeContent();
  return <ResultsIndex lang="vi" results={content.results} />;
}
