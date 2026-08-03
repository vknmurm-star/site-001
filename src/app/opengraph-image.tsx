import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_NAME;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf6ef",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#b5602f",
            opacity: 0.12,
            top: -140,
            right: -140,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "#a15d63",
            opacity: 0.12,
            bottom: -120,
            left: -100,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#b5602f",
            display: "flex",
          }}
        >
          40+ / 50+
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 84,
            fontWeight: 700,
            color: "#2d251f",
            display: "flex",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#5a4d43",
            display: "flex",
          }}
        >
          Уход, макияж и стиль для зрелой красоты
        </div>
      </div>
    ),
    { ...size }
  );
}
