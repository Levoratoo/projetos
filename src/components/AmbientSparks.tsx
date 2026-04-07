import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Só na hero (layer não é global): densidade alta como antes, sem cobrir o resto da página */
const SPARK_COUNT = 500;

type Spark = {
  x: string;
  y: string;
  size: string;
  delay: string;
  duration: string;
  opacity: string;
};

/** PRNG determinístico — mesmo resultado no servidor e no cliente (sem mismatch de hidratação) */
function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickSize(rng: () => number): string {
  const w = rng();
  if (w < 0.32) return "3px";
  if (w < 0.52) return "4px";
  if (w < 0.68) return "5px";
  if (w < 0.82) return "6px";
  if (w < 0.92) return "7px";
  return "8px";
}

function buildSparks(): readonly Spark[] {
  const rng = mulberry32(0x4e62756c61); /* seed fixo: hidratação estável */
  const out: Spark[] = [];
  for (let i = 0; i < SPARK_COUNT; i++) {
    const r = rng();
    const r2 = rng();
    const r3 = rng();
    const rDur = rng();
    const x = `${(r * 100).toFixed(2)}%`;
    const y = `${(r2 * 100).toFixed(2)}%`;
    const size = pickSize(rng);
    const delay = `${-(r3 * 12).toFixed(2)}s`;
    const duration = `${(9 + rDur * 14).toFixed(2)}s`;
    const opacity = `${(0.48 + r2 * 0.52).toFixed(2)}`;
    out.push({ x, y, size, delay, duration, opacity });
  }
  return out;
}

const SPARKS = buildSparks();

export function AmbientSparks({ className }: { className?: string }) {
  return (
    <div className={cn("spark-field", className)} aria-hidden="true">
      {SPARKS.map((spark, index) => (
        <span
          key={index}
          className="spark"
          style={
            {
              "--spark-x": spark.x,
              "--spark-y": spark.y,
              "--spark-size": spark.size,
              "--spark-delay": spark.delay,
              "--spark-duration": spark.duration,
              "--spark-opacity": spark.opacity
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
