"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type SectionItem = {
  id: string;
  label: string;
};

type CaseTourNavProps = {
  sections: SectionItem[];
  className?: string;
};

export function CaseTourNav({ sections, className }: CaseTourNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  const ids = useMemo(() => sections.map((item) => item.id), [sections]);

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

  return (
    <div
      className={cn(
        "sticky top-[72px] z-20 rounded-full border border-white/10 bg-black/40 px-2 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur",
        className
      )}
    >
      <nav className="flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-400">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "rounded-full border border-transparent px-3 py-2 transition duration-200 hover:border-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
              activeId === section.id
                ? "bg-white/10 text-white"
                : "text-neutral-400"
            )}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
