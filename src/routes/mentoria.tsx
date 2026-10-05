import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Landing de la Mentoría MVP: EN PAUSA desde octubre de 2026.
 *
 * Daniel dejó de ofrecerla. La ruta redirige al inicio para que los enlaces ya
 * compartidos no den un 404, y el botón del hub pasó a ser el de la masterclass
 * gratuita (`/masterclass`).
 *
 * No se borró nada: los componentes siguen en `src/components/mentoria/`, el
 * formulario en `src/components/shared/MentoriaApply.tsx` y el video en
 * `public/mentoria.mp4`. Para reactivarla basta con recuperar esta ruta:
 *
 *   git show a7e4564:src/routes/mentoria.tsx > src/routes/mentoria.tsx
 *
 * y volver a poner su botón en `src/components/hub/HubLanding.tsx`.
 */
export const Route = createFileRoute("/mentoria")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
