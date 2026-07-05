import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Barra de progreso de scroll fija en la parte superior (neón de marca).
 * Ayuda de orientación: se mantiene incluso con reduced-motion (solo sin el
 * suavizado del spring).
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  const scaleX = reduce ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-neon"
    />
  );
}
