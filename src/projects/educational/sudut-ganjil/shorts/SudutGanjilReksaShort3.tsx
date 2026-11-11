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

export const REKSA_SHORT3_SEGMENTS: ShortSegment[] = [
  {
    "id": "reksa_53_nara",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_53_nara.mp3",
    "clean_text": "Mari kita lihat angkanya: modal pokok yang kita setor selama 60 bulan adalah 120 juta rupiah.",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/reksa-dana/shorts/reksa_s1_aplikasi_dca_vertical.jpg",
    "duration_sec": 8.36,
    "duration_frames": 251,
    "start_frame": 0
  },
  {
    "id": "reksa_54_raka",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_54_raka.mp3",
    "clean_text": "Dan total saldo bersih yang tertera di layar adalah... 146 juta 953 ribu 712 rupiah!",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/nikah-gedung/nikah_kontrakan_bahagia_vertical.jpg",
    "duration_sec": 14.84,
    "duration_frames": 445,
    "start_frame": 255
  },
  {
    "id": "reksa_63_nara",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-reksa-dana/reksa_63_nara.mp3",
    "clean_text": "Memulai kehidupan rumah tangga dengan rumah sendiri, akad yang tenang, dan nol rupiah utang adalah kemewahan sejati yang tidak ternilai harganya.",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/nikah-gedung/nikah_kua_asri_vertical.jpg",
    "duration_sec": 10.2,
    "duration_frames": 306,
    "start_frame": 704
  }
];

export const REKSA_SHORT3_TOTAL_FRAMES = 1014; // ~33.8 detik (@ 30 fps)

export const SudutGanjilReksaShort3: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = REKSA_SHORT3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 4
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? REKSA_SHORT3_SEGMENTS[activeSegmentIndex]
      : REKSA_SHORT3_SEGMENTS[REKSA_SHORT3_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const showEndCallout = frame >= REKSA_SHORT3_TOTAL_FRAMES - 75; // Subtle final 2.5s callout without blocking

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
        title="HASIL 5 TAHUN"
        subtitle="SUDUT GANJIL • SPECIAL"
        hookHeadline="GAJI 5 JUTA TEMBUS RP146 JUTA DALAM 5 TAHUN!"
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
          frameInCTA={frame - (REKSA_SHORT3_TOTAL_FRAMES - 75)}
          topicTitle="SPECIAL | REKSA DANA 5 TAHUN"
        />
      )}

      {/* 5. Audio Sequences */}
      {REKSA_SHORT3_SEGMENTS.map((seg) => (
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
