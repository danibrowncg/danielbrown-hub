import { motion } from "motion/react";
import { IG_URL, TT_URL, WA_URL, WA_PHONE, IG_HANDLE } from "@/lib/constants";

const socials = [
  { label: "Instagram", href: IG_URL, icon: (<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>) },
  { label: "TikTok", href: TT_URL, icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M19.6 6.4a5.4 5.4 0 0 1-3.1-1V15a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V2h3a5.4 5.4 0 0 0 3.1 4.4z" /></svg>) },
  { label: "WhatsApp", href: WA_URL, icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.2-1.4c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>) },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-5 py-12 sm:px-8 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="font-display text-3xl uppercase text-neon">Daniel Brown</p>
            <p className="mt-2 text-sm text-white/60">Diseño & desarrollo web premium.</p>
          </div>

          <nav className="flex flex-col gap-2 text-sm text-white/70">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Navega</p>
            {[
              ["Inicio", "#top"],
              ["Paquete", "#paquete"],
              ["Portfolio", "#portfolio"],
              ["FAQ", "#faq"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="w-fit transition-colors hover:text-neon">
                {label}
              </a>
            ))}
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Conecta</p>
            <p className="mt-3 text-sm text-white/70">{IG_HANDLE}</p>
            <p className="text-sm text-white/70">{WA_PHONE}</p>
            <div className="mt-4 flex gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 220 }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neon/40 text-neon transition-colors hover:bg-neon hover:text-ink"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Daniel Brown · Todos los derechos reservados.</p>
          <p>Hecho con obsesión por el detalle.</p>
        </div>
      </div>
    </footer>
  );
}
