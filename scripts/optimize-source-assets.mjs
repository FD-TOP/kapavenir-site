import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve('src/assets');
const MAX_WIDTH = 1600;
const HERO_FILES = new Set(['meeting6.jpg']);

const exts = new Set(['.jpg', '.jpeg', '.png']);

async function optimizeFile(filePath) {
  const name = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const maxWidth = HERO_FILES.has(name) ? 1920 : MAX_WIDTH;

  const input = sharp(filePath);
  const meta = await input.metadata();
  let pipeline = input.rotate();

  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }

  const tmp = `${filePath}.opt`;
  if (ext === '.png') {
    await pipeline.png({ quality: 78, compressionLevel: 9, palette: true }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: 72, mozjpeg: true, progressive: true }).toFile(tmp);
  }

  const before = fs.statSync(filePath).size;
  const after = fs.statSync(tmp).size;
  fs.renameSync(tmp, filePath);
  return { name, before, after };
}

const files = fs
  .readdirSync(ASSETS_DIR)
  .filter((f) => exts.has(path.extname(f).toLowerCase()))
  .map((f) => path.join(ASSETS_DIR, f));

let saved = 0;
for (const file of files) {
  const result = await optimizeFile(file);
  saved += result.before - result.after;
  const pct = Math.round((1 - result.after / result.before) * 100);
  console.log(
    `${result.name}: ${(result.before / 1024 / 1024).toFixed(2)} MB → ${(result.after / 1024 / 1024).toFixed(2)} MB (-${pct}%)`
  );
}

console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);
