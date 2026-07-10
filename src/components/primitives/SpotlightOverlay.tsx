import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

interface SpotlightOverlayProps {
  /** Radio del halo en px. */
  size?: number;
  /** Color RGB del halo (sin alpha). */
  rgb?: string;
  /** Intensidad del halo (0-1). */
  intensity?: number;
}

/**
 * Halo radial que sigue el cursor dentro de la tarjeta contenedora.
 * El padre debe tener las clases `group relative overflow-hidden`.
 * Es puramente decorativo y se desactiva solo en punteros gruesos (no hay hover).
 */
export function SpotlightOverlay({
  size = 260,
  rgb = "231,255,0",
  intensity = 0.14,
}: SpotlightOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  // `<length> at <pos>` implica forma circular (orden válido según la spec).
  const background = useMotionTemplate`radial-gradient(${size}px at ${mx}px ${my}px, rgba(${rgb},${intensity}), transparent 70%)`;

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    parent.addEventListener("pointermove", onMove, { passive: true });
    return () => parent.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ background }}
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
  );
}
