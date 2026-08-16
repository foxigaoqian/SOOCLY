import { ImageResponse } from "next/og";

export const alt = "SOOCLY — Choose the Look before you shoot.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F2EA",
          color: "#111111",
          padding: "68px 76px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <span style={{ fontSize: 58, fontWeight: 800, letterSpacing: -3 }}>S</span>
          <div style={{ display: "flex", alignItems: "center", marginLeft: -10 }}>
            <span
              style={{
                width: 58,
                height: 58,
                border: "6px solid #111111",
                borderRadius: "50%",
                display: "flex",
              }}
            />
            <span
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: "#FF6A32",
                display: "flex",
                marginLeft: -14,
              }}
            />
          </div>
          <span style={{ fontSize: 58, fontWeight: 800, letterSpacing: -3, marginLeft: -12 }}>CLY</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
          <span style={{ fontSize: 23, textTransform: "uppercase", letterSpacing: 5, marginBottom: 22 }}>
            Camera Looks made for your gear
          </span>
          <span style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 750, letterSpacing: -4 }}>
            Choose the Look before you shoot.
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22 }}>
          <span>Looks, not presets.</span>
          <span style={{ color: "#FF6A32", fontWeight: 700 }}>Choose → Set → Shoot</span>
        </div>
      </div>
    ),
    size,
  );
}
