import { motion } from "motion/react";
import { FileText, Map, MessageCircle, DoorOpen, Gift, Check, type LucideIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GridPattern } from "@/components/primitives/GridPattern";
import { useMentoriaApply } from "@/components/shared/MentoriaApply";

const incluye: { Icon: LucideIcon; titulo: string; desc: string }[] = [
  {
    Icon: FileText,
    titulo: "Resumen de cada llamada",
    desc: "Por escrito, para que no dependas de tu memoria ni de tomar apuntes mientras construimos.",
  },
  {
    Icon: Map,
    titulo: "Guías para avanzar solo",
    desc: "Tareas y recomendaciones concretas entre llamada y llamada, para que llegues con terreno ganado.",
  },
  {
    Icon: MessageCircle,
    titulo: "Soporte por WhatsApp",
    desc: "Durante las 4 semanas del programa, me escribes cuando te trabas. No esperas a la próxima llamada.",
  },
  {
    Icon: DoorOpen,
    titulo: "El canal queda abierto",
    desc: "Al terminar sigo disponible para dudas puntuales. Ya sin el ritmo intenso de las 4 semanas, pero no te quedas solo.",
  },
];

export function Offer() {
  const { openApply } = useMentoriaApply();

  return (
    <>
      {/* ---------- Qué incluye ---------- */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Eyebrow>Qué incluye</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
              MÁS QUE <Highlight>CUATRO LLAMADAS</Highlight>
            </h2>
          </Reveal>

          <StaggerGroup className="mt-9 grid grid-cols-2 gap-2.5 sm:gap-4" stagger={0.08}>
            {incluye.map((it) => (
              <StaggerItem
                key={it.titulo}
                direction="up"
                className="group rounded-2xl border border-ink/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_24px_60px_-32px_rgba(13,0,38,0.35)] sm:p-6"
              >
                <motion.span
                  className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-neon shadow-[0_10px_24px_-12px_rgba(13,0,38,0.5)] sm:h-11 sm:w-11"
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <it.Icon className="h-5 w-5" strokeWidth={1.75} />
                </motion.span>
                <h3 className="mt-3 font-display text-base uppercase leading-tight tracking-wide text-ink sm:mt-4 sm:text-xl">
                  {it.titulo}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-ink/70 sm:mt-2 sm:text-sm sm:leading-relaxed">{it.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Bono: se nombra y punto, sin explicar la comunidad */}
          <Reveal delay={0.2}>
            <div className="mt-2.5 flex items-start gap-3.5 rounded-2xl border border-neon/40 bg-neon/[0.07] p-4 sm:mt-4 sm:gap-4 sm:p-6">
              <motion.span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-neon sm:h-11 sm:w-11"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              >
                <Gift className="h-5 w-5" strokeWidth={1.75} />
              </motion.span>
              <div>
                <h3 className="font-display text-base uppercase tracking-wide text-ink sm:text-xl">
                  Bono: 50% de descuento
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-ink/70 sm:mt-2 sm:text-sm sm:leading-relaxed">
                  Entras con la mitad de precio a mi próxima comunidad de pago,{" "}
                  <span className="font-semibold text-ink">Creadores Digitales IA</span>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Precio ---------- */}
      <section id="precio" className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative isolate overflow-hidden rounded-3xl bg-ink p-8 text-center shadow-[0_40px_90px_-45px_rgba(13,0,38,0.6)] sm:p-12"
          >
            <GridPattern />
            <span aria-hidden="true" className="brand-grad absolute inset-x-0 top-0 h-[2px]" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
                Mentoría MVP
              </p>

              <div className="mt-5 flex items-baseline justify-center gap-2">
                {/* Estático a propósito: un contador mostraría "$0" si la animación
                    no llega a correr, y un precio equivocado cuesta la venta. */}
                <span className="font-display text-7xl leading-none text-white sm:text-8xl">
                  $225
                </span>
                <span className="font-display text-2xl text-white/50">USD</span>
              </div>
              <p className="mt-2 font-display text-lg uppercase tracking-widest text-white/80">
                Pago único · 4 semanas
              </p>

              <ul className="mx-auto mt-8 flex max-w-sm flex-col gap-2.5 text-left">
                {[
                  "4 llamadas de mentoría 1:1 de 60-90 minutos",
                  "Soporte por WhatsApp todo el programa",
                  "Resúmenes y guías por escrito",
                  "Tu proyecto publicado en producción",
                  "50% de descuento en Creadores Digitales IA",
                ].map((t, i) => (
                  <motion.li
                    key={t}
                    className="flex items-start gap-2.5 text-sm text-white/85"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <motion.span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08, type: "spring", duration: 0.45, bounce: 0.45 }}
                    >
                      <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} />
                    </motion.span>
                    {t}
                  </motion.li>
                ))}
              </ul>

              <button
                type="button"
                onClick={openApply}
                className="mt-9 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-neon px-8 text-base font-bold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:w-auto"
              >
                Aplicar ahora
              </button>

              <p className="mt-4 text-sm text-white/55">
                Solo tomo <span className="font-semibold text-neon">5 cupos al mes</span> para
                poder dedicarle tiempo real a cada persona.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
