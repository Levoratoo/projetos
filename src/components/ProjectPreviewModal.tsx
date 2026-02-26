"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProjectActions } from "@/components/ProjectActions";
import { ProjectProgress } from "@/components/ProjectProgress";
import { useProjectPreview } from "@/state/projectPreview";
import { previewProjects } from "@/data/projects";

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
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const { openPreview, closePreview } = useProjectPreview();

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

  const gallery = project.gallery ?? [];
  const hero = gallery[activeIndex] ?? { src: project.thumb, alt: project.title };
  const accessUrl = project.accessLinks?.[0]?.url ?? null;
  const kicker = `${project.area} · ${project.year} · ${project.status}`;
  const handleViewFull = () => {
    const href = `/projetos/${project.slug}`;
    closePreview();
    window.requestAnimationFrame(() => {
      router.push(href);
    });
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-xl saturate-150"
      role="dialog"
      aria-modal="true"
      aria-label="Prévia do projeto"
      onClick={onClose}
    >
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]" />
      <div
        className={`relative w-[min(1200px,92vw)] h-[86vh] max-h-[860px] overflow-hidden rounded-3xl border border-white/10 bg-[#0f1211] shadow-[0_40px_120px_rgba(0,0,0,0.65)] transition-all duration-200 ${
          entered || reducedMotion ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        } max-md:h-[92vh]`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(86,255,146,0.12),transparent_55%)]" />
        <div className="grid h-full grid-cols-1 gap-0 lg:grid-cols-12">
          <div className="relative order-last flex h-full flex-col p-6 md:p-8 lg:order-first lg:col-span-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                  {kicker}
                </p>
                <h3 className="mt-3 text-[clamp(22px,2.8vw,32px)] font-semibold leading-[1.05] text-white">
                  <span className="shineText shineTextProject">{project.title}</span>
                </h3>
              </div>
            </div>

            {project.description ? (
              <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/80 line-clamp-4">
                {project.description}
              </p>
            ) : null}
            <ProjectProgress
              value={project.progress}
              size="sm"
              showLabel={false}
              className="mt-4 max-w-[240px]"
            />

            {project.bullets ? (
              <div className="mt-6 rounded-2xl border-l-2 border-emerald-300/50 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                  Destaques
                </p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                  {project.bullets.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-mist/70">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-auto border-t border-white/10 bg-black/30 backdrop-blur-md pt-5 pb-4">
              <ProjectActions
                slug={project.slug}
                accessUrl={accessUrl}
                onPreview={() => openPreview(project.slug)}
                onViewFull={handleViewFull}
                className="[&>button:first-child]:hidden"
              />
            </div>
          </div>

          <div className="relative order-first flex h-full flex-col gap-4 border-b border-white/10 p-6 md:border-b-0 md:border-l md:border-white/10 lg:order-last lg:col-span-8 lg:p-7">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.3em] text-mist/60">
                Preview
              </p>
              <button
                ref={closeRef}
                onClick={onClose}
                data-preview-focusable
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition hover:border-glow/40 hover:bg-white/10 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                aria-label="Fechar pr?via"
              >
                X
              </button>
            </div>

            <div className="flex flex-1">
              <div className="relative w-full flex-1 min-h-[42vh] max-h-[70vh] overflow-hidden rounded-2xl border border-white/10 bg-black/20 aspect-[16/10]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  className="object-contain saturate-[0.9] brightness-[0.9] transition"
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 36vw, 420px"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>

            {gallery.length > 1 ? (
              <div className="mt-1">
                <div className="flex gap-3 overflow-x-auto pb-2 max-md:snap-x max-md:snap-mandatory">
                  {gallery.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        data-preview-focusable
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                          isActive
                            ? "border-emerald-300/60 opacity-100 ring-1 ring-emerald-300/40"
                            : "border-white/10 opacity-70 hover:opacity-100 hover:border-emerald-300/40"
                        } max-md:snap-start`}
                        aria-label={`Visualizar ${item.alt}`}
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
                <p className="mt-2 text-xs text-mist/60">
                  Toque em uma miniatura para trocar a tela.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
