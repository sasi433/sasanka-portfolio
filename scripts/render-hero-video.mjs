import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const width = 1280;
const height = 720;
const frameRate = 20;
const duration = 12;
const frameCount = frameRate * duration;
const frameDirectory = path.resolve(".tools/hero-video-frames");
const posterPath = path.resolve("public/media/hero-engineering-poster.jpg");

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const smooth = (value) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};
const phase = (time, start, end, fade = 0.08) =>
  smooth((time - start) / fade) * smooth((end - time) / fade);
const opacity = (value) => clamp(value).toFixed(3);

function waveform(time) {
  const points = Array.from({ length: 80 }, (_, index) => {
    const x = 80 + index * 15;
    const envelope = Math.sin((index / 79) * Math.PI);
    const y =
      360 +
      Math.sin(index * 0.46 + time * Math.PI * 8) * 54 * envelope +
      Math.sin(index * 0.13 - time * Math.PI * 4) * 18;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return points.join(" ");
}

function dataBlocks(time, strength) {
  return Array.from({ length: 18 }, (_, index) => {
    const column = index % 6;
    const row = Math.floor(index / 6);
    const drift = Math.sin(time * Math.PI * 2 + index) * 8;
    const x = 170 + column * 150 + drift;
    const y = 220 + row * 90 + Math.cos(time * Math.PI * 2 + index) * 5;
    const delay = smooth((strength - index * 0.018) * 2.4);
    return `<rect x="${x}" y="${y}" width="${70 + (index % 3) * 18}" height="10" rx="5" fill="#e5a0b8" opacity="${opacity(delay * 0.45)}" />`;
  }).join("");
}

const nodes = [
  [228, 238],
  [432, 196],
  [620, 302],
  [830, 208],
  [1000, 338],
  [770, 492],
  [488, 510],
  [272, 430],
];

const links = [
  [0, 1],
  [0, 7],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 6],
  [3, 4],
  [3, 5],
  [4, 5],
  [5, 6],
  [6, 7],
];

function network(time, strength) {
  const lines = links
    .map(([from, to], index) => {
      const [x1, y1] = nodes[from];
      const [x2, y2] = nodes[to];
      const travelled = smooth((strength - index * 0.025) * 2.2);
      return `<path d="M${x1} ${y1} L${x2} ${y2}" pathLength="1" stroke="#8c274c" stroke-width="2" stroke-dasharray="1" stroke-dashoffset="${(1 - travelled).toFixed(3)}" opacity="${opacity(0.65 * strength)}" />`;
    })
    .join("");
  const circles = nodes
    .map(([x, y], index) => {
      const pulse = 0.72 + Math.sin(time * Math.PI * 4 + index) * 0.18;
      return `<g opacity="${opacity(strength)}"><circle cx="${x}" cy="${y}" r="${18 + pulse * 4}" fill="#2c1620" stroke="#e5a0b8" stroke-width="2"/><circle cx="${x}" cy="${y}" r="4" fill="#f7f3f5" opacity="${opacity(pulse)}"/></g>`;
    })
    .join("");
  return lines + circles;
}

function pipeline(time, strength) {
  const stages = [250, 430, 610, 790, 970];
  const connectors = stages
    .slice(0, -1)
    .map(
      (x, index) =>
        `<path d="M${x + 78} 360 H${stages[index + 1] - 18}" stroke="#e5a0b8" stroke-width="3" stroke-dasharray="8 12" stroke-dashoffset="${(-time * 120).toFixed(1)}" opacity="${opacity(strength * 0.55)}"/>`,
    )
    .join("");
  const boxes = stages
    .map((x, index) => {
      const checked = smooth((strength - index * 0.08) * 2);
      return `<g opacity="${opacity(strength)}"><rect x="${x - 42}" y="318" width="84" height="84" rx="18" fill="#141216" stroke="#6b3a4d" stroke-width="2"/><path d="M${x - 14} 359 l12 12 24 -28" fill="none" stroke="#e5a0b8" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" opacity="${opacity(checked)}"/></g>`;
    })
    .join("");
  return connectors + boxes;
}

function infrastructure(time, strength, recovery) {
  const boxes = [
    [335, 315],
    [455, 315],
    [335, 435],
    [455, 435],
  ]
    .map(
      ([x, y], index) =>
        `<g opacity="${opacity(strength)}"><rect x="${x}" y="${y}" width="88" height="74" rx="13" fill="#141216" stroke="#e5a0b8" stroke-width="2"/><rect x="${x + 16}" y="${y + 17}" width="42" height="6" rx="3" fill="#e5a0b8" opacity=".55"/><circle cx="${x + 68}" cy="${y + 20}" r="5" fill="${index === 2 && recovery < 0.46 ? "#d36a78" : "#9fd0bc"}"/></g>`,
    )
    .join("");
  const cloud = `<g opacity="${opacity(strength)}" transform="translate(705 300)"><path d="M65 150h235c48 0 70-65 30-92-8-38-42-65-82-60-22-37-77-40-105-7-36-11-75 12-81 50-60 4-59 109 3 109Z" fill="#141216" stroke="#e5a0b8" stroke-width="3"/><path d="M125 78h145M125 105h104" stroke="#e5a0b8" stroke-linecap="round" stroke-width="8" opacity=".42"/></g>`;
  const ring = `<circle cx="630" cy="380" r="120" fill="none" stroke="${recovery > 0.5 ? "#9fd0bc" : "#d36a78"}" stroke-width="4" stroke-dasharray="${(recovery * 754).toFixed(1)} 754" transform="rotate(-90 630 380)" opacity="${opacity(strength * 0.5)}"/>`;
  return boxes + cloud + ring;
}

function frameSvg(frame) {
  const t = frame / frameCount;
  const wave = phase(t, 0.01, 0.26);
  const blocks = phase(t, 0.16, 0.42);
  const services = phase(t, 0.32, 0.62);
  const delivery = phase(t, 0.52, 0.78);
  const infra = phase(t, 0.69, 0.98);
  const recovery = smooth((t - 0.82) / 0.12);
  const ambientPulse = 0.72 + Math.sin(t * Math.PI * 2) * 0.08;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="glow" cx="68%" cy="45%" r="70%"><stop offset="0" stop-color="#4b2031" stop-opacity="${ambientPulse}"/><stop offset=".48" stop-color="#1c1017" stop-opacity=".68"/><stop offset="1" stop-color="#07070a" stop-opacity="1"/></radialGradient>
      <linearGradient id="shade" x1="0" x2="1"><stop offset="0" stop-color="#07070a" stop-opacity=".9"/><stop offset=".58" stop-color="#07070a" stop-opacity=".18"/><stop offset="1" stop-color="#07070a" stop-opacity=".42"/></linearGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="20"/></filter>
    </defs>
    <rect width="1280" height="720" fill="#07070a"/>
    <rect width="1280" height="720" fill="url(#glow)"/>
    <g opacity=".13" stroke="#9c6077" stroke-width="1">${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${i * 65 + ((t * 24) % 65)} H1280"/>`).join("")}${Array.from({ length: 20 }, (_, i) => `<path d="M${i * 70 + ((t * 18) % 70)} 0 V720"/>`).join("")}</g>
    <circle cx="930" cy="310" r="250" fill="#8c274c" opacity=".09" filter="url(#blur)"/>
    <polyline points="${waveform(t)}" fill="none" stroke="#e5a0b8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity(wave * 0.72)}"/>
    <g>${dataBlocks(t, blocks)}</g>
    <g>${network(t, services)}</g>
    <g>${pipeline(t, delivery)}</g>
    <g>${infrastructure(t, infra, recovery)}</g>
    <rect width="1280" height="720" fill="url(#shade)"/>
    <rect x="0" y="0" width="1280" height="720" fill="none" stroke="#9b4668" stroke-opacity=".14" stroke-width="2"/>
  </svg>`;
}

await rm(frameDirectory, { recursive: true, force: true });
await mkdir(frameDirectory, { recursive: true });
await mkdir(path.dirname(posterPath), { recursive: true });

for (let frame = 0; frame < frameCount; frame += 1) {
  const output = path.join(
    frameDirectory,
    `frame-${String(frame + 1).padStart(4, "0")}.png`,
  );
  await sharp(Buffer.from(frameSvg(frame)))
    .png({ compressionLevel: 8 })
    .toFile(output);
  if (frame === Math.round(frameCount * 0.58)) {
    await sharp(Buffer.from(frameSvg(frame)))
      .jpeg({ quality: 82, progressive: true })
      .toFile(posterPath);
  }
}

console.log(
  `Rendered ${frameCount} frames at ${frameRate} fps to ${frameDirectory}`,
);
console.log(`Rendered poster to ${posterPath}`);
