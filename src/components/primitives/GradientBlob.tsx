import { motion, useReducedMotion } from "motion/react";

interface BlobProps {
  className?: string;
  delay?: number;
}

export function GradientBlob({ className, delay = 0 }: BlobProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl brand-gradient opacity-40 ${className ?? ""}`}
      animate={reduce ? undefined : { x: [0, 30, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.08, 0.95, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}
