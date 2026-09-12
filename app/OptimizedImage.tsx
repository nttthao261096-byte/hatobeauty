"use client";

import Image, { type ImageProps } from "next/image";
import { preload } from "react-dom";
import { imageVariant, imageCandidates } from "./image-variants";

export default function OptimizedImage(props: ImageProps) {
  const { src, alt, priority, preload: preloadImage, sizes, width, loading, fetchPriority, ...rest } = props;
  const srcSet = typeof src === "string" ? imageCandidates(src) : undefined;
  if (!srcSet || typeof src !== "string") return <Image {...props} alt={alt} />;
  const avifSet = imageCandidates(src, "avif");
  const responsiveSizes = sizes ?? (width ? `${width}px` : "100vw");
  const fallback = imageVariant({ src, width: Number(width) || 1280 });
  const eager = priority || preloadImage;
  if (eager) preload(avifSet ? fallback.replace(/\.webp$/, ".avif") : fallback, { as: "image", type: avifSet ? "image/avif" : "image/webp", imageSrcSet: avifSet ?? srcSet, imageSizes: responsiveSizes, fetchPriority });
  // A picture source also works in the Workers Image shim, which calls custom
  // loaders once without generating a responsive srcset for fill images.
  return <picture>
    {avifSet && <source srcSet={avifSet} sizes={responsiveSizes} type="image/avif" />}
    <source srcSet={srcSet} sizes={responsiveSizes} type="image/webp" />
    <Image {...rest} src={fallback} alt={alt} width={width} sizes={responsiveSizes} unoptimized loading={eager ? "eager" : loading} fetchPriority={fetchPriority} />
  </picture>;
}
