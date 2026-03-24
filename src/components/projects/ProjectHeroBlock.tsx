"use client";

import Image from "next/image";
import { ProjectActions } from "@/components/ProjectActions";
import { ProjectProgress } from "@/components/ProjectProgress";
import { type PreviewProject } from "@/data/projects";
import { useProjectPreview } from "@/state/projectPreview";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/basePath";

function buildTags(project: PreviewProject) {
  return [
    `Área: ${project.area}`,
    `Ano: ${project.year}`,
    `Status: ${project.status}`,
    ...(project.tags.length ? [`Tags: ${project.tags.join(" / ")}`] : [])
  ];
}

type ProjectHeroBlockProps = {
  project: PreviewProject;
  variant?: "home" | "detail";
  priorityImage?: boolean;
};

export function ProjectHeroBlock({
  project,
  variant = "home",
  priorityImage = false
}: ProjectHeroBlockProps) {
  const { openPreview } = useProjectPreview();
  const access = project.accessLinks?.[0];
  const isHome = variant === "home";

  return (
    <div
      className={cn(
        "section-shell rounded-[32px]",
        isHome ? "p-10 md:p-12 lg:p-14" : "p-8 md:p-12"
      )}
    >
      <div
        className={cn(
          "grid gap-10 lg:items-start",
          isHome ? "lg:grid-cols-12 lg:gap-12" : "lg:grid-cols-[1.1fr,0.9fr]"
        )}
      >
        <div className={cn(isHome && "lg:col-span-7 2xl:col-span-8")}>
          <p className="text-xs uppercase tracking-[0.35em] text-glow/75">
            LEVORATO PROJECTS
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-mist/52">
            {project.area} · {project.title} · {project.area}
          </p>
          <h2
            className={cn(
              "mt-4 font-display uppercase leading-[0.94] tracking-[0.04em] text-white",
              isHome ? "text-[clamp(32px,3.8vw,56px)]" : "text-[clamp(28px,3.6vw,44px)]"
            )}
          >
            <span className="shineText shineTextProject underline-flame">{project.title}</span>
          </h2>
          {project.description ? (
            <p
              className={cn(
                "mt-6 text-mist/76",
                isHome ? "text-base sm:text-lg" : "text-sm sm:text-base"
              )}
            >
              {project.description}
            </p>
          ) : null}
          {project.bullets?.length ? (
            <p className={cn("mt-4 text-mist/80", isHome ? "text-base" : "text-sm")}>
              {project.bullets[0]}
            </p>
          ) : null}

          <div
            className={cn(
              "mt-7 flex flex-wrap gap-3 uppercase tracking-[0.25em] text-mist/70",
              isHome ? "text-[clamp(12px,1.1vw,14px)]" : "text-[11px]"
            )}
          >
            {buildTags(project).map((tag) => (
              <span key={tag} className={cn("data-chip", isHome ? "px-4 py-2" : "px-3 py-1")}>
                {tag}
              </span>
            ))}
          </div>
          <ProjectProgress
            value={project.progress}
            size={isHome ? "md" : "sm"}
            className="mt-6 max-w-[320px]"
          />
        </div>

        <div
          className={cn(
            "relative overflow-hidden rounded-3xl bg-[linear-gradient(180deg,rgba(17,7,9,0.86),rgba(8,3,4,0.9))] shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
            isHome ? "p-6 md:p-7 lg:p-8 lg:col-span-5 2xl:col-span-4" : "p-5"
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,62,62,0.16),transparent_28%)]" />
          <p className="relative text-xs uppercase tracking-[0.3em] text-mist/70">
            Preview do projeto
          </p>
          <div className="relative mt-4 w-full max-w-[520px]">
            <div className="preview-frame relative aspect-square w-full overflow-hidden rounded-2xl bg-black/20">
              <Image
                src={project.thumb || withBasePath("/projects/_placeholders/cover.svg")}
                alt={project.title}
                fill
                className="object-cover"
                priority={priorityImage}
                loading={priorityImage ? "eager" : "lazy"}
                sizes="(max-width: 1024px) 90vw, 520px"
              />
            </div>
          </div>
          <div className={cn("relative", isHome ? "mt-6" : "mt-4")}>
            <ProjectActions
              slug={project.slug}
              accessUrl={access?.url}
              onPreview={() => openPreview(project.slug)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
