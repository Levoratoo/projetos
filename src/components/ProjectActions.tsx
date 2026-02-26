"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type ProjectActionsProps = {
  slug: string;
  accessUrl?: string | null;
  onPreview: () => void;
  onViewFull?: () => void;
  className?: string;
};

export function ProjectActions({
  slug,
  accessUrl,
  onPreview,
  onViewFull,
  className
}: ProjectActionsProps) {
  const router = useRouter();
  const hasAccess = Boolean(accessUrl);
  const viewHref = `/projetos/${slug}`;

  const handleViewFull = () => {
    if (onViewFull) {
      onViewFull();
      return;
    }
    router.push(viewHref);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <button
        type="button"
        onClick={onPreview}
        data-preview-focusable
        data-drawer-focusable
        className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-mist/70 transition hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
      >
        Prévia
      </button>
      <button
        type="button"
        onClick={handleViewFull}
        data-preview-focusable
        data-drawer-focusable
        className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-mist/70 transition hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
      >
        Ver descrição completa
      </button>
      {hasAccess ? (
        <a
          href={accessUrl ?? undefined}
          target="_blank"
          rel="noreferrer"
          data-preview-focusable
          data-drawer-focusable
          className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        >
          Ir para o projeto
        </a>
      ) : (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled
            title="Link indisponível"
            data-preview-focusable
            data-drawer-focusable
            aria-disabled="true"
            className="inline-flex items-center justify-center rounded-full bg-emerald-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink/70 opacity-70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
          >
            Ir para o projeto
          </button>
          <span className="text-[11px] uppercase tracking-[0.25em] text-mist/60">
            Link indisponível
          </span>
        </div>
      )}
    </div>
  );
}
