import { CarePlanPage } from "../../CarePlanPage";
import { createPageMetadata } from "../../seo-metadata";

export const metadata = createPageMetadata({
  title: "Skin care plan at hato Beauty Da Nang",
  description: "A skin check, spa treatment, take-home set and a 4–6 week review. See guide prices and home care products at hato Beauty, Ngu Hanh Son.",
  path: "/en/care-plan/",
  viPath: "/lo-trinh/",
  enPath: "/en/care-plan/",
  lang: "en",
});

export default function Page() {
  return <CarePlanPage lang="en" />;
}
