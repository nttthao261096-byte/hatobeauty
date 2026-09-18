import Link from "next/link";

import { ProductCatalog } from "./ProductCatalog";
import type { CareLang } from "./care-catalog";
import { IconArrow } from "./icons";
import { SeoFooter, SeoHeader } from "./seo-pages";

export function ProductsPage({ lang }: { lang: CareLang }) {
  return (
    <div className="seo-page products-index-page" lang={lang}>
      <SeoHeader lang={lang} />
      <main id="main-content" tabIndex={-1} className="products-page">
        <nav
          className="plan-crumbs"
          aria-label={lang === "vi" ? "Đường dẫn" : "Breadcrumb"}
        >
          <Link href={lang === "vi" ? "/" : "/en"}>
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <span>/</span>
          <span>{lang === "vi" ? "Sản phẩm" : "Products"}</span>
        </nav>
        <header className="products-intro">
          <p className="eyebrow">
            {lang === "vi" ? "Chăm sóc da tại nhà" : "Skin care at home"}
          </p>
          <h1>
            {lang === "vi"
              ? "Chọn chăm sóc tại nhà phù hợp với làn da."
              : "Find home skincare that suits your skin."}
          </h1>
          <p>
            {lang === "vi"
              ? "Trao đổi với Hato Beauty về sản phẩm bạn đang dùng và nhu cầu hiện tại. Chúng tôi sẽ cùng bạn xây dựng chu trình đơn giản, đồng thời xác nhận sản phẩm sẵn có và chi phí trước khi mua."
              : "Tell us about your current routine and what your skin needs. We can help you keep your routine simple and confirm product availability and pricing before you buy."}
          </p>
        </header>
        <ProductCatalog lang={lang} />
        <p className="plan-products-more">
          <Link
            className="button primary"
            href={lang === "vi" ? "/lo-trinh" : "/en/care-plan"}
          >
            {lang === "vi" ? "Xem lộ trình da" : "See the skin plan"}
            <IconArrow />
          </Link>
        </p>
      </main>
      <SeoFooter lang={lang} />
    </div>
  );
}
