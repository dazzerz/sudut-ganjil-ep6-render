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

export const NIKAH_SHORT1_SEGMENTS: ShortSegment[] = [
  {
    id: "nikah_10_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_10_raka.mp3",
    duration_sec: 13.2,
    duration_frames: 396,
    start_frame: 0,
    clean_text:
      "Sales wedding organizer langsung nyodorin brosur tebal: 'Paket Spesial All-In Gedung 85 Juta'. Udah termasuk aula, dekorasi, katering 600 porsi, dan video cinematic.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_wedding_fair_vertical.jpg",
  },
  {
    id: "nikah_12_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_12_raka.mp3",
    duration_sec: 10.26,
    duration_frames: 308,
    start_frame: 402,
    clean_text:
      "Itu jebakan ego cowok nomor satu: selalu pengen kelihatan hebat di depan pasangan dan calon mertua. Tapi waktu itu gue lupa ngecek saldo rekening tabungan sendiri.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_wedding_fair_vertical.jpg",
  },
  {
    id: "nikah_14_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_14_raka.mp3",
    duration_sec: 13.36,
    duration_frames: 401,
    start_frame: 716,
    clean_text:
      "Mari kita hitung riil: gaji 5 juta di kota besar, kos 1,5 juta, makan 1,5 juta, bensin motor 500 ribu, kuota listrik 200 ribu, bantu orang tua 500 ribu.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_kalkulator_kosan_vertical.jpg",
  },
  {
    id: "nikah_16_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-nikah/nikah_16_raka.mp3",
    duration_sec: 11.33,
    duration_frames: 340,
    start_frame: 1123,
    clean_text:
      "Sekarang bagi 85 juta dengan 1 juta per bulan. Artinya lu butuh waktu 85 bulan! Tujuh tahun penuh cuma buat ngumpulin biaya pesta 2 jam!",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/nikah-gedung/nikah_kalkulator_kosan_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1469,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const NIKAH_SHORT1_TOTAL_FRAMES = 1659; // ~55.3 detik (@ 30 fps)

export const SudutGanjilNikahShort1: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = NIKAH_SHORT1_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? NIKAH_SHORT1_SEGMENTS[activeSegmentIndex]
      : NIKAH_SHORT1_SEGMENTS[NIKAH_SHORT1_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const isCTA = activeSegment.id === "short_cta_raka_full";

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
        title="POV COWOK: GAJI 5 JUTA"
        subtitle="SUDUT GANJIL • SPESIAL"
        hookHeadline="POV COWOK: GAJI 5 JUTA DIAJAK KE PAMERAN WEDDING 85 JUTA"
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
          topicTitle="SPESIAL | GAJI 5 JUTA NIKAH GEDUNG"
        />
      )}

      {/* 5. Audio Sequences */}
      {NIKAH_SHORT1_SEGMENTS.map((seg) => (
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
