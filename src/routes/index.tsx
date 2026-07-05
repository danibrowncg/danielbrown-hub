import { createFileRoute } from "@tanstack/react-router";
import { HubLanding } from "@/components/hub/HubLanding";

const TITLE = "Daniel Brown · Diseño Web y Sistemas con IA";
const DESC =
  "Enlaces oficiales de Daniel Brown (@danielbrown.ia): diseño web premium que convierte, sistemas de software con IA a medida y la comunidad gratuita de WhatsApp para aprender a dominar Claude e IA.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Daniel Brown",
          alternateName: "@danielbrown.ia",
          description:
            "Diseño web y sistemas de software con inteligencia artificial.",
          url: "https://instagram.com/danielbrown.ia",
          sameAs: [
            "https://instagram.com/danielbrown.ia",
            "https://tiktok.com/@danielbrown.ia",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <HubLanding />;
}
