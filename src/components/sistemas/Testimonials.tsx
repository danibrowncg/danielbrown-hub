import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import t1 from "@/assets/sistemas/testimonial-1.webp";
import t2 from "@/assets/sistemas/testimonial-2.webp";
import t3 from "@/assets/sistemas/testimonial-3.webp";

const testimonials = [
  {
    img: t1,
    name: "María González",
    company: "Pulse Marketing",
    sector: "Agencia de Marketing",
    quote: "Antes gastábamos 20 horas semanales en tareas manuales. El sistema con IA que Daniel desarrolló automatizó todo. Ahora el equipo se enfoca en estrategia, no en operativa.",
    result: "−80% tiempo manual",
  },
  {
    img: t2,
    name: "Carlos Rivera",
    company: "Nexora Tech",
    sector: "Startup B2B",
    quote: "Necesitábamos un sistema custom con IA y nadie nos entendía. Daniel lo entregó en 2 semanas, funcionando y escalable. Subió la productividad de todo el equipo.",
    result: "+60% productividad",
  },
  {
    img: t3,
    name: "Valentina Cruz",
    company: "LogiFlow",
    sector: "Empresa de Logística",
    quote: "El sistema procesa documentos y genera reportes automáticos. Lo que tomaba días, ahora toma minutos. Daniel hizo magia: rápido, profesional y soporte impecable.",
    result: "x10 velocidad operativa",
  },
];

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto mb-10 max-w-6xl px-5 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Testimonios</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            LO QUE DICEN MIS <span className="text-neon">CLIENTES</span>.
          </h2>
        </Reveal>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4 px-5 sm:gap-6 sm:px-8 lg:px-16">
          {testimonials.map((t) => (
            <motion.article
              key={t.name}
              className="relative shrink-0 basis-[88%] overflow-hidden rounded-2xl border border-white/10 brand-gradient p-6 transition-shadow duration-300 hover:border-neon/30 hover:shadow-[0_28px_80px_-28px_rgba(231,255,0,0.35)] sm:basis-[60%] sm:p-8 lg:basis-[40%]"
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-ink/40" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} loading="lazy" decoding="async" className="h-14 w-14 rounded-full object-cover ring-2 ring-neon/60" />
                  <div>
                    <p className="font-display text-lg uppercase text-white">{t.name}</p>
                    <p className="text-sm text-white/70">{t.company}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="rounded-full bg-neon/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-neon">
                    {t.sector}
                  </span>
                  <div className="flex gap-0.5 text-neon">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, type: "spring", stiffness: 220 }}
                      >
                        <Star className="h-4 w-4 fill-current" strokeWidth={0} />
                      </motion.span>
                    ))}
                  </div>
                </div>
                <p className="mt-5 text-base leading-relaxed text-white">"{t.quote}"</p>
                <p className="mt-5 text-sm font-semibold text-neon">{t.result}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
