import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/primitives/Reveal";
import projectChatbot from "@/assets/sistemas/project-chatbot-ai.webp";
import projectAutomation from "@/assets/sistemas/project-automation.webp";
import projectAnalytics from "@/assets/sistemas/project-data-analytics.webp";
import projectErp from "@/assets/sistemas/project-erp.webp";
import projectDocs from "@/assets/sistemas/project-doc-processing.webp";
import projectRecommender from "@/assets/sistemas/project-recommender.webp";

const projects = [
  { img: projectChatbot, sector: "Chatbot IA", title: "Asistente Conversacional", desc: "Chatbot con IA que responde, califica leads y aprende de cada interacción.", result: "−70% tickets soporte" },
  { img: projectAutomation, sector: "Automatización", title: "Workflow Engine", desc: "Motor de automatización visual: pedidos, alertas y procesos en piloto automático.", result: "x12 velocidad de proceso" },
  { img: projectAnalytics, sector: "Análisis de Datos", title: "Nexora AI Analytics", desc: "Dashboard predictivo con detección de anomalías en tiempo real.", result: "Decisiones en minutos" },
  { img: projectErp, sector: "Gestión Empresarial", title: "Orion ERP", desc: "Panel de control con métricas, inventario y reportes automáticos.", result: "+45% eficiencia operativa" },
  { img: projectDocs, sector: "Procesamiento IA", title: "DocuAI", desc: "Extracción automática de datos desde facturas, contratos y formularios.", result: "−95% data entry manual" },
  { img: projectRecommender, sector: "Sistema Recomendador", title: "RecEngine ML", desc: "Recomendaciones personalizadas con machine learning y A/B testing.", result: "+56% click-through rate" },
];

export function ProjectsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5500, stopOnInteraction: false })],
  );
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="grain relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto mb-10 max-w-6xl px-5 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Portfolio</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            PROYECTOS <span className="text-neon">REALES</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">
            Sistemas reales con IA en producción. Cada uno, con su propia identidad y caso de uso.
          </p>
        </Reveal>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4 px-5 sm:gap-6 sm:px-8 lg:px-16">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              className="group relative basis-[88%] shrink-0 overflow-hidden rounded-2xl border border-white/10 transition-shadow duration-300 hover:border-neon/40 hover:shadow-[0_28px_80px_-28px_rgba(231,255,0,0.4)] sm:basis-[62%] lg:basis-[42%]"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-2">
                <img
                  src={p.img}
                  alt={p.title}
                  loading={i < 2 ? "eager" : "lazy"} decoding="async"
                  width={960}
                  height={672}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="inline-block rounded-full bg-neon/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-neon">
                  {p.sector}
                </span>
                <h3 className="mt-3 font-display text-2xl uppercase text-white sm:text-3xl">{p.title}</h3>
                <p className="mt-1 text-sm text-white/70">{p.desc}</p>
                <p className="mt-3 text-sm font-semibold text-neon">{p.result}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-2 px-5">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir al proyecto ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selected ? "w-8 bg-neon" : "w-2 bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
