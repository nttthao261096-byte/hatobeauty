import { createPageMetadata } from "../../seo-metadata";
import { ServiceIndex } from "../../seo-pages";

export const metadata = createPageMetadata({ title: "Beauty care services in Da Nang", description: "Explore Skin, Brow & Lash, Scalp Care & Relaxation, Hair Removal and Waxing services at hato Beauty in Da Nang.", path: "/en/services/", viPath: "/dich-vu/", enPath: "/en/services/", lang: "en" });

export default function Page() { return <ServiceIndex lang="en" />; }
