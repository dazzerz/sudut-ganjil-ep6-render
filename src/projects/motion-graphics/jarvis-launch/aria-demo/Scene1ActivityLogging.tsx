import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { AriaHologramBadge } from "./components/AriaHologramBadge";
import { DynamicSubtitle } from "./components/DynamicSubtitle";

export const Scene1ActivityLogging: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total duration: 750 frames (25.0s @ 30 FPS)
  const subtitles = [
    {
      text: "Setiap kunjungan sales butuh persiapan.",
      startFrame: 15,
      endFrame: 110,
    },
    {
      text: "Tapi tidak harus diawali dengan form CRM yang rumit.",
      startFrame: 115,
      endFrame: 220,
    },
    {
      text: "Cukup satu kalimat santai di chat...",
      startFrame: 225,
      endFrame: 330,
    },
    {
      text: "ARIA langsung memetakan jadwal, mengenali customer, dan menerbitkan nomor aktivitas resmi.",
      startFrame: 335,
      endFrame: 535,
    },
    {
      text: "Log your activity. In one casual sentence.",
      startFrame: 600,
      endFrame: 725,
      isTagline: true,
    },
  ];

  // Dynamic zoom:
  // 0 - 300: Scale 1.0 (typing)
  // 300 - 360: Fast-forward transition
  // 360 - 750: Zoom in (scale 1.20) focusing on the response card & Activity ID
  const zoomIn = interpolate(frame, [300, 420], [1.0, 1.20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panY = interpolate(frame, [300, 420], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isFastForward = frame >= 300 && frame < 360;
  const ffPulse = isFastForward
    ? Math.sin(((frame - 300) / 6) * Math.PI) * 0.5 + 0.5
    : 0;

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: "#070B12",
        overflow: "hidden",
      }}
    >
      {/* Audio VO Part A: Frame 15 to 540 */}
      <Sequence from={15} durationInFrames={530}>
        <Audio src={staticFile("audio/jarvis-aria/scene1_partA.mp3")} volume={1.0} />
      </Sequence>

      {/* Audio VO Part B: Frame 600 to 715 (Clean pause after Part A) */}
      <Sequence from={600} durationInFrames={120}>
        <Audio src={staticFile("audio/jarvis-aria/scene1_partB.mp3")} volume={1.0} />
      </Sequence>

      {/* Video Content with Camera Movement */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${zoomIn}) translateY(${panY}px)`,
          transformOrigin: "center 35%",
        }}
      >
        {/* Clip 1: Typing & Send (0 - 300 frames = 10s) */}
        <Sequence from={0} durationInFrames={300}>
          <Video
            src={staticFile("videos/jarvis-aria/aria_activity.mp4")}
            startFrom={450} // Finishing sentence & sending
            style={{
              width: 1920,
              height: 1032,
              objectFit: "contain",
            }}
          />
        </Sequence>

        {/* Clip 2: Fast-forward idle time (Frames 300 - 360 = 2s) */}
        <Sequence from={300} durationInFrames={60}>
          <Video
            src={staticFile("videos/jarvis-aria/aria_activity.mp4")}
            startFrom={1500}
            playbackRate={18}
            style={{
              width: 1920,
              height: 1032,
              objectFit: "contain",
              filter: `blur(${ffPulse * 4}px) brightness(${1 + ffPulse * 0.3})`,
            }}
          />
        </Sequence>

        {/* Clip 3: Response Arrives & Activity ID (Frames 360 - 750 = 13s) */}
        <Sequence from={360} durationInFrames={390}>
          <Video
            src={staticFile("videos/jarvis-aria/aria_activity.mp4")}
            startFrom={3060} // source second 102 (response appears)
            style={{
              width: 1920,
              height: 1032,
              objectFit: "contain",
            }}
          />
        </Sequence>
      </div>

      {/* Fast Forward Processing Badge */}
      {isFastForward && (
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(0, 210, 255, 0.2)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 210, 255, 0.5)",
            borderRadius: 30,
            padding: "10px 24px",
            zIndex: 40,
            boxShadow: "0 0 25px rgba(0, 210, 255, 0.4)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#00E5FF",
              boxShadow: "0 0 10px #00E5FF",
              opacity: ffPulse,
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#00E5FF",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Processing...
          </span>
        </div>
      )}

      {/* Holographic HUD Badge on Response */}
      <AriaHologramBadge
        label="CRM Auto-Log"
        value="Activity ID: 364648"
        subtitle="RS Umum Abdi Waluyo • Hamilton C6"
        icon="✓"
        accentColor="#00E5FF"
        position={{ top: 120, right: 80 }}
        enterFrame={380}
      />

      {/* Dynamic Subtitles */}
      <DynamicSubtitle cues={subtitles} />

      {/* Cinematic Top/Bottom Gradient Shadows */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, rgba(5,8,15,0.9), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(to top, rgba(5,8,15,0.95), transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
