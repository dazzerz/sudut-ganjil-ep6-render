/**
 * FAKTA MASUK AKAL - SCENE & LAYER TYPES
 * Definisi layer berlapis, peran fungsional (roles), dan aturan overscan selektif.
 */

import React, { createContext } from "react";
import { VIEWPORT_CONFIG } from "../design-system/layout";
import { DEFAULT_CAMERA_STATE } from "../motion/camera";
import type { CameraState, Vector2D } from "../motion/types";

/**
 * Peran fungsional setiap lapisan dalam adegan 2.5D.
 */
export type LayerRole =
  | "background"  // Latar jauh / grid / tekstur (depth rendah, boleh overscan)
  | "midground"   // Elemen lingkungan kontekstual (depth sedang, boleh overscan)
  | "mainObject"  // Objek/karakter/diagram fokus (depth 1.0, DILARANG overscan otomatis)
  | "foreground"  // Elemen aksen dekat kamera (depth > 1.0)
  | "overlay"     // HUD / frame / watermark statis (kebal kamera, overscan 1.0 murni)
  | "text"        // Tipografi judul / label (kebal kamera atau depth terkontrol, overscan 1.0)
  | "subtitle";   // Teks narasi di safe zone (kebal kamera, overscan 1.0 murni)

/**
 * Konfigurasi overscan selektif per layer.
 * Berguna untuk memperluas kanvas layer background/midground agar tidak bocor
 * saat kamera melakukan panning atau zoom-out.
 */
export interface LayerOverscanConfig {
  enabled: boolean;
  factor: number; // Skala overscan geometris, default 1.0. Contoh: 1.2 = +20% buffer
}

/**
 * Properti untuk komponen individual Layer.
 */
export interface LayerProps {
  id: string;
  role: LayerRole;
  depth?: number;                 // Jika tidak diisi, ditentukan otomatis berdasarkan role
  overscan?: LayerOverscanConfig; // Hanya efektif untuk role background/midground
  isScreenFixed?: boolean;        // Jika true, mengabaikan pergerakan kamera
  zIndex?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Konteks yang dibagikan oleh LayeredScene ke setiap anak Layer.
 */
export interface SceneContextValue {
  camera: CameraState;
  center: Vector2D;
  width: number;
  height: number;
}

export const defaultSceneContextValue: SceneContextValue = {
  camera: DEFAULT_CAMERA_STATE,
  center: VIEWPORT_CONFIG.center,
  width: VIEWPORT_CONFIG.width,
  height: VIEWPORT_CONFIG.height,
};

export const SceneContext = createContext<SceneContextValue>(defaultSceneContextValue);

/**
 * Properti untuk komponen induk LayeredScene.
 */
export interface LayeredSceneProps {
  camera?: CameraState;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}
