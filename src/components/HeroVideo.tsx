"use client";

import { useEffect, useMemo, useState } from "react";

// HeroVideo: coloque arquivos em /public/video e troque a prop src (ex: /video/seminfo.mp4).
// Recomendado: MP4 H.264 + tamanho reduzido (até ~8-12MB) para carregamento rápido.

type HeroVideoProps = {
  src: string;
  poster?: string;
  heightClass?: string;
  showNoise?: boolean;
  enableBlur?: boolean;
  children: React.ReactNode;
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

export function HeroVideo({
  src,
  poster,
  heightClass = "h-[70vh] min-h-[520px]",
  showNoise = true,
  enableBlur = false,
  children
}: HeroVideoProps) {
  const reducedMotion = useReducedMotion();
  const saveData = useSaveData();
  const shouldPlay = !reducedMotion && !saveData;

  const noiseStyle = useMemo(() => {
    if (!showNoise) return undefined;
    const data =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E";
    return {
      backgroundImage: `url('${data}')`
    } as React.CSSProperties;
  }, [showNoise]);

  return (
    <section className={`relative overflow-hidden ${heightClass}`}>
      <div className="absolute inset-0">
        {shouldPlay ? (
          <video
            className={`h-full w-full object-cover ${enableBlur ? "md:blur-[2px]" : ""}`}
            src={src}
            poster={poster}
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
                src={poster}
                alt=""
                className="h-full w-full object-cover"
                aria-hidden="true"
              />
            ) : null}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      {showNoise ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light"
          style={noiseStyle}
        />
      ) : null}

      <div className="relative z-10 flex h-full items-center">
        {children}
      </div>
    </section>
  );
}
