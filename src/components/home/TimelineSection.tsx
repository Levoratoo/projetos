"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PreviewProject, projects as fullProjects, previewProjects, newlyAddedProjectSlugSet } from "@/data/projects";
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
  "quint-press-kit",
  "hoffman-agency",
  "ants-agency",
  "tchez-dj",
  "suntimes",
  "field-talents",
  "full-fight-academy",
  "sixx-house",
  "musefy",
  "asramos",
  "site-lofi-bc",
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
      className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,6,8,0.97),rgba(6,3,4,0.97))] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{
          background: `radial-gradient(circle at 85% 85%, ${chrome.radialSoft}, transparent 55%)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] tech-grid rounded-[28px]" />

      {/* Image area — grows to fill available height */}
      <div className="relative flex min-h-0 flex-1 flex-col gap-3 p-5 pb-3">
        <div className="preview-frame relative min-h-[220px] w-full flex-1 overflow-hidden rounded-[18px] bg-black/20">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            className="object-contain transition-opacity duration-300"
            sizes="(max-width: 1280px) 58vw, 760px"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {gallery.length > 1 && (
          <div className="scrollbar-glow flex shrink-0 gap-2 overflow-x-auto pb-1">
            {gallery.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`preview-frame relative h-14 w-[84px] shrink-0 overflow-hidden rounded-xl transition ${
                    isActive
                      ? "opacity-100 ring-2 ring-glow/50"
                      : "opacity-55 ring-1 ring-white/6 hover:opacity-90 hover:ring-glow/30"
                  }`}
                  aria-label={`${tPreview.previewGalleryAria}: ${item.alt}`}
                >
                  <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="84px" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Text — capped, scrolls if needed */}
      <div className="scrollbar-glow relative z-10 max-h-[32%] shrink-0 overflow-y-auto px-6 pb-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-glow/74">{kicker}</p>
        <h3 className="mt-2 font-display text-[clamp(22px,2.6vw,36px)] uppercase leading-[0.95] tracking-[0.04em] text-white">
          <span className="shineText shineTextProject">{lp.title}</span>
        </h3>

        {lp.description && (
          <p className="mt-3 text-[13px] leading-relaxed text-white/72 line-clamp-3">
            {lp.description}
          </p>
        )}

        <ProjectProgress value={project.progress} size="sm" showLabel={false} className="mt-3 max-w-[200px]" />

        {bullets && bullets.length > 0 && (
          <div className="section-shell mt-4 rounded-[18px] p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">{tPreview.previewHighlights}</p>
            <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-neutral-200">
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
          <div className="mt-4 flex flex-wrap gap-1.5 pb-2 text-[10px] uppercase tracking-[0.2em] text-mist/70">
            {lp.tags.map((tag) => (
              <span key={tag} className="data-chip px-2.5 py-1">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 shrink-0 border-t border-white/10 bg-[rgba(6,3,4,0.97)] px-6 py-4">
        <Link
          href={`/projetos/${project.slug}/`}
          onClick={closePreview}
          className="primary-cta primary-cta--sm primary-cta--glass group flex w-full items-center justify-between px-4 py-3.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
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
  isNew,
  newLabel,
  onHover,
  onOpen,
}: {
  project: PreviewProject;
  index: number;
  isActive: boolean;
  isNew: boolean;
  newLabel: string;
  onHover: () => void;
  onOpen: () => void;
}) {
  const { locale } = useLocale();
  const lp = getLocalizedPreview(project, locale);
  const accent = getAccent(project.slug);
  const num = String(index + 1).padStart(2, "0");

  return (
    <button
      className="group relative w-full overflow-hidden rounded-xl text-left transition-all duration-200"
      style={{
        background: isActive
          ? replaceAlpha(accent, 0.12)
          : isNew
            ? "rgba(255,255,255,0.035)"
            : "rgba(255,255,255,0.02)",
        border: `1px solid ${
          isActive
            ? replaceAlpha(accent, 0.4)
            : isNew
              ? "rgba(255,90,90,0.22)"
              : "rgba(255,255,255,0.07)"
        }`,
        boxShadow: isActive
          ? `0 0 24px ${replaceAlpha(accent, 0.12)}`
          : isNew
            ? "0 0 18px rgba(220,40,50,0.08)"
            : "none",
      }}
      onPointerEnter={onHover}
      onFocus={onHover}
      onClick={onOpen}
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-[3px] rounded-l-xl transition-all duration-200"
        style={{
          background: isActive
            ? `linear-gradient(to bottom, ${replaceAlpha(accent, 0.95)}, ${replaceAlpha(accent, 0.45)})`
            : isNew
              ? "linear-gradient(to bottom, rgba(255,80,90,0.7), rgba(255,80,90,0.2))"
              : "transparent",
        }}
      />

      <div className="flex items-center gap-3.5 px-4 py-3.5">
        <div className="relative h-[56px] w-[88px] shrink-0 overflow-hidden rounded-lg">
          <img
            src={project.thumb}
            alt={lp.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            draggable={false}
          />
          <div
            className="absolute inset-0 rounded-lg transition-opacity duration-200"
            style={{
              background: `linear-gradient(135deg, ${replaceAlpha(accent, 0.28)}, transparent 60%)`,
              opacity: isActive ? 1 : 0.4,
            }}
          />
          {isNew && (
            <span className="absolute left-1 top-1 rounded px-1 py-[1px] text-[8px] font-bold uppercase tracking-wide text-white"
              style={{ background: "rgba(220,40,55,0.92)", boxShadow: "0 0 8px rgba(220,40,55,0.45)" }}
            >
              {newLabel}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="shrink-0 rounded-md px-1.5 py-0.5 font-black text-[10px] tabular-nums transition-colors duration-200"
              style={{
                color: isActive ? "#fff" : "rgba(255,255,255,0.22)",
                background: isActive ? replaceAlpha(accent, 0.55) : "transparent",
              }}
            >
              {num}
            </span>
            <p
              className="truncate text-[13.5px] font-semibold leading-snug transition-colors duration-200"
              style={{ color: isActive ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.58)" }}
            >
              {lp.title}
            </p>
          </div>
          <p
            className="mt-1 truncate text-[11px] transition-colors duration-200"
            style={{ color: isActive ? replaceAlpha(accent, 0.75) : "rgba(255,255,255,0.28)" }}
          >
            {lp.area} · {project.year}
          </p>
        </div>

        <motion.span
          className="shrink-0 text-[12px]"
          animate={{ x: isActive ? 3 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ color: replaceAlpha(accent, 0.8) }}
        >
          →
        </motion.span>
      </div>
    </button>
  );
}

// ── Mobile card (full-width stacked) ─────────────────────────────────────────
function MobileCard({
  project,
  index,
  isNew,
  newLabel,
  onOpen,
}: {
  project: PreviewProject;
  index: number;
  isNew: boolean;
  newLabel: string;
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
        borderColor: isNew ? "rgba(220,40,55,0.35)" : replaceAlpha(accent, 0.18),
        boxShadow: isNew
          ? `0 4px 24px rgba(220,40,55,0.18)`
          : `0 4px 20px rgba(0,0,0,0.45)`,
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
        {isNew ? (
          <span
            className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white"
            style={{
              background: "rgba(220,40,55,0.9)",
              boxShadow: "0 0 12px rgba(220,40,55,0.4)",
            }}
          >
            {newLabel}
          </span>
        ) : (
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
        )}
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
    const next = items.find((p) => {
      if (id === "sites") return SITE_SLUGS.has(p.slug);
      if (id === "industria") return !SITE_SLUGS.has(p.slug);
      return true;
    });
    if (next) setActiveSlug(next.slug);
  };

  const activeProject = filtered.find((p) => p.slug === activeSlug) ?? filtered[0];
  const newLabel = t.newBadge;

  return (
    <section
      id="home-chapters"
      className="relative flex min-h-[100svh] flex-col lg:h-[100svh] lg:max-h-[100svh] lg:min-h-0 lg:overflow-hidden"
    >
      <HomeCosmicBackdrop />

      {/* Header + filters — compact chrome above the stage */}
      <div className="relative z-10 shrink-0 px-6 pb-5 pt-16 sm:pt-20 lg:pb-6 lg:pt-14 2xl:px-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/24">
            {t.timelineKicker}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {t.timelineTitle}
          </h2>
          <p className="mt-2 text-sm text-white/35">
            {t.timelineSubtitle(items.length)}
          </p>
        </motion.div>

        <motion.div
          className="mt-6 flex justify-center gap-2"
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
      </div>

      {/* ── Desktop stage: fills remaining viewport ── */}
      <div className="relative z-10 mx-auto hidden min-h-0 w-full max-w-[1680px] flex-1 px-6 pb-8 lg:flex lg:gap-8 xl:gap-10 2xl:px-12">
        {/* Left list with own scrollbar */}
        <aside className="relative z-20 flex w-[340px] shrink-0 flex-col xl:w-[380px] 2xl:w-[420px]">
          <p className="mb-3 shrink-0 text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">
            {t.splitListLabel} · {filtered.length}
          </p>
          <div className="project-list-scroll scrollbar-glow min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2">
            <div className="flex flex-col gap-2 pb-4">
              {filtered.map((project, index) => (
                <ProjectListItem
                  key={project.slug}
                  project={project}
                  index={index}
                  isActive={project.slug === (activeProject?.slug ?? "")}
                  isNew={newlyAddedProjectSlugSet.has(project.slug)}
                  newLabel={newLabel}
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
        </aside>

        {/* Right preview fills height */}
        <div className="relative z-10 min-h-0 min-w-0 flex-1">
          {activeProject && (
            <StickyPreview
              project={activeProject}
              onOpen={() => openPreview(activeProject.slug)}
            />
          )}
        </div>
      </div>

      {/* ── Mobile grid (< lg) ── */}
      <div className="relative z-10 mx-auto w-full max-w-2xl flex-1 px-4 pb-24 lg:hidden">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((project, index) => (
            <MobileCard
              key={project.slug}
              project={project}
              index={index}
              isNew={newlyAddedProjectSlugSet.has(project.slug)}
              newLabel={newLabel}
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
