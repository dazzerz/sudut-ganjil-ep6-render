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

export const SHORT1_SEGMENTS: ShortSegment[] = [
  {
    id: "ep1_04_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/ep1_04_nara.mp3",
    duration_sec: 15.32,
    duration_frames: 460,
    start_frame: 0,
    clean_text:
      "Pemicu terbesarnya itu sering kali sesederhana kita buka Instagram atau LinkedIn sebelum tidur. Teman seangkatan ada yang baru naik jabatan jadi Assistant Manager, ada yang lagi liburan ke Labuan Bajo, ada yang beli mobil baru...",
    visual_type: "cutaway",
    bg_image: "images/sudut-ganjil/cutaway_nara_medsos_16x9.jpg",
  },
  {
    id: "ep1_05_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/ep1_05_raka.mp3",
    duration_sec: 16.04,
    duration_frames: 481,
    start_frame: 466,
    clean_text:
      "Sedangkan kita? Di kasur kosan, lagi mikir keras: 'Besok makan siang apa ya yang harganya di bawah dua puluh lima ribu?' Otak kita otomatis ngebisikin: 'Gila, lu tertinggal jauh banget, Ka'.",
    visual_type: "cutaway",
    bg_image: "images/sudut-ganjil/cutaway_raka_kosan_16x9.jpg",
  },
  {
    id: "ep1_06_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/ep1_06_nara.mp3",
    duration_sec: 10.56,
    duration_frames: 317,
    start_frame: 953,
    clean_text:
      "Padahal yang kita bandingin itu nggak adil. Kita ngebandingin seluruh kepanikan di balik layar hidup kita, dengan lima detik panggung terbaik orang lain di media sosial.",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
  {
    id: "short1_raka_punchline",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/short1_raka_punchline.mp3",
    duration_sec: 8.12,
    duration_frames: 244,
    start_frame: 1276,
    clean_text:
      "Secara psikologis, jutaan anak muda lainnya di luar sana juga sama-sama lagi bingung dan berjuang dalam hening.",
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
    start_frame: 1526,
    clean_text:
      "Obrolan lengkapnya udah tayang di video panjang. Tonton full episodenya di channel YouTube Sudut Ganjil ya!",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
];

export const SHORT1_TOTAL_FRAMES = 1735; // ~57.8 detik (@ 30 fps)

export const SudutGanjilShort1: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = SHORT1_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? SHORT1_SEGMENTS[activeSegmentIndex]
      : SHORT1_SEGMENTS[SHORT1_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const isCTA = activeSegment.id === "short_cta_raka_full";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {/* 9:16 Vertical Camera Visual Layer */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* Top and Bottom Safe Area HUD */}
      <ShortsHUD
        title="Jebakan Medsos"
        subtitle="POV & Realita Hidup"
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
        topicTitle="Jebakan Medsos: FOMO vs Realita"
      />

      {/* Audio Layer: Dialogue */}
      {SHORT1_SEGMENTS.map((seg) => (
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
