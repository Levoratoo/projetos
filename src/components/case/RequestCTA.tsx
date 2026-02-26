"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type RequestCTAProps = {
  projectUrl: string;
  className?: string;
};

export function RequestCTA({
  projectUrl,
  className
}: RequestCTAProps) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
            Solicitar projeto
          </p>
          <h2 className="mt-3 text-[clamp(20px,2.6vw,30px)] font-semibold text-white">
            Solicitação interna
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Abra o fluxo interno para iniciar a solicitação.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em]">
          <Link
            href={`${projectUrl}/solicitar`}
            aria-label="Fazer solicitação"
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow sm:w-auto"
          >
            Fazer solicitação
          </Link>
        </div>
      </div>
    </div>
  );
}
