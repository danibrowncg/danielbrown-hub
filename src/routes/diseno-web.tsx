import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Hero } from "@/components/diseno-web/Hero";
import { AboutDaniel } from "@/components/diseno-web/AboutDaniel";
import { PackageIncludes } from "@/components/diseno-web/PackageIncludes";
import { FastDelivery } from "@/components/diseno-web/FastDelivery";
import { ProjectsCarousel } from "@/components/diseno-web/ProjectsCarousel";
import { Features } from "@/components/diseno-web/Features";
import { Testimonials } from "@/components/diseno-web/Testimonials";
import { PaymentMethod } from "@/components/diseno-web/PaymentMethod";
import { Faq } from "@/components/diseno-web/Faq";
import { FinalCta } from "@/components/diseno-web/FinalCta";
import { SiteFooter } from "@/components/diseno-web/SiteFooter";
import { WhatsAppLeadProvider } from "@/components/shared/WhatsAppLead";
import { Marquee } from "@/components/primitives/Marquee";
import { ProcessSteps, type ProcessStep } from "@/components/shared/ProcessSteps";
import { MessageCircle, PenTool, Code2, Rocket } from "lucide-react";

const PASOS: ProcessStep[] = [
  {
    Icon: MessageCircle,
    title: "Hablamos",
    desc: "Me cuentas qué vendes y a quién. Sin tecnicismos y sin compromiso.",
    entrega: "Propuesta con alcance y precio cerrado.",
  },
  {
    Icon: PenTool,
    title: "Diseño",
    desc: "Diseño la web completa antes de escribir una línea de código. Ajustamos hasta que te guste.",
    entrega: "Diseño de todas las pantallas para aprobar.",
  },
  {
    Icon: Code2,
    title: "Desarrollo",
    desc: "Construyo la web ya aprobada: rápida, responsive y optimizada para Google.",
    entrega: "Enlace de prueba para revisarla en vivo.",
  },
  {
    Icon: Rocket,
    title: "Entrega",
    desc: "Publico la web en tu dominio y te enseño a manejarla. Quedas con soporte 12 meses.",
    entrega: "Web publicada, accesos y soporte.",
  },
];

const CAPACIDADES = [
  "Diseño UX/UI",
  "Desarrollo web",
  "Mobile-first",
  "SEO técnico",
  "Optimización de velocidad",
  "Landing pages",
  "E-commerce",
  "Animaciones",
];

const TITLE = "Daniel Brown · Diseño Web Profesional que Convierte";
const DESC =
  "Webs premium, optimizadas y estratégicas para tu negocio. Desde $220. Entrega en 3-5 días. Dominio, hosting y soporte incluidos.";

export const Route = createFileRoute("/diseno-web")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/diseno-web" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/diseno-web" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Diseño y desarrollo web",
          provider: {
            "@type": "Person",
            name: "Daniel Brown",
            url: "https://instagram.com/danielbrown.ia",
            telephone: "+584226385173",
          },
          areaServed: "Worldwide",
          offers: {
            "@type": "Offer",
            price: "220",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        }),
      },
    ],
  }),
  component: DisenoWeb,
});

function DisenoWeb() {
  return (
    <WhatsAppLeadProvider variant="web">
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
        titleHighlight="PROYECTO"
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
