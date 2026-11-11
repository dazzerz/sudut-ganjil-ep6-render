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
 * JainalSOTracingCardiosoftDemo120s
 * 
 * 120-second (2-minute) live demo combining SO Tracing and Tanya Cardiosoft:
 * 
 * Part 1 (Frames 0 - 1800 / 0.0s - 60.0s):
 *   Prompt: "Mau cek SO Open Order Rumah Sakit Umum Pondok Indah"
 *   Response: CT Monitoring tracking for GE Healthcare SOs (SO90072652 & SO90072653),
 *             items indent status (Tonoport VI, Laptop/Printer, Cardiosoft, INNOQ Electrode).
 * 
 * Part 2 (Frames 1800 - 3600 / 60.0s - 120.0s):
 *   Prompt: "kedua SO tersebut cardiosoft kan, cardiosoftnya sudah sampai mana?"
 *   Response: Complete Milestone Table (PO ke GE Healthcare, ETA Gudang idsMED 14 Des 2026,
 *             Outbound & Customer ETA), plus actionable notes on Laptop/Printer and Electrode.
 * 
 * Total: 3600 frames = Exactly 120.00s @ 30 FPS (2 minutes).
 * Audio: ARIA Iconic Tech Soundtrack (jarvis_aria_soundtrack), master 120s edition.
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
    duration: 1800,
    videoSrc: "video/jainal_demos_120s/so_cardio_part1_tracing_60s.mp4",
  },
  {
    from: 1800,
    duration: 1800,
    videoSrc: "video/jainal_demos_120s/so_cardio_part2_cardiosoft_60s.mp4",
  },
];

export const JainalSOTracingCardiosoftDemo120s: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const masterFade = interpolate(
    frame,
    [0, 15, 3570, 3600],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const audioVolume = interpolate(
    frame,
    [0, 20, 3510, 3600],
    [0, 0.85, 0.85, 0],
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
        src={staticFile("audio/jarvis-aria/jarvis_aria_soundtrack_120s.mp3")}
        volume={audioVolume}
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

              // Camera subtle push-in during typing (0 - 300 frames / 10s) and smooth re-center during answer dwell
              const cameraScale = interpolate(
                relFrame,
                [0, 300, 420, 1720, 1800],
                [1.0, 1.035, 1.015, 1.008, 1.0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              const cameraPanY = interpolate(
                relFrame,
                [0, 300, 420, 1720, 1800],
                [0, -14, 6, 2, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              // Segment cross-fade (in for 12 frames, out for 12 frames at boundary)
              const segFade =
                idx === 0
                  ? interpolate(relFrame, [1788, 1800], [1, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : interpolate(relFrame, [0, 12], [0, 1], {
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

      {/* Modern, sleek minimal timeline progress indicator at the very bottom (3px) */}
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
            width: `${(frame / 3600) * 100}%`,
            background: "linear-gradient(90deg, #0284c7, #38bdf8)",
            boxShadow: "0 0 10px #38bdf8",
          }}
        />
      </div>
    </div>
  );
};
