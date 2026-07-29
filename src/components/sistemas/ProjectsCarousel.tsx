import { ProjectGrid, type Project } from "@/components/shared/ProjectGrid";
import projectChatbot from "@/assets/sistemas/project-chatbot-ai.webp";
import projectAutomation from "@/assets/sistemas/project-automation.webp";
import projectAnalytics from "@/assets/sistemas/project-data-analytics.webp";
import projectErp from "@/assets/sistemas/project-erp.webp";
import projectDocs from "@/assets/sistemas/project-doc-processing.webp";
import projectRecommender from "@/assets/sistemas/project-recommender.webp";

/** El primero se muestra destacado (ancho completo): pon ahí tu mejor caso. */
const projects: Project[] = [
  { img: projectChatbot, sector: "Chatbot IA", title: "Asistente Conversacional", desc: "Chatbot con IA que responde, califica leads y aprende de cada interacción.", result: "−70% tickets soporte" },
  { img: projectAutomation, sector: "Automatización", title: "Workflow Engine", desc: "Motor de automatización visual: pedidos, alertas y procesos en piloto automático.", result: "x12 velocidad de proceso" },
  { img: projectAnalytics, sector: "Análisis de Datos", title: "Nexora AI Analytics", desc: "Dashboard predictivo con detección de anomalías en tiempo real.", result: "Decisiones en minutos" },
  { img: projectErp, sector: "Gestión Empresarial", title: "Orion ERP", desc: "Panel de control con métricas, inventario y reportes automáticos.", result: "+45% eficiencia operativa" },
  { img: projectDocs, sector: "Procesamiento IA", title: "DocuAI", desc: "Extracción automática de datos desde facturas, contratos y formularios.", result: "−95% data entry manual" },
  { img: projectRecommender, sector: "Sistema Recomendador", title: "RecEngine ML", desc: "Recomendaciones personalizadas con machine learning y A/B testing.", result: "+56% click-through rate" },
];

export function ProjectsCarousel() {
  return (
    <ProjectGrid
      titleLead="PROYECTOS"
      titleHighlight="REALES"
      intro="Sistemas reales con IA en producción. Cada uno, con su propia identidad y caso de uso."
      items={projects}
    />
  );
}
