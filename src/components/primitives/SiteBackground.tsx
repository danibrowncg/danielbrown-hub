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
      {/* 1. Aurora — lavados de color suaves sobre el blanco (opacidad baja
         para que aporten vida sin ensuciar el texto). */}
      <div
        className="absolute -left-[15%] -top-[12%] h-[65vh] w-[65vh] rounded-full blur-[130px]"
        style={{
          opacity: 0.13,
          background: "radial-gradient(circle, var(--teal), transparent 70%)",
          animation: "aurora-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[14%] top-[12%] h-[70vh] w-[70vh] rounded-full blur-[140px]"
        style={{
          opacity: 0.12,
          background: "radial-gradient(circle, var(--violet), transparent 70%)",
          animation: "aurora-b 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[20%] h-[55vh] w-[55vh] rounded-full blur-[130px]"
        style={{
          opacity: 0.1,
          background: "radial-gradient(circle, var(--teal), transparent 72%)",
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
