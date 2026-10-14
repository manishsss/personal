import { ImageResponse } from "next/og";
export const alt = "Manish — Web3 Creator & KOL Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "#0e0e11",
          color: "#f2f0ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 8, marginBottom: 55 }}>
          MANISH / WEB3 CREATOR & KOL MANAGER
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>
          Finding what’s early.
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>
          Creating around it.
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -4,
            color: "#b7a7f9",
          }}
        >
          Building with it.
        </div>
      </div>
    ),
    size,
  );
}
