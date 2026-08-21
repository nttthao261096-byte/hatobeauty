import type { Metadata } from "next";
import { KnowledgeIndex } from "../seo-pages";

export const metadata: Metadata = {
  title: "Kiến thức chăm sóc",
  description: "Bài viết hướng dẫn chuẩn bị, chăm sóc sau buổi hẹn và kỳ vọng thực tế cho từng dịch vụ tại hato Beauty.",
  alternates: { canonical: "/kien-thuc/", languages: { "vi-VN": "/kien-thuc/", en: "/en/journal/" } },
};

export default function Page() { return <KnowledgeIndex lang="vi" />; }
