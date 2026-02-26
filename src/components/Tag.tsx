"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TagProps = {
  label: string;
  active?: boolean;
  asButton?: boolean;
  onClick?: () => void;
};

export function Tag({ label, active, asButton, onClick }: TagProps) {
  const baseStyles =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur transition duration-200";
  const stateStyles = active
    ? "border-glow/60 bg-glow/15 text-glow"
    : "border-white/10 bg-white/5 text-mist/70 hover:border-glow/40 hover:text-white";

  if (asButton) {
    return (
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        aria-pressed={active}
        className={cn(baseStyles, stateStyles)}
      >
        {label}
      </motion.button>
    );
  }

  return <span className={cn(baseStyles, stateStyles)}>{label}</span>;
}
