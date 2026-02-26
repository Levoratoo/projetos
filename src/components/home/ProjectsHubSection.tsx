"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { ProjectProgress } from "@/components/ProjectProgress";
import { homeProjects } from "@/data/projects";
import { useProjectPreview } from "@/state/projectPreview";
import { withBasePath } from "@/lib/basePath";

const motionProps = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.45, ease: "easeOut" },
  viewport: { amount: 0.22, once: false }
};

function compactText(value: string | undefined, maxLength = 120) {
  if (!value) return "Case interno com foco em decisao, rastreabilidade e impacto real.";
  return value.length > maxLength ? `${value.slice(0, maxLength).trim()}...` : value;
}

function renderBlurCollage(images: string[]) {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:140px_140px]" />
      {images.map((src, index) => {
        const pos =
          index === 0
            ? "left-8 top-8 h-36 w-52"
            : index === 1
              ? "right-10 top-12 h-32 w-48"
              : index === 2
                ? "left-12 bottom-12 h-32 w-48"
                : "right-8 bottom-10 h-36 w-52";
        return (
          <div
            key={`${src}-${index}`}
            className={`absolute ${pos} rounded-2xl opacity-70 blur-[1px] mix-blend-screen`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/35 to-black/80" />
    </div>
  );
}

export function ProjectsHubSection() {
  const { openPreview } = useProjectPreview();
  const [activePanel, setActivePanel] = useState<"systems" | "bi" | null>(null);
  const blurImages = useMemo(
    () => homeProjects.slice(0, 4).map((project) => project.thumb),
    []
  );

  useEffect(() => {
    if (!activePanel) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activePanel]);

  useEffect(() => {
    if (!activePanel) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePanel]);

  const overlayScanClass =
    activePanel === "bi" ? "tech-scan tech-scan--blue" : "tech-scan";
  const overlayOrbPrimary =
    activePanel === "bi"
      ? "bg-sky-200/20"
      : "bg-emerald-300/20";
  const overlayOrbSecondary =
    activePanel === "bi"
      ? "bg-sky-200/15"
      : "bg-emerald-400/15";

  return (
    <div className="relative min-h-screen overflow-hidden py-10 sm:py-12 lg:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(86,255,146,0.15),transparent_58%),radial-gradient(circle_at_88%_30%,rgba(58,140,112,0.2),transparent_56%),linear-gradient(180deg,rgba(6,9,8,0.96),rgba(8,10,9,0.88))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />

      <Container className="max-w-[1560px] xl:max-w-[1720px] 2xl:max-w-[1880px]">
        <motion.div {...motionProps} className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">
            WEISUL PROJECTS
          </p>
          <h2 className="mt-4 pb-1 text-[clamp(40px,5.6vw,76px)] font-semibold leading-[1.08] text-white overflow-visible">
            <span className="shineText shineTextProject">Hub de projetos</span>
          </h2>
          <p className="mt-3 max-w-[72ch] text-sm text-mist/80 sm:text-base">
            Mapa geral dos projetos internos. Separacao entre frente de sistemas e frente de BI,
            mantendo a mesma linguagem visual do portfolio principal.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <motion.button
            {...motionProps}
            type="button"
            onClick={() => setActivePanel("systems")}
            className="tech-frame tech-frame--green group relative flex min-h-[360px] flex-col overflow-hidden rounded-[36px] border border-emerald-300/20 bg-[#0c100e] p-9 text-left shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur transition hover:border-emerald-300/45 hover:shadow-[0_40px_110px_rgba(0,0,0,0.65)] md:min-h-[420px] md:p-10"
          >
            {renderBlurCollage(blurImages)}
            <div className="pointer-events-none absolute inset-0 z-[1] tech-grid" />
            <div className="pointer-events-none absolute inset-0 z-[2] tech-scan" />
            <div className="pointer-events-none absolute -top-20 right-8 z-[1] h-56 w-56 rounded-full bg-emerald-300/25 blur-[80px] animate-orb" />
            <div className="pointer-events-none absolute -bottom-24 left-10 z-[1] h-48 w-48 rounded-full bg-emerald-400/20 blur-[90px] animate-orb-rev" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.38em] text-emerald-200/80">
                Projetos de Sistemas
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <h3 className="text-[clamp(28px,3.6vw,46px)] font-semibold text-white">
                  Sistemas
                </h3>
                <div className="avatar-badge flex items-center gap-2 rounded-full border border-emerald-300/25 bg-black/50 px-2 py-1 shadow-[0_0_18px_rgba(82,255,170,0.2)]">
                  <div className="avatar-ring h-9 w-9 overflow-hidden rounded-full border border-emerald-300/60 shadow-[0_0_16px_rgba(82,255,170,0.35)]">
                    <img
                      src={withBasePath("/images/pedro.jpg")}
                      alt="Pedro Levorato"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="pr-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-200/80">
                    Pedro Levorato
                  </span>
                </div>
              </div>
              <p className="mt-4 max-w-[52ch] text-sm text-mist/75 md:text-base">
                Cases internos com foco em eficiencia operacional, indicadores e automacao.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-8">
              <span className="tech-chip tech-chip--green">
                {homeProjects.length} cases
              </span>
              <span className="tech-chip">Ver projetos</span>
            </div>
          </motion.button>

          <motion.button
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 0.05 }}
            type="button"
            onClick={() => setActivePanel("bi")}
            className="tech-frame tech-frame--blue group relative flex min-h-[360px] flex-col overflow-hidden rounded-[36px] border border-white/10 bg-[#0b1012] p-9 text-left shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur transition hover:border-sky-200/40 hover:shadow-[0_40px_110px_rgba(0,0,0,0.65)] md:min-h-[420px] md:p-10"
          >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.18),transparent_50%),linear-gradient(180deg,rgba(6,10,12,0.9),rgba(10,12,12,0.7))]" />
            <div className="pointer-events-none absolute inset-0 z-[1] tech-grid" />
            <div className="pointer-events-none absolute inset-0 z-[2] tech-scan tech-scan--blue" />
            <div className="pointer-events-none absolute -top-20 right-8 z-[1] h-56 w-56 rounded-full bg-sky-200/20 blur-[80px] animate-orb" />
            <div className="pointer-events-none absolute -bottom-24 left-10 z-[1] h-48 w-48 rounded-full bg-sky-200/15 blur-[90px] animate-orb-rev" />

            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.38em] text-sky-200/80">
                Projetos de BI
              </p>
              <h3 className="mt-4 text-[clamp(28px,3.6vw,46px)] font-semibold text-white">
                BI
              </h3>
              <p className="mt-4 max-w-[52ch] text-sm text-mist/75 md:text-base">
                Area temporariamente em manutencao. Retorno em breve com os cases.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-8">
              <span className="tech-chip tech-chip--blue">Em manutencao</span>
              <span className="tech-chip">Manutencao</span>
            </div>
          </motion.button>
        </div>
      </Container>

      {activePanel ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Projetos"
          onClick={() => setActivePanel(null)}
        >
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.75)]" />
          <div
            className="tech-overlay relative w-[min(1600px,96vw)] h-[92vh] overflow-hidden rounded-[42px] border border-white/10 bg-[#0f1211] shadow-[0_50px_140px_rgba(0,0,0,0.7)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 opacity-40 tech-grid" />
            <div className={`pointer-events-none absolute inset-0 ${overlayScanClass}`} />
            <div
              className={`pointer-events-none absolute -top-24 right-20 h-72 w-72 rounded-full ${overlayOrbPrimary} blur-[120px]`}
            />
            <div
              className={`pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full ${overlayOrbSecondary} blur-[140px]`}
            />

            <div className="relative flex h-full flex-col p-7 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p
                    className={`text-xs uppercase tracking-[0.3em] ${
                      activePanel === "systems"
                        ? "text-emerald-200/70"
                        : "text-sky-200/70"
                    }`}
                  >
                    {activePanel === "systems" ? "Projetos de Sistemas" : "Projetos de BI"}
                  </p>
                  <h3 className="mt-2 text-[clamp(28px,3.8vw,44px)] font-semibold text-white">
                    {activePanel === "systems" ? "Sistemas" : "BI"}
                  </h3>
                  <p className="mt-2 text-sm text-mist/70">
                    {activePanel === "systems"
                      ? "Visao completa dos cases internos com foco em entrega e impacto."
                      : "Ambiente de BI em manutencao com retomada prevista em breve."}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`tech-chip ${
                      activePanel === "systems" ? "tech-chip--green" : "tech-chip--blue"
                    }`}
                  >
                    {activePanel === "systems" ? `${homeProjects.length} cases` : "Em manutencao"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePanel(null)}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition hover:border-glow/40 hover:bg-white/10 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                    aria-label="Fechar"
                  >
                    X
                  </button>
                </div>
              </div>

              {activePanel === "systems" ? (
                <>
                  <p className="mt-4 text-sm text-mist/70">
                    {homeProjects.length} cases disponiveis. Clique para ver previa ou abrir o case.
                  </p>
                  <div className="mt-6 flex min-h-0 flex-1">
                    <div className="projects-scroll grid flex-1 grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden pr-4 [scrollbar-gutter:stable] green-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {homeProjects.map((project) => (
                        <div
                          key={project.slug}
                          className="tech-card group relative flex flex-col rounded-2xl border border-white/10 bg-black/35 p-5 transition hover:border-emerald-300/40 hover:bg-black/45 md:flex-row md:gap-6"
                        >
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(86,255,146,0.2),transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
                          <div className="relative flex h-full flex-col md:flex-row md:items-stretch md:gap-6">
                            <div className="relative mb-4 h-28 overflow-hidden rounded-xl border border-white/10 bg-black/40 md:mb-0 md:h-auto md:w-56 md:flex-none">
                              <img
                                src={project.thumb}
                                alt={project.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/50" />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col">
                              <p className="text-[10px] uppercase tracking-[0.25em] text-mist/65">
                                {project.area} - {project.year}
                              </p>
                              <h4 className="mt-3 text-base font-semibold leading-snug text-white">
                                {project.title}
                              </h4>
                              <p className="mt-2 text-sm leading-relaxed text-mist/75">
                                {project.description ??
                                  "Case interno com foco em decisao, rastreabilidade e impacto real."}
                              </p>
                              <ProjectProgress
                                value={project.progress}
                                size="sm"
                                showLabel={false}
                                showPercent
                                className="mt-4 w-full max-w-[560px]"
                              />

                              <div className="mt-auto space-y-3 pt-4">
                                <div className="flex flex-wrap gap-2">
                                  <span className="rounded-full border border-emerald-300/35 bg-emerald-300/12 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                                    {project.status}
                                  </span>
                                  {project.tags.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag}
                                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-mist/70"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => openPreview(project.slug)}
                                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-mist/80 transition hover:border-emerald-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                                  >
                                    Previa
                                  </button>
                                  <Link
                                    href={`/projetos/${project.slug}`}
                                    className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                                  >
                                    Abrir case
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 flex min-h-0 flex-1 items-center justify-center">
                  <div className="w-full max-w-[680px] rounded-3xl border border-dashed border-white/15 bg-black/35 p-10 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">
                      Em manutencao
                    </p>
                    <h4 className="mt-4 text-[clamp(22px,2.6vw,32px)] font-semibold text-white">
                      Conteudo temporariamente indisponivel
                    </h4>
                    <p className="mt-3 text-sm text-mist/75">
                      Retorno em breve com os cases de BI. Atualizacoes em andamento.
                    </p>
                    <span className="mt-6 inline-flex rounded-full border border-sky-200/35 bg-sky-200/12 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-sky-100">
                      Em manutencao
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
