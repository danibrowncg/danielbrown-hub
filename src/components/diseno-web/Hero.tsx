import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GradientBlob } from "@/components/primitives/GradientBlob";
import { Magnetic } from "@/components/primitives/Magnetic";
import { useWhatsAppLead } from "@/components/shared/WhatsAppLead";
import danielImg from "@/assets/daniel.webp";

const title = ["DISEÑO", "WEB", "QUE", "CONVIERTE"];

export function Hero() {
  const reduce = useReducedMotion();
  const { openLead } = useWhatsAppLead();

  // El hero se desvanece y retrocede a medida que se hace scroll.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Retroceso sutil: nunca oculta contenido que sigue en pantalla.
  const opacity = useTransform(scrollYProgress, [0.3, 1], [1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const scrollStyle = reduce ? undefined : { opacity, scale, y };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex flex-col overflow-hidden px-5 pt-16 pb-8 sm:px-8 lg:px-16"
    >
      <GradientBlob className="-left-32 top-10 h-80 w-80" />
      <GradientBlob className="-right-24 top-1/3 h-72 w-72" delay={2} />

      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            aria-label="Volver al inicio"
            className="group inline-flex items-center gap-1.5 font-display text-lg tracking-wider text-ink transition-opacity hover:opacity-70 sm:text-xl"
          >
            <ArrowLeft
              className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
              strokeWidth={2.5}
            />
            Daniel Brown<span className="text-brand-deep">.</span>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 h-12 w-12 overflow-hidden rounded-full ring-2 ring-brand-deep/40"
          style={{ isolation: "isolate" }}
        >
          <img src={danielImg} alt="Daniel Brown" className="h-full w-full object-cover" width={48} height={48} decoding="async" />
        </motion.div>
      </div>

      {/* badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-10 flex items-center gap-2 self-start rounded-full brand-grad px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-[0_8px_24px_-12px_rgba(73,16,188,0.55)] sm:text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
        </span>
        Desde $220 · Entrega 3-5 días
      </motion.div>

      {/* headline */}
      <motion.div style={scrollStyle} className="relative z-10 mt-6 flex-1">
        <h1 className="font-display text-[15vw] leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          {title.map((word, i) => (
            <motion.span
              key={word}
              className={`mr-3 inline-block ${word === "CONVIERTE" ? "text-brand-grad" : ""}`}
              initial={{ opacity: 0, y: 40, rotateX: reduce ? 0 : -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-brand-grad"
          >
            .
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-5 max-w-xl text-base text-ink/70 sm:text-lg lg:text-xl"
        >
          Webs premium, optimizadas y estratégicas para que tu negocio venda 24/7.
          Diseño exclusivo, código limpio, resultado real.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 180, damping: 18 }}
          className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Magnetic className="self-start">
            <motion.button
              type="button"
              onClick={openLead}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-neon px-7 text-base font-bold uppercase tracking-wider text-ink"
              style={{ animation: "pulse-neon 2.2s ease-in-out infinite" }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
              />
              <span className="relative">Cotizar por WhatsApp</span>
              <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </motion.button>
          </Magnetic>
          <span className="text-sm text-ink/60">Respondo en minutos</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
