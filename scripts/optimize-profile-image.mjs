import { rename, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("public/images/profile/sasanka-maddala.png");
const temporary = path.resolve(
  "public/images/profile/sasanka-maddala.optimized.png",
);
const before = await stat(source);
const input = sharp(source);
const metadata = await input.metadata();

await input
  .resize({ width: 900, height: 900, fit: "inside", withoutEnlargement: true })
  .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
  .toFile(temporary);
const optimizedMetadata = await sharp(temporary).metadata();
if (!optimizedMetadata.width || !optimizedMetadata.height)
  throw new Error("Optimized image is invalid.");

await rename(temporary, source);
const after = await stat(source);
console.log(
  `Profile image optimized: ${before.size} -> ${after.size} bytes (${metadata.width}x${metadata.height}).`,
);
