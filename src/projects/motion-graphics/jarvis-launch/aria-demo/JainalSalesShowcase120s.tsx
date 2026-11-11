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
 * JainalSalesShowcase120s
 * 
 * 2-minute (120-second) executive product showcase connecting 6 live prompt-response cycles
 * of Jainal Sales Assistant (idsMED Indonesia) with natural typing pace and extended answer dwell:
 * 
 * 1. Seg 1 (Frames 0 - 600 / 0.0s - 20.0s):
 *    Prompt: "Tolong cek harga price list ya, refer NF4, beserta e-catalog price" (Hamilton C1)
 * 2. Seg 2 (Frames 600 - 1200 / 20.0s - 40.0s):
 *    Prompt: "Tolong cek stock GE Vivid T9 Sekarang yaa"
 * 3. Seg 3 (Frames 1200 - 1800 / 40.0s - 60.0s):
 *    Prompt: "yang incoming dari GE Vivid T9 berapa kira-kira?"
 * 4. Seg 4 (Frames 1800 - 2400 / 60.0s - 80.0s):
 *    Prompt: "Oke sekarang ganti product ya ke hamilton c1, apa saja konfigurasi yang tersedia?"
 * 5. Seg 5 (Frames 2400 - 3000 / 80.0s - 100.0s):
 *    Prompt: "Apa bedanya hamilton c1 dengan SLE 1500?" (Clinical Comparison Matrix)
 * 6. Seg 6 (Frames 3000 - 3600 / 100.0s - 120.0s):
 *    Prompt: "Siapa kompetitor utama Hamilton C1?" (Mindray SV700 Comparison Table)
 * 
 * Total: 3600 frames = Exactly 120.00s (2 minutes) @ 30 FPS.
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
    duration: 600,
    videoSrc: "video/jainal_sales_120s/seg1_pricelist_20s.mp4",
  },
  {
    from: 600,
    duration: 600,
    videoSrc: "video/jainal_sales_120s/seg2_stock_20s.mp4",
  },
  {
    from: 1200,
    duration: 600,
    videoSrc: "video/jainal_sales_120s/seg3_incoming_20s.mp4",
  },
  {
    from: 1800,
    duration: 600,
    videoSrc: "video/jainal_sales_120s/seg4_config_20s.mp4",
  },
  {
    from: 2400,
    duration: 600,
    videoSrc: "video/jainal_sales_120s/seg5_beda_20s.mp4",
  },
  {
    from: 3000,
    duration: 600,
    videoSrc: "video/jainal_sales_120s/seg6_kompetitor_20s.mp4",
  },
];

export const JainalSalesShowcase120s: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Master fade-in at frame 0 and fade-out at end (3570 - 3600)
  const masterFade = interpolate(
    frame,
    [0, 15, 3570, 3600],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Audio volume curve: smooth fade-in over 15 frames, subtle fade-out over last 90 frames (3 seconds)
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
      {/* Background Master Audio: ARIA Electronic Tech Groove */}
      <Audio
        src={staticFile("audio/jarvis-aria/jarvis_aria_soundtrack_120s.mp3")}
        volume={audioVolume}
      />

      {/* Render 6 Authentic Live Demo Segments (20s each) */}
      {SEGMENTS.map((seg, idx) => {
        return (
          <Sequence
            key={idx}
            from={seg.from}
            durationInFrames={seg.duration}
          >
            {(() => {
              const relFrame = frame - seg.from;

              // Camera subtle push-in during typing (0 - 180 frames / 6s) and stable dwell during answer (180 - 600 frames)
              const cameraScale = interpolate(
                relFrame,
                [0, 180, 240, 560, 600],
                [1.0, 1.035, 1.015, 1.01, 1.0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              const cameraPanY = interpolate(
                relFrame,
                [0, 180, 240, 560, 600],
                [0, -14, 6, 2, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              // Segment cross-fade (in for 10 frames, out for 10 frames at boundaries)
              const segFade =
                idx === 0
                  ? interpolate(relFrame, [590, 600], [1, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : idx === 5
                  ? interpolate(relFrame, [0, 10], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : interpolate(relFrame, [0, 10, 590, 600], [0, 1, 1, 0], {
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
