import { createFileRoute } from "@tanstack/react-router";
import { HubLanding } from "@/components/hub/HubLanding";
import { OpenInBrowserHint } from "@/components/hub/OpenInBrowserHint";

const TITLE = "Daniel Brown · Diseño Web y Sistemas con IA";
const DESC =
  "Enlaces oficiales de Daniel Brown (@danielbrown.ia): diseño web premium que convierte, sistemas de software con IA a medida y la comunidad gratuita de WhatsApp para aprender a dominar Claude e IA.";

/**
 * Ruta corta para la biografía de TikTok.
 *
 * Es la misma página de enlaces —mismo componente, no una copia— más el aviso
 * de "abrir en el navegador", que solo hace falta viniendo del visor integrado
 * de TikTok. Al reutilizar `HubLanding`, cualquier cambio futuro en el hub sale
 * en las dos rutas sin tener que acordarse de tocar dos archivos.
 *
 * Lleva `noindex` y canonical a "/": es una variante del hub para un canal
 * concreto, no una página distinta, y no debe competir con la principal.
 */
export const Route = createFileRoute("/tk")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/tk" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Tk,
});

function Tk() {
  return (
    <>
      <OpenInBrowserHint />
      <HubLanding />
    </>
  );
}
