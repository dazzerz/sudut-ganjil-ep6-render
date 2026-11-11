const { chromium } = require('playwright-core');
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function renderFullVideo() {
  const startTime = Date.now();
  const projectDir = __dirname;
  const audioPath = path.join(projectDir, 'audio.wav');
  const framesDir = path.join(projectDir, 'raw_frames');
  const rendersDir = path.resolve(projectDir, '../../../../renders');
  const outputMp4 = path.join(rendersDir, 'Lightspark_Capabilities_20s.mp4');

  if (!fs.existsSync(rendersDir)) {
    fs.mkdirSync(rendersDir, { recursive: true });
  }

  // 1. Check or generate audio
  if (!fs.existsSync(audioPath)) {
    console.log('Generating audio.wav...');
    execSync('node generate-audio.js', { cwd: projectDir, stdio: 'inherit' });
  }

  // 2. Prepare raw_frames directory
  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(framesDir, { recursive: true });

  const duration = 20.0;
  const fps = 60;
  const subframeMultiplier = 3;
  const subframeFps = fps * subframeMultiplier; // 180 fps
  const totalSubframes = Math.round(duration * subframeFps); // 3600 frames

  console.log(`Starting parallel render:`);
  console.log(`- Duration: ${duration}s`);
  console.log(`- Output Target: ${fps} fps (blended from ${subframeFps} subframes via ffmpeg tmix)`);
  console.log(`- Total Subframes to capture: ${totalSubframes}`);

  // 3. Launch browser with worker pages
  const workerCount = 6;
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions'
    ]
  });

  const framesPerWorker = Math.ceil(totalSubframes / workerCount);
  const htmlUrl = 'file:///' + path.join(projectDir, 'index.html').replace(/\\/g, '/');

  let completedFrames = 0;
  let lastReportedPercent = 0;

  console.log(`Launching ${workerCount} parallel workers...`);

  const workerPromises = [];

  for (let w = 0; w < workerCount; w++) {
    const startFrame = w * framesPerWorker;
    const endFrame = Math.min(totalSubframes, (w + 1) * framesPerWorker);

    if (startFrame >= totalSubframes) break;

    const promise = (async () => {
      const page = await browser.newPage({
        viewport: { width: 1080, height: 1920 },
        deviceScaleFactor: 1
      });

      await page.goto(htmlUrl, { waitUntil: 'load' });

      for (let i = startFrame; i < endFrame; i++) {
        const t = i / subframeFps;
        await page.evaluate((seekTime) => window.seek(seekTime), t);

        const framePath = path.join(framesDir, `subframe_${String(i).padStart(5, '0')}.jpg`);
        await page.screenshot({
          path: framePath,
          type: 'jpeg',
          quality: 90
        });

        completedFrames++;
        const percent = Math.floor((completedFrames / totalSubframes) * 100);
        if (percent >= lastReportedPercent + 10) {
          lastReportedPercent = percent;
          const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
          console.log(`Render progress: ${percent}% (${completedFrames}/${totalSubframes} subframes) in ${elapsed}s`);
        }
      }

      await page.close();
    })();

    workerPromises.push(promise);
  }

  await Promise.all(workerPromises);
  await browser.close();

  const captureElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`All ${totalSubframes} subframes captured in ${captureElapsed}s.`);

  // 4. Run FFmpeg blending with tmix filter & muxing audio
  console.log('Blending 3 subframes per frame with ffmpeg tmix and muxing audio...');
  const ffmpegCommand = [
    '-y',
    '-framerate', String(subframeFps),
    '-i', path.join(framesDir, 'subframe_%05d.jpg'),
    '-i', audioPath,
    '-filter_complex', `[0:v]tmix=frames=3:weights=1 1 1,fps=${fps}[v]`,
    '-map', '[v]',
    '-map', '1:a',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '18',
    '-c:a', 'aac',
    '-b:a', '320k',
    '-shortest',
    outputMp4
  ];

  await new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', ffmpegCommand, { stdio: 'inherit' });
    ff.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Render complete! Final video output: ${outputMp4}`);
  console.log(`Total pipeline time: ${totalElapsed}s`);

  // Clean up raw_frames directory
  try {
    fs.rmSync(framesDir, { recursive: true, force: true });
    console.log('Cleaned up raw_frames temporary directory.');
  } catch (err) {
    console.warn('Failed to clean raw_frames:', err.message);
  }

  return outputMp4;
}

renderFullVideo().catch(err => {
  console.error('Video render pipeline failed:', err);
  process.exit(1);
});
