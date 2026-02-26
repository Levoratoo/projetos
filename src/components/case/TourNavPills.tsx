"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TourNavItem = {
  id: string;
  label: string;
};

type TourNavPillsProps = {
  items: TourNavItem[];
  className?: string;
};

export function TourNavPills({ items, className }: TourNavPillsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (ids.length === 0) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLAnchorElement>(
      `a[data-id="${activeId}"]`
    );
    if (!active) return;
    const offset =
      active.offsetLeft - container.clientWidth / 2 + active.clientWidth / 2;
    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [activeId]);

  function handleClick(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className={cn(
        "sticky top-[72px] z-20 rounded-full border border-white/10 bg-black/40 px-2 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur",
        className
      )}
    >
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto px-1 text-[11px] uppercase tracking-[0.22em] text-neutral-400 [scrollbar-width:none]"
      >
        {items.map((item) => (
          <a
            key={item.id}
            data-id={item.id}
            href={`#${item.id}`}
            onClick={(event) => {
              event.preventDefault();
              handleClick(item.id);
            }}
            className={cn(
              "relative whitespace-nowrap rounded-full border border-transparent px-4 py-2 transition duration-200 hover:border-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
              activeId === item.id
                ? "bg-white/10 text-white"
                : "text-neutral-400"
            )}
          >
            {item.label}
            {activeId === item.id ? (
              <span className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-glow/80" />
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}
