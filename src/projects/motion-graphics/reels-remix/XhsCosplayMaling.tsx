import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";

export const XhsCosplayMaling: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle continuous camera zoom with origin pinned near the banner (20% Y)
  // This alters the visual fingerprint completely without cutting off the banner
  const cameraScale = interpolate(
    frame,
    [0, 75, 160, 240, 286],
    [1.02, 1.08, 1.06, 1.03, 1.04],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    }
  );

  // Attention ring spring (Detik 0.8 - 2.5 / Frames 25-75)
  const ringSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const ringOpacity = interpolate(frame, [25, 35, 68, 75], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseScale = 1 + 0.08 * Math.sin(frame * 0.4);

  // Snatch badge spring (Detik 2.5 - 4.0 / Frames 75-120)
  const snatchSpring = spring({
    frame: frame - 76,
    fps,
    config: { damping: 14, stiffness: 220 },
  });
  const snatchOpacity = interpolate(frame, [76, 85, 112, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Escape punchline spring (Detik 5.8 - 9.5 / Frames 175-286)
  const escapeSpring = spring({
    frame: frame - 175,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const escapeOpacity = interpolate(frame, [175, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      {/* 1. Base Video with dynamic camera crop and color grading */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale})`,
          transformOrigin: "50% 20%",
          filter: "contrast(1.07) saturate(1.15) brightness(1.02)",
        }}
      >
        <Video
          src={staticFile("xhs_thief_cosplay_h264.mp4")}
          volume={0.15} // Ambient crowd audible but low to avoid Content ID
        />

        {/* Indonesian Overwrite Banner locked inside the video coordinate space */}
        <div
          style={{
            position: "absolute",
            top: 286,
            left: "50%",
            transform: "translateX(-50%)",
            width: 936,
            height: 130,
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 26px rgba(0, 0, 0, 0.5)",
            zIndex: 30,
          }}
        >
          <span
            style={{
              color: "#111111",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 38,
              letterSpacing: "-0.5px",
              textAlign: "center",
              padding: "0 20px",
              whiteSpace: "nowrap",
            }}
          >
            Cosplay maling temen gue beneran totalitas...
          </span>
        </div>

        {/* Attention Hook: Attention Indicator on Thief (Frames 25-75) */}
        {frame >= 25 && frame <= 75 && (
          <div
            style={{
              position: "absolute",
              left: 490,
              top: 1050,
              transform: `translate(-50%, -50%) scale(${ringSpring * pulseScale})`,
              opacity: ringOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none",
              zIndex: 35,
            }}
          >
            <div
              style={{
                width: 175,
                height: 175,
                borderRadius: "50%",
                border: "5px dashed #FFE600",
                boxShadow: "0 0 25px rgba(255, 230, 0, 0.8)",
              }}
            />
            <div
              style={{
                marginTop: 12,
                backgroundColor: "#FFE600",
                color: "#000000",
                fontWeight: 900,
                fontSize: 24,
                padding: "6px 18px",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                letterSpacing: "0.5px",
                whiteSpace: "nowrap",
              }}
            >
              LIHAT BAWAH KAKI!
            </div>
          </div>
        )}

        {/* Comic Action Badge: Snatch Confirmed (Frames 75-120) */}
        {frame >= 75 && frame <= 120 && (
          <div
            style={{
              position: "absolute",
              left: 770,
              top: 890,
              transform: `translate(-50%, -50%) scale(${snatchSpring}) rotate(-6deg)`,
              opacity: snatchOpacity,
              backgroundColor: "#E61919",
              color: "#FFFFFF",
              fontWeight: 900,
              fontSize: 28,
              padding: "10px 22px",
              borderRadius: 12,
              border: "3px solid #FFFFFF",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
              letterSpacing: "0.5px",
              zIndex: 35,
              whiteSpace: "nowrap",
            }}
          >
            TARGET DIAMBIL!
          </div>
        )}
      </AbsoluteFill>

      {/* 2. Royalty-Free BGM & Comic SFX */}
      {/* Sneaky BGM by Kevin MacLeod (Public Domain / CC-BY) */}
      <Audio
        src={staticFile("audio/sneaky_snitch.mp3")}
        startFrom={0}
        volume={0.52}
      />

      {/* SFX: Cartoon sneaking steps */}
      <Sequence from={20} durationInFrames={60}>
        <Audio
          src={staticFile("audio/sfx_cartoon_tiptoe.wav")}
          volume={0.75}
        />
      </Sequence>

      {/* SFX: Snatch Pop */}
      <Sequence from={76} durationInFrames={30}>
        <Audio
          src={staticFile("audio/sfx_pop_snatch.wav")}
          volume={0.88}
        />
      </Sequence>

      {/* SFX: Whoosh Dash on Escape */}
      <Sequence from={175} durationInFrames={45}>
        <Audio
          src={staticFile("audio/sfx_modern_whoosh.mp3")}
          volume={0.85}
        />
      </Sequence>

      {/* 3. Dynamic Punchline Caption: Escape Rush (Frames 175-286) */}
      {frame >= 175 && (
        <div
          style={{
            position: "absolute",
            bottom: 300,
            left: "50%",
            transform: `translateX(-50%) scale(${escapeSpring})`,
            opacity: escapeOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            zIndex: 40,
            width: "90%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.82)",
              border: "3px solid #FFE600",
              borderRadius: 16,
              padding: "14px 30px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.85)",
            }}
          >
            <span
              style={{
                color: "#FFE600",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Impact, sans-serif',
                fontWeight: 900,
                fontSize: 50,
                letterSpacing: "1px",
                textTransform: "uppercase",
                textShadow: "0 3px 12px rgba(0, 0, 0, 0.9)",
                textAlign: "center",
                display: "block",
              }}
            >
              AUTO KABUR NGIBAS TANAH!
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
