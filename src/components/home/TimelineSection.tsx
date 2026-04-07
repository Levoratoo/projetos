"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PreviewProject, projects as fullProjects, previewProjects } from "@/data/projects";
import { tHome } from "@/i18n/home";
import { getLocalizedPreview } from "@/i18n/previewProjects";
import { useLocale } from "@/state/locale";
import { useProjectPreview } from "@/state/projectPreview";
import { HomeCosmicBackdrop } from "@/components/home/HomeCosmicBackdrop";
import { ProjectProgress } from "@/components/ProjectProgress";
import { getPreviewChrome } from "@/lib/previewChrome";

// ── Helpers ───────────────────────────────────────────────────────────────────
function replaceAlpha(rgba: string, alpha: number): string {
  return rgba.replace(
    /rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/,
    `rgba($1,$2,$3,${alpha})`
  );
}

function getAccent(slug: string): string {
  const p = fullProjects.find((p) => p.slug === slug);
  return p?.cover.a ?? "rgba(100,150,255,0.5)";
}

// ── Filter types ──────────────────────────────────────────────────────────────
const SITE_SLUGS = new Set([
  "landing-page-printbag",
  "site-institucional-printbag",
  "donacica-hot-dog",
  "new-talent",
  "press-kit-levorato-dj",
  "claymoon-press-kit",
]);

type FilterTab = "todos" | "sites" | "industria";

