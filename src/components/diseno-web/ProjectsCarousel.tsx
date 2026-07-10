import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/primitives/Reveal";
import projectRestaurant from "@/assets/diseno-web/project-restaurant.webp";
import projectFashion from "@/assets/diseno-web/project-fashion.webp";
import projectAgency from "@/assets/diseno-web/project-agency.webp";
import projectSaas from "@/assets/diseno-web/project-saas.webp";
import projectStartup from "@/assets/diseno-web/project-startup.webp";
import projectPortfolio from "@/assets/diseno-web/project-portfolio.webp";

const projects = [
  { img: projectRestaurant, sector: "Gastronomía", title: "Maison Noir", desc: "Restaurante de alta cocina con sistema de reservas integrado.", result: "+52% reservas online" },
  { img: projectFashion, sector: "Fashion E-commerce", title: "Atelier 22", desc: "Tienda de moda de lujo con checkout optimizado.", result: "+68% conversión" },
  { img: projectAgency, sector: "Agencia Creativa", title: "North&Co Studio", desc: "Portfolio de agencia con showcase interactivo.", result: "x3 leads cualificados" },
  { img: projectSaas, sector: "SaaS", title: "Pulse Analytics", desc: "Dashboard B2B con onboarding y planes de pago.", result: "+40% trial → paid" },
  { img: projectStartup, sector: "Startup Tech", title: "Nexora", desc: "Landing de producto con animaciones cinemáticas.", result: "LCP 1.2s · 95 Lighthouse" },
  { img: projectPortfolio, sector: "Portfolio", title: "Aurel Voss", desc: "Portfolio de fotógrafa con galería editorial.", result: "+120% tiempo en sitio" },
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
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Portfolio</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            PROYECTOS <span className="text-neon">REALES</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">
            Webs que ya están vendiendo. Cada una, con su propia identidad.
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
