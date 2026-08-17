import { motion, useReducedMotion } from "motion/react";
import { TerminalWindow, type TerminalLine } from "@/components/primitives/TerminalWindow";
import { ScrollParallax } from "@/components/primitives/ScrollParallax";

/** El recorrido del programa, contado en unos segundos de terminal. */
const LINEAS: TerminalLine[] = [
  { kind: "prompt", text: "quiero una web donde mis clientes reserven turno" },
  { kind: "out", text: "Definiendo alcance y stack…" },
  { kind: "out", text: "Construyendo reservas, calendario y avisos…" },
  { kind: "out", text: "Publicando en producción…" },
  { kind: "ok", text: "✓ Listo. Tu proyecto está online." },
];

/**
 * Sección puente: la terminal firma, sola y sin encabezado.
 *
 * Va entre la banda de capacidades y "qué vas a lograr" porque hace de bisagra
 * narrativa — muestra el recorrido completo (de la idea al despliegue) justo
 * antes de explicarlo por escrito. Sin título encima para que se lea como una
 * demostración, no como otra sección más.
 */
export function TerminalBlock() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <ScrollParallax distance={reduce ? 0 : 26}>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <TerminalWindow lines={LINEAS} />
          </motion.div>
        </ScrollParallax>
      </div>
    </section>
  );
}
