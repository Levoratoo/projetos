import { Project } from "@/data/projects";

export function ProjectCaseKpiBar({ kpis }: { kpis: Project["kpis"] }) {
  if (!kpis || kpis.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
        Resumo em números
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="group rounded-2xl border border-white/5 bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent p-5 shadow-[0_18px_50px_rgba(0,0,0,0.4)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-glow/40 hover:shadow-[0_22px_70px_rgba(0,0,0,0.5)]"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            {kpi.label}
          </p>
          <p className="mt-2 text-xl font-semibold text-white">{kpi.value}</p>
        </div>
      ))}
      </div>
    </div>
  );
}
