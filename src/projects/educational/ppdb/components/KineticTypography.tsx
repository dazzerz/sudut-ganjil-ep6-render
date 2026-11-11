import React from "react";
import { interpolate, spring, Easing } from "remotion";

/**
 * Modern Kinetic Typography & Motion Primitives for Remotion
 * 100% Deterministic (Frame-Accurate)
 */

interface MaskedWordRevealProps {
  text: string;
  frame: number;
  startFrame: number;
  fps: number;
  fontSize?: number;
  fontWeight?: number | string;
  color?: string;
  lineHeight?: number;
  letterSpacing?: string;
  staggerFrames?: number;
  highlightWords?: { [word: string]: { color?: string; bg?: string; borderColor?: string } };
  style?: React.CSSProperties;
  align?: "left" | "center" | "right";
  springConfig?: { damping: number; stiffness: number; mass: number };
}

/**
 * MaskedWordReveal: Words slide up through an invisible baseline mask (overflow: hidden),
 * with snappy spring easing and subtle rotation for a modern, crisp kinetic typography feel.
 */
export const MaskedWordReveal: React.FC<MaskedWordRevealProps> = ({
  text,
  frame,
  startFrame,
  fps,
  fontSize = 48,
  fontWeight = 800,
  color = "#0F172A",
  lineHeight = 1.15,
  letterSpacing = "-0.02em",
  staggerFrames = 3,
  highlightWords = {},
  style = {},
  align = "left",
  springConfig = { damping: 14, stiffness: 220, mass: 0.6 },
}) => {
  const words = text.split(" ");

  return (
    <div
      aria-label={text}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        gap: `${Math.round(fontSize * 0.22)}px ${Math.round(fontSize * 0.26)}px`,
        fontSize,
        fontWeight,
        color,
        lineHeight,
        letterSpacing,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        const highlight = Object.keys(highlightWords).find(
          (k) => k.toUpperCase() === cleanWord || word.toUpperCase().includes(k.toUpperCase())
        );
        const hlStyle = highlight ? highlightWords[highlight] : null;

        const wordStart = startFrame + i * staggerFrames;
        const spr = spring({
          frame: frame - wordStart,
          fps,
          config: springConfig,
        });

        // Entrance motion: slides up from 105% masked baseline, rotates 4deg -> 0deg, scales 0.9 -> 1.0
        const yOffset = interpolate(spr, [0, 1], [105, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const rot = interpolate(spr, [0, 1], [4, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(spr, [0, 0.3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Continuous subtle secondary drift after settling
        const activeFrames = Math.max(0, frame - (wordStart + 15));
        const subtleBreathing = Math.sin((activeFrames + i * 8) * 0.05) * 1.5;

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              paddingBottom: 4,
              paddingTop: 4,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                transform: `translateY(${yOffset}%) rotate(${rot}deg) translateY(${subtleBreathing}px)`,
                opacity,
                color: hlStyle?.color || color,
                backgroundColor: hlStyle?.bg || "transparent",
                border: hlStyle?.borderColor ? `1.5px solid ${hlStyle.borderColor}` : undefined,
                padding: hlStyle?.bg ? "2px 10px" : undefined,
                borderRadius: hlStyle?.bg ? 8 : undefined,
                boxShadow: hlStyle?.bg ? "0 4px 12px rgba(0,0,0,0.08)" : undefined,
                whiteSpace: "pre",
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};

interface KineticSlamPunchProps {
  words: string[];
  frame: number;
  startFrame: number;
  fps: number;
  fontSize?: number;
  textColor?: string;
  badgeBg?: string;
  badgeBorder?: string;
  staggerFrames?: number;
  shadowColor?: string;
  style?: React.CSSProperties;
}

/**
 * KineticSlamPunch: High-impact hero words that slam in with scale overshoot,
 * camera/word shake, and an animated highlighter backdrop sweep (e.g. for "JANGAN ASAL PILIH!").
 */
export const KineticSlamPunch: React.FC<KineticSlamPunchProps> = ({
  words,
  frame,
  startFrame,
  fps,
  fontSize = 96,
  textColor = "#DC2626",
  badgeBg = "rgba(220, 38, 38, 0.08)",
  badgeBorder = "rgba(220, 38, 38, 0.25)",
  staggerFrames = 5,
  shadowColor = "rgba(220, 38, 38, 0.25)",
  style = {},
}) => {
  // Pill sweep animation behind the punchline
  const pillProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 18, stiffness: 180, mass: 0.8 },
  });
  const pillScaleX = interpolate(pillProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: Math.round(fontSize * 0.2),
        padding: "16px 28px",
        borderRadius: 24,
        ...style,
      }}
    >
      {/* Background Pill with Sweep Reveal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: badgeBg,
          border: `2px solid ${badgeBorder}`,
          borderRadius: 24,
          transformOrigin: "left center",
          transform: `scaleX(${pillScaleX})`,
          boxShadow: `0 12px 36px ${shadowColor}`,
          zIndex: 0,
        }}
      />

      {words.map((word, i) => {
        const wordStart = startFrame + i * staggerFrames;
        const spr = spring({
          frame: frame - wordStart,
          fps,
          config: { damping: 10, stiffness: 240, mass: 0.5 },
        });

        // High-energy slam: drops from scale 1.45 -> 0.95 -> 1.0 with subtle overshoot tilt
        const scale = interpolate(spr, [0, 1], [1.45, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const yOffset = interpolate(spr, [0, 1], [-40, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const rot = interpolate(spr, [0, 1], [i % 2 === 0 ? -6 : 6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(spr, [0, 0.2], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Secondary subtle continuous pulse
        const activeTime = Math.max(0, frame - (wordStart + 12));
        const pulse = 1 + Math.sin(activeTime * 0.08 + i) * 0.02;

        return (
          <span
            key={i}
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-block",
              fontSize,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: textColor,
              textShadow: `0 8px 24px ${shadowColor}`,
              transform: `translateY(${yOffset}px) scale(${scale * pulse}) rotate(${rot}deg)`,
              opacity,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

interface KineticUnderlineProps {
  frame: number;
  startFrame: number;
  fps: number;
  color?: string;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * KineticUnderline: Energetic stroke line that draws across horizontally under a headline.
 */
export const KineticUnderline: React.FC<KineticUnderlineProps> = ({
  frame,
  startFrame,
  fps,
  color = "#10B981",
  height = 6,
  style = {},
}) => {
  const spr = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 160, mass: 0.7 },
  });
  const widthPercent = interpolate(spr, [0, 1], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: `${widthPercent}%`,
        height,
        borderRadius: height / 2,
        background: `linear-gradient(90deg, ${color} 0%, rgba(245, 158, 11, 0.9) 100%)`,
        boxShadow: `0 2px 10px ${color}66`,
        marginTop: 8,
        ...style,
      }}
    />
  );
};

