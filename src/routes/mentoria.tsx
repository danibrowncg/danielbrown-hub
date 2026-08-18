import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/mentoria/Hero";
import { TerminalBlock } from "@/components/mentoria/TerminalBlock";
import { Program } from "@/components/mentoria/Program";
import { Offer } from "@/components/mentoria/Offer";
import { Proof } from "@/components/mentoria/Proof";
import { Faq } from "@/components/mentoria/Faq";
import { FinalCta } from "@/components/mentoria/FinalCta";
import { SiteFooter } from "@/components/servicios/SiteFooter";
import { Marquee } from "@/components/primitives/Marquee";
import { ScrollProgress } from "@/components/primitives/ScrollProgress";
import { MentoriaApplyProvider } from "@/components/shared/MentoriaApply";

const RECORRIDO = [
  "Tu idea",
  "Arquitectura",
  "Construcción en vivo",
  "Interfaz y datos",
  "Despliegue",
  "Tu proyecto online",
];

const TITLE = "Mentoría MVP · Mentoría 1:1 con Daniel Brown — construye tu primer sistema en 4 semanas";
const DESC =
  "Mentoría personalizada 1:1 de 4 semanas: construimos juntos tu primer sistema real con Claude Code —web, software, sistema o app— y lo dejamos publicado. $225 USD, solo 5 cupos al mes.";

export const Route = createFileRoute("/mentoria")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mentoria" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/mentoria" }],
  }),
  component: Mentoria,
});

function Mentoria() {
  return (
    <MentoriaApplyProvider>
      <ScrollProgress />
      <main id="top" className="relative z-10 text-ink">
        <Hero />
        <Marquee items={RECORRIDO} duration={30} />
        <TerminalBlock />
        <Program />
        <Offer />
        <Proof />
        <Faq />
        <FinalCta />
        <SiteFooter />
      </main>
    </MentoriaApplyProvider>
  );
}
