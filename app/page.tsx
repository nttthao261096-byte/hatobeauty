import type { Metadata } from "next";
import { HatoHome } from "./HatoHome";

export const metadata: Metadata = {
  title: "Hato Beauty | Vẻ đẹp tự nhiên, theo cách của bạn",
  description:
    "Không gian chăm sóc sắc đẹp tinh tế, ấm áp với các liệu trình được cá nhân hóa tại Hato Beauty.",
};

export default function Home() {
  return <HatoHome />;
}
