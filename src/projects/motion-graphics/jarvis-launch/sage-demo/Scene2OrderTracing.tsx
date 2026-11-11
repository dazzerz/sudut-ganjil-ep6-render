import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { SageHologramBadge } from "./components/SageHologramBadge";
import { DynamicSubtitle } from "./components/DynamicSubtitle";
import { KineticPunchline } from "./components/KineticPunchline";

export const Scene2OrderTracing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtitles for Scene 2 (total duration: 660 frames / 22.0s)
  const subtitles = [
    {
      text: "Lalu, bagaimana dengan pelacakan pesanan?",
      startFrame: 0,
      endFrame: 75,
    },
    {
      text: "Tidak ada lagi chat manual bolak-balik hanya untuk menanyakan status pengiriman dan estimasi kedatangan barang.",
      startFrame: 80,
      endFrame: 315,
    },
    {
      text: "Cukup sebutkan nomor PO atau sales order. Nomor seri, status pickup gudang, hingga estimasi waktu sampai di tangan pelanggan, tersaji transparan secara real-time.",
      startFrame: 325,
      endFrame: 520,
    },
  ];

  // Camera pan & zoom on timeline during Part 3
  const timelineRelFrame = Math.max(0, frame - 220);
  const cameraScale = interpolate(timelineRelFrame, [0, 100, 250, 440], [1.0, 1.14, 1.18, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraTranslateY = interpolate(timelineRelFrame, [0, 100, 250, 440], [0, -60, -90, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraTranslateX = interpolate(timelineRelFrame, [0, 100, 250, 440], [0, -30, -50, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#050811",
        overflow: "hidden",
      }}
    >
      {/* SFX: Warp Speed Scanning at frame 180 */}
      {frame === 180 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_data_scan.wav")} volume={0.65} />
      )}
      {/* SFX: Sub drop on punchline */}
      {frame === 530 && (
        <Audio src={staticFile("audio/jarvis-sage/sfx_sub_drop.wav")} volume={0.7} />
      )}

      {/* PART 1: Prompt Input from real footage (0 to 180 frames) */}
      {frame < 200 && (
        <div style={{ position: "absolute", width: 1920, height: 1080, top: 0, left: 0 }}>
          <Sequence from={0} durationInFrames={180}>
            <Video
              src={staticFile("videos/jarvis-sage/clip_prompt.mp4")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Sequence>
        </div>
      )}

      {/* PART 2: Fast-forward Cyber AI Scan Transition (180 to 220 frames) */}
      {frame >= 180 && frame <= 230 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 40,
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(5, 8, 17, 0.95) 70%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              padding: "16px 36px",
              borderRadius: 20,
              border: "2px solid #10B981",
              background: "rgba(6, 28, 20, 0.95)",
              boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "3px solid #10B981",
                borderTopColor: "transparent",
                animation: "spin 0.5s linear infinite",
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#10B981",
                letterSpacing: 2,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              ✦ SAGE NEURAL ERP TELEMETRY SYNC (0.3s)
            </span>
          </div>
        </div>
      )}

      {/* PART 3: Timeline & Delivery Status from real footage (220 to 660 frames) */}
      {frame >= 220 && (
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            top: 0,
            left: 0,
            transform: `scale(${cameraScale}) translate(${cameraTranslateX}px, ${cameraTranslateY}px)`,
            transformOrigin: "center center",
            transition: "transform 0.05s ease-out",
          }}
        >
          <Sequence from={220} durationInFrames={440}>
            <Video
              src={staticFile("videos/jarvis-sage/clip_timeline.mp4")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Sequence>

          {/* Glowing Green Highlight on Milestone Table */}
          <div
            style={{
              position: "absolute",
              top: 360,
              left: 680,
              width: 950,
              height: 320,
              borderRadius: 16,
              border: "2px solid rgba(16, 185, 129, 0.65)",
              boxShadow: "0 0 35px rgba(16, 185, 129, 0.35), inset 0 0 20px rgba(16, 185, 129, 0.15)",
              pointerEvents: "none",
              opacity: interpolate(timelineRelFrame, [30, 60], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        </div>
      )}

      {/* Floating Holographic Badges */}
      <SageHologramBadge
        label="REAL-TIME TELEMETRY"
        value="SO90069060"
        subtitle="2 Items (1.000 Unit Filter HMEF)"
        icon="📦"
        position={{ top: 240, right: 60 }}
        enterFrame={240}
      />
      <SageHologramBadge
        label="STATUS AKHIR"
        value="INVOICED & ARRIVED"
        subtitle="Pickup 24 Jun • Tiba 25 Jun 2026"
        icon="🚚"
        position={{ top: 340, right: 60 }}
        enterFrame={320}
      />

      {/* Kinetic Punchline for Scene 2 */}
      <KineticPunchline
        prefix="ORDER TELEMETRY"
        headline="VISIBILITY WITHOUT"
        tagline="THE BACK-AND-FORTH."
        startFrame={530}
        durationInFrames={125}
      />

      {/* Subtitles */}
      <DynamicSubtitle cues={subtitles} />
    </div>
  );
};
