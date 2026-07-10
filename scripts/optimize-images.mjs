/**
 * Convierte los JPEG de src/assets a WebP en el tamaño real en que se muestran.
 * Uso puntual: `npm i -D sharp && node scripts/optimize-images.mjs`
 *
 * Tamaños elegidos = mayor tamaño CSS de render x2 (pantallas retina):
 *   daniel        -> 288px CSS (AboutDaniel lg:w-72)  => 600px
 *   project-*     -> ~480px CSS (carrusel lg)         => 960px de ancho
 *   testimonial-* -> 56px CSS (h-14 w-14)             => 160px
 */
import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("src/assets");

const rules = [
  { match: /^daniel\.jpg$/, width: 600, height: 600, quality: 82 },
  { match: /^project-.*\.jpg$/, width: 960, quality: 78 },
  { match: /^testimonial-.*\.jpg$/, width: 160, height: 160, quality: 82 },
];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith(".jpg")) out.push(p);
  }
  return out;
}

const files = await walk(ROOT);
let before = 0;
let after = 0;

for (const file of files) {
  const name = path.basename(file);
  const rule = rules.find((r) => r.match.test(name));
  if (!rule) {
    console.log(`  (sin regla, se omite) ${name}`);
    continue;
  }

  const outPath = file.replace(/\.jpg$/, ".webp");
  const srcSize = (await stat(file)).size;

  await sharp(file)
    .resize(rule.width, rule.height, { fit: "cover", withoutEnlargement: true })
    .webp({ quality: rule.quality, effort: 6 })
    .toFile(outPath);

  const outSize = (await stat(outPath)).size;
  before += srcSize;
  after += outSize;

  const pct = Math.round((1 - outSize / srcSize) * 100);
  console.log(
    `${name.padEnd(30)} ${(srcSize / 1024).toFixed(0).padStart(5)} KB -> ${(outSize / 1024).toFixed(0).padStart(4)} KB  (-${pct}%)`,
  );

  await unlink(file);
}

console.log("\n" + "-".repeat(60));
console.log(
  `TOTAL: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB  (-${Math.round((1 - after / before) * 100)}%)`,
);
