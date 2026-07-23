import { motion, useReducedMotion, type Variants } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface LinkButtonProps {
  title: string;
  /** Ruta interna (TanStack). Usa esto O `href`, no ambos. */
  to?: string;
  /** URL externa. Abre en nueva pestaña. */
  href?: string;
  /** Color de la pastilla. "neon" (por defecto) o "white". */
  color?: "neon" | "white";
  variants?: Variants;
}

type Color = NonNullable<LinkButtonProps["color"]>;

const colorClasses: Record<Color, string> = {
  neon: "bg-neon text-ink shadow-[0_10px_34px_-12px_rgba(231,255,0,0.6)] hover:shadow-[0_18px_54px_-8px_rgba(231,255,0,0.85)]",
  // El botón secundario (Comunidad) lleva el DEGRADADO de marca: contrasta con
  // el blanco, deja respirar a los dos botones neón y luce el color de marca.
  white:
    "brand-grad text-white shadow-[0_10px_34px_-14px_rgba(73,16,188,0.5)] hover:shadow-[0_18px_54px_-10px_rgba(73,16,188,0.7)]",
};

/** Color del barrido de brillo, legible sobre cada fondo. */
const shineClasses: Record<Color, string> = {
  neon: "via-white/45",
  white: "via-white/25",
};

/**
 * Pastilla minimalista con barrido de brillo al hover, elevación y
 * press-feedback. Enlace interno o externo.
 */
export function LinkButton({ title, to, href, color = "neon", variants }: LinkButtonProps) {
  const reduce = useReducedMotion();
  const isExternal = Boolean(href);

  const content = (
    <>
      {/* Barrido de brillo: transición (interrumpible), no keyframes */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%] ${shineClasses[color]}`}
      />
      <span className="relative font-display text-base uppercase tracking-wider sm:text-lg">
        {title}
      </span>
      {isExternal ? (
        <ArrowUpRight
          className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
        />
      ) : (
        <ArrowRight
          className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      )}
    </>
  );

  const className =
    `group relative flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background ${colorClasses[color]}`;

  const hover = reduce ? undefined : { scale: 1.03, y: -2 };
  const tap = reduce ? undefined : { scale: 0.97 };
  const transition = { type: "spring" as const, stiffness: 340, damping: 24 };

  if (isExternal) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        variants={variants}
        whileHover={hover}
        whileTap={tap}
        transition={transition}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div variants={variants} whileHover={hover} whileTap={tap} transition={transition}>
      <Link to={to!} className={className}>
        {content}
      </Link>
    </motion.div>
  );
}
