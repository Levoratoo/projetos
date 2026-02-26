"use client";

import { RequestFormValues } from "@/lib/requestSummary";
import { cn } from "@/lib/utils";

type RequestFormProps = {
  values: RequestFormValues;
  errors: Partial<Record<keyof RequestFormValues, string>>;
  onChange: (next: RequestFormValues) => void;
};

const areas = [
  "Operações",
  "Engenharia",
  "Comercial",
  "Financeiro",
  "RH",
  "TI",
  "Outro"
];

const urgencias: RequestFormValues["urgencia"][] = [
  "Baixa",
  "Média",
  "Alta",
  "Crítica"
];

export function RequestForm({ values, errors, onChange }: RequestFormProps) {
  function update<K extends keyof RequestFormValues>(key: K, value: string) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="space-y-6">
      <details open className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-sm font-semibold text-white">
          <span className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
            Step 1 · Básico
          </span>
          <span className="text-glow transition duration-200 group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="mt-4 grid gap-4">
          <Field
            label="Nome da solicitação"
            value={values.nomeSolicitacao}
            onChange={(value) => update("nomeSolicitacao", value)}
            error={errors.nomeSolicitacao}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Área/Setor"
              value={values.area}
              onChange={(value) => update("area", value)}
              options={areas}
              error={errors.area}
            />
            <Field
              label="Solicitante"
              value={values.solicitante}
              onChange={(value) => update("solicitante", value)}
              error={errors.solicitante}
            />
          </div>
          <TextareaField
            label="Descrição"
            value={values.descricao}
            onChange={(value) => update("descricao", value)}
            error={errors.descricao}
          />
        </div>
      </details>

      <details className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-sm font-semibold text-white">
          <span className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
            Step 2 · Detalhes
          </span>
          <span className="text-glow transition duration-200 group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="mt-4 grid gap-4">
          <TextareaField
            label="Justificativa"
            value={values.justificativa}
            onChange={(value) => update("justificativa", value)}
            error={errors.justificativa}
          />
          <TextareaField
            label="Resultado esperado"
            value={values.resultadoEsperado}
            onChange={(value) => update("resultadoEsperado", value)}
            error={errors.resultadoEsperado}
          />
          <TextareaField
            label="Impacto esperado"
            value={values.impactoEsperado}
            onChange={(value) => update("impactoEsperado", value)}
          />
          <Field
            label="Links/Notas"
            value={values.linksNotas}
            onChange={(value) => update("linksNotas", value)}
          />
        </div>
      </details>

      <details className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-sm font-semibold text-white">
          <span className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
            Step 3 · Priorização
          </span>
          <span className="text-glow transition duration-200 group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Urgência"
            value={values.urgencia}
            onChange={(value) =>
              update("urgencia", value as RequestFormValues["urgencia"])
            }
            options={urgencias}
            error={errors.urgencia}
          />
          <Field
            label="Prazo desejado"
            value={values.prazoDesejado}
            onChange={(value) => update("prazoDesejado", value)}
            type="date"
          />
          <Field
            label="URL de acesso do dashboard"
            value={values.urlAcessoDashboard}
            onChange={(value) => update("urlAcessoDashboard", value)}
            className="sm:col-span-2"
          />
        </div>
      </details>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  className?: string;
};

function Field({ label, value, onChange, error, type = "text", className }: FieldProps) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
          error && "border-red-500/50"
        )}
      />
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

function TextareaField({ label, value, onChange, error }: TextareaFieldProps) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-2 min-h-[96px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
          error && "border-red-500/50"
        )}
      />
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
};

function SelectField({
  label,
  value,
  onChange,
  options,
  error
}: SelectFieldProps) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-mist/60">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
          error && "border-red-500/50"
        )}
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
