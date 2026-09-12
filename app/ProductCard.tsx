import Image from "./OptimizedImage";
import Link from "next/link";

import { careProducts, formatVnd, type CareLang } from "./care-catalog";
import { IconArrow } from "./icons";

const zalo = "https://zalo.me/0703214868";
const wa = "https://wa.me/84703214868";

export function ProductCard({
  product,
  lang,
  compact = false,
}: {
  product: (typeof careProducts)[number];
  lang: CareLang;
  compact?: boolean;
}) {
  const copy = product[lang];
  const consult = lang === "vi" ? zalo : wa;
  return (
    <article className={`product-card${compact ? " is-compact" : ""}`} id={`product-${product.id}`}>
      <div className="product-photo">
        <Image src={product.image} alt={copy.name} fill sizes="(max-width: 720px) 50vw, 25vw" />
      </div>
      <div className="product-card-copy">
        <p className="product-price">{formatVnd(product.price)}</p>
        <h3>{copy.name}</h3>
        <p className="product-use">{copy.use}</p>
        <p className="product-meta"><span>{copy.concern}</span><span>{product.size}</span><span>{product.when[lang]}</span></p>
        <div className="product-card-actions">
          <Link href={lang === "vi" ? `/lo-trinh/#journeys` : `/en/care-plan/#journeys`}>{lang === "vi" ? "Thêm vào lộ trình" : "Add to plan"}</Link>
          <a href={consult} target="_blank" rel="noopener noreferrer">{lang === "vi" ? "Hỏi chuyên viên" : "Ask the team"}<IconArrow /></a>
        </div>
      </div>
    </article>
  );
}
