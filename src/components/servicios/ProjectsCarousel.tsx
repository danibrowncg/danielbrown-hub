import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/primitives/Reveal";
import projectRestaurant from "@/assets/servicios/project-restaurant.webp";
import projectFashion from "@/assets/servicios/project-fashion.webp";
import projectAgency from "@/assets/servicios/project-agency.webp";
import projectChatbot from "@/assets/servicios/project-chatbot-ai.webp";
import projectAutomation from "@/assets/servicios/project-automation.webp";
import projectErp from "@/assets/servicios/project-erp.webp";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";

const projects = [
  { img: projectRestaurant, sector: "Página web", title: "Maison Noir", desc: "Restaurante de alta cocina con sistema de reservas integrado.", result: "+52% reservas online" },
  { img: projectChatbot, sector: "Chatbot con IA", title: "Asistente de WhatsApp", desc: "Atiende, responde dudas y agenda clientes automáticamente, 24/7.", result: "−70% mensajes manuales" },
  { img: projectFashion, sector: "Tienda online", title: "Atelier 22", desc: "Tienda de moda con checkout optimizado para móvil.", result: "+68% conversión" },
  { img: projectAutomation, sector: "Automatización", title: "Workflow Engine", desc: "Pedidos, alertas y procesos internos en piloto automático.", result: "x12 velocidad de proceso" },
  { img: projectAgency, sector: "Web corporativa", title: "North&Co Studio", desc: "Sitio de agencia con showcase interactivo de proyectos.", result: "x3 leads cualificados" },
  { img: projectErp, sector: "Sistema a medida", title: "Orion ERP", desc: "Panel de control con métricas, inventario y reportes automáticos.", result: "+45% eficiencia operativa" },
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
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto mb-10 max-w-6xl px-5 sm:px-8 lg:px-16">
        <Reveal>
          <Eyebrow>Portfolio</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            PROYECTOS <Highlight>REALES</Highlight>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-ink/65 sm:text-lg">
            Webs, chatbots y sistemas funcionando en negocios reales.
          </p>
        </Reveal>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4 px-5 sm:gap-6 sm:px-8 lg:px-16">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              className="group relative basis-[88%] shrink-0 overflow-hidden rounded-2xl border border-ink/10 shadow-[0_4px_24px_-16px_rgba(13,0,38,0.3)] transition-shadow duration-300 hover:shadow-[0_30px_80px_-40px_rgba(13,0,38,0.45)] sm:basis-[62%] lg:basis-[42%]"
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
              i === selected ? "w-8 brand-grad" : "w-2 bg-ink/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
