import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface HighlightProps {
  children: ReactNode;
  /** Retraso de la animación de trazo, en segundos. */
  delay?: number;
  className?: string;
}

/**
 * Resalta una palabra de un titular con un trazo de marcador neón que se
 * "pinta" al entrar en pantalla.
 *
 * Por qué existe: antes la palabra clave de cada titular iba con el degradado
 * de marca. Repetido en 6 títulos por página, el degradado dejaba de ser un
 * momento especial y volvía la página ruidosa. Este trazo da la MISMA jerarquía
 * usando el acento que ya existe (neón), sin sumar un color nuevo: el texto
 * sigue en tinta (contraste intacto) y el color vive detrás.
 */
export function Highlight({ children, delay = 0.15, className = "" }: HighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Trazo de marcador: detrás del texto, alineado al tercio inferior. */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-[-0.14em] bottom-[0.02em] -z-10 h-[0.58em] origin-left rounded-[3px] bg-neon"
        style={{ transform: "skewX(-12deg)" }}
        initial={reduce ? { opacity: 0 } : { scaleX: 0, opacity: 1 }}
        animate={
          inView
            ? reduce
              ? { opacity: 1 }
              : { scaleX: 1 }
            : undefined
        }
        transition={
          reduce
            ? { duration: 0.2 }
            : { duration: 0.45, delay, ease: [0.23, 1, 0.32, 1] }
        }
      />
      {children}
    </span>
  );
}
