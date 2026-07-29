import { FaqSection, type FaqItem } from "@/components/shared/FaqSection";

const faqs: FaqItem[] = [
  { q: "¿Cuánto tiempo toma un sistema?", a: "Entre 1 y 2 semanas en promedio. El tiempo final depende de la complejidad, personalización y funcionalidades avanzadas que necesite tu sistema." },
  { q: "¿Qué incluye el hosting y dominio?", a: "Hosting del sistema con infraestructura robusta y escalable, más dominio personalizado por 1 año, todo incluido en el precio." },
  { q: "¿Puedo agregar más funcionalidades después?", a: "Sí. El sistema se diseña escalable y personalizable, así que se le pueden añadir nuevos módulos y funcionalidades a medida que tu negocio crece." },
  { q: "¿Incluye capacitación de uso?", a: "Sí. Cada entrega incluye documentación completa y una sesión de training básico para que tú y tu equipo lo usen con confianza desde el día uno." },
  { q: "¿El sistema usa IA real?", a: "Sí. La IA está integrada y es funcional: automatización inteligente, procesamiento de datos, análisis predictivo o lo que tu caso de uso requiera." },
  { q: "¿Qué tecnologías usan?", a: "Tecnologías modernas, robustas y probadas en producción. Elegimos siempre el stack más adecuado para la necesidad de tu sistema, priorizando rendimiento y escalabilidad." },
  { q: "¿Cuál es el próximo paso?", a: "Escríbeme por WhatsApp y descríbeme tu idea o necesidad. Analizamos el caso, te paso una propuesta personalizada y arrancamos." },
];

export function Faq() {
  return (
    <FaqSection
      items={faqs}
      intro="Lo que más me preguntan antes de arrancar un sistema. Si tu caso es distinto, escríbeme y lo vemos."
    />
  );
}
