"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AccessLinkCardProps = {
  url: string;
  className?: string;
  compact?: boolean;
  showNote?: boolean;
};

export function AccessLinkCard({
  url,
  className,
  compact,
  showNote = true
}: AccessLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const handleCopy = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else if (typeof document !== "undefined") {
        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      setCopied(true);
      clearTimer();
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [clearTimer, url]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-white/5 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/30 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-glow/30 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
        Acessar dashboard
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Ambiente interno
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-300">
        Ambiente interno (rede/VPN).
      </p>
      {showNote ? (
        <p className="mt-3 text-xs text-neutral-400">
          Disponível apenas na rede interna/VPN.
        </p>
      ) : null}

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
        <span className="truncate font-mono text-[12px] text-neutral-300">
          {url}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar link do dashboard"
          className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-mist/70 transition duration-200 hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>

      <div className={cn("mt-5 flex gap-3", compact && "flex-col")}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir dashboard em nova aba"
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-glow px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(86,255,146,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
            compact && "w-full"
          )}
        >
          Abrir dashboard
        </a>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar link do dashboard"
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-mist/70 transition duration-200 hover:-translate-y-0.5 hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
            compact && "w-full"
          )}
        >
          Copiar link
        </button>
      </div>
    </div>
  );
}
