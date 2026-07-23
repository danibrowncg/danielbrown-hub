import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Fondo global del sitio, en capas:
 *  1. Aurora: blobs de marca que derivan lentamente (CSS, fuera del hilo principal).
 *  2. Malla de puntos con máscara radial (profundidad sutil).
 *  3. Foco que sigue el cursor, interpolado con spring (solo en punteros finos).
 *  4. Viñeta inferior para asentar el contenido.
 *
 * Además renderiza el grano de película como UNA capa fija sobre el contenido
 * (antes era una capa con mix-blend-mode por sección; ver `grain-fixed`).
 *
 * Solo se anima transform/opacity. Respeta prefers-reduced-motion.
 */
export function SiteBackground() {
  const reduce = useReducedMotion();

  // Foco del cursor (decorativo → spring, nunca ligado directo al mouse).
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.5 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFinePointer(mq.matches);
    if (!mq.matches) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  return (
    <>
      {/* Grano de película: una única capa fija sobre todo el contenido. */}
      <div aria-hidden="true" className="grain-fixed" />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
      {/* 1. Degradado de marca sobre el blanco: TEAL arriba-izquierda →
         VIOLETA abajo-derecha. Presente y visible, pero el centro queda claro
         para que el texto siempre se lea. */}
      <div
        className="absolute -left-[18%] -top-[14%] h-[75vh] w-[75vh] rounded-full blur-[130px]"
        style={{
          opacity: 0.28,
          background: "radial-gradient(circle, var(--teal), transparent 68%)",
          animation: "aurora-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[16%] -bottom-[16%] h-[80vh] w-[80vh] rounded-full blur-[140px]"
        style={{
          opacity: 0.3,
          background: "radial-gradient(circle, var(--violet), transparent 68%)",
          animation: "aurora-b 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[8%] top-[6%] h-[42vh] w-[42vh] rounded-full blur-[130px]"
        style={{
          opacity: 0.12,
          background: "radial-gradient(circle, var(--violet), transparent 72%)",
          animation: "aurora-c 34s ease-in-out infinite",
        }}
      />

      {/* 2. Malla de puntos */}
      <div className="dot-grid absolute inset-0" />

      {/* 3. Foco del cursor */}
      {finePointer ? (
        <motion.div className="absolute left-0 top-0" style={{ x: sx, y: sy }}>
          <div
            className="h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
            style={{
              opacity: 0.06,
              background:
                "radial-gradient(circle, var(--violet), transparent 65%)",
            }}
          />
        </motion.div>
      ) : null}
      </div>
    </>
  );
}
