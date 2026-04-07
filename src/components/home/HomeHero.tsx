"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Container } from "@/components/Container";
import { HomeCosmicBackdrop } from "@/components/home/HomeCosmicBackdrop";
import { HeroMotion } from "@/components/HeroMotion";
import { tHome } from "@/i18n/home";
import { useLocale } from "@/state/locale";

export function HomeHero() {
  const { locale } = useLocale();
  const t = tHome(locale);
  const heroChips = useMemo(
    () =>
      ["Next.js", "TypeScript", "SQL Server", "Dashboards", t.heroChipAutomation] as const,
    [t.heroChipAutomation]
  );

  return (
    <section className="home-hero relative isolate min-h-screen overflow-hidden pt-8">
      <HomeCosmicBackdrop />

      <HeroMotion className="relative z-10 flex min-h-screen w-full items-center py-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] tech-grid" />
        <Container className="relative w-full max-w-[1720px] px-6 sm:px-8 lg:px-10">
          <div className="relative flex min-h-[calc(100vh-40px)] items-center translate-y-0 opacity-100">
            <div className="relative z-10 w-full max-w-[min(100%,1180px)] xl:max-w-[min(100%,1280px)] 2xl:max-w-[min(100%,1380px)]">
              <p
                className="text-[11px] uppercase tracking-[0.46em] text-white/66 sm:text-xs"
              >
                {t.heroKicker}
              </p>

              <h1
                className="mt-8 flex flex-col gap-3 font-body text-[clamp(64px,8vw,118px)] font-[500] leading-[1.02] tracking-[-0.055em] text-white sm:mt-10 sm:gap-4 sm:leading-[1.04] lg:flex-row lg:flex-wrap lg:items-baseline lg:gap-x-5 lg:gap-y-2 xl:gap-x-7 pb-[0.08em] overflow-visible"
              >
                <span className="block whitespace-nowrap text-white/96 [text-shadow:0_0_20px_rgba(255,200,200,0.12)] max-sm:whitespace-normal lg:inline">
                  {t.heroTitleA}
                </span>
                <span className="block bg-[linear-gradient(90deg,#fff5f5_0%,#ffd0d0_40%,#ff4a4a_100%)] bg-clip-text text-transparent [text-shadow:0_0_28px_rgba(255,59,59,0.2)] lg:inline">
                  {t.heroTitleB}
                </span>
              </h1>

              <div>
                <p className="mt-10 max-w-[min(58ch,92vw)] text-[clamp(18px,1.5vw,22px)] leading-[1.65] text-mist/74 sm:mt-12 lg:max-w-[min(62ch,85vw)]">
                  {t.heroSubtitle}
                </p>

                <div className="mt-10 flex max-w-full flex-wrap gap-x-4 gap-y-3 sm:mt-12 sm:gap-x-5 sm:gap-y-4 xl:max-w-[960px]">
                  {heroChips.map((chip) => (
                    <span
                      key={chip}
                      className="hero-chip min-h-[44px] px-4 py-2 text-[11px] tracking-[0.24em] sm:text-[12px]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-12 sm:mt-14">
                  <Link
                    href="#home-chapters"
                    className="primary-cta primary-cta--glass px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.3em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow sm:w-auto"
                  >
                    {t.heroCta}
                    <span aria-hidden className="text-base">
                      -&gt;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </HeroMotion>

      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60">
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-white/20 bg-black/20">
          <span
            className="mt-2 h-2 w-2 rounded-full bg-glow transition motion-safe:animate-bounce"
          />
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/45">
          {t.heroScroll}
        </p>
      </div>
    </section>
  );
}
