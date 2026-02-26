export type EnvPreset = "int" | "studio" | "city";

type LightDef = {
  position: [number, number, number];
  intensity: number;
  color: string;
};

type EnvPresetConfig = {
  hdriFile: string;
  envIntensity: number;
  background: boolean;
  lights: {
    key: LightDef;
    fill: LightDef;
    rim: LightDef;
  };
  materialTuning: {
    metalness: number;
    roughness: number;
    envMapIntensity: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
  };
};

const presets: Record<EnvPreset, EnvPresetConfig> = {
  int: {
    hdriFile: "interior_1k.hdr",
    envIntensity: 0.55,
    background: false,
    lights: {
      key: { position: [3.5, 2.5, 4], intensity: 1.1, color: "#89ffbf" },
      fill: { position: [-2, 1.5, 3], intensity: 0.4, color: "#1b3c2c" },
      rim: { position: [-3.5, 1.5, -3], intensity: 0.6, color: "#49ffb0" }
    },
    materialTuning: {
      metalness: 0.3,
      roughness: 0.32,
      envMapIntensity: 0.6,
      clearcoat: 0.2,
      clearcoatRoughness: 0.5
    }
  },
  studio: {
    hdriFile: "studio_1k.hdr",
    envIntensity: 0.7,
    background: false,
    lights: {
      key: { position: [4, 3, 5], intensity: 1.2, color: "#9bffd1" },
      fill: { position: [-3, 2, 4], intensity: 0.45, color: "#213c2f" },
      rim: { position: [-4, 2.5, -4], intensity: 0.75, color: "#56ffb8" }
    },
    materialTuning: {
      metalness: 0.35,
      roughness: 0.28,
      envMapIntensity: 0.8,
      clearcoat: 0.25,
      clearcoatRoughness: 0.45
    }
  },
  city: {
    hdriFile: "city_1k.hdr",
    envIntensity: 0.85,
    background: false,
    lights: {
      key: { position: [5, 3, 6], intensity: 1.35, color: "#b4ffe0" },
      fill: { position: [-4, 1.5, 5], intensity: 0.5, color: "#1b2d26" },
      rim: { position: [-5, 3, -4], intensity: 0.9, color: "#6bffd0" }
    },
    materialTuning: {
      metalness: 0.4,
      roughness: 0.22,
      envMapIntensity: 1.0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4
    }
  }
};

export function getEnvPreset(preset: EnvPreset): EnvPresetConfig {
  return presets[preset];
}
