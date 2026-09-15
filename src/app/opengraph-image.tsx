import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const iconBuffer = await readFile(join(process.cwd(), "public/brand/cocoa-pod.png"));
  const iconDataUrl = `data:image/png;base64,${iconBuffer.toString("base64")}`;

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
          background: "#faf8f5",
        }}
      >
        <img src={iconDataUrl} width={110} height={176} alt="" />
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 72, color: "#171412", fontFamily: "serif" }}>Sard</div>
          <div style={{ fontSize: 40, color: "#4f9a95" }}>chocolate</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
