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
    <section className="grain relative overflow-hidden px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-5xl rounded-3xl border border-neon/30 brand-gradient p-8 text-center sm:p-12 lg:p-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-neon"
        >
          04 · Tiempo de entrega
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl lg:text-6xl"
        >
          Entrega <span className="text-neon">rápida</span>.
        </motion.h2>

        <div className="mt-8 flex items-baseline justify-center gap-2 font-display text-7xl leading-none text-white sm:text-8xl lg:text-[10rem]">
          <Counter to={3} />
          <span className="text-neon">–</span>
          <Counter to={5} />
        </div>
        <p className="mt-2 font-display text-xl uppercase tracking-widest text-white/90 sm:text-2xl">
          Días laborables
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 h-px w-32 origin-left bg-neon"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-6 max-w-md text-sm text-white/80 sm:text-base"
        >
          Trabajamos rápido sin comprometer calidad. Tu web lista para vender, en menos de una semana.
        </motion.p>
      </div>
    </section>
  );
}
