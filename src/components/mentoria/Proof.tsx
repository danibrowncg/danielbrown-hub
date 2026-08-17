import { motion, useReducedMotion } from "motion/react";
import { Quote, Camera, Star } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { ScrollParallax } from "@/components/primitives/ScrollParallax";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import danielImg from "@/assets/daniel.webp";
import tMiguel from "@/assets/mentoria/t-miguel.webp";
import tLorena from "@/assets/mentoria/t-lorena.webp";
import tRonald from "@/assets/mentoria/t-ronald.webp";
import clase1 from "@/assets/mentoria/clase-1.webp";
import clase2 from "@/assets/mentoria/clase-2.webp";
import clase3 from "@/assets/mentoria/clase-3.webp";

/** Testimonios reales de alumnos, publicados con su permiso. */
const testimonios: { nombre: string; foto: string; texto: string }[] = [
  {
    nombre: "Miguel Rodríguez",
    foto: tMiguel,
    texto:
      "Más que agradecido y satisfecho, 100% recomendable, vale totalmente la inversión. Mucha atención y amabilidad de parte de Daniel.",
  },
  {
    nombre: "Lorena Mejías",
    foto: tLorena,
    texto:
      "Es increíble todo lo que aprendes por una inversión tan baja. Estoy muy satisfecha y emocionada de lo aprendido, y de lo que me espera con esta nueva habilidad adquirida.",
  },
  {
    nombre: "Ronald Castellanos",
    foto: tRonald,
    texto:
      "Realmente muy buena mentoría. Es súper completa y adquieres una habilidad que podrás monetizar fácilmente.",
  },
];

/** Capturas reales de las llamadas de mentoría. */
const fotos: string[] = [clase1, clase2, clase3];

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
                comunidad de <span className="font-semibold text-ink">+10.000 personas</span>{" "}
                que sigue ese trabajo, y construyo software, chatbots y webs para negocios
                reales. No enseño teoría de algo que leí: te enseño exactamente lo que uso
                para trabajar.
              </p>
            </Reveal>
          </div>
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
            {testimonios.map((t) => (
              <StaggerItem
                key={t.nombre}
                direction="up"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink p-6 shadow-[0_12px_40px_-24px_rgba(13,0,38,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-neon/40"
              >
                <Quote
                  aria-hidden="true"
                  className="absolute right-5 top-5 h-8 w-8 text-white/[0.07] transition-colors group-hover:text-neon/20"
                  fill="currentColor"
                  strokeWidth={2.5}
                />

                <div className="flex gap-0.5 text-neon" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.06 * i, type: "spring", duration: 0.5, bounce: 0.35 }}
                    >
                      <Star className="h-4 w-4 fill-current" strokeWidth={0} />
                    </motion.span>
                  ))}
                </div>

                <p className="relative mt-4 flex-1 text-base leading-relaxed text-white/90">
                  "{t.texto}"
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <img
                    src={t.foto}
                    alt={t.nombre}
                    loading="lazy"
                    decoding="async"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-neon/40"
                  />
                  <p className="font-display text-base uppercase leading-tight text-white">
                    {t.nombre}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Fotos de clases */}
          <Reveal delay={0.15}>
            <p className="mt-12 flex items-center gap-2 text-sm font-semibold text-ink/70">
              <Camera className="h-4 w-4" strokeWidth={2} /> Clases en vivo
            </p>
          </Reveal>
          <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-3" stagger={0.07}>
            {fotos.map((f, i) => (
              <StaggerItem
                key={i}
                direction="up"
                className="overflow-hidden rounded-2xl border border-ink/10 shadow-[0_4px_24px_-16px_rgba(13,0,38,0.3)]"
              >
                <img
                  src={f}
                  alt={`Llamada de mentoría en vivo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={533}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
