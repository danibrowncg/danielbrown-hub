import { motion, useReducedMotion } from "motion/react";
import { Layers, Code2, Target } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { ScrollParallax } from "@/components/primitives/ScrollParallax";
import danielImg from "@/assets/daniel.jpg";

const specs = [
  { Icon: Layers, title: "Diseño UX/UI", desc: "Interfaces premium pensadas para convertir." },
  { Icon: Code2, title: "Desarrollo Web", desc: "Código limpio, rápido y mobile-first." },
  { Icon: Target, title: "Estrategia de conversión", desc: "Cada sección con un objetivo claro." },
];

export function AboutDaniel() {
  const reduce = useReducedMotion();
  return (
    <section className="grain relative overflow-hidden px-5 pt-6 pb-20 sm:px-8 lg:px-16 lg:pt-10 lg:pb-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
        <Reveal direction="scale" className="relative z-10 mx-auto">
          <ScrollParallax distance={40} className="relative">
            <div className="absolute -inset-4 rounded-3xl brand-gradient opacity-40 blur-2xl" />
            <motion.div
              className="relative aspect-square w-44 overflow-hidden rounded-3xl ring-2 ring-neon/60 shadow-[0_0_55px_-6px_rgba(231,255,0,0.55)] sm:w-56 lg:w-72"
              style={{ isolation: "isolate" }}
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={reduce ? undefined : { scale: 1.03, rotate: -2 }}
            >
              <img src={danielImg} alt="Daniel Brown" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
          </ScrollParallax>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-neon">Hablemos</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
              HOLA, SOY <span className="text-neon">DANIEL BROWN</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              Diseño y desarrollo webs premium para marcas que quieren competir en otra liga.
              Sin plantillas. Sin atajos. Cada proyecto, una pieza única pensada para vender.
            </p>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-3" stagger={0.1}>
            {specs.map((s) => (
              <StaggerItem
                key={s.title}
                direction="left"
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-neon/60"
              >
                <div className="text-neon transition-transform group-hover:scale-110">
                  <s.Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{s.title}</p>
                <p className="mt-1 text-xs text-white/60">{s.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
