export interface LyricWord {
  word: string;
  frame: number;
}

export interface LyricLine {
  id: number;
  startFrame: number;
  endFrame: number;
  words: LyricWord[];
}

export const SONG_LYRICS: LyricLine[] = [
  {
    id: 1,
    startFrame: 7,
    endFrame: 97,
    words: [
      { word: "This", frame: 7 },
      { word: "bus", frame: 19 },
      { word: "feels", frame: 30 },
      { word: "kinda", frame: 43 },
      { word: "heavy,", frame: 54 },
      { word: "just", frame: 79 },
      { word: "like", frame: 92 },
    ],
  },
  {
    id: 2,
    startFrame: 97,
    endFrame: 355,
    words: [
      { word: "the", frame: 97 },
      { word: "thoughts", frame: 102 },
      { word: "of", frame: 124 },
      { word: "the", frame: 130 },
      { word: "person", frame: 151 },
      { word: "beside", frame: 174 },
      { word: "me.", frame: 198 },
    ],
  },
  {
    id: 3,
    startFrame: 355,
    endFrame: 451,
    words: [
      { word: "It's", frame: 355 },
      { word: "me,", frame: 367 },
      { word: "myself", frame: 389 },
      { word: "and", frame: 428 },
    ],
  },
  {
    id: 4,
    startFrame: 451,
    endFrame: 547,
    words: [
      { word: "the", frame: 451 },
      { word: "mirror.", frame: 452 },
    ],
  },
  {
    id: 5,
    startFrame: 547,
    endFrame: 704,
    words: [
      { word: "Darn", frame: 547 },
      { word: "it,", frame: 562 },
      { word: "I", frame: 571 },
      { word: "said", frame: 578 },
      { word: "I", frame: 608 },
      { word: "don't", frame: 612 },
      { word: "like", frame: 619 },
      { word: "hot", frame: 630 },
      { word: "matcha.", frame: 643 },
    ],
  },
  {
    id: 6,
    startFrame: 704,
    endFrame: 823,
    words: [
      { word: "I", frame: 704 },
      { word: "just", frame: 708 },
      { word: "want", frame: 716 },
      { word: "the", frame: 722 },
      { word: "extra", frame: 730 },
      { word: "ice.", frame: 748 },
    ],
  },
  {
    id: 7,
    startFrame: 823,
    endFrame: 955,
    words: [
      { word: "Give", frame: 823 },
      { word: "me", frame: 830 },
      { word: "the", frame: 834 },
      { word: "barista.", frame: 839 },
    ],
  },
  {
    id: 8,
    startFrame: 955,
    endFrame: 1088,
    words: [
      { word: "Complain,", frame: 955 },
      { word: "I'm", frame: 992 },
      { word: "just", frame: 996 },
      { word: "gonna", frame: 1003 },
      { word: "miss", frame: 1019 },
      { word: "the", frame: 1027 },
      { word: "train.", frame: 1036 },
    ],
  },
  {
    id: 9,
    startFrame: 1088,
    endFrame: 1207,
    words: [
      { word: "And", frame: 1088 },
      { word: "I", frame: 1094 },
      { word: "feel", frame: 1097 },
      { word: "I", frame: 1106 },
      { word: "look", frame: 1117 },
      { word: "so", frame: 1121 },
      { word: "lame.", frame: 1135 },
    ],
  },
  {
    id: 10,
    startFrame: 1207,
    endFrame: 1260,
    words: [
      { word: "For", frame: 1207 },
      { word: "the", frame: 1212 },
      { word: "sake", frame: 1218 },
      { word: "of", frame: 1226 },
      { word: "my", frame: 1230 },
      { word: "chance.", frame: 1238 },
    ],
  },
];
