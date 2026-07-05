import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  /** Desplazamiento total en px a lo largo del recorrido de scroll. */
  distance?: number;
}

/**
 * Envuelve un elemento y lo desplaza verticalmente según su avance por el
 * viewport (efecto parallax). Respeta prefers-reduced-motion (queda estático).
 */
export function ScrollParallax({
  children,
  className,
  distance = 60,
}: ScrollParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance],
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
