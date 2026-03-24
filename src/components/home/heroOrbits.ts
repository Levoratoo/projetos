import type { PreviewProject } from "@/data/projects";

/** Quantos planetas no hero (resto dos projetos só nas secções abaixo) */
export const HERO_ORBIT_MAX = 5;

/** Segundos por volta — uma velocidade por planeta (índice 0 = órbita mais interna) */
const ORBIT_DURATION_BY_INDEX: readonly number[] = [8.5, 15, 10.5, 18, 12];

/** Bolinha + linha de órbita: bordô / vermelho do site */
const SITE_ORBIT = {
  core: "#b01022",
  glow: "rgba(255, 59, 59, 0.5)",
  ringStroke: "rgba(200, 32, 48, 0.38)",
  ringGlow: "rgba(255, 59, 59, 0.12)"
} as const;

export type HeroOrbitConfig = {
  project: PreviewProject;
  hash: string;
  radius: string;
  ringDiameter: string;
  size: string;
  duration: string;
  delay: string;
  angle: string;
  retrograde: boolean;
  core: string;
  glow: string;
  ex: string;
  ey: string;
  planeTilt: string;
  ringStroke: string;
  ringGlow: string;
  dotPulseDelay: string;
};

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(r: () => number, min: number, max: number): number {
  return min + r() * (max - min);
}

/**
 * Poucos planetas no hero; cada um com anel fino + bolinha a orbitar.
 */
export function buildHeroOrbits(projects: readonly PreviewProject[]): HeroOrbitConfig[] {
  const list = projects.slice(0, HERO_ORBIT_MAX);
  const n = list.length || 1;

  /** Maior escala no hero (raio externo ~58+4×28 = 170px → ~340px + margem) */
  const ringStep = 28;
  const firstRadius = 58;
  return list.map((project, index) => {
    const seed = hashString(project.slug) ^ (index * 0x9e3779b9);
    const rng = mulberry32(seed);
    const r = () => rng();

    const radiusPx = firstRadius + index * ringStep;

    const sector = (360 / n) * index;
    const jitterDeg = (hashString(project.slug) % 19) - 9;
    const angleDeg = (sector + jitterDeg + 360) % 360;

    const durationSec = ORBIT_DURATION_BY_INDEX[index] ?? 12;
    const delaySec = -(index * (durationSec / n)) - pick(r, 0, 1.5);

    const retrograde = r() > 0.5;

    const ex = pick(r, 0.9, 1.06);
    const ey = pick(r, 0.9, 1.06);

    const planeTilt = pick(r, -10, 10);

    const dotPx = 14;

    const dotPulseDelay = `${pick(r, 0, 2.5).toFixed(2)}s`;

    const hash = index === 0 ? "home-chapters" : `project-${project.slug}`;

    /**
     * Diâmetro = 2 × raio da órbita para o traço coincidir com o caminho da bolinha
     * (antes estava +dot+8px e a bolinha ficava “no meio” por dentro do anel).
     */
    const ringDiameterPx = radiusPx * 2;

    return {
      project,
      hash,
      radius: `${radiusPx}px`,
      ringDiameter: `${ringDiameterPx}px`,
      size: `${dotPx}px`,
      duration: `${durationSec.toFixed(2)}s`,
      delay: `${delaySec.toFixed(2)}s`,
      angle: `${angleDeg.toFixed(2)}deg`,
      retrograde,
      core: SITE_ORBIT.core,
      glow: SITE_ORBIT.glow,
      ex: ex.toFixed(4),
      ey: ey.toFixed(4),
      planeTilt: `${planeTilt.toFixed(2)}deg`,
      ringStroke: SITE_ORBIT.ringStroke,
      ringGlow: SITE_ORBIT.ringGlow,
      dotPulseDelay
    };
  });
}
