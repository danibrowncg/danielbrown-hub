import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Compass, Hammer, Palette, Rocket, ArrowRight, Plus, type LucideIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";

const EASE = [0.23, 1, 0.32, 1] as const;

/** Las 4 llamadas. Numeradas porque es una secuencia real, no relleno. */
const llamadas: { Icon: LucideIcon; titulo: string; desc: string; sales: string }[] = [
  {
    Icon: Compass,
    titulo: "Diagnóstico y arquitectura",
    desc: "Definimos qué vas a construir, para quién y qué problema resuelve. Delimitamos el alcance para que quepa en 4 semanas y elegimos con qué lo vamos a hacer.",
    sales: "Repo listo y tu primer despliegue funcionando.",
  },
  {
    Icon: Hammer,
    titulo: "Construcción del núcleo",
    desc: "Construimos en vivo lo que hace que tu proyecto sirva. Aquí aprendes lo más valioso: leer un error sin asustarte y reformular el prompt cuando Claude no da con ello.",
    sales: "La funcionalidad principal, funcionando.",
  },
  {
    Icon: Palette,
    titulo: "Pulido, interfaz y datos",
    desc: "Le damos el acabado: diseño, experiencia de uso y, si tu proyecto lo pide, base de datos y acceso con usuarios. Dejamos las bases bien puestas.",
    sales: "Tu proyecto con cara de producto de verdad.",
  },
  {
    Icon: Rocket,
    titulo: "Despliegue y cierre",
    desc: "Lo publicamos en producción, con dominio y todo, y revisamos juntos el resultado final. Sales con algo que puedes enseñar y usar.",
    sales: "Tu proyecto online, listo para mostrar.",
  },
];

/** Antes → después, cada par en una sola línea para no alargar el scroll. */
const comparativa = [
  { malo: "Ves 40 horas de video", bueno: "Construyes mientras avanzamos" },
  { malo: "Te trabas y muere la idea", bueno: "Te trabas y lo resolvemos juntos" },
  { malo: "El ejemplo no es tu caso", bueno: "Trabajamos sobre TU idea" },
  { malo: "Terminas con apuntes", bueno: "Terminas con algo publicado" },
];

export function Program() {
  const reduce = useReducedMotion();
  // Acordeón con la primera abierta. Comprime cuatro tarjetas altas en una
  // lista corta y, de paso, convierte una sección de puro texto en algo que se
  // toca: en móvil era el tramo más largo y monótono de la página.
  const [abierta, setAbierta] = useState(0);

  return (
    <>
      {/* ---------- Qué vas a lograr ---------- */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Eyebrow>Qué vas a lograr</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
              TERMINAS CON ALGO <Highlight>FUNCIONANDO</Highlight>
            </h2>
          </Reveal>

          {/* Cada par en UNA fila: la mitad de alto que dos tarjetas apiladas */}
          <StaggerGroup className="mt-9 flex flex-col gap-2.5" stagger={0.08}>
            {comparativa.map((c) => (
              <StaggerItem
                key={c.bueno}
                direction="left"
                className="group grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-xl border border-ink/10 bg-white p-3.5 transition-all duration-300 hover:border-ink/25 hover:shadow-[0_18px_44px_-28px_rgba(13,0,38,0.35)] sm:gap-4 sm:p-4"
              >
                <span className="text-[13px] leading-snug text-ink/40 line-through decoration-ink/20 sm:text-sm">
                  {c.malo}
                </span>
                <motion.span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-neon"
                  whileHover={reduce ? undefined : { scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.span>
                <span className="text-[13px] font-semibold leading-snug text-ink sm:text-sm">
                  {c.bueno}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- Cómo funciona ---------- */}
      <section id="como-funciona" className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Eyebrow>Cómo funciona</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
              CUATRO LLAMADAS, <Highlight>CUATRO SEMANAS</Highlight>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-base text-ink/65">
              Una por semana, de 60 a 90 minutos y con pantalla compartida. El día lo eliges tú.
            </p>
          </Reveal>

          <StaggerGroup className="mt-9 flex flex-col gap-2.5" stagger={0.07}>
            {llamadas.map((l, i) => {
              const activa = abierta === i;
              return (
                <StaggerItem key={l.titulo} direction="up">
                  <div
                    className={`relative overflow-hidden rounded-xl border bg-white transition-colors duration-300 ${
                      activa ? "border-ink/25" : "border-ink/10 hover:border-ink/20"
                    }`}
                  >
                    {/* Se dibuja de izquierda a derecha al abrir: marca cuál
                        está activa sin añadir un color más a la lista. */}
                    <motion.span
                      aria-hidden="true"
                      className="brand-grad absolute inset-x-0 top-0 z-10 h-[2px] origin-left"
                      initial={false}
                      animate={{ scaleX: activa ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                    <button
                      type="button"
                      onClick={() => setAbierta(activa ? -1 : i)}
                      aria-expanded={activa}
                      className="flex w-full items-center gap-3.5 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink sm:gap-4 sm:p-5"
                    >
                      <motion.span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                          activa ? "bg-ink text-neon" : "bg-ink/[0.06] text-ink/60"
                        }`}
                        animate={reduce ? undefined : { scale: activa ? 1.06 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <l.Icon className="h-5 w-5" strokeWidth={1.75} />
                      </motion.span>

                      <span className="min-w-0 flex-1 font-display text-lg uppercase leading-tight tracking-wide text-ink sm:text-xl">
                        {l.titulo}
                      </span>

                      <span
                        className={`hidden font-display text-2xl leading-none tabular-nums transition-colors duration-300 sm:block ${
                          activa ? "text-brand-grad" : "text-ink/15"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        className="grid h-6 w-6 shrink-0 place-items-center text-ink/40"
                        animate={{ rotate: activa ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {activa ? (
                        <motion.div
                          key="cuerpo"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 sm:px-5 sm:pb-6 sm:pl-[5.1rem]">
                            <p className="max-w-2xl text-sm leading-relaxed text-ink/70">
                              {l.desc}
                            </p>
                            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink/[0.04] px-3 py-1.5 text-xs text-ink/70">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                              <span className="font-semibold text-ink/80">Sales con:</span> {l.sales}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
