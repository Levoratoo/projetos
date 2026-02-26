"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

function canUseWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

export function Hero() {
  const [enable3d, setEnable3d] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const isMobile = window.innerWidth < 768;
      const allow3d = !reduced.matches && !isMobile && canUseWebGL();
      setEnable3d(allow3d);
    };

    update();
    window.addEventListener("resize", update);
    reduced.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pb-10 pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(86,255,146,0.12),_transparent_60%),radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:56px_56px]" />
      {mounted && enable3d ? (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Hero3D />
        </div>
      ) : null}
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-glow/70">
            WEISUL PROJECTS
          </p>
          <h1 className="mt-4 text-[clamp(24px,3.5vw,38px)] font-semibold text-white">
            Portfólio de entregas
          </h1>
          <p className="mt-3 text-sm text-mist/80 sm:text-base">
            Cases internos com contexto, decisão e impacto.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#cases"
              className="rounded-full border border-glow/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-glow transition hover:border-glow/80"
            >
              Ver cases
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
