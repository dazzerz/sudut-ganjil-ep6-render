import React from "react";
import { Img, interpolate, staticFile, Easing } from "remotion";
import { ClaudeSpark } from "./ClaudeSpark";
import { PaintedStrokes } from "./PaintedStrokes";

export interface LayoutConfig {
  mode: "single-hero" | "split-diptych" | "trio-3d-floating" | "quad-bento" | "staccato-strobe";
  images: string[];
  sparkProps?: {
    size: number;
    color: string;
    glow?: boolean;
    x: number; // percent
    y: number; // percent
  };
  paintedVariant?: "intro-brush" | "circle-highlight" | "scribble-wave" | "tape-accents";
  paintedColor?: string;
}

interface MultiImageLayoutProps {
  frame: number;
  frameInScene: number;
  sceneDuration: number;
  config: LayoutConfig;
}

export const MultiImageLayout: React.FC<MultiImageLayoutProps> = ({
  frame,
  frameInScene,
  sceneDuration,
  config,
}) => {
  const sceneProgress = interpolate(frameInScene, [0, Math.max(1, sceneDuration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 100 BPM Beat pulse
  const beatPhase = (frame % 18 + 18) % 18;
  const beatScale = interpolate(beatPhase, [0, 2, 8, 17], [1.035, 1.02, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Mode 1: Single Hero with Bold Light-Mode Framing & Painted Highlight
  if (config.mode === "single-hero") {
    const zoom = interpolate(sceneProgress, [0, 1], [1.02, 1.09]);
    const imgPath = config.images[0];

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Crisp white background */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#FAFAF9" }} />

        {/* Ambient subtle warm gradient */}
        <div
          style={{
            position: "absolute",
            top: 200,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217, 119, 87, 0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Hero Image Card */}
        <div
          style={{
            width: 920,
            height: 1440,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(9, 9, 11, 0.12), 0 4px 20px rgba(9, 9, 11, 0.08)",
            border: "8px solid #FFFFFF",
            transform: `scale(${zoom * beatScale})`,
            transformOrigin: "center center",
            position: "relative",
          }}
        >
          <Img
            src={staticFile(imgPath)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Painted Circle or Sweep Over Image */}
          {config.paintedVariant && (
            <PaintedStrokes
              frame={frame}
              variant={config.paintedVariant}
              color={config.paintedColor || "#D97757"}
              progress={interpolate(frameInScene, [4, 24], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}
            />
          )}
        </div>

        {/* Floating Claude Spark */}
        {config.sparkProps && (
          <div
            style={{
              position: "absolute",
              left: `${config.sparkProps.x}%`,
              top: `${config.sparkProps.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 45,
            }}
          >
            <ClaudeSpark
              frame={frame}
              size={config.sparkProps.size}
              color={config.sparkProps.color}
              glow={config.sparkProps.glow}
            />
          </div>
        )}
      </div>
    );
  }

  // Mode 2: Split Diptych (2 Asymmetric Editorial Images)
  if (config.mode === "split-diptych") {
    const img1 = config.images[0];
    const img2 = config.images[1] || config.images[0];

    const slideIn1 = interpolate(frameInScene, [0, 8], [-120, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const slideIn2 = interpolate(frameInScene, [2, 10], [120, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundColor: "#F4F4F5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: 60,
          overflow: "hidden",
        }}
      >
        {/* Top Larger Card */}
        <div
          style={{
            width: 940,
            height: 860,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(9, 9, 11, 0.1)",
            border: "6px solid #FFFFFF",
            transform: `translateX(${slideIn1}px) scale(${beatScale})`,
            position: "relative",
          }}
        >
          <Img
            src={staticFile(img1)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Bottom Horizontal Card */}
        <div
          style={{
            width: 940,
            height: 600,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(9, 9, 11, 0.1)",
            border: "6px solid #FFFFFF",
            transform: `translateX(${slideIn2}px)`,
            position: "relative",
          }}
        >
          <Img
            src={staticFile(img2)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Corner Tape Accents */}
        <PaintedStrokes frame={frame} variant="tape-accents" />

        {/* Central Floating Spark */}
        {config.sparkProps && (
          <div
            style={{
              position: "absolute",
              left: `${config.sparkProps.x}%`,
              top: `${config.sparkProps.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 45,
            }}
          >
            <ClaudeSpark
              frame={frame}
              size={config.sparkProps.size}
              color={config.sparkProps.color}
              glow
            />
          </div>
        )}
      </div>
    );
  }

  // Mode 3: Trio 3D Floating Cards (Perspective Depth)
  if (config.mode === "trio-3d-floating") {
    const [img1, img2, img3] = config.images;

    const swayY = Math.sin(frame * 0.08) * 8;
    const swayX = Math.cos(frame * 0.06) * 6;

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundColor: "#FAFAF9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1200,
          overflow: "hidden",
        }}
      >
        {/* Card 1: Left Tilted */}
        <div
          style={{
            position: "absolute",
            width: 440,
            height: 680,
            left: 80,
            top: 480,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 30px 70px rgba(9, 9, 11, 0.15)",
            border: "6px solid #FFFFFF",
            transform: `rotateY(18deg) rotateZ(-6deg) translateY(${swayY}px)`,
            transformOrigin: "center right",
            zIndex: 10,
          }}
        >
          <Img
            src={staticFile(img1 || config.images[0])}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Card 2: Center Elevated Hero */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 920,
            top: 420,
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(9, 9, 11, 0.22)",
            border: "8px solid #FFFFFF",
            transform: `translateZ(80px) scale(${beatScale}) translateY(${-swayY * 0.5}px)`,
            zIndex: 25,
          }}
        >
          <Img
            src={staticFile(img2 || config.images[0])}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <PaintedStrokes
            frame={frame}
            variant="circle-highlight"
            color="#D97757"
            progress={interpolate(frameInScene, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </div>

        {/* Card 3: Right Tilted */}
        <div
          style={{
            position: "absolute",
            width: 440,
            height: 680,
            right: 80,
            top: 520,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 30px 70px rgba(9, 9, 11, 0.15)",
            border: "6px solid #FFFFFF",
            transform: `rotateY(-18deg) rotateZ(6deg) translateY(${swayX}px)`,
            transformOrigin: "center left",
            zIndex: 10,
          }}
        >
          <Img
            src={staticFile(img3 || config.images[0])}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Central 3D Tilted Spark */}
        {config.sparkProps && (
          <div
            style={{
              position: "absolute",
              left: `${config.sparkProps.x}%`,
              top: `${config.sparkProps.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 45,
            }}
          >
            <ClaudeSpark
              frame={frame}
              size={config.sparkProps.size}
              color={config.sparkProps.color}
              is3D
              tiltX={15}
              tiltY={-20}
              glow
            />
          </div>
        )}
      </div>
    );
  }

  // Mode 4: Quad Bento Grid (Explosive Chorus Drop)
  if (config.mode === "quad-bento") {
    const bentoItems = [
      {
        src: config.images[0] || "images/hot_matcha/img1_wide_yellow_mirror.jpg",
        scale: 1.05,
        position: "center center",
      },
      {
        src: config.images[1] || "images/hot_matcha/img4_close_cute_pose.jpg",
        scale: 1.45,
        position: "center 74%", // Tight focus on cute smile!
      },
      {
        src: config.images[2] || "images/hot_matcha/img3_motion_blur_vibe.jpg",
        scale: 1.1,
        position: "center center",
      },
      {
        src: config.images[3] || "images/hot_matcha/img5_lens_flare_sharp.jpg",
        scale: 1.3,
        position: "center 38%", // Focus on ceiling lens flare!
      },
    ];

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          backgroundColor: "#FFFFFF",
          padding: "160px 50px 240px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 24,
          overflow: "hidden",
        }}
      >
        {bentoItems.map((item, i) => {
          const enterSpring = interpolate(
            frameInScene,
            [i * 2, i * 2 + 10],
            [0.85, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "6px solid #FFFFFF",
                boxShadow: "0 16px 45px rgba(9, 9, 11, 0.12)",
                transform: `scale(${enterSpring * beatScale})`,
                transformOrigin: "center center",
                position: "relative",
              }}
            >
              <Img
                src={staticFile(item.src)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: item.position,
                  transform: `scale(${item.scale})`,
                }}
              />
            </div>
          );
        })}

        {/* Central Bold Claude Spark Badge */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 160,
            height: 160,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 40,
          }}
        >
          <ClaudeSpark frame={frame} size={110} color="#D97757" glow />
        </div>
      </div>
    );
  }

  // Mode 5: Staccato Strobe (Rapid 1-Beat Outro Switch)
  const currentStrobeIndex = Math.floor(frameInScene / 18) % config.images.length;
  const currentImg = config.images[currentStrobeIndex] || config.images[0];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 980,
          height: 1540,
          borderRadius: 28,
          overflow: "hidden",
          border: "10px solid #FFFFFF",
          boxShadow: "0 30px 90px rgba(9, 9, 11, 0.18)",
          transform: `scale(${beatScale})`,
          position: "relative",
        }}
      >
        <Img
          src={staticFile(currentImg)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Flash on each strobe switch */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFFFFF",
            opacity: interpolate((frameInScene % 18), [0, 4], [0.6, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};
