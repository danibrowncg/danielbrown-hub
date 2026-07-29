import { TestimonialGrid, type Testimonial } from "@/components/shared/TestimonialGrid";
import t1 from "@/assets/sistemas/testimonial-1.webp";
import t2 from "@/assets/sistemas/testimonial-2.webp";
import t3 from "@/assets/sistemas/testimonial-3.webp";

/**
 * Para añadir un testimonio: agrega un objeto a este array. La retícula se
 * acomoda sola (con 6 llena las dos filas). Usa SIEMPRE nombre, empresa y frase
 * reales del cliente, con su permiso.
 */
const testimonials: Testimonial[] = [
  {
    img: t1,
    name: "María González",
    company: "Pulse Marketing",
    sector: "Agencia de Marketing",
    quote:
      "Antes gastábamos 20 horas semanales en tareas manuales. El sistema con IA que Daniel desarrolló automatizó todo. Ahora el equipo se enfoca en estrategia, no en operativa.",
    result: "−80% tiempo manual",
  },
  {
    img: t2,
    name: "Carlos Rivera",
    company: "Nexora Tech",
    sector: "Startup B2B",
    quote:
      "Necesitábamos un sistema custom con IA y nadie nos entendía. Daniel lo entregó en 2 semanas, funcionando y escalable. Subió la productividad de todo el equipo.",
    result: "+60% productividad",
  },
  {
    img: t3,
    name: "Valentina Cruz",
    company: "LogiFlow",
    sector: "Empresa de Logística",
    quote:
      "El sistema procesa documentos y genera reportes automáticos. Lo que tomaba días, ahora toma minutos. Daniel hizo magia: rápido, profesional y soporte impecable.",
    result: "x10 velocidad operativa",
  },
];

export function Testimonials() {
  return (
    <TestimonialGrid
      titleLead="LO QUE DICEN MIS"
      titleHighlight="CLIENTES"
      items={testimonials}
    />
  );
}
