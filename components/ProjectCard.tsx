"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { Tag } from "@/components/Tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group h-full"
    >
      <Link
        href={`/projetos/${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/70 backdrop-blur"
      >
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background: `radial-gradient(circle at 20% 20%, hsla(${project.cover.hue}, 90%, 60%, 0.45), transparent 60%), radial-gradient(circle at 80% 40%, hsla(${project.cover.hue + 40}, 90%, 55%, 0.35), transparent 55%), linear-gradient(180deg, rgba(8,9,12,0.9), rgba(8,9,12,0.4))`
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.35em] text-white/70">
            {project.cover.title}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-glow/70">
              {project.segment} · {project.year}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-mist/75">{project.excerpt}</p>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
