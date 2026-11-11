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

export const SHORT2_SEGMENTS: ShortSegment[] = [
  {
    id: "ep1_08_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/ep1_08_raka.mp3",
    duration_sec: 19.96,
    duration_frames: 599,
    start_frame: 0,
    clean_text:
      "Ditambah lagi, ekspektasi masyarakat ke umur 20-an tuh absurd banget. Katanya umur 25 harus udah mandiri, punya tabungan ratusan juta, kalau bisa udah mikirin cicilan rumah. Padahal gaji entry level berapa? Harga rumah naiknya berapa persen setahun? Matematikanya aja udah nggak masuk akal.",
    visual_type: "cutaway",
    bg_image: "images/sudut-ganjil/cutaway_finansial_raka_16x9.jpg",
  },
  {
    id: "ep1_09_nara",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/ep1_09_nara.mp3",
    duration_sec: 15.28,
    duration_frames: 458,
    start_frame: 605,
    clean_text:
      "Banyak dari kita yang masuk kategori sandwich generation. Harus bayar hidup sendiri, sambil mikirin bantu orang tua atau adik. Wajar banget kalau pundak kita terasa berat, karena kita memang lagi memikul banyak hal sekaligus.",
    visual_type: "cutaway",
    bg_image: "images/sudut-ganjil/cutaway_nara_keluarga_16x9.jpg",
  },
  {
    id: "ep1_10_raka",
    character: "raka",
    speaker_voice: "Riko",
    audio_file: "audio/sudut-ganjil-ep1/ep1_10_raka.mp3",
    duration_sec: 14.52,
    duration_frames: 436,
    start_frame: 1069,
    clean_text:
      "Dan yang paling nyesek itu rasa bersalahnya. Mau beli segelas kopi susu dua puluh lima ribu aja mikirnya setengah jam. Rasanya kayak kita nggak berhak menikmati hidup sebelum kita mapan seutuhnya.",
    visual_type: "studio_raka",
    bg_image: "images/sudut-ganjil/studio_raka_vertical.jpg",
  },
  {
    id: "short_cta_nara_full",
    character: "nara",
    speaker_voice: "Sami",
    audio_file: "audio/sudut-ganjil-ep1/short_cta_nara_full.mp3",
    duration_sec: 6.68,
    duration_frames: 200,
    start_frame: 1511,
    clean_text:
      "Mau denger kelanjutan obrolan kita? Yuk tonton versi video panjangnya di channel YouTube Sudut Ganjil!",
    visual_type: "studio_nara",
    bg_image: "images/sudut-ganjil/studio_nara_vertical.jpg",
  },
];

export const SHORT2_TOTAL_FRAMES = 1736; // ~57.9 detik (@ 30 fps)

export const SudutGanjilShort2: React.FC = () => {
  const frame = useCurrentFrame();

  const activeSegmentIndex = SHORT2_SEGMENTS.findIndex(
    (seg) =>
      frame >= seg.start_frame &&
      frame < seg.start_frame + seg.duration_frames + 6
  );

  const activeSegment =
    activeSegmentIndex !== -1
      ? SHORT2_SEGMENTS[activeSegmentIndex]
      : SHORT2_SEGMENTS[SHORT2_SEGMENTS.length - 1];

  const frameInSegment = Math.max(0, frame - activeSegment.start_frame);
  const isCTA = activeSegment.id === "short_cta_nara_full";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0C", overflow: "hidden" }}>
      {/* 9:16 Vertical Camera Visual Layer */}
      <ShortsCameraView
        segment={activeSegment}
        frameInSegment={frameInSegment}
      />

      {/* Top and Bottom Safe Area HUD */}
      <ShortsHUD
        title="Beban Finansial"
        subtitle="Sandwich Generation"
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
        topicTitle="Beban Finansial: Sandwich Generation"
      />

      {/* Audio Layer: Dialogue */}
      {SHORT2_SEGMENTS.map((seg) => (
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
