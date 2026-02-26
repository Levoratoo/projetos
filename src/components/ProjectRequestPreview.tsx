"use client";

import { RefObject } from "react";

export function ProjectRequestPreview({
  summary,
  summaryRef
}: {
  summary: string;
  summaryRef: RefObject<HTMLTextAreaElement>;
}) {
  return (
    <div className="sticky top-24 self-start rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-mist/60">Resumo para Teams</p>
      <h2 className="mt-3 text-lg font-semibold text-white">Atualizado em tempo real</h2>
      <p className="mt-2 text-sm text-mist/70">
        O resumo já vem formatado para colar no chat.
      </p>
      <textarea
        ref={summaryRef}
        readOnly
        value={summary}
        className="mt-4 min-h-[320px] w-full rounded-xl border border-white/10 bg-[#0b0f0e] p-4 text-xs text-mist/80 outline-none"
        aria-label="Resumo da solicitacao"
      />
    </div>
  );
}
