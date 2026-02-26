"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { Tag } from "@/components/Tag";
import { filterProjects, uniqueTags, uniqueYears } from "@/lib/utils";

const sortOptions = [
  { label: "Mais recente", value: "recent" },
  { label: "Mais relevante", value: "relevant" }
];

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("Todos");
  const [year, setYear] = useState("Todos");
  const [sortBy, setSortBy] = useState("recent");

  const tags = useMemo(() => uniqueTags(projects), []);
  const years = useMemo(() => uniqueYears(projects), []);

  const filtered = useMemo(() => {
    const base = filterProjects(projects, { query, tag, year });
    if (sortBy === "recent") {
      return [...base].sort((a, b) => b.year - a.year);
    }
    return base;
  }, [query, tag, year, sortBy]);

  return (
    <main>
      <section className="border-b border-white/5 py-16">
        <Container>
          <p className="text-xs uppercase tracking-[0.35em] text-glow/70">
            Cases técnicos
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">
                Integrações, dashboards e governança de dados
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-mist/75 sm:text-base">
                Projetos reais focados em rastreabilidade, operação e previsibilidade
                para times técnicos e de gestão.
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-mist/70">
              {projects.length} projetos
            </span>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <SearchBar value={query} onChange={setQuery} />
            <div className="grid gap-6">
              <Filters
                tags={tags}
                years={years}
                activeTag={tag}
                activeYear={year}
                onTagChange={setTag}
                onYearChange={setYear}
                onReset={() => {
                  setQuery("");
                  setTag("Todos");
                  setYear("Todos");
                }}
              />
              <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-mist/60">
                Ordenação
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-glow/60 focus:ring-1 focus:ring-glow/40"
                  aria-label="Ordenar projetos"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Todos", ...tags].map((option) => (
              <Tag
                key={option}
                label={option}
                asButton
                active={tag === option}
                onClick={() => setTag(option)}
              />
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
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setTag("Todos");
                    setYear("Todos");
                  }}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-mist/70 transition hover:border-glow/40 hover:text-white"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06 }
                }
              }}
              className="grid gap-6 md:grid-cols-2"
            >
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                >
                  <ProjectCard project={project} variant="grid" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </main>
  );
}
