"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ProjectRequestForm } from "@/components/ProjectRequestForm";
import { ProjectRequestPreview } from "@/components/ProjectRequestPreview";
import { buildTeamsSummary, copyToClipboard, ProjectRequestValues } from "@/lib/teamsRequest";
import { TEAMS_CHAT_URL } from "@/config/teams";

type ErrorState = Partial<Record<keyof ProjectRequestValues, string>>;

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

function validate(values: ProjectRequestValues) {
  const errors: ErrorState = {};

  if (!values.title.trim()) errors.title = "Informe o título.";
  if (!values.sector.trim()) errors.sector = "Informe o setor.";
  if (!values.requester.trim()) errors.requester = "Informe o solicitante.";
  if (!values.context.trim()) errors.context = "Descreva o contexto.";
  if (!values.justification.trim()) errors.justification = "Informe a justificativa.";
  if (!values.objective.trim()) errors.objective = "Informe o objetivo.";
  if (!values.impact.trim()) errors.impact = "Informe o impacto esperado.";
  if (!values.urgency.trim()) errors.urgency = "Informe a urgência.";

  return errors;
}

const STORAGE_KEY = "printbag_project_request_v1";

export default function SolicitarPage() {
  const [values, setValues] = useState<ProjectRequestValues>(initialValues);
  const [toast, setToast] = useState("");
  const [popupBlocked, setPopupBlocked] = useState(false);
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);

  const summary = useMemo(() => buildTeamsSummary(values), [values]);
  const errors = useMemo(() => validate(values), [values]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setValues({ ...initialValues, ...JSON.parse(raw) });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // ignore
    }
  }, [values]);

  async function handleCopy() {
    if (!isValid) {
      setToast("Revise os campos obrigatórios.");
      setTimeout(() => setToast(""), 2000);
      return;
    }

    try {
      await copyToClipboard(summary);
      setToast("Resumo copiado.");
    } catch {
      if (summaryRef.current) summaryRef.current.select();
      setToast("Selecione e copie (Ctrl+C)." );
    } finally {
      setTimeout(() => setToast(""), 2000);
    }
  }

  async function handleCopyOpenTeams() {
    await handleCopy();
    if (!isValid) return;
    const opened = window.open(TEAMS_CHAT_URL, "_blank", "noopener,noreferrer");
    if (!opened) {
      setPopupBlocked(true);
    }
  }

  function handleOpenTeams() {
    window.open(TEAMS_CHAT_URL, "_blank", "noopener,noreferrer");
  }

  function handleReset() {
    setValues(initialValues);
    setPopupBlocked(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <main>
      <section className="border-b border-white/5 py-16">
        <Container>
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.35em] text-glow/70 transition hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
          >
            Voltar para o início
          </Link>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
            Solicitação de projeto
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-mist/75 sm:text-base">
            Preencha o intake e envie o resumo no Teams. Sem automações neste estágio.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <ProjectRequestForm
              values={values}
              errors={errors}
              isValid={isValid}
              popupBlocked={popupBlocked}
              onChange={setValues}
              onCopy={handleCopy}
              onCopyOpenTeams={handleCopyOpenTeams}
              onOpenTeams={handleOpenTeams}
              onReset={handleReset}
            />
            <ProjectRequestPreview summary={summary} summaryRef={summaryRef} />
          </div>
          {toast ? (
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-glow/80">
              {toast}
            </p>
          ) : null}
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h2 className="text-lg font-semibold text-white">Resumo em versão imprimível</h2>
            <p className="mt-2 text-sm text-mist/70">
              Use esta versão para compartilhar offline ou anexar em documentos.
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-[#0b0f0e] p-4 text-left text-xs text-mist/80">
              <pre className="whitespace-pre-wrap">{summary}</pre>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
