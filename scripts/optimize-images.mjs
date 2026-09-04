import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Prebuild responsive assets so both Next.js and the Workers preview can serve
// them directly, without a cold image-transform request or a second origin.
const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "public/media");
await mkdir(output, { recursive: true });
const manifest = {};
const widths = [96, 192, 320, 480, 640, 960, 1280, 1920];
let originalBytes = 0;
let generated = 0;

for (const folder of ["images", "brand"]) {
  const entries = (await readdir(path.join(root, "public", folder))).sort();
  for (const name of entries) {
    if (!/\.(png|jpe?g|webp)$/i.test(name)) continue;
    const input = await readFile(path.join(root, "public", folder, name));
    const metadata = await sharp(input).metadata();
    if (!metadata.width || (metadata.pages ?? 1) > 1) continue;
    originalBytes += input.length;
    // Include transform settings in the fingerprint when changing the recipe.
    const avif = name === "service-hair-v2.webp";
    const hash = createHash("sha256").update(input).update(avif ? "webp-q78-avif-q50-v2" : "webp-q78-v1").digest("hex").slice(0, 12);
    const prefix = `${path.parse(name).name}-${hash}`;
    const sizes = [...new Set([...widths.filter((width) => width < metadata.width), Math.min(metadata.width, 1920)])];
    for (const width of sizes) {
      const target = path.join(output, `${prefix}-${width}.webp`);
      try { await access(target); } catch {
        await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(target);
        generated++;
      }
    }
    if (avif) for (const width of sizes) {
      const target = path.join(output, `${prefix}-${width}.avif`);
      try { await access(target); } catch {
        await sharp(input).rotate().resize({ width, withoutEnlargement: true }).avif({ quality: 50, effort: 5 }).toFile(target);
        generated++;
      }
    }
    manifest[`/${folder}/${name}`] = { prefix, widths: sizes, ...(avif ? { avif: true } : {}) };
  }
}
await writeFile(path.join(root, "app/image-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Responsive images: ${Object.keys(manifest).length} sources (${(originalBytes / 1024 / 1024).toFixed(1)} MB), ${generated} new variants.`);
