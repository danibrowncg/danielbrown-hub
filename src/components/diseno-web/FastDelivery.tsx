import { animate, motion, useInView, useMotionValue, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v).toString());
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, value, reduce]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function FastDelivery() {
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-5xl rounded-3xl border border-ink/10 bg-ink/[0.015] p-8 text-center shadow-[0_28px_70px_-40px_rgba(13,0,38,0.3)] sm:p-12 lg:p-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep"
        >
          Tiempo de entrega
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-display text-4xl uppercase leading-none text-ink sm:text-5xl lg:text-6xl"
        >
          Entrega <span className="text-brand-grad">rápida</span>.
        </motion.h2>

        <div className="mt-8 flex items-baseline justify-center gap-2 font-display text-7xl leading-none text-ink sm:text-8xl lg:text-[10rem]">
          <Counter to={3} />
          <span className="text-brand-deep">–</span>
          <Counter to={5} />
        </div>
        <p className="mt-2 font-display text-xl uppercase tracking-widest text-ink/80 sm:text-2xl">
          Días laborables
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 h-px w-32 origin-left brand-grad"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-6 max-w-md text-sm text-ink/70 sm:text-base"
        >
          Trabajamos rápido sin comprometer calidad. Tu web lista para vender, en menos de una semana.
        </motion.p>
      </div>
    </section>
  );
}
