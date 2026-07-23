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
        <Toaster theme="light" position="bottom-center" />
      </main>
    </WhatsAppLeadProvider>
  );
}
