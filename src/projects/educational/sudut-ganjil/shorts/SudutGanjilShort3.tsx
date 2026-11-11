import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ShortsCameraView } from "./ShortsCameraView";
import { ShortsCTAOverlay } from "./ShortsCTAOverlay";
import { ShortsHUD } from "./ShortsHUD";
import { ShortsSubtitles } from "./ShortsSubtitles";
import { ShortSegment } from "./types";

export const SHORT3_SEGMENTS: ShortSegment[] = [
  {
    id: "ep1_16_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/ep1_16_raka.mp3",
    duration_sec: 9.84,
    duration_frames: 295,
    start_frame: 0,
    clean_text:
      "Nah, ini sudut pandang yang ganjil tapi bener: kalau hari ini kamu ngerasa bingung dan hilang arah, itu bukan berarti kamu gagal.",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "ep1_17_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/ep1_17_nara.mp3",
    duration_sec: 14.92,
    duration_frames: 448,
    start_frame: 300,
    clean_text:
      "Justru itu tanda kamu mulai sadar. Dulu kita cuma ngikutin jalur yang dibikin orang tua atau sistem. Sekarang, untuk pertama kalinya dalam hidup, kamu megang kendali kemudi sendiri. Wajar kalau tanganmu gemetar.",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
  {
    id: "ep1_18_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/ep1_18_raka.mp3",
    duration_sec: 10.84,
    duration_frames: 325,
    start_frame: 753,
    clean_text:
      "Kapal yang nggak pernah keluar dermaga emang nggak bakal pernah tersesat, tapi dia juga nggak bakal nemu pulau baru. Tersesat itu bukti kamu lagi bergerak.",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "ep1_20_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/ep1_20_nara.mp3",
    duration_sec: 11.80,
    duration_frames: 354,
    start_frame: 1083,
    clean_text:
      "Yang ada hanyalah keputusan yang kita ambil hari ini, dan gimana kita belajar dari prosesnya besok. Jangan biarkan ketakutan bikin kamu berhenti melangkah sama sekali.",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
  {
    id: "short_cta_raka_short3",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_short3.mp3",
    duration_sec: 5.72,
    duration_frames: 172,
    start_frame: 1442,
    clean_text:
      "Tonton obrolan lengkap kita soal quarter life crisis di video panjang channel Sudut Ganjil sekarang!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const SHORT3_TOTAL_FRAMES = 1680; // ~56.0 detik (@ 30 fps)

export const SudutGanjilShort3: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = SHORT3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? SHORT3_SEGMENTS[activeSegmentIndex]
      : SHORT3_SEGMENTS[SHORT3_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const isCTA = activeSegment.id === "short_cta_raka_short3";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {/* 9:16 Vertical Camera Visual Layer */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* Top and Bottom Safe Area HUD */}
      <ShortsHUD
        title="Quarter Life Crisis"
        subtitle="Hilang Arah Itu Normal"
        isCTA={isCTA}
      />

      {/* Large Floating Kinetic Subtitles */}
      <ShortsSubtitles
        segment={activeSegment}
        frameInSegment={frameInSegment}
        isCTA={isCTA}
      />

      {/* High-Impact CTA Overlay directing to Full Video */}
      <ShortsCTAOverlay
        isVisible={isCTA}
        frameInCTA={frameInSegment}
        topicTitle="Quarter Life Crisis: Hilang Arah"
      />

      {/* Audio Layer: Dialogue */}
      {SHORT3_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.start_frame}
          durationInFrames={seg.duration_frames}
        >
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* Background Music: Chill Lo-Fi with Auto-Ducking */}
      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        volume={0.12}
        loop
      />
    </AbsoluteFill>
  );
};
