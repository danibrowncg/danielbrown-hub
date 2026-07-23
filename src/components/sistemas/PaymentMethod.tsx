import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";

const steps = [
  { n: "01", title: "50% al iniciar", desc: "Reservas el desarrollo y arrancamos con la planificación del sistema." },
  { n: "02", title: "50% al entregar", desc: "Pagas el resto cuando el sistema esté terminado y aprobado por ti." },
];

export function PaymentMethod() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink">Forma de pago</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            CÓMO FUNCIONA EL <span className="text-brand-grad">PAGO</span>.
          </h2>
        </Reveal>

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2">

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink p-7 shadow-[0_12px_40px_-20px_rgba(13,0,38,0.5)]"
            >
              <div className="font-display text-6xl text-neon/40">{s.n}</div>
              <h3 className="mt-2 font-display text-2xl uppercase text-white sm:text-3xl">{s.title}</h3>
              <p className="mt-3 text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="inline-flex items-center gap-2 font-display text-2xl uppercase text-brand-grad sm:text-3xl"><ShieldCheck className="h-7 w-7 text-teal" strokeWidth={2} /> Satisfacción garantizada</p>
          <p className="text-sm text-ink/70 sm:text-base">
            Solo pagas el saldo cuando tu sistema esté aprobado y listo para usar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
