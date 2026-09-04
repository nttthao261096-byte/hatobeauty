import manifest from "./image-manifest.json";

const images: Record<string, { prefix: string; widths: number[]; avif?: boolean }> = manifest;

function imagePath(src: string) {
  // Only map our own bundled assets. Preserve CMS/external URLs and query strings.
  if (src.startsWith("https://hatobeauty.com/")) return src.slice("https://hatobeauty.com".length);
  return src;
}

export function hasImageVariants(src: string) {
  return Object.hasOwn(images, imagePath(src));
}

export function imageVariant({ src, width }: { src: string; width: number }) {
  const image = images[imagePath(src)];
  if (!image) return src;
  const selected = image.widths.find((size) => size >= width) ?? image.widths.at(-1)!;
  return `/media/${image.prefix}-${selected}.webp`;
}

export function imageCandidates(src: string, format: "webp" | "avif" = "webp") {
  const image = images[imagePath(src)];
  if (format === "avif" && !image?.avif) return undefined;
  return image?.widths.map((width) => `${imageVariant({ src, width }).replace(/\.webp$/, `.${format}`)} ${width}w`).join(", ");
}
