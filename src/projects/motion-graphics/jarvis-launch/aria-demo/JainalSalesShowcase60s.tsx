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
 * JainalSalesShowcase60s
 * 
 * 60-second corporate product demo connecting 6 live prompt-response cycles
 * of Jainal Sales Assistant (Aria / idsMED Indonesia) in chronological order:
 * 
 * 1. Seg 1 (Frames 0 - 300 / 0.0s - 10.0s):
 *    Prompt: "Tolong cek harga price list ya, refer NF4, beserta e-catalog price" (Hamilton C1)
 * 2. Seg 2 (Frames 300 - 600 / 10.0s - 20.0s):
 *    Prompt: "Tolong cek stock GE Vivid T9 Sekarang yaa"
 * 3. Seg 3 (Frames 600 - 900 / 20.0s - 30.0s):
 *    Prompt: "yang incoming dari GE Vivid T9 berapa?"
 * 4. Seg 4 (Frames 900 - 1200 / 30.0s - 40.0s):
 *    Prompt: "Oke sekarang ganti product ya ke hamilton c1, apa saja konfigurasi yang tersedia?"
 * 5. Seg 5 (Frames 1200 - 1500 / 40.0s - 50.0s):
 *    Prompt: "Apa bedanya hamilton c1 dengan SLE 1500?" (Clinical Comparison Matrix)
 * 6. Seg 6 (Frames 1500 - 1800 / 50.0s - 60.0s):
 *    Prompt: "Siapa kompetitor utama Hamilton C1?" (Mindray SV700 Comparison Table)
 * 
 * Total: 1800 frames = Exactly 60.00s @ 30 FPS.
 * Audio: Soft corporate tech groove, zero keyboard typing noise.
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
    duration: 300,
    videoSrc: "video/jainal_sales_60s/seg1_pricelist.mp4",
  },
  {
    from: 300,
    duration: 300,
    videoSrc: "video/jainal_sales_60s/seg2_stock.mp4",
  },
  {
    from: 600,
    duration: 300,
    videoSrc: "video/jainal_sales_60s/seg3_incoming.mp4",
  },
  {
    from: 900,
    duration: 300,
    videoSrc: "video/jainal_sales_60s/seg4_config.mp4",
  },
  {
    from: 1200,
    duration: 300,
    videoSrc: "video/jainal_sales_60s/seg5_beda.mp4",
  },
  {
    from: 1500,
    duration: 300,
    videoSrc: "video/jainal_sales_60s/seg6_kompetitor.mp4",
  },
];

export const JainalSalesShowcase60s: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Master fade-in at frame 0 and fade-out at end (1780 - 1800)
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
      {/* Background Master Audio: Soft Groove Tech (-22 dB LUFS, zero typing noise) */}
      <Audio
        src={staticFile("audio/vega_management_showcase_master_60s.mp3")}
        volume={0.85}
      />

      {/* Render 6 Authentic Live Demo Segments */}
      {SEGMENTS.map((seg, idx) => {
        return (
          <Sequence
            key={idx}
            from={seg.from}
            durationInFrames={seg.duration}
          >
            {(() => {
              const relFrame = frame - seg.from;

              // Camera subtle push-in during typing (0 - 90) and smooth re-center during dwell (90 - 300)
              const cameraScale = interpolate(
                relFrame,
                [0, 75, 120, 280, 300],
                [1.0, 1.04, 1.02, 1.01, 1.0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              const cameraPanY = interpolate(
                relFrame,
                [0, 75, 130, 280, 300],
                [0, -18, 8, 4, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.25, 1, 0.5, 1),
                }
              );

              // Segment cross-fade (in for 8 frames, out for 8 frames at boundaries)
              const segFade =
                idx === 0
                  ? interpolate(relFrame, [292, 300], [1, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : idx === 5
                  ? interpolate(relFrame, [0, 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : interpolate(relFrame, [0, 8, 292, 300], [0, 1, 1, 0], {
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
            width: `${(frame / 1800) * 100}%`,
            background: "linear-gradient(90deg, #0284c7, #38bdf8)",
            boxShadow: "0 0 10px #38bdf8",
          }}
        />
      </div>
    </div>
  );
};
