import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const width = 1280;
const height = 720;
const frameRate = 16;
const duration = 10;
const frameCount = frameRate * duration;
const mediaDirectory = path.resolve("public/media");

const themes = {
  dark: {
    background: "#08090b",
    panel: "#12151a",
    panelRaised: "#191d23",
    text: "#f4efe7",
    muted: "#9fa5aa",
    border: "#3a3f46",
    burgundy: "#7f1d38",
    burgundyBright: "#a33852",
    blue: "#4f91bb",
    green: "#4e9d79",
    amber: "#c08a46",
    grid: "#30353c",
    scrim: "#08090b",
  },
  light: {
    background: "#f6f1e8",
    panel: "#fffaf2",
    panelRaised: "#ece5da",
    text: "#202329",
    muted: "#646a70",
    border: "#c9c1b7",
    burgundy: "#741a34",
    burgundyBright: "#8c2943",
    blue: "#276c98",
    green: "#297458",
    amber: "#936126",
    grid: "#d8d0c5",
    scrim: "#f6f1e8",
  },
};

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const smooth = (value) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};
const phase = (time, start, end, fade = 0.055) =>
  smooth((time - start) / fade) * smooth((end - time) / fade);
const opacity = (value) => clamp(value).toFixed(3);

function codeStage(palette, strength, time) {
  const cursor = 145 + Math.round(smooth(time / 0.18) * 118);
  return `<g opacity="${opacity(strength)}">
    <rect x="548" y="92" width="656" height="536" rx="24" fill="${palette.panel}" stroke="${palette.border}" stroke-width="2"/>
    <rect x="548" y="92" width="656" height="64" rx="24" fill="${palette.panelRaised}"/>
    <circle cx="582" cy="124" r="6" fill="${palette.burgundy}"/><circle cx="604" cy="124" r="6" fill="${palette.amber}"/><circle cx="626" cy="124" r="6" fill="${palette.green}"/>
    <text x="672" y="131" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="16" letter-spacing="2">SERVICE.PY · IMPLEMENT</text>
    <rect x="578" y="182" width="112" height="410" rx="15" fill="${palette.panelRaised}" opacity=".72"/>
    <text x="602" y="222" fill="${palette.blue}" font-family="ui-monospace, monospace" font-size="13">API</text>
    <text x="602" y="258" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="13">tests</text>
    <text x="602" y="294" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="13">deploy</text>
    <text x="730" y="214" fill="${palette.burgundyBright}" font-family="ui-monospace, monospace" font-size="18">def</text>
    <text x="774" y="214" fill="${palette.text}" font-family="ui-monospace, monospace" font-size="18">process_event(event):</text>
    <text x="754" y="263" fill="${palette.blue}" font-family="ui-monospace, monospace" font-size="18">validate(event)</text>
    <text x="754" y="312" fill="${palette.text}" font-family="ui-monospace, monospace" font-size="18">result = transform(event)</text>
    <text x="754" y="361" fill="${palette.green}" font-family="ui-monospace, monospace" font-size="18">return publish(result)</text>
    <rect x="735" y="${cursor}" width="3" height="25" fill="${palette.burgundyBright}" opacity=".9"/>
    <path d="M742 432 H1125" stroke="${palette.border}"/>
    <text x="742" y="475" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="14">clear boundaries · validated input · useful errors</text>
  </g>`;
}

function failureStage(palette, strength, progress) {
  const reveal = smooth(progress);
  return `<g opacity="${opacity(strength)}">
    <rect x="548" y="92" width="656" height="536" rx="24" fill="${palette.panel}" stroke="${palette.border}" stroke-width="2"/>
    <text x="590" y="140" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="15" letter-spacing="2">TEST SUITE · VERIFY</text>
    <rect x="590" y="180" width="572" height="84" rx="16" fill="${palette.panelRaised}" stroke="${palette.green}" stroke-opacity=".55"/>
    <circle cx="628" cy="222" r="12" fill="${palette.green}"/><path d="M621 222 l5 5 10-12" fill="none" stroke="${palette.background}" stroke-width="3"/>
    <text x="662" y="228" fill="${palette.text}" font-family="ui-monospace, monospace" font-size="17">validation accepts complete events</text>
    <rect x="590" y="284" width="572" height="158" rx="16" fill="${palette.panelRaised}" stroke="${palette.burgundyBright}" stroke-width="2"/>
    <circle cx="628" cy="326" r="12" fill="${palette.burgundy}"/><path d="M622 320 l12 12 M634 320 l-12 12" stroke="${palette.text}" stroke-width="3"/>
    <text x="662" y="332" fill="${palette.text}" font-family="ui-monospace, monospace" font-size="17">request trace remains connected</text>
    <text x="622" y="390" fill="${palette.burgundyBright}" font-family="ui-monospace, monospace" font-size="15" opacity="${opacity(reveal)}">FAILED · request_id missing after transform</text>
    <rect x="590" y="476" width="572" height="96" rx="16" fill="${palette.panelRaised}"/>
    <path d="M624 524 H1120" stroke="${palette.burgundy}" stroke-width="4" stroke-dasharray="${(reveal * 496).toFixed(1)} 496"/>
    <text x="624" y="548" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="13">failure isolated before release</text>
  </g>`;
}

