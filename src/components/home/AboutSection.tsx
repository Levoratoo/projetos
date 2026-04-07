"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Quote, ExternalLink, Briefcase, Music2, Download } from "lucide-react";
import { useLocale } from "@/state/locale";
import { tAbout } from "@/i18n/about";
import { recommendationQuoteText } from "@/i18n/recommendationTranslations";
import {
  type CertItem,
  experiences,
  certifications,
  recommendations,
  LINKEDIN_RECOMMENDATIONS_URL,
} from "@/data/about";
import { Container } from "@/components/Container";
import { HomeCosmicBackdrop } from "@/components/home/HomeCosmicBackdrop";
import { withBasePath } from "@/lib/basePath";

/* ─── Motion helpers ─────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4, delay },
});

/* ─── Sub-heading ────────────────────────────────────────────────────────── */
function SubHeading({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.h3
      {...fadeIn(delay)}
      className="mb-6 font-display text-[20px] sm:text-[24px] uppercase tracking-[0.18em] text-white/85"
    >
      {children}
    </motion.h3>
  );
}

/* ─── Bio Block ──────────────────────────────────────────────────────────── */
function BioBlock() {
  const { locale } = useLocale();
  const t = tAbout(locale);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr] sm:gap-10 lg:gap-14 items-start">
      {/* Photo */}
      <motion.div {...fadeUp(0.04)} className="flex justify-center sm:justify-start">
        <div className="relative w-48 sm:w-full aspect-[3/4] sm:aspect-square overflow-hidden rounded-2xl border border-[rgba(255,88,88,0.25)] shadow-[0_0_40px_rgba(255,59,59,0.14),0_8px_32px_rgba(0,0,0,0.5)]">
          <Image
            src={withBasePath("/about/pedro.jpg")}
            alt="Pedro Levorato"
            fill
            sizes="(max-width: 640px) 192px, (max-width: 1024px) 240px, 260px"
            className="object-cover object-top"
            priority
          />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5 pt-1">
        <p className="font-body text-[14.5px] sm:text-[15px] leading-[1.75] text-white/68 max-w-[580px]">
          {t.bioText}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/pedrolevorato/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#c42838] bg-[#1a080c] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/90 transition-all duration-200 hover:border-[#ff4a5a] hover:bg-[#2a1018] hover:text-white"
          >
            <ExternalLink
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
            {t.linkedinCta}
          </a>

          <Link
            href={`/curriculo?lang=${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#8a2028] bg-[#120507] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/85 transition-all duration-200 hover:border-[#d03848] hover:bg-[#1c0c10] hover:text-white"
          >
            <Download
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden
            />
            {t.downloadCv}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,59,59,0.2),rgba(255,59,59,0.08)_50%,transparent)]" />
  );
}

/* ─── Experience Timeline ────────────────────────────────────────────────── */
function ExperienceTimeline() {
  const { locale } = useLocale();
  const t = tAbout(locale);

  return (
    <div className="relative pl-[52px]">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,rgba(255,59,59,0.6),rgba(255,59,59,0.15)_90%,transparent)]" />

      <div className="flex flex-col">
        {experiences.map((exp, i) => {
          const role = t[exp.roleKey as keyof typeof t] as string;
          const periodLabel = exp.current
            ? `${exp.period} → ${t.presentLabel}`
            : exp.period;

          const isMusic = exp.isMusic === true;

          return (
            <motion.div
              key={exp.id}
              {...fadeUp(i * 0.06)}
              className="relative pb-5 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute -left-[52px] flex items-center justify-center">
                <span
                  className={`flex h-[38px] w-[38px] items-center justify-center rounded-full border ${
                    isMusic
                      ? "border-[#a855f7] bg-[#2a0d45] shadow-[0_0_14px_rgba(168,85,247,0.35)]"
                      : exp.current
                      ? "border-[#e03848] bg-[#501018] shadow-[0_0_14px_rgba(255,59,59,0.3)]"
                      : "border-[#3a3438] bg-[#18161a]"
                  }`}
                >
                  {isMusic ? (
                    <Music2 className="h-4 w-4 text-[rgba(196,130,255,0.9)]" strokeWidth={1.7} />
                  ) : (
                    <Briefcase
                      className={`h-4 w-4 ${exp.current ? "text-[rgba(255,88,88,0.9)]" : "text-white/28"}`}
                      strokeWidth={1.7}
                    />
                  )}
                </span>
              </div>

              {/* Card */}
              <div
                className={`rounded-xl border px-4 py-3 ${
                  isMusic
                    ? "border-[#5c2d8a] bg-[#241038]"
                    : exp.current
                    ? "border-[#7a1824] bg-[#3a0c12]"
                    : "border-[#2a2628] bg-[#141214]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-[16px] sm:text-[18px] uppercase tracking-wide leading-tight text-white">
                    {role}
                  </p>
                  {isMusic && exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 rounded-full border border-[#8b5cf6] bg-[#2d1a4a] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d8b4fe] transition-all hover:bg-[#3d2460] hover:text-white"
                    >
                      <ExternalLink className="h-2.5 w-2.5" aria-hidden />
                      Press Kit
                    </a>
                  )}
                </div>
                <p
                  className={`mt-0.5 text-[12px] font-semibold leading-snug ${
                    isMusic
                      ? "text-[rgba(196,130,255,0.8)]"
                      : exp.current
                      ? "text-[rgba(255,88,88,0.85)]"
                      : "text-white/50"
                  }`}
                >
                  {exp.company}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/30">
                  {periodLabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function certKindLabel(kind: CertItem["kind"], t: ReturnType<typeof tAbout>): string {
  switch (kind) {
    case "credly":
      return t.certKindCredly;
    case "verify":
    case "pdf":
      return t.certKindVerify;
    default:
      return "";
  }
}

/* ─── Certifications ─────────────────────────────────────────────────────── */
function CertificationsGrid() {
  const { locale } = useLocale();
  const t = tAbout(locale);

  return (
    <div className="flex flex-col gap-3">
      {certifications.map((cert, i) => (
        <motion.a
          key={cert.id}
          {...fadeUp(0.05 + i * 0.06)}
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-[#6a1824] bg-[#2a080e] px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-colors duration-150 hover:border-[#c42838] hover:bg-[#3a1018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#8a2028] bg-[#4a0c16]">
            <Award className="h-[18px] w-[18px] text-[rgba(255,88,88,0.9)]" strokeWidth={1.6} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-white/90 leading-snug pr-1">{cert.name}</p>
            <p className="mt-0.5 text-[11px] text-white/45">
              {cert.issuer} · {certKindLabel(cert.kind, t)}
            </p>
          </div>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/35 transition-colors group-hover:text-[rgba(255,88,88,0.85)]" aria-hidden />
        </motion.a>
      ))}
    </div>
  );
}

/* ─── Recommendations ────────────────────────────────────────────────────── */
function RecommendationsBlock() {
  const { locale } = useLocale();
  const t = tAbout(locale);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((rec, i) => {
          const href = rec.authorUrl ?? LINKEDIN_RECOMMENDATIONS_URL;
          const ariaLabel = rec.authorUrl
            ? `${rec.author}, ${t.recAriaProfile}`
            : `${rec.author}, ${t.recAriaAll}`;
          return (
            <motion.a
              key={rec.id}
              {...fadeUp(0.08 + i * 0.04)}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[#2c282a] bg-[#141112] px-5 py-4 text-left shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-colors duration-200 hover:border-[#6a2028] hover:bg-[#1c181a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
            <Quote
              className="absolute right-3 top-3 h-12 w-12 rotate-180 text-[rgba(255,59,59,0.1)] transition-opacity group-hover:opacity-80"
              strokeWidth={1}
              aria-hidden
            />
            <div className="relative z-10 flex items-start justify-between gap-2">
              <p className="text-[13px] leading-[1.65] text-white/72 italic pr-2">
                &ldquo;{recommendationQuoteText(rec.id, rec.text, locale)}&rdquo;
              </p>
              <ExternalLink
                className="h-3.5 w-3.5 shrink-0 text-white/35 transition-colors group-hover:text-[rgba(255,88,88,0.85)]"
                aria-hidden
              />
            </div>
            <p className="relative z-10 mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[rgba(255,88,88,0.7)] group-hover:text-[rgba(255,88,88,0.95)]">
              {rec.author}
            </p>
            {rec.roleLine ? (
              <p className="relative z-10 mt-1 text-[10px] leading-snug text-white/40">
                {rec.roleLine}
              </p>
            ) : null}
            </motion.a>
          );
        })}
      </div>

      <motion.a
        {...fadeUp(0.12)}
        href={LINKEDIN_RECOMMENDATIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex w-fit items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[rgba(255,88,88,0.55)] transition-colors hover:text-[rgba(255,88,88,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow rounded-sm"
      >
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        {t.recSeeAllCta}
      </motion.a>
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────────────── */
function SectionHeader() {
  const { locale } = useLocale();
  const t = tAbout(locale);

  return (
    <motion.div {...fadeUp(0)} className="flex flex-col gap-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[rgba(255,88,88,0.65)]">
        {t.sectionKicker}
      </p>
      <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] uppercase leading-none tracking-tight text-white">
        {t.sectionTitle}
      </h2>
      <div className="mt-1.5 h-px w-14 bg-[linear-gradient(90deg,rgba(255,88,88,0.85),transparent)]" />
    </motion.div>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────────── */
export function AboutSection() {
  const { locale } = useLocale();
  const t = tAbout(locale);

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-black py-24 sm:py-28"
    >
      <HomeCosmicBackdrop />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,59,59,0.22)_40%,rgba(255,59,59,0.22)_60%,transparent)]" />

      <Container className="relative z-10 max-w-[1720px] px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-12 sm:gap-16">

          {/* 1 ── Section header */}
          <SectionHeader />

          {/* 2 ── Bio (photo + text) */}
          <BioBlock />

          <Divider />

          {/* 3 ── Main two-column grid: experience | certifications */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] lg:gap-16">

            {/* Left: Experience */}
            <div>
              <SubHeading delay={0.04}>{t.expSectionTitle}</SubHeading>
              <ExperienceTimeline />
            </div>

            {/* Right: Certifications */}
            <div>
              <SubHeading delay={0.08}>{t.certSectionTitle}</SubHeading>
              <CertificationsGrid />
            </div>
          </div>

          <Divider />

          {/* 4 ── Recommendations (full width below) */}
          <div>
            <SubHeading delay={0.06}>{t.recSectionTitle}</SubHeading>
            <RecommendationsBlock />
          </div>

        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,59,59,0.12)_40%,rgba(255,59,59,0.12)_60%,transparent)]" />
    </section>
  );
}
