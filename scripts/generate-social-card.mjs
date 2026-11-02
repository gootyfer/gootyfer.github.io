import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f5f1e8"/>
  <rect x="72" y="72" width="1056" height="486" fill="none" stroke="#1d201f" stroke-opacity="0.2"/>
  <text x="104" y="172" fill="#8d3f2d" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="3">PRODUCT · ENGINEERING · AI</text>
  <text x="104" y="332" fill="#1d201f" font-family="Georgia, serif" font-size="86">Israel Gutiérrez</text>
  <text x="104" y="411" fill="#646662" font-family="Arial, sans-serif" font-size="34">Leading teams that build useful technology.</text>
  <text x="104" y="512" fill="#1d201f" font-family="Arial, sans-serif" font-size="24">israelgutierrez.es</text>
</svg>`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
  .toFile(
    fileURLToPath(new URL('../src/assets/social-card.jpg', import.meta.url)),
  );
