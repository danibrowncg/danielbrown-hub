import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Ruta antigua. Las dos landings (`/diseno-web` y `/sistemas`) se unificaron
 * en `/servicios`; esto redirige para no romper los enlaces ya compartidos en
 * redes, WhatsApp o mensajes antiguos.
 */
export const Route = createFileRoute("/diseno-web")({
  beforeLoad: () => {
    throw redirect({ to: "/servicios", replace: true });
  },
});
