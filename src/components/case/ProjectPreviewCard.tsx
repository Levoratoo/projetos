"use client";

import Image from "next/image";
import { ProjectActions } from "@/components/ProjectActions";
import { useProjectPreview } from "@/state/projectPreview";
import { cn } from "@/lib/utils";

type ProjectPreviewCardProps = {
  slug: string;
  accessUrl?: string | null;
  previewSrc?: string;
  className?: string;
};

export function ProjectPreviewCard({
  slug,
  accessUrl,
  previewSrc,
  className
}: ProjectPreviewCardProps) {
  const { openPreview } = useProjectPreview();

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

      <div className="mt-4">
        <ProjectActions
          slug={slug}
          accessUrl={accessUrl}
          onPreview={() => openPreview(slug)}
        />
      </div>
    </div>
  );
}
