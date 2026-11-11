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

export const Scene3ResultQuotation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total duration: 690 frames (23.0s @ 30 FPS)
  // Audio timings:
  // scene3_partA.mp3: 16.30s (489 frames) -> Frame 15 to 505
  // Breathing pause: Frame 505 to 540 (35 frames / 1.2s)
  // scene3_partB.mp3: 3.70s (111 frames) -> Frame 540 to 655
  const subtitles = [
    {
      text: "Bukan sekadar ringkasan teks di layar chat.",
      startFrame: 15,
      endFrame: 105,
    },
    {
      text: "Sebuah dokumen penawaran sah berstandar idsMED... lengkap dengan syarat ketentuan dan legalitas.",
      startFrame: 110,
      endFrame: 330,
    },
    {
      text: "Hingga rincian spesifikasi unit — siap dikirimkan langsung ke tangan direksi rumah sakit.",
      startFrame: 335,
      endFrame: 505,
    },
    {
      text: "Deliver real results. Ready for your customer.",
      startFrame: 540,
      endFrame: 665,
      isTagline: true,
    },
  ];

  // Camera slow cinematic zoom:
  const zoomIn = interpolate(frame, [0, 690], [1.02, 1.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panY = interpolate(frame, [0, 690], [10, -25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Audio VO Part A: Frame 15 to 505 (16.3s) */}
      <Sequence from={15} durationInFrames={495}>
        <Audio src={staticFile("audio/jarvis-aria/scene3_partA.mp3")} volume={1.0} />
      </Sequence>

      {/* Audio VO Part B: Frame 540 to 655 (3.7s) - Clean separation after Part A finishes! */}
      <Sequence from={540} durationInFrames={120}>
        <Audio src={staticFile("audio/jarvis-aria/scene3_partB.mp3")} volume={1.0} />
      </Sequence>

      {/* Video playback across the 23 seconds */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${zoomIn}) translateY(${panY}px)`,
          transformOrigin: "center 45%",
        }}
      >
        <Video
          src={staticFile("videos/jarvis-aria/result_quotation.mp4")}
          playbackRate={0.94}
          style={{
            width: 1920,
            height: 1032,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Hologram Badge 1: Legal idsMED Compliance */}
      <AriaHologramBadge
        label="Official Document"
        value="PT IDS Medical Systems"
        subtitle="Masa Berlaku 30 Hari • Tanda Tangan KAM"
        icon="✓"
        accentColor="#00E5FF"
        position={{ top: 120, right: 80 }}
        enterFrame={100}
      />

      {/* Hologram Badge 2: Itemized BOM Table */}
      <AriaHologramBadge
        label="Verified BOM"
        value="9 Item Kelengkapan Unit"
        subtitle="Total: Rp 2.191.362.000 (PPN 11%)"
        icon="📋"
        accentColor="#00FFB2"
        position={{ top: 120, left: 80 }}
        enterFrame={360}
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
