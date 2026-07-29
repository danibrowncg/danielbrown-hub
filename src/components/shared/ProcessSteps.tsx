import type { LucideIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { Highlight } from "@/components/primitives/Highlight";

export interface ProcessStep {
  Icon: LucideIcon;
  title: string;
  desc: string;
  /** Qué recibe el cliente al terminar este paso. */
  entrega: string;
}

interface ProcessStepsProps {
  eyebrow: string;
  /** Título; la palabra resaltada va aparte para el marcador neón. */
  titleLead: string;
  titleHighlight: string;
  intro: string;
  steps: ProcessStep[];
}

/**
 * "Cómo trabajamos": el proceso paso a paso.
 *
 * Responde la objeción real de alguien que no te conoce ("¿qué pasa si te
 * contrato?") sin afirmar nada que no sea verificable — a diferencia de una
 * reseña, aquí no hay nada que un cliente pueda desmentir. Cada paso dice
 * explícitamente QUÉ RECIBE, que es lo que de verdad baja la desconfianza.
 */
export function ProcessSteps({
  eyebrow,
  titleLead,
  titleHighlight,
  intro,
  steps,
}: ProcessStepsProps) {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            {titleLead} <Highlight>{titleHighlight}</Highlight>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-ink/65 sm:text-lg">{intro}</p>
        </Reveal>

        <StaggerGroup className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
          {steps.map((s, i) => (
            <StaggerItem
              key={s.title}
              direction="up"
              className="group relative rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_24px_60px_-32px_rgba(13,0,38,0.35)]"
            >
              {/* Número + icono en isla oscura: ancla visual de cada paso */}
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-neon shadow-[0_10px_24px_-12px_rgba(13,0,38,0.5)] transition-transform group-hover:scale-105">
                  <s.Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="font-display text-3xl leading-none text-ink/15 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.desc}</p>

              <p className="mt-4 border-t border-ink/10 pt-3 text-xs text-ink/55">
                <span className="font-semibold text-ink/75">Recibes:</span> {s.entrega}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
