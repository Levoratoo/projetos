import { withBasePath } from "@/lib/basePath";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  year: number;
  status: "Concluído" | "Em produção";
  progress: number,
  type: string;
  domain: string;
  segment: string;
  tags: string[];
  stack: string[];
  cover: { kind: "gradient"; a: string; b: string; c?: string };
  context: string;
  problem: string[];
  constraints: string[];
  solution: string[];
  results: string[];
  learnings: string[];
  nextSteps: string[];
  kpis: { label: string; value: string }[];
  confidentialityNote?: string;
  links?: { label: string; href: string }[];
  accessLinks?: { label: string; url: string; visibility: "internal" | "public" }[];
  gallery?: {
    title: string;
    description: string;
    thumbSrc?: string;
    fullSrc?: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: "integracao-magento-metrics",
    title: "Integração Magento → Metrics",
    subtitle: "Integração orientada a eventos para consolidar pedidos e status.",
    summary: "Integração de pedidos e status para consolidar dados operacionais.",
    description: "Integração de pedidos e status para consolidar dados operacionais.",
    year: 2024,
    status: "Concluído",
    progress: 100,
    type: "Integração",
    domain: "Operações",
    segment: "Integração",
    tags: ["Integração", "Dados", "ERP", "Observabilidade"],
    stack: ["Node.js", "TypeScript", "SQL Server", "APIs"],
    cover: {
      kind: "gradient",
      a: "rgba(120, 210, 255, 0.35)",
      b: "rgba(120, 255, 200, 0.28)",
      c: "rgba(255, 255, 255, 0.12)"
    },
    context:
      "O time precisava reduzir divergências entre pedidos e status operacionais, com visibilidade imediata para áreas comercial e operação.",
    problem: [
      "Pedidos com status inconsistentes entre sistemas.",
      "Conciliação manual e lenta.",
      "Baixa rastreabilidade ponta a ponta."
    ],
    constraints: [
      "Não alterar o Magento diretamente.",
      "Manter compatibilidade com relatórios existentes.",
      "SLA de atualização incremental."
    ],
    solution: [
      "Modelo de dados único com normalização de status.",
      "Sincronização incremental com validações automáticas.",
      "Dashboards focados em operação e performance."
    ],
    results: [
      "Menos retrabalho na conciliação de pedidos.",
      "Visão única para tomada de decisão.",
      "Operação com leitura rápida e confiável."
    ],
    learnings: [
      "Mapeamento de eventos é crítico para evitar perda de dados.",
      "Definições claras de status evitam retrabalho recorrente."
    ],
    nextSteps: [
      "Documentar trilhas de auditoria por evento.",
      "Automatizar alertas por divergência de status."
    ],
    kpis: [
      { label: "Fonte de verdade", value: "Metrics" },
      { label: "Status rastreável", value: "Ponta a ponta" },
      { label: "Atualização", value: "Incremental" }
    ],
    links: [
      { label: "Especificação técnica (PDF)", href: "#" },
      { label: "Repositório (privado)", href: "#" }
    ],
    accessLinks: [
      {
        label: "Acesso interno - LAN",
        url: "http://192.168.1.104:3007/",
        visibility: "internal"
      }
    ],
    gallery: [
      {
        title: "Mapa de fluxo",
        description: "Eventos críticos e pontos de validação.",
        thumbSrc: "/projects/integracao-magento-metrics/thumb.jpg",
        fullSrc: "/projects/integracao-magento-metrics/screen1.jpg"
      },
      {
        title: "Dashboard executivo",
        description: "KPIs e status consolidados.",
        thumbSrc: "/projects/integracao-magento-metrics/screen2.jpg",
        fullSrc: "/projects/integracao-magento-metrics/screen2.jpg"
      },
      {
        title: "Métricas por etapa",
        description: "Distribuição de status por fase.",
        thumbSrc: "/projects/integracao-magento-metrics/screen3.jpg",
        fullSrc: "/projects/integracao-magento-metrics/screen3.jpg"
      },
      {
        title: "Indicadores e alertas",
        description: "Monitoramento de anomalias e tendências.",
        thumbSrc: "/projects/integracao-magento-metrics/screen4.jpg",
        fullSrc: "/projects/integracao-magento-metrics/screen4.jpg"
      }
    ]
  },
  {
    slug: "dashboard-separacao-estoque",
    title: "Dashboard de Análise de Pedidos e Estoque",
    subtitle: "Acompanhamento de pedidos pendentes e estoque em tempo real.",
    summary:
      "Sistema web para acompanhar pedidos pendentes e estoque em tempo real, substituindo planilhas por uma visualização clara e atualizada.",
    description:
      "Dashboard que conecta ao banco de dados da empresa e consolida pedidos pendentes, status por saldo e visão de estoque por localização.",
    year: 2023,
    status: "Concluído",
    progress: 100,
    type: "Dashboard",
    domain: "Operações",
    segment: "Operações",
    tags: ["Dashboard", "Operações", "Estoque", "Pedidos"],
    stack: ["Next.js", "TypeScript", "SQL Server", "APIs REST"],
    cover: {
      kind: "gradient",
      a: "rgba(168, 85, 247, 0.5)",
      b: "rgba(124, 58, 237, 0.35)",
      c: "rgba(255, 255, 255, 0.16)"
    },
    context:
      "A análise de pedidos dependia de planilhas e processos manuais, com baixa atualização e pouca visibilidade do estoque.",
    problem: [
      "Dados desatualizados.",
      "Tempo perdido em análises manuais.",
      "Dificuldade para identificar pedidos com problemas de estoque.",
      "Falta de visão geral rápida."
    ],
    constraints: [
      "Conexão direta com o banco de dados da empresa.",
      "Atualizações periódicas sem impacto na operação.",
      "Interface responsiva para diferentes telas."
    ],
    solution: [
      "Lista de pedidos pendentes com status por saldo.",
      "Detalhamento de itens por pedido.",
      "Visão de estoque por localização, lote e validade.",
      "Filtros e gráficos para análise rápida."
    ],
    results: [
      "Análise mais rápida sem planilhas.",
      "Decisões mais ágeis sobre pedidos com falta de saldo.",
      "Dados mais precisos e atualizados.",
      "Visão clara do status dos pedidos e estoque."
    ],
    learnings: [
      "Filtros bem definidos reduzem tempo de busca.",
      "Visualizações por status facilitam priorização."
    ],
    nextSteps: [
      "Expandir comparativos entre períodos.",
      "Adicionar alertas para produtos críticos."
    ],
    kpis: [
      { label: "Status", value: "Total / Parcial / Sem Saldo" },
      { label: "Estoque", value: "Por localização" },
      { label: "Detalhe", value: "Itens por pedido" }
    ],
    links: [
      { label: "Layout do dashboard", href: "#" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/estoqueemtemporeal/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Pedidos pendentes",
        description: "Lista com status e percentuais.",
        thumbSrc: "/images/projetos/estoque/estoque-1.png",
        fullSrc: "/images/projetos/estoque/estoque-1.png"
      },
      {
        title: "Detalhamento do pedido",
        description: "Itens, saldo e atendimento.",
        thumbSrc: "/images/projetos/estoque/estoque-2.png",
        fullSrc: "/images/projetos/estoque/estoque-2.png"
      },
      {
        title: "Estoque por localização",
        description: "Quantidade, lote e validade.",
        thumbSrc: "/images/projetos/estoque/estoque-3.png",
        fullSrc: "/images/projetos/estoque/estoque-3.png"
      },
      {
        title: "Indicadores e filtros",
        description: "Visão rápida e filtros por status.",
        thumbSrc: "/images/projetos/estoque/estoque-4.png",
        fullSrc: "/images/projetos/estoque/estoque-4.png"
      }
    ]
  },
  {
    slug: "planejamento-orcamentario-coordenador",
    title: "Sistema de Planejamento Orçamentário por Coordenador",
    subtitle: "Planejamento e controle orçamentário por centro de custo.",
    summary:
      "Sistema web para planejamento e controle orçamentário por centro de custo, com fluxo de aprovação, premissas e comparação previsto vs realizado.",
    description:
      "Sistema web para planejamento e controle orçamentário por centro de custo, com fluxo de aprovação, premissas e comparação previsto vs realizado.",
    year: 2026,
    status: "Em produção",
    progress: 100,
    type: "Planejamento",
    domain: "Finanças",
    segment: "Planejamento",
    tags: [
      "Orçamento",
      "Centros de Custo",
      "Plano de Contas",
      "Workflows",
      "Excel Import",
      "Previsto vs Realizado"
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Swagger",
      "Jest"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(118, 28, 48, 0.5)",
      b: "rgba(72, 16, 36, 0.36)",
      c: "rgba(255, 210, 218, 0.14)"
    },
    context:
      "Antes, o planejamento era feito em planilhas, gerando dificuldade de acompanhar mudanças, falta de controle de permissões, consolidação manual, risco de perda de dados e baixa visibilidade do previsto vs realizado. O sistema centraliza cenários, centros de custo e contas contábeis, permitindo planejamento mensal, justificativas e governança.",
    problem: [
      "Planejamento feito em planilhas e sem rastreabilidade.",
      "Dificuldade de acompanhar mudanças ao longo do ciclo.",
      "Falta de controle de permissões por perfil.",
      "Consolidação manual com risco de inconsistências.",
      "Baixa visibilidade do previsto vs realizado."
    ],
    constraints: [
      "Governança por centro de custo e níveis de aprovação.",
      "Fechamento mensal com prazos curtos.",
      "Integração com sistemas legados."
    ],
    solution: [
      "Componentes principais: Cenários, Centros de Custo, Contas/Plano de Contas, Grid mensal, Importação Excel, Workflow de aprovação, Auditoria/Histórico, Relatórios.",
      "Cenários orçamentários (ex.: Orçamento 2026) com etapas: rascunho → submetido → aprovado → bloqueado.",
      "Gestão por centro de custo com responsável e permissões por perfil (coordenador/controlador/admin).",
      "Lançamentos mês a mês por conta contábil, com variações ao longo do ano.",
      "Tipos de cálculo: fixo, por headcount, % folha, contratos, consumo e personalizados.",
      "Premissas e justificativas por lançamento + histórico de alterações (rastreabilidade).",
      "Comparação previsto vs realizado + relatórios por centro/conta/categoria e entre cenários."
    ],
    results: [
      "Redução do trabalho manual de consolidação e retrabalho.",
      "Governança e controle de acesso por área com rastreabilidade completa.",
      "Visibilidade em tempo real para tomada de decisão e ajustes ao longo do ano."
    ],
    learnings: [
      "Governança bem definida aumenta adesão dos coordenadores.",
      "Histórico detalhado reduz retrabalho em auditorias."
    ],
    nextSteps: [
      "Expandir indicadores de variação por trimestre.",
      "Automatizar alertas de desvios críticos."
    ],
    kpis: [
      { label: "Cenários", value: "Rascunho → Aprovado" },
      { label: "Controle", value: "Centro de custo" },
      { label: "Comparativo", value: "Previsto vs realizado" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/orcamentario-custos/planejamento/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Cenários orçamentários",
        description: "Fluxo de status e governança.",
        thumbSrc: "/projects/planejamento-orcamentario-coordenador/thumb.jpg",
        fullSrc: "/projects/planejamento-orcamentario-coordenador/screen1.jpg"
      },
      {
        title: "Centros de custo",
        description: "Responsáveis, permissões e contas.",
        thumbSrc: "/projects/planejamento-orcamentario-coordenador/screen2.jpg",
        fullSrc: "/projects/planejamento-orcamentario-coordenador/screen2.jpg"
      },
      {
        title: "Grid mensal",
        description: "Lançamentos e variações ao longo do ano.",
        thumbSrc: "/projects/planejamento-orcamentario-coordenador/screen3.jpg",
        fullSrc: "/projects/planejamento-orcamentario-coordenador/screen3.jpg"
      },
      {
        title: "Relatórios comparativos",
        description: "Previsto vs realizado por categoria.",
        thumbSrc: "/projects/planejamento-orcamentario-coordenador/screen4.jpg",
        fullSrc: "/projects/planejamento-orcamentario-coordenador/screen4.jpg"
      },
      {
        title: "Acesso ao sistema",
        description: "Tela de login e credenciais de acesso.",
        thumbSrc: "/projects/planejamento-orcamentario-coordenador/screen5.jpg",
        fullSrc: "/projects/planejamento-orcamentario-coordenador/screen5.jpg"
      }
    ]
  },
  {
    slug: "sistema-orcamentario-produtos-graficos",
    title: "Sistema Orçamentário - Gestão Inteligente de Orçamentos para Produtos Gráficos",
    subtitle: "Gestão de solicitações de orçamento com regras técnicas e integração automática.",
    summary:
      "Sistema web interno para gerenciar solicitações de orçamento de produtos gráficos, centralizando criação, acompanhamento e análise.",
    description:
      "Sistema web interno para gerenciar solicitações de orçamento de produtos gráficos (sacos, sacolas, caixas e embalagens), centralizando criação, acompanhamento e análise.",
    year: 2026,
    status: "Em produção",
    progress: 100,
    type: "Orçamento",
    domain: "Engenharia",
    segment: "Orçamento",
    tags: [
      "Orçamento",
      "Produtos Gráficos",
      "Wizard",
      "Catálogo Técnico",
      "Webhooks",
      "Dashboards"
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "SQL Server", "APIs"],
    cover: {
      kind: "gradient",
      a: "rgba(52, 132, 96, 0.5)",
      b: "rgba(28, 78, 56, 0.38)",
      c: "rgba(200, 235, 215, 0.12)"
    },
    context:
      "O processo de orçamento era fragmentado, com alto risco de erro na coleta de dados e pouca visibilidade sobre métricas e integrações.",
    problem: [
      "Solicitações inconsistentes e sem padronização.",
      "Erros e retrabalho na cotação de produtos.",
      "Baixa rastreabilidade do histórico.",
      "Pouca visibilidade de métricas e tendências."
    ],
    constraints: [
      "Regras técnicas complexas por tipo de produto.",
      "Integração com sistemas externos via webhook.",
      "Necessidade de validações em tempo real."
    ],
    solution: [
      "Wizard guiado com validação automática em cada etapa.",
      "Catálogo técnico inteligente com regras de compatibilidade.",
      "Formulário configurável pela engenharia, sem código.",
      "Integração automática via webhook com histórico de envio.",
      "Dashboard com métricas, ranking e comparativos.",
      "Geração de PDFs com especificações técnicas."
    ],
    results: [
      "Redução significativa no tempo de criação de orçamentos.",
      "Diminuição de erros e necessidade de correções.",
      "Organização e rastreabilidade completas das solicitações.",
      "Dados estruturados para análises e relatórios."
    ],
    learnings: [
      "Validações dinâmicas reduzem retrabalho.",
      "Catálogo técnico centralizado evita combinações inválidas."
    ],
    nextSteps: [
      "Expandir integrações com novos sistemas.",
      "Adicionar alertas proativos por padrões de erro."
    ],
    kpis: [
      { label: "Solicitações", value: "Workflow guiado" },
      { label: "Integrações", value: "Webhook automático" },
      { label: "Catálogo", value: "Regras inteligentes" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/orcamentoengenhariaprintbag/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Wizard de solicitação",
        description: "Etapas guiadas e validações em tempo real.",
        thumbSrc: "/projects/sistema-orcamentario-produtos-graficos/thumb.jpg",
        fullSrc: "/projects/sistema-orcamentario-produtos-graficos/screen1.jpg"
      },
      {
        title: "Catálogo técnico",
        description: "Regras de compatibilidade e materiais.",
        thumbSrc: "/projects/sistema-orcamentario-produtos-graficos/screen2.jpg",
        fullSrc: "/projects/sistema-orcamentario-produtos-graficos/screen2.jpg"
      },
      {
        title: "Dashboard de métricas",
        description: "Indicadores e tendências por período.",
        thumbSrc: "/projects/sistema-orcamentario-produtos-graficos/screen3.jpg",
        fullSrc: "/projects/sistema-orcamentario-produtos-graficos/screen3.jpg"
      },
      {
        title: "Histórico e integrações",
        description: "Rastreio de envios e status.",
        thumbSrc: "/projects/sistema-orcamentario-produtos-graficos/screen4.jpg",
        fullSrc: "/projects/sistema-orcamentario-produtos-graficos/screen4.jpg"
      },
      {
        title: "Resumo da solicitação",
        description: "Consolidação técnica para aprovação.",
        thumbSrc: "/projects/sistema-orcamentario-produtos-graficos/screen5.jpg",
        fullSrc: "/projects/sistema-orcamentario-produtos-graficos/screen5.jpg"
      }
    ]
  },
  {
    slug: "monitoramento-pedidos-tempo-real",
    title: "Sistema de Monitoramento de Pedidos em Tempo Real",
    subtitle: "Painel em tempo real para acompanhar pedidos processados e integrações.",
    summary:
      "Painel em tempo real para acompanhar pedidos processados e integrações, com filtros avançados, ranking de erros e detalhe técnico por pedido.",
    description:
      "Painel em tempo real para acompanhar pedidos processados e integrações, com filtros avançados, ranking de erros e detalhe técnico por pedido.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Monitoramento",
    domain: "Operações",
    segment: "Operações",
    tags: ["Tempo Real", "Pedidos", "Integrações", "Observabilidade", "XML", "KPI", "Filtros"],
    stack: [
      "Node.js",
      "TypeScript",
      "Fastify",
      "SQL Server",
      "SSE",
      "React",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "TanStack Table",
      "Lucide",
      "Sonner",
      "pnpm",
      "concurrently",
      "ESLint"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(118, 28, 48, 0.5)",
      b: "rgba(72, 16, 36, 0.36)",
      c: "rgba(255, 210, 218, 0.14)"
    },
    context:
      "O sistema centraliza o acompanhamento de pedidos e importações diretamente do banco de dados, atualizando automaticamente a cada poucos segundos. Ele mostra o que está processando com sucesso, o que falhou e por quê, permitindo identificar gargalos e agir rápido sem depender de planilhas ou checagens manuais.",
    problem: [
      "Baixa visibilidade do processamento e demora para identificar falhas.",
      "Auditoria técnica dispersa em XMLs e logs.",
      "Falta de indicadores rápidos para priorização."
    ],
    constraints: [
      "Atualização contínua com baixo impacto no banco.",
      "Interface responsiva para operação em múltiplas telas.",
      "Rastreabilidade técnica por pedido e integração."
    ],
    solution: [
      "Lista paginada/filtrável de pedidos processados.",
      "Auto-refresh / realtime (polling ou SSE) com indicador de conexão.",
      "Painel lateral de detalhe do pedido.",
      "Visualização de XML (preview + completo) com retorno/códigos.",
      "KPI cards (total, erros, sucesso) + ranking de erros.",
      "Busca full-text em XML."
    ],
    results: [
      "Redução do tempo para identificar falhas e priorizar correções.",
      "Aumento de confiabilidade operacional com visibilidade centralizada.",
      "Base de dados para melhorias contínuas (padrões de erro e tendência)."
    ],
    learnings: [
      "Monitoramento em tempo real aumenta a velocidade de resposta operacional.",
      "Busca em XML reduz tempo de diagnóstico técnico."
    ],
    nextSteps: [
      "Adicionar alertas proativos para padrões recorrentes.",
      "Expandir dashboards de tendência por período."
    ],
    kpis: [
      { label: "Atualização", value: "~3s" },
      { label: "Status", value: "Sucesso / Erro" },
      { label: "Diagnóstico", value: "XML completo" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/Middleware/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Painel em tempo real",
        description: "Status de processamento e conexão.",
        thumbSrc: "/projects/monitoramento-pedidos-tempo-real/thumb.jpg",
        fullSrc: "/projects/monitoramento-pedidos-tempo-real/screen1.jpg"
      },
      {
        title: "Filtros e ranking",
        description: "Erros, taxa de sucesso e filtros avançados.",
        thumbSrc: "/projects/monitoramento-pedidos-tempo-real/screen2.jpg",
        fullSrc: "/projects/monitoramento-pedidos-tempo-real/screen2.jpg"
      },
      {
        title: "Detalhe do pedido",
        description: "Retorno técnico e mensagens por pedido.",
        thumbSrc: "/projects/monitoramento-pedidos-tempo-real/screen3.jpg",
        fullSrc: "/projects/monitoramento-pedidos-tempo-real/screen3.jpg"
      },
      {
        title: "XML completo",
        description: "Auditoria técnica com XML enviado e recebido.",
        thumbSrc: "/projects/monitoramento-pedidos-tempo-real/screen4.jpg",
        fullSrc: "/projects/monitoramento-pedidos-tempo-real/screen4.jpg"
      }
    ]
  },
  {
    slug: "landing-page-printbag",
    title: "Landing Page Printbag",
    subtitle: "Landing page de aquisicao para gerar leads qualificados.",
    summary:
      "Nao e um site institucional: e uma landing page focada em converter trafego em contatos comerciais.",
    description:
      "Pagina unica orientada a conversao, com narrativa objetiva, prova social e formulario otimizado para captacao de leads.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Landing Page",
    domain: "Marketing",
    segment: "Aquisicao",
    tags: ["Landing Page", "Leads", "Conversao", "Sustentabilidade", "Formulario", "Performance"],
    stack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "EmailJS",
      "Webhook n8n",
      "Google Tag Manager",
      "GitHub Pages",
      "SSG"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(120, 210, 255, 0.3)",
      b: "rgba(120, 255, 200, 0.25)",
      c: "rgba(255, 255, 255, 0.12)"
    },
    context:
      "A Printbag precisava de um destino unico para campanhas e trafego organico, com mensagem clara e foco total em conversao.",
    problem: [
      "Trafego de campanhas sem ponto unico de conversao.",
      "Perda de leads por friccao e excesso de navegacao.",
      "Pouca padronizacao na captura de contatos comerciais."
    ],
    constraints: [
      "Mensagem objetiva e pagina escaneavel.",
      "Formulario simples, confiavel e integrado ao comercial.",
      "Deploy estatico com alta performance e SEO."
    ],
    solution: [
      "Estrutura em pagina unica com Hero, diferenciais, produtos, prova social e CTA final.",
      "Formulario com validacao, feedback visual e envio em paralelo para EmailJS e webhook n8n.",
      "Rastreamento de eventos via GTM para campanhas e conversao.",
      "Arquitetura modular em Next.js com componentes reutilizaveis e SSG."
    ],
    results: [
      "Mais leads qualificados para o time comercial.",
      "Melhor taxa de conversao de campanhas de midia e redes sociais.",
      "Fluxo de follow-up mais rapido com dados organizados.",
      "Fortalecimento da percepcao de valor da marca."
    ],
    learnings: [
      "Landing focada em uma unica acao converte melhor que navegações extensas.",
      "Integracao paralela (EmailJS + webhook) aumenta resiliencia na captura."
    ],
    nextSteps: [
      "Executar testes A/B em copy e CTA.",
      "Conectar webhook ao CRM com score de lead automatizado."
    ],
    kpis: [
      { label: "Modelo", value: "Landing page de conversao" },
      { label: "Captura", value: "EmailJS + n8n" },
      { label: "Deploy", value: "SSG no GitHub Pages" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://www.embalagensprintbag.com/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Capa da landing",
        description: "Tela principal com proposta de valor da campanha.",
        thumbSrc: "/projects/landing-page-printbag/thumb.png",
        fullSrc: "/projects/landing-page-printbag/thumb.png"
      },
      {
        title: "Hero e proposta de valor",
        description: "Mensagem principal e CTA de contato.",
        thumbSrc: "/projects/landing-page-printbag/screen1.png",
        fullSrc: "/projects/landing-page-printbag/screen1.png"
      },
      {
        title: "Diferenciais da marca",
        description: "Personalizacao, sustentabilidade e certificacoes.",
        thumbSrc: "/projects/landing-page-printbag/screen2.png",
        fullSrc: "/projects/landing-page-printbag/screen2.png"
      },
      {
        title: "Produtos e aplicacoes",
        description: "Blocos visuais com foco comercial.",
        thumbSrc: "/projects/landing-page-printbag/screen3.png",
        fullSrc: "/projects/landing-page-printbag/screen3.png"
      },
      {
        title: "Prova social",
        description: "Parceiros, depoimentos e credibilidade.",
        thumbSrc: "/projects/landing-page-printbag/screen4.png",
        fullSrc: "/projects/landing-page-printbag/screen4.png"
      },
      {
        title: "Formulario de lead",
        description: "Captura com validacao e integracoes.",
        thumbSrc: "/projects/landing-page-printbag/screen5.png",
        fullSrc: "/projects/landing-page-printbag/screen5.png"
      }
    ]
  },
  {
    slug: "site-institucional-printbag",
    title: "Site institucional Printbag",
    subtitle: "Embalagens e sacolas para marcas — tradição, inovação e sustentabilidade.",
    summary:
      "Front-end institucional da Printbag: fabricante nacional com narrativa de ESG, credibilidade (selos, marcas) e jornada clara de soluções para contato e loja.",
    description:
      "Site multi-página com hero em vídeo (YouTube), métricas de tradição, selos e certificações, linhas por segmento (Printmoda, Printfood), carrossel de clientes e rotas para Sobre, Soluções, ESG, Contato e Trabalhe conosco — integrado à loja externa.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Site institucional",
    domain: "Marketing",
    segment: "Embalagens / B2B",
    tags: [
      "Institucional",
      "ESG",
      "Vite",
      "React",
      "Tailwind",
      "Framer Motion",
      "Prova social",
      "GitHub Pages"
    ],
    stack: [
      "Vite 5",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "lucide-react",
      "React Router",
      "TanStack Query",
      "Framer Motion",
      "ESLint",
      "GitHub Pages"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(34, 120, 95, 0.38)",
      b: "rgba(180, 140, 90, 0.24)",
      c: "rgba(255, 255, 255, 0.1)"
    },
    context:
      "Compradores B2B de embalagem comparam papel, acabamento, prazo e logística; sem um hub único alinhado ao discurso comercial, a descoberta vira troca de PDFs e mensagens soltas. A Printbag precisava diferenciar capacidade industrial, consistência de marca e agenda ESG sem parecer mais um catálogo frio do setor gráfico.",
    problem: [
      "Dispersão de informação: quem busca fornecedor compara muitos critérios ao mesmo tempo; sem mapa claro do portfólio, a negociação não escala.",
      "Diferenciação fraca: sites do segmento tendem a se parecer; faltava traduzir tradição + inovação + sustentabilidade em experiência memorável.",
      "Prova de competência: decisores exigem certificações, cases (marcas) e oferta legível — senão a confiança não fecha na primeira visita."
    ],
    constraints: [
      "Prova social (marcas) e prova técnica (selos, prêmios) visíveis em poucos segundos.",
      "Escaneabilidade e hierarquia forte no mobile; motion e microinterações sem poluir.",
      "Deploy estático com base path coerente (GitHub Pages), SPA com fallback 404 para refresh em rotas."
    ],
    solution: [
      "Home de alto impacto: hero com vídeo em destaque (YouTube), overlay, CTAs, stats (40+ anos, 500+ marcas, milhares de pontos de venda), selos (FSC, energia renovável, Abvtex, Two Sides, prêmio de excelência gráfica), linhas por verticais e carrossel de logos de clientes.",
      "Sobre com história e linha do tempo; Soluções com produtos, acabamentos e vantagens (mínimo por formato, prova de cor, especialistas, entrega nacional, JIT, FSC quando aplicável).",
      "Páginas ESG e Privacidade; Contato e Trabalhe conosco; link para loja.printbag.com.br como canal de conversão paralelo ao institucional.",
      "Arquitetura em src/pages/, Layout com Header/Footer e submenu; TanStack Query preparado para API; Framer Motion para entrada e scroll; imagens importadas pelo pipeline do Vite."
    ],
    results: [
      "Clareza de posicionamento: visitante associa a Printbag a fabricante nacional, ESG e atendimento a grandes marcas.",
      "Menos atrito na descoberta: rota Soluções concentra produto, acabamento e benefícios.",
      "Confiança reforçada por selos + logos como gatilhos B2B.",
      "CTAs e caminhos para contato e loja sustentam o funil institucional → ação."
    ],
    learnings: [
      "Institucional forte mistura narrativa emocional com prova auditável (selos, métricas, marcas).",
      "Multi-página com Router exige basename e 404.html alinhados ao ambiente de hospedagem."
    ],
    nextSteps: [
      "Medir leads e tempo de sessão com analytics e CRM.",
      "Evoluir conteúdo de cases e materiais ricos a partir da mesma base de componentes."
    ],
    kpis: [
      { label: "Modelo", value: "Site institucional multi-página" },
      { label: "Stack", value: "Vite + React + TypeScript" },
      { label: "Canais", value: "Contato + loja externa" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://printbag.com.br/",
        visibility: "public"
      },
      {
        label: "Loja Printbag",
        url: "https://loja.printbag.com.br/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Home e hero",
        description: "Vídeo em destaque, mensagem de valor e camada visual.",
        thumbSrc: "/projects/site-institucional-printbag/thumb.jpg",
        fullSrc: "/projects/site-institucional-printbag/thumb.jpg"
      },
      {
        title: "Credibilidade e linhas",
        description: "Métricas, selos e verticais (ex.: Printmoda / Printfood).",
        thumbSrc: "/projects/site-institucional-printbag/screen1.jpg",
        fullSrc: "/projects/site-institucional-printbag/screen1.jpg"
      },
      {
        title: "Soluções e oferta",
        description: "Vitrine de produtos, acabamentos e benefícios comerciais.",
        thumbSrc: "/projects/site-institucional-printbag/screen2.jpg",
        fullSrc: "/projects/site-institucional-printbag/screen2.jpg"
      },
      {
        title: "Prova social",
        description: "Marcas e continuidade da narrativa institucional.",
        thumbSrc: "/projects/site-institucional-printbag/screen3.jpg",
        fullSrc: "/projects/site-institucional-printbag/screen3.jpg"
      }
    ]
  },
  {
    slug: "donacica-hot-dog",
    title: "Dona Ciça Hot Dog, Landing Page",
    subtitle: "Presença digital própria para converter tráfego em pedidos no iFood.",
    summary:
      "Landing page de alta conversão para a marca Dona Ciça: impacto visual forte, cardápio real e CTAs para pedir no iFood, sem depender só da plataforma.",
    description:
      "Site estático como casa da marca: credibilidade, fotos reais, copy forte e um único foco, levar o visitante a pedir no iFood.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Landing Page",
    domain: "Marketing",
    segment: "Food / Brand",
    tags: [
      "Landing Page",
      "Conversão",
      "iFood",
      "React",
      "Vite",
      "Framer Motion",
      "GitHub Pages"
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite 8",
      "Tailwind CSS 3",
      "Framer Motion",
      "Lucide React",
      "GitHub Pages"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(255, 130, 50, 0.38)",
      b: "rgba(200, 28, 42, 0.32)",
      c: "rgba(255, 200, 120, 0.14)"
    },
    context:
      "A Dona Ciça já vende bem pelo iFood, mas depender só de plataforma de delivery é arriscado: o algoritmo muda, a taxa sobe ou o concorrente aparece em primeiro. O site é a presença digital própria da marca, um lugar que existe independente de qualquer plataforma, que passa credibilidade e faz o cliente sentir que está lidando com uma marca de verdade, não só mais um cadastro no aplicativo. Não é loja e não tem checkout: é uma landing de alta conversão com um objetivo claro, fazer o visitante clicar em Pedir no iFood.",
    problem: [
      "Dependência exclusiva de marketplaces para visibilidade e conversão.",
      "Marca sem canal próprio que reforce confiança além do card do app.",
      "Necessidade de impacto visual forte no mobile, onde está a maior parte do tráfego."
    ],
    constraints: [
      "Sem e-commerce próprio: conversão via iFood e WhatsApp.",
      "Infraestrutura zero, deploy estático gratuito.",
      "Conteúdo e preços alinhados ao catálogo real do iFood."
    ],
    solution: [
      "Hero com marca em destaque, copy forte e três CTAs (iFood, cardápio, WhatsApp).",
      "Diferenciais em cards; cardápio com abas (Tradicionais, Promoções, Combos), fotos e preços reais.",
      "Sobre a marca com foto real e prova social (nota 5.0); benefícios com marquee animado.",
      "CTA final e footer com logo, links e WhatsApp; partículas, gradiente e ilustração com animação.",
      "Fonte única de textos e dados em siteContent; assets organizados; build otimizado pelo Vite.",
      "Deploy no GitHub Pages, 100% gratuito, sem servidor nem mensalidade."
    ],
    results: [
      "Credibilidade quando alguém pesquisa a marca: aparece um site profissional, não só o iFood.",
      "Link próprio para Instagram, WhatsApp, panfleto e qualquer canal.",
      "Cada seção empurra para o pedido; botão flutuante no mobile conforme a rolagem.",
      "Confiança com ingredientes e preços reais e foto da Dona Ciça, o cliente chega ao iFood já convencido."
    ],
    learnings: [
      "Landing com uma ação principal mantém a jornada clara do visitante.",
      "Centralizar textos e cardápio em um único módulo reduz retrabalho na manutenção."
    ],
    nextSteps: [
      "Medir conversões por origem (UTM) e refinar CTAs.",
      "Testes A/B de headline e ordem das seções no mobile."
    ],
    kpis: [
      { label: "Objetivo", value: "Pedir no iFood" },
      { label: "Deploy", value: "GitHub Pages" },
      { label: "Stack", value: "React 19 + Vite 8" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/donacicasite/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Hero e marca",
        description: "Tipografia forte, gradiente e CTAs para iFood, cardápio e WhatsApp.",
        thumbSrc: "/projects/donacica-hot-dog/thumb.jpg",
        fullSrc: "/projects/donacica-hot-dog/screen1.jpg"
      },
      {
        title: "Impacto visual",
        description: "Partículas, glow e hierarquia pensada para mobile.",
        thumbSrc: "/projects/donacica-hot-dog/screen2.jpg",
        fullSrc: "/projects/donacica-hot-dog/screen2.jpg"
      },
      {
        title: "Diferenciais e cardápio",
        description: "Cards da marca e abas do cardápio com fotos e preços reais.",
        thumbSrc: "/projects/donacica-hot-dog/screen3.jpg",
        fullSrc: "/projects/donacica-hot-dog/screen3.jpg"
      },
      {
        title: "Sobre a marca",
        description: "Foto real e prova social com avaliação 5.0.",
        thumbSrc: "/projects/donacica-hot-dog/screen4.jpg",
        fullSrc: "/projects/donacica-hot-dog/screen4.jpg"
      },
      {
        title: "Benefícios e movimento",
        description: "Marquee com frases da marca e reforço de conversão.",
        thumbSrc: "/projects/donacica-hot-dog/screen5.jpg",
        fullSrc: "/projects/donacica-hot-dog/screen5.jpg"
      },
      {
        title: "CTA final e rodapé",
        description: "Última conversão antes do footer com links e créditos.",
        thumbSrc: "/projects/donacica-hot-dog/screen6.jpg",
        fullSrc: "/projects/donacica-hot-dog/screen6.jpg"
      }
    ]
  },
  {
    slug: "new-talent",
    title: "New Talent, Site institucional",
    subtitle: "Landing para escola de DJ, produção musical e locação, conversão e WhatsApp.",
    summary:
      "Site estático com visual de palco/estúdio, página única com cursos, produtos em abas, unidades (Maringá, Londrina, Balneário Camboriú) e atalhos constantes para WhatsApp e Instagram.",
    description:
      "Primeira impressão forte para quem busca curso de DJ ou serviços: texto direto, microanimações, partículas no hero e jornada pensada para mobile e lead rápido.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Site institucional",
    domain: "Marketing",
    segment: "Educação / Música",
    tags: [
      "Landing Page",
      "HTML/CSS/JS",
      "GitHub Pages",
      "WhatsApp",
      "SEO",
      "Mobile first"
    ],
    stack: [
      "HTML5 semântico",
      "CSS (variáveis de tema)",
      "JavaScript (vanilla)",
      "Canvas (partículas)",
      "GitHub Pages"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(60, 120, 255, 0.38)",
      b: "rgba(140, 40, 200, 0.28)",
      c: "rgba(120, 200, 255, 0.12)"
    },
    context:
      "A New Talent é escola de DJ e também atua com produção musical e locação de equipamento. O site é uma landing institucional: primeira impressão forte, visual de música eletrônica / palco / estúdio (fundo escuro, azul, animação no hero), texto direto e muitos atalhos para o WhatsApp. Não é o site cinza de escola com PDF escondido, é pensado para quem está no celular, rolando rápido e querendo entender a marca e já falar com alguém.",
    problem: [
      "Sem um lugar único na internet, a escola some na busca e mistura informação de uma cidade com outra.",
      "Leads se perdem porque ninguém explica no privado toda vez o que oferecem, onde atendem e como começar.",
      "Dependência de indicação ou atendimento manual no Zap para explicar tudo."
    ],
    constraints: [
      "Projeto 100% estático, sem servidor e sem banco.",
      "Conteúdo editável no HTML; links de WhatsApp/Instagram por unidade quando fechados.",
      "Prioridade absoluta a performance e leitura no celular."
    ],
    solution: [
      "Página única: hero com impacto, cursos, produtos em abas (DJ, produção musical, locação), unidades com história por cidade (desde 2013 / 2018 / 2022).",
      "Seções “pra quem é”, “como funciona”, CTA final e footer com navegação clara.",
      "Vários botões de conversão + WhatsApp flutuante + link para Instagram.",
      "SEO básico: título, descrição, Open Graph e hierarquia de headings.",
      "Menu fixo e menu mobile, scroll suave, microanimações, partículas no hero, contador de números, parallax leve nos orbs no desktop.",
      "Deploy em GitHub Pages a partir da raiz do repositório (branch main ou /docs, conforme configuração)."
    ],
    results: [
      "Quem entra entende em segundos a proposta, as linhas (DJ / produção / locação) e que há mais de uma unidade.",
      "Caminho curto para conversar (WhatsApp), menos “não sei se é pra mim ou na minha cidade”.",
      "Cara de marca séria e atual; site leve e estático carrega rápido no 4G, essencial com tráfego majoritário mobile."
    ],
    learnings: [
      "Intersection Observer e JS vanilla bastam para entrada animada sem framework pesado.",
      "Comentários no HTML nos pontos de troca de links reduzem retrabalho quando o cliente fecha dados por unidade."
    ],
    nextSteps: [
      "Medir cliques por seção e refinar ordem dos CTAs no mobile.",
      "Expandir metadados locais (schema) se a busca por cidade crescer."
    ],
    kpis: [
      { label: "Formato", value: "Página única estática" },
      { label: "Deploy", value: "GitHub Pages" },
      { label: "Stack", value: "HTML + CSS + JS" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/sitenewtalent/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Hero e identidade",
        description: "Visual escuro, azul e animação com partículas no fundo.",
        thumbSrc: "/projects/new-talent/thumb.jpg",
        fullSrc: "/projects/new-talent/screen1.jpg"
      },
      {
        title: "Cursos e narrativa",
        description: "Blocos de conteúdo e hierarquia para leitura rápida.",
        thumbSrc: "/projects/new-talent/screen2.jpg",
        fullSrc: "/projects/new-talent/screen2.jpg"
      },
      {
        title: "Produtos em abas",
        description: "DJ, produção musical e locação em uma única seção com abas.",
        thumbSrc: "/projects/new-talent/screen3.jpg",
        fullSrc: "/projects/new-talent/screen3.jpg"
      },
      {
        title: "Unidades e história",
        description: "Maringá, Londrina e Balneário Camboriú com linha do tempo da marca.",
        thumbSrc: "/projects/new-talent/screen4.jpg",
        fullSrc: "/projects/new-talent/screen4.jpg"
      },
      {
        title: "Conversão e rodapé",
        description: "CTA final, links e presença de WhatsApp e redes.",
        thumbSrc: "/projects/new-talent/screen5.jpg",
        fullSrc: "/projects/new-talent/screen5.jpg"
      }
    ]
  },
  {
    slug: "plano-orcamento-engenharia",
    title: "Plano Orçamentário de Engenharia",
    subtitle: "Governança e previsibilidade para projetos técnicos.",
    summary:
      "Estruturação de plano orçamentário para consolidar previsões e execução de engenharia.",
    description:
      "Framework de orçamento para engenharia com controle por centro de custo, fases e entregáveis, buscando previsibilidade sem perder flexibilidade.",
    year: 2024,
    status: "Em produção",
    progress: 100,
    type: "Planejamento",
    domain: "Finanças",
    segment: "Planejamento",
    tags: ["Orçamento", "Engenharia", "Governança", "Finanças"],
    stack: ["Next.js", "TypeScript", "Planilhas", "APIs"],
    cover: {
      kind: "gradient",
      a: "rgba(255, 206, 140, 0.35)",
      b: "rgba(120, 255, 200, 0.3)",
      c: "rgba(255, 255, 255, 0.12)"
    },
    context:
      "A área de engenharia precisava alinhar custos e cronograma com governança, mantendo velocidade de execução.",
    problem: [
      "Baixa padronização na coleta de custos.",
      "Dificuldade em comparar previsto x realizado.",
      "Ausência de visão por etapa do projeto."
    ],
    constraints: [
      "Sem mudança no ERP principal.",
      "Aprovação multiárea obrigatória.",
      "Prazos curtos para fechamento mensal."
    ],
    solution: [
      "Modelo único de categorias e centros de custo.",
      "Workflow de aprovação com checkpoints.",
      "Dashboards por fase e responsável."
    ],
    results: [
      "Governança orçamentária com foco em decisões técnicas.",
      "Consistência e padronização entre equipes.",
      "Visão clara de execução por etapa."
    ],
    learnings: [
      "Checkpoints curtos reduzem retrabalho no fechamento.",
      "Documentação leve aumenta adesão das áreas."
    ],
    nextSteps: [
      "Automatizar importação de custos indiretos.",
      "Adicionar alertas por variação crítica."
    ],
    kpis: [
      { label: "Previsão", value: "Por fase" },
      { label: "Controle", value: "Centro de custo" },
      { label: "Comparativo", value: "Previsto x realizado" }
    ],
    confidentialityNote:
      "Indicadores financeiros apresentados em faixas para garantir confidencialidade.",
    links: [
      { label: "Matriz orçamentária", href: "#" }
    ],
    gallery: [
      { title: "Mapa de custos", description: "Distribuição por fase do projeto." },
      { title: "Linha do tempo", description: "Marcos e checkpoints de aprovação." }
    ]
  },
  {
    slug: "orcamentario-contabil",
    title: "Orçamentário Contábil",
    subtitle: "Controle financeiro com visão consolidada e auditável.",
    summary:
      "Revisão do processo orçamentário contábil para unificar dados e acelerar análises.",
    description:
      "Projeto para organizar o ciclo orçamentário contábil, integrando centros de custo e relatórios com foco em consistência e rastreabilidade.",
    year: 2022,
    status: "Concluído",
    progress: 100,
    type: "Finanças",
    domain: "Finanças",
    segment: "Finanças",
    tags: ["Contábil", "Orçamento", "Governança", "Finanças"],
    stack: ["Next.js", "TypeScript", "BI", "Integrações"],
    cover: {
      kind: "gradient",
      a: "rgba(170, 160, 255, 0.35)",
      b: "rgba(120, 255, 200, 0.3)",
      c: "rgba(255, 255, 255, 0.14)"
    },
    context:
      "A controladoria precisava consolidar dados dispersos, mantendo auditabilidade para ajustes críticos.",
    problem: [
      "Dados contábeis fragmentados por área.",
      "Baixa rastreabilidade de ajustes.",
      "Relatórios com baixa consistência visual."
    ],
    constraints: [
      "Integrações com sistemas legados.",
      "Sem exposição de dados sensíveis.",
      "Calendário rígido de fechamento."
    ],
    solution: [
      "Modelo consolidado por centro de custo.",
      "Trilhas de auditoria para ajustes críticos.",
      "Dashboards com linguagem visual padronizada."
    ],
    results: [
      "Leitura rápida para decisões financeiras.",
      "Governança e padronização de relatórios.",
      "Melhor alinhamento entre contábil e gestão."
    ],
    learnings: [
      "Padronização reduz dúvidas no fechamento.",
      "Tags contábeis ajudam auditoria automatizada."
    ],
    nextSteps: [
      "Criar alertas de inconsistência por período.",
      "Conectar a visão com forecast de caixa."
    ],
    kpis: [
      { label: "Auditoria", value: "Trilhas ativas" },
      { label: "Consolidação", value: "Centros de custo" },
      { label: "Padronização", value: "Relatórios" }
    ],
    accessLinks: [
      {
        label: "Acesso interno - LAN",
        url: "http://192.168.1.104:3004/login",
        visibility: "internal"
      }
    ],
    links: [
      { label: "Template de relatório", href: "#" }
    ],
    gallery: [
      { title: "Painel contábil", description: "Resumo consolidado por centro." },
      { title: "Comparativo mensal", description: "Previsto x realizado por área." }
    ]
  },
  {
    slug: "apresentador-projetos",
    title: "Apresentador de Projetos Internos",
    subtitle: "Hub interativo para organizar e apresentar cases da empresa.",
    summary:
      "Plataforma interna para consolidar projetos de sistemas e BI, com preview rapido, narrativa visual e acesso centralizado.",
    description:
      "Projeto do proprio site, criado para reunir cases internos, padronizar a comunicacao e facilitar a navegacao entre projetos.",
    year: 2026,
    status: "Em produção",
    progress: 100,
    type: "Plataforma",
    domain: "Sistemas",
    segment: "Portfolio",
    tags: ["Portal", "Portfolio", "UI", "Frontend"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    cover: {
      kind: "gradient",
      a: "rgba(118, 28, 48, 0.5)",
      b: "rgba(72, 16, 36, 0.36)",
      c: "rgba(255, 210, 218, 0.14)"
    },
    context:
      "O portfolio interno precisava de uma linguagem unica, com acesso rapido a cases e apresentacao consistente para areas internas.",
    problem: [
      "Cases dispersos em arquivos e links isolados.",
      "Baixa consistencia visual entre projetos.",
      "Dificuldade em apresentar contexto e impacto rapidamente."
    ],
    constraints: [
      "Manter performance e responsividade.",
      "Nao expor dados sensiveis.",
      "Estrutura flexivel para novos cases."
    ],
    solution: [
      "Hub visual com dois eixos (Sistemas e BI).",
      "Cards com preview, progresso e tags resumidas.",
      "Navegacao por overlay fullscreen e previews rapidos."
    ],
    results: [
      "Centralizacao dos projetos internos em um unico lugar.",
      "Leitura rapida do contexto e do status de cada case.",
      "Apresentacao consistente para stakeholders."
    ],
    learnings: [
      "Narrativa visual reduz o tempo de explicacao.",
      "Padronizacao de cards facilita comparacao entre cases."
    ],
    nextSteps: [
      "Adicionar filtros por area e status.",
      "Expandir conteudo com novos cases e midias."
    ],
    kpis: [
      { label: "Cases", value: "Centralizados" },
      { label: "Acesso", value: "Rapido" },
      { label: "Padrao visual", value: "Unificado" }
    ],
    confidentialityNote:
      "Conteudo com imagens e descricoes sem dados sensiveis.",
    accessLinks: [],
    gallery: [
      {
        title: "Visao geral",
        description: "Apresentacao do hub e navegacao principal.",
        thumbSrc: "/projects/apresentador-projetos/thumb.jpg",
        fullSrc: "/projects/apresentador-projetos/thumb.jpg"
      },
      {
        title: "Overlay de projetos",
        description: "Lista detalhada com preview e progresso.",
        thumbSrc: "/projects/apresentador-projetos/screen1.jpg",
        fullSrc: "/projects/apresentador-projetos/screen1.jpg"
      },
      {
        title: "Cards de destaque",
        description: "Layout dos cards com informacoes resumidas.",
        thumbSrc: "/projects/apresentador-projetos/screen2.jpg",
        fullSrc: "/projects/apresentador-projetos/screen2.jpg"
      },
      {
        title: "Detalhes visuais",
        description: "Camadas de estilo e acabamento tech.",
        thumbSrc: "/projects/apresentador-projetos/screen3.jpg",
        fullSrc: "/projects/apresentador-projetos/screen3.jpg"
      },
      {
        title: "Grid de projetos",
        description: "Organizacao dos cases em cards e tags.",
        thumbSrc: "/projects/apresentador-projetos/screen4.jpg",
        fullSrc: "/projects/apresentador-projetos/screen4.jpg"
      }
    ]
  },
  {
    slug: "sistema-chamados-portfolio-vivo",
    title: "Sistema Interno de Chamados Printbag",
    subtitle: "Centralizacao de solicitacoes com rastreabilidade de ponta a ponta.",
    summary:
      "Sistema interno para organizar chamados entre TI, RH, Compras, Financeiro, Logistica e Pre-impressao em fluxo unico.",
    description:
      "Projeto focado em eliminar atendimento disperso (e-mail, WhatsApp e verbal), com papeis claros e jornada completa de abertura, triagem, atendimento, finalizacao e avaliacao.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Plataforma",
    domain: "Sistemas",
    segment: "Atendimento",
    tags: ["Chamados", "SLA", "Kanban", "Dashboard", "Workflow", "LDAP/SSO"],
    stack: [
      "Laravel 11",
      "PHP 8.2",
      "Blade",
      "Tailwind CSS",
      "Alpine.js",
      "Vite",
      "MySQL/MariaDB"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(168, 48, 230, 0.52)",
      b: "rgba(88, 22, 155, 0.42)",
      c: "rgba(230, 190, 255, 0.14)"
    },
    context:
      "O sistema foi desenhado para reduzir ruido operacional com formularios por tipo de chamado, filas por area/perfil e filtros inteligentes, diminuindo retrabalho e demandas fora de contexto.",
    problem: [
      "Atendimento disperso entre e-mail, WhatsApp e solicitacoes verbais.",
      "Solicitacoes incompletas gerando retrabalho no atendimento.",
      "Chamados fora de contexto por falta de fila e triagem estruturada.",
      "Necessidade de reforcar testes e revisar pontos de autorizacao/filtro."
    ],
    constraints: [
      "Manter separacao de papeis (admin, gestor, atendente e usuario).",
      "Garantir rastreabilidade completa da jornada do chamado.",
      "Sustentar operacao multi-area com regras diferentes por tipo de demanda.",
      "Evoluir sem quebrar governanca, seguranca e produtividade do time."
    ],
    solution: [
      "Fila de atendimento com kanban, dashboard, SLA automatico e notificacoes.",
      "Comentarios, notas internas e anexos para reduzir ping-pong de comunicacao.",
      "Integracao com Active Directory (LDAP/SSO) para acelerar adocao.",
      "Mais de 30 tipos de chamados modelados com aderencia ao negocio.",
      "Criacao, acompanhamento, finalizacao e avaliacao em fluxo unico."
    ],
    results: [
      "Maior previsibilidade de prazo e melhor priorizacao de demandas via SLA.",
      "Metricas gerenciais de volume, status, conformidade e performance por area.",
      "Mais transparencia entre solicitante, atendente e gestor.",
      "Reducao de gargalos invisiveis com decisoes baseadas em dados."
    ],
    learnings: [
      "Formularios por tipo elevam qualidade e velocidade da triagem.",
      "Rastreabilidade compartilhada melhora colaboracao entre areas.",
      "Governanca de acesso e filtros precisa evoluir junto com as features."
    ],
    nextSteps: [
      "Ampliar cobertura de testes automatizados.",
      "Padronizar validacoes e hardening de upload.",
      "Otimizar consultas, indices e observabilidade."
    ],
    kpis: [
      { label: "Atendimento", value: "Fluxo unico rastreavel" },
      { label: "SLA", value: "Conformidade monitorada" },
      { label: "Gestao", value: "Decisao por metricas" }
    ],
    confidentialityNote:
      "Dados operacionais e nomes sensiveis protegidos para uso seguro em ambiente interno.",
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/sistemas-de-chamado/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Visao geral da aplicacao",
        description: "Tela inicial com resumo de chamados, metricas rapidas e acoes diretas.",
        thumbSrc: "/projects/sistema-chamados-portfolio-vivo/screen1.jpg",
        fullSrc: "/projects/sistema-chamados-portfolio-vivo/screen1.jpg"
      },
      {
        title: "Dashboard Executivo",
        description: "Metricas de SLA, volume, status e performance por area em tempo real.",
        thumbSrc: "/projects/sistema-chamados-portfolio-vivo/screen2.jpg",
        fullSrc: "/projects/sistema-chamados-portfolio-vivo/screen2.jpg"
      },
      {
        title: "Top Atendentes e Chamados Recentes",
        description: "Ranking de resolucao e tabela de chamados com status, prioridade e SLA.",
        thumbSrc: "/projects/sistema-chamados-portfolio-vivo/screen3.jpg",
        fullSrc: "/projects/sistema-chamados-portfolio-vivo/screen3.jpg"
      },
      {
        title: "Fila de Chamados",
        description: "Listagem completa com filtros por area, status, prioridade e SLA.",
        thumbSrc: "/projects/sistema-chamados-portfolio-vivo/screen4.jpg",
        fullSrc: "/projects/sistema-chamados-portfolio-vivo/screen4.jpg"
      },
      {
        title: "Kanban de chamados",
        description: "Movimentacao de cards por status com regras de fluxo e visao por fila.",
        thumbSrc: "/projects/sistema-chamados-portfolio-vivo/screen5.jpg",
        fullSrc: "/projects/sistema-chamados-portfolio-vivo/screen5.jpg"
      },
      {
        title: "Detalhe do chamado",
        description: "Visao completa do chamado com historico, responsaveis e status de atendimento.",
        thumbSrc: "/projects/sistema-chamados-portfolio-vivo/screen6.jpg",
        fullSrc: "/projects/sistema-chamados-portfolio-vivo/screen6.jpg"
      }
    ]
  },
  
  
  {
    slug: "previsao-demanda-python-estatistica",
    title: "Previsao de Demanda (Python + Estatistica)",
    subtitle: "Da planilha manual para um fluxo operacional auditavel e orientado a decisao.",
    summary:
      "Plataforma com duas frentes: execucao do pipeline Python por job e leitura executiva da previsao estatistica consolidada.",
    description:
      "Projeto criado para transformar o planejamento de demanda em um sistema de decisao. A frente Python resolve como gerar a previsao com trilha operacional; a frente Estatistica resolve como decidir, com leitura executiva e explicabilidade.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Planejamento",
    domain: "Operacoes",
    segment: "Previsao de Demanda",
    tags: ["Previsao", "Python", "Estatistica", "Planejamento", "Jobs", "Analytics"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Wouter",
      "TanStack Query",
      "Tailwind CSS",
      "Radix/shadcn",
      "Node.js",
      "Express",
      "tRPC",
      "MariaDB",
      "Drizzle ORM",
      "xlsx",
      "Python",
      "Vitest"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(52, 108, 195, 0.5)",
      b: "rgba(24, 52, 112, 0.42)",
      c: "rgba(170, 205, 255, 0.13)"
    },
    context:
      "O planejamento de demanda dependia de planilhas isoladas, com baixa rastreabilidade de execucao e pouca leitura executiva do resultado. O objetivo foi separar claramente o fluxo de geracao (Python) da camada de interpretacao (Estatistica), com governanca e usabilidade.",
    problem: [
      "Execucao manual sem trilha clara de status e historico.",
      "Planilhas extensas com baixa navegabilidade e explicabilidade.",
      "UX instavel em filtros e atualizacoes, com consultas excessivas.",
      "Drill-down sem retorno intuitivo para o usuario.",
      "Escopos misturados entre execucao Python e analise estatistica."
    ],
    constraints: [
      "Manter rastreabilidade completa por job (status, versao, horarios e logs).",
      "Suportar datasets grandes sem travar a leitura analitica.",
      "Separar claramente os contextos de execucao e decisao.",
      "Preservar fluidez visual durante refetch e interacoes frequentes."
    ],
    solution: [
      "Tela Previsao Python com upload validado, disparo de job assincrono e log em tempo real.",
      "Ciclo de vida formal de jobs (PENDING, RUNNING, SUCCESS, ERROR) com historico e metadados.",
      "Download do Excel de saida e visualizacao analitica dentro do sistema.",
      "Tela Previsao Demanda Estatistica dedicada a leitura do ciclo consolidado.",
      "Leitura por modulos analiticos (visao executiva, clientes, metodos e previsao).",
      "Paginacao, busca, filtros, ordenacao e drill-down com retorno explicito.",
      "Debounce e preservacao de dados durante refetch para eliminar piscadas."
    ],
    results: [
      "Governanca operacional com trilha auditavel em todas as execucoes.",
      "Reducao da dependencia de execucao manual por pessoa.",
      "Leitura executiva mais rapida que o uso direto de planilhas brutas.",
      "Decisao com contexto, risco e prioridade, nao apenas numero.",
      "Melhor adocao por interface mais intuitiva em filtros e drill-down.",
      "Escalabilidade para alto volume com paginacao e consultas otimizadas."
    ],
    learnings: [
      "Separar explicitamente geracao e interpretacao reduz ambiguidade operacional.",
      "Debounce e estado preservado elevam a percepcao de performance.",
      "Drill-down precisa de retorno visual claro para evitar perda de contexto.",
      "Rastreabilidade de job melhora suporte, auditoria e confianca no processo."
    ],
    nextSteps: [
      "Evoluir explicabilidade automatica com causas provaveis de variacao.",
      "Adicionar recomendacoes de acao por risco e oportunidade.",
      "Expandir paineis executivos com comparativos entre ciclos e janelas."
    ],
    kpis: [
      { label: "Trilha operacional", value: "Jobs auditaveis ponta a ponta" },
      { label: "Leitura executiva", value: "Navegavel e explicavel" },
      { label: "Escalabilidade", value: "Paginacao + filtros otimizados" }
    ],
    gallery: [
      {
        title: "Pipeline Python",
        description: "Upload, execucao assincrona e monitoramento em tempo real.",
        thumbSrc: "/projects/previsao-demanda-python-estatistica/thumb.jpg",
        fullSrc: "/projects/previsao-demanda-python-estatistica/thumb.jpg"
      },
      {
        title: "Historico de jobs",
        description: "Status, horarios, scriptVersion e trilha de execucao.",
        thumbSrc: "/projects/previsao-demanda-python-estatistica/screen1.jpg",
        fullSrc: "/projects/previsao-demanda-python-estatistica/screen1.jpg"
      },
      {
        title: "Leitura estatistica",
        description: "Visao executiva com modulos e filtros por contexto.",
        thumbSrc: "/projects/previsao-demanda-python-estatistica/screen2.jpg",
        fullSrc: "/projects/previsao-demanda-python-estatistica/screen2.jpg"
      },
      {
        title: "Drill-down analitico",
        description: "Detalhamento com retorno intuitivo e estado preservado.",
        thumbSrc: "/projects/previsao-demanda-python-estatistica/screen3.jpg",
        fullSrc: "/projects/previsao-demanda-python-estatistica/screen3.jpg"
      }
    ]
  },
  {
    slug: "gestao-producao-industrial-mes",
    title: "Gestão de Produção Industrial",
    subtitle: "MES têxtil, centro de comando da fábrica, da engenharia ao embarque.",
    summary:
      "Painel tipo centro de comando: ordens de produção percorrem desenho técnico, corte, estamparia, qualidade, expedição, faturamento e embarque, com visão rápida do que flui, do que trava e do que pode estourar prazo.",
    description:
      "Fluxo de 7 etapas com status por etapa, painéis com filtros, alertas de risco, ações de workflow e correções de exceção; simulação em cadência previsível e modo local (frontend) ou remoto (API + PostgreSQL + SSE).",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Plataforma",
    domain: "Operações",
    segment: "Indústria Têxtil",
    tags: ["MES", "Produção", "SSE", "Node.js", "PostgreSQL", "Workflow", "Alertas", "Têxtil"],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "SSE",
      "Tailwind CSS",
      "Vitest"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(120, 210, 255, 0.3)",
      b: "rgba(120, 255, 200, 0.25)",
      c: "rgba(255, 255, 255, 0.12)"
    },
    context:
      "O site funciona como um centro de comando de fábrica têxtil: mostra as ordens de produção atravessando a operação inteira, do desenho técnico ao corte, estamparia, qualidade, expedição, faturamento e embarque. O gestor abre e enxerga rápido o que está fluindo, o que está travado e o que vai estourar prazo.",
    problem: [
      "Falta de previsibilidade e rastreabilidade ponta a ponta no fluxo.",
      "Informação que parecia aleatória na simulação vira dor real: OP atrasada sem contexto, gargalo que ninguém vê a tempo, documento que trava embarque no fim.",
      "Muita decisão reativa e pouca visão única da cadeia, antes, sem audit trail claro de aprovações e documentos.",
      "Necessidade de demo confiável sem infraestrutura (modo local) e, depois, modo autoritativo com estado em tempo real."
    ],
    constraints: [
      "Deve rodar como frontend puro (localStorage) para demonstração estática.",
      "O mesmo domínio deve operar com backend Express + PostgreSQL + SSE em produção.",
      "Simulação determinística por cadência/tick para comportamento reproduzível na demo.",
      "Alertas sem duplicação entre ticks; estado normalizado ao mesclar simulação e servidor.",
      "Configuração de runtime injetável no build (sem localhost fixo)."
    ],
    solution: [
      "Fluxo completo de 7 etapas com status claro por etapa e 9 portões de workflow tipados.",
      "Painéis de ordens com filtros e visão executiva/operacional; export CSV/PDF e cenários de demo (ex.: turno estável, gargalo, parada crítica).",
      "Alertas automáticos de risco: SLA estourado, documento pendente, doca atrasada, NF bloqueada etc., com deduplicação por fingerprint e histórico rastreável.",
      "Ações de workflow (aprovar desenho, emitir NF, vincular caminhão, confirmar embarque) e correções de exceção (reabrir qualidade, corrigir nota, reagendar doca, trocar caminhão).",
      "Simulação em cadência previsível: as OPs nascem no início e avançam de forma sequencial e determinística.",
      "Modo local (frontend puro) e modo remoto (REST + SSE, fallback de polling quando necessário); dezenas de rotas de ação e heartbeat SSE.",
      "Domínio estruturado em workflow, contratos tipados e estado normalizado; testes automatizados no domínio (Vitest) para estabilidade das regras."
    ],
    results: [
      "Mais clareza para a operação: todos entendem em qual etapa cada OP está.",
      "Menos surpresa de última hora, riscos aparecem antes, com alertas e contexto.",
      "Melhor decisão: priorização por gargalo real, não por achismo.",
      "Mais confiança na demo e no sistema: comportamento consistente, reproduzível e auditável.",
      "Deploy estático no GitHub Pages utilizável sem backend; opção remota para dados e tempo real."
    ],
    learnings: [
      "Simulação determinística e contratos tipados no domínio evitam ‘flakiness’ e discussões sem fim em demo.",
      "Separar claramente modo cliente vs remoto desacopla UX da infraestrutura atual."
    ],
    nextSteps: [
      "Ampliar testes de workflow e portões de ação.",
      "Análise histórica de SLA por etapa e comparativos de turno.",
      "Integração com emissão fiscal real quando o ambiente permitir."
    ],
    kpis: [
      { label: "Fluxo", value: "7 etapas ponta a ponta" },
      { label: "Modos", value: "Local + remoto (SSE)" },
      { label: "Risco", value: "Alertas antecipados" }
    ],
    confidentialityNote:
      "Dados de produção apresentados em ambiente demonstrativo com valores sintéticos gerados por simulação.",
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/gestao-producao-industrial/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Pipeline de 7 etapas",
        description: "Fluxo ponta a ponta da engenharia ao embarque com visão por ordem.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen1.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen1.jpg"
      },
      {
        title: "Drill-down da expedição",
        description: "Backlog, SLA, documentos e acompanhamento por OP.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen2.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen2.jpg"
      },
      {
        title: "Cards de embarque",
        description: "Status por OP com NF, caminhão, doca e saída prevista.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen3.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen3.jpg"
      },
      {
        title: "Apontamento e qualidade",
        description: "Produção, paradas e transições de etapa com impacto na operação.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen4.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen4.jpg"
      },
      {
        title: "Painel operacional",
        description: "Filtros, priorização e leitura rápida do que trava ou flui.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen5.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen5.jpg"
      },
      {
        title: "Alertas e riscos",
        description: "SLA, documentos pendentes e sinais antes do estouro de prazo.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen6.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen6.jpg"
      },
      {
        title: "Workflow e ações",
        description: "Aprovações, exceções e correções no fluxo da OP.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen7.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen7.jpg"
      },
      {
        title: "Visão executiva",
        description: "Resumo para gestão: gargalos, rotas e saúde do pipeline.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen8.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen8.jpg"
      },
      {
        title: "Detalhe da ordem",
        description: "Contexto completo da OP em uma tela.",
        thumbSrc: "/projects/gestao-producao-industrial-mes/screen9.jpg",
        fullSrc: "/projects/gestao-producao-industrial-mes/screen9.jpg"
      }
    ]
  },
  {
    slug: "press-kit-levorato-dj",
    title: "Press Kit Digital, LEVORATO DJ",
    subtitle: "Site de press kit para conversão de bookings e apresentação profissional da marca.",
    summary:
      "Site estático de press kit para o DJ e produtor Pedro Levorato: identidade, história, música e contato em uma única URL pública para contratantes, assessores e promoters.",
    description:
      "Cartão de visita digital completo que vende o artista antes mesmo de uma conversa acontecer, visual agressivo, sets on-demand e galeria de fotos para download.",
    year: 2025,
    status: "Concluído",
    progress: 100,
    type: "Site estático",
    domain: "Marketing",
    segment: "Música / Entretenimento",
    tags: [
      "Press Kit",
      "HTML/CSS/JS",
      "GitHub Pages",
      "DJ",
      "Booking",
      "Música"
    ],
    stack: [
      "HTML5 semântico",
      "CSS3 (variáveis customizadas)",
      "JavaScript vanilla",
      "Intersection Observer API",
      "GitHub Pages"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(220, 30, 50, 0.42)",
      b: "rgba(180, 10, 30, 0.32)",
      c: "rgba(255, 60, 80, 0.15)"
    },
    context:
      "O artista não tinha presença digital estruturada para o mercado de bookings. As informações estavam espalhadas em redes sociais, sem um ponto centralizado que transmitisse autoridade e identidade de marca para quem fosse contratar. Precisava de algo que vendesse antes mesmo de uma conversa acontecer.",
    problem: [
      "Sem presença digital estruturada, o artista perdia credibilidade na hora de fechar bookings.",
      "Informações espalhadas em redes sociais sem narrativa de marca clara.",
      "Contratantes e promoters precisavam perguntar tudo manualmente, fotos, sets, história, contato."
    ],
    constraints: [
      "Site 100% estático, sem backend, deploy simples via GitHub Pages.",
      "Funcionar perfeitamente em mobile, onde a maioria dos contratantes acessa.",
      "Galeria de fotos com download nativo, sem dependência de serviços externos."
    ],
    solution: [
      "Hero com identidade visual forte: foto, título, partículas animadas e efeitos neon.",
      "Linha do tempo interativa com 3 capítulos da trajetória (2011, 2022, 2025).",
      "Carrossel horizontal infinito de fotos dos lugares onde já tocou.",
      "Seção de músicas com sistema de abas, 6 sets no SoundCloud e 6 tracks autorais no Spotify.",
      "Seção 'Sobre' com bio, tags de estilo musical e foto profissional.",
      "Galeria em alta qualidade com download individual e pacote .zip.",
      "Booking com botões diretos para WhatsApp, Instagram e e-mail.",
      "Design 100% responsivo com 5 breakpoints e tratamento especial para touch devices."
    ],
    results: [
      "Centralizou toda a identidade profissional do artista em um único link compartilhável.",
      "Contratantes acessam sets, lançamentos, histórico e contato sem fricção.",
      "Galeria de download eliminou o processo manual de envio de fotos por mensagem.",
      "Estética agressiva e premium reforçou o posicionamento no mercado de Minimal Bass underground.",
      "Aumentou percepção de profissionalismo e facilita a tomada de decisão do contratante."
    ],
    learnings: [
      "Partículas geradas via JS puro (180 instâncias via @keyframes) têm performance comparável a libs pesadas.",
      "Intersection Observer + CSS keyframes bastam para reveal profissional sem framework.",
      "Cálculo dinâmico de posição via JS resolve timeline animada sem depender de bibliotecas de scroll."
    ],
    nextSteps: [
      "Adicionar analytics para medir origem dos contatos de booking.",
      "Versão em inglês para alcance internacional."
    ],
    kpis: [
      { label: "Formato", value: "Site estático" },
      { label: "Deploy", value: "GitHub Pages" },
      { label: "Partículas JS", value: "180 instâncias" },
      { label: "Breakpoints", value: "5 (960→520px)" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/presskitlevoratodj",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Hero e identidade",
        description: "Foto do artista, partículas animadas e efeitos neon com identidade forte.",
        thumbSrc: "/projects/press-kit-levorato-dj/thumb.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen1.jpg"
      },
      {
        title: "Linha do tempo",
        description: "3 capítulos da trajetória: 2011, 2022 e 2025 com spine animada.",
        thumbSrc: "/projects/press-kit-levorato-dj/screen2.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen2.jpg"
      },
      {
        title: "Carrossel de lugares",
        description: "Fotos dos venues onde já tocou em loop infinito horizontal.",
        thumbSrc: "/projects/press-kit-levorato-dj/screen3.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen3.jpg"
      },
      {
        title: "Seção de músicas",
        description: "Abas SoundCloud (sets) e Spotify (autorais) integradas.",
        thumbSrc: "/projects/press-kit-levorato-dj/screen4.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen4.jpg"
      },
      {
        title: "Galeria e download",
        description: "Fotos profissionais com download individual e pacote .zip.",
        thumbSrc: "/projects/press-kit-levorato-dj/screen5.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen5.jpg"
      },
      {
        title: "Booking e contato",
        description: "CTAs diretos para WhatsApp, Instagram e e-mail.",
        thumbSrc: "/projects/press-kit-levorato-dj/screen6.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen6.jpg"
      },
      {
        title: "Mobile e responsividade",
        description: "Layout adaptado para celular com todos os breakpoints.",
        thumbSrc: "/projects/press-kit-levorato-dj/screen7.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen7.jpg"
      },
      {
        title: "Seção Sobre",
        description: "Bio do artista, tags de estilo musical e foto profissional.",
        thumbSrc: "/projects/press-kit-levorato-dj/screen8.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen8.jpg"
      },
      {
        title: "Detalhes visuais",
        description: "Efeitos neon, animações e identidade visual da marca.",
        thumbSrc: "/projects/press-kit-levorato-dj/screen9.jpg",
        fullSrc: "/projects/press-kit-levorato-dj/screen9.jpg"
      }
    ]
  },
  {
    slug: "claymoon-press-kit",
    title: "ClayMoon.music, Press kit digital",
    subtitle:
      "Site estático de apresentação e contacto para DJ/produtor: uma URL com identidade, história, som, media e booking.",
    summary:
      "Press kit digital para ClayMoon.music — um único link com narrativa, Tech House / Minimal Deep Tech, timeline, mídia leve, sets e canais de booking para bookers e promotores decidirem rápido.",
    description:
      "Site estático hospedado no GitHub Pages: hero com partículas, capítulos de história, Sobre consolidado, vídeos (grelha no desktop e carrossel no mobile), galeria com downloads, SoundCloud, contacto e internacionalização em seis idiomas.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Site estático",
    domain: "Marketing",
    segment: "Música / Entretenimento",
    tags: [
      "Press Kit",
      "Marketing",
      "Site estático",
      "GitHub Pages",
      "Música",
      "i18n",
      "Mobile first"
    ],
    stack: [
      "HTML5 semântico",
      "CSS3 (layout responsivo, animações)",
      "JavaScript vanilla",
      "Traduções centralizadas (JS)",
      "GitHub Pages"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(124, 58, 237, 0.52)",
      b: "rgba(67, 24, 122, 0.4)",
      c: "rgba(196, 181, 253, 0.18)"
    },
    context:
      "O site nasceu para parar de dispersar informação (redes, PDFs, áudios em chats) e concentrar a marca num só sítio com aparência de produto profissional: vender o artista antes da primeira call — visual forte, leitura clara e tudo o que um contratante precisa num fluxo só. A narrativa reflete cerca de dois anos de projeto com som entre Tech House e Minimal Deep Tech e referência europeia (Dublin → Porto), sem inventar números de público ou gigs; textos, timeline, Sobre e media foram alinhados à proposta atual.",
    problem: [
      "Informação espalhada: bio num sítio, fotos noutro, sets perdidos em links soltos.",
      "Falta de um único link que transmita autoridade e clareza musical para quem decide em minutos.",
      "Identidade em transição: era preciso uma voz única (ClayMoon) e tradução para quem não fala português.",
      "Media pesada (vídeo): hospedar tudo no GitHub Pages obrigou compressão e decisões de layout em vez de ficheiros enormes no repositório."
    ],
    constraints: [
      "Site 100% estático no GitHub Pages, sem backend.",
      "Performance e leitura fortes no telemóvel (muitos bookers abrem o link no telemóvel).",
      "Internacionalização mantendo chaves centralizadas e persistência de idioma sem recarregar mal."
    ],
    solution: [
      "Hero com identidade visual, partículas e CTA para som e contacto.",
      "História em capítulos (timeline) com fotos estáticas e texto coerente com a trajetória.",
      "Sobre consolidado (Europa, Porto, Tech House / Minimal Deep Tech).",
      "Secção Mídia com vídeos: carrossel no mobile e grelha no desktop, pensada para leveza.",
      "Presença em palco, galeria e downloads do press kit visual.",
      "Sets em destaque e SoundCloud integrados no layout.",
      "Booking com WhatsApp, Instagram e e-mail.",
      "Seis idiomas com chaves em JS e preferência de idioma persistida.",
      "Micro-interações (glitch nos títulos, hover, scroll suave) sem pesar um site estático.",
      "Crédito do desenvolvedor e favicon alinhados à marca."
    ],
    results: [
      "Um link único para enviar em mails e bios — menos fricção entre sets, contacto e media.",
      "Perceção mais profissional para contratantes que julgam pelo primeiro clique.",
      "Decisão mais rápida para quem precisa de EN/ES/ZH/DE/JA sem página duplicada manualmente.",
      "Deploy contínuo via Git: atualizações simples e histórico no repositório."
    ],
    learnings: [
      "Com GitHub Pages, vídeo e imagens pesadas exigem compressão e padrões de layout diferentes por breakpoint.",
      "Chaves de tradução num único ficheiro reduzem erro ao acrescentar secções."
    ],
    nextSteps: [
      "Medir visitas e origem dos cliques de booking (analytics leve, compatível com estático).",
      "Refinar ordem dos blocos no mobile conforme dados reais de scroll."
    ],
    kpis: [
      { label: "Idiomas", value: "6" },
      { label: "Deploy", value: "GitHub Pages" },
      { label: "Formato", value: "Site estático" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/claymoon/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Hero e identidade",
        description: "INSERT COIN, groove retrô e CTAs para ouvir e booking.",
        thumbSrc: "/projects/claymoon-press-kit/hero.png",
        fullSrc: "/projects/claymoon-press-kit/hero.png"
      },
      {
        title: "História em capítulos",
        description: "Timeline com narrativa 2024–2026 e fotos de contexto.",
        thumbSrc: "/projects/claymoon-press-kit/cm-2.jpg",
        fullSrc: "/projects/claymoon-press-kit/cm-2.jpg"
      },
      {
        title: "Sobre e proposta",
        description: "Bio, géneros e posicionamento Europa / Porto.",
        thumbSrc: "/projects/claymoon-press-kit/cm-3.jpg",
        fullSrc: "/projects/claymoon-press-kit/cm-3.jpg"
      },
      {
        title: "Mídia e palco",
        description: "Vídeos e presença em palco com layout adaptado ao ecrã.",
        thumbSrc: "/projects/claymoon-press-kit/cm-4.jpg",
        fullSrc: "/projects/claymoon-press-kit/cm-4.jpg"
      },
      {
        title: "Sets e SoundCloud",
        description: "Destaques e integração de sets no próprio site.",
        thumbSrc: "/projects/claymoon-press-kit/cm-5.jpg",
        fullSrc: "/projects/claymoon-press-kit/cm-5.jpg"
      },
      {
        title: "Booking e contacto",
        description: "WhatsApp, Instagram e e-mail visíveis.",
        thumbSrc: "/projects/claymoon-press-kit/cm-6.jpg",
        fullSrc: "/projects/claymoon-press-kit/cm-6.jpg"
      },
      {
        title: "Rodapé e créditos",
        description: "Fecho da página e crédito do site.",
        thumbSrc: "/projects/claymoon-press-kit/cm-7.jpg",
        fullSrc: "/projects/claymoon-press-kit/cm-7.jpg"
      }
    ]
  },
  {
    slug: "quint-press-kit",
    title: "Quint (DJ & producer), Press kit digital",
    subtitle:
      "Cartão de visitas digital: um link com identidade techno/underground, timeline, palcos, sets, drops, autorais, imprensa e booking.",
    summary:
      "Press kit digital para Quint — paleta escura e roxa, hero com foto e logo, timeline, prova de palco, Park Art no YouTube, drops em vídeo com modal, autorais com Spotify, suporte de pista, abas de música, downloads (.zip), i18n e GitHub Pages.",
    description:
      "Site estático (HTML, CSS, JavaScript vanilla) publicado no GitHub Pages: fluxo único para curadoria, promoters e mídia — narrativa ordenada, embeds YouTube/Spotify, vídeos locais com posters e carga sob demanda, galeria de imprensa e booking direto (e-mail institucional, WhatsApp, redes), vários idiomas e metas para compartilhamento.",
    year: 2026,
    status: "Concluído",
    progress: 100,
    type: "Site estático",
    domain: "Marketing",
    segment: "Música / Entretenimento",
    tags: [
      "Press Kit",
      "Marketing",
      "Site estático",
      "GitHub Pages",
      "Música",
      "i18n",
      "Techno"
    ],
    stack: [
      "HTML5 semântico",
      "CSS3 (variáveis, clamp, animações)",
      "JavaScript vanilla (ES5+)",
      "YouTube / Spotify (embeds)",
      "GitHub Pages"
    ],
    cover: {
      kind: "gradient",
      a: "rgba(109, 40, 217, 0.52)",
      b: "rgba(59, 7, 100, 0.42)",
      c: "rgba(167, 139, 250, 0.2)"
    },
    context:
      "Antes do hub, a presença digital do artista ficava espalhada entre Instagram, plataformas de áudio, vídeos soltos e fotos em pastas ou no telemóvel. Para o mercado de booking isso gera atrito: narrativa fraca, materiais duplicados ou desatualizados, e sensação de amadorismo quando não existe um endereço oficial do artista.",
    problem: [
      "Sem um ponto único de autoridade — tudo parecia improviso; difícil apontar um “press kit” oficial.",
      "Informação e mídia em canais diferentes, sem vitrine que contasse a história na ordem certa.",
      "Promoters pediam sempre as mesmas coisas por mensagem: fotos em alta, bio, links de sets e história — retrabalho para o artista e para quem contrata."
    ],
    constraints: [
      "Site 100% estático no GitHub Pages, sem backend.",
      "Vários vídeos locais: evitar baixar todos os MP4 de uma vez (posters, lazy load, modal).",
      "Open Graph e URLs absolutas alinhadas ao deploy em path (/Quint/)."
    ],
    solution: [
      "Hero com foto de fundo, tratamento visual (grão, scanner, glow), logo com animação controlada e CTAs (ouvir / booking).",
      "Timeline “A história” com capítulos, imagens estáticas e carrosséis verticais.",
      "Lugares com carrossel de palcos e foco nos principais eventos.",
      "Park Art com embed do YouTube; aftermovie da formatura Volare integrado.",
      "Drops: vídeos curtos com navegação, modal, posters/thumbs e MP4 sob demanda.",
      "Autorais: carrossel de capas com Spotify ao clicar.",
      "Suporte: vídeos de DJs tocando as tracks, mesma lógica visual dos Drops.",
      "Músicas com abas SoundCloud / YouTube; Sobre com bio; downloads e pacote .zip para imprensa.",
      "Booking com e-mail institucional, WhatsApp e redes; i18n (PT, EN, ES, ZH, DE, JA) com preferência persistida.",
      "Open Graph, favicon, layout responsivo e refinamento do hero no mobile."
    ],
    results: [
      "Identidade, história, mídia e contato centralizados num link compartilhável.",
      "Galeria e .zip reduzem o envio manual de fotos por DM.",
      "Contratantes ouvem sets, drops e autorais e veem suporte de pista sem sair da página.",
      "Estética escura e roxa reforça posicionamento underground / techno.",
      "Posters e lazy load melhoram primeira impressão em 4G e mobile."
    ],
    learnings: [
      "Press kit com muitos vídeos locais exige combinação de poster + carga tardia; modais evitam prefetch de todos os MP4.",
      "Traduções no cliente com data-i18n mantêm um único HTML e um único deploy."
    ],
    nextSteps: [
      "Medir cliques de booking e origem com analytics leve, compatível com estático.",
      "Rever peso de assets no repositório face aos limites do GitHub Pages."
    ],
    kpis: [
      { label: "Formato", value: "HTML · CSS · JS" },
      { label: "Deploy", value: "GitHub Pages" },
      { label: "Idiomas", value: "6" }
    ],
    accessLinks: [
      {
        label: "Acesso público",
        url: "https://levoratoo.github.io/Quint/",
        visibility: "public"
      }
    ],
    gallery: [
      {
        title: "Hero e identidade",
        description: "Foto de fundo, tratamento visual e CTAs para ouvir e booking.",
        thumbSrc: "/projects/quint-press-kit/screen1.jpg",
        fullSrc: "/projects/quint-press-kit/screen1.jpg"
      },
      {
        title: "Timeline “A história”",
        description: "Capítulos da trajetória com imagens e carrosséis onde faz sentido.",
        thumbSrc: "/projects/quint-press-kit/screen2.jpg",
        fullSrc: "/projects/quint-press-kit/screen2.jpg"
      },
      {
        title: "Prova de palco",
        description: "Lugares e eventos com carrossel e visual premium.",
        thumbSrc: "/projects/quint-press-kit/screen3.jpg",
        fullSrc: "/projects/quint-press-kit/screen3.jpg"
      },
      {
        title: "Park Art e vídeo em destaque",
        description: "Set no YouTube com contexto visual do evento.",
        thumbSrc: "/projects/quint-press-kit/screen4.jpg",
        fullSrc: "/projects/quint-press-kit/screen4.jpg"
      },
      {
        title: "Drops na pista",
        description: "Vídeos curtos, navegação e modal com carga sob demanda.",
        thumbSrc: "/projects/quint-press-kit/screen5.jpg",
        fullSrc: "/projects/quint-press-kit/screen5.jpg"
      },
      {
        title: "Autorais",
        description: "Capas em carrossel e Spotify embutido ao clicar.",
        thumbSrc: "/projects/quint-press-kit/screen6.jpg",
        fullSrc: "/projects/quint-press-kit/screen6.jpg"
      },
      {
        title: "Suporte de pista",
        description: "DJs tocando as tracks e texto de relevância.",
        thumbSrc: "/projects/quint-press-kit/screen7.jpg",
        fullSrc: "/projects/quint-press-kit/screen7.jpg"
      },
      {
        title: "Músicas em abas",
        description: "SoundCloud e YouTube sem dispersar o foco.",
        thumbSrc: "/projects/quint-press-kit/screen8.jpg",
        fullSrc: "/projects/quint-press-kit/screen8.jpg"
      },
      {
        title: "Imprensa e downloads",
        description: "Galeria em alta, miniaturas leves e opção de pacote .zip.",
        thumbSrc: "/projects/quint-press-kit/screen9.jpg",
        fullSrc: "/projects/quint-press-kit/screen9.jpg"
      },
      {
        title: "Booking e redes",
        description: "E-mail, WhatsApp e links para fechar contato.",
        thumbSrc: "/projects/quint-press-kit/screen10.jpg",
        fullSrc: "/projects/quint-press-kit/screen10.jpg"
      }
    ]
  }];


