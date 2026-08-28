import { createPageMetadata } from "../../seo-metadata";
import { KnowledgeIndex } from "../../seo-pages";

export const metadata = createPageMetadata({ title: "Beauty care journal", description: "Practical preparation, aftercare and expectation guides for every hato Beauty service.", path: "/en/journal/", viPath: "/kien-thuc/", enPath: "/en/journal/", lang: "en" });

export default function Page() { return <KnowledgeIndex lang="en" />; }
