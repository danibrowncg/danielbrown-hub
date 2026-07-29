import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";

export interface Project {
  img: string;
  sector: string;
  title: string;
  desc: string;
  result: string;
}

interface ProjectGridProps {
  titleLead: string;
  titleHighlight: string;
  intro: string;
  items: Project[];
}

/**
 * Galería de proyectos en retícula asimétrica.
 *
 * Sustituye al carrusel con puntitos: escondía 4 de 6 proyectos tras una
 * interacción que la mayoría no hace, justo en la sección que más peso tiene
 * para convencer. Ahora se ven todos de golpe.
 *
 * La asimetría (el primero ocupa el doble de ancho) evita la retícula de
 * tarjetas idénticas —el layout más genérico que existe— y crea una jerarquía:
 * el proyecto destacado entra primero por el ojo.
 */
export function ProjectGrid({ titleLead, titleHighlight, intro, items }: ProjectGridProps) {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Portfolio</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            {titleLead} <Highlight>{titleHighlight}</Highlight>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-ink/65 sm:text-lg">{intro}</p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.08}>
          {items.map((p, i) => (
            <StaggerItem
              key={p.title}
              direction="up"
              // El primero manda: ocupa el ancho completo y va más alto.
              className={i === 0 ? "sm:col-span-2" : ""}
            >
              <article
                className={`group relative w-full overflow-hidden rounded-2xl border border-ink/10 shadow-[0_4px_24px_-16px_rgba(13,0,38,0.3)] transition-shadow duration-500 hover:shadow-[0_36px_80px_-40px_rgba(13,0,38,0.5)] ${
                  i === 0 ? "aspect-[16/10] sm:aspect-[2.2/1]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  width={960}
                  height={672}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                {/* Velo: se intensifica en hover para que el texto gane peso */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                {/* Flecha: señal de "esto es un caso", aparece al acercarse */}
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-neon text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:-translate-y-1"
                >
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="inline-block rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                    {p.sector}
                  </span>
                  <h3 className="mt-3 font-display text-2xl uppercase text-white sm:text-3xl">
                    {p.title}
                  </h3>
                  {/* La descripción se revela al acercarse: en reposo manda la imagen */}
                  <p className="mt-1 max-w-md text-sm text-white/75 transition-all duration-500 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:group-hover:max-h-24 sm:group-hover:opacity-100">
                    {p.desc}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-neon">{p.result}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
