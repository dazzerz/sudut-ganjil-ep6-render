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
 * JainalCustomerDemo60s
 * 
 * 60-second corporate product demo for Jainal · Sales Assistant (Customer Intelligence):
 * 
 * Part 1 (Frames 0 - 900 / 0.0s - 30.0s):
 *   Prompt: "Hamilton C1 Standard, saya ingin menawarkan unit tersebut ke RSPI Pondok Indah, berikan info customernya dan kontaknya ya"
 *   Response: Verified hospital PIC contacts (names, departments, emails, phone numbers)
 * 
 * Part 2 (Frames 900 - 1800 / 30.0s - 60.0s):
 *   Prompt: "Rumah sakit tersebut (RSPI Pondok Indah) ada berapa bed dan kelas apa? ada dokter spesialis paru?"
 *   Response: Hospital profile, bed breakdown (15 ICU beds, NICU 9, PICU 0), and comprehensive pulmonary specialist services
 * 
 * Total: 1800 frames = Exactly 60.00s @ 30 FPS (1 minute).
 * Audio: Soft Corporate Tech Groove (-22 dB LUFS, zero typing noise).
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
    duration: 900,
    videoSrc: "video/jainal_demos_60s/cust_part1_pic.mp4",
  },
  {
    from: 900,
    duration: 900,
    videoSrc: "video/jainal_demos_60s/cust_part2_bed_class.mp4",
  },
];

export const JainalCustomerDemo60s: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const masterFade = interpolate(
    frame,
    [0, 15, 1780, 1800],
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
        src={staticFile("audio/vega_management_showcase_master_60s.mp3")}
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

              // Camera subtle push-in during typing (0 - 240) and smooth re-center during answer dwell (240 - 900)
              const cameraScale = interpolate(
                relFrame,
                [0, 200, 300, 850, 900],
                [1.0, 1.035, 1.015, 1.008, 1.0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              const cameraPanY = interpolate(
                relFrame,
                [0, 200, 320, 850, 900],
                [0, -16, 6, 4, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              const segFade =
                idx === 0
                  ? interpolate(relFrame, [892, 900], [1, 0], {
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
            width: `${(frame / 1800) * 100}%`,
            background: "linear-gradient(90deg, #0284c7, #38bdf8)",
            boxShadow: "0 0 10px #38bdf8",
          }}
        />
      </div>
    </div>
  );
};
