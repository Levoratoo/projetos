"use client";

import Link from "next/link";
import { Container } from "@/components/Container";

type CallToActionRequestProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  href?: string;
};

export function CallToActionRequest({
  eyebrow = "SOLICITAR PROJETO",
  title = "Solicitação interna",
  description = "Abra o fluxo interno para iniciar a solicitação.",
  ctaLabel = "FAZER SOLICITAÇÃO",
  href = "/solicitar"
}: CallToActionRequestProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur sm:p-10">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70">
                {eyebrow}
              </p>
              <h2 className="mt-3 text-[clamp(22px,3vw,32px)] font-semibold text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm text-mist/80 sm:text-base">
                {description}
              </p>
            </div>
            <Link
              href={href}
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink shadow-[0_12px_30px_rgba(74,222,128,0.2)] transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-[0_18px_40px_rgba(74,222,128,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow sm:w-auto"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
