import type { ReactNode } from "react";

export function BrandName(): ReactNode {
  return <span className="hato-brand-name"><span className="hato-word">hato</span><span className="beauty-word">Beauty</span></span>;
}

export function brandText(text: string): ReactNode {
  return text.split(/(hato beauty)/gi).map((part, index) =>
    /^hato beauty$/i.test(part) ? <BrandName key={`${part}-${index}`} /> : part,
  );
}
