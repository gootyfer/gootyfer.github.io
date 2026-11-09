import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f3eddf"/>
  <rect x="72" y="72" width="1056" height="486" fill="none" stroke="#202321" stroke-opacity="0.19"/>
  <rect x="72" y="72" width="12" height="486" fill="#315c52"/>
  <text x="116" y="156" fill="#315c52" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3">LEARNING · PRODUCT · ENGINEERING</text>
  <text x="116" y="290" fill="#202321" font-family="Georgia, serif" font-size="76">Israel Gutiérrez</text>
  <rect x="110" y="350" width="572" height="30" fill="#e5c64f" fill-opacity="0.58"/>
  <text x="116" y="388" fill="#202321" font-family="Georgia, serif" font-size="52">Learning by making.</text>
  <text x="116" y="458" fill="#202321" font-family="Georgia, serif" font-size="52">Leading by learning.</text>
  <text x="116" y="522" fill="#9c4937" font-family="Arial, sans-serif" font-size="22" font-weight="700">israelgutierrez.es</text>
</svg>`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
  .toFile(
    fileURLToPath(new URL('../src/assets/social-card.jpg', import.meta.url)),
  );
