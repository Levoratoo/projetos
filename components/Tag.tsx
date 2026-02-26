type TagProps = {
  label: string;
  active?: boolean;
};

export function Tag({ label, active }: TagProps) {
  const styles = active
    ? "border-glow/60 bg-glow/10 text-glow"
    : "border-white/10 bg-white/5 text-mist/70";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      {label}
    </span>
  );
}