interface KineticCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  frame: number;
  startFrame: number;
  fps: number;
  durationFrames?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * KineticCounter: Deterministic animated number counter with snappy cubic-bezier easing
 * and elastic spring scale-in.
 */
export const KineticCounter: React.FC<KineticCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  frame,
  startFrame,
  fps,
  durationFrames = 25,
  fontSize = 64,
  fontWeight = 900,
  color = "#047857",
  style = {},
}) => {
  const elapsed = Math.max(0, frame - startFrame);
  const progress = Math.min(1, elapsed / durationFrames);
  const eased = Easing.bezier(0.16, 1, 0.3, 1)(progress);
  const currentValue = Math.round(value * eased);

  const spr = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.6 },
  });
  const scale = interpolate(spr, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Format IDR number with dots: 4375000 -> 4.375.000
  const formatted = currentValue.toLocaleString("id-ID");

  return (
    <span
      style={{
        display: "inline-block",
        fontSize,
        fontWeight,
        color,
        letterSpacing: "-0.03em",
        transform: `scale(${scale})`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

interface ShimmerSweepButtonProps {
  label: string;
  sublabel?: string;
  frame: number;
  startFrame: number;
  fps: number;
  icon?: string;
  bgColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
}

/**
 * ShimmerSweepButton: Interactive-feel CTA button with a periodic light-shimmer sweep,
 * elastic bounce entrance, and subtle breathing pulse.
 */
export const ShimmerSweepButton: React.FC<ShimmerSweepButtonProps> = ({
  label,
  sublabel,
  frame,
  startFrame,
  fps,
  icon = "💬",
  bgColor = "#059669",
  textColor = "#FFFFFF",
  style = {},
}) => {
  const enterSpr = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
  });
  const enterScale = interpolate(enterSpr, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(enterSpr, [0, 1], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Continuous gentle breathing pulse
  const activeFrames = Math.max(0, frame - (startFrame + 15));
  const breathing = 1 + Math.sin(activeFrames * 0.1) * 0.025;

  // Periodic light shimmer sweep across button every 60 frames (2 seconds at 30fps)
  const shimmerCycle = (frame % 60) / 60;
  const shimmerPos = interpolate(shimmerCycle, [0, 0.4, 1], [-100, 200, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        backgroundColor: bgColor,
        padding: "24px 38px",
        borderRadius: 22,
        boxShadow: `0 14px 40px ${bgColor}55, 0 4px 12px rgba(0,0,0,0.12)`,
        border: "1.5px solid rgba(255, 255, 255, 0.3)",
        transform: `translateY(${enterY}px) scale(${enterScale * breathing})`,
        ...style,
      }}
    >
      {/* Light Shimmer Beam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 80,
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%)",
          transform: `translateX(${shimmerPos}%) skewX(-25deg)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: 44,
          lineHeight: 1,
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
        }}
      >
        {icon}
      </div>

      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: textColor,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.88)",
              marginTop: 4,
              letterSpacing: "0.02em",
            }}
          >
            {sublabel}
          </div>
        )}
      </div>

      {/* Animated Arrow Chevron */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: textColor,
          marginLeft: 8,
          transform: `translateX(${Math.sin(activeFrames * 0.15) * 5}px)`,
        }}
      >
        ➜
      </div>
    </div>
  );
};
