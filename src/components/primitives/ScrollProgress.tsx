import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Hilo de progreso de lectura, fijo en el borde superior de la ventana.
 *
 * Es el uso más contenido posible del degradado de marca: 2px que ni siquiera
 * existen hasta que empiezas a bajar. Da presencia al color secundario a lo
 * largo de TODA la página sin robarle protagonismo al neón (que aquí es el
 * color de acción) ni a la tinta (que es la estructura).
 *
 * El muelle suaviza el salto del scroll por inercia en móvil; con
 * `prefers-reduced-motion` no se monta.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const avance = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="brand-grad pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
      style={{ scaleX: avance }}
    />
  );
}
