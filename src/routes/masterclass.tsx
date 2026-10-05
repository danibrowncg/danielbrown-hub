import { createFileRoute } from "@tanstack/react-router";
import { MasterclassLanding } from "@/components/masterclass/MasterclassLanding";
import { MASTERCLASS_LAUNCH_ISO } from "@/lib/constants";
import { fechaLegible } from "@/lib/countdown";

const FECHA = fechaLegible(MASTERCLASS_LAUNCH_ISO);
const TITLE = "Masterclass gratuita · Daniel Brown";
const DESC = `La masterclass gratuita de Daniel Brown se estrena el ${FECHA.larga}. El enlace se publica solo en la comunidad gratuita de WhatsApp.`;

/**
 * Página de espera de la masterclass gratuita: cuenta regresiva + acceso a la
 * comunidad de WhatsApp, que es donde se publica el enlace el día del estreno.
 *
 * El `loader` entrega la hora del servidor para que el contador ya venga con
 * sus cifras en el HTML. Sin eso, el primer render no puede saber la hora (el
 * servidor y el navegador darían valores distintos y React se quejaría) y el
 * contador aparecería vacío hasta que cargara el JavaScript.
 *
 * Cuando la masterclass esté publicada, el botón del hub puede apuntar directo
 * a ella y esta página deja de hacer falta.
 */
export const Route = createFileRoute("/masterclass")({
  loader: () => ({ ahora: Date.now() }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/masterclass" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/masterclass" }],
  }),
  component: Masterclass,
});

function Masterclass() {
  const { ahora } = Route.useLoaderData();
  return <MasterclassLanding ahoraInicial={ahora} />;
}
