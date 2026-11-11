const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function generateSoundtrack() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();

  console.log('Synthesizing 120 BPM soundtrack with Web Audio API OfflineAudioContext...');

  const wavBase64 = await page.evaluate(async () => {
    const sampleRate = 44100;
    const duration = 20.0;
    const totalSamples = Math.floor(sampleRate * duration);
    const bpm = 120;
    const beatInterval = 60 / bpm; // 0.5 seconds
    const beatsTotal = Math.floor(duration / beatInterval); // 40 beats

    const ctx = new OfflineAudioContext(2, totalSamples, sampleRate);

    // Master bus
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.9, 0);

    // Dynamic compressor to glue audio
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-14, 0);
    compressor.knee.setValueAtTime(12, 0);
    compressor.ratio.setValueAtTime(4, 0);
    compressor.attack.setValueAtTime(0.003, 0);
    compressor.release.setValueAtTime(0.15, 0);

    masterGain.connect(compressor);
    compressor.connect(ctx.destination);

    // Noise buffer for hits and hi-hats
    const noiseBuffer = ctx.createBuffer(1, sampleRate * 2, sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    // 1. Kick on every beat (40 beats)
    for (let b = 0; b < beatsTotal; b++) {
      const t = b * beatInterval;
      if (t >= duration - 0.1) break;

      // Kick sub oscillator
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(42, t + 0.08);

      oscGain.gain.setValueAtTime(0.95, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(t);
      osc.stop(t + 0.35);

      // Kick click transient for punch
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(600, t);
      clickOsc.frequency.exponentialRampToValueAtTime(80, t + 0.02);

      clickGain.gain.setValueAtTime(0.6, t);
      clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

      clickOsc.connect(clickGain);
      clickGain.connect(masterGain);

      clickOsc.start(t);
      clickOsc.stop(t + 0.03);

      // Driving 16th/8th tech hi-hat on off-beats (t + 0.25)
      const hatT = t + 0.25;
      if (hatT < duration - 0.1) {
        const hatSource = ctx.createBufferSource();
        hatSource.buffer = noiseBuffer;

        const hatFilter = ctx.createBiquadFilter();
        hatFilter.type = 'highpass';
        hatFilter.frequency.setValueAtTime(7500, hatT);

        const hatGain = ctx.createGain();
        hatGain.gain.setValueAtTime(0.18, hatT);
        hatGain.gain.exponentialRampToValueAtTime(0.001, hatT + 0.05);

        hatSource.connect(hatFilter);
        hatFilter.connect(hatGain);
        hatGain.connect(masterGain);

        hatSource.start(hatT);
        hatSource.stop(hatT + 0.06);
      }
    }

    // 2. Hit on each scene change (every bar = 4 beats = 2.0s)
    const barInterval = beatInterval * 4; // 2.0s
    const sceneCount = 10;

    for (let s = 0; s < sceneCount; s++) {
      const t = s * barInterval;
      if (t >= duration - 0.1) break;

      // Heavy sub impact drop
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(95, t);
      subOsc.frequency.exponentialRampToValueAtTime(28, t + 0.4);

      subGain.gain.setValueAtTime(0.85, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(t);
      subOsc.stop(t + 0.7);

      // Noise wash impact
      const hitNoise = ctx.createBufferSource();
      hitNoise.buffer = noiseBuffer;

      const hitFilter = ctx.createBiquadFilter();
      hitFilter.type = 'bandpass';
      hitFilter.frequency.setValueAtTime(2200, t);
      hitFilter.frequency.exponentialRampToValueAtTime(400, t + 0.45);
      hitFilter.Q.setValueAtTime(2.5, t);

      const hitGain = ctx.createGain();
      hitGain.gain.setValueAtTime(0.45, t);
      hitGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      hitNoise.connect(hitFilter);
      hitFilter.connect(hitGain);
      hitGain.connect(masterGain);

      hitNoise.start(t);
      hitNoise.stop(t + 0.55);

      // Metallic riser/sting right before scene transition (starting bar 2)
      if (s > 0) {
        const riserT = t - 0.25;
        const riserOsc = ctx.createOscillator();
        const riserGain = ctx.createGain();
        riserOsc.type = 'sawtooth';
        riserOsc.frequency.setValueAtTime(220, riserT);
        riserOsc.frequency.exponentialRampToValueAtTime(880, t);

        riserGain.gain.setValueAtTime(0.01, riserT);
        riserGain.gain.linearRampToValueAtTime(0.2, t - 0.01);
        riserGain.gain.setValueAtTime(0.0, t);

        const riserFilter = ctx.createBiquadFilter();
        riserFilter.type = 'lowpass';
        riserFilter.frequency.setValueAtTime(1500, riserT);
        riserFilter.frequency.exponentialRampToValueAtTime(4500, t);

        riserOsc.connect(riserFilter);
        riserFilter.connect(riserGain);
        riserGain.connect(masterGain);

        riserOsc.start(riserT);
        riserOsc.stop(t);
      }
    }

    // 3. Synth Bassline (minimal rhythmic stabs driving the techno groove)
    const bassNotes = [55, 55, 65.4, 55, 49, 49, 55, 65.4]; // A1, C2, G1
    for (let b = 0; b < beatsTotal; b++) {
      const t = b * beatInterval;
      if (t >= duration - 0.1) break;
      const freq = bassNotes[b % bassNotes.length];

      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      const bassFilter = ctx.createBiquadFilter();

      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(freq, t + 0.05);

      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(800, t + 0.05);
      bassFilter.frequency.exponentialRampToValueAtTime(120, t + 0.35);
      bassFilter.Q.setValueAtTime(4, t);

      bassGain.gain.setValueAtTime(0.0, t);
      bassGain.gain.setValueAtTime(0.35, t + 0.05);
      bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

      bassOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(masterGain);

      bassOsc.start(t + 0.05);
      bassOsc.stop(t + 0.4);
    }

    const rendered = await ctx.startRendering();

    // Encode to WAV format
    const numChannels = 2;
    const length = rendered.length * numChannels * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);

    function writeString(view, offset, string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, 'WAVE');

    // "fmt " sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
    view.setUint16(20, 1, true);  // AudioFormat (1 for PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true); // ByteRate
    view.setUint16(32, numChannels * 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample

    // "data" sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, length, true);

    // Write PCM samples
    const left = rendered.getChannelData(0);
    const right = rendered.getChannelData(1);
    let offset = 44;
    for (let i = 0; i < rendered.length; i++) {
      let l = Math.max(-1, Math.min(1, left[i]));
      let r = Math.max(-1, Math.min(1, right[i]));
      view.setInt16(offset, l < 0 ? l * 0x8000 : l * 0x7fff, true);
      offset += 2;
      view.setInt16(offset, r < 0 ? r * 0x8000 : r * 0x7fff, true);
      offset += 2;
    }

    // Convert to base64
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
  });

  await browser.close();

  const outPath = path.resolve(__dirname, 'audio.wav');
  fs.writeFileSync(outPath, Buffer.from(wavBase64, 'base64'));
  console.log('Audio rendered successfully to:', outPath);
  return outPath;
}

generateSoundtrack().catch(err => {
  console.error('Audio generation failed:', err);
  process.exit(1);
});
