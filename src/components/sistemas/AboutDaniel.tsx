import { motion, useReducedMotion } from "motion/react";
import { Bot, Workflow, Rocket } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { ScrollParallax } from "@/components/primitives/ScrollParallax";
import danielImg from "@/assets/daniel.webp";

const specs = [
  { Icon: Bot, title: "Automatización Inteligente", desc: "Procesos automáticos que liberan a tu equipo." },
  { Icon: Workflow, title: "Soluciones Custom con IA", desc: "Sistemas a medida, IA integrada y funcional." },
  { Icon: Rocket, title: "Desarrollo en 1-2 Semanas", desc: "Entrega ágil sin comprometer calidad." },
];

export function AboutDaniel() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden px-5 pt-10 pb-20 sm:px-8 lg:px-16 lg:pt-10 lg:pb-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
        <Reveal direction="scale" className="relative z-10 mx-auto">
          <ScrollParallax distance={40} className="relative">
            {/* Halo blanco sutil (pulsa en opacidad) */}
            <motion.span
              aria-hidden="true"
              className="absolute -inset-1 -z-10 rounded-full bg-ink/10 blur-2xl"
              animate={reduce ? undefined : { opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Marco circular con anillo aurora girando + flotación */}
            <motion.div
              className="relative grid aspect-square w-48 place-items-center rounded-full sm:w-60 lg:w-[19rem]"
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={reduce ? undefined : { scale: 1.03 }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, var(--ink) 70deg, transparent 150deg, transparent 210deg, color-mix(in oklab, var(--ink) 55%, transparent) 280deg, transparent 340deg)",
                  animation: reduce ? undefined : "spin-slow 6s linear infinite",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-[5px] rounded-full bg-ink"
              />
              <div
                className="relative aspect-square w-44 overflow-hidden rounded-full sm:w-56 lg:w-72"
                style={{ isolation: "isolate" }}
              >
                <img src={danielImg} alt="Daniel Brown" className="h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
            </motion.div>
          </ScrollParallax>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink">Hablemos</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              HOLA, SOY <span className="text-brand-grad">DANIEL BROWN</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-base text-ink/70 sm:text-lg">
              Especializado en crear sistemas inteligentes y automáticos que transforman negocios.
              Desarrollo soluciones custom con IA integrada para procesos complejos, análisis de datos
              y automatización empresarial. Sin plantillas. Cada sistema, una pieza única.
            </p>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-3" stagger={0.1}>
            {specs.map((s) => (
              <StaggerItem
                key={s.title}
                direction="left"
                className="group rounded-xl border border-white/10 bg-ink p-4 transition-all hover:border-neon/50"
              >
                <div className="text-neon transition-transform group-hover:scale-110">
                  <s.Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{s.title}</p>
                <p className="mt-1 text-xs text-white/65">{s.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
