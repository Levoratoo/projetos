"use client";

import { useEffect, useRef, useState } from "react";
import { homeProjects } from "@/data/projects";
import { HomeHero } from "@/components/home/HomeHero";
import { ProjectSection } from "@/components/projects/ProjectSection";

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

function useSaveData() {
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    setSaveData(Boolean(connection?.saveData));
  }, []);

  return saveData;
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      "input, textarea, select, button, a, [contenteditable='true'], [role='dialog']"
    )
  );
}

function isScrollableRegion(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  const scrollBlocker = target.closest("[data-scroll-block='true']");
  if (!scrollBlocker) return false;
  return (scrollBlocker as HTMLElement).scrollHeight > (scrollBlocker as HTMLElement).clientHeight;
}

export function SnapHome() {
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const saveData = useSaveData();

  useEffect(() => {
    if (reducedMotion || saveData) return;

    const isAnimating = { current: false };
    const lastTrigger = { current: 0 };

    function getClosestIndex() {
      const scrollY = window.scrollY;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        const distance = Math.abs(scrollY - section.offsetTop);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      return closestIndex;
    }

    function scrollToIndex(index: number) {
      const target = sectionsRef.current[index];
      if (!target) return;
      isAnimating.current = true;
      lastTrigger.current = Date.now();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        isAnimating.current = false;
      }, 700);
    }

    function canTrigger() {
      if (isAnimating.current) return false;
      const now = Date.now();
      if (now - lastTrigger.current < 650) return false;
      const modalOpen = document.querySelector("[role='dialog'][aria-modal='true']");
      if (modalOpen) return false;
      return true;
    }

    function onWheel(event: WheelEvent) {
      if (!canTrigger()) return;
      if (isInteractiveTarget(event.target)) return;
      if (isScrollableRegion(event.target)) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      if (Math.abs(event.deltaY) < 4) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = getClosestIndex();
      const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        sectionsRef.current.length - 1
      );

      if (nextIndex === currentIndex) return;
      event.preventDefault();
      scrollToIndex(nextIndex);
    }

    function onKey(event: KeyboardEvent) {
      if (!canTrigger()) return;
      const active = document.activeElement;
      if (isInteractiveTarget(active)) return;

      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        const currentIndex = getClosestIndex();
        scrollToIndex(Math.min(currentIndex + 1, sectionsRef.current.length - 1));
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        const currentIndex = getClosestIndex();
        scrollToIndex(Math.max(currentIndex - 1, 0));
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [reducedMotion, saveData]);

  return (
    <div className="relative bg-[#0b0f0c] snap-y snap-proximity md:snap-mandatory">
      <section
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        id="home-hero"
        className="h-screen snap-start"
      >
        <HomeHero />
      </section>
      {homeProjects.map((project, index) => (
        <ProjectSection
          key={project.slug}
          ref={(el) => {
            sectionsRef.current[index + 1] = el;
          }}
          project={project}
          priorityImage={index === 0}
        />
      ))}
    </div>
  );
}
