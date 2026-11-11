import raw from "./scenes.json";

export const FPS = 30;
export const AUDIO_LEAD = 6; // frame jeda sebelum narasi mulai
export const TAIL_SEC = 0.5; // jeda napas setelah narasi
export const CROSSFADE = 10; // frame crossfade antar gambar

export type SceneData = {
  id: number;
  text: string;
  duration: number;
  start: number; // frame mulai adegan
  frames: number; // durasi adegan (frame)
};

let cursor = 0;
export const scenes: SceneData[] = raw.map((s) => {
  const frames = Math.ceil((s.duration + TAIL_SEC) * FPS) + AUDIO_LEAD;
  const item = { ...s, start: cursor, frames };
  cursor += frames;
  return item;
});

export const TOTAL_FRAMES = cursor + CROSSFADE;
