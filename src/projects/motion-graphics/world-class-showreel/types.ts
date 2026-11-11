// Palette: at most three colors plus black and white
export const PALETTE = {
  black: "#09090B",
  white: "#FAFAF9",
  terracotta: "#D97757", // Accent 1
  matcha: "#70E000",     // Accent 2
  cobalt: "#0284C7",     // Accent 3
};

export const TOTAL_SHOWREEL_FRAMES = 1320; // 44.0 seconds at 30 fps
export const BPM = 100;
export const FRAMES_PER_BEAT = 18; // 30 fps * 60s / 100 BPM = 18 frames

// Smooth non-bouncy exponential easing
export const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

export const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const easeOutQuart = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

export const USER_ASSETS = {
  img1: "images/hot_matcha/img1_wide_yellow_mirror.jpg",
  img2: "images/hot_matcha/img2_wide_angle_pose.jpg",
  img3: "images/hot_matcha/img3_motion_blur_vibe.jpg",
  img4: "images/hot_matcha/img4_close_cute_pose.jpg",
  img5: "images/hot_matcha/img5_lens_flare_sharp.jpg",
};
