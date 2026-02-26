"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 sm:pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(166,255,179,0.2),_transparent_55%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-glow/70">
            Vitrine de Projetos
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-6xl">
            Cases premium com foco em performance e impacto real.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-mist/80 sm:text-lg">
            A Printbag cria experiências digitais e materiais de apresentação que
            elevam marcas de embalagem ao próximo nível. Cada projeto nasce de
            dados, clareza e estética de produto.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projetos"
              className="rounded-full bg-glow px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink transition hover:opacity-90"
            >
              Ver projetos
            </Link>
            <a
              href="#contato"
              className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-glow/60 hover:text-white"
            >
              Falar com a Printbag
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
