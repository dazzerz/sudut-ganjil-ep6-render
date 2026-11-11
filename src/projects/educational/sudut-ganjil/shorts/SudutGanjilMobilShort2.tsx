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

export const MOBIL_SHORT2_SEGMENTS: ShortSegment[] = [
  {
    "id": "d22",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d22.mp3",
    "clean_text": "Bapak pemilik kosan langsung mengetuk pintu kamar sambil tersenyum: 'Mas Raka, selamat ya mobil barunya. Tapi mulai bulan ini ada tambahan uang sewa parkir empat ratus lima puluh ribu per bulan ya, soalnya makan tempat motor anak-anak lain.'",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/kredit-mobil/shorts/mobil_s2_parkir_kos_vertical.jpg",
    "duration_sec": 15.88,
    "duration_frames": 476,
    "start_frame": 0
  },
  {
    "id": "d59",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d59.mp3",
    "clean_text": "Di layar ponsel tertulis angka saldo rekening: seratus dua puluh empat ribu rupiah! Padahal tiga hari lagi tanggal lima, yaitu tanggal jatuh tempo autodebet cicilan leasing empat koma satu juta rupiah!",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/kredit-mobil/shorts/mobil_s2_saldo_atm_kritis_vertical.jpg",
    "duration_sec": 15.36,
    "duration_frames": 461,
    "start_frame": 480
  }
];

export const MOBIL_SHORT2_TOTAL_FRAMES = 945; // ~31.5 detik (@ 30 fps)

export const SudutGanjilMobilShort2: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = MOBIL_SHORT2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 4
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? MOBIL_SHORT2_SEGMENTS[activeSegmentIndex]
      : MOBIL_SHORT2_SEGMENTS[MOBIL_SHORT2_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const showEndCallout = frame >= MOBIL_SHORT2_TOTAL_FRAMES - 75; // Subtle final 2.5s callout without blocking

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0C",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. Camera Visual View (100% Native Vertical 9:16 - Zero Cropped Heads) */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* 2. Top Cardless Header & Viral Hook (Zero Boxes) */}
      <ShortsHUD
        title="BIAYA SILUMAN MOBIL"
        subtitle="SUDUT GANJIL • SPECIAL"
        hookHeadline="SALDO SISA 124 RIBU, CICILAN 4,1 JUTA!"
        isCTA={false}
      />

      {/* 3. Floating Kinetic Subtitles (4-word high-speed chunks) */}
      <ShortsSubtitles
        segment={activeSegment}
        frameInSegment={frameInSegment}
        isCTA={showEndCallout}
      />

      {/* 4. Subtle Final Callout (Last 2.5s, Zero Boxes, Zero Emojis) */}
      {showEndCallout && (
        <ShortsCTAOverlay
          isVisible={showEndCallout}
          frameInCTA={frame - (MOBIL_SHORT2_TOTAL_FRAMES - 75)}
          topicTitle="SPECIAL | GAJI 6 JUTA KREDIT MOBIL"
        />
      )}

      {/* 5. Audio Sequences */}
      {MOBIL_SHORT2_SEGMENTS.map((seg) => (
        <Sequence
          key={seg.id}
          from={seg.start_frame}
          durationInFrames={seg.duration_frames}
        >
          <Audio src={staticFile(seg.audio_file)} volume={1.0} />
        </Sequence>
      ))}

      {/* Backsound: Lo-Fi chill */}
      <Audio
        src={staticFile("audio/sudut-ganjil/bgm_chill.mp3")}
        loop
        volume={0.12}
      />
    </AbsoluteFill>
  );
};
