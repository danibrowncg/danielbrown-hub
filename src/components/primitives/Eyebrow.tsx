import { motion, useReducedMotion } from "motion/react";

interface EyebrowProps {
  children: React.ReactNode;
  /** Sobre fondo oscuro el texto va en blanco. */
  onDark?: boolean;
}

/**
 * Etiqueta corta que precede al título de cada sección.
 *
 * Lleva el ÚNICO uso sistemático del degradado de marca fuera de la identidad:
 * un guion de 24px. Es deliberadamente diminuto — el degradado repetido en
 * grande fue lo que volvió ruidosa la página; a esta escala aporta marca sin
 * competir con el neón (que es el color de acción) ni con la tinta.
 */
export function Eyebrow({ children, onDark = false }: EyebrowProps) {
  const reduce = useReducedMotion();
  return (
    <p
      className={`flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.3em] ${
        onDark ? "text-white" : "text-ink"
      }`}
    >
      {/* Se dibuja al entrar: da vida a TODAS las secciones con un solo cambio */}
      <motion.span
        aria-hidden="true"
        className="brand-grad h-[3px] w-6 shrink-0 rounded-full"
        style={{ originX: 0 }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      />
      {children}
    </p>
  );
}
