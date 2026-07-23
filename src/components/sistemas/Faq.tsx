import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/primitives/Reveal";

const faqs = [
  { q: "¿Cuánto tiempo toma un sistema?", a: "Entre 1 y 2 semanas en promedio. El tiempo final depende de la complejidad, personalización y funcionalidades avanzadas que necesite tu sistema." },
  { q: "¿Qué incluye el hosting y dominio?", a: "Hosting del sistema con infraestructura robusta y escalable, más dominio personalizado por 1 año, todo incluido en el precio." },
  { q: "¿Puedo agregar más funcionalidades después?", a: "Sí. El sistema se diseña escalable y personalizable, así que se le pueden añadir nuevos módulos y funcionalidades a medida que tu negocio crece." },
  { q: "¿Incluye capacitación de uso?", a: "Sí. Cada entrega incluye documentación completa y una sesión de training básico para que tú y tu equipo lo usen con confianza desde el día uno." },
  { q: "¿El sistema usa IA real?", a: "Sí. La IA está integrada y es funcional: automatización inteligente, procesamiento de datos, análisis predictivo o lo que tu caso de uso requiera." },
  { q: "¿Qué tecnologías usan?", a: "Tecnologías modernas, robustas y probadas en producción. Elegimos siempre el stack más adecuado para la necesidad de tu sistema, priorizando rendimiento y escalabilidad." },
  { q: "¿Cuál es el próximo paso?", a: "Escríbeme por WhatsApp y describeme tu idea o necesidad. Analizamos el caso, te paso una propuesta personalizada y arrancamos." },
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
