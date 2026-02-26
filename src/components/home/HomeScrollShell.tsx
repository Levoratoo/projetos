"use client";

import { useEffect, useMemo, useRef } from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeProjectChapters } from "@/components/home/HomeProjectChapters";

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getSaveData() {
  if (typeof window === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
}

export function HomeScrollShell() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const chaptersRef = useRef<HTMLDivElement | null>(null);
  const hasAutoJumped = useRef(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    const reducedMotion = getReducedMotion();
    const saveData = getSaveData();
    if (reducedMotion || saveData) return;

    function onWheel(event: WheelEvent) {
      if (hasAutoJumped.current || isAnimating.current) return;
      if (window.scrollY > 8) return;
      if (event.deltaY <= 0) return;
      event.preventDefault();
      isAnimating.current = true;
      chaptersRef.current?.scrollIntoView({ behavior: "smooth" });
      hasAutoJumped.current = true;
      setTimeout(() => {
        isAnimating.current = false;
      }, 700);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const snapClass = useMemo(() => {
    if (typeof window === "undefined") return "snap-y snap-mandatory";
    return window.innerWidth < 768 ? "snap-y snap-proximity" : "snap-y snap-mandatory";
  }, []);

  return (
    <div className={snapClass}>
      <section id="home-hero" className="h-screen snap-start" ref={heroRef}>
        <HomeHero />
      </section>
      <section id="home-chapters" className="min-h-screen snap-start" ref={chaptersRef}>
        <HomeProjectChapters />
      </section>
    </div>
  );
}
