"use client";

import { ProjectRequestValues } from "@/lib/teamsRequest";

const sectorOptions = [
  "Operações",
  "Finanças",
  "Comercial",
  "Tecnologia",
  "Marketing",
  "RH",
  "Outro"
];

const urgencyOptions: ProjectRequestValues["urgency"][] = [
  "Baixa",
  "Média",
  "Alta"
];

type ProjectRequestFormProps = {
  values: ProjectRequestValues;
  errors: Partial<Record<keyof ProjectRequestValues, string>>;
  isValid: boolean;
  popupBlocked: boolean;
  onChange: (values: ProjectRequestValues) => void;
  onCopy: () => void;
  onCopyOpenTeams: () => void;
  onOpenTeams: () => void;
  onReset: () => void;
};

export function ProjectRequestForm({
  values,
  errors,
  isValid,
  popupBlocked,
  onChange,
  onCopy,
  onCopyOpenTeams,
  onOpenTeams,
  onReset
}: ProjectRequestFormProps) {
  function update<K extends keyof ProjectRequestValues>(key: K, value: string) {
    onChange({ ...values, [key]: value });
  }

  const fieldClass = (error?: string) =>
    `mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-glow/60 ${
      error ? "border-glow/60" : "border-white/10"
    }`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-semibold text-white">Solicitação de projeto</h1>
      <p className="mt-2 text-sm text-mist/70">
        Intake interno para registrar demandas. As solicitações passam por triagem e
        priorização.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
          Nome da solicitação
          <input
            value={values.title}
            onChange={(event) => update("title", event.target.value)}
            className={fieldClass(errors.title)}
          />
          {errors.title ? (
            <span className="mt-2 block text-xs text-glow/80">{errors.title}</span>
          ) : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Setor / Área solicitante
            <select
              value={values.sector}
              onChange={(event) => update("sector", event.target.value)}
              className={fieldClass(errors.sector)}
            >
              <option value="">Selecione</option>
              {sectorOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.sector ? (
              <span className="mt-2 block text-xs text-glow/80">{errors.sector}</span>
            ) : null}
          </label>
          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Solicitante
            <input
              value={values.requester}
              onChange={(event) => update("requester", event.target.value)}
              className={fieldClass(errors.requester)}
            />
            {errors.requester ? (
              <span className="mt-2 block text-xs text-glow/80">{errors.requester}</span>
            ) : null}
          </label>
        </div>

        <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
          Descrição do problema / contexto
          <textarea
            value={values.context}
            onChange={(event) => update("context", event.target.value)}
            className={fieldClass(errors.context)}
          />
          {errors.context ? (
            <span className="mt-2 block text-xs text-glow/80">{errors.context}</span>
          ) : null}
        </label>

        <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
          Justificativa (por que agora?)
          <textarea
            value={values.justification}
            onChange={(event) => update("justification", event.target.value)}
            className={fieldClass(errors.justification)}
          />
          {errors.justification ? (
            <span className="mt-2 block text-xs text-glow/80">
              {errors.justification}
            </span>
          ) : null}
        </label>

        <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
          Objetivo (o que espera obter)
          <textarea
            value={values.objective}
            onChange={(event) => update("objective", event.target.value)}
            className={fieldClass(errors.objective)}
          />
          {errors.objective ? (
            <span className="mt-2 block text-xs text-glow/80">{errors.objective}</span>
          ) : null}
        </label>

        <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
          Impacto esperado (benefícios mensuráveis, se possível)
          <textarea
            value={values.impact}
            onChange={(event) => update("impact", event.target.value)}
            className={fieldClass(errors.impact)}
          />
          {errors.impact ? (
            <span className="mt-2 block text-xs text-glow/80">{errors.impact}</span>
          ) : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Urgência
            <select
              value={values.urgency}
              onChange={(event) => update("urgency", event.target.value)}
              className={fieldClass(errors.urgency)}
            >
              {urgencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.urgency ? (
              <span className="mt-2 block text-xs text-glow/80">{errors.urgency}</span>
            ) : null}
          </label>
          <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
            Prazo desejado (opcional)
            <input
              type="date"
              value={values.deadline}
              onChange={(event) => update("deadline", event.target.value)}
              className={fieldClass()}
            />
          </label>
        </div>

        <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
          Stakeholders envolvidos (opcional)
          <input
            value={values.stakeholders}
            onChange={(event) => update("stakeholders", event.target.value)}
            className={fieldClass()}
          />
        </label>

        <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
          Observações / links (opcional)
          <textarea
            value={values.notesLinks}
            onChange={(event) => update("notesLinks", event.target.value)}
            className={fieldClass()}
          />
        </label>
      </div>

      {!isValid ? (
        <div className="mt-6 rounded-xl border border-glow/30 bg-glow/5 p-4 text-xs text-mist/70">
          <p className="uppercase tracking-[0.25em] text-glow/80">
            Campos obrigatórios pendentes
          </p>
          <p className="mt-2">
            Preencha os campos marcados em destaque para liberar o envio.
          </p>
          <p className="mt-3 text-mist/60">
            Faltando:{" "}
            {Object.values(errors).filter(Boolean).join(", ")}
          </p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em]">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full border border-white/10 px-5 py-2 text-mist/70 transition hover:border-glow/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!isValid}
        >
          Copiar
        </button>
        <button
          type="button"
          onClick={onCopyOpenTeams}
          className="rounded-full border border-glow/40 px-5 py-2 text-glow transition hover:border-glow/80 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!isValid}
        >
          Copiar e abrir Teams
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/10 px-5 py-2 text-mist/50 transition hover:border-glow/20 hover:text-mist/70"
        >
          Limpar
        </button>
      </div>

      {popupBlocked ? (
        <div className="mt-4 rounded-xl border border-glow/40 bg-glow/10 p-4 text-xs text-glow/90">
          Resumo copiado. Cole no chat e envie.
          <button
            type="button"
            onClick={onOpenTeams}
            className="ml-3 underline"
          >
            Abrir Teams
          </button>
        </div>
      ) : null}
    </div>
  );
}
