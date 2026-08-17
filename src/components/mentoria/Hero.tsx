import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { TerminalWindow, type TerminalLine } from "@/components/primitives/TerminalWindow";
import { Magnetic } from "@/components/primitives/Magnetic";
import { useMentoriaApply } from "@/components/shared/MentoriaApply";

const EASE = [0.23, 1, 0.32, 1] as const;

/** El recorrido completo del programa, contado en 20 segundos de terminal. */
const LINEAS: TerminalLine[] = [
  { kind: "prompt", text: "quiero una web donde mis clientes reserven turno" },
  { kind: "out", text: "Definiendo alcance y stack…" },
  { kind: "out", text: "Construyendo reservas, calendario y avisos…" },
  { kind: "out", text: "Publicando en producción…" },
  { kind: "ok", text: "✓ Listo. Tu proyecto está online." },
];

const titulo = ["CONSTRUYE", "TU", "PRIMER"];

export function Hero() {
  const reduce = useReducedMotion();
  const { openApply } = useMentoriaApply();

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="relative isolate overflow-hidden px-5 pt-16 pb-16 sm:px-8 lg:px-16 lg:pb-24">
      <div className="mx-auto max-w-6xl">
        {/* Volver al hub */}
        <motion.div {...fade(0)}>
          <Link
            to="/"
            aria-label="Volver al inicio"
            className="group inline-flex items-center gap-1.5 font-display text-lg tracking-wider text-ink transition-opacity hover:opacity-70 sm:text-xl"
          >
            <ArrowLeft
              className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
              strokeWidth={2.5}
            />
            Daniel Brown<span className="text-brand-grad">.</span>
          </Link>
        </motion.div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            {/* Cupos: urgencia real, sin contadores falsos */}
            <motion.div
              {...fade(0.08)}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-[0_8px_24px_-12px_rgba(13,0,38,0.5)] sm:text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              Mentoría 1:1 · Solo 5 cupos al mes
            </motion.div>

            <h1 className="mt-5 font-display text-[13vw] leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {titulo.map((w, i) => (
                <motion.span
                  key={w}
                  className="mr-3 inline-block"
                  initial={{ opacity: 0, y: 34, rotateX: reduce ? 0 : -35 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.65, delay: 0.12 + i * 0.1, ease: EASE }}
                >
                  {w}
                </motion.span>
              ))}
              <motion.span
                className="text-brand-grad"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45, ease: EASE }}
              >
                SISTEMA
              </motion.span>
            </h1>

            <motion.p {...fade(0.55)} className="mt-5 max-w-xl text-base text-ink/70 sm:text-lg">
              Mentoría 1:1 de 4 semanas en la que construimos juntos tu primer proyecto
              real con Claude Code —una web, un software, un sistema o una app— y lo
              dejamos publicado y funcionando. En vivo, conmigo, no un curso grabado.
            </motion.p>

            <motion.div {...fade(0.65)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic className="self-start">
                <motion.button
                  type="button"
                  onClick={openApply}
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-neon px-8 text-base font-bold uppercase tracking-wider text-ink"
                  style={{ animation: reduce ? undefined : "pulse-neon 2.2s ease-in-out infinite" }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
                  />
                  <span className="relative">Aplicar ahora</span>
                  <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </motion.button>
              </Magnetic>
              <span className="text-sm text-ink/60">$225 · pago único · 4 semanas</span>
            </motion.div>
          </div>

          {/* Elemento firma */}
          <motion.div {...fade(0.4)}>
            <TerminalWindow lines={LINEAS} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
