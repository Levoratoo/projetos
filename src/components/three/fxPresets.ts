export type FxQuality = "low" | "med" | "high";

type FxPreset = {
  exposure: number;
  bloomIntensity: number;
  bloomThreshold: number;
  bloomSmoothing: number;
  noiseOpacity: number;
  vignetteOffset: number;
  vignetteDarkness: number;
  dofFocusDistance: number;
  dofFocalLength: number;
  dofBokehScale: number;
  dofHeight: number;
};

const presets: Record<FxQuality, FxPreset> = {
  low: {
    exposure: 1.05,
    bloomIntensity: 0.18,
    bloomThreshold: 0.85,
    bloomSmoothing: 0.85,
    noiseOpacity: 0.05,
    vignetteOffset: 0.22,
    vignetteDarkness: 0.65,
    dofFocusDistance: 0.03,
    dofFocalLength: 0.03,
    dofBokehScale: 1.8,
    dofHeight: 360
  },
  med: {
    exposure: 1.12,
    bloomIntensity: 0.28,
    bloomThreshold: 0.78,
    bloomSmoothing: 0.9,
    noiseOpacity: 0.08,
    vignetteOffset: 0.25,
    vignetteDarkness: 0.75,
    dofFocusDistance: 0.03,
    dofFocalLength: 0.03,
    dofBokehScale: 2.0,
    dofHeight: 480
  },
  high: {
    exposure: 1.18,
    bloomIntensity: 0.35,
    bloomThreshold: 0.72,
    bloomSmoothing: 0.92,
    noiseOpacity: 0.1,
    vignetteOffset: 0.28,
    vignetteDarkness: 0.82,
    dofFocusDistance: 0.028,
    dofFocalLength: 0.035,
    dofBokehScale: 2.6,
    dofHeight: 720
  }
};

export function getFxPreset(q: FxQuality): FxPreset {
  return presets[q];
}
