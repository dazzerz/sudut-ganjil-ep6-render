const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const path = require('path');

async function test() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1
  });

  const htmlPath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'load' });

  console.log('Testing 30 subframes capture speed...');
  const t0 = Date.now();
  for (let i = 0; i < 30; i++) {
    const t = i / 180;
    await page.evaluate((seekTime) => window.seek(seekTime), t);
    await page.screenshot({ type: 'jpeg', quality: 90 });
  }
  const dt = Date.now() - t0;
  console.log(`30 frames took: ${dt}ms (${(dt / 30).toFixed(1)}ms/frame, ${(1000 / (dt / 30)).toFixed(1)} fps)`);
  await browser.close();
}

test();
