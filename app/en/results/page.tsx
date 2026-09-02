import { loadHomeContent } from "../../content";
import { createPageMetadata } from "../../seo-metadata";
import { ResultsIndex } from "../../seo-pages";

export const metadata = createPageMetadata({
  title: "Client results",
  description: "Before-and-after care results at Hato Beauty in Da Nang, shared with guest consent.",
  path: "/en/results/",
  viPath: "/ket-qua/",
  enPath: "/en/results/",
  lang: "en",
});

export default async function Page() {
  const content = await loadHomeContent();
  return <ResultsIndex lang="en" results={content.results} />;
}
