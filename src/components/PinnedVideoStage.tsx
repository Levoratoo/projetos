"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { withBasePath } from "@/lib/basePath";
import { Container } from "@/components/Container";
import { ProjectActions } from "@/components/ProjectActions";
import { previewProjects } from "@/data/projects";
import { useProjectPreview } from "@/state/projectPreview";

type PinnedVideoStageProps = {
  src: string;
  poster?: string;
  heightClass?: string;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

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

export function PinnedVideoStage({ src, poster, heightClass = "h-[320vh]" }: PinnedVideoStageProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const { openPreview } = useProjectPreview();
  const reducedMotion = useReducedMotion();
  const saveData = useSaveData();
  const shouldPlay = !reducedMotion && !saveData;
  const resolvedSrc = withBasePath(src);
  const resolvedPoster = poster ? withBasePath(poster) : undefined;

  const chapters = useMemo(() => previewProjects.slice(0, 4), []);

  useEffect(() => {
    let raf = 0;

    function update() {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height - viewport;
      const raw = total > 0 ? (-rect.top / total) : 0;
      const nextProgress = clamp(raw, 0, 1);
      const nextActive = clamp(Math.floor(nextProgress * chapters.length), 0, chapters.length - 1);

      setProgress(nextProgress);
      setActive((prev) => (prev === nextActive ? prev : nextActive));
    }

    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [chapters.length]);

  return (
    <section ref={stageRef} className={`relative ${heightClass}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
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

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        <Container>
          <div className="relative z-10 flex h-screen items-center">
            <div className="max-w-2xl">
              {chapters.map((chapter, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={chapter.slug}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.35em] text-glow/70">
                      {chapter.area} · {chapter.year} · {chapter.status}
                    </p>
                    <h2 className="mt-4 text-[clamp(26px,3.6vw,42px)] font-semibold text-white">
                      {chapter.title}
                    </h2>
                    {chapter.description ? (
                      <p className="mt-4 text-sm text-mist/80 sm:text-base">
                        {chapter.description}
                      </p>
                    ) : null}
                    {chapter.bullets ? (
                      <ul className="mt-4 space-y-2 text-sm text-mist/80">
                        {chapter.bullets.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-6 pointer-events-auto">
                      <ProjectActions
                        slug={chapter.slug}
                        accessUrl={chapter.accessLinks?.[0]?.url}
                        onPreview={() => openPreview(chapter.slug)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute bottom-10 left-0 right-0">
          <Container>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {chapters.map((chapter, index) => (
                  <span
                    key={chapter.slug}
                    className={`h-2 w-2 rounded-full transition ${
                      index === active ? "bg-emerald-300" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <div className="h-[2px] flex-1 bg-white/10">
                <div
                  className="h-full bg-emerald-300 transition-all"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
