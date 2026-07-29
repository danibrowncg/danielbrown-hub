import { TestimonialGrid, type Testimonial } from "@/components/shared/TestimonialGrid";
import t1 from "@/assets/diseno-web/testimonial-1.webp";
import t2 from "@/assets/diseno-web/testimonial-2.webp";
import t3 from "@/assets/diseno-web/testimonial-3.webp";

/**
 * Para añadir un testimonio: agrega un objeto a este array. La retícula se
 * acomoda sola (con 6 llena las dos filas). Usa SIEMPRE nombre, empresa y frase
 * reales del cliente, con su permiso.
 */
const testimonials: Testimonial[] = [
  {
    img: t1,
    name: "María González",
    company: "Maison Noir",
    sector: "Restaurante",
    quote:
      "Daniel entendió mi marca desde el primer mensaje. La web no parece web, parece una experiencia. Las reservas subieron una barbaridad.",
    result: "+52% reservas en 30 días",
  },
  {
    img: t2,
    name: "Carlos Rivera",
    company: "Nexora",
    sector: "Startup SaaS",
    quote:
      "Trabajé con 3 estudios antes. Ninguno entregó lo que Daniel. Rápido, profesional, y la web es una bestia: carga en menos de 2 segundos.",
    result: "x2 conversiones vs anterior",
  },
  {
    img: t3,
    name: "Valentina Cruz",
    company: "Atelier 22",
    sector: "E-commerce moda",
    quote:
      "Mi tienda online por fin se ve como yo siempre la imaginé. Diseño limpio, premium, y muy fácil de actualizar yo misma.",
    result: "+68% tasa de conversión",
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