export type ProjectLite = {
  slug: string;
  title: string;
  oneLiner: string;
  problem: string;
  solution: string;
  features: string[];
  benefits: string[];
  techStack: string[];
  accessLinks: { label: string; url: string }[];
  images: { src: string; alt: string }[];
};

export const projectsLite: ProjectLite[] = [
  {
    slug: "dashboard-separacao-estoque",
    title: "Dashboard de Análise de Pedidos e Estoque",
    oneLiner: "Visão em tempo real para pedidos pendentes e estoque crítico.",
    problem: "Dependência de planilhas e baixa atualização para tomada de decisão.",
    solution: "Dashboard web consolidando pedidos, status por saldo e estoque por localização.",
    features: [
      "Lista de pedidos pendentes com status",
      "Detalhamento de itens por pedido",
      "Estoque por localização, lote e validade",
      "Filtros e gráficos para análise rápida"
    ],
    benefits: [
      "Análises mais rápidas sem planilhas",
      "Decisões mais ágeis sobre falta de saldo",
      "Dados atualizados e confiáveis"
    ],
    techStack: ["Next.js", "TypeScript", "SQL Server", "APIs REST"],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/estoqueemtemporeal/" }
    ],
    images: [
      { src: "/images/projetos/estoque/estoque-1.png", alt: "Pedidos pendentes" },
      { src: "/images/projetos/estoque/estoque-2.png", alt: "Detalhamento do pedido" },
      { src: "/images/projetos/estoque/estoque-3.png", alt: "Estoque por localização" },
      { src: "/images/projetos/estoque/estoque-4.png", alt: "Indicadores e filtros" }
    ]
  },
  {
    slug: "planejamento-orcamentario-coordenador",
    title: "Sistema de Planejamento Orçamentário por Coordenador",
    oneLiner: "Planejamento e controle orçamentário por centro de custo.",
    problem: "Processo dependente de planilhas e baixa governança por perfil.",
    solution:
      "Sistema web com cenários, workflow de aprovação e comparativo previsto vs realizado.",
    features: [
      "Cenários orçamentários com etapas de aprovação",
      "Gestão por centro de custo com permissões",
      "Grid mensal por conta contábil",
      "Premissas e justificativas por lançamento"
    ],
    benefits: [
      "Redução de consolidação manual",
      "Rastreabilidade completa de alterações",
      "Visão em tempo real do orçamento"
    ],
    techStack: ["Next.js", "TypeScript", "SQL Server"],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/orcamentario-custos/planejamento/" }
    ],
    images: [
      {
        src: "/projects/planejamento-orcamentario-coordenador/thumb.jpg",
        alt: "Capa do projeto"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen1.jpg",
        alt: "Tela 1"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen2.jpg",
        alt: "Tela 2"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen3.jpg",
        alt: "Tela 3"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen4.jpg",
        alt: "Tela 4"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen5.jpg",
        alt: "Tela 5"
      }
    ]
  },
  {
    slug: "sistema-orcamentario-produtos-graficos",
    title: "Sistema Orçamentário - Gestão Inteligente de Orçamentos para Produtos Gráficos",
    oneLiner:
      "Sistema web interno para gerenciar solicitações de orçamento de produtos gráficos.",
    problem: "Processo de orçamento fragmentado, com erros e retrabalho na cotação.",
    solution:
      "Wizard guiado, catálogo técnico inteligente, integrações automáticas e dashboard.",
    features: [
      "Wizard de criação com validação automática",
      "Catálogo técnico com regras de compatibilidade",
      "Formulário configurável pela engenharia",
      "Integração via webhook com histórico",
      "Dashboard de métricas e comparativos",
      "Geração de PDFs de solicitação"
    ],
    benefits: [
      "Redução de erros e retrabalho",
      "Padronização do processo de orçamento",
      "Dados estruturados para análise"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "SQL Server", "APIs"],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/orcamentoengenhariaprintbag/" }
    ],
    images: [
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/thumb.jpg",
        alt: "Capa do projeto"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen1.jpg",
        alt: "Tela 1"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen2.jpg",
        alt: "Tela 2"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen3.jpg",
        alt: "Tela 3"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen4.jpg",
        alt: "Tela 4"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen5.jpg",
        alt: "Tela 5"
      }
    ]
  },
  {
    slug: "monitoramento-pedidos-tempo-real",
    title: "Sistema de Monitoramento de Pedidos em Tempo Real",
    oneLiner: "Painel em tempo real para acompanhar pedidos processados e integrações.",
    problem: "Baixa visibilidade do processamento e demora para identificar falhas.",
    solution:
      "Monitoramento em tempo real com filtros avançados, ranking de erros e detalhe técnico por pedido.",
    features: [
      "Lista paginada/filtrável de pedidos processados",
      "Auto-refresh / realtime com indicador de conexão",
      "Painel lateral com detalhe do pedido",
      "Visualização de XML (preview + completo)",
      "KPI cards + ranking de erros",
      "Busca full-text em XML"
    ],
    benefits: [
      "Redução do tempo para identificar falhas",
      "Confiabilidade operacional com visibilidade centralizada",
      "Base para melhorias contínuas"
    ],
    techStack: [
      "Node.js",
      "TypeScript",
      "Fastify",
      "SQL Server",
      "SSE",
      "React",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "TanStack Table",
      "Lucide",
      "Sonner",
      "pnpm",
      "concurrently",
      "ESLint"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/Middleware/" }
    ],
    images: [
      {
        src: "/projects/monitoramento-pedidos-tempo-real/thumb.jpg",
        alt: "Capa do projeto"
      },
      {
        src: "/projects/monitoramento-pedidos-tempo-real/screen1.jpg",
        alt: "Tela 1"
      },
      {
        src: "/projects/monitoramento-pedidos-tempo-real/screen2.jpg",
        alt: "Tela 2"
      },
      {
        src: "/projects/monitoramento-pedidos-tempo-real/screen3.jpg",
        alt: "Tela 3"
      }
    ]
  },
  {
    slug: "landing-page-printbag",
    title: "Landing Page Printbag",
    oneLiner: "Landing page focada em atrair clientes e gerar leads qualificados.",
    problem: "Trafego de campanhas sem pagina de destino unica e orientada a conversao.",
    solution:
      "Pagina unica com CTA claro, prova social e formulario integrado a EmailJS e webhook n8n.",
    features: [
      "Hero com proposta de valor e CTA imediato",
      "Diferenciais da marca em seções escaneaveis",
      "Produtos e aplicacoes com foco comercial",
      "Prova social com parceiros e depoimentos",
      "Formulario com validacao e feedback visual",
      "Integracao paralela com EmailJS e webhook n8n"
    ],
    benefits: [
      "Mais leads qualificados para o comercial",
      "Melhor conversao de campanhas e redes sociais",
      "Follow-up agil com dados organizados"
    ],
    techStack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "EmailJS",
      "Webhook n8n",
      "Google Tag Manager",
      "Git / GitHub",
      "GitHub Pages",
      "SSG"
    ],
    accessLinks: [{ label: "Acesso público", url: "https://www.embalagensprintbag.com/" }],
    images: [
      { src: "/projects/landing-page-printbag/thumb.png", alt: "Capa da landing page" },
      { src: "/projects/landing-page-printbag/screen1.png", alt: "Hero e CTA" },
      { src: "/projects/landing-page-printbag/screen2.png", alt: "Diferenciais" },
      { src: "/projects/landing-page-printbag/screen3.png", alt: "Produtos" },
      { src: "/projects/landing-page-printbag/screen4.png", alt: "Prova social" },
      { src: "/projects/landing-page-printbag/screen5.png", alt: "Formulario de contato" }
    ]
  },
  {
    slug: "site-institucional-printbag",
    title: "Site institucional Printbag",
    oneLiner:
      "Institucional multi-página: ESG, credibilidade e jornada Soluções → contato/loja para embalagens e sacolas B2B.",
    problem:
      "Falta de um mapa único do portfólio alinhado ao discurso comercial e prova fraca de diferenciação e ESG na percepção.",
    solution:
      "Home com vídeo, stats e selos; Sobre e Soluções estruturadas; ESG, Contato e loja externa; stack Vite/React com motion e deploy estático.",
    features: [
      "Hero com YouTube, overlay e CTAs; stats e selos de credibilidade",
      "Linhas por segmento e carrossel de marcas",
      "Rotas Sobre, Soluções, ESG, Contato e Trabalhe conosco",
      "Link para loja.printbag.com.br",
      "Framer Motion, grid responsivo e submenu no header",
      "TanStack Query preparado para consumo de API"
    ],
    benefits: [
      "Posicionamento claro como fabricante nacional com agenda ESG",
      "Menos idas e vindas para entender escopo (hub Soluções)",
      "Confiança B2B com selos e logos"
    ],
    techStack: [
      "Vite 5",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "lucide-react",
      "React Router",
      "TanStack Query",
      "Framer Motion",
      "GitHub Pages"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://printbag.com.br/" },
      { label: "Loja Printbag", url: "https://loja.printbag.com.br/" }
    ],
    images: [
      { src: "/projects/site-institucional-printbag/thumb.jpg", alt: "Home e hero" },
      { src: "/projects/site-institucional-printbag/screen1.jpg", alt: "Credibilidade e linhas" },
      { src: "/projects/site-institucional-printbag/screen2.jpg", alt: "Soluções e oferta" },
      { src: "/projects/site-institucional-printbag/screen3.jpg", alt: "Prova social" }
    ]
  },
  {
    slug: "donacica-hot-dog",
    title: "Dona Ciça Hot Dog, Landing Page",
    oneLiner:
      "Landing de alta conversão para presença própria da marca e pedidos no iFood.",
    problem:
      "Marca forte no delivery mas sem site próprio que converta e gere confiança fora do app.",
    solution:
      "Landing estática com impacto visual, cardápio real, CTAs para iFood e deploy gratuito no GitHub Pages.",
    features: [
      "Hero com marca, copy e CTAs (iFood, cardápio, WhatsApp)",
      "Diferenciais, cardápio em abas com fotos e preços reais",
      "Sobre com foto real e prova social",
      "Animações com Framer Motion e assets da marca",
      "Fonte única de conteúdo em siteContent",
      "Build com Vite e hospedagem em GitHub Pages"
    ],
    benefits: [
      "Credibilidade em buscas e redes",
      "Link próprio da marca em qualquer canal",
      "Conversão guiada até o pedido no iFood"
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite 8",
      "Tailwind CSS 3",
      "Framer Motion",
      "Lucide React",
      "GitHub Pages"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/donacicasite/" }
    ],
    images: [
      { src: "/projects/donacica-hot-dog/thumb.jpg", alt: "Hero Dona Ciça" },
      { src: "/projects/donacica-hot-dog/screen1.jpg", alt: "Hero e CTAs" },
      { src: "/projects/donacica-hot-dog/screen2.jpg", alt: "Impacto visual" },
      { src: "/projects/donacica-hot-dog/screen3.jpg", alt: "Diferenciais e cardápio" },
      { src: "/projects/donacica-hot-dog/screen4.jpg", alt: "Sobre a marca" },
      { src: "/projects/donacica-hot-dog/screen5.jpg", alt: "Benefícios" },
      { src: "/projects/donacica-hot-dog/screen6.jpg", alt: "CTA e footer" }
    ]
  },
  {
    slug: "new-talent",
    title: "New Talent, Site institucional",
    oneLiner:
      "Landing estática para escola de DJ e serviços, com foco em lead e WhatsApp.",
    problem:
      "Marca invisível na busca e leads perdidos sem um lugar único que explique ofertas e unidades.",
    solution:
      "Site em HTML/CSS/JS puro, uma página, abas de produtos, unidades e deploy no GitHub Pages.",
    features: [
      "Hero com partículas (canvas) e visual de palco/estúdio",
      "Cursos, produtos em abas (DJ, produção, locação) e unidades por cidade",
      "Menu fixo, mobile, scroll suave e microanimações (Intersection Observer)",
      "WhatsApp flutuante, CTAs e Instagram",
      "SEO básico e Open Graph",
      "Manutenção direta no HTML com comentários para links por unidade"
    ],
    benefits: [
      "Proposta clara em segundos",
      "Conversão rápida no celular",
      "Zero custo de servidor"
    ],
    techStack: [
      "HTML5",
      "CSS (variáveis)",
      "JavaScript vanilla",
      "Canvas",
      "GitHub Pages"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/sitenewtalent/" }
    ],
    images: [
      { src: "/projects/new-talent/thumb.jpg", alt: "Hero New Talent" },
      { src: "/projects/new-talent/screen1.jpg", alt: "Hero e identidade" },
      { src: "/projects/new-talent/screen2.jpg", alt: "Cursos e narrativa" },
      { src: "/projects/new-talent/screen3.jpg", alt: "Produtos em abas" },
      { src: "/projects/new-talent/screen4.jpg", alt: "Unidades" },
      { src: "/projects/new-talent/screen5.jpg", alt: "CTA e footer" }
    ]
  },
  {
    slug: "sistema-chamados-portfolio-vivo",
    title: "Sistema Interno de Chamados Printbag",
    oneLiner:
      "Centraliza chamados entre areas com fluxo unico, SLA e rastreabilidade.",
    problem:
      "Atendimento disperso e sem padrao entre canais informais.",
    solution:
      "Workflow completo com fila, kanban, dashboard, notificacoes e avaliacao de atendimento.",
    features: [
      "Formularios por tipo de chamado",
      "Fila por area e perfil",
      "Kanban e dashboard de SLA",
      "Comentarios, notas internas e anexos",
      "Integracao com LDAP/SSO",
      "Mais de 30 tipos de chamados modelados"
    ],
    benefits: [
      "Melhor priorizacao de demandas",
      "Maior previsibilidade de prazo",
      "Transparencia operacional para gestao"
    ],
    techStack: [
      "Laravel 11",
      "PHP 8.2",
      "Blade",
      "Tailwind CSS",
      "Alpine.js",
      "Vite",
      "MySQL/MariaDB"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/sistemas-de-chamado/" }
    ],
    images: [
      { src: "/projects/sistema-chamados-portfolio-vivo/screen1.jpg", alt: "Visao geral da aplicacao" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen2.jpg", alt: "Dashboard Executivo" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen3.jpg", alt: "Top Atendentes e Chamados Recentes" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen4.jpg", alt: "Fila de Chamados" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen5.jpg", alt: "Kanban de chamados" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen6.jpg", alt: "Detalhe do chamado" }
    ]
  },
  {
    slug: "gestao-producao-industrial-mes",
    title: "Gestão de Produção Industrial",
    oneLiner:
      "MES têxtil, centro de comando da OP do desenho ao embarque, com alertas e fluxo de 7 etapas.",
    problem:
      "Pouca previsibilidade e rastreabilidade; decisão reativa e risco de trava no fim do processo.",
    solution:
      "Painéis, alertas de SLA, workflow com ações e exceções; simulação determinística; modo local ou remoto com SSE.",
    features: [
      "7 etapas: desenho → corte → estamparia → qualidade → expedição → faturamento → embarque",
      "Alertas automáticos (SLA, documento, doca, NF) e ações de workflow",
      "Modo dual: frontend local ou Node + PostgreSQL + SSE (com fallback de polling)",
      "Simulação em cadência previsível; domínio com testes (Vitest)"
    ],
    benefits: [
      "Visão do que flui, trava ou estoura prazo",
      "Priorização por gargalo real",
      "Demo e sistema com comportamento reproduzível"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Express", "PostgreSQL", "SSE", "Vitest"],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/gestao-producao-industrial/" }
    ],
    images: [
      { src: "/projects/gestao-producao-industrial-mes/thumb.jpg", alt: "Capa MES produção" },
      { src: "/projects/gestao-producao-industrial-mes/screen1.jpg", alt: "Pipeline de 7 etapas" },
      { src: "/projects/gestao-producao-industrial-mes/screen2.jpg", alt: "Drill-down da expedição" },
      { src: "/projects/gestao-producao-industrial-mes/screen3.jpg", alt: "Cards de embarque" },
      { src: "/projects/gestao-producao-industrial-mes/screen4.jpg", alt: "Apontamento e qualidade" },
      { src: "/projects/gestao-producao-industrial-mes/screen5.jpg", alt: "Painel operacional" },
      { src: "/projects/gestao-producao-industrial-mes/screen6.jpg", alt: "Alertas e riscos" },
      { src: "/projects/gestao-producao-industrial-mes/screen7.jpg", alt: "Workflow e ações" },
      { src: "/projects/gestao-producao-industrial-mes/screen8.jpg", alt: "Visão executiva" },
      { src: "/projects/gestao-producao-industrial-mes/screen9.jpg", alt: "Detalhe da ordem" }
    ]
  },
  {
    slug: "press-kit-levorato-dj",
    title: "Press Kit Digital, LEVORATO DJ",
    oneLiner:
      "Press kit estático para conversão de bookings: identidade, música, galeria e contato em um link.",
    problem:
      "Artista sem presença digital estruturada, informações espalhadas em redes sociais sem ponto centralizado que transmitisse autoridade para contratantes.",
    solution:
      "Site estático completo publicado via GitHub Pages com hero neon, timeline de trajetória, carrossel de venues, sets embeds e galeria para download.",
    features: [
      "Hero com foto, partículas animadas (180 instâncias JS) e efeitos neon",
      "Timeline interativa com spine animada, 3 capítulos (2011, 2022, 2025)",
      "Carrossel infinito de fotos dos venues; galeria com download individual e .zip",
      "Seção de músicas com abas: 6 sets (SoundCloud) e 6 tracks autorais (Spotify)",
      "Booking com botões diretos para WhatsApp, Instagram e e-mail",
      "5 breakpoints responsive + tratamento hover:none para touch"
    ],
    benefits: [
      "Identidade profissional em um único link compartilhável",
      "Contratantes acessam tudo sem friccão, sem perguntar fotos ou sets",
      "Estética premium reforça posicionamento no Minimal Bass underground"
    ],
    techStack: [
      "HTML5 semântico",
      "CSS3 (variáveis customizadas, @keyframes)",
      "JavaScript vanilla",
      "Intersection Observer API",
      "GitHub Pages"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/presskitlevoratodj" }
    ],
    images: [
      { src: "/projects/press-kit-levorato-dj/thumb.jpg", alt: "Hero LEVORATO DJ" },
      { src: "/projects/press-kit-levorato-dj/screen1.jpg", alt: "Hero e identidade neon" },
      { src: "/projects/press-kit-levorato-dj/screen2.jpg", alt: "Timeline de trajetória" },
      { src: "/projects/press-kit-levorato-dj/screen3.jpg", alt: "Carrossel de venues" },
      { src: "/projects/press-kit-levorato-dj/screen4.jpg", alt: "Seção de músicas e abas" },
      { src: "/projects/press-kit-levorato-dj/screen5.jpg", alt: "Galeria e download" },
      { src: "/projects/press-kit-levorato-dj/screen6.jpg", alt: "Booking e contato" },
      { src: "/projects/press-kit-levorato-dj/screen7.jpg", alt: "Mobile e responsividade" },
      { src: "/projects/press-kit-levorato-dj/screen8.jpg", alt: "Seção Sobre" },
      { src: "/projects/press-kit-levorato-dj/screen9.jpg", alt: "Detalhes visuais" }
    ]
  },
  {
    slug: "claymoon-press-kit",
    title: "ClayMoon.music, Press kit digital",
    oneLiner:
      "Press kit estático com identidade, timeline, mídia, sets e booking — seis idiomas, um link.",
    problem:
      "Informação dispersa entre redes e ficheiros; falta de um URL único com autoridade para bookers e promotores.",
    solution:
      "Site no GitHub Pages com narrativa em capítulos, mídia otimizada, SoundCloud, downloads e i18n com chaves em JS.",
    features: [
      "Hero com partículas e CTA para som e contacto",
      "Timeline e Sobre alinhados à proposta Tech House / Minimal Deep Tech",
      "Mídia: grelha no desktop e carrossel no mobile",
      "Galeria e material de imprensa com downloads",
      "Sets em destaque e integração SoundCloud",
      "Booking: WhatsApp, Instagram e e-mail",
      "Internacionalização (6 idiomas) com persistência de preferência",
      "Micro-interações e scroll suave sem framework pesado"
    ],
    benefits: [
      "Um link para mail e bios",
      "Menos fricção para ouvir, ver e contactar",
      "Leitura forte no telemóvel"
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript vanilla",
      "GitHub Pages"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/claymoon/" }
    ],
    images: [
      { src: "/projects/claymoon-press-kit/hero.png", alt: "Hero ClayMoon.music" },
      { src: "/projects/claymoon-press-kit/cm-2.jpg", alt: "História em capítulos" },
      { src: "/projects/claymoon-press-kit/cm-3.jpg", alt: "Sobre e proposta" },
      { src: "/projects/claymoon-press-kit/cm-4.jpg", alt: "Mídia e palco" },
      { src: "/projects/claymoon-press-kit/cm-5.jpg", alt: "Sets e SoundCloud" },
      { src: "/projects/claymoon-press-kit/cm-6.jpg", alt: "Booking e contacto" },
      { src: "/projects/claymoon-press-kit/cm-7.jpg", alt: "Rodapé e créditos" }
    ]
  },
  {
    slug: "quint-press-kit",
    title: "Quint (DJ & producer), Press kit digital",
    oneLiner:
      "Press kit estático completo para DJ/produtor: techno/underground, timeline, palcos, embeds, drops, autorais, imprensa e booking — seis idiomas.",
    problem:
      "Bio, fotos e sets espalhados em redes e chats; falta de URL única com autoridade para booking.",
    solution:
      "Página única no GitHub Pages com narrativa ordenada, vídeos com lazy load, Spotify/YouTube, .zip para imprensa e i18n em JS.",
    features: [
      "Hero com foto, glow e CTAs; timeline em capítulos e carrosséis",
      "Palcos e Park Art com YouTube; drops com modal e posters",
      "Autorais com Spotify; suporte de pista; abas SoundCloud / YouTube",
      "Downloads e galeria de imprensa com pacote .zip",
      "Booking: e-mail, WhatsApp e redes; OG e favicon",
      "Seis idiomas com data-i18n e preferência em localStorage"
    ],
    benefits: [
      "Um link vende o artista antes da primeira conversa",
      "Menos ida e volta por DM para fotos e sets",
      "Performance pensada para mobile e 4G"
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript vanilla",
      "GitHub Pages"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/Quint/" }
    ],
    images: [
      { src: "/projects/quint-press-kit/screen1.jpg", alt: "Hero e identidade" },
      { src: "/projects/quint-press-kit/screen2.jpg", alt: "Timeline A história" },
      { src: "/projects/quint-press-kit/screen3.jpg", alt: "Prova de palco" },
      { src: "/projects/quint-press-kit/screen4.jpg", alt: "Park Art e vídeo" },
      { src: "/projects/quint-press-kit/screen5.jpg", alt: "Drops" },
      { src: "/projects/quint-press-kit/screen6.jpg", alt: "Autorais" },
      { src: "/projects/quint-press-kit/screen7.jpg", alt: "Suporte de pista" },
      { src: "/projects/quint-press-kit/screen8.jpg", alt: "Músicas em abas" },
      { src: "/projects/quint-press-kit/screen9.jpg", alt: "Imprensa e downloads" },
      { src: "/projects/quint-press-kit/screen10.jpg", alt: "Booking e redes" }
    ]
  }
];



