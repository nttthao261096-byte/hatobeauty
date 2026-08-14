import type { Metadata } from "next";
import { HatoHome } from "./HatoHome";
import { loadHomeContent } from "./content";

export const metadata: Metadata = {
  title: { absolute: "hato Beauty | Beauty, made personal" },
  description:
    "Chăm sóc da, dưỡng sinh, định hình chân mày, uốn mi, triệt lông và waxing trong không gian riêng tư tại hato Beauty.",
};

export default async function Home() {
  try {
    const content = await loadHomeContent();
    return <HatoHome content={content} />;
  } catch (error) {
    console.error("Could not load Hato Beauty content from Supabase.", error);
    throw error;
  }
}
