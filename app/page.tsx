import type { Metadata } from "next";
import { HatoHome } from "./HatoHome";

export const metadata: Metadata = {
  title: { absolute: "hato Beauty | Beauty, made personal" },
  description:
    "Chăm sóc da, dưỡng sinh, định hình chân mày, uốn mi, triệt lông và waxing trong không gian riêng tư tại hato Beauty.",
};

export default function Home() {
  return <HatoHome />;
}