export type PreviewProject = {
  slug: string;
  title: string;
  year: number;
  area: string;
  status: "Concluído" | "Em produção";
  progress: number,
  tags: string[];
  thumb: string;
  description?: string;
  bullets?: string[];
  accessLinks?: { label: string; url: string }[];
  gallery?: { src: string; alt: string }[];
};

export const previewProjects: PreviewProject[] = [
  {
    slug: "dashboard-separacao-estoque",
    title: "Dashboard de Análise de Pedidos e Estoque",
    year: 2023,
    area: "Operações",
    status: "Concluído",
    progress: 100,
    tags: ["Dashboard", "Estoque", "Pedidos"],
    thumb: "/images/projetos/estoque/estoque-1.png",
    description:
      "Dashboard web para pedidos pendentes e estoque em tempo real, substituindo planilhas por visão atualizada.",
    bullets: [
      "Pedidos pendentes com status por saldo",
      "Detalhamento de itens por pedido",
      "Estoque por localização, lote e validade",
      "Filtros e gráficos para análise rápida"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/estoqueemtemporeal/" }
    ],
    gallery: [
      { src: "/images/projetos/estoque/estoque-1.png", alt: "Pedidos pendentes" },
      { src: "/images/projetos/estoque/estoque-2.png", alt: "Detalhamento" },
      { src: "/images/projetos/estoque/estoque-3.png", alt: "Estoque" },
      { src: "/images/projetos/estoque/estoque-4.png", alt: "Indicadores e filtros" }
    ]
  },
  {
    slug: "planejamento-orcamentario-coordenador",
    title: "Sistema de Planejamento Orçamentário por Coordenador",
    year: 2026,
    area: "Finanças",
    status: "Em produção",
    progress: 100,
    tags: ["Orçamento", "Centros de Custo", "Plano de Contas"],
    thumb: "/projects/planejamento-orcamentario-coordenador/thumb.jpg",
    description:
      "Sistema web para planejamento e controle orçamentário por centro de custo, com fluxo de aprovação, premissas e comparação previsto vs realizado.",
    bullets: [
      "Cenários orçamentários com etapas de aprovação",
      "Gestão por centro de custo com permissões",
      "Premissas e justificativas com histórico",
      "Comparação previsto vs realizado"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/orcamentario-custos/planejamento/" }
    ],
    gallery: [
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen1.jpg",
        alt: "Cenários orçamentários"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen2.jpg",
        alt: "Centros de custo"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen3.jpg",
        alt: "Grid mensal"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen4.jpg",
        alt: "Relatórios comparativos"
      },
      {
        src: "/projects/planejamento-orcamentario-coordenador/screen5.jpg",
        alt: "Acesso ao sistema"
      }
    ]
  },
  {
    slug: "sistema-orcamentario-produtos-graficos",
    title: "Sistema Orçamentário - Gestão Inteligente de Orçamentos para Produtos Gráficos",
    year: 2026,
    area: "Engenharia",
    status: "Em produção",
    progress: 100,
    tags: ["Orçamento", "Produtos Gráficos", "Wizard", "Catálogo Técnico"],
    thumb: "/projects/sistema-orcamentario-produtos-graficos/thumb.jpg",
    description:
      "Sistema web interno para gerenciar solicitações de orçamento de produtos gráficos, centralizando criação e análise.",
    bullets: [
      "Wizard guiado com validação automática",
      "Catálogo técnico com regras inteligentes",
      "Formulário configurável pela engenharia",
      "Integração via webhook e histórico de envios",
      "Dashboard com métricas e comparativos"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/orcamentoengenhariaprintbag/" }
    ],
    gallery: [
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen1.jpg",
        alt: "Wizard de solicitação"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen2.jpg",
        alt: "Catálogo técnico"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen3.jpg",
        alt: "Dashboard de métricas"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen4.jpg",
        alt: "Histórico e integrações"
      },
      {
        src: "/projects/sistema-orcamentario-produtos-graficos/screen5.jpg",
        alt: "Resumo da solicitação"
      }
    ]
  },
  {
    slug: "monitoramento-pedidos-tempo-real",
    title: "Sistema de Monitoramento de Pedidos em Tempo Real",
    year: 2026,
    area: "Operações",
    status: "Concluído",
    progress: 100,
    tags: ["Tempo Real", "Pedidos", "Integrações", "Observabilidade", "XML", "KPI", "Filtros"],
    thumb: "/projects/monitoramento-pedidos-tempo-real/thumb.jpg",
    description:
      "Painel em tempo real para acompanhar pedidos processados e integrações, com filtros avançados, ranking de erros e detalhe técnico por pedido.",
    bullets: [
      "Atualização automática em tempo real (a cada ~3s), sem refresh.",
      "Indicador de conexão (online/offline) e status de sincronização.",
      "Filtros por número do pedido, tipo de sistema (SOR/CRM) e status (erro/sucesso).",
      "Busca dentro de XMLs enviados e recebidos (auditoria técnica).",
      "Métricas: total processado, erros, taxa de sucesso e ranking de falhas."
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/Middleware/" }
    ],
    gallery: [
      {
        src: "/projects/monitoramento-pedidos-tempo-real/screen1.jpg",
        alt: "Painel em tempo real"
      },
      { src: "/projects/monitoramento-pedidos-tempo-real/screen2.jpg", alt: "Filtros e ranking" },
      { src: "/projects/monitoramento-pedidos-tempo-real/screen3.jpg", alt: "Detalhe do pedido" },
      { src: "/projects/monitoramento-pedidos-tempo-real/screen4.jpg", alt: "XML completo" }
    ]
  },
  {
    slug: "apresentador-projetos",
    title: "Apresentador de Projetos Internos",
    year: 2026,
    area: "Sistemas",
    status: "Em produção",
    progress: 100,
    tags: ["Portfolio", "Frontend", "UX"],
    thumb: "/projects/apresentador-projetos/thumb.jpg",
    description:
      "Hub interativo para apresentar cases internos com previews, narrativa visual e acesso centralizado.",
    bullets: [
      "Cards padronizados com status e progresso",
      "Preview rapido por modal e overlay fullscreen",
      "Narrativa visual consistente para stakeholders",
      "Estrutura pronta para novos cases"
    ],
    accessLinks: [],
    gallery: [
      { src: "/projects/apresentador-projetos/thumb.jpg", alt: "Visao geral do hub" },
      { src: "/projects/apresentador-projetos/screen1.jpg", alt: "Overlay de projetos" },
      { src: "/projects/apresentador-projetos/screen2.jpg", alt: "Cards de destaque" },
      { src: "/projects/apresentador-projetos/screen3.jpg", alt: "Detalhes do layout" },
      { src: "/projects/apresentador-projetos/screen4.jpg", alt: "Grid de projetos" }
    ]
  },
  {
    slug: "sistema-chamados-portfolio-vivo",
    title: "Sistema Interno de Chamados Printbag",
    year: 2026,
    area: "Sistemas",
    status: "Concluído",
    progress: 100,
    tags: ["Chamados", "SLA", "Kanban", "Dashboard", "LDAP/SSO"],
    thumb: "/projects/sistema-chamados-portfolio-vivo/thumb.jpg",
    description:
      "Sistema interno para centralizar solicitacoes entre areas com fluxo unico e rastreavel.",
    bullets: [
      "Formularios por tipo para reduzir solicitacoes incompletas",
      "Fila por area/perfil com filtros inteligentes",
      "Kanban, dashboard, SLA automatico e notificacoes",
      "Integracao com LDAP/SSO e mais de 30 tipos modelados"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/sistemas-de-chamado/" }
    ],
    gallery: [
      { src: "/projects/sistema-chamados-portfolio-vivo/screen1.jpg", alt: "Visao geral da aplicacao" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen2.jpg", alt: "Dashboard Executivo" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen3.jpg", alt: "Top Atendentes e Chamados Recentes" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen4.jpg", alt: "Fila de Chamados" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen5.jpg", alt: "Kanban de chamados" },
      { src: "/projects/sistema-chamados-portfolio-vivo/screen6.jpg", alt: "Detalhe do chamado" }
    ]
  },
  {
    slug: "landing-page-printbag",
    title: "Landing Page Printbag",
    year: 2026,
    area: "Marketing",
    status: "Concluído",
    progress: 100,
    tags: ["Landing Page", "Leads", "Conversão", "EmailJS", "Webhook n8n", "GTM"],
    thumb: "/projects/landing-page-printbag/thumb.png",
    description:
      "Landing page de conversão para atrair clientes e gerar leads qualificados, sem foco institucional.",
    bullets: [
      "Estrutura em página única orientada à ação comercial",
      "Formulário validado com feedback visual e envio paralelo",
      "Integração com EmailJS e webhook n8n para automação",
      "Rastreamento de conversão via Google Tag Manager"
    ],
    accessLinks: [{ label: "Acesso público", url: "https://www.embalagensprintbag.com/" }],
    gallery: [
      { src: "/projects/landing-page-printbag/thumb.png", alt: "Capa principal da landing" },
      { src: "/projects/landing-page-printbag/screen1.png", alt: "Hero e CTA" },
      { src: "/projects/landing-page-printbag/screen2.png", alt: "Diferenciais da Printbag" },
      { src: "/projects/landing-page-printbag/screen3.png", alt: "Produtos em destaque" },
      { src: "/projects/landing-page-printbag/screen4.png", alt: "Prova social e parceiros" },
      { src: "/projects/landing-page-printbag/screen5.png", alt: "Contato e formulário" }
    ]
  },
  {
    slug: "site-institucional-printbag",
    title: "Site institucional Printbag",
    year: 2026,
    area: "Marketing",
    status: "Concluído",
    progress: 100,
    tags: [
      "Institucional",
      "ESG",
      "Vite",
      "React",
      "Tailwind",
      "Framer Motion",
      "shadcn/ui",
      "GitHub Pages"
    ],
    thumb: "/projects/site-institucional-printbag/thumb.jpg",
    description:
      "Front institucional da Printbag: vídeo no hero, métricas e selos, linhas por segmento, marcas em carrossel e rotas Sobre, Soluções, ESG e Contato — com loja externa.",
    bullets: [
      "Hero com YouTube, overlay e CTAs; stats e selos (FSC, energia renovável, certificações)",
      "Sobre com linha do tempo; Soluções com produtos, acabamentos e vantagens",
      "ESG, Privacidade, Contato e Trabalhe conosco; link para loja.printbag.com.br",
      "Vite + React + TypeScript, Tailwind e shadcn/ui, Framer Motion, React Router, TanStack Query"
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://printbag.com.br/" },
      { label: "Loja Printbag", url: "https://loja.printbag.com.br/" }
    ],
    gallery: [
      { src: "/projects/site-institucional-printbag/thumb.jpg", alt: "Home e hero" },
      { src: "/projects/site-institucional-printbag/screen1.jpg", alt: "Credibilidade e linhas" },
      { src: "/projects/site-institucional-printbag/screen2.jpg", alt: "Soluções e oferta" },
      { src: "/projects/site-institucional-printbag/screen3.jpg", alt: "Prova social" }
    ]
  },
  {
    slug: "donacica-hot-dog",
    title: "Dona Ciça Hot Dog, Landing Page",
    year: 2026,
    area: "Marketing",
    status: "Concluído",
    progress: 100,
    tags: [
      "Landing Page",
      "Conversão",
      "iFood",
      "React 19",
      "Vite",
      "Framer Motion",
      "GitHub Pages"
    ],
    thumb: "/projects/donacica-hot-dog/thumb.jpg",
    description:
      "Landing page da Dona Ciça: presença digital própria para credibilidade e conversão direta para o iFood, com cardápio real e impacto visual forte no mobile.",
    bullets: [
      "Objetivo único: levar o visitante a pedir no iFood (sem checkout próprio).",
      "Hero com tipografia forte, partículas, gradiente e CTAs para iFood, cardápio e WhatsApp.",
      "Cardápio em abas com fotos, ingredientes e preços alinhados ao iFood.",
      "Sobre a marca com foto real, nota 5.0 e footer com links da marca.",
      "React 19 + Vite 8 + Tailwind + Framer Motion; deploy gratuito no GitHub Pages."
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/donacicasite/" }
    ],
    gallery: [
      { src: "/projects/donacica-hot-dog/thumb.jpg", alt: "Hero Dona Ciça" },
      { src: "/projects/donacica-hot-dog/screen1.jpg", alt: "Hero e CTAs" },
      { src: "/projects/donacica-hot-dog/screen2.jpg", alt: "Impacto visual e partículas" },
      { src: "/projects/donacica-hot-dog/screen3.jpg", alt: "Diferenciais e cardápio" },
      { src: "/projects/donacica-hot-dog/screen4.jpg", alt: "Sobre a marca" },
      { src: "/projects/donacica-hot-dog/screen5.jpg", alt: "Benefícios e marquee" },
      { src: "/projects/donacica-hot-dog/screen6.jpg", alt: "CTA final e rodapé" }
    ]
  },
  {
    slug: "new-talent",
    title: "New Talent, Site institucional",
    year: 2026,
    area: "Marketing",
    status: "Concluído",
    progress: 100,
    tags: [
      "Landing Page",
      "HTML/CSS/JS",
      "GitHub Pages",
      "WhatsApp",
      "DJ",
      "Mobile first"
    ],
    thumb: "/projects/new-talent/thumb.jpg",
    description:
      "Landing institucional da New Talent: escola de DJ, produção e locação, visual de palco, uma página, abas de produtos, três unidades e conversão para WhatsApp.",
    bullets: [
      "Hero com animação, partículas (canvas) e estética eletrônica / estúdio.",
      "Cursos, produtos em abas (DJ, produção musical, locação) e histórico por unidade (Maringá, Londrina, BC).",
      "Menu fixo, mobile, scroll suave, microanimações e contador no hero.",
      "Vários CTAs + WhatsApp flutuante + Instagram; SEO e Open Graph.",
      "Stack: HTML semântico, CSS com variáveis, JS vanilla (main.js); deploy estático no GitHub Pages."
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/sitenewtalent/" }
    ],
    gallery: [
      { src: "/projects/new-talent/thumb.jpg", alt: "Hero New Talent" },
      { src: "/projects/new-talent/screen1.jpg", alt: "Hero e identidade" },
      { src: "/projects/new-talent/screen2.jpg", alt: "Cursos e narrativa" },
      { src: "/projects/new-talent/screen3.jpg", alt: "Produtos em abas" },
      { src: "/projects/new-talent/screen4.jpg", alt: "Unidades e história" },
      { src: "/projects/new-talent/screen5.jpg", alt: "CTA e rodapé" }
    ]
  },
  {
    slug: "previsao-demanda-python-estatistica",
    title: "Previsao de Demanda (Python + Estatistica)",
    year: 2026,
    area: "Operacoes",
    status: "Concluído",
    progress: 100,
    tags: ["Previsao", "Python", "Estatistica", "Jobs", "Analytics"],
    thumb: "/projects/previsao-demanda-python-estatistica/thumb.jpg",
    description:
      "Plataforma com duas frentes: execucao do pipeline Python e leitura executiva da previsao estatistica consolidada.",
    bullets: [
      "Upload e execucao assincrona com historico e log por job.",
      "Status de ciclo de vida com trilha auditavel de ponta a ponta.",
      "Leitura analitica paginada por modulos executivos.",
      "Debounce, filtros e drill-down com retorno intuitivo."
    ],
    gallery: [
      { src: "/projects/previsao-demanda-python-estatistica/thumb.jpg", alt: "Visao geral do pipeline" },
      { src: "/projects/previsao-demanda-python-estatistica/screen1.jpg", alt: "Historico de jobs" },
      { src: "/projects/previsao-demanda-python-estatistica/screen2.jpg", alt: "Analise estatistica" },
      { src: "/projects/previsao-demanda-python-estatistica/screen3.jpg", alt: "Drill-down e contexto" }
    ]
  },
  {
    slug: "gestao-producao-industrial-mes",
    title: "Gestão de Produção Industrial",
    year: 2026,
    area: "Operações",
    status: "Concluído",
    progress: 100,
    tags: ["MES", "Produção", "SSE", "Workflow", "Alertas", "Têxtil"],
    thumb: "/projects/gestao-producao-industrial-mes/thumb.jpg",
    description:
      "Centro de comando da fábrica têxtil: OPs do desenho ao embarque, com painéis, alertas de risco, workflow e simulação previsível, Next.js ou modo remoto com Express, PostgreSQL e SSE.",
    bullets: [
      "Visão do fluxo completo: desenho, corte, estamparia, qualidade, expedição, faturamento, embarque.",
      "Painéis com filtros; alertas SLA/documento/doca; ações e correções de exceção.",
      "Simulação determinística; OPs nascem no início e avançam em cadência.",
      "Stack: Next.js/React + TS, Node/Express + PostgreSQL, SSE e polling de fallback; testes no domínio."
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/gestao-producao-industrial/" }
    ],
    gallery: [
      { src: "/projects/gestao-producao-industrial-mes/thumb.jpg", alt: "Capa MES produção" },
      { src: "/projects/gestao-producao-industrial-mes/screen1.jpg", alt: "Pipeline de 7 etapas" },
      { src: "/projects/gestao-producao-industrial-mes/screen2.jpg", alt: "Drill-down da expedição" },
      { src: "/projects/gestao-producao-industrial-mes/screen3.jpg", alt: "Cards de embarque" },
      { src: "/projects/gestao-producao-industrial-mes/screen4.jpg", alt: "Apontamento e qualidade" },
      { src: "/projects/gestao-producao-industrial-mes/screen5.jpg", alt: "Painel operacional" },
      { src: "/projects/gestao-producao-industrial-mes/screen6.jpg", alt: "Alertas e riscos" },
      { src: "/projects/gestao-producao-industrial-mes/screen7.jpg", alt: "Workflow e ações" },
      { src: "/projects/gestao-producao-industrial-mes/screen8.jpg", alt: "Visão executiva" },
      { src: "/projects/gestao-producao-industrial-mes/screen9.jpg", alt: "Detalhe da ordem" }
    ]
  },
  {
    slug: "press-kit-levorato-dj",
    title: "Press Kit Digital, LEVORATO DJ",
    year: 2025,
    area: "Marketing",
    status: "Concluído",
    progress: 100,
    tags: [
      "Press Kit",
      "HTML/CSS/JS",
      "GitHub Pages",
      "DJ",
      "Booking",
      "Música"
    ],
    thumb: "/projects/press-kit-levorato-dj/thumb.jpg",
    description:
      "Press kit digital completo para o DJ Pedro Levorato, hero neon, timeline de trajetória, sets embeds, galeria com download e CTAs de booking em uma única URL pública.",
    bullets: [
      "Hero com partículas animadas (180 instâncias JS) e efeitos neon de identidade forte.",
      "Linha do tempo interativa com 3 capítulos: 2011, 2022 e 2025.",
      "Carrossel infinito de venues + seção de músicas com abas SoundCloud / Spotify.",
      "Galeria em alta qualidade com download individual e pacote .zip.",
      "Booking direto via WhatsApp, Instagram e e-mail; 5 breakpoints responsivos.",
      "Stack: HTML5, CSS3 com @keyframes, JS vanilla, Intersection Observer; deploy no GitHub Pages."
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/presskitlevoratodj" }
    ],
    gallery: [
      { src: "/projects/press-kit-levorato-dj/thumb.jpg", alt: "Hero LEVORATO DJ" },
      { src: "/projects/press-kit-levorato-dj/screen1.jpg", alt: "Hero e identidade neon" },
      { src: "/projects/press-kit-levorato-dj/screen2.jpg", alt: "Timeline de trajetória" },
      { src: "/projects/press-kit-levorato-dj/screen3.jpg", alt: "Carrossel de venues" },
      { src: "/projects/press-kit-levorato-dj/screen4.jpg", alt: "Seção de músicas e abas" },
      { src: "/projects/press-kit-levorato-dj/screen5.jpg", alt: "Galeria e download" },
      { src: "/projects/press-kit-levorato-dj/screen6.jpg", alt: "Booking e contato" },
      { src: "/projects/press-kit-levorato-dj/screen7.jpg", alt: "Mobile e responsividade" },
      { src: "/projects/press-kit-levorato-dj/screen8.jpg", alt: "Seção Sobre" },
      { src: "/projects/press-kit-levorato-dj/screen9.jpg", alt: "Detalhes visuais" }
    ]
  },
  {
    slug: "claymoon-press-kit",
    title: "ClayMoon.music, Press kit digital",
    year: 2026,
    area: "Marketing",
    status: "Concluído",
    progress: 100,
    tags: [
      "Press Kit",
      "Marketing",
      "Site estático",
      "GitHub Pages",
      "Música",
      "i18n",
      "Mobile first"
    ],
    thumb: "/projects/claymoon-press-kit/hero.png",
    description:
      "Press kit digital para ClayMoon.music: URL única com narrativa, mídia leve, sets, downloads e booking — Tech House / Minimal Deep Tech, referência europeia e seis idiomas.",
    bullets: [
      "Objetivo: um link só para bookers e promotores — bio, história, som, fotos e contacto.",
      "Hero com partículas, timeline em capítulos, Sobre e secção Mídia (carrossel no mobile).",
      "Presença em palco, galeria com downloads, sets e SoundCloud integrados no layout.",
      "Booking por WhatsApp, Instagram e e-mail; i18n com chaves centralizadas em JS.",
      "Stack estática no GitHub Pages; vídeo e imagens pensados para peso e compatibilidade."
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/claymoon/" }
    ],
    gallery: [
      { src: "/projects/claymoon-press-kit/hero.png", alt: "Hero ClayMoon.music" },
      { src: "/projects/claymoon-press-kit/cm-2.jpg", alt: "História em capítulos" },
      { src: "/projects/claymoon-press-kit/cm-3.jpg", alt: "Sobre e proposta" },
      { src: "/projects/claymoon-press-kit/cm-4.jpg", alt: "Mídia e palco" },
      { src: "/projects/claymoon-press-kit/cm-5.jpg", alt: "Sets e SoundCloud" },
      { src: "/projects/claymoon-press-kit/cm-6.jpg", alt: "Booking e contacto" },
      { src: "/projects/claymoon-press-kit/cm-7.jpg", alt: "Rodapé e créditos" }
    ]
  },
  {
    slug: "quint-press-kit",
    title: "Quint (DJ & producer), Press kit digital",
    year: 2026,
    area: "Marketing",
    status: "Concluído",
    progress: 100,
    tags: [
      "Press Kit",
      "Marketing",
      "Site estático",
      "GitHub Pages",
      "Música",
      "i18n",
      "Techno"
    ],
    thumb: "/projects/quint-press-kit/thumb.jpg",
    description:
      "Press kit digital para Quint: um link com identidade escura e roxa, timeline, palcos, Park Art, drops com modal, autorais no Spotify, suporte de pista, abas de música, downloads .zip e booking — techno / underground, seis idiomas.",
    bullets: [
      "Objetivo: vender o artista antes da primeira conversa — narrativa, mídia e contato num fluxo só.",
      "Hero com foto, glow e logo; timeline, lugares, YouTube (Park Art, aftermovie), drops e modais.",
      "Autorais e suporte de pista com embeds; abas SoundCloud / YouTube; imprensa com .zip.",
      "Booking por e-mail institucional, WhatsApp e redes; OG, favicon e mobile refinado.",
      "Stack: HTML/CSS/JS vanilla, i18n no cliente, lazy load de vídeo; deploy no GitHub Pages."
    ],
    accessLinks: [
      { label: "Acesso público", url: "https://levoratoo.github.io/Quint/" }
    ],
    gallery: [
      { src: "/projects/quint-press-kit/screen1.jpg", alt: "Hero e identidade" },
      { src: "/projects/quint-press-kit/screen2.jpg", alt: "Timeline A história" },
      { src: "/projects/quint-press-kit/screen3.jpg", alt: "Prova de palco" },
      { src: "/projects/quint-press-kit/screen4.jpg", alt: "Park Art e vídeo" },
      { src: "/projects/quint-press-kit/screen5.jpg", alt: "Drops" },
      { src: "/projects/quint-press-kit/screen6.jpg", alt: "Autorais" },
      { src: "/projects/quint-press-kit/screen7.jpg", alt: "Suporte de pista" },
      { src: "/projects/quint-press-kit/screen8.jpg", alt: "Músicas em abas" },
      { src: "/projects/quint-press-kit/screen9.jpg", alt: "Imprensa e downloads" },
      { src: "/projects/quint-press-kit/screen10.jpg", alt: "Booking e redes" }
    ]
  }];

