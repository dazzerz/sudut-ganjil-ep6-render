import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const REZA_ARAP_CLIP_FRAMES = 774; // 25.8 seconds @ 30 FPS

// Subtitle event interface
interface SubtitleEvent {
  startFrame: number;
  endFrame: number;
  speaker?: string;
  speakerColor?: string;
  text: string;
  highlightWords?: string[];
  type?: "normal" | "scream" | "climax" | "laugh";
}

const SUBTITLE_EVENTS: SubtitleEvent[] = [
  {
    startFrame: 0,
    endFrame: 55,
    speaker: "REZA ARAP",
    speakerColor: "#00F2FE",
    text: "Minta maaf ya? Kenapa bawa...",
    highlightWords: ["Minta", "maaf"],
    type: "normal",
  },
  {
    startFrame: 65,
    endFrame: 145,
    speaker: "DI LUAR (KEJAUHAN)",
    speakerColor: "#FFB800",
    text: "TOLONG AKUUU!! 😱",
    highlightWords: ["TOLONG", "AKUUU!!"],
    type: "scream",
  },
  {
    startFrame: 175,
    endFrame: 285,
    speaker: "RIAN (DI TELEPON)",
    speakerColor: "#4EACFE",
    text: "Kalau orang lagi kepepet butuh duit, urusannya pasti lancar...",
    highlightWords: ["kepepet", "butuh", "duit"],
    type: "normal",
  },
  {
    startFrame: 295,
    endFrame: 375,
    speaker: "DI LUAR (MAKIN DEKAT)",
    speakerColor: "#FF8A00",
    text: "🚨 TOLONG! TOLONG!! 🚨",
    highlightWords: ["TOLONG!", "TOLONG!!"],
    type: "scream",
  },
  {
    startFrame: 385,
    endFrame: 485,
    speaker: "DI LUAR",
    speakerColor: "#FF4D4D",
    text: "DEDI TOLONG AKUUU!! 😭",
    highlightWords: ["DEDI", "TOLONG"],
    type: "scream",
  },
  {
    startFrame: 495,
    endFrame: 615,
    speaker: "MELAYANG DI JENDELA 🚀",
    speakerColor: "#FF2A55",
    text: "DEDI TOLONG AKUUUUUUU!! 💥",
    highlightWords: ["DEDI", "TOLONG", "AKUUUUUUU!!"],
    type: "climax",
  },
  {
    startFrame: 630,
    endFrame: 770,
    speaker: "REZA ARAP (NGAKAK)",
    speakerColor: "#00F2FE",
    text: "PARAH ANJIR... TOLOL ANJIR! 💀😂",
    highlightWords: ["PARAH", "ANJIR...", "TOLOL"],
    type: "laugh",
  },
];

