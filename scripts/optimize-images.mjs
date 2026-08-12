import { readdir } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const imagesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

try {
  const files = await readdir(imagesDir);
  const jpgs = files.filter(f => /\.(jpe?g)$/i.test(f));

  for (const file of jpgs) {
    const input = join(imagesDir, file);
    const output = join(imagesDir, file.replace(/\.(jpe?g)$/i, '.webp'));
    await sharp(input)
      .rotate()
      .webp({ quality: 80 })
      .toFile(output);
    const meta = await sharp(output).metadata();
    console.log(`${file} -> ${file.replace(/\.(jpe?g)$/i, '.webp')} (${meta.width}x${meta.height}, ${Math.round((meta.size / 1024) * 10) / 10} KB)`);
  }

  console.log(`Concluído: ${jpgs.length} imagem(ns) convertida(s) para WebP.`);
} catch (err) {
  console.error('Erro ao converter imagens:', err);
  process.exit(1);
}