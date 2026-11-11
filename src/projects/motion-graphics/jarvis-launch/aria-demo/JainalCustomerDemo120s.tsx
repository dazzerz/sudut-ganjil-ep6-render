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
 * JainalCustomerDemo120s
 * 
 * 120-second (2-minute) corporate product demo for Jainal · Sales Assistant (Customer Intelligence):
 * 
 * Part 1 (Frames 0 - 1800 / 0.0s - 60.0s):
 *   Prompt: "Hamilton C1 Standard, saya ingin menawarkan unit tersebut ke RSPI Pondok Indah, berikan info customernya dan kontaknya ya"
 *   Response: Verified hospital PIC contacts (names, departments, emails, phone numbers)
 * 
 * Part 2 (Frames 1800 - 3600 / 60.0s - 120.0s):
 *   Prompt: "Rumah sakit tersebut (RSPI Pondok Indah) ada berapa bed dan kelas apa? ada dokter spesialis paru?"
 *   Response: Hospital profile, bed breakdown (15 ICU beds, NICU 9, PICU 0), and comprehensive pulmonary specialist services
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
    videoSrc: "video/jainal_demos_120s/cust_part1_pic_60s.mp4",
  },
  {
    from: 1800,
    duration: 1800,
    videoSrc: "video/jainal_demos_120s/cust_part2_bed_class_60s.mp4",
  },
];

export const JainalCustomerDemo120s: React.FC = () => {
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

              // Camera subtle push-in during typing (0 - 360 frames / 12s) and smooth re-center during answer dwell
              const cameraScale = interpolate(
                relFrame,
                [0, 360, 480, 1720, 1800],
                [1.0, 1.035, 1.015, 1.008, 1.0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              const cameraPanY = interpolate(
                relFrame,
                [0, 360, 480, 1720, 1800],
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
