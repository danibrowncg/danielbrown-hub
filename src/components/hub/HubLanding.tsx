import { motion, useReducedMotion, type Variants } from "motion/react";
import { GradientBlob } from "@/components/primitives/GradientBlob";
import { LinkButton } from "./LinkButton";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  WhatsAppIcon,
} from "./BrandIcons";
import { IG_URL, TT_URL, YT_URL, COMMUNITY_WA_URL } from "@/lib/constants";
import danielImg from "@/assets/daniel.jpg";

const socials = [
  { label: "Instagram", href: IG_URL, Icon: InstagramIcon },
  { label: "TikTok", href: TT_URL, Icon: TikTokIcon },
  { label: "YouTube", href: YT_URL, Icon: YouTubeIcon },
  { label: "WhatsApp", href: COMMUNITY_WA_URL, Icon: WhatsAppIcon },
];

const EASE = [0.23, 1, 0.32, 1] as const;

export function HubLanding() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  const listContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.42 } },
  };
  const listItem: Variants = {
    hidden: { opacity: 0, y: 16, scale: reduce ? 1 : 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: EASE },
    },
  };

  return (
    <main className="grain relative isolate z-10 flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-14 text-white">
      <GradientBlob className="-left-28 top-8 h-72 w-72" />
      <GradientBlob className="-right-24 bottom-8 h-72 w-72" delay={2} />

      <div className="relative z-10 flex w-full max-w-[26rem] flex-col items-center">
        {/* Avatar (flota sutilmente) */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-neon/25 blur-2xl"
            animate={reduce ? undefined : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-neon/60 sm:h-28 sm:w-28"
            style={{ isolation: "isolate" }}
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={danielImg}
              alt="Daniel Brown"
              className="h-full w-full object-cover"
              width={112}
              height={112}
            />
          </motion.div>
        </motion.div>

        {/* Nombre */}
        <motion.h1
          {...fadeUp(0.12)}
          className="mt-5 font-display text-3xl tracking-wide text-white sm:text-4xl"
        >
          Daniel Brown
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.22)}
          className="mt-3 max-w-[22rem] text-balance text-center text-sm leading-relaxed text-white/70 sm:text-base"
        >
          🚀 Diseño Web y Sistemas con IA 🔥
          <br />
          Aprende a dominar Claude y la IA para tu día a día y negocios 📈
        </motion.p>

        {/* Redes */}
        <motion.div {...fadeUp(0.32)} className="mt-6 flex items-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-neon/40 hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>

        {/* Botones principales */}
        <motion.nav
          aria-label="Enlaces principales"
          variants={listContainer}
          initial="hidden"
          animate="show"
          className="mt-8 flex w-full flex-col gap-3.5"
        >
          <LinkButton variants={listItem} to="/diseno-web" title="Diseño Web" />
          <LinkButton variants={listItem} to="/sistemas" title="Sistemas con IA" />
          <LinkButton
            variants={listItem}
            href={COMMUNITY_WA_URL}
            color="white"
            title="Comunidad de WhatsApp"
          />
        </motion.nav>

        {/* Footer */}
        <motion.footer
          {...fadeUp(0.8)}
          className="mt-10 text-center text-xs text-white/40"
        >
          © {new Date().getFullYear()} Daniel Brown · @danielbrown.ia
        </motion.footer>
      </div>
    </main>
  );
}
