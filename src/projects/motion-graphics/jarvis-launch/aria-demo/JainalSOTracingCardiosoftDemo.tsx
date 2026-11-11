import React from "react";
import {
  Audio,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * JainalSOTracingCardiosoftDemo
 * 
 * 110-second (1 min 50s) live demo combining SO Tracing and Tanya Cardiosoft:
 * 
 * Part 1 (Frames 0 - 1650 / 0.0s - 55.0s):
 *   Prompt: "Mau cek SO Open Order Rumah Sakit Umum Pondok Indah"
 *   Response: CT Monitoring tracking for GE Healthcare SOs (SO90072652 & SO90072653),
 *             items indent status (Tonoport VI, Laptop/Printer, Cardiosoft, INNOQ Electrode).
 * 
 * Part 2 (Frames 1650 - 3300 / 55.0s - 110.0s):
 *   Prompt: "kedua SO tersebut cardiosoft kan, cardiosoftnya sudah sampai mana?"
 *   Response: Complete Milestone Table (PO ke GE Healthcare, ETA Gudang idsMED 14 Des 2026,
 *             Outbound & Customer ETA), plus actionable notes on Laptop/Printer and Electrode.
 * 
 * Total: 3300 frames = Exactly 110.00s @ 30 FPS (1 minute 50 seconds, strictly <= 2 minutes).
 * Audio: Looped Corporate Tech Groove (110s, zero typing noise, -22 dB LUFS).
 * UI: 100% authentic recording, zero artificial cards, zero fabrication.
 */

interface SegmentConfig {
  from: number;
  duration: number;
  videoSrc: string;
}

const SEGMENTS: SegmentConfig[] = [
  {
    from: 0,
    duration: 1650,
    videoSrc: "video/jainal_so_pair/so_tracing_part1_55s.mp4",
  },
  {
    from: 1650,
    duration: 1650,
    videoSrc: "video/jainal_so_pair/tanya_cardiosoft_part2_55s.mp4",
  },
];

export const JainalSOTracingCardiosoftDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const masterFade = interpolate(
    frame,
    [0, 15, 3280, 3300],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0b0f19",
        position: "relative",
        overflow: "hidden",
        opacity: masterFade,
      }}
    >
      <Audio
        src={staticFile("audio/jainal_demo_bgm_110s.mp3")}
        volume={0.85}
      />

      {SEGMENTS.map((seg, idx) => {
        return (
          <Sequence
            key={idx}
            from={seg.from}
            durationInFrames={seg.duration}
          >
            {(() => {
              const relFrame = frame - seg.from;

              // Camera subtle push-in during typing (0 - 240) and smooth re-center during answer dwell (240 - 1650)
              const cameraScale = interpolate(
                relFrame,
                [0, 240, 360, 1580, 1650],
                [1.0, 1.035, 1.015, 1.008, 1.0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              const cameraPanY = interpolate(
                relFrame,
                [0, 240, 380, 1580, 1650],
                [0, -16, 6, 4, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              const segFade =
                idx === 0
                  ? interpolate(relFrame, [1642, 1650], [1, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : interpolate(relFrame, [0, 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    });

              return (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: segFade,
                    transform: `scale(${cameraScale}) translateY(${cameraPanY}px)`,
                    transformOrigin: "center center",
                  }}
                >
                  <OffthreadVideo
                    src={staticFile(seg.videoSrc)}
                    style={{
                      width: 1920,
                      height: 1008,
                      boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                    }}
                  />
                </div>
              );
            })()}
          </Sequence>
        );
      })}

      {/* Minimal timeline progress indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 50,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / 3300) * 100}%`,
            background: "linear-gradient(90deg, #0284c7, #38bdf8)",
            boxShadow: "0 0 10px #38bdf8",
          }}
        />
      </div>
    </div>
  );
};
