import { mkdir, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = join(__dirname, 'temporary screenshots');
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

async function getNextIndex() {
  try {
    const files = await readdir(SCREENSHOT_DIR);
    const nums = files
      .map(f => f.match(/^screenshot-(\d+)/))
      .filter(Boolean)
      .map(m => parseInt(m[1], 10));
    return nums.length ? Math.max(...nums) + 1 : 1;
  } catch {
    return 1;
  }
}

async function run() {
  await mkdir(SCREENSHOT_DIR, { recursive: true });
  const idx = await getNextIndex();
  const filename = label ? `screenshot-${idx}-${label}.png` : `screenshot-${idx}.png`;
  const outPath = join(SCREENSHOT_DIR, filename);

  let puppeteer;
  const candidates = [
    'puppeteer',
    'C:/Users/nateh/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer',
    `C:/Users/${process.env.USERNAME}/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer`,
  ];

  for (const candidate of candidates) {
    try {
      puppeteer = (await import(candidate)).default;
      break;
    } catch {}
  }

  if (!puppeteer) {
    console.error('Puppeteer not found. Install with: npm install puppeteer');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({ path: outPath, fullPage: false });
  await browser.close();

  console.log(`Screenshot saved: ${outPath}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