export const RezaArapClip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const videoSource = staticFile("video/clips/reza_arap_cropped.mp4");

  // =========================================================================
  // DYNAMIC CAMERA SHAKE & IMPACT CALCULATIONS
  // =========================================================================
  // Climax scream is around frame 495 - 615
  const isClimax = frame >= 495 && frame <= 615;
  const climaxProgress = isClimax
    ? interpolate(frame, [495, 515, 585, 615], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Violent screen shake during climax
  const shakeX = isClimax ? Math.sin(frame * 1.8) * (14 * climaxProgress) : 0;
  const shakeY = isClimax ? Math.cos(frame * 2.4) * (10 * climaxProgress) : 0;
  const shakeRotate = isClimax
    ? Math.sin(frame * 1.3) * (1.6 * climaxProgress)
    : 0;

  // Dynamic punch scale on video
  const videoScalePunch = isClimax
    ? interpolate(frame, [495, 515, 590, 615], [1, 1.06, 1.04, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : frame >= 630 && frame <= 774
    ? interpolate(frame, [630, 650, 750, 774], [1, 1.03, 1.03, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Alert flash vignette during climax
  const redFlashOpacity = isClimax
    ? interpolate(
        Math.sin(frame * 0.9),
        [-1, 1],
        [0.08, 0.32 * climaxProgress]
      )
    : 0;

  // =========================================================================
  // ACTIVE SUBTITLE CALCULATION
  // =========================================================================
  const activeSub = SUBTITLE_EVENTS.find(
    (s) => frame >= s.startFrame && frame <= s.endFrame
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07080B",
        overflow: "hidden",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif",
      }}
    >
      {/* 1. AMBIENT BLURRED BACKGROUND VIDEO */}
      <AbsoluteFill
        style={{
          filter: "blur(65px) brightness(0.35) saturate(1.5)",
          transform: "scale(1.3)",
          opacity: 0.9,
        }}
      >
        <OffthreadVideo
          src={videoSource}
          volume={0}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* 2. ATMOSPHERIC VIGNETTE OVERLAYS */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,12,18,0.2) 20%, rgba(5,6,9,0.85) 75%, rgba(0,0,0,0.98) 100%)",
        }}
      />

      {/* Climax Alert Impact Flash */}
      {redFlashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#FF003C",
            opacity: redFlashOpacity,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Subtle Scanlines Texture */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 2px, transparent 2px, transparent 4px)",
          pointerEvents: "none",
          opacity: 0.35,
        }}
      />

      {/* 3. TOP STREAM HEADER & TITLE (UPPER SAFE ZONE) */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 20,
          padding: "0 40px",
        }}
      >
        {/* Stream Tag Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(18, 22, 34, 0.88)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: 9999,
            padding: "9px 24px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {/* Pulsing Red Dot */}
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FF2A4D",
              boxShadow: "0 0 12px #FF2A4D",
              transform: `scale(${1 + Math.sin(frame * 0.22) * 0.2})`,
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2.5,
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            REZA ARAP • STREAM MOMENT
          </span>
        </div>

        {/* Big Catchphrase Title with Glow */}
        <h1
          style={{
            margin: "18px 0 0 0",
            fontSize: 58,
            fontWeight: 900,
            color: "#FFE600",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: -0.5,
            textShadow:
              "0 6px 20px rgba(0,0,0,0.95), 0 0 35px rgba(255, 230, 0, 0.45)",
            lineHeight: 1.1,
            transform: `scale(${1 + Math.sin(frame * 0.08) * 0.015})`,
          }}
        >
          TEDY TOLONG AKU!! 😭
        </h1>
      </div>

      {/* 4. MAIN GAMEPLAY & WEBCAM VIDEO BOX */}
      <div
        style={{
          position: "absolute",
          top: 530,
          left: 20,
          width: 1040,
          height: 580,
          zIndex: 10,
          borderRadius: 24,
          overflow: "hidden",
          border: isClimax
            ? "3px solid rgba(255, 42, 77, 0.95)"
            : "2px solid rgba(255, 255, 255, 0.18)",
          boxShadow: isClimax
            ? "0 25px 70px rgba(0,0,0,0.95), 0 0 60px rgba(255, 42, 77, 0.55)"
            : "0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(0, 242, 254, 0.15)",
          transform: `translate(${shakeX}px, ${shakeY}px) rotate(${shakeRotate}deg) scale(${videoScalePunch})`,
          transformOrigin: "center center",
        }}
      >
        <OffthreadVideo
          src={videoSource}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 5. KINETIC SYNCHRONIZED SUBTITLES (LOWER SAFE AREA) */}
      <div
        style={{
          position: "absolute",
          top: 1220,
          left: 40,
          right: 40,
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 25,
        }}
      >
        {activeSub && (
          <SubtitleRenderer
            key={activeSub.startFrame}
            event={activeSub}
            currentFrame={frame}
            fps={fps}
          />
        )}
      </div>

      {/* 6. SIDE FLOATING EMOJIS (BOTTOM FLANKS ONLY - NEVER OVERLAPS SUBTITLES) */}
      {frame >= 630 && (
        <SideFloatingEmojis
          frame={frame}
          isClimax={isClimax}
          isLaughing={frame >= 630}
        />
      )}

      {/* 7. BOTTOM SOUNDWAVE EQUALIZER & FOOTER (SAFE ZONE) */}
      <div
        style={{
          position: "absolute",
          bottom: 145,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 20,
        }}
      >
        {/* Animated Spectrum Bars */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 7,
            height: 38,
            padding: "0 20px",
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const barFreq = (i * 0.45) % 3;
            const barHeight = isClimax
              ? 12 + Math.abs(Math.sin(frame * 0.4 + barFreq)) * 26
              : frame >= 630
              ? 8 + Math.abs(Math.sin(frame * 0.25 + barFreq)) * 22
              : 5 + Math.abs(Math.sin(frame * 0.15 + barFreq)) * 14;

            const barColor = isClimax
              ? `hsl(${340 + i * 2}, 100%, 60%)`
              : `hsl(${190 + i * 3}, 95%, 55%)`;

            return (
              <div
                key={i}
                style={{
                  width: 5,
                  height: barHeight,
                  borderRadius: 3,
                  backgroundColor: barColor,
                  boxShadow: `0 0 10px ${barColor}`,
                  opacity: 0.85,
                }}
              />
            );
          })}
        </div>

        {/* Footer Tag */}
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 3,
            color: "rgba(255, 255, 255, 0.45)",
            textTransform: "uppercase",
          }}
        >
          INDONESIAN GAMING MOMENTS
        </span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// SUB-COMPONENT: KINETIC SUBTITLE RENDERER
