import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { homeProjectSlugs, projects } from "@/data/projects";
import { Container } from "@/components/Container";
import { ProjectCaseHeader } from "@/components/case/ProjectCaseHeader";
import { ProjectPreviewCard } from "@/components/case/ProjectPreviewCard";
import { TourNavPills } from "@/components/case/TourNavPills";
import { CaseSection } from "@/components/case/CaseSection";
import { CinemaGallery } from "@/components/case/CinemaGallery";
import { RequestCTA } from "@/components/case/RequestCTA";

type PageProps = {
  params: { slug: string };
};

function buildCover(cover: { a: string; b: string; c?: string }) {
  const glow = cover.c
    ? `, radial-gradient(circle at 50% 0%, ${cover.c}, transparent 60%)`
    : "";

  return `radial-gradient(circle at 20% 20%, ${cover.a}, transparent 60%), radial-gradient(circle at 80% 40%, ${cover.b}, transparent 55%)${glow}, linear-gradient(180deg, rgba(8,9,12,0.9), rgba(8,9,12,0.4))`;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) {
    return { title: "Projeto não encontrado | Printbag" };
  }

  return {
    title: `${project.title} | Printbag`,
    description: project.summary
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: PageProps) {
  const projectIndex = projects.findIndex((item) => item.slug === params.slug);
  const project = projects[projectIndex];
  if (!project) {
    notFound();
  }
  const homeIndex = homeProjectSlugs.indexOf(project.slug);
  const prevHomeSlug = homeIndex > 0 ? homeProjectSlugs[homeIndex - 1] : null;
  const nextHomeSlug =
    homeIndex >= 0 && homeIndex < homeProjectSlugs.length - 1
      ? homeProjectSlugs[homeIndex + 1]
      : null;
  const accessUrl = project.accessLinks?.[0]?.url ?? null;
  const sections = [
    { id: "visao-geral", label: "Visão geral" },
    { id: "ruido", label: "Ruído" },
    { id: "entregas", label: "Entregas" },
    { id: "impacto", label: "Impacto" },
    ...(project.slug === "planejamento-orcamentario-coordenador" ||
    project.slug === "dashboard-separacao-estoque" ||
    project.slug === "monitoramento-pedidos-tempo-real" ||
    project.slug === "landing-page-printbag" ||
    project.slug === "sistema-orcamentario-produtos-graficos" ||
    project.slug === "apresentador-projetos"
      ? [{ id: "visao-tecnica", label: "Visão técnica" }]
      : []),
    { id: "galeria", label: "Galeria" }
  ];

  const galleryItems = project.gallery?.map((item, idx) => ({
    id: `${project.slug}-${idx}`,
    title: item.title,
    desc: item.description,
    thumbSrc: item.thumbSrc || item.fullSrc || "",
    fullSrc: item.fullSrc || item.thumbSrc
  }));

  const previewSrc = galleryItems?.[0]?.thumbSrc;

  return (
    <main className="relative pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(20,34,28,0.55),_transparent_60%),radial-gradient(circle_at_20%_80%,_rgba(18,28,24,0.45),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27 opacity=%270.5%27/%3E%3C/svg%3E')]" />

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div
          className="absolute inset-0 opacity-80"
          style={{ background: buildCover(project.cover) }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(86,255,146,0.12),_rgba(11,15,14,0.92))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <Container>
          <div className="relative rounded-[36px] border border-white/5 bg-black/30 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
              <div>
                <Link
                  href="/#home-hero"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-100 shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-black/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                >
                  Voltar para o início
                </Link>
                <div className="mt-6">
                  <ProjectCaseHeader project={project} />
                </div>
              </div>
              <ProjectPreviewCard
                slug={project.slug}
                accessUrl={accessUrl}
                previewSrc={previewSrc}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-10">
        <Container>
          <TourNavPills items={sections} />
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:gap-12">
            <CaseSection id="visao-geral">
              <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="rounded-3xl border border-white/5 bg-black/30 p-7 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                    Visão geral
                  </p>
                  <h2 className="mt-3 text-[clamp(20px,2.6vw,30px)] font-semibold text-white">
                    <span className="shineText shineTextProject">{project.title}</span>
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                    {project.description}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/5 bg-black/30 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                    Insight chave
                  </p>
                  <p className="mt-4 text-base font-semibold text-white">
                    Atualização automática para decisões rápidas
                  </p>
                  <p className="mt-2 text-sm text-neutral-300">
                    Dados consolidados em tempo real para reduzir retrabalho e acelerar prioridades.
                  </p>
                </div>
              </div>
            </CaseSection>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <CaseSection id="ruido">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <section className="group relative rounded-3xl border border-white/5 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/30 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-glow/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                    Ruído
                  </p>
                  <h2 className="mt-2 text-[clamp(20px,2.4vw,28px)] font-semibold text-white">
                    Onde estava o ruído
                  </h2>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-neutral-400">
                    Diagnóstico rápido
                  </p>
                  <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                    {project.context}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm text-neutral-300 sm:text-[15px]">
                    {project.problem.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pointer-events-none absolute inset-y-6 right-0 hidden w-px bg-white/5 lg:block" />
                </section>

                <section
                  id="entregas"
                  className="group rounded-3xl border border-white/5 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/30 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-glow/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                    Entregas
                  </p>
                  <h2 className="mt-2 text-[clamp(20px,2.4vw,28px)] font-semibold text-white">
                    O que foi entregue
                  </h2>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-neutral-400">
                    Execução e entregas
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-300 sm:text-[15px]">
                    {project.solution.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                      Stack / integrações
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(project.stack.length > 0
                        ? project.stack
                        : ["SQL Server", "Fastify", "Node", "EJS"]
                      ).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/5 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-neutral-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </CaseSection>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <CaseSection id="impacto">
              <section className="relative rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(40,80,60,0.35),_rgba(12,14,13,0.9))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="pointer-events-none absolute -top-10 left-8 h-24 w-24 rounded-full bg-glow/20 blur-3xl" />
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-glow/70">
                      Impacto
                    </p>
                    <h2 className="mt-3 text-[clamp(22px,3vw,34px)] font-semibold text-white">
                      Impacto direto na operação
                    </h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(project.kpis.length > 0
                    ? project.kpis.slice(0, 3)
                    : [
                        {
                          label: "Status",
                          value: "Total / Parcial / Sem saldo",
                          note: "Visibilidade imediata"
                        },
                        {
                          label: "Estoque",
                          value: "Por localização",
                          note: "Rastreio por lote"
                        },
                        {
                          label: "Detalhe",
                          value: "Itens por pedido",
                          note: "Consulta rápida"
                        }
                      ]
                  ).map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition duration-200 hover:-translate-y-1 hover:border-glow/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                    >
                      <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-400">
                        {kpi.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {kpi.value}
                      </p>
                      {"note" in kpi ? (
                        <p className="mt-2 text-xs text-neutral-400">
                          {kpi.note}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
                <ul className="mt-6 grid gap-3 text-sm text-neutral-300 sm:grid-cols-2">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </CaseSection>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {project.slug === "planejamento-orcamentario-coordenador" ? (
              <CaseSection id="visao-tecnica">
                <section className="rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-glow/70">
                    Visão técnica do projeto
                  </p>
                  <h2 className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold text-white">
                    Arquitetura em camadas e governança de dados
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                    <p>
                      Do ponto de vista técnico, o projeto foi concebido como uma
                      aplicação web corporativa de planejamento orçamentário,
                      com arquitetura em camadas bem definida e separação clara
                      entre frontend, API backend e banco de dados relacional. A API
                      foi construída em NestJS (Node.js + TypeScript), organizada em
                      módulos de domínio (autenticação, usuários, centros de custo,
                      contas, cenários, lançamentos, DRE etc.), o que facilita
                      manutenção, testes e evolução. A modelagem de dados é feita
                      com Prisma, que centraliza o schema do banco, gera as
                      migrations e o client tipado, garantindo consistência entre
                      código e banco de dados PostgreSQL.
                    </p>
                    <p>
                      A segurança e o controle de acesso foram pensados desde o
                      início: o sistema implementa autenticação baseada em token e
                      autorização por papéis (admin, controller, coordenador),
                      além de registrar logs de auditoria para ações críticas
                      (criação, edição, importação e mudança de status). A camada
                      de domínio trata regras como ciclo de vida dos cenários
                      (rascunho, enviado, aprovado, bloqueado), consolidação de
                      linhas orçamentárias, comparação entre previsto e realizado,
                      limites por área e histórico de importações. Processos mais
                      pesados (como importação de arquivos e cálculos agregados)
                      foram desenhados para rodar de forma segura e rastreável,
                      evitando travar a experiência do usuário.
                    </p>
                    <p>
                      O frontend foi desenvolvido em Next.js 14 com TypeScript,
                      utilizando o App Router, componentes reutilizáveis e uma
                      biblioteca moderna de UI (Tailwind CSS + shadcn/ui) para
                      garantir uma interface rápida e consistente. A comunicação
                      com o backend é feita via API REST, através de uma camada de
                      serviços centralizada, que padroniza chamadas, tratamento de
                      erros e tipagem dos dados retornados. Toda a solução é
                      empacotada com Docker / Docker Compose, permitindo subir
                      facilmente todos os componentes (API + banco) em qualquer
                      ambiente, com o mesmo comportamento em desenvolvimento,
                      homologação e produção.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                      Principais tecnologias utilizadas
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-300 sm:text-[15px]">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Frontend: Next.js 14, React, TypeScript, Tailwind CSS,
                          shadcn/ui
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Backend: NestJS, TypeScript, Prisma</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Banco de dados: PostgreSQL</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Infraestrutura e suporte: Docker, Docker Compose, Swagger
                          (documentação da API), Jest (testes automatizados)
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
              </CaseSection>
            ) : null}

            {project.slug === "dashboard-separacao-estoque" ? (
              <CaseSection id="visao-tecnica">
                <section className="rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-glow/70">
                    Visão técnica do projeto
                  </p>
                  <h2 className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold text-white">
                    Arquitetura e Stack
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                    <p>
                      O projeto foi construído como um dashboard web moderno usando
                      Next.js 14 (App Router) com React 18 e TypeScript, consumindo
                      dados em tempo real de um SQL Server corporativo. A aplicação
                      é dividida em duas camadas principais: camada de API (rotas em
                      app/api/...), responsável por consultar o banco, aplicar regras
                      de negócio e expor os dados via APIs REST; e camada de
                      apresentação (páginas em app/dashboard), focada em experiência
                      do usuário, filtros, paginação e visualização gráfica.
                    </p>
                    <p>
                      O backend se conecta ao SQL Server através do driver mssql,
                      lendo uma view específica de pedidos. As consultas retornam um
                      dataset bruto que é normalizado em TypeScript (tipos fortes em
                      lib/types.ts). Toda a regra da antiga macro em VBA foi
                      encapsulada em funções puras, principalmente em lib/compute.ts,
                      que convertem e saneiam os dados vindos do banco, calculam
                      quantidade atendida, saldo restante e percentuais por item,
                      agregam por pedido para definir o status do GRID (Total,
                      Parcial, Sem Saldo) e geram estruturas prontas para consumo
                      pelo front.
                    </p>
                    <p>
                      Para evitar sobrecarga no banco, as APIs não consultam o SQL
                      Server a cada requisição do usuário. Um processo de atualização
                      periódica (controlado por UPDATE_INTERVAL_MINUTES) executa a
                      query e mantém o resultado em cache em memória. As rotas
                      /api/data e /api/estoque/localizacao leem esse cache e respondem
                      muito rápido ao front. Existe ainda um endpoint de refresh
                      manual protegido por token (/api/refresh), para forçar
                      atualização sob demanda. O README já prevê cenário serverless,
                      sugerindo mover o cache para Redis ou acionar refresh via cron
                      externo, caso seja necessário escalar horizontalmente.
                    </p>
                    <p>
                      O dashboard é um client component (use client) que consome as
                      APIs e organiza os dados em uma visão de pedidos (GRID) com
                      filtros combinados (status, data, busca textual), paginação e
                      expansão de linhas para exibir itens do pedido; e uma visão de
                      estoque por localização, com filtros por prefixo, descrição,
                      local de estoque e somente saldo maior que 0, além de paginação
                      e ordenação dinâmica. A UI usa Radix UI, Tailwind CSS e
                      componentes próprios (cards, badges, tabelas) para garantir
                      consistência visual. Os gráficos são feitos com Recharts,
                      exibindo distribuição de status, heatmap por data e
                      comparativos entre períodos. Hooks como useMemo e useCallback
                      são usados extensivamente para evitar recomputações
                      desnecessárias e manter o dashboard responsivo mesmo com
                      grandes volumes de dados.
                    </p>
                    <p>
                      O projeto foi pensado para ser observável e fácil de manter.
                      Tipagem forte em TypeScript (inclusive no payload das APIs)
                      reduz erros em tempo de execução. Testes automatizados com
                      Vitest validam as funções críticas de cálculo (lib/compute.ts).
                      O tratamento de erro das APIs retorna mensagens claras quando
                      há problemas de colunas na view ou falhas de conexão,
                      facilitando diagnóstico em produção.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                      Principais tecnologias utilizadas
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-300 sm:text-[15px]">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Frontend: Next.js 14, React, TypeScript, Tailwind CSS, Radix UI
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Backend: Next.js API Routes (App Router)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Banco de dados: SQL Server</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Infraestrutura e suporte: mssql, Recharts, Vitest</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </CaseSection>
            ) : null}

            {project.slug === "monitoramento-pedidos-tempo-real" ? (
              <CaseSection id="visao-tecnica">
                <section className="rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-glow/70">
                    Visão técnica do projeto
                  </p>
                  <h2 className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold text-white">
                    Arquitetura e decisões de projeto (visão técnica)
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                    <p>
                      Este projeto foi pensado como um monorepo (apps/api e apps/web)
                      para facilitar o versionamento conjunto de backend e frontend,
                      compartilhamento de configurações e automação de build/execução.
                      Na raiz, scripts orquestram os serviços com concurrently,
                      permitindo subir API e Web em ambiente de desenvolvimento com
                      um único comando.
                    </p>
                    <p>
                      <strong className="text-white">Backend (API Metrics Imports).</strong>{" "}
                      A API é construída em Node.js + TypeScript sobre Fastify,
                      priorizando baixa latência e baixa sobrecarga de CPU. O acesso
                      ao SQL Server é feito via biblioteca mssql, com pool de
                      conexões reutilizável, queries parametrizadas e camada de
                      serviços isolando regras de negócio das rotas HTTP. A API foi
                      desenhada para listagem paginada e filtrada (GET /imports) e
                      detalhe completo (GET /imports/:rowKey). A estratégia de rowKey
                      é estável: usa PK quando disponível ou hash SHA-256 no SQL
                      Server quando não há PK. Para tempo real, o endpoint SSE
                      (GET /stream/imports) envia periodicamente o top N de registros.
                      Configurações centralizadas em módulo de env e error handler
                      com AppError garantem respostas seguras e rastreáveis.
                    </p>
                    <p>
                      <strong className="text-white">Frontend (Painel Web).</strong>{" "}
                      SPA em React + TypeScript, empacotada com Vite. UI com Tailwind
                      CSS e componentes no estilo shadcn/ui. TanStack Query gerencia
                      cache e revalidação; TanStack Table abstrai paginação e
                      colunas. Hooks específicos (useImportsRealtime,
                      useImportsAggregateStats, useDebounce) encapsulam a lógica de
                      negócio. A camada lib concentra parsing de XML, normalização,
                      classificação de erros e termos de busca, mantendo o front
                      previsível e escalável.
                    </p>
                    <p>
                      <strong className="text-white">
                        Escalabilidade, manutenção e operação.
                      </strong>{" "}
                      API stateless com SSE escalável via sticky sessions/event stream
                      compartilhado. Limites de paginação e janelas de tempo evitam
                      consultas pesadas. Código organizado por domínio e camadas,
                      tipagem forte em TS e endpoints de health/metadata para
                      diagnóstico rápido. Logs estruturados no Fastify com requestId
                      facilitam correlação de falhas.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                      Principais tecnologias utilizadas
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-300 sm:text-[15px]">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Backend (API): Node.js + TypeScript, Fastify, SQL Server
                          (mssql), SSE, arquitetura em rotas/services/config/utils
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Frontend (Web): React + TypeScript, Vite, Tailwind CSS,
                          componentes estilo shadcn/ui, TanStack Query, TanStack
                          Table, Lucide React, Sonner
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Monorepo & ferramentas: pnpm / npm, concurrently, ESLint
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
              </CaseSection>
            ) : null}

            {project.slug === "landing-page-printbag" ? (
              <CaseSection id="visao-tecnica">
                <section className="rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-glow/70">
                    Visão técnica do projeto
                  </p>
                  <h2 className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold text-white">
                    Visão técnica do projeto da landing page
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                    <p>
                      A landing page da Printbag foi desenvolvida com foco em alta performance, facilidade de
                      manutenção e integração direta com o funil de vendas. Do ponto de vista técnico, a escolha
                      de Next.js 14 + React 18 + TypeScript + Tailwind CSS permitiu construir uma página estática
                      (SSG) muito rápida, com código tipado e um design responsivo consistente, ideal para campanhas
                      de aquisição de clientes.
                    </p>
                    <p>
                      <strong className="text-white">Arquitetura da aplicação.</strong> A estrutura foi organizada em
                      módulos bem definidos: camada de página (app/page.tsx) para orquestrar hero, diferenciais,
                      produtos, prova social e formulário; componentes de layout reaproveitáveis; componentes de seção
                      isolados para facilitar manutenção e testes A/B; camada de UI com elementos reutilizáveis em
                      Tailwind; e camada de utilitários para assets e integrações externas.
                    </p>
                    <p>
                      A página é gerada como site estático (Static Site Generation - SSG), o que reduz o tempo de
                      carregamento, melhora o SEO e simplifica o deploy em GitHub Pages com domínio personalizado.
                    </p>
                    <p>
                      <strong className="text-white">Fluxo do formulário, webhook e integrações.</strong> O ponto mais
                      crítico da landing é o formulário de contato, responsável por transformar visitantes em leads reais.
                      O fluxo foi desenhado com validação no front-end (campos obrigatórios, formato de e-mail, máscara
                      de telefone, estados de erro/sucesso e feedback visual) e envio duplo em paralelo:
                      EmailJS para notificação imediata por e-mail e webhook do n8n para automação (planilha, CRM,
                      follow-up e outros gatilhos).
                    </p>
                    <p>
                      O formulário foi pensado como um cliente de mensageria: na submissão, dispara EmailJS + n8n em
                      paralelo. Caso uma integração falhe por instabilidade de rede ou erro de API, há lógica de retry
                      com novas tentativas antes do erro definitivo, aumentando a confiabilidade da captura.
                    </p>
                    <p>
                      No webhook do n8n, os dados seguem JSON estruturado (nome, e-mail, telefone, empresa, mensagem,
                      origem da campanha etc.), facilitando mapeamento e automação. Também foram considerados CORS,
                      timeouts e erros 4xx/5xx para que o front reaja corretamente sem deixar o usuário sem resposta.
                    </p>
                    <p>
                      Com isso, o formulário vira peça central da arquitetura: não apenas envia e-mail, mas alimenta o
                      ecossistema de automação da empresa e conecta a landing a ferramentas internas.
                    </p>
                    <p>
                      <strong className="text-white">Gestão de ambientes e assets.</strong> Como o projeto pode rodar em
                      ambiente local, GitHub Pages com basePath (/LP2) ou domínio personalizado, foi criada função
                      utilitária para resolver dinamicamente os caminhos de assets. Isso evita imagens quebradas entre
                      desenvolvimento, homologação e produção. O build estático também possui scripts por cenário de deploy,
                      e as imagens usam otimização/lazy loading quando possível.
                    </p>
                    <p>
                      <strong className="text-white">Performance, monitoramento e métricas.</strong> A landing foi planejada
                      para ser rápida e mensurável: SSG com HTML pré-gerado, CSS enxuto pelo Tailwind, lazy loading de imagens
                      e integração com Google Tag Manager para eventos de conversão sem necessidade de alterar código a cada ajuste.
                    </p>
                    <p>
                      Assim, tecnicamente, o projeto combina base moderna (Next.js, React, TypeScript), abordagem orientada
                      à conversão e fluxo de webhook + EmailJS + automação n8n para garantir que cada lead gerado seja registrado,
                      monitorado e aproveitado pelo time comercial.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                      Principais tecnologias utilizadas
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-300 sm:text-[15px]">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Integrações / serviços: EmailJS, webhook n8n, Google Tag Manager</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Versionamento e deploy: Git, GitHub, GitHub Pages e SSG</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </CaseSection>
            ) : null}

            {project.slug === "apresentador-projetos" ? (
              <CaseSection id="visao-tecnica">
                <section className="rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-glow/70">
                    Visão técnica do projeto
                  </p>
                  <h2 className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold text-white">
                    Arquitetura do hub e experiência de navegação
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                    <p>
                      O Apresentador de Projetos foi construído como uma aplicação web
                      moderna usando Next.js 14 (App Router) e TypeScript, com foco em
                      performance, consistência visual e manutenção simples. Toda a
                      estrutura é data-driven: os cases são definidos em arrays
                      tipados (projects/previewProjects), permitindo adicionar novos
                      projetos sem alterar o layout base.
                    </p>
                    <p>
                      A interface foi desenhada com Tailwind CSS e componentes
                      reutilizáveis, garantindo coesão entre seções, cards e overlays.
                      As transições e micro-animações são conduzidas por Framer Motion,
                      dando fluidez às entradas de seção, aos modais de preview e às
                      camadas de destaque, sem comprometer a performance.
                    </p>
                    <p>
                      As mídias são organizadas em /public para carregamento leve, com
                      thumbnails e gradientes de contraste que preservam legibilidade.
                      O fluxo de navegação combina grid, overlay fullscreen e previews
                      rápidos para reduzir cliques e acelerar a leitura do contexto.
                    </p>
                    <p>
                      A arquitetura de navegação foi pensada para manter o foco do
                      usuário: o overlay fullscreen isola o conteúdo e controla o
                      scroll, evitando saltos de seção. Esse comportamento foi
                      ajustado para não conflitar com o snap do home, permitindo
                      rolagem interna sem mudar de bloco. O resultado é uma navegação
                      guiada, previsível e confortável para apresentação.
                    </p>
                    <p>
                      No nível de UI, os cards seguem um padrão de hierarquia visual:
                      miniatura, título, descrição, progresso e ações. Essa ordem
                      foi mantida para facilitar comparação entre projetos, enquanto
                      chips e tags sintetizam status e domínio. O uso de line-clamp,
                      espaçamentos consistentes e sombras suaves mantém o layout
                      legível mesmo com textos longos.
                    </p>
                    <p>
                      A performance foi tratada com cuidado: imagens com lazy loading,
                      assets locais para evitar dependências externas, e camadas de
                      blur e gradientes aplicadas via CSS para reduzir o custo de
                      renderização. O projeto também respeita preferências de
                      movimento reduzido, garantindo uma experiência acessível.
                    </p>
                    <p>
                      Em termos de extensibilidade, a base permite evoluir com
                      filtros por área, busca textual e agrupamentos por status.
                      A mesma estrutura pode suportar novos tipos de case sem
                      refatorar a UI principal, preservando a identidade visual e
                      a velocidade de entrega.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                      Principais tecnologias utilizadas
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-300 sm:text-[15px]">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Motion e UI: Framer Motion, componentes reutilizáveis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Conteúdo: dados tipados em TS + assets em /public</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </CaseSection>
            ) : null}

            {project.slug === "sistema-orcamentario-produtos-graficos" ? (
              <CaseSection id="visao-tecnica">
                <section className="rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-glow/70">
                    Visão técnica do projeto
                  </p>
                  <h2 className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold text-white">
                    Sessão técnica – visão de arquitetura e decisões de projeto
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                    <p>
                      O sistema orçamentário foi pensado como uma aplicação web
                      interna moderna, priorizando manutenibilidade, extensibilidade
                      e segurança dos dados. A arquitetura é baseada em Next.js 14
                      (App Router) com TypeScript, utilizando Server Components
                      onde faz sentido e rotas app/api para expor APIs REST internas.
                      Isso permite concentrar frontend e backend em um único projeto,
                      simplificando o deploy e o versionamento.
                    </p>
                    <p>
                      Do lado de dados, o projeto usa PostgreSQL como banco
                      relacional e Prisma como ORM, garantindo type-safety de ponta
                      a ponta (tipos do schema do banco geram tipos TypeScript
                      automaticamente). O modelo de dados foi derivado do catálogo
                      técnico da área de engenharia, com entidades de catálogo
                      (produto, modelo, formato, substrato, enobrecimentos, etc.),
                      tabelas de permissão (quais combinações são válidas) e tabelas
                      de solicitação (capa e itens técnicos). Essa separação permite
                      evoluir o catálogo sem quebrar o histórico de solicitações.
                    </p>
                    <p>
                      A camada de validação foi desenhada para ser compartilhada
                      entre frontend e backend, usando Zod. O schema
                      solicitacaoCompletaSchema é usado tanto no frontend, via
                      react-hook-form + zodResolver, para validação em tempo real no
                      wizard; quanto no backend, nas rotas de API, garantindo que
                      somente dados coerentes e completos sejam persistidos.
                    </p>
                    <p>
                      A experiência de usuário foi estruturada em um wizard
                      multi-etapas, inicialmente fixo, mas evoluído para um modelo
                      100% dinâmico e configurável via banco. Para isso, foram
                      criadas as tabelas FormularioEtapa e FormularioPergunta, além
                      de componentes genéricos como EtapaDinamica e CampoDinamico.
                      O frontend consome essas configurações via API, renderiza os
                      campos conforme o tipo (texto_curto, numero, lista_opcoes,
                      lista_produtos, etc.) e mapeia os valores para o schema de
                      solicitação usando o campo campoMapeado. Com isso, a área de
                      Engenharia consegue alterar o formulário sem necessidade de
                      alterar código.
                    </p>
                    <p>
                      Para integração com outros sistemas, o projeto utiliza um
                      mecanismo de webhook configurável via variável de ambiente
                      (WEBHOOK_URL). Após a criação da solicitação: o backend
                      persiste os dados em transação via Prisma; dispara o webhook
                      de forma assíncrona (não bloqueando a resposta); registra
                      status, tempo de resposta e payload de retorno para auditoria
                      e debug.
                    </p>
                    <p>
                      O dashboard foi projetado como uma camada de visualização
                      sobre os dados de solicitações, consumindo uma API específica
                      (/api/dashboard/estatisticas). Ele agrega métricas como volume
                      diário, principais produtos, substratos, empresas, distribuição
                      de quantidades e taxa de sucesso do webhook, usando Recharts
                      para visualização. Essa camada de analytics pode evoluir sem
                      impactar o fluxo transacional principal.
                    </p>
                    <p>
                      Em termos de camadas e organização: app/ concentra páginas,
                      rotas e layout (incluindo APIs); components/ui abstrai
                      componentes de interface baseados em shadcn/ui + Tailwind;
                      components/wizard encapsula a lógica do wizard; lib/ agrupa
                      serviços (catálogo, webhook, cliente Prisma, utilitários e
                      validações); types/ centraliza tipos compartilhados; data/
                      contém o catálogo em JSON usado como seed/fallback. A
                      arquitetura já prevê evoluções futuras como autenticação,
                      autorização por papéis, migração total do catálogo de JSON
                      para banco e inclusão de testes.
                    </p>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                      Stack do projeto
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-300 sm:text-[15px]">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Frontend / Backend web: Next.js 14 (App Router), React
                          18, TypeScript, Tailwind CSS + shadcn/ui (Radix UI)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Formulários e validação: React Hook Form, Zod
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Banco de dados: PostgreSQL, Prisma ORM</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>Gráficos: Recharts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Utilitários: date-fns, lucide-react, jspdf
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                        <span>
                          Build / tooling: Node.js + npm, TypeScript, ESLint +
                          eslint-config-next, PostCSS + Autoprefixer
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
              </CaseSection>
            ) : null}

            <RequestCTA projectUrl={`/projetos/${project.slug}`} />
          </div>
        </Container>
      </section>

      {galleryItems && galleryItems.length > 0 ? (
        <CaseSection id="galeria" className="py-12 sm:py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-glow/70">
                  Galeria
                </p>
                <h2 className="mt-3 text-[clamp(20px,2.6vw,30px)] font-semibold text-white">
                  Notas visuais
                </h2>
                <p className="mt-2 text-sm text-neutral-300">
                  Fluxos e telas que ajudaram a sustentar o contexto do case.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <CinemaGallery items={galleryItems} />
            </div>
          </Container>
        </CaseSection>
      ) : null}

      {homeIndex !== -1 ? (
        <section className="py-12">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/5 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
              <Link
                href="/projetos"
                className="text-xs uppercase tracking-[0.25em] text-mist/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              >
                Voltar para projetos
              </Link>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em]">
                {prevHomeSlug ? (
                  <Link
                    href={`/projetos/${prevHomeSlug}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-mist/70 transition hover:-translate-y-0.5 hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                  >
                    Anterior
                  </Link>
                ) : null}
                {nextHomeSlug ? (
                  <Link
                    href={`/projetos/${nextHomeSlug}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-mist/70 transition hover:-translate-y-0.5 hover:border-glow/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                  >
                    Próximo
                  </Link>
                ) : null}
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}



