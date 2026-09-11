import { CarePlanPage } from "../../CarePlanPage";
import { createPageMetadata } from "../../seo-metadata";

export const metadata = createPageMetadata({
  title: "Your journey with Hato Beauty Da Nang",
  description: "Explore Hato Beauty's five-stage journey: listening, guidance, an agreed plan, your experience, aftercare and follow-up.",
  path: "/en/care-plan/",
  viPath: "/lo-trinh/",
  enPath: "/en/care-plan/",
  lang: "en",
});

export default function Page() {
  return <CarePlanPage lang="en" />;
}