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

export const EP4_SHORT3_SEGMENTS: ShortSegment[] = [
  {
    id: "ep4_33_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep4/ep4_33_nara.mp3",
    duration_sec: 8.4,
    duration_frames: 252,
    start_frame: 0,
    clean_text:
      "Masalahnya, kita cuma punya satu payung lipat kecil warna biru tua... dan salah satu jari-jari besinya udah patah!",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
  {
    id: "ep4_34_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep4/ep4_34_raka.mp3",
    duration_sec: 11.96,
    duration_frames: 359,
    start_frame: 258,
    clean_text:
      "Karena payungnya sempit, bahu kanan gue dan bahu kiri Nara mau nggak mau nempel terus sepanjang jalan trotoar. Lampu jalan kuning mantul indah banget di aspal basah.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep4/sma_satu_payung_vertical.jpg",
  },
  {
    id: "ep4_36_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep4/ep4_36_raka.mp3",
    duration_sec: 11.32,
    duration_frames: 340,
    start_frame: 623,
    clean_text:
      "Payungnya sengaja lebih banyak gue miringin ke sisi Nara. Bahu kiri gue basah kuyup kena rintik gerimis, tapi hati gue hangatnya luar biasa.",
    visual_type: "flashback",
    bg_image: "images/sudut-ganjil/ep4/sma_satu_payung_vertical.jpg",
  },
  {
    id: "ep4_43_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep4/ep4_43_raka.mp3",
    duration_sec: 13.6,
    duration_frames: 408,
    start_frame: 969,
    clean_text:
      "Buat kalian yang hari ini mungkin ngerasa minder karena dompet lagi tipis pas lagi deketin seseorang... percaya deh, orang yang tepat nggak akan pernah menilai ketulusan kalian dari isi dompet.",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "short_cta_raka_full",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_raka_full.mp3",
    duration_sec: 6.12,
    duration_frames: 184,
    start_frame: 1383,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const EP4_SHORT3_TOTAL_FRAMES = 1575; // ~52.5 detik (@ 30 fps)

export const SudutGanjilEp4Short3: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = EP4_SHORT3_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? EP4_SHORT3_SEGMENTS[activeSegmentIndex]
      : EP4_SHORT3_SEGMENTS[EP4_SHORT3_SEGMENTS.length - 1];

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
        title="SATU PAYUNG GERIMIS"
        subtitle="SUDUT GANJIL • EP. 04"
        hookHeadline="ORANG YANG TEPAT NGGAK NILAI DARI DOMPET ❤️"
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
          topicTitle="EP. 04 | SATU PAYUNG GERIMIS"
        />
      )}

      {/* 5. Audio Sequences */}
      {EP4_SHORT3_SEGMENTS.map((seg) => (
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
