import { ImageResponse } from "next/og";

// Apple touch icon (opaque PNG). Echoes the favicon: navy field, lime bar.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1321",
        }}
      >
        <div style={{ width: 118, height: 20, borderRadius: 10, background: "#b5e602" }} />
      </div>
    ),
    size,
  );
}
