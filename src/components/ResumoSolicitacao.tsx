"use client";

import type { RefObject } from "react";
import {
  OWNER_NAME,
  OWNER_TEAM_HINT,
  TEAMS_DIRECT_CHAT_URL,
  TEAMS_FALLBACK_URL
} from "@/config/teams";

export function ResumoSolicitacao({
  resumo,
  onCopy,
  resumoRef
}: {
  resumo: string;
  onCopy: () => void;
  resumoRef: RefObject<HTMLTextAreaElement>;
}) {
  function handleOpenTeams() {
    const url = TEAMS_DIRECT_CHAT_URL || TEAMS_FALLBACK_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="sticky top-24 self-start rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-mist/60">Resumo gerado</p>
      <h2 className="mt-3 text-lg font-semibold text-white">Pronto para o Teams</h2>
      <p className="mt-2 text-sm text-mist/70">
        O resumo segue um formato padrão para agilizar triagem. {OWNER_TEAM_HINT}
      </p>
      <textarea
        ref={resumoRef}
        readOnly
        value={resumo}
        className="mt-4 min-h-[260px] w-full rounded-xl border border-white/10 bg-[#0b0f0e] p-4 text-xs text-mist/80 outline-none"
        aria-label="Resumo da solicitacao"
      />
      <p className="mt-4 text-xs text-mist/60">Destinatário: {OWNER_NAME}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em]">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full border border-glow/40 px-4 py-2 text-glow transition hover:border-glow/80"
        >
          Copiar resumo
        </button>
        <button
          type="button"
          onClick={handleOpenTeams}
          className="rounded-full border border-white/10 px-4 py-2 text-mist/70 transition hover:border-glow/40 hover:text-white"
        >
          Abrir Teams
        </button>
      </div>
      <p className="mt-3 text-xs text-mist/60">
        O resumo já está copiado. Cole no chat e envie.
      </p>
    </div>
  );
}