function diagnoseStage(palette, strength, progress) {
  const fixed = smooth((progress - 0.45) / 0.45);
  const status = fixed > 0.5 ? "PATCH VERIFIED" : "TRACE CORRELATED";
  const statusColor = fixed > 0.5 ? palette.green : palette.blue;
  return `<g opacity="${opacity(strength)}">
    <rect x="548" y="92" width="656" height="536" rx="24" fill="${palette.panel}" stroke="${palette.border}" stroke-width="2"/>
    <text x="590" y="140" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="15" letter-spacing="2">EVIDENCE · DIAGNOSE · CORRECT</text>
    <rect x="590" y="180" width="572" height="110" rx="16" fill="${palette.panelRaised}"/>
    <text x="622" y="220" fill="${palette.blue}" font-family="ui-monospace, monospace" font-size="14">TRACE 8F2A</text>
    <path d="M622 252 H760 L796 220 H928 L968 252 H1124" fill="none" stroke="${palette.blue}" stroke-width="3"/>
    <circle cx="796" cy="220" r="9" fill="${palette.burgundy}"/>
    <rect x="590" y="316" width="572" height="150" rx="16" fill="${palette.panelRaised}" stroke="${statusColor}" stroke-opacity=".65"/>
    <text x="622" y="354" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="14">transform.py · line 42</text>
    <rect x="614" y="377" width="516" height="42" rx="8" fill="${palette.burgundy}" opacity="${opacity(0.18 * (1 - fixed))}"/>
    <text x="630" y="404" fill="${palette.text}" font-family="ui-monospace, monospace" font-size="16">result.request_id = event.request_id</text>
    <text x="590" y="534" fill="${statusColor}" font-family="ui-monospace, monospace" font-size="16" font-weight="700" letter-spacing="2">${status}</text>
    <path d="M996 524 l14 14 32-38" fill="none" stroke="${palette.green}" stroke-width="6" opacity="${opacity(fixed)}"/>
  </g>`;
}

function pipelineStage(palette, strength, progress) {
  const stages = ["TEST", "BUILD", "SCAN", "DEPLOY"];
  return `<g opacity="${opacity(strength)}">
    <rect x="548" y="92" width="656" height="536" rx="24" fill="${palette.panel}" stroke="${palette.border}" stroke-width="2"/>
    <text x="590" y="140" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="15" letter-spacing="2">DELIVERY PIPELINE</text>
    ${stages
      .map((label, index) => {
        const x = 610 + index * 145;
        const complete = smooth((progress - index * 0.18) / 0.22);
        return `<g>
          ${index < stages.length - 1 ? `<path d="M${x + 88} 332 H${x + 132}" stroke="${palette.border}" stroke-width="3"/><path d="M${x + 88} 332 H${x + 132}" stroke="${palette.green}" stroke-width="3" stroke-dasharray="${(complete * 44).toFixed(1)} 44"/>` : ""}
          <rect x="${x}" y="270" width="92" height="124" rx="18" fill="${palette.panelRaised}" stroke="${complete > 0.75 ? palette.green : palette.border}" stroke-width="2"/>
          <circle cx="${x + 46}" cy="316" r="17" fill="${palette.green}" opacity="${opacity(complete)}"/>
          <path d="M${x + 37} 316 l7 7 14-17" fill="none" stroke="${palette.background}" stroke-width="4" opacity="${opacity(complete)}"/>
          <text x="${x + 46}" y="365" text-anchor="middle" fill="${palette.text}" font-family="ui-monospace, monospace" font-size="13">${label}</text>
        </g>`;
      })
      .join("")}
    <rect x="590" y="470" width="572" height="84" rx="14" fill="${palette.panelRaised}"/>
    <text x="622" y="520" fill="${palette.green}" font-family="ui-monospace, monospace" font-size="16" opacity="${opacity(smooth((progress - 0.65) / 0.25))}">release checks complete · artifact promoted</text>
  </g>`;
}

