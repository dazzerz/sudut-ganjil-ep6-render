export interface WordItem {
  word: string;
  startFrame: number;
  endFrame: number;
  accentColor?: string;
  isSpecial?: boolean;
}

export interface LyricLine {
  id: string;
  startFrame: number;
  endFrame: number;
  words: WordItem[];
  photoIndex: number; // which photo to show (0 to 4)
  captionTheme?: "default" | "matcha" | "ice" | "amber" | "yellow";
}

// 30 FPS. Timing relative to the trimmed audio (cut starts at 26.2s in original song)
export const LYRIC_LINES: LyricLine[] = [
  {
    id: "line_01",
    startFrame: 6, // 0.20s
    endFrame: 100, // 3.33s
    photoIndex: 0, // img1_wide_yellow_mirror
    captionTheme: "default",
    words: [
      { word: "This", startFrame: 6, endFrame: 18 },
      { word: "bag", startFrame: 19, endFrame: 30, accentColor: "#FFE082" },
      { word: "feels", startFrame: 31, endFrame: 44 },
      { word: "kinda", startFrame: 45, endFrame: 56 },
      { word: "heavy,", startFrame: 57, endFrame: 95, accentColor: "#FFE082" },
    ],
  },
  {
    id: "line_02",
    startFrame: 102, // 3.40s
    endFrame: 350, // 11.67s
    photoIndex: 1, // img2_wide_angle_pose
    captionTheme: "amber",
    words: [
      { word: "just", startFrame: 102, endFrame: 115 },
      { word: "like", startFrame: 116, endFrame: 128 },
      { word: "the", startFrame: 129, endFrame: 138 },
      { word: "thoughts", startFrame: 139, endFrame: 165 },
      { word: "of", startFrame: 166, endFrame: 175 },
      { word: "the", startFrame: 176, endFrame: 185 },
      { word: "person", startFrame: 186, endFrame: 215, accentColor: "#FFDE59" },
      { word: "beside", startFrame: 216, endFrame: 245, accentColor: "#FFDE59" },
      { word: "me.", startFrame: 246, endFrame: 340, accentColor: "#FFFFFF" },
    ],
  },
  {
    id: "line_03",
    startFrame: 354, // 11.80s
    endFrame: 445, // 14.83s
    photoIndex: 2, // img3_motion_blur_vibe
    captionTheme: "default",
    words: [
      { word: "It's", startFrame: 355, endFrame: 375 },
      { word: "me,", startFrame: 376, endFrame: 395, accentColor: "#FFFFFF" },
      { word: "myself", startFrame: 396, endFrame: 425, accentColor: "#FFE082" },
      { word: "and", startFrame: 426, endFrame: 445 },
    ],
  },
  {
    id: "line_04",
    startFrame: 448, // 14.93s
    endFrame: 538, // snaps right before drop at 540
    photoIndex: 3, // img4_close_cute_pose
    captionTheme: "yellow",
    words: [
      { word: "IN", startFrame: 450, endFrame: 472 },
      { word: "THE", startFrame: 473, endFrame: 494 },
      { word: "MIRROR", startFrame: 495, endFrame: 538, accentColor: "#FFDE59", isSpecial: true },
    ],
  },
  // --- DROP / CHORUS (BEAT KICKS IN AT 540!) ---
  {
    id: "line_05",
    startFrame: 540, // 18.00s EXACT DROP HIT!
    endFrame: 700, // 23.33s
    photoIndex: 4, // img5_lens_flare_sharp
    captionTheme: "matcha",
    words: [
      { word: "DARN", startFrame: 540, endFrame: 556, accentColor: "#FF6B6B", isSpecial: true },
      { word: "IT!", startFrame: 557, endFrame: 575, accentColor: "#FF6B6B", isSpecial: true },
      { word: "I", startFrame: 576, endFrame: 588 },
      { word: "said", startFrame: 589, endFrame: 605 },
      { word: "I", startFrame: 606, endFrame: 618 },
      { word: "don't", startFrame: 619, endFrame: 630 },
      { word: "like", startFrame: 631, endFrame: 645 },
      { word: "HOT", startFrame: 646, endFrame: 665, accentColor: "#FFA07A" },
      { word: "MATCHA!", startFrame: 666, endFrame: 700, accentColor: "#88D66C", isSpecial: true },
    ],
  },
  {
    id: "line_06",
    startFrame: 702, // 23.40s
    endFrame: 820, // 27.33s
    photoIndex: 0, // img1_wide_yellow_mirror
    captionTheme: "ice",
    words: [
      { word: "I", startFrame: 704, endFrame: 715 },
      { word: "asked", startFrame: 716, endFrame: 730 },
      { word: "for", startFrame: 731, endFrame: 742 },
      { word: "the", startFrame: 743, endFrame: 755 },
      { word: "EXTRA", startFrame: 756, endFrame: 780, accentColor: "#5CE1E6" },
      { word: "ICE 🧊", startFrame: 781, endFrame: 820, accentColor: "#5CE1E6", isSpecial: true },
    ],
  },
  {
    id: "line_07",
    startFrame: 822, // 27.40s
    endFrame: 950, // 31.67s
    photoIndex: 2, // img3_motion_blur_vibe
    captionTheme: "amber",
    words: [
      { word: "DAMMIT", startFrame: 825, endFrame: 855, accentColor: "#FF8C32" },
      { word: "THE", startFrame: 856, endFrame: 875 },
      { word: "BARISTA ☕", startFrame: 876, endFrame: 940, accentColor: "#FFE082", isSpecial: true },
    ],
  },
  {
    id: "line_08",
    startFrame: 954, // 31.80s
    endFrame: 1084, // 36.13s
    photoIndex: 3, // img4_close_cute_pose
    captionTheme: "yellow",
    words: [
      { word: "Complain?", startFrame: 955, endFrame: 980, accentColor: "#FFDE59" },
      { word: "I'm", startFrame: 981, endFrame: 995 },
      { word: "just", startFrame: 996, endFrame: 1010 },
      { word: "gonna", startFrame: 1011, endFrame: 1025 },
      { word: "miss", startFrame: 1026, endFrame: 1045 },
      { word: "the", startFrame: 1046, endFrame: 1058 },
      { word: "TRAIN 🚆", startFrame: 1059, endFrame: 1084, accentColor: "#FFDE59", isSpecial: true },
    ],
  },
  {
    id: "line_09",
    startFrame: 1086, // 36.20s
    endFrame: 1204, // 40.13s
    photoIndex: 1, // img2_wide_angle_pose
    captionTheme: "default",
    words: [
      { word: "And", startFrame: 1088, endFrame: 1102 },
      { word: "I", startFrame: 1103, endFrame: 1115 },
      { word: "feel", startFrame: 1116, endFrame: 1130 },
      { word: "I'll", startFrame: 1131, endFrame: 1145 },
      { word: "look", startFrame: 1146, endFrame: 1160 },
      { word: "so", startFrame: 1161, endFrame: 1175 },
      { word: "LAME 🫠", startFrame: 1176, endFrame: 1204, accentColor: "#E0E0E0" },
    ],
  },
  {
    id: "line_10",
    startFrame: 1206, // 40.20s
    endFrame: 1320, // 44.00s
    photoIndex: 4, // img5_lens_flare_sharp
    captionTheme: "matcha",
    words: [
      { word: "FOR", startFrame: 1208, endFrame: 1225 },
      { word: "THE", startFrame: 1226, endFrame: 1240 },
      { word: "SAKE", startFrame: 1241, endFrame: 1260, accentColor: "#FFE082" },
      { word: "OF", startFrame: 1261, endFrame: 1275 },
      { word: "MATCHA 🍵✨", startFrame: 1276, endFrame: 1320, accentColor: "#88D66C", isSpecial: true },
    ],
  },
];

export const PHOTO_PATHS = [
  "images/hot_matcha/img1_wide_yellow_mirror.jpg",
  "images/hot_matcha/img2_wide_angle_pose.jpg",
  "images/hot_matcha/img3_motion_blur_vibe.jpg",
  "images/hot_matcha/img4_close_cute_pose.jpg",
  "images/hot_matcha/img5_lens_flare_sharp.jpg",
];

export const TOTAL_HOT_MATCHA_FRAMES = 1320; // 44 seconds at 30 FPS
