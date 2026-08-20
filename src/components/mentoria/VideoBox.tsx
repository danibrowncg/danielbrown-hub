import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play } from "lucide-react";

/**
 * Cubículo del video de presentación, sin título ni subtítulo.
 *
 * Va desnudo a propósito: vive en la portada, junto al CTA, y cualquier
 * encabezado encima competiría con el titular principal. Quien llega debe
 * poder darle play sin leer nada.
 *
 * El video NO se descarga hasta que alguien lo pide (`preload="none"` y el
 * `<source>` se monta al pulsar). Pesa bastante más que el resto de la página
 * junta, así que cargarlo de entrada penalizaría a la mayoría, que ni siquiera
 * llega a darle play. Hasta entonces se ve la miniatura, que son 38 KB.
 */
export function VideoBox() {
  const reduce = useReducedMotion();
  const [activo, setActivo] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const reproducir = () => {
    setActivo(true);
    // El <video> ya existe en el DOM; al montar el source hay que recargarlo.
    requestAnimationFrame(() => {
      ref.current?.load();
      ref.current?.play().catch(() => {});
    });
  };

  return (
    <motion.div
      whileHover={reduce || activo ? undefined : { scale: 1.012 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_30px_80px_-40px_rgba(13,0,38,0.6)]"
    >
      <video
        ref={ref}
        poster="/mentoria-poster.webp"
        preload="none"
        controls={activo}
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        {activo ? <source src="/mentoria.mp4" type="video/mp4" /> : null}
      </video>

      {!activo ? (
        <>
          {/* Halo de marca que respira: insinúa que hay algo que reproducir */}
          <motion.span
            aria-hidden="true"
            className="brand-grad pointer-events-none absolute inset-0 opacity-[0.18]"
            animate={reduce ? undefined : { opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Velo que oscurece la miniatura para que el botón destaque */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/45" />

          <button
            type="button"
            onClick={reproducir}
            aria-label="Reproducir la presentación de la mentoría"
            className="absolute inset-0 grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-inset"
          >
            <span className="text-center">
              <motion.span
                className="mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-neon text-ink shadow-[0_16px_44px_-12px_rgba(231,255,0,0.7)]"
                animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={reduce ? undefined : { scale: 1.12 }}
              >
                <Play className="ml-1 h-8 w-8" fill="currentColor" strokeWidth={0} />
              </motion.span>
              <span className="mt-4 block font-display text-lg uppercase tracking-wide text-white">
                Ver presentación
              </span>
            </span>
          </button>
        </>
      ) : null}
    </motion.div>
  );
}
