import { FaqSection, type FaqItem } from "@/components/shared/FaqSection";

const faqs: FaqItem[] = [
  { q: "¿Cuánto tiempo toma hacer mi web?", a: "Entre 3 y 5 días laborables en promedio, desde que recibo el contenido y confirmas el primer pago." },
  { q: "¿Incluye dominio y hosting?", a: "Sí. El primer año de dominio personalizado y hosting de alta velocidad están incluidos en el precio." },
  { q: "¿Qué soporte incluye?", a: "12 meses de soporte técnico: monitoreo, correcciones, mantenimiento básico y respaldo automático." },
  { q: "¿Es totalmente responsive?", a: "Sí. La web se diseña primero para móvil y se adapta a tablet y desktop. Probada en dispositivos reales." },
  { q: "¿Incluye SEO?", a: "Sí, SEO básico inicial: estructura optimizada, meta tags, sitemap, indexación en Google y velocidad de carga." },
  { q: "¿Cuál es el próximo paso?", a: "Escríbeme por WhatsApp. Hablamos de tu proyecto, te paso una propuesta personalizada y arrancamos." },
];

export function Faq() {
  return (
    <FaqSection
      items={faqs}
      intro="Todo lo que suelen preguntarme antes de arrancar. Si te queda algo por fuera, escríbeme y lo resolvemos."
    />
  );
}