function healthyStage(palette, strength, time) {
  const pulse = 0.7 + Math.sin(time * Math.PI * 8) * 0.14;
  return `<g opacity="${opacity(strength)}">
    <rect x="548" y="92" width="656" height="536" rx="24" fill="${palette.panel}" stroke="${palette.border}" stroke-width="2"/>
    <text x="590" y="140" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="15" letter-spacing="2">RUNTIME · OBSERVE</text>
    <rect x="590" y="180" width="572" height="120" rx="18" fill="${palette.panelRaised}"/>
    <circle cx="640" cy="240" r="22" fill="${palette.green}" opacity="${opacity(pulse)}"/><path d="M628 240 l9 9 19-23" fill="none" stroke="${palette.background}" stroke-width="5"/>
    <text x="688" y="232" fill="${palette.text}" font-family="ui-monospace, monospace" font-size="24" font-weight="700">HEALTHY</text>
    <text x="688" y="260" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="14">services responding · signals normal</text>
    ${[0, 1, 2]
      .map((index) => {
        const x = 610 + index * 180;
        const values = ["API", "WORKER", "DATA"];
        return `<g><rect x="${x}" y="350" width="142" height="120" rx="18" fill="${palette.panelRaised}" stroke="${palette.green}" stroke-opacity=".6"/><circle cx="${x + 28}" cy="380" r="6" fill="${palette.green}"/><text x="${x + 48}" y="386" fill="${palette.text}" font-family="ui-monospace, monospace" font-size="14">${values[index]}</text><path d="M${x + 24} 430 C${x + 52} ${420 - index * 8},${x + 88} ${445 + index * 6},${x + 118} 414" fill="none" stroke="${index === 1 ? palette.blue : palette.green}" stroke-width="3"/></g>`;
      })
      .join("")}
    <text x="590" y="548" fill="${palette.burgundyBright}" font-family="ui-monospace, monospace" font-size="14">IMPLEMENT → VERIFY → DIAGNOSE → DELIVER → OBSERVE</text>
  </g>`;
}

function frameSvg(frame, palette) {
  const time = frame / frameCount;
  const code = phase(time, 0, 0.23);
  const failure = phase(time, 0.18, 0.43);
  const diagnose = phase(time, 0.38, 0.64);
  const pipeline = phase(time, 0.59, 0.83);
  const healthy = phase(time, 0.78, 1, 0.05);
  const activeLabel =
    time < 0.2
      ? "IMPLEMENT"
      : time < 0.4
        ? "VERIFY"
        : time < 0.61
          ? "DIAGNOSE"
          : time < 0.8
            ? "DELIVER"
            : "OBSERVE";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="ambient" cx="82%" cy="42%" r="78%"><stop offset="0" stop-color="${palette.burgundy}" stop-opacity=".27"/><stop offset=".46" stop-color="${palette.blue}" stop-opacity=".09"/><stop offset="1" stop-color="${palette.background}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1280" height="720" fill="${palette.background}"/>
    <rect width="1280" height="720" fill="url(#ambient)"/>
    <g opacity=".3" stroke="${palette.grid}" stroke-width="1">${Array.from({ length: 12 }, (_, index) => `<path d="M0 ${index * 64 + 8} H1280"/>`).join("")}${Array.from({ length: 19 }, (_, index) => `<path d="M${index * 72 + 8} 0 V720"/>`).join("")}</g>
    <text x="86" y="578" fill="${palette.muted}" font-family="ui-monospace, monospace" font-size="13" letter-spacing="3">ENGINEERING LOOP</text>
    <text x="86" y="616" fill="${palette.burgundyBright}" font-family="ui-monospace, monospace" font-size="20" font-weight="700" letter-spacing="3">${activeLabel}</text>
    <g transform="translate(-100 54) scale(.82)">
      ${codeStage(palette, code, time)}
      ${failureStage(palette, failure, (time - 0.18) / 0.25)}
      ${diagnoseStage(palette, diagnose, (time - 0.38) / 0.26)}
      ${pipelineStage(palette, pipeline, (time - 0.59) / 0.24)}
      ${healthyStage(palette, healthy, time)}
    </g>
    <rect width="1280" height="720" fill="${palette.scrim}" opacity=".18"/>
  </svg>`;
}

await mkdir(mediaDirectory, { recursive: true });

for (const [theme, palette] of Object.entries(themes)) {
  const frameDirectory = path.resolve(`.tools/hero-video-frames-${theme}`);
  const posterPath = path.join(
    mediaDirectory,
    `hero-engineering-${theme}-poster.jpg`,
  );
  await rm(frameDirectory, { recursive: true, force: true });
  await mkdir(frameDirectory, { recursive: true });

  for (let frame = 0; frame < frameCount; frame += 1) {
    const output = path.join(
      frameDirectory,
      `frame-${String(frame + 1).padStart(4, "0")}.png`,
    );
    await sharp(Buffer.from(frameSvg(frame, palette)))
      .png({ compressionLevel: 8 })
      .toFile(output);
    if (frame === Math.round(frameCount * 0.86)) {
      await sharp(Buffer.from(frameSvg(frame, palette)))
        .jpeg({ quality: 84, progressive: true })
        .toFile(posterPath);
    }
  }

  console.log(
    `Rendered ${frameCount} ${theme} frames at ${frameRate} fps to ${frameDirectory}`,
  );
  console.log(`Rendered ${theme} poster to ${posterPath}`);
}
