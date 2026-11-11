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

export const MOBIL_SHORT1_SEGMENTS: ShortSegment[] = [
  {
    "id": "d00_hook",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d00_hook.mp3",
    "clean_text": "Gaji enam juta nekat cicil mobil empat juta sebulan... pas mudik dipuji tetangga, pas balik ke Jakarta tiap hari cuma makan mie instan dan nomor HP diteror debt collector tiap pagi!",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/kredit-mobil/thumbnail_plate.jpg",
    "duration_sec": 13.68,
    "duration_frames": 410,
    "start_frame": 0
  },
  {
    "id": "d11",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d11.mp3",
    "clean_text": "'Mas, tenang aja, unit hatchback LCGC ini lagi promo besar-besaran! Cukup DP dua puluh lima juta rupiah, mobil langsung bisa dibawa pulang hari ini juga buat persiapan mudik!'",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/kredit-mobil/scene3_dealer_sales_brosur.jpg",
    "duration_sec": 11.36,
    "duration_frames": 341,
    "start_frame": 416
  },
  {
    "id": "d15",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d15.mp3",
    "clean_text": "Pulpen digoreskan ke kolom tanda tangan. Begitu kunci mobil diserahkan, dada rasanya membusung bangga. Rasanya seperti sudah menjadi pria mapan seutuhnya.",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/nikah-gedung/nikah_wedding_fair_vertical.jpg",
    "duration_sec": 11.24,
    "duration_frames": 337,
    "start_frame": 763
  },
  {
    "id": "d19",
    "character": "nara",
    "speaker_voice": "Sami",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d19.mp3",
    "clean_text": "Dengan tenor lima tahun atau enam puluh bulan bunga flat delapan persen, total bunga leasing mencapai enam puluh satu juta rupiah! Cicilan pokok plus asuransi menjadi empat juta seratus ribu per bulan!",
    "visual_type": "flashback",
    "bg_image": "images/sudut-ganjil/nikah-gedung/nikah_kalkulator_kosan_vertical.jpg",
    "duration_sec": 15.04,
    "duration_frames": 451,
    "start_frame": 1106
  },
  {
    "id": "d20",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-kredit-mobil/d20.mp3",
    "clean_text": "Gaji enam juta dipotong cicilan empat koma satu juta... artinya uang yang tersisa di dompet tinggal satu juta sembilan ratus ribu rupiah untuk bertahan hidup tiga puluh hari!",
    "visual_type": "studio_raka",
    "bg_image": "images/sudut-ganjil/studio_raka_vertical.jpg",
    "duration_sec": 13.44,
    "duration_frames": 403,
    "start_frame": 1563
  },
  {
    "id": "short_cta_raka_full",
    "character": "raka",
    "speaker_voice": "Riko",
    "audio_file": "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    "clean_text": "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    "visual_type": "studio_raka",
    "bg_image": "images/sudut-ganjil/studio_raka_vertical.jpg",
    "duration_sec": 6.12,
    "duration_frames": 184,
    "start_frame": 1972
  }
];

export const MOBIL_SHORT1_TOTAL_FRAMES = 2162; // ~72.1 detik (@ 30 fps)

export const SudutGanjilMobilShort1: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = MOBIL_SHORT1_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? MOBIL_SHORT1_SEGMENTS[activeSegmentIndex]
      : MOBIL_SHORT1_SEGMENTS[MOBIL_SHORT1_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const isCTA = activeSegment.id.startsWith("short_cta");

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0C",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. Camera Visual View (Native Vertical 9:16) */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* 2. Top Header HUD Safe Zone */}
      <ShortsHUD
        title="POV: GAJI 6 JUTA KREDIT MOBIL"
        subtitle="SUDUT GANJIL • SPECIAL"
        hookHeadline="POV: GAJI 6 JUTA NEKAT CICIL MOBIL 4 JUTA DEMI MUDIK DIPUJI TETANGGA"
        isCTA={isCTA}
      />

      {/* 3. Floating Kinetic Subtitles */}
      <ShortsSubtitles
        segment={activeSegment}
        frameInSegment={frameInSegment}
        isCTA={isCTA}
      />

      {/* 4. End-Card CTA Overlay */}
      {isCTA && (
        <ShortsCTAOverlay
          isVisible={isCTA}
          frameInCTA={frameInSegment}
          topicTitle="SPECIAL | GAJI 6 JUTA KREDIT MOBIL"
        />
      )}

      {/* 5. Audio Sequences */}
      {MOBIL_SHORT1_SEGMENTS.map((seg) => (
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
