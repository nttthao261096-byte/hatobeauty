import { createPageMetadata } from "../../seo-metadata";
import { TrustPage } from "../../seo-pages";

export const metadata = createPageMetadata({ title: "Personal care plan at hato Beauty", description: "Explore hato Beauty's four-step approach to listening, assessment, planning and thoughtful follow-up in Da Nang.", path: "/en/care-plan/", viPath: "/lo-trinh/", enPath: "/en/care-plan/", lang: "en" });

export default function Page() { return <TrustPage lang="en" kind="carePlan" />; }
