"use client";

import { useEffect, useRef, useState } from "react";

type HeroMotionProps = {
  children: React.ReactNode;
  className?: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCoarsePointer() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function HeroMotion({ children, className }: HeroMotionProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!(reduced.matches || coarse.matches));
    update();
    if (reduced.addEventListener) {
      reduced.addEventListener("change", update);
      coarse.addEventListener("change", update);
      return () => {
        reduced.removeEventListener("change", update);
        coarse.removeEventListener("change", update);
      };
    }
    reduced.addListener(update);
    coarse.addListener(update);
    return () => {
      reduced.removeListener(update);
      coarse.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    if (!root) return;

    function onMove(event: MouseEvent) {
      const rect = root.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;
      const nx = (mx / rect.width - 0.5) * 2;
      const ny = (my / rect.height - 0.5) * 2;
      target.current = { x: nx, y: ny };
      root.style.setProperty("--mx", `${mx}px`);
      root.style.setProperty("--my", `${my}px`);
    }

    function onLeave() {
      target.current = { x: 0, y: 0 };
      root.style.setProperty("--mx", "50%");
      root.style.setProperty("--my", "50%");
    }

    function tick() {
      const { x, y } = current.current;
      const tx = target.current.x;
      const ty = target.current.y;
      const nx = x + (tx - x) * 0.08;
      const ny = y + (ty - y) * 0.08;
      current.current = { x: nx, y: ny };

      root.style.setProperty("--hx", `${nx}`);
      root.style.setProperty("--hy", `${ny}`);
      rafRef.current = window.requestAnimationFrame(tick);
    }

    rafRef.current = window.requestAnimationFrame(tick);
    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);
    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        ["--hx" as never]: 0,
        ["--hy" as never]: 0,
        ["--mx" as never]: "50%",
        ["--my" as never]: "50%"
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: enabled ? 0.35 : 0,
          background:
            "radial-gradient(circle at var(--mx) var(--my), rgba(52, 255, 176, 0.10), transparent 55%)"
        }}
      />
      {children}
    </div>
  );
}
