import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "header";
}

const offset = 44;
const BLUR = "blur(8px)";

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  const hidden = (() => {
    if (reduce) return { opacity: 0 };
    switch (direction) {
      case "left": return { opacity: 0, x: -offset, filter: BLUR };
      case "right": return { opacity: 0, x: offset, filter: BLUR };
      case "scale": return { opacity: 0, scale: 0.92, filter: BLUR };
      case "fade": return { opacity: 0, filter: BLUR };
      default: return { opacity: 0, y: offset, filter: BLUR };
    }
  })();

  const variants: Variants = {
    hidden,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: reduce ? undefined : "blur(0px)",
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const hidden = (() => {
    if (reduce) return { opacity: 0 };
    switch (direction) {
      case "left": return { opacity: 0, x: -24 };
      case "right": return { opacity: 0, x: 24 };
      case "scale": return { opacity: 0, scale: 0.95 };
      case "fade": return { opacity: 0 };
      default: return { opacity: 0, y: 24 };
    }
  })();

  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden,
        show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </MotionTag>
  );
}
