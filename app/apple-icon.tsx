import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "#F5F2EA",
        borderRadius: 38,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "12px solid #111111",
          background: "transparent",
          position: "absolute",
          left: 40,
        }}
      />
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "#FF6A32",
          position: "absolute",
          left: 80,
        }}
      />
    </div>,
    size,
  );
}
