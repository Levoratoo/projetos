"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-mist/60">
      Busca
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por titulo, tag ou resumo"
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-glow/60 focus:ring-1 focus:ring-glow/40"
        aria-label="Buscar projetos"
      />
    </label>
  );
}
