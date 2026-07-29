import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";

export interface Testimonial {
  img: string;
  name: string;
  company: string;
  sector: string;
  quote: string;
  result: string;
}

interface TestimonialGridProps {
  titleLead: string;
  titleHighlight: string;
  items: Testimonial[];
}

/**
 * Muro de testimonios.
 *
 * Reemplaza al carrusel de 3 tarjetas con puntitos, que es de los patrones que
 * las skills de diseño marcan como "AI slop": obliga a esperar, esconde
 * contenido y se ve en todas las plantillas. Una retícula muestra toda la
 * prueba social de golpe, que es justo lo que quieres que el visitante vea.
 *
 * Escala solo: con 3 entradas se ve equilibrado y con 6 llena la retícula sin
 * tocar nada — basta con añadir objetos al array de la landing.
 */
export function TestimonialGrid({ titleLead, titleHighlight, items }: TestimonialGridProps) {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Testimonios</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            {titleLead} <Highlight>{titleHighlight}</Highlight>.
          </h2>
        </Reveal>

        <StaggerGroup
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {items.map((t) => (
            <StaggerItem
              key={t.name}
              direction="up"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink p-6 shadow-[0_12px_40px_-24px_rgba(13,0,38,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-neon/40 hover:shadow-[0_30px_70px_-35px_rgba(13,0,38,0.6)]"
            >
              {/* Comilla decorativa: ancla la tarjeta como cita */}
              <Quote
                aria-hidden="true"
                className="absolute right-5 top-5 h-8 w-8 text-white/[0.07] transition-colors group-hover:text-neon/20"
                strokeWidth={2.5}
                fill="currentColor"
              />

              <div className="flex gap-0.5 text-neon">
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

              {/* La cita manda: es lo primero que se lee, no la foto */}
              <p className="relative mt-4 flex-1 text-base leading-relaxed text-white/90">
                "{t.quote}"
              </p>

              <p className="mt-5">
                <span className="inline-flex items-center rounded-full bg-neon px-3 py-1 text-sm font-semibold text-ink">
                  {t.result}
                </span>
              </p>

              {/* Autor al pie, separado: firma la cita */}
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-neon/40"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-base uppercase leading-tight text-white">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-white/55">
                    {t.company} · {t.sector}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