const featuredPreviewSlug = "landing-page-printbag";
const featuredPreviewIndex = previewProjects.findIndex(
  (project) => project.slug === featuredPreviewSlug
);

if (featuredPreviewIndex > 0) {
  const [featuredPreviewProject] = previewProjects.splice(featuredPreviewIndex, 1);
  if (featuredPreviewProject) {
    previewProjects.unshift(featuredPreviewProject);
  }
}

function normalizeProjectAssets(collection: Project[]) {
  collection.forEach((project) => {
    project.gallery?.forEach((item) => {
      if (item.thumbSrc) item.thumbSrc = withBasePath(item.thumbSrc);
      if (item.fullSrc) item.fullSrc = withBasePath(item.fullSrc);
    });
  });
}

function normalizeProjectsLiteAssets(collection: ProjectLite[]) {
  collection.forEach((project) => {
    project.images = project.images.map((image) => ({
      ...image,
      src: withBasePath(image.src)
    }));
  });
}

function normalizePreviewAssets(collection: PreviewProject[]) {
  collection.forEach((project) => {
    project.thumb = withBasePath(project.thumb);
    project.gallery = project.gallery?.map((image) => ({
      ...image,
      src: withBasePath(image.src)
    }));
  });
}

normalizeProjectAssets(projects);
normalizeProjectsLiteAssets(projectsLite);
normalizePreviewAssets(previewProjects);
export const homeProjectSlugs = [
  "press-kit-levorato-dj",
  "claymoon-press-kit",
  "quint-press-kit",
  "landing-page-printbag",
  "site-institucional-printbag",
  "donacica-hot-dog",
  "new-talent",
  "dashboard-separacao-estoque",
  "planejamento-orcamentario-coordenador",
  "sistema-orcamentario-produtos-graficos",
  "monitoramento-pedidos-tempo-real",
  "apresentador-projetos",
  "sistema-chamados-portfolio-vivo",
  "previsao-demanda-python-estatistica",
  "gestao-producao-industrial-mes"
];

export const homeProjects = homeProjectSlugs
  .map((slug) => previewProjects.find((project) => project.slug === slug))
  .filter((project): project is PreviewProject => Boolean(project));
