"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { previewProjects } from "@/data/projects";
import { tHome } from "@/i18n/home";
import { getLocalizedPreview } from "@/i18n/previewProjects";
import { useLocale } from "@/state/locale";

const FEATURED_SLUG = "musefy";

export function FeaturedProjectSection() {
  const { locale } = useLocale();
  const t = tHome(locale);
  const project = previewProjects.find((item) => item.slug === FEATURED_SLUG);
  if (!project) return null;

  const lp = getLocalizedPreview(project, locale);
  const liveUrl = project.accessLinks?.[0]?.url ?? "https://musefy.com.br/";
  const gallery = project.gallery ?? [];
  const hero = gallery[0] ?? { src: project.thumb, alt: lp.title };

  return (
    <section
      id="projeto-destaque"
      className="relative overflow-hidden border-y border-white/[0.06] bg-black py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 75% 40%, rgba(140,60,255,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 15% 80%, rgba(60,40,140,0.12), transparent 55%)"
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] tech-grid" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 2xl:px-12">
        <motion.p
          className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c4a0ff]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {t.featuredKicker}
        </motion.p>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/35">
              {lp.area} · {project.year} · {lp.statusLabel}
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              MuseFy
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              {lp.description}
            </p>

            {lp.bullets && lp.bullets.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {lp.bullets.slice(0, 4).map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-snug text-white/45"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, #b47cff, #6a8cff)",
                        boxShadow: "0 0 10px rgba(160,100,255,0.55)"
                      }}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/projetos/${project.slug}/`}
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(160,90,255,0.95), rgba(90,120,255,0.9))",
                  boxShadow:
                    "0 0 28px rgba(140,80,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)"
                }}
              >
                {t.featuredCtaCase}
              </Link>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
              >
                {t.featuredCtaLive}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div
              className="absolute -inset-4 rounded-[32px] opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(140,70,255,0.35), transparent 65%)"
              }}
            />
            <div className="relative overflow-hidden rounded-[24px] border border-white/12 bg-[#0a0612] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-1.5 border-b border-white/8 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[10px] tracking-wide text-white/25">
                  musefy.com.br
                </span>
              </div>
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-t border-white/8 p-3">
                  {gallery.slice(0, 4).map((item) => (
                    <div
                      key={item.src}
                      className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover object-top"
                        sizes="96px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
