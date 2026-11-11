import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface KineticWordProps {
  word: string;
  delayIndex: number;
  startFrame: number;
  highlightColor?: string;
  isBold?: boolean;
}

/**
 * iart-ai/kinetic-typography-skills:
 * Masked Baseline Spring Reveal for words
 */
const KineticWord: React.FC<KineticWordProps> = ({
  word,
  delayIndex,
  startFrame,
  highlightColor,
  isBold,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame - delayIndex * 2);

  const progress = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.6 },
  });

  const yPercent = interpolate(progress, [0, 1], [110, 0]);
  const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.7, 1]);

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        marginRight: "0.28em",
        lineHeight: 1.35,
      }}
    >
      <span
        style={{
          display: "inline-block",
          transform: `translateY(${yPercent}%)`,
          opacity,
          color: highlightColor || "#F8FAFC",
          fontWeight: isBold ? 900 : 700,
          textShadow: highlightColor ? `0 0 16px ${highlightColor}66` : "none",
        }}
      >
        {word}
      </span>
    </span>
  );
};

export const KineticSubtitles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        bottom: 230, // Outside reels bottom action buttons safe area
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Phrase 1 (0 to 195 frames / 0 to 6.5s) */}
      {frame >= 0 && frame < 195 && (
        <div
          style={{
            backgroundColor: "rgba(7, 12, 24, 0.9)",
            border: "1px solid rgba(0, 242, 254, 0.4)",
            borderRadius: 22,
            padding: "18px 28px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(14px)",
            fontSize: 32,
            maxWidth: 960,
          }}
        >
          {[
            { w: "Bayangkan,", color: "#F8FAFC" },
            { w: "apa", color: "#F8FAFC" },
            { w: "yang", color: "#F8FAFC" },
            { w: "terjadi", color: "#F8FAFC" },
            { w: "kalau", color: "#F8FAFC" },
            { w: "Bumi", color: "#00F2FE", bold: true },
            { w: "tiba-tiba", color: "#F8FAFC" },
            { w: "BERHENTI", color: "#FF6B35", bold: true },
            { w: "BERPUTAR...", color: "#FF6B35", bold: true },
            { w: "cuma", color: "#F8FAFC" },
            { w: "1", color: "#00F2FE", bold: true },
            { w: "DETIK", color: "#00F2FE", bold: true },
            { w: "SAJA?", color: "#00F2FE", bold: true },
          ].map((item, idx) => (
            <KineticWord
              key={idx}
              word={item.w}
              delayIndex={idx}
              startFrame={0}
              highlightColor={item.color}
              isBold={item.bold}
            />
          ))}
        </div>
      )}

      {/* Phrase 2 (195 to 402 frames / 6.5s to 13.4s) */}
      {frame >= 195 && frame < 402 && (
        <div
          style={{
            backgroundColor: "rgba(7, 12, 24, 0.9)",
            border: "1px solid rgba(255, 107, 53, 0.4)",
            borderRadius: 22,
            padding: "18px 28px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(14px)",
            fontSize: 32,
            maxWidth: 960,
          }}
        >
          {[
            { w: "Di", color: "#F8FAFC" },
            { w: "garis", color: "#F8FAFC" },
            { w: "khatulistiwa,", color: "#00F2FE", bold: true },
            { w: "kita", color: "#F8FAFC" },
            { w: "sedang", color: "#F8FAFC" },
            { w: "berputar", color: "#F8FAFC" },
            { w: "secepat", color: "#F8FAFC" },
            { w: "1.670", color: "#FF6B35", bold: true },
            { w: "KILOMETER", color: "#FF6B35", bold: true },
            { w: "PER", color: "#FF6B35", bold: true },
            { w: "JAM!", color: "#FF6B35", bold: true },
          ].map((item, idx) => (
            <KineticWord
              key={idx}
              word={item.w}
              delayIndex={idx}
              startFrame={195}
              highlightColor={item.color}
              isBold={item.bold}
            />
          ))}
        </div>
      )}

      {/* Phrase 3 (402 to 606 frames / 13.4s to 20.2s) */}
      {frame >= 402 && frame < 606 && (
        <div
          style={{
            backgroundColor: "rgba(7, 12, 24, 0.9)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 22,
            padding: "18px 28px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(14px)",
            fontSize: 30,
            maxWidth: 960,
          }}
        >
          {[
            { w: "Saat", color: "#F8FAFC" },
            { w: "berhenti", color: "#F8FAFC" },
            { w: "mendadak,", color: "#F8FAFC" },
            { w: "HUKUM", color: "#EF4444", bold: true },
            { w: "INERSIA", color: "#EF4444", bold: true },
            { w: "membuat", color: "#F8FAFC" },
            { w: "benda", color: "#F8FAFC" },
            { w: "terlempar", color: "#F8FAFC" },
            { w: "ke", color: "#F8FAFC" },
            { w: "timur", color: "#F8FAFC" },
            { w: "LEBIH", color: "#FF2E54", bold: true },
            { w: "CEPAT", color: "#FF2E54", bold: true },
            { w: "DARI", color: "#FF2E54", bold: true },
            { w: "PELURU!", color: "#FF2E54", bold: true },
          ].map((item, idx) => (
            <KineticWord
              key={idx}
              word={item.w}
              delayIndex={idx}
              startFrame={402}
              highlightColor={item.color}
              isBold={item.bold}
            />
          ))}
        </div>
      )}

      {/* Phrase 4 (606 to 753 frames / 20.2s to 25.1s) */}
      {frame >= 606 && frame < 753 && (
        <div
          style={{
            backgroundColor: "rgba(7, 12, 24, 0.9)",
            border: "1px solid rgba(0, 242, 254, 0.4)",
            borderRadius: 22,
            padding: "18px 28px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(14px)",
            fontSize: 32,
            maxWidth: 960,
          }}
        >
          {[
            { w: "Dinding", color: "#00F2FE", bold: true },
            { w: "samudra", color: "#00F2FE", bold: true },
            { w: "raksasa", color: "#00F2FE", bold: true },
            { w: "dan", color: "#F8FAFC" },
            { w: "badai", color: "#38BDF8", bold: true },
            { w: "supersonik", color: "#38BDF8", bold: true },
            { w: "akan", color: "#F8FAFC" },
            { w: "menyapu", color: "#F8FAFC" },
            { w: "daratan.", color: "#F8FAFC" },
          ].map((item, idx) => (
            <KineticWord
              key={idx}
              word={item.w}
              delayIndex={idx}
              startFrame={606}
              highlightColor={item.color}
              isBold={item.bold}
            />
          ))}
        </div>
      )}

      {/* Phrase 5 (753 to 966 frames / 25.1s to 32.2s) */}
      {frame >= 753 && frame < 966 && (
        <div
          style={{
            backgroundColor: "rgba(7, 12, 24, 0.9)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 22,
            padding: "18px 28px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(14px)",
            fontSize: 31,
            maxWidth: 960,
          }}
        >
          {[
            { w: "Untungnya,", color: "#F8FAFC" },
            { w: "gravitasi", color: "#10B981", bold: true },
            { w: "dan", color: "#F8FAFC" },
            { w: "momentum", color: "#10B981", bold: true },
            { w: "sudut", color: "#10B981", bold: true },
            { w: "menjaga", color: "#F8FAFC" },
            { w: "rotasi", color: "#F8FAFC" },
            { w: "Bumi", color: "#00F2FE", bold: true },
            { w: "tetap", color: "#F8FAFC" },
            { w: "stabil", color: "#10B981", bold: true },
            { w: "selama", color: "#F8FAFC" },
            { w: "miliaran", color: "#F8FAFC" },
            { w: "tahun.", color: "#F8FAFC" },
          ].map((item, idx) => (
            <KineticWord
              key={idx}
              word={item.w}
              delayIndex={idx}
              startFrame={753}
              highlightColor={item.color}
              isBold={item.bold}
            />
          ))}
        </div>
      )}

      {/* Phrase 6 (Comment Magnet & Outro: 966 to 1140 frames / 32.2s to 38.0s) */}
      {frame >= 966 && (
        <div
          style={{
            backgroundColor: "rgba(11, 19, 37, 0.95)",
            border: "2px solid #FF6B35",
            borderRadius: 22,
            padding: "18px 28px",
            textAlign: "center",
            boxShadow: "0 12px 50px rgba(255, 107, 53, 0.4)",
            backdropFilter: "blur(14px)",
            fontSize: 31,
            maxWidth: 960,
          }}
        >
          <div
            style={{
              color: "#FF6B35",
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            DISKUSI FAKTA MASUK AKAL 👇
          </div>
          {[
            { w: "Menurutmu,", color: "#FFFFFF", bold: true },
            { w: "apa", color: "#FFFFFF", bold: true },
            { w: "hal", color: "#FFFFFF", bold: true },
            { w: "paling", color: "#FFFFFF", bold: true },
            { w: "mengerikan", color: "#FF6B35", bold: true },
            { w: "dari", color: "#FFFFFF", bold: true },
            { w: "skenario", color: "#00F2FE", bold: true },
            { w: "ini?", color: "#00F2FE", bold: true },
          ].map((item, idx) => (
            <KineticWord
              key={idx}
              word={item.w}
              delayIndex={idx}
              startFrame={966}
              highlightColor={item.color}
              isBold={item.bold}
            />
          ))}
        </div>
      )}
    </div>
  );
};
