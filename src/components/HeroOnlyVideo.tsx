"use client";

import { useEffect, useMemo, useState } from "react";
import { withBasePath } from "@/lib/basePath";

type HeroOnlyVideoProps = {
  src: string;
  poster?: string;
  showNoise?: boolean;
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useSaveData() {
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSaveData(Boolean(connection?.saveData));
  }, []);

  return saveData;
}

export function HeroOnlyVideo({ src, poster, showNoise = true }: HeroOnlyVideoProps) {
  const reducedMotion = useReducedMotion();
  const saveData = useSaveData();
  const shouldPlay = !reducedMotion && !saveData;
  const resolvedSrc = withBasePath(src);
  const resolvedPoster = poster ? withBasePath(poster) : undefined;

  const noiseStyle = useMemo(() => {
    if (!showNoise) return undefined;
    const data =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E";
    return {
      backgroundImage: `url('${data}')`
    } as React.CSSProperties;
  }, [showNoise]);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {shouldPlay ? (
          <video
            className="h-full w-full object-cover"
            src={resolvedSrc}
            poster={resolvedPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(86,255,146,0.12),_transparent_55%),linear-gradient(180deg,rgba(8,10,12,0.9),rgba(8,10,12,0.55))]">
            {poster ? (
              <img
                src={resolvedPoster}
                alt=""
                className="h-full w-full object-cover"
                aria-hidden="true"
              />
            ) : null}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />
      {showNoise ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
          style={noiseStyle}
        />
      ) : null}
    </section>
  );
}
