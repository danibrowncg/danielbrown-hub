import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";

const steps = [
  { n: "01", title: "50% al iniciar", desc: "Reservas tu proyecto y arrancamos el desarrollo." },
  { n: "02", title: "50% al entregar", desc: "Pagas el resto cuando apruebes la web lista para vender." },
];

export function PaymentMethod() {
  return (
    <section className="grain relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Forma de pago</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            CÓMO FUNCIONA EL <span className="text-neon">PAGO</span>.
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
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7"
            >
              <div className="font-display text-6xl text-neon/30">{s.n}</div>
              <h3 className="mt-2 font-display text-2xl uppercase text-white sm:text-3xl">{s.title}</h3>
              <p className="mt-3 text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="inline-flex items-center gap-2 font-display text-2xl uppercase text-neon sm:text-3xl"><ShieldCheck className="h-7 w-7" strokeWidth={2} /> Satisfacción garantizada</p>
          <p className="text-sm text-white/70 sm:text-base">
            Solo pagas el saldo cuando tu web esté aprobada y lista para usar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
