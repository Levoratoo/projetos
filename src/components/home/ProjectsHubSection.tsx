"use client";

import Image from "next/image";
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

function renderBlurCollage(images: string[]) {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 opacity-[0.12] tech-grid" />
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
            className={`absolute ${pos} rounded-2xl opacity-60 blur-[1px] mix-blend-screen`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-br from-black/78 via-black/36 to-black/84" />
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
      ? "bg-[rgba(255,141,114,0.18)]"
      : "bg-[rgba(255,59,59,0.18)]";
  const overlayOrbSecondary =
    activePanel === "bi"
      ? "bg-[rgba(255,141,114,0.12)]"
      : "bg-[rgba(255,59,59,0.12)]";

  return (
    <div className="relative min-h-screen overflow-hidden py-10 sm:py-12 lg:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(110,10,24,0.22),transparent_48%),radial-gradient(circle_at_88%_30%,rgba(255,56,56,0.14),transparent_42%),linear-gradient(180deg,rgba(6,3,4,0.96),rgba(4,2,3,0.9))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] tech-grid" />

      <Container className="max-w-[1560px] xl:max-w-[1720px] 2xl:max-w-[1880px]">
        <motion.div {...motionProps} className="max-w-3xl">
          <p className="eyebrow-pill">LEVORATO PROJECTS</p>
          <h2 className="mt-6 pb-4 font-display text-[clamp(46px,6vw,92px)] uppercase leading-[0.9] tracking-[0.04em] text-white">
            <span className="shineText shineTextProject underline-flame">Hub de projetos</span>
          </h2>
          <p className="mt-4 max-w-[72ch] text-sm leading-relaxed text-mist/76 sm:text-base">
            Mapa geral dos projetos internos. Separacao entre frente de sistemas e frente de BI,
            mantendo a mesma linguagem visual do portfolio principal.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <motion.button
            {...motionProps}
            type="button"
            onClick={() => setActivePanel("systems")}
            className="tech-frame tech-frame--green group relative flex min-h-[360px] flex-col overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,7,9,0.88),rgba(7,3,4,0.88))] p-9 text-left shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl transition hover:border-glow/40 hover:shadow-[0_40px_110px_rgba(0,0,0,0.65)] md:min-h-[420px] md:p-10"
          >
            {renderBlurCollage(blurImages)}
            <div className="pointer-events-none absolute inset-0 z-[1] tech-grid" />
            <div className="pointer-events-none absolute inset-0 z-[2] tech-scan" />
            <div className="pointer-events-none absolute -top-20 right-8 z-[1] h-56 w-56 rounded-full bg-[rgba(255,59,59,0.24)] blur-[80px] animate-orb" />
            <div className="pointer-events-none absolute -bottom-24 left-10 z-[1] h-48 w-48 rounded-full bg-[rgba(255,59,59,0.18)] blur-[90px] animate-orb-rev" />

            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.38em] text-glow/78">
                Projetos de Sistemas
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <h3 className="font-display text-[clamp(34px,3.8vw,58px)] uppercase leading-none text-white">
                  Sistemas
                </h3>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-2 py-1 shadow-[0_0_22px_rgba(255,59,59,0.12)]">
                  <div className="avatar-ring relative h-9 w-9 overflow-hidden rounded-full border border-glow/50 shadow-[0_0_18px_rgba(255,59,59,0.24)]">
                    <Image
                      src={withBasePath("/images/pedro.jpg")}
                      alt="Pedro Levorato"
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="36px"
                    />
                  </div>
                  <span className="pr-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-mist/82">
                    Pedro Levorato
                  </span>
                </div>
              </div>
              <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-mist/74 md:text-base">
                Cases internos com foco em eficiencia operacional, indicadores e automacao.
              </p>
            </div>

            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-8">
              <span className="tech-chip tech-chip--green">{homeProjects.length} cases</span>
              <span className="tech-chip">Ver projetos</span>
            </div>
          </motion.button>

          <motion.button
            {...motionProps}
            transition={{ ...motionProps.transition, delay: 0.05 }}
            type="button"
            onClick={() => setActivePanel("bi")}
            className="tech-frame tech-frame--blue group relative flex min-h-[360px] flex-col overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,9,8,0.88),rgba(7,3,4,0.88))] p-9 text-left shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl transition hover:border-[rgba(255,141,114,0.35)] hover:shadow-[0_40px_110px_rgba(0,0,0,0.65)] md:min-h-[420px] md:p-10"
          >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,141,114,0.14),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(255,141,114,0.12),transparent_46%),linear-gradient(180deg,rgba(14,7,6,0.9),rgba(7,3,4,0.76))]" />
            <div className="pointer-events-none absolute inset-0 z-[1] tech-grid" />
            <div className="pointer-events-none absolute inset-0 z-[2] tech-scan tech-scan--blue" />
            <div className="pointer-events-none absolute -top-20 right-8 z-[1] h-56 w-56 rounded-full bg-[rgba(255,141,114,0.2)] blur-[80px] animate-orb" />
            <div className="pointer-events-none absolute -bottom-24 left-10 z-[1] h-48 w-48 rounded-full bg-[rgba(255,141,114,0.16)] blur-[90px] animate-orb-rev" />

            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.38em] text-[rgba(255,220,210,0.82)]">
                Projetos de BI
              </p>
              <h3 className="mt-4 font-display text-[clamp(34px,3.8vw,58px)] uppercase leading-none text-white">
                BI
              </h3>
              <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-mist/74 md:text-base">
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/82 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Projetos"
          onClick={() => setActivePanel(null)}
        >
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.78)]" />
          <div
            className="tech-overlay relative h-[92vh] w-[min(1600px,96vw)] overflow-hidden rounded-[42px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,6,8,0.96),rgba(7,3,4,0.96))] shadow-[0_50px_140px_rgba(0,0,0,0.7)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 opacity-30 tech-grid" />
            <div className={`pointer-events-none absolute inset-0 ${overlayScanClass}`} />
            <div
              className={`pointer-events-none absolute -top-24 right-20 h-72 w-72 rounded-full ${overlayOrbPrimary} blur-[120px]`}
            />
            <div
              className={`pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full ${overlayOrbSecondary} blur-[140px]`}
            />

            <div className="relative flex h-full flex-col p-6 md:p-8 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p
                    className={`text-xs uppercase tracking-[0.3em] ${
                      activePanel === "systems"
                        ? "text-glow/75"
                        : "text-[rgba(255,220,210,0.74)]"
                    }`}
                  >
                    {activePanel === "systems" ? "Projetos de Sistemas" : "Projetos de BI"}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(34px,4vw,58px)] uppercase leading-none text-white">
                    {activePanel === "systems" ? "Sistemas" : "BI"}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist/70">
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
                    className="ghost-circle tech-close inline-flex h-12 w-12 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                    aria-label="Fechar"
                  >
                    X
                  </button>
                </div>
              </div>

              {activePanel === "systems" ? (
                <>
                  <p className="mt-4 text-sm text-mist/66">
                    {homeProjects.length} cases disponiveis. Clique para ver previa ou abrir o case.
                  </p>
                  <div className="mt-6 flex min-h-0 flex-1">
                    <div className="projects-scroll grid flex-1 grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden pr-4 [scrollbar-gutter:stable] green-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {homeProjects.map((project) => (
                        <div
                          key={project.slug}
                          className="tech-card group relative flex flex-col rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(19,8,11,0.72),rgba(8,3,4,0.68))] p-5 transition hover:border-glow/35 hover:bg-[linear-gradient(180deg,rgba(23,9,12,0.82),rgba(9,4,5,0.8))] md:flex-row md:gap-6"
                        >
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,62,62,0.16),transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
                          <div className="relative flex h-full flex-col md:flex-row md:items-stretch md:gap-6">
                            <div className="preview-frame relative mb-4 h-28 overflow-hidden rounded-2xl bg-black/40 md:mb-0 md:h-auto md:w-56 md:flex-none">
                              <Image
                                src={project.thumb}
                                alt={project.title}
                                fill
                                className="object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 224px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/44 via-transparent to-black/54" />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col">
                              <p className="text-[10px] uppercase tracking-[0.25em] text-mist/58">
                                {project.area} - {project.year}
                              </p>
                              <h4 className="mt-3 text-base font-semibold leading-snug text-white">
                                {project.title}
                              </h4>
                              <p className="mt-2 text-sm leading-relaxed text-mist/72">
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
                                  <span className="data-chip data-chip--accent px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
                                    {project.status}
                                  </span>
                                  {project.tags.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag}
                                      className="data-chip px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-mist/72"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => openPreview(project.slug)}
                                    className="ghost-button ghost-button--sm px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-mist/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                                  >
                                    Previa
                                  </button>
                                  <Link
                                    href={`/projetos/${project.slug}/`}
                                    className="primary-cta primary-cta--sm primary-cta--glass px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
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
                  <div className="section-shell w-full max-w-[680px] rounded-[32px] p-10 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-[rgba(255,220,210,0.82)]">
                      Em manutencao
                    </p>
                    <h4 className="mt-4 font-display text-[clamp(28px,3vw,40px)] uppercase leading-none text-white">
                      Conteudo temporariamente indisponivel
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-mist/75">
                      Retorno em breve com os cases de BI. Atualizacoes em andamento.
                    </p>
                    <span className="tech-chip tech-chip--blue mt-6 inline-flex">
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
