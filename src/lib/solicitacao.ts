export type SolicitarProjetoData = {
  solicitanteNome: string;
  areaSetor: string;
  tipo: string;
  objetivoCurto: string;
  contextoProblema: string;
  impacto: string;
  prazoDesejado: string;
  justificativaPrazo: string;
  dadosDisponiveis?: string;
  links?: string[];
  observacoes?: string;
};

export function buildResumoSolicitacao(data: SolicitarProjetoData) {
  const links = data.links && data.links.length > 0 ? data.links : ["(nenhum)"];
  const observacoes = data.observacoes?.trim() || "(nenhuma)";
  const dadosDisponiveis = data.dadosDisponiveis?.trim() || "(não informado)";

  return `Assunto: [SOLICITACAO] ${data.tipo} — ${data.areaSetor} — ${data.objetivoCurto}

Solicitante: ${data.solicitanteNome}
Area/Setor: ${data.areaSetor}
Tipo: ${data.tipo}
Objetivo: ${data.objetivoCurto}

Contexto / problema:
${data.contextoProblema}

Impacto: ${data.impacto}

Prazo desejado: ${data.prazoDesejado}
Motivo do prazo: ${data.justificativaPrazo}

Dados disponiveis: ${dadosDisponiveis}

Links:
- ${links.join("\n- ")}

Observacoes:
${observacoes}`;
}
