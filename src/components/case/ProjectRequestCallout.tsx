"use client";

import { useMemo, useRef, useState } from "react";
import { buildTeamsSummary, copyToClipboard, ProjectRequestValues } from "@/lib/teamsRequest";

const initialValues: ProjectRequestValues = {
  title: "",
  sector: "",
  requester: "",
  context: "",
  justification: "",
  objective: "",
  impact: "",
  urgency: "Média",
  deadline: "",
  stakeholders: "",
  notesLinks: ""
};

const urgencyOptions: ProjectRequestValues["urgency"][] = [
  "Baixa",
  "Média",
  "Alta"
];

export function ProjectRequestCallout() {
  const [values, setValues] = useState<ProjectRequestValues>(initialValues);
  const [toast, setToast] = useState("");
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);

  const summary = useMemo(() => buildTeamsSummary(values), [values]);

  function update<K extends keyof ProjectRequestValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCopy() {
    await copyToClipboard(summary);
    setToast("Resumo copiado. Agora é só colar no Teams.");
    setTimeout(() => setToast(""), 1800);
    summaryRef.current?.select();
  }

  return (
    <section className="rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
            Solicitar um projeto
          </p>
          <h2 className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold text-white">
            Solicitação interna
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Solicitação interna — gera um resumo pra enviar no Teams.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em]">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-white/10 px-5 py-3 text-mist/70 transition duration-200 hover:-translate-y-0.5 hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
          >
            Copiar resumo
          </button>
          <a
            href="https://teams.microsoft.com/l/chat/48:notes/conversations?context=%7B%22contextType%22%3A%22chat%22%7D"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-5 py-3 text-mist/70 transition duration-200 hover:-translate-y-0.5 hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
          >
            Abrir Teams
          </a>
        </div>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.24em] text-neutral-400">
        Copie o resumo e cole no chat do Teams.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="grid gap-4">
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Nome da solicitação
            </label>
            <input
              value={values.title}
              onChange={(event) => update("title", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Área/Setor
            </label>
            <input
              value={values.sector}
              onChange={(event) => update("sector", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Solicitante
            </label>
            <input
              value={values.requester}
              onChange={(event) => update("requester", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Descrição
            </label>
            <textarea
              value={values.context}
              onChange={(event) => update("context", event.target.value)}
              className="mt-2 min-h-[96px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Justificativa
            </label>
            <textarea
              value={values.justification}
              onChange={(event) => update("justification", event.target.value)}
              className="mt-2 min-h-[96px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Resultado esperado
            </label>
            <textarea
              value={values.objective}
              onChange={(event) => update("objective", event.target.value)}
              className="mt-2 min-h-[96px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Impacto esperado
            </label>
            <textarea
              value={values.impact}
              onChange={(event) => update("impact", event.target.value)}
              className="mt-2 min-h-[96px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
                Urgência
              </label>
              <select
                value={values.urgency}
                onChange={(event) =>
                  update("urgency", event.target.value as ProjectRequestValues["urgency"])
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              >
                {urgencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
                Prazo desejado
              </label>
              <input
                type="date"
                value={values.deadline}
                onChange={(event) => update("deadline", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Stakeholders
            </label>
            <input
              value={values.stakeholders}
              onChange={(event) => update("stakeholders", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Links/Notas
            </label>
            <input
              value={values.notesLinks}
              onChange={(event) => update("notesLinks", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-mist/60">
            Resumo gerado
          </p>
          <textarea
            ref={summaryRef}
            readOnly
            value={summary}
            className="mt-4 min-h-[260px] w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-mist/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            aria-label="Resumo para Teams"
          />
          {toast ? (
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-glow/80">
              {toast}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
