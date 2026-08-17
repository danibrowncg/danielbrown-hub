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
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Qué incluye</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              MÁS QUE <Highlight>CUATRO LLAMADAS</Highlight>.
            </h2>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {incluye.map((it) => (
              <StaggerItem
                key={it.titulo}
                direction="up"
                className="group rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_24px_60px_-32px_rgba(13,0,38,0.35)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-neon shadow-[0_10px_24px_-12px_rgba(13,0,38,0.5)] transition-transform group-hover:scale-105">
                  <it.Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-ink">
                  {it.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{it.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Bono: se nombra y punto, sin explicar la comunidad */}
          <Reveal delay={0.2}>
            <div className="mt-4 flex items-start gap-4 rounded-2xl border border-neon/40 bg-neon/[0.07] p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-neon">
                <Gift className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-ink">
                  Bono: 50% de descuento
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
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
          <div className="relative isolate overflow-hidden rounded-3xl bg-ink p-8 text-center shadow-[0_40px_90px_-45px_rgba(13,0,38,0.6)] sm:p-12">
            <GridPattern />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
                Mentoría MVP
              </p>

              <div className="mt-5 flex items-baseline justify-center gap-2">
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
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-white/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon">
                      <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
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
          </div>
        </div>
      </section>
    </>
  );
}
