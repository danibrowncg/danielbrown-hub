import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Barra de progreso de scroll fija en la parte superior (neón de marca).
 * Ayuda de orientación: se mantiene con reduced-motion (solo sin el spring).
 * Se oculta en páginas sin scroll (p. ej. el hub), donde el progreso no
 * significa nada y la barra se vería como una línea fija al 100%.
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

  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const check = () =>
      setScrollable(
        document.documentElement.scrollHeight > window.innerHeight + 4,
      );
    check();
    window.addEventListener("resize", check);
    const ro = new ResizeObserver(check);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", check);
      ro.disconnect();
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, opacity: scrollable ? 1 : 0 }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-neon transition-opacity duration-300"
    />
  );
}
