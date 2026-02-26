"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { HeroMotion } from "@/components/HeroMotion";

const HERO_COPY = {
  kicker: "WEISUL PROJECTS",
  title: "Portfólio de projetos",
  subtitle: "Cases internos com contexto, decisão e impacto.",
  chips: ["Next.js", "TypeScript", "SQL Server", "Dashboards", "Automação"],
  scrollHint: "Role para ver os cases"
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
}

export function HomeHero() {
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      return;
    }
    const id = window.setTimeout(() => setEntered(true), 80);
    return () => window.clearTimeout(id);
  }, [reducedMotion]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070A08]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(86,255,146,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(18,120,90,0.16),transparent_60%),linear-gradient(180deg,rgba(4,6,7,0.92),rgba(8,10,9,0.8))]" />
      <div className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(transparent_0%,rgba(255,255,255,0.05)_12%,transparent_24%)] [background-size:100%_8px]" />
      <div className="absolute inset-0 -z-10 opacity-[0.05] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27 opacity=%270.4%27/%3E%3C/svg%3E')]" />
      <div className="absolute inset-0 -z-10 shadow-[inset_0_0_240px_rgba(0,0,0,0.78)]" />

      <HeroMotion className="relative z-10 flex min-h-screen w-full items-center">
        <Container>
          <div
            className={`max-w-4xl transition-all duration-700 ${
              entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <p
              className="text-xs uppercase tracking-[0.45em] text-emerald-200/70"
              style={{
                transform:
                  reducedMotion
                    ? undefined
                    : "translate3d(calc(var(--hx) * 6px), calc(var(--hy) * 4px), 0)"
              }}
            >
              {HERO_COPY.kicker}
            </p>
            <h1
              className="mt-7 text-[clamp(54px,7vw,96px)] font-semibold leading-[1.02] text-white"
              style={{
                transform:
                  reducedMotion
                    ? undefined
                    : "translate3d(calc(var(--hx) * 12px), calc(var(--hy) * 8px), 0)"
              }}
            >
              <span className="relative inline-block">
                <span className="absolute -left-6 -top-6 h-16 w-40 rounded-full bg-emerald-300/10 blur-2xl" />
                <span className="shineText">Portfólio de projetos</span>
              </span>
            </h1>
            <div
              style={{
                transform:
                  reducedMotion
                    ? undefined
                    : "translate3d(calc(var(--hx) * 9px), calc(var(--hy) * 6px), 0)"
              }}
            >
              <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.7vw,24px)] text-mist/80">
                {HERO_COPY.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-[clamp(12px,1.2vw,14px)] uppercase tracking-[0.22em] text-mist/70">
                {HERO_COPY.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur transition hover:border-emerald-300/40 hover:bg-white/10"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/projetos"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-ink shadow-[0_12px_30px_rgba(74,222,128,0.2)] transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-[0_18px_40px_rgba(74,222,128,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                >
                  Ver projetos
                  <span aria-hidden className="text-base">-&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </HeroMotion>

      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60">
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-white/20">
          <span
            className={`mt-2 h-2 w-2 rounded-full bg-white/70 transition ${
              reducedMotion ? "" : "motion-safe:animate-bounce"
            }`}
          />
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">
          {HERO_COPY.scrollHint}
        </p>
      </div>
    </section>
  );
}

