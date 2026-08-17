import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Hero } from "@/components/servicios/Hero";
import { Services } from "@/components/servicios/Services";
import { AboutDaniel } from "@/components/servicios/AboutDaniel";
import { PackageIncludes } from "@/components/servicios/PackageIncludes";
import { FastDelivery } from "@/components/servicios/FastDelivery";
import { ProjectsCarousel } from "@/components/servicios/ProjectsCarousel";
import { Features } from "@/components/servicios/Features";
import { Testimonials } from "@/components/servicios/Testimonials";
import { PaymentMethod } from "@/components/servicios/PaymentMethod";
import { Faq } from "@/components/servicios/Faq";
import { FinalCta } from "@/components/servicios/FinalCta";
import { SiteFooter } from "@/components/servicios/SiteFooter";
import { WhatsAppLeadProvider } from "@/components/shared/WhatsAppLead";
import { Marquee } from "@/components/primitives/Marquee";
import { ProcessSteps, type ProcessStep } from "@/components/shared/ProcessSteps";
import { MessageCircle, PenTool, Code2, Rocket } from "lucide-react";

const PASOS: ProcessStep[] = [
  {
    Icon: MessageCircle,
    title: "Hablamos",
    desc: "Me cuentas qué necesita tu negocio. Sin tecnicismos y sin compromiso.",
    entrega: "Propuesta con alcance y precio cerrado.",
  },
  {
    Icon: PenTool,
    title: "Diseño",
    desc: "Defino cómo va a funcionar y cómo se va a ver, antes de programar nada. Ajustamos hasta que te guste.",
    entrega: "Diseño o plan técnico para aprobar.",
  },
  {
    Icon: Code2,
    title: "Desarrollo",
    desc: "Construyo lo aprobado y lo pruebo con casos reales de tu negocio, no con ejemplos de laboratorio.",
    entrega: "Enlace de prueba para revisarlo en vivo.",
  },
  {
    Icon: Rocket,
    title: "Entrega",
    desc: "Lo dejo funcionando, te enseño a manejarlo y quedas con soporte durante 12 meses.",
    entrega: "Proyecto publicado, accesos y soporte.",
  },
];

const CAPACIDADES = [
  "Páginas web",
  "Chatbots con IA",
  "WhatsApp Business",
  "Aplicaciones a medida",
  "Automatización",
  "E-commerce",
  "Paneles y reportes",
  "Integración de APIs",
];

const TITLE =
  "Daniel Brown · Páginas web, chatbots con IA y sistemas para tu negocio";
const DESC =
  "Creo páginas web que venden, chatbots con IA para WhatsApp, aplicaciones y sistemas automatizados. Webs desde $220, entrega rápida, soporte incluido.";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/servicios" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: Servicios,
});

function Servicios() {
  return (
    <WhatsAppLeadProvider>
      <main id="top" className="relative z-10 text-ink">
        <Hero />
        <Marquee items={CAPACIDADES} />
        <Services />
        <AboutDaniel />
        <section id="paquete">
          <PackageIncludes />
        </section>
        <FastDelivery />
        <section id="portfolio">
          <ProjectsCarousel />
        </section>
        <Features />
        <Testimonials />
        <ProcessSteps
          eyebrow="Cómo trabajamos"
          titleLead="ASÍ SERÁ TU"
          titleHighlight="PROYECTO"
          intro="Sin sorpresas: sabes qué pasa en cada etapa y qué recibes al terminar cada una."
          steps={PASOS}
        />
        <PaymentMethod />
        <section id="faq">
          <Faq />
        </section>
        <section id="contacto">
          <FinalCta />
        </section>
        <SiteFooter />
        <Toaster theme="light" position="bottom-center" />
      </main>
    </WhatsAppLeadProvider>
  );
}
