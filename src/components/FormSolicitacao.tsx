"use client";

import { useMemo, useRef, useState } from "react";
import { buildResumoSolicitacao, SolicitarProjetoData } from "@/lib/solicitacao";
import { ResumoSolicitacao } from "@/components/ResumoSolicitacao";

const tipoOptions = ["Dashboard", "Integração", "Melhoria", "Correção", "Automação"];
const impactoOptions = ["Baixo", "Médio", "Alto", "Crítico"];
const dadosOptions = ["Já existe", "Precisa mapear", "Não sei"];

const emptyData: SolicitarProjetoData = {
  solicitanteNome: "",
  areaSetor: "",
  tipo: "Dashboard",
  objetivoCurto: "",
  contextoProblema: "",
  impacto: "Médio",
  prazoDesejado: "",
  justificativaPrazo: "",
  dadosDisponiveis: "",
  links: [],
  observacoes: ""
};

type ErrorState = Partial<Record<keyof SolicitarProjetoData, string>>;

export function FormSolicitacao({
  data,
  onChange
}: {
  data: SolicitarProjetoData;
  onChange: (next: SolicitarProjetoData) => void;
}) {
  const [errors, setErrors] = useState<ErrorState>({});
  const [toast, setToast] = useState<string>("");
  const resumoRef = useRef<HTMLTextAreaElement | null>(null);

  const resumo = useMemo(() => buildResumoSolicitacao(data), [data]);

  function update<K extends keyof SolicitarProjetoData>(key: K, value: string) {
    onChange({ ...data, [key]: value });
  }

  function updateLinks(value: string) {
    const links = value
      .split("\n")
      .map((link) => link.trim())
      .filter(Boolean);
    onChange({ ...data, links });
  }

  function validate() {
    const nextErrors: ErrorState = {};

    if (!data.solicitanteNome.trim()) {
      nextErrors.solicitanteNome = "Informe seu nome.";
    }
    if (!data.areaSetor.trim()) {
      nextErrors.areaSetor = "Informe a área/setor.";
    }
    if (!data.objetivoCurto.trim() || data.objetivoCurto.length < 8 || data.objetivoCurto.length > 120) {
      nextErrors.objetivoCurto = "Objetivo curto: 8 a 120 caracteres.";
    }
    if (!data.contextoProblema.trim() || data.contextoProblema.length < 30) {
      nextErrors.contextoProblema = "Contexto mínimo de 30 caracteres.";
    }
    if (!data.prazoDesejado.trim()) {
      nextErrors.prazoDesejado = "Informe o prazo desejado.";
    }
    if (!data.justificativaPrazo.trim()) {
      nextErrors.justificativaPrazo = "Explique o motivo do prazo.";
    }

    if (data.links && data.links.length > 0) {
      const invalid = data.links.find((link) => {
        try {
          new URL(link);
          return false;
        } catch {
          return true;
        }
      });
      if (invalid) {
        nextErrors.links = "Inclua URLs válidas (http/https).";
      }
    }

    setErrors(nextErrors);
    return nextErrors;
  }

  async function handleCopy() {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setToast("Revise os campos destacados.");
      setTimeout(() => setToast(""), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(resumo);
      setToast("Resumo copiado. Agora é só colar no Teams.");
    } catch {
      if (resumoRef.current) {
        resumoRef.current.select();
      }
      setToast("Selecione e copie (Ctrl+C)." );
    } finally {
      setTimeout(() => setToast(""), 2500);
    }
  }

  function handleReset() {
    setErrors({});
    onChange({ ...emptyData });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold text-white">Solicitar projeto</h1>
        <p className="mt-2 text-sm text-mist/70">
          As solicitações passam por triagem e priorização. Preencha com o máximo de contexto.
        </p>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Solicitante
              <input
                value={data.solicitanteNome}
                onChange={(event) => update("solicitanteNome", event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
              />
              {errors.solicitanteNome ? (
                <span className="mt-2 block text-xs text-glow/80">
                  {errors.solicitanteNome}
                </span>
              ) : null}
            </label>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Area/Setor
              <input
                value={data.areaSetor}
                onChange={(event) => update("areaSetor", event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
              />
              {errors.areaSetor ? (
                <span className="mt-2 block text-xs text-glow/80">{errors.areaSetor}</span>
              ) : null}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Tipo
              <select
                value={data.tipo}
                onChange={(event) => update("tipo", event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
              >
                {tipoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Impacto
              <select
                value={data.impacto}
                onChange={(event) => update("impacto", event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
              >
                {impactoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Objetivo curto
            <input
              value={data.objetivoCurto}
              onChange={(event) => update("objetivoCurto", event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
              placeholder="Ex: consolidar indicadores de estoque"
            />
            {errors.objetivoCurto ? (
              <span className="mt-2 block text-xs text-glow/80">{errors.objetivoCurto}</span>
            ) : null}
          </label>

          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Contexto / problema
            <textarea
              value={data.contextoProblema}
              onChange={(event) => update("contextoProblema", event.target.value)}
              className="mt-2 min-h-[140px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
            />
            {errors.contextoProblema ? (
              <span className="mt-2 block text-xs text-glow/80">{errors.contextoProblema}</span>
            ) : null}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Prazo desejado
              <input
                type="date"
                value={data.prazoDesejado}
                onChange={(event) => update("prazoDesejado", event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
              />
              {errors.prazoDesejado ? (
                <span className="mt-2 block text-xs text-glow/80">{errors.prazoDesejado}</span>
              ) : null}
            </label>
            <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
              Motivo do prazo
              <input
                value={data.justificativaPrazo}
                onChange={(event) => update("justificativaPrazo", event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
              />
              {errors.justificativaPrazo ? (
                <span className="mt-2 block text-xs text-glow/80">
                  {errors.justificativaPrazo}
                </span>
              ) : null}
            </label>
          </div>

          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Dados disponíveis (opcional)
            <select
              value={data.dadosDisponiveis}
              onChange={(event) => update("dadosDisponiveis", event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
            >
              <option value="">Não informado</option>
              {dadosOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Links (1 por linha)
            <textarea
              value={(data.links || []).join("\n")}
              onChange={(event) => updateLinks(event.target.value)}
              className="mt-2 min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
            />
            {errors.links ? (
              <span className="mt-2 block text-xs text-glow/80">{errors.links}</span>
            ) : null}
          </label>

          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Observações (opcional)
            <textarea
              value={data.observacoes}
              onChange={(event) => update("observacoes", event.target.value)}
              className="mt-2 min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em]">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-glow/40 px-5 py-2 text-glow transition hover:border-glow/80"
          >
            Copiar resumo
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/10 px-5 py-2 text-mist/50 transition hover:border-glow/20 hover:text-mist/70"
          >
            Limpar
          </button>
        </div>

        {toast ? (
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-glow/80">
            {toast}
          </p>
        ) : null}
      </div>

      <ResumoSolicitacao
        resumo={resumo}
        onCopy={handleCopy}
        resumoRef={resumoRef}
      />
    </div>
  );
}
