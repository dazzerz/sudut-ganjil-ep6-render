import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const UpwardLightningSimulation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Screen flash triggers when lightning steps
  const flashCycle = Math.sin(frame * 0.15);
  const isMajorDischarge = (frame >= 240 && frame <= 275) || (frame >= 770 && frame <= 830) || (frame >= 1110 && frame <= 1180);
  const flashOpacity = isMajorDischarge
    ? interpolate(Math.sin((frame % 15) * 1.5), [-1, 1], [0.15, 0.45])
    : 0;

  // Spire tip position
  const spireX = 540;
  const spireY = 1150;

  // Upward leader step progression
  // Every cycle (e.g. 60 frames), leader shoots upwards from spireY to 200
  const leaderProgress = (frame % 90) / 90; // 0 to 1
  const leaderHeight = interpolate(leaderProgress, [0, 0.6, 1], [0, 850, 950], {
    extrapolateRight: "clamp",
  });
  const currentLeaderY = spireY - leaderHeight;

  // St. Elmo's fire / Corona discharge pulse at spire
  const coronaScale = interpolate(Math.sin(frame * 0.5), [-1, 1], [0.8, 1.4]);
  const coronaAlpha = interpolate(Math.sin(frame * 0.4), [-1, 1], [0.6, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#030611",
      }}
    >
      {/* Background Volumetric Storm Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 30%, #151a36 0%, #060919 60%, #020308 100%)",
        }}
      />

      {/* Cloud bank layers with backlighting */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -150,
          right: -150,
          height: 900,
          background: "radial-gradient(circle at 50% 40%, rgba(68, 55, 125, 0.35) 0%, rgba(10, 15, 35, 0.9) 70%, transparent 100%)",
          filter: "blur(60px)",
        }}
      />

      {/* Ambient storm flash overlay */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#7000FF",
            opacity: flashOpacity,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Procedural Lightning & Tower SVG Canvas */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          {/* Intense lightning glow filter */}
          <filter id="lightningGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="coronaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 3D Skyscraper Silhouette with lit architectural windows */}
        {/* Tower Base */}
        <polygon
          points="460,1920 620,1920 590,1400 490,1400"
          fill="#060914"
          stroke="rgba(0, 240, 255, 0.2)"
          strokeWidth="1.5"
        />
        {/* Tower Middle Tier */}
        <polygon
          points="490,1400 590,1400 565,1230 515,1230"
          fill="#080d1e"
          stroke="rgba(0, 240, 255, 0.3)"
          strokeWidth="1.5"
        />
        {/* Tower Spire Needle */}
        <line
          x1={spireX}
          y1={1230}
          x2={spireX}
          y2={spireY}
          stroke="#4D6080"
          strokeWidth="4"
        />
        <line
          x1={spireX}
          y1={1230}
          x2={spireX}
          y2={spireY}
          stroke="#00F0FF"
          strokeWidth="1.5"
        />

        {/* Red aircraft warning lights on tower */}
        <circle cx={spireX} cy={1240} r={4} fill="#FF0033" opacity={frame % 30 < 15 ? 1 : 0.2} />
        <circle cx={500} cy={1400} r={3} fill="#FF0033" opacity={frame % 30 < 15 ? 1 : 0.2} />
        <circle cx={580} cy={1400} r={3} fill="#FF0033" opacity={frame % 30 < 15 ? 1 : 0.2} />

        {/* Corona Discharge / St. Elmo's Fire at needle tip */}
        <circle
          cx={spireX}
          cy={spireY}
          r={18 * coronaScale}
          fill="rgba(0, 240, 255, 0.3)"
          filter="url(#coronaGlow)"
          opacity={coronaAlpha}
        />
        <circle
          cx={spireX}
          cy={spireY}
          r={8 * coronaScale}
          fill="#FFFFFF"
          opacity={coronaAlpha}
        />

        {/* Upward Stepped Leader (Positive Streamer) shooting upwards! */}
        {leaderHeight > 50 && (
          <g filter="url(#lightningGlow)">
            {/* Main trunk shooting up from spireY */}
            <path
              d={`M ${spireX} ${spireY} 
                 L ${spireX - 15} ${spireY - leaderHeight * 0.2} 
                 L ${spireX + 25} ${spireY - leaderHeight * 0.4} 
                 L ${spireX - 10} ${spireY - leaderHeight * 0.65} 
                 L ${spireX + 35} ${spireY - leaderHeight * 0.85} 
                 L ${spireX} ${currentLeaderY}`}
              fill="none"
              stroke="#00F0FF"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* White hot lightning core */}
            <path
              d={`M ${spireX} ${spireY} 
                 L ${spireX - 15} ${spireY - leaderHeight * 0.2} 
                 L ${spireX + 25} ${spireY - leaderHeight * 0.4} 
                 L ${spireX - 10} ${spireY - leaderHeight * 0.65} 
                 L ${spireX + 35} ${spireY - leaderHeight * 0.85} 
                 L ${spireX} ${currentLeaderY}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Upward Branches shooting outward and upward */}
            {leaderHeight > 350 && (
              <path
                d={`M ${spireX + 25} ${spireY - leaderHeight * 0.4} 
                   L ${spireX + 110} ${spireY - leaderHeight * 0.55} 
                   L ${spireX + 170} ${spireY - leaderHeight * 0.75}`}
                fill="none"
                stroke="#00F0FF"
                strokeWidth="3.5"
                opacity={0.85}
              />
            )}
            {leaderHeight > 550 && (
              <path
                d={`M ${spireX - 10} ${spireY - leaderHeight * 0.65} 
                   L ${spireX - 120} ${spireY - leaderHeight * 0.78} 
                   L ${spireX - 190} ${spireY - leaderHeight * 0.92}`}
                fill="none"
                stroke="#00F0FF"
                strokeWidth="3.5"
                opacity={0.85}
              />
            )}
          </g>
        )}

        {/* Ambient rain streaks drifting down */}
        {Array.from({ length: 25 }).map((_, i) => {
          const rx = (i * 47 + frame * 3) % 1080;
          const ry = ((i * 83 + frame * 18) % 1920);
          return (
            <line
              key={i}
              x1={rx}
              y1={ry}
              x2={rx - 10}
              y2={ry + 45}
              stroke="rgba(150, 200, 255, 0.25)"
              strokeWidth="1.2"
            />
          );
        })}
      </svg>
    </div>
  );
};
