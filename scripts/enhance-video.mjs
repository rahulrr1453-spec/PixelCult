import { spawnSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const ffmpegPath = require("ffmpeg-static");
const publicDir  = resolve(__dirname, "../public");
const input      = resolve(publicDir, "pixel14.mp4");
const output     = resolve(publicDir, "pixel14_enhanced.mp4");

if (!existsSync(input)) {
  console.error("pixel14.mp4 not found at:", input);
  process.exit(1);
}

if (existsSync(output)) {
  unlinkSync(output);
  console.log("Removed old enhanced file.");
}

console.log("Re-encoding with color grading + quality boost...");
console.log("  • hue=-22 (shift cyan → emerald #10b981)");
console.log("  • saturation +10%");
console.log("  • contrast +12%");
console.log("  • sharpening (unsharp mask)");
console.log("  • CRF 14 (high quality, near-lossless for an 8s clip)");
console.log();

const result = spawnSync(ffmpegPath, [
  "-i", input,

  // video filters: color grade + sharpen
  "-vf", [
    // hue rotation: shift cyan (~180°) to emerald (~160°) = -20deg
    // slight saturation boost so the green reads more vibrant
    "hue=h=-20:s=1.12",
    // eq: a touch of brightness and contrast to pop against dark bg
    "eq=brightness=0.05:contrast=1.12:saturation=1.1",
    // unsharp: luma sharpen (5x5 kernel, 0.5 strength), chroma off (ca=0, cx/cy must be >=3)
    "unsharp=lx=5:ly=5:la=0.5:cx=3:cy=3:ca=0",
    // scale to 1280 keeping aspect (already 1280 but ensures clean encode)
    "scale=1280:720",
  ].join(","),

  // video codec: x264, high quality
  "-c:v",    "libx264",
  "-crf",    "14",          // near-lossless for short clip
  "-preset", "slow",         // better compression/quality ratio
  "-profile:v", "high",
  "-level",  "4.1",

  // audio: keep as-is
  "-c:a", "aac",
  "-b:a", "128k",

  // no overwrite prompt
  "-y",

  output,
], { stdio: "inherit", encoding: "utf8" });

if (result.status !== 0) {
  console.error("\nFFmpeg failed with exit code:", result.status);
  process.exit(1);
}

console.log("\nDone! Output:", output);
