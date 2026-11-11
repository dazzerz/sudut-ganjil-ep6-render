const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const videoPath = 'c:/Users/ThinkPad/Videos/RemotionStudio/renders/Lightspark_Capabilities_20s.mp4';
console.log('Video exists:', fs.existsSync(videoPath), 'Size:', fs.statSync(videoPath).size);

// Copy to artifact directory
const artifactDir = 'C:/Users/ThinkPad/.gemini/antigravity/brain/68ad9110-e5fe-490b-a8fb-18eeaf37eaed';
const artifactVideoPath = path.join(artifactDir, 'Lightspark_Capabilities_20s.mp4');
fs.copyFileSync(videoPath, artifactVideoPath);
console.log('Copied to artifact dir:', fs.existsSync(artifactVideoPath));

// Upload to Litterbox
try {
  const lb = execSync(`curl.exe -s -F "reqtype=fileupload" -F "time=72h" -F "fileToUpload=@${videoPath}" https://litterbox.catbox.moe/resources/internals/api.php`, { encoding: 'utf-8' });
  console.log('Litterbox URL:', lb.trim());
} catch (e) {
  console.error('Litterbox upload error:', e.message);
}

// Upload to Tmpfiles
try {
  const tf = execSync(`curl.exe -s -F "file=@${videoPath}" https://tmpfiles.org/api/v1/upload`, { encoding: 'utf-8' });
  console.log('Tmpfiles Response:', tf.trim());
} catch (e) {
  console.error('Tmpfiles upload error:', e.message);
}
