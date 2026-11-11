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

export const MOBIL_SHORT3_SEGMENTS: ShortSegment[] = [
  {
    "id": "d78",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d78.mp3",
    "clean_text": "Tetangga kampung kalian paling cuma memuji mobil kalian selama lima menit, tapi yang harus membayar cicilan dan makan mie instan selama lima tahun adalah diri kalian sendiri.",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/kredit-mobil/shorts/mobil_s3_dipuji_tetangga_vertical.jpg",
    "duration_sec": 11.76,
    "duration_frames": 353,
    "start_frame": 0
  },
  {
    "id": "d75",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d75.mp3",
    "clean_text": "Bandingkan dengan opsi cerdas: kalau kalian butuh mobil hanya untuk mudik seminggu setahun sekali, sewa mobil rental Avanza atau Innova tujuh hari cuma butuh tiga koma lima juta rupiah per tahun!",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/kredit-mobil/shorts/mobil_s3_rugi_166juta_vertical.jpg",
    "duration_sec": 12.76,
    "duration_frames": 383,
    "start_frame": 357
  },
  {
    "id": "d79",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d79.mp3",
    "clean_text": "Pilihlah hidup yang tenang dengan dompet tebal, daripada hidup bergaya tapi setiap malam diteror tagihan utang.",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/kredit-mobil/shorts/mobil_s3_sewa_rental_tenang_vertical.jpg",
    "duration_sec": 8.08,
    "duration_frames": 242,
    "start_frame": 744
  }
];

export const MOBIL_SHORT3_TOTAL_FRAMES = 990; // ~33.0 detik (@ 30 fps)

export const SudutGanjilMobilShort3: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = MOBIL_SHORT3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 4
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? MOBIL_SHORT3_SEGMENTS[activeSegmentIndex]
      : MOBIL_SHORT3_SEGMENTS[MOBIL_SHORT3_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const showEndCallout = frame >= MOBIL_SHORT3_TOTAL_FRAMES - 75; // Subtle final 2.5s callout without blocking

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
        title="GENGSI 5 MENIT"
        subtitle="SUDUT GANJIL • SPECIAL"
        hookHeadline="DIPUJI TETANGGA 5 MENIT, SENGSARA 5 TAHUN!"
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
          frameInCTA={frame - (MOBIL_SHORT3_TOTAL_FRAMES - 75)}
          topicTitle="SPECIAL | GAJI 6 JUTA KREDIT MOBIL"
        />
      )}

      {/* 5. Audio Sequences */}
      {MOBIL_SHORT3_SEGMENTS.map((seg) => (
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
