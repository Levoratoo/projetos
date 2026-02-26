"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectActions } from "@/components/ProjectActions";
import { previewProjects } from "@/data/projects";
import { useProjectPreview } from "@/state/projectPreview";

const motionProps = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: "easeOut" },
  viewport: { amount: 0.4, once: false }
};

type ProjectChapterProps = {
  project: (typeof previewProjects)[number];
  priority?: boolean;
};

export function ProjectChapter({ project, priority }: ProjectChapterProps) {
  const { openPreview } = useProjectPreview();
  const access = project.accessLinks?.[0];

  return (
    <section className="snap-start min-h-screen py-16 sm:py-20">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <motion.div {...motionProps}>
            <p className="text-xs uppercase tracking-[0.35em] text-glow/70">
              {project.area} · {project.year} · {project.status}
            </p>
            <h2 className="mt-4 text-[clamp(28px,3.4vw,44px)] font-semibold text-white">
              <span className="shineText shineTextProject">{project.title}</span>
            </h2>
            {project.description ? (
              <p className="mt-4 text-sm text-mist/80 sm:text-base">
                {project.description}
              </p>
            ) : null}

            {project.bullets?.length ? (
              <ul className="mt-5 space-y-2 text-sm text-mist/80">
                {project.bullets.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-mist/70">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...motionProps} className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <p className="text-xs uppercase tracking-[0.3em] text-mist/70">
              Preview do projeto
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={project.thumb}
                alt={project.title}
                width={960}
                height={540}
                className="h-auto w-full object-cover"
                priority={priority}
              />
            </div>
            <div className="mt-4">
              <ProjectActions
                slug={project.slug}
                accessUrl={access?.url}
                onPreview={() => openPreview(project.slug)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
