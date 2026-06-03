import { execFileSync, spawnSync } from "child_process";
import { existsSync, readdirSync, rmSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Get ffmpeg path from ffmpeg-static
let ffmpegPath;
try {
  ffmpegPath = require("ffmpeg-static");
  console.log("ffmpeg-static found at:", ffmpegPath);
} catch (e) {
  console.error("ffmpeg-static not found. Run: npm install ffmpeg-static");
  process.exit(1);
}

const publicDir = resolve(__dirname, "../public");
const videoPath = resolve(publicDir, "pixel14.mp4");
const framesDir = resolve(publicDir, "pixel14frames");

if (!existsSync(videoPath)) {
  console.error("Video not found:", videoPath);
  process.exit(1);
}

// Clean up old frames directories
const oldDirs = ["frames", "frames2", "pixel14frames"];
for (const dir of oldDirs) {
  const p = resolve(publicDir, dir);
  if (existsSync(p)) {
    console.log("Removing:", p);
    rmSync(p, { recursive: true, force: true });
  }
}

// Create fresh output dir
mkdirSync(framesDir, { recursive: true });
console.log("Created:", framesDir);

// Get video duration/fps info first
const probeResult = spawnSync(ffmpegPath, [
  "-i", videoPath,
  "-hide_banner"
], { encoding: "utf8" });

// Extract at 24fps, scale to 1280px wide, JPEG quality 85
// We'll extract ~120 frames for smooth animation
console.log("Extracting frames from pixel14.mp4...");
const result = spawnSync(ffmpegPath, [
  "-i", videoPath,
  "-vf", "fps=24,scale=1280:-1",
  "-q:v", "3",           // JPEG quality (2=best, 31=worst), 3 is excellent
  "-frames:v", "120",    // Cap at 120 frames for performance
  resolve(framesDir, "frame_%04d.jpg"),
], { encoding: "utf8", stdio: "inherit" });

if (result.status !== 0) {
  // Try without frame cap to get all frames at lower fps
  console.log("Retrying with lower fps...");
  const r2 = spawnSync(ffmpegPath, [
    "-i", videoPath,
    "-vf", "fps=12,scale=1280:-1",
    "-q:v", "3",
    resolve(framesDir, "frame_%04d.jpg"),
  ], { encoding: "utf8", stdio: "inherit" });
  
  if (r2.status !== 0) {
    console.error("Frame extraction failed!");
    process.exit(1);
  }
}

const frames = readdirSync(framesDir).filter(f => f.endsWith(".jpg"));
console.log(`\nExtracted ${frames.length} frames to /public/pixel14frames/`);
console.log("Done! Update PIXEL14_FRAME_COUNT to", frames.length, "in your lib file.");
