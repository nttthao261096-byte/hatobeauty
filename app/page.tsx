import type { Metadata } from "next";
import { HatoHome } from "./HatoHome";

export const metadata: Metadata = {
  title: { absolute: "hato Beauty | Beauty, made personal" },
  description:
    "Personal facial care, herbal scalp therapy, lashes and brows in a calm, refined space at hato Beauty.",
};

export default function Home() {
  return <HatoHome />;
}
