import { EP6_SEGMENTS, EP6_TOTAL_FRAMES, Ep6Segment } from "./ep6_scenes";

export const XFADE = 14;

export interface Ep6Shot {
  index: number;
  image: string;
  kind: "studio" | "flashback";
  start: number;
  end: number;
  scene: number;
  placeLabel: string;
  segments: Ep6Segment[];
}

export const EP6_SHOTS: Ep6Shot[] = (() => {
  const shots: Ep6Shot[] = [];
  for (const seg of EP6_SEGMENTS) {
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
        placeLabel: seg.place_label || "",
        segments: [seg],
      });
    }
  }
  shots.forEach((s, i) => {
    s.end = i < shots.length - 1 ? shots[i + 1].start : EP6_TOTAL_FRAMES;
  });
  if (shots.length > 0) {
    shots[0].start = 0;
  }
  return shots;
})();

const COOL_KEYS = [
  "scene02_nara_beku_teras_raka",
  "scene05_kamar_kos_setrika",
  "scene10_jabat_tangan_tatapan",
  "scene12_halaman_samping_bisikan",
  "scene13_pamit_pulang_pagar",
  "scene14_jalan_malam_motor",
  "scene15_kamar_kos_tengah_malam",
  "scene16_kedai_part_time_malam",
  "scene17_ruang_keluarga_nara_debat",
  "scene21_perpustakaan_malam_rencana",
];

export const subtitleColor = (image: string, speaker: "raka" | "nara"): string => {
  const cool = COOL_KEYS.some((k) => image.includes(k));
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

const MOVES: CameraMove[] = [
  { s0: 1.0, s1: 1.1, x0: 0, x1: -32, y0: 0, y1: -12 },
  { s0: 1.1, s1: 1.0, x0: 26, x1: 0, y0: -10, y1: 0 },
  { s0: 1.02, s1: 1.11, x0: -22, x1: 24, y0: 8, y1: -8 },
  { s0: 1.0, s1: 1.08, x0: 28, x1: -16, y0: -8, y1: 6 },
];

export const cameraFor = (shotIndex: number): CameraMove => MOVES[shotIndex % MOVES.length];
