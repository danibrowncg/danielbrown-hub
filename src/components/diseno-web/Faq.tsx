import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/primitives/Reveal";

const faqs = [
  { q: "¿Cuánto tiempo toma hacer mi web?", a: "Entre 3 y 5 días laborables en promedio, desde que recibo el contenido y confirmas el primer pago." },
  { q: "¿Incluye dominio y hosting?", a: "Sí. El primer año de dominio personalizado y hosting de alta velocidad están incluidos en el precio." },
  { q: "¿Qué soporte incluye?", a: "12 meses de soporte técnico: monitoreo, correcciones, mantenimiento básico y respaldo automático." },
  { q: "¿Es totalmente responsive?", a: "Sí. La web se diseña primero para móvil y se adapta a tablet y desktop. Probada en dispositivos reales." },
  { q: "¿Incluye SEO?", a: "Sí, SEO básico inicial: estructura optimizada, meta tags, sitemap, indexación en Google y velocidad de carga." },
  
  { q: "¿Cuál es el próximo paso?", a: "Escríbeme por WhatsApp. Hablamos de tu proyecto, te paso una propuesta personalizada y arrancamos." },
];

export function Faq() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink">Dudas</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            PREGUNTAS <span className="text-brand-grad">FRECUENTES</span>.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10" stagger={0.07}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <StaggerItem key={f.q} direction="up">
                <AccordionItem
                  value={`item-${i}`}
                  className="overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.02] px-5 transition-colors hover:border-ink/25"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline sm:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-ink/70 sm:text-base">
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
