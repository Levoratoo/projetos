"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { previewProjects } from "@/data/projects";
import { ProjectChapter } from "@/components/home/ProjectChapter";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function HomeScrollProjects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    function update() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height - viewport;
      const raw = total > 0 ? (-rect.top / total) : 0;
      setProgress(clamp(raw, 0, 1));
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
  }, []);

  return (
    <section ref={containerRef} className="relative scroll-smooth bg-[#0b0f0c]">
      <div className="pointer-events-none sticky top-0 z-30 h-[2px] w-full bg-white/10">
        <div className="h-full bg-emerald-300" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      <div className="bg-[radial-gradient(circle_at_top,_rgba(86,255,146,0.12),_transparent_60%),linear-gradient(180deg,rgba(8,12,10,0.9),rgba(8,12,10,0.9))]">
        <Container>
          <div className="snap-y snap-mandatory md:snap-mandatory">
            {previewProjects.map((project, index) => (
              <ProjectChapter key={project.slug} project={project} priority={index === 0} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
