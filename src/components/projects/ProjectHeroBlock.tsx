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
        "rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur",
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
          <p className="text-xs uppercase tracking-[0.35em] text-glow/70">
            WEISUL PROJECTS
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-mist/60">
            {project.area} · {project.title} · {project.area}
          </p>
          <h2
            className={cn(
              "mt-4 font-semibold text-white",
              isHome ? "text-[clamp(32px,3.8vw,56px)]" : "text-[clamp(28px,3.6vw,44px)]"
            )}
          >
            <span className="shineText shineTextProject">{project.title}</span>
          </h2>
          {project.description ? (
            <p
              className={cn(
                "mt-4 text-mist/80",
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
              <span
                key={tag}
                className={cn(
                  "rounded-full border border-white/10 bg-white/5",
                  isHome ? "px-4 py-2" : "px-3 py-1"
                )}
              >
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
            "rounded-3xl border border-white/10 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
            isHome ? "p-6 md:p-7 lg:p-8 lg:col-span-5 2xl:col-span-4" : "p-5"
          )}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-mist/70">
            Preview do projeto
          </p>
          <div className="mt-4 w-full max-w-[520px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
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
          <div className={cn(isHome ? "mt-6" : "mt-4")}>
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
