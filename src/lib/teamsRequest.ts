export type ProjectRequestValues = {
  title: string;
  sector: string;
  requester: string;
  context: string;
  justification: string;
  objective: string;
  impact: string;
  urgency: "Baixa" | "Média" | "Alta";
  deadline: string;
  stakeholders: string;
  notesLinks: string;
};

export function buildTeamsSummary(values: ProjectRequestValues) {
  const deadlineText = values.deadline ? values.deadline : "não definido";
  const stakeholders = (values.stakeholders ?? "").trim() || "—";
  const notes = (values.notesLinks ?? "").trim() || "—";

  return `[TÍTULO] ${values.title}

Setor: ${values.sector}
Solicitante: ${values.requester}
Urgência: ${values.urgency.toLowerCase()}
Prazo desejado: ${deadlineText}

Contexto / Problema:
${values.context}

Justificativa:
${values.justification}

Objetivo:
${values.objective}

Impacto esperado:
${values.impact}

Stakeholders:
${stakeholders}

Links/Obs:
${notes}`;
}

export async function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const success = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!success) {
    throw new Error("copy failed");
  }
}