// =========================================================================
const SubtitleRenderer: React.FC<{
  event: SubtitleEvent;
  currentFrame: number;
  fps: number;
}> = ({ event, currentFrame, fps }) => {
  const relFrame = currentFrame - event.startFrame;

  // Spring entrance pop
  const popScale = spring({
    frame: relFrame,
    fps,
    config: {
      damping: 11,
      stiffness: 190,
      mass: 0.7,
    },
  });

  const opacity = interpolate(relFrame, [0, 4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Jitter effect for screaming/climax
  const isJitter = event.type === "scream" || event.type === "climax";
  const jitterX = isJitter ? Math.sin(currentFrame * 1.6) * 5 : 0;
  const jitterY = isJitter ? Math.cos(currentFrame * 2.0) * 4 : 0;

  // Split words to apply individual dynamic highlights
  const words = event.text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `translate(${jitterX}px, ${jitterY}px) scale(${popScale})`,
        opacity,
        textAlign: "center",
        maxWidth: 1000,
      }}
    >
      {/* Speaker Tag Badge */}
      {event.speaker && (
        <div
          style={{
            display: "inline-block",
            padding: "5px 18px",
            borderRadius: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            border: `1px solid ${event.speakerColor || "#FFFFFF"}45`,
            color: event.speakerColor || "#FFFFFF",
            fontSize: 21,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 16,
            boxShadow: `0 0 16px ${event.speakerColor || "#FFFFFF"}30`,
          }}
        >
          {event.speaker}
        </div>
      )}

      {/* Main Kinetic Text */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 18px",
          padding: "0 20px",
        }}
      >
        {words.map((word, idx) => {
          const isHighlighted = event.highlightWords?.some((hw) =>
            word.toUpperCase().includes(hw.toUpperCase())
          );

          let color = "#FFFFFF";
          let textShadow = "0 4px 18px rgba(0, 0, 0, 0.95)";
          let fontSize =
            event.type === "climax"
              ? 66
              : event.type === "scream"
              ? 58
              : 48;

          if (isHighlighted) {
            if (event.type === "climax") {
              // High contrast bright yellow text with red neon glow
              color = "#FFE600";
              textShadow =
                "0 4px 20px rgba(0,0,0,1), 0 0 35px #FF0055, 0 0 60px #FF0033";
            } else if (event.type === "scream") {
              color = "#FFE600";
              textShadow =
                "0 6px 20px rgba(0,0,0,1), 0 0 25px rgba(255, 230, 0, 0.75)";
            } else if (event.type === "laugh") {
              color = "#00F2FE";
              textShadow =
                "0 6px 20px rgba(0,0,0,1), 0 0 25px rgba(0, 242, 254, 0.75)";
            } else {
              color = "#FFB800";
              textShadow = "0 4px 18px rgba(0,0,0,0.95)";
            }
          }

          return (
            <span
              key={idx}
              style={{
                fontSize,
                fontWeight: 900,
                color,
                textShadow,
                letterSpacing: -0.5,
                lineHeight: 1.15,
                display: "inline-block",
                transform: isHighlighted
                  ? `scale(${1 + Math.sin(currentFrame * 0.35 + idx) * 0.05})`
                  : "scale(1)",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-COMPONENT: SIDE FLOATING EMOJIS (CONFINED TO SAFE MARGINS)
// =========================================================================
const SideFloatingEmojis: React.FC<{
  frame: number;
  isClimax: boolean;
  isLaughing: boolean;
}> = ({ frame, isLaughing }) => {
  // 4 emojis: 2 on the left margin, 2 on the right margin
  const leftEmojis = isLaughing ? ["😂", "💀"] : ["😱", "💥"];
  const rightEmojis = isLaughing ? ["🤣", "😭"] : ["🚀", "🚨"];

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 18 }}>
      {/* Left side column */}
      {leftEmojis.map((emoji, idx) => {
        const offset = idx * 60;
        const speed = 3.2 + idx * 1.0;
        const progress = ((frame * speed + offset * 10) % 400) / 400;
        const yPos = interpolate(progress, [0, 1], [1720, 1540]);
        const xPos = 80 + idx * 70 + Math.sin(frame * 0.08 + idx) * 15;
        const opacity = interpolate(
          progress,
          [0, 0.2, 0.75, 1],
          [0, 0.85, 0.85, 0]
        );
        const scale = interpolate(progress, [0, 0.3, 1], [0.7, 1.15, 0.8]);

        return (
          <div
            key={`left-${idx}`}
            style={{
              position: "absolute",
              left: xPos,
              top: yPos,
              fontSize: 40,
              opacity,
              transform: `scale(${scale}) rotate(${Math.sin(frame * 0.1 + idx) * 18}deg)`,
              filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))",
            }}
          >
            {emoji}
          </div>
        );
      })}

      {/* Right side column */}
      {rightEmojis.map((emoji, idx) => {
        const offset = idx * 60 + 35;
        const speed = 3.5 + idx * 0.9;
        const progress = ((frame * speed + offset * 10) % 400) / 400;
        const yPos = interpolate(progress, [0, 1], [1720, 1540]);
        const xPos = 860 + idx * 70 + Math.sin(frame * 0.08 + idx + 2) * 15;
        const opacity = interpolate(
          progress,
          [0, 0.2, 0.75, 1],
          [0, 0.85, 0.85, 0]
        );
        const scale = interpolate(progress, [0, 0.3, 1], [0.7, 1.15, 0.8]);

        return (
          <div
            key={`right-${idx}`}
            style={{
              position: "absolute",
              left: xPos,
              top: yPos,
              fontSize: 44,
              opacity,
              transform: `scale(${scale}) rotate(${Math.sin(frame * 0.1 + idx + 3) * 18}deg)`,
              filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))",
            }}
          >
            {emoji}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
