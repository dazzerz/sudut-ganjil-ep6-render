/**
 * FAKTA MASUK AKAL - LAYERED SCENE COMPONENT
 * Kontainer utama yang mengorkestrasi lapisan-lapisan 2.5D dan menyalurkan konteks kamera.
 */

import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { defaultFaktaTheme } from "../design-system/theme";
import { VIEWPORT_CONFIG } from "../design-system/layout";
import { DEFAULT_CAMERA_STATE } from "../motion/camera";
import {
  LayeredSceneProps,
  SceneContext,
  SceneContextValue,
} from "./types";

export const LayeredScene: React.FC<LayeredSceneProps> = ({
  camera = DEFAULT_CAMERA_STATE,
  width = VIEWPORT_CONFIG.width,
  height = VIEWPORT_CONFIG.height,
  style,
  className,
  children,
}) => {
  const center = useMemo(
    () => ({
      x: width / 2,
      y: height / 2,
    }),
    [width, height]
  );

  const contextValue: SceneContextValue = useMemo(
    () => ({
      camera,
      center,
      width,
      height,
    }),
    [camera, center, width, height]
  );

  return (
    <SceneContext.Provider value={contextValue}>
      <AbsoluteFill
        className={className}
        style={{
          width,
          height,
          backgroundColor: defaultFaktaTheme.colors.background,
          overflow: "hidden",
          position: "relative",
          ...style,
        }}
      >
        {children}
      </AbsoluteFill>
    </SceneContext.Provider>
  );
};
