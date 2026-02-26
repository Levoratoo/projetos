"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

type LightboxImage = {
  thumbSrc: string;
  fullSrc?: string;
  alt: string;
  caption?: string;
};

type LightboxModalProps = {
  open: boolean;
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function LightboxModal({
  open,
  images,
  index,
  onClose,
  onPrev,
  onNext
}: LightboxModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const focusablesRef = useRef<HTMLElement[]>([]);
  const [mounted, setMounted] = useState(false);

  const activeImage = images[index];
  const total = images.length;

  const fullSrc = activeImage?.fullSrc || activeImage?.thumbSrc;

  const preload = useCallback(
    (targetIndex: number) => {
      const normalized = (targetIndex + total) % total;
      const target = images[normalized];
      if (!target?.fullSrc) return;
      if (typeof window === "undefined") return;
      const preloader = new window.Image();
      preloader.src = target.fullSrc;
    },
    [images, total]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    preload(index);
    preload(index - 1);
    preload(index + 1);
  }, [index, open, preload]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        onPrev();
      }
      if (event.key === "ArrowRight") {
        onNext();
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
  }, [onClose, onNext, onPrev, open]);

  useEffect(() => {
    if (!open) return;
    focusablesRef.current = Array.from(
      document.querySelectorAll(
        "[data-lightbox-focusable]"
      ) as NodeListOf<HTMLElement>
    );
  }, [open]);

  return mounted
    ? createPortal(
        <AnimatePresence>
          {open && activeImage ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 py-12"
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
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar visualização"
                data-lightbox-focusable
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              >
                X
              </button>
            </div>

            <div className="relative flex h-full w-full items-center justify-center">
              {fullSrc ? (
                <NextImage
                  src={fullSrc}
                  alt={activeImage.alt}
                  fill
                  sizes="100vw"
                  quality={100}
                  className="object-contain"
                  priority
                />
              ) : null}
            </div>

            {activeImage.caption ? (
              <div className="mt-4 text-center text-sm text-neutral-300">
                {activeImage.caption}
              </div>
            ) : null}

            <button
              type="button"
              onClick={onPrev}
              aria-label="Imagem anterior"
              data-lightbox-focusable
              className="absolute left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition duration-200 hover:border-glow/50 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Próxima imagem"
              data-lightbox-focusable
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
    : null;
}
