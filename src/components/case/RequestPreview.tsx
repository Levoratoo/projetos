"use client";

import { useRef, useState } from "react";

type RequestPreviewProps = {
  summary: string;
};

const TEAMS_URL =
  "https://teams.microsoft.com/l/chat/48:notes/conversations?context=%7B%22contextType%22%3A%22chat%22%7D";

export function RequestPreview({ summary }: RequestPreviewProps) {
  const [toast, setToast] = useState("");
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(summary);
    setToast("Resumo copiado");
    setTimeout(() => setToast(""), 1600);
    summaryRef.current?.select();
  }

  return (
    <aside className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur lg:sticky lg:top-24">
      <p className="text-xs uppercase tracking-[0.3em] text-mist/60">
        Resumo gerado
      </p>
      <textarea
        ref={summaryRef}
        readOnly
        value={summary}
        className="mt-4 min-h-[300px] w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-mist/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        aria-label="Resumo para Teams"
      />
      <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em]">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/10 px-4 py-2 text-mist/70 transition duration-200 hover:-translate-y-0.5 hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        >
          Copiar resumo
        </button>
        <a
          href={TEAMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 px-4 py-2 text-mist/70 transition duration-200 hover:-translate-y-0.5 hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        >
          Abrir Teams
        </a>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-neutral-400">
        Copie o resumo e cole no chat do Teams.
      </p>
      {toast ? (
        <p className="mt-3 text-xs uppercase tracking-[0.24em] text-glow/80">
          {toast}
        </p>
      ) : null}
    </aside>
  );
}
