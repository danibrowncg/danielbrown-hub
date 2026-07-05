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
      <main id="top" className="relative z-10 text-white">
        <Hero />
      <AboutDaniel />
      <section id="paquete"><PackageIncludes /></section>
      <FastDelivery />
      <section id="portfolio"><ProjectsCarousel /></section>
      <Features />
      <Testimonials />
      <PaymentMethod />
      <section id="faq"><Faq /></section>
      <section id="contacto"><FinalCta /></section>
      <SiteFooter />
        <Toaster theme="dark" position="bottom-center" />
      </main>
    </WhatsAppLeadProvider>
  );
}
