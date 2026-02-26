export type RequestFormValues = {
  nomeSolicitacao: string;
  area: string;
  solicitante: string;
  descricao: string;
  justificativa: string;
  resultadoEsperado: string;
  impactoEsperado: string;
  urgencia: "Baixa" | "Média" | "Alta" | "Crítica";
  prazoDesejado: string;
  linksNotas: string;
  urlAcessoDashboard: string;
};

export type RelatedProjectInfo = {
  nomeProjeto: string;
  tags: string[];
  urlProjeto: string;
};

export function buildRequestSummary(
  values: RequestFormValues,
  project: RelatedProjectInfo
) {
  const tagsText = project.tags.length > 0 ? project.tags.join(", ") : "—";
  const prazoText = values.prazoDesejado || "não definido";
  const linksText = values.linksNotas || "—";
  const acessoText = values.urlAcessoDashboard || "—";

  return `[TÍTULO] Solicitação de Projeto — ${values.nomeSolicitacao}

Solicitante: ${values.solicitante}
Área: ${values.area}
Urgência: ${values.urgencia} | Prazo desejado: ${prazoText}

Descrição:
${values.descricao}

Justificativa (por que é importante):
${values.justificativa}

Resultado esperado:
${values.resultadoEsperado}

Impacto esperado:
${values.impactoEsperado}

Link/Contexto:
${linksText}

Projeto relacionado (portfólio):
${project.nomeProjeto} — ${tagsText} — ${project.urlProjeto}
Acesso/Preview (se houver):
${acessoText}`;
}
