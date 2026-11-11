/**
 * FAKTA MASUK AKAL - LAYER COMPONENT
 * Wrapper individual untuk setiap tingkatan kedalaman adegan (background, midground, focal plane, foreground, overlay).
 */

import React, { useContext } from "react";
import { computeLayerTransform } from "../motion/camera";
import {
  LayerOverscanConfig,
  LayerProps,
  LayerRole,
  SceneContext,
} from "./types";

export const DEFAULT_ROLE_DEPTHS: Record<LayerRole, number> = {
  background: 0.2,
  midground: 0.6,
  mainObject: 1.0,
  foreground: 1.4,
  overlay: 1.0,
  text: 1.0,
  subtitle: 1.0,
};

export const DEFAULT_ROLE_Z_INDEX: Record<LayerRole, number> = {
  background: 10,
  midground: 20,
  mainObject: 30,
  foreground: 40,
  text: 50,
  subtitle: 60,
  overlay: 70,
};

/**
 * Menghitung skala overscan geometris secara selektif.
 * KETENTUAN MUTLAK:
 * Role mainObject, text, overlay, dan subtitle DILARANG memiliki overscan otomatis (selalu 1.0).
 * Hanya role background dan midground yang diizinkan memperbesar kanvas jika dikonfigurasi aktif.
 */
export function getEffectiveOverscanScale(
  role: LayerRole,
  overscan?: LayerOverscanConfig
): number {
  if (
    role === "mainObject" ||
    role === "text" ||
    role === "overlay" ||
    role === "subtitle"
  ) {
    return 1.0;
  }

  if (overscan?.enabled && typeof overscan.factor === "number" && overscan.factor > 1.0) {
    return overscan.factor;
  }

  return 1.0;
}

export const Layer: React.FC<LayerProps> = ({
  id,
  role,
  depth,
  overscan,
  isScreenFixed,
  zIndex,
  opacity,
  className,
  style,
  children,
}) => {
  const { camera, center } = useContext(SceneContext);

  const effectiveDepth = depth ?? DEFAULT_ROLE_DEPTHS[role];
  const effectiveScreenFixed =
    isScreenFixed ?? (role === "overlay" || role === "subtitle");

  // 1. Skala & translasi murni akibat pergerakan kamera
  const cameraTransform = computeLayerTransform(
    camera,
    effectiveDepth,
    effectiveScreenFixed,
    center
  );

  // 2. Skala overscan terpisah (hanya berlaku jika layer memenuhi syarat)
  const overscanScale = getEffectiveOverscanScale(role, overscan);

  // 3. Skala gabungan total
  const finalScale = cameraTransform.cameraScale * overscanScale;

  return (
    <div
      id={`layer-${id}`}
      data-layer-id={id}
      data-layer-role={role}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: zIndex ?? DEFAULT_ROLE_Z_INDEX[role],
        opacity: opacity ?? 1,
        transform: `translate3d(${cameraTransform.translateX}px, ${cameraTransform.translateY}px, 0px) scale(${finalScale})`,
        transformOrigin: `${center.x}px ${center.y}px`,
        pointerEvents: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
