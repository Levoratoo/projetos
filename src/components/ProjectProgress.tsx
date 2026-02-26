import { cn } from "@/lib/utils";

export type ProjectProgressProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showPercent?: boolean;
  className?: string;
};

const sizeStyles = {
  sm: {
    bar: "h-2",
    percent: "text-xs",
    label: "text-[10px]",
    gap: "gap-2"
  },
  md: {
    bar: "h-2.5",
    percent: "text-sm",
    label: "text-[11px]",
    gap: "gap-3"
  },
  lg: {
    bar: "h-3",
    percent: "text-base",
    label: "text-[11px]",
    gap: "gap-3"
  }
} as const;

export function ProjectProgress({
  value,
  size = "md",
  showLabel = true,
  showPercent = true,
  className
}: ProjectProgressProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const label = clamped >= 100 ? "Concluido" : "Em producao";
  const styles = sizeStyles[size];

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel ? (
        <p
          className={cn(
            "uppercase tracking-[0.26em] text-emerald-200/70",
            styles.label
          )}
        >
          {label}
        </p>
      ) : null}
      <div className={cn("flex items-center", styles.gap)}>
        {showPercent ? (
          <span
            className={cn(
              "min-w-[44px] font-semibold text-emerald-100",
              styles.percent
            )}
          >
            {clamped}%
          </span>
        ) : null}
        <div className={cn("relative w-full overflow-hidden rounded-full bg-white/10", styles.bar)}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.25)]"
            style={{ width: `${clamped}%` }}
          />
          <div className="progress-shine motion-reduce:opacity-0" />
        </div>
      </div>
    </div>
  );
}
