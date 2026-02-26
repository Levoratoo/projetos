import { Project } from "@/data/projects";
import { ProjectProgress } from "@/components/ProjectProgress";

export function ProjectCaseHeader({ project }: { project: Project }) {
  const dataSources = [
    project.stack.includes("SQL Server") ? "SQL Server" : null,
    project.stack.includes("Metrics") ? "Metrics" : null
  ].filter(Boolean) as string[];
  const dataSourceLabel =
    dataSources.length > 0
      ? `Fonte de dados: ${dataSources.join(" / ")}`
      : "Fonte de dados: SQL Server / Metrics (placeholder)";
  const tagLabel =
    project.tags.length > 0
      ? `Tags: ${project.tags.slice(0, 3).join(" / ")}`
      : "Tags: (placeholder)";
  const stackLabel =
    project.stack.length > 0
      ? `Stack: ${project.stack.slice(0, 2).join(" / ")}`
      : "Stack: (placeholder)";

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
        {project.domain} · {project.type} · {project.segment}
      </p>
      <h1 className="mt-4 text-[clamp(28px,4vw,44px)] font-semibold text-white">
        <span className="shineText shineTextProject">{project.title}</span>
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-neutral-300 sm:text-base">
        {project.subtitle}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
        {project.summary}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
        {project.description}
      </p>
      <ProjectProgress value={project.progress} size="lg" className="mt-6 max-w-[360px]" />
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-neutral-300">
          Área: {project.domain}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-neutral-300">
          Ano: {project.year}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-neutral-300">
          Status: {project.status}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-neutral-300">
          {tagLabel}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-neutral-300">
          {stackLabel}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-neutral-300">
          {dataSourceLabel}
        </span>
      </div>
    </div>
  );
}
