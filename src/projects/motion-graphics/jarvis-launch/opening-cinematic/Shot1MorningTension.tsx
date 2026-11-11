import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
  Audio,
  Sequence,
  Easing,
} from "remotion";
import { CinematicSubtitle } from "./components/CinematicSubtitle";
import { VignetteOverlay } from "./components/VignetteOverlay";

export const Shot1MorningTension: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle slow cinematic camera drift
  const scale = interpolate(frame, [0, 450], [1.0, 1.06], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const translateY = interpolate(frame, [0, 450], [0, -18], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Crossfade in at start, crossfade out at end
  const sceneOpacity = interpolate(
    frame,
    [0, 25, 420, 450],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Notification 1: Missed Call
  const n1Progress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Notification 2: WhatsApp RS Siloam
  const n2Progress = spring({
    frame: frame - 110,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Notification 3: WhatsApp FSS Team
  const n3Progress = spring({
    frame: frame - 190,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Header stamp
  const headerOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#03060c",
        overflow: "hidden",
        opacity: sceneOpacity,
      }}
    >
      {/* Background B-roll Image with smooth pan & scale */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("images/jarvis/shot1_morning_phone.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.82) contrast(1.1)",
          }}
        />
      </div>

      <VignetteOverlay intensity={0.55} letterbox />

      {/* Voiceover Audio (Shot 1: Setiap hari dimulai dengan pertanyaan yang belum terjawab) */}
      <Sequence from={45}>
        <Audio
          src={staticFile("audio/jarvis/shot1_vo.mp3")}
          volume={1}
        />
      </Sequence>

      {/* Realistic Smartphone Notification Sound Effects */}
      {/* 1. Missed Call: Haptic Vibration + Alert Ping */}
      <Sequence from={32}>
        <Audio
          src={staticFile("audio/jarvis/sfx_phone_vibe.mp3")}
          volume={0.7}
        />
      </Sequence>
      <Sequence from={35}>
        <Audio
          src={staticFile("audio/jarvis/sfx_notif_call.mp3")}
          volume={0.8}
        />
      </Sequence>

      {/* 2. WhatsApp RS Siloam: Message Pop Chime */}
      <Sequence from={108}>
        <Audio
          src={staticFile("audio/jarvis/sfx_phone_vibe.mp3")}
          volume={0.5}
        />
      </Sequence>
      <Sequence from={110}>
        <Audio
          src={staticFile("audio/jarvis/sfx_notif_wa1.mp3")}
          volume={0.85}
        />
      </Sequence>

      {/* 3. WhatsApp Tim FSS Urgent: Priority Double Chime */}
      <Sequence from={188}>
        <Audio
          src={staticFile("audio/jarvis/sfx_phone_vibe.mp3")}
          volume={0.5}
        />
      </Sequence>
      <Sequence from={190}>
        <Audio
          src={staticFile("audio/jarvis/sfx_notif_wa2.mp3")}
          volume={0.9}
        />
      </Sequence>

      {/* Corporate Context HUD Stamp (Top Left) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 90,
          opacity: headerOpacity,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            boxShadow: "0 0 12px #ef4444",
          }}
        />
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.75)",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          06:48 WIB • SENIN PAGI • SEBELUM RAPAT PERTAMA
        </span>
      </div>

      {/* Notification Stream Container (Top Right floating stack) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 90,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 30,
          width: 480,
        }}
      >
        {/* Notification 1 */}
        {frame >= 35 && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 16,
              background: "rgba(15, 23, 42, 0.78)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transform: `translateX(${(1 - n1Progress) * 80}px)`,
              opacity: n1Progress,
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              📞
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#f87171",
                    letterSpacing: "0.04em",
                  }}
                >
                  Panggilan Tak Terjawab (3)
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  06:42
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "#e2e8f0",
                  lineHeight: 1.35,
                }}
              >
                Logistik Pusat — Panggilan tidak diangkat
              </p>
            </div>
          </div>
        )}

        {/* Notification 2 */}
        {frame >= 110 && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 16,
              background: "rgba(15, 23, 42, 0.78)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transform: `translateX(${(1 - n2Progress) * 80}px)`,
              opacity: n2Progress,
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              💬
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#4ade80",
                    letterSpacing: "0.04em",
                  }}
                >
                  WhatsApp • RS Siloam Karawaci
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  06:45
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "#e2e8f0",
                  lineHeight: 1.35,
                }}
              >
                “Pak, status pesanan Icu Medical kapan bisa terpenuhi yak?”
              </p>
            </div>
          </div>
        )}

        {/* Notification 3 */}
        {frame >= 190 && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 16,
              background: "rgba(15, 23, 42, 0.78)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(251, 191, 36, 0.35)",
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transform: `translateX(${(1 - n3Progress) * 80}px)`,
              opacity: n3Progress,
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "rgba(251, 191, 36, 0.2)",
                border: "1px solid rgba(251, 191, 36, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              ⚡
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fde047",
                    letterSpacing: "0.04em",
                  }}
                >
                  WhatsApp • Tim FSS Lapangan
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  06:47
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "#e2e8f0",
                  lineHeight: 1.35,
                }}
              >
                “Tolong kirim brosur spek tender urgent mas, customer minta
                sekarang!”
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cinematic Voiceover Subtitle */}
      <CinematicSubtitle
        text="Setiap hari dimulai dengan pertanyaan yang belum terjawab."
        startFrame={45}
        durationFrames={165}
        highlightWords={["pertanyaan", "belum", "terjawab."]}
        highlightColor="#38bdf8"
        fontSize={46}
        bottomPosition={130}
      />
    </div>
  );
};
