import { Globe, Sparkles, Settings, BarChart3, type LucideIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { SpotlightOverlay } from "@/components/primitives/SpotlightOverlay";

const cards: { Icon: LucideIcon; title: string; items: string[] }[] = [
  {
    Icon: Globe,
    title: "Dominio + Hosting",
    items: ["Dominio personalizado (12 meses)", "Hosting de alta velocidad", "Certificado SSL (HTTPS)"],
  },
  {
    Icon: Sparkles,
    title: "Diseño Premium",
    items: ["100% responsive mobile-first", "Animaciones modernas incluidas", "Interfaz exclusiva, sin plantillas"],
  },
  {
    Icon: Settings,
    title: "Soporte + SEO",
    items: ["Soporte técnico 12 meses", "SEO básico para Google", "Optimización de velocidad"],
  },
  {
    Icon: BarChart3,
    title: "Extras incluidos",
    items: ["Google Analytics configurado", "Integración redes sociales", "Formulario de contacto + backup"],
  },
];

export function PackageIncludes() {
  return (
    <section className="grain relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Qué incluye</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            TODO LO QUE <span className="text-neon">RECIBES</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">
            Un paquete completo. Llave en mano. Sin sorpresas ni costos ocultos.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {cards.map((c) => (
            <StaggerItem
              key={c.title}
              direction="up"
              className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-neon/60 hover:shadow-[0_24px_60px_-24px_rgba(231,255,0,0.35)]"
            >
              <div className="absolute inset-0 brand-gradient opacity-20 transition-opacity duration-500 group-hover:opacity-40" />
              <SpotlightOverlay />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neon/40 bg-neon/10 text-neon">
                  <c.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-white">{c.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
