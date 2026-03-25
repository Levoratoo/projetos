"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { PreviewProject, projects as fullProjects } from "@/data/projects";
import { useProjectPreview } from "@/state/projectPreview";

// ── Dimensions ────────────────────────────────────────────────────────────────
const CARD_W = 168;
const CARD_H = 256;

// ── Entry positions: circular arc from left → top → right ────────────────────
// Angle -160° (left side) sweeps to 0° (right side) via top (-90°)
function getEntryPos(index: number, total: number) {
  const angleDeg = -160 + (index / (total - 1)) * 160;
  const angleRad = (angleDeg * Math.PI) / 180;
  const r = 1350;
  return {
    x: r * Math.cos(angleRad),
    y: r * Math.sin(angleRad), // negative = above screen
  };
}

// ── Peak position: card is right in front of the camera ──────────────────────
function getPeakPos(index: number, total: number) {
  const mid = (total - 1) / 2;
  return {
    x: (index - mid) * 36,
    y: (index - mid) * 10 - 16,
  };
}

// ── Final table layout: 11 cards scattered in 3 rows ─────────────────────────
const TABLE_POS = [
  { x: -268, y: -140, rotZ: -11 },
  { x:  -88, y: -154, rotZ:   5 },
  { x:   90, y: -148, rotZ:  -4 },
  { x:  272, y: -134, rotZ:   9 },
  { x: -184, y:    6, rotZ:   8 },
  { x:    0, y:   -9, rotZ:  -6 },
  { x:  184, y:   13, rotZ:  11 },
  { x: -268, y:  154, rotZ:  -9 },
  { x:  -88, y:  164, rotZ:   7 },
  { x:   92, y:  157, rotZ: -12 },
  { x:  268, y:  147, rotZ:   4 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function replaceAlpha(rgba: string, alpha: number): string {
  return rgba.replace(
    /rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/,
    `rgba($1,$2,$3,${alpha})`
  );
}

function getAccent(slug: string): string {
  const p = fullProjects.find((p) => p.slug === slug);
  return p?.cover.a ?? "rgba(100,150,255,0.5)";
}

// ── Single card ───────────────────────────────────────────────────────────────
interface CardProps {
  project: PreviewProject;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  selected: string | null;
  onSelect: (slug: string) => void;
}

function DeckCard({
  project,
  index,
  total,
  scrollYProgress,
  selected,
  onSelect,
}: CardProps) {
  const entry = getEntryPos(index, total);
  const peak = getPeakPos(index, total);
  const table = TABLE_POS[index] ?? { x: 0, y: 0, rotZ: 0 };
  const accent = getAccent(project.slug);

  // Each card has its own scroll window (staggered)
  const s0 = index * 0.043;                        // card begins moving
  const s1 = s0 + 0.068;                           // peak, right in front of camera
  const s2 = s0 + 0.18;                            // arcing down to table
  const s3 = Math.min(s0 + 0.27, 0.66);            // settled on table

  // 4-keyframe scroll-driven position
  const x = useTransform(
    scrollYProgress,
    [s0, s1, s2, s3],
    [entry.x, peak.x, table.x * 0.6, table.x]
  );
  const y = useTransform(
    scrollYProgress,
    [s0, s1, s2, s3],
    [entry.y, peak.y, table.y * 0.55, table.y]
  );
  const scale = useTransform(
    scrollYProgress,
    [s0, s1, s2, s3],
    [0.28, 2.15, 1.3, 1.0]
  );
  // Cards spin as they fly, slow and settle on landing
  const initRotZ = entry.x > 300 ? 22 : entry.x < -300 ? -22 : 0;
  const rotateZ = useTransform(
    scrollYProgress,
    [s0, s1, s2, s3],
    [initRotZ, 0, table.rotZ * 0.4, table.rotZ]
  );
  // Cards are invisible before their turn, fade in instantly as they start moving
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(s0 - 0.01, 0), s0 + 0.025],
    [0, 1]
  );

  const isSelected = selected === project.slug;
  const isFaded = selected !== null && !isSelected;
  const zBase = 50 - Math.abs(index - Math.floor(total / 2));

  return (
    // Outer: purely scroll-driven (x, y, scale, rotateZ never touched by animate)
    <motion.div
      style={{
        x,
        y,
        scale,
        rotateZ,
        opacity,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        width: CARD_W,
        height: CARD_H,
        zIndex: isSelected ? 200 : isFaded ? 5 : zBase,
      }}
    >
      {/* Inner: handles click/hover interaction */}
      <motion.div
        className="relative h-full w-full cursor-pointer"
        animate={
          isSelected ? { scale: 1.22, rotateZ: 0, y: -22 } : { scale: 1, y: 0 }
        }
        whileHover={
          !isSelected && !isFaded
            ? { scale: 1.1, y: -26, rotateZ: table.rotZ * 0.1 }
            : undefined
        }
        onClick={() => onSelect(project.slug)}
        transition={{ type: "spring", stiffness: 275, damping: 27 }}
      >
        {/* Card face */}
        <div
          className="relative h-full w-full overflow-hidden rounded-xl border bg-[#0d0d15]"
          style={{
            borderColor: isSelected
              ? replaceAlpha(accent, 0.65)
              : "rgba(255,255,255,0.08)",
            boxShadow: isSelected
              ? `0 0 55px ${replaceAlpha(accent, 0.42)}, 0 0 120px ${replaceAlpha(accent, 0.14)}`
              : "0 8px 32px rgba(0,0,0,0.7)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Thumbnail */}
          <div className="relative h-[57%] w-full overflow-hidden">
            <img
              src={project.thumb}
              alt={project.title}
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 38%, rgba(13,13,21,0.93) 100%)",
              }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-1 px-3 pb-3 pt-2.5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/30">
              {project.area} · {project.year}
            </span>
            <h3 className="line-clamp-2 text-[12.5px] font-semibold leading-snug text-white/90">
              {project.title}
            </h3>

            {isSelected && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
              >
                {project.description && (
                  <p className="mt-0.5 text-[10.5px] leading-relaxed text-white/52">
                    {project.description.length > 85
                      ? project.description.slice(0, 85) + "…"
                      : project.description}
                  </p>
                )}
                <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-wider text-sky-400/80">
                  Toque novamente →
                </span>
              </motion.div>
            )}
          </div>

          {/* Accent line at top */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: `linear-gradient(to right, transparent, ${replaceAlpha(accent, 0.85)}, transparent)`,
              opacity: isSelected ? 1 : 0.18,
              transition: "opacity 0.3s",
            }}
          />

          {/* Corner gradient */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${replaceAlpha(accent, 0.09)}, transparent 55%)`,
            }}
          />
        </div>

        {/* Dark overlay when another card is selected */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl bg-black"
          animate={{ opacity: isFaded ? 0.72 : 0 }}
          transition={{ duration: 0.24 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function ProjectCardDeck({
  projects: items,
}: {
  projects: PreviewProject[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const { openPreview } = useProjectPreview();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 2: entire stage tilts on X-axis, simulating camera looking down at table
  const tableRotateX = useTransform(scrollYProgress, [0.68, 0.93], [0, 52]);

  // Table surface fades in as tilt progresses
  const tableShineOpacity = useTransform(scrollYProgress, [0.7, 0.89], [0, 1]);

  // Scroll hint fades out quickly
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  function handleSelect(slug: string) {
    if (selected === slug) {
      openPreview(slug);
      setSelected(null);
    } else {
      setSelected(slug);
    }
  }

  return (
    // 300vh container: 200vh of actual scroll driving the animation
    <div ref={containerRef} id="home-chapters" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#07070e]">

        {/* Deep space ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(28,18,68,0.35) 0%, transparent 68%)",
          }}
        />

        {/* Subtle dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Section header, stays flat above the tilt */}
        <motion.div
          className="relative z-30 pt-14 text-center"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-white/22">
            Portfólio
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            O que foi construído
          </h2>

          {selected && (
            <motion.button
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelected(null)}
              className="mt-3 text-[11px] text-white/35 underline underline-offset-4 hover:text-white/65 transition-colors"
            >
              ← voltar
            </motion.button>
          )}
        </motion.div>

        {/* Perspective wrapper, needed for the 3D rotateX tilt effect */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1100px", perspectiveOrigin: "50% 68%" }}
        >
          {/* Tilting stage: flat during flight phase, tilts in Phase 2 */}
          <motion.div
            style={{ rotateX: tableRotateX }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Table surface, fades in as stage tilts */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ opacity: tableShineOpacity }}
            >
              {/* Warm dark wood gradient */}
              <div
                className="absolute inset-x-0 bottom-0 h-4/5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,7,4,0.96) 0%, rgba(15,11,7,0.65) 50%, transparent 100%)",
                }}
              />
              {/* Subtle grain lines */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(93deg, rgba(255,200,80,0.25) 0px, transparent 1px, transparent 8px)",
                }}
              />
              {/* Edge vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 110% 70% at 50% 80%, transparent 40%, rgba(4,3,2,0.8) 100%)",
                }}
              />
            </motion.div>

            {/* Cards live here */}
            <div
              className="relative"
              style={{ width: "100%", height: CARD_H + 320 }}
            >
              {items.map((project, index) => (
                <DeckCard
                  key={project.slug}
                  project={project}
                  index={index}
                  total={items.length}
                  scrollYProgress={scrollYProgress}
                  selected={selected}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/18">
            Role para explorar
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="h-6 w-px bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
