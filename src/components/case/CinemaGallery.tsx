"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

type GalleryItem = {
  id: string;
  title: string;
  desc: string;
  thumbSrc: string;
  fullSrc?: string;
};

type CinemaGalleryProps = {
  items: GalleryItem[];
};

export function CinemaGallery({ items }: CinemaGalleryProps) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const focusablesRef = useRef<HTMLElement[]>([]);
  const [mounted, setMounted] = useState(false);

  const safeItems = useMemo(
    () => items.filter((item) => item.thumbSrc),
    [items]
  );
  const total = safeItems.length;
  const active = safeItems[index];

  const fullSrc = active?.fullSrc || active?.thumbSrc;

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      const normalized = (nextIndex + total) % total;
      setIndex(normalized);
    },
    [total]
  );

  function openModal(nextIndex: number) {
    goTo(nextIndex);
    resetZoom();
    setIsOpen(true);
  }

  const preload = useCallback(
    (targetIndex: number) => {
      const normalized = (targetIndex + total) % total;
      const target = safeItems[normalized];
      if (!target?.fullSrc) return;
      if (typeof window === "undefined") return;
      const preloader = new window.Image();
      preloader.src = target.fullSrc;
    },
    [safeItems, total]
  );

  useEffect(() => {
    if (!isOpen) return;
    preload(index);
    preload(index - 1);
    preload(index + 1);
  }, [index, isOpen, preload]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "ArrowLeft") {
        goTo(index - 1);
      }
      if (event.key === "ArrowRight") {
        goTo(index + 1);
      }
      if (event.key === "Tab") {
        const focusables = focusablesRef.current;
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
  }, [goTo, index, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    focusablesRef.current = Array.from(
      document.querySelectorAll(
        "[data-cinema-focusable]"
      ) as NodeListOf<HTMLElement>
    );
  }, [isOpen]);

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (!isOpen) return;
    event.preventDefault();
    const next = Math.min(3, Math.max(1, scale + (event.deltaY < 0 ? 0.2 : -0.2)));
    setScale(next);
    if (next === 1) {
      setOffset({ x: 0, y: 0 });
    }
  }

  function zoomIn() {
    const next = Math.min(3, scale + 0.2);
    setScale(next);
  }

  function zoomOut() {
    const next = Math.max(1, scale - 0.2);
    setScale(next);
    if (next === 1) {
      setOffset({ x: 0, y: 0 });
    }
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

  if (safeItems.length === 0 || !active) {
    return null;
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-black/30 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur">
        <div className="relative aspect-video max-h-[620px] min-h-[240px] w-full">
          <div className="absolute left-6 top-6 z-20 text-xs uppercase tracking-[0.3em] text-neutral-300">
            Galeria
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0.15, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.1, y: -12 }}
              transition={{ duration: 0.28 }}
              className="absolute inset-0"
            >
              <button
                type="button"
                aria-label="Expandir imagem"
                className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                onClick={() => openModal(index)}
              />
              <Image
                src={active.thumbSrc}
                alt={active.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 80vw"
                priority={index === 0}
                quality={70}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,12,0.1),rgba(6,10,12,0.85))]" />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => openModal(index)}
            className="absolute right-6 bottom-6 z-20 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            aria-label="Ver em tela cheia"
          >
            Ver em tela cheia
          </button>

          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:-translate-y-[52%] hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            aria-label="Imagem anterior"
          >
            <span aria-hidden="true">{"<"}</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:-translate-y-[52%] hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            aria-label="Próxima imagem"
          >
            <span aria-hidden="true">{">"}</span>
          </button>

          <div className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.35em] text-mist/70 backdrop-blur">
            {index + 1}/{total}
          </div>
          <div className="absolute bottom-4 left-4 z-20 max-w-[86%] rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,16,0.6),rgba(10,14,16,0.9))] p-4 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">{active.title}</h3>
            <p className="mt-2 text-sm text-mist/80">{active.desc}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {safeItems.map((note, thumbIndex) => (
          <button
            key={note.id}
            type="button"
            onClick={() => openModal(thumbIndex)}
            aria-label={`Abrir ${note.title}`}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow cursor-zoom-in ${
              thumbIndex === index
                ? "border-glow/80"
                : "border-white/5 hover:border-glow/40"
            }`}
          >
            <Image
              src={note.thumbSrc}
              alt={note.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 140px"
              quality={70}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,12,0.05),rgba(8,9,12,0.5))]" />
          </button>
        ))}
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {isOpen && fullSrc ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Visualização em tela cheia"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative flex h-full w-full flex-col items-center justify-center px-4 py-10"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute right-6 top-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-300">
                <span>
                  {index + 1} / {total}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={zoomOut}
                    aria-label="Reduzir zoom"
                    data-cinema-focusable
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={zoomIn}
                    aria-label="Aumentar zoom"
                    data-cinema-focusable
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar visualização"
                  ref={closeButtonRef}
                  data-cinema-focusable
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
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
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                    transition: dragStart.current ? "none" : "transform 0.2s ease"
                  }}
                >
                  <Image
                    src={fullSrc}
                    alt={active.title}
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
                onClick={() => goTo(index - 1)}
                aria-label="Imagem anterior"
                data-cinema-focusable
                className="absolute left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Próxima imagem"
                data-cinema-focusable
                className="absolute right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              >
                {">"}
              </button>
            </motion.div>
          </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
