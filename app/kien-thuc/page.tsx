import { createPageMetadata } from "../seo-metadata";
import { KnowledgeIndex } from "../seo-pages";

export const metadata = createPageMetadata({ title: "Kiến thức chăm sóc", description: "Bài viết hướng dẫn chuẩn bị, chăm sóc sau buổi hẹn và kỳ vọng thực tế cho từng dịch vụ tại hato Beauty.", path: "/kien-thuc/", viPath: "/kien-thuc/", enPath: "/en/journal/", lang: "vi" });

export default function Page() { return <KnowledgeIndex lang="vi" />; }
