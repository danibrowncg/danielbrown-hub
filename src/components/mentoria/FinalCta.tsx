import { motion } from "motion/react";
import { GridPattern } from "@/components/primitives/GridPattern";
import { Magnetic } from "@/components/primitives/Magnetic";
import { useMentoriaApply } from "@/components/shared/MentoriaApply";

export function FinalCta() {
  const { openApply } = useMentoriaApply();

  return (
    <section
      id="aplicar"
      className="brand-grad relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-16 lg:py-32"
    >
      <GridPattern opacity={0.09} />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-white"
        >
          Solo 5 cupos al mes
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-4 font-display text-5xl uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl"
        >
          EN 4 SEMANAS PUEDES TENERLO <span className="text-neon">LISTO</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg"
        >
          O dentro de 4 semanas seguir con la idea en la cabeza. Aplica, cuéntame qué
          quieres construir y vemos si encajas en el próximo cupo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 18 }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <Magnetic>
            <motion.button
              type="button"
              onClick={openApply}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-neon px-9 text-base font-bold uppercase tracking-wider text-ink sm:h-16 sm:px-12 sm:text-lg"
              style={{ animation: "pulse-neon 2s ease-in-out infinite" }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
              />
              <span className="relative">Aplicar ahora</span>
            </motion.button>
          </Magnetic>
          <p className="text-sm text-white/70">$225 USD · pago único · sin permanencia</p>
        </motion.div>
      </div>
    </section>
  );
}
