import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Kpi = { label: string; value: string; description?: string };

type KpiCardProps = {
  item: Kpi;
  compact?: boolean;
};

export function KpiCard({ item, compact }: KpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft",
        compact && "p-5"
      )}
    >
      <p className="text-2xl font-semibold text-white sm:text-3xl">{item.value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-mist/70">
        {item.label}
      </p>
      {item.description ? (
        <p className="mt-2 text-sm text-mist/70">{item.description}</p>
      ) : null}
    </div>
  );
}

export function KpiStrip({ items }: { items: Kpi[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <KpiCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}
