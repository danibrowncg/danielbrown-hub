import { Compass, Hammer, Palette, Rocket, X, Check, type LucideIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";

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

const comparativa = [
  { malo: "Ves 40 horas de video y no construyes nada", bueno: "Construyes tu proyecto mientras avanzamos" },
  { malo: "Te trabas con un error y ahí muere la idea", bueno: "Te trabas y lo resolvemos en vivo, juntos" },
  { malo: "El ejemplo del curso no se parece a tu caso", bueno: "Trabajamos sobre TU idea, no sobre una demo" },
  { malo: "Terminas con apuntes", bueno: "Terminas con un producto publicado" },
];

export function Program() {
  return (
    <>
      {/* ---------- Qué vas a lograr ---------- */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Qué vas a lograr</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              TERMINAS CON ALGO <Highlight>FUNCIONANDO</Highlight>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-base text-ink/65 sm:text-lg">
              No con apuntes ni con una carpeta de tutoriales a medias. Con tu proyecto
              publicado, en internet, que puedes abrir y enseñarle a alguien.
            </p>
          </Reveal>

          {/* Comparativa: el contraste hace el trabajo de convencer */}
          <StaggerGroup className="mt-12 grid gap-3 lg:grid-cols-2" stagger={0.07}>
            {comparativa.map((c) => (
              <StaggerItem key={c.bueno} direction="up" className="contents">
                <div className="grid gap-3 sm:grid-cols-2 lg:contents">
                  <div className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white p-4">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-ink/25" strokeWidth={2.5} />
                    <p className="text-sm text-ink/50 line-through decoration-ink/20">{c.malo}</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-ink/10 bg-ink p-4">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon">
                      <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} />
                    </span>
                    <p className="text-sm text-white">{c.bueno}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- Cómo funciona ---------- */}
      <section id="como-funciona" className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Cómo funciona</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              CUATRO LLAMADAS, <Highlight>CUATRO SEMANAS</Highlight>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-base text-ink/65 sm:text-lg">
              Una llamada por semana, de 60 a 90 minutos, con pantalla compartida. El día lo
              eliges tú. No te doy teoría: construimos mientras te voy explicando.
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 flex flex-col gap-4" stagger={0.09}>
            {llamadas.map((l, i) => (
              <StaggerItem
                key={l.titulo}
                direction="up"
                className="group grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:border-ink/20 hover:shadow-[0_24px_60px_-32px_rgba(13,0,38,0.35)] sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-7"
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink text-neon shadow-[0_10px_24px_-12px_rgba(13,0,38,0.5)] transition-transform group-hover:scale-105">
                    <l.Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-4xl leading-none text-ink/12 tabular-nums sm:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl uppercase tracking-wide text-ink sm:text-2xl">
                    {l.titulo}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70 sm:text-base">
                    {l.desc}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink/[0.04] px-3 py-1.5 text-xs text-ink/70">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                    <span className="font-semibold text-ink/80">Sales con:</span> {l.sales}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
