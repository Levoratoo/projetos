"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ProjectActions } from "@/components/ProjectActions";
import { useProjectPreview } from "@/state/projectPreview";
import { Project } from "@/data/projects";
import { Tag } from "@/components/Tag";

type CasePreviewDrawerProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
};

export function CasePreviewDrawer({
  open,
  project,
  onClose
}: CasePreviewDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const { openPreview } = useProjectPreview();
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const accessUrl = useMemo(
    () => project?.accessLinks?.[0]?.url ?? null,
    [project]
  );

  const galleryItems = useMemo(() => {
    return (
      project?.gallery?.map((item, idx) => ({
        id: `${project.slug}-${idx}`,
        title: item.title,
        desc: item.description,
        thumbSrc: item.thumbSrc || item.fullSrc || "",
        fullSrc: item.fullSrc || item.thumbSrc
      })) ?? []
    );
  }, [project]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (galleryOpen) {
          setGalleryOpen(false);
          return;
        }
        onClose();
      }
      if (galleryOpen && event.key === "ArrowLeft") {
        goToGallery(galleryIndex - 1);
      }
      if (galleryOpen && event.key === "ArrowRight") {
        goToGallery(galleryIndex + 1);
      }
      if (event.key === "Tab") {
        const focusables = Array.from(
          document.querySelectorAll(
            "[data-drawer-focusable]"
          ) as NodeListOf<HTMLElement>
        );
        if (focusables.length === 0) return;
        const currentIndex = focusables.indexOf(
          document.activeElement as HTMLElement
        );
        const nextIndex = event.shiftKey
          ? (currentIndex - 1 + focusables.length) % focusables.length
          : (currentIndex + 1) % focusables.length;
        focusables[nextIndex]?.focus();
        event.preventDefault();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [galleryIndex, galleryOpen, onClose, open]);

  function resetZoom() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  function openGallery(index: number) {
    setGalleryIndex(index);
    resetZoom();
    setGalleryOpen(true);
  }

  function goToGallery(nextIndex: number) {
    if (galleryItems.length === 0) return;
    const normalized = (nextIndex + galleryItems.length) % galleryItems.length;
    setGalleryIndex(normalized);
    resetZoom();
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (!galleryOpen) return;
    event.preventDefault();
    const next = Math.min(3, Math.max(1, scale + (event.deltaY < 0 ? 0.2 : -0.2)));
    setScale(next);
    if (next === 1) setOffset({ x: 0, y: 0 });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (scale <= 1) return;
    dragStart.current = { x: event.clientX - offset.x, y: event.clientY - offset.y };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragStart.current) return;
    setOffset({
      x: event.clientX - dragStart.current.x,
      y: event.clientY - dragStart.current.y
    });
  }

  function handlePointerUp() {
    dragStart.current = null;
  }

  useEffect(() => {
    if (!galleryOpen || galleryItems.length === 0) return;
    const nextIndex = (galleryIndex + 1) % galleryItems.length;
    const next = galleryItems[nextIndex];
    if (!next?.fullSrc && !next?.thumbSrc) return;
    const preloader = new window.Image();
    preloader.src = next.fullSrc || next.thumbSrc;
  }, [galleryIndex, galleryItems, galleryOpen]);

  if (!open || !project) return null;

  const heroImage = galleryItems[0];
  const hasGallery = galleryItems.length > 0 && heroImage?.thumbSrc;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-stretch md:justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Pré-visualização do case"
      onClick={onClose}
    >
      <div
        className="relative h-[85vh] w-full max-w-xl rounded-t-3xl border border-white/10 bg-[#0f1211] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:h-full md:rounded-none md:rounded-l-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        {hasGallery ? (
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black/60">
            <div className="relative aspect-video">
              <button
                type="button"
                onClick={() => openGallery(0)}
                aria-label="Abrir preview em tela cheia"
                className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              />
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center opacity-40 blur-2xl"
                style={{ backgroundImage: `url(${heroImage.thumbSrc})` }}
              />
              <Image
                src={heroImage.thumbSrc}
                alt={heroImage.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={70}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,14,0.2),rgba(10,12,14,0.85))]" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-neutral-200">
                Preview
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-glow/70">
              {project.domain} · {project.year} · {project.status}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              <span className="shineText shineTextProject">{project.title}</span>
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            ref={closeButtonRef}
            data-drawer-focusable
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-glow/40 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            aria-label="Fechar pré-visualização"
          >
            ✕
          </button>
        </div>

        {hasGallery ? (
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {galleryItems.slice(0, 6).map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openGallery(idx)}
                className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 transition hover:border-glow/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                aria-label={`Abrir ${item.title}`}
              >
                <Image
                  src={item.thumbSrc}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                  quality={70}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,12,0.05),rgba(8,9,12,0.5))]" />
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-6 space-y-6 overflow-y-auto pr-2 text-sm text-neutral-300">
          <section>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Visão geral
            </p>
            <p className="mt-2 text-sm text-neutral-300">{project.summary}</p>
          </section>
          <section>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Onde estava o ruído
            </p>
            <ul className="mt-2 space-y-2">
              {project.problem.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              O que foi entregue
            </p>
            <ul className="mt-2 space-y-2">
              {project.solution.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Impacto
            </p>
            <ul className="mt-2 space-y-2">
              {project.results.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 mt-6 border-t border-white/10 bg-[#0f1211]/95 pt-4">
          <ProjectActions
            slug={project.slug}
            accessUrl={accessUrl}
            onPreview={() => openPreview(project.slug)}
            className="flex-wrap"
          />
        </div>
      </div>

      {mounted && hasGallery && galleryOpen
        ? createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria em tela cheia"
          onClick={() => setGalleryOpen(false)}
        >
          <div
            className="relative flex h-full w-full flex-col items-center justify-center px-4 py-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute right-6 top-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-300">
              <span>
                {galleryIndex + 1} / {galleryItems.length}
              </span>
              <button
                type="button"
                onClick={resetZoom}
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-black/60 px-4 text-[11px] uppercase tracking-[0.24em] text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                aria-label="Resetar zoom"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setGalleryOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                aria-label="Fechar galeria"
              >
                X
              </button>
            </div>

            <div
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onDoubleClick={resetZoom}
            >
              <div
                className="relative h-full w-full"
                style={{
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                  transition: dragStart.current ? "none" : "transform 0.2s ease"
                }}
              >
                <Image
                  src={galleryItems[galleryIndex].fullSrc || galleryItems[galleryIndex].thumbSrc}
                  alt={galleryItems[galleryIndex].title}
                  fill
                  sizes="100vw"
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => goToGallery(galleryIndex - 1)}
              aria-label="Imagem anterior"
              className="absolute left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={() => goToGallery(galleryIndex + 1)}
              aria-label="Próxima imagem"
              className="absolute right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              {">"}
            </button>
          </div>
        </div>
            ,
            document.body
          )
        : null}
    </div>
  );
}
