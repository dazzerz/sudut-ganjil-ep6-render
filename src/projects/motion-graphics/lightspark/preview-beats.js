const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function renderBeats() {
  const beatsDir = path.resolve(__dirname, 'beats');
  if (!fs.existsSync(beatsDir)) {
    fs.mkdirSync(beatsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1
  });

  const htmlPath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  console.log('Loading:', htmlPath);
  await page.goto(htmlPath, { waitUntil: 'load' });

  console.log('Rendering 40 beat frames (1 frame per beat, 120 BPM)...');
  const bpm = 120;
  const beatInterval = 60 / bpm; // 0.5s

  for (let b = 0; b < 40; b++) {
    // Seek to middle of beat (e.g. t = b * 0.5 + 0.15s) so animations have settled nicely
    const t = b * beatInterval + 0.20;
    await page.evaluate((seekTime) => {
      window.seek(seekTime);
    }, t);

    const frameFile = path.join(beatsDir, `beat_${String(b + 1).padStart(2, '0')}.jpg`);
    await page.screenshot({ path: frameFile, type: 'jpeg', quality: 90 });
  }

  console.log('All 40 beat frames rendered to:', beatsDir);
  await browser.close();
}

renderBeats().catch(err => {
  console.error('Failed to render beats:', err);
  process.exit(1);
});
