import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'src', 'assets', 'source');
const outputDir = path.join(root, 'src', 'assets', 'generated');

await fs.mkdir(outputDir, { recursive: true });

async function makeWebp(inputName, outputName, options = {}) {
  const inputPath = path.join(sourceDir, inputName);
  const outputPath = path.join(outputDir, outputName);
  let image = sharp(inputPath).rotate();

  if (options.extract) {
    image = image.extract(options.extract);
  }

  if (options.resize) {
    image = image.resize(options.resize);
  }

  await image
    .webp({
      quality: options.quality ?? 88,
      effort: 4,
      smartSubsample: true,
    })
    .toFile(outputPath);
}

await Promise.all([
  makeWebp('palette-logo.jpeg', 'logo-wide.webp', {
    extract: { left: 430, top: 180, width: 690, height: 190 },
    resize: { width: 420 },
    quality: 92,
  }),
  makeWebp('landing.jpeg', 'logo-header.webp', {
    extract: { left: 38, top: 26, width: 205, height: 58 },
    resize: { width: 230 },
    quality: 92,
  }),
  makeWebp('landing.jpeg', 'landing-hero.webp', {
    extract: { left: 610, top: 118, width: 890, height: 820 },
    resize: { width: 1050 },
    quality: 90,
  }),
  makeWebp('landing.jpeg', 'landing-backdrop.webp', {
    resize: { width: 1536 },
    quality: 86,
  }),
  makeWebp('login.jpeg', 'auth-portal-login.webp', {
    extract: { left: 42, top: 455, width: 620, height: 495 },
    resize: { width: 720 },
    quality: 90,
  }),
  makeWebp('signup.jpeg', 'auth-portal-signup.webp', {
    extract: { left: 48, top: 455, width: 610, height: 495 },
    resize: { width: 720 },
    quality: 90,
  }),
  makeWebp('about.jpeg', 'about-atmosphere.webp', {
    resize: { width: 1536 },
    quality: 86,
  }),
  makeWebp('tools.jpeg', 'tools-atmosphere.webp', {
    resize: { width: 1536 },
    quality: 86,
  }),
  makeWebp('dashboard.jpeg', 'dashboard-atmosphere.webp', {
    resize: { width: 1536 },
    quality: 82,
  }),
]);

console.log('NEXA assets prepared in src/assets/generated');
