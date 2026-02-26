type KPIProps = {
  value: string;
  label: string;
};

export function KPI({ value, label }: KPIProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft">
      <p className="text-2xl font-semibold text-white sm:text-3xl">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-mist/70">
        {label}
      </p>
    </div>
  );
}
