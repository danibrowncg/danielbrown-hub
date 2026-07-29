import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Hero } from "@/components/sistemas/Hero";
import { AboutDaniel } from "@/components/sistemas/AboutDaniel";
import { PackageIncludes } from "@/components/sistemas/PackageIncludes";
import { FastDelivery } from "@/components/sistemas/FastDelivery";
import { ProjectsCarousel } from "@/components/sistemas/ProjectsCarousel";
import { Features } from "@/components/sistemas/Features";
import { Testimonials } from "@/components/sistemas/Testimonials";
import { PaymentMethod } from "@/components/sistemas/PaymentMethod";
import { Faq } from "@/components/sistemas/Faq";
import { FinalCta } from "@/components/sistemas/FinalCta";
import { SiteFooter } from "@/components/sistemas/SiteFooter";
import { WhatsAppLeadProvider } from "@/components/shared/WhatsAppLead";
import { Marquee } from "@/components/primitives/Marquee";
import { ProcessSteps, type ProcessStep } from "@/components/shared/ProcessSteps";
import { Search, Blocks, Cpu, Rocket } from "lucide-react";

const PASOS: ProcessStep[] = [
  {
    Icon: Search,
    title: "Diagnóstico",
    desc: "Revisamos qué proceso te consume más tiempo hoy y si tiene sentido automatizarlo.",
    entrega: "Diagnóstico y propuesta con alcance.",
  },
  {
    Icon: Blocks,
    title: "Diseño",
    desc: "Defino cómo funcionará el sistema y qué hará la IA exactamente, paso por paso.",
    entrega: "Plan técnico y flujo aprobado por ti.",
  },
  {
    Icon: Cpu,
    title: "Desarrollo",
    desc: "Construyo el sistema y lo pruebo con tus casos reales, no con ejemplos de laboratorio.",
    entrega: "Sistema funcionando para que lo pruebes.",
  },
  {
    Icon: Rocket,
    title: "Puesta en marcha",
    desc: "Lo dejo operando, te entreno para usarlo y documento todo para tu equipo.",
    entrega: "Sistema en producción, training y docs.",
  },
];

const CAPACIDADES = [
  "Automatización de procesos",
  "IA integrada",
  "Dashboards",
  "Integración de APIs",
  "Chatbots",
  "Análisis de datos",
  "Software a medida",
];

const TITLE = "Daniel Brown · Software Inteligente con IA Integrada";
const DESC =
  "Sistemas automáticos y soluciones custom con IA para tu empresa. Automatización inteligente, análisis de datos y desarrollo en 1-2 semanas. Hosting y dominio incluidos.";

export const Route = createFileRoute("/sistemas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/sistemas" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/sistemas" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Desarrollo de software con IA integrada",
          provider: {
            "@type": "Person",
            name: "Daniel Brown",
            url: "https://instagram.com/danielbrown.ia",
            telephone: "+584226385173",
          },
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Sistemas,
});

function Sistemas() {
  return (
    <WhatsAppLeadProvider variant="sistema">
      <main id="top" className="relative z-10 text-ink">
        <Hero />
      <Marquee items={CAPACIDADES} />
      <AboutDaniel />
      <section id="paquete"><PackageIncludes /></section>
      <FastDelivery />
      <section id="portfolio"><ProjectsCarousel /></section>
      <Features />
      <Testimonials />
      <ProcessSteps
        eyebrow="Cómo trabajamos"
        titleLead="ASÍ SERÁ TU"
        titleHighlight="SISTEMA"
        intro="Sin sorpresas: sabes qué pasa en cada etapa y qué recibes al terminar cada una."
        steps={PASOS}
      />
      <PaymentMethod />
      <section id="faq"><Faq /></section>
      <section id="contacto"><FinalCta /></section>
      <SiteFooter />
        <Toaster theme="light" position="bottom-center" />
      </main>
    </WhatsAppLeadProvider>
  );
}
