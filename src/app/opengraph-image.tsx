import { ImageResponse } from "next/og";

export const alt = "Sasanka Maddala — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#08090b",
        color: "#f4efe7",
        padding: "76px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          color: "#dfc3a7",
          fontSize: 24,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Sasanka Maddala
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.05,
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          Senior Software Engineer
        </div>
        <div style={{ fontSize: 32, color: "#bbb7b0" }}>
          Backend · Python · DevOps · Cloud-Native Systems
        </div>
      </div>
      <div
        style={{
          height: 8,
          width: 210,
          borderRadius: 8,
          background: "#7f1d38",
        }}
      />
    </div>,
    size,
  );
}
