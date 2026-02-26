import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CaseSectionCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export function CaseSectionCard({
  title,
  eyebrow,
  children,
  className
}: CaseSectionCardProps) {
  return (
    <section
      className={cn(
        "group h-full rounded-3xl border border-white/5 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/30 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-glow/30 hover:shadow-[0_26px_70px_rgba(0,0,0,0.45)] sm:p-7",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-[clamp(18px,2.2vw,24px)] font-semibold text-white">
        {title}
      </h2>
      <div className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}
