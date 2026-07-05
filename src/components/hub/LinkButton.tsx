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

const colorClasses: Record<NonNullable<LinkButtonProps["color"]>, string> = {
  neon: "bg-neon text-ink shadow-[0_10px_34px_-12px_rgba(231,255,0,0.6)] hover:shadow-[0_16px_50px_-8px_rgba(231,255,0,0.85)]",
  white:
    "bg-white text-ink shadow-[0_10px_34px_-12px_rgba(255,255,255,0.35)] hover:shadow-[0_16px_50px_-8px_rgba(255,255,255,0.6)]",
};

/**
 * Pastilla minimalista (fondo sólido + texto tinta + flecha), al estilo de los
 * CTA de WhatsApp de las landings. Enlace interno o externo.
 */
export function LinkButton({ title, to, href, color = "neon", variants }: LinkButtonProps) {
  const reduce = useReducedMotion();
  const isExternal = Boolean(href);

  const content = (
    <>
      <span className="font-display text-base uppercase tracking-wider sm:text-lg">
        {title}
      </span>
      {isExternal ? (
        <ArrowUpRight
          className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
        />
      ) : (
        <ArrowRight
          className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      )}
    </>
  );

  const className =
    `group flex h-14 w-full items-center justify-center gap-2.5 rounded-full px-6 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${colorClasses[color]}`;

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
