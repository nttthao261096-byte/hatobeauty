import type { Metadata } from "next";
import { HatoHome } from "./HatoHome";
import { loadHomeContent } from "./content";

export const metadata: Metadata = {
  title: { absolute: "HATO BEAUTY — Shine as you are" },
  description:
    "Skin, Head Spa, Body, Brow & Lash và Hair Removal trong không gian riêng tư tại hato Beauty.",
};

export default async function Home() {
  const content = await loadHomeContent();
  return <HatoHome content={content} />;
}
