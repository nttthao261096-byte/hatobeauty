import Link from "next/link";

import { ProductCatalog } from "./ProductCatalog";
import type { CareLang } from "./care-catalog";
import { IconArrow } from "./icons";
import { SeoFooter, SeoHeader } from "./seo-pages";

export function ProductsPage({ lang }: { lang: CareLang }) {
  return (
    <div className="seo-page products-index-page" lang={lang}>
      <SeoHeader lang={lang} />
      <main className="products-page">
        <nav className="plan-crumbs" aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}>
          <Link href={lang === "vi" ? "/" : "/en/"}>{lang === "vi" ? "Trang chủ" : "Home"}</Link>
          <span>/</span>
          <span>{lang === "vi" ? "Sản phẩm" : "Products"}</span>
        </nav>
        <header className="products-intro">
          <p className="eyebrow">{lang === "vi" ? "Chăm sóc da tại nhà" : "Skin care at home"}</p>
          <h1>{lang === "vi" ? "Tám món mang về nhà, đúng phiếu lộ trình." : "Eight take-home items, as the plan note says."}</h1>
          <p>
            {lang === "vi"
              ? "Tám món cho da khô, dầu, nhạy cảm, mụn nhẹ và ngày nắng Đà Nẵng. Dùng theo phiếu lộ trình: sáng, tối, hoặc sau spa."
              : "Eight items for dry, oily, sensitive, mildly blemished skin and Da Nang sun. Use them as the plan note says: morning, night, or after spa."}
          </p>
        </header>
        <ProductCatalog lang={lang} />
        <p className="plan-products-more">
          <Link className="button primary" href={lang === "vi" ? "/lo-trinh/" : "/en/care-plan/"}>{lang === "vi" ? "Xem lộ trình da" : "See the skin plan"}<IconArrow /></Link>
        </p>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}
