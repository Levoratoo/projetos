"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { buildRequestSummary, RequestFormValues, RelatedProjectInfo } from "@/lib/requestSummary";
import { RequestForm } from "@/components/case/RequestForm";
import { RequestPreview } from "@/components/case/RequestPreview";

type RequestPageContentProps = {
  project: RelatedProjectInfo;
  dashboardUrl?: string;
};

const initialValues: RequestFormValues = {
  nomeSolicitacao: "",
  area: "",
  solicitante: "",
  descricao: "",
  justificativa: "",
  resultadoEsperado: "",
  impactoEsperado: "",
  urgencia: "Média",
  prazoDesejado: "",
  linksNotas: "",
  urlAcessoDashboard: ""
};

export function RequestPageContent({ project, dashboardUrl }: RequestPageContentProps) {
  const [values, setValues] = useState<RequestFormValues>({
    ...initialValues,
    urlAcessoDashboard: dashboardUrl ?? ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormValues, string>>>(
    {}
  );

  const summary = useMemo(
    () => buildRequestSummary(values, project),
    [project, values]
  );

  useEffect(() => {
    validate(values);
  }, []);

  function validate(next: RequestFormValues) {
    const nextErrors: Partial<Record<keyof RequestFormValues, string>> = {};
    if (!next.nomeSolicitacao.trim()) nextErrors.nomeSolicitacao = "Obrigatório";
    if (!next.descricao.trim()) nextErrors.descricao = "Obrigatório";
    if (!next.justificativa.trim()) nextErrors.justificativa = "Obrigatório";
    if (!next.resultadoEsperado.trim()) nextErrors.resultadoEsperado = "Obrigatório";
    if (!next.urgencia.trim()) nextErrors.urgencia = "Obrigatório";
    setErrors(nextErrors);
  }

  function handleChange(next: RequestFormValues) {
    setValues(next);
    validate(next);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
      <div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur">
          <nav className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            <Link href="/projetos" className="hover:text-white">
              Projetos
            </Link>
            <span className="mx-2 text-neutral-600">/</span>
            <Link href={project.urlProjeto} className="hover:text-white">
              {project.nomeProjeto}
            </Link>
            <span className="mx-2 text-neutral-600">/</span>
            <span className="text-neutral-300">Solicitação</span>
          </nav>
          <h1 className="mt-4 text-[clamp(22px,3vw,32px)] font-semibold text-white">
            Solicitação interna
          </h1>
          <p className="mt-2 text-sm text-neutral-300">
            Preencha os campos essenciais e gere um resumo pronto para Teams.
          </p>
        </div>

        <div className="mt-6">
          <RequestForm values={values} errors={errors} onChange={handleChange} />
        </div>
      </div>

      <RequestPreview summary={summary} />
    </div>
  );
}
