import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../public/icons');

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcon(size) {
  const radius = Math.round(size * 0.18);
  const fontSize = Math.round(size * 0.55);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141410"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <linearGradient id="letter" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F8EDCA"/>
      <stop offset="100%" stop-color="#D4B878"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="url(#bg)"/>
  <text
    x="${size / 2}"
    y="${Math.round(size * 0.73)}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}"
    font-weight="bold"
    fill="url(#letter)"
    text-anchor="middle"
  >S</text>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(join(OUT, `icon-${size}.png`));
  console.log(`✓ icon-${size}.png`);
}

async function generateScreenshot() {
  const w = 390, h = 844;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#0a0a0a"/>
  <text x="${w/2}" y="${Math.round(h*0.45)}" font-family="Georgia,serif" font-size="96" font-weight="bold" fill="#F2DFA8" text-anchor="middle">S</text>
  <text x="${w/2}" y="${Math.round(h*0.58)}" font-family="Georgia,serif" font-size="28" fill="#F0EDE8" text-anchor="middle">Sequora Studies</text>
  <text x="${w/2}" y="${Math.round(h*0.64)}" font-family="Arial,sans-serif" font-size="16" fill="#888880" text-anchor="middle">Study Tracker</text>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(join(OUT, 'screenshot-mobile.png'));
  console.log('✓ screenshot-mobile.png');
}

async function main() {
  for (const size of SIZES) {
    await generateIcon(size);
  }
  await generateScreenshot();
  console.log('\nAll icons generated in public/icons/');
}

main().catch(err => { console.error(err); process.exit(1); });
