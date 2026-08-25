import { motion, useReducedMotion } from "motion/react";

/**
 * Aviso para el navegador integrado de TikTok.
 *
 * TikTok abre los enlaces de la biografía dentro de su propio visor, y desde
 * ahí los enlaces a apps externas —el de la comunidad de WhatsApp, que es a lo
 * que viene la mayoría— fallan. La solución es abrir la página en el navegador
 * del teléfono desde el menú "···" de la esquina superior derecha.
 *
 * Por eso la flecha apunta ahí arriba a la derecha y se mueve hacia el rincón:
 * un cartel quieto que diga "abre en el navegador" no le dice a nadie DÓNDE
 * está el botón; la flecha sí.
 *
 * Solo se monta en /tk, la ruta que va en la biografía de TikTok.
 */
export function OpenInBrowserHint() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed right-3 top-2 z-50 flex flex-col items-end sm:right-6 sm:top-4">
      {/* La flecha empuja hacia el rincón, que es donde está el menú "···" */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="h-14 w-14 text-ink sm:h-16 sm:w-16"
        fill="none"
        animate={reduce ? undefined : { x: [0, 7, 0], y: [0, -7, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M8 58C10 36 20 16 46 11"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M32 9.5L48 10.5L41 24"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="-mt-1 max-w-[10.5rem] rounded-2xl bg-ink px-3.5 py-2 text-right shadow-[0_14px_34px_-16px_rgba(13,0,38,0.8)]"
      >
        <p className="text-[10px] font-semibold uppercase leading-tight tracking-widest text-white/55">
          Toca ··· y elige
        </p>
        <p className="mt-0.5 font-display text-[13px] uppercase leading-tight tracking-wide text-neon">
          Abrir en el navegador
        </p>
      </motion.div>
    </div>
  );
}
