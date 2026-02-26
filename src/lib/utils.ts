import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Project } from "@/data/projects";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uniqueTags(items: Project[]) {
  return Array.from(new Set(items.flatMap((project) => project.tags))).sort();
}

export function uniqueYears(items: Project[]) {
  return Array.from(new Set(items.map((project) => project.year))).sort((a, b) => b - a);
}

type FilterParams = {
  query: string;
  tag: string;
  year: string;
};

export function filterProjects(items: Project[], { query, tag, year }: FilterParams) {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((project) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.subtitle.toLowerCase().includes(normalizedQuery) ||
      project.summary.toLowerCase().includes(normalizedQuery) ||
      project.tags.some((tagItem) => tagItem.toLowerCase().includes(normalizedQuery));

    const matchesTag = tag === "Todos" || project.tags.includes(tag);
    const matchesYear = year === "Todos" || project.year === Number(year);

    return matchesQuery && matchesTag && matchesYear;
  });
}
