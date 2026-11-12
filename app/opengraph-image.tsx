// Placeholder: created by GitHub issue #11.
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "#0B241A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#EEE5D0",
        }}
      >
        KERNEL 1.0
      </div>
    ),
    { ...size }
  );
}
