"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { previewProjects } from "@/data/projects";
import { tHome } from "@/i18n/home";
import { getLocalizedPreview } from "@/i18n/previewProjects";
import { useLocale } from "@/state/locale";

const FEATURED_SLUG = "musefy";

export function FeaturedProjectSection() {
  const { locale } = useLocale();
  const t = tHome(locale);
  const project = previewProjects.find((item) => item.slug === FEATURED_SLUG);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!project) return null;

  const lp = getLocalizedPreview(project, locale);
  const liveUrl = project.accessLinks?.[0]?.url ?? "https://musefy.com.br/";
  const gallery = project.gallery ?? [];
  const hero = gallery[activeIndex] ?? gallery[0] ?? { src: project.thumb, alt: lp.title };

  return (
    <section
      id="projeto-destaque"
      className="relative overflow-hidden bg-black py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 78% 42%, rgba(140,60,255,0.22), transparent 58%), radial-gradient(ellipse 45% 40% at 12% 75%, rgba(70,40,160,0.14), transparent 55%)"
        }}
      />

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

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:gap-14">
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
                    "0 0 28px rgba(140,80,255,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
                }}
              >
                {t.featuredCtaCase}
              </Link>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white/80 ring-1 ring-violet-400/20 transition hover:bg-white/[0.08] hover:text-white hover:ring-violet-300/35"
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
              className="absolute -inset-6 rounded-[36px] opacity-80 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(140,70,255,0.4), transparent 65%)"
              }}
            />

            {/* Soft purple frame — no white hairlines */}
            <div
              className="relative overflow-hidden rounded-[26px] bg-[#07040f] shadow-[0_40px_100px_rgba(0,0,0,0.65)]"
              style={{
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(160,100,255,0.18), inset 0 1px 0 rgba(180,140,255,0.08)"
              }}
            >
              <div className="flex items-center gap-1.5 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a2a55]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a2a55]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a2a55]" />
                <span className="ml-3 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] tracking-wide text-violet-200/55">
                  musefy.com.br
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hero.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <Image
                      src={hero.src}
                      alt={hero.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Soft vignette instead of hard white edges */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(7,4,15,0.35)_100%)]" />
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto px-4 py-4">
                  {gallery.map((item, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className="relative h-16 w-[108px] shrink-0 overflow-hidden rounded-xl transition duration-200"
                        style={{
                          boxShadow: isActive
                            ? "0 0 0 2px rgba(180,120,255,0.85), 0 0 22px rgba(140,80,255,0.45)"
                            : "0 0 0 1px rgba(140,100,255,0.12)",
                          opacity: isActive ? 1 : 0.55
                        }}
                        aria-label={`${t.previewGalleryAria}: ${item.alt}`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover object-top"
                          sizes="108px"
                        />
                        {isActive && (
                          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-violet-400 to-indigo-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
