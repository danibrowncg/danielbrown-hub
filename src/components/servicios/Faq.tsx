import { FaqSection, type FaqItem } from "@/components/shared/FaqSection";

const faqs: FaqItem[] = [
  { q: "¿Cuánto cuesta y cuánto tarda?", a: "Las páginas web parten desde $220 y se entregan en 3-5 días laborables. Los chatbots, aplicaciones y sistemas se cotizan según lo que necesites, y suelen tomar entre 1 y 2 semanas. En ambos casos te paso el precio cerrado antes de empezar." },
  { q: "¿Qué hace exactamente un chatbot con IA?", a: "Atiende a tus clientes por WhatsApp, Instagram o tu web sin que tú estés: responde las preguntas de siempre, toma pedidos o reservas, califica interesados y te pasa solo los que valen la pena. Trabaja las 24 horas." },
  { q: "¿En qué plataformas funciona el chatbot?", a: "Principalmente WhatsApp, que es donde están tus clientes. También Instagram, Messenger y un asistente dentro de tu propia página web. Se puede conectar a varias a la vez." },
  { q: "¿Incluye dominio y hosting?", a: "Sí. El primer año de dominio personalizado y hosting de alta velocidad están incluidos en el precio de tu página web." },
  { q: "¿Qué soporte incluye?", a: "12 meses de soporte técnico: monitoreo, correcciones, mantenimiento básico y respaldo automático." },
  { q: "¿Puedo empezar por la web y agregar el chatbot después?", a: "Claro, es lo más común. Muchos empiezan con la página web y cuando les llegan más mensajes de los que pueden atender, sumamos el chatbot. Todo se diseña para poder crecer por partes." },
  { q: "¿Todo es responsive?", a: "Sí. Se diseña primero para móvil y se adapta a tablet y escritorio, porque ahí es donde te va a ver la mayoría de tus clientes." },
  { q: "¿Cuál es el próximo paso?", a: "Escríbeme por WhatsApp y cuéntame qué necesitas. Analizamos tu caso, te paso una propuesta personalizada y arrancamos." },
];

export function Faq() {
  return (
    <FaqSection
      items={faqs}
      intro="Lo que más me preguntan antes de arrancar. Si tu caso es distinto, escríbeme y lo vemos."
    />
  );
}
