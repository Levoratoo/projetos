"use client";

import { useScroll } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { Container } from "@/components/Container";

const chapters = [
  {
    id: "contexto",
    eyebrow: "Capítulo 01",
    title: "Contexto",
    text: "Portfólio de entregas internas com foco em decisão e operação."
  },
  {
    id: "ruido",
    eyebrow: "Capítulo 02",
    title: "Ruído",
    text: "Onde estavam as fricções e o que precisava ficar claro para agir."
  },
  {
    id: "entregas",
    eyebrow: "Capítulo 03",
    title: "Entregas",
    text: "Dashboards, fluxos e integrações que destravam o time."
  },
  {
    id: "impacto",
    eyebrow: "Capítulo 04",
    title: "Impacto",
    text: "Impacto direto na operação e visibilidade de ponta a ponta."
  }
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

const ranges: Array<[number, number]> = [
  [0, 0.33],
  [0.33, 0.66],
  [0.66, 0.9],
  [0.9, 1]
];

function getOpacity(offset: number, index: number) {
  const [start, end] = ranges[index] ?? [0, 1];
  const fadeIn = clamp((offset - start) / 0.08);
  const fadeOut = clamp((end - offset) / 0.08);
  return Math.min(fadeIn, fadeOut);
}

export function StoryCopy() {
  const scroll = useScroll();
  const offset = scroll?.offset ?? 0;

  const blocks = useMemo(() => {
    return chapters.map((chapter, index) => {
      const opacity = getOpacity(offset, index);
      const translate = (1 - opacity) * 24;
      return {
        ...chapter,
        opacity,
        translate
      };
    });
  }, [offset]);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center">
      <Container>
        <div className="relative max-w-xl">
          {blocks.map((chapter) => (
            <motion.div
              key={chapter.id}
              style={{ opacity: chapter.opacity, y: chapter.translate }}
              className="absolute left-0 top-0 space-y-4"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-glow/70">
                {chapter.eyebrow}
              </p>
              <h2 className="text-[clamp(28px,4vw,46px)] font-semibold text-white">
                {chapter.title}
              </h2>
              <p className="max-w-md text-sm text-mist/80 sm:text-base">
                {chapter.text}
              </p>
              {chapter.id === "impacto" ? (
                <div className="pointer-events-auto pt-4">
                  <Link
                    href="#cases"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                  >
                    Ver cases
                  </Link>
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function StoryCopyStatic() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center">
      <Container>
        <div className="relative max-w-xl space-y-10">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-glow/70">
                {chapter.eyebrow}
              </p>
              <h2 className="text-[clamp(28px,4vw,46px)] font-semibold text-white">
                {chapter.title}
              </h2>
              <p className="max-w-md text-sm text-mist/80 sm:text-base">
                {chapter.text}
              </p>
              {chapter.id === "impacto" ? (
                <div className="pointer-events-auto pt-2">
                  <Link
                    href="#cases"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                  >
                    Ver cases
                  </Link>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
