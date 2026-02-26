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
      a: "rgba(140, 255, 180, 0.4)",
      b: "rgba(80, 220, 255, 0.3)",
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
        label: "LAN",
        url: "http://192.168.1.104:3002/dashboard",
        visibility: "internal"
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
      a: "rgba(120, 210, 255, 0.35)",
      b: "rgba(120, 255, 200, 0.28)",
      c: "rgba(255, 255, 255, 0.12)"
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
        label: "Acesso interno - LAN",
        url: "http://192.168.1.104:3004/login",
        visibility: "internal"
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
      a: "rgba(120, 210, 255, 0.3)",
      b: "rgba(120, 255, 200, 0.25)",
      c: "rgba(255, 255, 255, 0.12)"
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
        label: "Acesso interno - LAN",
        url: "http://192.168.1.104:3001/",
        visibility: "internal"
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
      a: "rgba(140, 255, 180, 0.4)",
      b: "rgba(80, 220, 255, 0.3)",
      c: "rgba(255, 255, 255, 0.16)"
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
        label: "Acesso interno - LAN",
        url: "http://192.168.1.104:3007/",
        visibility: "internal"
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
        url: "https://printbag.com.br",
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
      a: "rgba(90, 255, 170, 0.38)",
      b: "rgba(90, 150, 255, 0.22)",
      c: "rgba(255, 255, 255, 0.12)"
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
  }
,
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
      a: "rgba(120, 255, 200, 0.32)",
      b: "rgba(100, 170, 255, 0.28)",
      c: "rgba(255, 255, 255, 0.14)"
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
      { label: "LAN", url: "http://192.168.1.104:3002/dashboard" }
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
      { label: "Acesso interno - LAN", url: "http://192.168.1.104:3004/login" }
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
    accessLinks: [],
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
      { label: "Acesso interno - LAN", url: "http://192.168.1.104:3007/" }
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
    accessLinks: [{ label: "Acesso público", url: "https://printbag.com.br" }],
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
    slug: "mock-projeto-01",
    title: "Monitor de SLA Operacional",
    oneLiner: "Painel para acompanhar SLAs por etapa e gargalos críticos.",
    problem: "Falta de visibilidade sobre atrasos e impacto no fluxo.",
    solution: "Dashboard com alertas e visão por etapa operacional.",
    features: ["Alertas por etapa", "Visão por responsável", "Histórico por período"],
    benefits: ["Menos atrasos", "Priorização clara", "Decisões rápidas"],
    techStack: ["Next.js", "TypeScript", "BI"],
    accessLinks: [],
    images: [
      { src: "/projects/_placeholders/cover.svg", alt: "Capa do projeto" },
      { src: "/projects/_placeholders/screen1.svg", alt: "Tela 1" }
    ]
  },
  {
    slug: "mock-projeto-02",
    title: "Mapa de Estoque Crítico",
    oneLiner: "Mapa visual com status e risco de ruptura.",
    problem: "Baixa rastreabilidade de itens críticos.",
    solution: "Painel de localização com filtros e alertas automáticos.",
    features: ["Mapa de calor", "Alertas automáticos", "Ranking de risco"],
    benefits: ["Redução de rupturas", "Visão priorizada", "Ação preventiva"],
    techStack: ["Next.js", "TypeScript", "APIs"],
    accessLinks: [],
    images: [
      { src: "/projects/_placeholders/cover.svg", alt: "Capa do projeto" },
      { src: "/projects/_placeholders/screen2.svg", alt: "Tela 2" }
    ]
  },
  {
    slug: "mock-projeto-03",
    title: "Planner de Produção",
    oneLiner: "Visão de backlog e capacidade por turno.",
    problem: "Planejamento manual e sem previsibilidade de carga.",
    solution: "Planner com cenários e comparativos de capacidade.",
    features: ["Cenários", "Carga por turno", "Indicadores de capacidade"],
    benefits: ["Planejamento mais confiável", "Menos gargalos", "Alinhamento entre áreas"],
    techStack: ["Next.js", "TypeScript", "SQL Server"],
    accessLinks: [],
    images: [
      { src: "/projects/_placeholders/cover.svg", alt: "Capa do projeto" },
      { src: "/projects/_placeholders/screen3.svg", alt: "Tela 3" }
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
      { label: "LAN", url: "http://192.168.1.104:3002/dashboard" }
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
      { label: "Acesso interno - LAN", url: "http://192.168.1.104:3004/login" }
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
      { label: "Acesso interno - LAN", url: "http://192.168.1.104:3001/" }
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
      { label: "Acesso interno - LAN", url: "http://192.168.1.104:3007/" }
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
    gallery: [
      { src: "/projects/apresentador-projetos/thumb.jpg", alt: "Visao geral do hub" },
      { src: "/projects/apresentador-projetos/screen1.jpg", alt: "Overlay de projetos" },
      { src: "/projects/apresentador-projetos/screen2.jpg", alt: "Cards de destaque" },
      { src: "/projects/apresentador-projetos/screen3.jpg", alt: "Detalhes do layout" },
      { src: "/projects/apresentador-projetos/screen4.jpg", alt: "Grid de projetos" }
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
    accessLinks: [{ label: "Acesso público", url: "https://printbag.com.br" }],
    gallery: [
      { src: "/projects/landing-page-printbag/thumb.png", alt: "Capa principal da landing" },
      { src: "/projects/landing-page-printbag/screen1.png", alt: "Hero e CTA" },
      { src: "/projects/landing-page-printbag/screen2.png", alt: "Diferenciais da Printbag" },
      { src: "/projects/landing-page-printbag/screen3.png", alt: "Produtos em destaque" },
      { src: "/projects/landing-page-printbag/screen4.png", alt: "Prova social e parceiros" },
      { src: "/projects/landing-page-printbag/screen5.png", alt: "Contato e formulário" }
    ]
  }
,
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
  }];

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
  "dashboard-separacao-estoque",
  "planejamento-orcamentario-coordenador",
  "sistema-orcamentario-produtos-graficos",
  "monitoramento-pedidos-tempo-real",
  "apresentador-projetos",
  "previsao-demanda-python-estatistica",
  "landing-page-printbag"
];

export const homeProjects = homeProjectSlugs
  .map((slug) => previewProjects.find((project) => project.slug === slug))
  .filter((project): project is PreviewProject => Boolean(project));
