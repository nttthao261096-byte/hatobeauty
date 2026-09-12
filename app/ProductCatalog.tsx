"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "./ProductCard";
import { SAMPLE_PRICE_NOTE, careProducts, productFilters, type CareLang, type ProductFilter } from "./care-catalog";

export function ProductCatalog({ lang }: { lang: CareLang }) {
  const [filter, setFilter] = useState<ProductFilter>("all");
  const items = useMemo(
    () => (filter === "all" ? [...careProducts] : careProducts.filter((item) => (item.filters as readonly string[]).includes(filter))),
    [filter],
  );

  return (
    <>
      <div className="product-filters" role="group" aria-label={lang === "vi" ? "Lọc theo tình trạng da" : "Filter by skin need"}>
        {productFilters[lang].map((item) => (
          <button type="button" key={item.id} className={filter === item.id ? "active" : ""} onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="product-empty">{lang === "vi" ? "Chưa có món trong nhóm này. Thử bộ lọc khác hoặc hỏi chuyên viên." : "Nothing in this group yet. Try another filter or ask the team."}</p>
      ) : (
        <div className="product-grid">
          {items.map((product) => <ProductCard product={product} lang={lang} key={product.id} />)}
        </div>
      )}
      <p className="plan-sample-note">{SAMPLE_PRICE_NOTE[lang]}</p>
    </>
  );
}
