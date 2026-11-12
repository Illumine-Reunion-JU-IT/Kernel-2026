import { ImageResponse } from "next/og";

export const alt = "KERNEL 1.0 - Jadavpur University";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0B241A",
          color: "#EEE5D0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#B77CFF", fontSize: 28 }}>JADAVPUR UNIVERSITY</div>
        <div style={{ fontSize: 110, fontWeight: 700, marginTop: 30 }}>
          KERNEL 1.0
        </div>
        <div style={{ fontSize: 30, marginTop: 20 }}>
          Department of Information Technology
        </div>
      </div>
    ),
    size,
  );
}
