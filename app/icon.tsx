import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
        borderRadius: 112,
      }}
    >
      <div
        style={{
          width: 204,
          height: 204,
          borderRadius: "50%",
          border: "34px solid #111111",
          background: "transparent",
          position: "absolute",
          left: 118,
        }}
      />
      <div
        style={{
          width: 214,
          height: 214,
          borderRadius: "50%",
          background: "#FF6A32",
          position: "absolute",
          left: 228,
        }}
      />
    </div>,
    size,
  );
}
