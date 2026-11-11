export interface ShortSegment {
  id: string;
  character: "raka" | "nara";
  speaker_voice: string;
  audio_file: string;
  duration_sec: number;
  duration_frames: number;
  start_frame: number;
  clean_text: string;
  visual_type: "studio_raka" | "studio_nara" | "studio_wide" | "cutaway" | "flashback";
  bg_image: string;
}

export interface ShortConfig {
  id: string;
  title: string;
  subtitle: string;
  segments: ShortSegment[];
  totalFrames: number;
}
