export interface ShotCut {
  id: string;
  startFrame: number;
  endFrame: number;
  photoIndex: number; // 0 to 4
  transition: "cut" | "whip-left" | "whip-right" | "zoom-snap" | "flash-drop";
  baseScale: number;
  zoomSpeed: number; // positive = zoom in, negative = zoom out
  panDirection?: "left" | "right" | "up" | "none";
}

// 100 BPM grid: 1 beat = 18 frames at 30 fps.
// Bar 1 starts around frame 27.
// The Chorus Drop is at frame 540 (18.0s).
export const SHOT_CUTS: ShotCut[] = [
  // --- VERSE 1: Build-up with smooth but rhythmic cuts ---
  {
    id: "shot_01",
    startFrame: 0,
    endFrame: 90, // 5 beats (3.0s)
    photoIndex: 0, // Wide yellow mirror
    transition: "zoom-snap",
    baseScale: 1.02,
    zoomSpeed: 0.05,
    panDirection: "none",
  },
  {
    id: "shot_02",
    startFrame: 90,
    endFrame: 180, // 5 beats (3.0s) - "thoughts of the"
    photoIndex: 1, // Wide angle pose
    transition: "whip-left",
    baseScale: 1.08,
    zoomSpeed: -0.04,
    panDirection: "right",
  },
  {
    id: "shot_03",
    startFrame: 180,
    endFrame: 270, // 5 beats (3.0s) - "person beside me"
    photoIndex: 3, // Close cute pose
    transition: "zoom-snap",
    baseScale: 1.04,
    zoomSpeed: 0.06,
    panDirection: "none",
  },
  {
    id: "shot_04",
    startFrame: 270,
    endFrame: 360, // 5 beats (3.0s) - "It's me myself and..."
    photoIndex: 2, // Motion blur vibe
    transition: "whip-right",
    baseScale: 1.06,
    zoomSpeed: -0.03,
    panDirection: "left",
  },
  {
    id: "shot_05",
    startFrame: 360,
    endFrame: 450, // 5 beats (3.0s) - "...the mirror"
    photoIndex: 0, // Back to wide yellow mirror
    transition: "zoom-snap",
    baseScale: 1.03,
    zoomSpeed: 0.08,
    panDirection: "none",
  },
  {
    id: "shot_06_pre_drop",
    startFrame: 450,
    endFrame: 540, // 5 beats (3.0s) - Pre-drop tension
    photoIndex: 4, // Sharp lens flare
    transition: "whip-left",
    baseScale: 1.08,
    zoomSpeed: 0.1,
    panDirection: "none",
  },

  // --- CHORUS / DROP (HIGH ENERGY BEAT-CUTS!) ---
  // "DARN IT!" (Drop hit at frame 540!)
  {
    id: "drop_01_darn_it",
    startFrame: 540,
    endFrame: 576, // 2 beats (1.2s)
    photoIndex: 0, // Wide yellow mirror punch
    transition: "flash-drop",
    baseScale: 1.15,
    zoomSpeed: -0.08,
  },
  // "I said I don't like..."
  {
    id: "drop_02_said",
    startFrame: 576,
    endFrame: 612, // 2 beats (1.2s)
    photoIndex: 3, // Close cute pose
    transition: "whip-right",
    baseScale: 1.05,
    zoomSpeed: 0.06,
  },
  // "HOT MATCHA!"
  {
    id: "drop_03_hot_matcha",
    startFrame: 612,
    endFrame: 702, // 5 beats (3.0s)
    photoIndex: 4, // Lens flare sharp hero shot
    transition: "flash-drop",
    baseScale: 1.12,
    zoomSpeed: 0.05,
  },
  // "I asked for the..."
  {
    id: "drop_04_asked",
    startFrame: 702,
    endFrame: 738, // 2 beats (1.2s)
    photoIndex: 2, // Motion blur vibe
    transition: "whip-left",
    baseScale: 1.06,
    zoomSpeed: -0.04,
  },
  // "...EXTRA ICE 🧊"
  {
    id: "drop_05_extra_ice",
    startFrame: 738,
    endFrame: 810, // 4 beats (2.4s)
    photoIndex: 1, // Space bekasi wide angle
    transition: "zoom-snap",
    baseScale: 1.14,
    zoomSpeed: -0.06,
  },
  // "DAMMIT THE BARISTA ☕"
  {
    id: "drop_06_barista",
    startFrame: 810,
    endFrame: 900, // 5 beats (3.0s)
    photoIndex: 3, // Cute selfie with cup
    transition: "flash-drop",
    baseScale: 1.08,
    zoomSpeed: 0.06,
  },

  // --- VERSE 2 / POST-CHORUS GROOVE ---
  // "Complain?"
  {
    id: "groove_01_complain",
    startFrame: 900,
    endFrame: 954, // 3 beats (1.8s)
    photoIndex: 0, // Wide yellow mirror
    transition: "whip-right",
    baseScale: 1.05,
    zoomSpeed: 0.04,
  },
  // "I'm just gonna miss the train 🚆"
  {
    id: "groove_02_train",
    startFrame: 954,
    endFrame: 1044, // 5 beats (3.0s)
    photoIndex: 1, // Wide angle pose
    transition: "zoom-snap",
    baseScale: 1.1,
    zoomSpeed: -0.05,
  },
  // "And I feel I'll look so lame"
  {
    id: "groove_03_lame",
    startFrame: 1044,
    endFrame: 1116, // 4 beats (2.4s)
    photoIndex: 3, // Cute pout pose
    transition: "whip-left",
    baseScale: 1.04,
    zoomSpeed: 0.05,
  },

  // --- OUTRO CLIMAX RAPID MONTAGE (On-the-beat staccato cuts!) ---
  {
    id: "outro_01",
    startFrame: 1116,
    endFrame: 1134, // 1 beat (18 frames!)
    photoIndex: 2, // motion blur
    transition: "zoom-snap",
    baseScale: 1.12,
    zoomSpeed: -0.04,
  },
  {
    id: "outro_02",
    startFrame: 1134,
    endFrame: 1152, // 1 beat (18 frames!)
    photoIndex: 0, // yellow mirror
    transition: "whip-right",
    baseScale: 1.08,
    zoomSpeed: 0.04,
  },
  {
    id: "outro_03",
    startFrame: 1152,
    endFrame: 1170, // 1 beat (18 frames!)
    photoIndex: 1, // wide angle
    transition: "whip-left",
    baseScale: 1.1,
    zoomSpeed: -0.04,
  },
  {
    id: "outro_04",
    startFrame: 1170,
    endFrame: 1188, // 1 beat (18 frames!)
    photoIndex: 3, // close cute
    transition: "zoom-snap",
    baseScale: 1.06,
    zoomSpeed: 0.04,
  },
  // FINAL HERO SHOT: "FOR THE SAKE OF MATCHA ✨🍵"
  {
    id: "outro_final_hero",
    startFrame: 1188,
    endFrame: 1320, // 7.3s to the end
    photoIndex: 4, // Lens flare sharp hero shot
    transition: "flash-drop",
    baseScale: 1.04,
    zoomSpeed: 0.07,
  },
];