// ── Inline rich preview (modal content embedded in the panel) ─────────────────
function StickyPreview({
  project,
}: {
  project: PreviewProject;
  onOpen: () => void;
}) {
  const { locale } = useLocale();
  const tPreview = tHome(locale);
  const { closePreview } = useProjectPreview();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [project.slug]);

  const full = previewProjects.find((p) => p.slug === project.slug) ?? project;
  const lp = getLocalizedPreview(full, locale);
  const gallery = (full as PreviewProject & { gallery?: { src: string; alt: string }[] }).gallery ?? [];
  const hero = gallery[activeIndex] ?? { src: project.thumb, alt: lp.title };
  const kicker = `${lp.area} · ${project.year} · ${lp.statusLabel}`;
  const bullets = lp.bullets;
  const chrome = getPreviewChrome(project.slug);

  return (
    <motion.div
      key={`${project.slug}-${locale}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,6,8,0.97),rgba(6,3,4,0.97))] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
    >
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            background: `radial-gradient(circle at 85% 85%, ${chrome.radialSoft}, transparent 55%)`
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] tech-grid rounded-[28px]" />

        {/* ── Image area ── */}
        <div className="relative flex flex-col gap-3 p-5">
          {/* Main image */}
          <div
            className="preview-frame relative w-full overflow-hidden rounded-[18px] bg-black/20"
            style={{ height: "clamp(200px, 38vh, 480px)" }}
          >
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              className="object-contain transition-opacity duration-300"
              sizes="(max-width: 1280px) 55vw, 680px"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Thumbnail strip */}
          {gallery.length > 1 && (
            <div className="scrollbar-glow flex gap-2 overflow-x-auto pb-1">
              {gallery.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`preview-frame relative h-12 w-[72px] shrink-0 overflow-hidden rounded-xl transition ${
                      isActive
                        ? "opacity-100 ring-2 ring-glow/50"
                        : "opacity-55 ring-1 ring-white/6 hover:opacity-90 hover:ring-glow/30"
                    }`}
                    aria-label={`${tPreview.previewGalleryAria}: ${item.alt}`}
                  >
                    <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="72px" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Text content ── */}
        <div className="scrollbar-glow max-h-[28vh] overflow-y-auto px-6 pb-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-glow/74">{kicker}</p>
          <h3 className="mt-2 font-display text-[clamp(20px,2.4vw,32px)] uppercase leading-[0.95] tracking-[0.04em] text-white">
            <span className="shineText shineTextProject">{lp.title}</span>
          </h3>

          {lp.description && (
            <p className="mt-3 text-[12.5px] leading-relaxed text-white/72 line-clamp-3">
              {lp.description}
            </p>
          )}

          <ProjectProgress value={project.progress} size="sm" showLabel={false} className="mt-3 max-w-[200px]" />

          {bullets && bullets.length > 0 && (
            <div className="section-shell mt-4 rounded-[18px] p-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">{tPreview.previewHighlights}</p>
              <ul className="mt-2.5 space-y-1.5 text-[12px] text-neutral-200">
                {bullets.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-glow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lp.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 text-[10px] uppercase tracking-[0.2em] text-mist/70">
              {lp.tags.map((tag) => (
                <span key={tag} className="data-chip px-2.5 py-1">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer CTA ── */}
        <div className="shrink-0 border-t border-white/10 bg-[rgba(6,3,4,0.97)] px-6 py-4">
          <Link
            href={`/projetos/${project.slug}/`}
            onClick={closePreview}
            className="primary-cta primary-cta--sm primary-cta--glass group flex w-full items-center justify-between px-4 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            style={{
              background: chrome.ctaBackground,
              boxShadow: chrome.ctaShadow,
              border: chrome.ctaBorder
            }}
          >
            <span>{tPreview.previewFullDesc}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
    </motion.div>
  );
}

// ── Project list item ─────────────────────────────────────────────────────────
function ProjectListItem({
  project,
  index,
  isActive,
  onHover,
  onOpen,
}: {
  project: PreviewProject;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onOpen: () => void;
}) {
  const { locale } = useLocale();
  const lp = getLocalizedPreview(project, locale);
  const accent = getAccent(project.slug);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.04 }}
    >
      <button
        className="group relative w-full overflow-hidden rounded-xl text-left transition-all duration-200"
        style={{
          background: isActive ? replaceAlpha(accent, 0.1) : "transparent",
          border: `1px solid ${isActive ? replaceAlpha(accent, 0.35) : "rgba(255,255,255,0.06)"}`,
        }}
        onPointerEnter={onHover}
        onClick={onOpen}
      >
        {/* Active left bar */}
        <div
          className="absolute bottom-0 left-0 top-0 w-[3px] rounded-l-xl transition-all duration-200"
          style={{
            background: isActive
              ? `linear-gradient(to bottom, ${replaceAlpha(accent, 0.9)}, ${replaceAlpha(accent, 0.5)})`
              : "transparent",
          }}
        />

        <div className="flex items-center gap-3 px-4 py-3">
          {/* Thumbnail */}
          <div className="relative h-[46px] w-[72px] shrink-0 overflow-hidden rounded-lg">
            <img
              src={project.thumb}
              alt={lp.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              draggable={false}
            />
            <div
              className="absolute inset-0 rounded-lg transition-opacity duration-200"
              style={{
                background: `linear-gradient(135deg, ${replaceAlpha(accent, 0.25)}, transparent 60%)`,
                opacity: isActive ? 1 : 0.4,
              }}
            />
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span
                className="shrink-0 font-black text-[10px] tabular-nums transition-colors duration-200"
                style={{ color: isActive ? replaceAlpha(accent, 0.85) : "rgba(255,255,255,0.18)" }}
              >
                {num}
              </span>
              <p
                className="truncate text-[12.5px] font-semibold leading-snug transition-colors duration-200"
                style={{ color: isActive ? "rgba(255,255,255,0.93)" : "rgba(255,255,255,0.55)" }}
              >
                {lp.title}
              </p>
            </div>
            <p
              className="mt-0.5 truncate text-[10px] transition-colors duration-200"
              style={{ color: isActive ? replaceAlpha(accent, 0.65) : "rgba(255,255,255,0.22)" }}
            >
              {lp.area} · {project.year}
            </p>
          </div>

          {/* Arrow */}
          <motion.span
            className="shrink-0 text-[11px]"
            animate={{ x: isActive ? 2 : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.18 }}
            style={{ color: replaceAlpha(accent, 0.7) }}
          >
            →
          </motion.span>
        </div>
      </button>
    </motion.div>
  );
}

// ── Mobile card (full-width stacked) ─────────────────────────────────────────
function MobileCard({
  project,
  index,
  onOpen,
}: {
  project: PreviewProject;
  index: number;
  onOpen: () => void;
}) {
  const { locale } = useLocale();
  const t = tHome(locale);
  const lp = getLocalizedPreview(project, locale);
  const accent = getAccent(project.slug);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.button
      className="w-full cursor-pointer overflow-hidden rounded-2xl border text-left"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: (index % 4) * 0.06 }}
      style={{
        background: "#0b0b13",
        borderColor: replaceAlpha(accent, 0.18),
        boxShadow: `0 4px 20px rgba(0,0,0,0.45)`,
      }}
      onClick={onOpen}
    >
      {/* Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={project.thumb}
          alt={lp.title}
          className="h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 35%, rgba(11,11,19,0.97) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${replaceAlpha(accent, 0.14)}, transparent 55%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${replaceAlpha(accent, 0.8)}, transparent)`,
          }}
        />
        <span
          className="absolute left-4 top-4 font-black text-[11px]"
          style={{ color: replaceAlpha(accent, 0.55) }}
        >
          {num}
        </span>
        <span
          className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
          style={{
            background: replaceAlpha(accent, 0.15),
            color: replaceAlpha(accent, 0.9),
            border: `1px solid ${replaceAlpha(accent, 0.28)}`,
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 pt-3">
        <p
          className="mb-1 text-[9px] font-bold uppercase tracking-[0.3em]"
          style={{ color: replaceAlpha(accent, 0.65) }}
        >
          {lp.area}
        </p>
        <h3 className="mb-2 text-[14px] font-bold leading-snug text-white/92">
          {lp.title}
        </h3>
        {lp.description && (
          <p className="mb-3 line-clamp-2 text-[11.5px] leading-relaxed text-white/38">
            {lp.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mb-3">
          {lp.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-[2px] text-[9.5px] font-medium"
              style={{
                background: replaceAlpha(accent, 0.1),
                color: replaceAlpha(accent, 0.85),
                border: `1px solid ${replaceAlpha(accent, 0.18)}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className="text-[11px] font-semibold"
          style={{ color: replaceAlpha(accent, 0.75) }}
        >
          {t.cardViewProject} →
        </span>
      </div>
    </motion.button>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function TimelineSection({
  projects: items,
}: {
  projects: PreviewProject[];
}) {
  const { locale } = useLocale();
  const t = tHome(locale);
  const { openPreview } = useProjectPreview();

  const [activeFilter, setActiveFilter] = useState<FilterTab>("todos");
  const [activeSlug, setActiveSlug] = useState<string>(items[0]?.slug ?? "");

  const filterLabels: { id: FilterTab; label: string }[] = [
    { id: "todos", label: t.filterAll },
    { id: "sites", label: t.filterSites },
    { id: "industria", label: t.filterIndustry },
  ];

  const filtered = items.filter((p) => {
    if (activeFilter === "sites") return SITE_SLUGS.has(p.slug);
    if (activeFilter === "industria") return !SITE_SLUGS.has(p.slug);
    return true;
  });

  // When filter changes, select first visible project
  const handleFilterChange = (id: FilterTab) => {
    setActiveFilter(id);
    const first = items.find((p) => {
      if (id === "sites") return SITE_SLUGS.has(p.slug);
      if (id === "industria") return !SITE_SLUGS.has(p.slug);
      return true;
    });
    if (first) setActiveSlug(first.slug);
  };

  const activeProject = filtered.find((p) => p.slug === activeSlug) ?? filtered[0];

  return (
    <section
      id="home-chapters"
      className="relative pb-32 pt-24"
    >
      <HomeCosmicBackdrop />

      {/* Section header */}
      <motion.div
        className="relative z-10 mb-16 text-center"
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/24">
          {t.timelineKicker}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t.timelineTitle}
        </h2>
        <p className="mt-3 text-sm text-white/35">
          {t.timelineSubtitle(items.length)}
        </p>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        className="relative z-10 mb-10 flex justify-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {filterLabels.map(({ id, label }) => {
          const active = activeFilter === id;
          return (
            <button
              key={id}
              onClick={() => handleFilterChange(id)}
              className="relative rounded-full px-4 py-1.5 text-[11px] font-semibold transition-colors duration-200"
              style={{
                color: active ? "#fff" : "rgba(255,255,255,0.38)",
                background: active
                  ? "rgba(220,30,50,0.18)"
                  : "rgba(255,255,255,0.04)",
                border: active
                  ? "1px solid rgba(220,30,50,0.45)"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(220,30,50,0.12)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Desktop split panel (lg+) ── */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1600px] px-6 lg:flex lg:gap-8 xl:gap-10 2xl:px-12">
        {/* Left: scrollable project list — z-index above sticky preview so hover always wins after modal/back */}
        <div className="relative z-20 w-[320px] shrink-0 xl:w-[360px] 2xl:w-[400px]">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">
            {t.splitListLabel} · {filtered.length}
          </p>
          <div className="flex flex-col gap-1.5">
            {filtered.map((project, index) => (
              <ProjectListItem
                key={project.slug}
                project={project}
                index={index}
                isActive={project.slug === (activeProject?.slug ?? "")}
                onHover={() => setActiveSlug(project.slug)}
                onOpen={() => openPreview(project.slug)}
              />
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-white/25">
                {t.filterEmpty}
              </p>
            )}
          </div>
        </div>

        {/* Right: sticky preview */}
        <div className="relative z-10 min-w-0 flex-1">
          <div className="sticky top-6 isolate">
            {activeProject && (
              <StickyPreview
                project={activeProject}
                onOpen={() => openPreview(activeProject.slug)}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile grid (< lg) ── */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 lg:hidden">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((project, index) => (
            <MobileCard
              key={project.slug}
              project={project}
              index={index}
              onOpen={() => openPreview(project.slug)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-white/25">
              {t.filterEmpty}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
