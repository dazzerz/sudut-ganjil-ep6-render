import { EP5_SEGMENTS, EP5_TOTAL_FRAMES, Ep5Segment } from "./ep5_scenes";

export const XFADE = 14;

export interface Ep5Shot {
  index: number;
  image: string;
  kind: "studio" | "flashback";
  start: number;
  end: number;
  scene: number;
  segments: Ep5Segment[];
}

// Consecutive dialogue lines that share a background plate form one continuous camera shot,
// so the push-in never resets on every sentence.
export const EP5_SHOTS: Ep5Shot[] = (() => {
  const shots: Ep5Shot[] = [];
  for (const seg of EP5_SEGMENTS) {
    const last = shots[shots.length - 1];
    const kind = seg.visual_type === "flashback" ? "flashback" : "studio";
    if (last && last.image === seg.bg_image && last.kind === kind) {
      last.segments.push(seg);
    } else {
      shots.push({
        index: shots.length,
        image: seg.bg_image,
        kind,
        start: seg.start_frame,
        end: 0,
        scene: seg.scene,
        segments: [seg],
      });
    }
  }
  shots.forEach((s, i) => {
    s.end = i < shots.length - 1 ? shots[i + 1].start : EP5_TOTAL_FRAMES;
  });
  shots[0].start = 0;
  return shots;
})();

export const SHOT_PLACE: Record<string, string> = {
  "images/sudut-ganjil/ep5/sma_teras_protokol.jpg": "JULI 2017  /  TERAS RUMAH NARA",
  "images/sudut-ganjil/ep5/sma_kamar_raka_overthinking.jpg": "JULI 2017  /  KAMAR RAKA, 23:40",
  "images/sudut-ganjil/ep5/sma_kafe_seberang_kaca.jpg": "JULI 2017  /  SEBERANG KAFE",
  "images/sudut-ganjil/ep5/sma_tribun_sore.jpg": "JULI 2017  /  TRIBUN LAPANGAN SEKOLAH",
  "images/sudut-ganjil/ep5/sma_robek_protokol.jpg": "JULI 2017  /  TRIBUN, SENJA",
  "images/sudut-ganjil/ep5/kampus_gerbang_ospek.jpg": "AGUSTUS 2017  /  GERBANG KAMPUS, HARI PERTAMA OSPEK",
};

// Subtitle palette follows the plate: warm plates -> white / cyan, cool plates -> amber / lime.
const COOL = [
  "sma_kamar_raka_overthinking",
  "sma_kafe_seberang_kaca",
  "kampus_gerbang_ospek",
];

export const subtitleColor = (image: string, speaker: "raka" | "nara"): string => {
  const cool = COOL.some((k) => image.includes(k));
  if (cool) return speaker === "raka" ? "#FFE600" : "#70FF00";
  return speaker === "raka" ? "#FFFFFF" : "#00F2FE";
};

interface CameraMove {
  s0: number;
  s1: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

// Alternating push-in / drift presets, picked per shot index.
const MOVES: CameraMove[] = [
  { s0: 1.0, s1: 1.1, x0: 0, x1: -34, y0: 0, y1: -14 },
  { s0: 1.1, s1: 1.0, x0: 28, x1: 0, y0: -12, y1: 0 },
  { s0: 1.02, s1: 1.12, x0: -24, x1: 26, y0: 8, y1: -10 },
  { s0: 1.0, s1: 1.08, x0: 30, x1: -18, y0: -8, y1: 6 },
];

export const cameraFor = (shotIndex: number): CameraMove => MOVES[shotIndex % MOVES.length];
