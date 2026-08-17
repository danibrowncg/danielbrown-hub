import { motion, useReducedMotion } from "motion/react";
import { Play, Quote, Camera } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { ScrollParallax } from "@/components/primitives/ScrollParallax";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import danielImg from "@/assets/daniel.webp";

/**
 * TODO — TESTIMONIOS REALES
 * Sustituye cada objeto por un testimonio real, con permiso de la persona.
 * Deja el array vacío si aún no tienes ninguno: la sección se oculta sola.
 */
const testimonios: { nombre: string; proyecto: string; texto: string }[] = [];

/**
 * TODO — FOTOS DE CLASES EN VIVO
 * Añade aquí las rutas de tus fotos dando clases (impórtalas desde
 * `@/assets/mentoria/…`). Con el array vacío se muestran marcadores.
 */
const fotos: string[] = [];

export function Proof() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* ---------- Quién te va a enseñar ---------- */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal direction="scale" className="relative z-10 mx-auto">
            <ScrollParallax distance={40} className="relative">
              <motion.span
                aria-hidden="true"
                className="absolute -inset-1 -z-10 rounded-full bg-ink/10 blur-2xl"
                animate={reduce ? undefined : { opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="relative grid aspect-square w-48 place-items-center rounded-full sm:w-60 lg:w-[19rem]"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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
                <span aria-hidden="true" className="absolute inset-[5px] rounded-full bg-ink" />
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
              <Eyebrow>Quién te va a enseñar</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
                CONSTRUYO ESTO <Highlight>TODOS LOS DÍAS</Highlight>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-xl text-base text-ink/70 sm:text-lg">
                Soy Daniel Brown. Creo contenido sobre IA aplicada y Claude Code para una
                comunidad de <span className="font-semibold text-ink">+4.500 personas</span>{" "}
                {/* TODO: ajusta esta cifra cuando cambie */}
                que sigue ese trabajo, y construyo software, chatbots y webs para negocios
                reales. No enseño teoría de algo que leí: te enseño exactamente lo que uso
                para trabajar.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Video ---------- */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <Eyebrow>En mis palabras</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
              TE LO CUENTO <Highlight>YO MISMO</Highlight>.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            {/*
              TODO — VIDEO REAL
              Opción A (archivo propio): reemplaza este bloque por
                <video src="/mentoria.mp4" poster="/mentoria-poster.jpg" controls className="h-full w-full object-cover" />
              Opción B (YouTube): reemplázalo por un <iframe src="https://www.youtube.com/embed/TU_ID" …/>
            */}
            <div className="group relative mt-10 aspect-video overflow-hidden rounded-2xl border border-ink/10 bg-ink">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neon text-ink transition-transform group-hover:scale-110">
                    <Play className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} />
                  </span>
                  <p className="mt-4 font-display text-lg uppercase tracking-wide text-white/80">
                    Video pendiente
                  </p>
                  <p className="mt-1 font-mono text-xs text-white/40">
                    TODO: insertar video en Proof.tsx
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Prueba social ---------- */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Prueba social</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              CÓMO SE VE POR <Highlight>DENTRO</Highlight>.
            </h2>
          </Reveal>

          {/* Testimonios */}
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {(testimonios.length ? testimonios : Array.from({ length: 3 })).map((t, i) => {
              const real = testimonios.length > 0;
              const d = t as { nombre: string; proyecto: string; texto: string } | undefined;
              return (
                <StaggerItem
                  key={i}
                  direction="up"
                  className={`relative flex flex-col rounded-2xl border p-6 ${
                    real
                      ? "border-white/10 bg-ink"
                      : "border-dashed border-ink/20 bg-ink/[0.02]"
                  }`}
                >
                  <Quote
                    aria-hidden="true"
                    className={`absolute right-5 top-5 h-7 w-7 ${real ? "text-white/[0.07]" : "text-ink/10"}`}
                    fill="currentColor"
                    strokeWidth={2.5}
                  />
                  {real ? (
                    <>
                      <p className="flex-1 text-base leading-relaxed text-white/90">"{d!.texto}"</p>
                      <div className="mt-5 border-t border-white/10 pt-4">
                        <p className="font-display text-base uppercase text-white">{d!.nombre}</p>
                        <p className="text-xs text-white/55">{d!.proyecto}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="flex-1 text-sm leading-relaxed text-ink/40">
                        Aquí irá el testimonio de un alumno, con su nombre y qué construyó.
                      </p>
                      <p className="mt-5 border-t border-ink/10 pt-4 font-mono text-xs text-ink/35">
                        TODO: testimonio {i + 1} en Proof.tsx
                      </p>
                    </>
                  )}
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          {/* Fotos de clases */}
          <Reveal delay={0.15}>
            <p className="mt-12 flex items-center gap-2 text-sm font-semibold text-ink/70">
              <Camera className="h-4 w-4" strokeWidth={2} /> Clases en vivo
            </p>
          </Reveal>
          <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-3" stagger={0.07}>
            {(fotos.length ? fotos : Array.from({ length: 3 })).map((f, i) => (
              <StaggerItem
                key={i}
                direction="up"
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
                  fotos.length ? "border border-ink/10" : "grid place-items-center border border-dashed border-ink/20 bg-ink/[0.02]"
                }`}
              >
                {fotos.length ? (
                  <img
                    src={f as string}
                    alt="Clase en vivo de la mentoría"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Camera className="mx-auto h-7 w-7 text-ink/20" strokeWidth={1.75} />
                    <p className="mt-2 font-mono text-xs text-ink/35">
                      TODO: foto {i + 1}
                    </p>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
