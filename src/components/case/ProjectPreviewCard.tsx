"use client";

import Image from "next/image";
import { isPublicProjectUrl } from "@/components/ProjectActions";
import { cn } from "@/lib/utils";

type ProjectPreviewCardProps = {
  accessUrl?: string | null;
  previewSrc?: string;
  className?: string;
};

export function ProjectPreviewCard({
  accessUrl,
  previewSrc,
  className
}: ProjectPreviewCardProps) {
  const hasAccess = isPublicProjectUrl(accessUrl);

  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-black/40 p-6 shadow-[0_26px_70px_rgba(0,0,0,0.5)] backdrop-blur",
        className
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
        Preview do projeto
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/60">
        <div className="relative aspect-video">
          {previewSrc ? (
            <Image
              src={previewSrc}
              alt="Preview do projeto"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-neutral-400">
              Preview indispon?vel
            </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,12,0.1),rgba(6,10,12,0.85))]" />
          <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-neutral-200">
            Preview
          </div>
        </div>
      </div>

      <div className="mt-5">
        {hasAccess ? (
          <a
            href={accessUrl ?? undefined}
            target="_blank"
            rel="noreferrer"
            className="primary-cta group flex w-full items-center justify-between px-6 py-4 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow sm:text-base"
            style={{
              background:
                "linear-gradient(180deg, rgba(134,22,28,0.98) 0%, rgba(112,16,23,0.99) 48%, rgba(88,10,18,1) 100%)",
              border: "1px solid rgba(255,116,116,0.28)",
              boxShadow:
                "inset 0 1px 0 rgba(255,214,214,0.18), inset 0 0 0 1px rgba(255,120,120,0.06), 0 0 0 1px rgba(255,88,88,0.12), 0 0 18px rgba(255,74,74,0.2), 0 14px 30px rgba(40,0,0,0.42)"
            }}
          >
            <span>Ir para o projeto</span>
            <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
              -&gt;
            </span>
          </a>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              disabled
              title="Link indisponível"
              aria-disabled="true"
              className="primary-cta primary-cta--muted flex w-full items-center justify-center px-6 py-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow sm:text-base"
              style={{
                background:
                  "linear-gradient(180deg, rgba(90,16,22,0.94) 0%, rgba(64,10,14,0.96) 100%)",
                border: "1px solid rgba(255,88,88,0.16)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.34)"
              }}
            >
              Ir para o projeto
            </button>
            <span className="text-[11px] uppercase tracking-[0.25em] text-mist/60">
              Link indisponível
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
