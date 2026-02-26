"use client";

import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { ProjectActions } from "@/components/ProjectActions";
import { previewProjects } from "@/data/projects";
import { useProjectPreview } from "@/state/projectPreview";

export function CasesGrid() {
  const { openPreview } = useProjectPreview();
  const items = previewProjects;

  return (
    <section id="cases" className="py-16">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-glow/70">Cases</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Explorar entregas</h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((project) => (
            <div
              key={project.slug}
              className="group flex min-h-[360px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#101010]/80 text-left transition hover:-translate-y-1 hover:border-glow/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="h-32 w-full">
                <img
                  src={project.thumb}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-glow/70">
                    {project.area} · {project.year} · {project.status}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  {project.description ? (
                    <p className="mt-3 text-sm text-mist/70">
                      {project.description}
                    </p>
                  ) : null}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>                <div className="mt-4">
                  <ProjectActions
                    slug={project.slug}
                    accessUrl={project.accessLinks?.[0]?.url}
                    onPreview={() => openPreview(project.slug)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
