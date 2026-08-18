import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/primitives/Reveal";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { useWhatsAppLead } from "@/components/shared/WhatsAppLead";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  /** Texto de apoyo bajo el título. */
  intro: string;
  /** Texto del enlace de cierre. */
  ctaLabel?: string;
  /**
   * Qué abre el enlace de cierre. Por defecto el formulario de servicios; la
   * landing de mentoría pasa el suyo.
   */
  onCta?: () => void;
}

/**
 * FAQ en layout editorial de dos columnas.
 *
 * Antes era una columna estrecha centrada con el acordeón debajo: correcto pero
 * genérico, y en escritorio desperdiciaba todo el ancho. Ahora el título queda
 * fijo a la izquierda mientras las preguntas se recorren a la derecha, que es
 * como lo resuelven los sitios de producto serios.
 *
 * Se conserva el acordeón (en móvil es la mejor UX para esto: no obliga a
 * recorrer respuestas que no te interesan), pero con estados mucho más
 * trabajados: la pregunta abierta se marca en tinta plena y el resto se atenúa.
 *
 * Cierra con una salida a WhatsApp: quien llega al final del FAQ y sigue con
 * dudas es justo quien está a punto de escribir.
 */
export function FaqSection({ items, intro, ctaLabel, onCta }: FaqSectionProps) {
  // Fuera del provider el hook devuelve un no-op, así que es seguro llamarlo
  // siempre y dejar que `onCta` mande cuando venga.
  const { openLead } = useWhatsAppLead();
  const accion = onCta ?? openLead;

  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Columna izquierda: se queda fija mientras se leen las preguntas */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <Eyebrow>Dudas</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-5xl">
              PREGUNTAS <Highlight>FRECUENTES</Highlight>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-sm text-base text-ink/65">{intro}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <button
              type="button"
              onClick={accion}
              className="mt-6 inline-flex items-center gap-2 border-b border-ink/25 pb-0.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:text-ink"
            >
              {ctaLabel ?? "¿Tienes otra duda? Escríbeme"}
              <span aria-hidden="true">→</span>
            </button>
          </Reveal>
        </div>

        {/* Columna derecha: las preguntas */}
        <StaggerGroup className="lg:pt-2" stagger={0.06}>
          <Accordion type="single" collapsible className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((f, i) => (
              <StaggerItem key={f.q} direction="up">
                <AccordionItem
                  value={`item-${i}`}
                  className="group border-0 px-0"
                >
                  <AccordionTrigger className="gap-4 py-5 text-left text-base font-semibold text-ink/70 transition-colors hover:no-underline group-hover:text-ink data-[state=open]:text-ink sm:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-8 text-sm leading-relaxed text-ink/65 sm:text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </StaggerGroup>
      </div>
    </section>
  );
}
