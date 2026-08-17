import { motion, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";

/**
 * Cubículo del video de presentación, sin título ni subtítulo.
 *
 * Va desnudo a propósito: vive en la portada, junto al CTA, y cualquier
 * encabezado encima competiría con el titular principal. Quien llega debe
 * poder darle play sin leer nada.
 *
 * TODO — VIDEO REAL
 * Opción A (archivo propio): sustituye el bloque interior por
 *   <video src="/mentoria.mp4" poster="/mentoria-poster.jpg" controls playsInline
 *          className="absolute inset-0 h-full w-full object-cover" />
 * Opción B (YouTube): sustitúyelo por
 *   <iframe src="https://www.youtube.com/embed/TU_ID" title="Presentación de la mentoría"
 *           allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
 *           allowFullScreen className="absolute inset-0 h-full w-full" />
 */
export function VideoBox() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { scale: 1.012 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_30px_80px_-40px_rgba(13,0,38,0.6)]"
    >
      {/* Halo de marca que respira: insinúa que hay algo que reproducir */}
      <motion.span
        aria-hidden="true"
        className="brand-grad absolute inset-0 opacity-[0.18]"
        animate={reduce ? undefined : { opacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.span
            className="mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-neon text-ink shadow-[0_16px_44px_-12px_rgba(231,255,0,0.7)]"
            animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={reduce ? undefined : { scale: 1.12 }}
          >
            <Play className="ml-1 h-8 w-8" fill="currentColor" strokeWidth={0} />
          </motion.span>
          <p className="mt-4 font-display text-lg uppercase tracking-wide text-white">
            Ver presentación
          </p>
          <p className="mt-1 font-mono text-[11px] text-white/35">
            TODO: insertar video en VideoBox.tsx
          </p>
        </div>
      </div>
    </motion.div>
  );
}
