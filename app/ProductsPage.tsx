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
          <h1>{lang === "vi" ? "Những sản phẩm chăm sóc da bạn nên có tại nhà." : "At-home skincare essentials worth keeping close."}</h1>
          <p>
            {lang === "vi"
              ? "Từ làm sạch, cấp ẩm, phục hồi đến chống nắng, đây là những gợi ý giúp bạn xây dựng chu trình gọn nhẹ và dễ duy trì. Hãy soi da trước để chọn đúng món, đúng thời điểm và tránh dùng quá nhiều hoạt chất cùng lúc."
              : "From cleansing and hydration to barrier support and sunscreen, these suggestions help you build a simple routine you can maintain. Start with a skin check to choose the right item and timing without stacking too many actives."}
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
