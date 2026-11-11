import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface Props {
  crumbleProgress: number; // 0 (solid) to 1 (crumbled into dust)
}

export const ConcreteCrumbleVisual: React.FC<Props> = ({ crumbleProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { stiffness: 120, damping: 14 },
  });

  // Dynamic crumbling debris particles
  const debris = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      const angle = (i / 36) * Math.PI * 2;
      const dist = 60 + (i % 6) * 45;
      return {
        id: i,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist + (i % 4) * 20,
        size: 8 + (i % 4) * 6,
        rotate: (i * 45) % 360,
      };
    });
  }, []);

  // Building shake when crumbling
  const shakeX = crumbleProgress > 0 && crumbleProgress < 0.8
    ? Math.sin(frame * 0.8) * 12 * crumbleProgress
    : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 880,
        transform: `scale(${enterSpring})`,
      }}
    >
      {/* Visual Canvas Container */}
      <div
        style={{
          position: "relative",
          width: 800,
          height: 520,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: 36,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.08)",
          border: "3px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        {/* Subtle interior blueprint grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(#CBD5E1 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            opacity: 0.6,
          }}
        />

        {/* Central Skyscraper & Bridge Graphic */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            gap: 20,
            transform: `translateX(${shakeX}px)`,
          }}
        >
          {/* Skyscraper 1 */}
          <div
            style={{
              position: "relative",
              width: 130,
              height: 340,
              backgroundColor: crumbleProgress > 0.3 ? "#94A3B8" : "#334155",
              borderRadius: "12px 12px 0 0",
              opacity: 1 - crumbleProgress * 0.7,
              transform: `scaleY(${1 - crumbleProgress * 0.5})`,
              transformOrigin: "bottom",
              transition: "background-color 0.2s",
              overflow: "hidden",
            }}
          >
            {/* Windows */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                padding: 16,
              }}
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 24,
                    backgroundColor:
                      crumbleProgress > 0.2 ? "#E2E8F0" : "#38BDF8",
                    borderRadius: 4,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Skyscraper 2 (Taller Hero Tower) */}
          <div
            style={{
              position: "relative",
              width: 170,
              height: 420,
              backgroundColor: crumbleProgress > 0.3 ? "#64748B" : "#1E293B",
              borderRadius: "16px 16px 0 0",
              opacity: 1 - crumbleProgress * 0.8,
              transform: `scaleY(${1 - crumbleProgress * 0.6})`,
              transformOrigin: "bottom",
              overflow: "hidden",
            }}
          >
            {/* Antenna / Spire */}
            <div
              style={{
                position: "absolute",
                top: -30,
                left: 80,
                width: 10,
                height: 30,
                backgroundColor: "#EF4444",
              }}
            />
            {/* Tower Windows */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
                padding: 18,
              }}
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 28,
                    backgroundColor:
                      crumbleProgress > 0.2 ? "#CBD5E1" : "#FDE047",
                    borderRadius: 4,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Skyscraper 3 */}
          <div
            style={{
              position: "relative",
              width: 140,
              height: 290,
              backgroundColor: crumbleProgress > 0.3 ? "#94A3B8" : "#475569",
              borderRadius: "12px 12px 0 0",
              opacity: 1 - crumbleProgress * 0.7,
              transform: `scaleY(${1 - crumbleProgress * 0.5})`,
              transformOrigin: "bottom",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                padding: 16,
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 26,
                    backgroundColor:
                      crumbleProgress > 0.2 ? "#E2E8F0" : "#38BDF8",
                    borderRadius: 4,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Crumbling Debris Flying Outwards */}
          {debris.map((d) => {
            const spread = crumbleProgress * 1.6;
            const x = d.dx * spread;
            const y = d.dy * spread + crumbleProgress * 80;
            const opacity =
              crumbleProgress > 0 ? Math.max(0, 1 - (crumbleProgress - 0.2)) : 0;

            return (
              <div
                key={d.id}
                style={{
                  position: "absolute",
                  left: 220,
                  top: 200,
                  width: d.size,
                  height: d.size,
                  backgroundColor: d.id % 2 === 0 ? "#CBD5E1" : "#94A3B8",
                  borderRadius: d.id % 3 === 0 ? "50%" : 4,
                  transform: `translate(${x}px, ${y}px) rotate(${d.rotate + frame * 3}deg)`,
                  opacity,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
              />
            );
          })}
        </div>

        {/* Warning Stamp Overlay when Crumbled */}
        {crumbleProgress > 0.4 && (
          <div
            style={{
              position: "absolute",
              top: 40,
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              padding: "10px 24px",
              borderRadius: 16,
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: 2,
              boxShadow: "0 10px 25px rgba(220, 38, 38, 0.4)",
              textTransform: "uppercase",
              transform: `scale(${interpolate(crumbleProgress, [0.4, 0.6], [0.8, 1], { extrapolateRight: "clamp" })})`,
            }}
          >
            ⚠️ IKATAN STRUKTUR HANCUR JADI DEBU
          </div>
        )}
      </div>

      {/* Scientific Chemistry Insight Card */}
      <div
        style={{
          marginTop: 24,
          width: 800,
          backgroundColor: "#F8FAFC",
          border: "2px solid #E2E8F0",
          borderRadius: 24,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              backgroundColor: "#EFF6FF",
              border: "2px solid #BFDBFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            🔬
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#1E293B",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Molekul Pengikat Semen:
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#2563EB" }}>
              Silikat Kalsium Hidrat (C-S-H)
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "8px 18px",
            backgroundColor: "#FEE2E2",
            borderRadius: 16,
            border: "1px solid #FECACA",
            color: "#991B1B",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          Oksigen = Lem Struktur Beton
        </div>
      </div>
    </div>
  );
};
