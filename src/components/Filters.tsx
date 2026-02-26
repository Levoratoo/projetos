"use client";

import { Button } from "@/components/ui/button";

type FiltersProps = {
  tags: string[];
  years: number[];
  activeTag: string;
  activeYear: string;
  onTagChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onReset: () => void;
};

export function Filters({
  tags,
  years,
  activeTag,
  activeYear,
  onTagChange,
  onYearChange,
  onReset
}: FiltersProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,1fr,auto]">
      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-mist/60">
        Tag
        <select
          value={activeTag}
          onChange={(event) => onTagChange(event.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-glow/60 focus:ring-1 focus:ring-glow/40"
          aria-label="Filtrar por tag"
        >
          <option>Todos</option>
          {tags.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-mist/60">
        Ano
        <select
          value={activeYear}
          onChange={(event) => onYearChange(event.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-glow/60 focus:ring-1 focus:ring-glow/40"
          aria-label="Filtrar por ano"
        >
          <option>Todos</option>
          {years.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <div className="flex items-end">
        <Button type="button" variant="outline" size="sm" onClick={onReset}>
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
