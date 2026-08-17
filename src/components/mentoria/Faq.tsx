import { FaqSection, type FaqItem } from "@/components/shared/FaqSection";
import { useMentoriaApply } from "@/components/shared/MentoriaApply";

const faqs: FaqItem[] = [
  {
    q: "¿Y si no tengo nada de experiencia técnica?",
    a: "Es el caso más común y no es problema. Por eso es 1:1 y no un curso grabado: adapto el ritmo y el lenguaje a tu nivel. Si nunca has programado, empezamos por lo básico y aun así terminas con tu proyecto publicado; lo que aprendes es a dirigir la herramienta, no a escribir código de memoria.",
  },
  {
    q: "¿Y si todavía no tengo clara mi idea?",
    a: "La primera llamada es justamente para eso. Llegamos a qué construir, para quién y qué problema resuelve, y recortamos el alcance a algo que sí quepa en 4 semanas. Llegar con una idea a medias es normal; llegar sin ninguna también se resuelve conversando.",
  },
  {
    q: "¿Qué pasa si no puedo en el horario de una llamada?",
    a: "Se reagenda. El día lo defines tú al empezar, y si una semana se te complica movemos esa llamada. Lo que no hago es dejarte perder la sesión.",
  },
  {
    q: "¿El soporte por WhatsApp tiene límite?",
    a: "Durante las 4 semanas me escribes cuando te trabas, sin contar mensajes. Al terminar el programa el canal queda abierto para dudas puntuales — ya sin el ritmo intenso de las semanas activas, pero no desaparezco.",
  },
  {
    q: "¿Cuánto tiempo necesito dedicarle por semana?",
    a: "La llamada son entre 60 y 90 minutos. Entre llamadas te dejo tareas concretas; con 2 o 3 horas de práctica avanzas cómodo. Si una semana andas corto de tiempo, ajustamos el alcance en vez de acumular deuda.",
  },
  {
    q: "¿Qué pasa si mi proyecto es más grande de lo que cabe en 4 semanas?",
    a: "Lo recortamos a la versión más pequeña que ya sirva y se pueda publicar. Terminas con algo real funcionando, y con el criterio para seguir agregándole cosas tú solo.",
  },
  {
    q: "¿Necesito pagar herramientas aparte?",
    a: "Vas a necesitar tu propia cuenta de Claude y, si tu proyecto lo requiere, un dominio. Son costos aparte y bajos; en la primera llamada te digo exactamente qué vas a necesitar antes de que gastes nada.",
  },
  {
    q: "¿Cómo aplico y qué pasa después?",
    a: "Le das a Aplicar ahora, respondes 4 preguntas rápidas y se te abre WhatsApp con tu mensaje listo. Yo te respondo, conversamos si encajas en el programa y, si hay cupo, coordinamos el arranque.",
  },
];

export function Faq() {
  const { openApply } = useMentoriaApply();
  return (
    <FaqSection
      items={faqs}
      intro="Lo que más me preguntan antes de entrar. Si te queda otra duda, escríbeme y la resolvemos."
      ctaLabel="Aplicar ahora"
      onCta={openApply}
    />
  );
}
