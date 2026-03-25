"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProjectProgress } from "@/components/ProjectProgress";
import { useProjectPreview } from "@/state/projectPreview";
import { previewProjects } from "@/data/projects";
import { tHome } from "@/i18n/home";
import { getLocalizedPreview } from "@/i18n/previewProjects";
import { useLocale } from "@/state/locale";

type ProjectPreviewModalProps = {
  open: boolean;
  slug: string | null;
  onClose: () => void;
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
}

export function ProjectPreviewModal({
  open,
  slug,
  onClose
}: ProjectPreviewModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const { locale } = useLocale();
  const t = tHome(locale);
  const { closePreview } = useProjectPreview();

  useEffect(() => {
    if (!open) return;
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      lastFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab") {
        const focusables = Array.from(
          document.querySelectorAll("[data-preview-focusable]") as NodeListOf<HTMLElement>
        );
        if (focusables.length === 0) return;
        const current = focusables.indexOf(document.activeElement as HTMLElement);
        const next = event.shiftKey
          ? (current - 1 + focusables.length) % focusables.length
          : (current + 1) % focusables.length;
        focusables[next]?.focus();
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
  }, [slug, open]);

  useEffect(() => {
    if (!open) return;
    if (reducedMotion) {
      setEntered(true);
      return;
    }
    const id = window.setTimeout(() => setEntered(true), 10);
    return () => window.clearTimeout(id);
  }, [open, reducedMotion]);

  if (!open || !slug) return null;

  const project = previewProjects.find((item) => item.slug === slug);
  if (!project) return null;

  const lp = getLocalizedPreview(project, locale);
  const gallery = project.gallery ?? [];
  const hero = gallery[activeIndex] ?? { src: project.thumb, alt: lp.title };
  const accessUrl = project.accessLinks?.[0]?.url ?? null;
  const kicker = `${lp.area} \u00b7 ${project.year} \u00b7 ${lp.statusLabel}`;
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/82 backdrop-blur-2xl saturate-150"
      role="dialog"
      aria-modal="true"
      aria-label={t.previewPanelKicker}
      onClick={onClose}
    >
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
      <div
        className={`relative h-[86vh] max-h-[860px] w-[min(1240px,92vw)] overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,6,8,0.96),rgba(6,3,4,0.96))] shadow-[0_40px_120px_rgba(0,0,0,0.65)] transition-all duration-200 ${
          entered || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        } max-md:h-[92vh]`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(255,59,59,0.14),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] tech-grid" />
        <div className="grid h-full grid-cols-1 grid-rows-[1fr_1fr] gap-0 lg:grid-cols-12 lg:grid-rows-none">
          <div className="relative order-last flex min-h-0 flex-col border-t border-white/10 lg:order-first lg:col-span-4 lg:border-t-0 lg:border-r lg:border-white/10">
            {/* Scrollable content area */}
            <div className="scrollbar-glow flex-1 overflow-y-auto p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-glow/74">{kicker}</p>
                  <h3 className="mt-3 font-display text-[clamp(28px,4vw,48px)] uppercase leading-[0.92] tracking-[0.04em] text-white">
                    <span className="shineText shineTextProject underline-flame">
                      {lp.title}
                    </span>
                  </h3>
                </div>
              </div>

              {lp.description ? (
                <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/78 line-clamp-3">
                  {lp.description}
                </p>
              ) : null}

              <ProjectProgress
                value={project.progress}
                size="sm"
                showLabel={false}
                className="mt-4 max-w-[240px]"
              />

              {lp.bullets ? (
                <div className="section-shell mt-5 rounded-[24px] p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                    {t.previewHighlights}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                    {lp.bullets.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-glow" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {lp.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-mist/70">
                  {lp.tags.map((tag) => (
                    <span key={tag} className="data-chip px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Fixed footer button — always visible */}
            <div className="shrink-0 border-t border-white/10 bg-[rgba(6,3,4,0.96)] px-6 py-4 md:px-8">
              <Link
                href={`/projetos/${project.slug}/`}
                onClick={closePreview}
                data-preview-focusable
                className="primary-cta primary-cta--sm primary-cta--glass group flex w-full items-center justify-between px-4 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                style={{
                  background: "linear-gradient(165deg, rgba(255,72,72,0.42) 0%, rgba(220,30,30,0.32) 45%, rgba(140,12,24,0.55) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 32px rgba(255,59,59,0.38), 0 0 8px rgba(255,59,59,0.55), 0 8px 24px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,72,72,0.35)",
                }}
              >
                <span>{t.previewFullDesc}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="relative order-first flex min-h-0 flex-col gap-4 overflow-y-auto p-6 lg:order-last lg:col-span-8 lg:p-7">
            <div className="flex items-center justify-between">
              <span />
              <button
                ref={closeRef}
                onClick={onClose}
                data-preview-focusable
                className="ghost-circle inline-flex h-10 w-10 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                aria-label={t.previewCloseAria}
              >
                X
              </button>
            </div>

            {/* Main image — capped so thumbnails never get cut */}
            <div className="preview-frame relative min-h-0 w-full flex-1 overflow-hidden rounded-[24px] bg-black/20" style={{ maxHeight: "58vh" }}>
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-contain saturate-[0.92] brightness-[0.9] transition"
                sizes="(max-width: 768px) 92vw, (max-width: 1280px) 36vw, 420px"
              />
              <div className="absolute inset-0 bg-black/38" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/64 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
            </div>

            {gallery.length > 1 ? (
              <div className="mt-3 shrink-0">
                <div className="scrollbar-glow flex gap-3 overflow-x-auto pb-2 max-md:snap-x max-md:snap-mandatory">
                  {gallery.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        data-preview-focusable
                        className={`preview-frame relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition ${
                          isActive
                            ? "opacity-100 ring-2 ring-glow/45"
                            : "opacity-70 ring-1 ring-white/5 hover:opacity-100 hover:ring-glow/30"
                        } max-md:snap-start`}
                        aria-label={`${t.previewGalleryAria}: ${item.alt}`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </div>
  );
}
