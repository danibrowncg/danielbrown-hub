import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GradientBlob } from "@/components/primitives/GradientBlob";
import { useWhatsAppLead } from "@/components/shared/WhatsAppLead";
import danielImg from "@/assets/daniel.jpg";

const title = ["DISEÑO", "WEB", "QUE", "CONVIERTE"];

export function Hero() {
  const reduce = useReducedMotion();
  const { openLead } = useWhatsAppLead();
  return (
    <section className="grain relative isolate flex flex-col overflow-hidden px-5 pt-16 pb-8 sm:px-8 lg:px-16">
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
            className="group inline-flex items-center gap-1.5 font-display text-lg tracking-wider text-white transition-opacity hover:opacity-80 sm:text-xl"
          >
            <ArrowLeft
              className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
              strokeWidth={2.5}
            />
            Daniel Brown<span className="text-white">.</span>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 h-12 w-12 overflow-hidden rounded-full ring-2 ring-neon/60"
          style={{ isolation: "isolate" }}
        >
          <img src={danielImg} alt="Daniel Brown" className="h-full w-full object-cover" />
        </motion.div>
      </div>

      {/* badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-10 flex items-center gap-2 self-start rounded-full border border-neon/40 bg-neon/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-neon sm:text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
        </span>
        Desde $220 · Entrega 3-5 días
      </motion.div>

      {/* headline */}
      <div className="relative z-10 mt-6 flex-1">
        <h1 className="font-display text-[15vw] leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          {title.map((word, i) => (
            <motion.span
              key={word}
              className={`mr-3 inline-block ${word === "CONVIERTE" ? "text-neon" : ""}`}
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
            className="text-neon"
          >
            .
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-5 max-w-xl text-base text-white/70 sm:text-lg lg:text-xl"
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
          <motion.button
            type="button"
            onClick={openLead}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-neon px-7 text-base font-bold uppercase tracking-wider text-ink"
            style={{ animation: "pulse-neon 2.2s ease-in-out infinite" }}
          >
            Cotizar por WhatsApp
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </motion.button>
          <span className="text-sm text-white/60">Respondo en minutos</span>
        </motion.div>
      </div>
    </section>
  );
}
