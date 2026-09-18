"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "./ProductCard";
import {
  SAMPLE_PRICE_NOTE,
  careProducts,
  productFilters,
  type CareLang,
  type ProductFilter,
} from "./care-catalog";

export function ProductCatalog({ lang }: { lang: CareLang }) {
  const [filter, setFilter] = useState<ProductFilter>("all");
  const items = useMemo(
    () =>
      filter === "all"
        ? [...careProducts]
        : careProducts.filter((item) =>
            (item.filters as readonly string[]).includes(filter),
          ),
    [filter],
  );

  return (
    <>
      {careProducts.length > 0 && (
        <div
          className="product-filters"
          role="group"
          aria-label={
            lang === "vi" ? "Lọc theo tình trạng da" : "Filter by skin need"
          }
        >
          {productFilters[lang].map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={filter === item.id}
              className={filter === item.id ? "active" : ""}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      {items.length === 0 ? (
        <p className="product-empty">
          {lang === "vi"
            ? "Danh mục đang được cập nhật. Vui lòng liên hệ để được tư vấn về sản phẩm hiện có."
            : "Our product catalogue is being updated. Please contact us for advice on currently available products."}
        </p>
      ) : (
        <div className="product-grid">
          {items.map((product) => (
            <ProductCard product={product} lang={lang} key={product.id} />
          ))}
        </div>
      )}
      <p className="plan-sample-note">{SAMPLE_PRICE_NOTE[lang]}</p>
    </>
  );
}
