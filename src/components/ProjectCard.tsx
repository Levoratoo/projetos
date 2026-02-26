"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Tag } from "@/components/Tag";
import { cn } from "@/lib/utils";

type Variant = "featured" | "grid";

type ProjectCardProps = {
  project: Project;
  variant?: Variant;
};

function buildCover(cover: Project["cover"]) {
  const glow = cover.c
    ? `, radial-gradient(circle at 50% 0%, ${cover.c}, transparent 60%)`
    : "";

  return `radial-gradient(circle at 20% 20%, ${cover.a}, transparent 60%), radial-gradient(circle at 80% 40%, ${cover.b}, transparent 55%)${glow}, linear-gradient(180deg, rgba(8,9,12,0.9), rgba(8,9,12,0.4))`;
}

export function ProjectCard({ project, variant = "grid" }: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <Link
        href={`/projetos/${project.slug}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/70 backdrop-blur transition",
          "hover:border-glow/40"
        )}
      >
        <div
          className={cn("relative overflow-hidden", isFeatured ? "h-56" : "h-44")}
          style={{ background: buildCover(project.cover) }}
        >
          <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.35em] text-white/70">
            {project.segment}
          </div>
        </div>
        <div className={cn("flex flex-1 flex-col gap-4 p-6", isFeatured && "p-7")}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-glow/70">
              {project.year} • Status: {project.status} • {project.type} • {project.domain}
            </p>
            <h3 className={cn("mt-2 font-semibold text-white", isFeatured ? "text-2xl" : "text-xl")}>
              {project.title}
            </h3>
            {isFeatured ? (
              <div className="mt-3 space-y-2 text-sm text-mist/75">
                <p>
                  <span className="text-mist/50">Problema:</span> {project.problem[0]}
                </p>
                <p>
                  <span className="text-mist/50">Abordagem:</span> {project.solution[0]}
                </p>
                <p>
                  <span className="text-mist/50">Resultado:</span> {project.results[0]}
                </p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-mist/75">{project.subtitle}</p>
            )}
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-glow/70">
            Ver case →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
