import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import t1 from "@/assets/diseno-web/testimonial-1.jpg";
import t2 from "@/assets/diseno-web/testimonial-2.jpg";
import t3 from "@/assets/diseno-web/testimonial-3.jpg";

const testimonials = [
  {
    img: t1,
    name: "María González",
    company: "Maison Noir",
    sector: "Restaurante",
    quote: "Daniel entendió mi marca desde el primer mensaje. La web no parece web, parece una experiencia. Las reservas subieron una barbaridad.",
    result: "+52% reservas en 30 días",
  },
  {
    img: t2,
    name: "Carlos Rivera",
    company: "Nexora",
    sector: "Startup SaaS",
    quote: "Trabajé con 3 estudios antes. Ninguno entregó lo que Daniel. Rápido, profesional, y la web es una bestia: carga en menos de 2 segundos.",
    result: "x2 conversiones vs anterior",
  },
  {
    img: t3,
    name: "Valentina Cruz",
    company: "Atelier 22",
    sector: "E-commerce moda",
    quote: "Mi tienda online por fin se ve como yo siempre la imaginé. Diseño limpio, premium, y muy fácil de actualizar yo misma.",
    result: "+68% tasa de conversión",
  },
];

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

  return (
    <section className="grain relative overflow-hidden py-20 lg:py-28">
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
                  <img src={t.img} alt={t.name} loading="lazy" className="h-14 w-14 rounded-full object-cover ring-2 ring-neon/60" />
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
