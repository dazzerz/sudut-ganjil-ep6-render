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

export const Scene2CreateQuotation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total duration: 960 frames (32.0s @ 30 FPS)
  const subtitles = [
    {
      text: "Butuh penawaran harga resmi di depan customer?",
      startFrame: 15,
      endFrame: 110,
    },
    {
      text: "Tidak perlu menunggu kembali ke kantor.",
      startFrame: 115,
      endFrame: 220,
    },
    {
      text: "ARIA memeriksa pricelist resmi, kalkulasi pajak, dan menyajikan opsi paket konfigurasi secara presisi.",
      startFrame: 225,
      endFrame: 410,
    },
    {
      text: "Pilih paket yang diinginkan... dan surat penawaran harga langsung terbit dalam hitungan detik.",
      startFrame: 415,
      endFrame: 600,
    },
    {
      text: "Draft the quotation. In seconds, not hours.",
      startFrame: 780,
      endFrame: 910,
      isTagline: true,
    },
  ];

  // Camera zoom & pan:
  // 0 - 240: Scale 1.0 (typing & send)
  // 240 - 580: Zoom into packages table (scale 1.22)
  // 580 - 960: Focus on DOCX card
  const zoomIn = interpolate(
    frame,
    [200, 320, 580, 680],
    [1.0, 1.22, 1.22, 1.18],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const panY = interpolate(
    frame,
    [200, 320, 580, 680],
    [0, 60, 60, -40],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
      {/* Audio VO Part A: Frame 15 to 605 */}
      <Sequence from={15} durationInFrames={590}>
        <Audio src={staticFile("audio/jarvis-aria/scene2_partA.mp3")} volume={1.0} />
      </Sequence>

      {/* Audio VO Part B: Frame 780 to 900 (Clean pause after Part A) */}
      <Sequence from={780} durationInFrames={120}>
        <Audio src={staticFile("audio/jarvis-aria/scene2_partB.mp3")} volume={1.0} />
      </Sequence>

      {/* Video with tight pacing cutting idle moments */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${zoomIn}) translateY(${panY}px)`,
          transformOrigin: "center 40%",
        }}
      >
        {/* Clip 1: Finishing typing SPH & sending (0 - 210 frames = 7s) */}
        <Sequence from={0} durationInFrames={210}>
          <Video
            src={staticFile("videos/jarvis-aria/aria_create_quotation.mp4")}
            startFrom={450} // source second 15
            style={{
              width: 1920,
              height: 1032,
              objectFit: "contain",
            }}
          />
        </Sequence>

        {/* Clip 2: Fast forward over loading (210 - 260 frames) */}
        <Sequence from={210} durationInFrames={50}>
          <Video
            src={staticFile("videos/jarvis-aria/aria_create_quotation.mp4")}
            startFrom={750}
            playbackRate={6}
            style={{
              width: 1920,
              height: 1032,
              objectFit: "contain",
            }}
          />
        </Sequence>

        {/* Clip 3: Table Options & choosing Basic (260 - 580 frames = 10.6s) */}
        <Sequence from={260} durationInFrames={320}>
          <Video
            src={staticFile("videos/jarvis-aria/aria_create_quotation.mp4")}
            startFrom={1260} // source second 42
            style={{
              width: 1920,
              height: 1032,
              objectFit: "contain",
            }}
          />
        </Sequence>

        {/* Clip 4: DOCX Result Generated (580 - 960 frames = 12.6s) */}
        <Sequence from={580} durationInFrames={380}>
          <Video
            src={staticFile("videos/jarvis-aria/aria_create_quotation.mp4")}
            startFrom={2010} // source second 67 (DOCX appears)
            style={{
              width: 1920,
              height: 1032,
              objectFit: "contain",
            }}
          />
        </Sequence>
      </div>

      {/* Hologram Badge 1: Catalog Package Config */}
      <AriaHologramBadge
        label="Pricing Engine"
        value="8 Paket Terkonfigurasi"
        subtitle="Hamilton C6 Basic • Rp 2.191.362.000"
        icon="⚡"
        accentColor="#00E5FF"
        position={{ top: 120, right: 80 }}
        enterFrame={300}
      />

      {/* Hologram Badge 2: Official Document Generated */}
      <AriaHologramBadge
        label="DOCX Ready"
        value="Quotation RS Abdi Waluyo"
        subtitle="PPN 11% Included • Ready to send"
        icon="📄"
        accentColor="#00FFB2"
        position={{ top: 120, left: 80 }}
        enterFrame={680}
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
