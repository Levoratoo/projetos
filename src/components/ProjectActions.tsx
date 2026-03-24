"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ProjectActionsProps = {
  slug: string;
  accessUrl?: string | null;
  onPreview: () => void;
  /** Ex.: fechar modal de prévia antes de seguir o <Link> “Ver descrição completa” */
  onBeforeNavigateToCase?: () => void;
  className?: string;
};

function isPublicProjectUrl(value?: string | null) {
  if (!value) return false;

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;

    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host === "::1") return false;
    if (/^10\./.test(host)) return false;
    if (/^192\.168\./.test(host)) return false;
    if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return false;

    return true;
  } catch {
    return false;
  }
}

export function ProjectActions({
  slug,
  accessUrl,
  onPreview,
  onBeforeNavigateToCase,
  className
}: ProjectActionsProps) {
  const hasAccess = isPublicProjectUrl(accessUrl);
  /** trailingSlash no next.config — href alinhado ao export estático */
  const caseHref = `/projetos/${slug}/`;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <button
        type="button"
        onClick={onPreview}
        data-preview-focusable
        data-drawer-focusable
        className="ghost-button ghost-button--sm px-4 py-2 text-xs uppercase tracking-[0.25em] text-mist/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
      >
        Prévia
      </button>
      <Link
        href={caseHref}
        data-preview-focusable
        data-drawer-focusable
        onClick={() => onBeforeNavigateToCase?.()}
        className="ghost-button ghost-button--sm inline-flex px-4 py-2 text-xs uppercase tracking-[0.25em] text-mist/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
      >
        Ver descrição completa
      </Link>
      {hasAccess ? (
        <a
          href={accessUrl ?? undefined}
          target="_blank"
          rel="noreferrer"
          data-preview-focusable
          data-drawer-focusable
          className="primary-cta primary-cta--sm primary-cta--glass px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
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
            className="primary-cta primary-cta--sm primary-cta--glass primary-cta--muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
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
