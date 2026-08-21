import type { Metadata } from "next";
import { KnowledgeIndex } from "../../seo-pages";

export const metadata: Metadata = {
  title: "Beauty care journal",
  description: "Practical preparation, aftercare and expectation guides for every hato Beauty service.",
  alternates: { canonical: "/en/journal/", languages: { "vi-VN": "/kien-thuc/", en: "/en/journal/" } },
};

export default function Page() { return <KnowledgeIndex lang="en" />; }
