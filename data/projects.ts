import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "printbag-launch-2025",
    title: "Printbag Launch 2025",
    excerpt: "Reposicionamento completo com foco em performance e conversão.",
    description:
      "Projeto de reposicionamento da marca Printbag com nova identidade, arquitetura de informação e experiência de compra mais fluida.",
    year: 2025,
    segment: "Embalagens",
    tags: ["Branding", "E-commerce", "Performance"],
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    kpis: [
      { label: "Leads", value: "+38%" },
      { label: "Conversão", value: "+22%" },
      { label: "Tempo de carregamento", value: "-41%" }
    ],
    cover: { hue: 140, title: "Launch" },
    challenge:
      "Criar uma experiência premium que transmitisse confiança e simplificasse o catálogo de soluções da Printbag.",
    solution:
      "Redesenho completo com navegação orientada a objetivos, grid modular e foco em prova social e diferenciais técnicos.",
    results: [
      "Aumento de 38% em leads orgânicos",
      "Redução de 41% no tempo de carregamento",
      "Crescimento de 22% na taxa de conversão"
    ],
    gallery: [
      { hue: 120, label: "Homepage" },
      { hue: 155, label: "Catálogo" },
      { hue: 180, label: "Checkout" }
    ]
  },
  {
    slug: "case-luxo-bags",
    title: "Luxo Bags Experience",
    excerpt: "Vitrine digital para linha premium com storytelling visual.",
    description:
      "Experiência imersiva para apresentar a nova linha de embalagens premium com foco em detalhes e diferenciais de produção.",
    year: 2024,
    segment: "Varejo",
    tags: ["Storytelling", "Experiência", "Catálogo"],
    stack: ["Next.js", "TailwindCSS", "Motion"],
    kpis: [
      { label: "Tempo médio", value: "+1m20s" },
      { label: "Engajamento", value: "+45%" },
      { label: "Downloads", value: "+60%" }
    ],
    cover: { hue: 200, title: "Luxo" },
    challenge:
      "Expor diferenciais técnicos sem perder a sensação de sofisticação esperada pelo público de luxo.",
    solution:
      "Interface cinematográfica com seções de destaque, microanimações suaves e copy enxuta.",
    results: [
      "Aumento de 60% em downloads do catálogo",
      "Tempo médio de sessão acima de 1 minuto",
      "Engajamento 45% maior nas páginas-chave"
    ],
    gallery: [
      { hue: 210, label: "Hero" },
      { hue: 240, label: "Detalhes" },
      { hue: 260, label: "Ficha técnica" }
    ]
  },
  {
    slug: "smart-retail-pack",
    title: "Smart Retail Pack",
    excerpt: "Portal B2B com catálogo inteligente e filtros avançados.",
    description:
      "Desenvolvimento de um portal B2B para distribuidores com filtros por segmento, material e objetivos de campanha.",
    year: 2023,
    segment: "B2B",
    tags: ["B2B", "Catálogo", "UX"],
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    kpis: [
      { label: "Pedidos assistidos", value: "+31%" },
      { label: "Ciclos", value: "-18%" },
      { label: "Aprovação", value: "+25%" }
    ],
    cover: { hue: 95, title: "B2B" },
    challenge:
      "Facilitar a busca por soluções para diferentes segmentos sem sobrecarregar a equipe comercial.",
    solution:
      "Catálogo com filtros combinados, busca inteligente e área de favoritos para pedidos recorrentes.",
    results: [
      "Redução de 18% no ciclo de compra",
      "31% mais pedidos assistidos",
      "Aprovação interna mais rápida"
    ],
    gallery: [
      { hue: 90, label: "Filtro" },
      { hue: 110, label: "Resultado" },
      { hue: 130, label: "Resumo" }
    ]
  },
  {
    slug: "eco-campaign-collection",
    title: "Eco Campaign Collection",
    excerpt: "Campanha sustentável com página de impacto e prova social.",
    description:
      "Landing page para campanha de embalagens sustentáveis com foco em impacto ambiental e credenciais técnicas.",
    year: 2025,
    segment: "Sustentabilidade",
    tags: ["Landing", "Sustentável", "Performance"],
    stack: ["Next.js", "TailwindCSS", "Framer Motion"],
    kpis: [
      { label: "CPL", value: "-27%" },
      { label: "CTR", value: "+19%" },
      { label: "Leads", value: "+52%" }
    ],
    cover: { hue: 160, title: "Eco" },
    challenge:
      "Comunicar benefícios técnicos e impacto ambiental sem perder clareza comercial.",
    solution:
      "Narrativa visual clara, módulos de prova social e comparativos de impacto.",
    results: [
      "Leads 52% acima do esperado",
      "CPL 27% menor",
      "CTR 19% superior"
    ],
    gallery: [
      { hue: 150, label: "Impacto" },
      { hue: 170, label: "Certificações" },
      { hue: 190, label: "CTA" }
    ]
  },
  {
    slug: "event-pack-pro",
    title: "Event Pack Pro",
    excerpt: "Vitrine de cases para eventos com showcase modular.",
    description:
      "Coleção de cases para o segmento de eventos corporativos com foco em rapidez de escolha e personalização.",
    year: 2022,
    segment: "Eventos",
    tags: ["Cases", "B2B", "Personalização"],
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    kpis: [
      { label: "Consultas", value: "+28%" },
      { label: "Retenção", value: "+33%" },
      { label: "Tempo", value: "-22%" }
    ],
    cover: { hue: 30, title: "Event" },
    challenge:
      "Mostrar opções personalizáveis sem confundir o usuário com excesso de variações.",
    solution:
      "Cards modulares e configurador rápido com destaques de uso real.",
    results: [
      "Retenção 33% maior",
      "Consultas comerciais 28% acima",
      "Tempo de decisão 22% menor"
    ],
    gallery: [
      { hue: 25, label: "Cases" },
      { hue: 45, label: "Config" },
      { hue: 60, label: "Entrega" }
    ]
  },
  {
    slug: "printbag-signature",
    title: "Printbag Signature",
    excerpt: "Hub institucional com foco em autoridade e confiança.",
    description:
      "Novo hub institucional destacando portfólio, certificações e diferenciais de produção.",
    year: 2024,
    segment: "Institucional",
    tags: ["Institucional", "Marca", "SEO"],
    stack: ["Next.js", "TypeScript", "TailwindCSS", "SEO"],
    kpis: [
      { label: "Tráfego orgânico", value: "+40%" },
      { label: "Autoridade", value: "+18%" },
      { label: "Leads", value: "+21%" }
    ],
    cover: { hue: 300, title: "Signature" },
    challenge:
      "Consolidar informações técnicas e institucionais em uma experiência objetiva.",
    solution:
      "Estrutura editorial clara, otimização SEO e componentes de credibilidade.",
    results: [
      "40% de aumento em tráfego orgânico",
      "Autoridade percebida 18% maior",
      "Leads qualificados 21% acima"
    ],
    gallery: [
      { hue: 290, label: "Institucional" },
      { hue: 310, label: "Certificados" },
      { hue: 330, label: "Contato" }
    ]
  }
];

export const segments = ["Embalagens", "Varejo", "B2B", "Sustentabilidade", "Eventos", "Institucional"];
