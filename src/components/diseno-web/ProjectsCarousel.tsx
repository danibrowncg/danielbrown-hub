import { ProjectGrid, type Project } from "@/components/shared/ProjectGrid";
import projectRestaurant from "@/assets/diseno-web/project-restaurant.webp";
import projectFashion from "@/assets/diseno-web/project-fashion.webp";
import projectAgency from "@/assets/diseno-web/project-agency.webp";
import projectSaas from "@/assets/diseno-web/project-saas.webp";
import projectStartup from "@/assets/diseno-web/project-startup.webp";
import projectPortfolio from "@/assets/diseno-web/project-portfolio.webp";

/** El primero se muestra destacado (ancho completo): pon ahí tu mejor caso. */
const projects: Project[] = [
  { img: projectRestaurant, sector: "Gastronomía", title: "Maison Noir", desc: "Restaurante de alta cocina con sistema de reservas integrado.", result: "+52% reservas online" },
  { img: projectFashion, sector: "Fashion E-commerce", title: "Atelier 22", desc: "Tienda de moda de lujo con checkout optimizado.", result: "+68% conversión" },
  { img: projectAgency, sector: "Agencia Creativa", title: "North&Co Studio", desc: "Portfolio de agencia con showcase interactivo.", result: "x3 leads cualificados" },
  { img: projectSaas, sector: "SaaS", title: "Pulse Analytics", desc: "Dashboard B2B con onboarding y planes de pago.", result: "+40% trial → paid" },
  { img: projectStartup, sector: "Startup Tech", title: "Nexora", desc: "Landing de producto con animaciones cinemáticas.", result: "LCP 1.2s · 95 Lighthouse" },
  { img: projectPortfolio, sector: "Portfolio", title: "Aurel Voss", desc: "Portfolio de fotógrafa con galería editorial.", result: "+120% tiempo en sitio" },
];

export function ProjectsCarousel() {
  return (
    <ProjectGrid
      titleLead="PROYECTOS"
      titleHighlight="REALES"
      intro="Webs que ya están vendiendo. Cada una, con su propia identidad."
      items={projects}
    />
  );
}
