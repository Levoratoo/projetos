"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/Container";

const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
).sort();
const allSegments = Array.from(new Set(projects.map((project) => project.segment))).sort();
const allYears = Array.from(new Set(projects.map((project) => project.year))).sort(
  (a, b) => b - a
);

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("Todos");
  const [segment, setSegment] = useState("Todos");
  const [year, setYear] = useState("Todos");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesTag = tag === "Todos" || project.tags.includes(tag);
      const matchesSegment = segment === "Todos" || project.segment === segment;
      const matchesYear =
        year === "Todos" || project.year === Number.parseInt(year, 10);

      return matchesQuery && matchesTag && matchesSegment && matchesYear;
    });
  }, [query, tag, segment, year]);

  return (
    <main>
      <section className="border-b border-white/5 py-16">
        <Container>
          <p className="text-xs uppercase tracking-[0.35em] text-glow/70">
            Projetos
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
            Vitrine completa de cases Printbag
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-mist/75 sm:text-base">
            Explore projetos por segmento, ano ou tema. Cada case é um estudo
            enxuto com resultados claros.
          </p>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr,1fr,1fr]">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-mist/60">
              Busca
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por título, tag ou descrição"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-glow/60"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-mist/60">
              Segmento
              <select
                value={segment}
                onChange={(event) => setSegment(event.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-glow/60"
              >
                <option>Todos</option>
                {allSegments.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-mist/60">
              Ano
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-glow/60"
              >
                <option>Todos</option>
                {allYears.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTag("Todos");
                  setSegment("Todos");
                  setYear("Todos");
                }}
                className="w-full rounded-xl border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-mist/70 transition hover:border-glow/50 hover:text-white"
              >
                Limpar filtros
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Todos", ...allTags].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTag(option)}
                aria-pressed={tag === option}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                  tag === option
                    ? "border-glow/60 bg-glow/10 text-glow"
                    : "border-white/10 text-mist/60 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-lg font-semibold text-white">
                Nenhum projeto encontrado
              </p>
              <p className="mt-3 text-sm text-mist/70">
                Ajuste os filtros ou limpe a busca para ver mais resultados.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
